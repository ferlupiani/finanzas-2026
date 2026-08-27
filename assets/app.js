const {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  createContext,
  useContext,
  Component
} = React;

// ==========================================
// 🛡️ ERROR BOUNDARY
// ==========================================
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  handleReset = () => {
    try {
      localStorage.removeItem('finanzas_data_v1');
    } catch (e) {}
    window.location.reload();
  };
  render() {
    if (this.state.hasError) {
      return /*#__PURE__*/React.createElement("div", {
        className: "min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-900 font-sans"
      }, /*#__PURE__*/React.createElement("div", {
        className: "bg-white p-8 rounded-3xl shadow-xl border border-slate-200/80 max-w-md w-full text-center space-y-4"
      }, /*#__PURE__*/React.createElement("div", {
        className: "w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "x",
        className: "w-8 h-8"
      })), /*#__PURE__*/React.createElement("h2", {
        className: "text-lg font-bold text-slate-900"
      }, "Se ha producido un error"), /*#__PURE__*/React.createElement("p", {
        className: "text-xs text-slate-500"
      }, this.state.error?.message || 'Error al procesar los datos de la aplicación.'), /*#__PURE__*/React.createElement("div", {
        className: "pt-2 flex flex-col gap-2"
      }, /*#__PURE__*/React.createElement("button", {
        onClick: () => window.location.reload(),
        className: "w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-sm active:scale-95 transition-all"
      }, "Recargar Aplicación"), /*#__PURE__*/React.createElement("button", {
        onClick: this.handleReset,
        className: "w-full py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-bold transition-all"
      }, "Restablecer Datos Locales"))));
    }
    return this.props.children;
  }
}

// ==========================================
// 🎨 ICONOS SVG MINIMALISTAS
// ==========================================
const Icon = ({
  name,
  className = "w-5 h-5",
  ...props
}) => {
  const icons = {
    wallet: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    }),
    creditCard: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M3 10h18M3 6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6zm4 8h2m4 0h4"
    }),
    trendingUp: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    }),
    trendingDown: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
    }),
    arrowUpRight: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M7 17L17 7M17 7H7M17 7V17"
    }),
    arrowDownLeft: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M17 7L7 17M7 17H17M7 17V7"
    }),
    transfer: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
    }),
    plus: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M12 4v16m8-8H4"
    }),
    trash: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    }),
    edit: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    }),
    search: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    }),
    filter: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
    }),
    calendar: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    }),
    check: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M5 13l4 4L19 7"
    }),
    refresh: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    }),
    cloud: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z"
    }),
    settings: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    }),
    chart: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    }),
    home: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    }),
    zap: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M13 10V3L4 14h7v7l9-11h-7z"
    }),
    download: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    }),
    upload: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    }),
    x: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M6 18L18 6M6 6l12 12"
    }),
    pieChart: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
    }),
    dollar: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    }),
    presentation: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
    }),
    table: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    }),
    sparkles: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    }),
    chevronDown: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M19 9l-7 7-7-7"
    }),
    chevronUp: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M5 15l7-7 7 7"
    }),
    layers: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
    }),
    list: /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M4 6h16M4 12h16M4 18h16"
    })
  };
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    ...props
  }, icons[name] || icons.wallet);
};

// ==========================================
// 💶 FORMATO Y UTILIDADES
// ==========================================
const ACCOUNT_ORDER = ['acc-bbva', 'acc-santander', 'acc-sab-ahorro', 'acc-sab-irpf', 'acc-efectivo', 'acc-myinvestor', 'acc-trade'];
const sortCuentas = (cuentas = []) => {
  return [...cuentas].sort((a, b) => {
    const idxA = ACCOUNT_ORDER.indexOf(a.id);
    const idxB = ACCOUNT_ORDER.indexOf(b.id);
    const orderA = idxA !== -1 ? idxA : 999;
    const orderB = idxB !== -1 ? idxB : 999;
    return orderA - orderB;
  });
};
const formatCurrency = val => {
  const num = typeof val === 'number' ? val : parseFloat(val) || 0;
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
};
const formatDate = dateStr => {
  if (!dateStr) return '';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
    return dateStr;
  } catch (e) {
    return dateStr;
  }
};
const formatDateFull = dateStr => {
  if (!dateStr || dateStr === 'Sin fecha') return dateStr;
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const y = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10);
      const d = parseInt(parts[2], 10);
      const dateObj = new Date(y, m - 1, d);
      const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      const dayOfWeek = dayNames[dateObj.getDay()];
      const monthName = monthNames[m - 1];
      return `${dayOfWeek}, ${d} de ${monthName} de ${y}`;
    }
    return dateStr;
  } catch (e) {
    return dateStr;
  }
};
const formatMonthName = monthKey => {
  if (!monthKey || monthKey === 'todos') return 'Todos los meses';
  const parts = monthKey.replace('.', '-').split('-');
  if (parts.length === 2) {
    const year = parts[0];
    const month = parseInt(parts[1], 10);
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    if (month >= 1 && month <= 12) {
      return `${months[month - 1]} ${year}`;
    }
  }
  return monthKey;
};
const getAccountBadge = (accId, cuentas = []) => {
  const acc = (cuentas || []).find(c => c && c.id === accId);
  if (!acc) return {
    nombre: 'Desconocida',
    color: '#64748b',
    bgClass: 'bg-slate-100 text-slate-700 border-slate-200'
  };
  switch (acc.id) {
    case 'acc-bbva':
      return {
        ...acc,
        bgClass: 'bg-blue-50 text-blue-900 border-blue-200'
      };
    case 'acc-santander':
      return {
        ...acc,
        bgClass: 'bg-red-50 text-red-700 border-red-200'
      };
    case 'acc-sab-ahorro':
      return {
        ...acc,
        bgClass: 'bg-sky-50 text-sky-700 border-sky-200'
      };
    case 'acc-sab-irpf':
      return {
        ...acc,
        bgClass: 'bg-cyan-50 text-cyan-800 border-cyan-200'
      };
    case 'acc-efectivo':
      return {
        ...acc,
        bgClass: 'bg-emerald-50 text-emerald-800 border-emerald-200'
      };
    case 'acc-trade':
      return {
        ...acc,
        bgClass: 'bg-zinc-100 text-zinc-900 border-zinc-300'
      };
    case 'acc-myinvestor':
      return {
        ...acc,
        bgClass: 'bg-purple-50 text-purple-700 border-purple-200'
      };
    default:
      return {
        ...acc,
        bgClass: 'bg-slate-100 text-slate-800 border-slate-200'
      };
  }
};

