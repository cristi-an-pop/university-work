$(document).ready(function() {
    var recipeId = new URLSearchParams(window.location.search).get('id');

    $.ajax({
        url: 'http://localhost/web/backend/get_recipes.php',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            var recipe = data.find(function(recipe) {
                return recipe.id == recipeId;
            });

            $('#author').val(recipe.author);
            $('#name').val(recipe.name);
            $('#type').val(recipe.type);
            $('#ingredients').val(recipe.ingredients);
            $('#instructions').val(recipe.instructions);
        },
        error: function(error) {
            console.log('Error:', error);
        }
    });

    $('#update-recipe-form').submit(function(e) {
        e.preventDefault();

        var data = {
            id: recipeId,
            author: $('#author').val(),
            name: $('#name').val(),
            type: $('#type').val(),
            ingredients: $('#ingredients').val(),
            instructions: $('#instructions').val()
        };

        $.ajax({
            url: 'http://localhost/web/backend/update_recipe.php',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(data),
            success: function(response) {
                if (response.status === 'success') {
                    alert('Recipe updated successfully!');
                    window.location.href = 'index.html';
                } else if (response.status === 'error') {
                    alert('Error updating recipe: ' + response.message);
                }
            },
            error: function(error) {
                console.log('Error:', error);
            }
        });
    });
});