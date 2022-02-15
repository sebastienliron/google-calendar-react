import { Component }  from 'react';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

class WeekGrid extends Component {
    state = {
        currentDate: null,
        today: new Date(),
        days : days,
        startDate: null,
        endDate : null,
        gridModel : null,
        rows: 24,
        nbDays : 7
     }

     refreshView(){
        var seedDay = this.props.seedDate || new Date();
        this.setState({currentDate : new Date(seedDay)});
        this.setState({today : new Date()});
        var startDate = new Date(seedDay);
        var dayFromSunday = startDate.getDay();

        if (this.props.startMonday === true)
        {
            dayFromSunday = dayFromSunday - 1;
            if (dayFromSunday < 0)
                dayFromSunday = 6;
        }

        startDate.setDate(startDate.getDate() - dayFromSunday);
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
        startDate.setMilliseconds(0);
        this.setState({startDate : startDate});
        
        var gridModel = [];
        var daysModel = [];
        for (var j = 0; j < this.state.rows; ++j)
        {
            daysModel.push(new Date(startDate));
            startDate.setHours(startDate.getHours() + 1);
        }
        startDate.setDate(startDate.getDate() - 1);
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
        startDate.setMilliseconds(0);
        gridModel.push(daysModel)

        for (var i = 0; i < this.state.nbDays; ++i)
        {
            daysModel = [];
            for (var j = 0; j < this.state.rows; ++j)
            {
                daysModel.push(new Date(startDate));
                startDate.setHours(startDate.getHours() + 1);
            }
            startDate.setHours(0);
            startDate.setMinutes(0);
            startDate.setSeconds(0);
            startDate.setMilliseconds(0);
            gridModel.push(daysModel)
        }
        this.setState({gridModel : gridModel});
     }

     componentDidUpdate(prevProps, prevState)
     {
         if (prevProps.seedDate !== this.props.seedDate)
         {
            this.refreshView();
         }
     }

     componentDidMount()
     {
        this.refreshView();
     }

     sameDay(day1, day2)
     {
         return day1.getDate() === day2.getDate() &&
                day1.getMonth() === day2.getMonth() &&
                day1.getFullYear() === day2.getFullYear();
     }

     render() {
        let final =  
        <div>
           <p> Month : { this.state.currentDate ? months[this.state.currentDate.getMonth()] + " " + this.state.currentDate.getFullYear() : "NA" }</p>
           <p> seed date : { this.state.startDate ? this.state.startDate.toString()  : "NA" }</p>
           <div className='grid-container'>
            {this.state.gridModel && this.state.gridModel.map( (line, index) => 
                <div key={'week-header-' + index} className='grid-week-day-col'>
                    <div className={'grid-week-header ' + (this.sameDay(line[0], this.state.today) ? ' grid-week-header-today' : '')}>{index === 0 ? 'Hours' : days[line[0].getDay()]  + ' ' + line[0].getDate()}</div>
                    {line.map( (cell, cellIndex) => 
                        <div key={index + '-' + cellIndex} className={'grid-week-cell-cal '}>{index === 0 ? cell.getHours() : '\u00A0'}</div>
                    )}
                </div>
             )
            }
            </div>
        </div>
        
        return final;
     }
}

export default WeekGrid;