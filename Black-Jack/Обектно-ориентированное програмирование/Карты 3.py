class Cards(object):
    RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "D", "K"]
    SUITS = ["c", "d", "h", "s"]

    def __init__(self, rank, suit):
        self.rank = rank
        self.suit = suit

    def __str__(self):
        rep = self.rank + self.suit
        return rep


class Unprintable_Card(Cards):
    """Карта, номинал которого и масть не могут быть вшведены"""

    def __str__(self):
        return "<Нельзя напечатать>"


class Positionablel_Card(Cards):
    """Карта которую можно положить лицом или рубашкой вверх"""

    def __init__(self, rank, suit, face_up=True):
        super(Positionablel_Card, self).__init__(rank, suit)
        self.is_face_up = face_up

    def __str__(self):
        if self.is_face_up:
            rep = super().__str__()
        else:
            rep = "XX"
        return rep

    def flip(self):
        self.is_face_up = not self.is_face_up

card1 = Cards("A","c")
card2 = Unprintable_Card("A", "d")
card3 = Positionablel_Card("A","h")
print("Печатаю обьект Card:")
print(card1)
print("Теперь печатаю обьект Unprintable_Card:")
print(card2)
print("Теперь печатаю оьект Positionablel_card:")
print(card3)
print("Переворачиваю обьект Positionablel_card:")
card3.flip()
print("\n\nПечатаю обьект Positionablel_card:")
print(card3)
input("\n\n Press Enter to quit")
