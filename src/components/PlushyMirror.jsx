import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { SimplexNoise } from 'three/addons/math/SimplexNoise.js';

const warm = 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/the_sky_is_on_fire_4k.hdr';
const cool = 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/qwantani_dusk_2_puresky_4k.hdr';

// --- Glow Shader (Defined once, outside the component) ---
const glowVertexShader = `
    varying vec3 vNormal;
    varying vec3 vViewVector;
    varying vec3 vWorldPosition;

    void main() {
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
        vViewVector = -modelViewPosition.xyz;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewPosition;
    }
`;

const glowFragmentShader = `
    uniform float uFresnelPower;
    uniform float uTime;
    uniform vec3 uLightPos;
    varying vec3 vNormal;
    varying vec3 vViewVector;
    varying vec3 vWorldPosition;
    vec3 hsl2rgb(vec3 c) {
        vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0), 6.0)-3.0)-1.0, 0.0, 1.0);
        return c.z + c.y * (rgb-0.5)*(1.0-abs(2.0*c.z-1.0));
    }
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }
    float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    void main() {
        float dist = distance(vWorldPosition, uLightPos);
        float intensityByDist = smoothstep(1.5, 0.0, dist);
        float fresnel = pow(1.0 - abs(dot(normalize(vViewVector), normalize(vNormal))), uFresnelPower);
        float n = noise(vWorldPosition.xy * 2.0 + uTime * 0.5);
        vec3 color = hsl2rgb(vec3(n, 0.7, 0.6));
        gl_FragColor.rgb = color;
        gl_FragColor.a = fresnel * intensityByDist;
    }
`;


// --- The React Component ---
const PlushyMirror = ({className}) => {
    // useRef is React's way of getting a direct reference to a DOM element.
    const mountRef = useRef(null);

    // useEffect is where we'll put our Three.js setup code.
    // The empty dependency array [] means this will run only once when the component mounts.
    useEffect(() => {
        // --- Scene Setup ---
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xdddddd);
        const renderer = new THREE.WebGLRenderer({ canvas: mountRef.current, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.5;

        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 3, 5);
        camera.lookAt(0, 1, 1.618);

        // --- The Objects (Mirror + Glow Layers) ---
        const cushionGroup = new THREE.Group();
        const glowCushionGroup = new THREE.Group();
        scene.add(cushionGroup, glowCushionGroup);

        const curvePoints = [
            new THREE.Vector3(0, 2.5, -1),
            new THREE.Vector3(0, 1, 1),
            new THREE.Vector3(0, -1.618, 0.618),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, -1.5, 0.5),
            new THREE.Vector3(0, -2.5, 3.5)
        ];
        const curve = new THREE.CatmullRomCurve3(curvePoints);
        const tubeRadius = 0.4;
        const cushionGeometry = new THREE.TubeGeometry(curve, 128, tubeRadius, 20, false);
        const originalPositions = cushionGeometry.attributes.position.clone();
        const noise = new SimplexNoise();
        const capGeometry = new THREE.SphereGeometry(tubeRadius, 20, 20);

        const mirrorMaterial = new THREE.MeshStandardMaterial({
            metalness: 1.0, roughness: 0.0, color: 0xffffff, envMapIntensity: 1.5
        });

        const glowMaterial = new THREE.ShaderMaterial({
            vertexShader: glowVertexShader,
            fragmentShader: glowFragmentShader,
            uniforms: {
                uFresnelPower: { value: 2.5 },
                uTime: { value: 0 },
                uLightPos: { value: new THREE.Vector3() }
            },
            transparent: true,
            blending: THREE.AdditiveBlending,
        });

        const numCushions = 25;
        const spacing = 0.55;
        for (let i = 0; i < numCushions; i++) {
            const positionX = (i - (numCushions - 1) / 2) * spacing;
            const mirrorCushion = new THREE.Mesh(cushionGeometry, mirrorMaterial);
            mirrorCushion.position.x = positionX;
            cushionGroup.add(mirrorCushion);
            const glowCushion = new THREE.Mesh(cushionGeometry, glowMaterial.clone());
            glowCushion.position.x = positionX;
            glowCushionGroup.add(glowCushion);
            const topCapPosition = curvePoints[0];
            const mirrorCap = new THREE.Mesh(capGeometry, mirrorMaterial);
            mirrorCap.position.copy(topCapPosition);
            mirrorCap.position.x += positionX;
            cushionGroup.add(mirrorCap);
            const glowCap = new THREE.Mesh(capGeometry, glowMaterial.clone());
            glowCap.position.copy(topCapPosition);
            glowCap.position.x += positionX;
            glowCushionGroup.add(glowCap);
        }
        
        // --- Environment & Lighting ---
        new RGBELoader().load(
            cool,
            (texture) => {
                texture.mapping = THREE.EquirectangularReflectionMapping;
                scene.environment = texture;
            }
        );
        
        const interactiveLight = new THREE.PointLight(0xffffff, 300);
        scene.add(interactiveLight);

        // --- Interactivity ---
        const lightPos = new THREE.Vector3();
        const handleMouseMove = (event) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;
            const vector = new THREE.Vector3(x, y, 0.5);
            vector.unproject(camera);
            const dir = vector.sub(camera.position).normalize();
            const distance = -camera.position.z / dir.z;
            lightPos.copy(camera.position).add(dir.multiplyScalar(distance));
            interactiveLight.position.copy(lightPos);
        };
        
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        // --- Animation Loop ---
        const clock = new THREE.Clock();
        let animationFrameId;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            const time = clock.getElapsedTime();
            
            const positionAttribute = cushionGeometry.attributes.position;
            for (let i = 0; i < positionAttribute.count; i++) {
                const x = originalPositions.getX(i);
                const y = originalPositions.getY(i);
                const z = originalPositions.getZ(i);
                const displacement = noise.noise3d(x * 10, y * z, time % 1.618) * 0.01;
                positionAttribute.setZ(i, z + displacement);
            }
            positionAttribute.needsUpdate = true;

            glowCushionGroup.children.forEach((cushion) => {
                if (cushion.material.isShaderMaterial) {
                    cushion.material.uniforms.uTime.value = time;
                    cushion.material.uniforms.uLightPos.value.copy(lightPos);
                }
            });

            renderer.render(scene, camera);
        };
        animate();

        // --- Cleanup function ---
        // This function will be called when the component unmounts.
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            // Properly dispose of Three.js objects to prevent memory leaks
            cushionGeometry.dispose();
            capGeometry.dispose();
            mirrorMaterial.dispose();
            glowMaterial.dispose();
            renderer.dispose();
        };
    }, []); // Empty array ensures this effect runs only once

    // The component returns a canvas element that our Three.js scene will render into.
    return <canvas ref={mountRef} className={className} style={{ width: '100vw', height: '100vh', display: 'block' }} />;
};

export default PlushyMirror;