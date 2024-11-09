import * as SPLAT from "https://cdn.jsdelivr.net/npm/gsplat@latest";

const canvas = document.getElementById("canvas");
const renderer = new SPLAT.WebGLRenderer(canvas);
const scene = new SPLAT.Scene();  // Consistent scene instance
const camera = new SPLAT.Camera();
const controls = new SPLAT.OrbitControls(camera, canvas);

// Log to confirm scene and renderer initialization
console.log("Scene initialized:", scene);
console.log("Renderer initialized:", renderer);

// List of splat URLs
const splatFiles = [
  "https://raw.githubusercontent.com/linussoderquist/Digitized_nature/main/gs_Stump.cleaned.splat",
  "https://raw.githubusercontent.com/linussoderquist/Digitized_nature/main/Tallticka.splat",
  "https://raw.githubusercontent.com/linussoderquist/Digitized_nature/main/paludarium_small.splat"
];

// Track the current splat file index, starting with the first one
let currentSplatIndex = 0;

// Function to load a new .splat file into the scene
async function loadSplat(url) {
  console.log(`Attempting to load .splat file from URL: ${url}`);

  // Temporarily remove `clearScene()` to isolate the issue
  // clearScene();

  // Attempt to load the new .splat file
  try {
    console.log("Starting LoadAsync...");
    const result = await SPLAT.Loader.LoadAsync(url, scene, null);
    console.log("Finished LoadAsync.");

    console.log(".splat file loaded successfully. Scene now has children:", scene.children.length);

    // Check if objects were added to the scene after loading
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
  // Increment the index and wrap around if needed
  currentSplatIndex = (currentSplatIndex + 1) % splatFiles.length;

  console.log(`Button clicked. Loading splat index: ${currentSplatIndex}`);
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
console.log("Initializing scene with first splat file.");
loadSplat(splatFiles[currentSplatIndex]);
startAnimation();
