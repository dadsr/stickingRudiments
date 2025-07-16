import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const globalStyles = StyleSheet.create({
    screenBackground: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1976d2",
    },
    card: {
        margin: 8,
        borderRadius: 12,
        backgroundColor: "#f5f5f5",
    },


    heading: {
        fontFamily: theme.typescale?.titleLarge?.fontFamily || 'System',
        fontWeight: theme.typescale?.titleLarge?.fontWeight || 'bold',
        fontSize: theme.typescale?.titleLarge?.fontSize || 22,
        color: theme.colors.primary,
        marginBottom: 12,
    },
    text: {
        fontFamily: theme.typescale?.bodyMedium?.fontFamily || 'System',
        fontWeight: theme.typescale?.bodyMedium?.fontWeight || 'normal',
        fontSize: theme.typescale?.bodyMedium?.fontSize || 16,
        color: theme.colors.text || theme.colors.onSurface,
    },
    accentText: {
        color: theme.colors.accent,
        fontWeight: 'bold',
        flexShrink: 1,
    },
    card: {
        borderRadius: theme.roundness,
        backgroundColor: theme.colors.surface,
        margin: 8,
        padding: 12,
        elevation: 2,
    },
    button: {
        marginVertical: 8,
        marginHorizontal: 4,
        borderRadius: theme.roundness,
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.outlineVariant,
        marginVertical: 8,
    },
    icon: {
        color: theme.colors.primary,
        margin: 4,
    },
    input: {
        backgroundColor: theme.colors.surface,
        color: theme.colors.text || theme.colors.onSurface,
        borderRadius: theme.roundness,
        padding: 8,
        fontSize: theme.typescale?.bodyMedium?.fontSize || 16,
    },
});

export const imageStyles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: theme.roundness,
        overflow: 'hidden',
    },
});
