import { Component }  from 'react';
import MonthView from './MonthView';
import WeekView from './WeekView';


class Calendar extends Component {
    state = {
        events: []
     }

     render() {
        let final =  
        <div>
            <h1>calendar</h1>
            {this.props.typeView === 'month' ? <MonthView startMonday={this.props.startMonday} seedDate={this.props.seedDate}/> : ''}
            {this.props.typeView === 'week' ? <WeekView startMonday={this.props.startMonday} seedDate={this.props.seedDate}/> : ''}
        </div>
        return final;
     }
}

export default Calendar;