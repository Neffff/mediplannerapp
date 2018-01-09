import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import { OffCanvas, OffCanvasMenu, OffCanvasBody } from 'react-offcanvas';
import DoctorPlaceholder from './DoctorPlaceholder';
import moment from 'moment';
import localization from 'moment/locale/pl'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/DoctorCalendar.css'
import { db } from '../firebase';

BigCalendar.momentLocalizer(moment);

const minTime = new Date();
    minTime.setHours(8,0,0);
    const maxTime = new Date();
    maxTime.setHours(18,0,0);

class DoctorCalendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMenuOpened: false,
            dbevents: null,
            slotInfoStart: null,
            slotInfoEnd: null,
             messages:  {
                date: 'Data',
                time: 'Teraz',
                event: 'Wizyta',
                allDay: '',
                next:">",
                previous:"<",
                today:"Dzisiaj",
                month: "miesiąc",
                week: "tydzień",
                day: "dzień",
                agenda: "terminarz"
            }
        };
        this.selectBigCalendarSlot = this.selectBigCalendarSlot.bind(this);
        this.handleClickBack = this.handleClickBack.bind(this);
      }
      componentWillMount() {
        // sets the initial state
        this.setState({
          isMenuOpened: false
        })
      }
componentDidMount() {
    db.onceGetEvents().then(snapshot =>
        this.setState(() => ({ dbevents: snapshot.val()} ))
      )
  }
  componentDidUpdate() {
    db.onceGetEvents().then(snapshot =>
      this.setState(() => ({ dbevents: snapshot.val()} ))
    )
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
  selectBigCalendarSlot(slotInfo) {
    this.setState({ isMenuOpened: true });
    this.setState({ slotInfoStart: slotInfo.start});
    this.setState({ slotInfoEnd: slotInfo.end});
  }
  handleClickBack() {
    // toggles the menu opened state
    this.setState({ isMenuOpened: false });
  }
    render() {
        const { dbevents, slotInfoStart, slotInfoEnd } = this.state;
        const currentID = this.props.location.state.doctorId;
        {dbevents && Object.keys(dbevents).map(dbeventID => (
            dbeventID === currentID && Object.values(dbevents[dbeventID]).forEach((item, index) => {
                item.end = new Date(moment(item.end, 'YYYY-M-DD-H-m-s')),
                item.start = new Date(moment(item.start, 'YYYY-M-DD-H-m-s'))})
          ))}
        return (        
<div className="info__container">
 <p>Doctor Info {this.props.location.state.doctorId} 
 {this.props.location.state.doctorName} 
 {this.props.location.state.doctorRole} 
 {this.props.location.state.doctorAvatar}
 {/* {console.log(addedEvents)} */}
 {/* {dbevents && Object.keys(dbevents).map(dbeventID => (
    dbeventID === currentID && Object.values(dbevents[dbeventID]).forEach((item, index) => {
        item.end = new Date(moment(item.end, 'YYYY-M-DD-H-m-s')),
        item.start = new Date(moment(item.start, 'YYYY-M-DD-H-m-s'))})
  ))} */}
  {/* {console.log(dbevents)}
  {console.log((dbevents && Object.keys(dbevents).map(id => 
    (id === currentID && console.log(dbevents[id])))))} */}
 </p>
 <OffCanvas width={600} transitionDuration={300} isMenuOpened={this.state.isMenuOpened} position={"right"}>
        <OffCanvasBody className={"my_body_class"}>
 <BigCalendar
        events={dbevents ? Object.values(dbevents[currentID]) : []}
        messages={this.state.messages}
        selectable={'ignoreEvents'}
        views={{week: true}}
          defaultView={'week'}
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
        onSelectSlot={this.selectBigCalendarSlot}
      />
        </OffCanvasBody>
        <OffCanvasMenu className={"calendar_placeholder"} style={{top: '180px', padding: '20px', boxSizing: 'border-box'}}>
          <DoctorPlaceholder 
          handleClickBack={this.handleClickBack} 
          doctorName={this.props.location.state.doctorName}
          currentID={currentID}
          slotInfoStart={slotInfoStart}
          slotInfoEnd={slotInfoEnd}
          />
        </OffCanvasMenu>
      </OffCanvas>
</div>
)
}
}



  export default DoctorCalendar;