import React, { useState } from 'react';

const FunctionlComponent = () => {
    const [count, setCount] = useState(0);

    const incrementCounter = () => {
        setCount(count + 1);
    }

    return (
        <div>
            <h1>
                Functional Component
            </h1>
            <p>Current Count: {count}</p>
            <button onClick={incrementCounter}>click me</button>
        </div>
    )
}

export default FunctionlComponent;