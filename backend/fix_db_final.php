<?php
$host = 'localhost';
$db   = 'evergreen_coir';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host", $user, $pass);
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    $pdo->exec("USE `$db`");
    
    // Create Categories table if it doesn't exist
    $pdo->exec("CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE,
        description TEXT,
        image_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");

    // Ensure columns exist (in case partially created)
    $stmt = $pdo->query("SHOW COLUMNS FROM categories LIKE 'slug'");
    if (!$stmt->fetch()) $pdo->exec("ALTER TABLE categories ADD COLUMN slug VARCHAR(255) AFTER name, ADD UNIQUE (slug)");
    
    $stmt = $pdo->query("SHOW COLUMNS FROM categories LIKE 'description'");
    if (!$stmt->fetch()) $pdo->exec("ALTER TABLE categories ADD COLUMN description TEXT AFTER slug");

    // Populate data
    $categories = [
        ['name' => 'Coir Pot', 'slug' => 'coir-pot', 'description' => 'We are a leading Manufacturer of coco coir 4 inch pot, coco coir pot & hanging set in various sizes, coco coir wall hanging basket, round coir pot, coco coir hanging conical and 10 inch coco coir hanging pot from Pollachi, India.'],
        ['name' => 'Moss Sticks', 'slug' => 'moss-sticks', 'description' => 'Providing you the best range of coir moss sticks, garden plant moss stick, plants moss stick, moss stick in coir, coconut fiber moss stick and coco moss coir sticks with effective & timely delivery.'],
        ['name' => 'Cocopeat Products', 'slug' => 'cocopeat-products', 'description' => 'Our range of products include cocopeat coir pellets, rectangular cocopeat brick, coco coir roll, brown coco coir scrubber, coco coir mint tray and coco coir scrubber.'],
        ['name' => 'Coir Mat', 'slug' => 'coir-mat', 'description' => 'Our product range includes a wide range of coco coir mulch mat, woven coir roll, weed mulching mat, coir mulch mats for gardening, jute mulch mat and coir mulch mat.'],
        ['name' => 'Mulch Mats', 'slug' => 'mulch-mats', 'description' => 'Offering you a complete choice of products which include coir mulch mat(weed control mat).'],
        ['name' => 'New Items', 'slug' => 'new-items', 'description' => 'Innovative new coir applications including needles felt and specialized ropes.']
    ];

    foreach ($categories as $cat) {
        $stmt = $pdo->prepare("SELECT id FROM categories WHERE name = ?");
        $stmt->execute([$cat['name']]);
        if ($row = $stmt->fetch()) {
            $pdo->prepare("UPDATE categories SET slug = ?, description = ? WHERE id = ?")
                ->execute([$cat['slug'], $cat['description'], $row['id']]);
        } else {
            $pdo->prepare("INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)")
                ->execute([$cat['name'], $cat['slug'], $cat['description']]);
        }
    }
    
    echo "Database setup complete.";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
