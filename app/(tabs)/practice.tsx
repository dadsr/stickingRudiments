import React, {useEffect, useState} from "react";
import MetronomeControl from "../../components/metronom/MetronomeControl";
import {MetronomeProvider} from "../../components/metronom/MetronomeContext";
import {useLocalSearchParams} from "expo-router";
import {PatternNote} from "../../modals/types";
import {Text} from "react-native-paper";
import {ImageBackground, Pressable, View} from "react-native";
import DraggableFlatList, {RenderItemParams,} from "react-native-draggable-flatlist";
import StickingVisualizer from "../../components/StickingVisualizer";
import StickingNotation from "../../components/StickingNotation";
import BeatCounter from "../../components/BeatCounter";
import BarsCounter from "../../components/BarsCounter";
import {containerImg} from "../../assets";
import {imageStyles} from "../../styles/styles";

interface PatternParam {
    id: string;
    name: string;
    isKicks: boolean;
    tempo: number;
    pattern: PatternNote[];
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
                    key: 'bars counter',
                    component: <BarsCounter />
                },
                {
                    key: 'beat counter',
                    component: <BeatCounter totalBeats={parsedData.pattern.length} />
                },
                {
                    key: 'visualizer',
                    component: <StickingVisualizer pattern={parsedData.pattern as PatternNote[]} />
                },
                {
                    key: 'notation',
                    component: <StickingNotation pattern={parsedData.pattern as PatternNote[]} />
                },
            ];
            setItems(newComponents);
        }
    }, [patternJson]);

    if (!patternData) {
        return null;
    }

    return (
        <ImageBackground
            source={containerImg}
            style={imageStyles.background}
            resizeMode="cover"
        >
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
                    contentContainerStyle={{ paddingBottom: 50, paddingTop: 25 }}
                />
            </View>
        </MetronomeProvider>
        </ImageBackground>
    );
}
