let divMenuPrincipal = document.querySelector("#menu-principal");
let divAgregarPalabra = document.querySelector("#agregar-palabra");
let divPantallaJuegoPrincipal = document.querySelector("#pantalla-juego-principal");

let palabras = ["ALURA", "ORACLE", "ONE", "JAVASCRIPT", "HTML", "CSS"];
let palabraSecreta = "";
let letras = [];
let palabraDescubierta = [];
let errores = 6;
let indiceFuncionAhorcado = 0;
let funcionesAhorcado = [
    dibujarCabeza,
    dibujarTronco,
    dibujarBrazoi,
    dibujarBrazod,
    dibujarPiernai,
    dibujarPiernad
];

var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");

pincel.fillStyle = "#F3F5FC"; //"blue";
pincel.fillRect(0, 0, 1000, 600);
pincel.lineWidth = 5;

divPantallaJuegoPrincipal.style.display = "none";
divAgregarPalabra.style.display = "none";

function iniciarJuego() {
    document.querySelector("#btnIniciarJuego").onclick = () => {
        divMenuPrincipal.style.display = "none";
        divPantallaJuegoPrincipal.style.display = null;

        console.log(palabras);
        escogerPalabraSecreta();
        dibujarLinea();

        for (let i = 0; i < palabraSecreta.length; i++) {
            palabraDescubierta.push("");
        }

        document.onkeydown = capturarTecla;
    };

    document.querySelector("#btnAgregarPalabra").onclick = () => {
        divMenuPrincipal.style.display = "none";
        divPantallaJuegoPrincipal.style.display = "none";
        divAgregarPalabra.style.display = null;
    };

    document.querySelector("#btnCancelar").onclick = () => {
        divMenuPrincipal.style.display = null;
        divPantallaJuegoPrincipal.style.display = "none";
        divAgregarPalabra.style.display = "none";
    };

    document.querySelector("#btnGuardarPalabra").onclick = () => {
        let texto = document.querySelector(".cajatexto").value.toUpperCase();

        if (texto.trim().length === 0) {
            alert("No hay nada escrito en la caja de texto.");
        } else if (texto.trim().length >= 10) {
            alert("La palabra no puede tener más de 10 letras.");
        } else {
            palabras.push(texto);
            divAgregarPalabra.style.display = "none";
            document.querySelector("#btnIniciarJuego").click();
        }
    };

    document.querySelector("#btnNuevoJuego").onclick = () => {
        location.reload();
    };

    document.querySelector("#btnDesistir").onclick = () => {
        errores = 0;

        funcionesAhorcado.forEach(funcionAhorcado => {
            funcionAhorcado();
        });

        mostrarMensajeDeJuegoConluido(false);
    };
}

function capturarTecla(e) {
    let letra = e.key.toUpperCase();

    if (errores === 0) {
        mostrarMensajeDeJuegoConluido(false);
    } else if (palabraDescubierta.join("") === palabraSecreta) {
        mostrarMensajeDeJuegoConluido(true);
    } else {
        if (comprobarLetra(letra) && palabraSecreta.includes(letra)) {
            for (let i = 0; i < palabraSecreta.length; i++) {
                if (palabraSecreta[i] === letra) {
                    escribirLetraCorrecta(i);
                    palabraDescubierta[i] = letra;
                }
            }

            if (palabraDescubierta.join("") === palabraSecreta) {
                mostrarMensajeDeJuegoConluido(true);
            }
        }
        else {
            anadirLetraIncorrecta(letra);
            escribirLetraIncorrecta(letra, errores);
            dibujarParteDelAhorcado();

            if (errores === 0) {
                mostrarMensajeDeJuegoConluido(false);
            }
        }
    }
}

function mostrarMensajeDeJuegoConluido(gane) {
    if (gane) {
        alert("¡Te salvaste!");
    } else {
        alert("¡Te han ahorcado! ¡Perdiste!");
    }
}

