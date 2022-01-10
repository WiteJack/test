const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const coint = document.getElementById("coint");

document.addEventListener("keydown", function(event){
    jump();
});

function jump(){
    if(dino.classList !="jump"){
        dino.classList.add("jump")
    }
    setTimeout( function(){
        dino.classList.remove("jump")
    }, 500)
}
var coints = 0;
let isAlive = setInterval( function(){
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    if(cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140){
        coints++;
        document.getElementById("coint").innerHTML = coints;
    }
}, 200)

function resetCounter() {
    coints = 0;
    document.getElementById("coint").innerHTML = coints;
}
/* Запрет кнопки пробел */

document.querySelector('#upperCase').addEventListener('keydown', function(e) {
    console.log(e.which);
    
    if (e.which === 32) {
      e.preventDefault();
    }
  });