// ==========================================
// 🌐 CONTEXTO GLOBAL & NORMALIZACIÓN DE DATOS
// ==========================================
const FinanceContext = createContext(null);
const STORAGE_KEY = 'finanzas_data_v1';
const FIREBASE_URL_KEY = 'finanzas_firebase_url';
const DEFAULT_FIREBASE_URL = 'https://nutriplan-2c75e-default-rtdb.europe-west1.firebasedatabase.app/finanzas.json';
const defaultFallbackData = {
  version: '1.4',
  clientUpdated: new Date().toISOString(),
  config: {
    repartoSueldo: {
      irpf: 0.18,
      ahorro: 0.50,
      gasto: 0.32
    },
    inversionFija: 200.00,
    cuentaInversionDefecto: 'acc-myinvestor',
    gastosFijosDefecto: [{
      id: 'gf-1',
      nombre: 'Alquiler + Gastos Casa',
      categoria: 'Alquiler',
      cuenta: 'acc-bbva',
      importe: 325.00
    }, {
      id: 'gf-2',
      nombre: 'Spotify',
      categoria: 'Suscripciones',
      cuenta: 'acc-bbva',
      importe: 6.49
    }, {
      id: 'gf-3',
      nombre: 'Basic Fit',
      categoria: 'Suscripciones',
      cuenta: 'acc-bbva',
      importe: 24.99
    }, {
      id: 'gf-4',
      nombre: 'AppleCare+',
      categoria: 'Suscripciones',
      cuenta: 'acc-bbva',
      importe: 5.49
    }],
    ingresosFijosDefecto: [{
      id: 'if-1',
      nombre: 'Beneficio Cuenta BBVA',
      categoria: 'Otros Ingresos',
      cuenta: 'acc-bbva',
      importe: 16.20,
      isVariable: false
    }, {
      id: 'if-2',
      nombre: 'Intereses Sabadell Remunerada',
      categoria: 'Inversiones',
      cuenta: 'acc-sab-ahorro',
      importe: 23.11,
      isVariable: true
    }]
  },
  cuentas: [{
    id: 'acc-bbva',
    nombre: 'BBVA',
    tipo: 'banco',
    activa: true,
    incluirEnTotal: true,
    color: '#1E3A8A',
    saldoInicial: 234.67
  }, {
    id: 'acc-santander',
    nombre: 'Santander',
    tipo: 'banco',
    activa: true,
    incluirEnTotal: true,
    color: '#DC2626',
    saldoInicial: 175.77
  }, {
    id: 'acc-sab-ahorro',
    nombre: 'Sabadell Ahorro',
    tipo: 'banco',
    activa: true,
    incluirEnTotal: true,
    color: '#0284C7',
    saldoInicial: 1239.81
  }, {
    id: 'acc-sab-irpf',
    nombre: 'Sabadell IRPF',
    tipo: 'banco',
    activa: true,
    incluirEnTotal: false,
    color: '#0EA5E9',
    saldoInicial: 202.16
  }, {
    id: 'acc-efectivo',
    nombre: 'Efectivo',
    tipo: 'metalico',
    activa: true,
    incluirEnTotal: true,
    color: '#16A34A',
    saldoInicial: 810.00
  }, {
    id: 'acc-myinvestor',
    nombre: 'MyInvestor',
    tipo: 'inversion',
    activa: true,
    incluirEnTotal: false,
    color: '#8B5CF6',
    saldoInicial: 0.00
  }, {
    id: 'acc-trade',
    nombre: 'Trade Republic',
    tipo: 'inversion',
    activa: true,
    incluirEnTotal: false,
    color: '#18181B',
    saldoInicial: -313.25
  }],
  categorias: [{
    id: 'cat-alquiler',
    nombre: 'Alquiler',
    tipo: 'gasto',
    color: '#ef4444'
  }, {
    id: 'cat-comida',
    nombre: 'Comida',
    tipo: 'gasto',
    color: '#f97316'
  }, {
    id: 'cat-comer-fuera',
    nombre: 'Comer Fuera',
    tipo: 'gasto',
    color: '#eab308'
  }, {
    id: 'cat-cervezas',
    nombre: 'Cervezas',
    tipo: 'gasto',
    color: '#84cc16'
  }, {
    id: 'cat-carnet',
    nombre: 'Carnet de Conducir',
    tipo: 'gasto',
    color: '#06b6d4'
  }, {
    id: 'cat-suscripciones',
    nombre: 'Suscripciones',
    tipo: 'gasto',
    color: '#6366f1'
  }, {
    id: 'cat-planes',
    nombre: 'Planes',
    tipo: 'gasto',
    color: '#a855f7'
  }, {
    id: 'cat-regalos',
    nombre: 'Regalos',
    tipo: 'gasto',
    color: '#ec4899'
  }, {
    id: 'cat-ropa',
    nombre: 'Ropa',
    tipo: 'gasto',
    color: '#f43f5e'
  }, {
    id: 'cat-inversiones',
    nombre: 'Inversiones',
    tipo: 'gasto',
    color: '#10b981'
  }, {
    id: 'cat-universidad',
    nombre: 'Universidad',
    tipo: 'gasto',
    color: '#3b82f6'
  }, {
    id: 'cat-utilidad',
    nombre: 'Utilidad',
    tipo: 'gasto',
    color: '#64748b'
  }, {
    id: 'cat-viajes',
    nombre: 'Viajes',
    tipo: 'gasto',
    color: '#14b8a6'
  }, {
    id: 'cat-fisio',
    nombre: 'Fisio',
    tipo: 'gasto',
    color: '#d946ef'
  }, {
    id: 'cat-caprichos',
    nombre: 'Caprichos',
    tipo: 'gasto',
    color: '#f59e0b'
  }, {
    id: 'cat-compartida',
    nombre: 'Cuenta compartida',
    tipo: 'gasto',
    color: '#8b5cf6'
  }, {
    id: 'cat-sueldo',
    nombre: 'Sueldo/Nómina',
    tipo: 'ingreso',
    color: '#10b981'
  }, {
    id: 'cat-clases',
    nombre: 'Clases Particulares',
    tipo: 'ingreso',
    color: '#059669'
  }, {
    id: 'cat-bizum-madre',
    nombre: 'Bizum Madre',
    tipo: 'ingreso',
    color: '#db2777'
  }, {
    id: 'cat-ventas',
    nombre: 'Ventas',
    tipo: 'ingreso',
    color: '#0284c7'
  }, {
    id: 'cat-otros-gastos',
    nombre: 'Otros Gastos',
    tipo: 'gasto',
    color: '#64748b'
  }, {
    id: 'cat-otros-ingresos',
    nombre: 'Otros Ingresos',
    tipo: 'ingreso',
    color: '#10b981'
  }],
  fuentesIngreso: [{
    id: 'src-claret',
    nombre: 'Claret',
    importeDefecto: 1508.53
  }, {
    id: 'src-maristas',
    nombre: 'Maristas',
    importeDefecto: 603.39
  }, {
    id: 'src-academia',
    nombre: 'Academia',
    importeDefecto: 346.44
  }, {
    id: 'src-particulares',
    nombre: 'Clases Particulares',
    importeDefecto: 0.00
  }],
  movimientos: []
};
const normalizeFinanceData = (input, fallback = defaultFallbackData) => {
  if (!input || typeof input !== 'object') return fallback;
  const toCleanArray = (val, def = []) => {
    if (Array.isArray(val)) return val.filter(Boolean);
    if (val && typeof val === 'object') return Object.values(val).filter(Boolean);
    return def;
  };
  const rawCuentas = toCleanArray(input.cuentas, fallback.cuentas);
  const hasMyInvestor = rawCuentas.some(c => c && c.id === 'acc-myinvestor');
  if (!hasMyInvestor) {
    rawCuentas.push({
      id: 'acc-myinvestor',
      nombre: 'MyInvestor',
      tipo: 'inversion',
      activa: true,
      incluirEnTotal: false,
      color: '#8B5CF6',
      saldoInicial: 0.00
    });
  }
  const cuentas = sortCuentas(rawCuentas.map(c => ({
    ...c,
    incluirEnTotal: ['acc-sab-irpf', 'acc-trade', 'acc-myinvestor'].includes(c.id) ? c.incluirEnTotal === true : c.incluirEnTotal !== false
  })));
  const categorias = toCleanArray(input.categorias, fallback.categorias);
  const fuentesIngreso = toCleanArray(input.fuentesIngreso, fallback.fuentesIngreso);
  let movimientos = toCleanArray(input.movimientos, []);
  if (movimientos.length === 0 && fallback.movimientos && fallback.movimientos.length > 0) {
    movimientos = fallback.movimientos;
  }
  movimientos.sort((a, b) => {
    const dateComp = (b.fecha || '').localeCompare(a.fecha || '');
    if (dateComp !== 0) return dateComp;
    return (b.id || '').localeCompare(a.id || '');
  });
  return {
    version: input.version || '1.4',
    clientUpdated: input.clientUpdated || new Date().toISOString(),
    config: {
      repartoSueldo: {
        irpf: input.config?.repartoSueldo?.irpf !== undefined ? input.config.repartoSueldo.irpf : fallback.config.repartoSueldo.irpf,
        ahorro: input.config?.repartoSueldo?.ahorro !== undefined ? input.config.repartoSueldo.ahorro : fallback.config.repartoSueldo.ahorro,
        gasto: input.config?.repartoSueldo?.gasto !== undefined ? input.config.repartoSueldo.gasto : fallback.config.repartoSueldo.gasto
      },
      inversionFija: input.config?.inversionFija !== undefined ? input.config.inversionFija : fallback.config.inversionFija,
      cuentaInversionDefecto: input.config?.cuentaInversionDefecto || fallback.config.cuentaInversionDefecto || 'acc-myinvestor',
      gastosFijosDefecto: toCleanArray(input.config?.gastosFijosDefecto, fallback.config.gastosFijosDefecto),
      ingresosFijosDefecto: toCleanArray(input.config?.ingresosFijosDefecto, fallback.config.ingresosFijosDefecto)
    },
    cuentas: cuentas.length > 0 ? cuentas : fallback.cuentas,
    categorias: categorias.length > 0 ? categorias : fallback.categorias,
    fuentesIngreso: fuentesIngreso.length > 0 ? fuentesIngreso : fallback.fuentesIngreso,
    movimientos
  };
};
const FinanceProvider = ({
  children
}) => {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return normalizeFinanceData(parsed, defaultFallbackData);
      }
    } catch (e) {
      console.warn('Error reading from localStorage:', e);
    }
    return defaultFallbackData;
  });
  const [firebaseUrl, setFirebaseUrlState] = useState(() => {
    return localStorage.getItem(FIREBASE_URL_KEY) || DEFAULT_FIREBASE_URL;
  });
  const [syncStatus, setSyncStatus] = useState('offline');
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const isSyncingRef = useRef(false);
  useEffect(() => {
    const loadInitialDataFile = async () => {
      try {
        const res = await fetch('data.json');
        if (res.ok) {
          const jsonFile = await res.json();
          const cleanJson = normalizeFinanceData(jsonFile, defaultFallbackData);
          setData(current => {
            if (!current.movimientos || current.movimientos.length === 0 || cleanJson.clientUpdated > current.clientUpdated) {
              try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanJson));
              } catch (e) {}
              return cleanJson;
            }
            return current;
          });
        }
      } catch (err) {
        console.log('No external data.json found');
      }
    };
    loadInitialDataFile();
  }, []);
  const setFirebaseUrl = url => {
    setFirebaseUrlState(url);
    if (url) localStorage.setItem(FIREBASE_URL_KEY, url);else localStorage.removeItem(FIREBASE_URL_KEY);
  };
  const updateAndSyncData = useCallback(async updater => {
    setData(prev => {
      const rawNext = typeof updater === 'function' ? updater(prev) : updater;
      const normalized = normalizeFinanceData({
        ...rawNext,
        clientUpdated: new Date().toISOString()
      }, prev);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
      } catch (e) {
        console.error('LocalStorage write error:', e);
      }
      if (firebaseUrl && navigator.onLine) {
        setSyncStatus('syncing');
        fetch(firebaseUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(normalized)
        }).then(res => {
          if (res.ok) {
            setSyncStatus('synced');
            setLastSyncTime(new Date());
          } else {
            setSyncStatus('error');
          }
        }).catch(() => setSyncStatus('error'));
      } else {
        setSyncStatus('offline');
      }
      return normalized;
    });
  }, [firebaseUrl]);
  const syncWithCloud = useCallback(async () => {
    if (!firebaseUrl || !navigator.onLine || isSyncingRef.current) return;
    isSyncingRef.current = true;
    setSyncStatus('syncing');
    try {
      const res = await fetch(firebaseUrl);
      if (!res.ok) throw new Error('Firebase HTTP error');
      const rawCloud = await res.json();
      if (rawCloud && rawCloud.version) {
        setData(local => {
          const cloudData = normalizeFinanceData(rawCloud, local);
          const localTime = new Date(local.clientUpdated || 0).getTime();
          const cloudTime = new Date(cloudData.clientUpdated || 0).getTime();
          if (local.movimientos.length > cloudData.movimientos.length) {
            fetch(firebaseUrl, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(local)
            }).then(() => {
              setLastSyncTime(new Date());
              setSyncStatus('synced');
            });
            return local;
          }
          if (cloudTime >= localTime) {
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData));
            } catch (e) {}
            setLastSyncTime(new Date());
            setSyncStatus('synced');
            return cloudData;
          } else {
            fetch(firebaseUrl, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(local)
            }).then(() => {
              setLastSyncTime(new Date());
              setSyncStatus('synced');
            });
            return local;
          }
        });
      }
    } catch (err) {
      console.warn('Sync error:', err);
      setSyncStatus('error');
    } finally {
      isSyncingRef.current = false;
    }
  }, [firebaseUrl]);
  useEffect(() => {
    syncWithCloud();
    const interval = setInterval(syncWithCloud, 30000);
    const handleOnline = () => syncWithCloud();
    const handleFocus = () => syncWithCloud();
    window.addEventListener('online', handleOnline);
    window.addEventListener('focus', handleFocus);
    return () => {
      clearInterval(interval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('focus', handleFocus);
    };
  }, [syncWithCloud]);
  const addMovimiento = mov => {
    const newMov = {
      id: mov.id || `mov-${Date.now()}`,
      fecha: mov.fecha || new Date().toISOString().split('T')[0],
      tipo: mov.tipo,
      cuentaOrigen: mov.cuentaOrigen || '',
      cuentaDestino: mov.cuentaDestino || '',
      importe: Math.abs(parseFloat(mov.importe) || 0),
      categoria: mov.tipo === 'transferencia' ? 'Transferencia' : mov.categoria || 'General',
      comentario: mov.comentario || ''
    };
    updateAndSyncData(prev => ({
      ...prev,
      movimientos: [newMov, ...(prev.movimientos || [])]
    }));
  };
  const updateMovimiento = (id, updatedFields) => {
    updateAndSyncData(prev => ({
      ...prev,
      movimientos: (prev.movimientos || []).map(m => m.id === id ? {
        ...m,
        ...updatedFields
      } : m)
    }));
  };
  const deleteMovimiento = id => {
    updateAndSyncData(prev => ({
      ...prev,
      movimientos: (prev.movimientos || []).filter(m => m.id !== id)
    }));
  };

  // Gestión de Fuentes de Ingreso / Nóminas
  const addFuenteIngreso = ({
    nombre,
    importeDefecto
  }) => {
    const newId = `src-${Date.now()}`;
    const newFuente = {
      id: newId,
      nombre: nombre.trim(),
      importeDefecto: parseFloat(importeDefecto) || 0.00
    };
    updateAndSyncData(prev => ({
      ...prev,
      fuentesIngreso: [...(prev.fuentesIngreso || []), newFuente]
    }));
    return newFuente;
  };
  const updateFuenteIngreso = (id, fields) => {
    updateAndSyncData(prev => ({
      ...prev,
      fuentesIngreso: (prev.fuentesIngreso || []).map(f => f.id === id ? {
        ...f,
        ...fields
      } : f)
    }));
  };
  const deleteFuenteIngreso = id => {
    updateAndSyncData(prev => ({
      ...prev,
      fuentesIngreso: (prev.fuentesIngreso || []).filter(f => f.id !== id)
    }));
  };

  // Gestión Dinámica de Gastos Fijos
  const addGastoFijo = gasto => {
    const newId = `gf-${Date.now()}`;
    const newGf = {
      id: newId,
      nombre: gasto.nombre.trim(),
      categoria: gasto.categoria || 'Suscripciones',
      cuenta: gasto.cuenta || 'acc-bbva',
      importe: parseFloat(gasto.importe) || 0.00
    };
    updateAndSyncData(prev => ({
      ...prev,
      config: {
        ...(prev.config || {}),
        gastosFijosDefecto: [...(prev.config?.gastosFijosDefecto || []), newGf]
      }
    }));
  };
  const updateGastoFijo = (id, fields) => {
    updateAndSyncData(prev => ({
      ...prev,
      config: {
        ...(prev.config || {}),
        gastosFijosDefecto: (prev.config?.gastosFijosDefecto || []).map(g => g.id === id || g.nombre === id ? {
          ...g,
          ...fields
        } : g)
      }
    }));
  };
  const deleteGastoFijo = id => {
    updateAndSyncData(prev => ({
      ...prev,
      config: {
        ...(prev.config || {}),
        gastosFijosDefecto: (prev.config?.gastosFijosDefecto || []).filter(g => g.id !== id && g.nombre !== id)
      }
    }));
  };

  // Gestión Dinámica de Ingresos Fijos / Beneficios
  const addIngresoFijo = ingreso => {
    const newId = `if-${Date.now()}`;
    const newIf = {
      id: newId,
      nombre: ingreso.nombre.trim(),
      categoria: ingreso.categoria || 'Otros Ingresos',
      cuenta: ingreso.cuenta || 'acc-bbva',
      importe: parseFloat(ingreso.importe) || 0.00,
      isVariable: !!ingreso.isVariable
    };
    updateAndSyncData(prev => ({
      ...prev,
      config: {
        ...(prev.config || {}),
        ingresosFijosDefecto: [...(prev.config?.ingresosFijosDefecto || []), newIf]
      }
    }));
  };
  const updateIngresoFijo = (id, fields) => {
    updateAndSyncData(prev => ({
      ...prev,
      config: {
        ...(prev.config || {}),
        ingresosFijosDefecto: (prev.config?.ingresosFijosDefecto || []).map(i => i.id === id || i.nombre === id ? {
          ...i,
          ...fields
        } : i)
      }
    }));
  };
  const deleteIngresoFijo = id => {
    updateAndSyncData(prev => ({
      ...prev,
      config: {
        ...(prev.config || {}),
        ingresosFijosDefecto: (prev.config?.ingresosFijosDefecto || []).filter(i => i.id !== id && i.nombre !== id)
      }
    }));
  };
  const distribuirSueldo = ({
    fecha,
    incomes,
    irpfPct,
    ahorroPct,
    gastoPct,
    inversionAmount,
    cuentaIngreso = 'acc-santander',
    cuentaInversion = 'acc-myinvestor'
  }) => {
    const totalIngreso = Object.values(incomes).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
    if (totalIngreso <= 0) return false;
    const irpfAmount = Math.round(totalIngreso * (irpfPct || 0.18) * 100) / 100;
    const ahorroAmount = Math.round(totalIngreso * (ahorroPct || 0.50) * 100) / 100;
    const invAmount = Math.round((inversionAmount !== undefined ? inversionAmount : 200.00) * 100) / 100;
    const newMovs = [];
    const timestamp = Date.now();
    Object.entries(incomes).forEach(([fuenteId, amount], idx) => {
      const numAmt = parseFloat(amount) || 0;
      if (numAmt > 0) {
        const fuenteObj = (data.fuentesIngreso || []).find(f => f.id === fuenteId);
        const nombreFuente = fuenteObj ? fuenteObj.nombre : fuenteId;
        newMovs.push({
          id: `mov-${timestamp + idx * 10}`,
          fecha: fecha,
          tipo: 'ingreso',
          cuentaDestino: cuentaIngreso,
          importe: numAmt,
          categoria: 'Sueldo/Nómina',
          comentario: `Nómina ${nombreFuente}`
        });
      }
    });
    if (irpfAmount > 0) {
      newMovs.push({
        id: `mov-${timestamp + 100}`,
        fecha: fecha,
        tipo: 'transferencia',
        cuentaOrigen: cuentaIngreso,
        cuentaDestino: 'acc-sab-irpf',
        importe: irpfAmount,
        categoria: 'Reparto Sueldo',
        comentario: `IRPF (${Math.round(irpfPct * 100)}%) a Sabadell IRPF`
      });
    }
    if (ahorroAmount > 0) {
      newMovs.push({
        id: `mov-${timestamp + 200}`,
        fecha: fecha,
        tipo: 'transferencia',
        cuentaOrigen: cuentaIngreso,
        cuentaDestino: 'acc-sab-ahorro',
        importe: ahorroAmount,
        categoria: 'Reparto Sueldo',
        comentario: `Ahorro (${Math.round(ahorroPct * 100)}%) a Sabadell Ahorro`
      });
    }
    if (invAmount > 0) {
      const targetAcc = cuentaInversion || 'acc-myinvestor';
      const targetAccObj = (data.cuentas || []).find(c => c.id === targetAcc);
      const targetAccName = targetAccObj ? targetAccObj.nombre : 'MyInvestor';
      newMovs.push({
        id: `mov-${timestamp + 300}`,
        fecha: fecha,
        tipo: 'transferencia',
        cuentaOrigen: cuentaIngreso,
        cuentaDestino: targetAcc,
        importe: invAmount,
        categoria: 'Inversiones',
        comentario: `Aportación mensual a ${targetAccName}`
      });
    }
    updateAndSyncData(prev => ({
      ...prev,
      movimientos: [...newMovs, ...(prev.movimientos || [])]
    }));
    return {
      totalIngreso,
      irpfAmount,
      ahorroAmount,
      invAmount,
      cuentaInversion
    };
  };
  const updateConfig = newConfig => {
    updateAndSyncData(prev => ({
      ...prev,
      config: {
        ...(prev.config || {}),
        ...newConfig
      }
    }));
  };
  const toggleCuenta = id => {
    updateAndSyncData(prev => ({
      ...prev,
      cuentas: (prev.cuentas || []).map(c => c.id === id ? {
        ...c,
        activa: !c.activa
      } : c)
    }));
  };
  const toggleIncluirEnTotal = id => {
    updateAndSyncData(prev => ({
      ...prev,
      cuentas: (prev.cuentas || []).map(c => c.id === id ? {
        ...c,
        incluirEnTotal: !c.incluirEnTotal
      } : c)
    }));
  };
  const importJsonData = newJson => {
    if (newJson && typeof newJson === 'object') {
      const clean = normalizeFinanceData(newJson, data);
      updateAndSyncData(clean);
      return true;
    }
    return false;
  };
  const resetToOriginalData = async () => {
    try {
      const res = await fetch('data.json');
      if (res.ok) {
        const json = await res.json();
        const clean = normalizeFinanceData(json, defaultFallbackData);
        updateAndSyncData(clean);
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };
  const saldos = useMemo(() => {
    const bal = {};
    (data.cuentas || []).forEach(c => {
      if (c && c.id) bal[c.id] = c.saldoInicial || 0.0;
    });
    (data.movimientos || []).forEach(m => {
      if (!m) return;
      const imp = parseFloat(m.importe) || 0;
      if (m.tipo === 'gasto') {
        if (bal[m.cuentaOrigen] !== undefined) bal[m.cuentaOrigen] -= imp;
      } else if (m.tipo === 'ingreso') {
        if (bal[m.cuentaDestino] !== undefined) bal[m.cuentaDestino] += imp;
      } else if (m.tipo === 'transferencia') {
        if (bal[m.cuentaOrigen] !== undefined) bal[m.cuentaOrigen] -= imp;
        if (bal[m.cuentaDestino] !== undefined) bal[m.cuentaDestino] += imp;
      }
    });
    return bal;
  }, [data.cuentas, data.movimientos]);
  const totalPatrimonioDisponible = useMemo(() => {
    return (data.cuentas || []).filter(c => c && c.activa && c.incluirEnTotal !== false).reduce((sum, c) => sum + (saldos[c.id] || 0), 0);
  }, [data.cuentas, saldos]);
  const totalInversionConjunta = useMemo(() => {
    return (data.cuentas || []).filter(c => c && c.activa && (c.tipo === 'inversion' || c.id === 'acc-trade' || c.id === 'acc-myinvestor')).reduce((sum, c) => sum + (saldos[c.id] || 0), 0);
  }, [data.cuentas, saldos]);
  const totalPatrimonioAbsoluto = useMemo(() => {
    return (data.cuentas || []).filter(c => c && c.activa).reduce((sum, c) => sum + (saldos[c.id] || 0), 0);
  }, [data.cuentas, saldos]);
  const saldoIrpfSeparado = useMemo(() => {
    return saldos['acc-sab-irpf'] || 0;
  }, [saldos]);
  const saldoTradeRepublic = useMemo(() => saldos['acc-trade'] || 0, [saldos]);
  const saldoMyInvestor = useMemo(() => saldos['acc-myinvestor'] || 0, [saldos]);
  return /*#__PURE__*/React.createElement(FinanceContext.Provider, {
    value: {
      data,
      saldos,
      totalPatrimonio: totalPatrimonioDisponible,
      totalInversion: totalInversionConjunta,
      totalPatrimonioAbsoluto,
      saldoIrpfSeparado,
      saldoTradeRepublic,
      saldoMyInvestor,
      syncStatus,
      lastSyncTime,
      firebaseUrl,
      setFirebaseUrl,
      syncNow: syncWithCloud,
      addMovimiento,
      updateMovimiento,
      deleteMovimiento,
      addFuenteIngreso,
      updateFuenteIngreso,
      deleteFuenteIngreso,
      addGastoFijo,
      updateGastoFijo,
      deleteGastoFijo,
      addIngresoFijo,
      updateIngresoFijo,
      deleteIngresoFijo,
      distribuirSueldo,
      updateConfig,
      toggleCuenta,
      toggleIncluirEnTotal,
      importJsonData,
      resetToOriginalData
    }
  }, children);
};
const useFinance = () => useContext(FinanceContext);

// ==========================================
// 🧭 NAVBAR & STATUS
// ==========================================
const Navbar = ({
  activeTab,
  setActiveTab,
  onOpenNewModal
}) => {
  const {
    syncStatus,
    syncNow
  } = useFinance();
  const syncInfo = {
    synced: {
      text: 'Conectado',
      color: 'bg-emerald-500',
      pill: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    syncing: {
      text: 'Sincronizando...',
      color: 'bg-blue-500 animate-pulse',
      pill: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    offline: {
      text: 'Modo Local',
      color: 'bg-amber-500',
      pill: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    error: {
      text: 'Sin Conexión',
      color: 'bg-rose-500',
      pill: 'bg-rose-50 text-rose-700 border-rose-200'
    }
  }[syncStatus] || {
    text: 'Offline',
    color: 'bg-slate-400',
    pill: 'bg-slate-50 text-slate-600 border-slate-200'
  };
  return /*#__PURE__*/React.createElement("header", {
    className: "sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-3 sm:px-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 cursor-pointer",
    onClick: () => setActiveTab('dashboard')
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-700 flex items-center justify-center text-white shadow-sm shadow-slate-200"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "wallet",
    className: "w-5 h-5 text-white"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-base font-bold tracking-tight text-slate-900 leading-tight"
  }, "Finanzas 2026"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 font-medium"
  }, "Patrimonio & Inversión"))), /*#__PURE__*/React.createElement("nav", {
    className: "hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60"
  }, [{
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'home'
  }, {
    id: 'sueldo',
    label: 'Motor Sueldo & Fijos',
    icon: 'zap'
  }, {
    id: 'movimientos',
    label: 'Movimientos',
    icon: 'creditCard'
  }, {
    id: 'analitica',
    label: 'Analítica & Varianza',
    icon: 'chart'
  }, {
    id: 'ajustes',
    label: 'Ajustes',
    icon: 'settings'
  }].map(tab => /*#__PURE__*/React.createElement("button", {
    key: tab.id,
    onClick: () => setActiveTab(tab.id),
    className: `flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${activeTab === tab.id ? 'bg-white text-slate-900 shadow-sm shadow-slate-200/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: tab.icon,
    className: "w-4 h-4"
  }), tab.label))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: syncNow,
    title: "Forzar sincronización con Firebase",
    className: `flex items-center gap-2 px-2.5 py-1 rounded-full border text-xs font-medium transition-colors ${syncInfo.pill}`
  }, /*#__PURE__*/React.createElement("span", {
    className: `w-2 h-2 rounded-full ${syncInfo.color}`
  }), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline"
  }, syncInfo.text), /*#__PURE__*/React.createElement(Icon, {
    name: "refresh",
    className: "w-3.5 h-3.5 opacity-70"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: onOpenNewModal,
    className: "flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-sm transition-all"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline"
  }, "Nuevo")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveTab('ajustes'),
    title: "Ajustes y Configuración",
    className: `flex items-center justify-center w-8 h-8 rounded-xl border transition-all active:scale-95 ${activeTab === 'ajustes' ? 'bg-slate-900 text-white border-slate-900 shadow-sm' : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border-slate-200/80'}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "settings",
    className: "w-4 h-4"
  })))));
};

// ==========================================
// 📱 BOTTOM NAV
// ==========================================
const BottomNav = ({
  activeTab,
  setActiveTab,
  onOpenNewModal
}) => {
  const tabs = [{
    id: 'dashboard',
    label: 'Inicio',
    icon: 'home'
  }, {
    id: 'sueldo',
    label: 'Motor',
    icon: 'zap'
  }, {
    id: 'new',
    label: '',
    icon: 'plus',
    isAction: true
  }, {
    id: 'movimientos',
    label: 'Diario',
    icon: 'creditCard'
  }, {
    id: 'analitica',
    label: 'Análisis',
    icon: 'chart'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-2 py-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-around"
  }, tabs.map(t => {
    if (t.isAction) {
      return /*#__PURE__*/React.createElement("button", {
        key: "btn-action",
        onClick: onOpenNewModal,
        className: "w-12 h-12 -mt-5 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-900/30 active:scale-90 transition-transform"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "plus",
        className: "w-6 h-6"
      }));
    }
    const isActive = activeTab === t.id;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => setActiveTab(t.id),
      className: `flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-colors ${isActive ? 'text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-600'}`
    }, /*#__PURE__*/React.createElement(Icon, {
      name: t.icon,
      className: `w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] mt-0.5"
    }, t.label));
  })));
};

// ==========================================
// 📊 DASHBOARD PRINCIPAL (CUENTAS EN ORDEN + DESPLEGABLE INVERSIONES)
// ==========================================
const DashboardView = ({
  setActiveTab,
  onOpenNewModal,
  onSelectAccountFilter
}) => {
  const {
    data,
    saldos,
    totalPatrimonio,
    totalInversion,
    totalPatrimonioAbsoluto,
    saldoIrpfSeparado,
    saldoTradeRepublic,
    saldoMyInvestor
  } = useFinance();
  const [isInvExpanded, setIsInvExpanded] = useState(false);
  const currentMonthStats = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = String(now.getMonth() + 1).padStart(2, '0');
    const monthPrefix = `${currentYear}-${currentMonth}`;
    let ingresos = 0;
    let gastos = 0;
    (data.movimientos || []).forEach(m => {
      if (m && m.fecha && m.fecha.startsWith(monthPrefix)) {
        const imp = parseFloat(m.importe) || 0;
        if (m.tipo === 'ingreso') ingresos += imp;
        if (m.tipo === 'gasto') gastos += imp;
      }
    });
    return {
      ingresos,
      gastos,
      balance: ingresos - gastos,
      tasaAhorro: ingresos > 0 ? Math.max(0, Math.round((ingresos - gastos) / ingresos * 100)) : 0
    };
  }, [data.movimientos]);
  const recentMovements = useMemo(() => {
    return (data.movimientos || []).slice(0, 8);
  }, [data.movimientos]);

  // Lista de cuentas operativas en orden estricto: BBVA, Santander, Sabadell Ahorro, Sabadell IRPF, Efectivo
  const orderedStandardAccounts = useMemo(() => {
    const desiredOrder = ['acc-bbva', 'acc-santander', 'acc-sab-ahorro', 'acc-sab-irpf', 'acc-efectivo'];
    const accList = (data.cuentas || []).filter(c => c && c.activa && c.tipo !== 'inversion');
    return accList.sort((a, b) => {
      const idxA = desiredOrder.indexOf(a.id);
      const idxB = desiredOrder.indexOf(b.id);
      return (idxA !== -1 ? idxA : 99) - (idxB !== -1 ? idxB : 99);
    });
  }, [data.cuentas]);
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 pb-24 md:pb-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white p-6 sm:p-8 shadow-xl shadow-slate-900/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-0 left-1/3 -mb-16 w-48 h-48 rounded-full bg-purple-500/10 blur-2xl pointer-events-none"
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider"
  }, /*#__PURE__*/React.createElement("span", null, "Patrimonio Líquido Disponible"), /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-slate-200"
  }, (data.cuentas || []).filter(c => c && c.activa && c.incluirEnTotal !== false).length, " Cuentas Operativas")), /*#__PURE__*/React.createElement("div", {
    className: "text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 text-white font-sans"
  }, formatCurrency(totalPatrimonio)), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 flex flex-wrap items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs bg-purple-950/70 border border-purple-500/40 text-purple-200 font-semibold"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 rounded-full bg-purple-400"
  }), "Inversión (Separada): ", /*#__PURE__*/React.createElement("strong", null, formatCurrency(totalInversion))), /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs bg-cyan-950/60 border border-cyan-500/30 text-cyan-200"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 rounded-full bg-cyan-400"
  }), "Sabadell IRPF: ", /*#__PURE__*/React.createElement("strong", null, formatCurrency(saldoIrpfSeparado))), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-400"
  }, "• Total Consolidado: ", /*#__PURE__*/React.createElement("strong", {
    className: "text-slate-200 font-sans"
  }, formatCurrency(totalPatrimonioAbsoluto))))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 sm:grid-cols-3 gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] text-slate-400 block font-medium"
  }, "Ingresos Mes"), /*#__PURE__*/React.createElement("span", {
    className: "text-sm sm:text-base font-bold text-emerald-400 font-sans"
  }, "+", formatCurrency(currentMonthStats.ingresos))), /*#__PURE__*/React.createElement("div", {
    className: "p-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] text-slate-400 block font-medium"
  }, "Gastos Mes"), /*#__PURE__*/React.createElement("span", {
    className: "text-sm sm:text-base font-bold text-rose-400 font-sans"
  }, "-", formatCurrency(currentMonthStats.gastos))), /*#__PURE__*/React.createElement("div", {
    className: "p-2 col-span-2 sm:col-span-1 border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0 sm:pl-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] text-slate-400 block font-medium"
  }, "Ahorro Estimado"), /*#__PURE__*/React.createElement("span", {
    className: "text-sm sm:text-base font-bold text-sky-300"
  }, currentMonthStats.tasaAhorro, "%")))), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onOpenNewModal('gasto'),
    className: "flex items-center gap-1.5 bg-white/10 hover:bg-white/20 active:scale-95 text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-all backdrop-blur-sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrowUpRight",
    className: "w-3.5 h-3.5 text-rose-400"
  }), "+ Añadir Gasto"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onOpenNewModal('ingreso'),
    className: "flex items-center gap-1.5 bg-white/10 hover:bg-white/20 active:scale-95 text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-all backdrop-blur-sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrowDownLeft",
    className: "w-3.5 h-3.5 text-emerald-400"
  }), "+ Registrar Ingreso"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onOpenNewModal('transferencia'),
    className: "flex items-center gap-1.5 bg-white/10 hover:bg-white/20 active:scale-95 text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-all backdrop-blur-sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "transfer",
    className: "w-3.5 h-3.5 text-sky-400"
  }), "⇄ Transferir"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveTab('sueldo'),
    className: "flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-md shadow-amber-500/20 ml-auto"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "zap",
    className: "w-4 h-4 text-slate-950"
  }), "Motor Sueldo & Inversión"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3 px-1"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-base font-bold text-slate-900"
  }, "Tus Cuentas & Saldos"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-500"
  }, "Toca una cuenta para filtrar diario")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
  }, orderedStandardAccounts.map(c => {
    const saldo = saldos[c.id] || 0;
    const badge = getAccountBadge(c.id, data.cuentas);
    const isExcluded = c.incluirEnTotal === false;
    return /*#__PURE__*/React.createElement("div", {
      key: c.id,
      onClick: () => onSelectAccountFilter(c.id),
      className: "group relative bg-white hover:bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-start justify-between"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2.5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "w-3.5 h-3.5 rounded-full ring-4 ring-slate-100",
      style: {
        backgroundColor: c.color
      }
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: "text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors"
    }, c.nombre), /*#__PURE__*/React.createElement("span", {
      className: "text-[11px] font-medium text-slate-400 capitalize"
    }, c.id === 'acc-bbva' ? 'Cuenta Principal' : c.tipo))), isExcluded ? /*#__PURE__*/React.createElement("span", {
      className: `text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.bgClass}`
    }, "No suma al total") : /*#__PURE__*/React.createElement("span", {
      className: `text-[11px] font-semibold px-2 py-0.5 rounded-full border ${badge.bgClass}`
    }, totalPatrimonio > 0 ? Math.max(0, Math.round(saldo / totalPatrimonio * 100)) : 0, "%")), /*#__PURE__*/React.createElement("div", {
      className: "mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-xs text-slate-400 font-medium"
    }, "Saldo disponible"), /*#__PURE__*/React.createElement("span", {
      className: `text-xl font-bold font-sans ${saldo < 0 ? 'text-rose-600' : 'text-slate-900'}`
    }, formatCurrency(saldo))));
  }), /*#__PURE__*/React.createElement("div", {
    className: "group relative bg-white hover:bg-slate-50/80 p-5 rounded-2xl border border-purple-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-3.5 h-3.5 rounded-full bg-purple-600 ring-4 ring-purple-100"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-slate-900 group-hover:text-purple-600 transition-colors"
  }, "Inversiones"), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] font-medium text-slate-400"
  }, "MyInvestor & Trade Republic"))), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200"
  }, "No suma al total")), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-400 font-medium"
  }, "Saldo conjunto"), /*#__PURE__*/React.createElement("span", {
    className: "text-xl font-extrabold font-sans text-purple-900"
  }, formatCurrency(totalInversion)))), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 pt-2.5 border-t border-slate-100"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: e => {
      e.stopPropagation();
      setIsInvExpanded(!isInvExpanded);
    },
    className: "w-full flex items-center justify-between text-[11px] font-bold text-purple-700 hover:text-purple-900 py-1 transition-colors"
  }, /*#__PURE__*/React.createElement("span", null, isInvExpanded ? 'Ocultar desglose' : 'Ver cuentas por separado'), /*#__PURE__*/React.createElement(Icon, {
    name: isInvExpanded ? 'chevronUp' : 'chevronDown',
    className: "w-3.5 h-3.5 text-purple-600"
  })), isInvExpanded && /*#__PURE__*/React.createElement("div", {
    className: "mt-2 space-y-1.5 pt-1.5 border-t border-purple-100/60 animate-fadeIn"
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => onSelectAccountFilter('acc-myinvestor'),
    className: "flex items-center justify-between p-2 rounded-xl bg-purple-50/70 hover:bg-purple-100/80 cursor-pointer transition-colors",
    title: "Filtrar movimientos de MyInvestor"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2.5 h-2.5 rounded-full bg-purple-500"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-slate-800"
  }, "MyInvestor")), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-purple-900 font-sans"
  }, formatCurrency(saldoMyInvestor))), /*#__PURE__*/React.createElement("div", {
    onClick: () => onSelectAccountFilter('acc-trade'),
    className: "flex items-center justify-between p-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 cursor-pointer transition-colors",
    title: "Filtrar movimientos de Trade Republic"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2.5 h-2.5 rounded-full bg-zinc-800"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-slate-800"
  }, "Trade Republic")), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-zinc-900 font-sans"
  }, formatCurrency(saldoTradeRepublic)))))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-slate-900"
  }, "Movimientos Recientes"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500"
  }, "Últimas transacciones registradas")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveTab('movimientos'),
    className: "text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
  }, "Ver todos (", (data.movimientos || []).length, ") →")), /*#__PURE__*/React.createElement("div", {
    className: "divide-y divide-slate-100"
  }, recentMovements.map(m => {
    const isGasto = m.tipo === 'gasto';
    const isIngreso = m.tipo === 'ingreso';
    const isTransfer = m.tipo === 'transferencia';
    const origAcc = (data.cuentas || []).find(c => c.id === m.cuentaOrigen);
    const destAcc = (data.cuentas || []).find(c => c.id === m.cuentaDestino);
    return /*#__PURE__*/React.createElement("div", {
      key: m.id,
      className: "p-3.5 sm:p-4 hover:bg-slate-50/70 transition-colors flex items-center justify-between gap-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3 min-w-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: `w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isGasto ? 'bg-rose-50 text-rose-600' : isIngreso ? 'bg-emerald-50 text-emerald-600' : 'bg-sky-50 text-sky-600'}`
    }, /*#__PURE__*/React.createElement(Icon, {
      name: isGasto ? 'arrowUpRight' : isIngreso ? 'arrowDownLeft' : 'transfer',
      className: "w-4 h-4"
    })), /*#__PURE__*/React.createElement("div", {
      className: "min-w-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-xs sm:text-sm font-bold text-slate-900 truncate"
    }, m.categoria || (isTransfer ? 'Transferencia' : 'General')), m.comentario && /*#__PURE__*/React.createElement("span", {
      className: "text-xs text-slate-400 truncate max-w-[140px] sm:max-w-xs"
    }, "• ", m.comentario)), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 text-[11px] text-slate-400 mt-0.5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-semibold text-slate-600"
    }, formatDate(m.fecha)), /*#__PURE__*/React.createElement("span", null, "•"), isTransfer ? /*#__PURE__*/React.createElement("span", null, origAcc?.nombre || 'Origen', " → ", destAcc?.nombre || 'Destino') : isGasto ? /*#__PURE__*/React.createElement("span", null, origAcc?.nombre || 'Cuenta') : /*#__PURE__*/React.createElement("span", null, destAcc?.nombre || 'Cuenta')))), /*#__PURE__*/React.createElement("div", {
      className: "text-right shrink-0"
    }, /*#__PURE__*/React.createElement("span", {
      className: `text-xs sm:text-sm font-bold font-sans ${isGasto ? 'text-slate-900' : isIngreso ? 'text-emerald-600' : 'text-sky-700'}`
    }, isGasto ? `-${formatCurrency(m.importe)}` : isIngreso ? `+${formatCurrency(m.importe)}` : `⇄ ${formatCurrency(m.importe)}`)));
  }))));
};

// ==========================================
// ⚡ MOTOR DE SUELDO, GASTOS FIJOS & INVERSIONES (Cobro en Santander, Gastos en BBVA)
// ==========================================
const SueldoEngineView = ({
  setActiveTab
}) => {
  const {
    data,
    distribuirSueldo,
    addMovimiento,
    addFuenteIngreso,
    updateFuenteIngreso,
    deleteFuenteIngreso,
    addGastoFijo,
    updateGastoFijo,
    deleteGastoFijo,
    addIngresoFijo,
    updateIngresoFijo,
    deleteIngresoFijo
  } = useFinance();
  const [fecha, setFecha] = useState(() => new Date().toISOString().split('T')[0]);
  const [incomes, setIncomes] = useState(() => {
    const init = {};
    (data.fuentesIngreso || []).forEach(f => {
      init[f.id] = f.importeDefecto !== undefined && f.importeDefecto > 0 ? f.importeDefecto.toString() : '';
    });
    return init;
  });
  useEffect(() => {
    setIncomes(prev => {
      const next = {
        ...prev
      };
      (data.fuentesIngreso || []).forEach(f => {
        if (next[f.id] === undefined) {
          next[f.id] = f.importeDefecto !== undefined && f.importeDefecto > 0 ? f.importeDefecto.toString() : '';
        }
      });
      return next;
    });
  }, [data.fuentesIngreso]);
  const [irpfPct, setIrpfPct] = useState(data.config?.repartoSueldo?.irpf || 0.18);
  const [ahorroPct, setAhorroPct] = useState(data.config?.repartoSueldo?.ahorro || 0.50);
  const [gastoPct, setGastoPct] = useState(data.config?.repartoSueldo?.gasto || 0.32);

  // Inversión mensual flexible (100, 200, 300 o personalizada)
  const [inversionAmount, setInversionAmount] = useState(data.config?.inversionFija || 200.00);

  // Cuenta donde se cobra el sueldo: Santander por defecto
  const [cuentaIngreso, setCuentaIngreso] = useState('acc-santander');
  const [cuentaInversion, setCuentaInversion] = useState(data.config?.cuentaInversionDefecto || 'acc-myinvestor');
  const [distributionResult, setDistributionResult] = useState(null);
  const [notificationMsg, setNotificationMsg] = useState('');

  // 1. Gestión de Trabajos
  const [isManageSourcesOpen, setIsManageSourcesOpen] = useState(false);
  const [newSourceName, setNewSourceName] = useState('');
  const [newSourceDefaultAmt, setNewSourceDefaultAmt] = useState('');
  const [editingSourceId, setEditingSourceId] = useState(null);
  const [editSourceName, setEditSourceName] = useState('');
  const [editSourceAmt, setEditSourceAmt] = useState('');

  // 2. Gestión de Gastos Fijos
  const [isManageFixedExpOpen, setIsManageFixedExpOpen] = useState(false);
  const [newFixedExpName, setNewFixedExpName] = useState('');
  const [newFixedExpCategory, setNewFixedExpCategory] = useState('Suscripciones');
  const [newFixedExpAccount, setNewFixedExpAccount] = useState('acc-bbva');
  const [newFixedExpAmt, setNewFixedExpAmt] = useState('');
  const [fixedExpSelections, setFixedExpSelections] = useState({});

  // 3. Gestión de Ingresos Fijos / Beneficios
  const [isManageFixedIncOpen, setIsManageFixedIncOpen] = useState(false);
  const [newFixedIncName, setNewFixedIncName] = useState('');
  const [newFixedIncCategory, setNewFixedIncCategory] = useState('Otros Ingresos');
  const [newFixedIncAccount, setNewFixedIncAccount] = useState('acc-bbva');
  const [newFixedIncAmt, setNewFixedIncAmt] = useState('');
  const [newFixedIncIsVariable, setNewFixedIncIsVariable] = useState(false);
  const [fixedIncSelections, setFixedIncSelections] = useState({});
  const sortedCuentas = useMemo(() => sortCuentas(data.cuentas || []), [data.cuentas]);
  const totalIngresoCalculado = useMemo(() => {
    return Object.values(incomes).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
  }, [incomes]);
  const preview = useMemo(() => {
    const irpf = Math.round(totalIngresoCalculado * irpfPct * 100) / 100;
    const ahorro = Math.round(totalIngresoCalculado * ahorroPct * 100) / 100;
    const numInv = parseFloat(inversionAmount) || 0;
    const inv = Math.min(totalIngresoCalculado, numInv);
    const gasto = Math.max(0, Math.round((totalIngresoCalculado - irpf - ahorro - inv) * 100) / 100);
    return {
      irpf,
      ahorro,
      inv,
      gasto
    };
  }, [totalIngresoCalculado, irpfPct, ahorroPct, inversionAmount]);
  const handleIncomeChange = (fuenteId, val) => {
    setIncomes(prev => ({
      ...prev,
      [fuenteId]: val
    }));
  };
  const handleExecuteDistribution = e => {
    e.preventDefault();
    if (totalIngresoCalculado <= 0) {
      alert('Por favor, introduce al menos un importe de nómina o ingreso.');
      return;
    }
    const result = distribuirSueldo({
      fecha,
      incomes,
      irpfPct,
      ahorroPct,
      gastoPct,
      inversionAmount: parseFloat(inversionAmount) || 0,
      cuentaIngreso,
      cuentaInversion
    });
    if (result) {
      setDistributionResult({
        ...result,
        fecha,
        preview
      });
    }
  };
  const handleQuickRegisterFixedExpense = (gf, index) => {
    const selectedAcc = fixedExpSelections[gf.id || index]?.cuenta || gf.cuenta || 'acc-bbva';
    const rawAmt = fixedExpSelections[gf.id || index]?.importe;
    const finalAmt = rawAmt !== undefined && rawAmt !== '' ? parseFloat(rawAmt) : gf.importe;
    if (isNaN(finalAmt) || finalAmt <= 0) {
      alert('Introduce un importe válido mayor que cero.');
      return;
    }
    addMovimiento({
      fecha: fecha,
      tipo: 'gasto',
      cuentaOrigen: selectedAcc,
      importe: finalAmt,
      categoria: gf.categoria || 'Suscripciones',
      comentario: gf.nombre
    });
    const accName = (data.cuentas || []).find(c => c.id === selectedAcc)?.nombre || 'Cuenta';
    setNotificationMsg(`¡Gasto registrado!: ${gf.nombre} (-${formatCurrency(finalAmt)}) en ${accName}`);
    setTimeout(() => setNotificationMsg(''), 4000);
  };
  const handleQuickRegisterFixedIncome = (inc, index) => {
    const selectedAcc = fixedIncSelections[inc.id || index]?.cuenta || inc.cuenta || 'acc-bbva';
    const rawAmt = fixedIncSelections[inc.id || index]?.importe;
    const finalAmt = rawAmt !== undefined && rawAmt !== '' ? parseFloat(rawAmt) : inc.importe;
    if (isNaN(finalAmt) || finalAmt <= 0) {
      alert('Introduce el importe exacto ingresado.');
      return;
    }
    addMovimiento({
      fecha: fecha,
      tipo: 'ingreso',
      cuentaDestino: selectedAcc,
      importe: finalAmt,
      categoria: inc.categoria || 'Otros Ingresos',
      comentario: inc.nombre
    });
    const accName = (data.cuentas || []).find(c => c.id === selectedAcc)?.nombre || 'Cuenta';
    setNotificationMsg(`¡Ingreso registrado!: ${inc.nombre} (+${formatCurrency(finalAmt)}) en ${accName}`);
    setTimeout(() => setNotificationMsg(''), 4000);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 max-w-4xl mx-auto pb-24 md:pb-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 mb-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "zap",
    className: "w-3.5 h-3.5 text-amber-600"
  }), "Automatización de Nóminas, Reparto & Inversión"), /*#__PURE__*/React.createElement("h2", {
    className: "text-xl font-bold text-slate-900"
  }, "Motor de Nóminas & Inversión Flexible"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 mt-0.5"
  }, "Cobro en Santander, aportación a MyInvestor y disponible restante a gastos.")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-400"
  }, "Fecha de aplicación:"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: fecha,
    onChange: e => setFecha(e.target.value),
    className: "text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
  }))), notificationMsg && /*#__PURE__*/React.createElement("div", {
    className: "bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold p-3.5 rounded-xl flex items-center justify-between animate-fadeIn"
  }, /*#__PURE__*/React.createElement("span", null, notificationMsg), /*#__PURE__*/React.createElement("button", {
    onClick: () => setNotificationMsg(''),
    className: "text-emerald-600"
  }, "×")), distributionResult && /*#__PURE__*/React.createElement("div", {
    className: "bg-emerald-50 border border-emerald-200 rounded-2xl p-5 relative animate-fadeIn"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDistributionResult(null),
    className: "absolute top-4 right-4 text-emerald-700 hover:text-emerald-900 p-1"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    className: "w-5 h-5"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 text-emerald-800 font-bold text-base mb-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    className: "w-6 h-6 text-emerald-600"
  }), "¡Nómina y Transferencias Distribuidas en Firebase!"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-emerald-700 mb-3"
  }, "Se han añadido los ingresos en Santander y generado las transferencias automáticas para la fecha ", formatDate(distributionResult.fecha), "."), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-white/70 p-3 rounded-xl border border-emerald-100"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 block"
  }, "Total Nóminas"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-slate-900"
  }, formatCurrency(distributionResult.totalIngreso))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 block"
  }, "IRPF Sabadell"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-cyan-700"
  }, formatCurrency(distributionResult.preview.irpf))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 block"
  }, "Ahorro Sabadell"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-sky-700"
  }, formatCurrency(distributionResult.preview.ahorro))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 block"
  }, "Inversión (MyInvestor)"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-purple-800"
  }, formatCurrency(distributionResult.preview.inv))))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-12 gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-slate-900 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "dollar",
    className: "w-4 h-4 text-emerald-600"
  }), "1. Nóminas a Cobrar"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsManageSourcesOpen(!isManageSourcesOpen),
    className: "text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "settings",
    className: "w-3.5 h-3.5"
  }), isManageSourcesOpen ? 'Cerrar Edición' : 'Editar Trabajos')), isManageSourcesOpen && /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-slate-50 rounded-2xl border border-blue-200/60 space-y-4 animate-fadeIn"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-slate-900"
  }, "Gestionar Trabajos y Fuentes de Ingreso"), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] text-slate-400"
  }, "Añade o modifica tus fuentes")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-48 overflow-y-auto"
  }, (data.fuentesIngreso || []).map(fuente => {
    const isEditing = editingSourceId === fuente.id;
    if (isEditing) {
      return /*#__PURE__*/React.createElement("div", {
        key: fuente.id,
        className: "flex items-center gap-2 p-2 bg-white rounded-xl border border-blue-300"
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        value: editSourceName,
        onChange: e => setEditSourceName(e.target.value),
        className: "flex-1 text-xs font-bold bg-slate-50 border border-slate-200 rounded-lg px-2 py-1"
      }), /*#__PURE__*/React.createElement("input", {
        type: "number",
        step: "0.01",
        placeholder: "0.00",
        value: editSourceAmt,
        onChange: e => setEditSourceAmt(e.target.value),
        className: "w-24 text-xs font-bold bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-right"
      }), /*#__PURE__*/React.createElement("button", {
        onClick: () => {
          if (editSourceName.trim()) {
            updateFuenteIngreso(fuente.id, {
              nombre: editSourceName.trim(),
              importeDefecto: parseFloat(editSourceAmt) || 0
            });
            setEditingSourceId(null);
          }
        },
        className: "text-xs bg-slate-900 text-white font-bold px-2.5 py-1 rounded-lg"
      }, "Guardar"), /*#__PURE__*/React.createElement("button", {
        onClick: () => setEditingSourceId(null),
        className: "text-xs text-slate-400 p-1"
      }, "✕"));
    }
    return /*#__PURE__*/React.createElement("div", {
      key: fuente.id,
      className: "flex items-center justify-between p-2 bg-white rounded-xl border border-slate-200 text-xs"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "font-bold text-slate-800 block"
    }, fuente.nombre), /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] text-slate-400"
    }, "Por defecto: ", formatCurrency(fuente.importeDefecto || 0))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-1"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setEditingSourceId(fuente.id);
        setEditSourceName(fuente.nombre);
        setEditSourceAmt((fuente.importeDefecto || 0).toString());
      },
      className: "text-slate-500 hover:text-blue-600 p-1.5 rounded-lg hover:bg-slate-100"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "edit",
      className: "w-3.5 h-3.5"
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        if (confirm(`¿Eliminar la fuente "${fuente.nombre}"?`)) {
          deleteFuenteIngreso(fuente.id);
        }
      },
      className: "text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-slate-100"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      className: "w-3.5 h-3.5"
    }))));
  })), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      if (newSourceName.trim()) {
        addFuenteIngreso({
          nombre: newSourceName,
          importeDefecto: newSourceDefaultAmt
        });
        setNewSourceName('');
        setNewSourceDefaultAmt('');
      }
    },
    className: "pt-2 border-t border-slate-200/80 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Nombre nuevo trabajo",
    value: newSourceName,
    onChange: e => setNewSourceName(e.target.value),
    className: "flex-1 text-xs font-medium bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
  }), /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "0.01",
    placeholder: "Sueldo €",
    value: newSourceDefaultAmt,
    onChange: e => setNewSourceDefaultAmt(e.target.value),
    className: "w-24 text-xs font-bold bg-white border border-slate-200 rounded-xl px-2 py-2 text-right text-slate-800"
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl whitespace-nowrap"
  }, "+ Añadir"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, (data.fuentesIngreso || []).map(fuente => /*#__PURE__*/React.createElement("div", {
    key: fuente.id,
    className: "flex items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-bold text-slate-800 min-w-[130px]"
  }, fuente.nombre), /*#__PURE__*/React.createElement("div", {
    className: "relative flex-1 max-w-[180px]"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "0.01",
    inputMode: "decimal",
    placeholder: "0.00",
    value: incomes[fuente.id] || '',
    onChange: e => handleIncomeChange(fuente.id, e.target.value),
    className: "w-full text-right font-bold text-slate-900 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 pr-7"
  }), /*#__PURE__*/React.createElement("span", {
    className: "absolute right-3 top-2.5 text-xs text-slate-400 font-bold"
  }, "€"))))), /*#__PURE__*/React.createElement("div", {
    className: "pt-3 border-t border-slate-100 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-500 font-medium"
  }, "Cuenta donde se cobra el sueldo:"), /*#__PURE__*/React.createElement("select", {
    value: cuentaIngreso,
    onChange: e => setCuentaIngreso(e.target.value),
    className: "text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800"
  }, sortedCuentas.filter(c => c && c.activa).map(c => /*#__PURE__*/React.createElement("option", {
    key: c.id,
    value: c.id
  }, c.nombre))))), /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-5 bg-gradient-to-br from-slate-900 to-slate-850 text-white p-6 rounded-3xl shadow-md flex flex-col justify-between space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-400 uppercase tracking-wider font-semibold"
  }, "2. Previsualización del Reparto"), /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-extrabold mt-1 text-white font-sans"
  }, formatCurrency(totalIngresoCalculado)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, "Total nóminas a distribuir desde ", sortedCuentas.find(c => c.id === cuentaIngreso)?.nombre || 'Santander'), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 space-y-2.5 text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between p-2.5 bg-white/5 rounded-xl border border-white/10"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2.5 h-2.5 rounded-full bg-cyan-400"
  }), "Sabadell IRPF (", Math.round(irpfPct * 100), "%)"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-cyan-300 font-sans"
  }, formatCurrency(preview.irpf))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between p-2.5 bg-white/5 rounded-xl border border-white/10"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2.5 h-2.5 rounded-full bg-sky-400"
  }), "Sabadell Ahorro (", Math.round(ahorroPct * 100), "%)"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-sky-300 font-sans"
  }, formatCurrency(preview.ahorro))), /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-purple-950/60 rounded-2xl border border-purple-400/30 space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-2 font-bold text-purple-200"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2.5 h-2.5 rounded-full bg-purple-400"
  }), "Aportación a MyInvestor"), /*#__PURE__*/React.createElement("span", {
    className: "font-extrabold text-purple-200 font-sans text-sm"
  }, formatCurrency(preview.inv))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 pt-1"
  }, [100, 200, 300].map(amt => /*#__PURE__*/React.createElement("button", {
    key: amt,
    type: "button",
    onClick: () => setInversionAmount(amt),
    className: `flex-1 py-1 rounded-lg text-xs font-bold transition-all ${parseFloat(inversionAmount) === amt ? 'bg-purple-500 text-white shadow-sm' : 'bg-white/10 text-purple-200 hover:bg-white/20'}`
  }, amt, " €")), /*#__PURE__*/React.createElement("div", {
    className: "relative flex-1"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "10",
    placeholder: "Otro €",
    value: inversionAmount,
    onChange: e => setInversionAmount(e.target.value),
    className: "w-full py-1 px-2 text-xs font-bold text-right bg-white/10 border border-purple-400/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between p-2.5 bg-white/10 rounded-xl border border-white/20"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-2 font-bold text-amber-300"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2.5 h-2.5 rounded-full bg-amber-400"
  }), "Disponible Gastos Corrientes"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-amber-300 font-sans"
  }, formatCurrency(preview.gasto))))), /*#__PURE__*/React.createElement("button", {
    onClick: handleExecuteDistribution,
    disabled: totalIngresoCalculado <= 0,
    className: "w-full py-3 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 shadow-lg shadow-amber-400/20 active:scale-98 transition-all flex items-center justify-center gap-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "zap",
    className: "w-4 h-4 text-slate-950"
  }), "Confirmar y Distribuir Nómina"))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-slate-900 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "creditCard",
    className: "w-4 h-4 text-rose-600"
  }), "Gastos Fijos & Suscripciones (Activar cuando se cobren)"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 mt-0.5"
  }, "Elige la cuenta bancaria de cargo (BBVA predeterminada) y pulsa \"Pagar\" el día que te pasen el recibo.")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsManageFixedExpOpen(!isManageFixedExpOpen),
    className: "text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-all self-start sm:self-auto flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "settings",
    className: "w-3.5 h-3.5"
  }), isManageFixedExpOpen ? 'Cerrar Edición' : 'Editar Gastos Fijos')), isManageFixedExpOpen && /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 animate-fadeIn"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-slate-900"
  }, "Añadir / Eliminar Gastos Fijos"), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] text-slate-400"
  }, "Personaliza tus recibos mensuales")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto"
  }, (data.config?.gastosFijosDefecto || []).map((gf, idx) => /*#__PURE__*/React.createElement("div", {
    key: gf.id || idx,
    className: "p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-slate-800 block"
  }, gf.nombre), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400"
  }, gf.categoria, " • ", formatCurrency(gf.importe))), /*#__PURE__*/React.createElement("button", {
    onClick: () => deleteGastoFijo(gf.id || gf.nombre),
    className: "text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-slate-100"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    className: "w-3.5 h-3.5"
  }))))), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      if (newFixedExpName.trim() && newFixedExpAmt) {
        addGastoFijo({
          nombre: newFixedExpName,
          categoria: newFixedExpCategory,
          cuenta: newFixedExpAccount,
          importe: newFixedExpAmt
        });
        setNewFixedExpName('');
        setNewFixedExpAmt('');
      }
    },
    className: "pt-2 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Nombre (ej. Gimnasio)",
    value: newFixedExpName,
    onChange: e => setNewFixedExpName(e.target.value),
    className: "text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
  }), /*#__PURE__*/React.createElement("select", {
    value: newFixedExpCategory,
    onChange: e => setNewFixedExpCategory(e.target.value),
    className: "text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
  }, (data.categorias || []).filter(c => c.tipo === 'gasto').map(c => /*#__PURE__*/React.createElement("option", {
    key: c.id,
    value: c.nombre
  }, c.nombre))), /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "0.01",
    placeholder: "Importe €",
    value: newFixedExpAmt,
    onChange: e => setNewFixedExpAmt(e.target.value),
    className: "text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-right font-bold"
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl"
  }, "+ Guardar"))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
  }, (data.config?.gastosFijosDefecto || []).map((gf, idx) => {
    const currentSelection = fixedExpSelections[gf.id || idx] || {};
    const currentAcc = currentSelection.cuenta || gf.cuenta || 'acc-bbva';
    const currentAmt = currentSelection.importe !== undefined ? currentSelection.importe : gf.importe;
    return /*#__PURE__*/React.createElement("div", {
      key: gf.id || idx,
      className: "p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-3"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-start justify-between"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-xs font-bold text-slate-900 block truncate"
    }, gf.nombre), /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] font-semibold text-slate-400"
    }, gf.categoria)), /*#__PURE__*/React.createElement("div", {
      className: "mt-2 flex items-center justify-between gap-1 text-[11px]"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-slate-400 font-medium"
    }, "Cuenta:"), /*#__PURE__*/React.createElement("select", {
      value: currentAcc,
      onChange: e => {
        const val = e.target.value;
        setFixedExpSelections(prev => ({
          ...prev,
          [gf.id || idx]: {
            ...prev[gf.id || idx],
            cuenta: val
          }
        }));
      },
      className: "bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-800 font-semibold text-[11px]"
    }, sortedCuentas.filter(c => c.activa).map(c => /*#__PURE__*/React.createElement("option", {
      key: c.id,
      value: c.id
    }, c.nombre))))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between pt-2 border-t border-slate-200/60 gap-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative flex-1"
    }, /*#__PURE__*/React.createElement("input", {
      type: "number",
      step: "0.01",
      value: currentAmt,
      onChange: e => {
        const val = e.target.value;
        setFixedExpSelections(prev => ({
          ...prev,
          [gf.id || idx]: {
            ...prev[gf.id || idx],
            importe: val
          }
        }));
      },
      className: "w-full text-xs font-black text-slate-900 bg-white border border-slate-200 rounded-lg px-2 py-1 text-right font-sans"
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => handleQuickRegisterFixedExpense(gf, idx),
      className: "bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] px-3 py-1.5 rounded-xl shadow-sm active:scale-95 transition-all whitespace-nowrap"
    }, "Pagar")));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-slate-900 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles",
    className: "w-4 h-4 text-emerald-600"
  }), "Ingresos Fijos & Beneficios Bancarios (BBVA, Sabadell Remunerada...)"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 mt-0.5"
  }, "Registra cobros periódicos de cuentas remuneradas o bonificaciones bancarias con 1 solo clic.")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsManageFixedIncOpen(!isManageFixedIncOpen),
    className: "text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-all self-start sm:self-auto flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "settings",
    className: "w-3.5 h-3.5"
  }), isManageFixedIncOpen ? 'Cerrar Edición' : 'Editar Beneficios')), isManageFixedIncOpen && /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 animate-fadeIn"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-slate-900"
  }, "Añadir / Eliminar Ingresos Fijos"), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] text-slate-400"
  }, "Configura tus beneficios recurrentes")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto"
  }, (data.config?.ingresosFijosDefecto || []).map((inc, idx) => /*#__PURE__*/React.createElement("div", {
    key: inc.id || idx,
    className: "p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-slate-800 block"
  }, inc.nombre), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400"
  }, (data.cuentas || []).find(c => c.id === inc.cuenta)?.nombre || 'Cuenta', " • ", inc.isVariable ? 'Importe Variable' : formatCurrency(inc.importe))), /*#__PURE__*/React.createElement("button", {
    onClick: () => deleteIngresoFijo(inc.id || inc.nombre),
    className: "text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-slate-100"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    className: "w-3.5 h-3.5"
  }))))), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      if (newFixedIncName.trim()) {
        addIngresoFijo({
          nombre: newFixedIncName,
          categoria: newFixedIncCategory,
          cuenta: newFixedIncAccount,
          importe: newFixedIncAmt || 0,
          isVariable: newFixedIncIsVariable
        });
        setNewFixedIncName('');
        setNewFixedIncAmt('');
      }
    },
    className: "pt-2 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Nombre beneficio",
    value: newFixedIncName,
    onChange: e => setNewFixedIncName(e.target.value),
    className: "text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
  }), /*#__PURE__*/React.createElement("select", {
    value: newFixedIncAccount,
    onChange: e => setNewFixedIncAccount(e.target.value),
    className: "text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
  }, sortedCuentas.filter(c => c.activa).map(c => /*#__PURE__*/React.createElement("option", {
    key: c.id,
    value: c.id
  }, c.nombre))), /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "0.01",
    placeholder: "Importe base €",
    value: newFixedIncAmt,
    onChange: e => setNewFixedIncAmt(e.target.value),
    className: "text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-right font-bold"
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl"
  }, "+ Guardar"))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
  }, (data.config?.ingresosFijosDefecto || []).map((inc, idx) => {
    const currentSelection = fixedIncSelections[inc.id || idx] || {};
    const currentAcc = currentSelection.cuenta || inc.cuenta || 'acc-bbva';
    const currentAmt = currentSelection.importe !== undefined ? currentSelection.importe : inc.isVariable ? '' : inc.importe;
    return /*#__PURE__*/React.createElement("div", {
      key: inc.id || idx,
      className: "p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200/80 flex flex-col justify-between space-y-3"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-xs font-bold text-slate-900 block truncate"
    }, inc.nombre), /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800"
    }, inc.isVariable ? 'Variable' : 'Fijo')), /*#__PURE__*/React.createElement("div", {
      className: "mt-2 flex items-center justify-between gap-1 text-[11px]"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-slate-500 font-medium"
    }, "Destino:"), /*#__PURE__*/React.createElement("select", {
      value: currentAcc,
      onChange: e => {
        const val = e.target.value;
        setFixedIncSelections(prev => ({
          ...prev,
          [inc.id || idx]: {
            ...prev[inc.id || idx],
            cuenta: val
          }
        }));
      },
      className: "bg-white border border-emerald-200 rounded-lg px-2 py-1 text-slate-800 font-semibold text-[11px]"
    }, sortedCuentas.filter(c => c.activa).map(c => /*#__PURE__*/React.createElement("option", {
      key: c.id,
      value: c.id
    }, c.nombre))))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between pt-2 border-t border-emerald-200/60 gap-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative flex-1"
    }, /*#__PURE__*/React.createElement("input", {
      type: "number",
      step: "0.01",
      placeholder: inc.isVariable ? "Escribir importe €" : "0.00",
      value: currentAmt,
      onChange: e => {
        const val = e.target.value;
        setFixedIncSelections(prev => ({
          ...prev,
          [inc.id || idx]: {
            ...prev[inc.id || idx],
            importe: val
          }
        }));
      },
      className: "w-full text-xs font-black text-slate-900 bg-white border border-emerald-300 rounded-lg px-2.5 py-1.5 text-right font-sans focus:ring-2 focus:ring-emerald-500"
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => handleQuickRegisterFixedIncome(inc, idx),
      className: "bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-sm active:scale-95 transition-all whitespace-nowrap"
    }, "Registrar")));
  }))));
};

// ==========================================
// 📖 DIARIO DE MOVIMIENTOS & VISTA COMPACTA POR FECHAS
// ==========================================
const MovimientosView = ({
  initialAccountFilter,
  onOpenNewModal,
  onEditModal
}) => {
  const {
    data,
    deleteMovimiento
  } = useFinance();
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('todos');
  const [selectedAccount, setSelectedAccount] = useState(initialAccountFilter || 'todos');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedMonth, setSelectedMonth] = useState('todos');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const [viewMode, setViewMode] = useState('compactByDate');
  const [expandedDates, setExpandedDates] = useState(() => ({}));
  const toggleDateExpand = dateKey => {
    setExpandedDates(prev => ({
      ...prev,
      [dateKey]: !prev[dateKey]
    }));
  };
  const expandAllDates = () => {
    const allExp = {};
    groupedByDate.forEach(g => {
      allExp[g.fecha] = true;
    });
    setExpandedDates(allExp);
  };
  const collapseAllDates = () => {
    setExpandedDates({});
  };
  const availableMonths = useMemo(() => {
    const months = new Set();
    (data.movimientos || []).forEach(m => {
      if (m && m.fecha && m.fecha.length >= 7) {
        months.add(m.fecha.substring(0, 7));
      }
    });
    return Array.from(months).sort().reverse();
  }, [data.movimientos]);
  const sortedCuentas = useMemo(() => sortCuentas(data.cuentas || []), [data.cuentas]);
  const filteredMovimientos = useMemo(() => {
    return (data.movimientos || []).filter(m => {
      if (!m) return false;
      if (selectedType !== 'todos' && m.tipo !== selectedType) return false;
      if (selectedAccount !== 'todos') {
        if (m.tipo === 'gasto' && m.cuentaOrigen !== selectedAccount) return false;
        if (m.tipo === 'ingreso' && m.cuentaDestino !== selectedAccount) return false;
        if (m.tipo === 'transferencia' && m.cuentaOrigen !== selectedAccount && m.cuentaDestino !== selectedAccount) return false;
      }
      if (selectedCategory !== 'todas') {
        if (m.tipo === 'transferencia') {
          if (selectedCategory !== 'Transferencia' && m.categoria !== selectedCategory) return false;
        } else if (m.categoria !== selectedCategory) {
          return false;
        }
      }
      if (selectedMonth !== 'todos' && (!m.fecha || !m.fecha.startsWith(selectedMonth))) return false;
      if (search.trim()) {
        const query = search.toLowerCase();
        const cat = (m.categoria || '').toLowerCase();
        const com = (m.comentario || '').toLowerCase();
        const imp = (m.importe || '').toString();
        if (!cat.includes(query) && !com.includes(query) && !imp.includes(query)) {
          return false;
        }
      }
      return true;
    });
  }, [data.movimientos, selectedType, selectedAccount, selectedCategory, selectedMonth, search]);
  const filteredTotals = useMemo(() => {
    let gastos = 0;
    let ingresos = 0;
    filteredMovimientos.forEach(m => {
      const imp = parseFloat(m.importe) || 0;
      if (m.tipo === 'gasto') gastos += imp;
      if (m.tipo === 'ingreso') ingresos += imp;
    });
    return {
      gastos,
      ingresos,
      balance: ingresos - gastos
    };
  }, [filteredMovimientos]);
  const groupedByDate = useMemo(() => {
    const map = {};
    filteredMovimientos.forEach(m => {
      const d = m.fecha || 'Sin fecha';
      if (!map[d]) {
        map[d] = {
          fecha: d,
          movimientos: [],
          totalGastos: 0,
          totalIngresos: 0,
          totalTransferencias: 0
        };
      }
      map[d].movimientos.push(m);
      const imp = parseFloat(m.importe) || 0;
      if (m.tipo === 'gasto') map[d].totalGastos += imp;
      if (m.tipo === 'ingreso') map[d].totalIngresos += imp;
      if (m.tipo === 'transferencia') map[d].totalTransferencias += imp;
    });
    return Object.values(map).sort((a, b) => b.fecha.localeCompare(a.fecha));
  }, [filteredMovimientos]);
  const totalPages = Math.ceil(filteredMovimientos.length / itemsPerPage) || 1;
  const paginatedMovimientos = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredMovimientos.slice(start, start + itemsPerPage);
  }, [filteredMovimientos, currentPage]);
  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (confirm('¿Eliminar este movimiento? Los saldos se recalcularán automáticamente.')) {
      deleteMovimiento(id);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-5 pb-24 md:pb-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative flex-1 w-full"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    className: "w-4 h-4 absolute left-3 top-3 text-slate-400"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Buscar por concepto, comentario o importe...",
    value: search,
    onChange: e => {
      setSearch(e.target.value);
      setCurrentPage(1);
    },
    className: "w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0"
  }, /*#__PURE__*/React.createElement("select", {
    value: selectedMonth,
    onChange: e => {
      setSelectedMonth(e.target.value);
      setCurrentPage(1);
    },
    className: "text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
  }, /*#__PURE__*/React.createElement("option", {
    value: "todos"
  }, "📅 Todos los meses"), availableMonths.map(m => /*#__PURE__*/React.createElement("option", {
    key: m,
    value: m
  }, formatMonthName(m)))), /*#__PURE__*/React.createElement("select", {
    value: selectedType,
    onChange: e => {
      setSelectedType(e.target.value);
      setCurrentPage(1);
    },
    className: "text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
  }, /*#__PURE__*/React.createElement("option", {
    value: "todos"
  }, "Todos los tipos"), /*#__PURE__*/React.createElement("option", {
    value: "gasto"
  }, "Solo Gastos"), /*#__PURE__*/React.createElement("option", {
    value: "ingreso"
  }, "Solo Ingresos"), /*#__PURE__*/React.createElement("option", {
    value: "transferencia"
  }, "Solo Transferencias")), /*#__PURE__*/React.createElement("select", {
    value: selectedCategory,
    onChange: e => {
      setSelectedCategory(e.target.value);
      setCurrentPage(1);
    },
    className: "text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
  }, /*#__PURE__*/React.createElement("option", {
    value: "todas"
  }, "🏷️ Todas las categorías"), (data.categorias || []).map(c => /*#__PURE__*/React.createElement("option", {
    key: c.id,
    value: c.nombre
  }, c.nombre))), /*#__PURE__*/React.createElement("select", {
    value: selectedAccount,
    onChange: e => {
      setSelectedAccount(e.target.value);
      setCurrentPage(1);
    },
    className: "text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
  }, /*#__PURE__*/React.createElement("option", {
    value: "todos"
  }, "Todas las cuentas"), sortedCuentas.map(c => /*#__PURE__*/React.createElement("option", {
    key: c.id,
    value: c.id
  }, c.nombre))))), /*#__PURE__*/React.createElement("div", {
    className: "pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-500 font-medium"
  }, /*#__PURE__*/React.createElement("strong", null, filteredMovimientos.length), " movimientos en ", /*#__PURE__*/React.createElement("strong", null, groupedByDate.length), " días"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center bg-slate-100 p-0.5 rounded-xl ml-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setViewMode('compactByDate'),
    className: `flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${viewMode === 'compactByDate' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "layers",
    className: "w-3.5 h-3.5"
  }), "Por Fechas"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setViewMode('detailed'),
    className: `flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${viewMode === 'detailed' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "list",
    className: "w-3.5 h-3.5"
  }), "Lista"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-600"
  }, "Gastos: ", /*#__PURE__*/React.createElement("strong", {
    className: "text-rose-600 font-sans"
  }, "-", formatCurrency(filteredTotals.gastos))), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-600"
  }, "Ingresos: ", /*#__PURE__*/React.createElement("strong", {
    className: "text-emerald-600 font-sans"
  }, "+", formatCurrency(filteredTotals.ingresos)))))), viewMode === 'compactByDate' && /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, groupedByDate.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between px-1 text-xs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 font-medium"
  }, "Toca cualquier día para abrir sus movimientos"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: expandAllDates,
    className: "text-[11px] font-bold text-blue-600 hover:text-blue-800 hover:underline"
  }, "Desplegar todos"), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-300"
  }, "•"), /*#__PURE__*/React.createElement("button", {
    onClick: collapseAllDates,
    className: "text-[11px] font-bold text-slate-500 hover:text-slate-700 hover:underline"
  }, "Plegar todos"))), groupedByDate.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "p-12 text-center text-slate-400 text-xs bg-white rounded-2xl border border-slate-200"
  }, "No se han encontrado movimientos con los filtros seleccionados.") : groupedByDate.map(group => {
    const isExpanded = !!expandedDates[group.fecha];
    return /*#__PURE__*/React.createElement("div", {
      key: group.fecha,
      className: "bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all"
    }, /*#__PURE__*/React.createElement("div", {
      onClick: () => toggleDateExpand(group.fecha),
      className: "p-4 bg-slate-50/70 hover:bg-slate-100/70 transition-colors flex items-center justify-between cursor-pointer select-none"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-8 h-8 rounded-xl bg-slate-200/70 flex items-center justify-center text-slate-700"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "calendar",
      className: "w-4 h-4"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "text-xs sm:text-sm font-bold text-slate-900 block"
    }, formatDateFull(group.fecha)), /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] text-slate-400 font-medium"
    }, group.movimientos.length, " ", group.movimientos.length === 1 ? 'movimiento' : 'movimientos'))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3"
    }, group.totalGastos > 0 && /*#__PURE__*/React.createElement("span", {
      className: "text-xs font-bold text-rose-600 font-sans"
    }, "-", formatCurrency(group.totalGastos)), group.totalIngresos > 0 && /*#__PURE__*/React.createElement("span", {
      className: "text-xs font-bold text-emerald-600 font-sans"
    }, "+", formatCurrency(group.totalIngresos)), /*#__PURE__*/React.createElement(Icon, {
      name: isExpanded ? 'chevronUp' : 'chevronDown',
      className: "w-4 h-4 text-slate-400"
    }))), isExpanded && /*#__PURE__*/React.createElement("div", {
      className: "divide-y divide-slate-100 border-t border-slate-100"
    }, group.movimientos.map(m => {
      const isGasto = m.tipo === 'gasto';
      const isIngreso = m.tipo === 'ingreso';
      const isTransfer = m.tipo === 'transferencia';
      const origAcc = (data.cuentas || []).find(c => c.id === m.cuentaOrigen);
      const destAcc = (data.cuentas || []).find(c => c.id === m.cuentaDestino);
      return /*#__PURE__*/React.createElement("div", {
        key: m.id,
        onClick: () => onEditModal(m),
        className: "p-3.5 sm:p-4 hover:bg-slate-50/50 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-3 min-w-0"
      }, /*#__PURE__*/React.createElement("div", {
        className: `w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${isGasto ? 'bg-rose-50 text-rose-600' : isIngreso ? 'bg-emerald-50 text-emerald-600' : 'bg-sky-50 text-sky-600'}`
      }, /*#__PURE__*/React.createElement(Icon, {
        name: isGasto ? 'arrowUpRight' : isIngreso ? 'arrowDownLeft' : 'transfer',
        className: "w-3.5 h-3.5"
      })), /*#__PURE__*/React.createElement("div", {
        className: "min-w-0"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-xs sm:text-sm font-bold text-slate-900 truncate"
      }, m.categoria || (isTransfer ? 'Transferencia' : 'General')), m.comentario && /*#__PURE__*/React.createElement("span", {
        className: "text-xs text-slate-500 truncate max-w-[140px] sm:max-w-md"
      }, "• ", m.comentario)), /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-2 text-[11px] text-slate-400 mt-0.5"
      }, isTransfer ? /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
        className: "text-slate-700"
      }, origAcc?.nombre || 'Origen'), " → ", /*#__PURE__*/React.createElement("strong", {
        className: "text-slate-700"
      }, destAcc?.nombre || 'Destino')) : isGasto ? /*#__PURE__*/React.createElement("span", null, "Cuenta: ", /*#__PURE__*/React.createElement("strong", {
        className: "text-slate-700"
      }, origAcc?.nombre || 'General')) : /*#__PURE__*/React.createElement("span", null, "Destino: ", /*#__PURE__*/React.createElement("strong", {
        className: "text-slate-700"
      }, destAcc?.nombre || 'General'))))), /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-3 shrink-0"
      }, /*#__PURE__*/React.createElement("span", {
        className: `text-xs sm:text-sm font-bold font-sans ${isGasto ? 'text-slate-900' : isIngreso ? 'text-emerald-600' : 'text-sky-700'}`
      }, isGasto ? `-${formatCurrency(m.importe)}` : isIngreso ? `+${formatCurrency(m.importe)}` : `⇄ ${formatCurrency(m.importe)}`), /*#__PURE__*/React.createElement("button", {
        onClick: e => handleDelete(m.id, e),
        title: "Eliminar movimiento",
        className: "opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-600 p-1 transition-opacity"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "trash",
        className: "w-4 h-4"
      }))));
    })));
  })), viewMode === 'detailed' && /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "divide-y divide-slate-100"
  }, paginatedMovimientos.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "p-12 text-center text-slate-400 text-xs"
  }, "No se han encontrado movimientos con los filtros seleccionados.") : paginatedMovimientos.map(m => {
    const isGasto = m.tipo === 'gasto';
    const isIngreso = m.tipo === 'ingreso';
    const isTransfer = m.tipo === 'transferencia';
    const origAcc = (data.cuentas || []).find(c => c.id === m.cuentaOrigen);
    const destAcc = (data.cuentas || []).find(c => c.id === m.cuentaDestino);
    return /*#__PURE__*/React.createElement("div", {
      key: m.id,
      onClick: () => onEditModal(m),
      className: "p-3.5 sm:p-4 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3 min-w-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: `w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isGasto ? 'bg-rose-50 text-rose-600' : isIngreso ? 'bg-emerald-50 text-emerald-600' : 'bg-sky-50 text-sky-600'}`
    }, /*#__PURE__*/React.createElement(Icon, {
      name: isGasto ? 'arrowUpRight' : isIngreso ? 'arrowDownLeft' : 'transfer',
      className: "w-4 h-4"
    })), /*#__PURE__*/React.createElement("div", {
      className: "min-w-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-xs sm:text-sm font-bold text-slate-900 truncate"
    }, m.categoria || (isTransfer ? 'Transferencia' : 'General')), m.comentario && /*#__PURE__*/React.createElement("span", {
      className: "text-xs text-slate-500 truncate max-w-[140px] sm:max-w-md"
    }, "• ", m.comentario)), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 text-[11px] text-slate-400 mt-0.5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-semibold text-slate-600"
    }, formatDate(m.fecha)), /*#__PURE__*/React.createElement("span", null, "•"), isTransfer ? /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
      className: "text-slate-700"
    }, origAcc?.nombre || 'Origen'), " → ", /*#__PURE__*/React.createElement("strong", {
      className: "text-slate-700"
    }, destAcc?.nombre || 'Destino')) : isGasto ? /*#__PURE__*/React.createElement("span", null, "Cuenta: ", /*#__PURE__*/React.createElement("strong", {
      className: "text-slate-700"
    }, origAcc?.nombre || 'General')) : /*#__PURE__*/React.createElement("span", null, "Destino: ", /*#__PURE__*/React.createElement("strong", {
      className: "text-slate-700"
    }, destAcc?.nombre || 'General'))))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3 shrink-0"
    }, /*#__PURE__*/React.createElement("span", {
      className: `text-xs sm:text-sm font-bold font-sans ${isGasto ? 'text-slate-900' : isIngreso ? 'text-emerald-600' : 'text-sky-700'}`
    }, isGasto ? `-${formatCurrency(m.importe)}` : isIngreso ? `+${formatCurrency(m.importe)}` : `⇄ ${formatCurrency(m.importe)}`), /*#__PURE__*/React.createElement("button", {
      onClick: e => handleDelete(m.id, e),
      title: "Eliminar movimiento",
      className: "opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-600 p-1 transition-opacity"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      className: "w-4 h-4"
    }))));
  })), totalPages > 1 && /*#__PURE__*/React.createElement("div", {
    className: "p-4 border-t border-slate-100 flex items-center justify-between text-xs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, "Página ", currentPage, " de ", totalPages), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1"
  }, /*#__PURE__*/React.createElement("button", {
    disabled: currentPage <= 1,
    onClick: () => setCurrentPage(p => Math.max(1, p - 1)),
    className: "px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 disabled:opacity-30"
  }, "Anterior"), /*#__PURE__*/React.createElement("button", {
    disabled: currentPage >= totalPages,
    onClick: () => setCurrentPage(p => Math.min(totalPages, p + 1)),
    className: "px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 disabled:opacity-30"
  }, "Siguiente")))));
};

// ==========================================
// 📈 ANALÍTICA & VARIANZA HISTÓRICA MES A MES (INTERACTIVA)
// ==========================================
const AnaliticaView = () => {
  const {
    data,
    saldos,
    totalPatrimonio,
    totalInversion,
    totalPatrimonioAbsoluto
  } = useFinance();
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedMonth, setSelectedMonth] = useState('todos');
  const [selectedAccountScope, setSelectedAccountScope] = useState('total-liquido');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('todas');
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [hoveredCategorySlice, setHoveredCategorySlice] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const sortedCuentas = useMemo(() => sortCuentas(data.cuentas || []), [data.cuentas]);
  const availableYears = useMemo(() => {
    const years = new Set();
    (data.movimientos || []).forEach(m => {
      if (m && m.fecha && m.fecha.length >= 4) {
        years.add(m.fecha.substring(0, 4));
      }
    });
    if (!years.has('2026')) years.add('2026');
    return Array.from(years).sort().reverse();
  }, [data.movimientos]);
  const availableMonths = useMemo(() => {
    const months = new Set();
    (data.movimientos || []).forEach(m => {
      if (m && m.fecha && m.fecha.length >= 7) {
        if (selectedYear === 'todos' || m.fecha.startsWith(selectedYear)) {
          months.add(m.fecha.substring(0, 7));
        }
      }
    });
    return Array.from(months).sort().reverse();
  }, [data.movimientos, selectedYear]);

  // 1. Filtrar movimientos de gasto para el análisis por categoría
  const filteredCategoryMovements = useMemo(() => {
    return (data.movimientos || []).filter(m => {
      if (!m || !m.fecha || m.tipo !== 'gasto') return false;
      if (selectedYear !== 'todos' && !m.fecha.startsWith(selectedYear)) return false;
      if (selectedMonth !== 'todos' && !m.fecha.startsWith(selectedMonth)) return false;
      if (selectedAccountScope === 'total-liquido') {
        const origAcc = (data.cuentas || []).find(c => c.id === m.cuentaOrigen);
        if (origAcc?.incluirEnTotal === false) return false;
      } else if (selectedAccountScope === 'inversiones-total') {
        if (!['acc-myinvestor', 'acc-trade'].includes(m.cuentaOrigen)) return false;
      } else if (selectedAccountScope !== 'total-consolidado') {
        if (m.cuentaOrigen !== selectedAccountScope) return false;
      }
      return true;
    });
  }, [data.movimientos, data.cuentas, selectedYear, selectedMonth, selectedAccountScope]);

  // 2. Agrupar gastos por categoría y calcular porcentajes
  const categoryDistribution = useMemo(() => {
    const map = {};
    let totalGasto = 0;
    const catColorMap = {
      'Alquiler': '#ef4444',
      'Comida': '#f97316',
      'Comer Fuera': '#eab308',
      'Cervezas': '#84cc16',
      'Carnet de Conducir': '#06b6d4',
      'Suscripciones': '#6366f1',
      'Planes': '#a855f7',
      'Regalos': '#ec4899',
      'Ropa': '#f43f5e',
      'Inversiones': '#10b981',
      'Universidad': '#3b82f6',
      'Utilidad': '#64748b',
      'Viajes': '#14b8a6',
      'Fisio': '#d946ef',
      'Caprichos': '#f59e0b',
      'Cuenta compartida': '#8b5cf6',
      'Otros Gastos': '#94a3b8'
    };
    (data.categorias || []).forEach(c => {
      if (c && c.nombre) catColorMap[c.nombre] = c.color || catColorMap[c.nombre] || '#64748b';
    });
    const fallbackPalette = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#14b8a6', '#f97316', '#84cc16', '#6366f1'];
    filteredCategoryMovements.forEach(m => {
      const cat = m.categoria || 'Otros Gastos';
      const imp = parseFloat(m.importe) || 0;
      if (!map[cat]) {
        map[cat] = {
          categoria: cat,
          importe: 0,
          count: 0,
          color: catColorMap[cat] || fallbackPalette[Object.keys(map).length % fallbackPalette.length]
        };
      }
      map[cat].importe += imp;
      map[cat].count += 1;
      totalGasto += imp;
    });
    const list = Object.values(map).map(item => ({
      ...item,
      porcentaje: totalGasto > 0 ? item.importe / totalGasto * 100 : 0
    })).sort((a, b) => b.importe - a.importe);
    return {
      list,
      totalGasto
    };
  }, [filteredCategoryMovements, data.categorias]);

  // 3. Generar arcos SVG para el gráfico Donut
  const donutSlices = useMemo(() => {
    const {
      list,
      totalGasto
    } = categoryDistribution;
    if (totalGasto <= 0 || list.length === 0) return [];
    if (list.length === 1) {
      const item = list[0];
      return [{
        ...item,
        pathData: 'M 150 25 A 125 125 0 1 1 149.99 25 L 149.99 75 A 75 75 0 1 0 150 75 Z',
        midX: 150,
        midY: 50,
        idx: 0
      }];
    }
    let accumulatedAngle = -Math.PI / 2;
    const cx = 150;
    const cy = 150;
    const outerR = 125;
    const innerR = 75;
    return list.map((item, idx) => {
      const sliceAngle = item.importe / totalGasto * 2 * Math.PI;
      const startAngle = accumulatedAngle;
      const endAngle = accumulatedAngle + sliceAngle;
      accumulatedAngle = endAngle;
      const x1 = cx + outerR * Math.cos(startAngle);
      const y1 = cy + outerR * Math.sin(startAngle);
      const x2 = cx + outerR * Math.cos(endAngle);
      const y2 = cy + outerR * Math.sin(endAngle);
      const x3 = cx + innerR * Math.cos(endAngle);
      const y3 = cy + innerR * Math.sin(endAngle);
      const x4 = cx + innerR * Math.cos(startAngle);
      const y4 = cy + innerR * Math.sin(startAngle);
      const largeArc = sliceAngle > Math.PI ? 1 : 0;
      const pathData = `M ${x1} ${y1} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 ${largeArc} 0 ${x4} ${y4} Z`;
      const midAngle = startAngle + sliceAngle / 2;
      const midX = cx + (outerR + innerR) / 2 * Math.cos(midAngle);
      const midY = cy + (outerR + innerR) / 2 * Math.sin(midAngle);
      return {
        ...item,
        pathData,
        midX,
        midY,
        idx
      };
    });
  }, [categoryDistribution]);

  // Cálculo de la evolución mes a mes con saldos de cierre y varianza histórica
  const monthlyVarianceHistory = useMemo(() => {
    // 1. Mapa de saldos iniciales
    const runningBal = {};
    (data.cuentas || []).forEach(c => {
      if (c && c.id) runningBal[c.id] = c.saldoInicial || 0.0;
    });
    const movsSorted = [...(data.movimientos || [])].sort((a, b) => {
      const dComp = (a.fecha || '').localeCompare(b.fecha || '');
      if (dComp !== 0) return dComp;
      return (a.id || '').localeCompare(b.id || '');
    });
    const allMonths = Array.from(new Set(movsSorted.map(m => m && m.fecha ? m.fecha.substring(0, 7) : ''))).filter(Boolean).sort();
    const fullHistory = [];
    let prevScopeSaldo = null;
    allMonths.forEach(mKey => {
      const monthMovs = movsSorted.filter(m => m && m.fecha && m.fecha.startsWith(mKey));
      let mesIngresos = 0;
      let mesGastos = 0;
      monthMovs.forEach(m => {
        const imp = parseFloat(m.importe) || 0;
        if (m.tipo === 'gasto') {
          if (runningBal[m.cuentaOrigen] !== undefined) runningBal[m.cuentaOrigen] -= imp;
        } else if (m.tipo === 'ingreso') {
          if (runningBal[m.cuentaDestino] !== undefined) runningBal[m.cuentaDestino] += imp;
        } else if (m.tipo === 'transferencia') {
          if (runningBal[m.cuentaOrigen] !== undefined) runningBal[m.cuentaOrigen] -= imp;
          if (runningBal[m.cuentaDestino] !== undefined) runningBal[m.cuentaDestino] += imp;
        }

        // Ingresos/gastos específicos del scope seleccionado
        if (selectedAccountScope === 'total-liquido') {
          const origAcc = (data.cuentas || []).find(c => c.id === m.cuentaOrigen);
          const destAcc = (data.cuentas || []).find(c => c.id === m.cuentaDestino);
          if (m.tipo === 'gasto' && origAcc?.incluirEnTotal !== false) mesGastos += imp;
          if (m.tipo === 'ingreso' && destAcc?.incluirEnTotal !== false) mesIngresos += imp;
        } else if (selectedAccountScope === 'total-consolidado') {
          if (m.tipo === 'gasto') mesGastos += imp;
          if (m.tipo === 'ingreso') mesIngresos += imp;
        } else if (selectedAccountScope === 'inversiones-total') {
          if (['acc-myinvestor', 'acc-trade'].includes(m.cuentaOrigen) && m.tipo === 'gasto') mesGastos += imp;
          if (['acc-myinvestor', 'acc-trade'].includes(m.cuentaDestino) && m.tipo === 'ingreso') mesIngresos += imp;
        } else {
          if (m.cuentaOrigen === selectedAccountScope && m.tipo === 'gasto') mesGastos += imp;
          if (m.cuentaDestino === selectedAccountScope && m.tipo === 'ingreso') mesIngresos += imp;
        }
      });

      // Calcular saldo al cierre del mes según el scope
      let currentScopeSaldo = 0;
      if (selectedAccountScope === 'total-liquido') {
        currentScopeSaldo = (data.cuentas || []).filter(c => c && c.activa && c.incluirEnTotal !== false).reduce((sum, c) => sum + (runningBal[c.id] || 0), 0);
      } else if (selectedAccountScope === 'total-consolidado') {
        currentScopeSaldo = (data.cuentas || []).filter(c => c && c.activa).reduce((sum, c) => sum + (runningBal[c.id] || 0), 0);
      } else if (selectedAccountScope === 'inversiones-total') {
        currentScopeSaldo = (runningBal['acc-myinvestor'] || 0) + (runningBal['acc-trade'] || 0);
      } else {
        currentScopeSaldo = runningBal[selectedAccountScope] || 0;
      }
      const diff = prevScopeSaldo !== null ? currentScopeSaldo - prevScopeSaldo : 0;
      const diffPct = prevScopeSaldo !== null && prevScopeSaldo !== 0 ? diff / Math.abs(prevScopeSaldo) * 100 : 0;
      fullHistory.push({
        mes: mKey,
        saldo: currentScopeSaldo,
        prevSaldo: prevScopeSaldo,
        diff,
        diffPct,
        ingresos: mesIngresos,
        gastos: mesGastos,
        balance: mesIngresos - mesGastos,
        movCount: monthMovs.length
      });
      prevScopeSaldo = currentScopeSaldo;
    });

    // Filtrar por año seleccionado
    if (selectedYear !== 'todos') {
      return fullHistory.filter(h => h.mes.startsWith(selectedYear));
    }
    return fullHistory;
  }, [data.cuentas, data.movimientos, selectedAccountScope, selectedYear]);

  // Puntos del gráfico SVG con holgura superior e inferior para evitar cortes
  const chartGraphData = useMemo(() => {
    if (monthlyVarianceHistory.length === 0) return {
      path: '',
      area: '',
      points: [],
      width: 700,
      height: 260
    };
    const values = monthlyVarianceHistory.map(d => d.saldo);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const margin = Math.max((maxVal - minVal) * 0.22, 250);
    const effectiveMin = minVal - margin;
    const effectiveMax = maxVal + margin;
    const range = effectiveMax - effectiveMin || 1;
    const width = 700;
    const height = 260;
    const paddingX = 50;
    const paddingTop = 50;
    const paddingBottom = 45;
    const points = monthlyVarianceHistory.map((d, idx) => {
      const x = paddingX + idx / Math.max(1, monthlyVarianceHistory.length - 1) * (width - 2 * paddingX);
      const y = height - paddingBottom - (d.saldo - effectiveMin) / range * (height - paddingTop - paddingBottom);
      return {
        x,
        y,
        ...d
      };
    });
    const path = points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');
    const area = points.length > 0 ? `${path} L ${points[points.length - 1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z` : '';
    return {
      path,
      area,
      points,
      width,
      height,
      minVal,
      maxVal,
      effectiveMin,
      effectiveMax
    };
  }, [monthlyVarianceHistory]);
  const scopeLabel = useMemo(() => {
    if (selectedAccountScope === 'total-liquido') return 'Patrimonio Líquido Disponible';
    if (selectedAccountScope === 'total-consolidado') return 'Patrimonio Total Consolidado';
    if (selectedAccountScope === 'inversiones-total') return 'Cartera de Inversiones (MyInvestor + Trade)';
    const found = (data.cuentas || []).find(c => c.id === selectedAccountScope);
    return found ? `Cuenta: ${found.nombre}` : 'Cuenta';
  }, [selectedAccountScope, data.cuentas]);
  const activePoint = hoveredPoint || (chartGraphData.points.length > 0 ? chartGraphData.points[chartGraphData.points.length - 1] : null);

  // Filas a mostrar en la tabla según el filtro de mes
  const displayedVarianceRows = useMemo(() => {
    if (selectedMonth !== 'todos') {
      return monthlyVarianceHistory.filter(row => row.mes === selectedMonth);
    }
    return monthlyVarianceHistory;
  }, [monthlyVarianceHistory, selectedMonth]);

  // Función de Exportación a Excel (.xls) completo con soporte de exportación por meses o anual
  const handleExportExcel = () => {
    const scopeName = scopeLabel.toUpperCase();
    const isSingleMonth = selectedMonth !== 'todos';
    const periodTitle = isSingleMonth ? formatMonthName(selectedMonth).toUpperCase() : `AÑO ${selectedYear.toUpperCase()}`;
    const movsList = (data.movimientos || []).filter(m => {
      if (!m || !m.fecha) return false;
      if (isSingleMonth) {
        return m.fecha.startsWith(selectedMonth);
      }
      if (selectedYear !== 'todos' && !m.fecha.startsWith(selectedYear)) return false;
      return true;
    });
    const varianceList = isSingleMonth ? monthlyVarianceHistory.filter(h => h.mes === selectedMonth) : monthlyVarianceHistory;
    let excelHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta http-equiv="content-type" content="text/plain; charset=UTF-8"/>
        <style>
          th { background-color: #1e293b; color: #ffffff; font-weight: bold; font-family: Calibri, sans-serif; text-align: center; border: 1px solid #cbd5e1; padding: 6px; }
          td { font-family: Calibri, sans-serif; font-size: 11pt; border: 1px solid #e2e8f0; padding: 5px; }
          .header-main { background-color: #0f172a; color: #f8fafc; font-size: 14pt; font-weight: bold; text-align: center; padding: 10px; }
          .num { text-align: right; }
          .bold { font-weight: bold; }
          .pos { color: #059669; font-weight: bold; }
          .neg { color: #dc2626; font-weight: bold; }
          .section-title { background-color: #f1f5f9; font-weight: bold; font-size: 12pt; padding: 6px; }
        </style>
      </head>
      <body>
        <table border="1">
          <tr><td colspan="7" class="header-main">FINANZAS 2026 - INFORME Y VARIANZA: ${scopeName} (${periodTitle})</td></tr>
          <tr><td colspan="7"></td></tr>
          <tr><td colspan="7" class="section-title">1. RESUMEN DE SALDOS POR CUENTA</td></tr>
          <tr>
            <th>Cuenta</th>
            <th>Tipo</th>
            <th>Saldo Inicial</th>
            <th>Saldo Actual</th>
            <th>Variación Total</th>
            <th colspan="2">Cómputo en Total</th>
          </tr>
    `;
    sortedCuentas.forEach(c => {
      const ini = c.saldoInicial || 0;
      const act = saldos[c.id] || 0;
      const varNet = act - ini;
      excelHtml += `
        <tr>
          <td class="bold">${c.nombre}</td>
          <td>${c.tipo}</td>
          <td class="num">${ini.toFixed(2)} €</td>
          <td class="num bold">${act.toFixed(2)} €</td>
          <td class="num ${varNet >= 0 ? 'pos' : 'neg'}">${varNet >= 0 ? '+' : ''}${varNet.toFixed(2)} €</td>
          <td colspan="2">${c.incluirEnTotal !== false ? 'Suma al Total' : 'Separada'}</td>
        </tr>
      `;
    });
    excelHtml += `
          <tr><td colspan="7"></td></tr>
          <tr><td colspan="7" class="section-title">2. HISTÓRICO Y VARIANZA (${periodTitle})</td></tr>
          <tr>
            <th>Mes</th>
            <th>Saldo al Cierre</th>
            <th>Varianza Neta (€)</th>
            <th>Varianza (%)</th>
            <th>Ingresos Mes</th>
            <th>Gastos Mes</th>
            <th>Ahorro / Flujo Neto</th>
          </tr>
    `;
    varianceList.forEach(row => {
      const isPos = row.diff >= 0;
      excelHtml += `
        <tr>
          <td class="bold">${formatMonthName(row.mes)}</td>
          <td class="num bold">${row.saldo.toFixed(2)} €</td>
          <td class="num ${row.prevSaldo === null ? '' : isPos ? 'pos' : 'neg'}">
            ${row.prevSaldo === null ? 'Inicial' : (isPos ? '+' : '') + row.diff.toFixed(2) + ' €'}
          </td>
          <td class="num ${row.prevSaldo === null ? '' : isPos ? 'pos' : 'neg'}">
            ${row.prevSaldo === null ? '-' : (isPos ? '+' : '') + row.diffPct.toFixed(1) + '%'}
          </td>
          <td class="num pos">+${row.ingresos.toFixed(2)} €</td>
          <td class="num neg">-${row.gastos.toFixed(2)} €</td>
          <td class="num bold ${row.balance >= 0 ? 'pos' : 'neg'}">${row.balance >= 0 ? '+' : ''}${row.balance.toFixed(2)} €</td>
        </tr>
      `;
    });
    excelHtml += `
          <tr><td colspan="7"></td></tr>
          <tr><td colspan="7" class="section-title">3. REGISTRO DETALLADO DE MOVIMIENTOS (${movsList.length} registros)</td></tr>
          <tr>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Categoría</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Importe</th>
            <th>Comentario</th>
          </tr>
    `;
    movsList.forEach(m => {
      const orig = (data.cuentas || []).find(c => c.id === m.cuentaOrigen)?.nombre || '-';
      const dest = (data.cuentas || []).find(c => c.id === m.cuentaDestino)?.nombre || '-';
      const isGasto = m.tipo === 'gasto';
      const isIngreso = m.tipo === 'ingreso';
      excelHtml += `
        <tr>
          <td>${m.fecha}</td>
          <td>${m.tipo}</td>
          <td>${m.categoria || ''}</td>
          <td>${orig}</td>
          <td>${dest}</td>
          <td class="num bold ${isGasto ? 'neg' : isIngreso ? 'pos' : ''}">${isGasto ? '-' : isIngreso ? '+' : ''}${parseFloat(m.importe || 0).toFixed(2)} €</td>
          <td>${m.comentario || ''}</td>
        </tr>
      `;
    });
    excelHtml += `
        </table>
      </body>
      </html>
    `;
    const filePeriod = isSingleMonth ? selectedMonth : selectedYear;
    const blob = new Blob([excelHtml], {
      type: 'application/vnd.ms-excel;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Finanzas_2026_${filePeriod}_${selectedAccountScope}.xls`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 pb-24 md:pb-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 mb-1"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chart",
    className: "w-3.5 h-3.5 text-blue-600"
  }), "Recorrido Histórico & Varianza Mes a Mes"), /*#__PURE__*/React.createElement("h2", {
    className: "text-xl font-bold text-slate-900"
  }, "Analítica & Varianza por Cuenta"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500"
  }, "Observa el saldo con el que cerraste cada mes, las variaciones netas y el recorrido de tus cuentas.")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleExportExcel,
    className: "flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md active:scale-95 transition-all",
    title: `Descargar hoja de cálculo Excel de ${selectedMonth !== 'todos' ? formatMonthName(selectedMonth) : selectedYear}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "table",
    className: "w-4 h-4"
  }), "Exportar Excel ", selectedMonth !== 'todos' ? `(${formatMonthName(selectedMonth)})` : '(.xls)'), /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsReportModalOpen(true),
    className: "flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md active:scale-95 transition-all"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "presentation",
    className: "w-4 h-4"
  }), "Informe Ejecutivo"))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-[11px] font-bold text-slate-500 block mb-1"
  }, "Cuenta / Ámbito a analizar:"), /*#__PURE__*/React.createElement("select", {
    value: selectedAccountScope,
    onChange: e => setSelectedAccountScope(e.target.value),
    className: "text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-slate-900"
  }, /*#__PURE__*/React.createElement("optgroup", {
    label: "Totales"
  }, /*#__PURE__*/React.createElement("option", {
    value: "total-liquido"
  }, "💰 Patrimonio Líquido (Operativo)"), /*#__PURE__*/React.createElement("option", {
    value: "total-consolidado"
  }, "🌐 Total Consolidado (Con IRPF e Inversión)"), /*#__PURE__*/React.createElement("option", {
    value: "inversiones-total"
  }, "💼 Cartera Inversión (MyInvestor + Trade)")), /*#__PURE__*/React.createElement("optgroup", {
    label: "Cuentas Individuales"
  }, sortedCuentas.map(c => /*#__PURE__*/React.createElement("option", {
    key: c.id,
    value: c.id
  }, c.nombre, " ", c.incluirEnTotal === false ? '(Separada)' : ''))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-[11px] font-bold text-slate-500 block mb-1"
  }, "Año:"), /*#__PURE__*/React.createElement("select", {
    value: selectedYear,
    onChange: e => {
      setSelectedYear(e.target.value);
      setSelectedMonth('todos');
    },
    className: "text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-slate-900"
  }, availableYears.map(y => /*#__PURE__*/React.createElement("option", {
    key: y,
    value: y
  }, "Año ", y)), /*#__PURE__*/React.createElement("option", {
    value: "todos"
  }, "Todo el Histórico"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-[11px] font-bold text-slate-500 block mb-1"
  }, "Mes:"), /*#__PURE__*/React.createElement("select", {
    value: selectedMonth,
    onChange: e => setSelectedMonth(e.target.value),
    className: "text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-slate-900"
  }, /*#__PURE__*/React.createElement("option", {
    value: "todos"
  }, "📅 Todos los meses ", selectedYear !== 'todos' ? `(${selectedYear})` : ''), availableMonths.map(m => /*#__PURE__*/React.createElement("option", {
    key: m,
    value: m
  }, formatMonthName(m)))))), activePoint && /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-4 text-xs"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400 block font-semibold uppercase"
  }, formatMonthName(activePoint.mes)), /*#__PURE__*/React.createElement("span", {
    className: "text-base font-extrabold text-slate-900 font-sans"
  }, formatCurrency(activePoint.saldo))), activePoint.prevSaldo !== null && /*#__PURE__*/React.createElement("div", {
    className: "border-l border-slate-200 pl-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400 block font-semibold"
  }, "Varianza vs mes ant."), /*#__PURE__*/React.createElement("span", {
    className: `font-bold font-sans flex items-center gap-1 ${activePoint.diff > 0 ? 'text-emerald-600' : activePoint.diff < 0 ? 'text-rose-600' : 'text-slate-500'}`
  }, activePoint.diff > 0 ? `+${formatCurrency(activePoint.diff)}` : formatCurrency(activePoint.diff), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px]"
  }, "(", activePoint.diff > 0 ? '+' : '', activePoint.diffPct.toFixed(1), "%)"))))), /*#__PURE__*/React.createElement("div", {
    onMouseLeave: () => setHoveredPoint(null),
    className: "bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-slate-900 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trendingUp",
    className: "w-4 h-4 text-blue-600"
  }), "Recorrido de ", scopeLabel), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500"
  }, "Pasa el ratón o pulsa sobre las bolitas para ver el saldo de cierre y la varianza de cada mes.")), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200"
  }, monthlyVarianceHistory.length, " Meses computados")), /*#__PURE__*/React.createElement("div", {
    onMouseLeave: () => setHoveredPoint(null),
    className: "relative w-full select-none pt-4 pb-2"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${chartGraphData.width || 700} ${chartGraphData.height || 260}`,
    className: "w-full h-72 overflow-visible",
    onMouseLeave: () => setHoveredPoint(null)
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "varianceGrad",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#3b82f6",
    stopOpacity: "0.25"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#3b82f6",
    stopOpacity: "0.0"
  }))), /*#__PURE__*/React.createElement("line", {
    x1: "50",
    y1: "50",
    x2: "650",
    y2: "50",
    stroke: "#f1f5f9",
    strokeWidth: "1",
    strokeDasharray: "3 3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "50",
    y1: "130",
    x2: "650",
    y2: "130",
    stroke: "#f1f5f9",
    strokeWidth: "1",
    strokeDasharray: "3 3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "50",
    y1: "215",
    x2: "650",
    y2: "215",
    stroke: "#e2e8f0",
    strokeWidth: "1"
  }), chartGraphData.area && /*#__PURE__*/React.createElement("path", {
    d: chartGraphData.area,
    fill: "url(#varianceGrad)"
  }), chartGraphData.path && /*#__PURE__*/React.createElement("path", {
    d: chartGraphData.path,
    fill: "none",
    stroke: "#2563eb",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), hoveredPoint && /*#__PURE__*/React.createElement("line", {
    x1: hoveredPoint.x,
    y1: "35",
    x2: hoveredPoint.x,
    y2: "215",
    stroke: "#94a3b8",
    strokeWidth: "1.5",
    strokeDasharray: "4 4"
  }), chartGraphData.points.map((p, i) => {
    const isHovered = hoveredPoint && hoveredPoint.mes === p.mes;
    return /*#__PURE__*/React.createElement("g", {
      key: i,
      className: "cursor-pointer transition-transform",
      onMouseEnter: () => setHoveredPoint(p),
      onClick: () => setHoveredPoint(p)
    }, /*#__PURE__*/React.createElement("circle", {
      cx: p.x,
      cy: p.y,
      r: "20",
      fill: "transparent"
    }), isHovered && /*#__PURE__*/React.createElement("circle", {
      cx: p.x,
      cy: p.y,
      r: "10",
      fill: "#93c5fd",
      opacity: "0.6",
      className: "animate-ping"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: p.x,
      cy: p.y,
      r: isHovered ? "6.5" : "4.5",
      fill: "#ffffff",
      stroke: "#2563eb",
      strokeWidth: isHovered ? "3.5" : "2.5"
    }), /*#__PURE__*/React.createElement("text", {
      x: p.x,
      y: "240",
      textAnchor: "middle",
      fontSize: "10",
      fill: isHovered ? "#0f172a" : "#64748b",
      fontWeight: isHovered ? "800" : "600"
    }, formatMonthName(p.mes).split(' ')[0].substring(0, 3)));
  })), hoveredPoint && /*#__PURE__*/React.createElement("div", {
    className: "absolute pointer-events-none bg-slate-900 text-white p-3 sm:p-3.5 rounded-2xl shadow-2xl text-xs z-30 border border-slate-700 animate-fadeIn w-auto max-w-[92%] sm:max-w-xs left-1/2 -translate-x-1/2 top-3 sm:top-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-bold text-slate-200 border-b border-slate-800 pb-1 mb-1.5 flex items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("span", null, formatMonthName(hoveredPoint.mes)), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400 font-mono"
  }, hoveredPoint.movCount, " movs")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline justify-between gap-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, "Saldo final:"), /*#__PURE__*/React.createElement("span", {
    className: "font-extrabold text-white font-sans text-sm"
  }, formatCurrency(hoveredPoint.saldo))), hoveredPoint.prevSaldo !== null && /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline justify-between gap-4 mt-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, "Varianza:"), /*#__PURE__*/React.createElement("span", {
    className: `font-bold font-sans ${hoveredPoint.diff > 0 ? 'text-emerald-400' : hoveredPoint.diff < 0 ? 'text-rose-400' : 'text-slate-300'}`
  }, hoveredPoint.diff > 0 ? `+${formatCurrency(hoveredPoint.diff)}` : formatCurrency(hoveredPoint.diff), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] ml-1"
  }, "(", hoveredPoint.diff > 0 ? '+' : '', hoveredPoint.diffPct.toFixed(1), "%)")))))), /*#__PURE__*/React.createElement("div", {
    onMouseLeave: () => setHoveredCategorySlice(null),
    className: "bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-slate-900 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "pieChart",
    className: "w-4 h-4 text-purple-600"
  }), "Distribución de Gastos por Categoría"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500"
  }, "Porciones de gasto según el período seleccionado (", selectedMonth !== 'todos' ? formatMonthName(selectedMonth) : selectedYear !== 'todos' ? `Año ${selectedYear}` : 'Histórico Total', ")")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200"
  }, "Total Gastos: ", formatCurrency(categoryDistribution.totalGasto)))), categoryDistribution.totalGasto <= 0 ? /*#__PURE__*/React.createElement("div", {
    className: "p-10 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs"
  }, "No hay registros de gastos en este período para la cuenta seleccionada.") : /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2"
  }, /*#__PURE__*/React.createElement("div", {
    onMouseLeave: () => setHoveredCategorySlice(null),
    className: "relative lg:col-span-5 flex flex-col items-center justify-center select-none"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 300 300",
    className: "w-64 h-64 sm:w-72 sm:h-72 overflow-visible",
    onMouseLeave: () => setHoveredCategorySlice(null)
  }, donutSlices.map((slice, i) => {
    const isHovered = hoveredCategorySlice && hoveredCategorySlice.categoria === slice.categoria;
    const isAnyHovered = !!hoveredCategorySlice;
    return /*#__PURE__*/React.createElement("path", {
      key: i,
      d: slice.pathData,
      fill: slice.color,
      stroke: "#ffffff",
      strokeWidth: isHovered ? "3.5" : "2",
      opacity: isHovered ? 1 : isAnyHovered ? 0.45 : 0.95,
      className: "cursor-pointer transition-all duration-200",
      style: {
        transformOrigin: '150px 150px',
        transform: isHovered ? 'scale(1.04)' : 'scale(1)'
      },
      onMouseEnter: () => setHoveredCategorySlice(slice),
      onClick: () => setHoveredCategorySlice(slice)
    });
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "150",
    cy: "150",
    r: "70",
    fill: "#ffffff"
  }), /*#__PURE__*/React.createElement("text", {
    x: "150",
    y: "142",
    textAnchor: "middle",
    fontSize: "11",
    fill: "#64748b",
    fontWeight: "600"
  }, "Total Gastos"), /*#__PURE__*/React.createElement("text", {
    x: "150",
    y: "164",
    textAnchor: "middle",
    fontSize: "16",
    fill: "#0f172a",
    fontWeight: "800",
    fontFamily: "Inter, system-ui, sans-serif"
  }, formatCurrency(categoryDistribution.totalGasto)), /*#__PURE__*/React.createElement("text", {
    x: "150",
    y: "180",
    textAnchor: "middle",
    fontSize: "10",
    fill: "#94a3b8",
    fontWeight: "600"
  }, categoryDistribution.list.length, " categorías")), hoveredCategorySlice && /*#__PURE__*/React.createElement("div", {
    className: "absolute pointer-events-none bg-slate-900 text-white p-3 rounded-2xl shadow-2xl text-xs z-30 border border-slate-700 animate-fadeIn w-auto max-w-[90%] sm:max-w-xs left-1/2 -translate-x-1/2 top-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-bold text-slate-200 border-b border-slate-800 pb-1 mb-1.5 flex items-center justify-between gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2.5 h-2.5 rounded-full",
    style: {
      backgroundColor: hoveredCategorySlice.color
    }
  }), hoveredCategorySlice.categoria), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono font-bold"
  }, hoveredCategorySlice.porcentaje.toFixed(1), "%")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline justify-between gap-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, "Importe gastado:"), /*#__PURE__*/React.createElement("span", {
    className: "font-extrabold text-white font-sans text-sm"
  }, formatCurrency(hoveredCategorySlice.importe))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline justify-between gap-4 mt-1 text-[11px] text-slate-400"
  }, /*#__PURE__*/React.createElement("span", null, "Frecuencia:"), /*#__PURE__*/React.createElement("span", null, hoveredCategorySlice.count, " compras / recibos")))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-7 space-y-2.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", null, "Desglose por Categoría"), /*#__PURE__*/React.createElement("span", null, "% del Total")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-72 overflow-y-auto pr-1"
  }, categoryDistribution.list.map((item, idx) => {
    const isHovered = hoveredCategorySlice && hoveredCategorySlice.categoria === item.categoria;
    return /*#__PURE__*/React.createElement("div", {
      key: idx,
      onMouseEnter: () => setHoveredCategorySlice(item),
      onMouseLeave: () => setHoveredCategorySlice(null),
      onClick: () => setHoveredCategorySlice(item),
      className: `p-2.5 rounded-xl border transition-all cursor-pointer ${isHovered ? 'bg-blue-50/70 border-blue-300 shadow-sm' : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200/80'}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between text-xs mb-1.5"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 font-bold text-slate-900"
    }, /*#__PURE__*/React.createElement("span", {
      className: "w-3 h-3 rounded-full flex-shrink-0",
      style: {
        backgroundColor: item.color
      }
    }), /*#__PURE__*/React.createElement("span", null, item.categoria), /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] text-slate-400 font-normal"
    }, "(", item.count, " movs)")), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-extrabold text-slate-900 font-sans"
    }, formatCurrency(item.importe)), /*#__PURE__*/React.createElement("span", {
      className: "font-bold text-slate-600 font-sans text-[11px] w-12 text-right"
    }, item.porcentaje.toFixed(1), "%"))), /*#__PURE__*/React.createElement("div", {
      className: "w-full bg-slate-200/70 rounded-full h-2 overflow-hidden"
    }, /*#__PURE__*/React.createElement("div", {
      className: "h-full rounded-full transition-all duration-300",
      style: {
        width: `${Math.min(100, Math.max(2, item.porcentaje))}%`,
        backgroundColor: item.color
      }
    })));
  }))))), /*#__PURE__*/React.createElement("div", {
    onMouseLeave: () => setHoveredPoint(null),
    className: "bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-slate-900 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "table",
    className: "w-4 h-4 text-slate-700"
  }), "Tabla de Cierres & Varianza Mensual (", scopeLabel, ")"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500"
  }, "Histórico numérico mes a mes con balances de entrada, salida y cambio neto"))), /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    onMouseLeave: () => setHoveredPoint(null),
    className: "w-full text-left text-xs border-collapse"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    className: "bg-slate-50/80 text-slate-600 font-bold border-b border-slate-200/80"
  }, /*#__PURE__*/React.createElement("th", {
    className: "p-3.5 pl-5"
  }, "Mes"), /*#__PURE__*/React.createElement("th", {
    className: "p-3.5 text-right"
  }, "Saldo al Cierre"), /*#__PURE__*/React.createElement("th", {
    className: "p-3.5 text-right"
  }, "Varianza Neta (€)"), /*#__PURE__*/React.createElement("th", {
    className: "p-3.5 text-right"
  }, "Varianza (%)"), /*#__PURE__*/React.createElement("th", {
    className: "p-3.5 text-right"
  }, "Ingresos Mes"), /*#__PURE__*/React.createElement("th", {
    className: "p-3.5 text-right"
  }, "Gastos Mes"), /*#__PURE__*/React.createElement("th", {
    className: "p-3.5 text-right pr-5"
  }, "Ahorro / Flujo"))), /*#__PURE__*/React.createElement("tbody", {
    className: "divide-y divide-slate-100 font-medium text-slate-700"
  }, displayedVarianceRows.length === 0 ? /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "7",
    className: "p-8 text-center text-slate-400"
  }, "No hay registros en este período para la cuenta seleccionada.")) : displayedVarianceRows.map(row => {
    const isPositiveDiff = row.diff > 0;
    const isNegativeDiff = row.diff < 0;
    return /*#__PURE__*/React.createElement("tr", {
      key: row.mes,
      onMouseEnter: () => setHoveredPoint(chartGraphData.points.find(p => p.mes === row.mes)),
      onMouseLeave: () => setHoveredPoint(null),
      className: "hover:bg-blue-50/40 transition-colors"
    }, /*#__PURE__*/React.createElement("td", {
      className: "p-3.5 pl-5 font-bold text-slate-900 flex items-center gap-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "w-2 h-2 rounded-full bg-blue-500"
    }), formatMonthName(row.mes)), /*#__PURE__*/React.createElement("td", {
      className: "p-3.5 text-right font-bold text-slate-900 font-sans"
    }, formatCurrency(row.saldo)), /*#__PURE__*/React.createElement("td", {
      className: "p-3.5 text-right font-sans font-bold"
    }, row.prevSaldo === null ? /*#__PURE__*/React.createElement("span", {
      className: "text-slate-400 font-normal"
    }, "Inicial") : /*#__PURE__*/React.createElement("span", {
      className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs ${isPositiveDiff ? 'bg-emerald-50 text-emerald-700 font-bold' : isNegativeDiff ? 'bg-rose-50 text-rose-700 font-bold' : 'text-slate-500'}`
    }, isPositiveDiff ? `+${formatCurrency(row.diff)}` : formatCurrency(row.diff))), /*#__PURE__*/React.createElement("td", {
      className: "p-3.5 text-right font-sans"
    }, row.prevSaldo === null ? /*#__PURE__*/React.createElement("span", {
      className: "text-slate-400"
    }, "-") : /*#__PURE__*/React.createElement("span", {
      className: isPositiveDiff ? 'text-emerald-700 font-bold' : isNegativeDiff ? 'text-rose-700 font-bold' : 'text-slate-500'
    }, isPositiveDiff ? '+' : '', row.diffPct.toFixed(1), "%")), /*#__PURE__*/React.createElement("td", {
      className: "p-3.5 text-right text-emerald-600 font-sans font-semibold"
    }, "+", formatCurrency(row.ingresos)), /*#__PURE__*/React.createElement("td", {
      className: "p-3.5 text-right text-rose-600 font-sans font-semibold"
    }, "-", formatCurrency(row.gastos)), /*#__PURE__*/React.createElement("td", {
      className: `p-3.5 text-right pr-5 font-bold font-sans ${row.balance >= 0 ? 'text-blue-700' : 'text-rose-700'}`
    }, row.balance > 0 ? `+${formatCurrency(row.balance)}` : formatCurrency(row.balance)));
  }))))), isReportModalOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-6 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "presentation",
    className: "w-5 h-5"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-base font-bold"
  }, "Informe Financiero Ejecutivo"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-300"
  }, "Ámbito: ", scopeLabel, " • Año: ", selectedYear))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsReportModalOpen(false),
    className: "text-slate-400 hover:text-white p-1"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    className: "w-6 h-6"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "p-6 space-y-6 overflow-y-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-blue-50/70 border border-blue-200/80 rounded-2xl space-y-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-blue-900 flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles",
    className: "w-4 h-4 text-blue-600"
  }), "Diagnóstico Patrimonial"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-blue-950 leading-relaxed"
  }, "Tu patrimonio líquido disponible operativo asciende a ", /*#__PURE__*/React.createElement("strong", null, formatCurrency(totalPatrimonio)), ", complementado con ", /*#__PURE__*/React.createElement("strong", null, formatCurrency(totalInversion)), " en tu cartera de inversión conjunta (MyInvestor + Trade Republic) y ", /*#__PURE__*/React.createElement("strong", null, formatCurrency(saldos['acc-sab-irpf'] || 0)), " en Sabadell IRPF, sumando un patrimonio total consolidado de ", /*#__PURE__*/React.createElement("strong", null, formatCurrency(totalPatrimonioAbsoluto)), ".")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-xs font-bold text-slate-900"
  }, "Desglose por Cuentas Actualizadas"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2 text-xs"
  }, sortedCuentas.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.id,
    className: "p-3 bg-slate-50 rounded-xl flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-slate-800"
  }, c.nombre), /*#__PURE__*/React.createElement("span", {
    className: "font-extrabold text-slate-900 font-sans"
  }, formatCurrency(saldos[c.id] || 0))))))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsReportModalOpen(false),
    className: "bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm"
  }, "Cerrar")))));
};

