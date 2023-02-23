"""
Connect 4 Game
"""

from services.game_services import GameService
from ui.console_ui import ConsoleUI

if __name__ == "__main__":
    game_service = GameService()
    ui = ConsoleUI(game_service)
    ui.start()