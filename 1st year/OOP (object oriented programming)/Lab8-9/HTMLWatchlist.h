#pragma once
#include "FileWatchlist.h"

class HTMLWatchlist : public FileWatchlist {
public:
	HTMLWatchlist(const std::string& fileName) : FileWatchlist(fileName) {}
	~HTMLWatchlist() {}
	void writeToFile() override;
	void displayWatchlist() override;
};