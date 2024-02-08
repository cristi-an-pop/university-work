class Player:
    def __init__(self, name, piece):
        self.name = name
        self.piece = piece

    def make_move(self, board):
        column = int(input(f'{self.name}, choose a column (0-6): '))

        while not board.is_valid_move(column):
            column = int(input(f'{self.name}, choose a column (0-6): '))

        board.make_move(self, column)

    def __str__(self):
        return self.name

    def __repr__(self):
        return self.name