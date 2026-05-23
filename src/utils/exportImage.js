// src/utils/exportImage.js
/** Export the current circuit SVG as a downloadable SVG file */
export const exportSVG = (svgElement, defaultBaseName = `circuit_${Date.now()}`) => {
  const clone = svgElement.cloneNode(true);
  // Remove defs and any grid background rect
  const defs = clone.querySelector('defs');
  if (defs) clone.removeChild(defs);
  const bg = clone.querySelector('rect[fill^="url("]');
  if (bg) clone.removeChild(bg);
  // Preserve viewBox if present
  const viewBox = svgElement.getAttribute('viewBox');
  if (viewBox) clone.setAttribute('viewBox', viewBox);

  const serializer = new XMLSerializer();
  const source = serializer.serializeToString(clone);
  const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const filename = prompt('Enter a name for the SVG file (without extension):', defaultBaseName);
  if (!filename) {
    URL.revokeObjectURL(url);
    return;
  }
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.svg`;
  a.click();
  // Open preview
  window.open(url, '_blank');
  URL.revokeObjectURL(url);
};

/** Export the current circuit SVG as a high‑DPI PNG file */
export const exportPNG = (svgElement, defaultBaseName = `circuit_${Date.now()}`) => {
  const clone = svgElement.cloneNode(true);
  // Clean up defs and grid background
  const defs = clone.querySelector('defs');
  if (defs) clone.removeChild(defs);
  const bg = clone.querySelector('rect[fill^="url("]');
  if (bg) clone.removeChild(bg);
  // Preserve viewBox
  const viewBox = svgElement.getAttribute('viewBox');
  if (viewBox) clone.setAttribute('viewBox', viewBox);
  // Ensure white background for PNG output
  clone.setAttribute('style', 'background-color:white');

  const serializer = new XMLSerializer();
  const source = serializer.serializeToString(clone);
  const svgBlob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  const img = new Image();
  const scale = window.devicePixelRatio || 2;
  const width = parseFloat(svgElement.getAttribute('width')) || 800;
  const height = parseFloat(svgElement.getAttribute('height')) || 600;

  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);
    // White background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, width, height);
    URL.revokeObjectURL(url);
    const pngURI = canvas.toDataURL('image/png');
    const filename = prompt('Enter a name for the PNG file (without extension):', defaultBaseName);
    if (!filename) return;
    const a = document.createElement('a');
    a.href = pngURI;
    a.download = `${filename}.png`;
    a.click();
    // Preview tab
    window.open(pngURI, '_blank');
  };
  img.src = url;
};
