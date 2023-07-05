let personajes = []; 
let personajeActual = null; 
let narrador = null; 
let clase = document.getElementById("clase");
let claseNombre = document.getElementById("clase-nombre");
claseNombre.textContent = clase.value;

function mostrarPantalla(id) {
  let pantallas = document.getElementsByClassName("pantalla");
  for (let pantalla of pantallas) {
    pantalla.classList.add("oculta");
  }
  document.getElementById(id).classList.remove("oculta");
}

function cargarPersonajes() {
  personajes = JSON.parse(localStorage.getItem("personajes")) || [];
  let lista = document.getElementById("lista-personajes");
  lista.innerHTML = "";
  for (let personaje of personajes) {
    let li = document.createElement("li");
    li.innerHTML = `<img src="${personaje.avatar}" alt=""><span>Nombre: ${personaje.nombre}</span><span>Clase: ${personaje.clase}</span><span>Misión: ${personaje.mision}</span><span>Nivel: ${personaje.nivel}</span>`;
    li.addEventListener("click", function() {
      personajeActual = personaje;
      let items = document.querySelectorAll("#lista-personajes li");
      for (let item of items) {
        item.classList.remove("seleccionado");
      }
      this.classList.add("seleccionado");
    });
    lista.appendChild(li);
  }
}

function guardarPersonajes() {
  localStorage.setItem("personajes", JSON.stringify(personajes));
}
function crearPersonaje() {
  let nombre = document.getElementById("nombre").value;
  let avatar = document.getElementById("avatar-clase").src
  let clase = document.getElementById("clase").value;
  let fuerza = document.getElementById("fuerza").value;
  let constitucion = document.getElementById("constitucion").value;
  let agilidad = document.getElementById("agilidad").value;
  let destreza = document.getElementById("destreza").value;
  let inteligencia = document.getElementById("inteligencia").value;
  let sabiduria = document.getElementById("sabiduria").value;
  let suerte = document.getElementById("suerte").value;
  let normal = "normal";
  if (nombre.trim() === "" || nombre.length > 14) {
    alert("El nombre del personaje no puede estar en blanco y debe tener menos de 14 caracteres");
    return;
  }
  let puntosRestantes = parseInt(document.getElementById("puntos-restantes").textContent.split(": ")[1]);
  if (puntosRestantes > 0) {
    alert("Debes asignar todos los puntos de atributos antes de crear el personaje");
    return;
  }
  let personaje = {
    nombre: nombre,
    clase: clase,
    avatar: avatar,
    fuerza: fuerza,
    constitucion: constitucion,
    agilidaad: agilidad,
    destreza: destreza,
    inteligencia: inteligencia,
    sabiduria: sabiduria,
    suerte: suerte,
    nivel: 1,
    inventario: [],
    mision: generarMision(clase), 
    salud: 100,
    energia: 100,
    saludMaxima: 100,
    energiaMaxima: 100,
    habilidades: generarHabilidades(clase),
    estadofisico: normal,
    estadomental: normal,
  };
  personajes.push(personaje);
}
function generarMision(clase) {
  let misiones = {
    guerrero: "Protege al príncipe en su viaje a través del peligroso Bosque Encantado",
    paladin: "Recupera el cáliz sagrado robado por el malvado hechicero Zoltar",
    ladron: "Infiltra en la mansión del duque y roba el mapa del tesoro secreto",
    cazador: "Rastrea y captura al escurridizo ladrón de joyas conocido como 'El Zorro'",
    hechizero: "Investiga la extraña energía mágica que emana de la Torre Oscura",
    necromante: "Invoca a un ejército de muertos vivientes para conquistar el Reino del Este"
  };
  return misiones[clase];
}

