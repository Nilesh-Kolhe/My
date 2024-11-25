import './Experience.css';

const Experience = () => {
    return (
        <div className="experience-container">
            <div className='section-headline'>
                Experience <i className="bi bi-reception-4"></i>
            </div>
            <hr />
            <div className="experience-section">
                <div className='org'>
                    <div className="org-name">
                        Atos
                        <p className="txt-muted" style={{ fontWeight: 'small' }}>Consultant</p>
                    </div>
                    <div>2021 - 2024</div>
                </div>

                <div className='org'>
                    <div className="org-name">
                        CapGemini Technology Services
                        <p className="txt-muted" style={{ fontWeight: 'small' }}>Consultant</p>
                    </div>
                    <div>2020 - 2021</div>
                </div>

                <div className='org'>
                    <div className="org-name">
                        Emerson Innovation center
                        <p className="txt-muted" style={{ fontWeight: 'small' }}>Senior Engineer I</p>
                    </div>
                    <div>2020 - 2020</div>
                </div>

                <div className='org'>
                    <div className="org-name">
                        Tieto India Private Limited
                        <p className="txt-muted" style={{ fontWeight: 'small' }}>Software Engineer</p>
                    </div>
                    <div>2017 - 2020</div>
                </div>

                <div className='org'>
                    <div className="org-name">
                        Infosys Limited
                        <p className="txt-muted" style={{ fontWeight: 'small' }}>Senior Systems Engineer</p>
                    </div>
                    <div>2015 - 2017</div>
                </div>

            </div>
        </div>
    );
}

export default Experience;