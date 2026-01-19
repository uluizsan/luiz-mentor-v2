
import Dashboard from './components/Dashboard.js';
import BlackBoxView from './components/BlackBoxView.js';
import ScoreboardView from './components/ScoreboardView.js';
import RoutineService from './services/RoutineService.js';
import MockFirebase from './services/MockFirebase.js';

// Init Services
RoutineService.init();
MockFirebase.init();

class App {
    constructor() {
        this.mainContent = document.getElementById('main-content');
        this.sidebar = document.getElementById('sidebar');
        this.sidebarOverlay = document.getElementById('sidebar-overlay');
        this.currentRoute = 'dashboard';

        this.bindEvents();
        this.navigate('dashboard');
    }

    bindEvents() {
        // Sidebar Toggles
        document.getElementById('btn-menu').addEventListener('click', () => this.toggleSidebar(true));
        document.getElementById('btn-close-sidebar').addEventListener('click', () => this.toggleSidebar(false));
        this.sidebarOverlay.addEventListener('click', () => this.toggleSidebar(false));

        // Navigation
        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const route = e.currentTarget.dataset.route;
                this.navigate(route);
                this.toggleSidebar(false);
            });
        });
    }

    toggleSidebar(show) {
        if (show) {
            this.sidebar.classList.add('visible');
            this.sidebarOverlay.classList.remove('hidden');
            setTimeout(() => this.sidebarOverlay.classList.add('visible'), 10); // Fade in
        } else {
            this.sidebar.classList.remove('visible');
            this.sidebarOverlay.classList.remove('visible');
            setTimeout(() => this.sidebarOverlay.classList.add('hidden'), 300); // Wait for fade out
        }
    }

    async navigate(route) {
        this.currentRoute = route;

        // Update Active Nav State
        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.route === route);
        });

        // Clear Content
        this.mainContent.innerHTML = '';

        let view;
        switch (route) {
            case 'dashboard':
                view = await Dashboard.render();
                break;
            case 'blackbox':
                view = await BlackBoxView.render();
                break;
            case 'scoreboard':
                view = await ScoreboardView.render();
                break;
            default:
                view = await Dashboard.render();
        }

        this.mainContent.appendChild(view);
        if (window.lucide) window.lucide.createIcons();
    }
}

// Boot
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
