from SymbolTable import SymbolTable
from FiniteAutomata import FiniteAutomata

class Scanner:
    def __init__(self, keywords, operators, sep):
        self.keywords = keywords
        self.operators = operators
        self.separators = sep
        self.st = SymbolTable()
        self.pif = []
        self.count = 0
        self.fa = FiniteAutomata("FA.in")

    def analyze_program(self, code_filepath):
        count = 1
        lexical_errors = []
        with open(code_filepath, 'r') as file:
            lines = file.readlines()

        for line in lines:
            line = line.strip()
            tokens = self.tokenize(line)
            for token in tokens:
                if token in self.keywords:
                    self.pif.append((token, -1))
                elif token in self.operators:
                    self.pif.append((token, -1))
                elif token in self.separators:
                    self.pif.append((token, -1))
                else:
                    if self.is_string_constant(token) or self.fa.is_integer_constant(token):
                        index = self.st.look_up(token)
                        if index is None:
                            self.count += 1
                            self.st.insert(token, self.count)
                            self.pif.append(("constant", self.count))
                        else:
                            self.pif.append(("constant", index))
                    elif self.fa.is_identifier(token):
                        index = self.st.look_up(token)
                        if index is None:
                            self.count += 1
                            self.st.insert(token, self.count)
                            self.pif.append(("id", self.count))
                        else:
                            self.pif.append(("id", index))
                    else:
                        lexical_errors.append((token, count))
            count += 1
        if not lexical_errors:
            print(code_filepath, " Lexically correct")
            is_ok = True
        else:
            print("lexically Incorrect:")
            is_ok = False
            for error in lexical_errors:
                if error[0].startswith('\'') or error[0].endswith('\''):

                    message = "This is not a valid char constant, it must have both single quotes and exactly one " \
                              "character. "


                elif error[0].startswith('\"') or error[0].endswith('\"'):

                    message = "This is not a valid string constant, it must have both opening and closing double " \
                              "quotes. "

                elif error[0].startswith("0"):
                    message = "This is not a valid number. Numbers cannot start with '0' unless it's the number 0."

                else:
                    message = "This is not a valid identifier, it must begin with _ or a letter."

                print("line", error[1], ":", message, ":for token:", error[0])
        return is_ok

    def is_correct_identifier(self, identifier):
        if identifier[0].isdigit():
            return False
        if len(identifier) == 1 and identifier[0] == '_':
            return False
        if not (identifier[0].isalpha() or identifier[0] == "_"):
            return False
        for char in identifier:
            if not (char.isalpha() or char.isdigit() or char == '_'):
                return False
        return True

    def is_number(self, number):

        if number[0] == '0' and len(number) > 1:
            return False

        if number.isdigit():
            return True

    def is_string_constant(self, var):
        if var.startswith('\"') and var.endswith("\"") and len(var) >= 3:
            return True
        if var.startswith('\'') and var.endswith("\'") and len(var) == 3:
            return True
        return False

    def what_is_it(self, token):
        if self.is_string_constant(token):
            print(token, " is a string constant")
        elif self.is_number(token):
            print(token, " is a number")
        elif self.is_correct_identifier(token):
            print(token, " is a correct identifier")
        else:
            print(token, " is somthing else")

    def tokenize(self, line):
        inside_string = False
        tokens = []
        token = ""
        i = 0
        while i < len(line):
            char = line[i]

            if char == '"':
                if inside_string:
                    token += char
                    tokens.append(token)
                    token = ""
                    inside_string = False
                else:
                    if token:
                        tokens.append(token)
                        token = ""
                    inside_string = True
                    token += char
                i += 1
                continue

            if inside_string:
                token += char
                i += 1
                continue
            if char in self.separators:
                if token:
                    tokens.append(token)
                    token = ""
                tokens.append(char)
                i += 1

            elif char in self.operators:
                if token:
                    tokens.append(token)
                    token = ""
                next_char = line[i + 1] if i + 1 < len(line) else ""
                mult_operator = char + next_char
                third_char = line[i + 2] if i + 2 < len(line) else ""
                multi_op = mult_operator + third_char
                if multi_op in self.operators:
                    tokens.append(multi_op)
                    i += 3

                elif mult_operator in self.operators:
                    tokens.append(mult_operator)
                    i += 2
                else:
                    tokens.append(char)
                    i += 1
            elif char.isspace():
                if token:
                    tokens.append(token)
                    token = ""
                i += 1
            else:
                token += char
                i += 1
        if token:
            tokens.append(token)

        return tokens

    def print_symbol_table(self):
        print("Symbol Table:")
        print("-" * 30)
        print(f"| {'Index':<5} | {'Name':<20} |")
        print("-" * 30)

        entries = self.st.get_all()

        sorted_entries = sorted(entries, key=lambda x: x[1])

        for name, index in sorted_entries:
            print(f"| {index:<5} | {name:<20} |")

        print("-" * 30)

    def print_pif(self):
        print("Program Internal Form (PIF):")
        print("-" * 50)
        print(f"| {'Token':<30} | {'Index':<5} |")
        print("-" * 50)

        for token, index in self.pif:
            print(f"| {token:<30} | {index:<5} |")

        print("-" * 50)

    def write_in_file(self):
        with open("pif.out", 'w') as fout, open("sym.out", 'w') as sout:

            for p in self.pif:
                fout.write(str(p[0]) + " " + str(p[1]) + "\n")

            entries = self.st.get_all()

            sorted_entries = sorted(entries, key=lambda x: x[1])
            for name, value in sorted_entries:
                sout.write(str(name)+ " " + str(value) + "\n")



def categorize_code_elements(file_path):

    operators = []
    separators = []
    keywords = []

    with open(file_path, 'r') as file:

        lines = file.readlines()


    current_category = None


    for line in lines:
        line = line.strip()
        if line.startswith('#'):
            current_category = line[2:].strip()
        elif line:
            if current_category == 'operators':
                operators.append(line)
            elif current_category == 'separators':
                separators.append(line)
            elif current_category == 'keywords':
                keywords.append(line)

    return operators, separators, keywords
