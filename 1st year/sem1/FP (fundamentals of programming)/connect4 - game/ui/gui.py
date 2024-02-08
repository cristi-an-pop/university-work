"""
Connect 4 GUI using Pygame
"""

import pygame

class GUI:
    def __init__(self, game_service):
        self.game_service = game_service
        self.screen = pygame.display.set_mode((800, 600))
        self.screen.fill((0, 0, 0))

    def start(self):
        pygame.init()
        pygame.display.set_caption("Connect 4")
        self.screen.fill((0, 0, 0))
        font = pygame.font.SysFont('Arial', 30)
        player_vs_player = font.render('Player vs Player', True, (255, 255, 255))
        player_vs_ai = font.render('Player vs AI', True, (255, 255, 255))
        exit_game = font.render('Exit', True, (255, 255, 255))
        self.screen.blit(player_vs_player, (300, 200))
        self.screen.blit(player_vs_ai, (300, 250))
        self.screen.blit(exit_game, (300, 300))
        pygame.display.update()

        while True:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                    quit()
                if event.type == pygame.MOUSEBUTTONDOWN:
                    mouse_pos = pygame.mouse.get_pos()
                    if 300 < mouse_pos[0] < 500 and 200 < mouse_pos[1] < 230:
                        self.screen.fill((0, 0, 0))
                        self.start_game()
                    if 300 < mouse_pos[0] < 500 and 250 < mouse_pos[1] < 280:
                        self.screen.fill((0, 0, 0))
                        self.start_game_with_ai()
                    if 300 < mouse_pos[0] < 500 and 300 < mouse_pos[1] < 330:
                        pygame.quit()
                        quit()

    def start_game(self):
        self.game_service.start_game()
        self.draw_board()
        self.play_game()

    def start_game_with_ai(self):
        self.game_service.start_game_with_ai()
        self.draw_board()
        self.play_game()

    def draw_board(self):
        board = self.game_service.get_board()
        board_data = board.get_board()

        for i in range(6):
            for j in range(7):
                pygame.draw.rect(self.screen, (255, 255, 255), (j * 100, i * 100, 100, 100), 2)

        for i in range(6):
            for j in range(7):
                if board_data[i][j] == 'X':
                    pygame.draw.circle(self.screen, (255, 255, 255), (j * 100 + 50, i * 100 + 50), 40)
                elif board_data[i][j] == 'O':
                    pygame.draw.circle(self.screen, (255, 0, 0), (j * 100 + 50, i * 100 + 50), 40)
        pygame.display.update()

    def play_game(self):
        board = self.game_service.get_board()

        while True:
            if self.game_service.current_player.name == "Computer":
                self.game_service.place_piece()
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                    quit()
                if event.type == pygame.MOUSEBUTTONDOWN:
                    mouse_pos = pygame.mouse.get_pos()
                    if mouse_pos[0] < 700:
                        board.make_move(self.game_service.get_current_player(), mouse_pos[0] // 100)
                        self.game_service.current_player = self.game_service.players[
                            1] if self.game_service.current_player == self.game_service.players[0] else \
                        self.game_service.players[0]
                    self.draw_board()
                    if self.game_service.game_won():
                        self.draw_winner()
                        break
                    if self.game_service.game_tied():
                        self.draw_tie()
                        break


    def draw_winner(self):
        font = pygame.font.SysFont('Arial', 30)
        winner = font.render(f'{self.game_service.get_current_player().name} wins!', True, (255, 255, 255))
        self.screen.blit(winner, (300, 200))
        pygame.display.update()
        pygame.time.delay(2000)
        self.start()

    def draw_tie(self):
        font = pygame.font.SysFont('Arial', 30)
        tie = font.render('Tie!', True, (255, 255, 255))
        self.screen.blit(tie, (300, 200))
        pygame.display.update()
        pygame.time.delay(2000)
        self.start()


