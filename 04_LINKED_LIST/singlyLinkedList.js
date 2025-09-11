class ListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;      // Optimización para inserción al final
        this.size = 0;
    }

    // Agregar al inicio - O(1)
    prepend(data) {
        const newNode = new ListNode(data);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }

        this.size++;
        return this;
    }

    // Agregar al final - O(1)
    append(data) {
        const newNode = new ListNode(data);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.size++;
        return this;
    }

    // Insertar en posición específica - O(n)
    insert(index, data) {
        // Validar índice
        if (index < 0 || index > this.size) {
            throw new Error('Index out of bounds');
        }

        // Insertar al inicio
        if (index === 0) {
            return this.prepend(data);
        }

        // Insertar al final
        if (index === this.size) {
            return this.append(data);
        }

        // Insertar en medio
        const newNode = new ListNode(data);
        const prevNode = this._getNodeAt(index - 1);
        newNode.next = prevNode.next;
        prevNode.next = newNode;
        this.size++;

        return this;
    }

    // Obtener nodo en posición específica - O(n)
    _getNodeAt(index) {
        if (index < 0 || index >= this.size) {
            return null;
        }

        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    }

    // Obtener valor en posición específica - O(n)
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

    // Verificar si existe un valor - O(n)
    contains(data) {
        return this.indexOf(data) !== -1;
    }

    // Eliminar primer elemento - O(1)
    removeFirst() {
        if (!this.head) {
            return undefined;
        }

        const removedData = this.head.data;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
        }

        this.size--;
        return removedData;
    }

    // Eliminar último elemento - O(n)
    removeLast() {
        if (!this.head) {
            return undefined;
        }

        if (this.head === this.tail) {
            const removedData = this.head.data;
            this.head = null;
            this.tail = null;
            this.size--;
            return removedData;
        }

        // Encontrar el penúltimo nodo
        let current = this.head;
        while (current.next !== this.tail) {
            current = current.next;
        }

        const removedData = this.tail.data;
        current.next = null;
        this.tail = current;
        this.size--;

        return removedData;
    }

    // Eliminar elemento en posición específica - O(n)
    removeAt(index) {
        if (index < 0 || index >= this.size) {
            return undefined;
        }

        if (index === 0) {
            return this.removeFirst();
        }

        const prevNode = this._getNodeAt(index - 1);
        const removedNode = prevNode.next;
        prevNode.next = removedNode.next;

        // Si eliminamos el último nodo
        if (removedNode === this.tail) {
            this.tail = prevNode;
        }

        this.size--;
        return removedNode.data;
    }

    reverse() {
        if (!this.head || !this.head.next) {
            // Lista vacía o con un solo elemento - no necesita reversa
            return this;
        }

        let prev = null;
        let current = this.head;
        let next = null;

        // Guardar la nueva tail antes de comenzar
        this.tail = this.head;

        // Iterar a través de la lista e invertir punteros
        while (current !== null) {
            next = current.next;    // Guardar siguiente nodo
            current.next = prev;    // Invertir puntero
            prev = current;         // Mover prev hacia adelante
            current = next;         // Mover current hacia adelante
        }

        // Actualizar head al último nodo procesado (que ahora es el primero)
        this.head = prev;

        return this;
    }

    // Eliminar por valor - O(n)
    remove(data) {
        const index = this.indexOf(data);
        if (index !== -1) {
            return this.removeAt(index);
        }
        return undefined;
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

    // Obtener longitud - O(1)
    getSize() {
        return this.size;
    }

    // Verificar si está vacía - O(1)
    isEmpty() {
        return this.size === 0;
    }

    // Limpiar lista - O(1)
    clear() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // Iterador para for...of
    *[Symbol.iterator]() {
        let current = this.head;
        while (current) {
            yield current.data;
            current = current.next;
        }
    }

    // forEach - O(n)
    forEach(callback) {
        let current = this.head;
        let index = 0;

        while (current) {
            callback(current.data, index, this);
            current = current.next;
            index++;
        }
    }

    // map - O(n)
    map(callback) {
        const newList = new SinglyLinkedList();
        this.forEach((data, index) => {
            newList.append(callback(data, index, this));
        });
        return newList;
    }

    // filter - O(n)
    filter(callback) {
        const newList = new SinglyLinkedList();
        this.forEach((data, index) => {
            if (callback(data, index, this)) {
                newList.append(data);
            }
        });
        return newList;
    }

    // find - O(n)
    find(callback) {
        let current = this.head;
        let index = 0;

        while (current) {
            if (callback(current.data, index, this)) {
                return current.data;
            }
            current = current.next;
            index++;
        }

        return undefined;
    }

    // toString - O(n)
    toString() {
        if (!this.head) return 'null';

        let result = '';
        let current = this.head;

        while (current) {
            result += current.data + ' -> ';
            current = current.next;
        }

        result += 'null';
        return result;
    }

    // Mostrar estructura interna para debugging
    debug() {
        const nodes = [];
        let current = this.head;

        while (current) {
            nodes.push({
                data: current.data,
                next: current.next ? current.next.data : null
            });
            current = current.next;
        }

        return {
            size: this.size,
            head: this.head ? this.head.data : null,
            tail: this.tail ? this.tail.data : null,
            nodes: nodes
        };
    }
}

console.log('=== Operaciones Básicas ===');

// Crear lista
const list = new SinglyLinkedList();

// Inserciones
list.append('A').append('B').append('C');
console.log('Después de append:', list.toString()); // A -> B -> C -> null

list.prepend('Z');
console.log('Después de prepend:', list.toString()); // Z -> A -> B -> C -> null

list.insert(2, 'X');
console.log('Después de insert(2, "X"):', list.toString()); // Z -> A -> X -> B -> C -> null

// Acceso
console.log('Elemento en índice 2:', list.get(2)); // X
console.log('Índice de "B":', list.indexOf('B')); // 3

// Búsqueda
console.log('Contiene "X"?', list.contains('X')); // true

// Eliminaciones
console.log('Eliminar primero:', list.removeFirst()); // Z
console.log('Después de eliminar primero:', list.toString()); // A -> X -> B -> C -> null

console.log('Eliminar último:', list.removeLast()); // C
console.log('Después de eliminar último:', list.toString()); // A -> X -> B -> null

// Iteración
console.log('=== Iteración ===');
for (const item of list) {
    console.log('Item:', item);
}

list.forEach((item, index) => {
    console.log(`Índice ${index}: ${item}`);
});

// Métodos funcionales
const doubled = list.map(item => item + item);
console.log('Map (duplicar):', doubled.toString());

const filtered = list.filter(item => item > 'A');
console.log('Filter (> A):', filtered.toString());

// Información
console.log('Tamaño:', list.getSize());
console.log('Está vacía?', list.isEmpty());

// Debug
console.log('Debug info:', list.debug());