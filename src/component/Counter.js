import{useSelector,useDispatch} from 'react-redux'
import classes from'./Counter.module.css'
import { counterActions } from '../store';

const Counter=()=>{
  const dispatch =  useDispatch()
 const counter = useSelector((state) => state.counter.counter);
 const show = useSelector((state) => state.counter.showCounter);

 const incrementHandler=()=>{
   dispatch(counterActions.increment());
 }
 const increaseHandler=()=>{
    dispatch(counterActions.increase(5));
 }
 const decrementHandler=()=>{
    dispatch(counterActions.decrement());
 }
 const decreaseHandler=()=>{
    dispatch(counterActions.decrease(5));
 }
const toggleCounterHandler=()=>{
    dispatch(counterActions.toogleCounter())
}


return(
    <main className={classes.counter}>
        <h1>REDUX COUNTER</h1>
        {show && <div className={classes.value}>{counter}</div>}
        <div>
            <button onClick={incrementHandler}>Increment</button>
            <button onClick={increaseHandler}>Increase By 5</button>
            <button onClick={decrementHandler}>Decrement</button>
            <button onClick={decreaseHandler}>Decrease By 5</button>
        </div>
        <button onClick={toggleCounterHandler}> TOGGLE COUNTER </button>
    </main>
);
}
export default Counter;