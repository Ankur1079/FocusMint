/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { SpaceTheme, LAMP_COLORS } from '../types';

interface ThreeCanvasProps {
  theme: SpaceTheme;
  isLampOn: boolean;
  activityIntensity: number; // Controlled by pomodoro state or clicks
  lampColor: string; // 'GOLD' | 'RED' | ...
  lampBrightness: number; // 10 to 100
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  theme,
  isLampOn,
  activityIntensity,
  lampColor,
  lampBrightness,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  // Core Three.js references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particleSystemRef = useRef<THREE.Points | null>(null);
  const driftLinesGroupRef = useRef<THREE.Group | null>(null);
  const lampBeamRef = useRef<THREE.Mesh | null>(null);
  const ambientGridRef = useRef<THREE.GridHelper | THREE.Points | null>(null);

  // Parallax tracking mouse
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // GSAP Transition when theme pivots or lamp is toggled
  useEffect(() => {
    if (!sceneRef.current || !particleSystemRef.current || !driftLinesGroupRef.current || !lampBeamRef.current) return;

    const t = gsap.timeline();

    // Resolve color hex and brightness factor
    const activeColorHex = LAMP_COLORS.find(c => c.id === lampColor)?.hex || '#f59e0b';
    const threeColor = new THREE.Color(activeColorHex);
    const brightnessPct = lampBrightness / 100;

    if (theme === 'RELAXING_MIND') {
      // Warm up F1 lights and speed up drift lines
      t.to(lampBeamRef.current.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 0.5, ease: 'power2.in' });
      t.to(driftLinesGroupRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.8, ease: 'back.out(1.2)' });
      
      // Update particles to represent soothing forest fireflies
      if (particleSystemRef.current.material instanceof THREE.PointsMaterial) {
        t.to(particleSystemRef.current.material.color, { r: 0.1, g: 0.85, b: 0.45, duration: 0.6 }); // Zen Emerald sparkle
        t.to(particleSystemRef.current.material, { size: 0.08, opacity: 0.85, duration: 0.5 });
      }

      // Move camera slightly focused
      if (cameraRef.current) {
        t.to(cameraRef.current.position, { y: -0.1, z: 5.2, duration: 1.2, ease: 'power3.out' });
      }
    } else {
      // Warm desk lighting active
      const lampScale = isLampOn ? 1.0 : 0.01;
      t.to(lampBeamRef.current.scale, { x: lampScale, y: lampScale, z: lampScale, duration: 0.8, ease: 'power3.out' });
      t.to(driftLinesGroupRef.current.scale, { x: 0.01, y: 0.01, z: 0.01, duration: 0.5, ease: 'power2.in' });

      // Update lamp beam material color and opacity based on selected color and brightness
      if (lampBeamRef.current.material instanceof THREE.MeshBasicMaterial) {
        t.to(lampBeamRef.current.material.color, { r: threeColor.r, g: threeColor.g, b: threeColor.b, duration: 0.5 });
        const targetBeamOpacity = isLampOn ? (0.01 + brightnessPct * 0.13) : 0.001;
        t.to(lampBeamRef.current.material, { opacity: targetBeamOpacity, duration: 0.5 });
      }

      // Update particles to represent slow sparkling colored dust floating in room
      if (particleSystemRef.current.material instanceof THREE.PointsMaterial) {
        const pColor = isLampOn ? threeColor : new THREE.Color(0x38bdf8); // Customized color or nightly cyber blue
        t.to(particleSystemRef.current.material.color, { r: pColor.r, g: pColor.g, b: pColor.b, duration: 0.6 });
        
        const targetParticleOpacity = isLampOn ? (0.15 + brightnessPct * 0.55) : 0.25;
        t.to(particleSystemRef.current.material, { size: 0.055, opacity: targetParticleOpacity, duration: 0.5 });
      }

      // Move camera back to comfortable study overview
      if (cameraRef.current) {
        t.to(cameraRef.current.position, { y: 0, z: 5.8, duration: 1.2, ease: 'power3.out' });
      }
    }
  }, [theme, isLampOn, lampColor, lampBrightness]);

  // Adjust activity sparks when timer tick or workout climbs
  useEffect(() => {
    if (!particleSystemRef.current) return;
    // Momentary burst in particle sizes
    const mat = particleSystemRef.current.material as THREE.PointsMaterial;
    const originalSize = theme === 'RELAXING_MIND' ? 0.08 : 0.055;
    gsap.timeline()
      .to(mat, { size: originalSize * (1 + activityIntensity * 0.4), duration: 0.2 })
      .to(mat, { size: originalSize, duration: 0.5 });
  }, [activityIntensity]);

  // Establish Three scene structure
  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Dark foggy nights
    scene.fog = new THREE.FogExp2(0x020617, 0.06);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ==========================================
    // 1. PARTICLES EMITTERS (Exhaust smoke or Golden Dust)
    // ==========================================
    const partCount = 180;
    const partGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(partCount * 3);
    const velocities = new Float32Array(partCount * 3);

    for (let i = 0; i < partCount; i++) {
      // Random coordinates inside a cone structure pointing outward or room volume
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;

      velocities[i * 3] = (Math.random() - 0.5) * 0.01;      // dx
      velocities[i * 3 + 1] = 0.005 + Math.random() * 0.01;   // dy (drifting upwards)
      velocities[i * 3 + 2] = 0.02 + Math.random() * 0.025;   // dz (gushing toward reader)
    }

    partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const partMat = new THREE.PointsMaterial({
      color: 0xf59e0b, // Warm golden dust template
      size: 0.055,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(partGeo, partMat);
    scene.add(particles);
    particleSystemRef.current = particles;


    // ==========================================
    // 2. DETAILED VELOCITY RACETRACK LINES (F1 Drift paths)
    // ==========================================
    const driftLinesGroup = new THREE.Group();
    driftLinesGroup.scale.set(0.01, 0.01, 0.01); // starts invisible inside lamp desk
    scene.add(driftLinesGroup);
    driftLinesGroupRef.current = driftLinesGroup;

    // Generate neon streaming lines going deep into Z
    const createNeonLine = (color: number, xOffset: number, yOffset: number) => {
      const linePoints = [];
      for (let z = -12; z <= 10; z += 1) {
        // wavy formula
        const x = xOffset + Math.sin(z * 0.6) * 0.12;
        linePoints.push(new THREE.Vector3(x, yOffset, z));
      }

      const curve = new THREE.CatmullRomCurve3(linePoints);
      const points = curve.getPoints(50);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
      
      const curveMat = new THREE.LineBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.65,
        linewidth: 2, // will render nicely as dynamic trails
      });

      const line = new THREE.Line(curveGeo, curveMat);
      driftLinesGroup.add(line);
    };

    // Red Bull theme streams: Yellow gold, Oracle crimson red, and neon blue
    createNeonLine(0xef4444, -1.5, -1.2); // Crimson Left rail
    createNeonLine(0xf59e0b, 1.5, -1.2);  // Gold Right rail
    createNeonLine(0x0ea5e9, -0.4, -1.25); // Mid stream cyan
    createNeonLine(0xffffff, 0.4, -1.25);  // Mid stream white

    // Racetrack ground grid
    const trackGrid = new THREE.GridHelper(30, 24, 0x1e293b, 0x0f172a);
    trackGrid.position.set(0, -1.3, 0);
    driftLinesGroup.add(trackGrid);


    // ==========================================
    // 3. STUDY DESK LAMP VOLUMETRIC LIGHT BEAM
    // ==========================================
    // Cozy yellow conical spotlight shape
    const beamGeo = new THREE.CylinderGeometry(0.08, 2.2, 4.5, 16, 1, true);
    // Offset pivot center to top
    beamGeo.translate(0, -2.25, 0);

    const beamMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.08,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const lampBeam = new THREE.Mesh(beamGeo, beamMat);
    // Position it tilted down as if mounted from a left-side desk lamp
    lampBeam.position.set(-2.4, 2.3, -1.2);
    lampBeam.rotation.set(0, 0, -0.45); // angles beam across center-right desk area
    scene.add(lampBeam);
    lampBeamRef.current = lampBeam;


    // ==========================================
    // 4. BASIC AMBIENT LIGHTING
    // ==========================================
    const lightAmb = new THREE.AmbientLight(0x0f172a, 0.95);
    scene.add(lightAmb);

    const lightDirBlue = new THREE.DirectionalLight(0x0ea5e9, 1.5);
    lightDirBlue.position.set(3, 4, 2);
    scene.add(lightDirBlue);

    const lightDirOrange = new THREE.DirectionalLight(0xbe123c, 1.2);
    lightDirOrange.position.set(-3, 1, 3);
    scene.add(lightDirOrange);


    // ==========================================
    // 5. INTERACTIVE EVENTS & TICK TIMELINE
    // ==========================================
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      mouse.current.targetX = x * 0.28;
      mouse.current.targetY = y * 0.18;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;

      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    let tickId: number;

    const tick = () => {
      const elapsed = clock.getElapsedTime();

      // Intersect cursor coordinates slowly for parallax depth
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.06;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.06;

      // Apply subtle rotate perspective based on theme
      if (theme === 'RELAXING_MIND') {
        scene.rotation.y = mouse.current.x * 0.55;
        scene.rotation.x = -mouse.current.y * 0.28;
        scene.position.y = Math.sin(elapsed * 1.1) * 0.022; // Peaceful slow wave sway
      } else {
        scene.rotation.y = mouse.current.x * 0.4;
        scene.rotation.x = -mouse.current.y * 0.2;
        scene.position.y = Math.sin(elapsed * 0.8) * 0.03;  // sleepy cozy floating hover
      }

      // Progress drift racing grid trails
      if (theme === 'RELAXING_MIND' && driftLinesGroup) {
        driftLinesGroup.traverse((child) => {
          if (child instanceof THREE.Line) {
            // Rapid scrolling offsets
            child.position.z += 0.12;
            if (child.position.z > 3.5) {
              child.position.z = -5;
            }
          }
        });
      }

      // Update flying sparkles positions
      if (particles) {
        const positionsArr = particles.geometry.attributes.position.array as Float32Array;
        const currentSpeedFactor = theme === 'RELAXING_MIND' ? 2.2 : 1.0;

        for (let i = 0; i < partCount; i++) {
          const idx = i * 3;
          // Particles travel forward toward the screen
          positionsArr[idx + 2] += velocities[idx + 2] * currentSpeedFactor;
          // drift upwards slightly
          positionsArr[idx + 1] += velocities[idx + 1] * currentSpeedFactor;

          // Recycle loop when particles exceed front camera plane
          if (positionsArr[idx + 2] > 6) {
            positionsArr[idx + 2] = -8;
            positionsArr[idx] = (Math.random() - 0.5) * 8;
            positionsArr[idx + 1] = (Math.random() - 0.5) * 6;
          }
        }
        particles.geometry.attributes.position.needsUpdate = true;
      }

      // Render
      renderer.render(scene, camera);
      tickId = requestAnimationFrame(tick);
    };

    tick();

    // ==========================================
    // DISCOVERY DESTRUCTION
    // ==========================================
    return () => {
      cancelAnimationFrame(tickId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (mountRef.current && renderer.domElement) {
        try {
          mountRef.current.removeChild(renderer.domElement);
        } catch (e) {}
      }

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          if (obj.geometry) obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else if (obj.material) {
            obj.material.dispose();
          }
        } else if (obj instanceof THREE.Points) {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material instanceof THREE.Material) obj.material.dispose();
        }
      });

      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};
