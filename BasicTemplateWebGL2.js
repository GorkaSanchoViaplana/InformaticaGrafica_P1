var gl = null;
var program;


function getWebGLContext() {
  var canvas = document.getElementById("myCanvas");
  try {
    return canvas.getContext("webgl2");
  } catch(e) {}
  return null;
}

function initShaders() {
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, document.getElementById('myVertexShader').text);
  gl.compileShader(vertexShader);

  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, document.getElementById('myFragmentShader').text);
  gl.compileShader(fragmentShader);
  
  program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  program.vertexPositionAttribute = gl.getAttribLocation(program, "VertexPosition");
  gl.enableVertexAttribArray(program.vertexPositionAttribute);
}

function initRendering() {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
}


export function generarCercle(nVertex,origen_x,origen_y,radi) { //Origen sera el centre del cercle. Depenent del nVertes fara coses diferents
    //Fer array i posarlo al draw
    var vertexCercle = [];
    for(var i=0.0;i<=nVertex;i++) {
        var vertex1 = (i * 2 *Math.PI /nVertex);
        var vertex2 = ((i+1)*2*Math.PI / nVertex);
        vertexCercle.push(origen_x,origen_y); //Origen del cercle
        vertexCercle.push(origen_x+radi*Math.cos(vertex1), origen_y+radi*Math.sin(vertex1));
        vertexCercle.push(origen_x+radi*Math.cos(vertex2), origen_y+radi*Math.sin(vertex2));
    }
    return vertexCercle;
}

export function generarCuadrat(origen_x,origen_y,tamany) { //Origen sera el punt d'adalt a l'esquerra
  var vertexCuadrat = [];
  vertexCuadrat.push(origen_x,origen_y); // 0 1
  vertexCuadrat.push(origen_x+tamany,origen_y); // 2 3
  vertexCuadrat.push(origen_x,origen_y+tamany);// 4 5
  //Es repeteix pq son dos 
  vertexCuadrat.push(origen_x+tamany,origen_y); // 6 7
  vertexCuadrat.push(origen_x,origen_y+tamany); // 8 9
  vertexCuadrat.push(origen_x+tamany,origen_y+tamany); // 10 11

  return vertexCuadrat;
}

export function generarTriangle(origen_x,origen_y,tamany){ //El triangle sera equilater
  var vertexTriangle = [];
  vertexTriangle.push(origen_x,origen_y);
  vertexTriangle.push(origen_x+tamany,origen_y);
  vertexTriangle.push(origen_x+tamany/2, origen_y+Math.sqrt(tamany*tamany-tamany/2*tamany/2)); //Toca fer pitagoras :(
  return vertexTriangle;
}


export function initBuffers(model) {
  model.idBufferVertices = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, model.idBufferVertices);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model.vertices), gl.DYNAMIC_DRAW);

  //Iniciar buffer color
}

export function draw(model) {
  gl.bindBuffer(gl.ARRAY_BUFFER, model.idBufferVertices);
  gl.vertexAttribPointer(program.vertexPositionAttribute, 2, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, model.idBufferFragment);
  //gl.

  gl.drawArrays(gl.TRIANGLES, 0, model.vertices.length / 2);  //  Usar drawArrays / Fer servir 3?
}

function dibuixa(model) {
  //Ficar tot

}


function drawScene() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  draw(cercle);
}

export function pintarfons(){
  gl.clear(gl.COLOR_BUFFER_BIT);
}


export function initWebGL() {
  gl = getWebGLContext();
  if (!gl) {
    alert("WebGL 2.0 no está disponible");
    return;
  }
  initShaders();
  //Tocara fer la generacio inicial de enemics i personatge
  initRendering(); //Nomes fa falta 1
  //gl.clear(gl.COLOR_BUFFER_BIT);
  //requestAnimationFrame(drawScene); //Tocara ficar el loop
}


//initWebGL();
