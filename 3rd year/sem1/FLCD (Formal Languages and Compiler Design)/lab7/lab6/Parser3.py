from lab6Parser.lab6.lab6.Scanner import Scanner, categorize_code_elements
from lab6Parser.lab6.lab6.grammar import Grammar


class Parser:
    def __init__(self, grammar):
        self.grammar = grammar

        self.index = 1
        self.state = "q"
        self.input_stack = []
        self.work_stack = []

    def log_state(self, action):
        print(f"[Log] Action: {action}")
        print(
            f"State: {self.state}, Input Stack: {self.input_stack}, Work Stack: {self.work_stack}, Index: {self.index}")
        print("-" * 50)

    def expand(self):
        nonterminal = self.input_stack.pop(0)
        production = self.grammar.get_first_production_for_nonterminal(nonterminal)
        print("this is the production", production)

        if production is None:
            self.state = "e"
            print(f"Error: No production found for {nonterminal}")
            return

        if production == "ε":
            self.state = "q"
            return

        self.work_stack.append((nonterminal, 1))

        if isinstance(production, str):
            production = production.split()

        self.input_stack = production + self.input_stack

    def advance(self):
        terminal = self.input_stack.pop(0)
        self.index += 1
        self.work_stack.append(terminal)

    def momentary_insuccess(self):
        self.state = 'b'

    def back(self):
        terminal = self.work_stack.pop()
        self.input_stack.insert(0, terminal)
        self.index -= 1
        print(f"Back: Restored {terminal}")

    def another_try(self):
        print("Trying another production")
        if not self.work_stack:
            raise ValueError("Working stack is empty, cannot perform another_try.")

        top = self.work_stack.pop()
        if isinstance(top, tuple) and len(top) == 2:
            nonterminal, prod_index = top

            next_prod = self.grammar.get_production_for_nonterminal_and_index(nonterminal, prod_index + 1)
            if next_prod:
                self.work_stack.append((nonterminal, prod_index + 1))

                prod_length = len(self.grammar.get_production_for_nonterminal_and_index(nonterminal, prod_index).split())
                print(self.grammar.get_production_for_nonterminal_and_index(nonterminal, prod_index))
                print(prod_length)

                self.input_stack = self.input_stack[prod_length:]

                print(f"Restoring input stack before adding new production: {self.input_stack}")

                self.input_stack = next_prod.split(" ") + self.input_stack
                print(f"Input stack after adding new production: {self.input_stack}")
                self.state = "q"
            else:
                print(f"Backtracking: No more productions for {nonterminal}, restoring...")
                self.state = "b"
                prod_length = len(self.grammar.get_production_for_nonterminal_and_index(nonterminal, prod_index).split())
                self.input_stack = self.input_stack[prod_length:]
                self.input_stack.insert(0, nonterminal)  # Restore the nonterminal in the input stack
                print(f"Restored input stack: {self.input_stack}")
        else:
            raise ValueError(f"Invalid working stack entry: {top}")

    def success(self):
        """
        Marks parsing as successful.
        """
        print("Parsing Complete: Success!")
        self.state = "f"

    def parse(self, input_string, out_file):
        """
        Starts the parsing process.
        """
        self.input_stack = [self.grammar.start_symbol]
        self.work_stack = []
        self.state = "q"
        self.index = 1
        print("Parsing started...\n")

        while self.state not in {"f", "e"}:
            self.log_state("Starting next iteration")
            print(input_string[self.index - 1:])

            if self.state == "q":
                if not self.input_stack:
                    if self.index > len(input_string):
                        self.success()
                    else:
                        self.state = "b"
                elif self.input_stack[0] in self.grammar.nonterminals:
                    self.expand()
                elif self.input_stack[0] == 'ε':
                    print("Skipping epsilon.")
                    self.input_stack = self.input_stack[1:]
                elif self.input_stack[0] == "IDENTIFIER":
                    self.advance()
                elif self.input_stack[0] in self.grammar.terminals:
                    if self.index <= len(input_string) and self.input_stack[0] == input_string[self.index - 1]:
                        self.advance()
                    else:
                        self.momentary_insuccess()
                else:
                    self.momentary_insuccess()

            elif self.state == "b":
                if self.work_stack and isinstance(self.work_stack[-1], str):
                    self.back()
                elif self.work_stack and isinstance(self.work_stack[-1], tuple):
                    self.another_try()
                else:
                    self.state = "e"

        if self.state == "f":
            with open(out_file, 'w') as fout:
                fout.write("Parsing was successful!\n")
            print("\nParsing Successful!")
        elif self.state == "e":
            if self.index <= len(input_string):
                current_symbol = input_string[self.index - 1] if self.index > 0 else "start of input"
                error_details = (
                    f"Parsing failed at index {self.index}.\n"
                    f"Encountered '{current_symbol}' but could not find a valid production.\n"
                    f"This might indicate a syntax error near '{current_symbol}', or the input does not conform to the grammar."
                )
            else:
                error_details = (
                    "Parsing failed.\n"
                    "The parser reached the end of the input but could not find a valid derivation.\n"
                    "This suggests that the input is incomplete or invalid."
                )

            with open(out_file, 'w') as fout:
                fout.write(error_details + "\n")
            print("\nError: Parsing Failed.")
            print(error_details)


def main_pif():
    grammar = Grammar()
    grammar.read_from_file("g1.txt")  # Update with your grammar file

    operators, separators, keywords = categorize_code_elements("token.in")

    scanner = Scanner(keywords, operators, separators)
    ok = scanner.analyze_program("program.txt")
    if not ok:
        return

    scanner.print_pif()
    scanner.print_symbol_table()
    scanner.write_in_file()

    parser = Parser(grammar)

    input_tokens = []
    with open("pif.out", "r") as file:
        for line in file:
            parts = line.strip().split()
            if len(parts) >= 1:
                token = parts[0]
                input_tokens.append(token)

    parser.parse(input_tokens, "out1.txt")

    print("\nParsing complete.")

def main_seq():
    grammar = Grammar()
    grammar.read_from_file("g2.txt")

    with open("seq.txt", "r") as file:
        sequence = file.read().strip()

    parser = Parser(grammar)
    parser.parse(sequence.split(), "out2.txt")


if __name__ == "__main__":
    main_pif()

