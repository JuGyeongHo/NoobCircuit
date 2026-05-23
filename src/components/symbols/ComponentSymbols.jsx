import React from 'react';
import { COMPONENT_TYPES } from '../../data/defaultComponents';

const commonProps = {
  stroke: '#111827',
  strokeWidth: 2.5,
  fill: 'none',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  vectorEffect: 'non-scaling-stroke'
};

// =========================
// RESISTOR
// =========================
export const ResistorSymbol = () => (
  <polyline
    className="component-symbol"
    points="
      -30,0
      -15,0
      -10,-10
      0,10
      10,-10
      15,0
      30,0
    "
    {...commonProps}
  />
);

// =========================
// CAPACITOR
// =========================
export const CapacitorSymbol = () => (
  <g className="component-symbol">

    <line x1="-20" y1="0" x2="-5" y2="0" {...commonProps} />

    <line x1="-5" y1="-10" x2="-5" y2="10" {...commonProps} />

    <line x1="5" y1="-10" x2="5" y2="10" {...commonProps} />

    <line x1="5" y1="0" x2="20" y2="0" {...commonProps} />

  </g>
);

// =========================
// INDUCTOR
// =========================
export const InductorSymbol = () => (
  <path
    className="component-symbol"
    d="
      M -30 0
      L -15 0
      Q -10 -10 -5 0
      Q 0 -10 5 0
      Q 10 -10 15 0
      L 30 0
    "
    {...commonProps}
  />
);

// =========================
// LED
// =========================
export const LEDSymbol = () => (
  <g className="component-symbol">

    <line x1="-20" y1="0" x2="-10" y2="0" {...commonProps} />

    <polygon
      points="-10,-10 -10,10 10,0"
      fill="#ffffff"
      stroke="#111827"
      strokeWidth="2.5"
      vectorEffect="non-scaling-stroke"
    />

    <line x1="10" y1="-10" x2="10" y2="10" {...commonProps} />

    <line x1="10" y1="0" x2="20" y2="0" {...commonProps} />

    {/* Arrows */}
    <line x1="2" y1="-12" x2="8" y2="-18" {...commonProps} />

    <polygon
      points="8,-18 4,-18 8,-14"
      fill="#111827"
      stroke="none"
    />

    <line x1="-4" y1="-12" x2="2" y2="-18" {...commonProps} />

    <polygon
      points="2,-18 -2,-18 2,-14"
      fill="#111827"
      stroke="none"
    />

  </g>
);

// =========================
// DIODE
// =========================
export const DiodeSymbol = () => (
  <g className="component-symbol">

    <line x1="-20" y1="0" x2="-10" y2="0" {...commonProps} />

    <polygon
      points="-10,-10 -10,10 10,0"
      fill="#ffffff"
      stroke="#111827"
      strokeWidth="2.5"
      vectorEffect="non-scaling-stroke"
    />

    <line x1="10" y1="-10" x2="10" y2="10" {...commonProps} />

    <line x1="10" y1="0" x2="20" y2="0" {...commonProps} />

  </g>
);

// =========================
// VOLTAGE SOURCE
// =========================
export const VoltageSourceSymbol = () => (
  <g className="component-symbol">

    <circle
      cx="0"
      cy="0"
      r="12"
      fill="#ffffff"
      stroke="#111827"
      strokeWidth="2.5"
      vectorEffect="non-scaling-stroke"
    />

    <line x1="-20" y1="0" x2="-12" y2="0" {...commonProps} />

    <line x1="12" y1="0" x2="20" y2="0" {...commonProps} />

    {/* + */}
    <line x1="-6" y1="0" x2="-1" y2="0" {...commonProps} />
    <line x1="-3" y1="-2" x2="-3" y2="2" {...commonProps} />

    {/* - */}
    <line x1="4" y1="0" x2="6" y2="0" {...commonProps} />

  </g>
);

// =========================
// CURRENT SOURCE
// =========================
export const CurrentSourceSymbol = () => (
  <g className="component-symbol">

    <circle
      cx="0"
      cy="0"
      r="12"
      fill="#ffffff"
      stroke="#111827"
      strokeWidth="2.5"
      vectorEffect="non-scaling-stroke"
    />

    <line x1="-20" y1="0" x2="-12" y2="0" {...commonProps} />

    <line x1="12" y1="0" x2="20" y2="0" {...commonProps} />

    <line x1="-6" y1="0" x2="4" y2="0" {...commonProps} />

    <polygon
      points="6,0 0,-6 0,6"
      fill="#111827"
      stroke="none"
    />

  </g>
);

// =========================
// SWITCH
// =========================
export const SwitchSymbol = () => (
  <g className="component-symbol">

    <line x1="-20" y1="0" x2="-10" y2="0" {...commonProps} />

    <circle cx="-10" cy="0" r="2" fill="#111827" />

    <line x1="-10" y1="0" x2="8" y2="-10" {...commonProps} />

    <circle cx="10" cy="0" r="2" fill="#111827" />

    <line x1="10" y1="0" x2="20" y2="0" {...commonProps} />

  </g>
);

// =========================
// GROUND
// =========================
export const GroundSymbol = () => (
  <g className="component-symbol">

    {/* connection line */}
    <line
      x1="-14"
      y1="0"
      x2="-8"
      y2="0"
      stroke="#111827"
      strokeWidth="2.5"
      fill="none"
      vectorEffect="non-scaling-stroke"
      strokeLinecap="round"
    />

    {/* ground bars */}
    <line
      x1="-4"
      y1="-10"
      x2="-4"
      y2="10"
      stroke="#111827"
      strokeWidth="2.5"
      fill="none"
      vectorEffect="non-scaling-stroke"
    />

    <line
      x1="0"
      y1="-6"
      x2="0"
      y2="6"
      stroke="#111827"
      strokeWidth="2.5"
      fill="none"
      vectorEffect="non-scaling-stroke"
    />

    <line
      x1="4"
      y1="-2"
      x2="4"
      y2="2"
      stroke="#111827"
      strokeWidth="2.5"
      fill="none"
      vectorEffect="non-scaling-stroke"
    />

  </g>
);
// =========================
// RENDER
// =========================
export const renderComponentSymbol = (type) => {
  switch (type) {

    case COMPONENT_TYPES.RESISTOR:
      return <ResistorSymbol />;

    case COMPONENT_TYPES.CAPACITOR:
      return <CapacitorSymbol />;

    case COMPONENT_TYPES.INDUCTOR:
      return <InductorSymbol />;

    case COMPONENT_TYPES.LED:
      return <LEDSymbol />;

    case COMPONENT_TYPES.DIODE:
      return <DiodeSymbol />;

    case COMPONENT_TYPES.VOLTAGE_SOURCE:
      return <VoltageSourceSymbol />;

    case COMPONENT_TYPES.CURRENT_SOURCE:
      return <CurrentSourceSymbol />;

    case COMPONENT_TYPES.SWITCH:
      return <SwitchSymbol />;

    case COMPONENT_TYPES.GROUND:
      return <GroundSymbol />;

    default:
      return null;
  }
};
