import { useState, useEffect, useRef } from 'react';
import {
  Atom, Zap, TrendingUp, Building2, Sparkles, ChevronRight,
  Cpu, Lock, BarChart3, Layers, GitBranch, Target, Shield,
  ArrowUpRight, Activity, Binary, Infinity as InfinityIcon,
  Waves, Eye, Network, Calculator
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar, PolarAngleAxis
} from 'recharts';

// ============ THEME ============
const C = {
  bg: '#0a0a14',
  bg2: '#11111f',
  ink: '#f5f1e8',
  inkDim: '#8a8499',
  cyan: '#00e5ff',
  magenta: '#ff2d75',
  gold: '#f0b429',
  violet: '#7c4dff',
  green: '#3ddc97',
  line: 'rgba(245,241,232,0.08)',
};

// ============ DECORATIVE COMPONENTS ============

function QuantumParticles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.3,
      hue: Math.random() > 0.5 ? '#00e5ff' : '#ff2d75',
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2, 0, Math.PI * 2);
        ctx.fillStyle = p.hue;
        ctx.globalAlpha = 0.4;
        ctx.fill();
        // connect lines
        particles.slice(i + 1).forEach((p2) => {
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.hue;
            ctx.globalAlpha = (1 - d / 150) * 0.15;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

function BlochSphere() {
  return (
    <div className="relative w-full aspect-square max-w-[280px] mx-auto">
      <svg viewBox="-110 -110 220 220" className="w-full h-full">
        <defs>
          <radialGradient id="sphereGrad" cx="0.35" cy="0.35">
            <stop offset="0%" stopColor="rgba(0,229,255,0.25)" />
            <stop offset="60%" stopColor="rgba(124,77,255,0.1)" />
            <stop offset="100%" stopColor="rgba(255,45,117,0.05)" />
          </radialGradient>
        </defs>
        {/* equator */}
        <ellipse cx="0" cy="0" rx="90" ry="22" fill="none" stroke={C.cyan} strokeOpacity="0.35" strokeWidth="0.8" />
        {/* meridian */}
        <ellipse cx="0" cy="0" rx="22" ry="90" fill="none" stroke={C.magenta} strokeOpacity="0.35" strokeWidth="0.8" />
        {/* sphere */}
        <circle cx="0" cy="0" r="90" fill="url(#sphereGrad)" stroke={C.ink} strokeOpacity="0.25" strokeWidth="1" />
        {/* axes */}
        <line x1="-100" y1="0" x2="100" y2="0" stroke={C.inkDim} strokeOpacity="0.4" strokeWidth="0.5" strokeDasharray="2 2" />
        <line x1="0" y1="-100" x2="0" y2="100" stroke={C.inkDim} strokeOpacity="0.4" strokeWidth="0.5" strokeDasharray="2 2" />
        {/* state vector animation */}
        <g style={{ transformOrigin: 'center', animation: 'spinSlow 8s linear infinite' }}>
          <line x1="0" y1="0" x2="55" y2="-55" stroke={C.gold} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="55" cy="-55" r="5" fill={C.gold} />
          <circle cx="55" cy="-55" r="10" fill={C.gold} fillOpacity="0.25">
            <animate attributeName="r" values="6;14;6" dur="2s" repeatCount="indefinite" />
            <animate attributeName="fill-opacity" values="0.4;0.05;0.4" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>
        {/* labels */}
        <text x="0" y="-98" textAnchor="middle" fill={C.cyan} fontSize="11" fontFamily="ui-monospace, monospace">|0⟩</text>
        <text x="0" y="108" textAnchor="middle" fill={C.magenta} fontSize="11" fontFamily="ui-monospace, monospace">|1⟩</text>
        <text x="100" y="4" fill={C.inkDim} fontSize="9" fontFamily="ui-monospace, monospace">x</text>
        <text x="-108" y="4" fill={C.inkDim} fontSize="9" fontFamily="ui-monospace, monospace">y</text>
      </svg>
    </div>
  );
}

function Entanglement() {
  return (
    <svg viewBox="0 0 240 100" className="w-full max-w-xs mx-auto">
      <defs>
        <linearGradient id="entLine" x1="0" x2="1">
          <stop offset="0" stopColor={C.cyan} />
          <stop offset="0.5" stopColor={C.violet} />
          <stop offset="1" stopColor={C.magenta} />
        </linearGradient>
      </defs>
      {/* connecting wave */}
      <path d="M 50 50 Q 120 20, 190 50 Q 120 80, 50 50" fill="none" stroke="url(#entLine)" strokeWidth="1.5" strokeOpacity="0.6">
        <animate attributeName="stroke-opacity" values="0.3;0.9;0.3" dur="2.5s" repeatCount="indefinite" />
      </path>
      {/* particle A */}
      <circle cx="50" cy="50" r="18" fill={C.cyan} fillOpacity="0.15" stroke={C.cyan} strokeWidth="1.5" />
      <circle cx="50" cy="50" r="6" fill={C.cyan}>
        <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite" />
      </circle>
      {/* particle B */}
      <circle cx="190" cy="50" r="18" fill={C.magenta} fillOpacity="0.15" stroke={C.magenta} strokeWidth="1.5" />
      <circle cx="190" cy="50" r="6" fill={C.magenta}>
        <animate attributeName="r" values="4;7;4" dur="2s" begin="0.3s" repeatCount="indefinite" />
      </circle>
      <text x="50" y="92" textAnchor="middle" fill={C.cyan} fontSize="9" fontFamily="ui-monospace, monospace">qubit A</text>
      <text x="190" y="92" textAnchor="middle" fill={C.magenta} fontSize="9" fontFamily="ui-monospace, monospace">qubit B</text>
    </svg>
  );
}

// ============ NAV ============
const TABS = [
  { id: 'quantum', ko: '양자역학', en: 'Quantum', icon: Atom },
  { id: 'computing', ko: '양자컴퓨터', en: 'Computing', icon: Cpu },
  { id: 'finance', ko: '금융 응용', en: 'Finance', icon: TrendingUp },
  { id: 'banks', ko: '글로벌 은행', en: 'Banks', icon: Building2 },
  { id: 'market', ko: '시장 현황', en: 'Market', icon: BarChart3 },
  { id: 'future', ko: '미래 전망', en: 'Future', icon: Sparkles },
];

// ============ SHARED ============
function SectionHeader({ tag, title, subtitle }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-px bg-amber-400/60" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-amber-400/80 font-mono">{tag}</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-serif leading-[1.05] text-stone-100 mb-3">{title}</h2>
      {subtitle && <p className="text-stone-400 max-w-2xl leading-relaxed">{subtitle}</p>}
    </div>
  );
}

function Card({ children, className = '', accent }) {
  return (
    <div
      className={`relative rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6 ${className}`}
      style={accent ? { borderTopColor: accent, borderTopWidth: 2 } : {}}
    >
      {children}
    </div>
  );
}

function Stat({ label, value, sub, color = C.cyan }) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.25em] uppercase text-stone-500 font-mono mb-2">{label}</div>
      <div className="text-3xl font-serif" style={{ color }}>{value}</div>
      {sub && <div className="text-xs text-stone-500 mt-1">{sub}</div>}
    </div>
  );
}

