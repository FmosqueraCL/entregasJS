let carta = false;
do {
  carta = Number(prompt("TAROTISTA: Piensa una pregunta e ingresa un numero del 1 al 22 para saber tu suerte"));
  if (carta === 1) console.log("El loco");
  else if (carta === 2) console.log("El mago");
  else if (carta === 3) console.log("La sacerdotisa");
  else if (carta === 4) console.log("La emperatriz");
  else if (carta === 5) console.log("El emperador");
  else if (carta === 6) console.log("El sumo sacerdote");
  else if (carta === 7) console.log("Los enamorados");
  else if (carta === 8) console.log("El carro");
  else if (carta === 9) console.log("La justicia");
  else if (carta === 10) console.log("El ermitaño");
  else if (carta === 11) console.log("La rueda de la fortuna");
  else if (carta === 12) console.log("La fuerza");
  else if (carta === 13) console.log("El colgado");
  else if (carta === 14) console.log("La muerte");
  else if (carta === 15) console.log("La templanza");
  else if (carta === 16) console.log("El diablo");
  else if (carta === 17) console.log("La torre");
  else if (carta === 18) console.log("La estrella");
  else if (carta === 19) console.log("La luna");
  else if (carta === 20) console.log("El sol");
  else if (carta === 21) console.log("El juicio");
  else if (carta === 22) console.log("El mundo");
  else if (carta === 0) console.log("Gracias por jugar");
}while ( carta < 0 || carta > 22 || isNaN(carta))