class BinaryHeap {
  constructor(type = "min") {
    this.heap = [];
    this.type = type;
  }

  insert(value) {
    this.heap.push(value);
    this._heapifyUp();
  }

  _heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const shouldSwap =
        this.type === "min"
          ? this.heap[parentIndex] > this.heap[index]
          : this.heap[parentIndex] < this.heap[index];

      if (!shouldSwap) break;

      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  // 🎨 MÉTODO DE VISUALIZACIÓN EN FORMA DE ÁRBOL
  printTree() {
    if (this.heap.length === 0) {
      console.log("Heap vacío");
      return;
    }

    console.log(`\n${this.type === "min" ? "Min" : "Max"} Heap Tree:`);
    this._printTreeStructure(0, "", true);
  }

  _printTreeStructure(index, prefix, isLast) {
    if (index >= this.heap.length) return;

    // Imprimir el nodo actual
    console.log(prefix + (isLast ? "└── " : "├── ") + this.heap[index]);

    // Calcular índices de hijos
    const leftIndex = 2 * index + 1;
    const rightIndex = 2 * index + 2;

    // Imprimir hijos con la estructura correcta
    if (leftIndex < this.heap.length || rightIndex < this.heap.length) {
      const newPrefix = prefix + (isLast ? "    " : "│   ");

      // Imprimir hijo izquierdo
      if (leftIndex < this.heap.length) {
        this._printTreeStructure(
          leftIndex,
          newPrefix,
          rightIndex >= this.heap.length
        );
      }

      // Imprimir hijo derecho
      if (rightIndex < this.heap.length) {
        this._printTreeStructure(rightIndex, newPrefix, true);
      }
    }
  }

  // 🎨 MÉTODO ALTERNATIVO: Visualización más compacta
  printCompact() {
    if (this.heap.length === 0) {
      console.log("Heap vacío");
      return;
    }

    console.log(`\n${this.type === "min" ? "Min" : "Max"} Heap:`);

    // Calcular altura del heap
    const height = Math.floor(Math.log2(this.heap.length)) + 1;

    // Imprimir nivel por nivel
    let level = 0;
    let start = 0;

    while (start < this.heap.length) {
      const end = Math.min(start + Math.pow(2, level), this.heap.length);
      const levelElements = this.heap.slice(start, end);

      // Calcular espaciado
      const spacing = Math.pow(2, height - level - 1);
      const betweenSpacing = Math.pow(2, height - level) - 1;

      // Imprimir espacios iniciales
      let line = " ".repeat(spacing);

      // Imprimir elementos del nivel
      levelElements.forEach((element, i) => {
        line += element;
        if (i < levelElements.length - 1) {
          line += " ".repeat(betweenSpacing);
        }
      });

      console.log(line);
      start = end;
      level++;
    }
  }

  _printSimpleTree(index, level, path) {
    if (index >= this.heap.length) return;

    // Imprimir hijos derechos primero (para el orden correcto)
    const rightIndex = 2 * index + 2;
    if (rightIndex < this.heap.length) {
      this._printSimpleTree(rightIndex, level + 1, [...path, "R"]);
    }

    // Imprimir espacios para indentación
    const indent = "  ".repeat(level);
    console.log(`${indent}${this.heap[index]}`);

    // Imprimir hijos izquierdos
    const leftIndex = 2 * index + 1;
    if (leftIndex < this.heap.length) {
      this._printSimpleTree(leftIndex, level + 1, [...path, "L"]);
    }
  }

  _buildTreeVisualization() {
    if (this.heap.length === 0) return;

    // Crear niveles
    const levels = [];
    let level = 0;
    let start = 0;

    while (start < this.heap.length) {
      const end = Math.min(start + Math.pow(2, level), this.heap.length);
      levels.push(this.heap.slice(start, end));
      start = end;
      level++;
    }

    // Imprimir cada nivel con la estructura correcta
    this._printLevelStructure(levels, 0, 0);
  }

