// Imprime todos los pares posibles de un array (incluyendo pares repetidos y consigo mismo)
// Eficiencia: O(n^2). No hay forma más eficiente si necesitas mostrar todos los pares.

const boxes = ["a", "b", "c", "d", "e"];

function logAllPairsOfArray(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      console.log(array[i], array[j]);
    }
  }
}

// Ejemplo de uso:
console.log("--- Todos los pares posibles ---");
logAllPairsOfArray(boxes);
