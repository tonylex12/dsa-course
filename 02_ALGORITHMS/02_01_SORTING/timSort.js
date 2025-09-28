/**
 * ALGORITMO TIMSORT - IMPLEMENTACIÓN EDUCATIVA
 *
 * Timsort es un algoritmo híbrido estable que combina Merge Sort e Insertion Sort.
 * Fue desarrollado por Tim Peters para Python en 2002 y ahora es usado por
 * JavaScript (V8), Python, y Java para sus funciones de ordenamiento nativas.
 *
 * Características principales:
 * - Estable (preserva el orden relativo de elementos iguales)
 * - Adaptativo (optimiza automáticamente según los datos)
 * - Híbrido (combina múltiples algoritmos)
 * - Detección de patrones (encuentra secuencias ordenadas naturalmente)
 *
 * Complejidad temporal:
 * - Mejor caso: O(n) cuando los datos están ordenados o casi ordenados
 * - Caso promedio: O(n log n)
 * - Peor caso: O(n log n) garantizado
 *
 * Complejidad espacial: O(n) para el merge
 *
 * NOTA: Esta es una implementación educativa simplificada.
 * La implementación real en V8 tiene muchas más optimizaciones.
 */

/**
 * Configuración de Timsort
 */
const MIN_MERGE = 32; // Tamaño mínimo para hacer merge

/**
 * Insertion Sort optimizado para Timsort
 * Se usa para subarrays pequeños (< MIN_MERGE)
 * @param {Array} arr - Arreglo a ordenar
 * @param {number} left - Índice izquierdo
 * @param {number} right - Índice derecho
 * @param {Function} compare - Función de comparación
 */
function insertionSort(arr, left, right, compare) {
  for (let i = left + 1; i <= right; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= left && compare(arr[j], key) > 0) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = key;
  }
}

/**
 * Calcula el tamaño mínimo de run basado en el tamaño del arreglo
 * @param {number} n - Tamaño del arreglo
 * @returns {number} - Tamaño mínimo de run
 */
function getMinRunLength(n) {
  let r = 0;
  while (n >= MIN_MERGE) {
    r |= n & 1;
    n >>= 1;
  }
  return n + r;
}

/**
 * Encuentra un run (secuencia ordenada) desde el índice dado
 * @param {Array} arr - Arreglo
 * @param {number} start - Índice de inicio
 * @param {number} end - Índice final
 * @param {Function} compare - Función de comparación
 * @returns {Object} - {length: longitud del run, descending: si está en orden descendente}
 */
function findRun(arr, start, end, compare) {
  if (start === end) {
    return { length: 1, descending: false };
  }

  let runLength = 1;
  let descending = false;

  // Verificar si el run está en orden ascendente o descendente
  if (compare(arr[start], arr[start + 1]) <= 0) {
    // Orden ascendente (o igual)
    while (
      start + runLength < end &&
      compare(arr[start + runLength], arr[start + runLength + 1]) <= 0
    ) {
      runLength++;
    }
  } else {
    // Orden descendente
    descending = true;
    while (
      start + runLength < end &&
      compare(arr[start + runLength], arr[start + runLength + 1]) > 0
    ) {
      runLength++;
    }
  }

  return { length: runLength + 1, descending };
}

/**
 * Invierte un subarreglo (usado cuando se encuentra un run descendente)
 * @param {Array} arr - Arreglo
 * @param {number} start - Índice de inicio
 * @param {number} end - Índice final
 */
function reverseRange(arr, start, end) {
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++;
    end--;
  }
}

/**
 * Extiende un run hasta el tamaño mínimo usando insertion sort
 * @param {Array} arr - Arreglo
 * @param {number} start - Índice de inicio del run
 * @param {number} runLength - Longitud actual del run
 * @param {number} minRunLength - Longitud mínima requerida
 * @param {Function} compare - Función de comparación
 */
function extendRun(arr, start, runLength, minRunLength, compare) {
  const endIndex = Math.min(start + minRunLength - 1, arr.length - 1);
  insertionSort(arr, start + runLength - 1, endIndex, compare);
}

