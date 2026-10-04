<?php
require_once 'config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PATCH, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);

        if (empty($input['customer_id']) || empty($input['product_id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Missing customer_id or product_id']);
            exit();
        }

        $stmt = $pdo->prepare("INSERT INTO orders (customer_id, product_id, product_name, price, quantity) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([
            $input['customer_id'],
            $input['product_id'],
            $input['product_name'] ?? 'Unknown Product',
            $input['price'] ?? 'Request',
            $input['quantity'] ?? 1
        ]);

        echo json_encode(['success' => true, 'message' => 'Order placed successfully', 'id' => $pdo->lastInsertId()]);
        
    } elseif ($method === 'GET') {
        if (isset($_GET['customer_id'])) {
            // Get orders for a specific customer
            $stmt = $pdo->prepare("
                SELECT o.*, 
                       (SELECT image_url FROM product_images pi WHERE pi.product_id = o.product_id ORDER BY is_primary DESC, id ASC LIMIT 1) as product_image
                FROM orders o 
                WHERE o.customer_id = ? 
                ORDER BY o.created_at DESC
            ");
            $stmt->execute([$_GET['customer_id']]);
            $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(['success' => true, 'data' => $orders]);
        } else {
            // Get all orders for Admin
            $stmt = $pdo->query("
                SELECT o.*, 
                       c.name as customer_name, c.mobile as customer_mobile,
                       (SELECT image_url FROM product_images pi WHERE pi.product_id = o.product_id ORDER BY is_primary DESC, id ASC LIMIT 1) as product_image
                FROM orders o 
                JOIN customers c ON o.customer_id = c.id 
                ORDER BY o.created_at DESC
            ");
            $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(['success' => true, 'data' => $orders]);
        }
    } elseif ($method === 'PATCH') {
        // Update order status (for Admin)
        $input = json_decode(file_get_contents('php://input'), true);
        if (empty($_GET['id']) || empty($input['status'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Missing order id or status']);
            exit();
        }
        $stmt = $pdo->prepare("UPDATE orders SET status = ? WHERE id = ?");
        $stmt->execute([$input['status'], $_GET['id']]);
        echo json_encode(['success' => true, 'message' => 'Order status updated']);
    } else {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
