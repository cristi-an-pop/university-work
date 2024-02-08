#include "UI.h"
#include "Tests.h"
#include "RepositoryExceptions.h"
#include "CSVWatchlist.h"
#include "HTMLWatchlist.h"
#include <iostream>

using namespace std;

int main() {

	try {
		Repository repo("movies.txt");
		FileWatchlist* w = nullptr;
		cout << "1 - CSV\n2 - HTML\n";
		int option;
		cin >> option;
		if (option == 1)
			w = new CSVWatchlist("watchlist.csv");
		else if (option == 2)
			w = new HTMLWatchlist("watchlist.html");
		else {
			cout << "Invalid option!\n";
			return 1;
		}
		Controller ctrl(repo, w, MovieValidator{});
		UI ui(ctrl);
		ui.run();
		delete w;
	}
	catch (FileException&) {
		cout << "Repository file could not be opened! The application will terminate." << endl;
		return 1;
	}
	//testAll();
	//Repository repo;
	//Controller ctrl(repo, MovieValidator{});
	//UI ui(ctrl);
	//ui.run();
	return 0;
}