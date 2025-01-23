from hash_table.hash_table import HashTable


class SymbolTable:
    def __init__(self, capacity=5):
        self.hash_table = HashTable(capacity)
        self.current_index = 0

    def add(self, identifier):
        """
        Add the identifier to the symbol table if not already present.
        Return its position (index).
        """
        if not self.contains(identifier):
            self.hash_table.insert(identifier, self.current_index)
            self.current_index += 1
        return self.hash_table.search(identifier)

    def get(self, identifier):
        """
        Retrieve the position (index) of the identifier.
        If not found, return None.
        """
        try:
            return self.hash_table.search(identifier)
        except KeyError:
            return None

    def remove(self, identifier):
        """
        Remove an identifier from the symbol table.
        """
        try:
            self.hash_table.remove(identifier)
        except KeyError:
            raise ValueError(f"Identifier '{identifier}' not found in the symbol table.")

    def contains(self, identifier):
        """
        Check if the identifier is already in the symbol table.
        """
        return identifier in self.hash_table

    def size(self):
        """
        Get the current size of the symbol table.
        """
        return len(self.hash_table)

    def get_index(self, identifier):
        """
        Return the index of the identifier.
        """
        return self.get(identifier)

    def __str__(self):
        """
        Return a string representation of the contents of the symbol table.
        """
        result = []
        for i, node in enumerate(self.hash_table.table):
            if node:
                chain = f"Index {i}: "
                current = node
                while current:
                    chain += f"({current.key}, {current.value}) -> "
                    current = current.next
                chain += "None"
                result.append(chain)
            else:
                result.append(f"Index {i}: None")
        return "\n".join(result)
