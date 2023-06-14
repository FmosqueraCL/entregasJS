let inputNombre;
let favs = [];
let mainMenu = document.getElementById("main-menu");
let crearPersonajeBtn = document.getElementById("crear-personaje");
let mostrarGaleriaBtn = document.getElementById("mostrar-galeria");
let eliminarPersonajeBtn = document.getElementById("eliminar-personaje");
let mostrarDadosBtn = document.getElementById("mostrar-dados");
let quiz = document.getElementById("quiz");
let formulario = document.getElementById("formulario");
let resultado = document.getElementById("resultado");
let hojaPersonaje = document.getElementById("hoja-personaje");
let titulo = document.getElementById("titulo");
let parrafo = document.getElementById("parrafo");
let statsP = document.getElementById("statsP");
let tabla = document.getElementById("tabla");
let lanzamientos = 3;
let fuerza = document.getElementById("fuerza");
let destreza = document.getElementById("destreza");
let agilidad = document.getElementById("agilidad");
let inteligencia = document.getElementById("inteligencia");
let sabiduria = document.getElementById("sabiduria");
let suerte = document.getElementById("suerte");
let dados = document.getElementById("dados");
let lanzarBtn = document.getElementById("lanzar");
let siguienteDadosBtn = document.getElementById("siguiente-dados");
let guardarBtn = document.getElementById("guardar-personaje");
var menuPrincipalBtns = document.getElementsByClassName("menu-principal");
for (var i = 0; i < menuPrincipalBtns.length; i++) {
  menuPrincipalBtns[i].addEventListener('click', volverEmpezar);
}

class Personaje {
  constructor(nombre, clase, descripcion, fuerza, destreza, agilidad, inteligencia, sabiduria, suerte, id) {
    this.nombre = nombre;
    this.clase = clase;
    this.descripcion = descripcion;
    this.fuerza = fuerza;
    this.destreza = destreza;
    this.agilidad = agilidad;
    this.inteligencia = inteligencia;
    this.sabiduria = sabiduria;
    this.suerte = suerte;
    this.id = id;
  }
}
let personaje = new Personaje('', '', '', 0, 0, 0, 0, 0, 0);
crearPersonajeBtn.addEventListener('click', crearPersonaje);
mostrarGaleriaBtn.addEventListener('click', mostrarGaleria);
eliminarPersonajeBtn.addEventListener('click', borrarPersonaje);
mostrarDadosBtn.addEventListener('click', mostrarDados);
lanzarBtn.addEventListener('click', lanzarDados);
siguienteDadosBtn.addEventListener('click', function() { mostrarResultado(personaje); });
guardarBtn.addEventListener('click', function() { guardarPersonaje(personaje); });

function crearPersonaje() {  
  mainMenu.classList.add("oculto");
  quiz.classList.remove("oculto");
  generarPreguntas();  
}

