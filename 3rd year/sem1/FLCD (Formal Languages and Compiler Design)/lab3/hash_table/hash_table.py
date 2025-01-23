from hash_table.node import Node


class HashTable:
    def __init__(self, capacity=5, load_factor_threshold=0.7):
        """
        Initialize the hash table with a given capacity and load factor threshold.

        Parameters:
        capacity (int): The initial capacity of the hash table.
        load_factor_threshold (float): The load factor at which to resize the table.
        """
        self.capacity = capacity
        self.size = 0
        self.table = [None] * capacity
        self.load_factor_threshold = load_factor_threshold

    def _hash(self, key):
        """
        Compute the hash for the given key.

        Parameters:
        key (str): The key to hash.

        Returns:
        int: The index within the table.
        """
        return hash(key) % self.capacity

    def _resize(self):
        """
        Resize the hash table when the load factor exceeds the threshold.
        Double the capacity and rehash all existing entries.
        """
        print("Resizing hash table from", self.capacity, "to", self.capacity * 2)
        new_capacity = self.capacity * 2
        new_table = [None] * new_capacity
        old_table = self.table

        self.capacity = new_capacity
        self.table = new_table
        self.size = 0

        # Rehash all entries into the new table
        for node in old_table:
            current = node
            while current:
                self.insert(current.key, current.value)
                current = current.next

    def _load_factor(self):
        """
        Calculate the current load factor of the hash table.

        Returns:
        float: The load factor.
        """
        return self.size / self.capacity

    def insert(self, key, value):
        """
        Insert a key-value pair into the hash table.

        If the load factor exceeds the threshold, the table is resized.

        Parameters:
        key (str): The key to insert.
        value (Any): The value associated with the key.
        """
        if self._load_factor() > self.load_factor_threshold:
            self._resize()

        index = self._hash(key)

        if self.table[index] is None:
            self.table[index] = Node(key, value)
            self.size += 1
        else:
            current = self.table[index]
            while current:
                if current.key == key:
                    current.value = value  # Update the value if the key exists
                    return
                current = current.next
            # Insert a new node at the head of the list
            new_node = Node(key, value)
            new_node.next = self.table[index]
            self.table[index] = new_node
            self.size += 1

    def search(self, key):
        """
        Search for a key in the hash table and return the associated value.

        Parameters:
        key (str): The key to search for.

        Returns:
        Any: The value associated with the key, or raise a KeyError if not found.
        """
        index = self._hash(key)

        current = self.table[index]
        while current:
            if current.key == key:
                return current.value
            current = current.next

        raise KeyError(f"Key '{key}' not found.")

    def remove(self, key):
        """
        Remove a key-value pair from the hash table.

        Parameters:
        key (str): The key to remove.

        Raises:
        KeyError: If the key is not found in the table.
        """
        index = self._hash(key)

        previous = None
        current = self.table[index]

        while current:
            if current.key == key:
                if previous:
                    previous.next = current.next
                else:
                    self.table[index] = current.next
                self.size -= 1
                return
            previous = current
            current = current.next

        raise KeyError(f"Key '{key}' not found.")

    def __len__(self):
        """
        Get the current size of the hash table (number of elements).

        Returns:
        int: The number of elements in the table.
        """
        return self.size

    def __contains__(self, key):
        """
        Check if a key is in the hash table.

        Parameters:
        key (str): The key to check for.

        Returns:
        bool: True if the key is in the table, False otherwise.
        """
        try:
            self.search(key)
            return True
        except KeyError:
            return False

    def print_table(self):
        """
        Print the current contents of the hash table.
        """
        for i, node in enumerate(self.table):
            if node:
                print(f"Index {i}: ", end="")
                current = node
                while current:
                    print(f"({current.key}, {current.value}) -> ", end="")
                    current = current.next
                print("None")
            else:
                print(f"Index {i}: None")


# Driver code
if __name__ == '__main__':
    # Create a hash table with an initial capacity of 5
    ht = HashTable(5)

    # Add key-value pairs to the hash table
    ht.insert("apple", 3)
    ht.insert("banana", 2)
    ht.insert("cherry", 5)
    ht.insert("date", 6)
    ht.insert("elderberry", 7)

    # Check if the hash table contains certain keys
    print("apple" in ht)  # True
    print("durian" in ht)  # False

    # Get the value for a key
    print(ht.search("banana"))  # 2

    # Update the value for a key
    ht.insert("banana", 4)
    print(ht.search("banana"))  # 4

    # Remove a key
    ht.remove("apple")

    # Check the size of the hash table
    print(len(ht))  # 4

    # Print the entire hash table
    ht.print_table()
