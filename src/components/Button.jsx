import { Link } from "react-router-dom";
import "./Button.css";

/**
 * Shared button component.
 *
 * variant: "primary" | "secondary" | "ghost"
 * size: "md" | "sm"
 * Renders a <Link> when `to` is provided, otherwise a <button>.
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  type = "button",
  icon: Icon,
  onClick,
  className = "",
  ...rest
}) {
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim();

  const content = (
    <>
      {Icon ? <Icon className="btn__icon" size={18} aria-hidden="true" /> : null}
      <span>{children}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...rest}>
      {content}
    </button>
  );
}
