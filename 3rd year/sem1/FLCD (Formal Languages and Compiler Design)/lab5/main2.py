import re

class FiniteAutomata:
    def __init__(self, states, alphabet, transitions, initial_state, final_states):
        self.states = states
        self.alphabet = alphabet
        self.transitions = transitions
        self.initial_state = initial_state
        self.final_states = final_states

    def is_dfa(self):
        # Check if the FA is deterministic
        return all((state, symbol) in self.transitions for state in self.states for symbol in self.alphabet)

    def check_sequence(self, sequence):
        # Verify if the sequence is accepted by the DFA
        current_state = self.initial_state
        for symbol in sequence:
            if (current_state, symbol) in self.transitions:
                current_state = self.transitions[(current_state, symbol)]
            else:
                return False
        return current_state in self.final_states

# Define the DFAs for <identifier> and <integer constant>

# DFA for <identifier>
identifier_dfa = FiniteAutomata(
    states={'q0', 'q1'},
    alphabet=set("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_"),
    transitions={
        ('q0', c): 'q1' for c in "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_"
    } | {('q1', c): 'q1' for c in "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_"},
    initial_state='q0',
    final_states={'q1'}
)

# DFA for <integer constant>
integer_constant_dfa = FiniteAutomata(
    states={'q0', 'q1'},
    alphabet=set("0123456789"),
    transitions={
        ('q0', c): 'q1' for c in "0123456789"
    } | {('q1', c): 'q1' for c in "0123456789"},
    initial_state='q0',
    final_states={'q1'}
)

# Scanner function
def scan_tokens(input_string):
    tokens = input_string.split()
    result = []
    for token in tokens:
        if identifier_dfa.check_sequence(token):
            result.append((token, "<identifier>"))
        elif integer_constant_dfa.check_sequence(token):
            result.append((token, "<integer constant>"))
        else:
            result.append((token, "unknown"))
    return result

# Example usage
input_string = "myVar 123 _temp 45678 not_a_token 3abc"
scanned_tokens = scan_tokens(input_string)

for token, token_type in scanned_tokens:
    print(f"{token}: {token_type}")
