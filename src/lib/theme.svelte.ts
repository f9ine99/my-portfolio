
export const themeState = $state({
    currentTheme: 'Macchiato',
    currentAccentColor: '#f5a97f',
    bgEffect: true
});

export const themePalettes: Record<string, Record<string, string>> = {
    Mocha: {
        '--bg-color': '#11111b',
        '--card-bg': '#1e1e2e',
        '--card-bg-elevated': '#181825',
        '--text-primary': '#cdd6f4',
        '--text-muted': '#7f849c',
        '--accent-orange': '#fab387',
        '--accent-blue': '#89b4fa',
        '--accent-purple': '#cba6f7',
        '--selection-bg': '#313244',
        '--scrollbar-thumb': '#585b70',
        '--nav-bg': 'rgba(17, 17, 27, 0.08)',
        '--card-hover': 'rgba(255, 255, 255, 0.03)'
    },
    Macchiato: {
        '--bg-color': '#1e2030',
        '--card-bg': '#24273a',
        '--card-bg-elevated': '#1e2030',
        '--text-primary': '#cad3f5',
        '--text-muted': '#8087a2',
        '--accent-orange': '#f5a97f',
        '--accent-blue': '#8aadf4',
        '--accent-purple': '#c6a0f6',
        '--selection-bg': '#363a4f',
        '--scrollbar-thumb': '#5b6078',
        '--nav-bg': 'rgba(30, 32, 48, 0.08)',
        '--card-hover': 'rgba(255, 255, 255, 0.03)'
    },
    Frappe: {
        '--bg-color': '#232634',
        '--card-bg': '#303446',
        '--card-bg-elevated': '#292c3c',
        '--text-primary': '#c6d0f5',
        '--text-muted': '#838ba7',
        '--accent-orange': '#ef9f76',
        '--accent-blue': '#8caaee',
        '--accent-purple': '#ca9ee6',
        '--selection-bg': '#414559',
        '--scrollbar-thumb': '#626880',
        '--nav-bg': 'rgba(35, 38, 52, 0.08)',
        '--card-hover': 'rgba(255, 255, 255, 0.03)'
    },
    Latte: {
        '--bg-color': '#eff1f5',
        '--card-bg': '#e6e9ef',
        '--card-bg-elevated': '#dce0e8',
        '--text-primary': '#4c4f69',
        '--text-muted': '#8c8fa1',
        '--accent-orange': '#fe640b',
        '--accent-blue': '#1e66f5',
        '--accent-purple': '#8839ef',
        '--selection-bg': '#ccd0da',
        '--scrollbar-thumb': '#bcc0cc',
        '--nav-bg': 'rgba(239, 241, 245, 0.08)',
        '--card-hover': 'rgba(0, 0, 0, 0.03)'
    }
};

export const themes = ['Latte', 'Frappe', 'Macchiato', 'Mocha'];

export const colors = [
    '#f5e0dc', '#f2cdcd', '#f5c2e7', '#cba6f7', '#f38ba8', '#eba0ac', '#fab387',
    '#f9e2af', '#a6e3a1', '#94e2d5', '#89dceb', '#74c7ec', '#89b4fa', '#b4befe'
];

export function applyTheme(themeName: string, persist = true) {
    themeState.currentTheme = themeName;
    const palette = themePalettes[themeName];
    if (palette) {
        themeState.currentAccentColor = palette['--accent-orange'];
        Object.entries(palette).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value);
        });
    }
    if (persist) {
        savePreferences();
    }
}

export function setAccentColor(color: string, persist = true) {
    themeState.currentAccentColor = color;
    document.documentElement.style.setProperty('--accent-orange', color);
    if (persist) {
        savePreferences();
    }
}

export function setBgEffect(value: boolean, persist = true) {
    themeState.bgEffect = value;
    if (persist) {
        savePreferences();
    }
}

function savePreferences() {
    try {
        localStorage.setItem('theme-prefs', JSON.stringify({
            theme: themeState.currentTheme,
            accent: themeState.currentAccentColor,
            bgEffect: themeState.bgEffect
        }));
    } catch { /* ignore */ }
}

export function loadSavedTheme() {
    try {
        const saved = localStorage.getItem('theme-prefs');
        if (!saved) {
            applyTheme(themeState.currentTheme, false);
            return;
        }

        const prefs = JSON.parse(saved) as {
            theme?: string;
            accent?: string;
            bgEffect?: boolean;
        };

        if (prefs.theme && themePalettes[prefs.theme]) {
            applyTheme(prefs.theme, false);
        } else {
            applyTheme(themeState.currentTheme, false);
        }

        if (prefs.accent) {
            setAccentColor(prefs.accent, false);
        }

        if (typeof prefs.bgEffect === 'boolean') {
            setBgEffect(prefs.bgEffect, false);
        }
    } catch {
        applyTheme(themeState.currentTheme, false);
    }
}
