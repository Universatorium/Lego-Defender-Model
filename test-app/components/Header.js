import {StyleSheet, Text, View} from 'react-native';

const Header = () => {
    return (
    <View style={styles.headerBox}>
        <Text style={styles.headerText}>Astley Motors</Text>
        {/* <image src=https://lego-defender-model-s3bucket.s3.eu-central-1.amazonaws.com/firmenlogo/Logo.png</image> */}
    </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    headerBox: {
        marginTop: 10,
        paddingLeft: 80,
        paddingRight: 80,
        // paddingVertical: 10,
        // paddingBottom: 10,
        marginBottom: 100,
        backgroundColor: 'yellow',
        borderRadius: 10,
        shadowColor: 'grey',
    },
    headerText: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    }
})