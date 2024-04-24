<?php
include 'db_config.php';

function updateRecipe($recipe_id, $author, $name, $type, $ingredients, $instructions) {

    global $conn;
    $recipe_id = $conn->real_escape_string($recipe_id);
    $author = $conn->real_escape_string($author);
    $name = $conn->real_escape_string($name);
    $type = $conn->real_escape_string($type);
    $ingredients = $conn->real_escape_string($ingredients);
    $instructions = $conn->real_escape_string($instructions);
    $sql = "UPDATE recipes SET author = '$author', name = '$name', type = '$type', ingredients = '$ingredients', instructions = '$instructions' WHERE recipe_id = '$recipe_id'";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => $conn->error]);
    }
}

$postData = file_get_contents('php://input');

$data = json_decode($postData, true);

if (isset($data['id']) && isset($data['author']) && isset($data['name']) && isset($data['type']) && isset($data['ingredients']) && isset($data['instructions'])) {
    $recipe_id = $data['id'];
    $author = $data['author'];
    $name = $data['name'];
    $type = $data['type'];
    $ingredients = $data['ingredients'];
    $instructions = $data['instructions'];

    updateRecipe($recipe_id, $author, $name, $type, $ingredients, $instructions);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Missing POST data']);
}
?>