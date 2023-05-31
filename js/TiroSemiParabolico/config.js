let velocitySlider = document.getElementById("velocity-slider");
let massSlider = document.getElementById("mass-slider");
let gravityInput = document.getElementById("gravity");
let velocityValue = document.getElementById("velocity-value");
let massValue = document.getElementById("mass-value");

let velocity = velocitySlider.value;
let mass = massSlider.value;
let gravity = gravityInput.value;
let airResistance;
let initialH = 10;


velocitySlider.oninput = function() {
    velocityValue.innerHTML = this.value;
    velocity = this.value;
};

massSlider.oninput = function() {
    massValue.innerHTML = this.value;
    mass = this.value;
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
    const finalVelocity = Number(Math.sqrt(2*gravity*initialH).toFixed(2))
    return Number((finalVelocity/gravity).toFixed(2))
}

function calcPosition(tiempoDeVuelo) {
    let tiempoTranscurrido = 0;
    let position = [];
    let altura = initialH;
    let xPosition= 0;
    position.push([0, altura,xPosition]);
    while (tiempoTranscurrido < tiempoDeVuelo) {
        tiempoTranscurrido += 0.1;
        altura = Number((initialH  - 0.5 * gravity * Math.pow(tiempoTranscurrido, 2)).toFixed(2));
        xPosition = parseFloat((velocity  * tiempoTranscurrido).toFixed(2));
        if (altura <= 0.09) {
            altura = 0.00;
        }
        position.push([Number(tiempoTranscurrido.toFixed(2)), altura,xPosition]);
    }
    return position;
}

function final() {
    let tiempoDeVuelo = flyTime();
    let position = calcPosition(tiempoDeVuelo);
    return position;
}
