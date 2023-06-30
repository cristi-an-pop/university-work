from src.domain.grade import Grade


class GradeRepository:
    def __init__(self):
        self._data = []

    def add(self, grade: Grade):
        self._data.append(grade)

    def get_all(self):
        return self._data

    def get_by_id(self, discipline_id: int, student_id: int):
        for grade in self._data:
            if grade.discipline_id == discipline_id and grade.student_id == student_id:
                return grade

    def delete(self, discipline_id: int, student_id: int):
        for grade in self._data:
            if grade.discipline_id == discipline_id and grade.student_id == student_id:
                self._data.remove(grade)

    def delete_by_discipline_id(self, discipline_id: int):
        for grade in self._data:
            if grade.discipline_id == discipline_id:
                self._data.remove(grade)

    def delete_by_student_id(self, student_id: int):
        for grade in self._data:
            if grade.student_id == student_id:
                self._data.remove(grade)

    def update(self, discipline_id: int, student_id: int, grade: Grade):
        for i in range(len(self._data)):
            if self._data[i].discipline_id == discipline_id and self._data[i].student_id == student_id:
                self._data[i] = grade
