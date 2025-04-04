// background.js - ThreeJS Arkaplan
function initThreeJS() {
    const canvas = document.getElementById('bg');
    if (!canvas || typeof THREE === 'undefined') {
        console.error('ThreeJS kütüphanesi veya canvas elementi bulunamadı');
        return null;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = CONFIG.threeJS.particleCount;

    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Materials
    let particlesMaterial;
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        particlesMaterial = new THREE.PointsMaterial({
            size: CONFIG.threeJS.particleSize,
            color: CONFIG.threeJS.darkThemeColor,
            transparent: true,
            opacity: 0.8
        });
    } else {
        particlesMaterial = new THREE.PointsMaterial({
            size: CONFIG.threeJS.particleSize,
            color: CONFIG.threeJS.lightThemeColor,
            transparent: true,
            opacity: 0.8
        });
    }

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 5;

    // Mouse movement
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    });

    // Animation
    function animate() {
        requestAnimationFrame(animate);

        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;

        particlesMesh.rotation.y += mouseX * 0.05;
        particlesMesh.rotation.x += mouseY * 0.05;

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return {
        scene,
        particlesMesh,
        particlesMaterial,
        renderer
    };
}

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';

        // Update Three.js particles color
        if (threeJSInstance) {
            // Clean up old instance
            threeJSInstance.renderer.dispose();
            const oldCanvas = document.getElementById('bg');
            if (oldCanvas) {
                oldCanvas.remove();
            }

            // Create new canvas
            const newCanvas = document.createElement('canvas');
            newCanvas.id = 'bg';
            document.body.insertBefore(newCanvas, document.body.firstChild);

            // Reinitialize Three.js
            threeJSInstance = initThreeJS();
        }
    });
}