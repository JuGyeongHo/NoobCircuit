import React, { useContext } from 'react';
import { CircuitContext, ACTIONS } from '../context/CircuitContext';

export const Header = () => {
  const { state, dispatch } = useContext(CircuitContext);

  const handleNew = () => {
    if (window.confirm("현재 회로를 지우고 새로 시작하시겠습니까?")) {
      dispatch({ type: ACTIONS.CLEAR_CIRCUIT });
    }
  };

  const handleExportJSON = () => {
    const data = JSON.stringify({
      title: state.title,
      components: state.components,
      wires: state.wires,
      createdAt: state.createdAt,
      updatedAt: state.updatedAt
    }, null, 2);

    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const filename = prompt('Enter a name for the JSON file (without extension):', `noobcircuit_${new Date().getTime()}`);
    if (!filename) {
      // User cancelled – abort export
      URL.revokeObjectURL(url);
      return;
    }
    a.download = `${filename}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.components && parsed.wires) {
          dispatch({ type: ACTIONS.SET_CIRCUIT, payload: parsed });
        } else {
          alert("유효하지 않은 회로 파일입니다.");
        }
      } catch (err) {
        alert("파일을 읽는 중 오류가 발생했습니다.");
      }
    };
    reader.readAsText(file);
    e.target.value = null; // Reset
  };

  const handleExportSVG = () => {
    const svgElement = document.getElementById('circuit-svg-canvas');

    if (!svgElement) return;

    const clone = svgElement.cloneNode(true);

    // Remove grid
    const defs = clone.querySelector('defs');
    if (defs) defs.remove();

    const bgRect = clone.querySelector('rect[fill^="url("]');
    if (bgRect) bgRect.remove();

    // White background
    clone.style.background = '#ffffff';

    // SVG namespace
    clone.setAttribute(
      'xmlns',
      'http://www.w3.org/2000/svg'
    );

    clone.setAttribute(
      'xmlns:xlink',
      'http://www.w3.org/1999/xlink'
    );

    // ONLY wire elements
    clone.querySelectorAll('.wire, .wire-drawing')
      .forEach(el => {

        el.setAttribute('fill', 'none');

        el.setAttribute('stroke', '#111827');

        el.setAttribute('stroke-width', '2.5');

        el.setAttribute('stroke-linecap', 'round');

        el.setAttribute('stroke-linejoin', 'round');

        el.setAttribute('vector-effect', 'non-scaling-stroke');
      });

    const serializer = new XMLSerializer();

    const source = serializer.serializeToString(clone);

    const blob = new Blob([source], {
      type: 'image/svg+xml;charset=utf-8'
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');

    const filename =
      prompt(
        'SVG 파일 이름:',
        `circuit_${Date.now()}`
      ) || 'circuit';

    link.href = url;
    link.download = `${filename}.svg`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 100);
  };
  const handleExportPNG = () => {
    const svgElement = document.getElementById('circuit-svg-canvas');

    if (!svgElement) return;

    const clone = svgElement.cloneNode(true);

    // Remove grid
    const defs = clone.querySelector('defs');
    if (defs) defs.remove();

    const bgRect = clone.querySelector('rect[fill^="url("]');
    if (bgRect) bgRect.remove();

    // White background
    clone.style.background = '#ffffff';

    // SVG namespace
    clone.setAttribute(
      'xmlns',
      'http://www.w3.org/2000/svg'
    );

    clone.setAttribute(
      'xmlns:xlink',
      'http://www.w3.org/1999/xlink'
    );

    // ONLY wire elements
    clone.querySelectorAll('.wire, .wire-drawing')
      .forEach(el => {

        el.setAttribute('fill', 'none');

        el.setAttribute('stroke', '#111827');

        el.setAttribute('stroke-width', '2.5');

        el.setAttribute('stroke-linecap', 'round');

        el.setAttribute('stroke-linejoin', 'round');

        el.setAttribute('vector-effect', 'non-scaling-stroke');
      });

    const serializer = new XMLSerializer();

    const source = serializer.serializeToString(clone);

    const svgBlob = new Blob([source], {
      type: 'image/svg+xml;charset=utf-8'
    });

    const url = URL.createObjectURL(svgBlob);

    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');

      const width =
        Number(svgElement.getAttribute('width')) || 800;

      const height =
        Number(svgElement.getAttribute('height')) || 600;

      const scale = window.devicePixelRatio || 2;

      canvas.width = width * scale;
      canvas.height = height * scale;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext('2d');

      ctx.scale(scale, scale);

      // White background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      ctx.drawImage(img, 0, 0, width, height);

      URL.revokeObjectURL(url);

      const pngUrl = canvas.toDataURL(
        'image/png',
        1.0
      );

      const link = document.createElement('a');

      const filename =
        prompt(
          'PNG 파일 이름:',
          `circuit_${Date.now()}`
        ) || 'circuit';

      link.href = pngUrl;
      link.download = `${filename}.png`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    };

    img.onerror = err => {
      console.error(err);
      alert('PNG 생성 실패');
    };

    img.src = url;
  };

  const handleRunAnalysis = () => {
    alert("실시간 회로 분석이 실행 중입니다. 하단 Analysis Results 창에서 실시간으로 결과를 확인해 보세요!");
  };

  return (
    <header className="header">
      <div className="header-brand">
        <span className="header-logo">NoobCircuit</span>
        <nav className="header-nav">
          <button className="icon-btn" onClick={handleNew} title="새 회로" style={{ fontSize: '14px', fontWeight: '500' }}>
            New Circuit
          </button>
          <button className="icon-btn" onClick={() => document.getElementById('file-upload').click()} title="불러오기" style={{ fontSize: '14px', fontWeight: '500' }}>
            Load
          </button>
          <button className="icon-btn" onClick={handleExportSVG} title="SVG 출력" style={{ fontSize: '14px', fontWeight: '500' }}>
            Export SVG
          </button>
          <button className="icon-btn" onClick={handleExportPNG} title="PNG 출력" style={{ fontSize: '14px', fontWeight: '500' }}>
            Export PNG
          </button>
        </nav>
      </div>

      <div className="header-actions">
        <div className="icon-actions">
          <button className="icon-btn" onClick={() => document.getElementById('file-upload').click()} title="불러오기">
            <span className="material-symbols-outlined">folder_open</span>
          </button>
          <button className="icon-btn" onClick={handleExportJSON} title="JSON 저장">
            <span className="material-symbols-outlined">save</span>
          </button>
          <button className="icon-btn" onClick={handleNew} title="새 회로">
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>

        <input
          id="file-upload"
          type="file"
          accept=".json"
          style={{ display: 'none' }}
          onChange={handleImportJSON}
        />

        <button className="btn btn-primary" onClick={handleRunAnalysis}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>play_arrow</span>
          Run Analysis
        </button>
      </div>
    </header>
  );
};
export default Header;
