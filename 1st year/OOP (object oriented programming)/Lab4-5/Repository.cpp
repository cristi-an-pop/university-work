#include "Repository.h"

bool Repository::addMovie(const Movie m) {
	if (this->findMovie(m) != -1)
		return false;
	this->movies.addItem(m);
	return true;
}

bool Repository::deleteMovie(const Movie m) {
	int pos = this->findMovie(m);
	if (pos == -1)
		return false;
	this->movies.deleteItem(pos);
	return true;
}

bool Repository::updateMovie(const Movie m, const Movie new_m) {
	int pos = this->findMovie(m);
	if (pos == -1)
		return false;
	this->movies.updateItem(pos, new_m);
	return true;
}

int Repository::findMovie(const Movie m) {
	for (int i = 0; i < this->movies.getSize(); i++)
		if (this->movies.getElement(i) == m)
			return i;
	return -1;
}

void Repository::updateLikes(const Movie m) {
	int pos = this->findMovie(m);
	if (pos == -1)
		return;
	Movie old_m = this->movies.getElement(pos);
	Movie new_m = Movie(old_m.getTitle(), old_m.getGenre(), old_m.getYear(), old_m.getLikes() + 1, old_m.getTrailer());
	this->movies.updateItem(pos, new_m);
}


