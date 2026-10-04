<?php
require_once 'config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM feedbacks ORDER BY created_at DESC");
        $feedbacks = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Convert boolean metrics to actual booleans
        foreach ($feedbacks as &$feedback) {
            $feedback['metric_response'] = (bool)$feedback['metric_response'];
            $feedback['metric_quality'] = (bool)$feedback['metric_quality'];
            $feedback['metric_delivery'] = (bool)$feedback['metric_delivery'];
            // Normalize ID fields for frontend if needed
            $feedback['id'] = (int)$feedback['id'];
        }

        echo json_encode(['success' => true, 'data' => $feedbacks]);
    } else if ($method === 'PUT') {
        $input = json_decode(file_get_contents('php://input'), true);
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Missing feedback ID']);
            exit();
        }
        $id = (int)$_GET['id'];

        $updateFields = [];
        $params = [];

        if (isset($input['status'])) {
            $updateFields[] = "status = ?";
            $params[] = $input['status'];
        }
        if (isset($input['seller_response'])) {
            $updateFields[] = "seller_response = ?";
            $params[] = $input['seller_response'];
            $updateFields[] = "response_date = CURRENT_TIMESTAMP";
        }

        if (empty($updateFields)) {
            echo json_encode(['success' => false, 'message' => 'No fields to update']);
            exit;
        }

        $params[] = $id;

        $sql = "UPDATE feedbacks SET " . implode(", ", $updateFields) . " WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        echo json_encode(['success' => true, 'message' => 'Feedback updated successfully']);
    } else if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);

        // Required fields
        if (!isset($input['reviewer_name']) || !isset($input['product_name']) || !isset($input['rating']) || !isset($input['review_text'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Missing required fields']);
            exit();
        }

        $sql = "INSERT INTO feedbacks (reviewer_name, location, product_name, rating, review_text, metric_response, metric_quality, metric_delivery, status) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pending')";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $input['reviewer_name'],
            $input['location'] ?? '',
            $input['product_name'],
            $input['rating'],
            $input['review_text'],
            isset($input['metric_response']) ? (int)$input['metric_response'] : 0,
            isset($input['metric_quality']) ? (int)$input['metric_quality'] : 0,
            isset($input['metric_delivery']) ? (int)$input['metric_delivery'] : 0
        ]);

        echo json_encode(['success' => true, 'message' => 'Feedback submitted successfully', 'id' => $pdo->lastInsertId()]);
    } else {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
