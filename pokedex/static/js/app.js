// =========================
// LOGIN
// =========================
async function login(username, password) {
  const res = await fetch('/api/token/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (data.access) {
    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);
    document.getElementById('loginModal').classList.add('hidden');
    loadPokemon();
  } else {
    alert('Usuario o contraseña incorrectos');
  }
}

// =========================
// FETCH CON JWT
// =========================
async function fetchWithAuth(url) {
  const token = localStorage.getItem('access');
  const res = await fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
}

// =========================
// CARGA DE POKÉMON (151 PRIMERA GENERACIÓN)
// =========================
async function loadPokemon() {
  const grid = document.getElementById('pokemonGrid');
  grid.innerHTML = '';

  for (let i = 1; i <= 151; i++) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const p = await res.json();

    const types = p.types.map(t => `
      <span class="inline-block mt-2 mr-2 px-3 py-1 text-sm rounded-full bg-red-100 text-red-800 font-medium">
        ${t.type.name}
      </span>
    `).join('');

    const statsHtml = p.stats.map(s => `
      <div class="flex justify-between text-gray-700 text-sm">
        <span class="capitalize">${s.stat.name}</span>
        <span>${s.base_stat}</span>
      </div>
    `).join('');

    const card = document.createElement('div');
    card.classList.add('pokemon-card', 'bg-white', 'rounded-2xl', 'shadow-lg', 'hover:shadow-2xl', 'transition', 'overflow-hidden', 'cursor-pointer');

    card.innerHTML = `
      <img src="${p.sprites.other['official-artwork'].front_default}" alt="${p.name}">
      <h3 class="text-lg font-bold text-gray-800 mt-2">#${p.id} ${p.name.charAt(0).toUpperCase() + p.name.slice(1)}</h3>
      ${types}
      <div class="mt-2 text-gray-600 text-sm">
        Altura: ${p.height / 10} m | Peso: ${p.weight / 10} kg
      </div>
      <div class="stats">
        ${statsHtml}
      </div>
    `;

    card.addEventListener('click', () => {
      document.querySelectorAll('.pokemon-card.active').forEach(c => c.classList.remove('active'));
      card.classList.toggle('active');
    });

    grid.appendChild(card);
  }
}

// =========================
// EVENTO PARA CERRAR TARJETA ACTIVA AL HACER CLIC FUERA
// =========================
document.addEventListener('click', (e) => {
  const activeCard = document.querySelector('.pokemon-card.active');
  if (!activeCard) return; // si no hay tarjeta abierta, no hacemos nada

  // si el clic NO fue dentro de la tarjeta activa
  if (!activeCard.contains(e.target)) {
    activeCard.classList.remove('active');
  }
});

// =========================
// EVENTOS LOGIN / LOGOUT
// =========================
document.getElementById('loginBtn').addEventListener('click', () => {
  const u = document.getElementById('username').value;
  const p = document.getElementById('password').value;
  login(u, p);
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.clear();
  document.getElementById('loginModal').classList.remove('hidden');
});

// =========================
// COMPROBAR SI HAY TOKEN GUARDADO
// =========================
if (localStorage.getItem('access')) {
  loadPokemon();
} else {
  document.getElementById('loginModal').classList.remove('hidden');
}