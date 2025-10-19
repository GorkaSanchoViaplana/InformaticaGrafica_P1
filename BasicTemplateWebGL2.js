var gl = null;
var program;

  var cercle = {
    "vertices" : generarCercle(16,0.2,0.2,0.1)
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


function generarCercle(nVertex,origen_x,origen_y,radi) { //Origen sera el centre del cercle. Depenent del nVertes fara coses diferents
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

function generarCuadrat(origen_x,origen_y,tamany) { //Origen sera el punt d'adalt a l'esquerra
  var vertexCuadrat = [];
  vertexCuadrat.push(origen_x,origen_y);
  vertexCuadrat.push(origen_x+tamany,origen_y);
  vertexCuadrat.push(origen_x,origen_y+tamany);
  vertexCuadrat.push(origen_x+tamany,origen_y+tamany);

  return vertexCuadrat;
}

function generarTriangle(origen_x,origen_y,tamany){ //El triangle sera equilater
  var vertexTriangle = [];
  vertexTriangle.push(origen_x,origen_y);
  vertexTriangle.push(origen_x,origen_y+tamany);
  vertexTriangle.push(origen_x+tamany/2, origen_y+Math.sqrt(tamany*tamany-tamany/2*tamany/2)); //Toca fer pitagoras :(
  return vertexTriangle;
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
  //Tocara fer la generacio inicial de enemics i personatge
  
  console.log(cercle);
  //var e = new enemy(0,0,0.1,0);
  initBuffers(cercle); //S'haura de repetir per cada figura
  initRendering(); //Nomes fa falta 1
  requestAnimationFrame(drawScene); //Tocara ficar el loop
}


initWebGL();
