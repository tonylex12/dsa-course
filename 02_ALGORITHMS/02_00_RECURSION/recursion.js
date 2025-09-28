// EJEMPLOS SIMPLES DE RECURSIÓN

// 1. FACTORIAL - Ejemplo clásico de recursión
// factorial(n) = n * factorial(n-1)
// Caso base: factorial(0) = 1
function factorial(n) {
  // Caso base: detiene la recursión
  if (n === 0 || n === 1) {
    return 1;
  }

  // Caso recursivo: la función se llama a sí misma
  return n * factorial(n - 1);
}

console.log("=== FACTORIAL ===");
console.log("factorial(5):", factorial(5)); // 120
console.log("factorial(4):", factorial(4)); // 24
console.log("factorial(3):", factorial(3)); // 6
console.log("factorial(0):", factorial(0)); // 1

// VERSIÓN ITERATIVA (FOR LOOP) - MÁS EFICIENTE
function factorialFor(n) {
  if (n === 0 || n === 1) return 1;

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

console.log("\n=== COMPARACIÓN: RECURSIÓN vs FOR LOOP ===");
console.log("Factorial de 5:");
console.log("  Recursión:", factorial(5));
console.log("  For loop: ", factorialFor(5));

console.log("\nFactorial de 20:");
console.log("  Recursión:", factorial(20));
console.log("  For loop: ", factorialFor(20));

console.log(`
📊 ANÁLISIS DE EFICIENCIA - FACTORIAL:

RECURSIÓN - factorial(n):
• Complejidad temporal: O(n) - n llamadas recursivas
• Complejidad espacial: O(n) - n stack frames en memoria
• Limitación: Stack overflow con n ≈ 10,000+
• Velocidad: Más lenta (overhead de llamadas)

FOR LOOP - factorialFor(n):
• Complejidad temporal: O(n) - n iteraciones
• Complejidad espacial: O(1) - solo una variable
• Sin limitaciones: funciona con cualquier n
• Velocidad: Más rápida (ejecución directa)

🏆 GANADOR: FOR LOOP
✅ Más eficiente en memoria
✅ Más rápido
✅ Sin riesgo de stack overflow
✅ Más escalable
`);

// 2. SUMA DE NÚMEROS CONSECUTIVOS
// suma(n) = n + suma(n-1)
// Caso base: suma(1) = 1
function sumaConsecutiva(n) {
  // Caso base
  if (n === 1) {
    return 1;
  }

  // Caso recursivo
  return n + sumaConsecutiva(n - 1);
}

console.log("\n=== SUMA CONSECUTIVA ===");
console.log("sumaConsecutiva(5):", sumaConsecutiva(5)); // 15 (5+4+3+2+1)
console.log("sumaConsecutiva(10):", sumaConsecutiva(10)); // 55

// COMPARACIÓN: RECURSIÓN vs FÓRMULA MATEMÁTICA
// Fórmula de Gauss: n * (n + 1) / 2
function sumaFormula(n) {
  return (n * (n + 1)) / 2;
}

console.log("\n=== COMPARACIÓN: RECURSIÓN vs FÓRMULA ===");
console.log("Para n = 5:");
console.log("  Recursión:", sumaConsecutiva(5));
console.log("  Fórmula:  ", sumaFormula(5));

console.log("\nPara n = 100:");
console.log("  Recursión:", sumaConsecutiva(100));
console.log("  Fórmula:  ", sumaFormula(100));

console.log("\nPara n = 1000:");
console.log("  Fórmula:  ", sumaFormula(1000));
// console.log("  Recursión:", sumaConsecutiva(1000)); // ¡Esto causaría stack overflow!

console.log(`
📊 ANÁLISIS DE EFICIENCIA:

RECURSIÓN - sumaConsecutiva(n):
• Complejidad temporal: O(n) - necesita n llamadas recursivas
• Complejidad espacial: O(n) - cada llamada usa memoria en el stack
• Limitación: Stack overflow con números grandes (≈1000+ en JS)
• Ejemplo: para n=5 hace 5 llamadas recursivas

FÓRMULA MATEMÁTICA - sumaFormula(n):
• Complejidad temporal: O(1) - solo una operación matemática
• Complejidad espacial: O(1) - no usa memoria extra
• Sin limitaciones: funciona con cualquier número
• Ejemplo: para n=5 hace solo 1 cálculo: (5 * 6) / 2 = 15

🎯 CONCLUSIÓN:
La fórmula es MUCHO más eficiente, pero la recursión nos ayuda a
entender el concepto y es útil en problemas donde no existe una fórmula directa.
`);

// 3. POTENCIA (base^exponente)
// potencia(base, exp) = base * potencia(base, exp-1)
// Caso base: potencia(base, 0) = 1
function potencia(base, exponente) {
  // Caso base
  if (exponente === 0) {
    return 1;
  }

  // Caso recursivo
  return base * potencia(base, exponente - 1);
}

console.log("\n=== POTENCIA ===");
console.log("potencia(2, 3):", potencia(2, 3)); // 8
console.log("potencia(5, 2):", potencia(5, 2)); // 25
console.log("potencia(3, 4):", potencia(3, 4)); // 81

// 4. CONTEO REGRESIVO
// Una función recursiva simple que cuenta hacia atrás
function cuentaRegresiva(n) {
  // Caso base
  if (n === 0) {
    console.log("¡Despegue! 🚀");
    return;
  }

  // Imprime el número actual
  console.log(n);

  // Caso recursivo
  cuentaRegresiva(n - 1);
}

console.log("\n=== CUENTA REGRESIVA ===");
cuentaRegresiva(5);

// 🎯 EJEMPLOS REALES DONDE LA RECURSIÓN ES LA MEJOR SOLUCIÓN

// 1. RECORRER ÁRBOL DE ARCHIVOS/DIRECTORIOS
// Este es un problema que naturalmente requiere recursión
function explorarDirectorio(directorio, nivel = 0) {
  const espacios = "  ".repeat(nivel); // Indentación

  // Caso base implícito: cuando no hay más subdirectorios
  console.log(espacios + "📁 " + directorio.nombre);

  // Procesar archivos en este directorio
  if (directorio.archivos) {
    directorio.archivos.forEach((archivo) => {
      console.log(espacios + "  📄 " + archivo);
    });
  }

  // Caso recursivo: explorar subdirectorios
  if (directorio.subdirectorios) {
    directorio.subdirectorios.forEach((subdir) => {
      explorarDirectorio(subdir, nivel + 1); // Recursión natural
    });
  }
}

// Estructura de ejemplo
const sistemaArchivos = {
  nombre: "proyecto",
  archivos: ["index.js", "package.json"],
  subdirectorios: [
    {
      nombre: "src",
      archivos: ["app.js", "utils.js"],
      subdirectorios: [
        {
          nombre: "components",
          archivos: ["Header.js", "Footer.js"],
          subdirectorios: [],
        },
      ],
    },
    {
      nombre: "tests",
      archivos: ["app.test.js"],
      subdirectorios: [],
    },
  ],
};

console.log("\n=== EXPLORAR SISTEMA DE ARCHIVOS ===");
explorarDirectorio(sistemaArchivos);

// 2. BÚSQUEDA BINARIA - Algoritmo O(log n) naturalmente recursivo
function busquedaBinaria(array, objetivo, inicio = 0, fin = array.length - 1) {
  // Caso base: no encontrado
  if (inicio > fin) {
    return -1;
  }

  const medio = Math.floor((inicio + fin) / 2);

  // Caso base: encontrado
  if (array[medio] === objetivo) {
    return medio;
  }

  // Caso recursivo: buscar en la mitad correspondiente
  if (objetivo < array[medio]) {
    return busquedaBinaria(array, objetivo, inicio, medio - 1);
  } else {
    return busquedaBinaria(array, objetivo, medio + 1, fin);
  }
}

console.log("\n=== BÚSQUEDA BINARIA ===");
const arrayOrdenado = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
console.log("Array:", arrayOrdenado);
console.log("Buscar 7:", busquedaBinaria(arrayOrdenado, 7));
console.log("Buscar 15:", busquedaBinaria(arrayOrdenado, 15));
console.log("Buscar 4:", busquedaBinaria(arrayOrdenado, 4)); // No existe

// 3. RESOLVER LABERINTO (Backtracking)
// Este problema es imposible de resolver eficientemente sin recursión
function resolverLaberinto(laberinto, x, y, camino = []) {
  const filas = laberinto.length;
  const columnas = laberinto[0].length;

  // Casos base
  if (x < 0 || x >= filas || y < 0 || y >= columnas) return false; // Fuera de límites
  if (laberinto[x][y] === 1) return false; // Pared
  if (laberinto[x][y] === 2) return false; // Ya visitado
  if (x === filas - 1 && y === columnas - 1) {
    camino.push([x, y]);
    return true; // ¡Llegamos al final!
  }

  // Marcar como visitado
  laberinto[x][y] = 2;
  camino.push([x, y]);

  // Caso recursivo: probar las 4 direcciones
  if (
    resolverLaberinto(laberinto, x + 1, y, camino) || // Abajo
    resolverLaberinto(laberinto, x, y + 1, camino) || // Derecha
    resolverLaberinto(laberinto, x - 1, y, camino) || // Arriba
    resolverLaberinto(laberinto, x, y - 1, camino)
  ) {
    // Izquierda
    return true;
  }

  // Backtrack: desmarcar y quitar del camino
  laberinto[x][y] = 0;
  camino.pop();
  return false;
}

console.log("\n=== RESOLVER LABERINTO ===");
// 0 = libre, 1 = pared, inicio = [0,0], fin = [3,3]
const laberinto = [
  [0, 1, 0, 0],
  [0, 1, 0, 1],
  [0, 0, 0, 1],
  [1, 0, 0, 0],
];

const laberintoCopia = laberinto.map((fila) => [...fila]); // Copia para no modificar original
const camino = [];
const resuelto = resolverLaberinto(laberintoCopia, 0, 0, camino);

console.log("Laberinto original:");
laberinto.forEach((fila) => console.log(fila.join(" ")));
console.log("¿Tiene solución?", resuelto);
if (resuelto) {
  console.log("Camino encontrado:", camino);
}

console.log(`
🎯 ¿POR QUÉ ESTOS EJEMPLOS REQUIEREN RECURSIÓN?

1. EXPLORAR DIRECTORIOS:
   • Estructura jerárquica de profundidad variable
   • Cada subdirectorio puede tener más subdirectorios
   • Versión iterativa sería muy compleja (necesitaría stacks manuales)

2. BÚSQUEDA BINARIA:
   • Algoritmo "divide y vencerás" natural
   • Cada paso reduce el problema a la mitad
   • O(log n) - más eficiente que búsqueda lineal O(n)

3. RESOLVER LABERINTO (Backtracking):
   • Necesita explorar múltiples caminos
   • Debe "volver atrás" cuando encuentra callejón sin salida
   • Imposible con loops simples - requiere stack implícito

🏆 VENTAJAS DE LA RECURSIÓN EN ESTOS CASOS:
✅ Código más claro y entendible
✅ Manejo natural de estructuras jerárquicas
✅ Backtracking automático
✅ Divide y vencerás natural
✅ Menos código que versiones iterativas
`);

// 5. FIBONACCI - Otro ejemplo clásico
// fibonacci(n) = fibonacci(n-1) + fibonacci(n-2)
// Casos base: fibonacci(0) = 0, fibonacci(1) = 1
function fibonacci(n) {
  // Casos base
  if (n === 0) return 0;
  if (n === 1) return 1;

  // Caso recursivo
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// FIBONACCI OPTIMIZADO con Memoización - O(n) en lugar de O(2^n)
function fibonacciRapido(n, memo = {}) {
  // Si ya calculamos este valor, lo devolvemos inmediatamente
  if (n in memo) return memo[n];

  // Casos base
  if (n === 0) return 0;
  if (n === 1) return 1;

  // Calculamos y guardamos en memoria para evitar recálculos
  memo[n] = fibonacciRapido(n - 1, memo) + fibonacciRapido(n - 2, memo);
  return memo[n];
}

// FIBONACCI ITERATIVO - La versión más eficiente O(n) sin recursión
function fibonacciIterativo(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  let a = 0,
    b = 1,
    temp;
  for (let i = 2; i <= n; i++) {
    temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}

console.log("\n=== FIBONACCI ===");
console.log("fibonacci(0):", fibonacci(0)); // 0
console.log("fibonacci(1):", fibonacci(1)); // 1
console.log("fibonacci(5):", fibonacci(5)); // 5
console.log("fibonacci(8):", fibonacci(8)); // 21

console.log("\n=== COMPARACIÓN DE FIBONACCI: LENTO vs RÁPIDO ===");
console.log("Para n = 10:");
console.log("  Fibonacci lento (O(2^n)):", fibonacci(10));
console.log("  Fibonacci rápido (O(n)):", fibonacciRapido(10));
console.log("  Fibonacci iterativo (O(n)):", fibonacciIterativo(10));

console.log("\nPara n = 20:");
console.log(
  "  Fibonacci lento (O(2^n)):",
  fibonacci(20),
  "- Tarda varios segundos"
);
console.log("  Fibonacci rápido (O(n)):", fibonacciRapido(20), "- Instantáneo");
console.log(
  "  Fibonacci iterativo (O(n)):",
  fibonacciIterativo(20),
  "- Instantáneo"
);

console.log("\nPara n = 40:");
console.log("  Fibonacci rápido (O(n)):", fibonacciRapido(40));
console.log("  Fibonacci iterativo (O(n)):", fibonacciIterativo(40));
// console.log("  Fibonacci lento (O(2^n)):", fibonacci(40)); // ¡Esto tardaría varios minutos!

console.log(`
📊 ANÁLISIS DE EFICIENCIA - FIBONACCI:

FIBONACCI LENTO (recursión ingenua):
• Complejidad temporal: O(2^n) - EXPONENCIAL
• Complejidad espacial: O(n) - profundidad del stack
• Problema: Recalcula los mismos valores múltiples veces
• fibonacci(40) = 2,692,537,351 llamadas recursivas! 😱

FIBONACCI RÁPIDO (recursión + memoización):
• Complejidad temporal: O(n) - cada valor se calcula una sola vez
• Complejidad espacial: O(n) - memo + stack recursivo
• Solución: Guarda resultados en memoria (memo)
• fibonacci(40) = solo 79 llamadas recursivas! 🚀

FIBONACCI ITERATIVO (loop):
• Complejidad temporal: O(n) - n iteraciones
• Complejidad espacial: O(1) - solo 3 variables
• Más eficiente en memoria, sin recursión
• fibonacci(40) = 40 iteraciones simples

🏆 LECCIÓN CLAVE:
La memoización transforma O(2^n) → O(n)
¡Un simple objeto {} puede hacer milagros de optimización!

🎯 CUÁNDO USAR CADA UNO:
• Fibonacci lento: NUNCA en producción (solo educativo)
• Fibonacci rápido: Cuando necesitas recursión + optimización
• Fibonacci iterativo: La opción más eficiente para este problema
`);

// Secuencia completa hasta n=10
console.log("\nSecuencia Fibonacci:");
for (let i = 0; i <= 10; i++) {
  console.log(`fibonacci(${i}): ${fibonacci(i)}`);
}

// 6. CONCEPTO CLAVE DE LA RECURSIÓN
console.log("\n=== CONCEPTOS CLAVE ===");
console.log(`
RECURSIÓN: Una función que se llama a sí misma

Elementos esenciales:
1. CASO BASE: Condición que detiene la recursión
2. CASO RECURSIVO: La función se llama a sí misma con argumentos modificados

Ejemplo del factorial:
factorial(4) = 4 * factorial(3)
factorial(3) = 3 * factorial(2)
factorial(2) = 2 * factorial(1)
factorial(1) = 1  ← CASO BASE

Resolviendo hacia atrás:
factorial(1) = 1
factorial(2) = 2 * 1 = 2
factorial(3) = 3 * 2 = 6
factorial(4) = 4 * 6 = 24
`);

// ✅ ANATOMÍA DE UNA FUNCIÓN RECURSIVA
console.log("\n=== ANATOMÍA DE UNA FUNCIÓN RECURSIVA ===");
console.log(`
🎯 TU OBSERVACIÓN ES 100% CORRECTA:

1. CASO BASE (OBLIGATORIO):
   • Condición que DETIENE la recursión
   • Evita el bucle infinito (stack overflow)
   • SIEMPRE debe retornar un valor específico
   • Ejemplo: if (n === 0) return 1;

2. CASO RECURSIVO (OBLIGATORIO):
   • La función se llama a sí misma
   • Los parámetros DEBEN modificarse hacia el caso base
   • Ejemplo: return n * factorial(n - 1);

3. RETURN (SI ES NECESARIO):
   • Si la función debe devolver un valor: SÍ es obligatorio
   • Si solo hace acciones (como imprimir): NO es necesario
   • Ejemplos:
     - factorial(n): return valor
     - cuentaRegresiva(n): solo imprime, no retorna
`);

// Ejemplo de recursión SIN return (solo acciones)
function imprimirNumeros(n) {
  // Caso base
  if (n === 0) {
    console.log("¡Terminado!");
    return; // Opcional aquí, solo para claridad
  }

  // Acción
  console.log(n);

  // Caso recursivo (NO necesita return porque no devolvemos valor)
  imprimirNumeros(n - 1);
}

// Ejemplo de recursión CON return (devuelve valor)
function multiplicarTodos(n) {
  // Caso base
  if (n === 1) {
    return 1; // OBLIGATORIO: debe retornar valor
  }

  // Caso recursivo
  return n * multiplicarTodos(n - 1); // OBLIGATORIO: debe retornar valor
}

console.log("\n=== EJEMPLOS DE RETURN vs NO RETURN ===");
console.log("Función SIN return (solo acciones):");
imprimirNumeros(3);

console.log("\nFunción CON return (devuelve valor):");
console.log("multiplicarTodos(4):", multiplicarTodos(4)); // 24

function reverseStringRecursivo(str) {
  // Caso base
  if (str === "") {
    return "";
  }

  // Caso recursivo
  return str[str.length - 1] + reverseStringRecursivo(str.slice(0, -1));
}

console.log(`
📝 REGLAS DE ORO DE LA RECURSIÓN:

✅ SIEMPRE necesitas:
  1. Caso base que detenga la recursión
  2. Caso recursivo que se acerque al caso base

✅ SOLO si devuelves valor:
  3. Return en caso base
  4. Return en caso recursivo

❌ ERRORES COMUNES:
  • Olvidar el caso base → Stack overflow
  • No modificar parámetros → Bucle infinito
  • Olvidar return cuando necesitas devolver valor
  • Caso base inalcanzable
`);
