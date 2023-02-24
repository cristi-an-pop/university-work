"""
Connect 4 Game
"""

from services.game_services import GameService
from ui.console_ui import ConsoleUI
from ui.gui import GUI

if __name__ == "__main__":
    game_service = GameService()
    print("Welcome to Connect 4!")
    print("Choose UI:")
    print("1. Console")
    print("2. GUI")
    print("0. Exit")
    option = int(input("Choose an option: "))
    if option == 1:
        ui = ConsoleUI(game_service)
        ui.start()
    elif option == 2:
        ui = GUI(game_service)
        ui.start()