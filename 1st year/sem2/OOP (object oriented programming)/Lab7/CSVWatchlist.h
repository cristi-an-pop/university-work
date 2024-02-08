#pragma once
#include "FileWatchlist.h"

class CSVWatchlist : public FileWatchlist {
public:
	CSVWatchlist(const std::string& fileName) : FileWatchlist(fileName) {}
	~CSVWatchlist() {}
	void writeToFile() override;
	void displayWatchlist() override;
};