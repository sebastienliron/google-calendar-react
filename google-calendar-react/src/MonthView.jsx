import { Component }  from 'react';
import MonthGrid from './MonthGrid';


class MonthView extends Component {
    state = {
        events: []
     }

     render() {
        let final =  
        <div><h2>month view</h2>
            <MonthGrid startMonday={this.props.startMonday} seedDate={this.props.seedDate}/>
        </div>
        return final;
     }
}

export default MonthView;