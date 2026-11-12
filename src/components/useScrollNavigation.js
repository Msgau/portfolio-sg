import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PAGES, pageIndex, useAnimatedNavigate } from "./navigation";

const WHEEL_THRESHOLD = 30; // delta minimal d'une molette
const SWIPE_THRESHOLD = 70; // distance minimale d'un balayage tactile (px)
const COOLDOWN = 900; // délai entre deux changements de page (ms)

// Vrai si un parent de `el` peut encore défiler dans le sens demandé
// (dans ce cas, le scroll doit défiler le contenu, pas changer de page)
function canScrollInside(el, direction) {
  for (let node = el; node && node !== document.body; node = node.parentElement) {
    if (node.tagName === "TEXTAREA") return true;
    const { overflowY } = getComputedStyle(node);
    const scrollable = /(auto|scroll)/.test(overflowY) && node.scrollHeight > node.clientHeight + 1;
    if (!scrollable) continue;
    const atTop = node.scrollTop <= 0;
    const atBottom = node.scrollTop + node.clientHeight >= node.scrollHeight - 1;
    if (direction > 0 ? !atBottom : !atTop) return true;
  }
  const doc = document.documentElement;
  if (doc.scrollHeight > doc.clientHeight + 1) {
    const atTop = window.scrollY <= 0;
    const atBottom = window.scrollY + window.innerHeight >= doc.scrollHeight - 1;
    if (direction > 0 ? !atBottom : !atTop) return true;
  }
  return false;
}

export default function useScrollNavigation() {
  const { pathname } = useLocation();
  const navigate = useAnimatedNavigate();

  useEffect(() => {
    const index = pageIndex(pathname);
    if (index === -1) return undefined; // pas de navigation depuis la 404

    let locked = false;
    let touchStartY = null;

    const go = (direction, target) => {
      if (locked || document.querySelector(".modal-overlay")) return;
      if (canScrollInside(target, direction)) return;
      const next = PAGES[index + direction];
      if (!next) return;
      locked = true;
      setTimeout(() => (locked = false), COOLDOWN);
      navigate(next);
    };

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      go(e.deltaY > 0 ? 1 : -1, e.target);
    };
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e) => {
      if (touchStartY === null) return;
      const delta = touchStartY - e.changedTouches[0].clientY;
      touchStartY = null;
      if (Math.abs(delta) < SWIPE_THRESHOLD) return;
      go(delta > 0 ? 1 : -1, e.target);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [pathname, navigate]);
}
