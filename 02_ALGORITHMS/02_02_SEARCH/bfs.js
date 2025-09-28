// BFS - BREADTH-FIRST SEARCH (Búsqueda en Anchura)
// Explora nivel por nivel, como ondas en el agua

// ========================================
// 1. BFS EN GRAFO USANDO LISTA DE ADYACENCIA
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

  // BFS - Búsqueda en Anchura
  bfs(startVertex) {
    // Estructura de datos esencial: COLA (Queue)
    const queue = [startVertex];
    const visited = {};
    const result = [];

    visited[startVertex] = true;

    while (queue.length > 0) {
      // FIFO: First In, First Out
      const currentVertex = queue.shift(); // Quita del frente
      result.push(currentVertex);

      // Visitar todos los vecinos no visitados
      this.adjacencyList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor); // Agrega al final
        }
      });
    }

    return result;
  }

  // BFS para encontrar el camino más corto
  bfsShortestPath(start, end) {
    const queue = [start];
    const visited = {};
    const parent = {};

    visited[start] = true;
    parent[start] = null;

    while (queue.length > 0) {
      const currentVertex = queue.shift();

      // ¿Encontramos el destino?
      if (currentVertex === end) {
        // Reconstruir el camino
        const path = [];
        let current = end;

        while (current !== null) {
          path.unshift(current);
          current = parent[current];
        }

        return path;
      }

      // Explorar vecinos
      this.adjacencyList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          parent[neighbor] = currentVertex;
          queue.push(neighbor);
        }
      });
    }

    return null; // No hay camino
  }
}

// ========================================
// 2. BFS EN ÁRBOL BINARIO
// ========================================

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function bfsTree(root) {
  if (!root) return [];

  const queue = [root];
  const result = [];

  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node.val);

    // Agregar hijos a la cola
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return result;
}

// BFS por niveles (level order traversal)
function bfsTreeByLevels(root) {
  if (!root) return [];

  const queue = [root];
  const result = [];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    // Procesar todos los nodos del nivel actual
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
  }

  return result;
}

// ========================================
// 3. BFS EN MATRIZ (GRID)
// ========================================

function bfsMatrix(matrix, startRow, startCol, target) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const visited = Array(rows)
    .fill()
    .map(() => Array(cols).fill(false));
  const queue = [[startRow, startCol, 0]]; // [row, col, distance]

  // Direcciones: arriba, abajo, izquierda, derecha
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  visited[startRow][startCol] = true;

  while (queue.length > 0) {
    const [row, col, distance] = queue.shift();

    // ¿Encontramos el objetivo?
    if (matrix[row][col] === target) {
      return { found: true, distance, position: [row, col] };
    }

    // Explorar las 4 direcciones
    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      // Verificar límites y si no está visitado
      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        !visited[newRow][newCol] &&
        matrix[newRow][newCol] !== "X"
      ) {
        // X = obstáculo

        visited[newRow][newCol] = true;
        queue.push([newRow, newCol, distance + 1]);
      }
    }
  }

  return { found: false, distance: -1, position: null };
}

// ========================================
// 4. EJEMPLOS Y DEMOSTRACIONES
// ========================================

console.log("=== BFS - BREADTH-FIRST SEARCH ===\n");

// Ejemplo 1: Grafo simple
console.log("1. BFS EN GRAFO:");
const graph = new Graph();

// Crear el grafo:
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
console.log("BFS desde A:", graph.bfs("A"));
console.log("BFS desde B:", graph.bfs("B"));

console.log("\nCamino más corto de A a F:", graph.bfsShortestPath("A", "F"));
console.log("Camino más corto de D a F:", graph.bfsShortestPath("D", "F"));

// Ejemplo 2: Árbol binario
console.log("\n2. BFS EN ÁRBOL BINARIO:");

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

console.log("BFS del árbol:", bfsTree(root));
console.log("BFS por niveles:", bfsTreeByLevels(root));

// Ejemplo 3: Matriz
console.log("\n3. BFS EN MATRIZ:");

const matrix = [
  ["S", ".", ".", "X"],
  [".", "X", ".", "."],
  [".", ".", "X", "."],
  ["X", ".", ".", "T"],
];

console.log("Matriz:");
matrix.forEach((row) => console.log(row.join(" ")));

console.log("\nBuscando 'T' desde posición [0,0]:");
const result = bfsMatrix(matrix, 0, 0, "T");
console.log(result);

// ========================================
// 5. COMPARACIÓN BFS vs DFS
// ========================================

console.log("\n=== COMPARACIÓN BFS vs DFS ===");
console.log(`
📊 CARACTERÍSTICAS CLAVE:

BFS (Breadth-First Search):
• Estructura de datos: COLA (Queue) - FIFO
• Explora nivel por nivel
• Garantiza el camino más corto (en grafos no ponderados)
• Complejidad temporal: O(V + E)
• Complejidad espacial: O(V)
• Uso de memoria: Mayor (almacena todos los nodos de un nivel)

DFS (Depth-First Search):
• Estructura de datos: PILA (Stack) - LIFO (o recursión)
• Explora profundidad primero
• NO garantiza el camino más corto
• Complejidad temporal: O(V + E)
• Complejidad espacial: O(V)
• Uso de memoria: Menor (solo la profundidad máxima)

🎯 CUÁNDO USAR BFS:
✅ Encontrar el camino más corto
✅ Explorar nivel por nivel
✅ Encontrar todos los nodos a distancia k
✅ Resolver laberintos (camino mínimo)
✅ Redes sociales (grados de separación)

🎯 CUÁNDO USAR DFS:
✅ Explorar todos los caminos posibles
✅ Detección de ciclos
✅ Ordenamiento topológico
✅ Resolver puzzles (backtracking)
✅ Análisis de conectividad

🔑 DIFERENCIA VISUAL:

BFS: Como ondas en el agua 🌊
     Nivel 1: A
     Nivel 2: B, C
     Nivel 3: D, E, F

DFS: Como explorar un laberinto 🕳️
     Camino: A → B → D → (volver) → C → E → F
`);

// ========================================
// 6. CASOS DE USO REALES
// ========================================

console.log("\n=== CASOS DE USO REALES ===");
console.log(`
🌐 BFS EN EL MUNDO REAL:

1. REDES SOCIALES:
   • Encontrar amigos a 2 grados de separación
   • Sugerencias de amistad
   • Influencia viral en redes

2. NAVEGACIÓN GPS:
   • Encontrar la ruta más corta
   • Menos intersecciones = mejor ruta

3. VIDEOJUEGOS:
   • IA para movimiento de NPCs
   • Pathfinding en mapas
   • Análisis de terreno

4. ANÁLISIS DE REDES:
   • Propagación de información
   • Análisis de vulnerabilidades
   • Detección de comunidades

5. BIOINFORMÁTICA:
   • Análisis de redes de proteínas
   • Rutas metabólicas
   • Evolución de especies

🚀 OPTIMIZACIONES AVANZADAS:
• Bidirectional BFS (buscar desde ambos extremos)
• A* Algorithm (BFS con heurística)
• Dijkstra (BFS con pesos)
`);
