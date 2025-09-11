class DoublyListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Agregar al inicio - O(1)
  prepend(data) {
    const newNode = new DoublyListNode(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }

    this.size++;
    return this;
  }

  // Agregar al final - O(1)
  append(data) {
    const newNode = new DoublyListNode(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.size++;
    return this;
  }

  // Insertar en posición específica - O(n)
  insert(index, data) {
    if (index < 0 || index > this.size) {
      throw new Error("Index out of bounds");
    }

    if (index === 0) return this.prepend(data);
    if (index === this.size) return this.append(data);

    const newNode = new DoublyListNode(data);
    const nextNode = this._getNodeAt(index);
    const prevNode = nextNode.prev;

    newNode.next = nextNode;
    newNode.prev = prevNode;
    prevNode.next = newNode;
    nextNode.prev = newNode;

    this.size++;
    return this;
  }

  // Obtener nodo en posición específica - O(n/2) optimizado
  _getNodeAt(index) {
    if (index < 0 || index >= this.size) return null;

    let current;
    let currentIndex;

    // Optimización: empezar desde el lado más cercano
    if (index < this.size / 2) {
      current = this.head;
      currentIndex = 0;
      while (currentIndex < index) {
        current = current.next;
        currentIndex++;
      }
    } else {
      current = this.tail;
      currentIndex = this.size - 1;
      while (currentIndex > index) {
        current = current.prev;
        currentIndex--;
      }
    }

    return current;
  }

  // Obtener valor en posición específica - O(n/2)
  get(index) {
    const node = this._getNodeAt(index);
    return node ? node.data : undefined;
  }

  // Encontrar índice de un valor - O(n)
  indexOf(data) {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.data === data) {
        return index;
      }
      current = current.next;
      index++;
    }

    return -1;
  }

  // Eliminar primer elemento - O(1)
  removeFirst() {
    if (!this.head) return undefined;

    const removedData = this.head.data;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }

    this.size--;
    return removedData;
  }

  // Eliminar último elemento - O(1)
  removeLast() {
    if (!this.tail) return undefined;

    const removedData = this.tail.data;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }

    this.size--;
    return removedData;
  }

  // Eliminar en posición específica - O(n/2)
  removeAt(index) {
    if (index < 0 || index >= this.size) return undefined;

    if (index === 0) return this.removeFirst();
    if (index === this.size - 1) return this.removeLast();

    const nodeToRemove = this._getNodeAt(index);
    const prevNode = nodeToRemove.prev;
    const nextNode = nodeToRemove.next;

    prevNode.next = nextNode;
    nextNode.prev = prevNode;

    this.size--;
    return nodeToRemove.data;
  }

  // Eliminar por valor - O(n)
  remove(data) {
    const index = this.indexOf(data);
    if (index !== -1) {
      return this.removeAt(index);
    }
    return undefined;
  }

  reverse() {
    if (!this.head || !this.head.next) {
      // Lista vacía o con un solo elemento
      return this;
    }

    // Intercambiar head y tail
    let temp = this.head;
    this.head = this.tail;
    this.tail = temp;

    // Recorrer la lista e invertir todos los punteros
    let current = this.head; // Ahora head es el antiguo tail

    while (current !== null) {
      // Intercambiar next y prev para cada nodo
      temp = current.next;
      current.next = current.prev;
      current.prev = temp;

      // Mover al siguiente nodo (que ahora está en current.next)
      current = current.next;
    }

    return this;
  }

  // Convertir a array - O(n)
  toArray() {
    const result = [];
    let current = this.head;

    while (current) {
      result.push(current.data);
      current = current.next;
    }

    return result;
  }

  // Convertir a array en orden inverso - O(n)
  toArrayReverse() {
    const result = [];
    let current = this.tail;

    while (current) {
      result.push(current.data);
      current = current.prev;
    }

    return result;
  }

  // Iterador hacia adelante
  *[Symbol.iterator]() {
    let current = this.head;
    while (current) {
      yield current.data;
      current = current.next;
    }
  }

  // Iterador hacia atrás
  *reverseIterator() {
    let current = this.tail;
    while (current) {
      yield current.data;
      current = current.prev;
    }
  }

  // Tamaño
  getSize() {
    return this.size;
  }

  // Verificar si está vacía
  isEmpty() {
    return this.size === 0;
  }

  // Limpiar lista
  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Representación en string
  toString() {
    if (!this.head) return "null";

    let result = "null";
    let current = this.head;

    while (current) {
      result += ` <- ${current.data} -> `;
      current = current.next;
    }

    result += "null";
    return result;
  }
}

const lista = new DoublyLinkedList();

console.log("1. Crear lista vacía:");
console.log("toString():", lista.toString());
console.log("getSize():", lista.getSize());
console.log("isEmpty():", lista.isEmpty());

console.log("\n2. Agregar elementos:");
lista.append("A").append("B").append("C");
console.log("Después de append A, B, C:", lista.toString());
console.log("getSize():", lista.getSize());

lista.prepend("Z");
console.log("Después de prepend Z:", lista.toString());

lista.insert(2, "X");
console.log('Después de insert(2, "X"):', lista.toString());

console.log("\n3. Acceder a elementos:");
console.log("get(0):", lista.get(0));
console.log("get(2):", lista.get(2));
console.log("get(4):", lista.get(4));
console.log('indexOf("B"):', lista.indexOf("B"));
console.log('indexOf("Z"):', lista.indexOf("Z"));

console.log("\n4. Iterar:");
console.log("Hacia adelante:");
for (const item of lista) {
  console.log("  ", item);
}

console.log("Hacia atrás:");
for (const item of lista.reverseIterator()) {
  console.log("  ", item);
}

console.log("toArray():", lista.toArray());
console.log("toArrayReverse():", lista.toArrayReverse());

console.log("\n5. Eliminar elementos:");
console.log("removeFirst():", lista.removeFirst());
console.log("Después de removeFirst():", lista.toString());

console.log("removeLast():", lista.removeLast());
console.log("Después de removeLast():", lista.toString());

console.log("removeAt(1):", lista.removeAt(1));
console.log("Después de removeAt(1):", lista.toString());

console.log('remove("X"):', lista.remove("X"));
console.log('Después de remove("X"):', lista.toString());

console.log("\n6. Estado final:");
console.log("toString():", lista.toString());
console.log("getSize():", lista.getSize());
console.log("isEmpty():", lista.isEmpty());

console.log("reverse():", lista.reverse().toString());
