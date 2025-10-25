//Aqui es on es dona el joc, unint totes les clases;
import enemy from "./enemy.js";
import player from "./player.js"; 
import balas from "./balas.js";
import estrellas from "./estrellas.js";
import { initWebGL } from "./BasicTemplateWebGL2.js";
import { pintarfons } from "./BasicTemplateWebGL2.js";
import { drawPoint } from "./BasicTemplateWebGL2.js";
let enemics = [];
let jugador;
let balasActivas = [];
let estrellesFons; //bastant goofy pero es demana
let jocActiu = true;
let victoria = false;

const numeroEstrellas = 50;
const numeroEnemics=8; //per a evitar errors ha de ser multiple de 4

const enemyIntervalMoviment = 300; //Temps q li dono al enemic entre moviments
const tempsEntreBalas = 500;

let playerMovX = 0.02;
let playerMovDreta = false;
let playerMovEsquerra = false;

let balaMovY = 0.03;
let tamanyBala = 0.03;
let ultimaBalaTemps=0;

let enemyDireccio = 1; //Pel moviment del enemic
let enemyMovX = 0.03;
let enemyMovY = -0.05;
let enemyUltimMoviment = 0; //Temps desde l'ultim moviment


function loop() {
  if(jocActiu){ 
  update(); 
  render();
  }
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
window.addEventListener("keydown",(e)=>{
  if(e.code === "Escape") jocActiu=!jocActiu; 
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

function destruirBala(i){
  delete balasActivas[i];
  balasActivas.splice(i,1); //Aixo es per a no tenir el array ple de empty
}


function moureBalas(){
    balasActivas.forEach((e, i) =>{
      if(e.retornaYMax()>=1.0) {
        destruirBala(i);  
      }
      e.moureBala(balaMovY);
    });
}

function mourePlayer(){
  if(playerMovDreta && jugador.retornaXmax()<1.0)jugador.mourePlayer(playerMovX);
  else if(playerMovEsquerra && jugador.retornaXmin()> -1.0)jugador.mourePlayer(-playerMovX);

}

function mortEnemics(){
  //Tocara comprovar cada enemic amb cada bala
  //fare for i no forEach ja que el foreach no te break
  //M'ha tocat fer el atribut mort i metode morir pq sino aixo no chuta
  for(let i=0;i<enemics.length;i++){
      let e = enemics[i];
    for(let z=0;z<balasActivas.length;z++){
        let b = balasActivas[z];
        let colisioX= b.retornaXMax()>=e.retornaXMin() && b.retornaXMin()<=e.retornaXMax();
        let colisioY=b.retornaYMax() >= e.retornaYmin() && b.retornaYmin() <= e.retornaYMax();
        if(colisioX && colisioY){
          e.morir();
          destruirBala(z);
          break;
        }
    }
  }
  enemics = enemics.filter(e=>!e.mort)
}


function acabarJoc(){
  if(victoria){
    window.location.href ="jocAcabat.html?resultat=guanyat";
  }else{
    window.location.href="jocAcabat.html?resultat=perdut";
  }
}
function comprovarVictoria(){
  //Victoria = no queden enemics
  //El undefined primer per a evitar errors. nose si hi ha millor metode pero recomanen aixo a stackOverflow
  if(enemics===undefined || enemics.length ==0){
    victoria = true;
    acabarJoc();
  }
  return; 
}

function comprovarDerrota(){
  enemics.forEach(e=>{
    //Mirem si els enemics comparteixen posicio amb el player o han tocat el terra
    if(e.retornaYmin() <= -1.0) acabarJoc();

  });
  return; 
}

function update() { //Part logica del joc
  mortEnemics();
  comprovarVictoria();
  comprovarDerrota();
  moureEnemics();
  mourePlayer();
  moureBalas();
}


function render() { //Tota al part d'anar dibuixant
  pintarfons();
  estrellesFons.drawEstrellas();
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
    let color = [0.0,1,0.0,1.0];
    let bala = new balas(origenX,origenY,tamanyBala,color);
    balasActivas.push(bala);
}


function inicialitzarJoc() {
  initWebGL(); //Inicio shaders i tot
  
  const estrellasColor = [1.0,1.0,1.0,1.0]
  const tamanyEstrella = 0.2;
  estrellesFons = new estrellas(numeroEstrellas,estrellasColor,tamanyEstrella);
  //console.log(estrellesFons);
  //Hauria de pintar el fons o algo amb la primitiva POINTS!!!

  //Declarem las variables dels enemics
  let enemyPosX = -0.8;
  let enemyPosY = 1 ;
  const enemyTamany = 0.2;
  const enemyColor = [1 ,0,0,1.0];
  //Creem els elemics
  for(let i=0;i<numeroEnemics;i++){
    enemyPosX +=0.3
    if(i%4 == 0){
      enemyPosY-=0.4;
      enemyPosX = -0.5
    }
    var e =  new enemy(enemyPosX,enemyPosY,enemyTamany,enemyColor);
    enemics.push(e);
  }
  const playerColor = [0.0,0.0,1,1];
  jugador = new player(-0.1,-0.9,0.2,playerColor);
  //console.log(jugador);
  loop();
}

inicialitzarJoc();



