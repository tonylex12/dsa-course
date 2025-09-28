class MyArray {
    constructor() {
        this.length = 0;
        this.data = {};
    }

    // Acceder a un elemento por índice - O(1)
    get(index) {
        // Validar índice
        if (index < 0 || index >= this.length) {
            return undefined;
        }
        return this.data[index];
    }

    // Agregar elemento al final - O(1)
    push(item) {
        this.data[this.length] = item;
        this.length++;
        return this.length;
    }

    // Remover último elemento - O(1)
    pop() {
        if (this.length === 0) {
            return undefined;
        }

        const lastItem = this.data[this.length - 1];
        delete this.data[this.length - 1];
        this.length--;
        return lastItem;
    }

    // Agregar elemento al inicio - O(n)
    unshift(item) {
        // Mover todos los elementos una posición hacia la derecha
        for (let i = this.length; i > 0; i--) {
            this.data[i] = this.data[i - 1];
        }

        this.data[0] = item;
        this.length++;
        return this.length;
    }

    // Remover primer elemento - O(n)
    shift() {
        if (this.length === 0) {
            return undefined;
        }

        const firstItem = this.data[0];

        // Mover todos los elementos una posición hacia la izquierda
        for (let i = 0; i < this.length - 1; i++) {
            this.data[i] = this.data[i + 1];
        }

        // Eliminar la última posición
        delete this.data[this.length - 1];
        this.length--;

        return firstItem;
    }

    // Insertar elemento en posición específica - O(n)
    insert(index, item) {
        // Validar índice
        if (index < 0 || index > this.length) {
            throw new Error('Index out of bounds');
        }

        // Mover elementos hacia la derecha desde la posición
        for (let i = this.length; i > index; i--) {
            this.data[i] = this.data[i - 1];
        }

        this.data[index] = item;
        this.length++;
        return this.length;
    }

    // Remover elemento en posición específica - O(n)
    remove(index) {
        // Validar índice
        if (index < 0 || index >= this.length) {
            return undefined;
        }

        const removedItem = this.data[index];

        // Mover elementos hacia la izquierda desde la posición
        for (let i = index; i < this.length - 1; i++) {
            this.data[i] = this.data[i + 1];
        }

        // Eliminar la última posición
        delete this.data[this.length - 1];
        this.length--;

        return removedItem;
    }

    // Encontrar índice de un elemento - O(n)
    indexOf(item) {
        for (let i = 0; i < this.length; i++) {
            if (this.data[i] === item) {
                return i;
            }
        }
        return -1;
    }

    // Verificar si incluye un elemento - O(n)
    includes(item) {
        return this.indexOf(item) !== -1;
    }

    // Obtener el primer elemento - O(1)
    first() {
        if (this.length === 0) {
            return undefined;
        }
        return this.data[0];
    }

    // Obtener el último elemento - O(1)
    last() {
        if (this.length === 0) {
            return undefined;
        }
        return this.data[this.length - 1];
    }

    // Vaciar el array - O(1)
    clear() {
        this.length = 0;
        this.data = {};
    }

    // Convertir a array nativo de JavaScript - O(n)
    toArray() {
        const result = [];
        for (let i = 0; i < this.length; i++) {
            result.push(this.data[i]);
        }
        return result;
    }

    // Iterador para for...of
    *[Symbol.iterator]() {
        for (let i = 0; i < this.length; i++) {
            yield this.data[i];
        }
    }

    // forEach - O(n)
    forEach(callback) {
        for (let i = 0; i < this.length; i++) {
            callback(this.data[i], i, this);
        }
    }

    // map - O(n)
    map(callback) {
        const newArray = new MyArray();
        for (let i = 0; i < this.length; i++) {
            newArray.push(callback(this.data[i], i, this));
        }
        return newArray;
    }

    // filter - O(n)
    filter(callback) {
        const newArray = new MyArray();
        for (let i = 0; i < this.length; i++) {
            if (callback(this.data[i], i, this)) {
                newArray.push(this.data[i]);
            }
        }
        return newArray;
    }

    // find - O(n)
    find(callback) {
        for (let i = 0; i < this.length; i++) {
            if (callback(this.data[i], i, this)) {
                return this.data[i];
            }
        }
        return undefined;
    }

    // reduce - O(n)
    reduce(callback, initialValue) {
        let accumulator = initialValue !== undefined ? initialValue : this.data[0];
        let startIndex = initialValue !== undefined ? 0 : 1;

        for (let i = startIndex; i < this.length; i++) {
            accumulator = callback(accumulator, this.data[i], i, this);
        }

        return accumulator;
    }

    // join - O(n)
    join(separator = ',') {
        if (this.length === 0) {
            return '';
        }

        let result = '';
        for (let i = 0; i < this.length; i++) {
            if (i > 0) {
                result += separator;
            }
            result += this.data[i];
        }
        return result;
    }

    // slice - O(n)
    slice(start = 0, end = this.length) {
        // Normalizar índices negativos
        if (start < 0) start = Math.max(0, this.length + start);
        if (end < 0) end = Math.max(0, this.length + end);

        // Limitar índices
        start = Math.max(0, Math.min(start, this.length));
        end = Math.max(0, Math.min(end, this.length));

        const newArray = new MyArray();
        for (let i = start; i < end; i++) {
            newArray.push(this.data[i]);
        }
        return newArray;
    }

    // reverse - O(n)
    reverse() {
        const newData = {};
        for (let i = 0; i < this.length; i++) {
            newData[i] = this.data[this.length - 1 - i];
        }
        this.data = newData;
        return this;
    }

    // toString - O(n)
    toString() {
        return this.join(',');
    }

    // Verificar si está vacío - O(1)
    isEmpty() {
        return this.length === 0;
    }

    // Obtener representación como string para debugging
    debug() {
        return `MyArray { length: ${this.length}, data: ${JSON.stringify(this.data)} }`;
    }
}

