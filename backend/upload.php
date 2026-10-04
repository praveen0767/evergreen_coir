<?php
require_once 'config.php';

// Create uploads directory if not exists
$uploadDir = 'uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    if (!isset($_FILES['file'])) {
        jsonResponse(["error" => "No file uploaded"], 400);
    }

    $file = $_FILES['file'];
    $fileName = time() . '_' . basename($file['name']);
    $targetPath = $uploadDir . $fileName;
    $fileType = strtolower(pathinfo($targetPath, PATHINFO_EXTENSION));

    // Allow certain file formats
    $allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'webp'];
    if (!in_array($fileType, $allowedTypes)) {
        jsonResponse(["error" => "Only JPG, JPEG, PNG, GIF, WEBP & PDF files are allowed."], 400);
    }

    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        // Return full URL for the client
        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
        $host = $_SERVER['HTTP_HOST'];
        $folder = dirname($_SERVER['PHP_SELF']);
        $fileUrl = "$protocol://$host$folder/$targetPath";
        
        jsonResponse([
            "success" => true,
            "url"     => $fileUrl,
            "path"    => $targetPath,
            "message" => "File uploaded successfully"
        ]);
    } else {
        jsonResponse(["error" => "Failed to move uploaded file."], 500);
    }
}

jsonResponse(["message" => "Method not allowed"], 405);
?>
