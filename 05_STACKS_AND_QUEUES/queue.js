class QueueNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this._front = null;
    this._rear = null;
    this.size = 0;
  }

  // Agregar elemento al final - O(1)
  enqueue(data) {
    const newNode = new QueueNode(data);

    if (this._rear) {
      this._rear.next = newNode;
    } else {
      this._front = newNode;
    }

    this._rear = newNode;
    this.size++;
    return this.size;
  }

  // Remover elemento del frente - O(1)
  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }

    const data = this._front.data;
    this._front = this._front.next;

    if (!this._front) {
      this._rear = null;
    }

    this.size--;
    return data;
  }

  // Ver elemento del frente - O(1)
  front() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this._front.data;
  }

  // Ver elemento del final - O(1)
  rear() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this._rear.data;
  }

  // Verificar si está vacía - O(1)
  isEmpty() {
    return this._front === null;
  }

  // Obtener tamaño - O(1)
  getSize() {
    return this.size;
  }

  // Limpiar queue - O(1)
  clear() {
    this._front = null;
    this._rear = null;
    this.size = 0;
  }
}

console.log("\n=== Queue con Linked List ===");

const queue = new Queue();

// enqueue() - O(1)
console.log("1. Agregar elementos:");
queue.enqueue("A");
console.log(`enqueue('A') - tamaño: ${queue.getSize()}`); // 1

queue.enqueue("B");
console.log(`enqueue('B') - tamaño: ${queue.getSize()}`); // 2

queue.enqueue("C");
console.log(`enqueue('C') - tamaño: ${queue.getSize()}`); // 3

// front() y rear() - O(1)
console.log("\n2. Ver extremos:");
console.log(`front(): ${queue.front()}`); // 'A'
console.log(`rear(): ${queue.rear()}`); // 'C'

// dequeue() - O(1)
console.log("\n3. Remover elementos:");
console.log(`dequeue(): ${queue.dequeue()}`); // 'A'
console.log(`dequeue(): ${queue.dequeue()}`); // 'B'

// isEmpty() - O(1)
console.log("\n4. Verificar estado:");
console.log(`isEmpty(): ${queue.isEmpty()}`); // false

// getSize() - O(1)
console.log(`getSize(): ${queue.getSize()}`); // 1

// clear() - O(1)
console.log("\n5. Limpiar queue:");
console.log(`Tamaño antes: ${queue.getSize()}`); // 1
queue.clear();
console.log(`Tamaño después: ${queue.getSize()}`); // 0
console.log(`isEmpty(): ${queue.isEmpty()}`); // true
