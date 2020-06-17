import Games,random
print("Добро пожаловать в самую самую простую игру!\n")
again = None
while again!="n":
    players = []
    num = Games.ask_number("Сколько игроков участвовают? 2-5: ",2,5)

    for i in range(num):
        name = input("Имя игрока: ")
        score = random.randrange(100) + 1
        player = Games.Player(name,score)
        players.append(player)

    print("Вот результат игры:")
    for player in players:
        print(player)

    again = Games.ask_yes_no("\n\n Хотите сыграть еще раз? (y/n): ")
input("Press Enter to quit")

