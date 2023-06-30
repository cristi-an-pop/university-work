#include "Movie.h"
#include "Util.h"
#include <Windows.h>
#include <iostream>

Movie::Movie() {
	this->title = "";
	this->genre = "";
	this->year = 0;
	this->likes = 0;
	this->trailer = "";
}

Movie::Movie(const std::string title, const std::string genre, const int year, const int likes, const std::string trailer) {
	this->title = title;
	this->genre = genre;
	this->year = year;
	this->likes = likes;
	this->trailer = trailer;
}

std::string Movie::getTitle() const {
	return this->title;
}

std::string Movie::getGenre() const {
	return this->genre;
}

int Movie::getYear() const {
	return this->year;
}

int Movie::getLikes() const {
	return this->likes;
}

std::string Movie::getTrailer() const {
	return this->trailer;
}

void Movie::playTrailer() {
	ShellExecuteA(NULL, NULL, "chrome.exe", this->getTrailer().c_str(), NULL, SW_SHOWMAXIMIZED);
}

bool Movie::operator==(Movie m) {
	return this->title == m.title && this->genre == m.genre && this->year == m.year;
}

std::istream& operator>>(std::istream& is, Movie& m) {
	std::string line;
	getline(is, line);

	std::vector<std::string> tokens = tokenize(line, ',');
	if (tokens.size() != 5) // make sure all the song data was valid
		return is;

	m.title = tokens[0];
	m.genre = tokens[1];
	m.year = stoi(tokens[2]);
	m.likes = stoi(tokens[3]);
	m.trailer = tokens[4];

	return is;
}

std::ostream& operator<<(std::ostream& os, const Movie& m) {
	os << m.title << "," << m.genre << "," << m.year << "," << m.likes << "," << m.trailer << "\n";
	return os;
}