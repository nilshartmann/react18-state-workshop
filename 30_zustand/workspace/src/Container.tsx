import React from "react";

// ======================================================================================
// 👮  ⛔️  sowas wie in dieser Datei bitte NIE in einer richtigen Anwendung machen ⛔️   👮
// ======================================================================================

type ContainerProps = {
  children: React.ReactNode;
  title: string;
  color?: string;
};

/*Auf true stellen, dann wird die Anzahl der Renderings angezeigt
 */
const showRenderings = true;

/**
 */
const hideBorder = false;

const renderMap: Record<string, number> = {};

export default function Container({
  children,
  title,
  color = "black",
}: ContainerProps) {
  let renderCount = (renderMap[title] || 0) + 1;
  renderMap[title] = renderCount;

  console.log(`Render '${title}'`, renderCount);

  if (!showRenderings && hideBorder) {
    return <div>{children}</div>;
  }

  const style: React.CSSProperties = {
    padding: "0.5rem",
    margin: "0.5rem",
    border: `1px dotted ${color}`,
  };
  return (
    <div style={style}>
      <div style={{ marginBottom: "1rem" }}>
        <b style={{ color: "gray" }}>
          {title} {showRenderings && <>(Renderings: {renderCount})</>}
        </b>
      </div>
      <div style={{ marginLeft: "0.5rem" }}>{children}</div>
    </div>
  );
}
