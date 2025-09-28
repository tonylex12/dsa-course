/**
 * ALGORITMO DE ORDENAMIENTO POR SELECCIÓN (SELECTION SORT)
 *
 * Selection Sort es un algoritmo de ordenamiento que encuentra repetidamente el elemento
 * mínimo de la parte no ordenada del arreglo y lo coloca al principio.
 *
 * Funcionamiento:
 * 1. Encuentra el elemento más pequeño del arreglo
 * 2. Lo intercambia con el primer elemento
 * 3. Encuentra el segundo elemento más pequeño del resto del arreglo
 * 4. Lo intercambia con el segundo elemento
 * 5. Continúa hasta que todo el arreglo esté ordenado
 *
 * Complejidad temporal:
 * - Mejor caso: O(n²)
 * - Caso promedio: O(n²)
 * - Peor caso: O(n²)
 *
 * Complejidad espacial: O(1) - algoritmo in-place (en el mismo arreglo)
 *
 * Ventajas:
 * - Simple de implementar y entender
 * - Pocos intercambios (máximo n-1 intercambios)
 * - Funciona bien con arreglos pequeños
 *
 * Desventajas:
 * - Ineficiente para arreglos grandes O(n²)
 * - No es estable (puede cambiar el orden relativo de elementos iguales)
 */

/**
 * Implementación básica de Selection Sort
 * @param {number[]} arr - Arreglo a ordenar
 * @returns {number[]} - Arreglo ordenado
 */
function selectionSort(arr) {
  // Crear una copia para no modificar el arreglo original
  const sortedArray = [...arr];
  const n = sortedArray.length;

  // Recorrer todo el arreglo
  for (let i = 0; i < n - 1; i++) {
    // Encontrar el índice del elemento mínimo en la parte no ordenada
    let minIndex = i;

    // Buscar el elemento más pequeño en el resto del arreglo
    for (let j = i + 1; j < n; j++) {
      if (sortedArray[j] < sortedArray[minIndex]) {
        minIndex = j; // Actualizar el índice del mínimo
      }
    }

    // Intercambiar el elemento mínimo encontrado con el primer elemento
    if (minIndex !== i) {
      [sortedArray[i], sortedArray[minIndex]] = [
        sortedArray[minIndex],
        sortedArray[i],
      ];
    }
  }

  return sortedArray;
}

/**
 * Selection Sort con visualización paso a paso
 * @param {number[]} arr - Arreglo a ordenar
 * @returns {number[]} - Arreglo ordenado
 */
function selectionSortWithVisualization(arr) {
  console.log("🔴 Selection Sort - Visualización paso a paso");
  console.log("Arreglo original:", arr);
  console.log("─".repeat(60));

  const sortedArray = [...arr];
  const n = sortedArray.length;
  let totalSwaps = 0;
  let totalComparisons = 0;

  for (let i = 0; i < n - 1; i++) {
    console.log(`\n🔍 Pasada ${i + 1}: Buscando el mínimo desde posición ${i}`);
    console.log(`   Parte ordenada: [${sortedArray.slice(0, i).join(", ")}]`);
    console.log(`   Parte a revisar: [${sortedArray.slice(i).join(", ")}]`);

    let minIndex = i;
    let minValue = sortedArray[i];

    console.log(`   Elemento actual en posición ${i}: ${minValue}`);

    // Buscar el mínimo
    for (let j = i + 1; j < n; j++) {
      totalComparisons++;
      console.log(
        `   Comparando ${minValue} con ${sortedArray[j]} (posición ${j})`
      );

      if (sortedArray[j] < sortedArray[minIndex]) {
        minIndex = j;
        minValue = sortedArray[j];
        console.log(
          `   ✅ Nuevo mínimo encontrado: ${minValue} en posición ${j}`
        );
      } else {
        console.log(`   ❌ ${sortedArray[j]} no es menor que ${minValue}`);
      }
    }

    // Intercambiar si es necesario
    if (minIndex !== i) {
      console.log(
        `   🔄 Intercambiando ${sortedArray[i]} (pos ${i}) con ${sortedArray[minIndex]} (pos ${minIndex})`
      );
      [sortedArray[i], sortedArray[minIndex]] = [
        sortedArray[minIndex],
        sortedArray[i],
      ];
      totalSwaps++;
    } else {
      console.log(`   ✨ ${sortedArray[i]} ya está en la posición correcta`);
    }

    console.log(`   Resultado: [${sortedArray.join(", ")}]`);
    console.log(`   Ordenados: ${i + 1}/${n} elementos`);
  }

  console.log("─".repeat(60));
  console.log(`🎉 Arreglo final ordenado: [${sortedArray.join(", ")}]`);
  console.log(`📊 Estadísticas:`);
  console.log(`   • Total de comparaciones: ${totalComparisons}`);
  console.log(`   • Total de intercambios: ${totalSwaps}`);
  console.log(`   • Pasadas realizadas: ${n - 1}`);

  return sortedArray;
}

