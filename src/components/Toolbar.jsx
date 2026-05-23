import React, { useContext } from 'react';
import { CircuitContext, ACTIONS } from '../context/CircuitContext';
import { COMPONENT_TYPES, defaultComponentData } from '../data/defaultComponents';
import { renderComponentSymbol } from './symbols/ComponentSymbols';
import { TemplatePanel } from './TemplatePanel';

const TOOLBAR_ITEMS = [
  { type: COMPONENT_TYPES.RESISTOR, label: 'Resistor', icon: 'thermometer_minus', tooltip: '저항: 전류의 흐름을 방해합니다. (Ohm)' },
  { type: COMPONENT_TYPES.CAPACITOR, label: 'Capacitor', icon: 'charger', tooltip: '커패시터: 전하를 충전합니다. (Farad)' },
  { type: COMPONENT_TYPES.INDUCTOR, label: 'Inductor', icon: 'settings_input_component', tooltip: '인덕터: 자기장 형태로 에너지를 저장합니다. (Henry)' },
  { type: COMPONENT_TYPES.LED, label: 'LED', icon: 'lightbulb', tooltip: '발광 다이오드: 전류가 흐르면 빛을 냅니다.' },
  { type: COMPONENT_TYPES.DIODE, label: 'Diode', icon: 'change_history', tooltip: '다이오드: 전류를 한쪽 방향으로만 흐르게 합니다.' },
  { type: COMPONENT_TYPES.VOLTAGE_SOURCE, label: 'Voltage Source', icon: 'bolt', tooltip: '전압원: 일정한 전압을 공급합니다. (V)' },
  { type: COMPONENT_TYPES.CURRENT_SOURCE, label: 'Current Source', icon: 'electric_bolt', tooltip: '전류원: 일정한 전류를 공급합니다. (A)' },
  { type: COMPONENT_TYPES.SWITCH, label: 'Switch', icon: 'toggle_off', tooltip: '스위치: 회로를 열거나 닫습니다.' },
  { type: COMPONENT_TYPES.GROUND, label: 'Ground', icon: 'text_fields', tooltip: '접지: 회로의 기준 전위(0V)가 됩니다.' }
];

export const Toolbar = () => {
  const { state, dispatch } = useContext(CircuitContext);

  const handleAddComponent = (type) => {
    const baseData = defaultComponentData[type];
    const prefix = baseData.label;

    // Find all number suffixes for components of this type
    const numbers = state.components
      .filter(c => c.type === type && c.label.startsWith(prefix))
      .map(c => {
        const suffix = c.label.slice(prefix.length);
        const num = parseInt(suffix, 10);
        return isNaN(num) ? 0 : num;
      });

    const nextNum = numbers.length > 0 ? Math.max(...numbers, 0) + 1 : 1;
    const sequentialLabel = `${prefix}${nextNum}`;

    const newComponent = {
      ...baseData,
      id: crypto.randomUUID(),
      x: 350,
      y: 220,
      label: sequentialLabel
    };

    dispatch({ type: ACTIONS.ADD_COMPONENT, payload: newComponent });
    dispatch({ type: ACTIONS.SELECT_COMPONENT, payload: newComponent.id });
  };

  return (
    <div className="toolbar">
      <div className="panel-header">
        <h2 className="panel-title">Components</h2>
        <p className="panel-subtitle">Click to add to workspace</p>
      </div>
      <div className="component-list" style={{ marginBottom: '24px' }}>
        {TOOLBAR_ITEMS.map(item => (
          <button 
            key={item.type} 
            className="component-btn"
            onClick={() => handleAddComponent(item.type)}
          >
            <div className="component-icon">
              <svg width="40" height="40" viewBox="-30 -30 60 60">
                {renderComponentSymbol(item.type)}
              </svg>
            </div>
            <span style={{ flex: 1 }}>{item.label}</span>
            <div className="tooltip">{item.tooltip}</div>
          </button>
        ))}
      </div>
      
      <hr style={{ border: 'none', borderTop: '1px solid var(--color-outline-variant)', marginBottom: '20px' }} />
      
      <TemplatePanel />
    </div>
  );
};
