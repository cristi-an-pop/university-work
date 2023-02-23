class Student:
    def __init__(self, student_id: int, name: str):
        self.__student_id = student_id
        self.__name = name

    @property
    def student_id(self):
        return self.__student_id

    @property
    def name(self):
        return self.__name

    @student_id.setter
    def student_id(self, value: int):
        self.__student_id = value

    @name.setter
    def name(self, value: str):
        self.__name = value

    def __str__(self):
        return f"{self.student_id} {self.name}"


def test_student():
    new_student = Student(1, "John")

    assert new_student.student_id == 1
    assert new_student.name == "John"
    assert str(new_student) == "1 John"

    new_student.student_id = 2
    assert new_student.student_id == 2
    assert str(new_student) == "2 John"

    new_student.name = "Jane"
    assert new_student.name == "Jane"
    assert str(new_student) == "2 Jane"


if __name__ == '__main__':
    test_student()
