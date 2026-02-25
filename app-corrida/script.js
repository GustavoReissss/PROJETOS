const form = document.querySelector('#rideForm');

const formatterMoney = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const formatterNumber = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function toNumber(value) {
  return Number.parseFloat(value) || 0;
}

function formatSummaryMinutes(totalMinutes) {
  const h = Math.floor(totalMinutes / 60);
  const m = Math.round(totalMinutes % 60);
  return `${h}h${m.toString().padStart(2, '0')}m`;
}

function renderCard(data) {
  const totalKm = data.kmEmbarque + data.kmViagem;
  const totalMin = data.minEmbarque + data.minViagem;

  const valorKm = totalKm > 0 ? data.valor / totalKm : 0;
  const valorHora = totalMin > 0 ? data.valor / (totalMin / 60) : 0;

  document.querySelector('#badgeApp').textContent = data.plataforma;
  document.querySelector('#tipoCorrida').textContent = data.tipo;
  document.querySelector('#valorCorrida').textContent = formatterMoney.format(data.valor);
  document.querySelector('#notaPassageiro').textContent = `★ ${data.nota}`;

  document.querySelector('#valorKm').textContent = formatterNumber.format(valorKm);
  document.querySelector('#valorHora').textContent = formatterNumber.format(valorHora);

  document.querySelector('#resumoTempoDistancia').textContent = `${formatSummaryMinutes(totalMin)} • ${totalKm.toFixed(2)}km`;

  document.querySelector('#resumoRota').textContent = `${data.minEmbarque} minutos (${data.kmEmbarque} km) até o embarque · Viagem de ${data.minViagem} minutos (${data.kmViagem} km)`;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = {
    plataforma: document.querySelector('#plataforma').value,
    tipo: document.querySelector('#tipo').value || 'UberX',
    valor: toNumber(document.querySelector('#valor').value),
    nota: document.querySelector('#nota').value || '-',
    minEmbarque: toNumber(document.querySelector('#minEmbarque').value),
    kmEmbarque: toNumber(document.querySelector('#kmEmbarque').value),
    minViagem: toNumber(document.querySelector('#minViagem').value),
    kmViagem: toNumber(document.querySelector('#kmViagem').value),
  };

  renderCard(data);
});

form.requestSubmit();
