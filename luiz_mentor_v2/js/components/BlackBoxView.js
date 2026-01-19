
import MockFirebase from '../services/MockFirebase.js';

export default {
    async render() {
        const container = document.createElement('div');
        container.className = 'fade-in';

        container.innerHTML = `
            <div style="margin-bottom: 20px;">
                <h2 style="color: var(--color-primary)">Caixa Preta</h2>
                <p class="text-muted text-sm">Registro de pensamentos e confissões.</p>
            </div>
        `;

        const list = document.createElement('div');
        const logs = await MockFirebase.getAudioLogs();

        if (logs.length === 0) {
            list.innerHTML = `<p class="text-muted" style="text-align:center; margin-top:50px;">A caixa está vazia.</p>`;
        } else {
            logs.forEach(log => {
                const item = document.createElement('div');
                item.className = 'list-item';

                const date = new Date(log.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
                const isInsight = log.tag === 'INSIGHT';

                item.innerHTML = `
                    <div style="flex: 1;">
                        <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                            <span class="text-xs text-muted">${date}</span>
                            <span class="tag ${isInsight ? 'insight' : 'victim'}">${log.tag}</span>
                        </div>
                        <p style="font-size:0.95rem;">"${log.text}"</p>
                    </div>
                    <button class="btn-icon">
                        <i data-lucide="play-circle" style="width:28px; height:28px; color: var(--color-text-secondary);"></i>
                    </button>
                `;
                list.appendChild(item);
            });
        }

        container.appendChild(list);
        return container;
    }
};
