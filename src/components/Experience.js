import './Experience.css';

const Experience = () => {
    return (
        <div className="experience-container">
            <div className='section-headline'>
                Work <i className="bi bi-reception-4"></i>
            </div>
            <hr />
            <div className="experience-section">
                <div className='org'>
                    <div className="org-name">
                        Atos
                        <p className="txt-muted" style={{ fontWeight: 'small', fontWeight: '400' }}>Consultant</p>
                    </div>
                    <div className='year'>2021</div>
                </div>
            </div>
        </div>
    );
}

export default Experience;