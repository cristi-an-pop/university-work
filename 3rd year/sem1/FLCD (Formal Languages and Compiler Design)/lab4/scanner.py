from symbol_table import SymbolTable


class Scanner:
    def __init__(self, token_file, input_program_file):
        self.token_file = token_file
        self.input_program_file = input_program_file
        self.tokens = []
        self.pif = []
        self.symbol_table = SymbolTable()
        self.load_tokens()
        self.errors = []

    def load_tokens(self):
        with open(self.token_file, 'r') as file:
            self.tokens = [line.strip() for line in file if line.strip()]

        # Token classifications
        self.reserved_words = set(self.tokens[:18])
        self.operators = set(self.tokens[18:29])
        self.separators = set(self.tokens[29:])

    def classify_token(self, token):
        """
        Classify a token and return its type and position in the symbol table.
        """
        if token in self.reserved_words:
            return "reserved_word", 0
        elif token in self.operators:
            return "operator", 0
        elif token in self.separators:
            return "separator", 0
        elif token.isidentifier():  # Identifier
            return "identifier", self.symbol_table.add(token)
        elif token.isdigit():  # Integer constant
            return "int_constant", self.symbol_table.add(token)
        elif token.replace('.', '', 1).isdigit() and token.count('.') < 2:  # Float constant
            return "float_constant", self.symbol_table.add(token)
        elif token.lower() in ["true", "false"]:  # Boolean constant
            return "bool_constant", self.symbol_table.add(token)
        elif (token.startswith('"') and token.endswith('"')) or (token.startswith("'") and token.endswith("'")):  # String constant
            return "string_constant", self.symbol_table.add(token)
        else:
            return "error", None  # Unrecognized token

    def tokenize_line(self, line, line_number):
        """
        Tokenize a line of code, classify each token, and handle errors.
        """
        # Splitting the line into tokens based on spaces and separators
        tokens = []
        current_token = ""

        for char in line:
            if char in self.separators:
                if current_token:
                    tokens.append(current_token)
                    current_token = ""
                tokens.append(char)  # Add the separator as a token
            elif char.isspace():
                if current_token:
                    tokens.append(current_token)  # Append the current token
                    current_token = ""
            else:
                current_token += char

        if current_token:
            tokens.append(current_token)  # Append any remaining token

        # Classifying each token
        for token in tokens:
            token_type, value = self.classify_token(token)

            if token_type in ["reserved_word", "operator", "separator"]:
                self.pif.append((token, 0))
            elif token_type in ["identifier", "int_constant", "float_constant", "bool_constant", "string_constant"]:
                index = value
                self.pif.append((token, index))
            else:
                self.errors.append(f"Lexical error at line {line_number}: unrecognized token '{token}'")

    def analyze(self):
        """
        Read the input program file and analyze each line.
        Print error messages if any are found; otherwise, proceed to write results.
        """
        with open(self.input_program_file, 'r') as file:
            for line_number, line in enumerate(file, start=1):
                self.tokenize_line(line.strip(), line_number)

        if self.errors:
            for error in self.errors:
                print(error)
        else:
            self.write_results()
            print("Lexically correct")

    def write_results(self):
        """
        Write the PIF and Symbol Table contents to output files.
        """
        with open("PIF.out", "w") as pif_file:
            for token, pos in self.pif:
                pif_file.write(f"{token} -> {pos}\n")

        with open("ST.out", "w") as st_file:
            st_file.write(str(self.symbol_table))


if __name__ == '__main__':
    scanner = Scanner("token.in.txt", ".//input_data//p1.txt")
    scanner.analyze()
    print("Complete")
