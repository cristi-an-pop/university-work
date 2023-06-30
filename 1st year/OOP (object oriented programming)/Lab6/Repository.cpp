#include "Repository.h"
#include <algorithm>

bool Repository::addMovie(const Movie m) {
	if (std::find(this->movies.begin(), this->movies.end(), m) != this->movies.end())
		return false;
	this->movies.push_back(m);
	return true;
}

bool Repository::deleteMovie(const Movie m) {
	auto it = std::find(this->movies.begin(), this->movies.end(), m);
	if (it == this->movies.end())
		return false;
	this->movies.erase(it);
	return true;
}

bool Repository::updateMovie(const Movie m, const Movie new_m) {
	auto it = std::find(this->movies.begin(), this->movies.end(), m);
	if (it == this->movies.end())
		return false;
	*it = new_m;
	return true;
}

int Repository::findMovie(const Movie m) {
	auto it = std::find(this->movies.begin(), this->movies.end(), m);
	if (it == this->movies.end())
		return -1;
	return std::distance(this->movies.begin(), it);
}

void Repository::updateLikes(const Movie m) {
	auto it = std::find(this->movies.begin(), this->movies.end(), m);
	if (it == this->movies.end())
		return;
	Movie old_m = m;
	Movie new_m = Movie(old_m.getTitle(), old_m.getGenre(), old_m.getYear(), old_m.getLikes() + 1, old_m.getTrailer());
	*it = new_m;
}


