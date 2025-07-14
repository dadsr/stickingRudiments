import { JSX } from "react";
import { Animated, StyleSheet, View, Text } from "react-native";
import { Button, Divider } from "react-native-paper";
import { theme } from "../../styles/theme";
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
            <View style={styles.filtersContainer}>
                <Text style={[globalStyles.accentText, { flexShrink: 1 }]}>Difficulty:</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollViewContent}
                >
                    {difficulties.map(d => (
                        <Button
                            key={d}
                            mode={difficulty === d ? "contained" : "outlined"}
                            onPress={() => setDifficulty(difficulty === d ? null : d as Difficulty)}
                            style={styles.button}
                            labelStyle={styles.buttonLabel}
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
                    contentContainerStyle={styles.scrollViewContent}
                >
                    {importances.map(i => (
                        <Button
                            key={i}
                            mode={importance === i ? "contained" : "outlined"}
                            onPress={() => setImportance(importance === i ? null : i as Importance)}
                            style={styles.button}
                            labelStyle={styles.buttonLabel}
                            compact
                            accessibilityLabel={`Filter by ${i}`}
                        >
                            {i}
                        </Button>
                    ))}
                </ScrollView>

                <Divider style={{ marginVertical: 10 }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    filtersContainer: {
        flexDirection: 'column',
        backgroundColor: theme.colors.primaryContainer,
        width: '100%',
        padding: 8,
        borderRadius: 8,
        marginVertical: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    filterTitle: {
        padding: 10
    },
    scrollViewContent: {
        flexDirection: "row",
        justifyContent: "center",
        margin: 5,
    },
    button: {
        backgroundColor: "white",
        marginHorizontal: 2,
    },
    buttonLabel: {
        fontSize: 12,
    }
});
