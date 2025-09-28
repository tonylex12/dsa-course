/**
 * ALGORITMO DE ORDENAMIENTO RÁPIDO (QUICK SORT)
 *
 * Quick Sort es un algoritmo de ordenamiento eficiente basado en la técnica
 * "divide y vencerás" que utiliza un elemento pivote para particionar el arreglo.
 *
 * Funcionamiento:
 * 1. Elegir un elemento pivote del arreglo
 * 2. Particionar: reorganizar el arreglo de modo que elementos menores al pivote
 *    estén a la izquierda y mayores a la derecha
 * 3. Aplicar recursivamente Quick Sort a las dos particiones
 *
 * Complejidad temporal:
 * - Mejor caso: O(n log n) cuando la partición divide el arreglo a la mitad
 * - Caso promedio: O(n log n)
 * - Peor caso: O(n²) cuando el pivote es siempre el elemento más pequeño o más grande
 *
 * Complejidad espacial:
 * - O(log n) en promedio (stack de recursión)
 * - O(n) en el peor caso
 *
 * Ventajas:
 * - Muy eficiente en promedio O(n log n)
 * - In-place (no requiere memoria extra significativa)
 * - Más rápido que otros algoritmos O(n log n) en la práctica
 * - Buena localidad de cache
 *
 * Desventajas:
 * - Rendimiento O(n²) en el peor caso
 * - No es estable (puede cambiar el orden de elementos iguales)
 * - Rendimiento depende mucho de la elección del pivote
 */

/**
 * Función para particionar el arreglo usando el esquema de Lomuto
 * @param {number[]} arr - Arreglo a particionar
 * @param {number} low - Índice bajo
 * @param {number} high - Índice alto
 * @returns {number} - Índice del pivote después de la partición
 */
function partitionLomuto(arr, low, high) {
  // Elegir el último elemento como pivote
  const pivot = arr[high];
  let i = low - 1; // Índice del elemento más pequeño

  for (let j = low; j < high; j++) {
    // Si el elemento actual es menor o igual al pivote
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Intercambiar
    }
  }

  // Colocar el pivote en su posición correcta
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

/**
 * Función para particionar el arreglo usando el esquema de Hoare
 * @param {number[]} arr - Arreglo a particionar
 * @param {number} low - Índice bajo
 * @param {number} high - Índice alto
 * @returns {number} - Índice de partición
 */
