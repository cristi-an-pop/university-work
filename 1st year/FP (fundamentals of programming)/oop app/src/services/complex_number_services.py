from src.domain.entities import ComplexNumber
import copy


class ServiceException(Exception):
    def __init__(self, message):
        self.__message = message

    @property
    def message(self):
        return self.__message


class ComplexNumbersService:
    def __init__(self, complex_number_repository):
        self.__complex_number_repository = complex_number_repository
        self.operations = 0
        self.history = []
        self.history.append(copy.deepcopy(self.__complex_number_repository.get_data()))

    def add(self, complex_number: ComplexNumber):
        self.__complex_number_repository.add(complex_number)
        self.history.append(copy.deepcopy(self.__complex_number_repository.get_data()))
        self.operations += 1

    def display_all(self):
        return self.__complex_number_repository.get_data()

    def filter(self, start: int, end: int):
        self.__complex_number_repository._data = self.__complex_number_repository._data[start:end]
        self.operations += 1
        self.history.append(copy.deepcopy(self.__complex_number_repository.get_data()))

    def undo(self):
        if self.operations == 0:
            raise ServiceException("Nothing to undo!")
        self.operations -= 1
        self.__complex_number_repository.change_data(copy.deepcopy(self.history[len(self.history) - 2]))
        _ = self.history.pop()

    def add_random(self):
        self.__complex_number_repository.add_random()
        self.operations += 1
        self.history.append(copy.deepcopy(self.__complex_number_repository.get_data()))


def test_complex_number_service():
    from src.repositories.memory_repository import MemoryRepository
    repository = MemoryRepository()
    service = ComplexNumbersService(repository)
    for i in range(10):
        service.add_random()
    assert len(service.display_all()) == 10
    service.filter(0, 5)
    assert len(service.display_all()) == 5
    service.undo()
    assert len(service.display_all()) == 10
    service.undo()
    assert len(service.display_all()) == 9
    service.undo()
    assert len(service.display_all()) == 8
    service.undo()
    assert len(service.display_all()) == 7
    service.undo()
    assert len(service.display_all()) == 6
    service.undo()
    assert len(service.display_all()) == 5
    service.undo()
    assert len(service.display_all()) == 4
    service.undo()
    assert len(service.display_all()) == 3
    service.undo()
    assert len(service.display_all()) == 2
    service.undo()
    assert len(service.display_all()) == 1
    service.undo()
    assert len(service.display_all()) == 0
    try:
        service.undo()
        assert False
    except ServiceException:
        assert True