/**
 * Selection Sort que encuentra el máximo en lugar del mínimo
 * (ordena colocando los elementos grandes al final)
 * @param {number[]} arr - Arreglo a ordenar
 * @returns {number[]} - Arreglo ordenado
 */
function selectionSortMaxVersion(arr) {
  const sortedArray = [...arr];
  const n = sortedArray.length;

  // Trabajar desde el final hacia adelante
  for (let i = n - 1; i > 0; i--) {
    // Encontrar el elemento máximo en la parte no ordenada
    let maxIndex = 0;

    for (let j = 1; j <= i; j++) {
      if (sortedArray[j] > sortedArray[maxIndex]) {
        maxIndex = j;
      }
    }

    // Intercambiar el máximo con el último elemento de la parte no ordenada
    if (maxIndex !== i) {
      [sortedArray[i], sortedArray[maxIndex]] = [
        sortedArray[maxIndex],
        sortedArray[i],
      ];
    }
  }

  return sortedArray;
}

/**
 * Función para comparar rendimiento entre diferentes implementaciones
 * @param {number[]} arr - Arreglo a probar
 * @param {Function} algorithm - Algoritmo a probar
 * @param {string} name - Nombre del algoritmo
 * @returns {number[]} - Arreglo ordenado
 */
function performanceTest(arr, algorithm, name) {
  const start = performance.now();
  const result = algorithm([...arr]);
  const end = performance.now();
  console.log(`${name}: ${(end - start).toFixed(4)}ms`);
  return result;
}

// ==================== EJEMPLOS DE USO ====================

console.log("🚀 EJEMPLOS DEL ALGORITMO SELECTION SORT\n");

// Ejemplo 1: Uso básico
console.log("📝 Ejemplo 1: Selection Sort básico");
const numbers1 = [64, 25, 12, 22, 11];
console.log("Original:", numbers1);
console.log("Ordenado:", selectionSort(numbers1));
console.log();

// Ejemplo 2: Arreglo ya ordenado
console.log("📝 Ejemplo 2: Arreglo ya ordenado");
const numbers2 = [1, 2, 3, 4, 5];
console.log("Original:", numbers2);
console.log("Ordenado:", selectionSort(numbers2));
console.log();

// Ejemplo 3: Arreglo en orden inverso
console.log("📝 Ejemplo 3: Arreglo en orden inverso (peor caso)");
const numbers3 = [5, 4, 3, 2, 1];
console.log("Original:", numbers3);
console.log("Ordenado:", selectionSort(numbers3));
console.log();

// Ejemplo 4: Arreglo con valores duplicados
console.log("📝 Ejemplo 4: Arreglo con valores duplicados");
const numbers4 = [3, 7, 3, 1, 7, 2, 1];
console.log("Original:", numbers4);
console.log("Ordenado:", selectionSort(numbers4));
console.log();

// Ejemplo 5: Casos límite
console.log("📝 Ejemplo 5: Casos límite");
console.log("Un solo elemento [42]:", selectionSort([42]));
console.log("Arreglo vacío []:", selectionSort([]));
console.log("Dos elementos [3, 1]:", selectionSort([3, 1]));
console.log();

// Ejemplo 6: Visualización paso a paso
console.log("📝 Ejemplo 6: Visualización detallada");
const visualizationArray = [29, 10, 14, 37, 13];
selectionSortWithVisualization(visualizationArray);
console.log();

// Ejemplo 7: Comparación de versiones
console.log("📝 Ejemplo 7: Comparación entre versiones");
const testArray = [8, 5, 2, 9, 1, 3];
console.log("Arreglo de prueba:", testArray);
console.log("Versión mínimo:", selectionSort(testArray));
console.log("Versión máximo:", selectionSortMaxVersion(testArray));
console.log();

// Ejemplo 8: Comparación de rendimiento
console.log("📝 Ejemplo 8: Prueba de rendimiento");
const largeArray = Array.from({ length: 1000 }, () =>
  Math.floor(Math.random() * 1000)
);
console.log("Ordenando 1000 números aleatorios:");
performanceTest(largeArray, selectionSort, "Selection Sort (mínimo)");
performanceTest(largeArray, selectionSortMaxVersion, "Selection Sort (máximo)");
console.log();

// Ejemplo 9: Comparación teórica vs práctica
console.log("📝 Ejemplo 9: Análisis de complejidad");
console.log(
  "Selection Sort siempre realiza O(n²) comparaciones, sin importar el orden inicial:"
);

function countOperations(arr) {
  const n = arr.length;
  let comparisons = 0;

  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      comparisons++;
    }
  }

  return comparisons;
}

const sizes = [5, 10, 20];
sizes.forEach((size) => {
  const testArr = Array.from({ length: size }, (_, i) => i + 1);
  const operations = countOperations(testArr);
  const theoretical = (size * (size - 1)) / 2;
  console.log(
    `Tamaño ${size}: ${operations} comparaciones (teórico: ${theoretical})`
  );
});

// Exportar funciones para usar en otros módulos
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    selectionSort,
    selectionSortWithVisualization,
    selectionSortMaxVersion,
    performanceTest,
  };
}
