<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (isset($input['action']) && $input['action'] == 'login') {
        $username = $input['username'] ?? '';
        $password = $input['password'] ?? '';
        
        $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch();
        
        if ($user && password_verify($password, $user['password'])) {
            // Success
            $token = bin2hex(random_bytes(16)); // Mock token
            jsonResponse([
                "success" => true,
                "token"   => $token,
                "user"    => [
                    "id"        => $user['id'],
                    "username"  => $user['username'],
                    "full_name" => $user['full_name']
                ]
            ]);
        } else {
            jsonResponse(["success" => false, "message" => "Invalid credentials"], 401);
        }
    }
}

jsonResponse(["message" => "Only POST login is supported"], 400);
?>
