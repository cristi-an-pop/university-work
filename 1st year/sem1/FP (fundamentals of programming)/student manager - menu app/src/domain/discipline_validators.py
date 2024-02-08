from src.domain.exceptions import DisciplineValidationException


class DisciplineValidator:
    @staticmethod
    def _is_discipline_valid(discipline):
        if discipline.discipline_id == "":
            return False
        if discipline.discipline_id < 0:
            return False
        if discipline.name == "":
            return False
        return True

    def validate(self, discipline):
        errors = []
        if not self._is_discipline_valid(discipline):
            errors.append("Invalid discipline!")
        if discipline.discipline_id < 0:
            errors.append("Id must be a positive integer!")
        if discipline.name == "":
            errors.append("Name cannot be empty!")
        if len(errors) > 0:
            raise DisciplineValidationException(errors)