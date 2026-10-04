<?php
if (php_sapi_name() === 'cli') {
    $_SERVER['REQUEST_METHOD'] = 'GET';
}
require 'config.php';

try {
    // Get categories mapping (slug -> id)
    $stmt = $pdo->query("SELECT id, slug FROM categories");
    $slugToId = [];
    while ($row = $stmt->fetch()) {
        $slugToId[$row['slug']] = $row['id'];
    }

    // Get all products
    $stmt = $pdo->query("SELECT id, name FROM products");
    $products = $stmt->fetchAll();

    foreach ($products as $p) {
        $name = strtolower($p['name']);
        $targetSlug = null;
        
        if (strpos($name, 'pot') !== false) $targetSlug = 'coir-pot';
        else if (strpos($name, 'stick') !== false) $targetSlug = 'moss-sticks';
        else if (strpos($name, 'peat') !== false || strpos($name, 'pith') !== false || strpos($name, 'block') !== false) $targetSlug = 'cocopeat-products';
        else if (strpos($name, 'mat') !== false) $targetSlug = 'coir-mat';
        else if (strpos($name, 'mulch') !== false) $targetSlug = 'mulch-mats';
        else $targetSlug = 'new-items';

        if ($targetSlug && isset($slugToId[$targetSlug])) {
            $pdo->prepare("UPDATE products SET category_id = ? WHERE id = ?")
                ->execute([$slugToId[$targetSlug], $p['id']]);
            echo "Linked '{$p['name']}' to '{$targetSlug}'\n";
        }
    }
    echo "Product-Category linking complete.\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
