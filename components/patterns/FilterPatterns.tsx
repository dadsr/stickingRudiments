import { JSX } from "react";
import { Animated, View, Text } from "react-native";
import { Button } from "react-native-paper";
import { globalStyles } from "../../styles/styles";
import { Difficulty, Importance } from "../../modals/types";

const ScrollView = Animated.ScrollView;
const difficulties = ['very easy', 'easy', 'intermediate', 'difficult', 'crazy'] as const;
const importances = ['low', 'medium', 'high'] as const;

interface filtersProps {
    difficulty: Difficulty | null;
    setDifficulty: (d: Difficulty | null) => void;
    importance: Importance | null;
    setImportance: (i: Importance | null) => void;
}

export default function FilterPatterns({
                                           difficulty,
                                           setDifficulty,
                                           importance,
                                           setImportance,
                                       }: filtersProps): JSX.Element {

    return (
        <View style={{ paddingTop: 20 }}>
            <View style={globalStyles.filtersContainer}>
                <Text style={[globalStyles.accentText, { flexShrink: 1 }]}>Difficulty:</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={globalStyles.scrollViewContent}
                >
                    {difficulties.map(d => (
                        <Button
                            key={d}
                            mode={difficulty === d ? "contained" : "outlined"}
                            onPress={() => setDifficulty(difficulty === d ? null : d as Difficulty)}
                            style={[
                                globalStyles.button,
                                difficulty === d
                                    ? globalStyles.buttonSelected
                                    : globalStyles.buttonUnselected,
                            ]}
                            labelStyle={[
                                globalStyles.buttonLabel,
                                difficulty === d
                                    ? globalStyles.buttonLabelSelected
                                    : globalStyles.buttonLabelUnselected,
                            ]}
                            compact
                            accessibilityLabel={`Filter by ${d}`}
                        >
                            {d}
                        </Button>
                    ))}
                </ScrollView>

                <Text style={globalStyles.accentText}>Importance:</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={globalStyles.scrollViewContent}
                >
                    {importances.map(i => (
                        <Button
                            key={i}
                            mode={importance === i ? "contained" : "outlined"}
                            onPress={() => setImportance(importance === i ? null : i as Importance)}
                            style={[
                                globalStyles.button,
                                importance === i
                                    ? globalStyles.buttonSelected
                                    : globalStyles.buttonUnselected,
                            ]}
                            labelStyle={[
                                globalStyles.buttonLabel,
                                importance === i
                                    ? globalStyles.buttonLabelSelected
                                    : globalStyles.buttonLabelUnselected,
                            ]}
                            compact
                            accessibilityLabel={`Filter by ${i}`}
                        >
                            {i}
                        </Button>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}
