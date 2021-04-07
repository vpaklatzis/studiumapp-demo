import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { decrement, increment } from './testReducer';

export default function Sandbox() {

    const dispatch = useDispatch();

    const data = useSelector(state => state.test.data);
    return (
        <>
            <h1>test</h1>
            <h3>The data is: {data}</h3>
            <Button onClick={() => dispatch(increment(20))} content='Increment' color='green' />
            <Button onClick={() => dispatch(decrement(10))} content='Decrement' color='red' />
        </>
    )
}