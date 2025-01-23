import re


class FiniteAutomata:
    def __init__(self, filename):
        self.states = []
        self.alphabet = []
        self.transitions = []
        self.initial_state = ""
        self.final_states = []

        self.read_from_file(filename)

    def read_from_file(self, filename):
        with open(filename, 'r') as file:
            lines = file.readlines()

        for line in lines:
            line = line.strip()

            if line.startswith("Q = "):
                self.states = [state.strip() for state in line[4:].split(',')]
            # Reading alphabet
            elif line.startswith("E = "):
                self.alphabet = [symbol.strip() for symbol in line[4:].split(',')]
            # Reading transitions
            elif '->' in line:
                parts = line.split('->')
                from_part = re.split(r'[\[\],]+', parts[0])

                from_state = from_part[0]
                symbols = from_part[1:]

                to_state = parts[1].strip()

                for symbol in symbols:
                    if symbol != ' ':
                        self.transitions.append((from_state, symbol.strip(), to_state))


            elif line.startswith("F ="):
                self.final_states = [state.strip() for state in line[4:].split(',')]

            elif "q0=" in line:
                initial_state_parts = line.split('=')
                if initial_state_parts[0].strip() == 'q0':
                    self.initial_state = initial_state_parts[1].strip()

    def display_elements(self):
        while True:
            print("\nFinite Automaton Menu")
            print("1. Display States")
            print("2. Display Alphabet")
            print("3. Display Transitions")
            print("4. Display Initial State")
            print("5. Display Final States")
            print("6. Exit")

            choice = input("Select an option (1-6): ")

            if choice == '1':
                self.display_states()
            elif choice == '2':
                self.display_alphabet()
            elif choice == '3':
                self.display_transitions()
            elif choice == '4':
                self.display_initial_state()
            elif choice == '5':
                self.display_final_states()
            elif choice == '6':
                print("Exiting the program.")
                break
            else:
                print("Invalid option. Please try again.")

    def display_states(self):
        print("States:", ', '.join(self.states))

    def display_alphabet(self):
        print("Alphabet:", ', '.join(self.alphabet))

    def display_transitions(self):
        print("Transitions:")
        for transition in self.transitions:
            print(f"{transition[0]}, {transition[1]} -> {transition[2]}")

    def display_initial_state(self):
        print("Initial State:", self.initial_state)

    def display_final_states(self):
        print("Final States:", ', '.join(self.final_states))

    def verify_sequence(self, sequence):
        current_state = self.initial_state
        for symbol in sequence:
            found_transition = False
            for (state, symbol_tr, next_state) in self.transitions:
                if state == current_state and symbol == symbol_tr:
                    current_state = next_state
                    found_transition = True
                    break
            if not found_transition:
                return False
        return current_state in self.final_states

    def is_identifier(self, sequence):
        current_state = self.initial_state
        for symbol in sequence:
            found_transition = False
            for (state, symbol_tr, next_state) in self.transitions:
                if state == current_state and symbol == symbol_tr:
                    current_state = next_state
                    found_transition = True
                    break
            if not found_transition:
                return False
        return current_state == 'q2'

    def is_integer_constant(self, sequence):
        current_state = self.initial_state
        for symbol in sequence:
            found_transition = False
            for (state, symbol_tr, next_state) in self.transitions:
                if state == current_state and symbol == symbol_tr:
                    current_state = next_state
                    found_transition = True
                    break
            if not found_transition:
                return False
        return current_state == 'q5' or current_state == 'q6'
