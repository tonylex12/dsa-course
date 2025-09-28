/**
 * ALGORITMO DE ORDENAMIENTO POR INSERCIÓN (INSERTION SORT)
 *
 * Insertion Sort es un algoritmo de ordenamiento que construye la lista ordenada
 * de uno en uno, insertando cada elemento en su posición correcta dentro de la
 * parte ya ordenada del arreglo.
 *
 * Funcionamiento (similar a ordenar cartas en la mano):
 * 1. Empieza con el segundo elemento (el primero se considera "ordenado")
 * 2. Compara el elemento actual con los elementos anteriores
 * 3. Desplaza los elementos mayores hacia la derecha
 * 4. Inserta el elemento actual en su posición correcta
 * 5. Repite hasta procesar todos los elementos
 *
 * Complejidad temporal:
 * - Mejor caso: O(n) cuando el arreglo ya está ordenado
 * - Caso promedio: O(n²)
 * - Peor caso: O(n²) cuando el arreglo está en orden inverso
 *
 * Complejidad espacial: O(1) - algoritmo in-place
 *
 * Ventajas:
 * - Eficiente para arreglos pequeños
 * - Adaptativo (eficiente para datos casi ordenados)
 * - Estable (mantiene el orden relativo de elementos iguales)
 * - In-place (requiere solo O(1) memoria extra)
 * - Online (puede ordenar mientras recibe los datos)
 *
 * Desventajas:
 * - Ineficiente para arreglos grandes O(n²)
 * - Más escrituras que Selection Sort
 */

/**
 * Implementación básica de Insertion Sort
 * @param {number[]} arr - Arreglo a ordenar
 * @returns {number[]} - Arreglo ordenado
 */
function insertionSort(arr) {
  // Crear una copia para no modificar el arreglo original
  const sortedArray = [...arr];
  const n = sortedArray.length;

  // Empezar desde el segundo elemento (índice 1)
  for (let i = 1; i < n; i++) {
    let key = sortedArray[i]; // Elemento a insertar
    let j = i - 1; // Índice del último elemento de la parte ordenada

    // Mover elementos mayores que key hacia la derecha
    while (j >= 0 && sortedArray[j] > key) {
      sortedArray[j + 1] = sortedArray[j];
      j = j - 1;
    }

    // Insertar key en su posición correcta
    sortedArray[j + 1] = key;
  }

  return sortedArray;
}

/**
 * Insertion Sort optimizado con terminación temprana
 * @param {number[]} arr - Arreglo a ordenar
 * @returns {number[]} - Arreglo ordenado
 */
function insertionSortOptimized(arr) {
  const sortedArray = [...arr];
  const n = sortedArray.length;

  for (let i = 1; i < n; i++) {
    let key = sortedArray[i];
    let j = i - 1;

    // Si el elemento ya está en su lugar, continuar
    if (sortedArray[j] <= key) {
      continue;
    }

    // Mover elementos y encontrar posición de inserción
    while (j >= 0 && sortedArray[j] > key) {
      sortedArray[j + 1] = sortedArray[j];
      j--;
    }

    sortedArray[j + 1] = key;
  }

  return sortedArray;
}

/**
 * Insertion Sort con búsqueda binaria para encontrar la posición de inserción
 * @param {number[]} arr - Arreglo a ordenar
 * @returns {number[]} - Arreglo ordenado
 */
function insertionSortBinary(arr) {
  const sortedArray = [...arr];
  const n = sortedArray.length;

  // Función para encontrar la posición de inserción usando búsqueda binaria
  function binarySearch(arr, value, start, end) {
    if (start === end) {
      return arr[start] > value ? start : start + 1;
    }

    if (start > end) {
      return start;
    }

    const mid = Math.floor((start + end) / 2);

    if (arr[mid] < value) {
      return binarySearch(arr, value, mid + 1, end);
    } else if (arr[mid] > value) {
      return binarySearch(arr, value, start, mid - 1);
    } else {
      return mid;
    }
  }

  for (let i = 1; i < n; i++) {
    let key = sortedArray[i];
    let j = binarySearch(sortedArray, key, 0, i - 1);

    // Desplazar elementos hacia la derecha
    for (let k = i - 1; k >= j; k--) {
      sortedArray[k + 1] = sortedArray[k];
    }

    // Insertar el elemento en su posición
    sortedArray[j] = key;
  }

  return sortedArray;
}

/**
 * Insertion Sort con visualización paso a paso
 * @param {number[]} arr - Arreglo a ordenar
 * @returns {number[]} - Arreglo ordenado
 */
