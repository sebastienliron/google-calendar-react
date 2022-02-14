import { Component }  from 'react';
import MonthGrid from './MonthGrid';


class MonthView extends Component {
    state = {
        events: []
     }

     render() {
        let final =  
        <div><h2>month view</h2>
            <MonthGrid/>
        </div>
        return final;
     }
}

export default MonthView;