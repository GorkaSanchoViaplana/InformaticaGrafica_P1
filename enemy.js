
import {generarCuadrat} from './BasicTemplateWebGL2.js';
import { draw } from './BasicTemplateWebGL2.js';
import { initBuffers } from './BasicTemplateWebGL2.js';

export default class enemy {
    constructor(x,y,tamany,color) {
        //Els enemics seran tots cuadrats
        this.coordenades = {
            "vertices" : generarCuadrat(x,y,tamany) //0.0 0.1 1.0 1.1
        };
        
        this.color = color;
        this.mort = false;
    }

    drawEnemy() {
        initBuffers(this.coordenades);
        draw(this.coordenades,this.color);
    }

    moureEnemic(movX,movY){ //Els enemics s'aniran movent i per tant s'han d'anar actualitzant les coordenades. Si retrocedeixen sera negatiu
        let horitzontal = true; //El primer es al eix X
        for(let i=0;i<this.coordenades.vertices.length;i++){
            horitzontal ? this.coordenades.vertices[i]+=movX : this.coordenades.vertices[i]+=movY;
            horitzontal = !horitzontal;
        }
    }

    retornaXMax(){
        return this.coordenades.vertices[2]; //Es la X del vertex d'abaix a la dreta  
    }
    retornaXMin(){
        return this.coordenades.vertices[0]; //Es la Y del vertex d'adalt a l'esquerra
    }
    retornaYMax(){
        return this.coordenades.vertices[5];
    }
    retornaYmin(){
        return this.coordenades.vertices[1]; //Es la Y del vertex d'abaix a l'esquerra
    }
    morir(){
        this.mort = true;
    }


}
