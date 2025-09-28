/**
 * ALGORITMO DE ORDENAMIENTO POR MEZCLA (MERGE SORT)
 *
 * Merge Sort es un algoritmo de ordenamiento basado en la técnica "divide y vencerás".
 * Divide el arreglo en dos mitades, las ordena recursivamente y luego las combina
 * de manera ordenada.
 *
 * Funcionamiento:
 * 1. Dividir: Divide el arreglo por la mitad hasta tener elementos individuales
 * 2. Conquistar: Ordena recursivamente cada mitad
 * 3. Combinar: Mezcla las dos mitades ordenadas en un solo arreglo ordenado
 *
 * Complejidad temporal:
 * - Mejor caso: O(n log n)
 * - Caso promedio: O(n log n)
 * - Peor caso: O(n log n)
 *
 * Complejidad espacial: O(n) - requiere espacio adicional para la mezcla
 *
 * Ventajas:
 * - Complejidad temporal consistente O(n log n) en todos los casos
 * - Estable (mantiene el orden relativo de elementos iguales)
 * - Predecible en rendimiento
 * - Excelente para arreglos grandes
 * - Paralelizable
 *
 * Desventajas:
 * - Requiere O(n) espacio adicional
 * - Más complejo que algoritmos simples
 * - No es in-place
 */

/**
 * Función para mezclar dos subarreglos ordenados
 * @param {number[]} arr - Arreglo completo
 * @param {number} left - Índice izquierdo
 * @param {number} mid - Índice medio
 * @param {number} right - Índice derecho
 * @returns {void} - Modifica el arreglo in-place
 */
function merge(arr, left, mid, right) {
  // Calcular tamaños de los subarreglos
  const n1 = mid - left + 1;
  const n2 = right - mid;

  // Crear arreglos temporales
  const leftArray = new Array(n1);
  const rightArray = new Array(n2);

  // Copiar datos a los arreglos temporales
  for (let i = 0; i < n1; i++) {
    leftArray[i] = arr[left + i];
  }
  for (let j = 0; j < n2; j++) {
    rightArray[j] = arr[mid + 1 + j];
  }

  // Mezclar los arreglos temporales de vuelta al arreglo original
  let i = 0; // Índice inicial del primer subarreglo
  let j = 0; // Índice inicial del segundo subarreglo
  let k = left; // Índice inicial del subarreglo mezclado

  while (i < n1 && j < n2) {
    if (leftArray[i] <= rightArray[j]) {
      arr[k] = leftArray[i];
      i++;
    } else {
      arr[k] = rightArray[j];
      j++;
    }
    k++;
  }

  // Copiar los elementos restantes de leftArray, si los hay
  while (i < n1) {
    arr[k] = leftArray[i];
    i++;
    k++;
  }

  // Copiar los elementos restantes de rightArray, si los hay
  while (j < n2) {
    arr[k] = rightArray[j];
    j++;
    k++;
  }
}

/**
 * Función principal de Merge Sort (recursiva)
 * @param {number[]} arr - Arreglo a ordenar
 * @param {number} left - Índice izquierdo
 * @param {number} right - Índice derecho
 * @returns {void} - Modifica el arreglo in-place
 */
function mergeSortHelper(arr, left, right) {
  if (left >= right) {
    return; // Caso base: un elemento o arreglo vacío ya está ordenado
  }

  // Encontrar el punto medio
  const mid = Math.floor(left + (right - left) / 2);

  // Ordenar recursivamente la primera y segunda mitad
  mergeSortHelper(arr, left, mid);
  mergeSortHelper(arr, mid + 1, right);

  // Mezclar las mitades ordenadas
  merge(arr, left, mid, right);
}

/**
 * Implementación principal de Merge Sort
 * @param {number[]} arr - Arreglo a ordenar
 * @returns {number[]} - Arreglo ordenado
 */
