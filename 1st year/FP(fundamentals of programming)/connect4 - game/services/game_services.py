from domain.ai import AIController
from domain.player import Player
from domain.board import Board


class GameService:
    def __init__(self):
        self.board = None
        self.players = []
        self.current_player = None

    def start_game(self):
        self.board = Board()
        self.players = [Player('Player 1', 'X'), Player('Player 2', 'O')]
        self.current_player = self.players[0]

    def start_game_with_ai(self):
        self.board = Board()
        self.players = [Player('Player 1', 'X'), AIController('Computer', 'O', Player('Player 1', 'X'))]
        self.current_player = self.players[1]

    def place_piece(self):
        self.current_player.make_move(self.board)
        self.current_player = self.players[1] if self.current_player == self.players[0] else self.players[0]

    def game_won(self):
        return self.board.game_won()

    def game_tied(self):
        return self.board.game_tied()

    def get_board(self):
        return self.board

    def get_current_player(self):
        return self.current_player
