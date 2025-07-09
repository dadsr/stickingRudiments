import React, { useState } from "react";
import MetronomeControl from "../../components/metronom/MetronomeControl";
import { MetronomeProvider } from "../../components/metronom/MetronomeContext";
import StickingVisualizer from "../../components/StickingVisualizer";
import { useLocalSearchParams } from "expo-router";
import StickingNotation from "../../components/StickingNotation";
import { Limb } from "../../modals/types";
import { Text } from "react-native-paper";
import {Pressable, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";

interface PatternParam {
    name: string;
    isKicks: boolean;
    tempo: number;
    pattern: Limb[];
    id: string;
}

export default function Practice() {
    const params = useLocalSearchParams();
    const patternData = JSON.parse(
        Array.isArray(params.pattern) ? params.pattern[0] : params.pattern
    ) as PatternParam;

    const { id, name, isKicks, pattern } = patternData;
    const INITIAL_COMPONENTS = [
        { key: 'metronome', component: <MetronomeControl /> },
        { key: 'visualizer', component: <StickingVisualizer isKicks={isKicks} /> },
        { key: 'notation', component: <StickingNotation pattern={pattern} /> },
    ];

    const [items, setItems] = useState(INITIAL_COMPONENTS);

    return (
        <SafeAreaProvider>
            <MetronomeProvider pattern={pattern}>
                <View style={{ flex: 1, padding: 16 }}>
                    <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
                        {name} (ID: {id})
                    </Text>
                    <DraggableFlatList
                        data={items}
                        onDragEnd={({ data }) => setItems(data)}
                        keyExtractor={item => item.key}
                        renderItem={({ item, drag, isActive }: RenderItemParams<any>) => (
                            <Pressable
                                style={{
                                    opacity: isActive ? 0.7 : 1,
                                    marginBottom: 16,
                                }}
                                onLongPress={drag}
                            >
                                {item.component}
                            </Pressable>
                        )}
                    />
                </View>
            </MetronomeProvider>
        </SafeAreaProvider>
    );
}
