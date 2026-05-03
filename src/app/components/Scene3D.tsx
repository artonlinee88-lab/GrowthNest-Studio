import { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  alpha: number;
  color: string;
}

const COLORS = ["#22d3ee", "#06b6d4", "#34d399", "#a78bfa", "#38bdf8"];

function project(p: Point3D, fov: number, cx: number, cy: number) {
  const z = p.z + fov;
  const factor = fov / z;
  return { sx: p.x * factor + cx, sy: p.y * factor + cy, factor };
}

function rotateY(p: Point3D, angle: number): Point3D {
  const cos = Math.cos(angle), sin = Math.sin(angle);
  return { x: p.x * cos + p.z * sin, y: p.y, z: -p.x * sin + p.z * cos };
}

function rotateX(p: Point3D, angle: number): Point3D {
  const cos = Math.cos(angle), sin = Math.sin(angle);
  return { x: p.x, y: p.y * cos - p.z * sin, z: p.y * sin + p.z * cos };
}

function rotateZ(p: Point3D, angle: number): Point3D {
  const cos = Math.cos(angle), sin = Math.sin(angle);
  return { x: p.x * cos - p.y * sin, y: p.x * sin + p.y * cos, z: p.z };
}

function generateSphereEdges(radius: number, latSegs: number, lonSegs: number) {
  const edges: [Point3D, Point3D][] = [];
  const pts: Point3D[][] = [];

  for (let lat = 0; lat <= latSegs; lat++) {
    pts.push([]);
    const theta = (lat / latSegs) * Math.PI;
    for (let lon = 0; lon <= lonSegs; lon++) {
      const phi = (lon / lonSegs) * Math.PI * 2;
      pts[lat].push({
        x: radius * Math.sin(theta) * Math.cos(phi),
        y: radius * Math.cos(theta),
        z: radius * Math.sin(theta) * Math.sin(phi),
      });
    }
  }

  for (let lat = 0; lat < latSegs; lat++) {
    for (let lon = 0; lon < lonSegs; lon++) {
      edges.push([pts[lat][lon], pts[lat][lon + 1]]);
      edges.push([pts[lat][lon], pts[lat + 1][lon]]);
    }
  }
  return edges;
}

function generateTorusEdges(R: number, r: number, segments: number, tubeSegs: number) {
  const edges: [Point3D, Point3D][] = [];
  const pts: Point3D[][] = [];

  for (let i = 0; i <= segments; i++) {
    pts.push([]);
    const u = (i / segments) * Math.PI * 2;
    for (let j = 0; j <= tubeSegs; j++) {
      const v = (j / tubeSegs) * Math.PI * 2;
      pts[i].push({
        x: (R + r * Math.cos(v)) * Math.cos(u),
        y: r * Math.sin(v),
        z: (R + r * Math.cos(v)) * Math.sin(u),
      });
    }
  }

  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < tubeSegs; j++) {
      edges.push([pts[i][j], pts[i][j + 1]]);
      edges.push([pts[i][j], pts[i + 1][j]]);
    }
  }
  return edges;
}

