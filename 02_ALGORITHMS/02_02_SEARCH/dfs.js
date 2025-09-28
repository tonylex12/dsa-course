// DFS - DEPTH-FIRST SEARCH (Búsqueda en Profundidad)
// Explora tan profundo como sea posible antes de retroceder

// ========================================
// 1. DFS EN GRAFO USANDO LISTA DE ADYACENCIA
// ========================================

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  // Agregar vértice
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  // Agregar arista (conexión bidireccional)
  addEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1].push(vertex2);
    this.adjacencyList[vertex2].push(vertex1);
  }

  // DFS RECURSIVO - La forma más natural
  dfsRecursive(startVertex) {
    const visited = {};
    const result = [];

    const dfs = (vertex) => {
      if (!vertex) return;

      visited[vertex] = true;
      result.push(vertex);

      // Visitar todos los vecinos no visitados
      this.adjacencyList[vertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          dfs(neighbor); // Llamada recursiva
        }
      });
    };

    dfs(startVertex);
    return result;
  }

  // DFS ITERATIVO - Usando pila (stack)
  dfsIterative(startVertex) {
    // Estructura de datos esencial: PILA (Stack)
    const stack = [startVertex];
    const visited = {};
    const result = [];

    while (stack.length > 0) {
      // LIFO: Last In, First Out
      const currentVertex = stack.pop(); // Quita del final

      if (!visited[currentVertex]) {
        visited[currentVertex] = true;
        result.push(currentVertex);

        // Agregar todos los vecinos no visitados a la pila
        this.adjacencyList[currentVertex].forEach((neighbor) => {
          if (!visited[neighbor]) {
            stack.push(neighbor); // Agrega al final
          }
        });
      }
    }

    return result;
  }

  // DFS para encontrar UN camino (no necesariamente el más corto)
  dfsPath(start, end) {
    const visited = {};
    const path = [];

    const dfs = (vertex) => {
      if (visited[vertex]) return false;

      visited[vertex] = true;
      path.push(vertex);

      // ¿Llegamos al destino?
      if (vertex === end) return true;

      // Explorar vecinos
      for (const neighbor of this.adjacencyList[vertex]) {
        if (dfs(neighbor)) return true; // Si encontramos el camino, retornamos
      }

      // Backtrack: quitar del camino si no lleva al destino
      path.pop();
      return false;
    };

    return dfs(start) ? path : null;
  }

  // Detectar ciclos usando DFS
  hasCycle() {
    const visited = {};
    const recursionStack = {};

    const dfs = (vertex) => {
      visited[vertex] = true;
      recursionStack[vertex] = true;

      for (const neighbor of this.adjacencyList[vertex]) {
        if (!visited[neighbor]) {
          if (dfs(neighbor)) return true;
        } else if (recursionStack[neighbor]) {
          return true; // Ciclo detectado
        }
      }

      recursionStack[vertex] = false;
      return false;
    };

    // Verificar desde todos los vértices no visitados
    for (const vertex in this.adjacencyList) {
      if (!visited[vertex]) {
        if (dfs(vertex)) return true;
      }
    }

    return false;
  }
}

// ========================================
// 2. DFS EN ÁRBOL BINARIO
// ========================================

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// DFS Pre-order: Raíz → Izquierda → Derecha
function dfsPreOrder(root) {
  if (!root) return [];

  const result = [];

  const dfs = (node) => {
    if (!node) return;

    result.push(node.val); // Visitar raíz
    dfs(node.left); // Recorrer izquierda
    dfs(node.right); // Recorrer derecha
  };

  dfs(root);
  return result;
}

// DFS In-order: Izquierda → Raíz → Derecha (en BST da orden sorted)
function dfsInOrder(root) {
  if (!root) return [];

  const result = [];

  const dfs = (node) => {
    if (!node) return;

    dfs(node.left); // Recorrer izquierda
    result.push(node.val); // Visitar raíz
    dfs(node.right); // Recorrer derecha
  };

  dfs(root);
  return result;
}

// DFS Post-order: Izquierda → Derecha → Raíz
function dfsPostOrder(root) {
  if (!root) return [];

  const result = [];

  const dfs = (node) => {
    if (!node) return;

    dfs(node.left); // Recorrer izquierda
    dfs(node.right); // Recorrer derecha
    result.push(node.val); // Visitar raíz
  };

  dfs(root);
  return result;
}