// 📊 **Ejemplos de uso:**

// Crear una instancia
const myArr = new MyArray();

// Operaciones básicas
console.log('=== Operaciones Básicas ===');
myArr.push('a');
myArr.push('b');
myArr.push('c');
console.log(myArr.toArray()); // ['a', 'b', 'c']

console.log('Elemento en índice 1:', myArr.get(1)); // 'b'
console.log('Primer elemento:', myArr.first()); // 'a'
console.log('Último elemento:', myArr.last()); // 'c'

// Insertar y remover
console.log('\n=== Insertar y Remover ===');
myArr.insert(1, 'x');
console.log('Después de insertar x en posición 1:', myArr.toArray()); // ['a', 'x', 'b', 'c']

myArr.unshift('z');
console.log('Después de unshift z:', myArr.toArray()); // ['z', 'a', 'x', 'b', 'c']

const removed = myArr.remove(2);
console.log('Elemento removido:', removed); // 'x'
console.log('Después de remover en posición 2:', myArr.toArray()); // ['z', 'a', 'b', 'c']

// Métodos funcionales
console.log('\n=== Métodos Funcionales ===');
const doubled = myArr.map(item => item + item);
console.log('Map (duplicar):', doubled.toArray()); // ['zz', 'aa', 'bb', 'cc']

const filtered = myArr.filter(item => item > 'a');
console.log('Filter (> a):', filtered.toArray()); // ['z', 'b', 'c']

const found = myArr.find(item => item === 'b');
console.log('Find (=== b):', found); // 'b'

const sum = myArr.reduce((acc, item) => acc + item, '');
console.log('Reduce (concatenar):', sum); // 'zabc'

// Iteración
console.log('\n=== Iteración ===');
myArr.forEach((item, index) => {
    console.log(`Índice ${index}: ${item}`);
});

// Usar for...of gracias al iterador
console.log('For...of:');
for (const item of myArr) {
    console.log(item);
}

// Otros métodos útiles
console.log('\n=== Otros Métodos ===');
console.log('Join con guión:', myArr.join('-')); // 'z-a-b-c'
console.log('Slice(1, 3):', myArr.slice(1, 3).toArray()); // ['a', 'b']
console.log('IndexOf b:', myArr.indexOf('b')); // 2
console.log('Includes z:', myArr.includes('z')); // true

// Reverse
myArr.reverse();
console.log('Después de reverse:', myArr.toArray()); // ['c', 'b', 'a', 'z']

// Limpiar
console.log('\n=== Limpiar ===');
console.log('Antes de clear - isEmpty:', myArr.isEmpty()); // false
myArr.clear();
console.log('Después de clear - isEmpty:', myArr.isEmpty()); // true
console.log('Length después de clear:', myArr.length); // 0

// 📈 **Complejidad de operaciones:**

/*
Operación           Complejidad
---------           -----------
get(index)          O(1)
push(item)          O(1)
pop()               O(1)
unshift(item)       O(n)
shift()             O(n)
insert(index, item) O(n)
remove(index)       O(n)
indexOf(item)       O(n)
includes(item)      O(n)
forEach(callback)   O(n)
map(callback)       O(n)
filter(callback)    O(n)
find(callback)      O(n)
reduce(callback)    O(n)
join(separator)     O(n)
slice(start, end)   O(n)
reverse()           O(n)
clear()             O(1)
isEmpty()           O(1)
first()             O(1)
last()              O(1)
*/

// 🎯 **Ventajas de esta implementación:**

// 1. Similitud con arrays nativos
// 2. Manejo de errores en índices
// 3. Iterador para for...of
// 4. Métodos funcionales (map, filter, reduce, etc.)
// 5. Soporte para índices negativos en slice

// ⚠️ **Limitaciones:**

// 1. No es tan optimizado como los arrays nativos de JS
// 2. Uso de objetos como almacenamiento (menos eficiente que arrays verdaderos)
// 3. No soporta todas las características avanzadas de los arrays nativos

