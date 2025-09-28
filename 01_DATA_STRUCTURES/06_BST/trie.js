// Esta implementación de Trie es eficiente para la mayoría de los casos de uso:
// - Inserción, búsqueda y prefijos: O(m), donde m es la longitud de la palabra/prefijo.
// - Espacio: proporcional al número total de caracteres insertados.
// - Para la mayoría de aplicaciones prácticas (autocompletado, diccionarios, correctores),
//   este diseño es el estándar y no hay una estructura más eficiente para búsquedas de prefijos.
// - Mejoras avanzadas (como compresión de nodos, DAWG, ternary tries) solo son necesarias para casos de uso muy grandes o específicos.

// Ejemplo de uso al final del archivo.

class TrieNode {
  constructor() {
    this.children = {}; // Mapa de caracteres a nodos hijos
    this.isEndOfWord = false; // Indica si es el final de una palabra
    this.wordCount = 0; // Número de palabras que terminan aquí
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // Insertar una palabra - O(m) donde m es la longitud de la palabra
  insert(word) {
    if (!word || typeof word !== "string") return false;

    let current = this.root;
    word = word.toLowerCase(); // Normalizar a minúsculas

    // Recorrer cada carácter de la palabra
    for (let char of word) {
      // Crear nodo si no existe
      if (!current.children[char]) {
        current.children[char] = new TrieNode();
      }
      current = current.children[char];
    }

    // Marcar como fin de palabra
    current.isEndOfWord = true;
    current.wordCount++;
    return true;
  }

  // Buscar una palabra exacta - O(m)
  search(word) {
    if (!word || typeof word !== "string") return false;

    let current = this.root;
    word = word.toLowerCase();

    // Recorrer cada carácter
    for (let char of word) {
      if (!current.children[char]) {
        return false; // Carácter no encontrado
      }
      current = current.children[char];
    }

    // Verificar si es fin de palabra
    return current.isEndOfWord;
  }

  // Verificar si existe un prefijo - O(m)
  startsWith(prefix) {
    if (!prefix || typeof prefix !== "string") return false;

    let current = this.root;
    prefix = prefix.toLowerCase();

    // Recorrer cada carácter del prefijo
    for (let char of prefix) {
      if (!current.children[char]) {
        return false; // Prefijo no encontrado
      }
      current = current.children[char];
    }

    return true; // Prefijo encontrado
  }

  // Contar ocurrencias de una palabra - O(m)
  count(word) {
    if (!word || typeof word !== "string") return 0;

    let current = this.root;
    word = word.toLowerCase();

    for (let char of word) {
      if (!current.children[char]) {
        return 0;
      }
      current = current.children[char];
    }

    return current.wordCount;
  }

  // Eliminar una palabra - O(m)
  delete(word) {
    if (!word || typeof word !== "string") return false;

    return this._deleteHelper(this.root, word.toLowerCase(), 0);
  }

  _deleteHelper(current, word, index) {
    // Caso base: llegamos al final de la palabra
    if (index === word.length) {
      // Si no es fin de palabra, no existe
      if (!current.isEndOfWord) {
        return false;
      }

      // Marcar como no fin de palabra
      current.isEndOfWord = false;
      current.wordCount = 0;

      // Retornar true si no tiene hijos (puede ser eliminado)
      return Object.keys(current.children).length === 0;
    }

    const char = word[index];
    const node = current.children[char];

    if (!node) {
      return false; // Nodo no existe
    }

    // Recursión
    const shouldDeleteCurrentNode = this._deleteHelper(node, word, index + 1);

    // Si el nodo hijo debe ser eliminado
    if (shouldDeleteCurrentNode) {
      delete current.children[char];

      // Retornar true si no es fin de palabra y no tiene otros hijos
      return !current.isEndOfWord && Object.keys(current.children).length === 0;
    }

    return false;
  }

  // Obtener todas las palabras con un prefijo - O(p + n) donde p=longitud prefijo, n=total resultados
  getWordsWithPrefix(prefix) {
    if (!prefix || typeof prefix !== "string") return [];
    const result = [];
    let current = this.root;
    prefix = prefix.toLowerCase();

    // Encontrar el nodo del prefijo
    for (let char of prefix) {
      if (!current.children[char]) {
        return result; // Prefijo no encontrado
      }
      current = current.children[char];
    }

    // Recopilar todas las palabras desde este punto
    this._getWordsFromNode(current, prefix, result);
    return result;
  }

  _getWordsFromNode(node, prefix, result) {
    if (node.isEndOfWord) {
      result.push(prefix);
    }

    // Recorrer todos los hijos
    for (let char in node.children) {
      this._getWordsFromNode(node.children[char], prefix + char, result);
    }
  }

  // Autocompletar - obtener sugerencias - O(p + n)
  autocomplete(prefix, limit = 10) {
    const words = this.getWordsWithPrefix(prefix);
    return words.slice(0, limit);
  }

  // Obtener todas las palabras del trie - O(total caracteres)
  getAllWords() {
    return this.getWordsWithPrefix("");
  }

  // Verificar si el trie está vacío - O(1)
  isEmpty() {
    return Object.keys(this.root.children).length === 0;
  }

  // Obtener el número total de palabras - O(total nodos)
  getTotalWords() {
    return this._countWords(this.root);
  }

  _countWords(node) {
    let count = node.isEndOfWord ? node.wordCount : 0;

    for (let char in node.children) {
      count += this._countWords(node.children[char]);
    }

    return count;
  }

  // Imprimir el trie de forma visual
  print() {
    console.log("=== Trie Structure ===");
    this._printNode(this.root, "", true);
  }

  _printNode(node, prefix, isLast) {
    if (node !== this.root) {
      const marker = node.isEndOfWord ? "*" : "";
      console.log(
        prefix + (isLast ? "└── " : "├── ") + prefix.split("").pop() + marker
      );
    }

    const children = Object.keys(node.children);
    children.forEach((char, index) => {
      const isLastChild = index === children.length - 1;
      const newPrefix =
        prefix + (node !== this.root ? (isLast ? "    " : "│   ") : "");
      this._printNode(node.children[char], newPrefix, isLastChild);
    });
  }

  // Imprimir palabras ordenadas
  printWords() {
    const words = this.getAllWords();
    console.log("=== Words in Trie ===");
    words.forEach((word, index) => {
      console.log(`${index + 1}. ${word}`);
    });
  }
}

// ================= Ejemplos de uso =================

// Crear un nuevo trie
const trie = new Trie();

// Insertar palabras
trie.insert("hola");
trie.insert("holanda");
trie.insert("holas");
trie.insert("hotel");
trie.insert("hoyo");
trie.insert("hormiga");
trie.insert("hormigón");
trie.insert("héroe");
trie.insert("hermano");
trie.insert("hermana");
trie.insert("hermoso");
trie.insert("hola"); // Insertar repetido

console.log("¿Existe 'hola'?", trie.search("hola")); // true
console.log("¿Existe 'holanda'?", trie.search("holanda")); // true
console.log("¿Existe 'hormiga'?", trie.search("hormiga")); // true
console.log("¿Existe 'hormigas'?", trie.search("hormigas")); // false
console.log("¿Prefijo 'her'?", trie.startsWith("her")); // true
console.log("¿Prefijo 'ho'?", trie.startsWith("ho")); // true
console.log("¿Prefijo 'hu'?", trie.startsWith("hu")); // false

console.log("Ocurrencias de 'hola':", trie.count("hola")); // 2
console.log("Ocurrencias de 'hermana':", trie.count("hermana")); // 1

console.log("\nPalabras con prefijo 'ho':", trie.getWordsWithPrefix("ho"));
console.log("Palabras con prefijo 'her':", trie.getWordsWithPrefix("her"));
console.log("Palabras con prefijo 'horm':", trie.getWordsWithPrefix("horm"));

console.log("\nAutocompletar 'her' (máx 3):", trie.autocomplete("her", 3));

console.log("\nTodas las palabras en el trie:", trie.getAllWords());
console.log("Total de palabras en el trie:", trie.getTotalWords());

console.log("\n¿El trie está vacío?", trie.isEmpty());

console.log("\nEstructura visual del trie:");
trie.print();

console.log("\nPalabras ordenadas:");
trie.printWords();

// Eliminar una palabra
console.log("\nEliminar 'holas':", trie.delete("holas"));
console.log("¿Existe 'holas' después de eliminar?", trie.search("holas"));
console.log(
  "Palabras con prefijo 'ho' tras eliminar:",
  trie.getWordsWithPrefix("ho")
);

// 🚀 **Ejemplo adicional: Sistema de autocompletado**

console.log("\n=== Caso de uso: Sistema de autocompletado ===");

class AutocompleteSystem {
  constructor() {
    this.trie = new Trie();
  }