  _printLevelStructure(levels, levelIndex, nodeIndex) {
    if (levelIndex >= levels.length) return;

    const currentLevel = levels[levelIndex];
    const nextLevel = levels[levelIndex + 1] || [];

    // Imprimir nodos del nivel actual
    let line = "";
    let connections = "";

    for (let i = 0; i < currentLevel.length; i++) {
      const node = currentLevel[i];
      const spaces = " ".repeat(Math.max(0, 4 - node.toString().length));
      line += spaces + node;

      // Imprimir conexiones si hay siguiente nivel
      if (levelIndex + 1 < levels.length) {
        const leftChild = nextLevel[i * 2] !== undefined ? "/" : " ";
        const rightChild = nextLevel[i * 2 + 1] !== undefined ? "\\" : " ";
        connections += " ".repeat(3) + leftChild + " " + rightChild;
      }
    }

    console.log(line);
    if (connections.trim()) {
      console.log(connections);
    }

    // Recursión para siguiente nivel
    if (levelIndex + 1 < levels.length) {
      this._printLevelStructure(levels, levelIndex + 1, 0);
    }
  }

  // Método básico para mostrar el array
  printArray() {
    console.log(`[${this.heap.join(", ")}]`);
  }

  // Métodos auxiliares
  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }
  isEmpty() {
    return this.heap.length === 0;
  }

  extract() {
    if (this.isEmpty()) return null;

    const root = this.heap[0];
    const last = this.heap.pop();

    if (!this.isEmpty()) {
      this.heap[0] = last;
      this._heapifyDown();
    }

    return root;
  }

  _heapifyDown() {
    let index = 0;
    while (2 * index + 1 < this.heap.length) {
      const leftIndex = 2 * index + 1;
      const rightIndex = 2 * index + 2;

      let swapIndex = leftIndex;

      if (this.type === "min") {
        if (
          rightIndex < this.heap.length &&
          this.heap[rightIndex] < this.heap[leftIndex]
        ) {
          swapIndex = rightIndex;
        }

        if (this.heap[index] <= this.heap[swapIndex]) break;
      } else {
        if (
          rightIndex < this.heap.length &&
          this.heap[rightIndex] > this.heap[leftIndex]
        ) {
          swapIndex = rightIndex;
        }

        if (this.heap[index] >= this.heap[swapIndex]) break;
      }

      [this.heap[index], this.heap[swapIndex]] = [
        this.heap[swapIndex],
        this.heap[index],
      ];
      index = swapIndex;
    }
  }
}

console.log("=== Visualización de Binary Heap ===");

// Crear y poblar un Min Heap
const minHeap = new BinaryHeap("min");
[50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45].forEach((value) => {
  console.log(`Insertando en Min Heap: ${value}`);
  minHeap.insert(value);
});

// Crear y poblar un Max Heap
const maxHeap = new BinaryHeap("max");
[50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45].forEach((value) => {
  console.log(`Insertando en Max Heap: ${value}`);
  maxHeap.insert(value);
});

console.log("\n=== Visualización de Max Heap ===");

console.log("\n--- printCompact ---");
maxHeap.printCompact();

console.log("\n--- printTree ---");
maxHeap.printTree();

console.log("\n--- printLikeExample ---");
if (typeof maxHeap.printLikeExample === "function") {
  maxHeap.printLikeExample();
}

console.log("\n--- printArray ---");
maxHeap.printArray();

console.log("\n--- peek ---");
console.log("Elemento en la cima:", maxHeap.peek());

console.log("\n--- isEmpty ---");
console.log("¿Está vacío?:", maxHeap.isEmpty());

console.log("\n--- extract ---");
console.log("Extraer elemento:", maxHeap.extract());
console.log("Heap después de extraer (array):");
maxHeap.printArray();
console.log("Heap después de extraer (compacto):");
maxHeap.printCompact();

// Visualización compacta
console.log("\n--- printCompact ---");
minHeap.printCompact();

// Visualización en árbol estructurado
console.log("\n--- printTree ---");
minHeap.printTree();

// Visualización estilo ejemplo (con ramas)
console.log("\n--- printLikeExample ---");
if (typeof minHeap.printLikeExample === "function") {
  minHeap.printLikeExample();
}

// Visualización como array
console.log("\n--- printArray ---");
minHeap.printArray();

// Métodos auxiliares
console.log("\n--- peek ---");
console.log("Elemento en la cima:", minHeap.peek());

console.log("\n--- isEmpty ---");
console.log("¿Está vacío?:", minHeap.isEmpty());

console.log("\n--- extract ---");
console.log("Extraer elemento:", minHeap.extract());
console.log("Heap después de extraer (array):");
minHeap.printArray();
console.log("Heap después de extraer (compacto):");
minHeap.printCompact();

// --- Ejemplo de uso: Leaderboard de un Videojuego ---
// Objetivo: Mantener un registro de los 5 mejores puntajes de forma eficiente.
// Usaremos un MinHeap para lograr esto. El heap almacenará los 5 puntajes más altos,
// con el más bajo de esos 5 en la cima (la raíz), permitiendo una rápida comparación.

