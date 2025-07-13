import {JSX} from "react";
import {Animated, StyleSheet, View, Text} from "react-native";
import {Difficulty, Importance} from "../../modals/types";
import {Button, Divider} from "react-native-paper";
import ScrollView = Animated.ScrollView;

interface filtersProps{
    difficulty: Difficulty|null;
    setDifficulty: (d: Difficulty | null) => void;
    importance: Importance|null;
    setImportance: (i: Importance | null) => void;
}
export default function FilterPatterns({
                                           difficulty,
                                           setDifficulty,
                                           importance,
                                           setImportance,
                                       }: filtersProps): JSX.Element {
    const difficulties: Difficulty[] = ['very easy', 'easy', 'intermediate', 'difficult', 'crazy'];
    const importances: Importance[] = ['low', 'medium', 'high'];

    return (
        <View style={styles.filtersContainer}>
            <Text style={styles.filterTitle}>Difficulty:</Text>
            <Divider />
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}
            >
                {difficulties.map(d => (
                    <Button
                        key={d}
                        mode={difficulty === d ? "contained" : "outlined"}
                        onPress={() => setDifficulty(difficulty === d ? null : d)}
                        style={styles.button}
                        accessibilityLabel={`Filter by ${d}`}
                    >
                        {d}
                    </Button>
                ))}
            </ScrollView>

            <Text style={styles.filterTitle}>Importance:</Text>
            <Divider />
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}
            >
                {importances.map(i => (
                    <Button
                        key={i}
                        mode={importance === i ? "contained" : "outlined"}
                        onPress={() => setImportance(importance === i ? null : i)}
                        style={styles.button}
                        accessibilityLabel={`Filter by ${i}`}
                    >
                        {i}
                    </Button>
                ))}
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    filtersContainer: {
      backgroundColor: "#2196f3"
    },
    filterTitle: {
      marginLeft: 5,
    },
    scrollViewContent: {
        flexDirection: "row",
        justifyContent: "center",
        margin: 5,
    },
    button: {
        backgroundColor: "white",
        fontSize: 5,
        marginHorizontal: 2,
    },
});
