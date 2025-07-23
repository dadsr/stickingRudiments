import React, {JSX, useState} from "react";
import {ImageBackground, Modal, SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import {Button, Divider, HelperText, Menu, PaperProvider, Portal, Text, TextInput, Snackbar } from "react-native-paper";
import {
    Difficulty,
    difficultyOptions,
    ImageKey,
    imageOptions,
    Importance,
    importanceOptions,
    PatternNote
} from "../modals/types";
import {useLocalSearchParams, useRouter} from "expo-router";
import {StickingPattern} from "../modals/StickingPattern";
import {services} from "../services/servises";
import {globalStyles, imageStyles} from "../styles/styles";
import PatternNotesEditor from "../components/editor/PatternNotesEditor";
import {theme} from "../styles/theme";
import {containerImg} from "../assets";


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
    const [notes, setNotes] = useState<PatternNote[]>(editingPattern?.notes || []);

    const [error, setError] = useState("");
    const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);


    // For menus
    const [impMenu, setImpMenu] = useState(false);
    const [difMenu, setDifMenu] = useState(false);
    const [imgMenu, setImgMenu] = useState(false);

    //for Notes
    const [isNotesEditor, setIsNotesEditor] = useState(false);


    const handleSave = async () => {
        // Name validation
        if (!name || name.trim().length === 0) {
            setError("Pattern name is required.");
            setShowErrorSnackbar(true);
            return;
        }
        // tempo validation
        const nTempo = parseInt(tempo, 10);
        if (isNaN(nTempo) || nTempo < 40 || nTempo > 250) {
            setError("Tempo must be between 40 and 250.");
            setShowErrorSnackbar(true);
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
            setShowErrorSnackbar(true);
            return;
        }

        // Compose and save pattern
        const newPattern = new StickingPattern(
            isEdit ? editingPattern.id : "",
            name,
            description,
            importance,
            difficulty,
            backgroundImage,
            editingPattern?.notes ?? [{ limb: "R", accent: false }],
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
            setShowErrorSnackbar(true);
        }
    };

    const onNotesEditorToggleSwitch= () => {
        setIsNotesEditor(!isNotesEditor);
    }
    const closeNotesEditor = () => {
        setIsNotesEditor(false);
    }


    return (
        <PaperProvider>
        <ImageBackground
            source={containerImg}
            style={imageStyles.background}
            resizeMode="stretch"
        >
            <SafeAreaView style={styles.container}>
                <Text variant="titleLarge" style={globalStyles.heading}>{isEdit ? "Edit" : "Create"} Pattern</Text>


                    <ScrollView >
                        <Divider style={globalStyles.divider} />
                        <View style={styles.fieldContainer}>
                            <TextInput
                                label="Name"
                                value={name}
                                onChangeText={setName}
                                style={globalStyles.input}
                            />
                        </View>

                        <View style={styles.fieldContainer}>
                            <TextInput
                                label="Description"
                                value={description}
                                onChangeText={setDescription}
                                style={globalStyles.input}
                                multiline
                            />
                        </View>

                        {/* Importance Menu */}
                        <View style={styles.fieldContainer}>

                            <Menu
                                visible={impMenu}
                                onDismiss={() => setImpMenu(false)}
                                anchor={
                                    <Button mode="outlined" onPress={() => setImpMenu(true)} style={globalStyles.menuButton}>
                                        Importance: {importance}
                                    </Button>
                                }>
                                {importanceOptions.map((opt) => (
                                    <Menu.Item key={opt} onPress={() => { setImportance(opt); setImpMenu(false); }} title={opt}/>
                                ))}
                            </Menu>
                        </View>
                        {/* Difficulty Menu */}
                        <View style={styles.fieldContainer}>

                            <Menu
                                visible={difMenu}
                                onDismiss={() => setDifMenu(false)}
                                anchor={
                                    <Button mode="outlined" onPress={() => setDifMenu(true)} style={globalStyles.menuButton}>
                                        Difficulty: {difficulty}
                                    </Button>
                                }>
                                {difficultyOptions.map((opt) => (
                                    <Menu.Item key={opt} onPress={() => { setDifficulty(opt); setDifMenu(false); }} title={opt}/>
                                ))}
                            </Menu>
                        </View>
                        {/* Background Image Menu */}
                        <View style={styles.fieldContainer}>

                            <Menu
                                visible={imgMenu}
                                onDismiss={() => setImgMenu(false)}
                                anchor={
                                    <Button mode="outlined" onPress={() => setImgMenu(true)} style={globalStyles.menuButton}>
                                        Background: {backgroundImage}
                                    </Button>
                                }>
                                {imageOptions.map((opt) => (
                                    <Menu.Item key={opt} onPress={() => { setBackgroundImage(opt); setImgMenu(false); }} title={opt}/>
                                ))}
                            </Menu>
                        </View>

                        <View style={styles.fieldContainer}>
                            <TextInput
                                label="Tempo"
                                value={tempo}
                                onChangeText={val => setTempo(val.replace(/[^0-9]/g, ""))}
                                keyboardType="numeric"
                                maxLength={3}
                                placeholder="40-250"
                                style={globalStyles.input}
                            />
                        </View>


                        <View >
                            <Button mode="outlined" onPress={() => setIsNotesEditor(true)} style={styles.editButton}>
                                Edit Notes
                            </Button>
                        </View>
                        <Divider style={globalStyles.divider} />

                        <Portal>
                            <Modal
                                transparent={true}
                                animationType="fade"
                                visible={isNotesEditor}
                                onRequestClose={closeNotesEditor}
                            >
                                <View style={globalStyles.modalOverlay}>
                                    <PatternNotesEditor  notes={notes} setNotes={setNotes} close={closeNotesEditor} />
                                </View>
                            </Modal>
                        </Portal>

                        <Snackbar
                            visible={showErrorSnackbar}
                            onDismiss={() => setShowErrorSnackbar(false)}
                            duration={4000}
                            action={{
                                label: "Close",
                                onPress: () => setShowErrorSnackbar(false),
                            }}
                            style={{ backgroundColor: theme.colors.error }} // optional red background
                        >
                            {error}
                        </Snackbar>

                        <View style={globalStyles.saveButtonContainer}>
                            <Button mode="contained" onPress={handleSave} style={globalStyles.saveButton}>
                                Save Pattern
                            </Button>
                        </View>
                    </ScrollView>


            </SafeAreaView>
        </ImageBackground>
        </PaperProvider>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 40,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(255,255,255,0.32)',
    },
    fieldContainer:{
        width:"100%",
        marginBottom: 20,
        borderRadius: theme.roundness,
    },
    editButton:{
        borderWidth: 5,
        borderColor:theme.colors.onPrimaryContainer,
        backgroundColor:theme.colors.secondary
    },
});
