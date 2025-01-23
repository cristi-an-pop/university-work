from HashTable import HashTable


class SymbolTable:
    def __init__(self):
        self.st = HashTable()

    def insert(self, name_identifier_or_constant, index_in_st):
        self.st.insert(name_identifier_or_constant, index_in_st)

    def get_all(self):
        return self.st.get_all()

    def __str__(self):
        return self.st.__str__()

    def look_up(self, name_identifier_or_constant):
        return self.st.look_up(name_identifier_or_constant)

   # def delete(self, name):
    #    self.st.delete(name)




