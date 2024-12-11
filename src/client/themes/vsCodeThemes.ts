export const vsCodeThemes: Record<number, any> = {
    1: {
        base: 'vs',
        inherit: true,
        rules: [
            { token: 'comment', foreground: '#808080', fontStyle: 'italic' }, // Gray comment
            { token: 'keyword', foreground: '#0000ff' }, // Blue keyword
            { token: 'string', foreground: '#008000' }, // Green string
            { token: 'variable', foreground: '#01ffab' }, // Light cyan variable
        ],
        colors: {
            'editor.background': '#00000000', // Transparent background
            'editor.lineHighlightBackground': '#f0f0f0', // Light gray highlight
            'editorCursor.foreground': '#000000', // Black cursor
        },
    },
    2: {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: 'comment', foreground: '#ffa500', fontStyle: 'italic' }, // Orange comment
            { token: 'keyword', foreground: '#ff007f' }, // Pink keyword
            { token: 'string', foreground: '#00ff00' }, // Bright green string
            { token: 'variable', foreground: '#01ffab' }, // Light cyan variable
        ],
        colors: {
            'editor.background': '#00000000', // Transparent background
            'editor.lineHighlightBackground': '#333333', // Dark gray highlight
            'editorCursor.foreground': '#ffffff', // White cursor
        },
    },
    3: {
        base: 'hc-light',
        inherit: true,
        rules: [
            { token: 'comment', foreground: '#ff6347', fontStyle: 'italic' }, // Tomato comment
            { token: 'keyword', foreground: '#8b0000' }, // Dark red keyword
            { token: 'string', foreground: '#006400' }, // Dark green string
            { token: 'variable', foreground: '#01ffab' }, // Light cyan variable
        ],
        colors: {
            'editor.background': '#00000000', // Transparent background
            'editor.lineHighlightBackground': '#ffebcd', // Blanched almond highlight
            'editorCursor.foreground': '#000000', // Black cursor
        },
    },
    4: {
        base: 'hc-black',
        inherit: true,
        rules: [
            { token: 'comment', foreground: '#ffff00', fontStyle: 'italic' }, // Yellow comment
            { token: 'keyword', foreground: '#ff4500' }, // Orange-red keyword
            { token: 'string', foreground: '#00ff7f' }, // Spring green string
            { token: 'variable', foreground: '#01ffab' }, // Light cyan variable
        ],
        colors: {
            'editor.background': '#00000000', // Transparent background
            'editor.lineHighlightBackground': '#444444', // Dark gray highlight
            'editorCursor.foreground': '#ffffff', // White cursor
        },
    },
};

export function getVsCodeTheme(themeNumber: number) {
    return vsCodeThemes[themeNumber] || vsCodeThemes[1];
}

export default getVsCodeTheme;
