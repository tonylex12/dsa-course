/**
 * ALGORITMO DE ORDENAMIENTO BURBUJA (BUBBLE SORT)
 *
 * Bubble Sort es un algoritmo de ordenamiento sencillo que recorre repetidamente la lista,
 * compara elementos adyacentes e intercambia su posición si están en el orden incorrecto.
 * El proceso se repite hasta que la lista está ordenada.
 *
 * Complejidad temporal:
 * - Mejor caso: O(n) cuando el arreglo ya está ordenado
 * - Caso promedio: O(n²)
 * - Peor caso: O(n²)
 *
 * Complejidad espacial: O(1) - algoritmo in-place (en el mismo arreglo)
 */

/**
 * Implementación básica de Bubble Sort
 * @param {number[]} arr - Arreglo a ordenar
 * @returns {number[]} - Arreglo ordenado
 */
function bubbleSort(arr) {
  // Crear una copia para no modificar el arreglo original
  const sortedArray = [...arr];
  const n = sortedArray.length;

  // Ciclo externo para el número de pasadas
  for (let i = 0; i < n - 1; i++) {
    // Ciclo interno para comparar en cada pasada
    for (let j = 0; j < n - i - 1; j++) {
      // Comparar elementos adyacentes
      if (sortedArray[j] > sortedArray[j + 1]) {
        // Intercambiar si están en el orden incorrecto
        [sortedArray[j], sortedArray[j + 1]] = [
          sortedArray[j + 1],
          sortedArray[j],
        ];
      }
    }
  }

  return sortedArray;
}

/**
 * Bubble Sort optimizado con terminación temprana
 * @param {number[]} arr - Arreglo a ordenar
 * @returns {number[]} - Arreglo ordenado
 */
function bubbleSortOptimized(arr) {
  const sortedArray = [...arr];
  const n = sortedArray.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false; // Bandera para saber si hubo algún intercambio

    for (let j = 0; j < n - i - 1; j++) {
      if (sortedArray[j] > sortedArray[j + 1]) {
        // Intercambiar elementos
        [sortedArray[j], sortedArray[j + 1]] = [
          sortedArray[j + 1],
          sortedArray[j],
        ];
        swapped = true;
      }
    }

    // Si no hubo intercambios, el arreglo ya está ordenado
    if (!swapped) {
      break;
    }
  }

  return sortedArray;
}

/**
 * Bubble Sort con visualización paso a paso
 * @param {number[]} arr - Arreglo a ordenar
 * @returns {number[]} - Arreglo ordenado
 */
function bubbleSortWithVisualization(arr) {
  console.log("🔵 Bubble Sort - Visualización paso a paso");
  console.log("Arreglo original:", arr);
  console.log("─".repeat(50));

  const sortedArray = [...arr];
  const n = sortedArray.length;
  let totalSwaps = 0;

  for (let i = 0; i < n - 1; i++) {
    console.log(`\nPasada ${i + 1}:`);
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      console.log(`  Comparando ${sortedArray[j]} y ${sortedArray[j + 1]}`);

      if (sortedArray[j] > sortedArray[j + 1]) {
        // Intercambiar elementos
        [sortedArray[j], sortedArray[j + 1]] = [
          sortedArray[j + 1],
          sortedArray[j],
        ];
        totalSwaps++;
        swapped = true;
        console.log(
          `  ✅ ¡Intercambiado! Arreglo: [${sortedArray.join(", ")}]`
        );
      } else {
        console.log(`  ❌ No se intercambia`);
      }
    }

    if (!swapped) {
      console.log(
        `  🎉 No hubo intercambios en esta pasada - ¡arreglo ordenado!`
      );
      break;
    }

    console.log(`  Fin de la pasada ${i + 1}: [${sortedArray.join(", ")}]`);
  }

  console.log("─".repeat(50));
  console.log(`Arreglo final ordenado: [${sortedArray.join(", ")}]`);
  console.log(`Total de intercambios realizados: ${totalSwaps}`);

  return sortedArray;
}

// ==================== EJEMPLOS DE USO ====================

console.log("🚀 EJEMPLOS DEL ALGORITMO BUBBLE SORT\n");

// Ejemplo 1: Uso básico
console.log("📝 Ejemplo 1: Bubble Sort básico");
const numbers1 = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", numbers1);
console.log("Ordenado:  ", bubbleSort(numbers1));
console.log();

// Ejemplo 2: Arreglo ya ordenado (mejor caso)
console.log("📝 Ejemplo 2: Arreglo ya ordenado");
const numbers2 = [1, 2, 3, 4, 5];
console.log("Original:", numbers2);
console.log("Ordenado:  ", bubbleSortOptimized(numbers2));
console.log();

// Ejemplo 3: Arreglo en orden inverso (peor caso)
console.log("📝 Ejemplo 3: Arreglo en orden inverso");
const numbers3 = [5, 4, 3, 2, 1];
console.log("Original:", numbers3);
console.log("Ordenado:  ", bubbleSort(numbers3));
console.log();

// Ejemplo 4: Arreglo con valores duplicados
console.log("📝 Ejemplo 4: Arreglo con valores duplicados");
const numbers4 = [3, 7, 3, 1, 7, 2, 1];
console.log("Original:", numbers4);
console.log("Ordenado:  ", bubbleSort(numbers4));
console.log();

// Ejemplo 5: Casos límite (un elemento, vacío, dos elementos)
console.log("📝 Ejemplo 5: Casos límite");
console.log("Un solo elemento [42]:", bubbleSort([42]));
console.log("Arreglo vacío []:", bubbleSort([]));
console.log("Dos elementos [3, 1]:", bubbleSort([3, 1]));
console.log();

// Ejemplo 6: Visualización paso a paso
console.log("📝 Ejemplo 6: Visualización paso a paso");
const visualizationArray = [5, 2, 8, 1, 9];
bubbleSortWithVisualization(visualizationArray);
console.log();

// Ejemplo 7: Comparación de rendimiento
console.log("📝 Ejemplo 7: Comparación de rendimiento");
function performanceTest(arr, algorithm, name) {
  const start = performance.now();
  const result = algorithm([...arr]);
  const end = performance.now();
  console.log(`${name}: ${(end - start).toFixed(4)}ms`);
  return result;
}

const largeArray = Array.from({ length: 1000 }, () =>
  Math.floor(Math.random() * 1000)
);
console.log("Ordenando 1000 números aleatorios:");
performanceTest(largeArray, bubbleSort, "Bubble Sort básico");
performanceTest(largeArray, bubbleSortOptimized, "Bubble Sort optimizado");

// Export functions for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    bubbleSort,
    bubbleSortOptimized,
    bubbleSortWithVisualization,
  };
}
