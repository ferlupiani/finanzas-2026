import json
import urllib.request
import datetime

# Targets from Excel sheet AGOSTO26 as of August 25, 2026
targets = {
    'acc-santander': 31.46,
    'acc-bbva': 283.51,
    'acc-sab-ahorro': 10243.10,
    'acc-sab-irpf': 3766.99,
    'acc-trade': 510.00,
    'acc-efectivo': 103.00
}

with open(r'g:\Mi unidad\Finanzas 2026\data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Calculate sum of all movements for each account
mov_deltas = {k: 0.0 for k in targets.keys()}
for m in data['movimientos']:
    imp = float(m['importe'])
    if m['tipo'] == 'gasto':
        if m['cuentaOrigen'] in mov_deltas:
            mov_deltas[m['cuentaOrigen']] -= imp
    elif m['tipo'] == 'ingreso':
        if m['cuentaDestino'] in mov_deltas:
            mov_deltas[m['cuentaDestino']] += imp
    elif m['tipo'] == 'transferencia':
        if m['cuentaOrigen'] in mov_deltas:
            mov_deltas[m['cuentaOrigen']] -= imp
        if m['cuentaDestino'] in mov_deltas:
            mov_deltas[m['cuentaDestino']] += imp

print('Movement deltas:', mov_deltas)

for c in data['cuentas']:
    acc_id = c['id']
    if acc_id in targets:
        c['saldoInicial'] = round(targets[acc_id] - mov_deltas[acc_id], 2)
        if acc_id == 'acc-sab-irpf':
            c['incluirEnTotal'] = False
        else:
            c['incluirEnTotal'] = True

# Verification
bal = {c['id']: c['saldoInicial'] for c in data['cuentas']}
for m in data['movimientos']:
    imp = float(m['importe'])
    if m['tipo'] == 'gasto': bal[m['cuentaOrigen']] -= imp
    elif m['tipo'] == 'ingreso': bal[m['cuentaDestino']] += imp
    elif m['tipo'] == 'transferencia':
        bal[m['cuentaOrigen']] -= imp
        bal[m['cuentaDestino']] += imp

print('\n=== VERIFIED BALANCES ON AUGUST 25, 2026 ===')
for c in data['cuentas']:
    acc_id = c['id']
    print(f"  {c['nombre']}: {bal[acc_id]:.2f} EUR (Target: {targets[acc_id]:.2f} EUR) -> Diff: {abs(bal[acc_id] - targets[acc_id]):.4f}")

data['clientUpdated'] = datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')

with open(r'g:\Mi unidad\Finanzas 2026\data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

# Sync with Firebase
url = 'https://nutriplan-2c75e-default-rtdb.europe-west1.firebasedatabase.app/finanzas.json'
json_bytes = json.dumps(data, ensure_ascii=False).encode('utf-8')
req = urllib.request.Request(url, data=json_bytes, headers={'Content-Type': 'application/json; charset=utf-8'}, method='PUT')
with urllib.request.urlopen(req) as resp:
    print('\nFirebase updated successfully! Status:', resp.status)
