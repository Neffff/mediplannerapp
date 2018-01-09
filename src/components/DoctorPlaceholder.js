import React, {Component} from 'react';
import Button from 'material-ui/Button';
import '../styles/DoctorPlaceholder.css'
import Card from 'material-ui/Card';
class DoctorPlaceholder extends Component {
    render() {
        return (
            
                <Card>
                    <div className="placeholder__container">
                    <Button raised onClick={this.props.handleClickBack}>
                        Wróć
                    </Button>
                    <p>Wizyta lekarska z lek. Halina Kapuścińska</p>
                    <p>11 Styczeń 2018, godzina 11:30</p>
                    <Button raised color="primary" 
                    type="submit">
                    Zarezerwuj</Button>
                    </div>
                </Card>
            
        );
    }
}
export default DoctorPlaceholder;