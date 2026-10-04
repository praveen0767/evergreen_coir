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
    if ($method !== 'POST') {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
        exit();
    }

    $input = json_decode(file_get_contents('php://input'), true);
    $action = $input['action'] ?? '';

    if ($action === 'register') {
        if (empty($input['name']) || empty($input['mobile']) || empty($input['password'])) {
            echo json_encode(['success' => false, 'message' => 'Missing required fields for registration.']);
            exit();
        }

        $stmt = $pdo->prepare("SELECT id FROM customers WHERE mobile = ?");
        $stmt->execute([$input['mobile']]);
        if ($stmt->fetch()) {
            echo json_encode(['success' => false, 'message' => 'Mobile number is already registered.']);
            exit();
        }

        $hashedPassword = password_hash($input['password'], PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO customers (name, mobile, password) VALUES (?, ?, ?)");
        $stmt->execute([$input['name'], $input['mobile'], $hashedPassword]);

        $customerId = (int) $pdo->lastInsertId();

        echo json_encode([
            'success' => true,
            'message' => 'Registration successful',
            'customer' => [
                'id' => $customerId,
                'name' => $input['name'],
                'mobile' => $input['mobile']
            ]
        ]);
        exit();
    }

    if ($action === 'login') {
        if (empty($input['mobile']) || empty($input['password'])) {
            echo json_encode(['success' => false, 'message' => 'Missing mobile or password.']);
            exit();
        }

        $stmt = $pdo->prepare("SELECT id, name, mobile, password FROM customers WHERE mobile = ?");
        $stmt->execute([$input['mobile']]);
        $customer = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($customer && password_verify($input['password'], $customer['password'])) {
            unset($customer['password']);
            echo json_encode([
                'success' => true,
                'message' => 'Login successful',
                'customer' => $customer
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid mobile number or password.']);
        }
        exit();
    }

    if ($action === 'update_profile') {
        $customerId = filter_var($input['id'] ?? null, FILTER_VALIDATE_INT);
        $name = trim($input['name'] ?? '');
        $mobile = trim($input['mobile'] ?? '');

        if (!$customerId || $name === '' || $mobile === '') {
            echo json_encode(['success' => false, 'message' => 'Customer id, name and mobile are required.']);
            exit();
        }

        $stmt = $pdo->prepare("SELECT id FROM customers WHERE mobile = ? AND id <> ?");
        $stmt->execute([$mobile, $customerId]);
        if ($stmt->fetch()) {
            echo json_encode(['success' => false, 'message' => 'Mobile number is already registered.']);
            exit();
        }

        $stmt = $pdo->prepare("UPDATE customers SET name = ?, mobile = ? WHERE id = ?");
        $stmt->execute([$name, $mobile, $customerId]);

        if ($stmt->rowCount() === 0) {
            $stmt = $pdo->prepare("SELECT id FROM customers WHERE id = ?");
            $stmt->execute([$customerId]);
            if (!$stmt->fetch()) {
                echo json_encode(['success' => false, 'message' => 'Customer not found.']);
                exit();
            }
        }

        echo json_encode([
            'success' => true,
            'message' => 'Profile updated successfully',
            'customer' => ['id' => $customerId, 'name' => $name, 'mobile' => $mobile]
        ]);
        exit();
    }

    echo json_encode(['success' => false, 'message' => 'Invalid auth action.']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error.']);
}