// ==========================================
// ⚙️ AJUSTES & GESTIÓN
// ==========================================
const AjustesView = () => {
  const {
    data,
    firebaseUrl,
    setFirebaseUrl,
    syncNow,
    syncStatus,
    lastSyncTime,
    updateConfig,
    toggleCuenta,
    toggleIncluirEnTotal,
    importJsonData,
    resetToOriginalData
  } = useFinance();
  const [inputUrl, setInputUrl] = useState(firebaseUrl);
  const [irpf, setIrpf] = useState((data.config?.repartoSueldo?.irpf || 0.18) * 100);
  const [ahorro, setAhorro] = useState((data.config?.repartoSueldo?.ahorro || 0.50) * 100);
  const [gasto, setGasto] = useState((data.config?.repartoSueldo?.gasto || 0.32) * 100);
  const [invFija, setInvFija] = useState(data.config?.inversionFija || 200.00);
  const [cuentaInvDefecto, setCuentaInvDefecto] = useState(data.config?.cuentaInversionDefecto || 'acc-myinvestor');
  const [statusMsg, setStatusMsg] = useState('');
  const sortedCuentas = useMemo(() => sortCuentas(data.cuentas || []), [data.cuentas]);
  const handleSaveFirebase = e => {
    e.preventDefault();
    setFirebaseUrl(inputUrl);
    syncNow();
    setStatusMsg('URL de Firebase guardada y sincronización iniciada.');
  };
  const handleSavePercentages = e => {
    e.preventDefault();
    const sum = parseFloat(irpf) + parseFloat(ahorro) + parseFloat(gasto);
    if (Math.abs(sum - 100) > 0.01) {
      alert(`Los porcentajes deben sumar exactamente 100%. Suma actual: ${sum}%`);
      return;
    }
    updateConfig({
      repartoSueldo: {
        irpf: parseFloat(irpf) / 100,
        ahorro: parseFloat(ahorro) / 100,
        gasto: parseFloat(gasto) / 100
      },
      inversionFija: parseFloat(invFija) || 200.00,
      cuentaInversionDefecto: cuentaInvDefecto
    });
    setStatusMsg('Configuración de reparto de sueldo e inversión guardada.');
  };
  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finanzas_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleImportJsonFile = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      try {
        const json = JSON.parse(event.target.result);
        if (importJsonData(json)) {
          alert('¡Datos importados con éxito!');
        } else {
          alert('El archivo JSON no tiene la estructura válida requerida.');
        }
      } catch (err) {
        alert('Error al leer el archivo JSON.');
      }
    };
    reader.readAsText(file);
  };
  const handleResetHistory = async () => {
    if (confirm('¿Restablecer todos los datos al archivo data.json inicial con todo el histórico 2026? Se sobrescribirá el estado local y en Firebase.')) {
      const ok = await resetToOriginalData();
      if (ok) alert('Datos restablecidos al histórico 2026.');
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 max-w-3xl mx-auto pb-24 md:pb-8"
  }, statusMsg && /*#__PURE__*/React.createElement("div", {
    className: "bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold p-3.5 rounded-xl flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", null, statusMsg), /*#__PURE__*/React.createElement("button", {
    onClick: () => setStatusMsg(''),
    className: "text-emerald-600"
  }, "×")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "cloud",
    className: "w-5 h-5"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-slate-900"
  }, "Google Firebase Realtime Database"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500"
  }, "Sincronización reactiva 24/7 con resolución de conflictos por timestamp"))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSaveFirebase,
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-slate-700 block mb-1"
  }, "URL REST de la Base de Datos Firebase (.json)"), /*#__PURE__*/React.createElement("input", {
    type: "url",
    value: inputUrl,
    onChange: e => setInputUrl(e.target.value),
    placeholder: "https://tu-proyecto.firebasedatabase.app/finanzas.json",
    className: "w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between pt-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] text-slate-400"
  }, "Estado: ", /*#__PURE__*/React.createElement("strong", {
    className: "text-slate-700 capitalize"
  }, syncStatus), lastSyncTime && /*#__PURE__*/React.createElement("span", null, " • Última sincronización: ", lastSyncTime.toLocaleTimeString())), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-sm"
  }, "Guardar y Conectar")))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-slate-900"
  }, "Gestión de Cuentas & Cómputo de Total"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 mt-0.5"
  }, "Configura la visibilidad de cada cuenta y si suma al Patrimonio Líquido Disponible.")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, sortedCuentas.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.id,
    className: "flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100 gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-3 h-3 rounded-full",
    style: {
      backgroundColor: c.color
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-slate-900 block"
  }, c.nombre), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400 capitalize"
  }, c.tipo === 'inversion' ? 'Inversión' : c.tipo))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 self-end sm:self-auto"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => toggleIncluirEnTotal(c.id),
    title: "Indica si esta cuenta suma al total de patrimonio disponible",
    className: `text-xs font-semibold px-3 py-1 rounded-lg border transition-colors ${c.incluirEnTotal !== false ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-200 text-slate-500 border-slate-300'}`
  }, c.incluirEnTotal !== false ? '✓ Suma al Total' : '✕ Excluida del Total'), /*#__PURE__*/React.createElement("button", {
    onClick: () => toggleCuenta(c.id),
    className: `text-xs font-semibold px-3 py-1 rounded-lg border transition-colors ${c.activa ? 'bg-white text-slate-900 border-slate-200' : 'bg-slate-200 text-slate-500 border-transparent'}`
  }, c.activa ? 'Visible' : 'Oculta')))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-slate-900 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "zap",
    className: "w-4 h-4 text-amber-500"
  }), "Porcentajes de Reparto & Inversión"), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSavePercentages,
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-3 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-slate-700 block mb-1"
  }, "IRPF Sabadell (%)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "1",
    value: irpf,
    onChange: e => setIrpf(e.target.value),
    className: "w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-slate-700 block mb-1"
  }, "Ahorro Sabadell (%)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "1",
    value: ahorro,
    onChange: e => setAhorro(e.target.value),
    className: "w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-slate-700 block mb-1"
  }, "Gasto Corriente (%)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "1",
    value: gasto,
    onChange: e => setGasto(e.target.value),
    className: "w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-slate-100"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-slate-700 block mb-1"
  }, "Cuenta de Inversión Habitual"), /*#__PURE__*/React.createElement("select", {
    value: cuentaInvDefecto,
    onChange: e => setCuentaInvDefecto(e.target.value),
    className: "w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
  }, sortedCuentas.filter(c => c && c.activa && c.tipo === 'inversion').map(c => /*#__PURE__*/React.createElement("option", {
    key: c.id,
    value: c.id
  }, c.nombre)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-slate-700 block mb-1"
  }, "Inversión Mensual (MyInvestor €)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "10",
    value: invFija,
    onChange: e => setInvFija(e.target.value),
    className: "w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-sm"
  }, "Guardar Configuración")))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-slate-900"
  }, "Copias de Seguridad & Datos"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleExportJson,
    className: "flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    className: "w-4 h-4"
  }), "Exportar JSON"), /*#__PURE__*/React.createElement("label", {
    className: "flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "upload",
    className: "w-4 h-4"
  }), "Importar JSON", /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: ".json",
    onChange: handleImportJsonFile,
    className: "hidden"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: handleResetHistory,
    className: "text-rose-600 hover:text-rose-700 font-bold text-xs px-4 py-2.5 rounded-xl border border-rose-200 ml-auto transition-colors"
  }, "Restablecer a Histórico 2026"))));
};

