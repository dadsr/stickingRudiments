import React, {useEffect, useMemo, useState} from "react";
import MetronomeControl from "../../components/metronom/MetronomeControl";
import {MetronomeProvider} from "../../components/metronom/MetronomeContext";
import {useLocalSearchParams} from "expo-router";
import {PatternNote} from "../../modals/types";
import {Button, Text} from "react-native-paper";
import {ImageBackground, Pressable, ScrollView, View} from "react-native";
import DraggableFlatList, {RenderItemParams,} from "react-native-draggable-flatlist";
import StickingVisualizer from "../../components/stickings/StickingVisualizer";
import StickingNotation from "../../components/stickings/StickingNotation";
import BeatCounter from "../../components/counters/BeatCounter";
import BarsCounter from "../../components/counters/BarsCounter";
import {containerImg} from "../../assets";
import {globalStyles, imageStyles} from "../../styles/styles";
import ComponentSelectionMenu from "../../components/menus/ComponentSelectionMenu";
import TabHeader from "../../components/menus/TabHeader";

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

const AVAILABLE_KEYS = [
    "visualizer",
    "notation",
    "beat counter",
    "bars counter"
];

export default function Practice() {
    const params = useLocalSearchParams();
    const patternJson = Array.isArray(params.pattern)
        ? params.pattern[0]
        : params.pattern;
    const [selectedKeys, setSelectedKeys] = useState<string[]>([...AVAILABLE_KEYS]);

    const [items, setItems] = useState<DraggableItem[]>([]);
    const [patternData, setPatternData] = useState<PatternParam | null>(null);

    useEffect(() => {
        if (patternJson) {
            const parsedData = JSON.parse(patternJson) as PatternParam;
            setPatternData(parsedData);

            const allComponents: DraggableItem[] = [
                {
                    key: 'visualizer',
                    component: <StickingVisualizer pattern={parsedData.pattern as PatternNote[]}/>
                },
                {
                    key: 'notation',
                    component: <StickingNotation pattern={parsedData.pattern as PatternNote[]}/>
                },
                {
                    key: 'beat counter',
                    component: <BeatCounter totalBeats={parsedData.pattern.length}/>
                },
                {
                    key: 'bars counter',
                    component: <BarsCounter/>
                },
            ];

            const items: DraggableItem[] = [
                {
                    key: "metronome",
                    component: <MetronomeControl initTempo={parsedData.tempo}/>,
                },
                ...allComponents.filter(c => selectedKeys.includes(c.key))
            ];
            setItems(items);
        }
    }, [patternJson, selectedKeys]);

    const memoPattern = useMemo(
        () => patternData?.pattern ?? [],
        [patternData?.pattern]
    );
    const initialTempo = patternData?.tempo ?? 0;

    const toggleKey = (key: string) => {
        setSelectedKeys((prev) =>
            prev.includes(key)
                ? prev.filter((k) => k !== key)
                : [...prev, key]
        );
    };

    if (!patternData) {
        return null;
    }

    return (
        <ImageBackground  source={containerImg}  style={imageStyles.background}    resizeMode="cover" >

            <TabHeader patternName={patternData.name} id={patternData.id} />

            <ComponentSelectionMenu availableKeys={AVAILABLE_KEYS} selectedKeys={selectedKeys} onToggle={toggleKey} />

            <MetronomeProvider key={patternData.id} pattern={memoPattern} initialTempo={initialTempo}>

                <View style={{flex: 1}}>
                    <DraggableFlatList
                        data={items}
                        onDragEnd={({data}) => setItems(data)}
                        keyExtractor={(item) => item.key}
                        renderItem={({item, drag, isActive}: RenderItemParams<any>) => (
                            <Pressable onLongPress={drag} disabled={isActive}>
                                {item.component}
                            </Pressable>
                        )}
                        contentContainerStyle={{paddingBottom: 25}}
                    />
                </View>

            </MetronomeProvider>
        </ImageBackground>
    );
}
