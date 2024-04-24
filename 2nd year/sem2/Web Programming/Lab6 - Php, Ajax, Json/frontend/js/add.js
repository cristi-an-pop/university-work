$(document).ready(function() {
    $('#add-recipe-form').on('submit', function(e) {
        e.preventDefault();

        var author = $('#author').val();
        var name = $('#name').val();
        var type = $('#type').val();
        var ingredients = $('#ingredients').val();
        var instructions = $('#instructions').val();

        $.ajax({
            url: 'http://localhost/web/backend/add_recipe.php',
            type: 'POST',
            dataType: 'json', 
            data: {
                author: author,
                name: name,
                type: type,
                ingredients: ingredients,
                instructions: instructions
            },
            success: function(data) {
                if (data.status === 'success') {
                    alert('Recipe added successfully!');
                } else if (data.status === 'error') {
                    alert('Error adding recipe: ' + data.message);
                }
        
                $('#add-recipe-form')[0].reset();
                fetchRecipes();
                window.location.href = 'index.html';
            },
            error: function(error) {
                console.log('Error:', error);
            }
        });
    });
});