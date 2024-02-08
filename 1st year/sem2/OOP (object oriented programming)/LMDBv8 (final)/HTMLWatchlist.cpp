#include "HTMLWatchlist.h"
#include "RepositoryExceptions.h"
#include <fstream>
#include <Windows.h>

void HTMLWatchlist::writeToFile() {
	std::ofstream file(this->fileName);
	if (!file.is_open())
		throw FileException("The file could not be opened!");
	file << "<!DOCTYPE html>\n";
	file << "<html>\n";
	file << "<head>\n";
	file << "<title>Watchlist</title>\n";
	file << "</head>\n";
	file << "<body>\n";
	file << "<table border=\"1\">\n";
	file << "\t<tr>\n";
	file << "\t\t<td>Title</td>\n";
	file << "\t\t<td>Genre</td>\n";
	file << "\t\t<td>Year</td>\n";
	file << "\t\t<td>Likes</td>\n";
	file << "\t\t<td>Trailer</td>\n";
	file << "\t</tr>\n";
	for (auto m : this->movies) {
		file << "\t<tr>\n";
		file << "\t\t<td>" << m.getTitle() << "</td>\n";
		file << "\t\t<td>" << m.getGenre() << "</td>\n";
		file << "\t\t<td>" << m.getYear() << "</td>\n";
		file << "\t\t<td>" << m.getLikes() << "</td>\n";
		file << "\t\t<td><a href=\"" << m.getTrailer() << "\">Link</a></td>\n";
		file << "\t</tr>\n";
	}
	file << "</table>\n";
	file << "</body>\n";
	file << "</html>\n";
	file.close();
}

void HTMLWatchlist::displayWatchlist() {
	ShellExecuteA(NULL, NULL, "chrome.exe", this->fileName.c_str(), NULL, SW_SHOWMAXIMIZED);
}