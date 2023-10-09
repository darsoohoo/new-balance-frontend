import useCounter from "../hooks/useCounter";
import Button from "@mui/material/Button";


interface CounterPageProps {
    initialCount: number;
}

const CounterPage: React.FC<CounterPageProps> = ({ initialCount }) => {
    const { count, increment } = useCounter(initialCount);



    return (
        <div>
            count is {count}
            <Button onClick={increment}>Increment</Button>
        </div>
    );
};

export default CounterPage;
