import {services} from "../../services/servises";
import {Button, Snackbar} from "react-native-paper";
import {useState} from "react";
import {View} from "react-native";



export default function Setup(){

    const [snackbarVisible, setSnackbarVisible] = useState(false);

    const clearPatterns = () => {
        services.clearPatterns();
        setSnackbarVisible(true);  // Show success message
    }

    return(
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Button onPress={clearPatterns}>Clear Patterns</Button>

            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={3000}
                action={{
                    label: "OK",
                    onPress: () => setSnackbarVisible(false),
                }}
            >
                Patterns cleared successfully!
            </Snackbar>
        </View>
    );
}
