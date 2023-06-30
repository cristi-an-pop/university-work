#pragma once
#include "Movie.h"
#include "DynamicVector.h"

class Repository {
private:
	DynamicVector<Movie> movies;

public:
	// Default constructor
	Repository() {};
	Repository(const DynamicVector<Movie> movies) { this->movies = movies; };

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

	// find a movie in the repository
	// input: m - Movie
	// output: the position of the movie in the repository
	//		   -1 - if the movie was not found
	int findMovie(const Movie m);

	// get all the movies from the repository
	DynamicVector<Movie> getMovies() const { return this->movies; };

	void updateLikes(Movie m);
};