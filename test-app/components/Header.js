import {StyleSheet, Text, View} from 'react-native';

const Header = () => {
    return (
    <View style={styles.headerBox}>
        <Text style={styles.headerText}>Lego Defender</Text>
    </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    headerBox: {
        marginTop: 50,
        paddingLeft: 10,
        paddingVertical: 10,
        backgroundColor: 'yellow',
    },
    headerText: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    }
})