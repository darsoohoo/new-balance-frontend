import { useState, useEffect } from "react";

// Custom hook for handling the count state
// 1. Create a function that returns an object with the state and the function to update the state
// 2. Use the useState hook to create the state and the function to update the state
// 3. Return the state and the function to update the state


const useCounter = (initialCount: any) => {
    const [count, setCount] = useState(initialCount);

    useEffect(() => {
        console.log(count);
    }, [count]);

    const increment = () => {
        setCount(count + 1);
    };

    return {
        count,
        increment,
    };
};

export default useCounter;
