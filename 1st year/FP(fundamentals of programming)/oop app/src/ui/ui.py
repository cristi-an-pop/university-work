from src.domain.entities import ComplexNumber


class UserInterfaceException(Exception):
    def __init__(self, message):
        self.__message = message

    @property
    def message(self):
        return self.__message


class UserInterface:
    def __init__(self, service):
        self._service = service

    def add(self, complex_number: ComplexNumber):
        self._service.add(complex_number)

    def display(self):
        for number in self._service.display_all():
            print(str(number))
        print('\n')

    def filter(self, start, end):
        self._service.filter(start, end)

    def undo(self):
        if self._service.operations == 0:
            raise UserInterfaceException(f"Nothing to undo!")
        self._service.undo()

    class MenuOptions:
        ADD_NUMBER_OPTION = 1
        DISPLAY_ALL_OPTION = 2
        FILTER_OPTION = 3
        UNDO_OPTION = 4

    def menu(self):
        while True:
            print("1. Add new number")
            print("2. Display the numbers")
            print("3. Filter the numbers")
            print("4. Undo")
            print("0. Exit")
            menu_option = int(input(">"))

            match menu_option:
                case self.MenuOptions.ADD_NUMBER_OPTION:
                    real_part = int(input("Real part: "))
                    imaginary_part = int(input("Imaginary part: "))
                    complex_number = ComplexNumber(real_part, imaginary_part)
                    self.add(complex_number)
                case self.MenuOptions.DISPLAY_ALL_OPTION:
                    self.display()
                case self.MenuOptions.FILTER_OPTION:
                    start = int(input("Type start index: "))
                    end = int(input("Type end index: "))
                    self.filter(start, end)
                case self.MenuOptions.UNDO_OPTION:
                    self.undo()
                case 0:
                    return
