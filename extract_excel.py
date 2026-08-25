import zipfile
import xml.etree.ElementTree as ET
import datetime
import re
import json

excel_path = r'C:\Users\huawei\Desktop\Dinero 2026.xlsx'
z = zipfile.ZipFile(excel_path, 'r')

ss_xml = ET.fromstring(z.read('xl/sharedStrings.xml'))
strings = [''.join([node.text for node in si.iter() if node.text]) for si in ss_xml.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si')]

wb_rels = {r.attrib['Id']: r.attrib['Target'] for r in ET.fromstring(z.read('xl/_rels/workbook.xml.rels')).findall('{http://schemas.openxmlformats.org/package/2006/relationships}Relationship')}
wb_xml = ET.fromstring(z.read('xl/workbook.xml'))
sheets = {s.attrib['name']: wb_rels[s.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')] for s in wb_xml.findall('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}sheet')}

def col_letter(ref): return re.match(r'([A-Z]+)', ref).group(1)

def excel_date(val, default_date='2026-01-01'):
    if not val or not str(val).strip(): return default_date
    try:
        n = float(val)
        if 30000 <= n <= 60000:
            return (datetime.datetime(1899, 12, 30) + datetime.timedelta(days=int(n))).strftime('%Y-%m-%d')
        return str(val).strip()
    except:
        return str(val).strip()

def extract_rows(sheet_name):
    target = sheets[sheet_name]
    target_path = 'xl/' + target if not target.startswith('xl/') else target
    sheet_xml = ET.fromstring(z.read(target_path))
    rows = {}
    for r in sheet_xml.findall('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}row'):
        r_idx = int(r.attrib['r'])
        rows[r_idx] = {}
        for c in r.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}c'):
            ref = c.attrib.get('r')
            col = col_letter(ref)
            t = c.attrib.get('t')
            v_tag = c.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}v')
            val = v_tag.text if v_tag is not None else None
            if t == 's' and val is not None:
                val = strings[int(val)]
            rows[r_idx][col] = val
    return rows

account_map = {
    'santander': 'acc-santander',
    'bbva': 'acc-bbva',
    'imagin': 'acc-bbva',
    'sabadell': 'acc-sab-ahorro',
    'sabadell ahorro': 'acc-sab-ahorro',
    'ahorro': 'acc-sab-ahorro',
    'sabadell irpf': 'acc-sab-irpf',
    'irpf': 'acc-sab-irpf',
    'trade republic': 'acc-trade',
    'trade': 'acc-trade',
    'efectivo': 'acc-efectivo',
    'metalico': 'acc-efectivo'
}

def map_acc(name, cat='', comment=''):
    n = (name or '').strip().lower()
    c = (cat or '').strip().lower()
    cm = (comment or '').strip().lower()
    if 'irpf' in n or 'irpf' in c or 'irpf' in cm: return 'acc-sab-irpf'
    if 'ahorro' in n: return 'acc-sab-ahorro'
    for k, v in account_map.items():
        if k in n: return v
    return 'acc-santander'

# Months configuration: November 2025 through August 2026
months_info = [
    ('NOVIEMBRE', '2025-11-01'),
    ('DICIEMBRE', '2025-12-01'),
    ('ENERO26', '2026-01-01'),
    ('FEBRERO26', '2026-02-01'),
    ('MARZO26', '2026-03-01'),
    ('ABRIL26', '2026-04-01'),
    ('MAYO26', '2026-05-01'),
    ('JUNIO26', '2026-06-01'),
    ('JULIO26', '2026-07-01'),
    ('AGOSTO26', '2026-08-01')
]

all_movs = []
id_counter = 1724500000000

