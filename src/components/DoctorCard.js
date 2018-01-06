import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import '../styles/DoctorCard.css'

class DoctorCard extends Component {
    render() {
        const { doctors } = this.props;
    
    return (        
<div className="card__container">
{Object.keys(doctors).map(key => (
     <Card key={key} className="card__doctor" doctors="this.props.doctors">
      <Avatar
      className="card__avatar"
      alt={doctors[key].name}
      src={doctors[key].avatar}
    />
      <CardContent>
        <Typography type="headline" component="h2">
        {doctors[key].name}
        </Typography>
        <Typography component="p">
        {doctors[key].role}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={{
          pathname: `/home/${key}`,
          state: { doctorId: `${key}`,
          doctorName: `${doctors[key].name}`,
          doctorRole: `${doctors[key].role}`,
          doctorAvatar: `${doctors[key].avatar}`
        } 
          }}><Button dense color="primary">
          Umów się na wizyte
        </Button></Link>
      </CardActions>
    </Card>
    )
    )}
      
    </div>
    );
}
}
  export default DoctorCard;