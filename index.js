import * as SPLAT from "https://cdn.jsdelivr.net/npm/gsplat@latest";

const canvas = document.getElementById("canvas");
const renderer = new SPLAT.WebGLRenderer(canvas);
let scene = new SPLAT.Scene();  // Declare `scene` as a `let` so it can be reassigned
const camera = new SPLAT.Camera();
let controls = new SPLAT.OrbitControls(camera, canvas); // Declare `controls` as a `let`

// List of splat URLs
const splatFiles = [
  "https://raw.githubusercontent.com/linussoderquist/Digitized_nature/main/gs_Stump.cleaned.splat",
  "https://raw.githubusercontent.com/linussoderquist/Digitized_nature/main/Tallticka.splat",
  "https://drive.google.com/uc?export=download&id=18uLohvlkL8zXL3fEHC8qPJuEDjyyFmbJ"
];

// Track the current splat file index, starting with the first one
let currentSplatIndex = 0;

// Function to load a new .splat file into the scene
async function loadSplat(url) {
  console.log(`Loading .splat file from URL: ${url}`);

  // Reset the scene and controls
  scene = new SPLAT.Scene();
  controls = new SPLAT.OrbitControls(camera, canvas); // Recreate controls for the new scene

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

  // Load the new splat file with a new scene
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
