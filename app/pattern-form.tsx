import React, {JSX, useState} from "react";
import {ScrollView, StyleSheet} from "react-native";
import {Button, HelperText, Menu, Text, TextInput} from "react-native-paper";
import {Difficulty, difficultyOptions, ImageKey, imageOptions, Importance, importanceOptions} from "../modals/types";
import {useLocalSearchParams, useRouter} from "expo-router";
import {StickingPattern} from "../modals/StickingPattern";
import {services} from "../services/servises";



export default function PatternFormScreen():JSX.Element {
    const router = useRouter();
    const params = useLocalSearchParams();
    const patternValue =
        Array.isArray(params.pattern) ? params.pattern[0] : params.pattern;

    const editingPattern = patternValue
        ? JSON.parse(decodeURIComponent(patternValue))
        : null;
    const isEdit = !!editingPattern;

    const [name, setName] = useState(editingPattern?.name || "");
    const [description, setDescription] = useState(editingPattern?.description || "");
    const [importance, setImportance] = useState<Importance>(editingPattern?.importance || "low");
    const [difficulty, setDifficulty] = useState<Difficulty>(editingPattern?.difficulty || "very easy");
    const [backgroundImage, setBackgroundImage] = useState<ImageKey>(editingPattern?.backgroundImage || "1.png");
    const [tempo, setTempo] = useState(editingPattern?.tempo?.toString() || "60");

    const [error, setError] = useState(""); // generic error

    // For menus
    const [impMenu, setImpMenu] = useState(false);
    const [difMenu, setDifMenu] = useState(false);
    const [imgMenu, setImgMenu] = useState(false);

    const handleSave = async () => {
        // Name validation
        if (!name || name.trim().length === 0) {
            setError("Pattern name is required.");
            return;
        }
        // tempo validation
        const nTempo = parseInt(tempo, 10);
        if (isNaN(nTempo) || nTempo < 40 || nTempo > 250) {
            setError("Tempo must be between 40 and 250.");
            return;
        }
        // Duplicate name? (Optional, remove if not needed)
        const allPatterns = await services.getPatterns();
        const nameExists = allPatterns.some(
            (p) =>
                p.name.trim().toLowerCase() === name.trim().toLowerCase() &&
                (!isEdit || p.id !== editingPattern.id)
        );
        if (nameExists) {
            setError("A pattern with this name already exists.");
            return;
        }

        // Compose and save pattern
        const newPattern = new StickingPattern(
            isEdit ? editingPattern.id : "", // let service assign ID if new
            name,
            description,
            importance,
            difficulty,
            backgroundImage,
            editingPattern?.notes ?? [{ limb: "R", accent: false }], // You'll expand notes logic in a later step
            nTempo
        );
        try {
            if (isEdit) {
                await services.updatePattern(newPattern);
            } else {
                await services.addPattern(newPattern);
            }
            router.back();
        } catch (err) {
            setError("Save failed: " + String(err));
        }
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text variant="titleLarge" style={{marginBottom: 12}}>{isEdit ? "Edit" : "Create"} Pattern</Text>

            <TextInput
                label="Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                label="Description"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
                multiline
            />

            {/* Importance Menu */}
            <Menu
                visible={impMenu}
                onDismiss={() => setImpMenu(false)}
                anchor={
                    <Button mode="outlined" onPress={() => setImpMenu(true)} style={styles.input}>
                        Importance: {importance}
                    </Button>
                }>
                {importanceOptions.map((opt) => (
                    <Menu.Item key={opt} onPress={() => { setImportance(opt); setImpMenu(false); }} title={opt}/>
                ))}
            </Menu>

            {/* Difficulty Menu */}
            <Menu
                visible={difMenu}
                onDismiss={() => setDifMenu(false)}
                anchor={
                    <Button mode="outlined" onPress={() => setDifMenu(true)} style={styles.input}>
                        Difficulty: {difficulty}
                    </Button>
                }>
                {difficultyOptions.map((opt) => (
                    <Menu.Item key={opt} onPress={() => { setDifficulty(opt); setDifMenu(false); }} title={opt}/>
                ))}
            </Menu>

            {/* Background Image Menu */}
            <Menu
                visible={imgMenu}
                onDismiss={() => setImgMenu(false)}
                anchor={
                    <Button mode="outlined" onPress={() => setImgMenu(true)} style={styles.input}>
                        Background: {backgroundImage}
                    </Button>
                }>
                {imageOptions.map((opt) => (
                    <Menu.Item key={opt} onPress={() => { setBackgroundImage(opt); setImgMenu(false); }} title={opt}/>
                ))}
            </Menu>

            <TextInput
                label="Tempo"
                value={tempo}
                onChangeText={val => setTempo(val.replace(/[^0-9]/g, ""))}
                keyboardType="numeric"
                style={styles.input}
                maxLength={3}
                placeholder="40-250"
            />

            <HelperText type="error" visible={!!error}>{error}</HelperText>
            <Button mode="contained" onPress={handleSave} style={styles.saveBtn}>
                Save Pattern
            </Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#fff"
    },
    input: {
        marginBottom: 14
    },
    saveBtn: {
        marginTop: 20
    },
});
