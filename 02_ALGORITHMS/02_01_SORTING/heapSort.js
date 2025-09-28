/**
 * ALGORITMO DE ORDENAMIENTO POR MONTÍCULO (HEAP SORT)
 *
 * Heap Sort es un algoritmo de ordenamiento basado en comparaciones que utiliza
 * una estructura de datos llamada heap (montículo) binario para ordenar elementos.
 *
 * Funcionamiento:
 * 1. Construir un max-heap a partir del arreglo de entrada
 * 2. Repetidamente extraer el máximo (raíz) y colocarlo al final
 * 3. Reducir el tamaño del heap y restaurar la propiedad de heap
 *
 * Complejidad temporal:
 * - Mejor caso: O(n log n)
 * - Caso promedio: O(n log n)
 * - Peor caso: O(n log n)
 *
 * Complejidad espacial: O(1) - algoritmo in-place
 *
 * Ventajas:
 * - Complejidad temporal consistente O(n log n) en todos los casos
 * - In-place (no requiere memoria extra)
 * - No tiene el peor caso O(n²) como Quick Sort
 * - Bueno para sistemas con memoria limitada
 *
 * Desventajas:
 * - No es estable (puede cambiar el orden de elementos iguales)
 * - Constantes más altas que Quick Sort en el caso promedio
 * - No es adaptativo (no mejora con datos parcialmente ordenados)
 * - Mala localidad de cache comparado con otros algoritmos
 */

/**
 * Función para mantener la propiedad de max-heap (heapify hacia abajo)
 * @param {number[]} arr - Arreglo que representa el heap
 * @param {number} n - Tamaño del heap
 * @param {number} i - Índice del nodo a procesar
 */
function heapify(arr, n, i) {
  let largest = i; // Inicializar el más grande como raíz
  let left = 2 * i + 1; // Hijo izquierdo
  let right = 2 * i + 2; // Hijo derecho

  // Si el hijo izquierdo es más grande que la raíz
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  // Si el hijo derecho es más grande que el más grande hasta ahora
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  // Si el más grande no es la raíz
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Intercambiar

    // Recursivamente heapify el subárbol afectado
    heapify(arr, n, largest);
  }
}

/**
 * Función para construir un max-heap a partir de un arreglo
 * @param {number[]} arr - Arreglo a convertir en heap
 */
function buildMaxHeap(arr) {
  const n = arr.length;

  // Empezar desde el último nodo padre y heapify hacia arriba
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
}

/**
 * Implementación principal de Heap Sort
 * @param {number[]} arr - Arreglo a ordenar
 * @returns {number[]} - Arreglo ordenado
 */
function heapSort(arr) {
  // Crear una copia para no modificar el arreglo original
  const sortedArray = [...arr];
  const n = sortedArray.length;

  if (n <= 1) {
    return sortedArray;
  }

  // Construir heap (reorganizar el arreglo)
  buildMaxHeap(sortedArray);

  // Extraer elementos del heap uno por uno
  for (let i = n - 1; i > 0; i--) {
    // Mover la raíz actual al final
    [sortedArray[0], sortedArray[i]] = [sortedArray[i], sortedArray[0]];

    // Llamar heapify en el heap reducido
    heapify(sortedArray, i, 0);
  }

  return sortedArray;
}

/**
 * Heap Sort con visualización paso a paso
 * @param {number[]} arr - Arreglo a ordenar
 * @returns {number[]} - Arreglo ordenado
 */
