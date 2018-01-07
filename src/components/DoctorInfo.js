import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import localization from 'moment/locale/pl'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/DoctorInfo.css'
//import { db } from '../firebase';

BigCalendar.momentLocalizer(moment);
const events = [
    {
      'title': 'Zajęty termin',
      'start': new Date(2018, 0, 4, 9, 0, 0),
      'end': new Date(2018, 0, 4, 9, 30, 0)
    },
    {
      'title': 'Long Event',
      'start': new Date(2018, 0, 20),
      'end': new Date(2018, 0, 20)
    }
]

const minTime = new Date();
    minTime.setHours(8,0,0);
    const maxTime = new Date();
    maxTime.setHours(18,1,0);

class DoctorInfo extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
             messages:  {
                date: 'Data',
                time: 'Teraz',
                event: 'Wizyta',
                allDay: 'cały dzień',
                next:">",
                previous:"<",
                today:"dzisiaj",
                month: "miesiąc",
                week: "tydzień",
                day: "dzień",
                agenda: "terminarz"
            }
        };
      }
componentWillReceiveProps() {

}
componentDidMount() {
    // const { location } = this.props
//  db.onceGetDoctors().then(snapshot =>
//  this.setState(() => ({doctors: snapshot.val()} ))
//   );
  }
  eventStyleGetter(event, start, end, isSelected) {
console.log(event);
var backgroundColor = '#' + 'EFACAE';
    var style = {
        backgroundColor: backgroundColor,
        borderRadius: '0px',
        opacity: 0.8,
        color: 'black',
        border: '0px',
    };
    return {
        style: style
    };
  }
    render() {
        return (        
<div className="info__container">
 <p>Doctor Info {this.props.location.state.doctorId} 
 {this.props.location.state.doctorName} 
 {this.props.location.state.doctorRole} 
 {this.props.location.state.doctorAvatar}</p>
 <BigCalendar
        events={events}
        messages={this.state.messages}
        min={minTime}
        max={maxTime}
        // onNavigate={(date, view) => {
        //     console.log('#### onNavigate');
        //     console.log('#### date=', date);
        //     console.log('#### view=', view);
        //     //this.setState({currentDate: date});
        //   }}
        startAccessor='start'
        endAccessor='end'
       eventPropGetter={(this.eventStyleGetter)}
      />
</div>
)
}
}



  export default DoctorInfo;