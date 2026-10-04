<?php
require_once 'config.php';

try {
    $stmt = $pdo->query("DESCRIBE categories");
    $structure = $stmt->fetchAll();
    echo json_encode($structure, JSON_PRETTY_PRINT);
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