function escogerPalabraSecreta() {
    let palabra = palabras[Math.floor(Math.random() * palabras.length)];

    palabraSecreta = palabra;
    console.log(palabraSecreta);
}

function comprobarLetra(key) {
    if (key >= 65 && letras.indexOf(key) || key <= 90 && letras.indexOf(key)) {
        letras.push(key);
        console.log(key);

        return false;
    } else {
        console.log(key);

        return true;
    }
}

function anadirLetraIncorrecta() {
    errores -= 1;
}

function dibujarLinea() {
    pincel.lineWidth = 6;
    pincel.lineCap = "round";
    pincel.lineJoin = "round";
    pincel.fillStyle = "#F3F5F6";
    pincel.strokeStyle = "#0A3871";

    let anchura = 660 / palabraSecreta.length;

    for (let i = 0; i < palabraSecreta.length; i++) {
        pincel.moveTo(50 + anchura * i, 300);
        pincel.lineTo(100 + anchura * i, 300);
    }

    pincel.stroke();
    pincel.closePath();
}

function escribirLetraCorrecta(index) {
    pincel.font = 'bold 52px Inter';
    pincel.lineWidth = 6;
    pincel.lineCap = "round";
    pincel.lineJoin = "round";
    pincel.fillStyle = "#0A3871";

    let anchura = 660 / palabraSecreta.length;

    pincel.fillText(palabraSecreta[index], 55 + anchura * index, 280);
    pincel.stroke();
}

function escribirLetraIncorrecta(letra, errorsLeft) {
    pincel.lineWidth = 6
    pincel.font = 'bold 40px Inter';
    pincel.lineCap = "round";
    pincel.lineJoin = "round";
    pincel.fillStyle = "#0A3871";
    pincel.fillText(letra, 55 + 40 * (10 - errorsLeft), 420, 40);
}

function dibujarParteDelAhorcado() {
    funcionesAhorcado[indiceFuncionAhorcado]();
    indiceFuncionAhorcado++;

}

function dibujarCabeza() {
    pincel.fillStyle = "blue";
    pincel.beginPath();
    pincel.arc(880, 200, 40, 0, 2 * 3.14);
    pincel.stroke()
}

function dibujarTronco() {
    pincel.moveTo(880, 240);
    pincel.lineTo(880, 400);
    pincel.strokeStyle = "blue"
    pincel.stroke();

}

function dibujarBrazoi() {
    pincel.moveTo(880, 240);
    pincel.lineTo(840, 320);
    pincel.strokeStyle = "blue"
    pincel.stroke();
}

function dibujarBrazod() {
    pincel.moveTo(880, 240);
    pincel.lineTo(920, 320);
    pincel.strokeStyle = "blue"
    pincel.stroke();
}

function dibujarPiernai() {
    pincel.moveTo(880, 400);
    pincel.lineTo(840, 480);
    pincel.strokeStyle = "blue"
    pincel.stroke();

}

function dibujarPiernad() {
    pincel.moveTo(880, 400);
    pincel.lineTo(920, 480);
    pincel.strokeStyle = "#0A3871"
    pincel.stroke();

}

function dibujarHorca() {
    /*parte de abajo*/
    pincel.moveTo(650, 530);
    pincel.lineTo(950, 530);
    pincel.strokeStyle = "#0A3871"
    pincel.stroke();

    /*parte palo vertical*/
    pincel.moveTo(720, 530);
    pincel.lineTo(720, 100);
    pincel.strokeStyle = "#0A3871"
    pincel.stroke();

    /*parte horizontal*/
    pincel.moveTo(720, 100);
    pincel.lineTo(880, 100);
    pincel.strokeStyle = "#0A3871"
    pincel.stroke();

    /*parte cuerda*/
    pincel.moveTo(880, 100);
    pincel.lineTo(880, 160);
    pincel.strokeStyle = "#0A3871"
    pincel.stroke();
}

dibujarHorca();
iniciarJuego();