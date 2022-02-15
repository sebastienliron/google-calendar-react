import React, {useState} from 'react';
import './App.css';
import Calendar from './calendar';

function App() {

  const [state, setState] = useState({typeView : 'month', seedDate : new Date()});

  let startMonday = true;

  let changeView = (val) =>
  {
    var lbl = val.target.options.selectedIndex;
    lbl = val.target.options[lbl].text;
    setState({typeView : lbl, seedDate : state.seedDate});
  }

  let next = (vel) =>
  {
    let sDate = new Date(state.seedDate);
    if (state.typeView === 'month')
    {
      sDate.setMonth(sDate.getMonth() + vel);
    }
    else
    {
      sDate.setDate(sDate.getDate() + vel * 7); // next week
    }
    setState({typeView: state.typeView, seedDate : sDate});
  }

  return (
    <div className="App">
      <select onChange={event => changeView(event)}>
        <option value={'month'}>month</option>
        <option value={'week'}>week</option>
      </select>
      <p>View Type : {state.typeView}</p>
      <button onClick={() => next(-1)}>prev</button>
      <button onClick={() => next(1)}>next</button>
      <Calendar typeView={state.typeView} startMonday={startMonday} seedDate={state.seedDate}/>
    </div>
  );
}

export default App;
