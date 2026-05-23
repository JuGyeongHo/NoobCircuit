import { COMPONENT_TYPES } from './defaultComponents';

export const circuitTemplates = [
  {
    id: 'led-circuit',
    title: 'LED 점등 회로',
    description: '전압원, 보호저항, LED, 접지(GND)로 구성된 기본 LED 점등 회로입니다.',
    components: [
      {
        id: 'v1',
        type: COMPONENT_TYPES.VOLTAGE_SOURCE,
        label: 'V1',
        value: 5,
        unit: 'V',
        x: 200,
        y: 300,
        rotation: 90,
        terminals: [
          { id: 'pos', x: -20, y: 0 },
          { id: 'neg', x: 20, y: 0 }
        ]
      },
      {
        id: 'r1',
        type: COMPONENT_TYPES.RESISTOR,
        label: 'R1',
        value: 220,
        unit: 'Ω',
        x: 400,
        y: 200,
        rotation: 0,
        terminals: [
          { id: 't1', x: -30, y: 0 },
          { id: 't2', x: 30, y: 0 }
        ]
      },
      {
        id: 'led1',
        type: COMPONENT_TYPES.LED,
        label: 'LED1',
        value: 2,
        unit: 'V (Vf)',
        x: 600,
        y: 300,
        rotation: 90,
        terminals: [
          { id: 'anode', x: -20, y: 0 },
          { id: 'cathode', x: 20, y: 0 }
        ]
      },
      {
        id: 'gnd1',
        type: COMPONENT_TYPES.GROUND,
        label: 'GND',
        value: '',
        unit: '',
        x: 400,
        y: 450,
        rotation: 90,
        terminals: [
          { id: 't1', x: -20, y: 0 }
        ]
      }
    ],
    wires: [
      // V1 pos to R1 t1
      {
        id: 'w1',
        from: { componentId: 'v1', terminalId: 'pos' },
        to: { componentId: 'r1', terminalId: 't1' }
      },
      // R1 t2 to LED1 anode
      {
        id: 'w2',
        from: { componentId: 'r1', terminalId: 't2' },
        to: { componentId: 'led1', terminalId: 'anode' }
      },
      // LED1 cathode to GND t1
      {
        id: 'w3',
        from: { componentId: 'led1', terminalId: 'cathode' },
        to: { componentId: 'gnd1', terminalId: 't1' }
      },
      // V1 neg to GND t1
      {
        id: 'w4',
        from: { componentId: 'v1', terminalId: 'neg' },
        to: { componentId: 'gnd1', terminalId: 't1' }
      }
    ]
  },
  {
    id: 'voltage-divider',
    title: '전압분배 회로',
    description: '두 개의 저항을 직렬로 연결하여 전압을 나누는 분배 회로입니다.',
    components: [
      {
        id: 'v1',
        type: COMPONENT_TYPES.VOLTAGE_SOURCE,
        label: 'V1',
        value: 10,
        unit: 'V',
        x: 200,
        y: 300,
        rotation: 90,
        terminals: [
          { id: 'pos', x: -20, y: 0 },
          { id: 'neg', x: 20, y: 0 }
        ]
      },
      {
        id: 'r1',
        type: COMPONENT_TYPES.RESISTOR,
        label: 'R1',
        value: 1000,
        unit: 'Ω',
        x: 400,
        y: 200,
        rotation: 0,
        terminals: [
          { id: 't1', x: -30, y: 0 },
          { id: 't2', x: 30, y: 0 }
        ]
      },
      {
        id: 'r2',
        type: COMPONENT_TYPES.RESISTOR,
        label: 'R2',
        value: 1000,
        unit: 'Ω',
        x: 600,
        y: 200,
        rotation: 0,
        terminals: [
          { id: 't1', x: -30, y: 0 },
          { id: 't2', x: 30, y: 0 }
        ]
      },
      {
        id: 'gnd1',
        type: COMPONENT_TYPES.GROUND,
        label: 'GND',
        value: '',
        unit: '',
        x: 400,
        y: 400,
        rotation: 90,
        terminals: [
          { id: 't1', x: -20, y: 0 }
        ]
      }
    ],
    wires: [
      {
        id: 'w1',
        from: { componentId: 'v1', terminalId: 'pos' },
        to: { componentId: 'r1', terminalId: 't1' }
      },
      {
        id: 'w2',
        from: { componentId: 'r1', terminalId: 't2' },
        to: { componentId: 'r2', terminalId: 't1' }
      },
      {
        id: 'w3',
        from: { componentId: 'r2', terminalId: 't2' },
        to: { componentId: 'gnd1', terminalId: 't1' }
      },
      {
        id: 'w4',
        from: { componentId: 'v1', terminalId: 'neg' },
        to: { componentId: 'gnd1', terminalId: 't1' }
      }
    ]
  },
  {
    id: 'series-resistors',
    title: '직렬 저항 회로',
    description: '여러 개의 저항이 한 줄로 연결된 기본 직렬 회로입니다.',
    components: [
      {
        id: 'v1',
        type: COMPONENT_TYPES.VOLTAGE_SOURCE,
        label: 'V1',
        value: 9,
        unit: 'V',
        x: 200,
        y: 300,
        rotation: 90,
        terminals: [
          { id: 'pos', x: -20, y: 0 },
          { id: 'neg', x: 20, y: 0 }
        ]
      },
      {
        id: 'r1',
        type: COMPONENT_TYPES.RESISTOR,
        label: 'R1',
        value: 100,
        unit: 'Ω',
        x: 400,
        y: 200,
        rotation: 0,
        terminals: [
          { id: 't1', x: -30, y: 0 },
          { id: 't2', x: 30, y: 0 }
        ]
      },
      {
        id: 'r2',
        type: COMPONENT_TYPES.RESISTOR,
        label: 'R2',
        value: 200,
        unit: 'Ω',
        x: 600,
        y: 200,
        rotation: 0,
        terminals: [
          { id: 't1', x: -30, y: 0 },
          { id: 't2', x: 30, y: 0 }
        ]
      },
      {
        id: 'gnd1',
        type: COMPONENT_TYPES.GROUND,
        label: 'GND',
        value: 0,
        unit: 'V',
        x: 400,
        y: 400,
        rotation: 90,
        terminals: [
          { id: 't1', x: -20, y: 0 }
        ]
      }
    ],
    wires: [
      {
        id: 'w1',
        from: { componentId: 'v1', terminalId: 'pos' },
        to: { componentId: 'r1', terminalId: 't1' }
      },
      {
        id: 'w2',
        from: { componentId: 'r1', terminalId: 't2' },
        to: { componentId: 'r2', terminalId: 't1' }
      },
      {
        id: 'w3',
        from: { componentId: 'r2', terminalId: 't2' },
        to: { componentId: 'gnd1', terminalId: 't1' }
      },
      {
        id: 'w4',
        from: { componentId: 'v1', terminalId: 'neg' },
        to: { componentId: 'gnd1', terminalId: 't1' }
      }
    ]
  },
  {
    id: 'parallel-resistors',
    title: '병렬 저항 회로',
    description: '저항들이 병렬로 나란히 배치되어 독립된 전류 경로를 형성하는 회로입니다.',
    components: [
      {
        id: 'v1',
        type: COMPONENT_TYPES.VOLTAGE_SOURCE,
        label: 'V1',
        value: 12,
        unit: 'V',
        x: 200,
        y: 300,
        rotation: 90,
        terminals: [
          { id: 'pos', x: -20, y: 0 },
          { id: 'neg', x: 20, y: 0 }
        ]
      },
      {
        id: 'r1',
        type: COMPONENT_TYPES.RESISTOR,
        label: 'R1',
        value: 1000,
        unit: 'Ω',
        x: 400,
        y: 200,
        rotation: 90,
        terminals: [
          { id: 't1', x: -30, y: 0 },
          { id: 't2', x: 30, y: 0 }
        ]
      },
      {
        id: 'r2',
        type: COMPONENT_TYPES.RESISTOR,
        label: 'R2',
        value: 1000,
        unit: 'Ω',
        x: 550,
        y: 200,
        rotation: 90,
        terminals: [
          { id: 't1', x: -30, y: 0 },
          { id: 't2', x: 30, y: 0 }
        ]
      },
      {
        id: 'gnd1',
        type: COMPONENT_TYPES.GROUND,
        label: 'GND',
        value: '',
        unit: '',
        x: 350,
        y: 420,
        rotation: 90,
        terminals: [
          { id: 't1', x: -20, y: 0 }
        ]
      }
    ],
    wires: [
      {
        id: 'w1',
        from: { componentId: 'v1', terminalId: 'pos' },
        to: { componentId: 'r1', terminalId: 't1' }
      },
      {
        id: 'w2',
        from: { componentId: 'r1', terminalId: 't1' },
        to: { componentId: 'r2', terminalId: 't1' }
      },
      {
        id: 'w3',
        from: { componentId: 'v1', terminalId: 'neg' },
        to: { componentId: 'gnd1', terminalId: 't1' }
      },
      {
        id: 'w4',
        from: { componentId: 'r1', terminalId: 't2' },
        to: { componentId: 'gnd1', terminalId: 't1' }
      },
      {
        id: 'w5',
        from: { componentId: 'r2', terminalId: 't2' },
        to: { componentId: 'gnd1', terminalId: 't1' }
      }
    ]
  },
  {
    id: 'rc-circuit',
    title: 'RC 회로',
    description: '저항(R)과 커패시터(C)가 조합되어 전하의 충/방전 응답 속도를 학습할 수 있는 기초 회로입니다.',
    components: [
      {
        id: 'v1',
        type: COMPONENT_TYPES.VOLTAGE_SOURCE,
        label: 'V1',
        value: 5,
        unit: 'V',
        x: 200,
        y: 300,
        rotation: 90,
        terminals: [
          { id: 'pos', x: -20, y: 0 },
          { id: 'neg', x: 20, y: 0 }
        ]
      },
      {
        id: 'r1',
        type: COMPONENT_TYPES.RESISTOR,
        label: 'R1',
        value: 1000,
        unit: 'Ω',
        x: 400,
        y: 200,
        rotation: 0,
        terminals: [
          { id: 't1', x: -30, y: 0 },
          { id: 't2', x: 30, y: 0 }
        ]
      },
      {
        id: 'c1',
        type: COMPONENT_TYPES.CAPACITOR,
        label: 'C1',
        value: 10,
        unit: 'μF',
        x: 600,
        y: 300,
        rotation: 90,
        terminals: [
          { id: 't1', x: -20, y: 0 },
          { id: 't2', x: 20, y: 0 }
        ]
      },
      {
        id: 'gnd1',
        type: COMPONENT_TYPES.GROUND,
        label: 'GND',
        value: 0,
        unit: 'V',
        x: 400,
        y: 420,
        rotation: 90,
        terminals: [
          { id: 't1', x: -20, y: 0 }
        ]
      }
    ],
    wires: [
      {
        id: 'w1',
        from: { componentId: 'v1', terminalId: 'pos' },
        to: { componentId: 'r1', terminalId: 't1' }
      },
      {
        id: 'w2',
        from: { componentId: 'r1', terminalId: 't2' },
        to: { componentId: 'c1', terminalId: 't1' }
      },
      {
        id: 'w3',
        from: { componentId: 'c1', terminalId: 't2' },
        to: { componentId: 'gnd1', terminalId: 't1' }
      },
      {
        id: 'w4',
        from: { componentId: 'v1', terminalId: 'neg' },
        to: { componentId: 'gnd1', terminalId: 't1' }
      }
    ]
  }
];