// DFS Iterativo para árboles
function dfsTreeIterative(root) {
  if (!root) return [];

  const stack = [root];
  const result = [];

  while (stack.length > 0) {
    const node = stack.pop();
    result.push(node.val);

    // Importante: agregar derecha primero, luego izquierda
    // (para que izquierda sea procesada primero debido al LIFO)
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return result;
}

// ========================================
// 3. DFS EN MATRIZ (GRID) - FLOOD FILL
// ========================================

function dfsMatrix(matrix, startRow, startCol, newValue, originalValue = null) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  if (originalValue === null) {
    originalValue = matrix[startRow][startCol];
  }

  // Verificar límites y si es el mismo valor
  if (
    startRow < 0 ||
    startRow >= rows ||
    startCol < 0 ||
    startCol >= cols ||
    matrix[startRow][startCol] !== originalValue ||
    matrix[startRow][startCol] === newValue
  ) {
    return;
  }

  // Cambiar el valor
  matrix[startRow][startCol] = newValue;

  // DFS en las 4 direcciones
  dfsMatrix(matrix, startRow - 1, startCol, newValue, originalValue); // Arriba
  dfsMatrix(matrix, startRow + 1, startCol, newValue, originalValue); // Abajo
  dfsMatrix(matrix, startRow, startCol - 1, newValue, originalValue); // Izquierda
  dfsMatrix(matrix, startRow, startCol + 1, newValue, originalValue); // Derecha
}

// Contar islas usando DFS
function countIslands(grid) {
  if (!grid || grid.length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  const dfs = (row, col) => {
    // Verificar límites y si es agua (0)
    if (
      row < 0 ||
      row >= rows ||
      col < 0 ||
      col >= cols ||
      grid[row][col] === "0"
    ) {
      return;
    }

    // Marcar como visitado (convertir tierra en agua)
    grid[row][col] = "0";

    // DFS en las 4 direcciones
    dfs(row - 1, col); // Arriba
    dfs(row + 1, col); // Abajo
    dfs(row, col - 1); // Izquierda
    dfs(row, col + 1); // Derecha
  };

  // Recorrer toda la matriz
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === "1") {
        // Encontramos una isla
        count++;
        dfs(row, col); // Marcar toda la isla como visitada
      }
    }
  }

  return count;
}

// ========================================
// 4. EJEMPLOS Y DEMOSTRACIONES
// ========================================

console.log("=== DFS - DEPTH-FIRST SEARCH ===\n");

// Ejemplo 1: Grafo simple
console.log("1. DFS EN GRAFO:");
const graph = new Graph();

// Crear el mismo grafo que en BFS para comparar:
//     A
//    / \
//   B   C
//  /   / \
// D   E   F

graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "E");
graph.addEdge("C", "F");

console.log("Grafo:", graph.adjacencyList);
console.log("DFS Recursivo desde A:", graph.dfsRecursive("A"));
console.log("DFS Iterativo desde A:", graph.dfsIterative("A"));
console.log("DFS Recursivo desde B:", graph.dfsRecursive("B"));

console.log("\nUn camino de A a F (DFS):", graph.dfsPath("A", "F"));
console.log("Un camino de D a F (DFS):", graph.dfsPath("D", "F"));

console.log("\n¿El grafo tiene ciclos?", graph.hasCycle());

// Ejemplo 2: Árbol binario
console.log("\n2. DFS EN ÁRBOL BINARIO:");

//       1
//      / \
//     2   3
//    / \   \
//   4   5   6

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.right = new TreeNode(6);

console.log("DFS Pre-order (Raíz-Izq-Der):", dfsPreOrder(root));
console.log("DFS In-order (Izq-Raíz-Der):", dfsInOrder(root));
console.log("DFS Post-order (Izq-Der-Raíz):", dfsPostOrder(root));
console.log("DFS Iterativo:", dfsTreeIterative(root));

// Ejemplo 3: Matriz - Flood Fill
console.log("\n3. DFS EN MATRIZ - FLOOD FILL:");

const matrix1 = [
  [1, 1, 1],
  [1, 1, 0],
  [1, 0, 1],
];

console.log("Matriz original:");
matrix1.forEach((row) => console.log(row.join(" ")));

dfsMatrix(matrix1, 1, 1, 2); // Cambiar desde [1,1] el valor 1 por 2

console.log("\nMatriz después de flood fill desde [1,1] con valor 2:");
matrix1.forEach((row) => console.log(row.join(" ")));

// Ejemplo 4: Contar islas
console.log("\n4. CONTAR ISLAS:");

const islands = [
  ["1", "1", "0", "0", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "1", "0", "0"],
  ["0", "0", "0", "1", "1"],
];

