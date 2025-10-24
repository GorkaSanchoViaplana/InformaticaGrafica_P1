//Aqui es on es dona el joc, unint totes les clases;
import enemy from "./enemy.js";
import player from "./player.js"; 
import balas from "./balas.js";
import { initWebGL } from "./BasicTemplateWebGL2.js";
import { pintarfons } from "./BasicTemplateWebGL2.js";
import { generarCercle } from "./BasicTemplateWebGL2.js";
let enemics = [];
let jugador;
let balasActivas = [];

const enemyIntervalMoviment = 300; //Temps q li dono al enemic entre moviments
const tempsEntreBalas = 500;

let playerMovX = 0.02;
let playerMovDreta = false;
let playerMovEsquerra = false;

let balaMovY = 0.03;
let tamanyBala = 0.03;
let ultimaBalaTemps=0;

let enemyDireccio = 1; //Pel moviment del enemic
let enemyMovX = 0.01;
let enemyMovY = -0.03;
let enemyUltimMoviment = 0; //Temps desde l'ultim moviment


function loop() {
  update(); 
  render();
  requestAnimationFrame(loop);
}


window.addEventListener("keydown",(e)=>{
  if(e.code === "ArrowLeft" || e.code ==="KeyA") playerMovEsquerra = true;
  if(e.code === "ArrowRight" || e.code ==="KeyD") playerMovDreta = true;
});
window.addEventListener("keyup",(e)=>{
  if(e.code === "ArrowLeft" || e.code ==="KeyA") playerMovEsquerra = false;
  if(e.code === "ArrowRight" || e.code ==="KeyD") playerMovDreta = false;
});

window.addEventListener("keydown",(e)=>{
  if(e.code === "Space") disparaBala(); //Falta afegir condicional del timer
});

function moureEnemics(temps){
  enemyUltimMoviment += temps;
  if(enemyUltimMoviment < enemyIntervalMoviment) return; //Osea no fa res
  enemyUltimMoviment = 0;

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

function moureBalas(){
    let tocaAdalt = false;

    balasActivas.forEach((e, i) =>{
      if(e.retornaYMax()>=1.0) {
        delete balasActivas[i];
        balasActivas.splice(i,i); //Aixo es per a no tenir el array ple de empty
        //console.log(balasActivas);
      }
      e.moureBala(balaMovY);
    });
}

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
  moureBalas();
}


function render() { //Tota al part d'anar dibuixant
  pintarfons();
  enemics.forEach(e => e.drawEnemy());
  jugador.drawPlayer();
  balasActivas.forEach(e => e.drawBala());

}

function disparaBala(){
  //Toca ficar timer pq sino es una locura
    const tempsActual = Date.now(); //Literal el temps q ha pasat desde el 1970 fins avui
    if(tempsActual - ultimaBalaTemps < tempsEntreBalas)return;
    ultimaBalaTemps = tempsActual;
    let origenX = jugador.retornaXcentral();
    let origenY = jugador.retornaYcentral();
    let color = [0.0,0.1,0.0,1.0];
    let bala = new balas(origenX,origenY,tamanyBala,color);
    balasActivas.push(bala);
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
  loop();
}

inicialitzarJoc();