console.log("\n=== Ejemplo: Leaderboard de un Videojuego (Top 5) ===");

const TOP_N = 5;
const leaderboard = new BinaryHeap("min"); // MinHeap para encontrar y reemplazar el puntaje más bajo del top 5.

const scoresStream = [1200, 800, 2500, 1500, 3000, 950, 4000, 1800];

console.log(`Procesando puntajes: ${scoresStream.join(", ")}`);
console.log("-------------------------------------------------");

scoresStream.forEach((score) => {
  console.log(`\nNuevo puntaje obtenido: ${score}`);

  if (leaderboard.heap.length < TOP_N) {
    // Si el leaderboard aún no está lleno, simplemente agregamos el puntaje.
    console.log(`-> El leaderboard no está lleno. Agregando ${score}.`);
    leaderboard.insert(score);
  } else {
    // Si el leaderboard está lleno, comparamos el nuevo puntaje con el más bajo del top 5.
    const lowestTopScore = leaderboard.peek();
    console.log(
      `-> El leaderboard está lleno. El puntaje más bajo del top 5 es ${lowestTopScore}.`
    );

    if (score > lowestTopScore) {
      // Si el nuevo puntaje es mayor, reemplazamos el más bajo del top 5.
      const removed = leaderboard.extract(); // Elimina el puntaje más bajo del top 5
      console.log(
        `-> ${score} es mayor que ${lowestTopScore}. Reemplazando ${removed}...`
      );
      leaderboard.insert(score); // Inserta el nuevo puntaje alto
    } else {
      // Si el nuevo puntaje no es lo suficientemente alto, lo ignoramos.
      console.log(
        `-> ${score} no es lo suficientemente alto para entrar en el top 5. Ignorando.`
      );
    }
  }
  console.log("Estado actual del leaderboard (MinHeap interno):");
  leaderboard.printArray();
});

console.log("\n-------------------------------------------------");
console.log("¡Procesamiento de puntajes finalizado!");
console.log("El estado final del heap (los 5 mejores puntajes) es:");
leaderboard.printTree();

// Para mostrar el leaderboard en orden descendente, extraemos todos los elementos.
const finalLeaderboard = [];
while (!leaderboard.isEmpty()) {
  finalLeaderboard.push(leaderboard.extract());
}

console.log("\n🏆 Leaderboard Final (Top 5) 🏆");
finalLeaderboard
  .reverse() // El MinHeap extrae de menor a mayor, lo invertimos.
  .forEach((score, index) => {
    console.log(`${index + 1}. ${score} puntos`);
  });

// 📈 **Complejidad de operaciones:**

/*
Operación           Complejidad
---------           -----------
insert(value)       O(log n)
extract()           O(log n)
peek()              O(1)
isEmpty()           O(1)
_heapifyUp()        O(log n)
_heapifyDown()      O(log n)
printTree()         O(n)
printCompact()      O(n)
printArray()        O(n)
*/

// 🎯 **Ventajas del Binary Heap:**
// ✅ Acceso inmediato al min/max: O(1)
// ✅ Inserción y eliminación eficientes: O(log n)
// ✅ Implementación simple con arrays
// ✅ Garantiza la propiedad de heap automáticamente
// ✅ Uso eficiente de memoria (estructura completa)

// ⚠️ **Limitaciones:**
// ❌ No permite búsqueda eficiente de elementos arbitrarios: O(n)
// ❌ No mantiene orden completo (solo parcial)
// ❌ Eliminación de elementos específicos es compleja

// 🔧 **Casos de uso ideales:**
// - Priority Queues (colas de prioridad)
// - Algoritmos de ordenamiento (Heapsort)
// - Leaderboards y ranking systems
// - Algoritmo de Dijkstra (shortest path)
// - Scheduling de procesos en sistemas operativos
// - Selección de top-K elementos
// - Merge K sorted arrays

// 🚀 **Min Heap vs Max Heap - Cuándo usar cada uno:**

/*
MIN HEAP:
- Encontrar el elemento MÍNIMO rápidamente
- Priority queue donde menor valor = mayor prioridad
- Algoritmo de Dijkstra
- Mantener los K elementos más grandes (paradójicamente)

MAX HEAP:
- Encontrar el elemento MÁXIMO rápidamente
- Priority queue donde mayor valor = mayor prioridad
- Heapsort (orden descendente)
- Mantener los K elementos más pequeños
*/
