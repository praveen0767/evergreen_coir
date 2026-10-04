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
        
        $action = $input['action'] ?? '';

        if ($action === 'register') {
            if (empty($input['name']) || empty($input['mobile']) || empty($input['password'])) {
                echo json_encode(['success' => false, 'message' => 'Missing required fields for registration.']);
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
            
            $customerId = $pdo->lastInsertId();
            
            echo json_encode([
                'success' => true, 
                'message' => 'Registration successful',
                'customer' => ['id' => $customerId, 'name' => $input['name'], 'mobile' => $input['mobile']]
            ]);

        } elseif ($action === 'login') {
            if (empty($input['mobile']) || empty($input['password'])) {
                echo json_encode(['success' => false, 'message' => 'Missing mobile or password.']);
                exit();
            }

            $stmt = $pdo->prepare("SELECT id, name, mobile, password FROM customers WHERE mobile = ?");
            $stmt->execute([$input['mobile']]);
            $customer = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($customer && password_verify($input['password'], $customer['password'])) {
                unset($customer['password']); // don't send password hash back
                echo json_encode([
                    'success' => true, 
                    'message' => 'Login successful',
                    'customer' => $customer
                ]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid mobile number or password.']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid auth action.']);
        }
    } else {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
