#include <iostream>
#include "UI.h"

UI::UI(const Controller controller) : controller{ controller } {}

void UI::run() {
	while (true) {
		std::cout << "<< MENU - Movie Database >>\n";

		std::cout << "1. Administrator\n";
		std::cout << "2. User\n";
		std::cout << "3. Exit\n";

		int option;
		std::cout << "Option: ";
		std::cin >> option;

		switch (option) {
			case 1:
				this->printAdminMenu();
				break;
			case 2:
				this->printUserMenu();
				break;
			case 3:
				return;
			default:
				std::cout << "Invalid option!\n";
				break;
		}
	}
}

void UI::printAdminMenu() {
	while (true) {
		std::cout << "<< ADMINISTRATOR MENU >>\n";
		std::cout << "1. Add movie\n";
		std::cout << "2. Delete movie\n";
		std::cout << "3. Update movie\n";
		std::cout << "4. List all movies\n";
		std::cout << "5. Exit\n";
		int option;
		std::cout << "Option: ";
		std::cin >> option;
		switch (option) {
			case 1:
				this->addMovie();
				break;
			case 2:
				this->deleteMovie();
				break;
			case 3:
				this->updateMovie();
				break;
			case 4:
				this->listAllMovies();
				break;
			case 5:
				return;
			default:
				std::cout << "Invalid option!\n";
				break;
		}
	}
}

void UI::printUserMenu() {
	while (true) {
		std::cout << "1. See the movies by genre\n";
		std::cout << "2. Delete movie from watchlist\n";
		std::cout << "3. See the movies from watchlist\n";
		std::cout << "4. Exit\n";
		int option;
		std::cout << "Option: ";
		std::cin >> option;
		switch (option) {
			case 1:
				this->seeMoviesByGenre();
				break;
			case 2:
			    this->deleteMovieFromWatchlist();
				break;
			case 3:
				this->seeMoviesFromWatchlist();
				break;
			case 4:
				return;
			default:
				std::cout << "Invalid option!\n";
				break;
		}
	}
}

void UI::addMovie() {
	std::string title, genre, trailer;
	int year, likes;
	std::cout << "Title: ";
	std::cin >> title;
	std::cout << "Genre: ";
	std::cin >> genre;
	std::cout << "Year: ";
	std::cin >> year;
	std::cout << "Likes: ";
	std::cin >> likes;
	std::cout << "Trailer: ";
	std::cin >> trailer;
	Movie m{ title, genre, year, likes, trailer };
	if (this->controller.addMovie(m))
		std::cout << "Movie added!\n";
	else
		std::cout << "Movie already exists!\n";
}

void UI::deleteMovie() {
	std::string title, genre;
	int year;
	std::cout << "Title: ";
	std::cin >> title;
	std::cout << "Genre: ";
	std::cin >> genre;
	std::cout << "Year: ";
	std::cin >> year;
	Movie m{ title, genre, year, 0, "" };
	if (this->controller.deleteMovie(m))
		std::cout << "Movie deleted!\n";
	else
		std::cout << "Movie does not exist!\n";
}

void UI::updateMovie() {
	std::string title, genre, newTitle, newGenre, newTrailer;
	int year, newYear, newLikes;
	std::cout << "Title: ";
	std::cin >> title;
	std::cout << "Genre: ";
	std::cin >> genre;
	std::cout << "Year: ";
	std::cin >> year;
	std::cout << "New Title: ";
	std::cin >> newTitle;
	std::cout << "New Genre: ";
	std::cin >> newGenre;
	std::cout << "New Year: ";
	std::cin >> newYear;
	std::cout << "New Likes: ";
	std::cin >> newLikes;
	std::cout << "New Trailer: ";
	std::cin >> newTrailer;

	Movie m{ title, genre, year, 0, "trailer" };
	Movie new_m{ newTitle, newGenre, newYear, newLikes, newTrailer };
	if (this->controller.updateMovie(m, new_m))
		std::cout << "Movie updated!\n";
	else
		std::cout << "Movie does not exist!\n";
}

void UI::listAllMovies() {
	DynamicVector<Movie> movies = this->controller.getAllMovies();
	Movie m;
	for (int i = 0; i < movies.getSize(); i++) {
		m = movies.getElement(i);
		std::cout << m.getTitle() << " " << m.getGenre() << " " << m.getYear() << " " << m.getLikes() << " " << m.getTrailer() << "\n";
	}
}

void UI::seeMoviesByGenre() {
	std::string genre;
	std::cout << "Genre: ";
	std::cin >> genre;

	Watchlist w = this->controller.filterMoviesByGenre(genre);
	Movie m;
	
	while (!w.isEmpty()) {
		w.play();
		m = w.getCurrentMovie();
		std::cout << m.getTitle() << "\n" << m.getGenre() << "\n" << m.getYear() << "\n" << m.getLikes() << "\n" << m.getTrailer() << "#####\n";
		std::cout << "1. Next movie\n";
		std::cout << "2. Add to watchlist\n";
		std::cout << "3. Exit\n";

		int option;
		std::cout << "Option: ";
		std::cin >> option;
		switch (option) {
			case 1:
				w.next();
				break;
			case 2:
				this->controller.addMovieToWatchlist(m);
				w.deleteMovie(m);
				break;
			case 3:
				return;
			default:
				std::cout << "Invalid option!\n";
				break;
		}
	}
	if (w.isEmpty())
		std::cout << "No movies found!\n";
}

void UI::deleteMovieFromWatchlist() {
	std::string title, genre;
	int year;

	std::cout << "Title: ";
	std::cin >> title;
	std::cout << "Genre: ";
	std::cin >> genre;
	std::cout << "Year: ";
	std::cin >> year;
	std::cout << "Did you like the movie? (y/n) ";
	char option;
	std::cin >> option;
	if (option == 'y') {
		Movie m{ title, genre, year, 0, "" };
		this->controller.updateLikes(m);
	}

	Movie m{ title, genre, year, 0, "" };
	if (this->controller.deleteMovieFromWatchlist(m))
		std::cout << "Movie deleted!\n";
	else
		std::cout << "Movie does not exist!\n";
}

void UI::seeMoviesFromWatchlist() {
	this->controller.startWatchlist();
	Movie m;
	while (!this->controller.isEmptyWatchlist()) {
		m = this->controller.getCurrentMovie();
		std::cout << m.getTitle() << "\n" << m.getGenre() << "\n" << m.getYear() << "\n" << m.getLikes() << "\n" << m.getTrailer() << "#####\n";
		std::cout << "1. Next movie\n";
		std::cout << "2. Exit\n";
		int option;
		std::cout << "Option: ";
		std::cin >> option;
		switch (option) {
			case 1:
				this->controller.nextMovie();
				break;
			case 2:
				return;
			default:
				std::cout << "Invalid option!\n";
				break;
		}
	}
}