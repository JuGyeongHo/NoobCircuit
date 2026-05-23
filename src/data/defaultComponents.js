// Component Definitions
export const COMPONENT_TYPES = {
  RESISTOR: 'resistor',
  CAPACITOR: 'capacitor',
  INDUCTOR: 'inductor',
  LED: 'led',
  DIODE: 'diode',
  VOLTAGE_SOURCE: 'voltageSource',
  CURRENT_SOURCE: 'currentSource',
  SWITCH: 'switch',
  GROUND: 'ground'
};

export const defaultComponentData = {
  [COMPONENT_TYPES.RESISTOR]: {
    type: COMPONENT_TYPES.RESISTOR,
    label: 'R',
    value: 1000,
    unit: 'Ω',
    rotation: 0,
    terminals: [
      { id: 't1', x: -30, y: 0 },
      { id: 't2', x: 30, y: 0 }
    ]
  },
  [COMPONENT_TYPES.CAPACITOR]: {
    type: COMPONENT_TYPES.CAPACITOR,
    label: 'C',
    value: 10,
    unit: 'μF',
    rotation: 0,
    terminals: [
      { id: 't1', x: -20, y: 0 },
      { id: 't2', x: 20, y: 0 }
    ]
  },
  [COMPONENT_TYPES.INDUCTOR]: {
    type: COMPONENT_TYPES.INDUCTOR,
    label: 'L',
    value: 100,
    unit: 'mH',
    rotation: 0,
    terminals: [
      { id: 't1', x: -30, y: 0 },
      { id: 't2', x: 30, y: 0 }
    ]
  },
  [COMPONENT_TYPES.LED]: {
    type: COMPONENT_TYPES.LED,
    label: 'LED',
    value: 2,
    unit: 'V (Vf)', // Forward voltage
    rotation: 0,
    terminals: [
      { id: 'anode', x: -20, y: 0 },
      { id: 'cathode', x: 20, y: 0 }
    ]
  },
  [COMPONENT_TYPES.DIODE]: {
    type: COMPONENT_TYPES.DIODE,
    label: 'D',
    value: 0.7,
    unit: 'V (Vf)',
    rotation: 0,
    terminals: [
      { id: 'anode', x: -20, y: 0 },
      { id: 'cathode', x: 20, y: 0 }
    ]
  },
  [COMPONENT_TYPES.VOLTAGE_SOURCE]: {
    type: COMPONENT_TYPES.VOLTAGE_SOURCE,
    label: 'V',
    value: 5,
    unit: 'V',
    rotation: 90, // vertical: symbol rotates so terminals go top/bottom
    terminals: [
      { id: 'pos', x: -20, y: 0 }, // becomes top (y=-20) after 90° rotation
      { id: 'neg', x: 20, y: 0 }   // becomes bottom (y=+20) after 90° rotation
    ]
  },
  [COMPONENT_TYPES.CURRENT_SOURCE]: {
    type: COMPONENT_TYPES.CURRENT_SOURCE,
    label: 'I',
    value: 1,
    unit: 'A',
    rotation: -90, // vertical: symbol rotates so terminals go top/bottom
    terminals: [
      { id: 'pos', x: -20, y: 0 }, // becomes top (y=-20) after 90° rotation
      { id: 'neg', x: 20, y: 0 }   // becomes bottom (y=+20) after 90° rotation
    ]
  },
  [COMPONENT_TYPES.SWITCH]: {
    type: COMPONENT_TYPES.SWITCH,
    label: 'SW',
    value: 'open',
    unit: '',
    rotation: 0,
    terminals: [
      { id: 't1', x: -20, y: 0 },
      { id: 't2', x: 20, y: 0 }
    ]
  },
  [COMPONENT_TYPES.GROUND]: {
    type: COMPONENT_TYPES.GROUND,
    label: 'GND',
    rotation: 90, // ground oriented with vertical line downwards
    terminals: [
      { id: 't1', x: -20, y: 0 }
    ]
  }
};
