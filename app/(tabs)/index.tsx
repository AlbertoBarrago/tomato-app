import {Button, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import React, {useState, useRef, useEffect} from 'react';
import {
    formatTime,
    TIME_TRIGGER_LONG_BREAK,
    TIMER_LONG_BREAK,
    TIMER_SHORT_BREAK,
    TIMER_SPEED,
    TIMER_WORK
} from "@/app/shared/timer";

export default function HomeScreen() {
    const [timer, setTimer] = useState("25:00");
    const [isBreak, setIsBreak] = useState(false);
    const [cycleCount, setCycleCount] = useState(0);
    const [check, setCheck] = useState("");
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const timeRemainingRef = useRef(TIMER_WORK);
    const [isRunning, setIsRunning] = useState(false);

    const startTimer = () => {
        if (intervalRef.current) return;
        setIsRunning(true);
        intervalRef.current = setInterval(() => {
            timeRemainingRef.current -= 1000;
            setTimer(formatTime(timeRemainingRef.current));

            if (timeRemainingRef.current <= 0) {
                clearInterval(intervalRef.current as NodeJS.Timeout);
                intervalRef.current = null;

                if (!isBreak) {
                    setCycleCount((prev) => (prev === TIME_TRIGGER_LONG_BREAK ? 0 : prev + 1));
                    setCheck(prevState => prevState + "✔");
                }

                setIsBreak(prevState => !prevState);
            }
        }, TIMER_SPEED);
    };

    const resetTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setTimer("05:00");
        setIsBreak(false);
        setCycleCount(0);
        setCheck("");
        timeRemainingRef.current = TIMER_WORK;
        setIsRunning(false);
    };

    useEffect(() => {
        if (!isRunning) return;
        if (intervalRef.current) clearInterval(intervalRef.current);

        timeRemainingRef.current = isBreak
            ? (cycleCount === TIME_TRIGGER_LONG_BREAK ?
                TIMER_LONG_BREAK : TIMER_SHORT_BREAK)
            : TIMER_WORK;
        setTimer(formatTime(timeRemainingRef.current));
        startTimer();

    }, [isBreak]);

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">{isBreak ? "Break Time" : "Work Time"}</ThemedText>
                <ThemedText type="subtitle">After 25 min of works you get 10 min of pause, after 7 repeat you get 30 min</ThemedText>
                <Image source={require('@/assets/images/tomato.png')} style={styles.image}/>
            </ThemedView>
            <ThemedView style={styles.timerContainer}>
                <View style={styles.timerContainer}>
                    <Text style={styles.timerTextStyle}>Timer: {timer}</Text>
                    <Text style={styles.checkText}>{check}</Text>
                </View>
            </ThemedView>
            <View style={styles.btnContainer}>
                <View style={styles.btnWrapper}>
                    <Button title="Start" color="green" onPress={startTimer} disabled={isRunning}/>
                </View>
                <View style={styles.btnWrapper}>
                    <Button title="Reset" color="red" onPress={resetTimer}/>
                </View>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        padding: 10,
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: 30,
    },
    checkText: {
        fontSize: 24,
        color: 'green',
        paddingHorizontal: 10,
    },
    image: {
        width: 350,
        height: 350,
        borderRadius: 75,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    timerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    timerTextStyle: {
        color: 'white',
        fontSize: 50,
    },
    timerCta: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    btnContainer: {
        marginTop: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnWrapper: {
        flex: 1,
        marginHorizontal: 10,
    },
});
