/**
 * Peacock 3D Loading Animation Engine (ASCII Edition)
 * Built with Three.js
 * 
 * Choreography:
 * 1. Body appears with elastic entrance (showing the body and two "ii" legs)
 * 2. Feathers deploy sequentially from feather1 to feather13 along their radial angle
 * 3. Jiggle effect begins on body & plumage
 * 4. The peacock legs ("ii") kick / push the letters A, S, C into place to form "ASCII"
 * 5. Completed glory pose & website loader integration with custom themes & controls
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['three'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('three'));
  } else {
    root.PeacockLoader = factory(root.THREE);
  }
}(typeof self !== 'undefined' ? self : this, function (THREE) {

  // Color Themes
  const THEMES = {
    asciiStudio: {
      name: 'ASCII Studio Brand Palette',
      bg: '#031211',
      bgGlow: '#002b2e',
      body: '#00AEBB',
      bodyEmissive: '#00363a',
      bodyRoughness: 0.16,
      bodyMetalness: 0.55,
      feathers: [
        '#00AEBB', '#1fc7d4', '#4de0eb', '#a8f3f8',
        '#E8E4D3', '#f2efe4', '#E8E4D3', '#f2efe4',
        '#a8f3f8', '#4de0eb', '#1fc7d4', '#00AEBB',
        '#007a82'
      ],
      letters: {
        A: '#E8E4D3',
        s: '#00AEBB',
        c: '#E8E4D3'
      },
      particleColor: '#00AEBB',
      accentColor: '#00AEBB'
    },
    royal: {
      name: 'Royal Sapphire',
      bg: '#031211',
      bgGlow: '#002b2e',
      body: '#0096c7',
      bodyEmissive: '#023e8a',
      bodyRoughness: 0.25,
      bodyMetalness: 0.4,
      // Feathers from 1 (top-left) to 13 (bottom-right)
      feathers: [
        '#7b2cbf', // 1 - Deep Amethyst
        '#9d4edd', // 2 - Purple
        '#c77dff', // 3 - Violet
        '#e0aaff', // 4 - Lilac (Crown Peak)
        '#ff4d6d', // 5 - Rose Pink
        '#ff758f', // 6 - Coral Pink
        '#ff9e00', // 7 - Warm Amber
        '#ffbe0b', // 8 - Golden Sun
        '#52b788', // 9 - Spring Emerald
        '#2a9d8f', // 10 - Peacock Green
        '#00b4d8', // 11 - Vibrant Cyan
        '#0077b6', // 12 - Cerulean Blue
        '#03045e'  // 13 - Deep Navy Sapphire
      ],
      letters: {
        A: '#7b2cbf',
        s: '#ffbe0b',
        c: '#00b4d8'
      },
      particleColor: '#48cae4',
      accentColor: '#00b4d8'
    },
    emerald: {
      name: 'Imperial Emerald & Gold',
      bg: '#05130e',
      bgGlow: '#0a2f20',
      body: '#10b981',
      bodyEmissive: '#04442a',
      bodyRoughness: 0.2,
      bodyMetalness: 0.6,
      feathers: [
        '#ffd166', '#e9c46a', '#2a9d8f', '#52b788',
        '#74c69d', '#95d5b2', '#b7e4c7', '#95d5b2',
        '#74c69d', '#52b788', '#2a9d8f', '#264653',
        '#e9c46a'
      ],
      letters: {
        A: '#ffd166',
        s: '#52b788',
        c: '#2a9d8f'
      },
      particleColor: '#ffd166',
      accentColor: '#10b981'
    },
    cyber: {
      name: 'Cyberpunk Neon',
      bg: '#080811',
      bgGlow: '#220835',
      body: '#00f5d4',
      bodyEmissive: '#007f5f',
      bodyRoughness: 0.15,
      bodyMetalness: 0.7,
      feathers: [
        '#7209b7', '#560bad', '#3a0ca3', '#4361ee',
        '#4cc9f0', '#00f5d4', '#70e000', '#ffdd00',
        '#ff9e00', '#ff0054', '#ff5400', '#f72585',
        '#b5179e'
      ],
      letters: {
        A: '#f72585',
        s: '#ffdd00',
        c: '#00f5d4'
      },
      particleColor: '#f72585',
      accentColor: '#00f5d4'
    },
    sunset: {
      name: 'Sunset Radiance',
      bg: '#140c12',
      bgGlow: '#3a1727',
      body: '#ff5400',
      bodyEmissive: '#781d00',
      bodyRoughness: 0.3,
      bodyMetalness: 0.3,
      feathers: [
        '#3a0ca3', '#7209b7', '#b5179e', '#f72585',
        '#ff0054', '#ff5400', '#ff7900', '#ff9e00',
        '#ffaa00', '#ffb700', '#ffd000', '#ffe066',
        '#ff5400'
      ],
      letters: {
        A: '#7209b7',
        s: '#ff0054',
        c: '#ffd000'
      },
      particleColor: '#ffd000',
      accentColor: '#ff7900'
    },
    monochrome: {
      name: 'Frosted Obsidian & Platinum',
      bg: '#0a0a0c',
      bgGlow: '#181822',
      body: '#e2e8f0',
      bodyEmissive: '#334155',
      bodyRoughness: 0.1,
      bodyMetalness: 0.85,
      feathers: [
        '#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1',
        '#94a3b8', '#64748b', '#475569', '#334155',
        '#475569', '#64748b', '#94a3b8', '#cbd5e1',
        '#f1f5f9'
      ],
      letters: {
        A: '#f8fafc',
        s: '#cbd5e1',
        c: '#94a3b8'
      },
      particleColor: '#f8fafc',
      accentColor: '#cbd5e1'
    }
  };

  // Easing functions
  function easeOutBack(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  }

  function easeOutQuad(x) {
    return 1 - (1 - x) * (1 - x);
  }

  function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
  }

  function easeOutElastic(x) {
    const c4 = (2 * Math.PI) / 3;
    return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
  }

  class PeacockLoader {
    constructor(options = {}) {
      this.container = typeof options.container === 'string' 
        ? document.querySelector(options.container) 
        : (options.container || document.body);
      
      this.themeKey = options.theme || 'royal';
      this.currentTheme = THEMES[this.themeKey] || THEMES.royal;
      this.speed = options.speed || 1.0;
      this.modelScale = options.scale !== undefined ? options.scale : 0.8; // User requested: "keep the size of the model to 80 %"
      this.loop = options.loop !== undefined ? options.loop : true;
      this.interactive = options.interactive !== undefined ? options.interactive : true;
      this.onComplete = options.onComplete || null;
      this.onProgress = options.onProgress || null;
      
      // Feather sequence order: 1 to 13
      this.featherOrder = [];
      for (let i = 1; i <= 13; i++) {
        this.featherOrder.push(`feather${i}`);
      }
      
      // -------------------------------------------------------------
      // Animation Timeline Milestones (seconds)
      // -------------------------------------------------------------
      // 1. Body entrance: 0.0s -> 0.45s
      this.tBodyStart = 0.0;
      this.tBodyEnd = 0.45;
      
      // 2. Feathers sequence (feather1 to feather13): 0.45s -> 1.85s
      this.tFeathersStart = 0.45;
      this.featherStep = 0.095;
      this.featherDuration = 0.24;
      this.tFeathersEnd = this.tFeathersStart + (this.featherOrder.length - 1) * this.featherStep + this.featherDuration; // ~1.83s
      
      // 3. Jiggle + Leg Kick of A, S, C: 1.85s -> 2.85s
      this.tJiggleStart = 1.85;
      this.tKickImpact = 2.15; // Leg strikes / pushes A S C
      this.tAscSettle = 2.75;  // A, S, C locked into baseline
      this.tJiggleEnd = 2.85;
      
      // 4. Completed Glory Pose / Cycle End: 2.85s -> 3.85s
      this.tHoldDuration = 1.0; // User requested: "after the faether loading animation only wait 1sec"
      this.tTotalCycle = this.tJiggleEnd + this.tHoldDuration; // ~3.85s
      
      this.animTime = 0.0;
      this.isPlaying = true;
      this.isFinished = false;
      
      // Cache
      this.feathers = {};
      this.letters = {};
      this.bodyPivot = null;
      this.rootGroup = null;
      this.particles = null;
      this.lights = {};
      
      this.initScene();
      this.buildModel();
      this.buildLetters();
      this.createParticles();
      this.bindEvents();
      
      this.lastTimestamp = performance.now();
      this.animate = this.animate.bind(this);
      this.animFrameId = requestAnimationFrame(this.animate);
    }

    initScene() {
      const width = this.container.clientWidth || window.innerWidth;
      const height = this.container.clientHeight || window.innerHeight;

      this.scene = new THREE.Scene();

      // Automatically adapt FOV and distance on mobile portrait screens so peacock fits screen perfectly
      const isMobile = width < 768;
      const aspect = width / height;
      const fov = isMobile ? Math.min(50, Math.max(38, 38 / Math.max(0.45, aspect * 1.4))) : 40;

      this.camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 100);
      this.camera.position.set(0, isMobile ? 0.1 : 0, isMobile ? 8.6 : 8.2);

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.25;
      
      this.container.appendChild(this.renderer.domElement);

      if (this.interactive && window.THREE && window.THREE.OrbitControls) {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.06;
        this.controls.enablePan = false;
        this.controls.minDistance = 4.0;
        this.controls.maxDistance = 14.0;
        this.controls.maxPolarAngle = Math.PI * 0.75;
        this.controls.minPolarAngle = Math.PI * 0.25;
      }

      // Responsive model scale: Increased by 25% on mobile for strong visual presence while framing cleanly
      const initialScale = isMobile ? Math.min(0.60, Math.max(0.45, (width / 480) * 0.55)) : this.modelScale;
      this.rootGroup = new THREE.Group();
      this.rootGroup.scale.set(initialScale, initialScale, initialScale);
      this.scene.add(this.rootGroup);

      this.setupLighting();
    }

    setupLighting() {
      this.lights.ambient = new THREE.AmbientLight(0xffffff, 0.65);
      this.scene.add(this.lights.ambient);

      this.lights.key = new THREE.DirectionalLight(0xfff8ee, 1.4);
      this.lights.key.position.set(3, 4, 6);
      this.scene.add(this.lights.key);

      this.lights.rim = new THREE.DirectionalLight(this.currentTheme.accentColor, 1.2);
      this.lights.rim.position.set(-4, 3, -4);
      this.scene.add(this.lights.rim);

      this.lights.spark = new THREE.PointLight(this.currentTheme.accentColor, 2.0, 7);
      this.lights.spark.position.set(0, 0, 1.5);
      this.scene.add(this.lights.spark);
    }

    buildModel() {
      const data = window.PEACOCK_MODEL_DATA;
      const pivots = window.PEACOCK_PIVOT_INFO;
      
      if (!data) {
        console.error('PEACOCK_MODEL_DATA not found.');
        return;
      }

      // 1. Peacock Body (Torso and two "ii" legs)
      const bodyData = data['peacock'];
      if (bodyData) {
        const bodyGeo = new THREE.BufferGeometry();
        bodyGeo.setAttribute('position', new THREE.Float32BufferAttribute(bodyData.vertices, 3));
        bodyGeo.setIndex(bodyData.indices);
        bodyGeo.computeVertexNormals();

        const bCenter = pivots.body ? pivots.body.center : bodyData.pivot;
        this.bodyPivot = new THREE.Group();
        this.bodyPivot.position.set(bCenter[0], bCenter[1], bCenter[2] || 0);
        this.bodyPivotOrigPos = new THREE.Vector3(bCenter[0], bCenter[1], bCenter[2] || 0);

        bodyGeo.translate(-bCenter[0], -bCenter[1], -bCenter[2] || 0);

        this.bodyMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(this.currentTheme.body),
          roughness: this.currentTheme.bodyRoughness,
          metalness: this.currentTheme.bodyMetalness,
          emissive: new THREE.Color(this.currentTheme.bodyEmissive),
          emissiveIntensity: 0.25,
          side: THREE.DoubleSide
        });

        this.bodyMesh = new THREE.Mesh(bodyGeo, this.bodyMat);
        this.bodyPivot.add(this.bodyMesh);
        this.rootGroup.add(this.bodyPivot);

        this.bodyPivot.scale.set(0, 0, 0);
      }

      // 2. Build Feathers (feather1 to feather13)
      this.feathersGroup = new THREE.Group();
      this.rootGroup.add(this.feathersGroup);

      this.featherOrder.forEach((fname, idx) => {
        const fData = data[fname];
        if (!fData) return;

        const fGeo = new THREE.BufferGeometry();
        fGeo.setAttribute('position', new THREE.Float32BufferAttribute(fData.vertices, 3));
        fGeo.setIndex(fData.indices);
        fGeo.computeVertexNormals();

        const pInfo = (pivots && pivots[fname]) || {};
        const base = pInfo.base || fData.pivot || [0, 0, 0];
        const tip = pInfo.tip || [0, 1, 0];
        const angleDeg = pInfo.angle_deg !== undefined ? pInfo.angle_deg : fData.angle_deg;
        const angleRad = (angleDeg * Math.PI) / 180.0;

        const rayDir = new THREE.Vector2(tip[0] - base[0], tip[1] - base[1]).normalize();

        const pivotGroup = new THREE.Group();
        pivotGroup.position.set(base[0], base[1], base[2] || 0);

        fGeo.translate(-base[0], -base[1], -base[2] || 0);

        const colorHex = this.currentTheme.feathers[idx] || this.currentTheme.accentColor;
        const featherMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(colorHex),
          roughness: 0.25,
          metalness: 0.35,
          emissive: new THREE.Color(colorHex),
          emissiveIntensity: 0.1,
          side: THREE.DoubleSide
        });

        const featherMesh = new THREE.Mesh(fGeo, featherMat);
        pivotGroup.add(featherMesh);
        this.feathersGroup.add(pivotGroup);

        pivotGroup.scale.set(0, 0, 0);

        this.feathers[fname] = {
          pivotGroup,
          mesh: featherMesh,
          material: featherMat,
          basePos: new THREE.Vector3(base[0], base[1], base[2] || 0),
          baseAngle: angleRad,
          rayDir: rayDir,
          colorHex: colorHex,
          index: idx
        };
      });
    }

    buildLetters() {
      const data = window.PEACOCK_MODEL_DATA;
      const pivots = window.PEACOCK_PIVOT_INFO;
      
      this.lettersGroup = new THREE.Group();
      this.rootGroup.add(this.lettersGroup);

      const letterNames = ['A', 's', 'c'];
      letterNames.forEach(key => {
        const lData = data[key];
        if (!lData) return;

        const lGeo = new THREE.BufferGeometry();
        lGeo.setAttribute('position', new THREE.Float32BufferAttribute(lData.vertices, 3));
        lGeo.setIndex(lData.indices);
        lGeo.computeVertexNormals();

        const pInfo = (pivots && pivots[key]) || {};
        const targetCenter = pInfo.center || [0, 0, 0];

        const pivotGroup = new THREE.Group();
        pivotGroup.position.set(targetCenter[0], targetCenter[1], targetCenter[2] || 0);

        lGeo.translate(-targetCenter[0], -targetCenter[1], -targetCenter[2] || 0);

        const colHex = (this.currentTheme.letters && this.currentTheme.letters[key]) || this.currentTheme.accentColor;
        const letterMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(colHex),
          roughness: 0.2,
          metalness: 0.5,
          emissive: new THREE.Color(colHex),
          emissiveIntensity: 0.25,
          side: THREE.DoubleSide
        });

        const letterMesh = new THREE.Mesh(lGeo, letterMat);
        pivotGroup.add(letterMesh);
        this.lettersGroup.add(pivotGroup);

        // Hide initially until kicked from legs
        pivotGroup.scale.set(0, 0, 0);

        this.letters[key] = {
          pivotGroup,
          mesh: letterMesh,
          material: letterMat,
          targetPos: new THREE.Vector3(targetCenter[0], targetCenter[1], targetCenter[2] || 0),
          kickStartPos: new THREE.Vector3(-0.35, -1.65, 0.0)
        };
      });
    }

    createParticles() {
      const count = 90;
      const positions = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const r = 0.8 + Math.random() * 3.0;
        positions[i * 3 + 0] = Math.cos(theta) * r;
        positions[i * 3 + 1] = Math.sin(theta) * r - 0.2;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 1.6;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.4, 'rgba(200,240,255,0.7)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);

      const texture = new THREE.CanvasTexture(canvas);

      this.particleMat = new THREE.PointsMaterial({
        size: 0.13,
        map: texture,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        color: new THREE.Color(this.currentTheme.particleColor)
      });

      this.particles = new THREE.Points(geo, this.particleMat);
      this.scene.add(this.particles);
    }

    update(deltaTime) {
      if (!this.isPlaying) return;

      const dt = deltaTime * this.speed;
      this.animTime += dt;

      if (this.animTime >= this.tTotalCycle) {
        if (this.loop && !this.isFinished) {
          this.animTime = this.animTime % this.tTotalCycle;
        } else {
          if (!this.hasTriggeredComplete) {
            this.hasTriggeredComplete = true;
            if (this.onComplete) this.onComplete();
          }
          // Continue incrementing animTime so the idle breathing & floating continues indefinitely
        }
      }

      const t = this.animTime;

      // -------------------------------------------------------------
      // PHASE 1: PEACOCK BODY ENTRANCE (Torso + "ii" legs)
      // -------------------------------------------------------------
      if (this.bodyPivot) {
        if (t < this.tBodyStart) {
          this.bodyPivot.scale.set(0, 0, 0);
        } else if (t <= this.tBodyEnd) {
          const u = (t - this.tBodyStart) / (this.tBodyEnd - this.tBodyStart);
          const s = easeOutBack(u);
          this.bodyPivot.scale.set(s, s, s);
          this.bodyPivot.rotation.z = (1 - u) * 0.25;
        } else if (t < this.tJiggleStart) {
          this.bodyPivot.scale.set(1, 1, 1);
          this.bodyPivot.rotation.z = 0;
          this.bodyPivot.position.copy(this.bodyPivotOrigPos);
        }
      }

      // -------------------------------------------------------------
      // PHASE 2: SEQUENTIAL FEATHER DEPLOYMENT (feather1 -> feather13)
      // "WITH THE SAME ANGLE EACH FEATHER TO ANIMATE"
      // -------------------------------------------------------------
      let lastActiveFeatherPos = null;

      this.featherOrder.forEach((fname, i) => {
        const item = this.feathers[fname];
        if (!item) return;

        const fStart = this.tFeathersStart + i * this.featherStep;
        const fEnd = fStart + this.featherDuration;

        if (t < fStart) {
          item.pivotGroup.scale.set(0, 0, 0);
          item.pivotGroup.position.copy(item.basePos);
          item.pivotGroup.rotation.z = 0;
          item.material.emissiveIntensity = 0.05;
        } else if (t < fEnd) {
          const u = (t - fStart) / this.featherDuration;
          const s = easeOutBack(u);

          item.pivotGroup.scale.set(s, s, s);
          const angleOffset = (1 - easeOutQuad(u)) * 0.22;
          item.pivotGroup.rotation.z = angleOffset;

          const popDist = (1 - easeOutQuad(u)) * -0.25;
          item.pivotGroup.position.set(
            item.basePos.x + item.rayDir.x * popDist,
            item.basePos.y + item.rayDir.y * popDist,
            item.basePos.z
          );

          item.material.emissiveIntensity = THREE.MathUtils.lerp(1.3, 0.15, u);
          lastActiveFeatherPos = item.basePos;
        } else if (t < this.tJiggleStart) {
          item.pivotGroup.scale.set(1, 1, 1);
          item.pivotGroup.position.copy(item.basePos);
          item.pivotGroup.rotation.z = 0;
          item.material.emissiveIntensity = 0.15;
        }
      });

      // Update sparkle light position
      if (lastActiveFeatherPos && this.lights.spark) {
        this.lights.spark.position.set(lastActiveFeatherPos.x, lastActiveFeatherPos.y, 1.2);
        this.lights.spark.intensity = 2.5;
      }

      // -------------------------------------------------------------
      // PHASE 3: PEACOCK JIGGLE + LEGS ("ii") KICK & PUSH OF "A S C"
      // -------------------------------------------------------------
      if (t >= this.tJiggleStart && t < this.tJiggleEnd) {
        const tj = (t - this.tJiggleStart) / (this.tJiggleEnd - this.tJiggleStart);
        const decay = Math.exp(-3.2 * tj);

        // Body Jiggle + Leg Kick Motion
        if (this.bodyPivot) {
          let kickAngle = 0;
          if (t < this.tKickImpact) {
            const ku = (t - this.tJiggleStart) / (this.tKickImpact - this.tJiggleStart);
            kickAngle = Math.sin(ku * Math.PI * 0.5) * 0.16; // Windup
          } else {
            const ku = (t - this.tKickImpact) / (this.tJiggleEnd - this.tKickImpact);
            const kickImpulse = Math.exp(-4.5 * ku) * Math.sin(ku * Math.PI * 8);
            kickAngle = -0.22 * Math.exp(-5.0 * ku) + kickImpulse * 0.08;
          }

          const bodySquash = 0.15 * decay * Math.sin(tj * Math.PI * 10);
          this.bodyPivot.scale.set(1.0 - bodySquash * 0.6, 1.0 + bodySquash, 1.0);
          this.bodyPivot.rotation.z = kickAngle;
        }

        // Feather Ripple Jiggle
        this.featherOrder.forEach((fname, i) => {
          const item = this.feathers[fname];
          if (!item) return;

          const wavePhase = i * 0.32;
          const featherDecay = Math.exp(-3.0 * Math.max(0, tj - i * 0.02));
          const jiggleAngle = 0.12 * featherDecay * Math.sin(tj * Math.PI * 12 - wavePhase);
          const jiggleScale = 1.0 + 0.08 * featherDecay * Math.cos(tj * Math.PI * 10 - wavePhase);

          item.pivotGroup.rotation.z = jiggleAngle;
          item.pivotGroup.scale.set(jiggleScale, jiggleScale, jiggleScale);
        });
      } else if (t >= this.tJiggleEnd) {
        // Settle body & feathers in completed glory pose
        const idleTime = t - this.tJiggleEnd;
        const breath = 1.0 + Math.sin(idleTime * 2.5) * 0.015;

        if (this.bodyPivot) {
          this.bodyPivot.scale.set(breath, breath, 1.0);
          this.bodyPivot.rotation.z = 0;
        }
        this.featherOrder.forEach((fname, i) => {
          const item = this.feathers[fname];
          if (item) {
            const fBreath = 1.0 + Math.sin(idleTime * 2.5 + i * 0.15) * 0.012;
            item.pivotGroup.scale.set(fBreath, fBreath, 1.0);
            item.pivotGroup.rotation.z = 0;
          }
        });
      }

      // -------------------------------------------------------------
      // KICK & SLIDE OF LETTERS A, S, C (Spelling ASCII)
      // -------------------------------------------------------------
      const kickOrder = [
        { key: 'c', delay: 0.00, duration: 0.38 },
        { key: 's', delay: 0.08, duration: 0.42 },
        { key: 'A', delay: 0.16, duration: 0.46 }
      ];

      kickOrder.forEach(({ key, delay, duration }) => {
        const item = this.letters[key];
        if (!item) return;

        const letterStart = this.tKickImpact + delay;
        const letterEnd = letterStart + duration;

        if (t < letterStart) {
          item.pivotGroup.scale.set(0, 0, 0);
          item.pivotGroup.position.copy(item.kickStartPos);
        } else if (t < letterEnd) {
          const u = (t - letterStart) / duration;
          const easeProgress = easeOutElastic(u);

          item.pivotGroup.scale.set(easeProgress, easeProgress, easeProgress);
          item.pivotGroup.position.lerpVectors(item.kickStartPos, item.targetPos, easeProgress);
          item.pivotGroup.rotation.z = (1 - easeOutCubic(u)) * (key === 'c' ? 0.35 : key === 's' ? 0.5 : 0.65);
          item.material.emissiveIntensity = THREE.MathUtils.lerp(1.5, 0.25, u);
        } else {
          // Locked in place with subtle breath
          item.pivotGroup.scale.set(1, 1, 1);
          item.pivotGroup.position.copy(item.targetPos);
          item.pivotGroup.rotation.z = 0;
          item.material.emissiveIntensity = 0.25;
        }
      });

      // Subtle float tilt on the entire logo
      if (this.rootGroup) {
        this.rootGroup.position.y = Math.sin(this.animTime * 1.8) * 0.04;
        this.rootGroup.rotation.y = Math.sin(this.animTime * 1.2) * 0.035;
      }

      // Rotate background particles
      if (this.particles) {
        this.particles.rotation.z = this.animTime * 0.04;
      }

      // Progress reporting
      const loadingPercent = this.calculateProgress(t);
      if (this.onProgress) {
        let statusText = 'Initializing...';
        if (t < this.tBodyEnd) statusText = 'Summoning Peacock...';
        else if (t < this.tFeathersEnd) {
          const count = Math.min(13, Math.floor(((t - this.tFeathersStart) / (this.tFeathersEnd - this.tFeathersStart)) * 13) + 1);
          statusText = `Fanning Feathers (${count}/13)...`;
        } else if (t < this.tKickImpact) {
          statusText = 'Peacock Jiggle...';
        } else if (t < this.tAscSettle) {
          statusText = 'Legs Kick: A S C I I!';
        } else {
          statusText = 'ASCII Ready!';
        }
        this.onProgress(loadingPercent, statusText);
      }
    }

    calculateProgress(t) {
      if (t <= 0) return 0;
      if (t >= this.tAscSettle) return 100;

      if (t < this.tBodyEnd) {
        return Math.round((t / this.tBodyEnd) * 15);
      } else if (t < this.tFeathersEnd) {
        const u = (t - this.tFeathersStart) / (this.tFeathersEnd - this.tFeathersStart);
        return Math.round(15 + u * 55); // 15% -> 70%
      } else {
        const u = (t - this.tFeathersEnd) / (this.tAscSettle - this.tFeathersEnd);
        return Math.round(70 + u * 30); // 70% -> 100%
      }
    }

    animate() {
      if (!this.isPlaying) return;
      this.animFrameId = requestAnimationFrame(this.animate);
      const now = performance.now();
      const deltaTime = (now - this.lastTimestamp) / 1000.0;
      this.lastTimestamp = now;

      this.update(Math.min(deltaTime, 0.1));

      if (this.controls) {
        this.controls.update();
      }

      this.renderer.render(this.scene, this.camera);
    }

    setTheme(key) {
      if (!THEMES[key]) return;
      this.themeKey = key;
      this.currentTheme = THEMES[key];

      if (this.bodyMat) {
        this.bodyMat.color.set(this.currentTheme.body);
        this.bodyMat.emissive.set(this.currentTheme.bodyEmissive);
        this.bodyMat.roughness = this.currentTheme.bodyRoughness;
        this.bodyMat.metalness = this.currentTheme.bodyMetalness;
      }

      this.featherOrder.forEach((fname, idx) => {
        const item = this.feathers[fname];
        if (!item) return;
        const col = this.currentTheme.feathers[idx] || this.currentTheme.accentColor;
        item.material.color.set(col);
        item.material.emissive.set(col);
      });

      ['A', 's', 'c'].forEach(k => {
        const item = this.letters[k];
        if (!item) return;
        const col = (this.currentTheme.letters && this.currentTheme.letters[k]) || this.currentTheme.accentColor;
        item.material.color.set(col);
        item.material.emissive.set(col);
      });

      if (this.particleMat) {
        this.particleMat.color.set(this.currentTheme.particleColor);
      }
      if (this.lights.rim) {
        this.lights.rim.color.set(this.currentTheme.accentColor);
      }
    }

    setSpeed(speed) {
      this.speed = Math.max(0.1, Math.min(4.0, speed));
    }

    replay() {
      this.animTime = 0.0;
      this.isPlaying = true;
      this.hasTriggeredComplete = false;
    }

    play() {
      this.isPlaying = true;
    }

    pause() {
      this.isPlaying = false;
    }

    reset() {
      this.animTime = 0.0;
      this.update(0);
    }

    finish() {
      this.isFinished = true;
      if (this.animTime < this.tJiggleStart) {
        this.animTime = this.tJiggleStart;
      }
    }

    bindEvents() {
      this.handleResize = () => {
        const width = this.container.clientWidth || window.innerWidth;
        const height = this.container.clientHeight || window.innerHeight;
        const isMobile = width < 768;
        const aspect = width / height;

        this.camera.fov = isMobile ? Math.min(50, Math.max(38, 38 / Math.max(0.45, aspect * 1.4))) : 40;
        this.camera.aspect = aspect;
        this.camera.position.set(0, isMobile ? 0.1 : 0, isMobile ? 8.6 : 8.2);
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);

        const targetScale = isMobile ? Math.min(0.60, Math.max(0.45, (width / 480) * 0.55)) : this.modelScale;
        if (this.rootGroup) {
          this.rootGroup.scale.set(targetScale, targetScale, targetScale);
        }
      };
      window.addEventListener('resize', this.handleResize);
    }

    destroy() {
      this.isPlaying = false;
      if (this.handleResize) {
        window.removeEventListener('resize', this.handleResize);
      }
      if (this.animFrameId) {
        cancelAnimationFrame(this.animFrameId);
      }
      if (this.renderer && this.renderer.domElement) {
        this.renderer.domElement.remove();
      }
    }
  }

  PeacockLoader.THEMES = THEMES;
  return PeacockLoader;
}));
