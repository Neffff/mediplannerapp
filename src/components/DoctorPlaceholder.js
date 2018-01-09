import React, {Component} from 'react';
import {db, doCreateEvent} from '../firebase';
import * as firebase from 'firebase';
import Button from 'material-ui/Button';
import '../styles/DoctorPlaceholder.css'
import Card from 'material-ui/Card';
import moment from 'moment';
class DoctorPlaceholder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            start: null,
            end: null
        };
    }

    componentWillReceiveProps(nextProps) {
        //zjada cpu
            
            this.setState( { start: moment(nextProps.slotInfoStart).format('YYYY-M-DD-H-m-s')});
            this.setState( { end: moment(nextProps.slotInfoEnd).format('YYYY-M-DD-H-m-s')});
            console.log(this.props);
        
       
        
    }

    onSubmit = (event) => {
        const {
            id = this.props.currentID,
        } = this.state;
        const itemsRef = firebase.database().ref(`events/${id}`);
        event.preventDefault();
        const item = {
        start: this.state.start,
        end: this.state.end
        }
        itemsRef.push(item);

    }

    render() {
        // {
        //     this.props.slotInfoStart & this.props.slotInfoEnd && console.log(moment(this.props.slotInfoStart).format('YYYY-M-DD-H-m-s'), moment(this.props.slotInfoEnd).format('YYYY-M-DD-H-m-s'))
        // }
        return (

            <Card>
                <div className="placeholder__container">
                    <Button raised onClick={this.props.handleClickBack}>
                        Wróć
                    </Button>
                    <p>Wizyta lekarska z {this.props.doctorName}</p>
                    <p>{this.props.slotInfoStart && moment(this.props.slotInfoStart).format('DD MMMM YYYY, [godzina] H:mm')}</p>
                    <form onSubmit={this.onSubmit}>
                        <Button raised color="primary" type="submit">
                            Zarezerwuj</Button>
                    </form>
                </div>
            </Card>

        );
    }
}
export default DoctorPlaceholder;