export const TIMER_WORK = 25 * 60 * 1000;
export const TIMER_SHORT_BREAK = 10 * 60 * 1000;
export const TIMER_LONG_BREAK = 30 * 60 * 1000;
export const TIME_TRIGGER_LONG_BREAK = 8;
export const TIMER_SPEED = 1000;

export const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};