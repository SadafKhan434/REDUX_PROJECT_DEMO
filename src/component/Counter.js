import{useSelector,useDispatch} from 'react-redux'
import classes from'./Counter.module.css'

const Counter=()=>{
  const dispatch =  useDispatch()
 const counter=   useSelector(state=>state.counter)
 const incrementHandler=()=>{
   dispatch({type:'increment'})
 }
 const increaseHandler=()=>{
    dispatch({type:'increase',amount:5})
 }
 const decrementHandler=()=>{
    dispatch({type:'decrement'})
 }
 const decreaseHandler=()=>{
    dispatch({type:'decrease',amount:5})
 }
const toggleCounterHandler=()=>{}


return(
    <main className={classes.counter}>
        <h1>REDUX COUNTER</h1>
        <div className={classes.value}> {counter}</div>
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