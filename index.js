import * as SPLAT from "https://cdn.jsdelivr.net/npm/gsplat@latest";

const canvas = document.getElementById("canvas");
const renderer = new SPLAT.WebGLRenderer(canvas);
const scene = new SPLAT.Scene();
const camera = new SPLAT.Camera(); // Default camera with position already set
const controls = new SPLAT.OrbitControls(camera, canvas);

async function loadSplatFile(url) {
  // Clear the current scene
  scene.clear();

  // Load the new splat file into the scene
  await SPLAT.Loader.LoadAsync(url, scene, null);
}

async function main() {
  const initialUrl =
    "https://raw.githubusercontent.com/linussoderquist/Digitized_nature/main/gs_Stump.cleaned.splat";

  // Load the initial splat file
  await loadSplatFile(initialUrl);

  const handleResize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  const frame = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  };

  handleResize();
  window.addEventListener("resize", handleResize);
  requestAnimationFrame(frame);

  // Add an event listener to the button to load a new splat file
  document.getElementById("loadButton").addEventListener("click", async () => {
    const newUrl = prompt("Enter the URL of the new .splat file:");
    if (newUrl) {
      await loadSplatFile(newUrl);
    }
  });
}

main();
