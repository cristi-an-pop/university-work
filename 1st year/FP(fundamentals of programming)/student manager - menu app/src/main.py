"""
Student: student_id, name
Discipline: discipline_id, name
Grade: discipline_id, student_id, grade_value

    Create an application to:
- Manage students and disciplines. The user can add, remove, update, and list both students and disciplines.
- Grade students at a given discipline. Any student may receive one or several grades at any discipline. Deleting a student also removes their grades. Deleting a discipline deletes all grades at that discipline for all students.
- Search for disciplines/students based on ID or name/title. The search must work using case-insensitive, partial string matching, and must return all matching disciplines/students.
    Create statistics:
- All students failing at one or more disciplines (students having an average <5 for a discipline are failing it)
- Students with the best school situation, sorted in descending order of their aggregated average (the average between their average grades per discipline)
- All disciplines at which there is at least one grade, sorted in descending order of the average grade(s) received by all students
"""
import random

from src.domain.discipline_validators import DisciplineValidator
from src.domain.grade_validators import GradeValidator
from src.domain.student_validators import StudentValidator
from src.repository.discipline_repository import DisciplineRepository
from src.repository.grade_repository import GradeRepository
from src.repository.student_repository import StudentRepository
from src.services.services import StudentService
from src.ui.ui import UserInterface

if __name__ == '__main__':
    student_repository = StudentRepository()
    discipline_repository = DisciplineRepository()
    grade_repository = GradeRepository()

    student_validator = StudentValidator()
    discipline_validator = DisciplineValidator()
    grade_validator = GradeValidator(student_repository, discipline_repository)

    service = StudentService(student_repository, discipline_repository, grade_repository, discipline_validator,
                             student_validator, grade_validator)
    student_names = ["John", "Mary", "Peter", "Paul", "George", "Ringo", "Elvis", "Mick", "Keith", "Ronnie", "Charlie", "Mircea", "Beni", "Stefan", "Alexandru"]
    for i in range(20):
        service.add_student(i, student_names[i % 10])

    disciplines = ["Math", "Physics", "Chemistry", "Biology", "Geography"]
    for i in range(5):
        service.add_discipline(i, disciplines[i])

    for i in range(20):
        service.add_grade(i % 5, i, random.Random().randint(1, 10))
        service.add_grade(i % 5, i, random.Random().randint(1, 10))

    ui = UserInterface(service)
    ui.menu()
