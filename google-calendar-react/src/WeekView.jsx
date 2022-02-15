import { Component }  from 'react';
import WeekGrid from './WeekGrid';


class WeekView extends Component {
    state = {
        events: []
     }

     render() {
        let final =  
        <div><h2>week view</h2>
           <WeekGrid startMonday={this.props.startMonday} seedDate={this.props.seedDate}/>
        </div>
        return final;
     }
}

export default WeekView;