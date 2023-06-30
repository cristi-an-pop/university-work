#pragma once
#include "DynamicVector.h"
#include "Movie.h"

class Watchlist {
private:
	DynamicVector<Movie> movies;
	int current;

public:
	// Default constructor
	Watchlist();

	// Getters
	int getSize() const { return this->movies.getSize(); };

	// add a movie to the watchlist
	// input: m - Movie
	// output: true - if the movie was added
	//		   false - if the movie was not added
	bool add(const Movie m);

	// delete a movie from the watchlist
	// input: m - Movie
	// output: true - if the movie was deleted
	//		   false - if the movie was not deleted
	bool deleteMovie(const Movie m);

	Movie getCurrentMovie();
	Movie findMovieByInfo(const std::string title, const std::string genre, const int year);

	void next();
	void play();
	bool isEmpty();

private:
	int findMovie(const Movie m);
};