from src.domain.exceptions import GradeValidationException
from src.repository.discipline_repository import DisciplineRepository
from src.repository.student_repository import StudentRepository


class GradeValidator:
    def __init__(self, student_repository: StudentRepository, discipline_repository: DisciplineRepository):
        self.student_repository = student_repository
        self.discipline_repository = discipline_repository

    def validate(self, grade):
        if grade.grade_value < 1 or grade.grade_value > 10:
            raise GradeValidationException("Grade value must be between 1 and 10!")
        if self.student_repository.get_by_id(grade.student_id) is None:
            raise GradeValidationException("Student id does not exist!")
        if self.discipline_repository.get_by_id(grade.discipline_id) is None:
            raise GradeValidationException("Discipline id does not exist!")
