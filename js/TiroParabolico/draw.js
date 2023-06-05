let canvas = document.getElementById("myChart");
let ctx = canvas.getContext("2d");
const btn = document.getElementById('startButton')


canvas.width = 1500;
canvas.height = 500;
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let sphereX = 60;
let sphereY = canvasHeight - 40;


window.onload = function() {
    drawLandscape();
    drawSphere(sphereX, sphereY);
    drawGoalZone()
  };

  massSlider.oninput = function() {
    massValue.innerHTML = this.value;
    mass = this.value;
    drawLandscape();
    drawSphere(sphereX, sphereY);
    drawGoalZone()
};

btn.addEventListener('click', drawPath)

function drawLandscape() {

    // Crear un degradado lineal 
    var gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    gradient.addColorStop(0, "lightblue"); // Color inicial del degradado (azul claro)
    gradient.addColorStop(1, "white"); // Color final del degradado (blanco)

    // Dibujar el cielo
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Dibujar el césped
    ctx.fillStyle = "green";
    ctx.fillRect(0, canvasHeight - 40, canvasWidth, 40);

   
  }

function drawSphere(x, y) {
    ctx.beginPath();
    ctx.arc(x, y,mass, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawPath() {
  const path = final(); 

  let index = 0; // Variable para seguir el índice de posición actual en el array path

  function animate() {
    // Limpia el canvas antes de dibujar la siguiente posición
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Vuelve a dibujar el paisaje en cada frame
    drawLandscape();

    // Dibuja la línea de color azul
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(sphereX, sphereY);

    // Dibuja los círculos en cada punto de datos
    for (let i = 0; i <= index; i++) {
      const point = path[i];
      let x = (point[2] * 10);
      let y = -(point[1] * 5);
      ctx.lineTo(x + sphereX, y + sphereY);
      drawCircle(x + sphereX, y + sphereY);
    }

    ctx.stroke();

    // Obtiene la siguiente posición del array path
    const point = path[index];
    let x = (point[2] * 10);
    let y = -(point[1] * 5);

    drawGoalZone();
    // Dibuja la esfera en la posición actual
    drawSphere(x + sphereX, y + sphereY);

    index++; // Incrementa el índice para pasar a la siguiente posición

    // Si se alcanza el final del array path, se detiene la animación
    if (index < path.length) {
      // Establece un retraso de 24 milisegundos antes de pasar a la siguiente posición
      setTimeout(function() {
        requestAnimationFrame(animate); // Llama a la función animate en el próximo frame después del retraso
      }, 24);
    } else {
      addDataToTable(path); // Agregar los datos de posición a la tabla
      
      // Verificar el rango y llamar a drawStar() si es necesario
      if ((x + sphereX) >= 900 && (x + sphereX) <= 940) {
        drawStar();
      }
    }
  }

  // Inicia la animación
  animate();
}



function drawLine() {
    ctx.beginPath();
    ctx.moveTo(position[0][0], position[0][1]);
    for (let i = 1; i < position.length; i++) {
        ctx.lineTo(position[i][0], position[i][1]);
    }
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}
function drawCircle(x, y) {
  ctx.fillStyle = 'blue'; // Establece el color de relleno en azul
  ctx.beginPath();
  ctx.arc(x, y, 2, 0, 2 * Math.PI); // Dibuja un círculo de radio 5 en la posición (x, y)
  ctx.fill(); // Rellena el círculo con el color establecido
}


function drawLineFromData() {
  const position = final()
  let x = (position[0][1] * 10);
  let y = -(position[0][2] * 5);
  let sphereX = 60;
  let sphereY = canvasHeight - 40;
  ctx.beginPath();
  ctx.moveTo(sphereX, sphereY);
  console.log(x,y,sphereX,sphereY);
  for (let i = 1; i < position.length; i++) {
      ctx.lineTo(x[i][1], y[i][2]);
  }

  ctx.strokeStyle = "blue";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
}


function addDataToTable(data) {
  const tableBody = document.querySelector('#dataTable tbody');
  
  // Eliminar filas existentes
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

  // Agregar nuevas filas
  data.forEach((point) => {
    const row = document.createElement('tr');
    const timeCell = document.createElement('td');
    const xPosCell = document.createElement('td');
    const yPosCell = document.createElement('td');

    timeCell.textContent = point[0];
    xPosCell.textContent = point[1];
    yPosCell.textContent = point[2];

    row.appendChild(timeCell);
    row.appendChild(xPosCell);
    row.appendChild(yPosCell);

    tableBody.appendChild(row);
  });
}

function drawGoalZone(){

        var x = 900; // Posición x
        var y = 490; // Posición y
        var size = 30; // Tamaño del emoji
  
        // Dibujar el emoji ❌
        ctx.font = size + "px Arial";
        ctx.fillText("❌", x, y);
}



function drawStar() {
  let size = 5; // Tamaño inicial
  const maxSize = 40; // Tamaño máximo
  const x = 900; // Posición x
  const y = canvasHeight - 40; // Posición y
  let animationFrameId = null; // Identificador del frame de animación
  
  function animate() {
    // Evita iniciar una nueva animación si ya se está ejecutando
    if (animationFrameId !== null) {
      return;
    }
    
    // Función de animación recursiva
    function frame() {
      if (size < maxSize) {
        size += 0.5;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawLandscape();
      drawSphere(sphereX, sphereY);
      drawGoalZone();
      
      ctx.font = size + 'px "Segoe UI Emoji"';
      ctx.fillText('🌟', x, y);
      
      // Comprueba si se alcanzó el tamaño máximo y detiene la animación
      if (size >= maxSize) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      } else {
        animationFrameId = requestAnimationFrame(frame);
      }
    }
    
    frame(); // Inicia la animación
    
    // Detiene la animación cuando se activa drawPath()
    btn.removeEventListener('click', drawPath);
    btn.addEventListener('click', function() {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      drawPath();
    });
  }
  
  animate();
}
