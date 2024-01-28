import Timer from "@/components/helper/timer/timer";
import { useEffect, useState } from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

const useDeadlineStatus = (deadline, refetch) => {
    const [isPassed, setIsPassed] = useState(false);
    const [hasRefetched, setHasRefetched] = useState(false); // New state to track refetch

    const doRefetch = async () => {
        try {

            for (const refetchFn of refetch) {
                await refetchFn();
            }
            setHasRefetched(true)
        } catch (error) {
            console.error("Error during refetch:", error);
        }
    };
    useEffect(() => {
        const check = () => {
            const currentTime = Date.now();
            const deadlinePassed = currentTime > deadline * 1000;

            if (deadlinePassed && !hasRefetched) {
                doRefetch()
            }
            setIsPassed(deadlinePassed);
        };

        // Set up an interval for continuous checking
        const intervalId = setInterval(check, 1000); // Check every second

        // Cleanup interval on component unmount or when deadline changes
        return () => clearInterval(intervalId);
    }, [deadline, hasRefetched]);

    return isPassed;
};


export const EqubCycleItem = ({ ...props }) => {
    const { time, refetch, check, hide } = props
    const isPassed = useDeadlineStatus(time, refetch);

    if (!isPassed) return false

    return (
        <div>
            {!check && <span>
                {!isPassed && !check
                    ? <Timer className="animate-fadeIn" countDownTimeMs={Number(time)} hide={hide} />
                    : "-"}
            </span>}
            {check && <span>
                {isPassed ? <AiFillCheckCircle className="animate-fadeIn" color='green' size={20} /> : <AiFillCloseCircle color='red' size={20} />}
            </span>}
        </div>
    );
};