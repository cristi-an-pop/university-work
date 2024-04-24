<?php
header('Content-Type: application/json');
include 'db_config.php';

function addRecipe($author, $name, $type, $ingredients, $instructions) {
    global $conn;

    if (empty($author) || empty($name) || empty($type) || empty($ingredients) || empty($instructions)) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
        return;
    }

    $author = $conn->real_escape_string($author);
    $name = $conn->real_escape_string($name);
    $type = $conn->real_escape_string($type);
    $ingredients = $conn->real_escape_string($ingredients);
    $instructions = $conn->real_escape_string($instructions);

    $sql = "INSERT INTO recipes (author, name, type, ingredients, instructions) VALUES ('$author', '$name', '$type', '$ingredients', '$instructions')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => $conn->error]);
    }
}

$author = isset($_POST['author']) ? $_POST['author'] : '';
$name = isset($_POST['name']) ? $_POST['name'] : '';
$type = isset($_POST['type']) ? $_POST['type'] : '';
$ingredients = isset($_POST['ingredients']) ? $_POST['ingredients'] : '';
$instructions = isset($_POST['instructions']) ? $_POST['instructions'] : '';

addRecipe($author, $name, $type, $ingredients, $instructions);
?>
