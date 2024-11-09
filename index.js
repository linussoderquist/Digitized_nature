import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js";
import * as SPLAT from "https://cdn.jsdelivr.net/npm/gsplat@latest";

const canvas = document.getElementById("canvas");

// Använd SPLAT:s WebGLRenderer och Scene
const renderer = new SPLAT.WebGLRenderer(canvas);
const scene = new SPLAT.Scene();

// Skapa Three.js PerspectiveCamera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Kontrollera att kameran har skapats och dess position kan ställas in
try {
    camera.position.set(0, 0, 10);  // Flytta kameran bakåt
} catch (error) {
    console.error("Kamera-inställning misslyckades:", error);
}

// Skapa OrbitControls med kameran och canvas
const controls = new SPLAT.OrbitControls(camera, canvas);

async function main() {
    const url = "https://raw.githubusercontent.com/linussoderquist/Digitized_nature/main/paludarium.compressed.ply";

    const model = await SPLAT.Loader.LoadAsync(url, scene, null);

    if (model) {
        model.scale.set(10, 10, 10);  // Skala upp objektet
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