/**
 * Merge dos runs adyacentes
 * @param {Array} arr - Arreglo
 * @param {number} start1 - Inicio del primer run
 * @param {number} end1 - Final del primer run
 * @param {number} end2 - Final del segundo run
 * @param {Function} compare - Función de comparación
 */
function mergeRuns(arr, start1, end1, end2, compare) {
  // Crear copias temporales de los runs
  const left = arr.slice(start1, end1 + 1);
  const right = arr.slice(end1 + 1, end2 + 1);

  let i = 0,
    j = 0,
    k = start1;

  // Merge principal
  while (i < left.length && j < right.length) {
    if (compare(left[i], right[j]) <= 0) {
      arr[k] = left[i];
      i++;
    } else {
      arr[k] = right[j];
      j++;
    }
    k++;
  }

  // Copiar elementos restantes
  while (i < left.length) {
    arr[k] = left[i];
    i++;
    k++;
  }

  while (j < right.length) {
    arr[k] = right[j];
    j++;
    k++;
  }
}

/**
 * Implementación principal de Timsort
 * @param {Array} arr - Arreglo a ordenar
 * @param {Function} compare - Función de comparación opcional
 * @returns {Array} - Arreglo ordenado
 */
function timSort(
  arr,
  compare = (a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }
) {
  // Crear una copia para no modificar el arreglo original
  const sortedArray = [...arr];
  const n = sortedArray.length;

  if (n < 2) {
    return sortedArray;
  }

  // Para arreglos pequeños, usar insertion sort directamente
  if (n < MIN_MERGE) {
    insertionSort(sortedArray, 0, n - 1, compare);
    return sortedArray;
  }

  const minRunLength = getMinRunLength(n);
  const runStack = []; // Stack para almacenar información de runs

  let i = 0;

  // Fase 1: Encontrar y procesar runs
  while (i < n) {
    // Encontrar el próximo run
    const runInfo = findRun(sortedArray, i, n - 1, compare);
    let runLength = runInfo.length;

    // Si el run está en orden descendente, invertirlo
    if (runInfo.descending) {
      reverseRange(sortedArray, i, i + runLength - 1);
    }

    // Si el run es muy pequeño, extenderlo usando insertion sort
    if (runLength < minRunLength) {
      const extendTo = Math.min(minRunLength, n - i);
      insertionSort(sortedArray, i, i + extendTo - 1, compare);
      runLength = extendTo;
    }

    // Agregar el run al stack
    runStack.push({ start: i, length: runLength });

    // Intentar hacer merges según las reglas de Timsort
    mergeCollapse(sortedArray, runStack, compare);

    i += runLength;
  }

  // Fase 2: Merge final de todos los runs restantes
  mergeForceCollapse(sortedArray, runStack, compare);

  return sortedArray;
}

/**
 * Implementa las reglas de merge de Timsort para mantener balance
 * @param {Array} arr - Arreglo
 * @param {Array} runStack - Stack de runs
 * @param {Function} compare - Función de comparación
 */
function mergeCollapse(arr, runStack, compare) {
  while (runStack.length > 1) {
    let n = runStack.length - 2;

    // Reglas de Timsort para hacer merge
    if (
      (n > 0 &&
        runStack[n - 1].length <=
          runStack[n].length + runStack[n + 1].length) ||
      (n > 1 &&
        runStack[n - 2].length <= runStack[n - 1].length + runStack[n].length)
    ) {
      // Decidir cuál par hacer merge
      if (n > 0 && runStack[n - 1].length < runStack[n + 1].length) {
        n--;
      }

      mergeAt(arr, runStack, n, compare);
    } else if (runStack[n].length <= runStack[n + 1].length) {
      mergeAt(arr, runStack, n, compare);
    } else {
      break;
    }
  }
}

/**
 * Fuerza el merge de todos los runs restantes
 * @param {Array} arr - Arreglo
 * @param {Array} runStack - Stack de runs
 * @param {Function} compare - Función de comparación
 */