console.log("Grid de islas (1=tierra, 0=agua):");
islands.forEach((row) => console.log(row.join(" ")));

const islandCount = countIslands(islands.map((row) => [...row])); // Copia para no modificar original
console.log("Número de islas:", islandCount);

// ========================================
// 5. COMPARACIÓN DETALLADA BFS vs DFS
// ========================================

console.log("\n=== COMPARACIÓN DETALLADA BFS vs DFS ===");

// Ejemplo comparativo con el mismo grafo
const graphComparison = new Graph();
["A", "B", "C", "D", "E", "F"].forEach((v) => graphComparison.addVertex(v));
graphComparison.addEdge("A", "B");
graphComparison.addEdge("A", "C");
graphComparison.addEdge("B", "D");
graphComparison.addEdge("C", "E");
graphComparison.addEdge("C", "F");

// Simular BFS para comparación
function bfsComparison(graph, start) {
  const queue = [start];
  const visited = {};
  const result = [];

  visited[start] = true;

  while (queue.length > 0) {
    const current = queue.shift();
    result.push(current);

    graph.adjacencyList[current].forEach((neighbor) => {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);
      }
    });
  }

  return result;
}

console.log("\nMismo grafo, diferentes recorridos desde A:");
console.log("BFS:", bfsComparison(graphComparison, "A"));
console.log("DFS:", graphComparison.dfsRecursive("A"));

console.log(`
📊 ANÁLISIS COMPARATIVO:

🌊 BFS (Breadth-First Search):
• Estructura: COLA (Queue) - FIFO
• Patrón: Nivel por nivel (como ondas)
• Resultado: ['A', 'B', 'C', 'D', 'E', 'F']
• Camino más corto: ✅ GARANTIZADO
• Memoria: Mayor (almacena un nivel completo)
• Uso: Caminos mínimos, análisis de niveles

🕳️ DFS (Depth-First Search):
• Estructura: PILA (Stack) - LIFO (o recursión)
• Patrón: Profundidad primero (como explorar cuevas)
• Resultado: ['A', 'B', 'D', 'C', 'E', 'F']
• Camino más corto: ❌ NO garantizado
• Memoria: Menor (solo la profundidad máxima)
• Uso: Exploración completa, detección de ciclos

🎯 CUÁNDO USAR DFS:
✅ Explorar todos los caminos posibles
✅ Detección de ciclos en grafos
✅ Ordenamiento topológico
✅ Resolver puzzles con backtracking
✅ Análisis de componentes conectados
✅ Generación de laberintos
✅ Flood fill en editores de imágenes
✅ Compiladores (análisis sintáctico)

🔑 VARIANTES DE DFS:
• Pre-order: Raíz → Izquierda → Derecha
• In-order: Izquierda → Raíz → Derecha (BST → sorted)
• Post-order: Izquierda → Derecha → Raíz

💡 TÉCNICAS AVANZADAS:
• Backtracking: DFS + deshacer decisiones
• Memoización: DFS + cache de resultados
• Tarjan's Algorithm: DFS + análisis de conectividad
• Kosaraju's Algorithm: DFS + componentes fuertemente conectados
`);

// ========================================
// 6. CASOS DE USO REALES
// ========================================

console.log("\n=== CASOS DE USO REALES DE DFS ===");
console.log(`
🌐 DFS EN EL MUNDO REAL:

1. COMPILADORES:
   • Análisis sintáctico de código
   • Construcción de árboles de sintaxis
   • Optimización de código

2. ANÁLISIS DE DEPENDENCIAS:
   • npm/yarn: resolución de dependencias
   • Makefiles: orden de compilación
   • Detección de dependencias circulares

3. JUEGOS Y PUZZLES:
   • Resolución de sudoku
   • Búsqueda de soluciones en ajedrez
   • Generación de laberintos

4. ANÁLISIS DE REDES:
   • Detección de comunidades
   • Análisis de vulnerabilidades
   • Propagación de fallos

5. EDITORES GRÁFICOS:
   • Flood fill (bote de pintura)
   • Selección de regiones conectadas
   • Análisis de formas

6. SISTEMAS DE ARCHIVOS:
   • Búsqueda de archivos
   • Cálculo de tamaños de directorios
   • Detección de enlaces circulares

🚀 OPTIMIZACIONES:
• Iterative Deepening: DFS con límite de profundidad
• Alpha-Beta Pruning: DFS en juegos
• Branch and Bound: DFS con poda
`);
