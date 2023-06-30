#include "Tests.h"
#include "Movie.h"
#include "Repository.h"
#include "Controller.h"
#include "Watchlist.h"
#include <assert.h>
#include <iostream>

void testMovie() {
	std::cout << "Testing Movie class...\n";

	Movie m = Movie("Titanic", "Drama", 1997, 210, "https://www.youtube.com/watch?v=2e-eXJ6HgkQ");
	assert(m.getTitle() == "Titanic");
	assert(m.getGenre() == "Drama");
	assert(m.getYear() == 1997);
	assert(m.getLikes() == 210);
	assert(m.getTrailer() == "https://www.youtube.com/watch?v=2e-eXJ6HgkQ");
    
	Movie m2 = Movie("Titanic", "Drama", 1997, 210, "https://www.youtube.com/watch?v=2e-eXJ6HgkQ");
	assert(m == m2);
}

void testDynamicVector() {
	std::cout << "Testing DynamicVector class...\n";

	DynamicVector<int> v;
	assert(v.getSize() == 0);
	assert(v.getCapacity() == 10);
	v.addItem(10);
	assert(v.getSize() == 1);
	assert(v.getCapacity() == 10);
	v.addItem(20);
	assert(v.getSize() == 2);
	assert(v.getCapacity() == 10);
	v.addItem(30);
	v.updateItem(1, 40);
	assert(v.getElement(1) == 40);
	v.deleteItem(1);
	assert(v.getSize() == 2);
	assert(v.getCapacity() == 10);
}

void testRepository() {
	std::cout << "Testing Repository class...\n";

	Repository repo;
	Movie m = Movie("Titanic", "Drama", 1997, 210, "https://www.youtube.com/watch?v=2e-eXJ6HgkQ");
	assert(repo.addMovie(m) == true);
	assert(repo.addMovie(m) == false);
	assert(repo.deleteMovie(m) == true);
	assert(repo.deleteMovie(m) == false);
	assert(repo.updateMovie(m, m) == false);
}

void testWatchlist() {
	std::cout << "Testing Watchlist class...\n";

	Watchlist watchlist;
	Movie m = Movie("Titanic", "Drama", 1997, 210, "https://www.youtube.com/watch?v=2e-eXJ6HgkQ");
	watchlist.add(m);
	assert(watchlist.isEmpty() == false);
}

void testAll() {
	testMovie();
	testDynamicVector();
	testRepository();
	testWatchlist();

	std::cout << "All tests passed!\n";
}