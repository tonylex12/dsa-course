class HashTable {
  constructor(initialCapacity = 16) {
    this.buckets = new Array(initialCapacity);
    this.size = 0;
    this.capacity = initialCapacity;
    // Factor de carga para redimensionar
    this.loadFactor = 0.75;
  }

  // Función hash simple pero efectiva
  _hash(key) {
    if (typeof key !== "string") {
      key = key.toString();
    }

    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      const char = key.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convertir a 32bit integer
    }
    return Math.abs(hash) % this.capacity;
  }

  // Redimensionar la tabla cuando el factor de carga es alto
  _resize() {
    const oldBuckets = this.buckets;
    const oldSize = this.size;

    // Duplicar la capacidad
    this.capacity *= 2;
    this.buckets = new Array(this.capacity);
    this.size = 0;

    // Reinsertar todos los elementos
    for (const bucket of oldBuckets) {
      if (bucket) {
        for (const [key, value] of bucket) {
          this.set(key, value);
        }
      }
    }
  }

  // Establecer un par clave-valor
  set(key, value) {
    // Verificar si necesitamos redimensionar
    if (this.size >= this.capacity * this.loadFactor) {
      this._resize();
    }

    const index = this._hash(key);

    // Si el bucket no existe, crearlo
    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    const bucket = this.buckets[index];

    // Buscar si la clave ya existe
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value; // Actualizar valor
        return this;
      }
    }

    // Agregar nuevo par clave-valor
    bucket.push([key, value]);
    this.size++;
    return this;
  }

  // Obtener un valor por clave
  get(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];

    if (!bucket) {
      return undefined;
    }

    for (const [k, v] of bucket) {
      if (k === key) {
        return v;
      }
    }

    return undefined;
  }

  // Verificar si una clave existe
  has(key) {
    return this.get(key) !== undefined;
  }

  // Eliminar un par clave-valor
  delete(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];

    if (!bucket) {
      return false;
    }

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  // Obtener todas las claves
  keys() {
    const keysArray = [];
    for (const bucket of this.buckets) {
      if (bucket) {
        for (const [key, value] of bucket) {
          keysArray.push(key);
        }
      }
    }
    return keysArray;
  }

  // Obtener todos los valores
  values() {
    const valuesArray = [];
    for (const bucket of this.buckets) {
      if (bucket) {
        for (const [key, value] of bucket) {
          valuesArray.push(value);
        }
      }
    }
    return valuesArray;
  }

  // Obtener todos los pares clave-valor
  entries() {
    const entriesArray = [];
    for (const bucket of this.buckets) {
      if (bucket) {
        for (const [key, value] of bucket) {
          entriesArray.push([key, value]);
        }
      }
    }
    return entriesArray;
  }

  // Limpiar la tabla
  clear() {
    this.buckets = new Array(this.capacity);
    this.size = 0;
  }

  // Obtener el factor de carga actual
  getLoadFactor() {
    return this.size / this.capacity;
  }

  // Mostrar estadísticas
  getStats() {
    let maxBucketSize = 0;
    let totalCollisions = 0;
    let occupiedBuckets = 0;

    for (const bucket of this.buckets) {
      if (bucket) {
        occupiedBuckets++;
        if (bucket.length > 1) {
          totalCollisions += bucket.length - 1;
        }
        if (bucket.length > maxBucketSize) {
          maxBucketSize = bucket.length;
        }
      }
    }

    return {
      size: this.size,
      capacity: this.capacity,
      loadFactor: this.getLoadFactor(),
      occupiedBuckets,
      emptyBuckets: this.capacity - occupiedBuckets,
      maxBucketSize,
      totalCollisions,
      collisionRate: totalCollisions / this.size,
    };
  }

  // Iterador para for...of
  *[Symbol.iterator]() {
    for (const bucket of this.buckets) {
      if (bucket) {
        for (const [key, value] of bucket) {
          yield [key, value];
        }
      }
    }
  }

  // forEach similar al de Map
  forEach(callback) {
    for (const bucket of this.buckets) {
      if (bucket) {
        for (const [key, value] of bucket) {
          callback(value, key, this);
        }
      }
    }
  }

  // Convertir a objeto para debugging
  debug() {
    const obj = {};
    for (const [key, value] of this) {
      obj[key] = value;
    }
    return obj;
  }

  // toString
  toString() {
    return JSON.stringify(this.debug());
  }
}