function mergeForceCollapse(arr, runStack, compare) {
  while (runStack.length > 1) {
    let n = runStack.length - 2;

    if (n > 0 && runStack[n - 1].length < runStack[n + 1].length) {
      n--;
    }

    mergeAt(arr, runStack, n, compare);
  }
}

/**
 * Hace merge de dos runs consecutivos en el stack
 * @param {Array} arr - Arreglo
 * @param {Array} runStack - Stack de runs
 * @param {number} i - Índice del primer run a hacer merge
 * @param {Function} compare - Función de comparación
 */
function mergeAt(arr, runStack, i, compare) {
  const run1 = runStack[i];
  const run2 = runStack[i + 1];

  // Hacer merge de los dos runs
  mergeRuns(
    arr,
    run1.start,
    run1.start + run1.length - 1,
    run1.start + run1.length + run2.length - 1,
    compare
  );

  // Actualizar el stack: combinar los dos runs en uno
  runStack[i] = { start: run1.start, length: run1.length + run2.length };
  runStack.splice(i + 1, 1);
}

/**
 * Timsort con visualización paso a paso
 * @param {Array} arr - Arreglo a ordenar
 * @param {Function} compare - Función de comparación
 * @returns {Array} - Arreglo ordenado
 */
function timSortWithVisualization(
  arr,
  compare = (a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }
) {
  console.log("🔥 Timsort - Visualización paso a paso");
  console.log("Arreglo original:", arr);
  console.log("─".repeat(80));

  const sortedArray = [...arr];
  const n = sortedArray.length;

  if (n < 2) {
    console.log("Arreglo muy pequeño, no necesita ordenamiento");
    return sortedArray;
  }

  const minRunLength = getMinRunLength(n);
  console.log(
    `📏 Tamaño mínimo de run calculado: ${minRunLength} (para n=${n})`
  );

  if (n < MIN_MERGE) {
    console.log(
      `🔸 Arreglo pequeño (< ${MIN_MERGE}), usando Insertion Sort directamente`
    );
    insertionSort(sortedArray, 0, n - 1, compare);
    console.log(`✅ Resultado: [${sortedArray.join(", ")}]`);
    return sortedArray;
  }

  const runStack = [];
  let i = 0;
  let runNumber = 1;

  console.log("\n🔍 FASE 1: Detección y procesamiento de runs");

  while (i < n) {
    console.log(`\n🔸 Buscando run #${runNumber} desde posición ${i}:`);

    const runInfo = findRun(sortedArray, i, n - 1, compare);
    let runLength = runInfo.length;

    console.log(
      `   Run encontrado: [${sortedArray.slice(i, i + runLength).join(", ")}]`
    );
    console.log(
      `   Longitud: ${runLength}, Descendente: ${runInfo.descending}`
    );

    if (runInfo.descending) {
      console.log(`   🔄 Invirtiendo run descendente...`);
      reverseRange(sortedArray, i, i + runLength - 1);
      console.log(
        `   Después de invertir: [${sortedArray
          .slice(i, i + runLength)
          .join(", ")}]`
      );
    }

    if (runLength < minRunLength) {
      const extendTo = Math.min(minRunLength, n - i);
      console.log(
        `   📈 Run muy pequeño (${runLength} < ${minRunLength}), extendiendo a ${extendTo}`
      );
      console.log(
        `   Aplicando Insertion Sort en rango [${i}, ${i + extendTo - 1}]`
      );
      insertionSort(sortedArray, i, i + extendTo - 1, compare);
      runLength = extendTo;
      console.log(
        `   Run extendido: [${sortedArray.slice(i, i + runLength).join(", ")}]`
      );
    }

    runStack.push({ start: i, length: runLength });
    console.log(
      `   ✅ Run #${runNumber} agregado al stack: inicio=${i}, longitud=${runLength}`
    );

    console.log(
      `\n   📊 Stack actual: ${runStack
        .map((r, idx) => `Run${idx + 1}(${r.start}:${r.length})`)
        .join(", ")}`
    );

    // Verificar si necesitamos hacer merges
    if (runStack.length > 1) {
      console.log(`   🔍 Verificando reglas de merge...`);
      const beforeMerge = runStack.length;
      mergeCollapse(sortedArray, runStack, compare);

      if (runStack.length < beforeMerge) {
        console.log(`   🔗 Merge realizado! Runs en stack: ${runStack.length}`);
        console.log(`   Estado actual: [${sortedArray.join(", ")}]`);
      } else {
        console.log(`   ⏸️  No es necesario hacer merge por ahora`);
      }
    }

    i += runLength;
    runNumber++;
  }

  console.log("\n🔗 FASE 2: Merge final de runs restantes");
  console.log(`Runs restantes en stack: ${runStack.length}`);

  let mergeCount = 1;
  while (runStack.length > 1) {
    console.log(`\n🔸 Merge final #${mergeCount}:`);
    console.log(
      `   Runs antes del merge: ${runStack
        .map((r, idx) => `Run${idx + 1}(longitud=${r.length})`)
        .join(", ")}`
    );

    mergeForceCollapse(sortedArray, runStack, compare);
    mergeCount++;

    console.log(
      `   ✅ Estado después del merge: [${sortedArray.slice(0, 20).join(", ")}${
        sortedArray.length > 20 ? "..." : ""
      }]`
    );
  }

  console.log("─".repeat(80));
  console.log(`🎉 Timsort completado!`);
  console.log(`📊 Estadísticas:`);
  console.log(`   • Runs detectados: ${runNumber - 1}`);
  console.log(`   • Tamaño mínimo de run: ${minRunLength}`);
  console.log(`   • Arreglo final: [${sortedArray.join(", ")}]`);

  return sortedArray;
}

