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

	Movie m3 = Movie();
	assert(m3.getTitle() == "");
	assert(m3.getGenre() == "");
	m3.playTrailer();
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
	assert(repo.addMovie(m) == true);
	assert(repo.findMovie(m) == 0);
	Movie m2 = Movie("Titanic", "Drama", 1987, 210, "https://www.youtube.com/watch?v=2e-eXJ6HgkQ");
	assert(repo.findMovie(m2) == -1);
}

void testWatchlist() {
	std::cout << "Testing Watchlist class...\n";

	Watchlist watchlist;
	Movie m = Movie("Titanic", "Drama", 1997, 210, "https://www.youtube.com/watch?v=2e-eXJ6HgkQ");
	watchlist.add(m);
	assert(watchlist.isEmpty() == false);
	assert(watchlist.findMovie(m) == 0);
	assert(watchlist.deleteMovie(m) == true);
	assert(watchlist.isEmpty() == true);
	Movie m2 = Movie("Titanic", "Drama", 1987, 210, "https://www.youtube.com/watch?v=2e-eXJ6HgkQ");
	watchlist.add(m2);
	assert(watchlist.findMovie(m2) == 0);
	assert(watchlist.deleteMovie(m2) == true);
	assert(watchlist.isEmpty() == true);
	assert(watchlist.findMovie(m2) == -1);
	watchlist.add(m2);
	watchlist.play();
	watchlist.next();
	Movie m3 = watchlist.getCurrentMovie();
	watchlist.add(m2);
	watchlist.deleteMovie(m2);
	watchlist.deleteMovie(m2);
	watchlist.next();
	watchlist.play();


}
/*
void testController() {
	std::cout << "Testing Controller class...\n";

	Repository repo;
	Controller ctrl = Controller(repo, MovieValidator{});
	Movie m = Movie("Titanic", "Drama", 1997, 210, "https://www.youtube.com/watch?v=2e-eXJ6HgkQ");
	assert(ctrl.addMovie(m) == true);
	assert(ctrl.addMovie(m) == false);
	assert(ctrl.deleteMovie(m) == true);
	assert(ctrl.deleteMovie(m) == false);
	assert(ctrl.updateMovie(m, m) == false);
	Movie m2 = Movie("Titanic", "Drama", 1997, 210, "https://www.youtube.com/watch?v=2e-eXJ6HgkQ");
	ctrl.addMovie(m2);
	ctrl.updateLikes(m2);
	Movie m5 = Movie("ok", "ok", 1, 1, "");
	ctrl.updateLikes(m5);
	assert(ctrl.addMovieToWatchlist(m2) == true);
	assert(ctrl.isEmptyWatchlist() == false);
	assert(ctrl.deleteMovieFromWatchlist(m2) == true);
	assert(ctrl.isEmptyWatchlist() == true);
	ctrl.startWatchlist();
	ctrl.nextMovie();
	Movie m3 = ctrl.getCurrentMovie();
	ctrl.addMovieToWatchlist(m2);

	ctrl.addMovie(m);
	ctrl.addMovie(m2);
	ctrl.addMovie(m3);

	Movie m4 = Movie("Titanic", "Drama", 2000, 210, "https://www.youtube.com/watch?v=2e-eXJ6HgkQ");
	assert(ctrl.updateMovie(m, m4) == true);
	assert(ctrl.addMovieToWatchlist(m) == false);

	Watchlist watchlist;
	watchlist = ctrl.filterMoviesByGenre("Drama");
}*/

void testAll() {
	testMovie();
	testDynamicVector();
	testRepository();
	testWatchlist();
	//testController();

	std::cout << "All tests passed!\n";
}