import { Component }  from 'react';
import MonthView from './MonthView';


class Calendar extends Component {
    state = {
        events: []
     }

     render() {
        let final =  
        <div>
            <h1>calendar</h1>
            <MonthView/>
        </div>
        return final;
     }
}

export default Calendar;