class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null; // Hijos menores
    this.right = null; // Hijos mayores
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Insertar un valor - O(log n) promedio, O(n) peor caso
  insert(data) {
    this.root = this._insertNode(this.root, data);
  }

  _insertNode(node, data) {
    // Caso base: insertar nuevo nodo
    if (node === null) {
      return new TreeNode(data);
    }

    // Insertar en subárbol izquierdo (menor)
    if (data < node.data) {
      node.left = this._insertNode(node.left, data);
    }
    // Insertar en subárbol derecho (mayor)
    else if (data > node.data) {
      node.right = this._insertNode(node.right, data);
    }
    // Si data === node.data, no insertamos duplicados

    return node;
  }

  // Buscar un valor - O(log n) promedio, O(n) peor caso
  search(data) {
    return this._searchNode(this.root, data);
  }

  _searchNode(node, data) {
    // Caso base: no encontrado o encontrado
    if (node === null) {
      return false;
    }

    if (data === node.data) {
      return true;
    }

    // Buscar en subárbol izquierdo (menor)
    if (data < node.data) {
      return this._searchNode(node.left, data);
    }
    // Buscar en subárbol derecho (mayor)
    else {
      return this._searchNode(node.right, data);
    }
  }

  // Encontrar el valor mínimo - O(log n) promedio, O(n) peor caso
  findMin() {
    if (this.root === null) return null;
    return this._findMinNode(this.root).data;
  }

  _findMinNode(node) {
    // El mínimo está en el nodo más a la izquierda
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  // Encontrar el valor máximo - O(log n) promedio, O(n) peor caso
  findMax() {
    if (this.root === null) return null;
    return this._findMaxNode(this.root).data;
  }

  _findMaxNode(node) {
    // El máximo está en el nodo más a la derecha
    while (node.right !== null) {
      node = node.right;
    }
    return node;
  }

  // Eliminar un valor - O(log n) promedio, O(n) peor caso
  remove(data) {
    this.root = this._removeNode(this.root, data);
  }

  _removeNode(node, data) {
    // Caso base: nodo no encontrado
    if (node === null) {
      return null;
    }

    // Buscar el nodo a eliminar
    if (data < node.data) {
      node.left = this._removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this._removeNode(node.right, data);
      return node;
    } else {
      // Nodo encontrado - casos de eliminación

      // Caso 1: Nodo sin hijos (hoja)
      if (node.left === null && node.right === null) {
        return null;
      }

      // Caso 2: Nodo con un hijo
      if (node.left === null) {
        return node.right;
      }
      if (node.right === null) {
        return node.left;
      }

      // Caso 3: Nodo con dos hijos
      // Encontrar el sucesor (mínimo del subárbol derecho)
      const successor = this._findMinNode(node.right);
      node.data = successor.data;
      node.right = this._removeNode(node.right, successor.data);
      return node;
    }
  }

  // Recorridos (mismos que binary tree)

  // In-order: Izquierda → Raíz → Derecha - O(n)
  inOrder(node = this.root, result = []) {
    if (node !== null) {
      this.inOrder(node.left, result);
      result.push(node.data);
      this.inOrder(node.right, result);
    }
    return result;
  }

  // Pre-order: Raíz → Izquierda → Derecha - O(n)
  preOrder(node = this.root, result = []) {
    if (node !== null) {
      result.push(node.data);
      this.preOrder(node.left, result);
      this.preOrder(node.right, result);
    }
    return result;
  }

  // Post-order: Izquierda → Derecha → Raíz - O(n)
  postOrder(node = this.root, result = []) {
    if (node !== null) {
      this.postOrder(node.left, result);
      this.postOrder(node.right, result);
      result.push(node.data);
    }
    return result;
  }

  // Verificar si el árbol es válido BST - O(n)
  isValidBST() {
    return this._validateBST(this.root, null, null);
  }

  _validateBST(node, min, max) {
    if (node === null) return true;

    if (
      (min !== null && node.data <= min) ||
      (max !== null && node.data >= max)
    ) {
      return false;
    }

    return (
      this._validateBST(node.left, min, node.data) &&
      this._validateBST(node.right, node.data, max)
    );
  }

  // Obtener altura - O(n)
  getHeight(node = this.root) {
    if (node === null) return -1;

    return Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
  }

  // Verificar si está vacío - O(1)
  isEmpty() {
    return this.root === null;
  }

  // Imprimir el árbol por niveles, alineado horizontalmente
  printTree() {
    if (!this.root) {
      console.log("Árbol vacío");
      return;
    }
    const levels = [];
    let queue = [{ node: this.root, pos: 0 }];
    let maxLevel = this.getHeight();
    let maxNodes = Math.pow(2, maxLevel + 1) - 1;
    for (let level = 0; level <= maxLevel; level++) {
      const levelNodes = [];
      const nextQueue = [];
      for (let i = 0; i < queue.length; i++) {
        const { node, pos } = queue[i];
        if (node) {
          levelNodes[pos] = node.data.toString();
          nextQueue.push({ node: node.left, pos: pos * 2 });
          nextQueue.push({ node: node.right, pos: pos * 2 + 1 });
        } else {
          levelNodes[pos] = " ";
          nextQueue.push({ node: null, pos: pos * 2 });
          nextQueue.push({ node: null, pos: pos * 2 + 1 });
        }
      }
      // Rellenar espacios vacíos
      for (let i = 0; i < maxNodes; i++) {
        if (levelNodes[i] === undefined) levelNodes[i] = " ";
      }
      levels.push(levelNodes);
      queue = nextQueue;
    }
    // Imprimir cada nivel con espaciado proporcional
    for (let l = 0; l < levels.length; l++) {
      const nodes = levels[l];
      const spaces = Math.pow(2, maxLevel - l + 1) - 1;
      let line = "";
      for (let n = 0; n < nodes.length; n++) {
        line += " ".repeat(spaces) + nodes[n] + " ".repeat(spaces);
      }
      // Eliminar espacios extra al final
      console.log(line.trimEnd());
    }
  }
}