function generarHabilidades(clase) {
  let habilidades = {
    guerrero: [{nombre: "Golpe fuerte", descripcion: "Asesta un golpe poderoso que inflige mucho daño", costo: 20}],
    paladin: [{nombre: "Luz sagrada", descripcion: "Lanza un rayo de luz que daña a los enemigos o cura a los aliados", costo: 15}],
    ladron: [{nombre: "Puñalada trapera", descripcion: "Ataca por sorpresa a un enemigo desprevenido y le inflige daño extra", costo: 15}],
    cazador: [{nombre: "Golpe crítico", descripcion: "Ataca con precisión a un punto vital del enemigo y le inflige mucho daño", costo: 20}],
    hechizero: [{nombre: "Bola de fuego", descripcion: "Lanza una bola de fuego que inflige daño a todos los enemigos", costo: 20}],
    necromante: [{nombre: "Invocar esqueleto", descripcion: "Invocas a un esqueleto que te ayuda en el combate", costo: 15}]
  };
  return habilidades[clase];
}
let token = "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";
let mensajes = [];
const MAX_MENSAJES = 10;
function iniciarChat() {
  let narrador = {
    role: "assistant",
    content: `eres api chatgpt simulando juego de rol basado en texto "Palantiri", actua como narrador dungeon master estilo calabozos y dragones. 
    personaje del usuario ${personajeActual.nombre}, ${personajeActual.clase} misión ${personajeActual.mision}. 
    imagina linea narrativa centrada en mision, cursiva expresa pensamiento emocion suceso interaccion 5 sentidos,
    respuesta  500 caracteres max,
    narrativa avanza y se desenvuelve incluye nuevos personajes sucesos giros argumentales comedia/romance creativos coherentes`
  };
  mensajes.push(narrador);
  let mensaje = `Hola, soy ${personajeActual.nombre}, un ${personajeActual.clase}. `;  
  switch (personajeActual.clase) {
    case "guerrero":
      mensaje += `Como guerrero, estoy listo para enfrentar cualquier desafío con valentía y determinación. Mi misión es ${personajeActual.mision}. ¿Debo dirigirme al Bosque Encantado ahora o hay algo que deba hacer antes?`;
      break;
    case "paladin":
      mensaje += `Como paladín, mi deber es defender lo que es justo y proteger a los inocentes. Mi misión es ${personajeActual.mision}. ¿Hay algún lugar donde pueda obtener información sobre el paradero del cáliz sagrado?`;
      break;
    case "ladron":
      mensaje += `Como ladrón, sé cómo pasar desapercibido y obtener lo que quiero sin ser detectado. Mi misión es ${personajeActual.mision}. ¿Hay algún lugar donde pueda conseguir un mapa o un plano de la mansión del duque?`;
      break;
    case "cazador":
      mensaje += `Como cazador, soy experto en rastrear y capturar a mi presa. Mi misión es ${personajeActual.mision}. ¿Hay algún lugar donde haya sido visto por última vez 'El Zorro'?`;
      break;
    case "hechizero":
      mensaje += `Como hechicero, tengo el poder de controlar las fuerzas mágicas del universo. Mi misión es ${personajeActual.mision}. ¿Hay algún lugar donde pueda encontrar información sobre la Torre Oscura?`;
      break;
    case "necromante":
      mensaje += `Como necromante, puedo controlar a los muertos y usar su poder para mis propios fines. Mi misión es ${personajeActual.mision}. ¿Hay algún cementerio o campo de batalla cercano donde pueda invocar a mi ejército de muertos vivientes?`;
      break;
  }  
  let chat = document.getElementById("chat");
  let div = document.createElement("div");
  div.classList.add("mensaje-jugador");
  div.textContent = mensaje;
  chat.appendChild(div);
}
async function resumirContexto(contexto) {
  let bloques = [];
  let bloque = [];
  let tokens = 0;
  for (let mensaje of contexto) {
    let texto = mensaje.content;
    let numTokens = Math.ceil(texto.length / 4);
    if (tokens + numTokens > 2048) {
      bloques.push(bloque);
      bloque = [];
      tokens = 0;
    }
    bloque.push(mensaje);
    tokens += numTokens;
  }
  bloques.push(bloque);
  let resumenes = [];
  for (let bloque of bloques) {
    let texto = bloque.map(mensaje => mensaje.content).join("\n");
    let respuesta = await axios.post("https://api.openai.com/v1/engines/davinci/completions", {
      prompt: `Resumen:\n${texto}\nResumen:`,
      max_tokens: 60,
      temperature: 0.7,
      n: 1,
      stop: null
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    let resumen = respuesta.data.choices[0].text.trim();
    resumenes.push(resumen);
  }
  return resumenes.join("\n");
}

function enviarMensaje(mensaje) {
  let chat = document.getElementById("chat");
  let jugador = {
    role: "user",
    content: `nivel ${personajeActual.nivel} hp = ${personajeActual.salud} sp = ${personajeActual.energia}  
    fuerza ${personajeActual.fuerza}, constitución ${personajeActual.constitucion}, agilidad ${personajeActual.agilidad}, 
    destreza ${personajeActual.destreza}, inteligencia ${personajeActual.inteligencia}, sabiduría ${personajeActual.sabiduria},  suerte ${personajeActual.suerte}.
    inventario: ${personajeActual.inventario.map(item => item.nombre).join(", ")}. 
    habilidades: ${personajeActual.habilidades.map(habilidad => habilidad.nombre).join(", ")}. 
    Estado fisico ${personajeActual.estadofisico} estado mental ${personajeActual.estadomental}. ${mensaje}` 
  };
  mensajes.push(jugador);
  if (mensaje) { 
    let div = document.createElement("div");
    div.classList.add("mensaje-jugador");
    div.textContent = mensaje; 
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  }
  recibirMensaje(jugador);
}
async function recibirMensaje() {
  let chat = document.getElementById("chat");
  let divCarga = document.createElement("div");
  divCarga.classList.add("mensaje-narrador");
  divCarga.innerHTML = `<span class="carga">...</span>`;
  chat.appendChild(divCarga);
  chat.scrollTop = chat.scrollHeight;
  if (mensajes.length > MAX_MENSAJES) {
    let contextoResumido = await resumirContexto(mensajes.slice(1, -MAX_MENSAJES));
    mensajes = mensajes.slice(-MAX_MENSAJES);
    mensajes.unshift({
      role: "assistant",
      content: contextoResumido
    });
  }  
  axios.post("https://api.openai.com/v1/chat/completions", {
    model: "gpt-3.5-turbo",
    messages: mensajes
  }, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }).then(function(response) {
    divCarga.remove();
    let content = response.data.choices[0].message.content;
    let respuesta = {
      role: "assistant",
      content: content
    };
    mensajes.push(respuesta);    
    let div = document.createElement("div");
    div.classList.add("mensaje-narrador");
    let i = 0;
    let intervalo = setInterval(function() {
      div.textContent += content[i];
      i++;
      if (i >= content.length) {
        clearInterval(intervalo);
      }
    }, 50);    
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  }).catch(function(error) {
    console.log(error);
  });
}

document.getElementById("boton-empezar").addEventListener("click", function() {
  mostrarPantalla("pantalla-lobby");
  cargarPersonajes();
});
document.getElementById("boton-crear").addEventListener("click", function() {
  mostrarPantalla("pantalla-crear");
  document.getElementById("nombre").value = "";
  document.getElementById("clase").value = "guerrero";
  document.getElementById("avatar-clase").src = "img/guerrero.png";
  document.getElementById("fuerza").value = "0";
  document.getElementById("constitucion").value = "0";
  document.getElementById("agilidad").value = "0";
  document.getElementById("destreza").value = "0";
  document.getElementById("inteligencia").value = "0";
  document.getElementById("sabiduria").value = "0";
  document.getElementById("suerte").value = "0";
  document.getElementById("puntos-restantes").textContent = "Puntos restantes: 77";
});
document.getElementById("boton-eliminar").addEventListener("click", function() {
  if (personajeActual) {
    let indice = personajes.indexOf(personajeActual);
    personajes.splice(indice, 1);
    guardarPersonajes();
    cargarPersonajes();
    personajeActual = null;
    alert("Personaje eliminado");
  } else {
    alert("No hay ningún personaje seleccionado");
  }
});
document.getElementById("boton-instrucciones").addEventListener("click", function() {
  mostrarPantalla("pantalla-instrucciones");
});
document.getElementById("boton-jugar").addEventListener("click", function() {
  if (personajeActual) {
    mostrarPantalla("pantalla-instrucciones");
    iniciarChat();
  } else {
    alert("No hay ningún personaje seleccionado");
  }
});
document.getElementById("boton-guardar").addEventListener("click", function() {
  crearPersonaje();
  guardarPersonajes();
  cargarPersonajes();
  mostrarPantalla("pantalla-lobby");
});
document.getElementById("boton-cancelar").addEventListener("click", function() {
  mostrarPantalla("pantalla-lobby");
});
document.getElementById("boton-enviar").addEventListener("click", function() {
  let mensaje = document.getElementById("mensaje").value;
  if (mensaje) {
    enviarMensaje(mensaje);
    document.getElementById("mensaje").value = "";
  }
});
document.getElementById("boton-opciones").addEventListener("click", function() {
  mostrarPantalla("pantalla-opciones");
  document.getElementById("avatar").src = personajeActual.avatar;
  document.getElementById("nombre-personaje").textContent = personajeActual.nombre;
  document.getElementById("clase-personaje").textContent = personajeActual.clase;
  document.getElementById("nivel-personaje").textContent = `Nivel: ${personajeActual.nivel}`;
  document.getElementById("fuerza-personaje").textContent = personajeActual.fuerza;
  document.getElementById("constitucion-personaje").textContent = personajeActual.constitucion;
  document.getElementById("agilidad-personaje").textContent = personajeActual.agilidad;
  document.getElementById("destreza-personaje").textContent = personajeActual.destreza;
  document.getElementById("inteligencia-personaje").textContent = personajeActual.inteligencia;
  document.getElementById("sabiduria-personaje").textContent = personajeActual.sabiduria;
  document.getElementById("suerte-personaje").textContent = personajeActual.suerte;
  document.getElementById("inventario-personaje").innerHTML = "";
  for (let item of personajeActual.inventario) {
    let li = document.createElement("li");
    li.innerHTML = `<img src="${item.imagen}" alt=""><span>${item.nombre}</span>`;
    document.getElementById("inventario-personaje").appendChild(li);  }
  document.getElementById("mision-personaje").textContent = personajeActual.mision;
  document.getElementById("salud-personaje").value = personajeActual.salud;
  if (personajeActual.saludMaxima) { 
    document.getElementById("salud-personaje").max = personajeActual.saludMaxima; 
    document.getElementById("valor-salud").textContent = `${personajeActual.salud}/${personajeActual.saludMaxima}`;
  } else {
    document.getElementById("salud-personaje").max = ""; 
    document.getElementById("valor-salud").textContent = `${personajeActual.salud}/?`;
  }  
  document.getElementById("energia-personaje").value = personajeActual.energia;
   if (personajeActual.energiaMaxima) { 
    document.getElementById("energia-personaje").max = personajeActual.energiaMaxima; 
    document.getElementById("valor-energia").textContent = `${personajeActual.energia}/${personajeActual.energiaMaxima}`;
  } else {
    document.getElementById("energia-personaje").max = ""; 
    document.getElementById("valor-energia").textContent = `${personajeActual.energia}/?`;
  }
  document.getElementById("habilidades-personaje").innerHTML = "";
  for (let habilidad of personajeActual.habilidades) {
    let li = document.createElement("li");
    li.innerHTML = `<span>${habilidad.nombre} : ${habilidad.descripcion} </span>`;
    document.getElementById("habilidades-personaje").appendChild(li);
  }
});
document.getElementById("boton-salir").addEventListener("click", function() {
  mostrarPantalla("pantalla-titulo");
});
document.getElementById("boton-instrucciones").addEventListener("click", function() {
  mostrarPantalla("pantalla-instrucciones");
});
document.getElementById("boton-volver").addEventListener("click", function() {
  mostrarPantalla("pantalla-juego");
});
document.getElementById("boton-volver2").addEventListener("click", function() {
  mostrarPantalla("pantalla-juego");
});
document.getElementById("boton-izquierda").addEventListener("click", function() {
  let clases = ["guerrero", "paladin", "ladron", "cazador", "hechizero", "necromante"];
  let avatares = ["img/guerrero.png", "img/paladin.png", "img/ladron.png", "img/cazador.png", "img/hechizero.png", "img/necromante.png"];
  let indice = clases.indexOf(document.getElementById("clase").value);
  if (indice === -1) {
    indice = clases.length - 1;
  } else {
    indice--;
    if (indice < 0) {
      indice = clases.length -1;
    }
  }
  document.getElementById("clase").value = clases[indice];
  document.getElementById("avatar-clase").src = avatares[indice];
  document.getElementById("clase-nombre").textContent = clases[indice];
});
document.getElementById("boton-derecha").addEventListener("click", function() {
  let clases = ["guerrero", "paladin", "ladron", "cazador", "hechizero", "necromante"];
  let avatares = ["img/guerrero.png", "img/paladin.png", "img/ladron.png", "img/cazador.png", "img/hechizero.png", "img/necromante.png"];
  let indice = clases.indexOf(document.getElementById("clase").value);
  if (indice === -1) {
    indice = 0;
  } else {
    indice++;
    if (indice >= clases.length) {
      indice = 0;
    }
  }
  document.getElementById("clase").value = clases[indice];
  document.getElementById("avatar-clase").src = avatares[indice];
  document.getElementById("clase-nombre").textContent = clases[indice];
});
let botonesSumar = document.querySelectorAll(".boton-sumar");
let botonesRestar = document.querySelectorAll(".boton-restar");
for (let boton of botonesSumar) {
  boton.addEventListener("click", function() {
    let atributo = this.previousElementSibling; 
    let puntos = parseInt(document.getElementById("puntos-restantes").textContent.split(": ")[1]); 
    if (puntos > 0) {
      atributo.value = parseInt(atributo.value) + 1; 
      puntos--; 
      document.getElementById("puntos-restantes").textContent = `Puntos restantes: ${puntos}`; 
    }
  });
}
for (let boton of botonesRestar) {
  boton.addEventListener("click", function() {
    let atributo = this.previousElementSibling.previousElementSibling; 
    let puntos = parseInt(document.getElementById("puntos-restantes").textContent.split(": ")[1]); 
    if (atributo.value > 0) {
      atributo.value = parseInt(atributo.value) - 1;
      puntos++; 
      document.getElementById("puntos-restantes").textContent = `Puntos restantes: ${puntos}`; 
    }
  });
}