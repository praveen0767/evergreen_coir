<?php
require_once 'config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);

        if (!isset($input['name']) || !isset($input['mobile']) || !isset($input['message'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Missing required fields']);
            exit();
        }

        $stmt = $pdo->prepare("INSERT INTO contacts (name, mobile, message) VALUES (?, ?, ?)");
        $stmt->execute([
            $input['name'],
            $input['mobile'],
            $input['message']
        ]);

        echo json_encode(['success' => true, 'message' => 'Contact saved successfully', 'id' => $pdo->lastInsertId()]);
    } else if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM contacts ORDER BY created_at DESC");
        $contacts = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(['success' => true, 'data' => $contacts]);
    } else {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
