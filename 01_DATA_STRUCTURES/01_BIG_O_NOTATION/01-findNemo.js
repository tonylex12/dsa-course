// Ejemplo clásico de búsqueda lineal en un array. Eficiencia: O(n)
// Si solo quieres saber si existe 'nemo', puedes retornar al encontrarlo.

const fish = ["dory", "bruce", "marlin", "nemo"];
const nemo = ["nemo"];
const everyone = [
  "dory",
  "bruce",
  "marlin",
  "nemo",
  "gill",
  "bloat",
  "nigel",
  "squirt",
  "darla",
  "hank",
];
const large = new Array(1000).fill("nemo");

// Busca el primer 'nemo' y retorna al encontrarlo
function findNemoEfficient(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "nemo") {
      console.log("Found NEMO at index", i);
      return true;
    }
  }
  console.log("Nemo not found");
  return false;
}

// Busca todos los 'nemo' en el array
function findAllNemo(arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "nemo") {
      count++;
      console.log("Found NEMO at index", i);
    }
  }
  if (count === 0) console.log("Nemo not found");
  else console.log("Total NEMO found:", count);
  return count;
}

// Ejemplos de uso:
console.log("--- Ejemplo 1: Buscar el primer nemo ---");
findNemoEfficient(fish); // Found NEMO at index 3
findNemoEfficient(["dory", "bruce"]); // Nemo not found

console.log("\n--- Ejemplo 2: Buscar todos los nemo ---");
findAllNemo(large); // Found NEMO at index ... (1000 veces)
findAllNemo(everyone); // Found NEMO at index 3
