class Player():
    """Участник игры """
    def __init__(self,name, score = 0):
        self.name = name
        self.score = score

    def __str__(self):
        rep = self.name + ":  " + str(self.score)
        return rep

def ask_yes_no(question):
    """Задает вопрос с ответом да или нет"""
    response = None
    while response not in ("y","n"):
        response = input(question).lower()
        if response not in ("y","n"):
            print("Տուֆտում էս, նորից պատասխանի")
    return response

def ask_number(question, low,high):
    """Просит ввести число из заданного диапазона"""
    response = None
    while response not in range(low,high+1):
        response = int(input(question))
    return response

if __name__ == "__main__":
    print("Вы запустили этот модуль напрямую, а не импортировали его")
    input("Press Enter to quit")
