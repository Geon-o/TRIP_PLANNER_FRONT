import {useEffect, useState} from "react";

const Timer = ({onReset, disabled}) => {
    const MINUTES_IN_MS = 5 * 60 * 1000;
    const INTERVAL = 1000;
    const [timeLeft, setTimeLeft] = useState(MINUTES_IN_MS);

    const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, '0');
    const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - INTERVAL);
        }, INTERVAL);

        return () => {
            clearInterval(timer);
        };
    }, [timeLeft]);

    useEffect(() => {
        if (onReset) {
            onReset(() => setTimeLeft(MINUTES_IN_MS));
        }
    }, [onReset]);

    useEffect(() => {

        if (disabled) {
            setTimeLeft(0); // Reset time left if disabled is true
        }
    }, [disabled]);

    return (
        <>
            {!disabled ? `${minutes}:${second}` : ''}
        </>
    );
};

export default Timer;