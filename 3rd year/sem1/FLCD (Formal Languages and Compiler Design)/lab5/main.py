from finite_automata import FiniteAutomata


def main():
    fa = FiniteAutomata()
    fa.load_from_file("FA2.in")

    while True:
        print("\nFinite Automata Menu:")
        print("1. Display elements")
        print("2. Check sequence (DFA)")
        print("0. Exit")

        choice = input("Choose an option: ")
        if choice == "1":
            fa.display_elements()
        elif choice == "2":
            sequence = input("Enter sequence to check: ")
            if fa.check_sequence(sequence):
                print("The sequence is accepted by the FA.")
            else:
                print("The sequence is not accepted by the FA.")
        elif choice == "0":
            break
        else:
            print("Invalid choice. Please try again.")


if __name__ == "__main__":
    main()
