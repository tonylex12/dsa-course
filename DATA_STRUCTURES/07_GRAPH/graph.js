// 📈 **Complejidad de operaciones:**

/*
Operación                   Complejidad
---------                   -----------
addVertex(vertex)           O(1)
addEdge(v1, v2)             O(1)
removeEdge(v1, v2)          O(E) - E = aristas del vértice
removeVertex(vertex)        O(V + E) - V = vértices, E = aristas
hasVertex(vertex)           O(1)
hasEdge(v1, v2)             O(E)
getNeighbors(vertex)        O(1)
*/

// 🎯 **Ventajas del Grafo (lista de adyacencia):**
// ✅ Eficiente para grafos dispersos (pocos edges)
// ✅ Fácil de implementar y modificar
// ✅ Permite representar grafos dirigidos y no dirigidos
// ✅ Acceso rápido a los vecinos de un nodo

// ⚠️ **Desventajas:**
// ❌ No es eficiente para grafos densos (muchos edges)
// ❌ Búsqueda de aristas puede ser O(E)
// ❌ No es ideal para operaciones que requieren acceso rápido a todas las aristas

// 🔧 **Casos de uso ideales:**
// - Modelar redes sociales
// - Mapas de rutas y caminos
// - Representar relaciones entre entidades
// - Algoritmos de búsqueda de caminos (BFS, DFS, Dijkstra)
// - Análisis de conectividad y componentes
// Implementación de un Grafo usando lista de adyacencia
// Complejidad de operaciones indicada en cada método

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  // Agrega un vértice al grafo. O(1)
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  // Agrega una arista entre dos vértices. O(1)
  addEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1]) this.addVertex(vertex1);
    if (!this.adjacencyList[vertex2]) this.addVertex(vertex2);
    this.adjacencyList[vertex1].push(vertex2);
    this.adjacencyList[vertex2].push(vertex1); // Para grafo no dirigido
  }

  // Elimina una arista entre dos vértices. O(E)
  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
      (v) => v !== vertex2
    );
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
      (v) => v !== vertex1
    );
  }

  // Elimina un vértice y todas sus aristas. O(V + E)
  removeVertex(vertex) {
    while (this.adjacencyList[vertex] && this.adjacencyList[vertex].length) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
  }

  // Verifica si existe un vértice. O(1)
  hasVertex(vertex) {
    return !!this.adjacencyList[vertex];
  }

  // Verifica si existe una arista entre dos vértices. O(E)
  hasEdge(vertex1, vertex2) {
    return (
      this.adjacencyList[vertex1] &&
      this.adjacencyList[vertex1].includes(vertex2)
    );
  }

  // Devuelve los vecinos de un vértice. O(1)
  getNeighbors(vertex) {
    return this.adjacencyList[vertex] || [];
  }

  // Devuelve todas las aristas del grafo. O(V + E)
  getEdges() {
    const edges = [];
    const seen = new Set();
    for (const vertex in this.adjacencyList) {
      for (const neighbor of this.adjacencyList[vertex]) {
        // Para evitar duplicados en grafo no dirigido
        const edge = [vertex, neighbor].sort().join("-");
        if (!seen.has(edge)) {
          edges.push([vertex, neighbor]);
          seen.add(edge);
        }
      }
    }
    return edges;
  }

  // Métodos adicionales útiles

  // Obtener todos los vértices. O(V)
  getVertices() {
    return Object.keys(this.adjacencyList);
  }

  // Obtener el número de vértices. O(V)
  getVertexCount() {
    return Object.keys(this.adjacencyList).length;
  }

  // Obtener el número de aristas. O(V + E)
  getEdgeCount() {
    return this.getEdges().length;
  }

  // Verificar si el grafo está vacío. O(1)
  isEmpty() {
    return Object.keys(this.adjacencyList).length === 0;
  }

  // Breadth-First Search (BFS) - O(V + E)
  bfs(startingVertex) {
    if (!this.hasVertex(startingVertex)) return [];

    const visited = new Set();
    const queue = [startingVertex];
    const result = [];

    visited.add(startingVertex);

    while (queue.length > 0) {
      const vertex = queue.shift();
      result.push(vertex);

      for (const neighbor of this.getNeighbors(vertex)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return result;
  }

  // Depth-First Search (DFS) - O(V + E)
  dfs(startingVertex) {
    if (!this.hasVertex(startingVertex)) return [];

    const visited = new Set();
    const result = [];

    const dfsHelper = (vertex) => {
      visited.add(vertex);
      result.push(vertex);

      for (const neighbor of this.getNeighbors(vertex)) {
        if (!visited.has(neighbor)) {
          dfsHelper(neighbor);
        }
      }
    };

    dfsHelper(startingVertex);
    return result;
  }

  // Verificar si hay camino entre dos vértices - O(V + E)
  hasPath(vertex1, vertex2) {
    const visited = new Set();
    const queue = [vertex1];

    while (queue.length > 0) {
      const vertex = queue.shift();

      if (vertex === vertex2) return true;

      if (!visited.has(vertex)) {
        visited.add(vertex);

        for (const neighbor of this.getNeighbors(vertex)) {
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
          }
        }
      }
    }

    return false;
  }

  // Imprimir el grafo - O(V + E)
  print() {
    console.log("=== Graph ===");
    if (this.isEmpty()) {
      console.log("Grafo vacío");
      return;
    }

    for (const vertex in this.adjacencyList) {
      console.log(`${vertex} -> [${this.adjacencyList[vertex].join(", ")}]`);
    }

    console.log(`Vértices: ${this.getVertexCount()}`);
    console.log(`Aristas: ${this.getEdgeCount()}`);
    console.log();
  }
}

// Ejemplo real: Red de ciudades conectadas
const g = new Graph();
g.addVertex("CDMX");
g.addVertex("Guadalajara");
g.addVertex("Monterrey");
g.addVertex("Puebla");
g.addEdge("CDMX", "Guadalajara");
g.addEdge("CDMX", "Monterrey");
g.addEdge("CDMX", "Puebla");
g.addEdge("Guadalajara", "Monterrey");

console.log("Lista de adyacencia:");
console.log(g.adjacencyList);

console.log("\n¿Existe la ciudad Puebla?", g.hasVertex("Puebla"));
console.log("Vecinos de CDMX:", g.getNeighbors("CDMX"));

console.log("\nLista de edges:", g.getEdges());

g.removeEdge("CDMX", "Puebla");
console.log("\nDespués de eliminar la conexión CDMX-Puebla:");
console.log(g.adjacencyList);

console.log("Edges:", g.getEdges());

// === Ejemplo de uso de los nuevos métodos ===
console.log("\n--- Métodos adicionales ---");
console.log("Todos los vértices:", g.getVertices());
console.log("Cantidad de vértices:", g.getVertexCount());
console.log("Cantidad de aristas:", g.getEdgeCount());
console.log("¿El grafo está vacío?", g.isEmpty());

console.log("\nRecorrido BFS desde CDMX:", g.bfs("CDMX"));
console.log("Recorrido DFS desde CDMX:", g.dfs("CDMX"));
console.log("¿Hay camino entre CDMX y Puebla?", g.hasPath("CDMX", "Puebla"));
console.log(
  "¿Hay camino entre CDMX y Monterrey?",
  g.hasPath("CDMX", "Monterrey")
);

console.log("\nImpresión del grafo:");
g.print();

g.removeVertex("Monterrey");
console.log("\nDespués de eliminar Monterrey:");
console.log(g.adjacencyList);
console.log("Edges:", g.getEdges());