for s_name, m_start_date in months_info:
    if s_name not in sheets: continue
    rows = extract_rows(s_name)
    last_date = m_start_date

    salaries = {}
    for r_idx in range(11, 16):
        if r_idx in rows:
            src_name = (rows[r_idx].get('A') or '').strip()
            val = rows[r_idx].get('B')
            if src_name in ['Maristas', 'Claret', 'Academia'] and val:
                try:
                    num_val = float(val)
                    if num_val > 0: salaries[src_name] = num_val
                except: pass

    for src, amt in salaries.items():
        id_counter += 1000
        all_movs.append({
            'id': f'mov-{id_counter}',
            'fecha': m_start_date,
            'tipo': 'ingreso',
            'cuentaDestino': 'acc-santander',
            'importe': round(amt, 2),
            'categoria': 'Sueldo/Nómina',
            'comentario': f'Nómina {src}'
        })

    if 15 in rows and rows[15].get('A') == 'TOTAL':
        irpf_val = rows[15].get('C')
        ahorro_val = rows[15].get('D')
        try:
            irpf_amt = float(irpf_val) if irpf_val else 0.0
            ahorro_amt = float(ahorro_val) if ahorro_val else 0.0
            if irpf_amt > 0:
                id_counter += 1000
                all_movs.append({
                    'id': f'mov-{id_counter}',
                    'fecha': m_start_date,
                    'tipo': 'transferencia',
                    'cuentaOrigen': 'acc-santander',
                    'cuentaDestino': 'acc-sab-irpf',
                    'importe': round(irpf_amt, 2),
                    'categoria': 'Reparto Sueldo',
                    'comentario': 'IRPF (18%) a Sabadell IRPF'
                })
            if ahorro_amt > 0:
                id_counter += 1000
                all_movs.append({
                    'id': f'mov-{id_counter}',
                    'fecha': m_start_date,
                    'tipo': 'transferencia',
                    'cuentaOrigen': 'acc-santander',
                    'cuentaDestino': 'acc-sab-ahorro',
                    'importe': round(ahorro_amt, 2),
                    'categoria': 'Reparto Sueldo',
                    'comentario': 'Ahorro (50%) a Sabadell Ahorro'
                })
        except: pass

    raw_sheet_rows = []
    for r_idx in sorted(rows.keys()):
        if r_idx == 1: continue
        r = rows[r_idx]
        if s_name == 'NOVIEMBRE':
            fecha_raw = r.get('I')
            tipo_raw = r.get('J')
            cuenta_raw = r.get('K')
            cat_raw = r.get('L')
            monto_raw = r.get('M')
            coment_raw = r.get('N')
        else:
            fecha_raw = r.get('J')
            tipo_raw = r.get('K')
            cuenta_raw = r.get('L')
            cat_raw = r.get('M')
            monto_raw = r.get('N')
            coment_raw = r.get('O')

        if not tipo_raw or not monto_raw: continue
        t_clean = str(tipo_raw).strip().lower()
        if not any(x in t_clean for x in ['gasto', 'ingreso', 'transf', 'inver']): continue
        
        if fecha_raw and str(fecha_raw).strip():
            parsed_d = excel_date(fecha_raw, last_date)
            if len(parsed_d) == 10 and parsed_d.startswith('202'):
                last_date = parsed_d
        
        try: monto = float(monto_raw)
        except: continue
            
        raw_sheet_rows.append({
            'row': r_idx,
            'fecha': last_date if len(last_date) == 10 else m_start_date,
            'tipo': t_clean,
            'cuenta': (cuenta_raw or '').strip(),
            'categoria': (cat_raw or '').strip(),
            'monto': monto,
            'comentario': (coment_raw or '').strip()
        })
    
    i = 0
    while i < len(raw_sheet_rows):
        cur = raw_sheet_rows[i]
        t = cur['tipo']
        if ('transf' in t or 'inver' in t) and i + 1 < len(raw_sheet_rows):
            nxt = raw_sheet_rows[i+1]
            if ('transf' in nxt['tipo'] or 'inver' in nxt['tipo']) and abs(cur['monto'] + nxt['monto']) < 0.01:
                if cur['monto'] < 0: orig_row, dest_row = cur, nxt
                else: orig_row, dest_row = nxt, cur
                orig_acc = map_acc(orig_row['cuenta'], orig_row['categoria'], orig_row['comentario'])
                dest_acc = map_acc(dest_row['cuenta'], dest_row['categoria'], dest_row['comentario'])
                if 'inver' in t or 'trade' in dest_row['cuenta'].lower(): dest_acc = 'acc-trade'
                cat = cur['categoria'] or nxt['categoria'] or ('Inversiones' if 'inver' in t else '')
                com = cur['comentario'] or nxt['comentario'] or ''
                id_counter += 1000
                all_movs.append({
                    'id': f'mov-{id_counter}',
                    'fecha': cur['fecha'],
                    'tipo': 'transferencia',
                    'cuentaOrigen': orig_acc,
                    'cuentaDestino': dest_acc,
                    'importe': round(abs(cur['monto']), 2),
                    'categoria': cat,
                    'comentario': com
                })
                i += 2
                continue
        
        id_counter += 1000
        if 'gasto' in t or (cur['monto'] < 0 and 'ingreso' not in t and 'transf' not in t):
            acc = map_acc(cur['cuenta'], cur['categoria'], cur['comentario'])
            all_movs.append({
                'id': f'mov-{id_counter}',
                'fecha': cur['fecha'],
                'tipo': 'gasto',
                'cuentaOrigen': acc,
                'importe': round(abs(cur['monto']), 2),
                'categoria': cur['categoria'] or 'Otros Gastos',
                'comentario': cur['comentario']
            })
        elif 'ingreso' in t or (cur['monto'] > 0 and 'transf' not in t and 'inver' not in t):
            acc = map_acc(cur['cuenta'], cur['categoria'], cur['comentario'])
            cat = cur['categoria'] or 'Otros Ingresos'
            all_movs.append({
                'id': f'mov-{id_counter}',
                'fecha': cur['fecha'],
                'tipo': 'ingreso',
                'cuentaDestino': acc,
                'importe': round(abs(cur['monto']), 2),
                'categoria': cat,
                'comentario': cur['comentario']
            })
        elif 'transf' in t or 'inver' in t:
            is_neg = cur['monto'] < 0
            acc = map_acc(cur['cuenta'], cur['categoria'], cur['comentario'])
            if 'inver' in t:
                orig_acc = acc if is_neg else 'acc-santander'
                dest_acc = 'acc-trade' if is_neg else acc
            else:
                orig_acc = acc if is_neg else 'acc-santander'
                dest_acc = 'acc-bbva' if is_neg and acc == 'acc-santander' else ('acc-santander' if is_neg else acc)
            
            all_movs.append({
                'id': f'mov-{id_counter}',
                'fecha': cur['fecha'],
                'tipo': 'transferencia',
                'cuentaOrigen': orig_acc,
                'cuentaDestino': dest_acc,
                'importe': round(abs(cur['monto']), 2),
                'categoria': cur['categoria'] or ('Inversiones' if 'inver' in t else ''),
                'comentario': cur['comentario']
            })
        i += 1