  addWord(word) {
    this.trie.insert(word);
    console.log(`Palabra "${word}" agregada al diccionario`);
  }

  getSuggestions(prefix, maxSuggestions = 5) {
    return this.trie.autocomplete(prefix, maxSuggestions);
  }

  isValidWord(word) {
    return this.trie.search(word);
  }

  getWordFrequency(word) {
    return this.trie.count(word);
  }
}

const autocomplete = new AutocompleteSystem();

// Agregar palabras de programación
[
  "javascript",
  "java",
  "python",
  "programming",
  "program",
  "project",
  "product",
].forEach((word) => {
  autocomplete.addWord(word);
});

console.log("\nSugerencias para 'prog':", autocomplete.getSuggestions("prog"));
console.log("Sugerencias para 'java':", autocomplete.getSuggestions("java"));
console.log(
  "¿Es 'python' una palabra válida?",
  autocomplete.isValidWord("python")
);
console.log("¿Es 'ruby' una palabra válida?", autocomplete.isValidWord("ruby"));

// 📈 **Complejidad de operaciones:**

/*
Operación                   Complejidad
---------                   -----------
insert(word)                O(m) - m = longitud palabra
search(word)                O(m) - m = longitud palabra
startsWith(prefix)          O(m) - m = longitud prefijo
count(word)                 O(m) - m = longitud palabra
delete(word)                O(m) - m = longitud palabra
getWordsWithPrefix(prefix)  O(p + n) - p = longitud prefijo, n = total resultados
autocomplete(prefix)        O(p + n) - p = longitud prefijo, n = total resultados
getAllWords()               O(total caracteres en trie)
isEmpty()                   O(1)
getTotalWords()             O(total nodos en trie)
print()                     O(total nodos en trie)
printWords()                O(total palabras en trie)
*/

// 🎯 **Ventajas del Trie:**
// ✅ Búsqueda de prefijos muy eficiente: O(m)
// ✅ Autocompletado rápido
// ✅ Comparte prefijos comunes (ahorro de memoria)
// ✅ Inserción y eliminación eficientes
// ✅ Ideal para diccionarios y correctores ortográficos

// ⚠️ **Desventajas:**
// ❌ Uso de memoria alto para pocas palabras
// ❌ No es eficiente para buscar palabras que no comparten prefijos
// ❌ Complejidad de implementación mayor que hash table

// 🔧 **Casos de uso ideales:**
// - Autocompletado en motores de búsqueda
// - Correctores ortográficos
// - Sistemas de sugerencias
// - Validación de palabras en juegos (Scrabble, crucigramas)
// - Parsers y compiladores (análisis léxico)
// - Sistemas de routing en redes
