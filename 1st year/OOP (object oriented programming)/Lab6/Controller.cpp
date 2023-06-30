#include "Controller.h"

bool Controller::addMovie(const Movie m) {
	if (this->repository.addMovie(m)) {
		return true;
	}
	return false;
}

bool Controller::deleteMovie(const Movie m) {
	if (this->repository.deleteMovie(m)) {
		return true;
	}
	return false;
}

bool Controller::updateMovie(const Movie m, const Movie new_m) {
	if (this->repository.updateMovie(m, new_m)) {
		return true;
	}
	return false;
}

bool Controller::addMovieToWatchlist(const Movie m) {
	if (this->watchlist.add(m)) {
		return true;
	}
	return false;
}

bool Controller::deleteMovieFromWatchlist(const Movie m) {
	if (this->watchlist.deleteMovie(m)) {
		return true;
	}
	return false;
}

void Controller::startWatchlist() {
	this->watchlist.play();
}

void Controller::nextMovie() {
	this->watchlist.next();
}

Movie Controller::getCurrentMovie() {
	return this->watchlist.getCurrentMovie();
}

bool Controller::isEmptyWatchlist() {
	return this->watchlist.isEmpty();
}

Watchlist Controller::filterMoviesByGenre(const std::string genre) {
	Watchlist filteredWatchlist;
	std::vector<Movie> movies = this->repository.getMovies();

	for (int i = 0; i < movies.size(); i++) {
		Movie m = movies[i];
		if (m.getGenre() == genre) {
			filteredWatchlist.add(m);
		}
	}

	return filteredWatchlist;
}

void Controller::updateLikes(Movie m) {
	this->repository.updateLikes(m);
}