# SORT DESCENDING (most recent first: August 2026 down to November 2025)
all_movs.sort(key=lambda m: (m['fecha'], m['id']), reverse=True)

# Initial balances as of Nov 1, 2025
cuentas = [
    { 'id': 'acc-santander', 'nombre': 'Santander', 'tipo': 'banco', 'activa': True, 'incluirEnTotal': True, 'color': '#DC2626', 'saldoInicial': 145.30 },
    { 'id': 'acc-bbva', 'nombre': 'BBVA', 'tipo': 'banco', 'activa': True, 'incluirEnTotal': True, 'color': '#1E3A8A', 'saldoInicial': 180.69 },
    { 'id': 'acc-sab-ahorro', 'nombre': 'Sabadell Ahorro', 'tipo': 'banco', 'activa': True, 'incluirEnTotal': True, 'color': '#0284C7', 'saldoInicial': 1143.97 },
    { 'id': 'acc-sab-irpf', 'nombre': 'Sabadell IRPF', 'tipo': 'banco', 'activa': True, 'incluirEnTotal': False, 'color': '#0EA5E9', 'saldoInicial': 202.04 },
    { 'id': 'acc-trade', 'nombre': 'Trade Republic', 'tipo': 'inversion', 'activa': True, 'incluirEnTotal': True, 'color': '#18181B', 'saldoInicial': 1031.55 },
    { 'id': 'acc-efectivo', 'nombre': 'Efectivo', 'tipo': 'metalico', 'activa': True, 'incluirEnTotal': True, 'color': '#16A34A', 'saldoInicial': 260.00 }
]

categorias = [
    { 'id': 'cat-alquiler', 'nombre': 'Alquiler', 'tipo': 'gasto', 'color': '#ef4444' },
    { 'id': 'cat-comida', 'nombre': 'Comida', 'tipo': 'gasto', 'color': '#f97316' },
    { 'id': 'cat-comer-fuera', 'nombre': 'Comer Fuera', 'tipo': 'gasto', 'color': '#eab308' },
    { 'id': 'cat-cervezas', 'nombre': 'Cervezas', 'tipo': 'gasto', 'color': '#84cc16' },
    { 'id': 'cat-carnet', 'nombre': 'Carnet de Conducir', 'tipo': 'gasto', 'color': '#06b6d4' },
    { 'id': 'cat-suscripciones', 'nombre': 'Suscripciones', 'tipo': 'gasto', 'color': '#6366f1' },
    { 'id': 'cat-planes', 'nombre': 'Planes', 'tipo': 'gasto', 'color': '#a855f7' },
    { 'id': 'cat-regalos', 'nombre': 'Regalos', 'tipo': 'gasto', 'color': '#ec4899' },
    { 'id': 'cat-ropa', 'nombre': 'Ropa', 'tipo': 'gasto', 'color': '#f43f5e' },
    { 'id': 'cat-inversiones', 'nombre': 'Inversiones', 'tipo': 'gasto', 'color': '#10b981' },
    { 'id': 'cat-universidad', 'nombre': 'Universidad', 'tipo': 'gasto', 'color': '#3b82f6' },
    { 'id': 'cat-utilidad', 'nombre': 'Utilidad', 'tipo': 'gasto', 'color': '#64748b' },
    { 'id': 'cat-viajes', 'nombre': 'Viajes', 'tipo': 'gasto', 'color': '#14b8a6' },
    { 'id': 'cat-fisio', 'nombre': 'Fisio', 'tipo': 'gasto', 'color': '#d946ef' },
    { 'id': 'cat-caprichos', 'nombre': 'Caprichos', 'tipo': 'gasto', 'color': '#f59e0b' },
    { 'id': 'cat-compartida', 'nombre': 'Cuenta compartida', 'tipo': 'gasto', 'color': '#8b5cf6' },
    { 'id': 'cat-sueldo', 'nombre': 'Sueldo/Nómina', 'tipo': 'ingreso', 'color': '#10b981' },
    { 'id': 'cat-clases', 'nombre': 'Clases Particulares', 'tipo': 'ingreso', 'color': '#059669' },
    { 'id': 'cat-bizum-madre', 'nombre': 'Bizum Madre', 'tipo': 'ingreso', 'color': '#db2777' },
    { 'id': 'cat-ventas', 'nombre': 'Ventas', 'tipo': 'ingreso', 'color': '#0284c7' },
    { 'id': 'cat-otros-gastos', 'nombre': 'Otros Gastos', 'tipo': 'gasto', 'color': '#64748b' },
    { 'id': 'cat-otros-ingresos', 'nombre': 'Otros Ingresos', 'tipo': 'ingreso', 'color': '#10b981' }
]

