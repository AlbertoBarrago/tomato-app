import {StyleSheet, Image} from 'react-native';
import React from "react";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";

export default function TabTwoScreen() {
    return (
        <ThemedView style={styles.container}>
            <Image source={{ uri: 'https://picsum.photos/200/300' }} style={styles.image} />
            <ThemedText style={styles.text}>Hi, I'm alBz, a passionate developer from Cagliari!</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