// ==========================================
// ➕ MODAL DE CREACIÓN / EDICIÓN DE MOVIMIENTO (BBVA PREDETERMINADA)
// ==========================================
const MovementModal = ({
  isOpen,
  onClose,
  editingMovement = null,
  defaultType = 'gasto'
}) => {
  const {
    data,
    addMovimiento,
    updateMovimiento
  } = useFinance();
  const [tipo, setTipo] = useState(defaultType);
  const [fecha, setFecha] = useState(() => new Date().toISOString().split('T')[0]);
  const [importe, setImporte] = useState('');
  const [cuentaOrigen, setCuentaOrigen] = useState('acc-bbva');
  const [cuentaDestino, setCuentaDestino] = useState('acc-bbva');
  const [categoria, setCategoria] = useState('Comida');
  const [comentario, setComentario] = useState('');
  const sortedCuentas = useMemo(() => sortCuentas(data.cuentas || []), [data.cuentas]);
  useEffect(() => {
    if (editingMovement) {
      const mTipo = editingMovement.tipo || 'gasto';
      setTipo(mTipo);
      setFecha(editingMovement.fecha || new Date().toISOString().split('T')[0]);
      setImporte(editingMovement.importe?.toString() || '');
      setCuentaOrigen(editingMovement.cuentaOrigen || 'acc-bbva');
      setCuentaDestino(editingMovement.cuentaDestino || 'acc-myinvestor');
      setCategoria(mTipo === 'transferencia' ? 'Transferencia' : editingMovement.categoria || 'Comida');
      setComentario(editingMovement.comentario || '');
    } else {
      setTipo(defaultType);
      setFecha(new Date().toISOString().split('T')[0]);
      setImporte('');
      setCuentaOrigen('acc-bbva');
      setCuentaDestino(defaultType === 'transferencia' ? 'acc-myinvestor' : 'acc-bbva');
      setCategoria(defaultType === 'transferencia' ? 'Transferencia' : defaultType === 'ingreso' ? 'Sueldo/Nómina' : 'Comida');
      setComentario('');
    }
  }, [editingMovement, defaultType, isOpen]);
  if (!isOpen) return null;
  const handleSubmit = e => {
    e.preventDefault();
    const num = parseFloat(importe);
    if (isNaN(num) || num <= 0) {
      alert('Introduce un importe válido mayor que cero.');
      return;
    }
    const payload = {
      fecha,
      tipo,
      cuentaOrigen: tipo !== 'ingreso' ? cuentaOrigen : '',
      cuentaDestino: tipo !== 'gasto' ? cuentaDestino : '',
      importe: num,
      categoria: tipo === 'transferencia' ? 'Transferencia' : categoria || 'General',
      comentario
    };
    if (editingMovement) {
      updateMovimiento(editingMovement.id, payload);
    } else {
      addMovimiento(payload);
    }
    onClose();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-5 border-b border-slate-100 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-base font-bold text-slate-900"
  }, editingMovement ? 'Editar Movimiento' : 'Nuevo Movimiento'), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "text-slate-400 hover:text-slate-700 p-1"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    className: "w-5 h-5"
  }))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "p-5 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl"
  }, [{
    id: 'gasto',
    label: 'Gasto',
    color: 'text-rose-600'
  }, {
    id: 'ingreso',
    label: 'Ingreso',
    color: 'text-emerald-600'
  }, {
    id: 'transferencia',
    label: 'Transferir',
    color: 'text-sky-600'
  }].map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    type: "button",
    onClick: () => {
      setTipo(t.id);
      if (t.id === 'transferencia') {
        setCategoria('Transferencia');
        if (cuentaDestino === 'acc-bbva') setCuentaDestino('acc-myinvestor');
      } else if (t.id === 'ingreso' && (categoria === 'Transferencia' || categoria === 'Comida')) {
        setCategoria('Sueldo/Nómina');
      } else if (t.id === 'gasto' && (categoria === 'Transferencia' || categoria === 'Sueldo/Nómina')) {
        setCategoria('Comida');
      }
    },
    className: `py-2 rounded-xl text-xs font-bold transition-all ${tipo === t.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`
  }, t.label))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-bold text-slate-700 block mb-1"
  }, "Importe (€)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "0.01",
    inputMode: "decimal",
    required: true,
    autoFocus: true,
    placeholder: "0.00",
    value: importe,
    onChange: e => setImporte(e.target.value),
    className: "w-full text-2xl font-black text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-900 font-sans"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-bold text-slate-700 block mb-1"
  }, "Fecha"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: fecha,
    onChange: e => setFecha(e.target.value),
    className: "w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none"
  })), tipo === 'gasto' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-bold text-slate-700 block mb-1"
  }, "Cuenta"), /*#__PURE__*/React.createElement("select", {
    value: cuentaOrigen,
    onChange: e => setCuentaOrigen(e.target.value),
    className: "w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900"
  }, sortedCuentas.filter(c => c && c.activa).map(c => /*#__PURE__*/React.createElement("option", {
    key: c.id,
    value: c.id
  }, c.nombre)))), tipo === 'ingreso' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-bold text-slate-700 block mb-1"
  }, "Cuenta Destino"), /*#__PURE__*/React.createElement("select", {
    value: cuentaDestino,
    onChange: e => setCuentaDestino(e.target.value),
    className: "w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900"
  }, sortedCuentas.filter(c => c && c.activa).map(c => /*#__PURE__*/React.createElement("option", {
    key: c.id,
    value: c.id
  }, c.nombre)))), tipo === 'transferencia' && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-bold text-slate-700 block mb-1"
  }, "De (Origen)"), /*#__PURE__*/React.createElement("select", {
    value: cuentaOrigen,
    onChange: e => setCuentaOrigen(e.target.value),
    className: "w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-900"
  }, sortedCuentas.filter(c => c && c.activa).map(c => /*#__PURE__*/React.createElement("option", {
    key: c.id,
    value: c.id
  }, c.nombre)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-bold text-slate-700 block mb-1"
  }, "A (Destino)"), /*#__PURE__*/React.createElement("select", {
    value: cuentaDestino,
    onChange: e => setCuentaDestino(e.target.value),
    className: "w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-900"
  }, sortedCuentas.filter(c => c && c.activa).map(c => /*#__PURE__*/React.createElement("option", {
    key: c.id,
    value: c.id
  }, c.nombre))))), tipo !== 'transferencia' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-bold text-slate-700 block mb-1"
  }, "Categoría"), /*#__PURE__*/React.createElement("select", {
    value: categoria,
    onChange: e => setCategoria(e.target.value),
    className: "w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900"
  }, (data.categorias || []).filter(c => c && (c.tipo === tipo || c.tipo === 'mixto')).map(c => /*#__PURE__*/React.createElement("option", {
    key: c.id,
    value: c.nombre
  }, c.nombre)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-bold text-slate-700 block mb-1"
  }, "Comentario / Nota (Opcional)"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "ej. Aportación inversión, Mercadona...",
    value: comentario,
    onChange: e => setComentario(e.target.value),
    className: "w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
  })), /*#__PURE__*/React.createElement("div", {
    className: "pt-2 flex items-center justify-end gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    className: "px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
  }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md active:scale-98 transition-all"
  }, editingMovement ? 'Guardar Cambios' : 'Añadir Movimiento')))));
};

