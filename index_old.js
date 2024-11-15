import * as SPLAT from "https://cdn.jsdelivr.net/npm/gsplat@latest";

const canvas = document.getElementById("canvas");

const renderer = new SPLAT.WebGLRenderer(canvas);
const scene = new SPLAT.Scene();
const camera = new SPLAT.Camera(); // Default camera with position already set

const controls = new SPLAT.OrbitControls(camera, canvas);

async function main() {
  const url =
    "https://raw.githubusercontent.com/linussoderquist/Digitized_nature/main/gs_Stump.cleaned.splat";

  await SPLAT.Loader.LoadAsync(url, scene, null);

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
}
main();
