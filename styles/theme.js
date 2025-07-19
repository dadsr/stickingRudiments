import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
    ...DefaultTheme,
    roundness: 8,
    colors: {
        ...DefaultTheme.colors,
        primary: '#27548A',
        onPrimary: '#F5EEDC',
        primaryContainer: '#27548A',
        onPrimaryContainer: '#183B4E',
        secondary: '#DDA853',
        onSecondary: '#000000',
        background: '#FFFFFF',
        surface: '#FFFFFF',
    },
    // Only include typescale if it's present in DefaultTheme
    ...(DefaultTheme.typescale && {
        typescale: {
            ...DefaultTheme.typescale,
            bodyMedium: {
                ...DefaultTheme.typescale.bodyMedium,
                fontFamily: 'System',
                fontWeight: 'normal',
            },
            bodySmall: {
                ...DefaultTheme.typescale.bodySmall,
                fontFamily: 'System',
                fontWeight: 'normal',
            },
        },
    }),
};
