export default class player {
    constructor(x,y,tamany,color) { //El player sera un triangle equilater orientat cap adalt
        this.coordenades = {
            "vertices" : generarTriangle(x,y,tamany) //0.0 0.1 1.0 1.1
        };
        this.color = color;
    }
    
    drawPlayer(){

    }

    mourePlayer(movX,movY){

    }

    disparar(){

    }
}
