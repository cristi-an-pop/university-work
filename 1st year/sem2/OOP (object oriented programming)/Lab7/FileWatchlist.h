#pragma once
#include "Watchlist.h"

class FileWatchlist : public Watchlist {
protected:
	std::string fileName;
public:
	FileWatchlist(const std::string& fileName) {
		this->fileName = fileName;
	}
	~FileWatchlist() {}
	virtual void writeToFile() = 0;
	virtual void displayWatchlist() = 0;
};