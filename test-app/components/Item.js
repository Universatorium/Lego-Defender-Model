import { View, Text, StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
const Item = ({index, desc, done, onToggleDone}) => {
    return (
        <View 
        style={
            done
            ? [styles.baseContainer, styles.itemDoneContainer] 
            : [styles.baseContainer, styles.itemNotDoneContainer]
        }
            >    
            <View>
                <Pressable 
                    android_ripple
                    onPress={() => onToggleDone(index, desc, !done)}
                    >
                    <Text>{desc}</Text>
                </Pressable>
            </View>
            <View>
                <Ionicons name="md-close-circle" size={28} color={done ? "green" : "grey"} />
            </View>
        </View>
    );
};

export default Item;


const styles = StyleSheet.create({
    baseContainer : {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 6,
        alignItems: "center",
        marginVertical: 6,
        borderBottomWidth: 1,
    },
    itemDoneContainer : {
        backgroundColor: "lightgreen",
        borderColor: "green",
    },
    itemNotDoneContainer : {
        backgroundColor: "lightgrey",
        borderColor: "grey",
    }
});