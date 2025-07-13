import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="patterns"
                options={{
                    tabBarLabel: 'Patterns',
                    tabBarIcon: ({ color }) => <MaterialIcons name="view-list" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="practice"
                options={{
                    tabBarLabel: 'Practice',
                    tabBarIcon: ({ color }) => <MaterialIcons name="school" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="setup"
                options={{
                    tabBarLabel: 'Setup',
                    tabBarIcon: ({ color }) => <MaterialIcons name="build" size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}
