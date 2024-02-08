class Discipline:
    def __init__(self, discipline_id: int, name: str):
        self.__discipline_id = discipline_id
        self.__name = name

    @property
    def discipline_id(self):
        return self.__discipline_id

    @property
    def name(self):
        return self.__name

    @discipline_id.setter
    def discipline_id(self, value: int):
        self.__discipline_id = value

    @name.setter
    def name(self, value: str):
        self.__name = value

    def __str__(self):
        return f"{self.discipline_id} {self.name}"


def test_discipline():
    new_discipline = Discipline(1, "Math")

    assert new_discipline.discipline_id == 1
    assert new_discipline.name == "Math"
    assert str(new_discipline) == "1 Math"

    new_discipline.discipline_id = 2
    assert new_discipline.discipline_id == 2
    assert str(new_discipline) == "2 Math"

    new_discipline.name = "Physics"
    assert new_discipline.name == "Physics"
    assert str(new_discipline) == "2 Physics"


if __name__ == "__main__":
    test_discipline()
