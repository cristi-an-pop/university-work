#include "CSVWatchlist.h"
#include "RepositoryExceptions.h"
#include <fstream>
#include <Windows.h>

void CSVWatchlist::writeToFile() {
	std::ofstream file(this->fileName);
	if (!file.is_open())
		throw FileException("The file could not be opened!");
	for (auto m : this->movies)
		file << m;
	file.close();
}

void CSVWatchlist::displayWatchlist() {
	ShellExecuteA(NULL, NULL, "C:\\Program Files\\Microsoft Office\\root\\Office16\\EXCEL.EXE", this->fileName.c_str(), NULL, SW_SHOWMAXIMIZED);
}