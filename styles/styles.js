import {Platform, StyleSheet} from 'react-native';
import {theme} from './theme';

export const globalStyles = StyleSheet.create({
    screenBackground: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    card: {
        borderRadius: theme.roundness,
        backgroundColor: theme.colors.surface,
        margin: 8,
        padding: 12,
        elevation: 2,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingBottom: 20,
    },
    heading: {
        fontFamily: theme.typescale?.titleLarge?.fontFamily ?? 'System',
        fontWeight: theme.typescale?.titleLarge?.fontWeight ?? 'bold',
        fontSize: theme.typescale?.titleLarge?.fontSize ?? 22,
        color: theme.colors.primary,
        marginBottom: 10,
    },
    text: {
        fontFamily: theme.typescale?.bodyMedium?.fontFamily ?? 'System',
        fontWeight: theme.typescale?.bodyMedium?.fontWeight ?? 'normal',
        fontSize: theme.typescale?.bodyMedium?.fontSize ?? 16,
        color: theme.colors.text ?? theme.colors.onSurface ?? '#333',
    },
    accentText: {
        color: theme.colors.secondary ?? '#1976d2',
        fontWeight: 'bold',
        flexShrink: 1,
    },
    button: {
        marginVertical: 8,
        marginHorizontal: 4,
        borderRadius: theme.roundness,
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderWidth: 1,
        elevation: 1,
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.primary,
    },
    buttonSelected: {
        backgroundColor: theme.colors.onPrimaryContainer,
        borderColor: theme.colors.secondary,
    },
    buttonUnselected: {
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.primary,
    },
    buttonLabel: {
        fontSize: 12,
        color: theme.colors.primary,
        fontFamily: theme.typescale?.labelLarge?.fontFamily ?? 'System',
        fontWeight: 'normal',
    },
    buttonLabelSelected: {
        color: theme.colors.onPrimary,
        fontWeight: 'bold',
    },
    buttonLabelUnselected: {
        color: theme.colors.primary,
        fontWeight: 'normal',
    },

    divider: {
        height: 1,
        backgroundColor: theme.colors.outlineVariant ?? theme.colors.outline ?? '#ccc',
        marginVertical: 8,
    },
    icon: {
        color: theme.colors.primary,
        margin: 4,
    },
    input: {
        backgroundColor: theme.colors.surface,
        color: theme.colors.text ?? theme.colors.onSurface ?? '#111',
        borderRadius: theme.roundness,
        padding: 8,
        fontSize: theme.typescale?.bodyMedium?.fontSize ?? 16,
    },
    filtersContainer: {
        flexDirection: 'column',
        backgroundColor: theme.colors.primaryContainer,
        width: '100%',
        padding: 8,
        elevation: 2,
    },
    filterTitle: {
        padding: 10,
        color: theme.colors.onPrimaryContainer,
        fontWeight: 'bold',
        fontSize: theme.typescale?.titleSmall?.fontSize ?? 16,
        fontFamily: theme.typescale?.titleSmall?.fontFamily ?? 'System',
    },
    scrollViewContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 5,
    },
    header: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 35,
        backgroundColor:theme.colors.onPrimary,
        borderBottomWidth: 2,
        borderBottomColor: theme.colors.outline ?? 'black',
    },
    unselectedContainer: {
        flexDirection: 'column',
        backgroundColor: theme.colors.primaryContainer,
        width: '100%',
        padding: 8,
        borderRadius: theme.roundness,
        marginVertical: 8,
        elevation: 2,
        shadowColor: theme.colors.shadow ?? '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    menuContainer: {
        height: 80,
        justifyContent: 'center',
        elevation: 1,
        backgroundColor: theme.colors.primaryContainer,
        borderColor: theme.colors.onPrimary,
    },
    scrollBar: Platform.select({
        paddingBottom: 8,
    }),



});

export const imageStyles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },
});
