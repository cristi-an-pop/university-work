from src.repositories.binary_repository import BinaryFileRepository
from src.repositories.file_repository import TextFileRepository
from src.repositories.memory_repository import MemoryRepository
from src.services.complex_number_services import ComplexNumbersService
from src.ui.ui import UserInterface

if __name__ == "__main__":
    repository = 0
    method = input("Select the repo implementation: ")
    if method not in ["text", "memory", "binary"]:
        raise ValueError("Invalid implementation method")
    elif method == "text":
        repository = TextFileRepository("numbers.txt")
    elif method == "memory":
        repository = MemoryRepository()
    elif method == "binary":
        repository = BinaryFileRepository("numbers.bin")

    for i in range(10):
        repository.add_random()
    services = ComplexNumbersService(repository)
    UI = UserInterface(services)

    UI.menu()
