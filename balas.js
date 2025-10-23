import { generarCercle } from "./BasicTemplateWebGL2";
import { draw } from './BasicTemplateWebGL2.js';
import { initBuffers } from './BasicTemplateWebGL2.js';
export default class balas{
    constructor(x,y,tamany,color) {
        //Els enemics seran tots cuadrats
        this.coordenades = {
            "vertices" : generarCercle(5,x,y,tamany) //0.0 0.1 1.0 1.1
        };
        this.color = color;
    }
    drawBala() {
        initBuffers(this.coordenades);
        draw(this.coordenades);
        //Assignar color aqui??
    }

}