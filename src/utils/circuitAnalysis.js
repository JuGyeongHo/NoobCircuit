import { COMPONENT_TYPES } from '../data/defaultComponents';

export const analyzeCircuit = (components, wires) => {
  const results = [];
  const errors = [];
  
  // 1. Basic Validation
  const voltageSources = components.filter(c => c.type === COMPONENT_TYPES.VOLTAGE_SOURCE);
  const grounds = components.filter(c => c.type === COMPONENT_TYPES.GROUND);
  
  if (voltageSources.length === 0) {
    errors.push("전원이 연결되지 않았습니다. 전압원을 추가하세요.");
  }
  if (grounds.length === 0) {
    errors.push("GND가 없습니다. 기준 전위(접지)를 연결하세요.");
  }

  // Check for unconnected terminals
  const connectedTerminals = new Set();
  wires.forEach(w => {
    connectedTerminals.add(`${w.from.componentId}_${w.from.terminalId}`);
    connectedTerminals.add(`${w.to.componentId}_${w.to.terminalId}`);
  });

  let hasUnconnected = false;
  components.forEach(c => {
    c.terminals.forEach(t => {
      if (!connectedTerminals.has(`${c.id}_${t.id}`)) {
        hasUnconnected = true;
      }
    });
  });

  if (hasUnconnected) {
    errors.push("연결되지 않은 단자가 있습니다.");
  }

  // Check LED protection
  const leds = components.filter(c => c.type === COMPONENT_TYPES.LED);
  const resistors = components.filter(c => c.type === COMPONENT_TYPES.RESISTOR);

  if (leds.length > 0 && resistors.length === 0) {
    errors.push("LED에는 보호저항이 필요합니다. 저항을 직렬로 연결하세요.");
  }

  // 2. Simple calculations
  // We'll calculate simple total series resistance if they are all in series.
  // For simplicity, just sum all resistors in the circuit (assuming simple series loop).
  if (resistors.length > 0) {
    const totalR = resistors.reduce((sum, r) => sum + Number(r.value || 0), 0);
    results.push({
      title: "직렬 저항 합성",
      value: `${totalR} Ω`
    });

    if (voltageSources.length === 1) {
      const v = Number(voltageSources[0].value || 0);
      const i = v / totalR;
      results.push({
        title: "Ohm's Law (총 전류)",
        value: `${(i * 1000).toFixed(2)} mA`
      });

      // Power
      resistors.forEach((r, idx) => {
        const rVal = Number(r.value || 0);
        const p = i * i * rVal;
        results.push({
          title: `${r.label || 'R'+(idx+1)} 소비 전력`,
          value: `${(p * 1000).toFixed(2)} mW`
        });
      });
    }
  }

  // LED protection resistor recommendation
  if (leds.length > 0 && voltageSources.length === 1) {
    const v = Number(voltageSources[0].value || 0);
    const ledVf = Number(leds[0].value || 2);
    const targetI = 0.02; // 20mA standard
    
    if (v > ledVf) {
      const recR = (v - ledVf) / targetI;
      results.push({
        title: "추천 LED 보호저항 (20mA)",
        value: `${recR.toFixed(0)} Ω`
      });
    }
  }

  // If complex, we just output what we have.
  if (components.length > 0 && results.length === 0 && errors.length === 0) {
    results.push({
      title: "알림",
      value: "현재 회로 구성은 기초 분석에서 지원되지 않거나 분석할 내용이 없습니다."
    });
  }

  return { results, errors };
};
