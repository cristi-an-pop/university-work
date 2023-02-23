import re

from src.domain.discipline import Discipline
from src.domain.grade import Grade
from src.domain.student import Student


class StudentService:
    def __init__(self, student_repository, discipline_repository, grade_repository, discipline_validator,
                 student_validator, grade_validator):
        self.student_repository = student_repository
        self.discipline_repository = discipline_repository
        self.grade_repository = grade_repository
        self.discipline_validator = discipline_validator
        self.student_validator = student_validator
        self.grade_validator = grade_validator

    # Student Services

    def add_student(self, student_id: int, name: str):
        student = Student(student_id, name)
        self.student_validator.validate(student)
        self.student_repository.add(student)

    def delete_student(self, student_id: int):
        self.student_repository.delete(student_id)
        self.grade_repository.delete_by_student_id(student_id)

    def update_student(self, student_id: int, name: str):
        student = Student(student_id, name)
        self.student_repository.update(student_id, student)

    def get_all_students(self):
        return self.student_repository.get_all()

    # Discipline Services

    def add_discipline(self, discipline_id: int, name: str):
        discipline = Discipline(discipline_id, name)
        self.discipline_validator.validate(discipline)
        self.discipline_repository.add(discipline)

    def delete_discipline(self, discipline_id: int):
        self.discipline_repository.delete(discipline_id)
        self.grade_repository.delete_by_discipline_id(discipline_id)

    def update_discipline(self, discipline_id: int, name: str):
        discipline = Discipline(discipline_id, name)
        self.discipline_repository.update(discipline_id, discipline)

    def get_all_disciplines(self):
        return self.discipline_repository.get_all()

    # Grade Services

    def add_grade(self, discipline_id: int, student_id: int, grade_value: int):
        grade = Grade(discipline_id, student_id, grade_value)
        self.grade_validator.validate(grade)
        self.grade_repository.add(grade)

    def delete_grade(self, discipline_id: int, student_id: int):
        self.grade_repository.delete(discipline_id, student_id)

    def update_grade(self, discipline_id: int, student_id: int, grade_value: int):
        grade = Grade(discipline_id, student_id, grade_value)
        self.grade_repository.update(discipline_id, student_id, grade)

    def get_all_grades(self):
        return self.grade_repository.get_all()

    # Search Services

    def search_student(self, search_term):
        matching_students = []
        matching_grades = []
        matching_disciplines = []
        all_students = self.student_repository.get_all()
        pattern = re.compile(search_term, re.IGNORECASE)
        for student in all_students:
            if pattern.search(student.name) or pattern.search(str(student.student_id)):
                matching_students.append(student)

        all_grades = self.grade_repository.get_all()
        all_disciplines = self.discipline_repository.get_all()

        for student in matching_students:
            for grade in all_grades:
                if grade.student_id == student.student_id:
                    for discipline in all_disciplines:
                        if discipline.discipline_id == grade.discipline_id:
                            matching_grades.append(grade)
                            matching_disciplines.append(discipline)
        return matching_students, matching_grades, matching_disciplines

    def search_discipline(self, search_term):
        matching_disciplines = []
        matching_grades = []
        matching_students = []
        all_disciplines = self.discipline_repository.get_all()
        pattern = re.compile(search_term, re.IGNORECASE)
        for discipline in all_disciplines:
            if pattern.search(discipline.name) or pattern.search(str(discipline.discipline_id)):
                matching_disciplines.append(discipline)

        all_grades = self.grade_repository.get_all()
        all_students = self.student_repository.get_all()

        for discipline in matching_disciplines:
            for grade in all_grades:
                if grade.discipline_id == discipline.discipline_id:
                    for student in all_students:
                        if student.student_id == grade.student_id:
                            matching_grades.append(grade)
                            matching_students.append(student)

        return matching_disciplines, matching_grades, matching_students

    #Statistics Services

    def is_student_failing(self, student_id):
        average_grade = 0
        number_of_grades = 0
        all_disciplines = self.discipline_repository.get_all()
        all_grades = self.grade_repository.get_all()
        for discipline in all_disciplines:
            for grade in all_grades:
                if grade.discipline_id == discipline.discipline_id and grade.student_id == student_id:
                    average_grade += grade.grade_value
                    number_of_grades += 1
            if number_of_grades != 0:
                average_grade = average_grade / number_of_grades
                if average_grade < 5:
                    return True
        return False

    def get_student_average_grade(self, student_id):
        average_grade = 0
        number_of_grades = 0
        all_disciplines = self.discipline_repository.get_all()
        all_grades = self.grade_repository.get_all()
        for discipline in all_disciplines:
            for grade in all_grades:
                if grade.discipline_id == discipline.discipline_id and grade.student_id == student_id:
                    average_grade += grade.grade_value
                    number_of_grades += 1
            if number_of_grades != 0:
                average_grade = average_grade / number_of_grades
        return average_grade

    def discipline_has_grade(self, discipline_id):
        all_grades = self.grade_repository.get_all()
        for grade in all_grades:
            if grade.discipline_id == discipline_id:
                return True
        return False

    def get_discipline_average_grade(self, discipline_id):
        average_grade = 0
        number_of_grades = 0
        all_students = self.student_repository.get_all()
        all_grades = self.grade_repository.get_all()
        for student in all_students:
            number_of_grades = 0
            for grade in all_grades:
                if grade.student_id == student.student_id and grade.discipline_id == discipline_id:
                    average_grade += grade.grade_value
                    number_of_grades += 1
            if number_of_grades != 0:
                average_grade = average_grade / number_of_grades
        return average_grade



