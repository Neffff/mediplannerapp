import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import localization from 'moment/locale/pl'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/DoctorInfo.css'
import { db } from '../firebase';

BigCalendar.momentLocalizer(moment);
let events = [
    {
      'title': 'Zajęty termin',
      'start': '2018-1-5-9-30-0',
      'end': '2018-1-5-10-0-0'
    }

]

const minTime = new Date();
    minTime.setHours(8,0,0);
    const maxTime = new Date();
    maxTime.setHours(18,0,0);

class DoctorInfo extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            currentID: null,
            dbevents: null,
            minTime: null,
             messages:  {
                date: 'Data',
                time: 'Teraz',
                event: 'Wizyta',
                allDay: 'cały dzień',
                next:">",
                previous:"<",
                today:"Dzisiaj",
                month: "miesiąc",
                week: "tydzień",
                day: "dzień",
                agenda: "terminarz"
            }
        };
      }

componentDidMount() {
    this.setState(() => ({ currentID: this.props.location.state.doctorId}))
    db.onceGetEvents().then(snapshot =>
        this.setState(() => ({ dbevents: snapshot.val()} ))
      );

      events.forEach((item, index) => {
          events[index].end = new Date(moment(item.end, 'YYYY-M-DD-H-m-s')),
          events[index].start = new Date(moment(item.start, 'YYYY-M-DD-H-m-s'));
      })
      console.log(events);
    //   this.state.dbevents && Object.keys(this.state.dbevents).map(dbeventID => (
    //     dbeventID === this.state.currentID && console.log(Object.values(this.state.dbevents[dbeventID]))
    //   )) 
    console.log(this.state.currentID);
  }
  eventStyleGetter(event, start, end, isSelected) {
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
  selectBigCalendarSlot(e) {
      alert('aaa');
  }

    render() {
        const { dbevents, currentID } = this.state;
        
        return (        
<div className="info__container">
 <p>Doctor Info {this.props.location.state.doctorId} 
 {this.props.location.state.doctorName} 
 {this.props.location.state.doctorRole} 
 {this.props.location.state.doctorAvatar}
 {/* {this.props.location.state.doctorEventTitle}
 {this.props.location.state.doctorEventStart}
 {this.props.location.state.doctorEventEnd} */}
 {this.state.dbevents && Object.keys(this.state.dbevents).map(dbeventID => (
    dbeventID === currentID && console.log(Object.values(dbevents[dbeventID]))
  ) )
  }
 </p>
 <BigCalendar
        events={events}
        messages={this.state.messages}
        selectable={'ignoreEvents'}
        // onSelecting={(e) => false}
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
       onSelectSlot={() => this.selectBigCalendarSlot()}
      />
</div>
)
}
}



  export default DoctorInfo;