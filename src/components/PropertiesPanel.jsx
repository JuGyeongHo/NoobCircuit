import React, { useContext } from 'react';
import { CircuitContext, ACTIONS } from '../context/CircuitContext';
import { COMPONENT_TYPES } from '../data/defaultComponents';

export const PropertiesPanel = () => {
  const { state, dispatch } = useContext(CircuitContext);

  const selectedComponent = state.components.find(c => c.id === state.selectedComponentId);

  const handleChange = (field, value) => {
    if (!selectedComponent) return;
    
    let parsedValue = value;
    if (field === 'value') {
      parsedValue = value === '' ? '' : Number(value);
    } else if (field === 'rotation') {
      parsedValue = Number(value);
    }

    dispatch({
      type: ACTIONS.UPDATE_COMPONENT,
      payload: { id: selectedComponent.id, updates: { [field]: parsedValue } }
    });
  };

  const handleDelete = () => {
    if (selectedComponent) {
      dispatch({ type: ACTIONS.REMOVE_COMPONENT, payload: selectedComponent.id });
    }
  };

  if (!selectedComponent) {
    return (
      <aside className="properties-panel">
        <div>
          <h3 className="panel-title" style={{ fontSize: '18px', border: 'none', padding: 0, marginBottom: '4px' }}>
            Properties
          </h3>
          <p className="panel-subtitle">소자를 선택하여 속성을 편집하세요.</p>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-on-surface-variant)', fontSize: '14px', border: '1px dashed var(--color-outline-variant)', borderRadius: '8px', padding: '20px', textAlign: 'center' }}>
          소자를 클릭하면 여기에 세부 속성 조절 옵션이 나타납니다.
        </div>
      </aside>
    );
  }

  // Determine units list based on component type
  const getUnitOptions = (type) => {
    switch (type) {
      case COMPONENT_TYPES.RESISTOR:
        return ['Ω', 'kΩ', 'MΩ'];
      case COMPONENT_TYPES.CAPACITOR:
        return ['pF', 'nF', 'μF'];
      case COMPONENT_TYPES.INDUCTOR:
        return ['μH', 'mH', 'H'];
      case COMPONENT_TYPES.LED:
      case COMPONENT_TYPES.DIODE:
      case COMPONENT_TYPES.VOLTAGE_SOURCE:
        return ['V'];
      case COMPONENT_TYPES.CURRENT_SOURCE:
        return ['A', 'mA'];
      default:
        return [selectedComponent.unit || ''];
    }
  };

  return (
    <aside className="properties-panel">
      <div>
        <h3 className="panel-title" style={{ fontSize: '18px', border: 'none', padding: 0, marginBottom: '4px' }}>
          Properties
        </h3>
        <p className="panel-subtitle">
          {selectedComponent.type.toUpperCase()} ({selectedComponent.label})
        </p>
      </div>

      <div className="form-list">
        {/* ID/Label Field */}
        <div className="form-row">
          <label className="form-label">Name</label>
          <input 
            className="form-input" 
            type="text" 
            value={selectedComponent.label} 
            onChange={(e) => handleChange('label', e.target.value)} 
          />
        </div>

        {/* Value Field (with Units dropdown if applicable) */}
        {selectedComponent.value !== undefined && (
          <div className="form-row">
            <label className="form-label">Value</label>
            <div className="form-input-container">
              <input 
                className="form-input form-input-split-left" 
                type="number" 
                value={selectedComponent.value} 
                onChange={(e) => handleChange('value', e.target.value)} 
                step="any"
              />
              <select 
                className="form-select-split-right" 
                value={selectedComponent.unit} 
                onChange={(e) => handleChange('unit', e.target.value)}
              >
                {getUnitOptions(selectedComponent.type).map(u => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Rotation Field */}
        <div className="form-row">
          <label className="form-label">Rotation</label>
          <select 
            className="form-select" 
            value={selectedComponent.rotation} 
            onChange={(e) => handleChange('rotation', e.target.value)}
            disabled={selectedComponent.type === COMPONENT_TYPES.VOLTAGE_SOURCE || selectedComponent.type === COMPONENT_TYPES.CURRENT_SOURCE}
          >
            <option value="0">0° (Horizontal)</option>
            <option value="90">90° (Vertical)</option>
            <option value="180">180°</option>
            <option value="-90">-90°</option>
          </select>
        </div>
      </div>

      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--color-outline-variant)', paddingTop: '16px' }}>
        <button className="btn btn-danger" onClick={handleDelete} style={{ width: '100%' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
          Delete Component
        </button>
      </div>
    </aside>
  );
};
export default PropertiesPanel;
