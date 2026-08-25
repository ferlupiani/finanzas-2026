const { useState, useEffect, useMemo, useCallback, useRef, createContext, useContext, Component } = React;

// ==========================================
// 🛡️ ERROR BOUNDARY
// ==========================================
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
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
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-900 font-sans">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200/80 max-w-md w-full text-center space-y-4">
            <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto">
              <Icon name="x" className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Se ha producido un error</h2>
            <p className="text-xs text-slate-500">
              {this.state.error?.message || 'Error al procesar los datos de la aplicación.'}
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => window.location.reload()}
                className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-sm active:scale-95 transition-all"
              >
                Recargar Aplicación
              </button>
              <button
                onClick={this.handleReset}
                className="w-full py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-bold transition-all"
              >
                Restablecer Datos Locales
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ==========================================
// 🎨 ICONOS SVG MINIMALISTAS
// ==========================================
const Icon = ({ name, className = "w-5 h-5", ...props }) => {
  const icons = {
    wallet: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />,
    creditCard: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6zm4 8h2m4 0h4" />,
    trendingUp: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />,
    arrowUpRight: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7V17" />,
    arrowDownLeft: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 7L7 17M7 17H17M7 17V7" />,
    transfer: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />,
    plus: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />,
    trash: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />,
    edit: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
    search: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    filter: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />,
    calendar: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />,
    refresh: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />,
    cloud: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />,
    settings: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />,
    chart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
    home: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
    zap: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />,
    download: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />,
    upload: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />,
    x: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />,
    pieChart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />,
    dollar: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    presentation: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />,
    table: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    sparkles: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  };

  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      {icons[name] || icons.wallet}
    </svg>
  );
};

// ==========================================
// 💶 FORMATO Y UTILIDADES
// ==========================================
const formatCurrency = (val) => {
  const num = typeof val === 'number' ? val : parseFloat(val) || 0;
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
    return dateStr;
  } catch (e) {
    return dateStr;
  }
};

const formatMonthName = (monthKey) => {
  if (!monthKey || monthKey === 'todos') return 'Todos los meses';
  const parts = monthKey.replace('.', '-').split('-');
  if (parts.length === 2) {
    const year = parts[0];
    const month = parseInt(parts[1], 10);
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    if (month >= 1 && month <= 12) {
      return `${months[month - 1]} ${year}`;
    }
  }
  return monthKey;
};