/**
 * Función para comparar rendimiento con otros algoritmos
 * @param {Array} arr - Arreglo a probar
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

console.log("🚀 EJEMPLOS DEL ALGORITMO TIMSORT\n");

// Ejemplo 1: Uso básico
console.log("📝 Ejemplo 1: Timsort básico");
const numbers1 = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", numbers1);
console.log("Ordenado:", timSort(numbers1));
console.log();

// Ejemplo 2: Datos con runs naturales (el punto fuerte de Timsort)
console.log("📝 Ejemplo 2: Datos con runs naturales");
const withRuns = [1, 3, 5, 7, 2, 4, 6, 8, 9, 10, 15, 20];
console.log("Original (tiene runs naturales):", withRuns);
console.log("Ordenado:", timSort(withRuns));
console.log();

// Ejemplo 3: Datos casi ordenados (mejor caso)
console.log("📝 Ejemplo 3: Datos casi ordenados (mejor caso de Timsort)");
const almostSorted = [1, 2, 3, 5, 4, 6, 7, 8, 9, 10];
console.log("Original:", almostSorted);
console.log("Ordenado:", timSort(almostSorted));
console.log();

// Ejemplo 4: Datos en orden inverso
console.log("📝 Ejemplo 4: Datos en orden inverso");
const reversed = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
console.log("Original:", reversed);
console.log("Ordenado:", timSort(reversed));
console.log();

// Ejemplo 5: Ordenamiento de objetos (estabilidad)
console.log("📝 Ejemplo 5: Ordenamiento estable de objetos");
const people = [
  { name: "Ana", age: 25 },
  { name: "Juan", age: 25 },
  { name: "María", age: 30 },
  { name: "Pedro", age: 25 },
  { name: "Sofía", age: 30 },
];

console.log("Personas originales:");
people.forEach((p) => console.log(`  ${p.name}: ${p.age} años`));

const sortedPeople = timSort(people, (a, b) => a.age - b.age);
console.log(
  "\nOrdenadas por edad (estable - orden original preservado para misma edad):"
);
sortedPeople.forEach((p) => console.log(`  ${p.name}: ${p.age} años`));
console.log();

// Ejemplo 6: Visualización detallada
console.log("📝 Ejemplo 6: Visualización paso a paso");
const visualArray = [3, 7, 9, 1, 4, 6, 8, 2, 5];
timSortWithVisualization(visualArray);
console.log();

// Ejemplo 7: Comparación de strings
console.log("📝 Ejemplo 7: Ordenamiento de strings");
const words = ["banana", "apple", "cherry", "date", "elderberry", "apricot"];
console.log("Palabras originales:", words);
console.log("Ordenadas:", timSort(words));
console.log();

// Ejemplo 8: Comportamiento adaptativo
console.log("📝 Ejemplo 8: Comportamiento adaptativo de Timsort");

const testCases = [
  {
    name: "Datos completamente ordenados",
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    name: "Datos con múltiples runs",
    data: [1, 3, 5, 2, 4, 6, 7, 9, 8, 10],
  },
  {
    name: "Datos completamente aleatorios",
    data: [7, 2, 9, 1, 5, 8, 3, 6, 4, 10],
  },
  {
    name: "Datos en orden inverso",
    data: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
  },
];

testCases.forEach((testCase) => {
  console.log(`\n🔸 ${testCase.name}:`);
  console.log(`   Original: [${testCase.data.join(", ")}]`);

  const start = performance.now();
  const result = timSort(testCase.data);
  const end = performance.now();

  console.log(`   Ordenado: [${result.join(", ")}]`);
  console.log(`   Tiempo: ${(end - start).toFixed(4)}ms`);
});

// Ejemplo 9: Análisis de rendimiento vs otros algoritmos
console.log("\n📝 Ejemplo 9: Comparación de rendimiento");

// Importar otros algoritmos implementados (simulado)
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter((x) => x < pivot);
  const middle = arr.filter((x) => x === pivot);
  const right = arr.filter((x) => x > pivot);
  return [...quickSort(left), ...middle, ...quickSort(right)];
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  const result = [];
  let i = 0,
    j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

const performanceTests = [
  {
    name: "Datos ordenados (1000 elementos)",
    data: Array.from({ length: 1000 }, (_, i) => i + 1),
  },
  {
    name: "Datos aleatorios (1000 elementos)",
    data: Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000)),
  },
  {
    name: "Datos con runs (1000 elementos)",
    data: [
      ...Array.from({ length: 250 }, (_, i) => i + 1),
      ...Array.from({ length: 250 }, (_, i) => i + 501),
      ...Array.from({ length: 250 }, (_, i) => i + 251),
      ...Array.from({ length: 250 }, (_, i) => i + 751),
    ],
  },
];

performanceTests.forEach((test) => {
  console.log(`\n🔸 ${test.name}:`);
  performanceTest(test.data, timSort, "Timsort");
  performanceTest(test.data, quickSort, "Quick Sort");
  performanceTest(test.data, mergeSort, "Merge Sort");
  performanceTest(test.data, (arr) => [...arr].sort(), "JavaScript nativo");
});

// Ejemplo 10: Ventajas únicas de Timsort
console.log("\n📝 Ejemplo 10: Ventajas únicas de Timsort");
console.log("✅ Ventajas de Timsort:");
console.log("   • Estable: preserva orden de elementos iguales");
console.log(
  "   • Adaptativo: O(n) para datos ordenados, O(n log n) para aleatorios"
);
console.log("   • Híbrido: combina lo mejor de Merge Sort e Insertion Sort");
console.log(
  "   • Detección inteligente: encuentra y aprovecha patrones automáticamente"
);
console.log(
  "   • Optimizado: usado en JavaScript, Python, Java por su eficiencia"
);
console.log("\n🎯 Cuándo usar Timsort:");
console.log(
  "   • Datos que pueden tener patrones o estar parcialmente ordenados"
);
console.log("   • Cuando necesitas estabilidad garantizada");
console.log(
  "   • Para uso general (es el algoritmo por defecto en muchos lenguajes)"
);
console.log("   • Cuando quieres rendimiento consistente sin sorpresas");

// Exportar funciones para usar en otros módulos
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    timSort,
    timSortWithVisualization,
    insertionSort,
    getMinRunLength,
    findRun,
    performanceTest,
  };
}
