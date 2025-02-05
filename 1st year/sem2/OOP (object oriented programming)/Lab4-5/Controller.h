#pragma once
#include "Repository.h"
#include "Watchlist.h"

class Controller {
private:
	Repository repository;
	Watchlist watchlist;

public:
	// Default constructor
	Controller(const Repository repository) { this->repository = repository; };

	// Admin:

	// add a movie to the repository
	// input: m - Movie
	// output: true - if the movie was added
	//		   false - if the movie was not added
	bool addMovie(const Movie m);

	// delete a movie from the repository
	// input: m - Movie
	// output: true - if the movie was deleted
	//		   false - if the movie was not deleted
	bool deleteMovie(const Movie m);

	// update a movie from the repository
	// input: m - Movie
	// output: true - if the movie was updated
	//		   false - if the movie was not updated
	bool updateMovie(const Movie m, const Movie new_m);

	// get all the movies from the repository
	// output: the movies from the repository
	DynamicVector<Movie> getAllMovies() { return this->repository.getMovies(); };

	// User:

	// add a movie to the watchlist
	// input: m - Movie
	// output: true - if the movie was added
	//		   false - if the movie was not added
	bool addMovieToWatchlist(const Movie m);

	// delete a movie from the watchlist
	// input: m - Movie
	// output: true - if the movie was deleted
	//		   false - if the movie was not deleted
	bool deleteMovieFromWatchlist(const Movie m);

	// start the watchlist
	void startWatchlist();

	// next movie from the watchlist
	void nextMovie();

	Movie getCurrentMovie();

	bool isEmptyWatchlist();

	// filter movies by genre
	// input: genre - string
	Watchlist filterMoviesByGenre(const std::string genre);

	void updateLikes(Movie m);
};