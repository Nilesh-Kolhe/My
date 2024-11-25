import './Home.css';
import download from './download-icon.svg';
import location from './img2.jpg';
// import location from './img1.jpg';
import profile from './Nilesh_Kolhe.PNG';
// import profile from './img3.jpg';

const Home = () => {
    return (
        <div className="home-container">
            <img id="cover-picture" src={`${location}`} />
            <div className='image-text-container'>
                <p className='image-container'>
                    <img id="profile-picture" src={`${profile}`} style={{ }} />
                </p>
                <div className='text-container'>
                    <p className='sub-title'>Hi There &#128075; ! </p>
                    <p className='sub-title'>This is </p>
                    <p id="name">Neelesh Kolhe</p>
                    <p id="desc">Coder &#128187;|Snapper &#128248;|Footballer &#9917;</p>
                    <a href="Resume.pdf" download="Full_Stack_Angular_React_Dot_Net_Dev.pdf">
                        <button style={{ borderStyle: 'none', borderRadius: "8px", height: "35px", width: "200px", fontSize: "small", fontWeight: 300 }}>
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