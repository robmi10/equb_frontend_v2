import { useState, useEffect } from "react";
import FlipNumbers from "react-flip-numbers";
import { twMerge } from "tailwind-merge";
import { GetRemainingTimeUnitMsTimeStamp } from "./getRemainingTimeUnitMsTimeStamp";
const defaultRemainingTime = {
    seconds: "00",
    minutes: "00",
    hours: "00",
    days: "00",
};

const Timer = ({ countDownTimeMs, hide }) => {
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateTimeRemaining(countDownTimeMs);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [countDownTimeMs]);

    const updateTimeRemaining = (countdown) => {
        setRemainingTime(GetRemainingTimeUnitMsTimeStamp(countdown));
    };

    let color = "black";

    return (
        <div className="flex h-10 gap-2">
            <div className="flex flex-col ">
                <span className={twMerge("text-sm ml-1", hide &&
                    'hidden')}>D:D</span>
                <FlipNumbers
                    height={17}
                    width={17}
                    color={color}
                    background="transparent"
                    play
                    perspective={500}
                    numbers={String(remainingTime.days)}
                />
            </div>
            <div className="flex flex-col  ">
                <span className={twMerge("text-sm ml-1", hide &&
                    'hidden')}>H:H</span>
                <FlipNumbers
                    height={17}
                    width={17}
                    color={color}
                    background="transparent"
                    play
                    perspective={500}
                    numbers={String(remainingTime.hours)}
                />
            </div>
            <div className="flex flex-col  ">
                <span className={twMerge("text-sm ml-1", hide &&
                    'hidden')}>M:M</span>
                <FlipNumbers
                    height={17}
                    width={17}
                    color={color}
                    background="transparent"
                    play
                    perspective={300}
                    numbers={String(remainingTime.minutes)}
                />
            </div>
            <div className="flex flex-col  ">
                <span className={twMerge("text-sm ml-1", hide &&
                    'hidden')}>S:S</span>
                <FlipNumbers
                    height={17}
                    width={17}
                    color={color}
                    background="transparent"
                    play
                    perspective={500}
                    numbers={String(remainingTime.seconds)}
                />
            </div>
        </div >
    );
};

export default Timer;