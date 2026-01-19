
import MockFirebase from '../services/MockFirebase.js';

export default {
    async render() {
        const data = await MockFirebase.getTimeline();
        const container = document.createElement('div');
        container.className = 'timeline-container';

        // 1. Previous Task (If exists)
        if (data.prev) {
            container.innerHTML += `
                <div class="timeline-item past">
                    <div style="display:flex; justify-content:space-between;">
                        <span class="text-xs text-muted">CONCLUÍDO</span>
                        <i data-lucide="check" style="width:16px;"></i>
                    </div>
                    <h3 class="text-muted">${data.prev.title}</h3>
                </div>
            `;
        }

        // 2. Current Task (Hero)
        if (data.current) {
            const currentEl = document.createElement('div');
            currentEl.className = 'timeline-item current fade-in';
            currentEl.innerHTML = `
                <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                    <span class="tag">${data.current.context}</span>
                    <span class="text-xs text-danger font-bold">AGORA</span>
                </div>
                <h2 style="font-size:1.4rem; margin-bottom:15px; line-height:1.2;">
                    ${data.current.title}
                </h2>
                <button id="btn-complete" class="btn btn-primary">
                    MARCAR FEITO
                    <i data-lucide="check-circle-2"></i>
                </button>
            `;

            // Interaction
            setTimeout(() => {
                const btn = currentEl.querySelector('#btn-complete');
                if (btn) btn.onclick = async () => {
                    await MockFirebase.completeTask(data.current.id);
                    // Refresh Dashboard
                    window.app.navigate('dashboard');
                };
            }, 0);

            container.appendChild(currentEl);
        } else {
            // No Tasks
            container.innerHTML += `
                <div class="timeline-item current" style="text-align:center; padding: 40px;">
                    <i data-lucide="sun" style="width:40px; height:40px; color:var(--color-warning); margin-bottom:10px;"></i>
                    <h3>Tudo Limpo!</h3>
                    <p class="text-muted">Aproveite a liberdade.</p>
                </div>
            `;
        }

        // 3. Next Task (Preview)
        if (data.next) {
            container.innerHTML += `
                <div class="timeline-item next">
                    <span class="text-xs text-muted">EM BREVE</span>
                    <h3>${data.next.title}</h3>
                </div>
            `;
        }

        return container;
    }
};
