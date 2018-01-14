import React, {Component} from 'react';
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
            end: null,
            currentUser: null,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.slotInfoEnd !== nextProps.slotInfoEnd) {
            this.setState({
                start: moment(nextProps.slotInfoStart).format('YYYY-M-DD-H-m-s')
            });
            this.setState({
                end: moment(nextProps.slotInfoEnd).format('YYYY-M-DD-H-m-s')
            });
        }
    }
    componentWillMount() {
        this.setState({ currentUser: firebase.auth().currentUser.uid})
      }
    onSubmit = (event) => {
        const {
            id = this.props.currentID
        } = this.state;
        const itemsRef = firebase
            .database()
            .ref(`events/${id}`);
        event.preventDefault();
        const item = {
            start: this.state.start,
            end: this.state.end
        }
        let itemPushed = itemsRef.push(item);
        console.log(itemPushed.key);

        const itemUser = {
            start: this.state.start,
            end: this.state.end,
            doctor: id,
        }
        const itemsRefUser = firebase
        .database()
        .ref(`eventUser/${this.state.currentUser}/${itemPushed.key}`);
        itemsRefUser.set(itemUser);
    }

    render() {
        const {update} = this.props;
        return (

            <Card className="placeholder__card">
                <div className="placeholder__container">
                    <Button raised onClick={this.props.handleClickBack}>
                        Wróć
                    </Button>
                    <p>Wizyta lekarska z {this.props.doctorName}</p>
                    <p>{this.props.slotInfoStart && moment(this.props.slotInfoStart).format('DD MMMM YYYY, [godzina] H:mm')}</p>
                    <form onSubmit={this.onSubmit}>
                        <Button onClick={update} raised color="primary" type="submit">
                            Zarezerwuj</Button>
                    </form>
                </div>
            </Card>

        );
    }
}
export default DoctorPlaceholder;