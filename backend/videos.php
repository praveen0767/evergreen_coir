<?php
require_once 'config.php';

// Ensure videos table exists
$pdo->exec("CREATE TABLE IF NOT EXISTS videos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT DEFAULT NULL,
    sort_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

$method = $_SERVER['REQUEST_METHOD'];

// Helper: extract YouTube/Vimeo thumbnail
function getThumbnail($url) {
    // YouTube
    if (preg_match('/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/', $url, $m)) {
        return "https://img.youtube.com/vi/{$m[1]}/hqdefault.jpg";
    }
    // Vimeo
    if (preg_match('/vimeo\.com\/(\d+)/', $url, $m)) {
        // Vimeo thumbnail requires API call; return null to let frontend handle
        return null;
    }
    return null;
}

// Helper: convert YouTube/Vimeo watch URLs to embed URLs
function getEmbedUrl($url) {
    // YouTube
    if (preg_match('/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/', $url, $m)) {
        return "https://www.youtube.com/embed/{$m[1]}";
    }
    // Vimeo
    if (preg_match('/vimeo\.com\/(\d+)/', $url, $m)) {
        return "https://player.vimeo.com/video/{$m[1]}";
    }
    return $url;
}

switch ($method) {
    case 'GET':
        $id = $_GET['id'] ?? null;
        if ($id) {
            $stmt = $pdo->prepare("SELECT * FROM videos WHERE id = ?");
            $stmt->execute([$id]);
            $video = $stmt->fetch();
            if ($video) {
                $video['embed_url'] = getEmbedUrl($video['video_url']);
                jsonResponse($video);
            } else {
                jsonResponse(['error' => 'Video not found'], 404);
            }
        } else {
            $activeOnly = isset($_GET['active']) && $_GET['active'] === '1';
            if ($activeOnly) {
                $stmt = $pdo->query("SELECT * FROM videos WHERE is_active = 1 ORDER BY sort_order ASC, id ASC");
            } else {
                $stmt = $pdo->query("SELECT * FROM videos ORDER BY sort_order ASC, id ASC");
            }
            $videos = $stmt->fetchAll();
            foreach ($videos as &$v) {
                $v['embed_url'] = getEmbedUrl($v['video_url']);
                if (empty($v['thumbnail_url'])) {
                    $auto = getThumbnail($v['video_url']);
                    if ($auto) $v['thumbnail_url'] = $auto;
                }
            }
            jsonResponse($videos);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (empty($data['title']) || empty($data['video_url'])) {
            jsonResponse(['error' => 'Title and video_url are required'], 400);
        }
        $thumbnail = $data['thumbnail_url'] ?? getThumbnail($data['video_url']);
        $stmt = $pdo->prepare(
            "INSERT INTO videos (title, video_url, thumbnail_url, sort_order, is_active) VALUES (?, ?, ?, ?, ?)"
        );
        $stmt->execute([
            $data['title'],
            $data['video_url'],
            $thumbnail,
            $data['sort_order'] ?? 0,
            isset($data['is_active']) ? (int)$data['is_active'] : 1
        ]);
        $newId = $pdo->lastInsertId();
        $stmt2 = $pdo->prepare("SELECT * FROM videos WHERE id = ?");
        $stmt2->execute([$newId]);
        $video = $stmt2->fetch();
        $video['embed_url'] = getEmbedUrl($video['video_url']);
        jsonResponse(['success' => true, 'video' => $video], 201);

    case 'PUT':
        $id = $_GET['id'] ?? null;
        if (!$id) jsonResponse(['error' => 'ID required'], 400);
        $data = json_decode(file_get_contents('php://input'), true);
        if (empty($data['title']) || empty($data['video_url'])) {
            jsonResponse(['error' => 'Title and video_url are required'], 400);
        }
        $thumbnail = $data['thumbnail_url'] ?? getThumbnail($data['video_url']);
        $stmt = $pdo->prepare(
            "UPDATE videos SET title=?, video_url=?, thumbnail_url=?, sort_order=?, is_active=? WHERE id=?"
        );
        $stmt->execute([
            $data['title'],
            $data['video_url'],
            $thumbnail,
            $data['sort_order'] ?? 0,
            isset($data['is_active']) ? (int)$data['is_active'] : 1,
            $id
        ]);
        if ($stmt->rowCount() === 0) {
            // Check video exists
            $check = $pdo->prepare("SELECT id FROM videos WHERE id=?");
            $check->execute([$id]);
            if (!$check->fetch()) jsonResponse(['error' => 'Video not found'], 404);
        }
        $stmt2 = $pdo->prepare("SELECT * FROM videos WHERE id = ?");
        $stmt2->execute([$id]);
        $video = $stmt2->fetch();
        $video['embed_url'] = getEmbedUrl($video['video_url']);
        jsonResponse(['success' => true, 'video' => $video]);

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id) jsonResponse(['error' => 'ID required'], 400);
        $stmt = $pdo->prepare("DELETE FROM videos WHERE id = ?");
        $stmt->execute([$id]);
        if ($stmt->rowCount() === 0) {
            jsonResponse(['error' => 'Video not found'], 404);
        }
        jsonResponse(['success' => true]);

    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}