// 📊 **Ejemplos de uso:**

console.log("=== Creación y operaciones básicas ===");

// Crear una instancia
const hashTable = new HashTable();

// Establecer valores
hashTable.set("nombre", "Juan");
hashTable.set("edad", 25);
hashTable.set("ciudad", "Madrid");
hashTable.set("profesion", "Desarrollador");

console.log("Tabla después de insertar:", hashTable.debug());
console.log("Tamaño:", hashTable.size);

// Obtener valores
console.log("Nombre:", hashTable.get("nombre")); // 'Juan'
console.log("Edad:", hashTable.get("edad")); // 25
console.log("Inexistente:", hashTable.get("telefono")); // undefined

// Verificar existencia
console.log('Tiene "nombre"?', hashTable.has("nombre")); // true
console.log('Tiene "telefono"?', hashTable.has("telefono")); // false

console.log("\n=== Actualización de valores ===");

// Actualizar valor existente
hashTable.set("edad", 26);
console.log("Edad actualizada:", hashTable.get("edad")); // 26

console.log("\n=== Eliminación ===");

// Eliminar elementos
console.log('Eliminar "ciudad":', hashTable.delete("ciudad")); // true
console.log('Eliminar "telefono":', hashTable.delete("telefono")); // false
console.log("Tabla después de eliminar:", hashTable.debug());

console.log("\n=== Iteración ===");

// Usar forEach
hashTable.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});

// Usar for...of
console.log("For...of:");
for (const [key, value] of hashTable) {
  console.log(`${key} = ${value}`);
}

console.log("\n=== Métodos de acceso ===");

// Obtener claves, valores y entradas
console.log("Claves:", hashTable.keys());
console.log("Valores:", hashTable.values());
console.log("Entradas:", hashTable.entries());

console.log("\n=== Estadísticas de rendimiento ===");

// Estadísticas de rendimiento
console.log("Estadísticas:", hashTable.getStats());

console.log("\n=== Prueba de redimensionado ===");

// Agregar muchos elementos para forzar redimensionado
const bigTable = new HashTable(4); // Capacidad pequeña para probar
for (let i = 0; i < 20; i++) {
  bigTable.set(`key${i}`, `value${i}`);
}

console.log("Tabla grande - Estadísticas:", bigTable.getStats());
console.log("Factor de carga:", bigTable.getLoadFactor().toFixed(2));

console.log("\n=== Prueba de colisiones ===");

// Crear tabla pequeña para forzar colisiones
const smallTable = new HashTable(2);
smallTable.set("a", 1);
smallTable.set("b", 2);
smallTable.set("c", 3);
smallTable.set("d", 4);

console.log("Tabla pequeña - Debug:", smallTable.debug());
console.log("Tabla pequeña - Estadísticas:", smallTable.getStats());

console.log("\n=== Limpiar tabla ===");

hashTable.clear();
console.log("Después de clear - Tamaño:", hashTable.size);
console.log("Después de clear - Vacía?", hashTable.size === 0);

// 📈 **Complejidad de operaciones:**

/*
Operación                   Promedio    Peor caso
---------                   --------    ---------
set(key, value)             O(1)        O(n)
get(key)                    O(1)        O(n)
has(key)                    O(1)        O(n)
delete(key)                 O(1)        O(n)
keys()                      O(n)        O(n)
values()                    O(n)        O(n)
entries()                   O(n)        O(n)
clear()                     O(1)        O(1)
forEach(callback)           O(n)        O(n)
getStats()                  O(n)        O(n)
*/

// 🎯 **Características de esta implementación:**

// ✅ Ventajas:
// 1. Redimensionado automático basado en factor de carga
// 2. Manejo de colisiones por encadenamiento (chaining)
// 3. Función hash robusta
// 4. Iteradores para for...of y forEach
// 5. Métodos de estadísticas para análisis de rendimiento
// 6. Soporte para claves de diferentes tipos
// 7. Interfaz similar a Map nativo de JavaScript

// ⚠️ Consideraciones:
// 1. En el peor caso (muchas colisiones), las operaciones pueden ser O(n)
// 2. Uso de arrays para buckets (alternativa: listas enlazadas)
// 3. Factor de carga fijo (podría ser configurable)

// 🔧 **Casos de uso ideales:**
// - Cache de datos
// - Índices de base de datos
// - Contadores de frecuencia
// - Mapeo de identificadores
// - Implementación de conjuntos (sets)
