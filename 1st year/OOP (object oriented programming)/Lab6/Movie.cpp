#include "Movie.h"
#include <Windows.h>

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