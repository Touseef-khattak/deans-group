// Recolors a stock MapLibre style to this site's design tokens, and quiets
// POI icons + house numbers so the map reads like a drafted plan rather than
// a generic street map. Colors are read live from CSS custom properties so
// this stays in sync with the Figma-driven theme in globals.css.

export function themeColors() {
  const style = getComputedStyle(document.documentElement);
  const v = (name: string) => style.getPropertyValue(name).trim();
  return {
    paper: v("--color-surface-warm") || "#fff6e8",
    paper2: v("--color-surface") || "#f9f9f9",
    building: v("--color-border") || "#d6d7d9",
    ink: v("--color-text-primary") || "#000000",
    inkSoft: v("--color-text-secondary") || "#303030",
    accent: v("--color-status-warning") || "#ffd748",
    water: v("--color-green-100") || "#cee4d8",
    waterLine: v("--color-green-300") || "#9cc9b1",
    green: v("--color-green-100") || "#cee4d8",
    primary: v("--color-primary") || "#00a650",
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function themeMapStyle(style: any) {
  const c = themeColors();
  const layers = (style.layers || []).map((layer: any) => {
    const L = { ...layer, paint: { ...layer.paint }, layout: { ...layer.layout } };
    const id = (L.id || "").toLowerCase();
    const sl = (L["source-layer"] || "").toLowerCase();

    if (L.type === "background") {
      L.paint["background-color"] = c.paper;
      return L;
    }
    if (sl === "water") {
      if (L.type === "fill") L.paint["fill-color"] = c.water;
      if (L.type === "line") L.paint["line-color"] = c.waterLine;
    }
    if (sl === "waterway" && L.type === "line") L.paint["line-color"] = c.waterLine;
    if ((sl === "landcover" || sl === "landuse" || sl === "park") && L.type === "fill") {
      const green = /park|wood|grass|forest|farmland|cemetery|nature|golf/.test(id);
      L.paint["fill-color"] = green ? c.green : c.paper2;
      L.paint["fill-opacity"] =
        layer.paint && layer.paint["fill-opacity"] != null ? layer.paint["fill-opacity"] : 0.7;
    }
    if (sl === "building") {
      if (L.type === "fill") {
        L.paint["fill-color"] = c.building;
        L.paint["fill-opacity"] = 0.5;
      }
      if (L.type === "line") L.paint["line-color"] = c.building;
    }
    if (sl === "boundary" && L.type === "line") {
      L.paint["line-color"] = c.primary;
      L.paint["line-dasharray"] = [2, 2];
    }
    if (sl === "transportation" || sl === "transportation_name") {
      if (L.type === "line") {
        const major = /motorway|trunk|primary/.test(id);
        L.paint["line-color"] = major ? c.accent : c.inkSoft;
        if (!major)
          L.paint["line-opacity"] =
            layer.paint && layer.paint["line-opacity"] != null ? layer.paint["line-opacity"] : 0.5;
      }
      if (L.type === "symbol") {
        L.paint["text-color"] = c.inkSoft;
        L.paint["text-halo-color"] = c.paper;
        L.paint["text-halo-width"] = 1.2;
      }
    }
    if (sl === "place" && L.type === "symbol") {
      L.paint["text-color"] = c.ink;
      L.paint["text-halo-color"] = c.paper;
      L.paint["text-halo-width"] = 1.4;
    }
    if (sl === "poi" || sl === "housenumber" || id.indexOf("poi") > -1) {
      L.layout.visibility = "none";
    }
    return L;
  });
  return { ...style, layers };
}
