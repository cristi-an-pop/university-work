from grammar import Grammar


class Parser:
    def __init__(self, grammar):
        """
        Initializes the parser with a given grammar.
        Sets up the input stack, work stack, index, and initial state.
        """
        self.grammar = grammar
        self.input_stack = []
        self.work_stack = []
        self.index = 0
        self.state = 'q'

    def log_state(self, action):
        """
        Logs the current state of the parser for debugging purposes.
        """
        print(f"Action: {action}")
        print(f"State: {self.state}, Index: {self.index}")
        print(f"Input Stack: {self.input_stack}")
        print(f"Work Stack: {self.work_stack}")
        print("-" * 40)

    def expand(self):
        """
        Expands the current nonterminal on the input stack using the first production rule.
        Updates the work stack and modifies the input stack by replacing the nonterminal
        with the right-hand side of the production.
        """
        #self.log_state("Expanding")
        nonterminal = self.input_stack.pop(0)
        first_prod = self.grammar.get_first_production_for_nonterminal(nonterminal)

        if first_prod is not None:
            self.work_stack.append((nonterminal, 1))
            self.input_stack = list(first_prod) + self.input_stack
        else:
            raise ValueError(f"No production rule for nonterminal {nonterminal}")
        #self.log_state("Expanded")

    def advance(self):
        """
        Advances by moving the next terminal from the input stack to the work stack.
        Increments the index to track progress through the input string.
        """
        self.log_state("Advancing")
        self.index += 1
        terminal = self.input_stack.pop(0)
        self.work_stack.append(terminal)
       # self.log_state("Advanced")

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

                self.input_stack = list(next_prod) + self.input_stack
                self.state = "q"
            else:
                self.state = "b"
                prod_length = len(self.grammar.get_production_for_nonterminal_and_index(nonterminal, prod_index))
                self.input_stack = self.input_stack[prod_length:]
                self.input_stack.insert(0, nonterminal)

                if self.index == 1 and nonterminal == self.grammar.start_symbol:
                    self.state = 'e'
        else:
            raise ValueError(f"Invalid working stack entry: {top}")
        #self.log_state("Another try complete")

    def momentary_insuccess(self):
        """
        Handles a failed match between input and grammar, changing the parser state to backtracking ('b').
        """
        self.log_state("Momentary insuccess")
        self.state = 'b'
        #self.log_state("Set to backtracking mode")

    def back(self):
        """
        Backtracks by restoring the last terminal moved to the work stack
        back to the input stack. Decrements the index to reflect the undone step.
        """
        self.log_state("Backtracking")
        self.index -= 1
        terminal = self.work_stack.pop()
        self.input_stack.insert(0, terminal)
        #self.log_state("Backtracked")

    def success(self):
        """
        Marks the parsing process as successful by transitioning to the final state ('f').
        """
        #self.log_state("Parsing successful")
        self.state = 'f'

    def parse(self, input_string):
        self.state = "q"
        self.index = 1
        self.work_stack = []
        self.input_stack = [self.grammar.start_symbol]

        while self.state not in {"f", "e"}:
            self.log_state("Start of Loop")

            if self.state == "q":
                if not self.input_stack:
                    if self.index > len(input_string):
                        self.success()
                    else:
                        self.state = "b"
                elif self.input_stack[0] in self.grammar.nonterminals:
                    self.expand()
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
                    print("Parsing failed: No valid configuration.")
                    self.state = "e"

            self.log_state("End of Loop")

        if self.state == "f":
            print("Parsing succeeded!")
        elif self.state == "e":
            print("Error: Parsing failed.")


def main():
    grammar = Grammar()
    grammar.read_from_file("g1.txt")

    #parser = Parser(grammar)
    #parser.parse("cb")"""

    print("Test for expand")
    parser = Parser(grammar)
    parser.input_stack = ['S', 'S']
    parser.index = 1
    parser.state = 'q'
    parser.expand()
    print(parser.input_stack)
    print(parser.work_stack)

    print("\nTest for advance")
    parser1 = Parser(grammar)
    parser1.input_stack = ['a', 'b', 'A', 'S']
    parser1.work_stack = ['S, 1', 'c']
    parser1.index = 1
    parser1.state = 'q'
    parser1.advance()
    print(parser1.input_stack)
    print(parser1.work_stack)
    print(parser1.index)

    print("\nTest for back")

    parser1.back()
    print(parser1.index)
    print(parser1.work_stack)
    print(parser1.input_stack)

    parser1.momentary_insuccess()
    print(parser1.state)

    print("\nTest for another_try")
    parser2 = Parser(grammar)
    parser2.index = 2
    parser2.state = 'b'
    parser2.input_stack = ['A', 'b', 'S']
    parser2.work_stack = [('S', 1)]
    parser2.another_try()

    print(parser2.work_stack)
    print(parser2.input_stack)
    print(parser2.state)


if __name__ == "__main__":
    grammar = Grammar()
    grammar.read_from_file("g2.txt")
    # main()
    parser = Parser(grammar)
    parser.parse("acb")
