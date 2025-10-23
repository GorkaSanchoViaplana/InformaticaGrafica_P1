//Aqui es on es dona el joc, unint totes les clases;
import enemy from "./enemy.js";
import player from "./player.js"; 
import { initWebGL } from "./BasicTemplateWebGL2.js";
import { pintarfons } from "./BasicTemplateWebGL2.js";
import { generarCercle } from "./BasicTemplateWebGL2.js";
let enemics = [];
let jugador;
let balas = [];

let playerMovX = 0.02;
let playerMovDreta = false;
let playerMovEsquerra = false;

let enemyDireccio = 1; //Pel moviment del enemic
let enemyMovX = 0.01;
let enemyMovY = -0.03;
let enemyIntervalMoviment = 300; //Temps q li dono al enemic entre moviments
let enemyTimerMoviment = 0; //Temps desde l'ultim moviment


function loop() {
  update(); 
  render();
  requestAnimationFrame(loop);
}


function moureEnemics(temps){
  enemyTimerMoviment += temps;
  if(enemyTimerMoviment < enemyIntervalMoviment) return; //Osea no fa res
  enemyTimerMoviment = 0;

  let tocaDreta = false;
  let tocaEsquerra = false; //ELs 2 son per a saber si els enemics estan al extrem
  //Primer mirem si esta al extrem y despres ja el movem

  enemics.forEach(e => {
    if(e.retornaXMax()>=0.9) tocaDreta=true;
    if(e.retornaXMin()<=-0.9) tocaEsquerra=true;
  });
  if(tocaDreta || tocaEsquerra){
    enemics.forEach(e=> e.moureEnemic(0.0,enemyMovY));
    enemyDireccio *=-1; //canvi de direccio
  }
  
    enemics.forEach(e=> e.moureEnemic(enemyMovX*enemyDireccio,0.0));
}

window.addEventListener("keydown",(e)=>{
  if(e.code === "ArrowLeft" || e.code ==="KeyA") playerMovEsquerra = true;
  if(e.code === "ArrowRight" || e.code ==="KeyD") playerMovDreta = true;
});
window.addEventListener("keyup",(e)=>{
  if(e.code === "ArrowLeft" || e.code ==="KeyA") playerMovEsquerra = false;
  if(e.code === "ArrowRight" || e.code ==="KeyD") playerMovDreta = false;
});

window.addEventListener("click",(e)=>{
  if(e.code === "Space") ; //fer el dispar de la bala i afegirla a la llista
});


function mourePlayer(){
  if(playerMovDreta && jugador.retornaXmax()<1.0)jugador.mourePlayer(playerMovX);
  else if(playerMovEsquerra && jugador.retornaXmin()> -1.0)jugador.mourePlayer(-playerMovX);

}

function comprovarVictoria(){
  //Victoria = no queden enemics
  if(enemics.length === 0){
    //
  }
  return; //No fem res
}

function comprovarDerrota(){
  enemics.forEach(e=>{
    //Mirem si els enemics comparteixen posicio amb el player o han tocat el terra
  });
  return; //No fem res
}

function update() { //Part logica del joc
  //Comprovar si mor algun enemic
  comprovarVictoria();
  comprovarDerrota();
  moureEnemics();
  mourePlayer();
  //mourebales

  
}


function render() { //Tota al part d'anar dibuixant
  pintarfons();
  enemics.forEach(e => e.drawEnemy());
  jugador.drawPlayer();

}


function inicialitzarJoc() {
  initWebGL(); //Inicio shaders i tot
  //Declarem las variables dels enemics
  let enemyPosX = -0.8;
  let enemyPosY = 0.5;
  const enemyTamany = 0.2;
  const enemyColor = [0.1,0,0,1.0];
  //Creem els elemics
  for(let i=0;i<8;i++){
    enemyPosX +=0.3
    if(i==4){
      enemyPosY-=0.4;
      enemyPosX = -0.5
    }
    var e =  new enemy(enemyPosX,enemyPosY,enemyTamany,enemyColor);
    enemics.push(e);
  }
  let playerColor = [0.0,0.0,0.1,1];
  jugador = new player(-0.1,-0.9,0.2,playerColor);
  let cercle = generarCercle(4,0,0,0.1);
  console.log(cercle);
  loop();
}

inicialitzarJoc();



