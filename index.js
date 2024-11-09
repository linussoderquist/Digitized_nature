import * as SPLAT from "https://cdn.jsdelivr.net/npm/gsplat@latest";

const canvas = document.getElementById("canvas");
const renderer = new SPLAT.WebGLRenderer(canvas);
const scene = new SPLAT.Scene();  // Use a consistent scene instance
const camera = new SPLAT.Camera();
const controls = new SPLAT.OrbitControls(camera, canvas);

// List of splat URLs
const splatFiles = [
  "https://raw.githubusercontent.com/linussoderquist/Digitized_nature/main/gs_Stump.cleaned.splat",
  "https://raw.githubusercontent.com/linussoderquist/Digitized_nature/main/Tallticka.splat",
  // NOTE: Google Drive URLs may not work directly as sources. Test with another .splat file.
  "https://raw.githubusercontent.com/linussoderquist/Digitized_nature/main/paludarium_small.splat"
];

// Track the current splat file index, starting with the first one
let currentSplatIndex = 0;

// Function to clear the scene manually by removing each child
function clearScene() {
  while (scene.children.length > 0) {
    const object = scene.children[0];
    scene.remove(object);

    // Dispose of geometry and material to free memory
    if (object.geometry) object.geometry.dispose();
    if (object.material) object.material.dispose();
  }
  console.log("Scene cleared.");
}

// Function to load a new .splat file into the scene
async function loadSplat(url) {
  console.log(`Loading .splat file from URL: ${url}`);

  // Clear the scene manually
  clearScene();

  // Load the new .splat file
  try {
    await SPLAT.Loader.LoadAsync(url, scene, null);
    console.log(".splat file loaded successfully.");
  } catch (error) {
    console.error("Error loading .splat file:", error);
  }
}

// Function to handle button clicks to cycle through splats
window.handleButtonClick = function() {
  // Increment the index and wrap around if needed
  currentSplatIndex = (currentSplatIndex + 1) % splatFiles.length;

  // Load the new splat file
  loadSplat(splatFiles[currentSplatIndex]);
};

// Function to initialize the animation
function startAnimation() {
  const frame = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
}

// Load the first splat on startup
loadSplat(splatFiles[currentSplatIndex]);
startAnimation();
