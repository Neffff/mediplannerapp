import React from 'react';
import LandingHeader from './Landing/LandingHeader.js';
import LandingLeft from './Landing/LandingLeft.js';
import LandingRight from './Landing/LandingRight.js';
import "../styles/landing.css";

const LandingPage = () => <div>
 <LandingHeader />
 <div className="landing__calendar">
<LandingLeft />
<LandingRight />
</div>
</div>

export default LandingPage;