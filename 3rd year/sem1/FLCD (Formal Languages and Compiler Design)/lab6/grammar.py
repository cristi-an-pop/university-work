import re

class Grammar:
    def __init__(self):
        self.nonterminals = set()
        self.terminals = set()
        self.productions = {}
        self.start_symbol = None

    def read_from_file(self, file_path):
        with open(file_path, 'r') as file:
            lines = file.readlines()

        nonterminals_pattern = re.compile(r"Nonterminals:\s*(.+)")
        terminals_pattern = re.compile(r"Terminals:\s*(.+)")
        start_symbol_pattern = re.compile(r"Start Symbol:\s*(.+)")
        production_pattern = re.compile(r"^\s*(\w+)\s*->\s*(.+)\s*$")

        for line in lines:
            if nonterminals_pattern.match(line):
                self.nonterminals = set(nonterminals_pattern.search(line).group(1).split(", "))
            elif terminals_pattern.match(line):
                self.terminals = set(terminals_pattern.search(line).group(1).split(", "))
            elif start_symbol_pattern.match(line):
                self.start_symbol = start_symbol_pattern.search(line).group(1)
            elif production_pattern.match(line):
                lhs, rhs = production_pattern.search(line).groups()
                rhs_list = [rule.strip() for rule in rhs.split("|")]
                if lhs in self.productions:
                    self.productions[lhs].extend(rhs_list)
                else:
                    self.productions[lhs] = rhs_list
            else:
                print(f"No match for line: {line.strip()}")

        for lhs in self.productions:
            self.productions[lhs] = [prod if prod != "ε" else "" for prod in self.productions[lhs]]

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
            for rhs in self.productions[nonterminal]:
                print(f"  {nonterminal} -> {rhs}")
        else:
            print(f"No productions for {nonterminal}.")

    def is_cfg(self):
        for lhs in self.productions.keys():
            if lhs not in self.nonterminals:
                return False
        return True

# grammar = Grammar()
# grammar.read_from_file("g2.txt")
#
# print("Nonterminals:")
# grammar.print_nonterminals()
#
# print("\nTerminals:")
# grammar.print_terminals()
#
# print("\nProductions:")
# grammar.print_productions()
#
# print("\nIs CFG?")
# print(grammar.is_cfg())
#
# print(grammar.get_productions_for_nonterminal("type"))
