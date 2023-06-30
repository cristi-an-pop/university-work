from src.domain.discipline import Discipline


class DisciplineRepository:
    def __init__(self):
        self._data = []

    def add(self, discipline: Discipline):
        self._data.append(discipline)

    def get_all(self):
        return self._data

    def get_by_id(self, discipline_id: int):
        for discipline in self._data:
            if discipline.discipline_id == discipline_id:
                return discipline

    def delete(self, discipline_id: int):
        for discipline in self._data:
            if discipline.discipline_id == discipline_id:
                self._data.remove(discipline)

    def update(self, discipline_id: int, discipline: Discipline):
        for i in range(len(self._data)):
            if self._data[i].discipline_id == discipline_id:
                self._data[i] = discipline
