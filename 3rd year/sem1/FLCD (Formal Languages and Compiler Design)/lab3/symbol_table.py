from hash_table.hash_table import HashTable


class SymbolTable:
    def __init__(self, capacity=5):
        self.hash_table = HashTable(capacity)

    def add(self, identifier, value):
        self.hash_table.insert(identifier, value)
        print(f"Added '{identifier}' with value {value} to the symbol table.")

    def get(self, identifier):
        try:
            return self.hash_table.search(identifier)
        except KeyError:
            print(f"Identifier '{identifier}' not found in the symbol table.")
            return None

    def remove(self, identifier):
        try:
            self.hash_table.remove(identifier)
            print(f"Removed '{identifier}' from the symbol table.")
        except KeyError:
            print(f"Identifier '{identifier}' not found in the symbol table.")

    def contains(self, identifier):
        return identifier in self.hash_table

    def print_table(self):
        """
        Print the contents of the symbol table.
        """
        self.hash_table.print_table()

    def size(self):
        return len(self.hash_table)
