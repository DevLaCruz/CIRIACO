// CIRIACO Showcase Interactive App Logic

document.addEventListener('DOMContentLoaded', () => {
  initDAGGraph();
  initWYSIWYMTabs();
});

// Sample Atmo Nodes for the DAG Graph
const nodesData = [
  {
    id: 'V1',
    label: 'Hipótesis',
    type: 'Hypothesis',
    content: 'La representación mediante DAG e inmutabilidad SHA-256 reducirá la deriva semántica a ΔS ≈ 0 y aumentará la tasa de reutilización FR.',
    author: 'Dante Carrasco',
    parents: [],
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  },
  {
    id: 'V2',
    label: 'Metodología',
    type: 'Methodology',
    content: 'Diseño Preexperimental O1 -> X -> O2 con 25 investigadores del GICDIAC en un horizonte de 8 meses.',
    author: 'Dante Carrasco',
    parents: ['V1'],
    hash: 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e'
  },
  {
    id: 'V3',
    label: 'Dataset',
    type: 'Dataset',
    content: 'Corpus de 40 artículos y tesis en formato atómico con linaje W3C PROV-O.',
    author: 'GICDIAC Team',
    parents: [],
    hash: '7d865e959b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97730'
  },
  {
    id: 'V4',
    label: 'Resultado',
    type: 'Result',
    content: 'Incremento del 42% en la tasa de reutilización (FR) y reducción del 38% en el tiempo de maquetación.',
    author: 'Dante Carrasco',
    parents: ['V2', 'V3'],
    hash: '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae'
  },
  {
    id: 'V5',
    label: 'Conclusión',
    type: 'Conclusion',
    content: 'El modelo DAG de Atmos tipados preserva la memoria intelectual universitaria y elimina la fragmentación ciega.',
    author: 'Dante Carrasco',
    parents: ['V4'],
    hash: 'fcde2b2edba56bf408601fb721fe9b5c338d10ee429ea04fae5511b68fbf8fb9'
  }
];

function initDAGGraph() {
  const svg = document.getElementById('dag-svg');
  if (!svg) return;

  const positions = {
    'V1': { x: 100, y: 120 },
    'V2': { x: 280, y: 120 },
    'V3': { x: 100, y: 300 },
    'V4': { x: 460, y: 210 },
    'V5': { x: 640, y: 210 }
  };

  // Draw Edges (Aristas PROV-O)
  nodesData.forEach(node => {
    node.parents.forEach(parentId => {
      const start = positions[parentId];
      const end = positions[node.id];
      if (start && end) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', start.x);
        line.setAttribute('y1', start.y);
        line.setAttribute('x2', end.x);
        line.setAttribute('y2', end.y);
        line.setAttribute('stroke', 'rgba(0, 242, 254, 0.4)');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('stroke-dasharray', '4');
        svg.appendChild(line);
      }
    });
  });

  // Draw Vertices (Nodes)
  nodesData.forEach(node => {
    const pos = positions[node.id];
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `translate(${pos.x}, ${pos.y})`);
    g.style.cursor = 'pointer';

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('r', '26');
    circle.setAttribute('fill', '#0f172a');
    circle.setAttribute('stroke', '#00f2fe');
    circle.setAttribute('stroke-width', '2');

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dy', '5');
    text.setAttribute('fill', '#ffffff');
    text.setAttribute('font-size', '12');
    text.setAttribute('font-family', 'Outfit, sans-serif');
    text.setAttribute('font-weight', '600');
    text.textContent = node.id;

    g.appendChild(circle);
    g.appendChild(text);

    g.addEventListener('click', () => selectNode(node, circle));
    svg.appendChild(g);

    if (node.id === 'V1') {
      selectNode(node, circle);
    }
  });
}

let lastSelectedCircle = null;

