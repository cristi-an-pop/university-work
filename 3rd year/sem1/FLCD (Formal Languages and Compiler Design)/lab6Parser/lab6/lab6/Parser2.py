import re

from lab6.ParserOutput import ParserOutput
from lab6.lab6.grammar import Grammar


class Parser:
    def __init__(self, grammar):
        self.grammar = grammar
        self.index = 0
        self.state = "q"
        self.input_stack = []
        self.work_stack = []
        self.output = ParserOutput()

    def log_state(self, action):
        print(f"[Log] Action: {action}")
        print(f"State: {self.state}, Input Stack: {self.input_stack}, Work Stack: {self.work_stack}, Index: {self.index}")
        print("-" * 50)

    def parse(self, input_string):
        self.input_stack = [self.grammar.start_symbol]
        self.work_stack = []
        self.state = "q"
        self.index = 0
        print("Parsing started...\n")

        while self.state not in {"f", "e"}:
            self.log_state("Starting next iteration")

            if self.state == "q":
                if not self.input_stack:
                    if self.index >= len(input_string):
                        self.success()
                    else:
                        self.state = "b"
                elif self.input_stack[0] in self.grammar.nonterminals:
                    print("Expand", self.input_stack[0])
                    self.expand()
                elif self.input_stack[0] == 'ε':
                    self.input_stack = self.input_stack[1:]  # Skip epsilon
                elif self.input_stack[0] in self.grammar.terminals:
                    terminal = self.input_stack[0]

                    # Skip leading spaces from the current position in the input string
                    while self.index < len(input_string) and input_string[self.index] == ' ':
                        self.index += 1  # Move the index forward by 1 for each space

                    # Print debug information
                    print("==========================")
                    print(f"Checking position: {self.index}")
                    print(f"Input string length: {len(input_string)}")
                    print(f"Substring to match: '{input_string[self.index]}'")
                    print(f"Terminal to match: '{terminal}'")

                    # Check if the terminal matches the substring of the input string
                    if terminal == 'IDENTIFIER':
                        print("AAAAAAAAAAAAA")
                        match = re.match(r'[a-zA-Z][a-zA-Z0-9]*', input_string[self.index])
                        if match:
                            self.advance(1)
                        else:
                            self.momentary_insuccess()
                    else:
                        if self.index < len(input_string) and input_string[self.index] == terminal:
                            self.advance(1)
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
            print("\nParsing Successful!")
            self.output.print_to_screen()  # Print to screen
        elif self.state == "e":
            print("\nError: Parsing Failed.")

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

        # If production is a string, split it into individual symbols (terminals/nonterminals)
        if isinstance(production, str):
            production = production.split()  # Handle space-separated symbols

        # Update the input stack with the production (nonterminals and terminals)
        self.input_stack = production + self.input_stack

        self.output.add_parse_step("Expand", self.input_stack, self.work_stack, self.index, production)

    def advance(self, terminal_length):
        terminal = self.input_stack.pop(0)
        self.work_stack.append(terminal)
        print(f"Advance: Matched {terminal}")
        self.index += terminal_length  # Move the index forward by the length of the terminal

        self.output.add_parse_step("Advance", self.input_stack, self.work_stack, self.index)

    def momentary_insuccess(self):
        print("Momentary Insuccess: Backtracking...")
        self.state = "b"
        self.output.add_parse_step("Momentary Insuccess", self.input_stack, self.work_stack, self.index)

    def back(self):
        terminal = self.work_stack.pop()
        self.input_stack.insert(0, terminal)
        self.index -= 1
        print(f"Back: Restored {terminal}")
        self.output.add_parse_step("Back", self.input_stack, self.work_stack, self.index)

    def another_try(self):
        self.log_state("Trying another production")

        if not self.work_stack:
            raise ValueError("Working stack is empty, cannot perform another_try.")

        top = self.work_stack.pop()
        if isinstance(top, tuple) and len(top) == 2:
            nonterminal, prod_index = top

            next_prod = self.grammar.get_production_for_nonterminal_and_index(nonterminal, prod_index + 1)

            if next_prod:
                self.work_stack.append((nonterminal, prod_index + 1))
                prod_length = len(self.grammar.get_production_for_nonterminal_and_index(nonterminal, prod_index))
                self.input_stack = self.input_stack[prod_length:]
                self.input_stack = next_prod.split() + self.input_stack
                self.state = "q"
            else:
                print(f"Backtracking: No more productions for {nonterminal}, restoring...")
                self.state = "b"
                prod_length = len(self.grammar.get_production_for_nonterminal_and_index(nonterminal, prod_index))
                self.input_stack = self.input_stack[prod_length:]
                self.input_stack.insert(0, nonterminal)

    def success(self):
        print("Parsing Complete: Success!")
        self.state = "f"
        self.output.set_successful(True)


def main():
    grammar = Grammar()
    grammar.read_from_file("g2.txt")

    parser = Parser(grammar)
    input_string = input("Enter the input string: ")
    parser.parse(input_string.split(' '))

    parser.output.print_to_file("output.txt")


if __name__ == "__main__":
    main()
