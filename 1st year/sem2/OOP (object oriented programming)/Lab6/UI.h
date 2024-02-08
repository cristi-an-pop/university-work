#pragma once
#include "Controller.h"

class UI {
private:
	Controller controller;

public:
	// Default constructor
	UI(const Controller controller);

	void run();
	void printAdminMenu();
	void printUserMenu();

	// Admin:
	void addMovie();
	void deleteMovie();
	void updateMovie();
	void listAllMovies();

	// User:
	void seeMoviesByGenre();
	void deleteMovieFromWatchlist();
	void seeMoviesFromWatchlist();

};