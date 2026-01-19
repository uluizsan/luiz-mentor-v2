
import MockFirebase from '../services/MockFirebase.js';

export default {
    async render() {
        const data = await MockFirebase.getScoreboard();
        const container = document.createElement('div');
        container.className = 'fade-in';

        // Score Cards
        container.innerHTML = `
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 30px;">
                <div class="card" style="text-align:center; padding: 20px; border-color: var(--color-success);">
                    <i data-lucide="swords" style="color:var(--color-success); margin-bottom:10px;"></i>
                    <h2 style="font-size:2.5rem; line-height:1;">${data.wins}</h2>
                    <span class="text-xs text-muted">VITÓRIAS</span>
                </div>
                <div class="card" style="text-align:center; padding: 20px; border-color: var(--color-danger);">
                    <i data-lucide="skull" style="color:var(--color-danger); margin-bottom:10px;"></i>
                    <h2 style="font-size:2.5rem; line-height:1;">${data.fails}</h2>
                    <span class="text-xs text-muted">QUEDAS</span>
                </div>
            </div>
            
            <h3 style="margin-bottom:15px;">Histórico de Batalha</h3>
        `;

        // Logs List
        const list = document.createElement('div');
        if (data.logs.length === 0) {
            list.innerHTML = `<p class="text-muted text-center">Nenhum confronto registrado.</p>`;
        } else {
            data.logs.forEach(log => {
                const item = document.createElement('div');
                item.className = 'list-item';
                const isWin = log.outcome === 'win';

                item.innerHTML = `
                    <div>
                        <span class="text-xs ${isWin ? 'text-success' : 'text-danger'} font-bold">
                            ${isWin ? 'RESISTIU AO CAOS' : 'ACEITOU O FRACASSO'}
                        </span>
                        <p class="text-sm text-muted">${log.description}</p>
                    </div>
                    <span class="text-xs text-muted">${new Date(log.date).toLocaleDateString()}</span>
                `;
                // Add conditional color
                if (isWin) item.querySelector('.text-success').style.color = 'var(--color-success)';

                list.appendChild(item);
            });
        }

        container.appendChild(list);
        return container;
    }
};
