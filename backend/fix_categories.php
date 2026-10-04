<?php
if (php_sapi_name() === 'cli') {
    $_SERVER['REQUEST_METHOD'] = 'GET';
}
require 'config.php';

try {
    // Check if description column exists
    $stmt = $pdo->query("SHOW COLUMNS FROM categories LIKE 'description'");
    if (!$stmt->fetch()) {
        $pdo->exec("ALTER TABLE categories ADD COLUMN description TEXT AFTER slug");
    }
    
    $categories = [
        ['name' => 'Coir Pot', 'slug' => 'coir-pot', 'description' => 'We are a leading Manufacturer of coco coir 4 inch pot, coco coir pot & hanging set in various sizes, coco coir wall hanging basket, round coir pot, coco coir hanging conical and 10 inch coco coir hanging pot from Pollachi, India.'],
        ['name' => 'Moss Sticks', 'slug' => 'moss-sticks', 'description' => 'Providing you the best range of coir moss sticks, garden plant moss stick, plants moss stick, moss stick in coir, coconut fiber moss stick and coco moss coir sticks with effective & timely delivery.'],
        ['name' => 'Cocopeat Products', 'slug' => 'cocopeat-products', 'description' => 'Our range of products include cocopeat coir pellets, rectangular cocopeat brick, coco coir roll, brown coco coir scrubber, coco coir mint tray and coco coir scrubber.'],
        ['name' => 'Coir Mat', 'slug' => 'coir-mat', 'description' => 'Our product range includes a wide range of coco coir mulch mat, woven coir roll, weed mulching mat, coir mulch mats for gardening, jute mulch mat and coir mulch mat.'],
        ['name' => 'Mulch Mats', 'slug' => 'mulch-mats', 'description' => 'Offering you a complete choice of products which include coir mulch mat(weed control mat).'],
        ['name' => 'New Items', 'slug' => 'new-items', 'description' => 'Innovative new coir applications including needles felt and specialized ropes.']
    ];

    foreach ($categories as $cat) {
        // Find by name or update/insert
        $stmt = $pdo->prepare("SELECT id FROM categories WHERE name = ?");
        $stmt->execute([$cat['name']]);
        $row = $stmt->fetch();
        
        if ($row) {
            $pdo->prepare("UPDATE categories SET slug = ?, description = ? WHERE id = ?")
                ->execute([$cat['slug'], $cat['description'], $row['id']]);
            echo "Updated: {$cat['name']}\n";
        } else {
            $pdo->prepare("INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)")
                ->execute([$cat['name'], $cat['slug'], $cat['description']]);
            echo "Inserted: {$cat['name']}\n";
        }
    }
    echo "Categories updated successfully.\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
