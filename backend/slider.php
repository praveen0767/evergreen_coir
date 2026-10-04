<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM hero_slides ORDER BY order_index ASC, id DESC");
        $slides = $stmt->fetchAll();
        jsonResponse($slides);
        break;

    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        
        $image_url = $input['image_url'] ?? '';
        $badge_text = $input['badge_text'] ?? 'CERTIFIED MANUFACTURER';
        $title = $input['title'] ?? '';
        $subtitle = $input['subtitle'] ?? '';
        $button_primary_text = $input['button_primary_text'] ?? 'VIEW OUR RANGE';
        $button_secondary_text = $input['button_secondary_text'] ?? 'GET CUSTOM QUOTE';
        $order_index = $input['order_index'] ?? 0;

        if (empty($image_url) || empty($title)) {
            jsonResponse(["error" => "Image and Title are required"], 400);
        }

        try {
            $stmt = $pdo->prepare("INSERT INTO hero_slides (image_url, badge_text, title, subtitle, button_primary_text, button_secondary_text, order_index) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$image_url, $badge_text, $title, $subtitle, $button_primary_text, $button_secondary_text, $order_index]);
            jsonResponse(["id" => $pdo->lastInsertId(), "message" => "Slide created successfully"]);
        } catch (PDOException $e) {
            jsonResponse(["error" => "Failed to create slide: " . $e->getMessage()], 500);
        }
        break;

    case 'PUT':
        $input = json_decode(file_get_contents('php://input'), true);
        $id = $input['id'] ?? null;

        if (!$id) {
            jsonResponse(["error" => "ID is required"], 400);
        }

        $image_url = $input['image_url'] ?? '';
        $badge_text = $input['badge_text'] ?? '';
        $title = $input['title'] ?? '';
        $subtitle = $input['subtitle'] ?? '';
        $button_primary_text = $input['button_primary_text'] ?? '';
        $button_secondary_text = $input['button_secondary_text'] ?? '';
        $order_index = $input['order_index'] ?? 0;

        try {
            $stmt = $pdo->prepare("UPDATE hero_slides SET image_url = ?, badge_text = ?, title = ?, subtitle = ?, button_primary_text = ?, button_secondary_text = ?, order_index = ? WHERE id = ?");
            $stmt->execute([$image_url, $badge_text, $title, $subtitle, $button_primary_text, $button_secondary_text, $order_index, $id]);
            jsonResponse(["message" => "Slide updated successfully"]);
        } catch (PDOException $e) {
            jsonResponse(["error" => "Failed to update slide: " . $e->getMessage()], 500);
        }
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id) {
            jsonResponse(["error" => "ID is required"], 400);
        }

        try {
            $stmt = $pdo->prepare("DELETE FROM hero_slides WHERE id = ?");
            $stmt->execute([$id]);
            jsonResponse(["message" => "Slide deleted successfully"]);
        } catch (PDOException $e) {
            jsonResponse(["error" => "Failed to delete slide: " . $e->getMessage()], 500);
        }
        break;

    default:
        jsonResponse(["message" => "Method not allowed"], 405);
        break;
}
?>
