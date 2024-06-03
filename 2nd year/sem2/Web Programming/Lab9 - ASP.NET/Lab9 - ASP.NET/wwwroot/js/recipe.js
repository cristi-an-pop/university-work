function filterRecipes() {
    var filterType = $('#filterType').val();

    $.ajax({
        url: '/Recipes/GetFilteredRecipes?filterType=' + filterType,
        type: 'GET',
        success: (data) => {
            console.log(data);
            $('#recipesTable').html(data);
        },
        error: (error) => {
            console.log(error);
        }
    })
}