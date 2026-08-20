import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { expensesActions, themeActions } from '../store/index';

const ExpenseTracker = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.items);

  // ⚡ Load Theme Reducer Values
  const isDark = useSelector((state) => state.theme.isDark);
  const isPremium = useSelector((state) => state.theme.isPremium);

  const descRef = useRef();
  const amountRef = useRef();
  const categoryRef = useRef();
  const FIREBASE_DB_URL = 'https://expenseproject-13ec0-default-rtdb.firebaseio.com/expenses.json';

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(FIREBASE_DB_URL);
        if (!response.ok) throw new Error(`Failed to load expenses: ${response.status}`);
        const data = await response.json();
        
        const loadedExpenses = [];
        if (data) {
          for (const key in data) {
            loadedExpenses.push({ id: key, ...data[key] });
          }
        }
        dispatch(expensesActions.setExpenses(loadedExpenses));
      } catch (err) {
        console.log("No initial database records found.");
      }
    };
    fetchExpenses();
  }, [dispatch]);

  const totalAmount = expenses.reduce((sum, item) => sum + Number(item.amount), 0);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newExpense = {
      description: descRef.current.value,
      amount: amountRef.current.value,
      category: categoryRef.current.value
    };

    try {
      const response = await fetch(FIREBASE_DB_URL, {
        method: 'POST',
        body: JSON.stringify(newExpense),
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`Failed to save expense: ${response.status}`);
      const data = await response.json();
      dispatch(expensesActions.addExpense({ id: data.name, ...newExpense }));
      descRef.current.value = '';
      amountRef.current.value = '';
    } catch (err) {
      alert("Failed to save expense item.");
    }
  };

  // 📥 EASY CSV CONVERSION LOGIC
  const downloadCsvFile = () => {
    let csvData = "Description,Category,Amount\n"; 
    
    expenses.forEach(item => {
      csvData += `${item.description},${item.category},${item.amount}\n`;
    });

    const blob = new Blob([csvData], { type: 'text/csv' });
    const fileUrl = URL.createObjectURL(blob);
    const hiddenLink = document.createElement('a');
    
    hiddenLink.href = fileUrl;
    hiddenLink.download = 'my_expenses.csv';
    document.body.appendChild(hiddenLink);
    hiddenLink.click();
    document.body.removeChild(hiddenLink);
  };

  return (
    <div style={{ 
      padding: '20px', maxWidth: '35rem', margin: '2rem auto', 
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '6px', 
      background: isDark ? '#333' : '#fff', color: isDark ? '#fff' : '#000' 
    }}>
      <h2>Dashboard Tracker</h2>
      
      {totalAmount >= 10000 && (
        <div style={{ background: '#fff9db', border: '1px solid #fab005', padding: '1rem', marginBottom: '1rem', borderRadius: '4px', textAlign: 'center', color: '#000' }}>
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>Premium features unlocked (Crossed ₹10,000)!</p>
          
          {!isPremium ? (
            <button 
              onClick={() => dispatch(themeActions.activatePremium())}
              style={{ backgroundColor: '#fab005', padding: '10px 20px', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Activate Premium
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button 
                onClick={() => dispatch(themeActions.toggleTheme())}
                style={{ backgroundColor: '#495057', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Toggle Theme Switcher
              </button>
              
              <button 
                onClick={downloadCsvFile}
                style={{ backgroundColor: '#12b886', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Download Expenses (.CSV)
              </button>
            </div>
          )}
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
