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

// --- Ejemplo de uso: Sala de emergencias de un hospital ---
// La prioridad 1 es la más alta.

console.log("--- Inicia el turno en la sala de emergencias ---");
const salaDeEmergencias = new PriorityQueue();

// Llegan varios pacientes
salaDeEmergencias.push("Paciente con resfriado", 5);
salaDeEmergencias.push("Paciente con fractura", 3);
salaDeEmergencias.push("Paciente con dolor de pecho", 1); // Máxima prioridad
salaDeEmergencias.push("Paciente con corte leve", 4);

console.log("\nPacientes en espera:");
salaDeEmergencias.printQueue();

console.log("\nPaciente más urgente a atender:", salaDeEmergencias.peek());

const pacienteAtendido = salaDeEmergencias.pop();
console.log(`\nSe atiende a: "${pacienteAtendido}"`);
console.log("Siguiente paciente en la lista:", salaDeEmergencias.peek());

console.log("\n¡Llega una nueva emergencia de máxima prioridad!");
salaDeEmergencias.push("Paciente con herida de bala", 1);
console.log("AHORA el paciente más urgente es:", salaDeEmergencias.peek());

console.log("\n--- Se atienden todos los pacientes restantes en orden ---");
while (!salaDeEmergencias.isEmpty()) {
  console.log(`Atendiendo a: "${salaDeEmergencias.pop()}"`);
}
console.log(
  "\nLa sala de emergencias está vacía:",
  salaDeEmergencias.isEmpty()
);
