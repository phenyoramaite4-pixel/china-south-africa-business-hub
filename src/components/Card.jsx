import "./Card.css";

/**
 * Generic surface card. `accent` optionally colors the left rule to
 * carry meaning (e.g. category or provider type) rather than as pure
 * decoration.
 * accent: "navy" | "red" | "green" | "gold" | null
 */
export default function Card({ children, accent = null, className = "", as: Tag = "div" }) {
  const accentClass = accent ? `card--accent-${accent}` : "";
  return (
    <Tag className={`card ${accentClass} ${className}`.trim()}>{children}</Tag>
  );
}
