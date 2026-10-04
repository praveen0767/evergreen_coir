<?php
$host = 'localhost';
$db   = 'evergreen_coir';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Create hero_slides table
    $pdo->exec("CREATE TABLE IF NOT EXISTS hero_slides (
        id INT AUTO_INCREMENT PRIMARY KEY,
        image_url VARCHAR(255),
        badge_text VARCHAR(255) DEFAULT 'CERTIFIED MANUFACTURER',
        title VARCHAR(255),
        subtitle TEXT,
        button_primary_text VARCHAR(255) DEFAULT 'VIEW OUR RANGE',
        button_secondary_text VARCHAR(255) DEFAULT 'GET CUSTOM QUOTE',
        order_index INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");
    
    // Check if any slides exist, if not insert default
    $count = $pdo->query("SELECT COUNT(*) FROM hero_slides")->fetchColumn();
    if ($count == 0) {
        $pdo->prepare("INSERT INTO hero_slides (image_url, title, subtitle) VALUES (?, ?, ?)")
            ->execute([
                'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1600&h=800&fit=crop', 
                'PREMIUM COIR PRODUCTS FOR SUSTAINABLE GROWTH', 
                'Eco-friendly solutions for modern landscaping, gardening, and erosion control. Trusted by 500+ global clients.'
            ]);
        echo "Default slide inserted.\n";
    }

    echo "Hero Slider database setup complete successfully.";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
