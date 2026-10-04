<?php
require_once 'config.php';

try {
    $sql = "CREATE TABLE IF NOT EXISTS feedbacks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        reviewer_name VARCHAR(255) NOT NULL,
        location VARCHAR(255),
        product_name VARCHAR(255) NOT NULL,
        rating INT DEFAULT 5,
        review_text TEXT,
        metric_response BOOLEAN DEFAULT FALSE,
        metric_quality BOOLEAN DEFAULT FALSE,
        metric_delivery BOOLEAN DEFAULT FALSE,
        seller_response TEXT,
        response_date TIMESTAMP NULL,
        status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    
    $pdo->exec($sql);
    echo "Table 'feedbacks' created successfully.\n";
    
    // Check if table is empty
    $stmt = $pdo->query("SELECT COUNT(*) FROM feedbacks");
    if ($stmt->fetchColumn() == 0) {
        $dummy = "INSERT INTO feedbacks (reviewer_name, location, product_name, rating, review_text, metric_response, metric_quality, metric_delivery, seller_response, response_date, status) 
                  VALUES 
                  ('LIL EVE MICROGREENS', 'SECUNDERABAD, TELANGANA', 'Coir Mats', 5, 'Excellent product. Ordered non-latex coir roll, which came in good condition.', 1, 1, 1, 'Thank you very much for your valuable feedback', '2024-02-11 10:00:00', 'Approved')";
        
        $pdo->exec($dummy);
        echo "Dummy data inserted.\n";
    }

} catch (PDOException $e) {
    echo "Exception: " . $e->getMessage() . "\n";
}
?>
