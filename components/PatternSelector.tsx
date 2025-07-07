import {JSX, useEffect, useState} from "react";
import {ActivityIndicator, Card, Divider, Snackbar} from "react-native-paper";
import {StickingPattern} from "../modals/StickingPattern";
import {services} from "../services/servises";
import {Animated, StyleSheet, View} from "react-native";
import PatternCard from "./cards/PatternCard";
import ScrollView = Animated.ScrollView;
import FilterPatterns from "./FilterPatterns";
import {Difficulty} from "../modals/types";
import {usePattern} from "../hooks/usePattern";
import {useRouter} from "expo-router";


export default function PatternSelector():JSX.Element {
    console.log("PatternSelector()");
    const router = useRouter();
    const patternContext = usePattern();

    const [loading, setLoading] = useState(true);
    const [snackbarVisible, setSnackbarVisible] = useState(false);

    const [stickingPatterns, setStickingPatterns] = useState<StickingPattern[]>([]);

    const [filter, setFilter] = useState<Difficulty | null>(null);
    const filteredPatterns = filter
        ? stickingPatterns.filter(p => p.difficulty === filter)
        : stickingPatterns;

    const handleSelect = (pattern: StickingPattern) => {
        console.log("PatternSelector - handleSelect");
        patternContext.setPattern(pattern);
        router.push({
            pathname: "/practice",
            params: {
                pattern: JSON.stringify({
                    tempo: pattern.tempo,
                    pattern: pattern.pattern,
                    id: pattern.id
                })
            }
        });
    };

    const handleDelete = (pattern: StickingPattern) => {
        console.log("PatternSelector - handleDelete");

        services.deletePattern(pattern)
            .then(() => {
                setStickingPatterns(prevPatterns => prevPatterns.filter(p => p.id !== pattern.id));
                setSnackbarVisible(true);
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        console.log("PatternSelector - useEffect");

        services.getPatterns()
            .then((fetchedPatterns:StickingPattern[]) => {
                setStickingPatterns(fetchedPatterns);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() =>{
                setLoading(false);
            });
    }, []);

    if (loading) return <ActivityIndicator animating={true} />;


    return (
        <View>
            <FilterPatterns filter={filter} setFilter={setFilter} />
            <ScrollView>
                <Card>
                    <Card.Title title=" " subtitle="select sticking pattern to practice" />
                    <Card.Content>
                        <Divider />
                        <View style={styles.grid}>
                            {filteredPatterns.map((p) => (
                                <PatternCard
                                    key={p.id}
                                    patternContext={patternContext}
                                    router={router}
                                    pattern={p}
                                    onSelect={handleSelect}
                                    onDelete= {handleDelete}
                                />
                            ))}
                        </View>
                        <Divider />
                    </Card.Content>
                </Card>
                <Snackbar
                    visible={snackbarVisible}
                    onDismiss={() => setSnackbarVisible(false)}
                    duration={3000}
                    action={{
                        label: "OK",
                        onPress: () => setSnackbarVisible(false),
                    }}
                >
                    Pattern cleared successfully!
                </Snackbar>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",

    },
    item: {
        width: "45%",
        margin: "2.5%",
        padding: 16,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        alignItems: "center",
    },
    selected: {
        backgroundColor: "#2196f3",
    },
    itemText: {
        color: "#333",
        fontWeight: "bold",
    },
});
