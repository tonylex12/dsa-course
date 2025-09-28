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

// 🚀 **Ejemplos de uso práctico:**

console.log("\n=== Caso de uso: Validar paréntesis ===");

function isValidParentheses(str) {
  const stack = new Stack();
  const pairs = { "(": ")", "[": "]", "{": "}" };

  for (let char of str) {
    if (char in pairs) {
      stack.push(char);
    } else if (Object.values(pairs).includes(char)) {
      if (stack.isEmpty() || pairs[stack.pop()] !== char) {
        return false;
      }
    }
  }

  return stack.isEmpty();
}

console.log("isValidParentheses('()'): ", isValidParentheses("()")); // true
console.log("isValidParentheses('({[]})'): ", isValidParentheses("({[]})")); // true
console.log("isValidParentheses('({[}])'): ", isValidParentheses("({[}])")); // false

console.log("\n=== Caso de uso: Deshacer operaciones ===");

class TextEditor {
  constructor() {
    this.content = "";
    this.history = new Stack();
  }

  type(text) {
    this.history.push(this.content);
    this.content += text;
  }

  undo() {
    if (!this.history.isEmpty()) {
      this.content = this.history.pop();
    }
  }

  getText() {
    return this.content;
  }
}

const editor = new TextEditor();
editor.type("Hola ");
console.log("Después de 'Hola ':", editor.getText());
editor.type("mundo");
console.log("Después de 'mundo':", editor.getText());
editor.undo();
console.log("Después de undo:", editor.getText());

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
*/

// 🎯 **Casos de uso ideales para Stack:**
// ✅ Deshacer operaciones (undo/redo)
// ✅ Validación de paréntesis/corchetes
// ✅ Evaluación de expresiones matemáticas
// ✅ Navegación en páginas web (historial)
// ✅ Llamadas de función (call stack)
// ✅ Algoritmos de backtracking
