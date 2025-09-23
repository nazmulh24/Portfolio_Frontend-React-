// Test Three.js imports to verify compatibility
import * as THREE from "three";

// Check if BatchedMesh is available in the current Three.js version
console.log("Three.js version:", THREE.REVISION);
console.log("BatchedMesh available:", typeof THREE.BatchedMesh !== "undefined");

// Export for verification
export const threeJsInfo = {
  version: THREE.REVISION,
  hasBatchedMesh: typeof THREE.BatchedMesh !== "undefined",
};
