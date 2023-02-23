class ValidatorException(Exception):
    def __init__(self, message_list="Validation error!"):
        self._message_list = message_list

    @property
    def messages(self):
        return self._message_list

    def __str__(self):
        result = ''
        for message in self.messages:
            result += message
            result += '\n'
        return result


class StudentException(Exception):
    def __init__(self, message):
        self._message = message

    def __str__(self):
        return self._message


class StudentValidationException(StudentException):
    def __init__(self, error_list):
        self._errors = error_list

    def __str__(self):
        result = ''
        for error in self._errors:
            result += error
            result += '\n'
        return result


class DisciplineException(Exception):
    def __init__(self, message):
        self._message = message

    def __str__(self):
        return self._message


class DisciplineValidationException(DisciplineException):
    def __init__(self, error_list):
        self._errors = error_list

    def __str__(self):
        result = ''
        for error in self._errors:
            result += error
            result += '\n'
        return result


class GradeException(Exception):
    def __init__(self, message):
        self._message = message

    def __str__(self):
        return self._message


class GradeValidationException(GradeException):
    def __init__(self, error_list):
        self._errors = error_list

    def __str__(self):
        result = ''
        for error in self._errors:
            result += error
            result += '\n'
        return result
