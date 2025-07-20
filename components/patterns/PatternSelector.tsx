import {JSX, useEffect, useState} from "react";
import {ActivityIndicator, Divider, Snackbar, FAB} from "react-native-paper";
import {StickingPattern} from "../../modals/StickingPattern";
import {services} from "../../services/servises";
import {Animated, ImageBackground, StyleSheet, View} from "react-native";
import PatternCard from "./cards/PatternCard";
import {usePattern} from "../../hooks/usePattern";
import {useRouter} from "expo-router";
import {globalStyles, imageStyles} from "../../styles/styles";
import {Difficulty, Importance} from "../../modals/types";
import FilterPatterns from "./FilterPatterns";
import {containerImg} from "../../assets";


const ScrollView = Animated.ScrollView;


export default function PatternSelector():JSX.Element {
    const router = useRouter();
    const patternContext = usePattern();

    const [loading, setLoading] = useState(true);
    const [snackbarVisible, setSnackbarVisible] = useState(false);

    const [stickingPatterns, setStickingPatterns] = useState<StickingPattern[]>([]);
    const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | null>(null);
    const [importanceFilter, setImportanceFilter] = useState<Importance | null>(null);

    const filteredPatterns = stickingPatterns.filter(p =>
        (!difficultyFilter || p.difficulty === difficultyFilter) &&
        (!importanceFilter || p.importance === importanceFilter)
    );

    const handleSelect = (pattern: StickingPattern) => {
        patternContext.setPattern(pattern);
        router.push({
            pathname: "/practice",
            params: {
                pattern: JSON.stringify({
                    id: pattern.id,
                    name: pattern.name,
                    tempo: pattern.tempo,
                    pattern: pattern.notes,
                })
            }
        });
    };

    const handleDelete = (pattern: StickingPattern) => {
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
        <ImageBackground
            source={containerImg}
            style={imageStyles.background}
            resizeMode="cover"
        >
                <ScrollView>
                    <FilterPatterns
                        difficulty = {difficultyFilter}
                        setDifficulty = {setDifficultyFilter}
                        importance = {importanceFilter}
                        setImportance = {setImportanceFilter}
                    />
                    <View>
                        <Divider style={globalStyles.divider}/>
                        <View style={styles.grid}>
                            {filteredPatterns.map((p) => (
                                <View key={p.id} style={styles.cardWrapper}>
                                    <PatternCard
                                        key={p.id}
                                        patternContext={patternContext}
                                        router={router}
                                        pattern={p}
                                        onSelect={handleSelect}
                                        onDelete= {handleDelete}
                                    />
                                </View>
                            ))}
                        </View>
                        <Divider style={globalStyles.divider}/>
                    </View>
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
            <FAB
                style={globalStyles.fab}
                icon="plus"
                color="#fff"
                size="medium"
                onPress={() => router.push("/pattern-form")}
                visible
            />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding:4,
    },
    filterContainer: {
        paddingTop: 1,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        width: "100%",
    },
    cardWrapper: {
        width: '95%',
        margin: 8,
    }
});
