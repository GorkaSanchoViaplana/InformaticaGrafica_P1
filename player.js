import { draw } from './BasicTemplateWebGL2.js';
import { initBuffers } from './BasicTemplateWebGL2.js';
import { generarTriangle } from './BasicTemplateWebGL2.js';
export default class player {
    constructor(x,y,tamany,color) { //El player sera un triangle equilater orientat cap adalt
        this.coordenades = {
            "vertices" : generarTriangle(x,y,tamany) //0.0 0.1 1.0 1.1
        };
        this.color = color;
    }
    
    drawPlayer(){
        initBuffers(this.coordenades);
        draw(this.coordenades);
    }

    mourePlayer(movX){
        let horitzontal = true; //El primer es al eix X
        for(let i=0;i<this.coordenades.vertices.length;i++){
            if(horitzontal) this.coordenades.vertices[i]+=movX;
            horitzontal = !horitzontal;
        }
    }

    retornaXmin(){
        return this.coordenades.vertices[0];
    }
    retornaXmax(){
        return this.coordenades.vertices[2];
    }
    retornYmin(){
        return this.coordenades.vertices[1];
    }
    retornaYmax(){
        return this.coordenades.vertices[5];
    }
    retornaXcentral(){
        return this.coordenades.vertices[4];
    }
    retornaYcentral(){
        return this.coordenades.vertices[5];
    }

}