function selectNode(node, circleEl) {
  if (lastSelectedCircle) {
    lastSelectedCircle.setAttribute('stroke', '#00f2fe');
    lastSelectedCircle.setAttribute('fill', '#0f172a');
  }
  if (circleEl) {
    circleEl.setAttribute('stroke', '#8a2be2');
    circleEl.setAttribute('fill', 'rgba(138, 43, 226, 0.3)');
    lastSelectedCircle = circleEl;
  }

  document.getElementById('info-id').textContent = `${node.id} (${node.label})`;
  document.getElementById('info-type').textContent = node.type;
  document.getElementById('info-author').textContent = node.author;
  document.getElementById('info-content').textContent = `"${node.content}"`;
  document.getElementById('info-hash').textContent = node.hash;
  document.getElementById('info-parents').textContent = node.parents.length ? node.parents.join(', ') : 'Ninguno (Nodo Raíz)';
}

function initWYSIWYMTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  const tabContent = document.getElementById('tab-display-content');

  const contentMap = {
    'editor': `
      <div class="editor-mock">
        <div class="atmo-list">
          <div class="atmo-item active">Atmo #101 [Hipótesis]</div>
          <div class="atmo-item">Atmo #102 [Metodología]</div>
          <div class="atmo-item">Atmo #103 [Resultado]</div>
        </div>
        <div class="editor-box">
          <h4 style="color:var(--primary-cyan); margin-bottom:12px;">Editor de Objeto Atómico (WYSIWYM)</h4>
          <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:16px;">Modificando bloque semántico sin preocuparse por márgenes o fuentes:</p>
          <div style="background:#050811; padding:16px; border-radius:6px; font-family:var(--font-mono); font-size:0.85rem; color:#e2e8f0;">
            El desarrollo e implementación de un sistema inteligente basado en versionado atómico e inmutabilidad SHA-256 optimizará la producción científica en el GICDIAC-UNPRG.
          </div>
        </div>
      </div>
    `,
    'ieee': `
      <div class="compiled-preview ieee">
        <h2>CIRIACO: Sistema basado en Grafos Aclíclicos Dirigidos (DAG)</h2>
        <p style="text-align:center; font-size:0.8rem; margin-bottom:16px; column-span:all;">W. D. Carrasco-Angulo, J. E. Villegas-Cubas — Universidad Nacional Pedro Ruiz Gallo</p>
        <p><strong><em>Abstract</em>—The scientific production in public universities faces severe challenges regarding tacit knowledge preservation...</strong></p>
        <p><strong>I. INTRODUCTION</strong><br/>La producción científica en las instituciones de educación superior públicas de América Latina [1] y en particular en la UNPRG [2] requiere arquitecturas de trazabilidad atómica...</p>
        <p><strong>II. METODOLOGÍA</strong><br/>Se formalizó un Grafo Aclíclico Dirigido G=(V,E) sellado mediante funciones de hash criptográfico SHA-256 [3] bajo el diseño preexperimental O1 -> X -> O2.</p>
      </div>
    `,
    'apa': `
      <div class="compiled-preview apa">
        <h2 style="text-align:center; font-size:1.3rem;">CIRIACO: Sistema basado en Grafos Aclíclicos Dirigidos (DAG)</h2>
        <p style="text-align:center; font-size:0.9rem; margin-bottom:24px;">Carrasco-Angulo, W. D., & Villegas-Cubas, J. E.<br/>Facultad de Ingeniería Civil, de Sistemas y Arquitectura, Universidad Nacional Pedro Ruiz Gallo</p>
        <p style="text-indent: 2em; margin-bottom:12px;">La producción científica en las instituciones de educación superior públicas de América Latina (CONCYTEC, 2022) y en particular en la Universidad Nacional Pedro Ruiz Gallo (SUNEDU, 2020) enfrenta barreras metodológicas significativas...</p>
        <p style="text-indent: 2em;">De acuerdo con el modelo de representación atómica orientada a grafos (Mons et al., 2011), cada unidad semántica indivisible es preservada con inmutabilidad estricta...</p>
      </div>
    `
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const mode = tab.dataset.tab;
      if (tabContent && contentMap[mode]) {
        tabContent.innerHTML = contentMap[mode];
      }
    });
  });
}
