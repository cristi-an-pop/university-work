#include "Validator.h"

MovieException::MovieException(std::vector<std::string> _errors) {
	this->errors = _errors;
}

std::vector<std::string> MovieException::getErrors() const {
	return this->errors;
}

MovieValidator::MovieValidator() {
}

MovieValidator::~MovieValidator() {
}

void MovieValidator::validate(const Movie m) {
	std::vector<std::string> errors;
	if (m.getTitle() == "")
		errors.push_back("The title cannot be empty!\n");
	if (m.getGenre() == "")
		errors.push_back("The genre cannot be empty!\n");
	if (m.getYear() < 0)
		errors.push_back("The year cannot be negative!\n");
	if (m.getLikes() < 0)
		errors.push_back("The likes cannot be negative!\n");
	if (m.getTrailer() == "")
		errors.push_back("The trailer cannot be empty!\n");
	if (errors.size() > 0)
		throw MovieException(errors);
}