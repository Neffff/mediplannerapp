import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import { OffCanvas, OffCanvasMenu, OffCanvasBody } from 'react-offcanvas';
import DoctorPlaceholder from './DoctorPlaceholder';
import DoctorInfo from './DoctorInfo';
import moment from 'moment';
import localization from 'moment/locale/pl'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/DoctorCalendar.css'
import Dialog, { DialogActions, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import { db } from '../firebase';
import * as config from '../constants/config';
BigCalendar.momentLocalizer(moment);

class DoctorCalendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMenuOpened: false,
            dbevents: null,
            slotInfoStart: null,
            slotInfoEnd: null,
            isDialogOpened: false,
        };
        this.selectBigCalendarSlot = this.selectBigCalendarSlot.bind(this);
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickDialogOpen = this.handleClickDialogOpen.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
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
  update(){
    db.onceGetEvents().then(snapshot =>
      this.setState(() => ({ dbevents: snapshot.val()} ))
    )
  }
  eventStyleGetter(event, start, end, isSelected) {
var backgroundColor = '#EFACAE';
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
    slotInfo.start > new Date ? (
    this.setState({ isMenuOpened: true }),
    this.setState({ slotInfoStart: slotInfo.start}),
    this.setState({ slotInfoEnd: slotInfo.end})
    ) : (
      this.handleClickDialogOpen())
  }
  handleClickBack() {
    this.setState({ isMenuOpened: false });
  };
  handleClickDialogOpen() {
    this.setState({ isDialogOpened: true });
  };
  handleDialogClose() {
    this.setState({ isDialogOpened: false });
  };

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
 <DoctorInfo doctorAvatar={this.props.location.state.doctorAvatar} doctorName={this.props.location.state.doctorName} doctorRole={this.props.location.state.doctorRole} />
 <OffCanvas width={600} transitionDuration={300} isMenuOpened={this.state.isMenuOpened} position={"right"}>
        <OffCanvasBody className={"calendar_body"}>
 <BigCalendar
        events={dbevents ? Object.values(dbevents[currentID]) : []}
        messages={config.messages}
        selectable={'ignoreEvents'}
        views={{week: true}}
        defaultView={'week'}
        min={config.minTime}
        max={config.maxTime}
        startAccessor='start'
        endAccessor='end'
        eventPropGetter={(this.eventStyleGetter)}
        onSelectSlot={this.selectBigCalendarSlot}
      />
        </OffCanvasBody>
        <OffCanvasMenu className={"calendar_placeholder"} style={{top: '345px', padding: '20px', boxSizing: 'border-box'}}>
          <DoctorPlaceholder 
          handleClickBack={this.handleClickBack} 
          doctorName={this.props.location.state.doctorName}
          currentID={currentID}
          slotInfoStart={slotInfoStart}
          slotInfoEnd={slotInfoEnd}
          // onSubmitClick={this.updateDbEvents}
          update={this.update.bind(this)}
          />
        </OffCanvasMenu>
      </OffCanvas>
      <div>
        <Dialog
          open={this.state.isDialogOpened}
          onClose={this.handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Termin wybranej wizyty minął, prosimy wybrać inną date."}</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary" autoFocus>
              Zrozumiałem
            </Button>
          </DialogActions>
        </Dialog>
      </div>
</div>
)
};
};
  export default DoctorCalendar;