import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import colors from '../config/colors';
import defaultStyles from '../config/styles';

function AppTextInput({ style, ...otherProps}) {
    return (
        <View style={[styles.container, style]}>
            <TextInput style={[defaultStyles.text, styles.textInput]} autoCapitalize='none' autoCorrect={false} multiline={true} {...otherProps} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.secondary,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 5,
        
    },
    textInput: {
        flex: 1,
        height: '100%',
        textAlignVertical: 'top'
    }
})

export default AppTextInput;