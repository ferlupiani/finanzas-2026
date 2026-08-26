import urllib.request
import json
import time

url = 'https://nutriplan-2c75e-default-rtdb.europe-west1.firebasedatabase.app/finanzas.json'
req = urllib.request.Request(url)
with urllib.request.urlopen(req) as response:
    cloud_data = json.loads(response.read().decode('utf-8'))

# Check if acc-myinvestor exists
cuentas = cloud_data.get('cuentas', [])
myinvestor_exists = any(c['id'] == 'acc-myinvestor' for c in cuentas)
if not myinvestor_exists:
    cuentas.append({
        'id': 'acc-myinvestor',
        'nombre': 'MyInvestor',
        'tipo': 'inversion',
        'activa': True,
        'incluirEnTotal': False,
        'color': '#8B5CF6',
        'saldoInicial': 0.00
    })

# Ensure acc-trade, acc-myinvestor, acc-sab-irpf have incluirEnTotal: False
for c in cuentas:
    if c['id'] in ['acc-trade', 'acc-myinvestor', 'acc-sab-irpf']:
        c['incluirEnTotal'] = False

cloud_data['cuentas'] = cuentas

# Add the 200 EUR transfer from acc-sab-ahorro to acc-myinvestor
movs = cloud_data.get('movimientos', [])
transfer_exists = any(m.get('cuentaDestino') == 'acc-myinvestor' and m.get('importe') == 200 for m in movs)
if not transfer_exists:
    new_mov = {
        'id': f'mov-{int(time.time() * 1000)}',
        'fecha': '2026-08-26',
        'tipo': 'transferencia',
        'cuentaOrigen': 'acc-sab-ahorro',
        'cuentaDestino': 'acc-myinvestor',
        'importe': 200.00,
        'categoria': 'Inversiones',
        'comentario': 'Aportación a MyInvestor desde Sabadell'
    }
    movs.insert(0, new_mov)

cloud_data['movimientos'] = movs

# Update config default investment destination to acc-myinvestor
if 'config' not in cloud_data: cloud_data['config'] = {}
cloud_data['config']['cuentaInversionDefecto'] = 'acc-myinvestor'
cloud_data['config']['inversionFija'] = 200.00

# Save to local data.json
with open(r'g:\Mi unidad\Finanzas 2026\data.json', 'w', encoding='utf-8') as f:
    json.dump(cloud_data, f, ensure_ascii=False, indent=2)

# Sync to Firebase
put_req = urllib.request.Request(url, data=json.dumps(cloud_data).encode('utf-8'), headers={'Content-Type': 'application/json'}, method='PUT')
resp = urllib.request.urlopen(put_req)
print('Firebase update status:', resp.status)

# Calculate balances
bal = {c['id']: c['saldoInicial'] for c in cuentas}
for m in movs:
    imp = float(m['importe'])
    if m['tipo'] == 'gasto' and m['cuentaOrigen'] in bal:
        bal[m['cuentaOrigen']] -= imp
    elif m['tipo'] == 'ingreso' and m['cuentaDestino'] in bal:
        bal[m['cuentaDestino']] += imp
    elif m['tipo'] == 'transferencia':
        if m['cuentaOrigen'] in bal: bal[m['cuentaOrigen']] -= imp
        if m['cuentaDestino'] in bal: bal[m['cuentaDestino']] += imp

print('=== UPDATED ACCOUNT BALANCES ===')
for c in cuentas:
    print(c['nombre'] + ' (' + c['id'] + '): ' + str(round(bal[c['id']], 2)) + ' EUR (incluirEnTotal: ' + str(c['incluirEnTotal']) + ')')

total_disponible = sum(bal[c['id']] for c in cuentas if c['incluirEnTotal'])
total_inversion = sum(bal[c['id']] for c in cuentas if c['tipo'] == 'inversion')
saldo_irpf = bal.get('acc-sab-irpf', 0)
total_consolidado = sum(bal.values())

print(f'Total Disponible (Cuentas Operativas): {total_disponible:.2f} EUR')
print(f'Total Bloque Inversion (Trade Republic + MyInvestor): {total_inversion:.2f} EUR')
print(f'Sabadell IRPF: {saldo_irpf:.2f} EUR')
print(f'Total Consolidado General: {total_consolidado:.2f} EUR')
