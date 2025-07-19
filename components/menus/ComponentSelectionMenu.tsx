import React, {JSX} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {globalStyles} from '../../styles/styles';

interface ComponentSelectionMenuProps {
    availableKeys: string[];
    selectedKeys: string[];
    onToggle: (key: string) => void;
}

export default function ComponentSelectionMenu({
                                                   availableKeys,
                                                   selectedKeys,
                                                   onToggle,
                                               }: ComponentSelectionMenuProps): JSX.Element {
    return (
        <View style={globalStyles.filtersContainer}>
            <Text style={[globalStyles.accentText, { flexShrink: 1 }]}>Select to remove:</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={true}
                contentContainerStyle={globalStyles.scrollViewContent}
            >
                {availableKeys.map((key) => (
                    <Button
                        key={key}
                        mode={selectedKeys.includes(key) ? 'contained' : 'outlined'}
                        onPress={() => onToggle(key)}
                        style={[
                            globalStyles.button,
                            selectedKeys.includes(key)
                                ? globalStyles.buttonUnselected
                                : globalStyles.buttonSelected,
                        ]}
                        labelStyle={[
                            globalStyles.buttonLabel,
                            selectedKeys.includes(key)
                                ? globalStyles.buttonLabelUnselected
                                : globalStyles.buttonLabelSelected,
                        ]}
                        compact
                        accessibilityLabel={
                            selectedKeys.includes(key)
                                ? `selected by ${key}`
                                : `unselected by ${key}`
                        }
                    >
                        {key}
                    </Button>
                ))}
            </ScrollView>
        </View>
    );
}
