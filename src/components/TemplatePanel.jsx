import React, { useContext } from 'react';
import { CircuitContext, ACTIONS } from '../context/CircuitContext';
import { circuitTemplates } from '../data/circuitTemplates';

export const TemplatePanel = () => {
  const { dispatch } = useContext(CircuitContext);

  const handleLoadTemplate = (template) => {
    if (window.confirm(`'${template.title}' 템플릿을 불러오시겠습니까? 현재 설계 중인 회로는 덮어씌워집니다.`)) {
      dispatch({
        type: ACTIONS.SET_CIRCUIT,
        payload: {
          title: template.title,
          components: template.components.map(c => ({
            ...c,
            // Re-generate IDs to avoid collisions, but keep connections mapping.
            // For simplicity, template IDs are already mapped correctly.
          })),
          wires: template.wires
        }
      });
    }
  };

  return (
    <div className="templates-section">
      <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: 'var(--color-on-surface)' }}>
        회로 템플릿
      </h3>
      <div className="template-grid">
        {circuitTemplates.map(t => (
          <button
            key={t.id}
            className="template-btn"
            title={t.description}
            onClick={() => handleLoadTemplate(t)}
          >
            <div style={{ fontWeight: '600', fontSize: '13px', color: 'var(--color-primary)' }}>{t.title}</div>
            <div style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', marginTop: '2px', lineHeight: '1.3' }}>
              {t.description.length > 30 ? t.description.substring(0, 30) + '...' : t.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
export default TemplatePanel;
