import * as SPLAT from "https://cdn.jsdelivr.net/npm/gsplat@latest";

const canvas = document.getElementById("canvas");
const renderer = new SPLAT.WebGLRenderer(canvas);
const camera = new SPLAT.Camera();
let scene = new SPLAT.Scene();  // Initialize the scene instance
let controls = new SPLAT.OrbitControls(camera, canvas); // Initialize controls

// List of splat URLs
const splatFiles = [
  "https://raw.githubusercontent.com/linussoderquist/Digitized_nature/main/stubbe.splat",
  "https://raw.githubusercontent.com/linussoderquist/Digitized_nature/main/Björkticka.splat", 
  "https://raw.githubusercontent.com/linussoderquist/Digitized_nature/main/ulummer.splat",
  "https://raw.githubusercontent.com/linussoderquist/Digitized_nature/main/gs_Stump.cleaned.splat",
  "https://raw.githubusercontent.com/linussoderquist/Digitized_nature/main/Tallticka_pos.splat",
  "https://raw.githubusercontent.com/linussoderquist/Digitized_nature/main/Klibbticka.splat",
  "https://raw.githubusercontent.com/linussoderquist/Digitized_nature/main/paludarium2tilt.splat",
  "https://raw.githubusercontent.com/linussoderquist/Digitized_nature/main/suspinat.splat"
];

// Track the current splat file index, starting with the first one
let currentSplatIndex = 0;

// Function to reset the scene and controls for each new load
function resetScene() {
  console.log("Resetting scene...");
  scene = new SPLAT.Scene(); // Reinitialize the scene
  controls = new SPLAT.OrbitControls(camera, canvas); // Reinitialize controls with the new scene
  console.log("Scene reset.");
}

// Function to load a new .splat file into the scene
async function loadSplat(url) {
  console.log(`Attempting to load .splat file from URL: ${url}`);

  // Reset the scene and controls before loading a new .splat file
  resetScene();

  // Attempt to load the new .splat file
  try {
    console.log("Starting LoadAsync...");
    await SPLAT.Loader.LoadAsync(url, scene, null);
    console.log("Finished LoadAsync.");

    console.log(".splat file loaded successfully. Scene now has children:", scene.children.length);

    if (scene.children.length === 0) {
      console.warn("Warning: The scene is still empty after loading. This may indicate a loading or format issue.");
    }

    // Output scene contents for debugging
    console.log("Scene contents after loading:", scene);

  } catch (error) {
    console.error("Error loading .splat file:", error);
    console.log("Error stack trace:", error.stack); // Log detailed error if available
  }
}

// Function to handle button clicks to cycle through splats
window.handleButtonClick = function() {
  currentSplatIndex = (currentSplatIndex + 1) % splatFiles.length;
  console.log(`Button clicked. Loading splat index: ${currentSplatIndex}`);
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
console.log("Initializing scene with first splat file.");
loadSplat(splatFiles[currentSplatIndex]);
startAnimation();
