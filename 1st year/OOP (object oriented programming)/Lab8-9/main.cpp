#include "LMDBv8.h"
#include "Repository.h"
#include "FileWatchlist.h"
#include "CSVWatchlist.h"
#include "Controller.h"
#include <memory>
#include <QtWidgets/QApplication>

using namespace std;

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    Repository repository{ "movies.txt" };
    unique_ptr<FileWatchlist> wl = make_unique<CSVWatchlist>("watchlist.csv");
	/*
	cout << "1 - CSV\n2 - HTML\n";
	int option;
	cin >> option;
	if (option == 1)
		w = make_unique<CSVWatchlist>("watchlist.csv");
	else if (option == 2)
		w = make_unique<HTMLWatchlist>("watchlist.html");
	else {
		cout << "Invalid option!\n";
		return 1;
	}
	*/
	Controller controller{ repository, wl.get(), MovieValidator{} };
	LMDBv8 w{ controller };
    w.show();
    return a.exec();
}
