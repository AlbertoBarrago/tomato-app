import {Button, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import React, {useState, useRef, useEffect} from 'react';
import {
    formatTime,
    TIME_TRIGGER_LONG_BREAK,
    TIMER_LONG_BREAK, TIMER_PLACEHOLDER,
    TIMER_SHORT_BREAK,
    TIMER_SPEED,
    TIMER_WORK
} from "@/app/shared/timer";

export default function HomeScreen() {
    const [timer, setTimer] = useState(TIMER_PLACEHOLDER);
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
        setTimer(TIMER_PLACEHOLDER);
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
                <ThemedText style={{"color": "red"}} type="title">Tomato-app</ThemedText>
                <ThemedText type="subtitle">After 25 min of works you get 10 min of pause, after 7 repeat you gain 30 min of Relax</ThemedText>
                <Image source={require('@/assets/images/tomato.png')} style={styles.image}/>
                <ThemedText style={styles.checkText}>
                    {check}
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.timerContainer}>
                <ThemedText> {isBreak ? "Break Time" : "Work Time"} </ThemedText>
                <ThemedText style={styles.timerTextStyle}>{timer}</ThemedText>
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
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: 80,
    },
    checkText: {
        fontSize: 24,
        color: 'green',
        margin: 20
    },
    image: {
        width: 350,
        height: 230,
        marginTop: 30
    },
    timerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20,
    },
    timerTextStyle: {
        fontSize: 40,
    },
    timerCta: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    btnContainer: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnWrapper: {
        flex: 1,
        marginHorizontal: 10,
    },
});
