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
