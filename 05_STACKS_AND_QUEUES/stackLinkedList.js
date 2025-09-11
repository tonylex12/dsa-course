class StackNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null; // Referencia al nodo superior
    this.size = 0;
  }

  // Agregar elemento al tope - O(1)
  push(data) {
    const newNode = new StackNode(data);
    newNode.next = this.top;
    this.top = newNode;
    this.size++;
    return this.size;
  }

  // Remover elemento del tope - O(1)
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }

    const data = this.top.data;
    this.top = this.top.next;
    this.size--;
    return data;
  }

  // Ver elemento del tope sin removerlo - O(1)
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.top.data;
  }

  // Verificar si está vacía - O(1)
  isEmpty() {
    return this.top === null;
  }

  // Obtener tamaño - O(1)
  getSize() {
    return this.size;
  }

  // Limpiar stack - O(1)
  clear() {
    this.top = null;
    this.size = 0;
  }

  // Convertir a array (solo para visualización) - O(n)
  toArray() {
    const result = [];
    let current = this.top;
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }

  // Representación en string - O(n)
  toString() {
    return this.toArray().join(", ");
  }
}

console.log("=== Stack con Linked List ===");

const stack = new Stack();

// push() - O(1)
console.log("1. Agregar elementos:");
stack.push("A");
console.log(`push('A') - tamaño: ${stack.getSize()}`); // 1

stack.push("B");
console.log(`push('B') - tamaño: ${stack.getSize()}`); // 2

stack.push("C");
console.log(`push('C') - tamaño: ${stack.getSize()}`); // 3

// peek() - O(1)
console.log("\n2. Ver tope:");
console.log(`peek(): ${stack.peek()}`); // 'C'

// pop() - O(1)
console.log("\n3. Remover elementos:");
console.log(`pop(): ${stack.pop()}`); // 'C'

// isEmpty() - O(1)
console.log("\n4. Verificar estado:");
console.log(`isEmpty(): ${stack.isEmpty()}`); // false

// getSize() - O(1)
console.log(`getSize(): ${stack.getSize()}`); // 1

// toArray() - O(n)
console.log(`toArray():`, stack.toArray()); // ['B', 'A']

// clear() - O(1)
console.log("\n5. Limpiar stack:");
console.log(`Tamaño antes: ${stack.getSize()}`); // 2
stack.clear();
console.log(`Tamaño después: ${stack.getSize()}`); // 0
console.log(`isEmpty(): ${stack.isEmpty()}`); // true
