class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  push(item, priority) {
    this.heap.push({ item, priority });
    this._bubbleUp(this.heap.length - 1);
  }

  pop() {
    if (this.isEmpty()) throw new Error("pop from empty PriorityQueue");
    const top = this.heap[0].item;
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this._sinkDown(0);
    }
    return top;
  }

  peek() {
    if (this.isEmpty()) throw new Error("peek from empty PriorityQueue");
    return this.heap[0].item;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }

  printQueue() {
    console.log("Contenido de la PriorityQueue:");
    this.heap.forEach(({ item, priority }) => {
      console.log(`- Elemento: ${item}, Prioridad: ${priority}`);
    });
  }

  printRaw() {
    console.log("Estructura interna de la PriorityQueue:");
    console.log(this.heap);
  }

  _bubbleUp(n) {
    const element = this.heap[n];
    while (n > 0) {
      const parentN = Math.floor((n - 1) / 2);
      const parent = this.heap[parentN];
      if (element.priority >= parent.priority) break;
      this.heap[n] = parent;
      this.heap[parentN] = element;
      n = parentN;
    }
  }

  _sinkDown(n) {
    const length = this.heap.length;
    const element = this.heap[n];
    while (true) {
      let leftN = 2 * n + 1;
      let rightN = 2 * n + 2;
      let swap = null;

      if (leftN < length) {
        if (this.heap[leftN].priority < element.priority) swap = leftN;
      }
      if (rightN < length) {
        if (
          this.heap[rightN].priority <
          (swap === null ? element.priority : this.heap[leftN].priority)
        )
          swap = rightN;
      }
      if (swap === null) break;
      this.heap[n] = this.heap[swap];
      this.heap[swap] = element;
      n = swap;
    }
  }
}

// Ejemplo 1: Insertar tareas con diferentes prioridades
const pq1 = new PriorityQueue();
pq1.push("Lavar los platos", 2);
pq1.push("Hacer la tarea", 1);
pq1.push("Leer un libro", 3);

console.log("Tarea de mayor prioridad:", pq1.peek()); // Hacer la tarea

// Ejemplo 2: Verificar tamaño y si está vacía
console.log("¿Está vacía?", pq1.isEmpty()); // false
pq1.push("Pagar cuentas");
console.log("Tamaño después de agregar una tarea:", pq1.size()); // 4
console.log("Siguiente tarea:", pq1.peek()); // Hacer la tarea

console.log("\n--- Contenido de la Cola ---");
pq1.printQueue();

console.log("\n--- Estructura Interna (Raw) ---");
pq1.printRaw();

// 📈 **Complejidad de operaciones:**

/*
Operación               Complejidad
---------               -----------
push(item, priority)    O(log n)
pop()                   O(log n)
peek()                  O(1)
isEmpty()               O(1)
size()                  O(1)
printQueue()            O(n)
printRaw()              O(n)
_bubbleUp(n)            O(log n)
_sinkDown(n)            O(log n)
*/

// 🎯 **Esta implementación usa Binary Heap (array):**
// ✅ Ventajas:
// - Operaciones eficientes: O(log n) para inserción/eliminación
// - Acceso inmediato al elemento de mayor prioridad: O(1)
// - Uso eficiente de memoria (array contiguo)
// - Implementación estándar para priority queues

// ⚠️ Comparación con lista enlazada ordenada:
// - Heap: insert O(log n), remove O(log n)
// - Lista enlazada: insert O(n), remove O(1)
// - Heap es más eficiente para la mayoría de casos de uso

// 🚀 **Ejemplos de uso práctico:**

console.log("\n=== Caso de uso: Sistema de procesamiento de tareas ===");

class TaskScheduler {
  constructor() {
    this.queue = new PriorityQueue();
  }

  addTask(task, priority) {
    this.queue.push(task, priority);
    console.log(`Tarea "${task}" agregada con prioridad ${priority}`);
  }

  processNext() {
    if (!this.queue.isEmpty()) {
      const task = this.queue.pop();
      console.log(`Procesando: "${task}"`);
      return task;
    } else {
      console.log("No hay tareas pendientes");
      return null;
    }
  }

  getNext() {
    if (!this.queue.isEmpty()) {
      return this.queue.peek();
    }
    return "No hay tareas";
  }

  getPendingCount() {
    return this.queue.size();
  }
}

const scheduler = new TaskScheduler();
scheduler.addTask("Backup de base de datos", 1); // Alta prioridad
scheduler.addTask("Enviar email semanal", 3); // Baja prioridad
scheduler.addTask("Actualizar seguridad", 1); // Alta prioridad
scheduler.addTask("Generar reporte", 2); // Media prioridad

console.log(`\nTareas pendientes: ${scheduler.getPendingCount()}`);
console.log(`Siguiente tarea: "${scheduler.getNext()}"`);

console.log("\nProcesando todas las tareas por prioridad:");
while (scheduler.getPendingCount() > 0) {
  scheduler.processNext();
}

console.log("\n=== Caso de uso: Algoritmo de Dijkstra (simulado) ===");

class DijkstraSimulation {
  constructor() {
    this.pq = new PriorityQueue();
  }

  addNode(node, distance) {
    this.pq.push(node, distance);
  }

  getShortestPath() {
    const result = [];
    while (!this.pq.isEmpty()) {
      result.push(this.pq.pop());
    }
    return result;
  }
}

const dijkstra = new DijkstraSimulation();
dijkstra.addNode("A", 0); // Nodo inicial
dijkstra.addNode("B", 4);
dijkstra.addNode("C", 2);
dijkstra.addNode("D", 7);
dijkstra.addNode("E", 1);

console.log("Orden de procesamiento (por distancia menor):");
console.log(dijkstra.getShortestPath()); // [A, E, C, B, D]

// 🔧 **Casos de uso ideales para Priority Queue:**
// - Algoritmos de grafos (Dijkstra, Prim's MST)
// - Sistemas de scheduling/planificación
// - Simulaciones de eventos discretos
// - Algoritmos de compresión (Huffman coding)
// - Sistemas de atención por prioridad
// - Game AI (pathfinding, decision making)