console.log("=== Binary Search Tree ===");

const bst = new BinarySearchTree();

// Insertar valores
console.log("1. Insertar valores:");
[50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45].forEach((data) => {
  bst.insert(data);
  console.log(`Insertado: ${data}`);
});

// Mostrar visualización del árbol
console.log("\nVisualización del árbol:");
bst.printTree();

// Visualización del árbol:
//         50
//       /    \
//      30      70
//     /  \    /  \
//    20   40 60   80
//   / \   / \
//  10 25 35 45

// Búsquedas
console.log("\n2. Búsquedas:");
console.log("Buscar 40:", bst.search(40)); // true
console.log("Buscar 100:", bst.search(100)); // false

// Valores extremos
console.log("\n3. Valores extremos:");
console.log("Mínimo:", bst.findMin()); // 10
console.log("Máximo:", bst.findMax()); // 80

// Recorridos
console.log("\n4. Recorridos:");
console.log("In-order (ordenado):", bst.inOrder()); // [10,20,25,30,35,40,45,50,60,70,80]
console.log("Pre-order:", bst.preOrder()); // [50,30,20,10,25,40,35,45,70,60,80]
console.log("Post-order:", bst.postOrder()); // [10,25,20,35,45,40,30,60,80,70,50]

// Eliminaciones
console.log("\n5. Eliminaciones:");
console.log("Eliminar 20 (un hijo):");
bst.remove(20);
console.log("In-order después:", bst.inOrder());

console.log("Eliminar 30 (dos hijos):");
bst.remove(30);
console.log("In-order después:", bst.inOrder());

// Propiedades
console.log("\n6. Propiedades:");
console.log("Es válido BST:", bst.isValidBST()); // true
console.log("Altura:", bst.getHeight()); // 3
console.log("Está vacío:", bst.isEmpty()); // false
