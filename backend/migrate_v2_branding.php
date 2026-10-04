<?php
require_once 'config.php';

header('Content-Type: application/json');

try {
    $updates = [];

    $stmt = $pdo->prepare("UPDATE categories SET name = 'V2 Oil' WHERE LOWER(TRIM(name)) IN ('v² coconut oil', 'v2 coconut oil', 'naturas virgin oil', 'natural virgin oil')");
    $stmt->execute();
    $updates['categories_v2_oil'] = $stmt->rowCount();

    $stmt = $pdo->prepare("UPDATE categories SET name = 'V2 Products' WHERE LOWER(TRIM(name)) = 'evergreen premium coir'");
    $stmt->execute();
    $updates['categories_v2_products'] = $stmt->rowCount();

    $stmt = $pdo->prepare("UPDATE hero_slides SET title = 'V2 Products' WHERE LOWER(TRIM(title)) IN ('evergreen premium coir', 'ever green coir', 'evergreen coir')");
    $stmt->execute();
    $updates['hero_slides'] = $stmt->rowCount();

    echo json_encode([
        'success' => true,
        'message' => 'V2 Products branding migration completed.',
        'updates' => $updates
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database migration failed.']);
}
?>