import { Component }  from 'react';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

class MonthGrid extends Component {
    state = {
        currentDate: null,
        startDate: null,
        endDate : null,
        days : days,
        gridModel : null,
        rows: 6,
        nbDays : 7
     }

     refreshView()
     {
        var seedDay = this.props.seedDate || new Date();
        this.setState({currentDate : seedDay});
        var startDate = new Date(seedDay);
        startDate.setDate(1);
        var dayFromSunday = startDate.getDay();
        if (this.props.startMonday === true)
        {
            this.setState({days : [...days.slice(1), days[0]]});
            dayFromSunday = dayFromSunday - 1;
            if (dayFromSunday < 0)
                dayFromSunday = 6;
        }
        startDate.setDate(startDate.getDate() - dayFromSunday);
        this.setState({startDate : startDate});
        
        var gridModel = [];
        for (var i = 0; i < this.state.rows; ++i)
        {
            var daysModel = [];
            for (var j = 0; j < this.state.nbDays; ++j)
            {
                daysModel.push(new Date(startDate));
                startDate.setDate(startDate.getDate() + 1);
            }
            gridModel.push(daysModel)
        }
        this.setState({gridModel : gridModel});
     }

     componentDidMount()
     {
        this.refreshView();  
     }


     componentDidUpdate(prevProps, prevState)
     {
         if (prevProps.seedDate !== this.props.seedDate)
         {
            this.refreshView();
         }
     }

     render() {
        let final =  
        <div>
           <p> date : { this.state.currentDate ? months[this.state.currentDate.getMonth()] + " " + this.state.currentDate.getFullYear() : "NA" }</p>
           <p> start date : { this.state.startDate ? this.state.startDate.toString()  : "NA" }</p>
           <div className='grid-container'>
                {this.state.gridModel && this.state.days.map( (day, index) => <div key={'header-' + index } className='grid-header-cal'>{day}</div>)}
                {this.state.gridModel && this.state.gridModel.map( (line, lineIndex) => 
                <div key={lineIndex}>
                    {line.map( (cell, index) => 
                        <div id={lineIndex + '-' + index} key={lineIndex + '-' + index}
                             className={'grid-cell-cal ' + (cell.getMonth() !== this.state.currentDate.getMonth() ? ' disable-grid-cell' : '')}>
                                 {cell.getDate()}
                        </div>
                    )}
                </div>
             )
            }
            </div>
        </div>
        
        return final;
     }
}

export default MonthGrid;