import * as SPLAT from "https://cdn.jsdelivr.net/npm/gsplat@latest";

const canvas = document.getElementById("canvas");

// Skapa renderare, scen och kamera
const renderer = new SPLAT.WebGLRenderer(canvas);
const scene = new SPLAT.Scene();
const camera = new SPLAT.Camera();
const controls = new SPLAT.OrbitControls(camera, canvas);

// Justera kamera för att få en bra vy
camera.position.set(0, 0, 5);  // Ställ kameran en bit bak för att se hela objektet

// Funktion för att hantera filinladdning och rendering
async function main() {
    // Länka till din .ply-fil
    const url = "https://raw.githubusercontent.com/linussoderquist/Digitized_nature/main/paludarium.compressed.ply";

    // Ladda filen och lägg till den i scenen
    await SPLAT.Loader.LoadAsync(url, scene, null);

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
