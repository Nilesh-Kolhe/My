import './ReachMe.css';
import './Contact.css';
import location from './Location.svg';
import linkedin from './LinkedIn.svg';
import instagram from './Instagram.svg';
import twitter from './Twitter.svg';
import email from './GMail.svg';

const ReachMe = () => {
    return (
        <div className='reachme-container'>
            <div>
                <div className='section-headline'>
                    Contact
                </div>
                <hr />
            </div>
            <div className="reachme-section">
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className="img-container" style={{ flexDirection: "row", margin: "10px -10px" }}>
                        <img style={{ height: "60px" }} src={`${location}`} alt="Location Logo" />
                        <div>
                            <p className="fw-bold">Currently</p>
                            <p className="txt-muted">Punawale</p>
                            <p className="txt-muted">Pune, Maharashtra, India - 411033</p>
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", margin: "10px -10px" }}>
                    <div style={{ display: "flex", flexDirection: "row", margin: "10px -10px" }}>
                        <img style={{ height: "40px" }} src={`${linkedin}`} alt="LinkedIn Logo" />
                        <div>
                            <p className="fw-bold">LinkedIn</p>
                            <a className="txt-muted" href="https://linkedin.com/in/nilesh-kolhe/" rel="noreferrer" target="_blank">/nilesh-kolhe</a>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", margin: "10px -2.5px" }}>
                        <img style={{ height: "40px" }} src={`${instagram}`} alt="Instagram Logo" />
                        <div>
                            <p className="fw-bold">Instagram</p>
                            <a className="txt-muted" href="https://instagram.com/neelesh_kolhe/" rel="noreferrer" target="_blank"><p className="txt-muted">/neelesh_kolhe</p></a>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", margin: "10px -2.5px" }}>
                        <img style={{ height: "40px" }} src={`${twitter}`} alt="Twitter Logo" />
                        <div>
                            <p className="fw-bold">Twitter</p>
                            <a className="txt-muted" href="https://twitter.com/neelesh_kolhe/" rel="noreferrer" target="_blank"><p className="txt-muted">/NeeleshKolhe</p></a>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", margin: "10px -2.5px" }}>
                        <img style={{ height: "37px" }} src={`${email}`} alt="Email Logo" />
                        <div>
                            <p className="fw-bold">Rocketmail</p>
                            <a className="txt-muted" href="mailto:kolhe.nilesh@rocketmail.com" rel="noreferrer" target="_blank"><p className="txt-muted">kolhe.nilesh</p></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReachMe;