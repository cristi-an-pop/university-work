class Grade:
    def __init__(self, discipline_id: int, student_id: int, grade_value: int):
        self.__discipline_id = discipline_id
        self.__student_id = student_id
        self.__grade_value = grade_value

    @property
    def discipline_id(self):
        return self.__discipline_id

    @property
    def student_id(self):
        return self.__student_id

    @property
    def grade_value(self):
        return self.__grade_value

    @discipline_id.setter
    def discipline_id(self, value: int):
        self.__discipline_id = value

    @student_id.setter
    def student_id(self, value: int):
        self.__student_id = value

    @grade_value.setter
    def grade_value(self, value: int):
        self.__grade_value = value

    def __str__(self):
        return f"{self.discipline_id} {self.student_id} {self.grade_value}"


def test_grade():
    new_grade = Grade(1, 2, 10)

    assert new_grade.discipline_id == 1
    assert new_grade.student_id == 2
    assert new_grade.grade_value == 10
    assert str(new_grade) == "1 2 10"

    new_grade.discipline_id = 2
    assert new_grade.discipline_id == 2
    assert str(new_grade) == "2 2 10"

    new_grade.student_id = 3
    assert new_grade.student_id == 3
    assert str(new_grade) == "2 3 10"

    new_grade.grade_value = 9
    assert new_grade.grade_value == 9
    assert str(new_grade) == "2 3 9"


if __name__ == "__main__":
    test_grade()
