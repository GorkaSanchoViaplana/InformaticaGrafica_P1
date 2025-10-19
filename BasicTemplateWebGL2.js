import player from "player.js";
import enemy from "enemy.js";
var gl = null;
var program;

  var cercle = {
    "vertices" : generarCercle(360,0,0,0.3)
  };



function loop() {
  update(); 
  render();
  requestAnimationFrame(loop);
}

function update() {
  //Ficar logica joc
}

function render() {
    drawScene();
}

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


function generarCercle(nVertex,origen_x,origen_y,radi) { //Origen sera el centre del cercle
    //Fer array i posarlo al draw
    var vertexCercle = [];
    for(var i=0.0;i<=nVertex;i++) {
        var vertex1 = (i * 2 *Math.PI /nVertex) * radi;
        var vertex2 = ((i+1)*2*Math.PI / nVertex) * radi;
        vertexCercle.push(origen_x,origen_y); //Origen del cercle
        vertexCercle.push(Math.cos(vertex1),Math.sin(vertex1));
        vertexCercle.push(Math.cos(vertex2),Math.sin(vertex2));
    }
    return vertexCercle;
}

function generarCuadrat(origen_x,origen_y,tamany) { //Origen sera el punt d'adalt a l'esquerra
  var vertexCuadrat = [];
  vertexCuadrat.push(origen_x,origen_y);
  vertexCuadrat.push(origen_x+tamany,origen_y);
  vertexCuadrat.push(origen_x,origen_y+tamany);
  vertexCuadrat.push(origen_x+tamany,origen_y+tamany);

  return vertexCuadrat;
}


function initBuffers(model) {
  model.idBufferVertices = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, model.idBufferVertices);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model.vertices), gl.STATIC_DRAW);
}

function draw(model) {
  gl.bindBuffer(gl.ARRAY_BUFFER, model.idBufferVertices);
  gl.vertexAttribPointer(program.vertexPositionAttribute, 2, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.TRIANGLES, 0, model.vertices.length / 2);  //  Usar drawArrays / Fer servir 3?
}


function drawScene() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  draw(cercle);
}

function initWebGL() {
  gl = getWebGLContext();
  if (!gl) {
    alert("WebGL 2.0 no está disponible");
    return;
  }
  initShaders();
  initBuffers(cercle);
  initRendering();
  requestAnimationFrame(drawScene);
}


initWebGL();