function heapSortWithVisualization(arr) {
  console.log("🔺 Heap Sort - Visualización paso a paso");
  console.log("Arreglo original:", arr);
  console.log("─".repeat(80));

  const sortedArray = [...arr];
  const n = sortedArray.length;
  let swapCount = 0;
  let heapifyCount = 0;

  if (n <= 1) {
    console.log("Arreglo ya tiene 0 o 1 elemento, no necesita ordenamiento");
    return sortedArray;
  }

  // Función heapify con visualización
  function visualHeapify(arr, n, i, phase) {
    heapifyCount++;
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    console.log(`   ${phase} - Heapify en nodo ${i} (valor: ${arr[i]})`);
    console.log(
      `     Hijos: izq=${left < n ? arr[left] : "N/A"} (${left}), der=${
        right < n ? arr[right] : "N/A"
      } (${right})`
    );

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      console.log(
        `     ✅ Intercambio necesario: ${arr[i]} ↔ ${arr[largest]} (posiciones ${i} ↔ ${largest})`
      );
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      swapCount++;
      console.log(`     Resultado: [${arr.join(", ")}]`);

      visualHeapify(arr, n, largest, phase);
    } else {
      console.log(`     ✨ ${arr[i]} ya cumple la propiedad de heap`);
    }
  }

  // Fase 1: Construir max-heap
  console.log("\n🏗️  FASE 1: Construyendo Max-Heap");
  console.log("Empezando desde el último nodo padre hacia la raíz...");

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    console.log(`\n🔸 Procesando nodo ${i}:`);
    visualHeapify(sortedArray, n, i, "Construcción");
  }

  console.log("\n🎉 Max-Heap construido:", sortedArray);
  console.log("Visualización del heap:");
  visualizeHeap(sortedArray, n);

  // Fase 2: Ordenamiento
  console.log("\n📤 FASE 2: Extrayendo elementos del heap");

  for (let i = n - 1; i > 0; i--) {
    console.log(`\n🔸 Extracción ${n - i}:`);
    console.log(
      `   Intercambiar raíz ${sortedArray[0]} con último elemento ${sortedArray[i]}`
    );

    [sortedArray[0], sortedArray[i]] = [sortedArray[i], sortedArray[0]];
    swapCount++;

    console.log(
      `   Elemento extraído: ${sortedArray[i]} (posición final: ${i})`
    );
    console.log(`   Heap reducido: [${sortedArray.slice(0, i).join(", ")}]`);

    if (i > 1) {
      visualHeapify(sortedArray, i, 0, "Extracción");
    }
  }

  console.log("─".repeat(80));
  console.log(`🎉 Arreglo final ordenado: [${sortedArray.join(", ")}]`);
  console.log(`📊 Estadísticas:`);
  console.log(`   • Total de intercambios: ${swapCount}`);
  console.log(`   • Total de heapify llamadas: ${heapifyCount}`);
  console.log(`   • Altura del heap: ${Math.floor(Math.log2(n))}`);
  console.log(
    `   • Complejidad: O(${n} * log₂(${n})) = O(${Math.ceil(n * Math.log2(n))})`
  );

  return sortedArray;
}

/**
 * Función para visualizar la estructura del heap
 * @param {number[]} arr - Arreglo que representa el heap
 * @param {number} n - Tamaño del heap
 */
function visualizeHeap(arr, n) {
  const height = Math.floor(Math.log2(n)) + 1;
  console.log(
    `   Altura del heap: ${height - 1} (${Math.pow(
      2,
      height - 1
    )} elementos en el último nivel)`
  );

  let level = 0;
  let index = 0;

  while (index < n) {
    const elementsInLevel = Math.min(Math.pow(2, level), n - index);
    const levelElements = [];

    for (let i = 0; i < elementsInLevel && index < n; i++) {
      levelElements.push(`${arr[index]}(${index})`);
      index++;
    }

    const spaces = "  ".repeat(Math.pow(2, height - level - 1) - 1);
    const separator = "  ".repeat(Math.pow(2, height - level) - 1);

    console.log(`   Nivel ${level}: ${spaces}${levelElements.join(separator)}`);
    level++;
  }
}

/**
 * Heap Sort iterativo (construye heap nivel por nivel)
 * @param {number[]} arr - Arreglo a ordenar
 * @returns {number[]} - Arreglo ordenado
 */
function heapSortIterative(arr) {
  const sortedArray = [...arr];
  const n = sortedArray.length;

  if (n <= 1) return sortedArray;

  // Construir heap iterativamente
  for (let i = 1; i < n; i++) {
    // Heapify hacia arriba para mantener la propiedad
    let child = i;
    while (child > 0) {
      let parent = Math.floor((child - 1) / 2);

      if (sortedArray[child] > sortedArray[parent]) {
        [sortedArray[child], sortedArray[parent]] = [
          sortedArray[parent],
          sortedArray[child],
        ];
        child = parent;
      } else {
        break;
      }
    }
  }

  // Extraer elementos
  for (let i = n - 1; i > 0; i--) {
    [sortedArray[0], sortedArray[i]] = [sortedArray[i], sortedArray[0]];
    heapify(sortedArray, i, 0);
  }

  return sortedArray;
}

