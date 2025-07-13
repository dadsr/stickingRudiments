import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { theme } from "../styles/theme";

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PaperProvider theme={theme}>
                <SafeAreaProvider>
                    <Stack screenOptions={{ headerShown: false }} />
                </SafeAreaProvider>
            </PaperProvider>
        </GestureHandlerRootView>
    );
}
