import re

from alembic.command import current


class FiniteAutomata:
    def __init__(self):
        self.states = set()
        self.alphabet = set()
        self.transitions = {}
        self.initial_state = None
        self.final_states = set()

    def load_from_file(self, file_path):
        with open(file_path, 'r') as file:
            lines = file.readlines()

        state_pattern = re.compile(r"States:\s*\{(.+?)\}")
        alphabet_pattern = re.compile(r"Alphabet:\s*\{(.+?)\}")
        transition_pattern = re.compile(r"(\w+),\s*([\w;]+)\s*->\s*(\w+)")
        initial_pattern = re.compile(r"Initial State:\s*(\w+)")
        final_states_pattern = re.compile(r"Final States:\s*\{(.+?)\}")

        for line in lines:
            if state_pattern.match(line):
                self.states = set(state_pattern.search(line).group(1).split(", "))
            elif alphabet_pattern.match(line):
                self.alphabet = set(alphabet_pattern.search(line).group(1).split(", "))
            elif initial_pattern.match(line):
                self.initial_state = initial_pattern.search(line).group(1)
            elif final_states_pattern.match(line):
                self.final_states = set(final_states_pattern.search(line).group(1).split(", "))
            elif transition_pattern.match(line):
                state_from, symbols, state_to = transition_pattern.search(line).groups()
                for symbol in symbols.split(";"):
                    symbol = symbol.strip()
                    if (state_from, symbol) not in self.transitions:
                        self.transitions[(state_from, symbol)] = state_to

    def display_elements(self):
        print("States:", self.states)
        print("Alphabet:", self.alphabet)
        print("Transitions:")
        for (state_from, symbol), state_to in self.transitions.items():
            print(f"  {state_from}, {symbol} -> {state_to}")
        print("Initial State:", self.initial_state)
        print("Final States:", self.final_states)

    def is_dfa(self):
        return all((state, symbol) in self.transitions for state in self.states for symbol in self.alphabet)

    def check_sequence(self, sequence):
        if not self.is_dfa():
            raise ValueError("FA is not deterministic")
        current_state = self.initial_state
        for symbol in sequence:
            if (current_state, symbol) in self.transitions:
                current_state = self.transitions[(current_state, symbol)]
            else:
                return False
        return current_state in self.final_states

    def accepts(self, sequence, start_state=None, final_states=None):
        current_state = start_state if start_state is not None else self.initial_state
        final_states = final_states if final_states is not None else self.final_states

        for symbol in sequence:
            if (current_state, symbol) in self.transitions:
                current_state = self.transitions[(current_state, symbol)]
            else:
                return False

        return current_state in final_states
