import * as SPLAT from "https://cdn.jsdelivr.net/npm/gsplat@latest";

const canvas = document.getElementById("canvas");
const renderer = new SPLAT.WebGLRenderer(canvas);
const scene = new SPLAT.Scene();
const camera = new SPLAT.Camera();
const controls = new SPLAT.OrbitControls(camera, canvas);

// List of splat URLs
const splatFiles = [
  "https://raw.githubusercontent.com/linussoderquist/Digitized_nature/main/gs_Stump.cleaned.splat",
  "https://raw.githubusercontent.com/linussoderquist/Digitized_nature/main/Tallticka.splat",
  "https://raw.githubusercontent.com/linussoderquist/Digitized_nature/main/paludarium_small.splat"
];

// Function to load a new .splat file into the scene
async function loadSplat(url) {
  // Clear existing objects in the scene
  scene.clear();

  // Load the new .splat file
  await SPLAT.Loader.LoadAsync(url, scene, null);
}

// Function to handle button clicks for loading different splats
export function handleButtonClick(index) {
  loadSplat(splatFiles[index]);
}

// Function to initialize the animation
function startAnimation() {
  const frame = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
}

// Initialize and load the first splat
loadSplat(splatFiles[0]);
startAnimation();
