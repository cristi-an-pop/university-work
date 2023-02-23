from texttable import Texttable

class Board:
    def __init__(self, num_rows=6, num_columns=7):
        self.num_rows = num_rows
        self.num_columns = num_columns
        self._data = [['' for j in range(self.num_columns)] for i in range(self.num_rows)]

    def is_valid_move(self, column):
        return 0 <= column < self.num_columns and self._data[0][column] == ''

    def make_move(self, player, column):
        for row in range(self.num_rows - 1, -1, -1):
            if self._data[row][column] == '':
                self._data[row][column] = player.piece
                break

    def get_board(self):
        return self._data

    def get_piece(self, row, column):
        return self._data[row][column]

    def _is_horizontal_win(self, row, column):
        piece = self._data[row][column]
        return column <= self.num_columns - 4 and piece == self._data[row][column + 1] == self._data[row][column + 2] == self._data[row][column + 3]

    def _is_vertical_win(self, row, column):
        piece = self._data[row][column]
        return row <= self.num_rows - 4 and piece == self._data[row + 1][column] == self._data[row + 2][column] == self._data[row + 3][column]

    def _is_diagonal_win_from_top_left(self, row, column, piece):
        return row <= self.num_rows - 4 and column <= self.num_columns - 4 and piece == self._data[row + 1][column + 1] == self._data[row + 2][column + 2] == self._data[row + 3][column + 3]

    def _is_diagonal_win_from_top_right(self, row, column, piece):
        return row <= self.num_rows - 4 and column >= 3 and piece == self._data[row + 1][column - 1] == self._data[row + 2][column - 2] == self._data[row + 3][column - 3]

    def _is_diagonal_win(self, row, column):
        piece = self._data[row][column]
        return self._is_diagonal_win_from_top_left(row, column, piece) or self._is_diagonal_win_from_top_right(row, column, piece)

    def game_won(self):
        for row in range(self.num_rows):
            for column in range(self.num_columns):
                if self._data[row][column] != '':
                    if self._is_horizontal_win(row, column) or self._is_vertical_win(row, column) or self._is_diagonal_win(row, column):
                        return True
        return False

    def game_tied(self):
        for row in range(self.num_rows):
            for column in range(self.num_columns):
                if self._data[row][column] == '':
                    return False
        return True

    def is_empty(self):
        for row in range(self.num_rows):
            for column in range(self.num_columns):
                if self._data[row][column] != '':
                    return False
        return True

    def num_columns(self):
        return self.num_columns

    def num_rows(self):
        return self.num_rows

    def undo_move(self, column):
        for row in range(self.num_rows):
            if self._data[row][column] != '':
                self._data[row][column] = ''
                break

    def __str__(self):
        table = Texttable()
        table.add_rows(self._data, header=False)
        return table.draw()