function generarPreguntas() {
  let preguntas = [
    "¿Qué es lo más importante para ti?",
    "¿Qué es lo que más te gusta hacer?",
    "¿Qué es lo que más te molesta?",
    "¿Qué es lo que más te asusta?",
    "¿Qué es lo que más te aburre?",
  ];
  let respuestas = [
    ["La familia", "La aventura", "La justicia", "La naturaleza", "La música"],
    ["Estar con mi familia", "Explorar nuevos lugares", "Ayudar a los demás", "Estar al aire libre", "Tocar música"],
    ["Que lastimen a mi familia", "Que me encierren", "Que me acusen de algo que no hice", "Que destruyan la naturaleza", "Que me quiten mi instrumento"],
    ["Que le pase algo a mi familia", "Que me pierda en un lugar desconocido", "Que me acusen de algo que no hice", "Que destruyan la naturaleza", "Que me quiten mi instrumento"],
    ["Estar encerrado", "Estar en un lugar desconocido", "Que me acusen de algo que no hice", "Que destruyan la naturaleza", "Que me quiten mi instrumento"],
  ];
  for (let i = 0; i < preguntas.length; i++) {
    let p = document.createElement('p');
    p.innerHTML = preguntas[i];
    formulario.appendChild(p);
    for (let j = 0; j < respuestas[i].length; j++) {
      let input = document.createElement('input');
      input.type = "radio";
      input.name = "pregunta" + i;
      input.value = j;
      formulario.appendChild(input);
      let label = document.createElement('label');
      label.innerHTML = respuestas[i][j];
      formulario.appendChild(label);
    }
  }
}
const clases = [
  {
    nombre: "Mago",
    descripcion: "Un maestro de las artes arcanas que manipula la realidad con su voluntad. Puede lanzar hechizos devastadores o sutiles, según la situación lo requiera.",
    mision: "Buscar el conocimiento oculto en las ruinas de una antigua civilización mágica."
  },
  {
    nombre: "Guerrero",
    descripcion: "Un experto en el combate cuerpo a cuerpo que usa armas y armaduras para enfrentarse a sus enemigos. Puede resistir mucho daño y causar mucho más.",
    mision: "Defender el reino de una invasión de orcos salvajes que amenazan con destruir todo a su paso."
  },
  {
    nombre: "Ladron",
    descripcion: "Un hábil y astuto aventurero que se especializa en el sigilo, el engaño y el robo. Puede abrir cerraduras, desactivar trampas y sorprender a sus oponentes.",
    mision: "Infiltrarse en la mansión de un noble corrupto y robarle un valioso tesoro sin ser descubierto."
  },
  {
    nombre: "Cazador",
    descripcion: "Un arquero y rastreador que domina el uso del arco y la flecha. Puede disparar desde lejos con precisión y rapidez, así como seguir el rastro de sus presas.",
    mision: "Cazar a una bestia legendaria que acecha en el bosque y obtener su piel como trofeo."
  },
  {
    nombre: "Bardo",
    descripcion: "Un músico y poeta que usa su carisma y su talento para inspirar a sus aliados y desmoralizar a sus enemigos. Puede cantar canciones mágicas o contar historias fascinantes.",
    mision: "Viajar por el mundo y recopilar las leyendas y los secretos de cada lugar que visita."
  }
];

const pesos = [
  [0.4, 0.2, 0.1, 0.2, 0.1], // Mago
  [0.1, 0.4, 0.2, 0.1, 0.2], // Guerrero
  [0.2, 0.1, 0.4, 0.1, 0.2], // Ladrón
  [0.1, 0.2, 0.2, 0.4, 0.1], // Cazador
  [0.2, 0.1, 0.1, 0.2, 0.4] // Bardo
];

function procesarPuntaje( personaje ) {
  let resultado = document.getElementById("resultado");  
  let inputs = formulario.querySelectorAll('input');
  let seleccionados = Array.from(inputs).filter(input => input.checked).map(input => Number(input.value));
  let puntajes = clases.map((clase, i) => {
    let puntaje = seleccionados.reduce((acumulado, respuesta, j) => {
      return acumulado + pesos[i][respuesta - 1];
    }, 0);
    return { clase: clase.nombre, puntaje: puntaje };
  });
  puntajes.sort((a,b) => b.puntaje - a.puntaje);
  let claseElegida = puntajes[0].clase;  
  let descripcion = clases.find(clase => clase.nombre == claseElegida).descripcion;
  let mision = clases.find(clase => clase.nombre == claseElegida).mision; 
  personaje.clase = claseElegida;
  personaje.descripcion = descripcion;
  personaje.mision = mision;
  personaje.fuerza =Number(fuerza.innerHTML);
  personaje.destreza =Number(destreza.innerHTML);
  personaje.agilidad =Number(agilidad.innerHTML);
  personaje.inteligencia =Number(inteligencia.innerHTML);
  personaje.sabiduria =Number(sabiduria.innerHTML);
  personaje.suerte =Number(suerte.innerHTML); 
  hojaPersonaje.insertAdjacentHTML("beforeend", `
    <h1>Tu clase es ${claseElegida}</h1>
    <img src="img/${claseElegida}.png" alt="${claseElegida}">
    <p>${descripcion}</p>
    <p>Tu misión es ${mision}</p>
    <p>Sus atributos son:</p>
    <ul>Fuerza: ${fuerza.innerHTML}</ul>
    <ul>Destreza: ${destreza.innerHTML}</ul>
    <ul>Agilidad: ${agilidad.innerHTML}</ul>
    <ul>Inteligencia: ${inteligencia.innerHTML}</ul>
    <ul>Sabiduría: ${sabiduria.innerHTML}</ul>
    <ul>Suerte: ${suerte.innerHTML}</ul>    
    <p>Por favor, dale un nombre a tu personaje:</p>
    <input type="text" placeholder="Escribe aquí el nombre de tu personaje">
  `);
  let inputNombre = resultado.querySelector("input");
  inputNombre.addEventListener("change", () => {
  personaje.nombre = inputNombre.value;
  });  
  return personaje;
}

