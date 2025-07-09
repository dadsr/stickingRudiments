import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="patterns"
                options={{
                    title: 'Patterns',
                    headerStyle: { backgroundColor: '#1976d2' }, // Header background color
                    headerTintColor: '#fff', // Header text/icon color
                    tabBarLabel: 'Patterns', // Tab label text
                    tabBarIcon: ({ color }) => <MaterialIcons name="view-list" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="practice"
                options={{
                    title: 'Practice',
                    headerShown: false,
                    headerStyle: { backgroundColor: 'rgba(171,179,210,0.89)' },
                    headerTintColor: '#fff',
                    tabBarLabel: 'Practice',
                    tabBarIcon: ({ color }) => <MaterialIcons name="school" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="setup"
                options={{
                    title: 'Setup',
                    headerStyle: { backgroundColor: '#1976d2' },
                    headerTintColor: '#fff',
                    tabBarLabel: 'Setup',
                    tabBarIcon: ({ color }) => <MaterialIcons name="build" size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}
