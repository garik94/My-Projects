class Player(object):
    """Игрок в экшен игре"""
    def blast(self,enemy):
        print("Игрок стреляет во врага.\n")
        enemy.dye()

class Alien(object):
    """Враждебный пришелец инопланетянин в экшен-игре"""
    def dye(self):
        print("Тяжело дыша, пришелец произносит: Ну вот и все. Спета моя песенка.\n" \
              "Уже и в глазах темнеет... передай полутра милионам моих личинок, что я любил их...\n" \
              "Прощяй безжалостный мир.\n")

print("  Гибель пришельца \n")
hero = Player()
invader = Alien()
hero.blast(invader)

input("Print Enter to Quit")