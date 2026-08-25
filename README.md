# 💶 Finanzas 2026 | PWA de Control & Reparto de Nóminas

Aplicación Web Progresiva (**PWA**) y **SPA** de alto rendimiento en **React 18** y **Tailwind CSS** con diseño minimalista en **Light Mode**, sincronización reactiva en tiempo real con **Google Firebase Realtime Database** (vía REST API con resolución de conflictos por timestamp `clientUpdated`), respaldo offline en **LocalStorage** y motor automatizado de distribución de nóminas.

---

## 📱 Dispositivos Objetivo y Experiencia de Usuario (UI/UX)

- **iPhone 15**: Optimizado para uso ágil a una sola mano. Barra de navegación inferior fija, botón de acción rápida central, teclados numéricos (`inputMode="decimal"`), feedback visual y modal flotante de inserción ultrarrápida de transacciones.
- **iPad Air 13" (M2) & Desktop**: Vista panorámica con cuadrículas responsivas de 3 columnas, panel de métricas de patrimonio, gráficos interactivos de evolución patrimonial y desgloses de gastos por categoría.
- **Light Mode Minimalista**: Paleta neutra limpia (`slate-50`, `white`, `slate-900`) con identificadores visuales cromáticos precisos para cada cuenta bancaria:
  - 🔴 **Santander**: Rojo (`#DC2626`)
  - 🔵 **BBVA**: Azul Oscuro (`#1E3A8A`)
  - 🔷 **Sabadell Ahorro**: Azul Claro / Cyan (`#0284C7`)
  - 🔷 **Sabadell IRPF**: Cyan Suave (`#0EA5E9`)
  - ⚫ **Trade Republic**: Gris Carbón / Negro (`#18181B`)
  - 🟢 **Efectivo**: Verde Esmeralda (`#16A34A`)

---

## ⚡ Módulos y Funcionalidades Principales

### 1. 📊 Dashboard Principal (Cuentas y Saldos en Vivo)
- **Patrimonio Total Consolidado**: Suma reactiva del balance de todas las cuentas activas calculada directamente desde el historial de movimientos.
- **Métricas del Mes en Curso**: Ingresos acumulados, gastos totales y porcentaje de ahorro estimado.
- **Tarjetas de Cuentas**: Desglose con saldo disponible, porcentaje sobre el patrimonio total y acceso directo a filtrar el diario de transacciones por cuenta con 1 solo toque.
- **Feed de Movimientos Recientes**: Vista rápida de las últimas transacciones con indicador de tipo (Gasto `-`, Ingreso `+`, Transferencia `⇄`).

### 2. ⚡ Motor de Ingresos y Automatización ("Distribuir Sueldo")
- Formulario para registrar las distintas nóminas del mes según las fuentes configuradas (`Maristas`, `Claret`, `Academia`, `Clases Particulares`).
- **Calculadora en Tiempo Real**:
  - **IRPF Sabadell (18%)**: Calculado y transferido automáticamente de Santander a Sabadell IRPF.
  - **Ahorro Sabadell (50%)**: Calculado y transferido automáticamente de Santander a Sabadell Ahorro.
  - **Inversión Fija Mensual (60,00 €)**: Transferido automáticamente a Trade Republic.
  - **Disponible para Gastos Corrientes (32%)**: Saldo remanente para consumo del día a día.
- **Botón "⚡ Distribuir Sueldo"**: Genera en lote todas las transacciones de ingreso y las transferencias asociadas en el array `movimientos`, actualizando instantáneamente los saldos y sincronizando con Firebase.

### 3. 📖 Diario de Movimientos
- Formulario rápido para añadir o editar Gastos, Ingresos y Transferencias.
- **Buscador y Filtros Combinados**:
  - Búsqueda en texto completo por concepto, comentario, cuenta o importe.
  - Filtro por mes (todos los meses o selección individual).
  - Filtro por tipo (Gasto / Ingreso / Transferencia).
  - Filtro por cuenta bancaria.
- Totales dinámicos según el filtro activo y paginación rápida.
- Eliminación y edición de movimientos con recálculo automático de saldos.

