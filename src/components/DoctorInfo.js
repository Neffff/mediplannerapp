import React, { Component } from 'react';
//import { db } from '../firebase';

class DoctorInfo extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
          doctorID: null
        };
      }

componentDidMount() {
    var recievedMessage = this.props.location.state.doctorID
    console.log(recievedMessage);
    // const { location } = this.props
//  db.onceGetDoctors().then(snapshot =>
//  this.setState(() => ({doctors: snapshot.val()} ))
//   );
  }
    render() {
        

       
    return (        
<div>
 <p>Doctor Info {this.props.location.state.doctorId} 
 {this.props.location.state.doctorName} 
 {this.props.location.state.doctorRole} 
 {this.props.location.state.doctorAvatar}</p>
</div>
)
}
}

  export default DoctorInfo;