const heroes = [
  {
    name: 'Slate Slabrock',
    type: 'dwarf',
    damage: 5,
    health: 100,
    picture: 'https://cdn-icons-png.flaticon.com/512/3408/3408545.png',
  },
  {
    name: 'Flint Ironstag',
    type: 'elf',
    damage: 10,
    health: 50,
    picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCw_3MkNpeHDcPfeh48KtjiyX4FDi2QWRkqNafAyZECsjyqMyQKMpN17ZEePd-KcA0yHY&usqp=CAU',
  }
]


const boss = {
  name: 'George',
  health: 100,
  maxHealth: 100,
  damage: 5,
  level: 1
}

let heroPoints = 0

function restoreHeroHealth() {
  heroes.forEach(hero => {
    hero.health = 100
  });
}

function restoreBossHealth() {
  boss.health = boss.maxHealth
}

function addHealth(points) {
  heroes.forEach(hero => {
    hero.health += points
  });
  drawScreen()
}

function levelUpBoss() {
  addHeroPoints(boss.maxHealth)
  boss.level++
  boss.maxHealth = boss.level * 100
}

function damageBoss() {
  let damage = heroes[0].damage + heroes[1].damage
  boss.health -= damage
  if (bossIsDefeated()) {
    levelUpBoss()
    restoreBossHealth()
  }
  addHeroPoints(damage)
  drawScreen()
}

function addHeroPoints(points) {
  heroPoints += points
}

function bossIsDefeated() {
  return boss.health <= 0
}

function damageHeros() {
  let damage = boss.damage
  heroes.forEach(hero => {
    hero.health -= damage
  });
  drawScreen()
}
function drawScreen() {
  let template = /*html*/`
  <section class="row my-3">
      <div class="col-3 m-2 border">
        <p>Hero Points: ${heroPoints}</p>
      </div>
      <div class="col-3 m-2 border">
        <p>${heroes[0].name}</p>
        <p>Health: ${heroes[0].health}</p>
        <p>Type: ${heroes[0].type}</p>
      </div>
      <div class="col-3 m-2 border">
        <p>${heroes[1].name}</p>
        <p>Health: ${heroes[1].health}</p>
        <p>Type: ${heroes[1].type}</p>
      </div>
    </section>
    <section class="row d-flex justify-content-center">
      <div class="col-4 border">
        <p>Health: ${boss.health}</p>
        <h2>${boss.name}</h2>
        <img onclick="damageBoss()" src="https://cdn-icons-png.flaticon.com/512/1236/1236412.png" class="img-fluid rounded-top" alt="boss">
      </div>
    </section>
    <section class="row d-flex justify-content-between my-3">
      <div class="col-4 border">
        <button onclick="addHealth(10)">BUY Health +10</button>
        <button onclick="addHealth(20)">BUY Health +20</button>
        <button onclick="addHealth(50)">BUY Health +50</button>
      </div>
      <div class="col-2 border">
        <button onclick="resetGame()">Reset</button>
      </div>
    </section>
`
  document.getElementById('main').innerHTML = template
}

function initBossHealth() {
  boss.level = 1
  boss.maxHealth = boss.level * 100
}

function resetGame() {
  restoreHeroHealth()
  initBossHealth()
  restoreBossHealth()
  heroPoints = 0
  drawScreen()
  setInterval(damageHeros, 5000)
}


resetGame()