import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js";
import * as SPLAT from "https://cdn.jsdelivr.net/npm/gsplat@latest";

const canvas = document.getElementById("canvas");

const renderer = new SPLAT.WebGLRenderer(canvas);
const scene = new SPLAT.Scene();

// Använd en Three.js PerspectiveCamera istället
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);  // Ställ in kameraavståndet

const controls = new SPLAT.OrbitControls(camera, canvas);

async function main() {
    const url = "https://raw.githubusercontent.com/linussoderquist/Digitized_nature/main/paludarium.compressed.ply";

    const model = await SPLAT.Loader.LoadAsync(url, scene, null);

    if (model) {
        model.scale.set(10, 10, 10);  // Skala upp objektet för bättre synlighet
        scene.add(model);
    } else {
        console.error("Modellen kunde inte laddas.");
    }

    const handleResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
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
