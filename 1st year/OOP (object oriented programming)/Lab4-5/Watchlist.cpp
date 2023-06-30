#include "Watchlist.h"

Watchlist::Watchlist() {
	this->current = 0;
}

bool Watchlist::add(const Movie m) {
	if (this->findMovie(m) != -1)
		return false;
	this->movies.addItem(m);
	return true;
}

bool Watchlist::deleteMovie(const Movie m) {
	int pos = this->findMovie(m);
	if (pos == -1)
		return false;
	this->movies.deleteItem(pos);
	return true;
}

Movie Watchlist::getCurrentMovie() {
	if (this->movies.getSize() == 0)
		return Movie();
	return this->movies.getElement(this->current);
}

int Watchlist::findMovie(const Movie m) {
	for (int i = 0; i < this->movies.getSize(); i++) {
		if(this->movies.getElement(i) == m)
			return i;
	}
	return -1;
}

void Watchlist::play() {
	if (this->movies.getSize() == 0) {
		return;
	}
	Movie m = this->getCurrentMovie();
	m.playTrailer();
}

void Watchlist::next() {
	if (this->movies.getSize() == 0) 
		return; {
	}
	this->current++;
	if (this->current == this->movies.getSize()) 
		this->current = 0; {
	}
}

bool Watchlist::isEmpty() {
	return this->movies.getSize() == 0;
}

