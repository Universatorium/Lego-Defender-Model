import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import Item from "./Item";

const Items = () => {
    const [items, setItems] = useState([
        { desc: 'Lager', done: false },
        { desc: 'Konstruktion', done: true },
        { desc: 'Bestellung', done: false },
        { desc: 'Versand', done: true }
    ]);

    const toggleDone = (index, desc, done) => {
        const itemsCopy = [...items];
        itemsCopy[index] = { desc: desc, done: !done };
        setItems(itemsCopy);
    };

    return (
        <View>
            {items.map((item, index) => {
                return (
                    <Item
                        key={index}
                        index={index}
                        desc={item.desc}
                        done={item.done}
                        onToggleDone={toggleDone}
                        style={styles.todoText}
                    >
                        {item.desc}
                    </Item>
                );
            })}
        </View>
    );
};

export default Items;


const styles = StyleSheet.create({
    todoText: {
        textAlign: 'center',
        padding: 10,
        fontSize: 25,
        fontWeight: 'bold'
    }
});