/**
 * Min-Heap Sort (ordena en orden descendente)
 * @param {number[]} arr - Arreglo a ordenar
 * @returns {number[]} - Arreglo ordenado en orden descendente
 */
function minHeapSort(arr) {
  function minHeapify(arr, n, i) {
    let smallest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] < arr[smallest]) {
      smallest = left;
    }

    if (right < n && arr[right] < arr[smallest]) {
      smallest = right;
    }

    if (smallest !== i) {
      [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
      minHeapify(arr, n, smallest);
    }
  }

  const sortedArray = [...arr];
  const n = sortedArray.length;

  if (n <= 1) return sortedArray;

  // Construir min-heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    minHeapify(sortedArray, n, i);
  }

  // Extraer elementos (orden descendente)
  for (let i = n - 1; i > 0; i--) {
    [sortedArray[0], sortedArray[i]] = [sortedArray[i], sortedArray[0]];
    minHeapify(sortedArray, i, 0);
  }

  return sortedArray;
}

/**
 * Clase Heap para operaciones más avanzadas
 */
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  // Obtener índice del padre
  parent(i) {
    return Math.floor((i - 1) / 2);
  }

  // Obtener índice del hijo izquierdo
  leftChild(i) {
    return 2 * i + 1;
  }

  // Obtener índice del hijo derecho
  rightChild(i) {
    return 2 * i + 2;
  }

  // Insertar elemento
  insert(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  // Heapify hacia arriba
  heapifyUp(i) {
    while (i > 0 && this.heap[this.parent(i)] < this.heap[i]) {
      [this.heap[i], this.heap[this.parent(i)]] = [
        this.heap[this.parent(i)],
        this.heap[i],
      ];
      i = this.parent(i);
    }
  }

  // Extraer máximo
  extractMax() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return max;
  }

  // Heapify hacia abajo
  heapifyDown(i) {
    while (this.leftChild(i) < this.heap.length) {
      let largest = this.leftChild(i);

      if (
        this.rightChild(i) < this.heap.length &&
        this.heap[this.rightChild(i)] > this.heap[largest]
      ) {
        largest = this.rightChild(i);
      }

      if (this.heap[i] >= this.heap[largest]) break;

      [this.heap[i], this.heap[largest]] = [this.heap[largest], this.heap[i]];
      i = largest;
    }
  }

  // Ordenar usando esta clase
  static sort(arr) {
    const heap = new MaxHeap();
    const result = [];

    // Insertar todos los elementos
    arr.forEach((val) => heap.insert(val));

    // Extraer en orden descendente y revertir
    while (heap.heap.length > 0) {
      result.unshift(heap.extractMax());
    }

    return result;
  }
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

console.log("🚀 EJEMPLOS DEL ALGORITMO HEAP SORT\n");

// Ejemplo 1: Uso básico
console.log("📝 Ejemplo 1: Heap Sort básico");
const numbers1 = [12, 11, 13, 5, 6, 7];
console.log("Original:", numbers1);
console.log("Ordenado:", heapSort(numbers1));
console.log();

// Ejemplo 2: Arreglo ya ordenado
console.log("📝 Ejemplo 2: Arreglo ya ordenado");
const numbers2 = [1, 2, 3, 4, 5, 6];
console.log("Original:", numbers2);
console.log("Ordenado:", heapSort(numbers2));
console.log();

// Ejemplo 3: Arreglo en orden inverso
console.log("📝 Ejemplo 3: Arreglo en orden inverso");
const numbers3 = [6, 5, 4, 3, 2, 1];
console.log("Original:", numbers3);
console.log("Ordenado:", heapSort(numbers3));
console.log();

// Ejemplo 4: Arreglo con duplicados
console.log("📝 Ejemplo 4: Arreglo con valores duplicados");
const numbers4 = [4, 10, 3, 5, 1, 10, 3, 8];
console.log("Original:", numbers4);
console.log("Ordenado:", heapSort(numbers4));
console.log();

// Ejemplo 5: Casos límite
console.log("📝 Ejemplo 5: Casos límite");
console.log("Un elemento [42]:", heapSort([42]));
console.log("Arreglo vacío []:", heapSort([]));
console.log("Dos elementos [9, 3]:", heapSort([9, 3]));
console.log();

