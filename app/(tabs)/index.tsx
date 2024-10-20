import {Button, Image, StyleSheet, Text, View} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useState, useRef, useEffect} from 'react';

export const TIMER_WORK = 5 * 60 * 1000;
export const TIMER_SHORT_BREAK = 15 * 60 * 1000;
export const TIMER_LONG_BREAK = 30 * 60 * 1000;
export const TIME_TRIGGER_LONG_BREAK = 8;
export const TIMER_SPEED = 100;

export default function HomeScreen() {
    const [timer, setTimer] = useState("02:00");
    const [isBreak, setIsBreak] = useState(false);
    const [cycleCount, setCycleCount] = useState(0);
    const [check, setCheck] = useState("");
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const timeRemainingRef = useRef(TIMER_WORK);
    const [isRunning, setIsRunning] = useState(false);

    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

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
                    setCycleCount((prev) => (prev === 4 ? 0 : prev + 1));
                    setCheck("✔");
                }

                setIsBreak((prev) => !prev);
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
        <ParallaxScrollView
            headerBackgroundColor={{light: '#dc1581', dark: '#010201'}}
            headerImage={
                <Image
                    source={require('@/assets/images/tomato.png')}
                    style={styles.tomatoLogo}
                />
            }>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">{isBreak ? "Break Time" : "Work Time"}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.timerContainer}>
                <View style={styles.timerContainer}>
                    <Text style={styles.timerTextStyle}>{timer}</Text>
                </View>
            </ThemedView>
            <View style={styles.btnContainer}>
                <Button title="Start" color="green" onPress={startTimer} disabled={isRunning}/>
                <Text style={styles.checkText}>{check}</Text>
                <Button title="Reset" color="red" onPress={resetTimer}/>
            </View>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 8,
    },
    tomatoLogo: {
        height: 178,
        width: 290,
        bottom: -20,
        left: -120,
        position: 'absolute',
    },
    timerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    timerTextStyle: {
        color: 'white',
    },
    timerCta: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkText: {
        fontSize: 24,
        color: 'green',
        paddingHorizontal: 10,
    },
});