function mergeSort(arr) {
  // Crear una copia para no modificar el arreglo original
  const sortedArray = [...arr];

  if (sortedArray.length <= 1) {
    return sortedArray;
  }

  mergeSortHelper(sortedArray, 0, sortedArray.length - 1);
  return sortedArray;
}

/**
 * Merge Sort iterativo (sin recursión)
 * @param {number[]} arr - Arreglo a ordenar
 * @returns {number[]} - Arreglo ordenado
 */
function mergeSortIterative(arr) {
  const sortedArray = [...arr];
  const n = sortedArray.length;

  // Empezar con subarreglos de tamaño 1, luego 2, 4, 8, etc.
  for (let currentSize = 1; currentSize < n; currentSize = currentSize * 2) {
    // Elegir el punto de inicio del subarreglo izquierdo
    for (let leftStart = 0; leftStart < n - 1; leftStart += 2 * currentSize) {
      // Calcular el punto medio y el final
      const mid = Math.min(leftStart + currentSize - 1, n - 1);
      const rightEnd = Math.min(leftStart + 2 * currentSize - 1, n - 1);

      // Mezclar subarreglos solo si mid es menor que rightEnd
      if (mid < rightEnd) {
        merge(sortedArray, leftStart, mid, rightEnd);
      }
    }
  }

  return sortedArray;
}

/**
 * Merge Sort con visualización paso a paso
 * @param {number[]} arr - Arreglo a ordenar
 * @returns {number[]} - Arreglo ordenado
 */
function mergeSortWithVisualization(arr) {
  console.log("🔵 Merge Sort - Visualización paso a paso");
  console.log("Arreglo original:", arr);
  console.log("─".repeat(80));

  const sortedArray = [...arr];
  let level = 0;
  let mergeCount = 0;

  function visualMerge(arr, left, mid, right, level) {
    const indent = "  ".repeat(level);
    console.log(
      `${indent}🔀 Mezclando: [${arr.slice(left, mid + 1).join(", ")}] + [${arr
        .slice(mid + 1, right + 1)
        .join(", ")}]`
    );

    // Realizar la mezcla normal
    merge(arr, left, mid, right);
    mergeCount++;

    console.log(
      `${indent}✅ Resultado: [${arr.slice(left, right + 1).join(", ")}]`
    );
  }

  function visualMergeSortHelper(arr, left, right, currentLevel) {
    if (left >= right) {
      return;
    }

    const indent = "  ".repeat(currentLevel);
    console.log(
      `${indent}📦 Dividiendo: [${arr.slice(left, right + 1).join(", ")}]`
    );

    const mid = Math.floor(left + (right - left) / 2);

    // Procesar recursivamente
    visualMergeSortHelper(arr, left, mid, currentLevel + 1);
    visualMergeSortHelper(arr, mid + 1, right, currentLevel + 1);

    // Mezclar con visualización
    visualMerge(arr, left, mid, right, currentLevel);
  }

  if (sortedArray.length <= 1) {
    console.log("Arreglo ya tiene 0 o 1 elemento, no necesita ordenamiento");
    return sortedArray;
  }

  visualMergeSortHelper(sortedArray, 0, sortedArray.length - 1, 0);

  console.log("─".repeat(80));
  console.log(`🎉 Arreglo final ordenado: [${sortedArray.join(", ")}]`);
  console.log(`📊 Estadísticas:`);
  console.log(`   • Total de mezclas realizadas: ${mergeCount}`);
  console.log(`   • Niveles de recursión: ${Math.ceil(Math.log2(arr.length))}`);
  console.log(
    `   • Complejidad temporal: O(${arr.length} * log₂(${
      arr.length
    })) = O(${Math.ceil(arr.length * Math.log2(arr.length))})`
  );

  return sortedArray;
}

/**
 * Merge Sort para ordenar objetos por una propiedad específica
 * @param {Object[]} arr - Arreglo de objetos
 * @param {string} property - Propiedad por la cual ordenar
 * @returns {Object[]} - Arreglo ordenado
 */
