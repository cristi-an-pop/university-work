from src.domain.exceptions import StudentValidationException


class StudentValidator:
    @staticmethod
    def _is_student_valid(student):
        if student.student_id == "":
            return False
        if student.student_id < 0:
            return False
        if student.name == "":
            return False
        return True

    def validate(self, student):
        errors = []
        if not self._is_student_valid(student):
            errors.append("Invalid student!")
        if student.student_id < 0:
            errors.append("Id must be a positive integer!")
        if student.name == "":
            errors.append("Name cannot be empty!")
        if len(errors) > 0:
            raise StudentValidationException(errors)
