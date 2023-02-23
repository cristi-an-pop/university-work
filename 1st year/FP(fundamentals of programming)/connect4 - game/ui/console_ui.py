class ConsoleUI:
    def __init__(self, game_service):
        self.game_service = game_service

    def print_board(self):
        board = self.game_service.get_board()
        print(board)

    def play_game(self):
        while True:
            current_player = self.game_service.get_current_player()
            print(f'{current_player.name}\'s turn')
            self.game_service.place_piece()
            self.print_board()
            if self.game_service.game_won():
                print(f'{current_player.name} wins!')
                break
            if self.game_service.game_tied():
                print('Tie!')
                break

    def start(self):
        print("Welcome to Connect 4!")
        print("1. 2 Players")
        print("2. 1 Player vs Computer")
        print("0. Exit")
        option = int(input("Choose an option: "))
        if option == 1:
            self.game_service.start_game()
            self.print_board()
            self.play_game()
        elif option == 2:
            self.game_service.start_game_with_ai()
            self.print_board()
            self.play_game()
        elif option == 0:
            return