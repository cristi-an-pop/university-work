import re


import re

class Grammar:
    def __init__(self):
        self.nonterminals = set()
        self.terminals = set()
        self.productions = {}
        self.start_symbol = None

    def read_from_file(self, file_path):
        with open(file_path, 'r', encoding='utf-8') as file:
            lines = file.readlines()

        nonterminals_pattern = re.compile(r"Nonterminals:\s*(.+)")
        terminals_pattern = re.compile(r"Terminals:\s*(.+)")
        start_symbol_pattern = re.compile(r"Start Symbol:\s*(.+)")
        production_pattern = re.compile(r"^\s*(\w+)\s*->\s*(.+)\s*$")

        for line in lines:
            print(f"Processing line: {line.strip()}")  # Debugging output
            if nonterminals_pattern.match(line):
                self.nonterminals = set(nonterminals_pattern.search(line).group(1).split(", "))
            elif terminals_pattern.match(line):
                self.terminals = set(terminals_pattern.search(line).group(1).split(", "))
            elif start_symbol_pattern.match(line):
                self.start_symbol = start_symbol_pattern.search(line).group(1)
            elif production_pattern.match(line):
                lhs, rhs = production_pattern.search(line).groups()
                print(f"Matched Production: {lhs} -> {rhs}")
                rhs_list = [rule.strip() for rule in rhs.split("|")]

                # Handle epsilon (Îµ -> ε)
                rhs_list = [rule.replace("Îµ", "ε") for rule in rhs_list]  # Replace Îµ with ε

                if lhs in self.productions:
                    self.productions[lhs].extend(rhs_list)
                else:
                    self.productions[lhs] = rhs_list
            else:
                print(f"No match for line: {line.strip()}")

    def print_nonterminals(self):
        print("Nonterminals:", self.nonterminals)

    def print_terminals(self):
        print("Terminals:", self.terminals)

    def print_productions(self):
        print("Productions:")
        for lhs, rhs_list in self.productions.items():
            for rhs in rhs_list:
                print(f"  {lhs} -> {rhs}")

    def get_productions_for_nonterminal(self, nonterminal):
        if nonterminal in self.productions:
            print(f"Productions for {nonterminal}:")
            for index, rhs in enumerate(self.productions[nonterminal], start=1):
                print(f"  {nonterminal} -> {rhs} (Production {index})")
        else:
            print(f"No productions for {nonterminal}.")

    def get_first_production_for_nonterminal(self, nonterminal):
        if nonterminal in self.productions:
            return self.productions[nonterminal][0]  # First production
        else:
            print(f"No productions for {nonterminal}.")
            return None

    def get_production_for_nonterminal_and_index(self, nonterminal, index):
        if nonterminal in self.productions and 1 <= index <= len(self.productions[nonterminal]):
            return self.productions[nonterminal][index - 1]  # 1-based index
        else:
            print(f"Invalid production index {index} for nonterminal {nonterminal}.")
            return None

    def is_cfg(self):
        for lhs in self.productions.keys():
            if lhs not in self.nonterminals:
                print(f"Error: {lhs} is not a valid nonterminal.")
                return False
        return True

# Main Function to test the Grammar class
def main():
    grammar = Grammar()

    # Read grammar from file (replace 'g1.txt' with the actual file path)
    grammar.read_from_file("g1.txt")

    # Print grammar details
    grammar.print_nonterminals()
    grammar.print_terminals()
    grammar.print_productions()

    # Check if the grammar is a CFG
    if grammar.is_cfg():
        print("The grammar is a valid CFG.")
    else:
        print("The grammar is not a valid CFG.")

if __name__ == "__main__":
    main()
