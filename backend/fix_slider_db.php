<?php
$host = 'localhost';
$db   = 'evergreen_coir';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

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

    // Normalize the existing first-branding slide to the new V2 Products name.
    $stmt = $pdo->prepare("
        UPDATE hero_slides
        SET title = 'V2 Products'
        WHERE LOWER(TRIM(title)) IN (
            'evergreen premium coir',
            'ever green coir',
            'evergreen coir'
        )
    ");
    $stmt->execute();

    $count = $pdo->query("SELECT COUNT(*) FROM hero_slides")->fetchColumn();
    if ($count == 0) {
        $pdo->prepare("INSERT INTO hero_slides (image_url, badge_text, title, subtitle, button_primary_text, button_secondary_text, order_index) VALUES (?, ?, ?, ?, ?, ?, ?)")
            ->execute([
                'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1600&h=800&fit=crop',
                'CERTIFIED MANUFACTURER',
                'V2 Products',
                'Eco-friendly solutions for modern landscaping, gardening, and erosion control. Trusted by 500+ global clients.',
                'VIEW OUR RANGE',
                'GET CUSTOM QUOTE',
                0
            ]);
        echo "Default V2 Products slide inserted.\n";
    }

    echo "Hero Slider database setup and V2 Products migration complete successfully.";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>