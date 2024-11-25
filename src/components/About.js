import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <div className='section-headline'>
                About Me <i style={{marginLeft: "7px"}} className="bi bi-file-earmark-person"></i>
            </div>
            <hr />
            <p className='section-description'>
            My journey into the world of Computer Science and Engineering began in high school, when I took my first programming class.
            I was fascinated by the problem-solving aspect of coding, but I also craved a creative outlet.
            I quickly realized that I didn't have to choose between my two passions. Instead, I could combine them.
            That's why I decided to pursue my major in Computer Engineering at the University of Pune along with building my personal portfolio of work GitHub.
            It's the perfect field for someone like me who loves to think logically and creatively.
            </p>
        </div>
    );
}

export default About;