function insertionSortWithVisualization(arr) {
  console.log("🟢 Insertion Sort - Visualización paso a paso");
  console.log("Arreglo original:", arr);
  console.log("─".repeat(70));

  const sortedArray = [...arr];
  const n = sortedArray.length;
  let totalComparisons = 0;
  let totalShifts = 0;

  for (let i = 1; i < n; i++) {
    console.log(`\n🔍 Paso ${i}: Insertando elemento ${sortedArray[i]}`);
    console.log(`   Parte ordenada: [${sortedArray.slice(0, i).join(", ")}]`);
    console.log(`   Elemento a insertar: ${sortedArray[i]}`);
    console.log(
      `   Parte sin procesar: [${sortedArray.slice(i + 1).join(", ")}]`
    );

    let key = sortedArray[i];
    let j = i - 1;
    let shifts = 0;

    console.log(`   Buscando posición para ${key}:`);

    // Mostrar el proceso de búsqueda e inserción
    while (j >= 0 && sortedArray[j] > key) {
      totalComparisons++;
      console.log(
        `   Comparando ${key} con ${sortedArray[j]} → ${key} < ${sortedArray[j]}, mover ${sortedArray[j]} a la derecha`
      );
      sortedArray[j + 1] = sortedArray[j];
      shifts++;
      totalShifts++;
      j = j - 1;
    }

    if (j >= 0) {
      totalComparisons++;
      console.log(
        `   Comparando ${key} con ${sortedArray[j]} → ${key} >= ${sortedArray[j]}, posición encontrada`
      );
    }

    sortedArray[j + 1] = key;

    if (shifts > 0) {
      console.log(
        `   ✅ Insertado ${key} en posición ${j + 1} (movimientos: ${shifts})`
      );
    } else {
      console.log(`   ✨ ${key} ya estaba en la posición correcta`);
    }

    console.log(`   Resultado: [${sortedArray.join(", ")}]`);
  }

  console.log("─".repeat(70));
  console.log(`🎉 Arreglo final ordenado: [${sortedArray.join(", ")}]`);
  console.log(`📊 Estadísticas:`);
  console.log(`   • Total de comparaciones: ${totalComparisons}`);
  console.log(`   • Total de movimientos: ${totalShifts}`);
  console.log(`   • Elementos procesados: ${n - 1}`);

  return sortedArray;
}

/**
 * Insertion Sort para ordenar strings
 * @param {string[]} arr - Arreglo de strings a ordenar
 * @returns {string[]} - Arreglo ordenado
 */
function insertionSortStrings(arr) {
  const sortedArray = [...arr];
  const n = sortedArray.length;

  for (let i = 1; i < n; i++) {
    let key = sortedArray[i];
    let j = i - 1;

    // Comparación lexicográfica para strings
    while (j >= 0 && sortedArray[j].localeCompare(key) > 0) {
      sortedArray[j + 1] = sortedArray[j];
      j = j - 1;
    }

    sortedArray[j + 1] = key;
  }

  return sortedArray;
}

/**
 * Función para medir rendimiento de algoritmos
 * @param {number[]} arr - Arreglo a probar
 * @param {Function} algorithm - Algoritmo a probar
 * @param {string} name - Nombre del algoritmo
 * @returns {Object} - Resultado con tiempo y arreglo ordenado
 */
function performanceTest(arr, algorithm, name) {
  const start = performance.now();
  const result = algorithm([...arr]);
  const end = performance.now();
  const time = (end - start).toFixed(4);
  console.log(`${name}: ${time}ms`);
  return { result, time: parseFloat(time) };
}

// ==================== EJEMPLOS DE USO ====================

console.log("🚀 EJEMPLOS DEL ALGORITMO INSERTION SORT\n");

// Ejemplo 1: Uso básico
console.log("📝 Ejemplo 1: Insertion Sort básico");
const numbers1 = [12, 11, 13, 5, 6];
console.log("Original:", numbers1);
console.log("Ordenado:", insertionSort(numbers1));
console.log();

// Ejemplo 2: Mejor caso - arreglo ya ordenado
console.log("📝 Ejemplo 2: Mejor caso (arreglo ya ordenado)");
const numbers2 = [1, 2, 3, 4, 5];
console.log("Original:", numbers2);
console.log("Ordenado:", insertionSort(numbers2));
console.log();

// Ejemplo 3: Peor caso - arreglo en orden inverso
console.log("📝 Ejemplo 3: Peor caso (orden inverso)");
const numbers3 = [5, 4, 3, 2, 1];
console.log("Original:", numbers3);
console.log("Ordenado:", insertionSort(numbers3));
console.log();

