"use client";

import { useEffect, useRef } from "react";
import type { MotionId } from "@/lib/templates/types";

interface SignatureMotionProps {
  motion: MotionId;
  accent: string;
  ink: string;
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*";

/**
 * Mounts one signature interaction for a template.
 *
 * The component renders nothing visible: it finds the surrounding
 * `[data-template-root]` and wires behaviour onto the elements that layout
 * exposes via data attributes. Every mechanic is pointer-, click- or
 * drag-driven, and each one changes real state rather than only decorating.
 */
export default function SignatureMotion({ motion, accent, ink }: SignatureMotionProps) {
  const marker = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = marker.current?.closest("[data-template-root]") as HTMLElement | null;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const teardown: Array<() => void> = [];

    const listen = <K extends keyof HTMLElementEventMap>(
      el: HTMLElement | Document | Window,
      type: K,
      handler: (event: HTMLElementEventMap[K]) => void,
      options?: AddEventListenerOptions
    ) => {
      el.addEventListener(type, handler as EventListener, options);
      teardown.push(() => el.removeEventListener(type, handler as EventListener, options));
    };

    // Progressive reveal for the few blocks that opt in.
    const revealables = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (revealables.length > 0) {
      if (reduced) {
        revealables.forEach((el) => el.classList.add("is-revealed"));
      } else {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-revealed");
                observer.unobserve(entry.target);
              }
            });
          },
          { rootMargin: "0px 0px -12% 0px" }
        );
        revealables.forEach((el) => observer.observe(el));
        teardown.push(() => observer.disconnect());
      }
    }

    if (reduced) return () => teardown.forEach((fn) => fn());

    const centerOf = (el: Element) => {
      const rect = el.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    };

    switch (motion) {
      /* Pointer leaves a fading ink trail inside the hero. */
      case "inkTrail": {
        const host = root.querySelector<HTMLElement>("[data-ink-host]");
        if (!host) break;
        let last = 0;
        let count = 0;
        listen(host, "pointermove", (event) => {
          const now = performance.now();
          if (now - last < 34 || count > 46) return;
          last = now;
          count += 1;
          const rect = host.getBoundingClientRect();
          const dot = document.createElement("span");
          const size = 5 + Math.random() * 6;
          dot.style.cssText = `position:absolute;left:${event.clientX - rect.left}px;top:${
            event.clientY - rect.top
          }px;width:${size}px;height:${size}px;border-radius:9999px;background:${accent};pointer-events:none;`;
          host.appendChild(dot);
          const animation = dot.animate(
            [
              { opacity: 0.55, transform: "translate(-50%,-50%) scale(1)" },
              {
                opacity: 0,
                transform: `translate(calc(-50% + ${(Math.random() - 0.5) * 26}px), calc(-50% + ${
                  18 + Math.random() * 20
                }px)) scale(0.1)`,
              },
            ],
            { duration: 900 + Math.random() * 400, easing: "cubic-bezier(.2,.7,.3,1)" }
          );
          animation.onfinish = () => {
            dot.remove();
            count -= 1;
          };
        });
        break;
      }

      /* A physical seal that compresses, latches, and releases. */
      case "sealPress": {
        root.querySelectorAll<HTMLElement>("[data-seal]").forEach((seal) => {
          const handler = () => {
            const pressed = seal.getAttribute("aria-pressed") === "true";
            seal.setAttribute("aria-pressed", pressed ? "false" : "true");
            seal.classList.toggle("is-sealed", !pressed);
            seal.animate(
              pressed
                ? [{ transform: "scale(1)" }, { transform: "scale(0.96)" }, { transform: "scale(1)" }]
                : [
                    { transform: "scale(1.16) rotate(-4deg)" },
                    { transform: "scale(0.94) rotate(2deg)" },
                    { transform: "scale(1) rotate(0deg)" },
                  ],
              { duration: 380, easing: "cubic-bezier(.2,1.3,.4,1)" }
            );
          };
          listen(seal, "click", handler);
        });
        break;
      }

      /* Concentric rings and crosshairs track the pointer around a subject. */
      case "ringFollow": {
        const panel = root.querySelector<HTMLElement>("[data-ring-panel]");
        if (!panel) break;
        const rings = Array.from(panel.querySelectorAll<HTMLElement>("[data-ring]"));
        const crosshairs = Array.from(panel.querySelectorAll<HTMLElement>("[data-crosshair]"));
        let frame = 0;
        let angle = 0;
        listen(panel, "pointermove", (event) => {
          if (frame) return;
          frame = requestAnimationFrame(() => {
            frame = 0;
            const { x, y } = centerOf(panel);
            const dx = event.clientX - x;
            const dy = event.clientY - y;
            angle = (Math.atan2(dy, dx) * 180) / Math.PI;
            rings.forEach((ring, index) => {
              ring.style.transform = `rotate(${angle * (index % 2 === 0 ? 1 : -0.6)}deg)`;
            });
            const rect = panel.getBoundingClientRect();
            crosshairs.forEach((line, index) => {
              const position =
                index === 0
                  ? ((event.clientY - rect.top) / rect.height) * 100
                  : ((event.clientX - rect.left) / rect.width) * 100;
              line.style.setProperty(index === 0 ? "--y" : "--x", `${position}%`);
            });
            panel.style.setProperty("--tx", `${Math.max(-6, Math.min(6, dx / 26))}deg`);
            panel.style.setProperty("--ty", `${Math.max(-6, Math.min(6, -dy / 26))}deg`);
          });
        });
        break;
      }

      /* Press-and-hold: a meter fills while held, commits on completion. */
      case "chargeHold": {
        root.querySelectorAll<HTMLElement>("[data-charge]").forEach((button) => {
          const fill = button.querySelector<HTMLElement>("[data-charge-fill]");
          const label = button.querySelector<HTMLElement>("[data-charge-label]");
          const resting = label?.textContent ?? "";
          let started = 0;
          let frame = 0;
          let holding = false;

          const paint = () => {
            if (!fill) return;
            const progress = Math.min(1, (performance.now() - started) / 900);
            fill.style.transform = `scaleX(${progress})`;
            if (progress >= 1) {
              holding = false;
              window.cancelAnimationFrame(frame);
              button.dataset.charged = "true";
              if (label) label.textContent = button.dataset.chargeDone ?? "Charged";
              const target = button.dataset.chargeTarget;
              if (target) {
                root.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }
              button.animate(
                [{ transform: "scale(1)" }, { transform: "scale(0.97)" }, { transform: "scale(1)" }],
                { duration: 320, easing: "ease-out" }
              );
              return;
            }
            frame = requestAnimationFrame(paint);
          };

          const start = () => {
            holding = true;
            started = performance.now();
            frame = requestAnimationFrame(paint);
          };
          const end = () => {
            if (!holding) return;
            holding = false;
            window.cancelAnimationFrame(frame);
            if (fill) {
              fill.animate([{ transform: fill.style.transform }, { transform: "scaleX(0)" }], {
                duration: 260,
                easing: "ease-out",
              });
              fill.style.transform = "scaleX(0)";
            }
            if (label && button.dataset.charged !== "true") label.textContent = resting;
          };

          listen(button, "pointerdown", start);
          listen(button, "pointerup", end);
          listen(button, "pointerleave", end);
          teardown.push(() => window.cancelAnimationFrame(frame));
        });
        break;
      }

      /* A searchlight follows the pointer, and a switch locks it on. */
      case "searchlight": {
        const beam = root.querySelector<HTMLElement>("[data-beam]");
        const signal = root.querySelector<HTMLElement>("[data-signal]");
        let locked = false;
        let frame = 0;
        listen(root, "pointermove", (event) => {
          if (locked || !beam || frame) return;
          frame = requestAnimationFrame(() => {
            frame = 0;
            const rect = root.getBoundingClientRect();
            const ratio = (event.clientX - rect.left) / rect.width;
            beam.style.transform = `rotate(${(-16 + ratio * 32).toFixed(2)}deg)`;
          });
        });
        if (signal) {
          listen(signal, "click", () => {
            locked = !locked;
            signal.setAttribute("aria-pressed", locked ? "true" : "false");
            signal.dataset.on = locked ? "true" : "false";
            root.dataset.signalled = locked ? "true" : "false";
            const state = signal.querySelector<HTMLElement>("[data-signal-state]");
            if (state) state.textContent = locked ? "On" : "Off";
            if (beam) beam.style.transform = locked ? "rotate(0deg)" : "rotate(-8deg)";
          });
        }
        break;
      }

      /* Native horizontal rail you can throw with the pointer. */
      case "dragRail": {
        root.querySelectorAll<HTMLElement>("[data-rail]").forEach((rail) => {
          let dragging = false;
          let startX = 0;
          let startScroll = 0;
          let velocity = 0;
          let lastX = 0;
          let frame = 0;

          const glide = () => {
            if (Math.abs(velocity) < 0.4) return;
            rail.scrollLeft -= velocity;
            velocity *= 0.94;
            frame = requestAnimationFrame(glide);
          };

          listen(rail, "pointerdown", (event) => {
            dragging = true;
            startX = event.clientX;
            lastX = event.clientX;
            startScroll = rail.scrollLeft;
            velocity = 0;
            window.cancelAnimationFrame(frame);
            rail.setPointerCapture(event.pointerId);
            rail.style.cursor = "grabbing";
          });
          listen(rail, "pointermove", (event) => {
            if (!dragging) return;
            velocity = event.clientX - lastX;
            lastX = event.clientX;
            rail.scrollLeft = startScroll - (event.clientX - startX) * 1.35;
          });
          const release = () => {
            if (!dragging) return;
            dragging = false;
            rail.style.cursor = "grab";
            frame = requestAnimationFrame(glide);
          };
          listen(rail, "pointerup", release);
          listen(rail, "pointercancel", release);
          listen(rail, "pointerleave", release);
          teardown.push(() => window.cancelAnimationFrame(frame));

          root.querySelectorAll<HTMLElement>("[data-rail-step]").forEach((button) => {
            listen(button, "click", () => {
              const direction = button.dataset.railStep === "next" ? 1 : -1;
              rail.scrollBy({ left: direction * rail.clientWidth * 0.7, behavior: "smooth" });
            });
          });
        });
        break;
      }

      /* Packaging flaps swing open on a hinge to reveal the case study. */
      case "flapOpen": {
        root.querySelectorAll<HTMLElement>("[data-flap]").forEach((card) => {
          const toggle = () => {
            const open = card.classList.toggle("is-open");
            card.setAttribute("aria-expanded", open ? "true" : "false");
          };
          listen(card, "click", toggle);
          listen(card, "keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              toggle();
            }
          });
        });
        break;
      }

      /* A rubber stamp deposits a permanent imprint. */
      case "stamp": {
        root.querySelectorAll<HTMLElement>("[data-stamp]").forEach((stamp) => {
          listen(stamp, "click", () => {
            const on = stamp.classList.toggle("is-stamped");
            stamp.setAttribute("aria-pressed", on ? "true" : "false");
            stamp.animate(
              on
                ? [
                    { transform: "scale(1.18) rotate(-8deg)" },
                    { transform: "scale(0.92) rotate(-2deg)" },
                    { transform: "scale(1) rotate(-6deg)" },
                  ]
                : [{ transform: "scale(1.06)" }, { transform: "scale(1)" }],
              { duration: 360, easing: "cubic-bezier(.2,1.4,.4,1)" }
            );
          });
        });
        break;
      }

      /* Text decodes from noise on hover. */
      case "scramble": {
        root.querySelectorAll<HTMLElement>("[data-scramble]").forEach((target) => {
          const original = target.textContent ?? "";
          let timer = 0;
          const run = () => {
            let step = 0;
            window.clearInterval(timer);
            timer = window.setInterval(() => {
              step += 1;
              const revealed = Math.floor((step / 14) * original.length);
              target.textContent = original
                .split("")
                .map((char, index) =>
                  index < revealed || char === " " ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
                )
                .join("");
              if (step >= 14) {
                window.clearInterval(timer);
                target.textContent = original;
              }
            }, 26);
          };
          ["pointerenter", "focus"].forEach((type) =>
            listen(target, type as "pointerenter", run)
          );
          teardown.push(() => window.clearInterval(timer));
        });
        break;
      }

      /* Cards lean toward the pointer individually. */
      case "tilt": {
        const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-tilt]"));
        targets.forEach((target) => {
          let frame = 0;
          listen(target, "pointermove", (event) => {
            if (frame) return;
            frame = requestAnimationFrame(() => {
              frame = 0;
              const rect = target.getBoundingClientRect();
              const px = (event.clientX - rect.left) / rect.width - 0.5;
              const py = (event.clientY - rect.top) / rect.height - 0.5;
              target.style.transform = `perspective(900px) rotateX(${(-py * 7).toFixed(
                2
              )}deg) rotateY(${(px * 9).toFixed(2)}deg) translateZ(0)`;
              target.style.setProperty("--glow-x", `${(px + 0.5) * 100}%`);
              target.style.setProperty("--glow-y", `${(py + 0.5) * 100}%`);
            });
          });
          listen(target, "pointerleave", () => {
            target.style.transform = "";
          });
        });
        break;
      }

      /* Speed lines spawned along the pointer's path. */
      case "streak": {
        const host = root.querySelector<HTMLElement>("[data-streak-host]");
        if (!host) break;
        let last = 0;
        listen(host, "pointermove", (event) => {
          const now = performance.now();
          if (now - last < 55) return;
          last = now;
          const rect = host.getBoundingClientRect();
          const line = document.createElement("span");
          const width = 40 + Math.random() * 120;
          line.style.cssText = `position:absolute;left:${event.clientX - rect.left}px;top:${
            event.clientY - rect.top
          }px;height:2px;width:${width}px;background:${accent};pointer-events:none;transform-origin:left center;`;
          host.appendChild(line);
          const animation = line.animate(
            [
              { opacity: 0.9, transform: "translate(-100%,-50%) scaleX(1)" },
              { opacity: 0, transform: "translate(20%,-50%) scaleX(0.2)" },
            ],
            { duration: 520, easing: "cubic-bezier(.1,.8,.2,1)" }
          );
          animation.onfinish = () => line.remove();
        });
        break;
      }

      /* Orbital rings respond to pointer position with parallax. */
      case "orbit": {
        const orbit = root.querySelector<HTMLElement>("[data-orbit]");
        if (!orbit) break;
        let frame = 0;
        listen(root, "pointermove", (event) => {
          if (frame) return;
          frame = requestAnimationFrame(() => {
            frame = 0;
            const rect = root.getBoundingClientRect();
            const px = (event.clientX - rect.left) / rect.width - 0.5;
            const py = (event.clientY - rect.top) / rect.height - 0.5;
            orbit.style.transform = `translate3d(${px * 26}px, ${py * 22}px, 0)`;
          });
        });
        break;
      }

      /* Light caustics drift with the pointer. */
      case "caustics": {
        let frame = 0;
        listen(root, "pointermove", (event) => {
          if (frame) return;
          frame = requestAnimationFrame(() => {
            frame = 0;
            const rect = root.getBoundingClientRect();
            root.style.setProperty("--caustic-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
            root.style.setProperty("--caustic-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
          });
        });
        break;
      }

      /* Star layers separate with pointer depth. */
      case "starfield": {
        const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-stars]"));
        let frame = 0;
        listen(root, "pointermove", (event) => {
          if (frame) return;
          frame = requestAnimationFrame(() => {
            frame = 0;
            const rect = root.getBoundingClientRect();
            const px = (event.clientX - rect.left) / rect.width - 0.5;
            const py = (event.clientY - rect.top) / rect.height - 0.5;
            layers.forEach((layer, index) => {
              const depth = (index + 1) * 9;
              layer.style.transform = `translate3d(${px * depth}px, ${py * depth}px, 0)`;
            });
          });
        });
        break;
      }

      /* Cards lean in toward the cursor as it passes. */
      case "magnet": {
        root.querySelectorAll<HTMLElement>("[data-magnet]").forEach((item) => {
          let frame = 0;
          listen(item, "pointermove", (event) => {
            if (frame) return;
            frame = requestAnimationFrame(() => {
              frame = 0;
              const rect = item.getBoundingClientRect();
              const px = (event.clientX - rect.left) / rect.width - 0.5;
              const py = (event.clientY - rect.top) / rect.height - 0.5;
              item.style.transform = `translate(${px * 12}px, ${py * 10}px)`;
            });
          });
          listen(item, "pointerleave", () => {
            item.style.transform = "";
          });
        });
        break;
      }

      /* A hand-drawn rule completes itself on hover. */
      case "runeDraw": {
        root.querySelectorAll<SVGPathElement>("[data-rune]").forEach((path) => {
          const length = path.getTotalLength();
          path.style.strokeDasharray = `${length}`;
          path.style.strokeDashoffset = "0";
          const host = path.closest<HTMLElement>("[data-rune-host]") ?? root;
          const draw = () => {
            path.animate(
              [{ strokeDashoffset: `${length}` }, { strokeDashoffset: "0" }],
              { duration: 620, easing: "cubic-bezier(.3,.9,.2,1)", fill: "both" }
            );
          };
          listen(host, "pointerenter", draw);
          listen(host, "focusin", draw);
        });
        break;
      }

      default:
        break;
    }

    if (ink) root.style.setProperty("--template-ink", ink);

    return () => teardown.forEach((fn) => fn());
  }, [motion, accent, ink]);

  return <div ref={marker} hidden aria-hidden="true" />;
}
