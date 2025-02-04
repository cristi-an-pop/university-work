import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const colors = {
    primary: '#4a2574', // purple
    secondary: '#7338a0', // light purple
    danger: '#e74c3c', // red
    light: '#9e72c3', // lightest purple
    dark: '#0f0529', // dark purple
    darktext: '#222222', // dark text
    lighttext: '#ffffff', // light text
};

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.dark,
    },
    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.light,
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: colors.dark,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.darktext,
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.lighttext,
        marginBottom: 10,
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        color: colors.darktext,
    },
    textLight: {
        fontSize: 16,
        color: colors.lighttext,
        marginLeft: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: colors.primary,
        padding: 10,
        margin: 10,
        marginBottom: 30,
        borderRadius: 5,
    },
    buttonText: {
        color: colors.lighttext,
        textAlign: 'center',
    },
    dateTimePicker: {
        backgroundColor: colors.primary,
        borderColor: colors.light,
        borderWidth: 1,
        borderRadius: 5,
        margin: 10,
        color: colors.lighttext,
    },
    input: {
        backgroundColor: colors.primary,
        padding: 10,
        margin: 10,
        borderRadius: 5,
        borderWidth: 1,
        color: colors.lighttext,
        borderColor: colors.light,
    },
    label: {
        color: colors.lighttext,
        fontSize: 16,
        marginLeft: 10,
        fontWeight: 'bold',
    },
    floatingButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
    },
    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },
    radioButton: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.light,
    },
    radioButtonSelected: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    radioButtonText: {
        color: colors.lighttext,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 10,
    },
    tag: {
        backgroundColor: colors.primary,
        padding: 5,
        borderRadius: 5,
        marginRight: 5,
        marginBottom: 5,
    },
    tagText: {
        color: colors.lighttext,
    },
    dialog: {
        backgroundColor: colors.light,
        padding: 20,
        borderRadius: 5,
    },
    dialogText: {
        color: colors.darktext,
        marginBottom: 10,
    },
    dialogButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
    },
    dialogButtonText: {
        color: colors.lighttext,
    },
});