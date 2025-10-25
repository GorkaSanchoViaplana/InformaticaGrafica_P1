import { drawPoint } from './BasicTemplateWebGL2.js';
import { initBuffers } from './BasicTemplateWebGL2.js';
import { generarPuntsAleatoris } from './BasicTemplateWebGL2.js';

export default class estrellas {
    constructor(nEstrelles,color,tamany) { 
        this.coordenades = {
            "vertices" : generarPuntsAleatoris(nEstrelles)
        };
        this.color = color;
        this.tamany = tamany;
        initBuffers(this.coordenades);
    }
    
    drawEstrellas(){
        drawPoint(this.coordenades,this.color,this.tamany);
    }

}
