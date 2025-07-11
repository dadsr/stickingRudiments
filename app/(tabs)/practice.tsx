import React, {useEffect, useState} from "react";
import MetronomeControl from "../../components/metronom/MetronomeControl";
import {MetronomeProvider} from "../../components/metronom/MetronomeContext";
import {useLocalSearchParams} from "expo-router";
import {Limb} from "../../modals/types";
import {Text} from "react-native-paper";
import {Pressable, View} from "react-native";
import DraggableFlatList, {RenderItemParams,} from "react-native-draggable-flatlist";
import StickingVisualizer from "../../components/StickingVisualizer";
import StickingNotation from "../../components/StickingNotation";
import BeatCounter from "../../components/BeatCounter";

interface PatternParam {
    name: string;
    isKicks: boolean;
    tempo: number;
    pattern: Limb[];
    id: string;
}
interface DraggableItem {
    key: string;
    component: React.JSX.Element;
}

export default function Practice() {
    const params = useLocalSearchParams();
    const patternJson = Array.isArray(params.pattern)
        ? params.pattern[0]
        : params.pattern;

    const [items, setItems] = useState<DraggableItem[]>([]);
    const [patternData, setPatternData] = useState<PatternParam | null>(null);

    useEffect(() => {
        if (patternJson) {
            const parsedData = JSON.parse(patternJson) as PatternParam;
            setPatternData(parsedData);

            const newComponents: DraggableItem[] = [
                {
                    key: "metronome",
                    component: <MetronomeControl initTempo={parsedData.tempo} />,
                },
                {
                    key: 'counter',
                    component: <BeatCounter totalBeats={parsedData.pattern.length} />
                },
                {
                    key: 'visualizer',
                    component: <StickingVisualizer pattern={parsedData.pattern as Limb[]} />
                },
                {
                    key: 'notation',
                    component: <StickingNotation pattern={parsedData.pattern as Limb[]} />
                },
            ];
            setItems(newComponents);
        }
    }, [patternJson]);

    if (!patternData) {
        return null;
    }

    return (

        <MetronomeProvider key={patternData.id} pattern={patternData.pattern}>
            <View style={{ flex: 1 }}>
                <Text>
                    {patternData.name} (ID: {patternData.id})
                </Text>
                <DraggableFlatList
                    data={items}
                    onDragEnd={({ data }) => setItems(data)}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item, drag, isActive }: RenderItemParams<any>) => (
                        <Pressable onLongPress={drag} disabled={isActive}>
                            {item.component}
                        </Pressable>
                    )}
                />
            </View>
        </MetronomeProvider>
    );
}