// Ejemplo 6: Visualización paso a paso
console.log("📝 Ejemplo 6: Visualización detallada");
const visualArray = [4, 10, 3, 5, 1];
heapSortWithVisualization(visualArray);
console.log();

// Ejemplo 7: Comparación entre versiones
console.log("📝 Ejemplo 7: Comparación entre implementaciones");
const testArray = [8, 3, 5, 4, 7, 6, 1, 2];
console.log("Arreglo de prueba:", testArray);
console.log("Heap Sort estándar:", heapSort(testArray));
console.log("Heap Sort iterativo:", heapSortIterative(testArray));
console.log("Min-Heap Sort (desc):", minHeapSort(testArray));
console.log("Heap Sort con clase:", MaxHeap.sort(testArray));
console.log();

// Ejemplo 8: Demostración de clase MaxHeap
console.log("📝 Ejemplo 8: Usando clase MaxHeap");
const heap = new MaxHeap();
const values = [4, 10, 3, 5, 1];
console.log("Insertando valores:", values);

values.forEach((val) => {
  heap.insert(val);
  console.log(`Después de insertar ${val}: [${heap.heap.join(", ")}]`);
});

console.log("\nExtrayendo elementos:");
const extracted = [];
while (heap.heap.length > 0) {
  const max = heap.extractMax();
  extracted.push(max);
  console.log(`Extraído: ${max}, Heap restante: [${heap.heap.join(", ")}]`);
}
console.log("Elementos extraídos en orden:", extracted);
console.log();

// Ejemplo 9: Análisis de rendimiento
console.log("📝 Ejemplo 9: Análisis de rendimiento");
console.log("Comparando Heap Sort en diferentes escenarios:");

// Arreglo aleatorio
const randomArray = Array.from({ length: 10000 }, () =>
  Math.floor(Math.random() * 10000)
);
console.log("\n🟢 Arreglo aleatorio (10,000 elementos):");
performanceTest(randomArray, heapSort, "Heap Sort estándar");
performanceTest(randomArray, heapSortIterative, "Heap Sort iterativo");

// Arreglo ordenado
const sortedArray = Array.from({ length: 10000 }, (_, i) => i + 1);
console.log("\n🟡 Arreglo ordenado (10,000 elementos):");
performanceTest(sortedArray, heapSort, "Heap Sort estándar");

// Arreglo en orden inverso
const reversedArray = Array.from({ length: 10000 }, (_, i) => 10000 - i);
console.log("\n🔴 Arreglo en orden inverso (10,000 elementos):");
performanceTest(reversedArray, heapSort, "Heap Sort estándar");

// Ejemplo 10: Escalabilidad por tamaño
console.log("\n📝 Ejemplo 10: Escalabilidad por tamaño");
const sizes = [100, 1000, 5000];
sizes.forEach((size) => {
  const arr = Array.from({ length: size }, () =>
    Math.floor(Math.random() * size)
  );
  console.log(`\nTamaño ${size}:`);
  performanceTest(arr, heapSort, "Heap Sort");

  // Calcular complejidad teórica
  const theoretical = size * Math.log2(size);
  console.log(
    `  Complejidad teórica: ${size} * log₂(${size}) ≈ ${Math.ceil(
      theoretical
    )} operaciones`
  );
});

// Ejemplo 11: Ventajas de Heap Sort
console.log("\n📝 Ejemplo 11: Características únicas de Heap Sort");
console.log("✅ Ventajas:");
console.log("   • Complejidad O(n log n) garantizada en todos los casos");
console.log("   • In-place (O(1) espacio extra)");
console.log("   • No tiene peor caso O(n²) como Quick Sort");
console.log("   • Ideal para sistemas con memoria limitada");
console.log("\n❌ Desventajas:");
console.log("   • No es estable");
console.log("   • Constantes más altas que Quick Sort en promedio");
console.log("   • Mala localidad de cache");
console.log("   • No es adaptativo");

// Exportar funciones para usar en otros módulos
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    heapSort,
    heapSortWithVisualization,
    heapSortIterative,
    minHeapSort,
    MaxHeap,
    performanceTest,
  };
}
