import React from 'react'
import type { RootState } from '../../lib/store'
import { useSelector, useDispatch } from 'react-redux'
import { incrementByAmount } from '../../lib/store/counterSlice';

export const Counter: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

  const doSomething = async () => {
    const [num, ] = await Promise.all([
      Math.floor(Math.random() * new Date().valueOf()),
      timeout(3500)
    ]);
    console.log(num);
    dispatch(incrementByAmount(num));
  }

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => doSomething()}
        >
          Increment
        </button>
        <span>{count}</span>
      </div>
    </div>
  )
}