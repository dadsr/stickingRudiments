import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="setup"
                options={{
                    title: 'Setup',
                    tabBarIcon: ({ color }) => <MaterialIcons name="build" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="practice"
                options={{
                    title: 'Practice',
                    tabBarIcon: ({ color }) => <MaterialIcons name="school" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="patterns"
                options={{
                    title: 'Patterns',
                    tabBarIcon: ({ color }) => <MaterialIcons name="view-list" size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}
