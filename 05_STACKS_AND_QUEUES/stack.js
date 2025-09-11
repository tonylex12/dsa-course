class Stack {
  constructor() {
    this.items = [];
  }

  // Agregar elemento al tope - O(1)
  push(data) {
    return this.items.push(data);
  }

  // Remover elemento del tope - O(1)
  pop() {
    return this.items.pop();
  }

  // Ver elemento del tope sin removerlo - O(1)
  peek() {
    return this.items[this.items.length - 1];
  }

  // Verificar si está vacía - O(1)
  isEmpty() {
    return this.items.length === 0;
  }

  // Obtener tamaño - O(1)
  getSize() {
    return this.items.length;
  }

  // Limpiar stack - O(1)
  clear() {
    this.items = [];
  }
}

console.log("=== Stack con Array ===");

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
console.log(`pop(): ${stack.pop()}`); // 'B'

// isEmpty() - O(1)
console.log("\n4. Verificar estado:");
console.log(`isEmpty(): ${stack.isEmpty()}`); // false

// getSize() - O(1)
console.log(`getSize(): ${stack.getSize()}`); // 1

// clear() - O(1)
console.log("\n5. Limpiar stack:");
console.log(`Tamaño antes: ${stack.getSize()}`); // 1
stack.clear();
console.log(`Tamaño después: ${stack.getSize()}`); // 0
console.log(`isEmpty(): ${stack.isEmpty()}`); // true
