import './Home.css';
import download from './download-icon.svg';
// import location from './img2.jpg';
import location from './img9.jpg';
import profile from './Nilesh_Kolhe.PNG';
import { PopupWidget } from "react-calendly";

const Home = () => {
    return (
        <div className="home-container">
            <img id="cover-picture" src={`${location}`} alt='Cover Picture' />
            <div className='image-text-container'>
                <p className='image-container'>
                    <img id="profile-picture" src={`${profile}`} alt='Profile Picture' />
                </p>
                <div className='text-container'>
                    <p className='sub-title'> Hi, </p>
                    <p className='sub-title'> I am </p>
                    <p id="name">Neelesh</p>
                    <p id="desc">Coder &#128187; | Snapper &#128248; | Mentor &#129496;&#127995;</p>
                    <a className="social" href="Resume.pdf" download="Full_Stack_Angular_React_Dot_Net_Dev.pdf">
                        <button style={{ backgroundColor: '#fff', color: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'none', borderRadius: "8px", height: "35px", width: "200px", fontSize: "small", fontWeight: 300 }}>
                            <img style={{ height: "15px", width: "20px", marginRight: "5px" }} src={`${download}`} alt="Download Icon" />
                            Download Resume
                        </button>
                    </a>

                    <PopupWidget
                        url="https://calendly.com/nilesh-kolhe"
                        rootElement={document.getElementById("root")}
                        text="Schedule a 1:1 call"
                        textColor="#ffffff"
                        color="#00a2ff"
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;