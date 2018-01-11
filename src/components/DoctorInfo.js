import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import '../styles/DoctorInfo.css'

class DoctorInfo extends Component {
    render() {
        const { doctorAvatar, doctorName, doctorRole } = this.props;
    
    return (        
<div >

     <Card className="doctorInfo_container">
      <Avatar
      className="doctorInfo_avatar"
      alt={doctorName}
      src={doctorAvatar}
    />
      <CardContent className="doctorInfo_info">
          
        <Typography type="headline" component="h2">
        {doctorName}
        </Typography>
        <Typography component="p">
        {doctorRole}
        </Typography>
      </CardContent>
    </Card>
    </div>
    );
}
}
  export default DoctorInfo;