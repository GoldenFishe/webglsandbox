"use strict";

function WebglSandbox(HTMLCanvasElement, vertexShader, fragmentShader) {
    this.gl = HTMLCanvasElement.getContext("webgl");
    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;
}

WebglSandbox.prototype.createShader = function (type, source) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    if (success) return shader;

    console.log(this.gl.getShaderInfoLog(shader));
    this.gl.deleteShader(shader);
}

WebglSandbox.prototype.createProgram = function (vertexShader, fragmentShader) {
    const program = this.gl.createProgram();
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);
    const success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
    if (success) return program;

    console.log(this.gl.getProgramInfoLog(program));
    this.gl.deleteProgram(program);
}

WebglSandbox.prototype.createBuffer = function () {

}

WebglSandbox.prototype.main = function () {
    if (!this.gl) return;

    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    const vertexShader = this.createShader(this.gl.VERTEX_SHADER, this.vertexShader);
    const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, this.fragmentShader);
    const program = this.createProgram(vertexShader, fragmentShader);
    const positionAttributeLocation = this.gl.getAttribLocation(program, "a_position");

    this.gl.useProgram(program);

    const positionBuffer = this.gl.createBuffer();

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

    const positions = [
        0, 0,
        0, 0.5,
        0.7, 0,
    ];
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);

    this.gl.enableVertexAttribArray(positionAttributeLocation);

    const size = 2;
    const type = this.gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    this.gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

    const primitiveType = this.gl.TRIANGLES;
    const drawOffset = 0;
    const count = 3;
    this.gl.drawArrays(primitiveType, drawOffset, count);
}

const canvas = document.querySelector("#c");
const vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
const fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;

const sandbox = new WebglSandbox(canvas, vertexShaderSource, fragmentShaderSource);
sandbox.main();
