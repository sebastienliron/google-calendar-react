import { Component }  from 'react';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

class MonthGrid extends Component {
    state = {
        currentDate: null,
        startDate: null,
        endDate : null,
        gridModel : null,
        rows: 6,
        nbDays : 7
     }

     componentDidMount()
     {
        var seedDay = new Date();
        this.setState({currentDate : this.state.currentDate || seedDay});
        var startDate = new Date(seedDay);
        startDate.setDate(1);
        var dayFromSunday = startDate.getDay();
        startDate.setDate(-dayFromSunday);
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

     render() {
        let final =  
        <div>
           <p> date : { this.state.currentDate ? months[this.state.currentDate.getMonth()] + " " + this.state.currentDate.getFullYear() : "NA" }</p>
           <p> start date : { this.state.startDate ? this.state.startDate.toString()  : "NA" }</p>
           <div>
               cells :  {this.state.gridModel ?  this.state.gridModel.length : 'null'}
            {this.state.gridModel && this.state.gridModel.map( line => 
                <div>
                    {line.map( cell => 
                        <div className={'grid-cell-cal ' + (cell.getMonth() !== this.state.currentDate.getMonth() ? ' disable-grid-cell' : '')}>{cell.getDate()}</div>
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