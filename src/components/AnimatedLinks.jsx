import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { useAnimatedNavigate } from "./navigation";

// Clic simple : navigation animée. Ctrl/Cmd/Maj/clic milieu : comportement natif.
function useClickHandler(to) {
  const go = useAnimatedNavigate();
  return (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    go(to);
  };
}

export function AnimatedLink({ to, ...props }) {
  return <Link to={to} onClick={useClickHandler(to)} {...props} />;
}

export function AnimatedNavLink({ to, ...props }) {
  return <NavLink to={to} onClick={useClickHandler(to)} {...props} />;
}

AnimatedLink.propTypes = AnimatedNavLink.propTypes = {
  to: PropTypes.string.isRequired,
};
