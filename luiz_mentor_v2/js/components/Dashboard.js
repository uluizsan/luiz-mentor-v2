
import TimelineWidget from './TimelineWidget.js';
import VoiceWidget from './VoiceWidget.js';
import PanicButton from './PanicButton.js';

export default {
    async render() {
        const container = document.createElement('div');
        container.className = 'dashboard fade-in';

        // 1. Timeline (Replaces single TaskWidget)
        container.appendChild(await TimelineWidget.render());

        // 2. Quick Actions Grid
        const grid = document.createElement('div');
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = '1fr 1fr';
        grid.style.gap = 'var(--spacing-md)';

        grid.appendChild(VoiceWidget.render());
        grid.appendChild(PanicButton.render());

        container.appendChild(grid);

        return container;
    }
};
