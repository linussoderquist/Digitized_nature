import * as SPLAT from "https://cdn.jsdelivr.net/npm/gsplat@latest";

const canvas = document.getElementById("canvas");

// Skapa renderare, scen och kamera
const renderer = new SPLAT.WebGLRenderer(canvas);
const scene = new SPLAT.Scene();
const camera = new SPLAT.Camera();
const controls = new SPLAT.OrbitControls(camera, canvas);

// Justera kamera för att få en bra vy
camera.position.set(0, 0, 500);  // Ställ kameran en bit bak för att se hela objektet

// Funktion för att hantera filinladdning och rendering
async function main() {
    // Länka till din .ply-fil
    const url = "https://raw.githubusercontent.com/linussoderquist/Digitized_nature/main/paludarium.compressed.ply";

    // Ladda filen och lägg till den i scenen
    const model = await SPLAT.Loader.LoadAsync(url, scene, null);

    // Om modellen laddades in, skala upp den (exempelvis 10 gånger) för bättre synlighet
    if (model) {
        model.scale.set(10, 10, 10);  // Testa olika skalor för att se modellen bättre
        scene.add(model);
    } else {
        console.error("Modellen kunde inte laddas.");
    }

    // Justera skärmstorlek och canvas
    const handleResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    };

    // Render-loop
    const frame = () => {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(frame);
    };

    // Initiera storlek och starta rendering
    handleResize();
    window.addEventListener("resize", handleResize);
    requestAnimationFrame(frame);
}

main();
