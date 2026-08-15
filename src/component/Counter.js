import { useSelector, useDispatch } from 'react-redux';
import classes from './Counter.module.css';
import { counterActions } from '../store/index';

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter);
  const show = useSelector((state) => state.counter.showCounter);

  return (
    <main className={classes.counter}>
      <h1>REDUX COUNTER</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={() => dispatch(counterActions.increment())}>Increment</button>
        <button onClick={() => dispatch(counterActions.increase(5))}>Increase By 5</button>
        <button onClick={() => dispatch(counterActions.decrement())}>Decrement</button>
      </div>
      <button onClick={() => dispatch(counterActions.toggleCounter())}> TOGGLE COUNTER </button>
    </main>
  );
};

export default Counter;
