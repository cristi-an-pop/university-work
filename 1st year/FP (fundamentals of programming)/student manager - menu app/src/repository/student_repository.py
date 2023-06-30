from src.domain.student import Student


class StudentRepository:
    def __init__(self):
        self._data = []

    def add(self, student: Student):
        self._data.append(student)

    def get_all(self):
        return self._data

    def get_by_id(self, student_id: int):
        for student in self._data:
            if student.student_id == student_id:
                return student

    def delete(self, student_id: int):
        for student in self._data:
            if student.student_id == student_id:
                self._data.remove(student)

    def update(self, student_id: int, student: Student):
        for i in range(len(self._data)):
            if self._data[i].student_id == student_id:
                self._data[i] = student
