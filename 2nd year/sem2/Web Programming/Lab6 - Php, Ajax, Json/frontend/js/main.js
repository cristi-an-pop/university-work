$(document).ready(function() {
    fetchRecipes();

    var filterType = $('#type-filter').val();
    $('#recipe-list').on('click', '.delete-recipe', function() {
        var recipeId = $(this).data('id');
        console.log(recipeId);

        $.ajax({
            url: 'http://localhost/web/backend/delete_recipe.php?id=' + recipeId,
            type: 'DELETE',
            success: function(response) {
                alert('Recipe deleted successfully!');
                fetchRecipes();
            },
            error: function(error) {
                console.log('Error:', error);
            }
        });
    });

    $('#type-filter').on('change', function() {
        var selectedType = $(this).val();
        if(filterType === null || filterType === '') {
            filterType = 'All Types';
        }
        $('#prev-filter').empty().append(`<h3>Previous filter: ${filterType}</h3>`);
        filterType = $('#type-filter').val();
        filterRecipes(selectedType);
    });
});

function fetchRecipes() {
    $.ajax({
        url: 'http://localhost/web/backend/get_recipes.php',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            $('#recipe-list').data('recipes', data);
            renderRecipes(data);
            populateTypeFilter(data);
        },
        error: function(error) {
            console.log('Error: ', error);
        }
    });
}

function renderRecipes(recipes) {
    $('#recipe-list').empty();
    $.each(recipes, function(index, recipe) {
        var recipeCard = `
            <div class="card mb-3" id="recipe-${recipe.id}">
                <div class="card-body">
                    <h5 class="card-title">${recipe.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${recipe.author}</h6>
                    <p class="card-text"><strong>Type:</strong> ${recipe.type}</p>
                    <p class="card-text"><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                    <p class="card-text"><strong>Instructions:</strong> ${recipe.instructions}</p>
                    <div class="btn-group" role="group" aria-label="Recipe Actions">
                        <button type="button" class="btn btn-outline-primary" onclick="window.location.href='update_recipe.html?id=${recipe.id}'">Update</button>
                        <button type="button" class="btn btn-outline-danger delete-recipe" data-id="${recipe.id}">Delete</button>
                    </div>
                </div>
            </div>`;
        $('#recipe-list').append(recipeCard);
    });
}

function populateTypeFilter(recipes) {
    var types = new Set();
    $.each(recipes, function(index, recipe) {
        types.add(recipe.type);
    });
    $('#type-filter').empty().append('<option value="">All Types</option>');
    types.forEach(function(type) {
        $('#type-filter').append(`<option value="${type}">${type}</option>`);
    });
}

function filterRecipes(type) {
    var recipes = $('#recipe-list').data('recipes');
    if (type === '') {
        renderRecipes(recipes);
    } else {
        var filteredRecipes = recipes.filter(function(recipe) {
            return recipe.type === type;
        });
        renderRecipes(filteredRecipes);
    }
}
