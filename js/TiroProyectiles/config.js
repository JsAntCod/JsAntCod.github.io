let angleSlider = document.getElementById("angle-slider");
let velocitySlider = document.getElementById("velocity-slider");
let massSlider = document.getElementById("mass-slider");
let gravityInput = document.getElementById("gravity");
let angleValue = document.getElementById("angle-value");
let velocityValue = document.getElementById("velocity-value");
let massValue = document.getElementById("mass-value");
let heightSlider = document.getElementById("height-slider");
let heightValue = document.getElementById("height-value");

let angle = angleSlider.value;
let angleInRadians;
let velocity = velocitySlider.value;
let mass = massSlider.value;
let gravity = gravityInput.value;
let height = heightSlider.value;


velocitySlider.oninput = function() {
    velocityValue.innerHTML = this.value;
    velocity = this.value;
};
angleSlider.oninput = function() {
    angleValue.innerHTML = this.value;
    angle = this.value;
};

gravityInput.oninput = function() {
    if (this.value < 5) {
    this.value = 5;
    } else if (this.value > 20) {
    this.value = 20;
    }
    gravity = this.value;
};

function flyTime() {
    angleInRadians = (angle * Math.PI) / 180;
    const firstTime = Number(((velocity*Math.sin(angleInRadians))/gravity).toFixed(2))
    const firstHeight= Number((0.5*gravity*firstTime*firstTime).toFixed(2))
    const totalHeight = firstHeight+(Number(height))
    const finalTime = Number((Math.sqrt((2*(totalHeight))/9.81)).toFixed(2))
    return firstTime + finalTime
}

function calcPosition(tiempoDeVuelo) {
    let tiempoTranscurrido = 0;
    let position = [];
    let altura = Number(height);
    let xPosition= 0;
    let initialVelocity = Number(velocity)
    angleInRadians = (angle * Math.PI) / 180;
    position.push([0, altura,xPosition]);
    while (tiempoTranscurrido < tiempoDeVuelo) {
        tiempoTranscurrido += 0.1;

        let yPosition = Number(((altura) + (initialVelocity*Math.sin(angleInRadians)*tiempoTranscurrido) + (-0.5 * gravity * tiempoTranscurrido*tiempoTranscurrido))   .toFixed(2));


        xPosition = parseFloat((velocity*Math.cos(angleInRadians)  * tiempoTranscurrido).toFixed(2));
        if (yPosition <= 0.09) {
            yPosition = 0.00;
        }
        position.push([Number(tiempoTranscurrido.toFixed(2)), yPosition,xPosition]);
    }
    return position;
}

function final() {
    let tiempoDeVuelo = flyTime();
    let position = calcPosition(tiempoDeVuelo);
    return position;
}
