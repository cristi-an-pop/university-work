import pickle

from src.domain.entities import ComplexNumber
from src.repositories.memory_repository import MemoryRepository


class BinaryFileRepository(MemoryRepository):

    def __init__(self, file_name="numbers.bin"):
        super(BinaryFileRepository, self).__init__()
        self._file_name = file_name
        try:
            self._load_file()
        except EOFError:
            pass

    def _load_file(self):
        try:
            read_file = open(self._file_name, "rb")
            file_objects = pickle.load(read_file)
            for complex_number in file_objects:
                super().add(complex_number)
        except EOFError:
            print("Error: end of file reached")
        read_file.close()

    def add(self, complex_number: ComplexNumber):
        super().add(complex_number)

    def _save_file(self):
        write_file = open(self._file_name, "wb")
        pickle.dump(self.get_data(), write_file)
        write_file.close()

    def add_random(self):
        super().add_random()
        self._save_file()


def test_binary_repository():
    # Create a new repository and add 10 random complex numbers to it
    repository = BinaryFileRepository()
    original_numbers = []
    for i in range(10):
        complex_number = repository.add_random()
        original_numbers.append(complex_number)
    repository.save_file()

    # Load the file into a new repository
    repository = BinaryFileRepository()
    repository.load_file()

    # Test that the repository has the correct number of complex numbers
    assert len(repository.get_data()) == 10

    # Test that the complex numbers in the repository are the same as the ones that were added
    data = repository.get_data()
    for original, current in zip(original_numbers, data):
        assert original.real == current.real
        assert original.imag == current.imag