function mergeSortObjects(arr, property) {
  function mergeObjects(arr, left, mid, right, prop) {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    const leftArray = arr.slice(left, mid + 1);
    const rightArray = arr.slice(mid + 1, right + 1);

    let i = 0,
      j = 0,
      k = left;

    while (i < n1 && j < n2) {
      if (leftArray[i][prop] <= rightArray[j][prop]) {
        arr[k] = leftArray[i];
        i++;
      } else {
        arr[k] = rightArray[j];
        j++;
      }
      k++;
    }

    while (i < n1) {
      arr[k] = leftArray[i];
      i++;
      k++;
    }

    while (j < n2) {
      arr[k] = rightArray[j];
      j++;
      k++;
    }
  }

  function mergeSortObjectsHelper(arr, left, right, prop) {
    if (left >= right) return;

    const mid = Math.floor(left + (right - left) / 2);
    mergeSortObjectsHelper(arr, left, mid, prop);
    mergeSortObjectsHelper(arr, mid + 1, right, prop);
    mergeObjects(arr, left, mid, right, prop);
  }

  const sortedArray = [...arr];
  if (sortedArray.length <= 1) return sortedArray;

  mergeSortObjectsHelper(sortedArray, 0, sortedArray.length - 1, property);
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

console.log("🚀 EJEMPLOS DEL ALGORITMO MERGE SORT\n");

// Ejemplo 1: Uso básico
console.log("📝 Ejemplo 1: Merge Sort básico");
const numbers1 = [38, 27, 43, 3, 9, 82, 10];
console.log("Original:", numbers1);
console.log("Ordenado:", mergeSort(numbers1));
console.log();

// Ejemplo 2: Arreglo ya ordenado
console.log("📝 Ejemplo 2: Arreglo ya ordenado");
const numbers2 = [1, 2, 3, 4, 5, 6];
console.log("Original:", numbers2);
console.log("Ordenado:", mergeSort(numbers2));
console.log();

// Ejemplo 3: Arreglo en orden inverso
console.log("📝 Ejemplo 3: Arreglo en orden inverso");
const numbers3 = [6, 5, 4, 3, 2, 1];
console.log("Original:", numbers3);
console.log("Ordenado:", mergeSort(numbers3));
console.log();

// Ejemplo 4: Arreglo con duplicados
console.log("📝 Ejemplo 4: Arreglo con valores duplicados");
const numbers4 = [4, 2, 7, 4, 1, 7, 2, 9, 1];
console.log("Original:", numbers4);
console.log("Ordenado:", mergeSort(numbers4));
console.log();

// Ejemplo 5: Casos límite
console.log("📝 Ejemplo 5: Casos límite");
console.log("Un elemento [42]:", mergeSort([42]));
console.log("Arreglo vacío []:", mergeSort([]));
console.log("Dos elementos [9, 3]:", mergeSort([9, 3]));
console.log();

// Ejemplo 6: Visualización paso a paso
console.log("📝 Ejemplo 6: Visualización detallada");
const visualArray = [64, 34, 25, 12, 22, 11, 90];
mergeSortWithVisualization(visualArray);
console.log();

// Ejemplo 7: Comparación entre versiones
console.log("📝 Ejemplo 7: Comparación entre versiones");
const testArray = [8, 3, 5, 4, 7, 6, 1, 2];
console.log("Arreglo de prueba:", testArray);
console.log("Merge Sort recursivo:", mergeSort(testArray));
console.log("Merge Sort iterativo:", mergeSortIterative(testArray));
console.log();

// Ejemplo 8: Ordenamiento de objetos
console.log("📝 Ejemplo 8: Ordenamiento de objetos");
const estudiantes = [
  { nombre: "Ana", edad: 23, nota: 85 },
  { nombre: "Carlos", edad: 21, nota: 92 },
  { nombre: "María", edad: 22, nota: 78 },
  { nombre: "Juan", edad: 24, nota: 88 },
];

console.log("Estudiantes originales:");
estudiantes.forEach((e) =>
  console.log(`  ${e.nombre}: ${e.edad} años, nota ${e.nota}`)
);

console.log("\nOrdenados por edad:");
const porEdad = mergeSortObjects(estudiantes, "edad");
porEdad.forEach((e) =>
  console.log(`  ${e.nombre}: ${e.edad} años, nota ${e.nota}`)
);

console.log("\nOrdenados por nota:");
const porNota = mergeSortObjects(estudiantes, "nota");
porNota.forEach((e) =>
  console.log(`  ${e.nombre}: ${e.edad} años, nota ${e.nota}`)
);
console.log();

// Ejemplo 9: Análisis de rendimiento
console.log("📝 Ejemplo 9: Análisis de rendimiento");
console.log("Comparando Merge Sort en diferentes escenarios:");

// Mejor caso: arreglo ordenado
const sortedArray = Array.from({ length: 10000 }, (_, i) => i + 1);
console.log("\n🟢 Arreglo ordenado (10,000 elementos):");
performanceTest(sortedArray, mergeSort, "Merge Sort recursivo");
performanceTest(sortedArray, mergeSortIterative, "Merge Sort iterativo");

// Caso promedio: arreglo aleatorio
const randomArray = Array.from({ length: 10000 }, () =>
  Math.floor(Math.random() * 10000)
);
console.log("\n🟡 Arreglo aleatorio (10,000 elementos):");
performanceTest(randomArray, mergeSort, "Merge Sort recursivo");
performanceTest(randomArray, mergeSortIterative, "Merge Sort iterativo");

// Peor caso: arreglo en orden inverso
const reversedArray = Array.from({ length: 10000 }, (_, i) => 10000 - i);
console.log("\n🔴 Arreglo en orden inverso (10,000 elementos):");
performanceTest(reversedArray, mergeSort, "Merge Sort recursivo");
performanceTest(reversedArray, mergeSortIterative, "Merge Sort iterativo");

// Ejemplo 10: Demostración de estabilidad
console.log("\n📝 Ejemplo 10: Demostración de estabilidad");
const objetosConNumeros = [
  { valor: 3, letra: "a" },
  { valor: 1, letra: "b" },
  { valor: 3, letra: "c" },
  { valor: 2, letra: "d" },
  { valor: 3, letra: "e" },
];

console.log(
  "Objetos originales:",
  objetosConNumeros.map((obj) => `${obj.valor}${obj.letra}`).join(", ")
);

const objetosOrdenados = mergeSortObjects(objetosConNumeros, "valor");
console.log(
  "Objetos ordenados:",
  objetosOrdenados.map((obj) => `${obj.valor}${obj.letra}`).join(", ")
);
console.log(
  "✅ El orden relativo de elementos con el mismo valor se mantiene (3a → 3c → 3e)"
);

// Ejemplo 11: Comparación de eficiencia por tamaño
console.log("\n📝 Ejemplo 11: Escalabilidad por tamaño");
const sizes = [100, 1000, 5000];
sizes.forEach((size) => {
  const arr = Array.from({ length: size }, () =>
    Math.floor(Math.random() * size)
  );
  console.log(`\nTamaño ${size}:`);
  performanceTest(arr, mergeSort, "Merge Sort");

  // Calcular complejidad teórica
  const theoretical = size * Math.log2(size);
  console.log(
    `  Complejidad teórica: ${size} * log₂(${size}) ≈ ${Math.ceil(
      theoretical
    )} operaciones`
  );
});

// Exportar funciones para usar en otros módulos
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    mergeSort,
    mergeSortIterative,
    mergeSortWithVisualization,
    mergeSortObjects,
    performanceTest,
  };
}
