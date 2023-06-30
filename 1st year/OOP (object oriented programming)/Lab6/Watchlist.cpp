#include "Watchlist.h"
#include <algorithm>

Watchlist::Watchlist() {
	this->current = 0;
}

bool Watchlist::add(const Movie m) {
	if (std::find(movies.begin(), movies.end(), m) != movies.end())
		return false;
	movies.push_back(m);
	return true;
}

bool Watchlist::deleteMovie(const Movie m) {
	auto it = std::find(movies.begin(), movies.end(), m);
	if (it == movies.end())
		return false;
	movies.erase(it);
	return true;
}

Movie Watchlist::getCurrentMovie() {
	if (this->movies.empty()) {
		return Movie();
	}
	return this->movies[this->current];
}

int Watchlist::findMovie(const Movie m) {
	auto it = std::find(movies.begin(), movies.end(), m);
	if (it == movies.end())
		return -1;
	return (int)std::distance(movies.begin(), it);
}

void Watchlist::play() {
	if (this->movies.empty()) {
		return;
	}
	Movie m = this->getCurrentMovie();
	m.playTrailer();
}

void Watchlist::next() {
	if (this->movies.empty()) 
		return; {
	}
	this->current++;
	if (this->current == this->movies.size()) 
		this->current = 0; {
	}
}

bool Watchlist::isEmpty() {
	return this->movies.empty();
}

