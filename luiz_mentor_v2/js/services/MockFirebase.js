
export default {
    init() {
        // Initialize Tasks
        if (!localStorage.getItem('tasks')) {
            const initialTasks = [
                { id: 101, title: 'Planejamento Semanal', context: 'DarkEmpire', status: 'completed', scheduled: new Date(Date.now() - 86400000).toISOString() },
                { id: 102, title: 'Finalizar Proposta V2', context: 'DarkEmpire', status: 'pending', scheduled: new Date().toISOString() },
                { id: 103, title: 'Treino de Jiu Jitsu', context: 'Funval', status: 'pending', scheduled: new Date(Date.now() + 7200000).toISOString() }
            ];
            localStorage.setItem('tasks', JSON.stringify(initialTasks));
        }

        // Initialize Audio Logs
        if (!localStorage.getItem('audio_logs')) {
            localStorage.setItem('audio_logs', JSON.stringify([
                { id: 1, date: new Date(Date.now() - 100000000).toISOString(), tag: 'INSIGHT', text: 'Ideia para escalar o tráfego pago...' },
                { id: 2, date: new Date(Date.now() - 50000000).toISOString(), tag: 'VITIMISMO', text: 'Reclamação sobre o cliente chato.' }
            ]));
        }

        // Initialize Scoreboard
        if (!localStorage.getItem('scoreboard')) {
            localStorage.setItem('scoreboard', JSON.stringify({ wins: 12, fails: 3, logs: [] }));
        }
    },

    // Tasks API
    async getTimeline() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const completed = tasks.filter(t => t.status === 'completed').pop(); // Last completed
        const pending = tasks.filter(t => t.status === 'pending');
        const current = pending[0];
        const next = pending[1];
        return { prev: completed, current, next };
    },

    async completeTask(taskId) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.map(t => t.id === taskId ? { ...t, status: 'completed' } : t);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        return true;
    },

    // Audio API
    async getAudioLogs() {
        return JSON.parse(localStorage.getItem('audio_logs')) || [];
    },

    async analyzeAudio(blob) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const isInsight = Math.random() > 0.4;
                const result = {
                    id: Date.now(),
                    date: new Date().toISOString(),
                    tag: isInsight ? 'INSIGHT' : 'VITIMISMO',
                    text: isInsight ? 'Nova ideia registrada.' : 'Registro de emoção processado.'
                };

                // Save
                const logs = JSON.parse(localStorage.getItem('audio_logs')) || [];
                logs.unshift(result);
                localStorage.setItem('audio_logs', JSON.stringify(logs));

                resolve(result);
            }, 1000);
        });
    },

    // Scoreboard API
    async getScoreboard() {
        return JSON.parse(localStorage.getItem('scoreboard'));
    },

    async logConsequence(outcome, description) {
        const score = JSON.parse(localStorage.getItem('scoreboard'));
        if (outcome === 'win') score.wins++;
        else score.fails++;

        score.logs.unshift({
            id: Date.now(),
            date: new Date().toISOString(),
            outcome,
            description
        });

        localStorage.setItem('scoreboard', JSON.stringify(score));
        return score;
    }
};
