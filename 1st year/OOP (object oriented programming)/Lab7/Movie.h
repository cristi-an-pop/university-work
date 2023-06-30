#pragma once
#include <string>

class Movie {
private:
	std::string title;
	std::string genre;
	int year;
	int likes;
	std::string trailer;

public:
	// Default constructor
	Movie();

	// Constructor with parameters
	Movie(const std::string title, const std::string genre, const int year, const int likes, const std::string trailer);

    // Getters
	std::string getTitle() const;
	std::string getGenre() const;
	int getYear() const;
	int getLikes() const;
	std::string getTrailer() const;

	void playTrailer();
	bool operator==(Movie m);

	friend std::istream& operator>>(std::istream& is, Movie& m);
	friend std::ostream& operator<<(std::ostream& os, const Movie& m);
};