const getAccountBadge = (accId, cuentas = []) => {
  const acc = (cuentas || []).find(c => c && c.id === accId);
  if (!acc) return { nombre: 'Desconocida', color: '#64748b', bgClass: 'bg-slate-100 text-slate-700 border-slate-200' };

  switch (acc.id) {
    case 'acc-santander': return { ...acc, bgClass: 'bg-red-50 text-red-700 border-red-200' };
    case 'acc-bbva': return { ...acc, bgClass: 'bg-blue-50 text-blue-900 border-blue-200' };
    case 'acc-sab-ahorro': return { ...acc, bgClass: 'bg-sky-50 text-sky-700 border-sky-200' };
    case 'acc-sab-irpf': return { ...acc, bgClass: 'bg-cyan-50 text-cyan-800 border-cyan-200' };
    case 'acc-trade': return { ...acc, bgClass: 'bg-zinc-100 text-zinc-900 border-zinc-300' };
    case 'acc-efectivo': return { ...acc, bgClass: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
    default: return { ...acc, bgClass: 'bg-slate-100 text-slate-800 border-slate-200' };
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
  version: '1.2',
  clientUpdated: new Date().toISOString(),
  config: {
    repartoSueldo: { irpf: 0.18, ahorro: 0.50, gasto: 0.32 },
    inversionFija: 60.00,
    gastosFijosDefecto: [
      { nombre: 'Alquiler + Gastos Casa', categoria: 'Alquiler', cuenta: 'acc-santander', importe: 325.00 },
      { nombre: 'Spotify', categoria: 'Suscripciones', cuenta: 'acc-santander', importe: 6.49 },
      { nombre: 'Basic Fit', categoria: 'Suscripciones', cuenta: 'acc-santander', importe: 24.99 },
      { nombre: 'AppleCare+', categoria: 'Suscripciones', cuenta: 'acc-santander', importe: 5.49 }
    ]
  },
  cuentas: [
    { id: 'acc-santander', nombre: 'Santander', tipo: 'banco', activa: true, incluirEnTotal: true, color: '#DC2626', saldoInicial: 175.77 },
    { id: 'acc-bbva', nombre: 'BBVA', tipo: 'banco', activa: true, incluirEnTotal: true, color: '#1E3A8A', saldoInicial: 234.67 },
    { id: 'acc-sab-ahorro', nombre: 'Sabadell Ahorro', tipo: 'banco', activa: true, incluirEnTotal: true, color: '#0284C7', saldoInicial: 1239.81 },
    { id: 'acc-sab-irpf', nombre: 'Sabadell IRPF', tipo: 'banco', activa: true, incluirEnTotal: false, color: '#0EA5E9', saldoInicial: 202.16 },
    { id: 'acc-trade', nombre: 'Trade Republic', tipo: 'inversion', activa: true, incluirEnTotal: true, color: '#18181B', saldoInicial: -313.25 },
    { id: 'acc-efectivo', nombre: 'Efectivo', tipo: 'metalico', activa: true, incluirEnTotal: true, color: '#16A34A', saldoInicial: 810.00 }
  ],
  categorias: [
    { id: 'cat-alquiler', nombre: 'Alquiler', tipo: 'gasto', color: '#ef4444' },
    { id: 'cat-comida', nombre: 'Comida', tipo: 'gasto', color: '#f97316' },
    { id: 'cat-comer-fuera', nombre: 'Comer Fuera', tipo: 'gasto', color: '#eab308' },
    { id: 'cat-cervezas', nombre: 'Cervezas', tipo: 'gasto', color: '#84cc16' },
    { id: 'cat-carnet', nombre: 'Carnet de Conducir', tipo: 'gasto', color: '#06b6d4' },
    { id: 'cat-suscripciones', nombre: 'Suscripciones', tipo: 'gasto', color: '#6366f1' },
    { id: 'cat-planes', nombre: 'Planes', tipo: 'gasto', color: '#a855f7' },
    { id: 'cat-regalos', nombre: 'Regalos', tipo: 'gasto', color: '#ec4899' },
    { id: 'cat-ropa', nombre: 'Ropa', tipo: 'gasto', color: '#f43f5e' },
    { id: 'cat-inversiones', nombre: 'Inversiones', tipo: 'gasto', color: '#10b981' },
    { id: 'cat-universidad', nombre: 'Universidad', tipo: 'gasto', color: '#3b82f6' },
    { id: 'cat-utilidad', nombre: 'Utilidad', tipo: 'gasto', color: '#64748b' },
    { id: 'cat-viajes', nombre: 'Viajes', tipo: 'gasto', color: '#14b8a6' },
    { id: 'cat-fisio', nombre: 'Fisio', tipo: 'gasto', color: '#d946ef' },
    { id: 'cat-caprichos', nombre: 'Caprichos', tipo: 'gasto', color: '#f59e0b' },
    { id: 'cat-compartida', nombre: 'Cuenta compartida', tipo: 'gasto', color: '#8b5cf6' },
    { id: 'cat-sueldo', nombre: 'Sueldo/Nómina', tipo: 'ingreso', color: '#10b981' },
    { id: 'cat-clases', nombre: 'Clases Particulares', tipo: 'ingreso', color: '#059669' },
    { id: 'cat-bizum-madre', nombre: 'Bizum Madre', tipo: 'ingreso', color: '#db2777' },
    { id: 'cat-ventas', nombre: 'Ventas', tipo: 'ingreso', color: '#0284c7' },
    { id: 'cat-otros-gastos', nombre: 'Otros Gastos', tipo: 'gasto', color: '#64748b' },
    { id: 'cat-otros-ingresos', nombre: 'Otros Ingresos', tipo: 'ingreso', color: '#10b981' }
  ],
  fuentesIngreso: [
    { id: 'src-claret', nombre: 'Claret', importeDefecto: 1508.53 },
    { id: 'src-maristas', nombre: 'Maristas', importeDefecto: 603.39 },
    { id: 'src-academia', nombre: 'Academia', importeDefecto: 346.44 },
    { id: 'src-particulares', nombre: 'Clases Particulares', importeDefecto: 0.00 }
  ],
  movimientos: []
};

const normalizeFinanceData = (input, fallback = defaultFallbackData) => {
  if (!input || typeof input !== 'object') return fallback;

  const toCleanArray = (val, def = []) => {
    if (Array.isArray(val)) return val.filter(Boolean);
    if (val && typeof val === 'object') return Object.values(val).filter(Boolean);
    return def;
  };

  const cuentas = toCleanArray(input.cuentas, fallback.cuentas).map(c => ({
    ...c,
    incluirEnTotal: c.id === 'acc-sab-irpf' ? (c.incluirEnTotal === true) : (c.incluirEnTotal !== false)
  }));

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
    version: input.version || '1.2',
    clientUpdated: input.clientUpdated || new Date().toISOString(),
    config: {
      repartoSueldo: {
        irpf: input.config?.repartoSueldo?.irpf !== undefined ? input.config.repartoSueldo.irpf : fallback.config.repartoSueldo.irpf,
        ahorro: input.config?.repartoSueldo?.ahorro !== undefined ? input.config.repartoSueldo.ahorro : fallback.config.repartoSueldo.ahorro,
        gasto: input.config?.repartoSueldo?.gasto !== undefined ? input.config.repartoSueldo.gasto : fallback.config.repartoSueldo.gasto
      },
      inversionFija: input.config?.inversionFija !== undefined ? input.config.inversionFija : fallback.config.inversionFija,
      gastosFijosDefecto: toCleanArray(input.config?.gastosFijosDefecto, fallback.config.gastosFijosDefecto)
    },
    cuentas: cuentas.length > 0 ? cuentas : fallback.cuentas,
    categorias: categorias.length > 0 ? categorias : fallback.categorias,
    fuentesIngreso: fuentesIngreso.length > 0 ? fuentesIngreso : fallback.fuentesIngreso,
    movimientos
  };
};

const FinanceProvider = ({ children }) => {
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
            if (!current.movimientos || current.movimientos.length === 0 || (cleanJson.clientUpdated > current.clientUpdated)) {
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

  const setFirebaseUrl = (url) => {
    setFirebaseUrlState(url);
    if (url) localStorage.setItem(FIREBASE_URL_KEY, url);
    else localStorage.removeItem(FIREBASE_URL_KEY);
  };

  const updateAndSyncData = useCallback(async (updater) => {
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
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(normalized)
        })
          .then(res => {
            if (res.ok) {
              setSyncStatus('synced');
              setLastSyncTime(new Date());
            } else {
              setSyncStatus('error');
            }
          })
          .catch(() => setSyncStatus('error'));
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
              headers: { 'Content-Type': 'application/json' },
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
              headers: { 'Content-Type': 'application/json' },
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

  const addMovimiento = (mov) => {
    const newMov = {
      id: mov.id || `mov-${Date.now()}`,
      fecha: mov.fecha || new Date().toISOString().split('T')[0],
      tipo: mov.tipo,
      cuentaOrigen: mov.cuentaOrigen || '',
      cuentaDestino: mov.cuentaDestino || '',
      importe: Math.abs(parseFloat(mov.importe) || 0),
      categoria: mov.categoria || '',
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
      movimientos: (prev.movimientos || []).map(m => m.id === id ? { ...m, ...updatedFields } : m)
    }));
  };

  const deleteMovimiento = (id) => {
    updateAndSyncData(prev => ({
      ...prev,
      movimientos: (prev.movimientos || []).filter(m => m.id !== id)
    }));
  };

  // Modificación 1: Gestión de Fuentes de Ingreso / Nóminas (Añadir, Editar, Eliminar)
  const addFuenteIngreso = ({ nombre, importeDefecto }) => {
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
      fuentesIngreso: (prev.fuentesIngreso || []).map(f => f.id === id ? { ...f, ...fields } : f)
    }));
  };

  const deleteFuenteIngreso = (id) => {
    updateAndSyncData(prev => ({
      ...prev,
      fuentesIngreso: (prev.fuentesIngreso || []).filter(f => f.id !== id)
    }));
  };

  const distribuirSueldo = ({ fecha, incomes, irpfPct, ahorroPct, gastoPct, inversionFija, cuentaIngreso = 'acc-santander' }) => {
    const totalIngreso = Object.values(incomes).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
    if (totalIngreso <= 0) return false;

    const irpfAmount = Math.round(totalIngreso * (irpfPct || 0.18) * 100) / 100;
    const ahorroAmount = Math.round(totalIngreso * (ahorroPct || 0.50) * 100) / 100;
    const invAmount = Math.round((inversionFija !== undefined ? inversionFija : 60.00) * 100) / 100;

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
      newMovs.push({
        id: `mov-${timestamp + 300}`,
        fecha: fecha,
        tipo: 'transferencia',
        cuentaOrigen: cuentaIngreso,
        cuentaDestino: 'acc-trade',
        importe: invAmount,
        categoria: 'Inversiones',
        comentario: 'Inversión mensual fija'
      });
    }

    updateAndSyncData(prev => ({
      ...prev,
      movimientos: [...newMovs, ...(prev.movimientos || [])]
    }));

    return { totalIngreso, irpfAmount, ahorroAmount, invAmount };
  };

  const updateConfig = (newConfig) => {
    updateAndSyncData(prev => ({
      ...prev,
      config: { ...(prev.config || {}), ...newConfig }
    }));
  };

  const toggleCuenta = (id) => {
    updateAndSyncData(prev => ({
      ...prev,
      cuentas: (prev.cuentas || []).map(c => c.id === id ? { ...c, activa: !c.activa } : c)
    }));
  };

  const toggleIncluirEnTotal = (id) => {
    updateAndSyncData(prev => ({
      ...prev,
      cuentas: (prev.cuentas || []).map(c => c.id === id ? { ...c, incluirEnTotal: !c.incluirEnTotal } : c)
    }));
  };

  const importJsonData = (newJson) => {
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

  // Cálculo exacto de saldos
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
    return (data.cuentas || [])
      .filter(c => c && c.activa && c.incluirEnTotal !== false)
      .reduce((sum, c) => sum + (saldos[c.id] || 0), 0);
  }, [data.cuentas, saldos]);

  const totalPatrimonioAbsoluto = useMemo(() => {
    return (data.cuentas || [])
      .filter(c => c && c.activa)
      .reduce((sum, c) => sum + (saldos[c.id] || 0), 0);
  }, [data.cuentas, saldos]);

  const saldoIrpfSeparado = useMemo(() => {
    return saldos['acc-sab-irpf'] || 0;
  }, [saldos]);

  return (
    <FinanceContext.Provider value={{
      data,
      saldos,
      totalPatrimonio: totalPatrimonioDisponible,
      totalPatrimonioAbsoluto,
      saldoIrpfSeparado,
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
      distribuirSueldo,
      updateConfig,
      toggleCuenta,
      toggleIncluirEnTotal,
      importJsonData,
      resetToOriginalData
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

const useFinance = () => useContext(FinanceContext);

// ==========================================
// 🧭 NAVBAR & STATUS
// ==========================================
const Navbar = ({ activeTab, setActiveTab, onOpenNewModal }) => {
  const { syncStatus, syncNow } = useFinance();

  const syncInfo = {
    synced: { text: 'Conectado', color: 'bg-emerald-500', pill: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    syncing: { text: 'Sincronizando...', color: 'bg-blue-500 animate-pulse', pill: 'bg-blue-50 text-blue-700 border-blue-200' },
    offline: { text: 'Modo Local', color: 'bg-amber-500', pill: 'bg-amber-50 text-amber-700 border-amber-200' },
    error: { text: 'Sin Conexión', color: 'bg-rose-500', pill: 'bg-rose-50 text-rose-700 border-rose-200' }
  }[syncStatus] || { text: 'Offline', color: 'bg-slate-400', pill: 'bg-slate-50 text-slate-600 border-slate-200' };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-700 flex items-center justify-center text-white shadow-sm shadow-slate-200">
            <Icon name="wallet" className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-slate-900 leading-tight">Finanzas 2026</h1>
            <p className="text-xs text-slate-500 font-medium">Patrimonio & Reparto</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: 'home' },
            { id: 'sueldo', label: 'Motor Sueldo & Fijos', icon: 'zap' },
            { id: 'movimientos', label: 'Movimientos', icon: 'creditCard' },
            { id: 'analitica', label: 'Analítica & Reportes', icon: 'chart' },
            { id: 'ajustes', label: 'Ajustes', icon: 'settings' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-sm shadow-slate-200/50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Icon name={tab.icon} className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={syncNow}
            title="Forzar sincronización con Firebase"
            className={`flex items-center gap-2 px-2.5 py-1 rounded-full border text-xs font-medium transition-colors ${syncInfo.pill}`}
          >
            <span className={`w-2 h-2 rounded-full ${syncInfo.color}`}></span>
            <span className="hidden sm:inline">{syncInfo.text}</span>
            <Icon name="refresh" className="w-3.5 h-3.5 opacity-70" />
          </button>

          <button
            onClick={onOpenNewModal}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-sm transition-all"
          >
            <Icon name="plus" className="w-4 h-4" />
            <span className="hidden sm:inline">Nuevo</span>
          </button>
        </div>
      </div>
    </header>
  );
};

// ==========================================
// 📱 BOTTOM NAV
// ==========================================
const BottomNav = ({ activeTab, setActiveTab, onOpenNewModal }) => {
  const tabs = [
    { id: 'dashboard', label: 'Inicio', icon: 'home' },
    { id: 'sueldo', label: 'Motor', icon: 'zap' },
    { id: 'new', label: '', icon: 'plus', isAction: true },
    { id: 'movimientos', label: 'Diario', icon: 'creditCard' },
    { id: 'analitica', label: 'Análisis', icon: 'chart' }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-2 py-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-lg">
      <div className="flex items-center justify-around">
        {tabs.map(t => {
          if (t.isAction) {
            return (
              <button
                key="btn-action"
                onClick={onOpenNewModal}
                className="w-12 h-12 -mt-5 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-900/30 active:scale-90 transition-transform"
              >
                <Icon name="plus" className="w-6 h-6" />
              </button>
            );
          }

          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-colors ${
                isActive ? 'text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Icon name={t.icon} className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span className="text-[10px] mt-0.5">{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ==========================================
// 📊 DASHBOARD PRINCIPAL
// ==========================================
const DashboardView = ({ setActiveTab, onOpenNewModal, onSelectAccountFilter }) => {
  const { data, saldos, totalPatrimonio, totalPatrimonioAbsoluto, saldoIrpfSeparado } = useFinance();

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
      tasaAhorro: ingresos > 0 ? Math.max(0, Math.round(((ingresos - gastos) / ingresos) * 100)) : 0
    };
  }, [data.movimientos]);

  const recentMovements = useMemo(() => {
    return (data.movimientos || []).slice(0, 8);
  }, [data.movimientos]);

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      {/* Hero Card: Patrimonio Neto Disponible (Calibrado con Sabadell IRPF Separado) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white p-6 sm:p-8 shadow-xl shadow-slate-900/10">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-16 w-48 h-48 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <span>Patrimonio Neto Disponible</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-slate-200">
                {(data.cuentas || []).filter(c => c && c.activa && c.incluirEnTotal !== false).length} Cuentas Computables
              </span>
            </div>

            <div className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 text-white font-sans">
              {formatCurrency(totalPatrimonio)}
            </div>

            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs bg-cyan-950/60 border border-cyan-500/30 text-cyan-200">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                Sabadell IRPF (Separado): <strong>{formatCurrency(saldoIrpfSeparado)}</strong>
              </span>
              <span className="text-xs text-slate-400">
                • Total con IRPF: <strong className="text-slate-200 font-sans">{formatCurrency(totalPatrimonioAbsoluto)}</strong>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-sm">
            <div className="p-2">
              <span className="text-[11px] text-slate-400 block font-medium">Ingresos Mes</span>
              <span className="text-sm sm:text-base font-bold text-emerald-400 font-sans">
                +{formatCurrency(currentMonthStats.ingresos)}
              </span>
            </div>
            <div className="p-2">
              <span className="text-[11px] text-slate-400 block font-medium">Gastos Mes</span>
              <span className="text-sm sm:text-base font-bold text-rose-400 font-sans">
                -{formatCurrency(currentMonthStats.gastos)}
              </span>
            </div>
            <div className="p-2 col-span-2 sm:col-span-1 border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0 sm:pl-3">
              <span className="text-[11px] text-slate-400 block font-medium">Ahorro Estimado</span>
              <span className="text-sm sm:text-base font-bold text-sky-300">
                {currentMonthStats.tasaAhorro}%
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center gap-2">
          <button
            onClick={() => onOpenNewModal('gasto')}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 active:scale-95 text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-all backdrop-blur-sm"
          >
            <Icon name="arrowUpRight" className="w-3.5 h-3.5 text-rose-400" />
            + Añadir Gasto
          </button>
          <button
            onClick={() => onOpenNewModal('ingreso')}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 active:scale-95 text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-all backdrop-blur-sm"
          >
            <Icon name="arrowDownLeft" className="w-3.5 h-3.5 text-emerald-400" />
            + Registrar Ingreso
          </button>
          <button
            onClick={() => onOpenNewModal('transferencia')}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 active:scale-95 text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-all backdrop-blur-sm"
          >
            <Icon name="transfer" className="w-3.5 h-3.5 text-sky-400" />
            ⇄ Transferir
          </button>
          <button
            onClick={() => setActiveTab('sueldo')}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-md shadow-amber-500/20 ml-auto"
          >
            <Icon name="zap" className="w-4 h-4 text-slate-950" />
            Motor de Sueldo & Gastos Fijos
          </button>
        </div>
      </div>

      {/* Grid de Cuentas Bancarias */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-base font-bold text-slate-900">Tus Cuentas & Saldos</h2>
          <span className="text-xs text-slate-500">Toca una cuenta para filtrar diario</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(data.cuentas || []).filter(c => c && c.activa).map(c => {
            const saldo = saldos[c.id] || 0;
            const badge = getAccountBadge(c.id, data.cuentas);
            const isIrpfExcluded = c.incluirEnTotal === false;

            return (
              <div
                key={c.id}
                onClick={() => onSelectAccountFilter(c.id)}
                className="group relative bg-white hover:bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full ring-4 ring-slate-100"
                      style={{ backgroundColor: c.color }}
                    ></span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {c.nombre}
                      </h3>
                      <span className="text-[11px] font-medium text-slate-400 capitalize">
                        {c.tipo}
                      </span>
                    </div>
                  </div>

                  {isIrpfExcluded ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200">
                      No suma al total
                    </span>
                  ) : (
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${badge.bgClass}`}>
                      {totalPatrimonio > 0 ? Math.max(0, Math.round((saldo / totalPatrimonio) * 100)) : 0}%
                    </span>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
                  <span className="text-xs text-slate-400 font-medium">Saldo disponible</span>
                  <span className={`text-xl font-bold font-sans ${saldo < 0 ? 'text-rose-600' : 'text-slate-900'}`}>
                    {formatCurrency(saldo)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feed de Movimientos Recientes */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Movimientos Recientes</h3>
            <p className="text-xs text-slate-500">Últimas transacciones registradas</p>
          </div>
          <button
            onClick={() => setActiveTab('movimientos')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            Ver todos ({(data.movimientos || []).length}) →
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {recentMovements.map(m => {
            const isGasto = m.tipo === 'gasto';
            const isIngreso = m.tipo === 'ingreso';
            const isTransfer = m.tipo === 'transferencia';

            const origAcc = (data.cuentas || []).find(c => c.id === m.cuentaOrigen);
            const destAcc = (data.cuentas || []).find(c => c.id === m.cuentaDestino);

            return (
              <div key={m.id} className="p-3.5 sm:p-4 hover:bg-slate-50/70 transition-colors flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isGasto ? 'bg-rose-50 text-rose-600' :
                    isIngreso ? 'bg-emerald-50 text-emerald-600' :
                    'bg-sky-50 text-sky-600'
                  }`}>
                    <Icon
                      name={isGasto ? 'arrowUpRight' : isIngreso ? 'arrowDownLeft' : 'transfer'}
                      className="w-4 h-4"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {m.categoria || (isTransfer ? 'Transferencia' : 'General')}
                      </span>
                      {m.comentario && (
                        <span className="text-xs text-slate-400 truncate max-w-[140px] sm:max-w-xs">
                          • {m.comentario}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span className="font-semibold text-slate-600">{formatDate(m.fecha)}</span>
                      <span>•</span>
                      {isTransfer ? (
                        <span>{origAcc?.nombre || 'Origen'} → {destAcc?.nombre || 'Destino'}</span>
                      ) : isGasto ? (
                        <span>{origAcc?.nombre || 'Cuenta'}</span>
                      ) : (
                        <span>{destAcc?.nombre || 'Cuenta'}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className={`text-xs sm:text-sm font-bold font-sans ${
                    isGasto ? 'text-slate-900' :
                    isIngreso ? 'text-emerald-600' :
                    'text-sky-700'
                  }`}>
                    {isGasto ? `-${formatCurrency(m.importe)}` :
                     isIngreso ? `+${formatCurrency(m.importe)}` :
                     `⇄ ${formatCurrency(m.importe)}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// ⚡ MOTOR DE SUELDO & GASTOS FIJOS (Modificación 1)
// ==========================================
const SueldoEngineView = ({ setActiveTab }) => {
  const {
    data,
    distribuirSueldo,
    addMovimiento,
    addFuenteIngreso,
    updateFuenteIngreso,
    deleteFuenteIngreso
  } = useFinance();

  const [fecha, setFecha] = useState(() => new Date().toISOString().split('T')[0]);
  
  // Sincronizar importes de ingresos
  const [incomes, setIncomes] = useState(() => {
    const init = {};
    (data.fuentesIngreso || []).forEach(f => {
      init[f.id] = f.importeDefecto !== undefined && f.importeDefecto > 0 ? f.importeDefecto.toString() : '';
    });
    return init;
  });

  // Mantener actualizado si cambian las fuentes
  useEffect(() => {
    setIncomes(prev => {
      const next = { ...prev };
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
  const [inversionFija, setInversionFija] = useState(data.config?.inversionFija || 60.00);
  const [cuentaIngreso, setCuentaIngreso] = useState('acc-santander');

  const [distributionResult, setDistributionResult] = useState(null);
  const [confirmedFixedMsg, setConfirmedFixedMsg] = useState('');

  // Modificación 1: Modal para Gestionar Trabajos / Fuentes de Ingreso
  const [isManageSourcesOpen, setIsManageSourcesOpen] = useState(false);
  const [newSourceName, setNewSourceName] = useState('');
  const [newSourceDefaultAmt, setNewSourceDefaultAmt] = useState('');
  const [editingSourceId, setEditingSourceId] = useState(null);
  const [editSourceName, setEditSourceName] = useState('');
  const [editSourceAmt, setEditSourceAmt] = useState('');

  const totalIngresoCalculado = useMemo(() => {
    return Object.values(incomes).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
  }, [incomes]);

  const preview = useMemo(() => {
    const irpf = Math.round(totalIngresoCalculado * irpfPct * 100) / 100;
    const ahorro = Math.round(totalIngresoCalculado * ahorroPct * 100) / 100;
    const inv = Math.min(totalIngresoCalculado, inversionFija || 60.00);
    const gasto = Math.max(0, Math.round((totalIngresoCalculado - irpf - ahorro - inv) * 100) / 100);

    return { irpf, ahorro, inv, gasto };
  }, [totalIngresoCalculado, irpfPct, ahorroPct, inversionFija]);

  const handleIncomeChange = (fuenteId, val) => {
    setIncomes(prev => ({ ...prev, [fuenteId]: val }));
  };

  const handleExecuteDistribution = (e) => {
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
      inversionFija,
      cuentaIngreso
    });

    if (result) {
      setDistributionResult({
        ...result,
        fecha,
        preview
      });
    }
  };

  const handleQuickRegisterFixedExpense = (gastoFijo) => {
    addMovimiento({
      fecha: fecha,
      tipo: 'gasto',
      cuentaOrigen: gastoFijo.cuenta || 'acc-santander',
      importe: gastoFijo.importe,
      categoria: gastoFijo.categoria,
      comentario: gastoFijo.nombre
    });
    setConfirmedFixedMsg(`¡Gasto registrado!: ${gastoFijo.nombre} (-${formatCurrency(gastoFijo.importe)})`);
    setTimeout(() => setConfirmedFixedMsg(''), 4000);
  };

  const handleAddNewSource = (e) => {
    e.preventDefault();
    if (!newSourceName.trim()) return;
    addFuenteIngreso({
      nombre: newSourceName,
      importeDefecto: parseFloat(newSourceDefaultAmt) || 0
    });
    setNewSourceName('');
    setNewSourceDefaultAmt('');
  };

  const handleSaveEditSource = (id) => {
    if (!editSourceName.trim()) return;
    updateFuenteIngreso(id, {
      nombre: editSourceName.trim(),
      importeDefecto: parseFloat(editSourceAmt) || 0
    });
    setEditingSourceId(null);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24 md:pb-8">
      {/* Cabecera */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 mb-2">
            <Icon name="zap" className="w-3.5 h-3.5 text-amber-600" />
            Automatización de Nóminas & Gastos Fijos
          </div>
          <h2 className="text-xl font-bold text-slate-900">Motor de Nóminas y Gastos Recurrentes</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configura tus trabajos, modifica sus importes y actívalos el día que recibas el cobro.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Fecha de cobro:</span>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>
      </div>

      {confirmedFixedMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold p-3.5 rounded-xl flex items-center justify-between animate-fadeIn">
          <span>{confirmedFixedMsg}</span>
          <button onClick={() => setConfirmedFixedMsg('')} className="text-emerald-600">×</button>
        </div>
      )}

      {distributionResult && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 relative animate-fadeIn">
          <button
            onClick={() => setDistributionResult(null)}
            className="absolute top-4 right-4 text-emerald-700 hover:text-emerald-900 p-1"
          >
            <Icon name="x" className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 text-emerald-800 font-bold text-base mb-2">
            <Icon name="check" className="w-6 h-6 text-emerald-600" />
            ¡Nómina y Transferencias Distribuidas en Firebase!
          </div>
          <p className="text-xs text-emerald-700 mb-3">
            Se han añadido los ingresos y generado las transferencias automáticas para la fecha {formatDate(distributionResult.fecha)}.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-white/70 p-3 rounded-xl border border-emerald-100">
            <div>
              <span className="text-slate-400 block">Total Nóminas</span>
              <span className="font-bold text-slate-900">{formatCurrency(distributionResult.totalIngreso)}</span>
            </div>
            <div>
              <span className="text-slate-400 block">IRPF Sabadell</span>
              <span className="font-bold text-cyan-700">{formatCurrency(distributionResult.preview.irpf)}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Ahorro Sabadell</span>
              <span className="font-bold text-sky-700">{formatCurrency(distributionResult.preview.ahorro)}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Trade Republic</span>
              <span className="font-bold text-zinc-900">{formatCurrency(distributionResult.preview.inv)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Formulario de Nóminas & Gestión Dinámica (Modificación 1) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Icon name="dollar" className="w-4 h-4 text-emerald-600" />
              1. Nóminas a Cobrar
            </h3>

            <button
              onClick={() => setIsManageSourcesOpen(!isManageSourcesOpen)}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5"
            >
              <Icon name="settings" className="w-3.5 h-3.5" />
              {isManageSourcesOpen ? 'Cerrar Edición' : 'Editar Trabajos'}
            </button>
          </div>

          {/* Panel de Gestión / Edición de Trabajos */}
          {isManageSourcesOpen && (
            <div className="p-4 bg-slate-50 rounded-2xl border border-blue-200/60 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Gestionar Trabajos y Fuentes de Ingreso</span>
                <span className="text-[11px] text-slate-400">Añade o modifica tus fuentes</span>
              </div>

              {/* Lista para editar / eliminar */}
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {(data.fuentesIngreso || []).map(fuente => {
                  const isEditing = editingSourceId === fuente.id;

                  if (isEditing) {
                    return (
                      <div key={fuente.id} className="flex items-center gap-2 p-2 bg-white rounded-xl border border-blue-300">
                        <input
                          type="text"
                          value={editSourceName}
                          onChange={(e) => setEditSourceName(e.target.value)}
                          className="flex-1 text-xs font-bold bg-slate-50 border border-slate-200 rounded-lg px-2 py-1"
                        />
                        <input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={editSourceAmt}
                          onChange={(e) => setEditSourceAmt(e.target.value)}
                          className="w-24 text-xs font-bold bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-right"
                        />
                        <button
                          onClick={() => handleSaveEditSource(fuente.id)}
                          className="text-xs bg-slate-900 text-white font-bold px-2.5 py-1 rounded-lg"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={() => setEditingSourceId(null)}
                          className="text-xs text-slate-400 p-1"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div key={fuente.id} className="flex items-center justify-between p-2 bg-white rounded-xl border border-slate-200 text-xs">
                      <div>
                        <span className="font-bold text-slate-800 block">{fuente.nombre}</span>
                        <span className="text-[10px] text-slate-400">Por defecto: {formatCurrency(fuente.importeDefecto || 0)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingSourceId(fuente.id);
                            setEditSourceName(fuente.nombre);
                            setEditSourceAmt((fuente.importeDefecto || 0).toString());
                          }}
                          className="text-slate-500 hover:text-blue-600 p-1.5 rounded-lg hover:bg-slate-100"
                        >
                          <Icon name="edit" className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`¿Eliminar la fuente "${fuente.nombre}"?`)) {
                              deleteFuenteIngreso(fuente.id);
                            }
                          }}
                          className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-slate-100"
                        >
                          <Icon name="trash" className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Añadir nuevo trabajo */}
              <form onSubmit={handleAddNewSource} className="pt-2 border-t border-slate-200/80 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Nombre nuevo trabajo (ej. Colegio Nuevo)"
                  value={newSourceName}
                  onChange={(e) => setNewSourceName(e.target.value)}
                  className="flex-1 text-xs font-medium bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Sueldo €"
                  value={newSourceDefaultAmt}
                  onChange={(e) => setNewSourceDefaultAmt(e.target.value)}
                  className="w-24 text-xs font-bold bg-white border border-slate-200 rounded-xl px-2 py-2 text-right text-slate-800"
                />
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl whitespace-nowrap"
                >
                  + Añadir
                </button>
              </form>
            </div>
          )}

          {/* Formulario de Importes del Mes */}
          <div className="space-y-3">
            {(data.fuentesIngreso || []).map(fuente => (
              <div key={fuente.id} className="flex items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <label className="text-xs font-bold text-slate-800 min-w-[130px]">
                  {fuente.nombre}
                </label>
                <div className="relative flex-1 max-w-[180px]">
                  <input
                    type="number"
                    step="0.01"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={incomes[fuente.id] || ''}
                    onChange={(e) => handleIncomeChange(fuente.id, e.target.value)}
                    className="w-full text-right font-bold text-slate-900 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 pr-7"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">€</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Cuenta de ingreso:</span>
            <select
              value={cuentaIngreso}
              onChange={(e) => setCuentaIngreso(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800"
            >
              {(data.cuentas || []).filter(c => c && c.activa).map(c => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Previsualización en Vivo */}
        <div className="md:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-md flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              2. Previsualización del Reparto
            </span>
            <div className="text-3xl font-extrabold mt-1 text-white font-sans">
              {formatCurrency(totalIngresoCalculado)}
            </div>
            <p className="text-xs text-slate-400">Total a distribuir</p>

            <div className="mt-5 space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-white/5 rounded-xl border border-white/10">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                  Sabadell IRPF ({Math.round(irpfPct * 100)}%)
                </span>
                <span className="font-bold text-cyan-300 font-sans">{formatCurrency(preview.irpf)}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-white/5 rounded-xl border border-white/10">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                  Sabadell Ahorro ({Math.round(ahorroPct * 100)}%)
                </span>
                <span className="font-bold text-sky-300 font-sans">{formatCurrency(preview.ahorro)}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-white/5 rounded-xl border border-white/10">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-300"></span>
                  Trade Republic (Fijo)
                </span>
                <span className="font-bold text-white font-sans">{formatCurrency(preview.inv)}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-white/10 rounded-xl border border-white/20">
                <span className="flex items-center gap-2 font-bold text-amber-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  Disponible Gastos ({Math.round(gastoPct * 100)}%)
                </span>
                <span className="font-bold text-amber-300 font-sans">{formatCurrency(preview.gasto)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleExecuteDistribution}
            disabled={totalIngresoCalculado <= 0}
            className="w-full py-3 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 shadow-lg shadow-amber-400/20 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <Icon name="zap" className="w-4 h-4 text-slate-950" />
            Confirmar y Distribuir Nómina
          </button>
        </div>
      </div>

      {/* Gastos Fijos y Suscripciones bajo demanda */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Icon name="creditCard" className="w-4 h-4 text-indigo-600" />
            Gastos Fijos & Suscripciones (Activar cuando se cobren)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Pulsa en "Registrar Pago" el día en que te llegue el cargo bancario para aplicarlo al saldo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {(data.config?.gastosFijosDefecto || []).map((gf, idx) => (
            <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-between space-y-2.5">
              <div>
                <span className="text-xs font-bold text-slate-800 block">{gf.nombre}</span>
                <span className="text-[11px] text-slate-400">{gf.categoria}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                <span className="text-xs font-black text-slate-900 font-sans">
                  {formatCurrency(gf.importe)}
                </span>
                <button
                  onClick={() => handleQuickRegisterFixedExpense(gf)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] px-2.5 py-1 rounded-lg shadow-sm active:scale-95 transition-all"
                >
                  Registrar Pago
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 📖 DIARIO DE MOVIMIENTOS
// ==========================================
const MovimientosView = ({ initialAccountFilter, onOpenNewModal, onEditModal }) => {
  const { data, deleteMovimiento } = useFinance();

  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('todos');
  const [selectedAccount, setSelectedAccount] = useState(initialAccountFilter || 'todos');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedMonth, setSelectedMonth] = useState('todos');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const availableMonths = useMemo(() => {
    const months = new Set();
    (data.movimientos || []).forEach(m => {
      if (m && m.fecha && m.fecha.length >= 7) {
        months.add(m.fecha.substring(0, 7));
      }
    });
    return Array.from(months).sort().reverse();
  }, [data.movimientos]);

  const filteredMovimientos = useMemo(() => {
    return (data.movimientos || []).filter(m => {
      if (!m) return false;
      if (selectedType !== 'todos' && m.tipo !== selectedType) return false;
      if (selectedAccount !== 'todos') {
        if (m.tipo === 'gasto' && m.cuentaOrigen !== selectedAccount) return false;
        if (m.tipo === 'ingreso' && m.cuentaDestino !== selectedAccount) return false;
        if (m.tipo === 'transferencia' && m.cuentaOrigen !== selectedAccount && m.cuentaDestino !== selectedAccount) return false;
      }
      if (selectedCategory !== 'todas' && m.categoria !== selectedCategory) return false;
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
    return { gastos, ingresos, balance: ingresos - gastos };
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

  return (
    <div className="space-y-5 pb-24 md:pb-8">
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Icon name="search" className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por concepto, comentario o importe..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <select
              value={selectedMonth}
              onChange={(e) => { setSelectedMonth(e.target.value); setCurrentPage(1); }}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
            >
              <option value="todos">📅 Todos los meses</option>
              {availableMonths.map(m => (
                <option key={m} value={m}>{formatMonthName(m)}</option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
            >
              <option value="todos">Todos los tipos</option>
              <option value="gasto">Solo Gastos</option>
              <option value="ingreso">Solo Ingresos</option>
              <option value="transferencia">Solo Transferencias</option>
            </select>

            <select
              value={selectedAccount}
              onChange={(e) => { setSelectedAccount(e.target.value); setCurrentPage(1); }}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
            >
              <option value="todos">Todas las cuentas</option>
              {(data.cuentas || []).map(c => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-500 font-medium">
            Mostrando <strong>{filteredMovimientos.length}</strong> movimientos
          </span>
          <div className="flex items-center gap-4">
            <span className="text-slate-600">
              Gastos: <strong className="text-rose-600 font-sans">-{formatCurrency(filteredTotals.gastos)}</strong>
            </span>
            <span className="text-slate-600">
              Ingresos: <strong className="text-emerald-600 font-sans">+{formatCurrency(filteredTotals.ingresos)}</strong>
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {paginatedMovimientos.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              No se han encontrado movimientos con los filtros seleccionados.
            </div>
          ) : (
            paginatedMovimientos.map(m => {
              const isGasto = m.tipo === 'gasto';
              const isIngreso = m.tipo === 'ingreso';
              const isTransfer = m.tipo === 'transferencia';

              const origAcc = (data.cuentas || []).find(c => c.id === m.cuentaOrigen);
              const destAcc = (data.cuentas || []).find(c => c.id === m.cuentaDestino);

              return (
                <div
                  key={m.id}
                  onClick={() => onEditModal(m)}
                  className="p-3.5 sm:p-4 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isGasto ? 'bg-rose-50 text-rose-600' :
                      isIngreso ? 'bg-emerald-50 text-emerald-600' :
                      'bg-sky-50 text-sky-600'
                    }`}>
                      <Icon
                        name={isGasto ? 'arrowUpRight' : isIngreso ? 'arrowDownLeft' : 'transfer'}
                        className="w-4 h-4"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {m.categoria || (isTransfer ? 'Transferencia' : 'General')}
                        </span>
                        {m.comentario && (
                          <span className="text-xs text-slate-500 truncate max-w-[140px] sm:max-w-md">
                            • {m.comentario}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span className="font-semibold text-slate-600">{formatDate(m.fecha)}</span>
                        <span>•</span>
                        {isTransfer ? (
                          <span>
                            <strong className="text-slate-700">{origAcc?.nombre || 'Origen'}</strong> → <strong className="text-slate-700">{destAcc?.nombre || 'Destino'}</strong>
                          </span>
                        ) : isGasto ? (
                          <span>Cuenta: <strong className="text-slate-700">{origAcc?.nombre || 'General'}</strong></span>
                        ) : (
                          <span>Destino: <strong className="text-slate-700">{destAcc?.nombre || 'General'}</strong></span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-xs sm:text-sm font-bold font-sans ${
                      isGasto ? 'text-slate-900' :
                      isIngreso ? 'text-emerald-600' :
                      'text-sky-700'
                    }`}>
                      {isGasto ? `-${formatCurrency(m.importe)}` :
                       isIngreso ? `+${formatCurrency(m.importe)}` :
                       `⇄ ${formatCurrency(m.importe)}`}
                    </span>

                    <button
                      onClick={(e) => handleDelete(m.id, e)}
                      title="Eliminar movimiento"
                      className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-600 p-1 transition-opacity"
                    >
                      <Icon name="trash" className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">
              Página {currentPage} de {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 disabled:opacity-30"
              >
                Anterior
              </button>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 disabled:opacity-30"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 📈 ANALÍTICA & REPORTES EJECUTIVOS & EXPORTADOR (Modificación 3)
// ==========================================
const AnaliticaView = () => {
  const { data, saldos, totalPatrimonio } = useFinance();

  const [periodoFilter, setPeriodoFilter] = useState('2026'); // '2026', 'mes', '6m', '3m', 'all'
  const [selectedSpecificMonth, setSelectedSpecificMonth] = useState('2026-08');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('todas');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const availableMonths = useMemo(() => {
    const months = new Set();
    (data.movimientos || []).forEach(m => {
      if (m && m.fecha && m.fecha.length >= 7) {
        months.add(m.fecha.substring(0, 7));
      }
    });
    return Array.from(months).sort().reverse();
  }, [data.movimientos]);

  // Movimientos filtrados para el análisis
  const analysisMovements = useMemo(() => {
    return (data.movimientos || []).filter(m => {
      if (!m || !m.fecha) return false;
      const mMonth = m.fecha.substring(0, 7);

      if (periodoFilter === '2026' && !m.fecha.startsWith('2026')) return false;
      if (periodoFilter === 'mes' && mMonth !== selectedSpecificMonth) return false;
      if (periodoFilter === '3m' && !availableMonths.slice(0, 3).includes(mMonth)) return false;
      if (periodoFilter === '6m' && !availableMonths.slice(0, 6).includes(mMonth)) return false;

      if (selectedCategoryFilter !== 'todas' && m.categoria !== selectedCategoryFilter) return false;

      return true;
    });
  }, [data.movimientos, periodoFilter, selectedSpecificMonth, selectedCategoryFilter, availableMonths]);

  // Métricas Clave Consolidadas
  const periodKpis = useMemo(() => {
    let ingresos = 0;
    let gastos = 0;
    let transferencias = 0;

    analysisMovements.forEach(m => {
      const imp = parseFloat(m.importe) || 0;
      if (m.tipo === 'ingreso') ingresos += imp;
      if (m.tipo === 'gasto') gastos += imp;
      if (m.tipo === 'transferencia') transferencias += imp;
    });

    const balance = ingresos - gastos;
    const tasaAhorro = ingresos > 0 ? Math.max(0, Math.round((balance / ingresos) * 100)) : 0;
    const diasEnPeriodo = periodoFilter === 'mes' ? 30 : (periodoFilter === '2026' ? 240 : 90);
    const mediaGastoDiario = gastos / Math.max(1, diasEnPeriodo);

    return { ingresos, gastos, transferencias, balance, tasaAhorro, mediaGastoDiario };
  }, [analysisMovements, periodoFilter]);

  // Desglose por Categorías
  const categoryExpenses = useMemo(() => {
    const map = {};
    let totalGasto = 0;

    analysisMovements.forEach(m => {
      if (m && m.tipo === 'gasto') {
        const cat = m.categoria || 'Otros Gastos';
        const imp = parseFloat(m.importe) || 0;
        map[cat] = (map[cat] || 0) + imp;
        totalGasto += imp;
      }
    });

    return Object.entries(map)
      .map(([categoria, importe]) => ({
        categoria,
        importe,
        porcentaje: totalGasto > 0 ? Math.round((importe / totalGasto) * 100) : 0
      }))
      .sort((a, b) => b.importe - a.importe);
  }, [analysisMovements]);

  // Comparativa Mensual de Ingresos vs Gastos vs Ahorro
  const monthlyComparison = useMemo(() => {
    const map = {};

    (data.movimientos || []).forEach(m => {
      if (!m || !m.fecha || m.fecha.length < 7) return;
      const monthKey = m.fecha.substring(0, 7);
      if (!map[monthKey]) {
        map[monthKey] = { mes: monthKey, ingresos: 0, gastos: 0, transferencias: 0 };
      }
      const imp = parseFloat(m.importe) || 0;
      if (m.tipo === 'ingreso') map[monthKey].ingresos += imp;
      if (m.tipo === 'gasto') map[monthKey].gastos += imp;
      if (m.tipo === 'transferencia') map[monthKey].transferencias += imp;
    });

    const sorted = Object.values(map).sort((a, b) => a.mes.localeCompare(b.mes));
    if (periodoFilter === '3m') return sorted.slice(-3);
    if (periodoFilter === '6m') return sorted.slice(-6);
    if (periodoFilter === '2026') return sorted.filter(m => m.mes.startsWith('2026'));
    if (periodoFilter === 'mes') return sorted.filter(m => m.mes === selectedSpecificMonth);
    return sorted;
  }, [data.movimientos, periodoFilter, selectedSpecificMonth]);

  // Evolución del Patrimonio Neto Disponible (Calculado por cuenta respetando incluirEnTotal)
  const [showIrpfInChart, setShowIrpfInChart] = useState(false);

  const patrimonioEvolution = useMemo(() => {
    const activeCuentasMap = {};
    (data.cuentas || []).forEach(c => {
      if (c && c.activa) {
        activeCuentasMap[c.id] = {
          saldo: c.saldoInicial || 0,
          incluirEnTotal: c.incluirEnTotal !== false
        };
      }
    });

    const movsSorted = [...(data.movimientos || [])].sort((a, b) => {
      const dComp = (a.fecha || '').localeCompare(b.fecha || '');
      if (dComp !== 0) return dComp;
      return (a.id || '').localeCompare(b.id || '');
    });

    const allMonths = Array.from(
      new Set(movsSorted.map(m => m && m.fecha ? m.fecha.substring(0, 7) : ''))
    ).filter(Boolean).sort();

    const history = [];

    allMonths.forEach(mKey => {
      const monthMovs = movsSorted.filter(m => m && m.fecha && m.fecha.startsWith(mKey));
      monthMovs.forEach(m => {
        const imp = parseFloat(m.importe) || 0;
        if (m.tipo === 'gasto') {
          if (activeCuentasMap[m.cuentaOrigen]) activeCuentasMap[m.cuentaOrigen].saldo -= imp;
        } else if (m.tipo === 'ingreso') {
          if (activeCuentasMap[m.cuentaDestino]) activeCuentasMap[m.cuentaDestino].saldo += imp;
        } else if (m.tipo === 'transferencia') {
          if (activeCuentasMap[m.cuentaOrigen]) activeCuentasMap[m.cuentaOrigen].saldo -= imp;
          if (activeCuentasMap[m.cuentaDestino]) activeCuentasMap[m.cuentaDestino].saldo += imp;
        }
      });

      const totalDisponible = Object.values(activeCuentasMap)
        .filter(c => c.incluirEnTotal)
        .reduce((sum, c) => sum + c.saldo, 0);

      const totalConIrpf = Object.values(activeCuentasMap)
        .reduce((sum, c) => sum + c.saldo, 0);

      history.push({
        mes: mKey,
        total: showIrpfInChart ? totalConIrpf : totalDisponible,
        totalDisponible,
        totalConIrpf
      });
    });

    if (periodoFilter === '3m') return history.slice(-3);
    if (periodoFilter === '6m') return history.slice(-6);
    if (periodoFilter === '2026') return history.filter(h => h.mes.startsWith('2026'));
    if (periodoFilter === 'mes') return history.filter(h => h.mes === selectedSpecificMonth);
    return history;
  }, [data.cuentas, data.movimientos, periodoFilter, selectedSpecificMonth, showIrpfInChart]);

  const lineChartData = useMemo(() => {
    if (patrimonioEvolution.length === 0) return { path: '', area: '', points: [], width: 600, height: 220 };

    const values = patrimonioEvolution.map(d => d.total);
    const minVal = Math.min(...values, 0);
    const maxVal = Math.max(...values, 1000);
    const range = maxVal - minVal || 1;

    const width = 600;
    const height = 220;
    const padding = 30;

    const points = patrimonioEvolution.map((d, idx) => {
      const x = padding + (idx / Math.max(1, patrimonioEvolution.length - 1)) * (width - 2 * padding);
      const y = height - padding - ((d.total - minVal) / range) * (height - 2 * padding);
      return { x, y, ...d };
    });

    const path = points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');
    const area = points.length > 0 ? `${path} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z` : '';

    return { path, area, points, width, height };
  }, [patrimonioEvolution]);

  const maxMonthExpense = useMemo(() => {
    return Math.max(...monthlyComparison.map(m => Math.max(m.ingresos, m.gastos)), 1000);
  }, [monthlyComparison]);

  // Exportador de Excel que replica la plantilla original
  const handleExportReplicatedExcel = () => {
    const targetMonth = periodoFilter === 'mes' ? selectedSpecificMonth : '2026-08';
    const monthName = formatMonthName(targetMonth);
    const monthMovs = (data.movimientos || []).filter(m => m && m.fecha && m.fecha.startsWith(targetMonth));

    // Construcción en formato XML / HTML compatible 100% con Microsoft Excel (.xls)
    let excelHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${monthName}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
        <meta http-equiv="content-type" content="text/plain; charset=UTF-8"/>
        <style>
          th { background-color: #1e293b; color: #ffffff; font-weight: bold; font-family: Calibri, sans-serif; text-align: center; }
          td { font-family: Calibri, sans-serif; font-size: 11pt; }
          .header-main { background-color: #0f172a; color: #f8fafc; font-size: 14pt; font-weight: bold; text-align: center; }
          .num { text-align: right; }
          .bold { font-weight: bold; }
          .ingreso { color: #059669; font-weight: bold; }
          .gasto { color: #dc2626; }
        </style>
      </head>
      <body>
        <table border="1">
          <tr><td colspan="6" class="header-main">FINANZAS 2026 - HOJA MENSUAL: ${monthName.toUpperCase()}</td></tr>
          <tr><td colspan="6"></td></tr>
          <tr>
            <th>CUENTA</th>
            <th>SALDO INICIAL</th>
            <th>MOVIMIENTOS</th>
            <th>SALDO FINAL</th>
            <th colspan="2">CONFIGURACION</th>
          </tr>
    `;

    (data.cuentas || []).forEach(c => {
      const saldoIni = c.saldoInicial || 0;
      const saldoAct = saldos[c.id] || 0;
      const movNeto = saldoAct - saldoIni;
      excelHtml += `
        <tr>
          <td class="bold">${c.nombre}</td>
          <td class="num">${saldoIni.toFixed(2)} €</td>
          <td class="num">${movNeto.toFixed(2)} €</td>
          <td class="num bold">${saldoAct.toFixed(2)} €</td>
          <td colspan="2">${c.incluirEnTotal !== false ? 'Computable en Total' : 'Sabadell IRPF (Separado)'}</td>
        </tr>
      `;
    });

    excelHtml += `
          <tr><td colspan="6"></td></tr>
          <tr><td colspan="6" class="header-main">DIARIO DE MOVIMIENTOS DEL MES (${monthMovs.length} transacciones)</td></tr>
          <tr>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Cuenta</th>
            <th>Categoría</th>
            <th>Monto (€)</th>
            <th>Comentario</th>
          </tr>
    `;

    monthMovs.forEach(m => {
      const orig = (data.cuentas || []).find(c => c.id === m.cuentaOrigen)?.nombre || '';
      const dest = (data.cuentas || []).find(c => c.id === m.cuentaDestino)?.nombre || '';
      const cuentaStr = m.tipo === 'transferencia' ? `${orig} -> ${dest}` : (m.tipo === 'gasto' ? orig : dest);
      const montoSign = m.tipo === 'gasto' ? -m.importe : m.importe;

      excelHtml += `
        <tr>
          <td>${formatDate(m.fecha)}</td>
          <td class="bold">${m.tipo.toUpperCase()}</td>
          <td>${cuentaStr}</td>
          <td>${m.categoria || ''}</td>
          <td class="num ${m.tipo === 'ingreso' ? 'ingreso' : (m.tipo === 'gasto' ? 'gasto' : '')}">${montoSign.toFixed(2)} €</td>
          <td>${m.comentario || ''}</td>
        </tr>
      `;
    });

    excelHtml += `</table></body></html>`;

    const blob = new Blob([excelHtml], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Finanzas_${monthName.replace(' ', '_')}.xls`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      {/* Barra de Control y Acciones Destacadas */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 mb-1">
            <Icon name="sparkles" className="w-3.5 h-3.5 text-blue-600" />
            Motor de Inteligencia & Análisis Financiero
          </div>
          <h2 className="text-xl font-bold text-slate-900">Analítica Financiera Avanzada</h2>
          <p className="text-xs text-slate-500">Métricas completas, evolución de patrimonio y reportes ejecutivos</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Botón Presentación / Informe Ejecutivo */}
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md active:scale-95 transition-all"
          >
            <Icon name="presentation" className="w-4 h-4" />
            Informe Ejecutivo
          </button>

          {/* Botón Descargar Plantilla Excel Replicada */}
          <button
            onClick={handleExportReplicatedExcel}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md active:scale-95 transition-all"
          >
            <Icon name="table" className="w-4 h-4" />
            Descargar Excel Replicado
          </button>
        </div>
      </div>

      {/* Barra de Filtros Multidimensional */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-700">Período:</span>
          {[
            { id: '2026', label: 'Año 2026' },
            { id: 'mes', label: 'Mes Específico' },
            { id: '3m', label: 'Últimos 3m' },
            { id: '6m', label: 'Últimos 6m' },
            { id: 'all', label: 'Todo el Histórico' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setPeriodoFilter(btn.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                periodoFilter === btn.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {btn.label}
            </button>
          ))}

          {periodoFilter === 'mes' && (
            <select
              value={selectedSpecificMonth}
              onChange={(e) => setSelectedSpecificMonth(e.target.value)}
              className="text-xs font-bold bg-blue-50 border border-blue-300 text-blue-900 rounded-xl px-3 py-1.5 animate-fadeIn"
            >
              {availableMonths.map(m => (
                <option key={m} value={m}>{formatMonthName(m)}</option>
              ))}
            </select>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700">Categoría:</span>
          <select
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800"
          >
            <option value="todas">Todas las categorías</option>
            {(data.categorias || []).map(cat => (
              <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Cards del Período */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-xs font-medium text-slate-400">Ingresos Totales</span>
          <div className="text-2xl font-extrabold text-emerald-600 font-sans">
            +{formatCurrency(periodKpis.ingresos)}
          </div>
          <span className="text-[11px] text-slate-500 block">Nóminas y otros cobros</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-xs font-medium text-slate-400">Gastos Totales</span>
          <div className="text-2xl font-extrabold text-rose-600 font-sans">
            -{formatCurrency(periodKpis.gastos)}
          </div>
          <span className="text-[11px] text-slate-500 block">Media: {formatCurrency(periodKpis.mediaGastoDiario)} / día</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-xs font-medium text-slate-400">Ahorro Neto</span>
          <div className={`text-2xl font-extrabold font-sans ${periodKpis.balance >= 0 ? 'text-blue-600' : 'text-rose-600'}`}>
            {formatCurrency(periodKpis.balance)}
          </div>
          <span className="text-[11px] text-slate-500 block">Balance del período</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-xs font-medium text-slate-400">Tasa de Ahorro</span>
          <div className="text-2xl font-extrabold text-sky-600 font-sans">
            {periodKpis.tasaAhorro}%
          </div>
          <span className="text-[11px] text-slate-500 block">Porcentaje de ingresos guardado</span>
        </div>
      </div>

      {/* Gráfico 1: Evolución del Patrimonio */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Icon name="trendingUp" className="w-4 h-4 text-blue-600" />
              {showIrpfInChart ? 'Evolución del Patrimonio Total Consolidado (€)' : 'Evolución del Patrimonio Neto Disponible (€)'}
            </h3>
            <p className="text-xs text-slate-500">
              {showIrpfInChart ? 'Incluye todas las cuentas activas (con Sabadell IRPF)' : 'Solo cuentas computables en el total (excluye Sabadell IRPF)'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-[11px] font-bold">
              <button
                onClick={() => setShowIrpfInChart(false)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  !showIrpfInChart ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Sin IRPF
              </button>
              <button
                onClick={() => setShowIrpfInChart(true)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  showIrpfInChart ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Con IRPF
              </button>
            </div>

            {lineChartData.points.length > 0 && (
              <span className="text-sm font-bold text-slate-900 font-sans">
                Último: {formatCurrency(lineChartData.points[lineChartData.points.length - 1].total)}
              </span>
            )}
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <svg viewBox={`0 0 ${lineChartData.width || 600} ${lineChartData.height || 220}`} className="w-full h-52">
            <defs>
              <linearGradient id="patrimonioGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            <line x1="30" y1="30" x2="570" y2="30" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="30" y1="110" x2="570" y2="110" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="30" y1="190" x2="570" y2="190" stroke="#e2e8f0" strokeWidth="1" />

            {lineChartData.area && <path d={lineChartData.area} fill="url(#patrimonioGrad2)" />}
            {lineChartData.path && <path d={lineChartData.path} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />}

            {lineChartData.points.map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r="4" fill="#ffffff" stroke="#2563eb" strokeWidth="2.5" />
                <text x={p.x} y="210" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="600">
                  {formatMonthName(p.mes).split(' ')[0].substring(0, 3)}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico 2: Comparativa de Ingresos vs Gastos con Nombres de Meses en Español */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Icon name="chart" className="w-4 h-4 text-emerald-600" />
            Comparativa Mensual (Ingresos vs Gastos)
          </h3>

          <div className="space-y-3 pt-2">
            {monthlyComparison.map(m => {
              const ingPct = Math.round((m.ingresos / maxMonthExpense) * 100);
              const gastPct = Math.round((m.gastos / maxMonthExpense) * 100);

              return (
                <div key={m.mes} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>{formatMonthName(m.mes)}</span>
                    <span className="text-[11px] text-slate-400 font-sans">
                      +{formatCurrency(m.ingresos)} / -{formatCurrency(m.gastos)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 h-3.5 bg-slate-50 rounded-full overflow-hidden p-0.5 border border-slate-100">
                    <div className="bg-emerald-500 rounded-full transition-all" style={{ width: `${ingPct}%` }}></div>
                    <div className="bg-rose-400 rounded-full transition-all" style={{ width: `${gastPct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Gráfico 3: Distribución por Categorías */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Icon name="pieChart" className="w-4 h-4 text-amber-600" />
            Distribución de Gastos por Categoría
          </h3>

          <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
            {categoryExpenses.slice(0, 10).map((cat, idx) => (
              <div key={cat.categoria} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-5 h-5 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="font-bold text-slate-800 truncate">{cat.categoria}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 font-medium">{cat.porcentaje}%</span>
                  <span className="font-bold text-slate-900 font-sans">{formatCurrency(cat.importe)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL / VISTA DE INFORME EJECUTIVO & PRESENTACIÓN (Modificación 3) */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                  <Icon name="presentation" className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Informe Financiero Ejecutivo</h3>
                  <p className="text-xs text-slate-300">
                    Período: {periodoFilter === 'mes' ? formatMonthName(selectedSpecificMonth) : 'Año 2026'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <Icon name="x" className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto">
              {/* Resumen Narrativo */}
              <div className="p-4 bg-blue-50/70 border border-blue-200/80 rounded-2xl space-y-2">
                <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                  <Icon name="sparkles" className="w-4 h-4 text-blue-600" />
                  Conclusión del Período
                </span>
                <p className="text-xs text-blue-950 leading-relaxed">
                  Durante el período seleccionado has ingresado un total de <strong>{formatCurrency(periodKpis.ingresos)}</strong> y realizado gastos por <strong>{formatCurrency(periodKpis.gastos)}</strong>, lo que representa una tasa de ahorro del <strong>{periodKpis.tasaAhorro}%</strong> ({formatCurrency(periodKpis.balance)} guardados). Tu patrimonio neto disponible se sitúa en <strong>{formatCurrency(totalPatrimonio)}</strong>.
                </p>
              </div>

              {/* Métricas Destacadas */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] text-slate-400 block font-medium">Ingreso Promedio</span>
                  <span className="text-sm font-bold text-emerald-600 font-sans">
                    {formatCurrency(periodKpis.ingresos)}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] text-slate-400 block font-medium">Gasto Diario</span>
                  <span className="text-sm font-bold text-rose-600 font-sans">
                    {formatCurrency(periodKpis.mediaGastoDiario)}/día
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] text-slate-400 block font-medium">Categoría Principal</span>
                  <span className="text-sm font-bold text-slate-900 truncate block">
                    {categoryExpenses[0]?.categoria || 'N/A'}
                  </span>
                </div>
              </div>

              {/* Top 5 Categorías de Mayor Gasto */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 mb-2.5">Top Categorías de Gasto</h4>
                <div className="space-y-2">
                  {categoryExpenses.slice(0, 5).map((c, i) => (
                    <div key={c.categoria} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl text-xs">
                      <span className="font-bold text-slate-800">{i + 1}. {c.categoria}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-400">{c.porcentaje}% del total</span>
                        <span className="font-bold text-slate-900 font-sans">{formatCurrency(c.importe)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <button
                onClick={handleExportReplicatedExcel}
                className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900"
              >
                <Icon name="download" className="w-4 h-4" />
                Descargar Plantilla Excel
              </button>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
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
  const [invFija, setInvFija] = useState(data.config?.inversionFija || 60.00);
  const [statusMsg, setStatusMsg] = useState('');

  const handleSaveFirebase = (e) => {
    e.preventDefault();
    setFirebaseUrl(inputUrl);
    syncNow();
    setStatusMsg('URL de Firebase guardada y sincronización iniciada.');
  };

  const handleSavePercentages = (e) => {
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
      inversionFija: parseFloat(invFija) || 60.00
    });
    setStatusMsg('Configuración de reparto de sueldo guardada.');
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finanzas_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJsonFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
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

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-24 md:pb-8">
      {statusMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold p-3.5 rounded-xl flex items-center justify-between">
          <span>{statusMsg}</span>
          <button onClick={() => setStatusMsg('')} className="text-emerald-600">×</button>
        </div>
      )}

      {/* Sincronización Google Firebase */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Icon name="cloud" className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Google Firebase Realtime Database</h3>
            <p className="text-xs text-slate-500">Sincronización reactiva 24/7 con resolución de conflictos por timestamp</p>
          </div>
        </div>

        <form onSubmit={handleSaveFirebase} className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              URL REST de la Base de Datos Firebase (.json)
            </label>
            <input
              type="url"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="https://tu-proyecto.firebasedatabase.app/finanzas.json"
              className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="text-[11px] text-slate-400">
              Estado: <strong className="text-slate-700 capitalize">{syncStatus}</strong>
              {lastSyncTime && <span> • Última sincronización: {lastSyncTime.toLocaleTimeString()}</span>}
            </div>
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-sm"
            >
              Guardar y Conectar
            </button>
          </div>
        </form>
      </div>

      {/* Gestión de Cuentas */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Gestión de Cuentas & Cómputo de Total</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Configura la visibilidad de cada cuenta y si suma al Patrimonio Neto Disponible.
          </p>
        </div>

        <div className="space-y-2">
          {(data.cuentas || []).map(c => (
            <div key={c.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100 gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }}></span>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">{c.nombre}</span>
                  <span className="text-[10px] text-slate-400 capitalize">{c.tipo}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => toggleIncluirEnTotal(c.id)}
                  title="Indica si esta cuenta suma al total de patrimonio disponible"
                  className={`text-xs font-semibold px-3 py-1 rounded-lg border transition-colors ${
                    c.incluirEnTotal !== false
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-slate-200 text-slate-500 border-slate-300'
                  }`}
                >
                  {c.incluirEnTotal !== false ? '✓ Suma al Total' : '✕ Excluida del Total'}
                </button>

                <button
                  onClick={() => toggleCuenta(c.id)}
                  className={`text-xs font-semibold px-3 py-1 rounded-lg border transition-colors ${
                    c.activa ? 'bg-white text-slate-900 border-slate-200' : 'bg-slate-200 text-slate-500 border-transparent'
                  }`}
                >
                  {c.activa ? 'Visible' : 'Oculta'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Configuración de Reparto de Nóminas */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Icon name="zap" className="w-4 h-4 text-amber-500" />
          Porcentajes del Reparto de Sueldo
        </h3>

        <form onSubmit={handleSavePercentages} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">IRPF Sabadell (%)</label>
              <input
                type="number"
                step="1"
                value={irpf}
                onChange={(e) => setIrpf(e.target.value)}
                className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Ahorro Sabadell (%)</label>
              <input
                type="number"
                step="1"
                value={ahorro}
                onChange={(e) => setAhorro(e.target.value)}
                className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Gasto Corriente (%)</label>
              <input
                type="number"
                step="1"
                value={gasto}
                onChange={(e) => setGasto(e.target.value)}
                className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Inversión Fija Mensual (Trade Republic €)</label>
            <input
              type="number"
              step="0.01"
              value={invFija}
              onChange={(e) => setInvFija(e.target.value)}
              className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-sm"
            >
              Guardar Porcentajes
            </button>
          </div>
        </form>
      </div>

      {/* Copias de Seguridad & Migración */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Copias de Seguridad & Datos</h3>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportJson}
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors"
          >
            <Icon name="download" className="w-4 h-4" />
            Exportar JSON
          </button>

          <label className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer">
            <Icon name="upload" className="w-4 h-4" />
            Importar JSON
            <input type="file" accept=".json" onChange={handleImportJsonFile} className="hidden" />
          </label>

          <button
            onClick={handleResetHistory}
            className="text-rose-600 hover:text-rose-700 font-bold text-xs px-4 py-2.5 rounded-xl border border-rose-200 ml-auto transition-colors"
          >
            Restablecer a Histórico 2026
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// ➕ MODAL DE CREACIÓN / EDICIÓN DE MOVIMIENTO
// ==========================================
const MovementModal = ({ isOpen, onClose, editingMovement = null, defaultType = 'gasto' }) => {
  const { data, addMovimiento, updateMovimiento } = useFinance();

  const [tipo, setTipo] = useState(defaultType);
  const [fecha, setFecha] = useState(() => new Date().toISOString().split('T')[0]);
  const [importe, setImporte] = useState('');
  const [cuentaOrigen, setCuentaOrigen] = useState('acc-santander');
  const [cuentaDestino, setCuentaDestino] = useState('acc-bbva');
  const [categoria, setCategoria] = useState('Comida');
  const [comentario, setComentario] = useState('');

  useEffect(() => {
    if (editingMovement) {
      setTipo(editingMovement.tipo || 'gasto');
      setFecha(editingMovement.fecha || new Date().toISOString().split('T')[0]);
      setImporte(editingMovement.importe?.toString() || '');
      setCuentaOrigen(editingMovement.cuentaOrigen || 'acc-santander');
      setCuentaDestino(editingMovement.cuentaDestino || 'acc-bbva');
      setCategoria(editingMovement.categoria || 'Comida');
      setComentario(editingMovement.comentario || '');
    } else {
      setTipo(defaultType);
      setFecha(new Date().toISOString().split('T')[0]);
      setImporte('');
      setCuentaOrigen('acc-santander');
      setCuentaDestino('acc-bbva');
      setCategoria(defaultType === 'ingreso' ? 'Sueldo/Nómina' : 'Comida');
      setComentario('');
    }
  }, [editingMovement, defaultType, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
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
      categoria: tipo === 'transferencia' ? (categoria || 'Transferencia') : categoria,
      comentario
    };

    if (editingMovement) {
      updateMovimiento(editingMovement.id, payload);
    } else {
      addMovimiento(payload);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">
            {editingMovement ? 'Editar Movimiento' : 'Nuevo Movimiento'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1">
            <Icon name="x" className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl">
            {[
              { id: 'gasto', label: 'Gasto', color: 'text-rose-600' },
              { id: 'ingreso', label: 'Ingreso', color: 'text-emerald-600' },
              { id: 'transferencia', label: 'Transferir', color: 'text-sky-600' }
            ].map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTipo(t.id)}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  tipo === t.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Importe (€)</label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              required
              autoFocus
              placeholder="0.00"
              value={importe}
              onChange={(e) => setImporte(e.target.value)}
              className="w-full text-2xl font-black text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-900 font-sans"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none"
            />
          </div>

          {tipo === 'gasto' && (
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Cuenta</label>
              <select
                value={cuentaOrigen}
                onChange={(e) => setCuentaOrigen(e.target.value)}
                className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900"
              >
                {(data.cuentas || []).filter(c => c && c.activa).map(c => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </select>
            </div>
          )}

          {tipo === 'ingreso' && (
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Cuenta Destino</label>
              <select
                value={cuentaDestino}
                onChange={(e) => setCuentaDestino(e.target.value)}
                className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900"
              >
                {(data.cuentas || []).filter(c => c && c.activa).map(c => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </select>
            </div>
          )}

          {tipo === 'transferencia' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">De (Origen)</label>
                <select
                  value={cuentaOrigen}
                  onChange={(e) => setCuentaOrigen(e.target.value)}
                  className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-900"
                >
                  {(data.cuentas || []).filter(c => c && c.activa).map(c => (
                    <option key={c.id} value={c.id}>{c.nombre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">A (Destino)</label>
                <select
                  value={cuentaDestino}
                  onChange={(e) => setCuentaDestino(e.target.value)}
                  className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-900"
                >
                  {(data.cuentas || []).filter(c => c && c.activa).map(c => (
                    <option key={c.id} value={c.id}>{c.nombre}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {tipo !== 'transferencia' && (
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Categoría</label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900"
              >
                {(data.categorias || []).filter(c => c && (c.tipo === tipo || c.tipo === 'mixto')).map(c => (
                  <option key={c.id} value={c.nombre}>{c.nombre}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Comentario / Nota (Opcional)</label>
            <input
              type="text"
              placeholder="ej. Mercadona, Restaurante, Regalo..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md active:scale-98 transition-all"
            >
              {editingMovement ? 'Guardar Cambios' : 'Añadir Movimiento'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
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

  const handleEditModal = (mov) => {
    setEditingMovement(mov);
    setIsModalOpen(true);
  };

  const handleSelectAccountFilter = (accId) => {
    setAccountFilter(accId);
    setActiveTab('movimientos');
  };

  return (
    <ErrorBoundary>
      <FinanceProvider>
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white">
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenNewModal={() => handleOpenNewModal('gasto')}
          />

          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8">
            {activeTab === 'dashboard' && (
              <DashboardView
                setActiveTab={setActiveTab}
                onOpenNewModal={handleOpenNewModal}
                onSelectAccountFilter={handleSelectAccountFilter}
              />
            )}

            {activeTab === 'sueldo' && (
              <SueldoEngineView setActiveTab={setActiveTab} />
            )}

            {activeTab === 'movimientos' && (
              <MovimientosView
                initialAccountFilter={accountFilter}
                onOpenNewModal={handleOpenNewModal}
                onEditModal={handleEditModal}
              />
            )}

            {activeTab === 'analitica' && (
              <AnaliticaView />
            )}

            {activeTab === 'ajustes' && (
              <AjustesView />
            )}
          </main>

          <BottomNav
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenNewModal={() => handleOpenNewModal('gasto')}
          />

          <MovementModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            editingMovement={editingMovement}
            defaultType={defaultModalType}
          />
        </div>
      </FinanceProvider>
    </ErrorBoundary>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(<App />);
}