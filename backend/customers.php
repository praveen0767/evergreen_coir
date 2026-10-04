<?php
require_once 'config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        // Fetch all customers with their order count
        $stmt = $pdo->query("
            SELECT c.id, c.name, c.mobile, c.created_at, 
                   COUNT(o.id) as total_orders
            FROM customers c 
            LEFT JOIN orders o ON c.id = o.customer_id
            GROUP BY c.id
            ORDER BY c.created_at DESC
        ");
        $customers = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['success' => true, 'data' => $customers]);
    } elseif ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);

        if (empty($input['name']) || empty($input['mobile']) || empty($input['password'])) {
            echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
            exit();
        }

        // Check if mobile already exists
        $stmt = $pdo->prepare("SELECT id FROM customers WHERE mobile = ?");
        $stmt->execute([$input['mobile']]);
        if ($stmt->fetch()) {
            echo json_encode(['success' => false, 'message' => 'Mobile number is already registered.']);
            exit();
        }

        $hashedPassword = password_hash($input['password'], PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO customers (name, mobile, password) VALUES (?, ?, ?)");
        $stmt->execute([$input['name'], $input['mobile'], $hashedPassword]);
        
        echo json_encode(['success' => true, 'message' => 'Customer added successfully.']);
    } elseif ($method === 'DELETE') {
        if (empty($_GET['id'])) {
            echo json_encode(['success' => false, 'message' => 'Missing customer id']);
            exit();
        }
        $stmt = $pdo->prepare("DELETE FROM customers WHERE id = ?");
        $stmt->execute([$_GET['id']]);
        echo json_encode(['success' => true, 'message' => 'Customer deleted.']);
    } else {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
