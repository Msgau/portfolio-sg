import { useCallback } from "react";
import { flushSync } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";

// Ordre des pages, identique à celui du menu
export const PAGES = ["/", "/presentation", "/projets", "/contact"];

export function pageIndex(pathname) {
  return PAGES.indexOf(pathname === "/home" ? "/" : pathname);
}

// Renvoie une fonction de navigation qui anime le changement de page
// (défilement vertical, dans le sens de l'ordre du menu) quand le navigateur
// supporte les View Transitions. Sinon, simple navigation.
export function useAnimatedNavigate() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return useCallback(
    (to) => {
      if (to === pathname) return;
      const from = pageIndex(pathname);
      const target = pageIndex(to);
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!document.startViewTransition || reduceMotion) {
        navigate(to);
        return;
      }
      const root = document.documentElement;
      root.dataset.navDirection = target >= 0 && from >= 0 && target < from ? "up" : "down";
      const transition = document.startViewTransition(() => {
        flushSync(() => navigate(to));
      });
      transition.finished.finally(() => delete root.dataset.navDirection);
    },
    [navigate, pathname]
  );
}
