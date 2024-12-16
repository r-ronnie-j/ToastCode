export type ThemeColors = {
    generalContainer: string;
    generalText: string;
    alternativeContainer: string;
    alternativeText: string;
    primaryContainer: string;
    primaryText: string;
    secondaryContainer: string;
    secondaryText: string;
    tertiaryContainer: string;
    tertiaryText: string;
    errorContainer: string;
    errorText: string;
    warningContainer: string;
    warningText: string;
    highlightContainer: string;
    highlightText: string;
    hoverContainer: string;
    hoverText: string;
    primaryBorder: string;
    secondaryBorder: string;
    accentColor: string;
    infoColor: string;
    infoContainer: string;
    disabledColor: string;
    disabledContainer: string;
    successContainer: string;
    successText: string;
    simpleBorder: string;
};

export const themes: Record<number, ThemeColors> = {
    1: {
        generalContainer: "#FFFFFF",
        generalText: "#212529",
        alternativeContainer: "#E8F5E9",
        alternativeText: "#004d00",
        primaryContainer: "#4CAF50", // Green 
        primaryText: "#FFFFFF",
        secondaryContainer: "#C8E6C9",
        secondaryText: "#FFFFFF",
        tertiaryContainer: "#F8F9FA",
        tertiaryText: "#495057",
        errorText: "#FFCDD2",
        errorContainer: "#C62828",
        warningContainer: "#FFF3CD",
        warningText: "#856404",
        highlightContainer: "#A5D6A7",
        highlightText: "#1B5E20",
        hoverContainer: "#E0E0E0",
        hoverText: "#212529",
        primaryBorder: "#388E3C", // Darker green border
        secondaryBorder: "#4CAF50", // Green border for secondary elements
        simpleBorder: "#B0BEC5",
        accentColor: "#FFC107", // Amber accent color
        infoColor: "#81C784", // Light green info color
        infoContainer: "#E8F5E9", // Pale green background for info messages
        disabledColor: "#A6A6A6",
        disabledContainer: "#F8F9FA",
        successContainer: "#D1E7DD",
        successText: "#155724"
    },

    2: {
        generalContainer: "#1F1F1F",
        generalText: "#EAEAEA",
        alternativeContainer: "#2A2A2A",
        alternativeText: "#FFFFFF",
        primaryContainer: "#4CAF50",  // Green  
        primaryText: "#FFFFFF",
        secondaryContainer: "#4B4B4B",
        secondaryText: "#EAEAEA",
        tertiaryContainer: "#3C3C3C",
        tertiaryText: "#B0BEC5",
        errorText: "#FFCDD2",
        errorContainer: "#C62828",
        warningContainer: "#F78",
        warningText: "#FFFFFF",
        highlightContainer: "#388E3C",
        highlightText: "#FFFFFF",
        hoverContainer: "#66BB6A",
        hoverText: "#002208",
        primaryBorder: "#4CAF50",
        secondaryBorder: "#81C784",
        simpleBorder: "#616161",
        accentColor: "#81C784",
        infoColor: "#29B6F6",
        infoContainer: "#E1F5FE",
        disabledColor: "#757575",
        disabledContainer: "#424242",
        successText: "#C8E6C9",
        successContainer: "#388E3C"
    },

    // High Contrast Theme (remains unchanged)
    3: {
        generalContainer: '#121212',
        generalText: '#E0F2F1',
        alternativeContainer: '#1E1E1E',
        alternativeText: '#81D4FA',
        primaryContainer: '#009688',  // Teal 
        primaryText: '#FFFFFF',
        secondaryContainer: '#2E7D32',
        secondaryText: '#A5D6A7',
        tertiaryContainer: '#1B5E20',
        tertiaryText: '#C8E6C9',
        errorContainer: '#B71C1C',
        errorText: '#FFCCCB',
        warningContainer: '#FF6F00',
        warningText: '#FFF8E1',
        highlightContainer: '#00BFA5',  // Bright cyan as highlight 
        highlightText: '#FFFFFF',
        hoverContainer: '#263238',
        hoverText: '#A5D6A7',
        primaryBorder: '#009688',  // Teal border 
        secondaryBorder: '#66BB6A',
        simpleBorder: '#5C5C5C',
        accentColor: '#00E676',
        infoColor: '#29B6F6',
        infoContainer: '#1C313A',
        disabledColor: '#616161',
        disabledContainer: '#37474F',
        successContainer: '#388E3C',   // High contrast dark green background  
        successText: '#C8E6C9'          // Light green text on dark background 
    },

    // High Contrast Light Theme (remains unchanged)
    4: {
        generalContainer: '#F7F7F7', // Lighter background for overall container
        generalText: '#333333', // Dark text for better readability
        alternativeContainer: '#E1F5FE', // Soft blue background for alternative elements
        alternativeText: '#0277BD', // Strong blue text for contrast on light background
        primaryContainer: '#388E3C', // Strong green for primary container
        primaryText: '#FFFFFF', // White text for strong contrast on dark background
        secondaryContainer: '#A5D6A7', // Softer green background for secondary containers
        secondaryText: '#1B5E20', // Dark green for contrast on secondary background
        tertiaryContainer: '#F1F8E9', // Pale yellow-green background for tertiary containers
        tertiaryText: '#8BC34A', // Green text for visibility on light background
        errorContainer: '#D32F2F', // Strong red background for errors
        errorText: '#FFFFFF', // White text for contrast on red
        warningContainer: '#FFEB3B', // Bright yellow for warnings
        warningText: '#F57F17', // Dark yellow-orange for contrast on bright yellow
        highlightContainer: '#FFEE58', // Light yellow for highlight
        highlightText: '#1B5E20', // Dark green text for high contrast
        hoverContainer: '#B2EBF2', // Soft cyan for hover background
        hoverText: '#00796B', // Deep cyan text for hover state
        primaryBorder: '#66BB6A', // Softer green border for primary elements
        secondaryBorder: '#4CAF50', // Stronger green border for secondary elements
        simpleBorder: '#BDBDBD', // Neutral gray border for simple borders
        accentColor: '#FF7043', // Warm accent color (coral-orange) for standout elements
        infoColor: '#0288D1', // Strong blue for informational elements
        infoContainer: '#BBDEFB', // Soft blue background for informational containers
        disabledColor: '#BDBDBD', // Neutral gray for disabled elements
        disabledContainer: '#F5F5F5', // Light gray background for disabled elements
        successContainer: '#A5D6A7', // Softer light green for success background
        successText: '#388E3C' // Dark green text for high contrast on success elements
    }
};

export function getThemeColors(themeNumber: number): ThemeColors {
    return themes[themeNumber] || themes[1];
}

export default themes;