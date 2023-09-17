import { useState, useEffect } from 'react';

export default function useTimer(gameIsStarted: boolean) {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [intervalId, setIntervalId] = useState<number | null>(null);

    useEffect(() => {
        if (gameIsStarted) {
            const updatedStartedTime = Date.now();
            const id = setInterval(() => {
                setElapsedTime(Date.now() - updatedStartedTime);
            }, 1000);
            setIntervalId(id as unknown as number);
        
            return () => {
                clearInterval(id);
            };
        }
        
    }, [gameIsStarted]);    

    const stopTimer = () => {
        if (intervalId !== null) {
            clearInterval(intervalId);
        }
    };

    return { elapsedTime, stopTimer };
}
