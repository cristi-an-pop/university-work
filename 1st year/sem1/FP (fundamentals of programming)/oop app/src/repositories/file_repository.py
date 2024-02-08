from src.domain.entities import ComplexNumber
from src.repositories.memory_repository import MemoryRepository


class TextFileRepository(MemoryRepository):

    def __init__(self, file_name):
        super(TextFileRepository, self).__init__()
        self._file_name = file_name
        self._load_file()

    def _load_file(self):
        read_file = open(self._file_name, "rt")
        lines = read_file.readlines()
        read_file.close()
        for line in lines:
            current_line = line.split("+")
            print(current_line)
            complex_number = ComplexNumber(int(current_line[0].strip()), int(current_line[1].split("i")[0].strip()))
            super().add(complex_number)

    def _save_file(self):
        write_file = open(self._file_name, "wt")
        for obj in self.get_data():
            write_file.write(str(obj))
            write_file.write('\n')
        write_file.close()

    def add(self, complex_number: ComplexNumber):
        super().add(complex_number)
        self._save_file()


def test_text_repository():
    repository = TextFileRepository("numbers.txt")
    for i in range(10):
        repository.add_random()
    assert len(repository.get_data()) == 10
