<?php
require 'config.php';
$password = 'admin123';
$username = 'admin';
$hash = password_hash($password, PASSWORD_BCRYPT);
try {
    $stmt = $pdo->prepare("UPDATE admin_users SET password = ? WHERE username = ?");
    $stmt->execute([$hash, $username]);
    echo "Updated " . $stmt->rowCount() . " rows for user $username with password $password";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
