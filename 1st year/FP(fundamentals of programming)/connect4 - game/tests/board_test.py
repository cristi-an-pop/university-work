import unittest

from domain.board import Board
from domain.player import Player


class BoardTest(unittest.TestCase):
    def setUp(self) -> None:
        self.board = Board()

    def test_board_is_empty(self):
        self.assertTrue(self.board.is_empty())

    def test_board_make_move(self):
        self.board.make_move(Player('Player', 'X'), 0)
        self.assertFalse(self.board.is_empty())

    def test_board_valid_move(self):
        self.assertTrue(self.board.is_valid_move(0))


if __name__ == '__main__':
    unittest.main()
