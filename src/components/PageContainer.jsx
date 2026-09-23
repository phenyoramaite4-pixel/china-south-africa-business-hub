import "./PageContainer.css";

/**
 * Consistent max-width content wrapper used across pages/sections.
 * width: "md" | "lg" | "xl" (defaults to "xl")
 */
export default function PageContainer({
  children,
  width = "xl",
  as: Tag = "div",
  className = "",
}) {
  return (
    <Tag className={`page-container page-container--${width} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
