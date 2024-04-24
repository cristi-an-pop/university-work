<?php
include 'db_config.php';

function getRecipes() {
    global $conn;
    $sql = "SELECT * FROM recipes";
    $result = $conn->query($sql);
    $recipes = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $recipe = array(
                "id" => $row["recipe_id"],
                "author" => $row["author"],
                "name" => $row["name"],
                "type" => $row["type"],
                "ingredients" => $row["ingredients"],
                "instructions" => $row["instructions"]
            );
            array_push($recipes, $recipe);
        }
    }
    echo json_encode($recipes);
}

getRecipes();
?>