function partitionHoare(arr, low, high) {
  // Elegir el primer elemento como pivote
  const pivot = arr[low];
  let i = low - 1;
  let j = high + 1;

  while (true) {
    // Encontrar elemento desde la izquierda que sea >= pivote
    do {
      i++;
    } while (arr[i] < pivot);

    // Encontrar elemento desde la derecha que sea <= pivote
    do {
      j--;
    } while (arr[j] > pivot);

    // Si los punteros se cruzan, la partición está completa
    if (i >= j) {
      return j;
    }

    // Intercambiar elementos
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/**
 * Función auxiliar recursiva para Quick Sort (Lomuto)
 * @param {number[]} arr - Arreglo a ordenar
 * @param {number} low - Índice bajo
 * @param {number} high - Índice alto
 */
function quickSortLomutoHelper(arr, low, high) {
  if (low < high) {
    // Particionar y obtener índice del pivote
    const pivotIndex = partitionLomuto(arr, low, high);

    // Recursivamente ordenar elementos antes y después del pivote
    quickSortLomutoHelper(arr, low, pivotIndex - 1);
    quickSortLomutoHelper(arr, pivotIndex + 1, high);
  }
}

/**
 * Función auxiliar recursiva para Quick Sort (Hoare)
 * @param {number[]} arr - Arreglo a ordenar
 * @param {number} low - Índice bajo
 * @param {number} high - Índice alto
 */
function quickSortHoareHelper(arr, low, high) {
  if (low < high) {
    // Particionar y obtener índice de partición
    const partitionIndex = partitionHoare(arr, low, high);

    // Recursivamente ordenar las dos particiones
    quickSortHoareHelper(arr, low, partitionIndex);
    quickSortHoareHelper(arr, partitionIndex + 1, high);
  }
}

/**
 * Quick Sort implementación principal (usando Lomuto)
 * @param {number[]} arr - Arreglo a ordenar
 * @returns {number[]} - Arreglo ordenado
 */
function quickSort(arr) {
  // Crear una copia para no modificar el arreglo original
  const sortedArray = [...arr];

  if (sortedArray.length <= 1) {
    return sortedArray;
  }

  quickSortLomutoHelper(sortedArray, 0, sortedArray.length - 1);
  return sortedArray;
}

/**
 * Quick Sort usando partición de Hoare
 * @param {number[]} arr - Arreglo a ordenar
 * @returns {number[]} - Arreglo ordenado
 */
function quickSortHoare(arr) {
  const sortedArray = [...arr];

  if (sortedArray.length <= 1) {
    return sortedArray;
  }

  quickSortHoareHelper(sortedArray, 0, sortedArray.length - 1);
  return sortedArray;
}

/**
 * Quick Sort con selección de pivote aleatorio
 * @param {number[]} arr - Arreglo a ordenar
 * @returns {number[]} - Arreglo ordenado
 */
function quickSortRandomPivot(arr) {
  function partitionRandom(arr, low, high) {
    // Elegir pivote aleatorio e intercambiarlo con el último
    const randomIndex = Math.floor(Math.random() * (high - low + 1)) + low;
    [arr[randomIndex], arr[high]] = [arr[high], arr[randomIndex]];

    // Usar partición de Lomuto normal
    return partitionLomuto(arr, low, high);
  }

  function quickSortRandomHelper(arr, low, high) {
    if (low < high) {
      const pivotIndex = partitionRandom(arr, low, high);
      quickSortRandomHelper(arr, low, pivotIndex - 1);
      quickSortRandomHelper(arr, pivotIndex + 1, high);
    }
  }

  const sortedArray = [...arr];
  if (sortedArray.length <= 1) return sortedArray;

  quickSortRandomHelper(sortedArray, 0, sortedArray.length - 1);
  return sortedArray;
}

/**
 * Quick Sort con visualización paso a paso
 * @param {number[]} arr - Arreglo a ordenar
 * @returns {number[]} - Arreglo ordenado
 */
function quickSortWithVisualization(arr) {
  console.log("🟡 Quick Sort - Visualización paso a paso");
  console.log("Arreglo original:", arr);
  console.log("─".repeat(80));

  const sortedArray = [...arr];
  let level = 0;
  let partitionCount = 0;
  let swapCount = 0;

  function visualPartition(arr, low, high, currentLevel) {
    const indent = "  ".repeat(currentLevel);
    const pivot = arr[high];
    console.log(
      `${indent}🎯 Particionando: [${arr
        .slice(low, high + 1)
        .join(", ")}] con pivote ${pivot}`
    );

    let i = low - 1;

    for (let j = low; j < high; j++) {
      console.log(`${indent}   Comparando ${arr[j]} con pivote ${pivot}`);
      if (arr[j] <= pivot) {
        i++;
        if (i !== j) {
          console.log(`${indent}   ✅ Intercambio: ${arr[i]} ↔ ${arr[j]}`);
          [arr[i], arr[j]] = [arr[j], arr[i]];
          swapCount++;
        } else {
          console.log(`${indent}   ✅ ${arr[j]} ya está en posición correcta`);
        }
      } else {
        console.log(`${indent}   ❌ ${arr[j]} > ${pivot}, no intercambiar`);
      }
    }

    // Colocar pivote en su posición final
    console.log(
      `${indent}   🔄 Colocando pivote ${pivot} en posición ${i + 1}`
    );
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    swapCount++;
    partitionCount++;

    console.log(
      `${indent}   Resultado: [${arr.slice(low, high + 1).join(", ")}]`
    );
    console.log(
      `${indent}   Menores: [${arr.slice(low, i + 1).join(", ")}] | Pivote: ${
        arr[i + 1]
      } | Mayores: [${arr.slice(i + 2, high + 1).join(", ")}]`
    );

    return i + 1;
  }

  function visualQuickSort(arr, low, high, currentLevel) {
    if (low < high) {
      const indent = "  ".repeat(currentLevel);
      console.log(
        `${indent}📦 Procesando subarray: [${arr
          .slice(low, high + 1)
          .join(", ")}]`
      );

      const pivotIndex = visualPartition(arr, low, high, currentLevel);

      console.log(`${indent}📋 Dividiendo en dos subarrays:`);
      if (low < pivotIndex - 1) {
        console.log(
          `${indent}   Izquierda: [${arr.slice(low, pivotIndex).join(", ")}]`
        );
      }
      if (pivotIndex + 1 < high) {
        console.log(
          `${indent}   Derecha: [${arr
            .slice(pivotIndex + 1, high + 1)
            .join(", ")}]`
        );
      }

      visualQuickSort(arr, low, pivotIndex - 1, currentLevel + 1);
      visualQuickSort(arr, pivotIndex + 1, high, currentLevel + 1);
    }
  }

  if (sortedArray.length <= 1) {
    console.log("Arreglo ya tiene 0 o 1 elemento, no necesita ordenamiento");
    return sortedArray;
  }

  visualQuickSort(sortedArray, 0, sortedArray.length - 1, 0);

  console.log("─".repeat(80));
  console.log(`🎉 Arreglo final ordenado: [${sortedArray.join(", ")}]`);
  console.log(`📊 Estadísticas:`);
  console.log(`   • Total de particiones: ${partitionCount}`);
  console.log(`   • Total de intercambios: ${swapCount}`);
  console.log(`   • Niveles de recursión: ${Math.ceil(Math.log2(arr.length))}`);

  return sortedArray;
}

/**
 * Quick Sort iterativo (sin recursión)
 * @param {number[]} arr - Arreglo a ordenar
 * @returns {number[]} - Arreglo ordenado
 */
function quickSortIterative(arr) {
  const sortedArray = [...arr];
  const stack = [];

  // Empujar índices iniciales a la pila
  stack.push(0);
  stack.push(sortedArray.length - 1);

  while (stack.length > 0) {
    // Sacar los índices
    const high = stack.pop();
    const low = stack.pop();

    if (low < high) {
      // Particionar y obtener índice del pivote
      const pivotIndex = partitionLomuto(sortedArray, low, high);

      // Empujar índices de los subarrays izquierdo y derecho
      stack.push(low);
      stack.push(pivotIndex - 1);

      stack.push(pivotIndex + 1);
      stack.push(high);
    }
  }

  return sortedArray;
}

/**
 * Quick Sort híbrido (cambia a Insertion Sort para arreglos pequeños)
 * @param {number[]} arr - Arreglo a ordenar
 * @param {number} threshold - Umbral para cambiar a Insertion Sort
 * @returns {number[]} - Arreglo ordenado
 */
function quickSortHybrid(arr, threshold = 10) {
  // Insertion Sort simple para arreglos pequeños
  function insertionSort(arr, low, high) {
    for (let i = low + 1; i <= high; i++) {
      let key = arr[i];
      let j = i - 1;

      while (j >= low && arr[j] > key) {
        arr[j + 1] = arr[j];
        j = j - 1;
      }

      arr[j + 1] = key;
    }
  }

  function hybridQuickSort(arr, low, high) {
    if (low < high) {
      // Si el subarreglo es pequeño, usar Insertion Sort
      if (high - low + 1 < threshold) {
        insertionSort(arr, low, high);
      } else {
        const pivotIndex = partitionLomuto(arr, low, high);
        hybridQuickSort(arr, low, pivotIndex - 1);
        hybridQuickSort(arr, pivotIndex + 1, high);
      }
    }
  }

  const sortedArray = [...arr];
  if (sortedArray.length <= 1) return sortedArray;

  hybridQuickSort(sortedArray, 0, sortedArray.length - 1);
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

console.log("🚀 EJEMPLOS DEL ALGORITMO QUICK SORT\n");

// Ejemplo 1: Uso básico
console.log("📝 Ejemplo 1: Quick Sort básico");
const numbers1 = [10, 7, 8, 9, 1, 5];
console.log("Original:", numbers1);
console.log("Ordenado:", quickSort(numbers1));
console.log();

// Ejemplo 2: Arreglo ya ordenado (peor caso)
console.log("📝 Ejemplo 2: Arreglo ya ordenado (potencial peor caso)");
const numbers2 = [1, 2, 3, 4, 5, 6];
console.log("Original:", numbers2);
console.log("Ordenado:", quickSort(numbers2));
console.log();

// Ejemplo 3: Arreglo en orden inverso (peor caso)
console.log("📝 Ejemplo 3: Arreglo en orden inverso (peor caso)");
const numbers3 = [6, 5, 4, 3, 2, 1];
console.log("Original:", numbers3);
console.log("Ordenado:", quickSort(numbers3));
console.log();

// Ejemplo 4: Arreglo con duplicados
console.log("📝 Ejemplo 4: Arreglo con valores duplicados");
const numbers4 = [4, 2, 7, 4, 1, 7, 2, 9, 1];
console.log("Original:", numbers4);
console.log("Ordenado:", quickSort(numbers4));
console.log();

// Ejemplo 5: Casos límite
console.log("📝 Ejemplo 5: Casos límite");
console.log("Un elemento [42]:", quickSort([42]));
console.log("Arreglo vacío []:", quickSort([]));
console.log("Dos elementos [9, 3]:", quickSort([9, 3]));
console.log();

// Ejemplo 6: Visualización paso a paso
console.log("📝 Ejemplo 6: Visualización detallada");
const visualArray = [64, 34, 25, 12, 22, 11, 90];
quickSortWithVisualization(visualArray);
console.log();

// Ejemplo 7: Comparación entre versiones
console.log("📝 Ejemplo 7: Comparación entre implementaciones");
const testArray = [8, 3, 5, 4, 7, 6, 1, 2];
console.log("Arreglo de prueba:", testArray);
console.log("Quick Sort Lomuto:", quickSort(testArray));
console.log("Quick Sort Hoare:", quickSortHoare(testArray));
console.log("Quick Sort Pivote Aleatorio:", quickSortRandomPivot(testArray));
console.log("Quick Sort Iterativo:", quickSortIterative(testArray));
console.log("Quick Sort Híbrido:", quickSortHybrid(testArray));
console.log();

// Ejemplo 8: Análisis de rendimiento
console.log("📝 Ejemplo 8: Análisis de rendimiento");
console.log("Comparando Quick Sort en diferentes escenarios:");

// Mejor caso: arreglo aleatorio
const randomArray = Array.from({ length: 10000 }, () =>
  Math.floor(Math.random() * 10000)
);
console.log("\n🟢 Arreglo aleatorio (mejor caso promedio - 10,000 elementos):");
performanceTest(randomArray, quickSort, "Quick Sort Lomuto");
performanceTest(randomArray, quickSortHoare, "Quick Sort Hoare");
performanceTest(
  randomArray,
  quickSortRandomPivot,
  "Quick Sort Pivote Aleatorio"
);
performanceTest(randomArray, quickSortIterative, "Quick Sort Iterativo");
performanceTest(randomArray, quickSortHybrid, "Quick Sort Híbrido");

// Caso promedio: arreglo parcialmente ordenado
const partiallyOrdered = Array.from({ length: 1000 }, (_, i) =>
  i < 500 ? i : Math.floor(Math.random() * 1000)
);
console.log("\n🟡 Arreglo parcialmente ordenado (1,000 elementos):");
performanceTest(partiallyOrdered, quickSort, "Quick Sort Lomuto");
performanceTest(
  partiallyOrdered,
  quickSortRandomPivot,
  "Quick Sort Pivote Aleatorio"
);

// Peor caso: arreglo ordenado (con pivote último elemento)
const sortedArray = Array.from({ length: 1000 }, (_, i) => i + 1);
console.log("\n🔴 Arreglo ordenado - peor caso (1,000 elementos):");
performanceTest(sortedArray, quickSort, "Quick Sort Lomuto (peor caso)");
performanceTest(
  sortedArray,
  quickSortRandomPivot,
  "Quick Sort Pivote Aleatorio (evita peor caso)"
);

// Ejemplo 9: Escalabilidad por tamaño
console.log("\n📝 Ejemplo 9: Escalabilidad por tamaño");
const sizes = [100, 1000, 5000];
sizes.forEach((size) => {
  const arr = Array.from({ length: size }, () =>
    Math.floor(Math.random() * size)
  );
  console.log(`\nTamaño ${size}:`);
  performanceTest(arr, quickSort, "Quick Sort");
  performanceTest(arr, quickSortHybrid, "Quick Sort Híbrido");

  // Calcular complejidad teórica promedio
  const theoreticalAvg = size * Math.log2(size);
  const theoreticalWorst = size * size;
  console.log(
    `  Complejidad promedio: ${size} * log₂(${size}) ≈ ${Math.ceil(
      theoreticalAvg
    )} operaciones`
  );
  console.log(
    `  Complejidad peor caso: ${size}² = ${theoreticalWorst} operaciones`
  );
});

// Ejemplo 10: Comparación de estrategias de pivote
console.log("\n📝 Ejemplo 10: Impacto de la selección del pivote");
const worstCaseArray = Array.from({ length: 1000 }, (_, i) => i + 1);
console.log("Probando con arreglo ordenado (peor caso para pivote fijo):");
console.log("Tamaño: 1,000 elementos");
performanceTest(worstCaseArray, quickSort, "Pivote fijo (último elemento)");
performanceTest(worstCaseArray, quickSortRandomPivot, "Pivote aleatorio");

console.log("\nProbando con arreglo aleatorio:");
const randomTest = Array.from({ length: 1000 }, () =>
  Math.floor(Math.random() * 1000)
);
performanceTest(randomTest, quickSort, "Pivote fijo (último elemento)");
performanceTest(randomTest, quickSortRandomPivot, "Pivote aleatorio");

// Exportar funciones para usar en otros módulos
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    quickSort,
    quickSortHoare,
    quickSortRandomPivot,
    quickSortWithVisualization,
    quickSortIterative,
    quickSortHybrid,
    performanceTest,
  };
}
