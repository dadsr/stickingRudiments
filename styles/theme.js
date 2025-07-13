import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#1976d2',          // Main brand color
        onPrimary: '#fff',           // Text/icons on primary
        primaryContainer: '#bbdefb', // Used for filled backgrounds
        onPrimaryContainer: '#0d47a1',

        secondary: '#6d4c41',
        onSecondary: '#fff',
        secondaryContainer: '#d7ccc8',
        onSecondaryContainer: '#3e2723',

        tertiary: '#00bfae',
        onTertiary: '#fff',
        tertiaryContainer: '#b2fef7',
        onTertiaryContainer: '#00695c',

        background: '#f5f5f5',       // App background
        onBackground: '#222',        // Text on background

        surface: '#fff',             // Card/sheet backgrounds
        onSurface: '#222',           // Text/icons on surface

        error: '#b00020',
        onError: '#fff',

        outline: '#bdbdbd',
        outlineVariant: '#e0e0e0',

        inverseSurface: '#212121',
        inverseOnSurface: '#fff',

        accent: '#e53935',           // For backwards compatibility (MD2)
        // Add any custom roles you want below
        success: '#43a047',
        warning: '#ffa000',
        info: '#0288d1',
    },
    roundness: 8,
    // typescale: {
    //     ...DefaultTheme.typescale,
    //     // bodyLarge: {
    //     //     ...DefaultTheme.typescale.bodyLarge,
    //     //     fontFamily: 'System',
    //     //     fontWeight: 'normal',
    //     // },
    //     bodyMedium: {
    //         ...DefaultTheme.typescale.bodyMedium,
    //         fontFamily: 'System',
    //         fontWeight: 'normal',
    //     },
    //     bodySmall: {
    //         ...DefaultTheme.typescale.bodySmall,
    //         fontFamily: 'System',
    //         fontWeight: 'normal',
    //     },
    // }
};
