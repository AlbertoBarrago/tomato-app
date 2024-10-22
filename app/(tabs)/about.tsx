import {StyleSheet, Image} from 'react-native';
import React from "react";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";

export default function About() {
    return (
        <ThemedView style={styles.container}>
            <Image source={{ uri: 'https://picsum.photos/200/300' }} style={styles.image} />
            <ThemedText style={styles.text}>Hi, I'm alBz, a passionate software developer from Cagliari!</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
