import unittest

from services.game_service import GameService


class GameServiceTest(unittest.TestCase):
    def setUp(self) -> None:
        self.game_service = GameService()
        self.game_service.start_game()

    def test_get_board(self):
        self.assertTrue(self.game_service.get_board())

    def test_get_current_player(self):
        self.assertTrue(self.game_service.get_current_player())

    def test_place_piece(self):
        self.game_service.place_piece()
        board = self.game_service.get_board()
        self.assertFalse(board.is_empty())


if __name__ == '__main__':
    unittest.main()