fuentes_ingreso = [
    { 'id': 'src-claret', 'nombre': 'Claret', 'importeDefecto': 1508.53 },
    { 'id': 'src-maristas', 'nombre': 'Maristas', 'importeDefecto': 603.39 },
    { 'id': 'src-academia', 'nombre': 'Academia', 'importeDefecto': 346.44 },
    { 'id': 'src-particulares', 'nombre': 'Clases Particulares', 'importeDefecto': 0.00 }
]

data_output = {
    'version': '1.1',
    'clientUpdated': datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
    'config': {
        'repartoSueldo': {
            'irpf': 0.18,
            'ahorro': 0.50,
            'gasto': 0.32
        },
        'inversionFija': 60.00,
        'gastosFijosDefecto': [
            { 'nombre': 'Alquiler + Gastos Casa', 'categoria': 'Alquiler', 'cuenta': 'acc-santander', 'importe': 325.00 },
            { 'nombre': 'Spotify', 'categoria': 'Suscripciones', 'cuenta': 'acc-santander', 'importe': 6.49 },
            { 'nombre': 'Basic Fit', 'categoria': 'Suscripciones', 'cuenta': 'acc-santander', 'importe': 24.99 },
            { 'nombre': 'AppleCare+', 'categoria': 'Suscripciones', 'cuenta': 'acc-santander', 'importe': 5.49 }
        ]
    },
    'cuentas': cuentas,
    'categorias': categorias,
    'fuentesIngreso': fuentes_ingreso,
    'movimientos': all_movs
}

with open(r'g:\Mi unidad\Finanzas 2026\data.json', 'w', encoding='utf-8') as f:
    json.dump(data_output, f, indent=2, ensure_ascii=False)

print(f"Extracción completada con éxito: {len(all_movs)} movimientos escritos en data.json (Ordenados de más reciente a más antiguo)")

balances = {c['id']: c['saldoInicial'] for c in cuentas}
for m in all_movs:
    imp = m['importe']
    if m['tipo'] == 'gasto': balances[m['cuentaOrigen']] -= imp
    elif m['tipo'] == 'ingreso': balances[m['cuentaDestino']] += imp
    elif m['tipo'] == 'transferencia':
        balances[m['cuentaOrigen']] -= imp
        balances[m['cuentaDestino']] += imp

print("\n=== SALDOS EXACTOS CALCULADOS A 25 DE AGOSTO DE 2026 ===")
for c in cuentas:
    sin_total_txt = " [NO SUMA EN TOTAL]" if not c['incluirEnTotal'] else ""
    print(f"  {c['nombre']}: {balances[c['id']]:.2f} EUR{sin_total_txt}")

patrimonio_total = sum(balances[c['id']] for c in cuentas if c['activa'])
patrimonio_sin_irpf = sum(balances[c['id']] for c in cuentas if c['activa'] and c['incluirEnTotal'])
print(f"\nPATRIMONIO TOTAL (todas las cuentas): {patrimonio_total:.2f} EUR")
print(f"PATRIMONIO TOTAL DISPONIBLE (excluyendo Sabadell IRPF): {patrimonio_sin_irpf:.2f} EUR")