// ============ TAB CONTENT ============

function QuantumTab() {
  const concepts = [
    {
      icon: Layers,
      ko: '중첩',
      en: 'Superposition',
      color: C.cyan,
      desc: '큐비트는 |0⟩과 |1⟩을 동시에 가질 수 있습니다. 측정 전까지는 두 상태의 선형 결합 α|0⟩ + β|1⟩으로 존재하며, |α|² + |β|² = 1을 만족합니다.',
      formula: 'α|0⟩ + β|1⟩',
    },
    {
      icon: Network,
      ko: '얽힘',
      en: 'Entanglement',
      color: C.magenta,
      desc: '두 큐비트가 서로 연결되어 거리에 관계없이 한쪽의 측정 결과가 다른 쪽 상태를 즉시 결정합니다. 아인슈타인이 "유령 같은 원격 작용"이라 불렀던 현상입니다.',
      formula: '(|00⟩ + |11⟩)/√2',
    },
    {
      icon: Waves,
      ko: '간섭',
      en: 'Interference',
      color: C.violet,
      desc: '양자 진폭(amplitude)이 서로 더해지거나 상쇄됩니다. 양자 알고리즘은 정답 경로의 진폭은 강화하고, 오답 경로는 상쇄시켜 답을 추출합니다.',
      formula: '|ψ|² = probability',
    },
    {
      icon: Eye,
      ko: '측정',
      en: 'Measurement',
      color: C.gold,
      desc: '관측하는 순간 중첩 상태가 하나의 고전적 값으로 붕괴됩니다. 이 비가역성이 양자 알고리즘 설계의 핵심 제약입니다.',
      formula: '|ψ⟩ → |0⟩ or |1⟩',
    },
  ];

  return (
    <div>
      <SectionHeader
        tag="01 / Foundations"
        title="물리학에서 시작된 계산"
        subtitle="양자역학의 네 가지 원리가 기존 컴퓨팅의 한계를 무너뜨립니다. 이 원리들을 직접 다루는 것이 양자 컴퓨터의 본질입니다."
      />

      <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
        <div>
          <BlochSphere />
          <p className="text-center text-xs text-stone-500 font-mono mt-4">
            BLOCH SPHERE · 단일 큐비트의 상태 공간
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-serif text-stone-100 mb-4">상태의 기하학</h3>
          <p className="text-stone-400 leading-relaxed mb-4">
            고전 비트는 단 두 점(0과 1)에만 존재할 수 있지만, 큐비트는 <span className="text-cyan-300">구(球)의 표면 어디든 가리킬 수 있는 벡터</span>입니다.
            북극은 |0⟩, 남극은 |1⟩이며, 그 사이의 모든 점이 중첩 상태입니다.
          </p>
          <p className="text-stone-400 leading-relaxed">
            <span className="text-amber-300">n개</span>의 큐비트는 <span className="text-amber-300">2ⁿ개</span>의 복소 진폭을 동시에 표현합니다.
            300개 큐비트만 있어도 우주의 원자 수보다 많은 상태를 다룰 수 있습니다.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {concepts.map((c, i) => (
          <Card key={i} accent={c.color}>
            <div className="flex items-start gap-4">
              <div
                className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ background: `${c.color}15`, border: `1px solid ${c.color}40` }}
              >
                <c.icon size={20} style={{ color: c.color }} />
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-2">
                  <h4 className="text-xl font-serif text-stone-100">{c.ko}</h4>
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-stone-500">{c.en}</span>
                </div>
                <p className="text-sm text-stone-400 leading-relaxed mb-3">{c.desc}</p>
                <div
                  className="inline-block px-3 py-1.5 rounded-md font-mono text-xs"
                  style={{ background: `${c.color}10`, color: c.color }}
                >
                  {c.formula}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-10">
        <div className="flex items-start gap-4">
          <Network size={24} style={{ color: C.magenta }} />
          <div className="flex-1">
            <h4 className="font-serif text-xl text-stone-100 mb-3">얽힘은 왜 강력한가</h4>
            <Entanglement />
            <p className="text-sm text-stone-400 leading-relaxed mt-4">
              두 큐비트가 얽혀 있으면 각각 독립적으로 기술할 수 없습니다. 시스템 전체로만 존재하기 때문에,
              <span className="text-magenta-300"> 정보가 큐비트의 합이 아닌 곱으로 인코딩</span>됩니다.
              이것이 양자 컴퓨터가 지수적 우위를 가질 수 있는 수학적 이유입니다.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ComputingTab() {
  const algorithms = [
    {
      name: 'Shor',
      year: '1994',
      use: '소인수분해',
      speedup: '지수적 (Exponential)',
      target: 'RSA 암호 해독',
      color: C.magenta,
      finance: '기존 암호 체계 무력화 → PQC 전환 필요',
    },
    {
      name: 'Grover',
      year: '1996',
      use: '비정형 검색',
      speedup: '√N (Quadratic)',
      target: '데이터베이스 탐색',
      color: C.cyan,
      finance: '거대 거래 DB에서 패턴/사기 탐지',
    },
    {
      name: 'QAE',
      year: '2002',
      use: 'Amplitude Estimation',
      speedup: '√N (Quadratic)',
      target: 'Monte Carlo 적분',
      color: C.gold,
      finance: '파생상품 가격, VaR 계산 가속',
    },
    {
      name: 'QAOA',
      year: '2014',
      use: '조합 최적화',
      speedup: 'Hybrid / 경험적',
      target: 'NP-hard 문제',
      color: C.violet,
      finance: '포트폴리오 최적화, 자산 배분',
    },
    {
      name: 'VQE',
      year: '2014',
      use: '변분 양자 고유값',
      speedup: 'NISQ 친화적',
      target: '최소 에너지 찾기',
      color: C.green,
      finance: '리스크 최소화 목적함수',
    },
    {
      name: 'QML',
      year: '2017+',
      use: '양자 머신러닝',
      speedup: '특정 문제 한정',
      target: '커널, 신경망',
      color: '#ff8a3d',
      finance: 'QSVC로 사기 탐지 F1=0.98 달성',
    },
  ];

  const bitVsQubit = [
    { n: 1, classical: 2, quantum: 2 },
    { n: 2, classical: 2, quantum: 4 },
    { n: 4, classical: 2, quantum: 16 },
    { n: 8, classical: 2, quantum: 256 },
    { n: 16, classical: 2, quantum: 65536 },
    { n: 24, classical: 2, quantum: 16777216 },
  ];

  return (
    <div>
      <SectionHeader
        tag="02 / Architecture"
        title="큐비트, 게이트, 그리고 알고리즘"
        subtitle="양자 컴퓨터는 단순히 빠른 컴퓨터가 아닙니다. 완전히 다른 계산 모델로, 특정 문제에서만 압도적 우위를 보입니다."
      />

      <div className="grid md:grid-cols-3 gap-5 mb-12">
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <Binary size={20} style={{ color: C.inkDim }} />
            <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-stone-400">고전 비트</h4>
          </div>
          <div className="font-serif text-5xl text-stone-100 mb-2">0 또는 1</div>
          <p className="text-sm text-stone-500 leading-relaxed">
            매 순간 정확히 하나의 값만 가집니다. N비트 = N개의 정보.
          </p>
        </Card>

        <Card accent={C.cyan}>
          <div className="flex items-center gap-3 mb-4">
            <Atom size={20} style={{ color: C.cyan }} />
            <h4 className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: C.cyan }}>큐비트</h4>
          </div>
          <div className="font-serif text-5xl mb-2" style={{ color: C.cyan }}>α|0⟩+β|1⟩</div>
          <p className="text-sm text-stone-500 leading-relaxed">
            동시에 두 상태를 모두 가집니다. N큐비트 = 2<sup>N</sup>개의 진폭.
          </p>
        </Card>

        <Card accent={C.magenta}>
          <div className="flex items-center gap-3 mb-4">
            <InfinityIcon size={20} style={{ color: C.magenta }} />
            <h4 className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: C.magenta }}>50 큐비트</h4>
          </div>
          <div className="font-serif text-5xl mb-2" style={{ color: C.magenta }}>2⁵⁰</div>
          <p className="text-sm text-stone-500 leading-relaxed">
            약 1,125조 가지 상태를 동시 표현. 슈퍼컴퓨터의 한계 지점.
          </p>
        </Card>
      </div>

      <Card className="mb-12">
        <h4 className="font-serif text-xl text-stone-100 mb-1">정보 공간의 지수적 폭발</h4>
        <p className="text-xs text-stone-500 font-mono mb-6">
          STATE SPACE: 2<sup>N</sup> · 로그 스케일
        </p>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={bitVsQubit}>
            <CartesianGrid stroke={C.line} strokeDasharray="2 4" />
            <XAxis
              dataKey="n"
              stroke={C.inkDim}
              tick={{ fontSize: 11, fontFamily: 'ui-monospace' }}
              label={{ value: '큐비트 수', position: 'insideBottom', offset: -8, fill: C.inkDim, fontSize: 11 }}
            />
            <YAxis
              scale="log"
              domain={[1, 'auto']}
              stroke={C.inkDim}
              tick={{ fontSize: 10, fontFamily: 'ui-monospace' }}
            />
            <Tooltip
              contentStyle={{ background: C.bg2, border: `1px solid ${C.line}`, borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: C.ink, fontFamily: 'ui-monospace' }}
            />
            <Line type="monotone" dataKey="classical" stroke={C.inkDim} strokeWidth={2} dot={{ r: 4 }} name="고전 (상수)" />
            <Line type="monotone" dataKey="quantum" stroke={C.cyan} strokeWidth={2.5} dot={{ r: 4, fill: C.cyan }} name="양자 (2ⁿ)" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <h3 className="text-2xl font-serif text-stone-100 mb-2">핵심 양자 알고리즘</h3>
      <p className="text-stone-400 mb-6 max-w-2xl">
        모든 알고리즘이 금융에 직접 쓰이는 건 아니지만, <span className="text-amber-300">QAE, QAOA, VQE, QML</span>이
        현재 은행 리서치의 주축입니다.
      </p>
      <div className="grid md:grid-cols-2 gap-5">
        {algorithms.map((a, i) => (
          <Card key={i} accent={a.color}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-serif text-2xl text-stone-100">{a.name}</div>
                <div className="font-mono text-[10px] tracking-[0.2em] text-stone-500 mt-1">{a.year} · {a.use}</div>
              </div>
              <div
                className="text-[10px] font-mono px-2.5 py-1 rounded-full"
                style={{ background: `${a.color}15`, color: a.color, border: `1px solid ${a.color}30` }}
              >
                {a.speedup}
              </div>
            </div>
            <p className="text-xs text-stone-500 mb-3">
              <span className="text-stone-400">대상:</span> {a.target}
            </p>
            <div className="pt-3 border-t border-white/5">
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-500 mb-1">금융 응용</div>
              <p className="text-sm text-stone-300">{a.finance}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function FinanceTab() {
  const apps = [
    {
      icon: Target,
      ko: '포트폴리오 최적화',
      en: 'Portfolio Optimization',
      desc: '수천 개 자산을 수십 가지 제약 조건 하에 최적 배분. 고전 컴퓨터로는 NP-hard. QAOA, 양자 어닐링이 후보.',
      detail: 'Deloitte Quantum Lab은 포트폴리오 최적화 계산 시간을 50% 단축',
      tech: 'QAOA · Quantum Annealing',
      color: C.cyan,
    },
    {
      icon: Calculator,
      ko: '파생상품 가격 산정',
      en: 'Derivative Pricing',
      desc: 'Monte Carlo 시뮬레이션을 Quantum Amplitude Estimation으로 가속. 같은 정확도에 √N 더 적은 샘플.',
      detail: 'HSBC는 QAE로 파생상품 가격 오차 22% 감소',
      tech: 'QAE · Black-Scholes',
      color: C.gold,
    },
    {
      icon: Activity,
      ko: '리스크 분석',
      en: 'Risk · VaR · CVaR',
      desc: 'Value-at-Risk, Conditional VaR 계산. 스트레스 시나리오 수만 개를 양자 병렬로 평가.',
      detail: 'Goldman Sachs는 양자 알고리즘으로 리스크 분석 25배 가속',
      tech: 'Quantum Monte Carlo',
      color: C.magenta,
    },
    {
      icon: Shield,
      ko: '사기 탐지',
      en: 'Fraud Detection',
      desc: '양자 머신러닝(QML)으로 거래 패턴 이상 탐지. 양자 커널이 비선형 특징을 효과적으로 잡아냄.',
      detail: 'QSVC 모델이 사기 탐지에서 F1 점수 0.98 달성',
      tech: 'QSVC · Quantum Neural Net',
      color: C.violet,
    },
    {
      icon: GitBranch,
      ko: '양자 머신러닝',
      en: 'Quantum ML',
      desc: '시장 미시구조 예측, 신용 평가, 감성 분석. 양자 커널과 변분 회로(VQC)가 핵심.',
      detail: 'Hybrid 워크플로우(고전+양자)가 현실적 접근',
      tech: 'VQC · QNN · QSVM',
      color: C.green,
    },
    {
      icon: Lock,
      ko: '양자내성암호',
      en: 'Post-Quantum Crypto',
      desc: 'Shor 알고리즘이 RSA/ECC를 깰 수 있으므로 NIST 표준 PQC로 전환 진행 중. "지금 수집, 나중에 복호화" 위협 대응.',
      detail: 'JPMorgan은 양자 암호로 연간 수조 달러 거래 보안 강화',
      tech: 'Lattice-based · QKD',
      color: '#ff8a3d',
    },
  ];

  return (
    <div>
      <SectionHeader
        tag="03 / Applications"
        title="금융이 양자를 먼저 만나는 이유"
        subtitle="금융은 본질적으로 거대한 확률 계산 + 최적화 문제입니다. 양자 알고리즘이 가장 먼저 가시적 효용을 보이는 산업이라고 평가받습니다."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {apps.map((a, i) => (
          <Card key={i} accent={a.color} className="flex flex-col">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ background: `${a.color}15`, border: `1px solid ${a.color}40` }}
            >
              <a.icon size={20} style={{ color: a.color }} />
            </div>
            <h4 className="font-serif text-xl text-stone-100 mb-1">{a.ko}</h4>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-3">{a.en}</div>
            <p className="text-sm text-stone-400 leading-relaxed mb-4 flex-1">{a.desc}</p>
            <div className="pt-4 border-t border-white/5">
              <div className="flex items-start gap-2 mb-2">
                <Zap size={12} style={{ color: a.color }} className="mt-1 shrink-0" />
                <p className="text-xs text-stone-300">{a.detail}</p>
              </div>
              <div className="font-mono text-[10px] text-stone-500 mt-2">{a.tech}</div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <h4 className="font-serif text-xl text-stone-100 mb-4">양자 우위가 가장 빨리 올 영역</h4>
        <div className="space-y-3">
          {[
            { label: '포트폴리오 최적화', val: 85, color: C.cyan },
            { label: '파생상품 가격 (QAE)', val: 80, color: C.gold },
            { label: '리스크 / VaR', val: 75, color: C.magenta },
            { label: '사기 탐지 (QML)', val: 65, color: C.violet },
            { label: '시장 예측 (ML)', val: 40, color: C.green },
            { label: '실시간 거래 실행', val: 15, color: C.inkDim },
          ].map((r) => (
            <div key={r.label}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-stone-300">{r.label}</span>
                <span className="font-mono text-stone-500">{r.val}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${r.val}%`, background: `linear-gradient(90deg, ${r.color}80, ${r.color})` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-stone-500 mt-4 font-mono">
          * 단기(2026-2030) 실용화 가능성 추정. 출처: QuantumZeitgeist, McKinsey 종합
        </p>
      </Card>
    </div>
  );
}

function BanksTab() {
  const banks = [
    {
      name: 'JPMorgan Chase',
      country: '🇺🇸',
      focus: '양자 알고리즘 연구, 양자 우위 실증',
      partner: 'IBM, Quantinuum',
      highlight: '양자 암호로 연간 수조 달러 거래 보안',
      color: C.cyan,
    },
    {
      name: 'Goldman Sachs',
      country: '🇺🇸',
      focus: '리스크 분석, 파생상품 가격',
      partner: 'IBM, IonQ',
      highlight: '리스크 분석 처리 속도 25배 향상',
      color: C.gold,
    },
    {
      name: 'HSBC',
      country: '🇬🇧',
      focus: '파생상품 가격, 사기 탐지',
      partner: 'IBM, Quantinuum',
      highlight: '파생상품 가격 오차 22% 감소',
      color: C.magenta,
    },
    {
      name: 'Deutsche Bank',
      country: '🇩🇪',
      focus: '양자 리스크 분석 도구',
      partner: 'Multiverse Computing',
      highlight: '양자 리스크 도구에 $400M 투자',
      color: C.violet,
    },
    {
      name: 'BBVA',
      country: '🇪🇸',
      focus: '포트폴리오 최적화, 신용 평가',
      partner: 'IBM, Multiverse',
      highlight: '몬테카를로 시뮬레이션 양자 가속',
      color: C.green,
    },
    {
      name: 'Barclays',
      country: '🇬🇧',
      focus: '거래 최적화, 결제 시스템',
      partner: 'IBM',
      highlight: '거래 정산 최적화 PoC',
      color: '#ff8a3d',
    },
    {
      name: 'BNP Paribas',
      country: '🇫🇷',
      focus: '파생상품 가격, QML',
      partner: 'Pasqal',
      highlight: '중성원자 기반 양자 시스템 연구',
      color: '#3ddc97',
    },
    {
      name: 'Mizuho · MUFG',
      country: '🇯🇵',
      focus: '포트폴리오 최적화',
      partner: 'IBM Quantum',
      highlight: '일본 양자 컨소시엄 주도',
      color: '#a78bfa',
    },
  ];

  return (
    <div>
      <SectionHeader
        tag="04 / Industry"
        title="15개 이상의 글로벌 은행이 이미 뛰어들었다"
        subtitle="아직 라이브 거래에 양자 컴퓨터를 쓰는 은행은 없지만, 모두 PoC 단계를 지나 양자 우위 실증과 PQC 전환을 동시에 추진하고 있습니다."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {banks.map((b, i) => (
          <Card key={i} accent={b.color}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{b.country}</span>
              <h4 className="font-serif text-lg text-stone-100 leading-tight">{b.name}</h4>
            </div>
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-500 mb-1">Focus</div>
            <p className="text-xs text-stone-400 mb-3">{b.focus}</p>
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-500 mb-1">Partners</div>
            <p className="text-xs text-stone-400 mb-3 font-mono">{b.partner}</p>
            <div className="pt-3 border-t border-white/5">
              <div className="flex items-start gap-2">
                <Sparkles size={11} style={{ color: b.color }} className="mt-0.5 shrink-0" />
                <p className="text-xs" style={{ color: b.color }}>{b.highlight}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex items-start gap-3 mb-4">
          <Cpu size={20} style={{ color: C.cyan }} />
          <div>
            <h4 className="font-serif text-xl text-stone-100">파트너 양자 기업들</h4>
            <p className="text-sm text-stone-400 mt-1">은행들이 협력하는 양자 하드웨어·소프트웨어 기업</p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-3 mt-5">
          {[
            { name: 'IBM Quantum', type: '초전도 큐비트', detail: 'Heron, Condor 프로세서' },
            { name: 'Quantinuum', type: '이온 트랩', detail: 'H1, H2 시스템' },
            { name: 'IonQ', type: '이온 트랩', detail: 'Forte, Tempo' },
            { name: 'Pasqal', type: '중성 원자', detail: '아날로그 + 디지털' },
            { name: 'Multiverse Computing', type: '소프트웨어', detail: 'Singularity SDK' },
            { name: 'D-Wave', type: '양자 어닐러', detail: '최적화 특화' },
          ].map((p) => (
            <div key={p.name} className="bg-white/[0.02] border border-white/5 rounded-lg p-3">
              <div className="font-serif text-stone-100">{p.name}</div>
              <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-cyan-400 mt-1">{p.type}</div>
              <div className="text-xs text-stone-500 mt-1">{p.detail}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function MarketTab() {
  const marketSize = [
    { year: '2023', size: 0.83, invest: 8 },
    { year: '2024', size: 1.12, invest: 11 },
    { year: '2025', size: 1.67, invest: 16 },
    { year: '2026', size: 2.15, invest: 21 },
    { year: '2027', size: 2.68, invest: 26 },
    { year: '2028', size: 3.22, invest: 32 },
  ];

  const allocation = [
    { sector: '금융', share: 20, color: C.gold },
    { sector: '제약·소재', share: 18, color: C.cyan },
    { sector: '국방·보안', share: 16, color: C.magenta },
    { sector: '물류·최적화', share: 12, color: C.violet },
    { sector: '에너지', share: 10, color: C.green },
    { sector: '기타', share: 24, color: C.inkDim },
  ];

  return (
    <div>
      <SectionHeader
        tag="05 / Market"
        title="자본은 이미 움직이고 있다"
        subtitle="2025년 글로벌 양자 컴퓨팅 투자는 $16B — 2년 만에 두 배. 금융은 응용 분야의 약 20%를 차지하며 가장 빠르게 성장하는 영역입니다."
      />

      <div className="grid md:grid-cols-4 gap-5 mb-10">
        <Stat label="2025 시장 규모" value="$1.67B" sub="글로벌 양자 컴퓨팅" color={C.cyan} />
        <Stat label="2025 총 투자" value="$16B" sub="전년 대비 +100%" color={C.gold} />
        <Stat label="금융 응용 비중" value="~20%" sub="전체 양자 응용 중" color={C.magenta} />
        <Stat label="2035 잠재 가치" value="$400-600B" sub="McKinsey 추정 (금융)" color={C.violet} />
      </div>

      <div className="grid lg:grid-cols-5 gap-5 mb-10">
        <Card className="lg:col-span-3">
          <h4 className="font-serif text-xl text-stone-100 mb-1">시장 규모 & 투자 추이</h4>
          <p className="text-xs text-stone-500 font-mono mb-5">
            UNIT: USD BILLION · 2026 이후는 추정치
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={marketSize}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.cyan} stopOpacity={0.6} />
                  <stop offset="100%" stopColor={C.cyan} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.gold} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={C.gold} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={C.line} strokeDasharray="2 4" />
              <XAxis dataKey="year" stroke={C.inkDim} tick={{ fontSize: 11, fontFamily: 'ui-monospace' }} />
              <YAxis stroke={C.inkDim} tick={{ fontSize: 10, fontFamily: 'ui-monospace' }} />
              <Tooltip
                contentStyle={{ background: C.bg2, border: `1px solid ${C.line}`, borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: C.ink, fontFamily: 'ui-monospace' }}
              />
              <Area type="monotone" dataKey="invest" stroke={C.gold} strokeWidth={2} fill="url(#g2)" name="투자 ($B)" />
              <Area type="monotone" dataKey="size" stroke={C.cyan} strokeWidth={2} fill="url(#g1)" name="시장 규모 ($B)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="lg:col-span-2">
          <h4 className="font-serif text-xl text-stone-100 mb-1">응용 분야 분포</h4>
          <p className="text-xs text-stone-500 font-mono mb-5">2025 SHARE BY SECTOR</p>
          <div className="space-y-3">
            {allocation.map((a) => (
              <div key={a.sector}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-stone-300">{a.sector}</span>
                  <span className="font-mono text-xs" style={{ color: a.color }}>{a.share}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${a.share * 3}%`, background: a.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <Card accent={C.cyan}>
          <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-stone-500 mb-2">국가별 투자</div>
          <div className="space-y-2 mt-4">
            <div className="flex justify-between text-sm">
              <span className="text-stone-300">🇺🇸 미국</span>
              <span className="font-mono" style={{ color: C.cyan }}>$7B</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-300">🇨🇳 중국</span>
              <span className="font-mono" style={{ color: C.magenta }}>$6B</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-300">🇪🇺 EU</span>
              <span className="font-mono" style={{ color: C.gold }}>€1B</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-300">🇰🇷 한국·🇸🇬 싱가포르</span>
              <span className="font-mono" style={{ color: C.violet }}>20%*</span>
            </div>
          </div>
          <p className="text-[10px] text-stone-500 mt-3 font-mono">* 국가 양자 예산 중 금융 비중</p>
        </Card>

        <Card accent={C.gold}>
          <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-stone-500 mb-2">절감 효과 예측</div>
          <div className="font-serif text-4xl mt-4" style={{ color: C.gold }}>$15B</div>
          <p className="text-sm text-stone-400 mt-2">
            2025년 말까지 글로벌 은행권이 사기 탐지에서 절감 가능한 예상 비용
          </p>
        </Card>

        <Card accent={C.magenta}>
          <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-stone-500 mb-2">스타트업 펀딩</div>
          <div className="font-serif text-4xl mt-4" style={{ color: C.magenta }}>$4B</div>
          <p className="text-sm text-stone-400 mt-2">
            2025년 양자 스타트업 VC 펀딩. 그 중 <span className="text-magenta-300">45%가 금융 분야</span>
          </p>
        </Card>
      </div>
    </div>
  );
}

function FutureTab() {
  const timeline = [
    { year: '2026', title: '양자 우위 달성', desc: 'IBM은 특정 문제에서 양자 컴퓨터가 고전 컴퓨터를 능가하는 시점을 2026년 말로 전망. 금융 분야 첫 실용 사례 등장.', color: C.cyan, icon: Zap },
    { year: '2027-28', title: 'NISQ 최적화 시대', desc: '하이브리드(고전+양자) 워크플로우가 표준. QAOA 기반 포트폴리오 최적화가 일부 펀드 운용에 사용 시작.', color: C.gold, icon: GitBranch },
    { year: '2029', title: 'IBM 대규모 FTQC', desc: '수백 개 논리 큐비트, 1억 회 연산 가능한 결함 허용 양자 컴퓨터(FTQC). 신약 개발·소재·금융 최적화 가속.', color: C.magenta, icon: Cpu },
    { year: '2030+', title: 'PQC 전면 전환', desc: 'NIST 표준 양자내성암호로 글로벌 금융 시스템 마이그레이션 완료. "Harvest now, decrypt later" 위협 무력화.', color: C.violet, icon: Lock },
    { year: '2035', title: '본격 양자 금융', desc: 'McKinsey 추정 금융 분야 양자 가치 $400B-$600B 실현. 실시간 리스크 평가, 양자 ML 기반 헤지펀드 등장.', color: C.green, icon: TrendingUp },
  ];

  const challenges = [
    { name: '에러율', desc: '현재 큐비트 에러율 ~10⁻³, 실용화는 10⁻⁶ 필요', val: 35 },
    { name: '확장성', desc: '수백 → 수백만 큐비트 스케일링 미해결', val: 25 },
    { name: '데이터 인코딩', desc: '고전 데이터를 양자 상태로 효율 변환 어려움', val: 40 },
    { name: '규제·표준화', desc: '금융 규제 기관의 양자 시스템 검증 프레임 부재', val: 30 },
    { name: '하이브리드 통합', desc: '기존 IT 인프라와의 통합 복잡성', val: 50 },
  ];

  return (
    <div>
      <SectionHeader
        tag="06 / Horizon"
        title="언제, 어떻게 현실이 될까"
        subtitle="단기에는 하이브리드 워크플로우가 현실적입니다. 시스템 전면 교체가 아닌, 특정 병목 지점에서의 양자 가속이 첫 실용 단계가 될 것입니다."
      />

      <div className="relative pl-8 mb-12">
        <div
          className="absolute left-3 top-2 bottom-2 w-px"
          style={{ background: `linear-gradient(180deg, ${C.cyan}, ${C.magenta}, ${C.violet}, ${C.green})` }}
        />
        <div className="space-y-8">
          {timeline.map((t, i) => (
            <div key={i} className="relative">
              <div
                className="absolute -left-[26px] top-1.5 w-3 h-3 rounded-full"
                style={{ background: t.color, boxShadow: `0 0 16px ${t.color}80` }}
              />
              <div className="flex flex-col md:flex-row md:items-baseline gap-3 mb-2">
                <span className="font-mono text-xs tracking-[0.2em] px-2.5 py-1 rounded-md inline-block w-fit" style={{ background: `${t.color}15`, color: t.color, border: `1px solid ${t.color}30` }}>
                  {t.year}
                </span>
                <h4 className="font-serif text-xl text-stone-100">{t.title}</h4>
              </div>
              <p className="text-sm text-stone-400 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <h3 className="text-2xl font-serif text-stone-100 mb-6">아직 남은 도전과제</h3>
      <div className="grid md:grid-cols-2 gap-5 mb-10">
        {challenges.map((c, i) => (
          <Card key={i}>
            <div className="flex justify-between items-baseline mb-2">
              <h5 className="font-serif text-lg text-stone-100">{c.name}</h5>
              <div className="text-xs font-mono text-stone-500">해결도 {c.val}%</div>
            </div>
            <p className="text-sm text-stone-400 mb-3">{c.desc}</p>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${c.val}%`,
                  background: `linear-gradient(90deg, ${C.magenta}, ${C.gold})`,
                }}
              />
            </div>
          </Card>
        ))}
      </div>

      <Card accent={C.gold}>
        <div className="flex items-start gap-4">
          <Sparkles size={24} style={{ color: C.gold }} />
          <div>
            <h4 className="font-serif text-2xl text-stone-100 mb-3">핵심 통찰</h4>
            <p className="text-stone-300 leading-relaxed mb-3">
              연구자들은 한 가지에 의견이 일치합니다: <span className="text-amber-300">"기존 시스템 전면 교체가 아닌, 하이브리드 워크플로우"</span>가
              향후 10년의 현실적 경로라는 점입니다. 포트폴리오 최적화, 양자내성암호처럼 <span className="text-cyan-300">병목 지점에서의 타겟 가속</span>이
              먼저 자리잡을 것입니다.
            </p>
            <p className="text-stone-300 leading-relaxed">
              은행이 지금 행동해야 하는 이유는 두 가지입니다. 첫째, 양자 시대의 <span className="text-magenta-300">조기 가치 확보</span>.
              둘째, <span className="text-magenta-300">"지금 수집, 나중에 복호화"</span> 위협 — 오늘 가로챈 암호화 데이터가 미래 양자 컴퓨터로 해독될 수 있다는 위협에 대한 대비입니다.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ============ MAIN ============
export default function App() {
  const [tab, setTab] = useState('quantum');
  const Active = {
    quantum: QuantumTab,
    computing: ComputingTab,
    finance: FinanceTab,
    banks: BanksTab,
    market: MarketTab,
    future: FutureTab,
  }[tab];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: C.bg, color: C.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-serif { font-family: 'Fraunces', Georgia, serif; font-feature-settings: 'ss01'; }
        .font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        body { font-family: 'Fraunces', Georgia, serif; }
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeUp 0.5s ease-out; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.line}; border-radius: 4px; }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <QuantumParticles />
        <div
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
          style={{ background: C.cyan }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
          style={{ background: C.magenta }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/5 backdrop-blur-md bg-black/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${C.cyan}, ${C.magenta})` }}
              >
                <Atom size={18} color="#0a0a14" strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-serif text-lg leading-none text-stone-100">QUANTUM × FINANCE</div>
                <div className="text-[10px] font-mono tracking-[0.25em] uppercase text-stone-500 mt-1">
                  Interactive Dossier · 2026
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase text-stone-500">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Data
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
          <div className="grid md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-8">
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber-400 mb-4">
                A Field Guide
              </div>
              <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] text-stone-100 mb-6">
                <span style={{ fontStyle: 'italic', color: C.cyan }}>양자</span>가
                <br />
                <span className="text-stone-100">금융을 다시 쓴다</span>
              </h1>
              <p className="text-stone-400 text-lg leading-relaxed max-w-2xl">
                양자역학의 원리에서 출발해, 글로벌 은행들이 이미 진행 중인 실험과
                2035년까지의 시장 궤적까지 — 한 화면에서 따라가도록 정리했습니다.
              </p>
            </div>
            <div className="md:col-span-4 grid grid-cols-2 gap-4">
              <div className="border-l border-cyan-400/40 pl-3">
                <div className="text-3xl font-serif" style={{ color: C.cyan }}>$16B</div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-500 mt-1">2025 투자</div>
              </div>
              <div className="border-l border-amber-400/40 pl-3">
                <div className="text-3xl font-serif" style={{ color: C.gold }}>15+</div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-500 mt-1">참여 은행</div>
              </div>
              <div className="border-l border-pink-400/40 pl-3">
                <div className="text-3xl font-serif" style={{ color: C.magenta }}>25×</div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-500 mt-1">리스크 속도</div>
              </div>
              <div className="border-l border-violet-400/40 pl-3">
                <div className="text-3xl font-serif" style={{ color: C.violet }}>2026</div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-500 mt-1">양자 우위</div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <nav className="sticky top-[73px] z-40 backdrop-blur-md bg-black/30 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
              {TABS.map((t) => {
                const active = tab === t.id;
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className="group flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all whitespace-nowrap"
                    style={{
                      background: active ? 'rgba(0,229,255,0.08)' : 'transparent',
                      border: `1px solid ${active ? 'rgba(0,229,255,0.3)' : 'transparent'}`,
                    }}
                  >
                    <Icon
                      size={15}
                      style={{ color: active ? C.cyan : C.inkDim }}
                      className="transition-colors"
                    />
                    <span
                      className="font-serif text-sm transition-colors"
                      style={{ color: active ? C.ink : C.inkDim }}
                    >
                      {t.ko}
                    </span>
                    <span
                      className="hidden md:inline font-mono text-[9px] tracking-[0.2em] uppercase transition-colors"
                      style={{ color: active ? C.cyan : 'transparent' }}
                    >
                      {t.en}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main */}
        <main className="max-w-7xl mx-auto px-6 py-14">
          <div key={tab} className="fade-in">
            <Active />
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 mt-20">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="font-serif text-lg text-stone-100 mb-2">출처</div>
                <p className="text-xs text-stone-500 leading-relaxed font-mono">
                  McKinsey · IBM Quantum · The Quantum Insider · CoinLaw · arXiv · QuantumZeitgeist · Springer Computational Economics
                </p>
              </div>
              <div>
                <div className="font-serif text-lg text-stone-100 mb-2">기간</div>
                <p className="text-xs text-stone-500 leading-relaxed font-mono">
                  2025년 데이터 기준 · 2026 5월 업데이트
                </p>
              </div>
              <div>
                <div className="font-serif text-lg text-stone-100 mb-2">주의</div>
                <p className="text-xs text-stone-500 leading-relaxed">
                  교육·정보 제공 목적입니다. 투자 자문이 아니며, 미래 예측은 출처 기관의 추정치입니다.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-stone-600">
                Quantum × Finance · 2026 Edition
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-stone-600">
                <Atom size={11} /> α|0⟩ + β|1⟩
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
