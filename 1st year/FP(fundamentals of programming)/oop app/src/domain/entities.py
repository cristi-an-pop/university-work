class ComplexNumber:
    def __init__(self, real: int, imaginary: int):
        self.real = real
        self.imaginary = imaginary

    @property
    def real(self):
        return self.__real

    @property
    def imaginary(self):
        return self.__imaginary

    @real.setter
    def real(self, value):
        self.__real = value

    @imaginary.setter
    def imaginary(self, value):
        self.__imaginary = value

    def __str__(self):
        return f"{self.real}+{self.imaginary}i"


def test_complex_number():
    new_complex_number = ComplexNumber(2, 3)
    assert new_complex_number.real == 2, f"Real part of number is not set properly"
    assert new_complex_number.imaginary == 3, f"Imaginary part of number is not set properly"
    assert str(new_complex_number) == "2+3i"

    new_complex_number.real = 5
    new_complex_number.imaginary = 10
    assert new_complex_number.real == 5
    assert new_complex_number.imaginary == 10
    assert str(new_complex_number) == "5+10i"

    print(new_complex_number.__dict__)


if __name__ == "__main__":
    test_complex_number()
