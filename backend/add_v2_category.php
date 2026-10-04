<?php
require_once 'config.php';

try {
    $name = 'V² PRODUCT';
    $slug = 'v2-coconut-oil';
    $description = 'Premium Organic Coconut Oil products.';
    
    // Check if it already exists
    $stmt = $pdo->prepare("SELECT id FROM categories WHERE name = ? OR slug = ?");
    $stmt->execute([$name, $slug]);
    if ($stmt->fetch()) {
        echo json_encode(["success" => false, "message" => "Category already exists"]);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO categories (name, slug, description, status) VALUES (?, ?, ?, 'Active')");
    $stmt->execute([$name, $slug, $description]);
    
    echo json_encode(["success" => true, "message" => "Category added successfully"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
?>
