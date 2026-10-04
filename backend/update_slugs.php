<?php
if (php_sapi_name() === 'cli') {
    $_SERVER['REQUEST_METHOD'] = 'GET';
}
require 'config.php';
$stmt = $pdo->query("SELECT id, name FROM categories");
$categories = $stmt->fetchAll();
foreach ($categories as $cat) {
    $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $cat['name'])));
    $pdo->prepare("UPDATE categories SET slug = ? WHERE id = ?")->execute([$slug, $cat['id']]);
    echo "Updated: {$cat['name']} -> {$slug}\n";
}
echo "Slugs updated successfully.\n";
?>
