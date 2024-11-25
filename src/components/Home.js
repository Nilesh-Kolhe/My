import './Home.css';
import download from './download-icon.svg';
// import location from './img0.jpg';
import location from './img1.jpg';
import profile from './Nilesh_Kolhe.PNG';
// import profile from './img3.jpg';

const Home = () => {
    return (
        <div className="home-container">
            <img src={`${location}`} style={{ width: "100%", height: "375px" }} />
            <div className='image-text-container'>
                <p className='image-container'>
                    <img src={`${profile}`} style={{ width: "240px", height: "250px", borderRadius: "5px", border: "1px grey solid" }} />
                </p>
                <div className='text-container'>
                    <p style={{ fontSize: "large", fontWeight: "600", marginBottom: "0px" }}>Hi There &#128075; ! </p>
                    <p style={{ fontSize: "large", fontWeight: "600", marginBottom: "0px" }}>This is </p>
                    <p style={{ fontSize: "xx-large", fontWeight: "700", marginBottom: "2px" }}>Neelesh Kolhe</p>
                    <p style={{ fontSize: "small", fontWeight: "700", marginBottom: "10px" }}>Coder &#128187; | Snapper &#128248; | Footballer &#9917;</p>
                    <a href="Resume.pdf" download="Full_Stack_Angular_React_Dot_Net_Dev.pdf">
                        <button style={{ borderStyle: 'none', borderRadius: "8px", height: "35px", width: "160px", fontSize: "small", fontWeight: 300 }}>
                            <img style={{ height: "15px", width: "20px", marginRight: "5px" }} src={`${download}`} alt="Download Icon" />
                            Download Resume
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Home;