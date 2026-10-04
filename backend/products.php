<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            // Get single product
            $stmt = $pdo->prepare("SELECT p.*, (CASE WHEN LOWER(TRIM(c.name)) IN ('v² coconut oil', 'v2 coconut oil', 'naturas virgin oil', 'natural virgin oil') THEN 'V2 Oil' WHEN LOWER(TRIM(c.name)) = 'evergreen premium coir' THEN 'V2 Products' ELSE c.name END) as category_name FROM products p JOIN categories c ON p.category_id = c.id WHERE p.id = ?");
            $stmt->execute([$_GET['id']]);
            $product = $stmt->fetch();
            
            if ($product) {
                // Get images
                $stmtImg = $pdo->prepare("SELECT * FROM product_images WHERE product_id = ?");
                $stmtImg->execute([$_GET['id']]);
                $product['images'] = $stmtImg->fetchAll();
                
                jsonResponse($product);
            } else {
                jsonResponse(["error" => "Product not found"], 404);
            }
        } else if (isset($_GET['category_id']) || isset($_GET['category_slug'])) {
            // Filter by category
            $where = "";
            $params = [];
            
            if (isset($_GET['category_id'])) {
                $where = "WHERE p.category_id = ?";
                $params = [$_GET['category_id']];
            } else {
                $where = "WHERE c.slug = ?";
                $params = [$_GET['category_slug']];
            }
            
            $stmt = $pdo->prepare("SELECT p.*, (CASE WHEN LOWER(TRIM(c.name)) IN ('v² coconut oil', 'v2 coconut oil', 'naturas virgin oil', 'natural virgin oil') THEN 'V2 Oil' WHEN LOWER(TRIM(c.name)) = 'evergreen premium coir' THEN 'V2 Products' ELSE c.name END) as category_name, c.description as category_description 
                                  FROM products p 
                                  JOIN categories c ON p.category_id = c.id 
                                  $where ORDER BY p.id DESC");
            $stmt->execute($params);
            $products = $stmt->fetchAll();
            
            foreach ($products as &$p) {
                // Get all images for each product (for the vertical thumbnail gallery)
                $stmtImg = $pdo->prepare("SELECT * FROM product_images WHERE product_id = ? ORDER BY is_primary DESC");
                $stmtImg->execute([$p['id']]);
                $p['images'] = $stmtImg->fetchAll();
                
                if ($p['specifications']) {
                    $p['specifications'] = json_decode($p['specifications'], true);
                }
            }
            
            jsonResponse($products);
        } else {
            // List all products
            $stmt = $pdo->query("SELECT p.*, (CASE WHEN LOWER(TRIM(c.name)) IN ('v² coconut oil', 'v2 coconut oil', 'naturas virgin oil', 'natural virgin oil') THEN 'V2 Oil' WHEN LOWER(TRIM(c.name)) = 'evergreen premium coir' THEN 'V2 Products' ELSE c.name END) as category_name FROM products p JOIN categories c ON p.category_id = c.id ORDER BY p.id DESC");
            $products = $stmt->fetchAll();
            
            foreach ($products as &$p) {
                $stmtImg = $pdo->prepare("SELECT image_url FROM product_images WHERE product_id = ? ORDER BY is_primary DESC LIMIT 1");
                $stmtImg->execute([$p['id']]);
                $img = $stmtImg->fetch();
                $p['primary_image'] = $img ? $img['image_url'] : null;
            }
            
            jsonResponse($products);
        }
        break;

    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        
        $name = $input['name'] ?? '';
        $categoryId = $input['category_id'] ?? null;
        $price = $input['price'] ?? '';
        $moq = $input['moq'] ?? 1;
        $description = $input['description'] ?? '';
        $brochureUrl = $input['brochure_url'] ?? '';
        $specifications = isset($input['specifications']) ? json_encode($input['specifications']) : null;
        $status = $input['status'] ?? 'Active';
        $images = $input['images'] ?? []; // Array of URLs

        if (empty($name) || empty($categoryId)) {
            jsonResponse(["error" => "Name and Category are required"], 400);
        }

        try {
            $pdo->beginTransaction();
            
            $stmt = $pdo->prepare("INSERT INTO products (category_id, name, price, moq, description, brochure_url, specifications, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$categoryId, $name, $price, $moq, $description, $brochureUrl, $specifications, $status]);
            $productId = $pdo->lastInsertId();

            // Insert images
            if (!empty($images)) {
                $stmtImg = $pdo->prepare("INSERT INTO product_images (product_id, image_url, is_primary) VALUES (?, ?, ?)");
                foreach ($images as $index => $url) {
                    $stmtImg->execute([$productId, $url, ($index === 0)]);
                }
            }

            $pdo->commit();
            jsonResponse(["id" => $productId, "message" => "Product created successfully"]);
        } catch (PDOException $e) {
            $pdo->rollBack();
            jsonResponse(["error" => "Failed to create product: " . $e->getMessage()], 500);
        }
        break;

    case 'PUT':
        $input = json_decode(file_get_contents('php://input'), true);
        $id = $input['id'] ?? null;

        if (!$id) {
            jsonResponse(["error" => "ID is required"], 400);
        }

        $name = $input['name'] ?? '';
        $categoryId = $input['category_id'] ?? null;
        $price = $input['price'] ?? '';
        $moq = $input['moq'] ?? 1;
        $description = $input['description'] ?? '';
        $brochureUrl = $input['brochure_url'] ?? '';
        $specifications = isset($input['specifications']) ? json_encode($input['specifications']) : null;
        $status = $input['status'] ?? 'Active';
        $images = $input['images'] ?? [];

        try {
            $pdo->beginTransaction();
            
            $stmt = $pdo->prepare("UPDATE products SET category_id = ?, name = ?, price = ?, moq = ?, description = ?, brochure_url = ?, specifications = ?, status = ? WHERE id = ?");
            $stmt->execute([$categoryId, $name, $price, $moq, $description, $brochureUrl, $specifications, $status, $id]);

            // Update images (simple way: delete old and insert new)
            if (isset($input['images'])) {
                $pdo->prepare("DELETE FROM product_images WHERE product_id = ?")->execute([$id]);
                $stmtImg = $pdo->prepare("INSERT INTO product_images (product_id, image_url, is_primary) VALUES (?, ?, ?)");
                foreach ($images as $index => $url) {
                    $stmtImg->execute([$id, $url, ($index === 0)]);
                }
            }

            $pdo->commit();
            jsonResponse(["message" => "Product updated successfully"]);
        } catch (PDOException $e) {
            $pdo->rollBack();
            jsonResponse(["error" => "Failed to update product: " . $e->getMessage()], 500);
        }
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id) {
            jsonResponse(["error" => "ID is required"], 400);
        }

        try {
            $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
            $stmt->execute([$id]);
            jsonResponse(["message" => "Product deleted successfully"]);
        } catch (PDOException $e) {
            jsonResponse(["error" => "Failed to delete product: " . $e->getMessage()], 500);
        }
        break;

    default:
        jsonResponse(["message" => "Method not allowed"], 405);
        break;
}
?>
