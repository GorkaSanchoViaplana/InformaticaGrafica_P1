
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
    }

    drawEnemy() {
        initBuffers(this.coordenades);
        draw(this.coordenades);
        //Assignar color aqui??
    }

    moureEnemic(movX,movY){ //Els enemics s'aniran movent i per tant s'han d'anar actualitzant les coordenades. Si retrocedeixen sera negatiu
        var horitzontal = true; //El primer es al eix X
        for (coordeanda in this.coordenades){
            if(horitzontal){
                coordeanda = coordeanda+movX;
            }
            else{
                coordeanda = coordeanda+movY;
            }
            horitzontal = !horitzontal;
        }

    }

}
