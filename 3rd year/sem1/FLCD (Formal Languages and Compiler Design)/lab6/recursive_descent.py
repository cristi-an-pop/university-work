from grammar import Grammar


class RecursiveDescent:
    def __init__(self, grammar, input_string):
        self.grammar = grammar
        self.state = "q"
        self.index = 0
        self.working_stack = []
        self.input_stack = [grammar.start_symbol]
        self.input_string = input_string

    def expand(self):
        # Expand
        # WHEN: head
        # of
        # input
        # stack is a
        # nonterminal
        # (q, i, 𝜶, A𝜷) ⊢ (q, i, 𝜶A1, 𝜸1𝜷)
        # where:
        # A → 𝜸1 | 𝜸2 | … represents
        # the
        # productions
        # corresponding
        # to
        # A
        # 1 = first
        # prod
        # of
        # A
        # implementation:
        # if head of input stack is a nonterminal
        # then
        #     nonterminal = self.input_stack.pop()
        #     productions = self.grammar.productions[nonterminal]
        #     first_prod = productions[0]
        #     self.input_stack.extend(first_prod)
        #     print("Expanding")
        if self.input_stack and self.input_stack[-1] in self.grammar.nonterminals:
            nonterminal = self.input_stack.pop()
            first_prod = self.grammar.productions[nonterminal][0]
            self.input_stack.extend(reversed(first_prod.split()))
            self.working_stack.append((nonterminal, 0))
            print("Expanding:", nonterminal, "->", first_prod)


    def advance(self):
        # WHEN: head
        # of
        # input
        # stack is a
        # terminal = current
        # symbol
        # from input
        # (q, i, 𝜶, ai𝜷) ⊢ (q, i + 1, 𝜶ai, 𝜷)
        # implementation:
        # if head of input stack is a terminal = current symbol from input
        # then
        #     self.current_index += 1
        #     terminal = self.input_stack.pop()
        #     self.output_stack.append(terminal)
        #     print("Advancing")
        if self.input_stack and self.input_stack[-1] in self.grammar.terminals:
            terminal = self.input_stack.pop()
            if self.index < len(self.input_string) and self.input_string[self.index] == terminal:
                self.working_stack.append(terminal)
                self.index += 1
                print("Advancing:", terminal)
            else:
                self.state = "b"
                print("Advancing failed: Expected", terminal, "but found", self.input_string[self.index])

    def momentary_insucces(self):
        # Momentary
        # insuccess
        # WHEN: head
        # of
        # input
        # stack is a
        # terminal ≠ current
        # symbol
        # from input
        # (q, i, 𝜶, ai𝜷) ⊢ (b, i, 𝜶, ai𝜷)
        # implementation:
        # if head of input stack is a terminal ≠ current symbol from input
        # then
        #     state = "b"
        #     print("Momentary insuccess")
        #     return
        self.state = "b"
        print("Momentary insuccess")

    def back(self):
        # WHEN: head
        # of
        # working
        # stack is a
        # terminal
        # (b, i, 𝜶a, 𝜷) ⊢ (b, i - 1, 𝜶, a𝜷)
        # implementation:
        # if head of working stack is a terminal
        # then
        #     self.current_index -= 1
        #     terminal = self.output_stack.pop()
        #     self.input_stack.append(terminal)
        #     print("Backing")
        if self.working_stack and isinstance(self.working_stack[-1], str):
            terminal = self.working_stack.pop()
            self.input_stack.append(terminal)
            self.index -= 1
            print("Backing:", terminal)

    def another_try(self):
        # WHEN: head
        # of
        # working
        # stack is a
        # nonterminal
        # (b, i, 𝜶 Aj, 𝜸j 𝜷) ⊢ (q, i, 𝜶Aj + 1, 𝜸j + 1𝜷),
        # if ∃ A → 𝜸j+1
        # (b, i, 𝜶, A 𝜷), otherwise
        # with the exception
        # (e, i, 𝜶, 𝜷),
        # if i=1, A =S, ERROR
        # implementation:
        # if head of working stack is a nonterminal
        # then
        #     nonterminal = self.output_stack.pop()
        #     productions = self.grammar.productions[nonterminal]
        #     for prod in productions:
        #         if prod.startswith(self.output_stack[-1]):
        #             self.output_stack.append(prod)
        #             print("Another try")
        if self.working_stack and isinstance(self.working_stack[-1], tuple):
            nonterminal, prod_index = self.working_stack.pop()
            current_productions = self.grammar.productions[nonterminal]

            if prod_index + 1 < len(current_productions):
                next_prod = current_productions[prod_index + 1]
                self.input_stack.extend(reversed(next_prod.split()))
                self.working_stack.append((nonterminal, prod_index + 1))
                print("Another try:", nonterminal, "->", next_prod)
            else:
                if not self.working_stack:
                    print("Error: Parsing failed at the start symbol.")
                    self.state = "e"
                print("No more productions for", nonterminal)


    def success(self):
        #(q, n + 1, 𝜶, 𝜀) ⊢ (f, n + 1, 𝜶, 𝜀)
        if self.state == "q" and not self.input_stack:
            self.state = "f"
            print("Success: Input string parsed successfully.")

    def run(self):
        while self.state not in {"f", "e"}:
            print("State:", self.state)
            self.print_tuple()

            if self.state == "q":
                if not self.input_stack:
                    self.success()
                elif self.input_stack[-1] in self.grammar.nonterminals:
                    self.expand()
                elif self.input_stack[-1] in self.grammar.terminals:
                    if self.index < len(self.input_string):
                        self.advance()
                    else:
                        self.momentary_insuccess()
            elif self.state == "b":
                if self.working_stack and isinstance(self.working_stack[-1], str):
                    self.back()
                elif self.working_stack and isinstance(self.working_stack[-1], tuple):
                    self.another_try()
                else:
                    print("Parsing failed: No valid configuration.")
                    self.state = "e"

    def print_tuple(self):
        print(f"({self.state}, {self.index}, {self.working_stack}, {self.input_stack})")

# Initialize grammar and read from file
grammar = Grammar()
grammar.read_from_file("g1.txt")

# Print the grammar details
print("Grammar loaded:")
grammar.print_nonterminals()
grammar.print_terminals()
grammar.print_productions()

# Test input string
input_string = "id + id * id".split()

# Initialize the parser
parser = RecursiveDescent(grammar, input_string)

# Run the parser
print("\nRunning Recursive Descent Parser:")
parser.run()

