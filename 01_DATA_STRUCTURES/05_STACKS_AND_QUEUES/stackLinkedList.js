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

// 🔗 **Ventajas de Stack con Lista Enlazada vs Array:**

console.log("\n=== Comparación: Lista Enlazada vs Array ===");

// ✅ Ventajas de Lista Enlazada:
// - Tamaño dinámico (no hay límite fijo)
// - No hay realocación de memoria
// - Uso eficiente de memoria (solo lo necesario)

// ❌ Desventajas:
// - Overhead de punteros
// - No hay acceso aleatorio
// - Fragmentación de memoria

// 🚀 **Ejemplo: Stack para evaluar expresiones postfijas**

console.log("\n=== Caso de uso: Evaluador de expresiones postfijas ===");

function evaluatePostfix(expression) {
  const stack = new Stack();
  const tokens = expression.split(" ");

  for (let token of tokens) {
    if (!isNaN(token)) {
      // Es un número
      stack.push(parseFloat(token));
    } else {
      // Es un operador
      const b = stack.pop();
      const a = stack.pop();

      switch (token) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
          stack.push(a / b);
          break;
        default:
          throw new Error(`Operador no válido: ${token}`);
      }
    }
  }

  return stack.pop();
}

console.log("Evaluar '3 4 + 2 *':", evaluatePostfix("3 4 + 2 *")); // (3+4)*2 = 14
console.log(
  "Evaluar '15 7 1 1 + - / 3 * 2 1 1 + + -':",
  evaluatePostfix("15 7 1 1 + - / 3 * 2 1 1 + + -")
); // 5

// 📈 **Complejidad de operaciones:**

/*
Operación       Complejidad
---------       -----------
push(data)      O(1)
pop()           O(1)
peek()          O(1)
isEmpty()       O(1)
getSize()       O(1)
clear()         O(1)
toArray()       O(n)
toString()      O(n)
*/

// 🎯 **Cuándo usar Stack con Lista Enlazada:**
// ✅ Cuando el tamaño es muy variable
// ✅ Cuando quieres evitar realocaciones
// ✅ Cuando la memoria disponible es limitada
// ✅ Para implementaciones más "académicas"

// 🎯 **Cuándo usar Stack con Array:**
// ✅ Para mejor rendimiento en la mayoría de casos
// ✅ Cuando el tamaño es relativamente estable
// ✅ Para simplicidad de implementación
