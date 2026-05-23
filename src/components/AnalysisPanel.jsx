import React, { useContext } from 'react';
import { CircuitContext } from '../context/CircuitContext';
import { analyzeCircuit } from '../utils/circuitAnalysis';
import { COMPONENT_TYPES } from '../data/defaultComponents';

export const AnalysisPanel = () => {
  const { state } = useContext(CircuitContext);
  const { results, errors } = analyzeCircuit(state.components, state.wires);

  // Determine LED protection status
  const leds = state.components.filter(c => c.type === COMPONENT_TYPES.LED);
  const resistors = state.components.filter(c => c.type === COMPONENT_TYPES.RESISTOR);
  const voltageSources = state.components.filter(c => c.type === COMPONENT_TYPES.VOLTAGE_SOURCE);
  const grounds = state.components.filter(c => c.type === COMPONENT_TYPES.GROUND);

  let ledStatus = "N/A";
  let ledDesc = "보호저항 없음";
  let isLedSafe = false;

  if (leds.length > 0) {
    if (resistors.length > 0) {
      const totalR = resistors.reduce((sum, r) => sum + Number(r.value || 0), 0);
      if (totalR >= 220) {
        ledStatus = "Safe";
        ledDesc = "적절한 보호저항 감지됨";
        isLedSafe = true;
      } else {
        ledStatus = "Warning";
        ledDesc = "저항이 너무 작습니다 (220Ω+ 추천)";
      }
    } else {
      ledStatus = "Danger";
      ledDesc = "보호저항 누락됨!";
    }
  }

  // Find Total Resistance
  const totalR = resistors.reduce((sum, r) => sum + Number(r.value || 0), 0);
  
  // Find Ohm's law V = IR
  let ohmString = "V = I * R";
  if (voltageSources.length === 1 && totalR > 0) {
    const v = Number(voltageSources[0].value || 0);
    const i = v / totalR;
    ohmString = `${v}V = ${(i * 1000).toFixed(1)}mA * ${totalR}Ω`;
  } else if (voltageSources.length === 1) {
    ohmString = `${voltageSources[0].value}V = N/A * 0Ω`;
  }

  // Connection node check for Validation card
  let validationText = "회로가 올바르게 연결되었습니다. 분석 준비 완료.";
  let hasValidationError = false;
  
  if (errors.length > 0) {
    validationText = errors[0];
    hasValidationError = true;
  } else if (state.components.length === 0) {
    validationText = "캔버스에 소자를 배치하여 회로 설계를 시작하세요.";
  }

  return (
    <div className="analysis-panel">
      <div className="analysis-header">
        <h3 className="panel-title" style={{ fontSize: '18px', marginBottom: 0, border: 'none', padding: 0 }}>
          Analysis Results
        </h3>
        <div className="analysis-status-tags">
          <span className="tag tag-live">LIVE</span>
          <span className="tag tag-mode">DC STEADY STATE</span>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="error-list">
          {errors.map((err, i) => (
            <div key={i} className="error-item">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>warning</span>
              <span>{err}</span>
            </div>
          ))}
        </div>
      )}

      <div className="analysis-cards">
        {/* Resistance Card */}
        <div className="card">
          <div>
            <p className="card-label">Total Resistance</p>
            <p className="card-value card-value-primary">{totalR} Ω</p>
          </div>
          <p className="card-desc">직렬 연결된 모든 저항의 합성값</p>
        </div>

        {/* Protection Card */}
        <div className={`card ${isLedSafe ? 'card-success' : leds.length > 0 ? 'card-error' : ''}`}>
          <div>
            <p className="card-label">LED Protection</p>
            <p className={`card-value ${isLedSafe ? 'card-value-secondary' : leds.length > 0 ? 'card-value-error' : ''}`}>
              {ledStatus}
            </p>
          </div>
          <p className="card-desc">{ledDesc}</p>
        </div>

        {/* Ohm's Law Card */}
        <div className="card">
          <div>
            <p className="card-label">Ohm's Law (V=IR)</p>
            <p className="card-value" style={{ fontSize: '15px' }}>{ohmString}</p>
          </div>
          <p className="card-desc">기본 옴의 법칙 전류 계산식</p>
        </div>

        {/* Validation Card */}
        <div className={`card ${hasValidationError ? 'card-error' : ''}`}>
          <div>
            <p className="card-label">Validation</p>
            <p className="card-value" style={{ fontSize: '13px', fontWeight: 'normal', fontFamily: 'var(--font-family-sans)' }}>
              {validationText}
            </p>
          </div>
          <p className="card-desc">회로 무결성 및 접지(GND) 검증</p>
        </div>
      </div>
    </div>
  );
};
export default AnalysisPanel;
