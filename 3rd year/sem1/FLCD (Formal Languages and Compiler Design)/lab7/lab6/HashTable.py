class HashTable:
    def __init__(self):
        self.size = 10
        self.table = [[] for _ in range(self.size)]

    def _hash(self, name):
        return hash(name) % self.size

    def insert(self, name, value):
        position = self._hash(name)
        for i, (key, val) in enumerate(self.table[position]):
            if key == name:
                self.table[position][i] = (key, value)
                return
        self.table[position].append((name, value))

    def __str__(self):
        result = ""
        for i, bucket in enumerate(self.table):
            result += f"Hash value {i}: {bucket}\n"
        return result


    def get_all(self):
        all_items = []
        for bucket in self.table:
            all_items.extend(bucket)
        return all_items

    def look_up(self, name_id_or_const):
        position = self._hash(name_id_or_const)

        for (key, index_in_st) in self.table[position]:

            if key == name_id_or_const:
                return index_in_st

        return None

   # def delete(self, name):
   #     position = self._hash(name)
    #    for (key, val) in self.table[position]:
    #        if key == name:
    #            self.table[position].remove((key, val))

     #   return None


