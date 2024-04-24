<?php
include 'db_config.php';

function deleteRecipe($recipe_id) {
    global $conn;

    if (!isset($recipe_id) || !is_numeric($recipe_id)) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid recipe ID']);
        return;
    }

    $recipe_id = $conn->real_escape_string($recipe_id);
    $sql = "DELETE FROM recipes WHERE recipe_id = '$recipe_id'";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to delete recipe']);
    }
}

$recipe_id = isset($_GET['id']) ? $_GET['id'] : '';

deleteRecipe($recipe_id);
?>
