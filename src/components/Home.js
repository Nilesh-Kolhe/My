import './Home.css';
import download from './download-icon.svg';

const Home = () => {
    return (
        <div className="home-container">
            <p className="text-muted" style={{ fontSize: "x-large", fontWeight: "600", marginBottom: "0px" }}>Hi There &#128075; ! This is</p>
            <p style={{ fontSize: "xxx-large", fontWeight: "700", marginBottom: "2px" }}>Neelesh Kolhe</p>
            <p style={{ fontSize: "small", fontWeight: "700", marginBottom: "10px" }}>Coder &#128187; | Snapper &#128248; | Footballer &#9917;</p>
            <a href="Resume.pdf" download="Full_Stack_Angular_React_Dot_Net_Dev.pdf">
                <button style={{ borderStyle: 'none', borderRadius: "8px", height: "35px", width: "160px", fontSize: "small", fontWeight: 300 }}>
                    <img style={{ height: "15px", width: "20px", marginRight: "5px" }} src={`${download}`} alt="Download Icon" />
                    Download Resume
                </button>
            </a>
        </div>
    );
}

export default Home;