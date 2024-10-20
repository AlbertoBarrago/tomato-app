import {Button, Image, StyleSheet, Text, View} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useState, useRef, useEffect} from 'react';
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
                <Text style={styles.checkText}>{check}</Text>
            </ThemedView>
            <View style={styles.btnContainer}>
                <View style={styles.buttonWrapper}>
                    <Button title="Start" color="green" onPress={startTimer} disabled={isRunning}/>
                </View>
                <View style={styles.buttonWrapper}>
                    <Button title="Reset" color="red" onPress={resetTimer}/>
                </View>
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
        fontSize: 50,
    },
    timerCta: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    btnContainer: {
        marginTop:10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonWrapper: {
        flex: 1,
        marginHorizontal: 10,
    },
    checkText: {
        fontSize: 24,
        color: 'green',
        paddingHorizontal: 10,
    },
});
