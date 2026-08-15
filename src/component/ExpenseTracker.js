import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { expensesActions } from '../store/index';

const ExpenseTracker = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.items);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);

  const descRef = useRef();
  const amountRef = useRef();
  const categoryRef = useRef();

  
  const dbUrl = `https://firebaseio.com{userId}.json?auth=${token}`;

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(dbUrl);
        if (!response.ok) throw new Error();
        const data = await response.json();
        
        const loadedExpenses = [];
        for (const key in data) {
          loadedExpenses.push({ id: key, ...data[key] });
        }
        dispatch(expensesActions.setExpenses(loadedExpenses));
      } catch (err) {
        console.log("No initial database records found.");
      }
    };
    fetchExpenses();
  }, [dispatch, dbUrl]);

  const totalAmount = expenses.reduce((sum, item) => sum + Number(item.amount), 0);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const newExpense = {
      description: descRef.current.value,
      amount: amountRef.current.value,
      category: categoryRef.current.value
    };

    try {
      const response = await fetch(dbUrl, {
        method: 'POST',
        body: JSON.stringify(newExpense),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      dispatch(expensesActions.addExpense({ id: data.name, ...newExpense }));
      
      descRef.current.value = '';
      amountRef.current.value = '';
    } catch (err) {
      alert("Failed to save expense item.");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '35rem', margin: '2rem auto', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '6px', background: '#fff' }}>
      <h2>Dashboard Tracker</h2>
      
      {totalAmount > 10000 && (
        <div style={{ background: '#fff9db', border: '1px solid #fab005', padding: '1rem', marginBottom: '1rem', borderRadius: '4px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>Total expenses crossed ₹10,000 threshold!</p>
          <button 
            onClick={() => alert('Activating application premium toolkit...')}
            style={{ backgroundColor: '#fab005', padding: '10px 20px', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            ✨ Activate Premium
          </button>
        </div>
      )}

      <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" ref={descRef} placeholder="Description" required style={{ padding: '8px' }} />
        <input type="number" ref={amountRef} placeholder="Amount (₹)" required style={{ padding: '8px' }} />
        <select ref={categoryRef} style={{ padding: '8px' }}>
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Entertainment">Entertainment</option>
        </select>
        <button type="submit" style={{ padding: '10px', background: '#3c0080', color: '#fff', border: 'none', cursor: 'pointer' }}>Add Expense</button>
      </form>

      <h3 style={{ marginTop: '2rem' }}>Total Spent: ₹{totalAmount}</h3>
      <ul>
        {expenses.map((item) => (
          <li key={item.id} style={{ padding: '5px 0', borderBottom: '1px solid #eee' }}>
            {item.description} - <strong>₹{item.amount}</strong> ({item.category})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseTracker;
