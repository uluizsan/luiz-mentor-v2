
import MockFirebase from '../services/MockFirebase.js';

const CONSEQUENCES = [
    { text: "Perda de 2h de Prospecção", severity: "high" },
    { text: "Resetar Progresso da Semana", severity: "critical" },
    { text: "Assistir novela por 3h (Tortura)", severity: "medium" },
    { text: "Doar R$ 50,00 para caridade", severity: "low" }
];

export default {
    show() {
        const overlay = document.createElement('div');
        overlay.id = 'panic-modal';
        overlay.style.position = 'fixed';
        overlay.style.inset = '0';
        overlay.style.backgroundColor = '#1a0505'; // Dark Red
        overlay.style.zIndex = '1000';
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.justifyContent = 'center';
        overlay.style.padding = '20px';

        // Randomly pick 2 consequences
        const picked = CONSEQUENCES.sort(() => 0.5 - Math.random()).slice(0, 2);

        overlay.innerHTML = `
            <div class="fade-in" style="text-align: center;">
                <i data-lucide="alert-triangle" style="color: var(--color-danger); width: 64px; height: 64px; margin-bottom: 20px;"></i>
                <h2 style="color: var(--color-danger); font-size: 2rem; margin-bottom: 30px; text-transform:uppercase;">Zona de Perigo</h2>
                
                <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 12px; border: 1px solid var(--color-danger); margin-bottom: 40px; text-align: left;">
                    <p class="text-muted text-xs" style="margin-bottom:10px; text-transform:uppercase;">Custo da Desistência:</p>
                    ${picked.map(c => `
                        <p style="margin-bottom: 15px; display: flex; align-items: center; gap: 10px; font-size: 1.1rem;">
                            <i data-lucide="minus-circle" style="color: var(--color-danger)"></i>
                            ${c.text}
                        </p>
                    `).join('')}
                </div>

                <div style="display: flex; flex-direction: column; gap: 15px;">
                    <button id="btn-resist" class="btn btn-primary" style="background: white; color: black; height: 56px;">
                        RESISTIR E LUTAR
                        <i data-lucide="shield"></i>
                    </button>
                    <button id="btn-fail" class="btn btn-ghost" style="color: var(--color-text-muted); opacity: 0.6;">
                        Aceitar Fracasso
                    </button>
                    <button id="btn-close-modal" class="btn btn-ghost" style="margin-top:20px;">
                        Voltar
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        window.lucide.createIcons();

        const close = () => document.body.removeChild(overlay);

        document.getElementById('btn-close-modal').onclick = close;

        document.getElementById('btn-resist').onclick = async () => {
            await MockFirebase.logConsequence('win', 'Resistiu ao botão de pânico');
            close();
            window.app.navigate('scoreboard');
        };

        document.getElementById('btn-fail').onclick = async () => {
            await MockFirebase.logConsequence('fail', `Aceitou: ${picked[0].text}`);
            close();
            window.app.navigate('scoreboard');
        };
    }
};
