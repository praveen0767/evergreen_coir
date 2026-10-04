<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // List all categories
        $stmt = $pdo->query("SELECT id, CASE WHEN LOWER(TRIM(name)) IN ('v² coconut oil', 'v2 coconut oil', 'naturas virgin oil', 'natural virgin oil') THEN 'V2 Oil' WHEN LOWER(TRIM(name)) = 'evergreen premium coir' THEN 'V2 Products' ELSE name END AS name, slug, description, status, created_at, updated_at FROM categories ORDER BY id DESC");
        $categories = $stmt->fetchAll();
        jsonResponse($categories);
        break;
        
    case 'POST':
        // Create new category
        $input = json_decode(file_get_contents('php://input'), true);
        $name = $input['name'] ?? '';
        $slug = $input['slug'] ?? strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $name)));
        $status = $input['status'] ?? 'Active';
        
        if (empty($name)) {
            jsonResponse(["error" => "Category Name is required"], 400);
        }
        
        try {
            $stmt = $pdo->prepare("INSERT INTO categories (name, slug, status) VALUES (?, ?, ?)");
            $stmt->execute([$name, $slug, $status]);
            $newId = $pdo->lastInsertId();
            jsonResponse(["id" => $newId, "name" => $name, "slug" => $slug, "status" => $status, "message" => "Category created successfully"]);
        } catch (PDOException $e) {
            jsonResponse(["error" => "Failed to create category: " . $e->getMessage()], 500);
        }
        break;
        
    case 'PUT':
        // Update category
        $input = json_decode(file_get_contents('php://input'), true);
        $id = $input['id'] ?? '';
        $name = $input['name'] ?? '';
        $slug = $input['slug'] ?? strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $name)));
        $status = $input['status'] ?? '';
        
        if (empty($id) || empty($name)) {
            jsonResponse(["error" => "ID and Name are required"], 400);
        }
        
        try {
            $stmt = $pdo->prepare("UPDATE categories SET name = ?, slug = ?, status = ? WHERE id = ?");
            $stmt->execute([$name, $slug, $status, $id]);
            jsonResponse(["message" => "Category updated successfully"]);
        } catch (PDOException $e) {
            jsonResponse(["error" => "Failed to update category: " . $e->getMessage()], 500);
        }
        break;
        
    case 'DELETE':
        // Delete category
        $id = $_GET['id'] ?? '';
        if (empty($id)) {
            jsonResponse(["error" => "ID is required"], 400);
        }
        
        try {
            $stmt = $pdo->prepare("DELETE FROM categories WHERE id = ?");
            $stmt->execute([$id]);
            jsonResponse(["message" => "Category deleted successfully"]);
        } catch (PDOException $e) {
            jsonResponse(["error" => "Failed to delete category: " . $e->getMessage()], 500);
        }
        break;
        
    default:
        jsonResponse(["message" => "Method not allowed"], 405);
        break;
}
?>
