import { generarCercle } from "./BasicTemplateWebGL2.js";
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
    moureBala(movY){
        let vertical = false;
        for(let i=0;i<this.coordenades.vertices.length;i++){
            if(vertical) this.coordenades.vertices[i]+=movY;
            vertical=!vertical;
        }
    }
    retornaXMax(){
        let xMax=-Infinity;
        let horitzontal = true;
        for(let i=0;i<this.coordenades.vertices.length/2;i++){ //Reviso nomes la primera meitat
            if(this.coordenades.vertices[i]>xMax && horitzontal) xMax=this.coordenades.vertices[i];
            horitzontal = !horitzontal;
        }
        return xMax; 
    }
    retornaXMin(){
        let xMin = Infinity;
        let horitzontal = true;
        for(let i=this.coordenades.vertices.length/2;i<this.coordenades.vertices.length;i++){
            if(this.coordenades.vertices[i]<xMin && horitzontal)xMin=this.coordenades.vertices[i];
            horitzontal =!horitzontal;
        }
        return xMin; 
    }
    retornaYMax(){
        let yMax = -Infinity;
        let vertical = false;
        for(let i=0;i<this.coordenades.vertices.length/2;i++){
            if(vertical && this.coordenades.vertices[i]>yMax) yMax=this.coordenades.vertices[i];
            vertical=!vertical;
        }
        return yMax;
    }
    retornaYmin(){
        let yMin = Infinity;
        let vertical = false;
        for(let i=0;i<this.coordenades.vertices.length/2;i++){
            if(vertical && this.coordenades.vertices[i]<yMin) yMin=this.coordenades.vertices[i];
            vertical=!vertical;
        }
        return yMin;
    }

    destruirBala(){

    }
}

