---
name: NoobCircuit
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434656'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737688'
  outline-variant: '#c3c5d9'
  surface-tint: '#004ced'
  primary: '#003ec7'
  on-primary: '#ffffff'
  primary-container: '#0052ff'
  on-primary-container: '#dfe3ff'
  inverse-primary: '#b7c4ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#952200'
  on-tertiary: '#ffffff'
  tertiary-container: '#bf3003'
  on-tertiary-container: '#ffddd5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001452'
  on-primary-fixed-variant: '#0038b6'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdbd2'
  tertiary-fixed-dim: '#ffb4a1'
  on-tertiary-fixed: '#3c0800'
  on-tertiary-fixed-variant: '#891e00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  value-numeric:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '600'
    lineHeight: '1.0'
  headline-md-mobile:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.4'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  grid-unit: 8px
  canvas-snap: 16px
  gutter: 16px
  panel-width-side: 280px
  panel-width-bottom: 320px
---

## Brand & Style
The design system is engineered to bridge the gap between amateur curiosity and professional engineering. The brand personality is **Academic, Precise, and Approachable**, eschewing the intimidating density of traditional EDA (Electronic Design Automation) software in favor of a "literate programming" aesthetic for hardware.

The design style is **Corporate Modern with a Technical Edge**. It utilizes high-density information layouts paired with generous whitespace around the primary canvas to ensure focus. The visual language mimics the clarity of a well-printed textbook—utilizing sharp lines, purposeful contrast, and a systematic hierarchy that guides the user through the logical flow of circuit creation and analysis.

## Colors
The palette is rooted in a "Blueprint Light" logic. The workspace uses a layered grayscale approach to separate concerns without visual fatigue.

- **Primary (Technical Blue):** Reserved for high-priority actions like "Analyze," "Run Simulation," and active selection states.
- **Secondary (Success Green):** Used for positive analytical results, "Pass" states, and power-on indicators.
- **Canvas & Surface:** The workspace background is a very light, cool gray to reduce eye strain during long sessions, contrasting against the pure white of floating property panels.
- **Circuitry:** All schematic elements use a high-contrast near-black for maximum legibility against the grid.

## Typography
The system employs a dual-typeface strategy to distinguish between UI controls and technical data.

- **Inter:** Used for all interface elements, menus, and instructional text. It provides a friendly yet professional tone.
- **JetBrains Mono:** Utilized specifically for circuit labels (e.g., R1, C5), component values (e.g., 10kΩ), and simulation logs. The monospaced nature ensures that values remain aligned and readable in the properties panel and data tables.

## Layout & Spacing
The layout follows a **Fixed-Panel / Fluid-Canvas** model. The central workspace (the Canvas) is fluid and expands to fill the viewport, while the Tooling (Left), Properties (Right), and Results (Bottom) panels are fixed-width to maintain consistent control sizes.

- **The Grid:** The canvas uses a 16px dot-grid for snapping components.
- **Rhythm:** All UI spacing is based on an 8px base unit. 
- **Mobile Adaptivity:** On smaller viewports, the side panels collapse into bottom sheets or full-screen overlays to maximize the visible area of the circuit diagram.

## Elevation & Depth
To maintain a clean, academic feel, this design system avoids heavy shadows. Instead, it uses **Tonal Layers and Low-Contrast Outlines**.

- **Level 0 (Canvas):** The base layer. Flat, using the grid pattern as the only texture.
- **Level 1 (Panels):** Side and bottom panels use a subtle 1px border (`#E2E8F0`) with no shadow, appearing "docked" to the edges.
- **Level 2 (Floating Cards/Modals):** Result cards and tooltips use a soft, ambient shadow (10% opacity, 4px blur) to appear slightly lifted above the workspace.
- **Selection:** Active components on the canvas are highlighted with a 2px Primary Blue stroke and a very faint blue outer glow.

## Shapes
The shape language is **Soft (0.25rem)**. This provides a modern, friendly touch without sacrificing the professional "squareness" expected in engineering software. 

Circuit symbols (Resistors, Gates, etc.) must use **Sharp** corners for the technical symbols themselves to maintain schematic standards, but the bounding boxes for selecting those symbols should use the Soft corner radius. 

Circuit wires are drawn with 2px solid lines, using 90-degree "orthogonal" routing for a clean, organized appearance.

## Components
- **Buttons:** Primary buttons are solid Blue with white text. Secondary buttons use a subtle gray outline. Use high-contrast icons for "Analyze" (Play icon) and "Export" (Download icon).
- **Tool Palette:** Vertical icon-only buttons on the left. Icons should be clear black outlines of the component (e.g., a zig-zag for a resistor).
- **Properties Panel:** Uses "Input Groups" where the label is on the left in Inter and the value/unit is in an input field on the right in JetBrains Mono.
- **Analytical Cards:** Results in the bottom panel are displayed in white cards with a top-border accent (Blue for info, Green for success, Red for error). They feature a "Split View" showing a label on the left and a bold numeric value on the right.
- **Canvas Nodes:** Small 4px circular dots at wire intersections to denote a physical connection.