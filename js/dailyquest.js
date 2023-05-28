function validarEntrada(mensaje, opciones) {
  let respuesta = prompt(mensaje);
  while (!opciones.includes(respuesta)) {
    alert("Por favor, ingresa un número del 1 al " + opciones.length + ".");
    respuesta = prompt(mensaje);
  }
  return respuesta;
}
function personajeToString(personaje) {
  let texto = "";
  texto += `Tu personaje se llama ${personaje.nombre}`;
  if (personaje.genero == "hombre") {
    texto += " y es un hombre.";
  } else if (personaje.genero == "mujer") {
    texto += " y es una mujer.";
  } else {
    texto += " y es de género no binario.";
  }
  if (personaje.rol == "caballero") {
    texto += " Es un caballero.";
  } else if (personaje.rol == "ladron") {
    texto += " Es un ladrón.";
  } else {
    texto += " Es un sanador.";
  }
  if (personaje.fisico.pelo == "rubio") {
    texto += " Tiene el pelo rubio";
  } else if (personaje.fisico.pelo == "castaño") {
    texto += " Tiene el pelo castaño";
  } else {
    texto += " Tiene el pelo negro";
  }
  if (personaje.fisico.ojos == "azules") {
    texto += ", los ojos azules";
  } else if (personaje.fisico.ojos == "verdes") {
    texto += ", los ojos verdes";
  } else {
    texto += ", los ojos marrones";
  }
  if (personaje.fisico.cuerpo == "atlético") {
    texto += " y un cuerpo atlético. ";
  } else if (personaje.fisico.cuerpo == "delgado") {
    texto += " y un cuerpo delgado. ";
  } else {
    texto += " y un cuerpo robusto. ";
  }
  if (personaje.mental.personalidad == "valiente") {
    texto += "Es una persona valiente";
  } else if (personaje.mental.personalidad == "inteligente") {
    texto += "Es una persona inteligente";
  } else {
    texto += "Es una persona amable";
  }
  if (personaje.mental.habilidad == "luchar") {
    texto += ", que sabe luchar";
  } else if (personaje.mental.habilidad == "resolver") {
    texto += ", que sabe resolver problemas";
  } else {
    texto += ", que sabe curar";
  }
  if (personaje.mental.defecto == "orgulloso") {
    texto += ", pero también es orgulloso.";
  } else if (personaje.mental.defecto == "impaciente") {
    texto += ", pero también es impaciente.";
  } else {
    texto += ", pero también es miedoso.";
  }
  return texto;
}
function testAventurero() {
 let preguntas = [
   "¿Qué prefieres hacer en tu tiempo libre?\n1) Leer un libro\n2) Salir con amigos\n3) Practicar algún deporte",
   "¿Qué tipo de película te gusta más?\n1) Acción\n2) Comedia\n3) Drama",
   "¿Qué animal te gustaría ser?\n1) León\n2) Mono\n3) Águila"
 ];
 let respuestas = [];
 let puntaje = 0;
 for (let i = 0; i < preguntas.length; i++) {
   let respuesta = validarEntrada(preguntas[i], ["1", "2", "3"]);
   respuestas.push(respuesta);
   if (respuesta == "1") {
     puntaje++;
   } else if (respuesta == "3") {
     puntaje--;
   }
 }
 let tipo;
 if (puntaje > 0) {
   tipo = "Caballero";
 } else if (puntaje < 0) {
   tipo = "Sanador";
 } else {
   tipo = "Ladrón";
 }
 alert("Tu tipo de aventurero es: " + tipo);
 return tipo;
}
function disenadorDePersonaje() {
 let nombre;
 do {
   nombre = prompt("¿Cómo se llama tu personaje?");
   if (!nombre) {
     alert("Por favor, ingresa un nombre para tu personaje.");
   }
 } while (!nombre);
 let preguntas = {
   genero: ["hombre", "mujer", "no binario"],
   rol: ["caballero", "ladron", "sanador"],
   pelo: ["rubio", "castaño", "negro"],
   ojos: ["azules", "verdes", "marrones"],
   cuerpo: ["atlético", "delgado", "robusto"],
   personalidad: ["valiente", "inteligente", "amable"],
   habilidad: ["luchar", "resolver", "curar"],
   defecto: ["orgulloso", "impaciente", "miedoso"]
 };
 let respuestas = {};
 for (let pregunta in preguntas) {
   let respuesta = validarEntrada(
     `¿Qué ${pregunta} tiene tu personaje?\n1) ${preguntas[pregunta][0]}\n2) ${preguntas[pregunta][1]}\n3) ${preguntas[pregunta][2]}`,
     ["1", "2", "3"]
   );
   respuestas[pregunta] = preguntas[pregunta][respuesta - 1];
 }
 let personaje = {
   nombre: nombre,
   genero: respuestas.genero,
   rol: respuestas.rol,
   fisico: {
     pelo: respuestas.pelo,
     ojos: respuestas.ojos,
     cuerpo: respuestas.cuerpo
   },
   mental: {
     personalidad: respuestas.personalidad,
     habilidad: respuestas.habilidad,
     defecto: respuestas.defecto
   }
 };
 alert("Tu personaje es:\n" + personajeToString(personaje));
 return personaje;
}
function showOptions() {
  let choice;  
  do {
    let message = 'Bienvenido a crea tu personaje medieval\n';
    message += 'Este es un juego interactivo donde puedes crear tu hoja de personaje medieval\n';
    message += 'Por favor, elige una opción:\n';
    message += '1- TEST DEL AVENTURERO\n';
    message += '2- DISEÑADOR DE PERSONAJE\n';
    message += '3- SALIR\n';
    choice = prompt(message);
    switch (choice) {
      case '1':
        let tipo = testAventurero();
        break;
      case '2':
        let personaje = disenadorDePersonaje();
        break;
      case '3':
        alert('Gracias por jugar a DailyQuest. Hasta pronto!');
        break;
      default:
        alert('Por favor, elige una opción del 1 al 3.');
        break;
    } 
  } while (choice != '4');
}
showOptions();