// ==========================================
// 🚀 APP ROOT
// ==========================================
const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovement, setEditingMovement] = useState(null);
  const [defaultModalType, setDefaultModalType] = useState('gasto');
  const [accountFilter, setAccountFilter] = useState('todos');
  const handleOpenNewModal = (type = 'gasto') => {
    setEditingMovement(null);
    setDefaultModalType(type);
    setIsModalOpen(true);
  };
  const handleEditModal = mov => {
    setEditingMovement(mov);
    setIsModalOpen(true);
  };
  const handleSelectAccountFilter = accId => {
    setAccountFilter(accId);
    setActiveTab('movimientos');
  };
  return /*#__PURE__*/React.createElement(ErrorBoundary, null, /*#__PURE__*/React.createElement(FinanceProvider, null, /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white"
  }, /*#__PURE__*/React.createElement(Navbar, {
    activeTab: activeTab,
    setActiveTab: setActiveTab,
    onOpenNewModal: () => handleOpenNewModal('gasto')
  }), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8"
  }, activeTab === 'dashboard' && /*#__PURE__*/React.createElement(DashboardView, {
    setActiveTab: setActiveTab,
    onOpenNewModal: handleOpenNewModal,
    onSelectAccountFilter: handleSelectAccountFilter
  }), activeTab === 'sueldo' && /*#__PURE__*/React.createElement(SueldoEngineView, {
    setActiveTab: setActiveTab
  }), activeTab === 'movimientos' && /*#__PURE__*/React.createElement(MovimientosView, {
    initialAccountFilter: accountFilter,
    onOpenNewModal: handleOpenNewModal,
    onEditModal: handleEditModal
  }), activeTab === 'analitica' && /*#__PURE__*/React.createElement(AnaliticaView, null), activeTab === 'ajustes' && /*#__PURE__*/React.createElement(AjustesView, null)), /*#__PURE__*/React.createElement(BottomNav, {
    activeTab: activeTab,
    setActiveTab: setActiveTab,
    onOpenNewModal: () => handleOpenNewModal('gasto')
  }), /*#__PURE__*/React.createElement(MovementModal, {
    isOpen: isModalOpen,
    onClose: () => setIsModalOpen(false),
    editingMovement: editingMovement,
    defaultType: defaultModalType
  }))));
};
const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(/*#__PURE__*/React.createElement(App, null));
}