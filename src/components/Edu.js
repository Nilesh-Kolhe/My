import './Edu.css';

const Edu = () => {
    return (
        <div className="edu-container">
            <div className='section-headline'>
                Education <i class="bi bi-backpack-fill"></i>
            </div>
            <hr />
            <div className="edu-section">
                <div className='org'>
                    <div className="org-name">
                        Pune University, Pune
                        <p className="txt-muted" style={{ fontWeight: 'small', fontWeight: '400' }}>Bachelor of Engineering - Computer</p>
                    </div>
                    <div className='year'>2014</div>
                </div>

                <div className='org'>
                    <div className="org-name">
                        C-DAC ACTS, Pune
                        <p className="txt-muted" style={{ fontWeight: 'small', fontWeight: '400' }}>Post Graduation Diploma in Advanced Computing</p>
                    </div>
                    <div className='year'>2015</div>
                </div>
            </div>
        </div>
    );
}

export default Edu;