import React from 'react';
import './footer.css'; // Add this if you're using custom styles

const Footer = () => (
    <footer className="bg-dark text-white pt-5 pb-4">
        <div className="container text-md-left">
            <div className="row text-md-left">

                {/* University Info */}
                <div className="col-md-4 mb-4">
                    <img src="/logo.png" alt="University Logo" style={{ width: '60px' }} />
                    <h5 className="mt-2">South Eastern University of Sri Lanka</h5>
                    <p>இலங்கை தென்கிழக்குப் பல்கலைக்கழகம்</p>
                    <p>University Park, Oluvil, #32360, Sri Lanka.</p>
                    <p>
                        📞 +94 67 2255062 /63 /64<br />
                        📠 +94 67 2255217
                    </p>
                    <div className="d-flex gap-2">
                        <a href="#" className="text-white"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="text-white"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="text-white"><i className="fab fa-linkedin-in"></i></a>
                        <a href="#" className="text-white"><i className="fab fa-youtube"></i></a>
                    </div>
                </div>

                {/* Faculties */}
                <div className="col-md-2 mb-4">
                    <h6 className="text-uppercase fw-bold mb-3">Faculties</h6>
                    <ul className="list-unstyled">
                        <li>Arts and Culture</li>
                        <li>Management and Commerce</li>
                        <li>Applied Sciences</li>
                        <li>Islamic Studies & Arabic Language</li>
                        <li>Engineering</li>
                        <li>Technology</li>
                    </ul>
                </div>

                {/* Units & Centers */}
                <div className="col-md-3 mb-4">
                    <h6 className="text-uppercase fw-bold mb-3">Units & Centers</h6>
                    <ul className="list-unstyled">
                        <li>Postgraduate Unit - FMC</li>
                        <li>Postgraduate Unit - FAC</li>
                        <li>CEDPL</li>
                        <li>RIC</li>
                        <li>SDC</li>
                        <li>ICT Centre</li>
                        <li>Career Guidance Unit</li>
                        <li>OTS / AHEAD</li>
                    </ul>
                </div>

                {/* Useful Links */}
                <div className="col-md-3 mb-4">
                    <h6 className="text-uppercase fw-bold mb-3">Useful Links</h6>
                    <ul className="list-unstyled">
                        <li>Library</li>
                        <li>UGC</li>
                        <li>MOHE</li>
                        <li>AHEAD</li>
                        <li>LEARN</li>
                        <li>Gallery</li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="text-center mt-4 border-top pt-3">
            <small>© {new Date().getFullYear()} South Eastern University of Sri Lanka. All rights reserved.</small>
        </div>
    </footer>
);

export default Footer;
