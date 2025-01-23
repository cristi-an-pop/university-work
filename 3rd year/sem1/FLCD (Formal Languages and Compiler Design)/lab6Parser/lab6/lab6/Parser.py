from ParserOutput import ParserOutput
from lab6.grammar import Grammar


class Parser:
    def __init__(self, grammar):
        self.grammar = grammar
        self.index = 1
        self.state = "q"
        self.input_stack = []
        self.work_stack = []
        self.output = ParserOutput()

    def log_state(self, action):
        """
        Logs the current state of the parser during parsing.
        """
        print(f"[Log] Action: {action}")
        print(f"State: {self.state}, Input Stack: {self.input_stack}, Work Stack: {self.work_stack}, Index: {self.index}")
        print("-" * 50)

    def parse(self, input_string):
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

            if self.state == "q":
                if not self.input_stack:
                    if self.index > len(input_string):
                        self.success()
                    else:
                        self.state = "b"
                elif self.input_stack[0] in self.grammar.nonterminals:
                    self.expand()
                elif self.input_stack[0] == 'ε':
                    print("we should skip it and see thee")
                    self.input_stack = self.input_stack[1:]
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
            print("\nParsing Successful!")
            self.output.print_to_screen()  # Print to screen
        elif self.state == "e":
            print("\nError: Parsing Failed.")

    def expand(self):
        """
        Expands the current nonterminal using its first production.
        Handles epsilon productions by skipping them if already in the input stack.
        """
        nonterminal = self.input_stack.pop(0)  # Pop the nonterminal
        production = self.grammar.get_first_production_for_nonterminal(nonterminal)
        print("this is the production", production)

        if production is None:  # Handle missing production
            self.state = "e"
            print(f"Error: No production found for {nonterminal}")
            return

        if production == "ε":  # If epsilon is already in the input stack, just skip it
            print(f"Expand: {nonterminal} -> ε (Epsilon production already in input stack, skipping)")
            self.state = "q"  # Continue parsing without adding anything
            return

        self.work_stack.append((nonterminal, 1))  # Push the current state and production index

        # Ensure production and self.input_stack are both lists
        if not isinstance(production, list):
            production = list(production)  # Convert production to a list if needed
            #production = production.split(' ')


        if not isinstance(self.input_stack, list):
            self.input_stack = list(self.input_stack)  # Ensure input_stack is a list

        self.input_stack = production + self.input_stack  # Concatenate production to the front of input_stack

        # Log the parsing step
        self.output.add_parse_step("Expand", self.input_stack, self.work_stack, self.index, production)

        print(f"Expand: {nonterminal} -> {production}")

    def advance(self):
        """
        Advances by matching a terminal symbol.
        """
        terminal = self.input_stack.pop(0)
        self.work_stack.append(terminal)
        print(f"Advance: Matched {terminal}")
        self.index += 1

        # Log the parsing step
        self.output.add_parse_step("Advance", self.input_stack, self.work_stack, self.index)

    def momentary_insuccess(self):
        """
        Handles a failed match and sets the state to backtracking.
        """
        print("Momentary Insuccess: Backtracking...")
        self.state = "b"

        # Log the parsing step
        self.output.add_parse_step("Momentary Insuccess", self.input_stack, self.work_stack, self.index, production=[])
        #self.output.add_parse_step("Momentary Insuccess", self.input_stack, self.work_stack, self.index)

    def back(self):
        """
        Backtracks by restoring the last terminal.
        """
        terminal = self.work_stack.pop()
        self.input_stack.insert(0, terminal)
        self.index -= 1
        print(f"Back: Restored {terminal}")

        # Log the parsing step
        self.output.add_parse_step("Back", self.input_stack, self.work_stack, self.index)

    def another_try(self):
        """
        Tries the next production for the current nonterminal. If no more productions exist,
        it restores the nonterminal and transitions to a backtracking state.
        """
        self.log_state("Trying another production")

        if not self.work_stack:
            raise ValueError("Working stack is empty, cannot perform another_try.")

        top = self.work_stack.pop()
        if isinstance(top, tuple) and len(top) == 2:
            nonterminal, prod_index = top

            # Try the next production index
            next_prod = self.grammar.get_production_for_nonterminal_and_index(nonterminal, prod_index + 1)

            if next_prod:
                # Replace current production with the next one
                self.work_stack.append((nonterminal, prod_index + 1))

                # Remove previous production's symbols from the input stack
                prod_length = len(self.grammar.get_production_for_nonterminal_and_index(nonterminal, prod_index))
                self.input_stack = self.input_stack[prod_length:]

                # Add new production's symbols to the input stack
                self.input_stack = list(next_prod) + self.input_stack
                self.state = "q"
            else:
                # No more productions, restore the nonterminal and move to backtracking
                print(f"Backtracking: No more productions for {nonterminal}, restoring...")
                self.state = "b"
                prod_length = len(self.grammar.get_production_for_nonterminal_and_index(nonterminal, prod_index))
                self.input_stack = self.input_stack[prod_length:]
                self.input_stack.insert(0, nonterminal)
        else:
            raise ValueError(f"Invalid working stack entry: {top}")

    def success(self):
        """
        Marks parsing as successful.
        """
        print("Parsing Complete: Success!")
        self.state = "f"
        self.output.set_successful(True)


def main():
    grammar = Grammar()
    grammar.read_from_file("g2.txt")
    parser = Parser(grammar)
    input_string = input("Enter the input string: ")
    parser.parse(input_string)

    parser.output.print_to_file("output.txt")

if __name__ == "__main__":
    main()