// Ejemplo 4: Arreglo con duplicados
console.log("📝 Ejemplo 4: Arreglo con valores duplicados");
const numbers4 = [4, 2, 7, 4, 1, 7, 2];
console.log("Original:", numbers4);
console.log("Ordenado:", insertionSort(numbers4));
console.log();

// Ejemplo 5: Casos límite
console.log("📝 Ejemplo 5: Casos límite");
console.log("Un elemento [42]:", insertionSort([42]));
console.log("Arreglo vacío []:", insertionSort([]));
console.log("Dos elementos [9, 3]:", insertionSort([9, 3]));
console.log();

// Ejemplo 6: Visualización paso a paso
console.log("📝 Ejemplo 6: Visualización detallada");
const visualArray = [5, 2, 4, 6, 1, 3];
insertionSortWithVisualization(visualArray);
console.log();

// Ejemplo 7: Ordenamiento de strings
console.log("📝 Ejemplo 7: Ordenamiento de strings");
const palabras = ["banana", "apple", "cherry", "date", "elderberry"];
console.log("Palabras originales:", palabras);
console.log("Palabras ordenadas:", insertionSortStrings(palabras));
console.log();

// Ejemplo 8: Comparación de versiones
console.log("📝 Ejemplo 8: Comparación entre versiones");
const testArray = [8, 3, 5, 4, 7, 6, 1, 2];
console.log("Arreglo de prueba:", testArray);
console.log("Versión básica:", insertionSort(testArray));
console.log("Versión optimizada:", insertionSortOptimized(testArray));
console.log("Versión con búsqueda binaria:", insertionSortBinary(testArray));
console.log();

// Ejemplo 9: Análisis de rendimiento
console.log("📝 Ejemplo 9: Análisis de rendimiento");
console.log("Comparando diferentes casos:");

// Mejor caso: arreglo ordenado
const sortedArray = Array.from({ length: 1000 }, (_, i) => i + 1);
console.log("\n🟢 Mejor caso (arreglo ordenado):");
performanceTest(sortedArray, insertionSort, "Insertion Sort básico");
performanceTest(
  sortedArray,
  insertionSortOptimized,
  "Insertion Sort optimizado"
);

// Caso promedio: arreglo aleatorio
const randomArray = Array.from({ length: 1000 }, () =>
  Math.floor(Math.random() * 1000)
);
console.log("\n🟡 Caso promedio (arreglo aleatorio):");
performanceTest(randomArray, insertionSort, "Insertion Sort básico");
performanceTest(
  randomArray,
  insertionSortOptimized,
  "Insertion Sort optimizado"
);

// Peor caso: arreglo en orden inverso
const reversedArray = Array.from({ length: 1000 }, (_, i) => 1000 - i);
console.log("\n🔴 Peor caso (arreglo en orden inverso):");
performanceTest(reversedArray, insertionSort, "Insertion Sort básico");
performanceTest(
  reversedArray,
  insertionSortOptimized,
  "Insertion Sort optimizado"
);

// Ejemplo 10: Demostración de estabilidad
console.log("\n📝 Ejemplo 10: Demostración de estabilidad");
const objetosConNumeros = [
  { valor: 3, letra: "a" },
  { valor: 1, letra: "b" },
  { valor: 3, letra: "c" },
  { valor: 2, letra: "d" },
];

console.log(
  "Objetos originales:",
  objetosConNumeros.map((obj) => `${obj.valor}${obj.letra}`).join(", ")
);

// Ordenar por valor manteniendo el orden relativo de elementos iguales
const objetosOrdenados = [...objetosConNumeros];
for (let i = 1; i < objetosOrdenados.length; i++) {
  let key = objetosOrdenados[i];
  let j = i - 1;

  while (j >= 0 && objetosOrdenados[j].valor > key.valor) {
    objetosOrdenados[j + 1] = objetosOrdenados[j];
    j = j - 1;
  }

  objetosOrdenados[j + 1] = key;
}

console.log(
  "Objetos ordenados:",
  objetosOrdenados.map((obj) => `${obj.valor}${obj.letra}`).join(", ")
);
console.log(
  "✅ El orden relativo de elementos con el mismo valor se mantiene (3a antes que 3c)"
);

// Exportar funciones para usar en otros módulos
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    insertionSort,
    insertionSortOptimized,
    insertionSortBinary,
    insertionSortWithVisualization,
    insertionSortStrings,
    performanceTest,
  };
}
