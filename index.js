import * as SPLAT from "https://cdn.jsdelivr.net/npm/gsplat@latest";

const canvas = document.getElementById("canvas");

// Skapa en renderer, scen, kamera och kontroller för att interagera med modellen
const renderer = new SPLAT.WebGLRenderer(canvas);
const scene = new SPLAT.Scene();
const camera = new SPLAT.Camera();
const controls = new SPLAT.OrbitControls(camera, canvas);

async function main() {
    // Ange URL till din .ply-fil
    const url = "https://raw.githubusercontent.com/linussoderquist/Digitized_nature/main/paludarium.compressed.ply";

    // Ladda .ply-filen till scenen
    await SPLAT.Loader.LoadAsync(url, scene, null);

    // Funktion för att hantera fönsterstorlek vid ändring
    const handleResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Renderingsloop för att kontinuerligt uppdatera visningen
    const frame = () => {
        controls.update();
        renderer.render(scene, camera);

        requestAnimationFrame(frame);
    };

    // Anpassa renderingsstorlek och börja renderingsloopen
    handleResize();
    window.addEventListener("resize", handleResize);

    requestAnimationFrame(frame);
}

// Anropa main-funktionen för att starta
main();
