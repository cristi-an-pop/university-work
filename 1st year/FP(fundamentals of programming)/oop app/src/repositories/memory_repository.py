import copy

from src.domain.entities import ComplexNumber
import random


class RepositoryException(Exception):
    def __init__(self, message):
        self.__message = message

    @property
    def message(self):
        return self.__message


class MemoryRepository:
    def __init__(self):
        self._data = []

    def add(self, complex_number: ComplexNumber):
        self._data.append(complex_number)

    def get_data(self):
        return self._data

    def add_random(self):
        complex_number = ComplexNumber(random.randint(1, 100), random.randint(1, 100))
        self._data.append(complex_number)

    def change_data(self, new_list):
        self._data = copy.deepcopy(new_list)


def test_memory_repository():
    repository = MemoryRepository()
    for i in range(10):
        repository.add_random()
    assert len(repository.get_data()) == 10
