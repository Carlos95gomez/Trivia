// Variables del juego
let preguntaActual = 0;
let puntaje = 0;
let puedeResponder = true;

// Elementos del DOM
const elementoPregunta = document.getElementById('pregunta');
const elementoOpciones = document.getElementById('opciones');
const elementoPuntaje = document.getElementById('puntaje');
const botonSiguiente = document.getElementById('boton-siguiente');

// Función para mostrar la pregunta actual
function mostrarPregunta() {
    const pregunta = preguntas[preguntaActual];
    elementoPregunta.textContent = pregunta.pregunta;
    
    elementoOpciones.innerHTML = '';
    pregunta.opciones.forEach((opcion, indice) => {
        const boton = document.createElement('button');
        boton.classList.add('opcion');
        boton.textContent = opcion;
        boton.addEventListener('click', () => verificarRespuesta(indice));
        elementoOpciones.appendChild(boton);
    });

    puedeResponder = true;
    botonSiguiente.style.display = 'none';
}

// Función para verificar la respuesta seleccionada
function verificarRespuesta(indiceSeleccionado) {
    if (!puedeResponder) return;
    
    puedeResponder = false;
    const respuestaCorrecta = preguntas[preguntaActual].correcta;
    const botones = elementoOpciones.getElementsByTagName('button');

    botones[respuestaCorrecta].classList.add('correcta');
    if (indiceSeleccionado !== respuestaCorrecta) {
        botones[indiceSeleccionado].classList.add('incorrecta');
    } else {
        puntaje++;
        elementoPuntaje.textContent = `Puntaje: ${puntaje}`;
    }

    if (preguntaActual < preguntas.length - 1) {
        botonSiguiente.style.display = 'block';
    } else {
        botonSiguiente.textContent = 'Juego Terminado';
        botonSiguiente.style.display = 'block';
    }
}

// Manejador del botón siguiente
botonSiguiente.addEventListener('click', () => {
    preguntaActual++;
    if (preguntaActual < preguntas.length) {
        mostrarPregunta();
    } else {
        elementoPregunta.textContent = `¡Juego terminado! Tu puntaje final es: ${puntaje}/${preguntas.length}`;
        elementoOpciones.innerHTML = '';
        botonSiguiente.style.display = 'none';
    }
});

// Iniciar el juego
mostrarPregunta();