### 4. 📈 Analítica & Gráficos Interactivos (SVG Nativo)
- **Evolución del Patrimonio Neto**: Gráfico de área y curva mes a mes con los datos reales de 2026.
- **Ingresos vs Gastos Mensuales**: Comparativa visual de barras del flujo financiero mensual.
- **Distribución de Gastos por Categoría**: Ranking y porcentajes de las principales partidas de gasto (Alquiler, Comida, Comer Fuera, Suscripciones, etc.).
- Filtros temporales: Año 2026, Últimos 6 meses, Últimos 3 meses, Todo el histórico.

### 5. ☁️ Sincronización Firebase & Copias de Seguridad
- Sincronización reactiva 24/7 mediante REST API (`GET`, `PUT`).
- Resolución de conflictos mediante timestamp ISO `clientUpdated`.
- Respaldo continuo en `localStorage` ante cortes de conexión o modo avión.
- Herramientas de **Exportar JSON**, **Importar JSON** y **Restablecer al Histórico 2026 Original**.

---

## 🗂️ Estructura del Esquema `data.json`

```json
{
  "version": "1.0",
  "clientUpdated": "2026-08-25T12:37:45Z",
  "config": {
    "repartoSueldo": {
      "irpf": 0.18,
      "ahorro": 0.50,
      "gasto": 0.32
    },
    "inversionFija": 60.00
  },
  "cuentas": [
    { "id": "acc-santander", "nombre": "Santander", "tipo": "banco", "activa": true, "color": "#DC2626", "saldoInicial": -25.47 },
    { "id": "acc-bbva", "nombre": "BBVA", "tipo": "banco", "activa": true, "color": "#1E3A8A", "saldoInicial": 121.80 },
    { "id": "acc-sab-ahorro", "nombre": "Sabadell Ahorro", "tipo": "banco", "activa": true, "color": "#0284C7", "saldoInicial": 1143.97 },
    { "id": "acc-sab-irpf", "nombre": "Sabadell IRPF", "tipo": "banco", "activa": true, "color": "#0EA5E9", "saldoInicial": 202.04 },
    { "id": "acc-trade", "nombre": "Trade Republic", "tipo": "inversion", "activa": true, "color": "#18181B", "saldoInicial": 1031.55 },
    { "id": "acc-efectivo", "nombre": "Efectivo", "tipo": "metalico", "activa": true, "color": "#16A34A", "saldoInicial": 335.05 }
  ],
  "categorias": [
    { "id": "cat-alquiler", "nombre": "Alquiler", "tipo": "gasto", "color": "#ef4444" },
    { "id": "cat-comida", "nombre": "Comida", "tipo": "gasto", "color": "#f97316" },
    { "id": "cat-sueldo", "nombre": "Sueldo/Nómina", "tipo": "ingreso", "color": "#10b981" }
  ],
  "fuentesIngreso": [
    { "id": "src-claret", "nombre": "Claret" },
    { "id": "src-maristas", "nombre": "Maristas" },
    { "id": "src-academia", "nombre": "Academia" },
    { "id": "src-particulares", "nombre": "Clases Particulares" }
  ],
  "movimientos": [
    {
      "id": "mov-1724500000000",
      "fecha": "2026-08-25",
      "tipo": "transferencia",
      "cuentaOrigen": "acc-santander",
      "cuentaDestino": "acc-trade",
      "importe": 60.00,
      "categoria": "Inversiones",
      "comentario": "Transferencia mensual fija"
    }
  ]
}
```

---

## 🚀 Despliegue en Vercel & Ejecución Local

### Opción 1: Ejecutar Localmente
Haz doble clic en `start.bat` o ejecuta:
```bash
python start_server.py
```
Abre la URL local en tu navegador (ej. `http://localhost:8000`).

### Opción 2: Despliegue en Vercel
1. Conecta este repositorio a tu cuenta de Vercel.
2. El proyecto se desplegará instantáneamente como una SPA estática sin necesidad de pasos complejos de build (usa la configuración nativa optimizada en `vercel.json`).

### 📲 Instalación como PWA en iPhone / iPad (Safari):
1. Abre la URL en Safari.
2. Pulsa el botón **Compartir** (icono de cuadrado con flecha hacia arriba).
3. Selecciona **"Añadir a pantalla de inicio"** (*Add to Home Screen*).
4. La aplicación se abrirá a pantalla completa como una app nativa con funcionamiento offline 24/7.
