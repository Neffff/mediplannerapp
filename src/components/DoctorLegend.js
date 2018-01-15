import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import '../styles/DoctorLegend.css'

const DoctorLegend = () =>
<Paper className="doctorlegend__container" elevation={2}>
  <div className="doctorlegend__icons">
  <div>
<div>
    <div className="doctorlegend__white"></div>
 <p>wolny termin</p>
 </div>
 <div>
 <div className="doctorlegend__red"></div>
 <p>zajęty termin</p>
 </div>
 </div>
 <div>
 <div>
 <div className="doctorlegend__grey"></div>
 <p>termin niedostępny</p>
 </div>
 <div>
 <div className="doctorlegend__blue"></div>
<p>dzisiejszy dzień (wolny termin)</p>
</div>
</div>
  </div>
</Paper>

  export default DoctorLegend;


  