function generarIdUnico() {
  let id = Math.random().toString(36).substr(2, 9);
  let existe = localStorage.getItem(id);
  if (existe) {
    return generarIdUnico();
  }
  return id;
}

function guardarPersonaje(personaje) {
  if (personaje.nombre) {
    let personajes = JSON.parse(localStorage.getItem("personajes"));
    if (personajes == null) {
      personajes = [];
    }
    personaje.id = generarIdUnico();
    personajes.push(personaje);
    let string = JSON.stringify(personaje);
    localStorage.setItem(personaje.id, string);
    alert("Personaje guardado con éxito");
    volverEmpezar();
  } else {
    alert("El personaje debe tener un nombre");
  }
}

let tbody = tabla.querySelector("tbody");
let personajeSeleccionado = null;
function mostrarPersonajes() {
  tbody.innerHTML = "";
  let ids = Object.keys(localStorage);
  ids.forEach(function(id) {
    let string = localStorage.getItem(id);
    let personaje = JSON.parse(string);
    tbody.innerHTML += `
      <tr id="${personaje.id}">
        <td><input type="radio" name="personaje" value="${personaje.id}" onchange="seleccionarPersonaje(event)"></td>
        <td>${personaje.nombre}</td>
        <td>${personaje.clase}</td>
        <td>${personaje.descripcion}</td>
        <td>${personaje.fuerza}</td>
        <td>${personaje.destreza}</td>
        <td>${personaje.agilidad}</td>
        <td>${personaje.inteligencia}</td>
        <td>${personaje.sabiduria}</td>
        <td>${personaje.suerte}</td>
      </tr>
    `;
  });
}

function seleccionarPersonaje(e) {
  let radio = e.currentTarget;
  personajeSeleccionado = radio.value;
}

function borrarPersonaje() {
  localStorage.removeItem(personajeSeleccionado);
  mostrarPersonajes();
  alert("Personaje borrado con éxito");
}

function ocultarTodo() {
  mainMenu.classList.add("oculto");
  galeria.classList.add("oculto");
  quiz.classList.add("oculto");
  resultado.classList.add("oculto");
  dados.classList.add("oculto");
}

function lanzarDados() {
  fuerza.innerHTML = Math.floor(Math.random() * 20) + 1;
  destreza.innerHTML = Math.floor(Math.random() * 20) + 1;
  agilidad.innerHTML = Math.floor(Math.random() * 20) + 1;
  inteligencia.innerHTML = Math.floor(Math.random() * 20) + 1;
  sabiduria.innerHTML = Math.floor(Math.random() * 20) + 1;
  suerte.innerHTML = Math.floor(Math.random() * 20) + 1;
  lanzamientos--;
  let lanzamientosSpan = document.getElementById("lanzamientos");
  lanzamientosSpan.innerHTML = lanzamientos;
  if (lanzamientos == 0) {
    lanzarBtn.disabled = true;
  }
}

function mostrarFormulario() {
  ocultarTodo();
  quiz.classList.remove("oculto");
}
function mostrarGaleria() {
  ocultarTodo();
  galeria.classList.remove("oculto");
  mostrarPersonajes();
}
function mostrarDados() {
  ocultarTodo();
  dados.classList.remove("oculto");
}
function mostrarResultado(personaje) {
  ocultarTodo();
  procesarPuntaje(personaje);
  console.log(personaje)
  resultado.classList.remove("oculto");
}
function volverEmpezar() {
  ocultarTodo();
  mainMenu.classList.remove("oculto");
    if (lanzamientos < 3){  
      lanzamientos = 3;
    }
  let lanzamientosSpan = document.getElementById("lanzamientos");
  lanzamientosSpan.innerHTML = lanzamientos;
  fuerza.innerHTML = 0;
  destreza.innerHTML = 0;
  agilidad.innerHTML = 0;
  inteligencia.innerHTML = 0;
  sabiduria.innerHTML = 0;
  suerte.innerHTML = 0;
  lanzarBtn.disabled = false;
  while (hojaPersonaje.firstChild) {
    hojaPersonaje.removeChild(hojaPersonaje.firstChild);
  }
  while (formulario.firstChild) {
    formulario.removeChild(formulario.firstChild);
  }  
}
