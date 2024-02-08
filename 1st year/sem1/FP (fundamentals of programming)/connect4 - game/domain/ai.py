class AIController:
    def __init__(self, name, piece, opponent):
        self.name = name
        self.piece = piece
        self.opponent = opponent

    def continuous_symbol_pattern(self, board, column, symbol):
        board_table = board.get_board()
        for row in range(board.num_rows):
            if board_table[row][column] == symbol:
                if column <= board.num_columns - 4:
                    if board_table[row][column + 1] == symbol or board_table[row][column - 1] == symbol:
                        if board_table[row][column + 2] == symbol or board_table[row][column - 2] == symbol:
                            if board_table[row][column + 3] == symbol or board_table[row][column - 3] == symbol:
                                return True

        for row in range(board.num_rows-4):
            if board_table[row][column] == symbol:
                if board_table[row + 1][column] == symbol or board_table[row - 1][column] == symbol:
                    if board_table[row + 2][column] == symbol or board_table[row - 2][column] == symbol:
                        if board_table[row + 3][column] == symbol or board_table[row - 3][column] == symbol:
                            return True

        for row in range(board.num_rows-4):
            if board_table[row][column] == symbol:
                if column <= board.num_columns - 4:
                    if board_table[row + 1][column + 1] == symbol or board_table[row - 1][column - 1] == symbol:
                        if board_table[row + 2][column + 2] == symbol or board_table[row - 2][column - 2] == symbol:
                            if board_table[row + 3][column + 3] == symbol or board_table[row - 3][column - 3] == symbol:
                                return True

        for row in range(board.num_rows-4):
            if board_table[row][column] == symbol:
                if column <= board.num_columns - 4:
                    if board_table[row + 1][column - 1] == symbol or board_table[row - 1][column + 1] == symbol:
                        if board_table[row + 2][column - 2] == symbol or board_table[row - 2][column + 2] == symbol:
                            if board_table[row + 3][column - 3] == symbol or board_table[row - 3][column + 3] == symbol:
                                return True

        return False

    def move_disrupts_opponent(self, board, column, piece):
        if self.continuous_symbol_pattern(board, column, piece):
            return True
        return False

    def move_continuous_symbol_pattern(self, board, column, piece):
        if self.continuous_symbol_pattern(board, column, piece):
            return True
        return False

    def get_best_move(self, board):
        if board.is_empty():
            return 3
        for column in range(board.num_columns):
            if board.is_valid_move(column):
                board.make_move(self, column)
                if board.game_won():
                    board.undo_move(column)
                    return column
                elif self.move_disrupts_opponent(board, column, self.opponent.piece):
                    board.undo_move(column)
                    return column
                elif self.move_continuous_symbol_pattern(board, column, self.piece):
                    board.undo_move(column)
                    return column
                else:
                    board.undo_move(column)
                    return column

    def make_move(self, board):
        column = self.get_best_move(board)
        board.make_move(self, column)