export function Scene3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // Particles
    const particles: Particle[] = Array.from({ length: 120 }, () => ({
      x: (Math.random() - 0.5) * W * 1.5,
      y: (Math.random() - 0.5) * H * 1.5,
      z: Math.random() * 600 - 300,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      vz: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 2.5 + 0.5,
      alpha: Math.random() * 0.7 + 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    const sphereEdges = generateSphereEdges(160, 10, 16);
    const torusEdges = generateTorusEdges(110, 38, 20, 12);
    const torusEdges2 = generateTorusEdges(80, 16, 10, 0.1);

    let rotX = 0, rotY = 0, rotZ = 0;
    let rotX2 = Math.PI / 4, rotY2 = 0, rotZ2 = Math.PI / 3;

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    const handleResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    function drawEdges(
      edges: [Point3D, Point3D][],
      rx: number, ry: number, rz: number,
      cx: number, cy: number,
      color: string,
      fov: number = 500
    ) {
      for (const [a, b] of edges) {
        let pa = rotateX(rotateY(rotateZ(a, rz), ry), rx);
        let pb = rotateX(rotateY(rotateZ(b, rz), ry), rx);
        const sa = project(pa, fov, cx, cy);
        const sb = project(pb, fov, cx, cy);
        const depthA = (pa.z + 400) / 800;
        const depthB = (pb.z + 400) / 800;
        const alpha = Math.max(0.05, Math.min(0.45, (depthA + depthB) / 2));

        ctx.beginPath();
        ctx.moveTo(sa.sx, sa.sy);
        ctx.lineTo(sb.sx, sb.sy);
        ctx.strokeStyle = color.replace(")", `, ${alpha})`).replace("rgb(", "rgba(");
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }

    function drawEdgesGlow(
      edges: [Point3D, Point3D][],
      rx: number, ry: number, rz: number,
      cx: number, cy: number,
      color: string,
      fov: number = 500
    ) {
      for (const [a, b] of edges) {
        let pa = rotateX(rotateY(rotateZ(a, rz), ry), rx);
        let pb = rotateX(rotateY(rotateZ(b, rz), ry), rx);
        const sa = project(pa, fov, cx, cy);
        const sb = project(pb, fov, cx, cy);
        const depthA = (pa.z + 400) / 800;
        const depthB = (pb.z + 400) / 800;
        const alpha = Math.max(0.02, Math.min(0.35, (depthA + depthB) / 2));

        ctx.beginPath();
        ctx.moveTo(sa.sx, sa.sy);
        ctx.lineTo(sb.sx, sb.sy);
        // Glow pass
        ctx.shadowBlur = 12;
        ctx.shadowColor = color;
        ctx.strokeStyle = color.replace(")", `, ${alpha})`).replace("rgb(", "rgba(");
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    }

    let t = 0;

    function loop() {
      t += 0.008;
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const scroll = scrollRef.current;

      // ---- Grid lines background ----
      const gridOffset = scroll * 0.3;
      ctx.save();
      const gridAlpha = 0.035;
      ctx.strokeStyle = `rgba(34,211,238,${gridAlpha})`;
      ctx.lineWidth = 1;
      const gridSpacing = 60;
      const cols = Math.ceil(W / gridSpacing) + 2;
      const rows = Math.ceil(H / gridSpacing) + 2;
      for (let i = 0; i < cols; i++) {
        const x = (i * gridSpacing - (gridOffset * 0.1) % gridSpacing);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let j = 0; j < rows; j++) {
        const y = (j * gridSpacing - (gridOffset * 0.2) % gridSpacing);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      ctx.restore();

      // ---- Particles ----
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        const scrollParallax = scroll * 0.04;

        if (p.x > W / 1.2) p.x = -W / 1.2;
        if (p.x < -W / 1.2) p.x = W / 1.2;
        if (p.y > H / 1.2) p.y = -H / 1.2;
        if (p.y < -H / 1.2) p.y = H / 1.2;
        if (p.z > 300) p.z = -300;
        if (p.z < -300) p.z = 300;

        const fov = 500;
        const projected = project(p, fov, W / 2, H / 2 - scrollParallax * 20);
        const scale = projected.factor;
        const r = Math.max(0.5, p.size * scale * 1.8);

        // Glow
        const grad = ctx.createRadialGradient(projected.sx, projected.sy, 0, projected.sx, projected.sy, r * 4);
        const alpha = p.alpha * Math.min(1, scale * 1.5);
        grad.addColorStop(0, p.color.replace(")", `, ${alpha})`).replace("rgb(", "rgba("));
        grad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(projected.sx, projected.sy, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(projected.sx, projected.sy, r, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(")", `, ${alpha})`).replace("rgb(", "rgba(");
        ctx.fill();
      }

      // Draw connecting lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const pa = particles[i], pb = particles[j];
          const dx = pa.x - pb.x, dy = pa.y - pb.y, dz = pa.z - pb.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < 140) {
            const fov = 500;
            const ppa = project(pa, fov, W / 2, H / 2);
            const ppb = project(pb, fov, W / 2, H / 2);
            const alpha = (1 - dist / 140) * 0.2;
            ctx.beginPath();
            ctx.moveTo(ppa.sx, ppa.sy);
            ctx.lineTo(ppb.sx, ppb.sy);
            ctx.strokeStyle = `rgba(34,211,238,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // ---- Mouse influence on particles ----
      for (const p of particles) {
        const fov = 500;
        const proj = project(p, fov, W / 2, H / 2);
        const dx = mx - proj.sx;
        const dy = my - proj.sy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.vx += (dx / dist) * 0.015;
          p.vy += (dy / dist) * 0.015;
          // Dampen
          p.vx *= 0.95;
          p.vy *= 0.95;
        }
      }

      // ---- Floating Glowing Orbs ----
      const orbPositions = [
        { cx: W * 0.18 + Math.sin(t * 0.7) * 30, cy: H * 0.3 + Math.cos(t * 0.5) * 25, r: 80, color: "6,182,212" },
        { cx: W * 0.82 + Math.cos(t * 0.6) * 35, cy: H * 0.25 + Math.sin(t * 0.4) * 30, r: 60, color: "52,211,153" },
        { cx: W * 0.5 + Math.sin(t * 0.4) * 20, cy: H * 0.7 + Math.cos(t * 0.3) * 20, r: 50, color: "167,139,250" },
      ];
      for (const orb of orbPositions) {
        const g = ctx.createRadialGradient(orb.cx, orb.cy, 0, orb.cx, orb.cy, orb.r);
        g.addColorStop(0, `rgba(${orb.color},0.22)`);
        g.addColorStop(0.5, `rgba(${orb.color},0.08)`);
        g.addColorStop(1, `rgba(${orb.color},0)`);
        ctx.beginPath();
        ctx.arc(orb.cx, orb.cy, orb.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      // ---- 3D Wireframe Sphere (center-right) ----
      const sphereCX = W * 0.75 + (mx - W / 2) * 0.03;
      const sphereCY = H * 0.45 + (my - H / 2) * 0.02;
      rotX += 0.005 + (my / H - 0.5) * 0.002;
      rotY += 0.009 + (mx / W - 0.5) * 0.002;
      rotZ += 0.002;
      drawEdgesGlow(sphereEdges, rotX, rotY, rotZ, sphereCX, sphereCY, "#22d3ee", 700);

      // ---- 3D Wireframe Torus (left side) ----
      const torusCX = W * 0.2 + (mx - W / 2) * 0.02;
      const torusCY = H * 0.55 + (my - H / 2) * 0.015;
      rotX2 += 0.007;
      rotY2 += 0.005 + (mx / W - 0.5) * 0.003;
      rotZ2 += 0.004;
      drawEdgesGlow(torusEdges, rotX2, rotY2, rotZ2, torusCX, torusCY, "#a78bfa", 600);

      // ---- Floating scan-line effect ----
      const scanY = ((t * 80) % (H + 60)) - 30;
      const scanGrad = ctx.createLinearGradient(0, scanY, 0, scanY + 3);
      scanGrad.addColorStop(0, "rgba(34,211,238,0)");
      scanGrad.addColorStop(0.5, "rgba(34,211,238,0.06)");
      scanGrad.addColorStop(1, "rgba(34,211,238,0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY, W, 3);

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 1 }}
    />
  );
}
