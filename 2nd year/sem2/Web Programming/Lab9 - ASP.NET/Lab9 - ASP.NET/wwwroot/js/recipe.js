function getAllRecipes() {
    $.ajax({
        url: '/Recipes/Index',
        type: 'GET',
        success: (data) => {
            console.log(data);
            $('#recipesTable').html(data);
        },
        error: (error) => {
            console.log(error.responseText);
        }
    }); 
};

function filterRecipes() {
    var filterType = $('#filterType').val();

    $.ajax({
        url: '/Recipes/Index?filterType=' + filterType,
        type: 'GET',
        success: (data) => {
            console.log(data);
            $('#recipesTable').html(data);
        },
        error: (error) => {
            console.log(error.responseText);
        }
    })
}

window.onload = () => {
    const filterOption = $('#filterType').val();

    if (filterOption === 'All Types') {
        getAllRecipes();
    } else {
        filterRecipes();
    }
}