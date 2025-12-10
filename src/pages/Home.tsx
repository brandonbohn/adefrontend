import Foundersection from '../components/FoundersSection';
import { useNavigate } from 'react-router-dom';
import SocialMediaSection from '../components/SocialMediaSection';
import AboutSection from './AboutSection';
import ImpactBoard from '../components/ImpactBoard';


function Home() {
    const navigate = useNavigate();
    const goToDonate = () => navigate('/donate');
    const goToSponsor = () => navigate('/sponsor-a-girl');

    return (
        <div style={{
            margin: '0 auto',
            padding: '0',
            maxWidth: '1200px',
            width: '100%',
            boxSizing: 'border-box',
        }}>
            <main>
                <div className="dark-section" style={{
                    borderRadius: '18px',
                    padding: '0',
                    marginBottom: '2.5rem',
                    marginTop: '20px',
                    overflow: 'visible',
                    position: 'relative',
                    width: '100%',
                    minHeight: '0',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    height: 'auto',
                    background: '#a31515',
                }}>
                    <div id="hero-frame" style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '1100px',
                        margin: '0 auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: '56.25%',
                        boxSizing: 'border-box'
                    }}>
                        {/* Mission statement above video and buttons */}
                        <div style={{
                            position: 'absolute',
                            top: 5,
                            left: 5,
                            right: 5,
                            background: '#000',
                            color: '#fff',
                            borderRadius: 12,
                            padding: '1.2rem 1.5rem',
                            fontSize: '1.15rem',
                            fontWeight: 500,
                            textAlign: 'center',
                            boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
                            zIndex: 7
                        }}>
                            <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.7rem', fontWeight: 700, textAlign: 'center' }}>Our Mission</h2>
                            <div style={{ textAlign: 'left' }}>
                              We exist to uplift and support girls in Kibera by using football as a bridge to education, dignity, and opportunity. Through mentorship, essential support, and talent development, we create pathways for girls to break cycles of poverty, early marriage, and school dropout and instead, become changemakers in their lives and their communities.
                            </div>
                        </div>
                        {/* Video inside frame */}
                        <video id="hero-video"
                            src={"/soccervideo.mp4"}
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                display: 'block',
                                borderRadius: '8px',
                                objectFit: 'cover',
                                zIndex: 3,
                            }}
                        />
                        {/* Headline text on top of video */}
                        <h1 id="hero-headline" style={{
                            position: 'absolute',
                            top: 'calc(48% - 50px)',
                            left: 5,
                            right: 5,
                            color: 'white',
                            fontSize: '2.1rem',
                            fontWeight: 'bold',
                            textShadow: '2px 2px 8px #000',
                            margin: 0,
                            padding: '1.2rem 1.5rem',
                            textAlign: 'center',
                            zIndex: 5,
                            background: 'rgba(0,0,0,0.25)',
                            borderRadius: 12,
                            boxSizing: 'border-box',
                            width: 'auto',
                            whiteSpace: 'wrap',
                        
                            textOverflow: 'ellipsis'
                        }}>
                            <span style={{ display: 'block', width: '100%', fontWeight: 700, fontSize: '2.1rem', lineHeight: 1.1, letterSpacing: '0.5px' }}>
                                ADE Community Based Organization
                            </span>
                            <span style={{ display: 'block', width: '100%', fontWeight: 400, fontSize: '2.1rem', marginTop: '0.5rem', lineHeight: 1.1, letterSpacing: '0.5px' }}>
                                changing lives one goal at a time
                            </span>
                        </h1>
                        {/* Desktop CTA (positioned below headline, padded down 100px) */}
                        <div className="hero-cta" style={{
                            position: 'absolute',
                            left: '50%',
                            bottom: 110,
                            transform: 'translate(-50%, 0)',
                            zIndex: 6,
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '1rem',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            maxWidth: '900px',
                            padding: '0 1rem',
                            boxSizing: 'border-box',
                        }}>
                            <button
                                className="btn"
                                style={{
                                    padding: '0 2rem',
                                    fontSize: '1.25rem',
                                    background: '#d32f2f',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                                    width: '380px',
                                    height: '72px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 700,
                                    letterSpacing: '1px',
                                    transition: 'background 0.3s ease',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                                onClick={goToDonate}
                            >
                                Change a Girl's Life Today
                            </button>
                            <button
                                className="btn"
                                style={{
                                    padding: '0 2rem',
                                    fontSize: '1.25rem',
                                    background: '#d32f2f',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                                    width: '380px',
                                    height: '72px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 700,
                                    letterSpacing: '1px',
                                    transition: 'background 0.3s ease',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                                onClick={goToSponsor}
                            >
                                Sponsor a Girl
                            </button>
                        </div>
                    </div>

                    {/* Mobile-only CTA group (stacked; shown below the video) */}
                    <div className="hero-cta-mobile" style={{ width: '100%', maxWidth: '1100px', marginTop: 12, display: 'none', padding: '0 12px', boxSizing: 'border-box' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <button className="btn" style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 12, padding: '0.9rem 1rem', fontSize: '1.05rem', fontWeight: 700, width: '100%' }} onClick={goToDonate}>Change a Girl's Life Today</button>
                            <button className="btn" style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 12, padding: '0.9rem 1rem', fontSize: '1.05rem', fontWeight: 700, width: '100%' }} onClick={goToSponsor}>Sponsor a Girl</button>
                        </div>
                    </div>

                </div>

                {/* Main website content below hero section */}
            </main>

            {/* Impact Board after video */}
            {/* Impact Board: fetch and pass data as needed, or refactor to fetch inside ImpactBoard */}
            <ImpactBoard />
            {/* Excellence Red Box under Impact Board */}
            <div style={{
                background: '#a31515',
                color: '#fff',
                borderRadius: 12,
                padding: '2rem',
                margin: '2.5rem auto 1.5rem auto',
                maxWidth: 1100,
                width: '100%',
                textAlign: 'center',
                fontWeight: 700,
                fontSize: '2rem',
                boxShadow: '0 4px 16px rgba(0,0,0,0.18)'
            }}>
                Inspiring Excellence, Empowering Dreams, One Goal at a Time
            </div>
            {/* Three vertical photos between the red box and the black boxes */}
            <div style={{
                display: 'flex',
                flexDirection: 'row', // changed from 'column' to 'row'
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1.5rem',
                margin: '2.5rem auto 1.5rem auto',
                maxWidth: 1100, // changed from 340 to 1100 for horizontal layout
                width: '100%',
            }}>
                <img src="/greenteam.jpeg" alt="Girls in Action" style={{ flex: 1, minWidth: 220, maxWidth: 340, borderRadius: 12, objectFit: 'cover', boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }} />
                <img src="/twogirls.jpeg" alt="ADE Girls" style={{ flex: 1, minWidth: 220, maxWidth: 340, borderRadius: 12, objectFit: 'cover', boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }} />
                <img src="/teamandcoaches.jpeg" alt="Coaches and Girls" style={{ flex: 1, minWidth: 220, maxWidth: 340, borderRadius: 12, objectFit: 'cover', boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }} />
            </div>
            {/* Three horizontal black boxes: Who We Are, What We Do, Vision (in that order) */}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'stretch',
                gap: '2rem',
                margin: '2.5rem auto 1.5rem auto',
                maxWidth: 1100,
                width: '100%',
                flexWrap: 'nowrap',
            }}>
                {/* About, What We Do, Vision: refactor to fetch and pass data, or move to separate components */}
                {/* ...existing code for layout... */}
            </div>
            {/* Our Teams Section (Founders + Team Pictures) */}
            {/* Our Founders Section */}
            <section style={{ margin: '2.5rem auto 1.5rem auto', maxWidth: 1100, width: '100%' }}>
                <h2 style={{ color: '#fff', background: '#a31515', borderRadius: 12, padding: '1rem 2rem', fontWeight: 700, fontSize: '2rem', marginBottom: '0', textAlign: 'center', letterSpacing: '1px' }}>Our Founders</h2>
                <div style={{ background: '#111', borderRadius: 12, padding: '2rem', marginTop: '0', marginBottom: '2rem' }}>
                    <div style={{
                        display: 'flex',
                        gap: '2rem',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <img src="/adriano.jpg" alt="Adriano Situma" style={{ width: 180, height: 180, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 4px 16px rgba(0,0,0,0.18)', marginBottom: '1rem' }} />
                            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.2rem' }}>Adriano Situma</div>
                            <div style={{ color: '#ccc', fontSize: '1rem' }}>Visionary leader & co-founder</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <img src="/daniel.jpg" alt="Daniel Ogweno" style={{ width: 180, height: 180, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 4px 16px rgba(0,0,0,0.18)', marginBottom: '1rem' }} />
                            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.2rem' }}>Daniel Ogweno</div>
                            <div style={{ color: '#ccc', fontSize: '1rem' }}>Community mentor & co-founder</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Teams Section (Founders + Team Pictures) */}
            <section style={{ margin: '2.5rem auto 1.5rem auto', maxWidth: 1100, width: '100%' }}>
                <h2 style={{ color: '#fff', background: '#a31515', borderRadius: 12, padding: '1rem 2rem', fontWeight: 700, fontSize: '2rem', marginBottom: '0', textAlign: 'center', letterSpacing: '1px' }}>Our Teams</h2>
                <div style={{ background: '#111', borderRadius: 12, padding: '2rem', marginTop: '0', marginBottom: '2rem' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '1.5rem',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%'
                    }}>
                        <img src="/greenteam.jpeg" alt="Green Team" style={{ width: '100%', borderRadius: 12, objectFit: 'cover', boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }} />
                        <img src="/blueteam.jpeg" alt="Blue Team" style={{ width: '100%', borderRadius: 12, objectFit: 'cover', boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }} />
                        <img src="/whiteteam.jpeg" alt="White Team" style={{ width: '100%', borderRadius: 12, objectFit: 'cover', boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }} />
                        <img src="/teamphoto.jpeg" alt="Main Team Photo" style={{ width: '100%', borderRadius: 12, objectFit: 'cover', boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }} />
                        <img src="/teamandcoaches.jpeg" alt="Team and Coaches" style={{ width: '100%', borderRadius: 12, objectFit: 'cover', boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }} />
                        <img src="/teamhuddle.jpeg" alt="Team Huddle" style={{ width: '100%', borderRadius: 12, objectFit: 'cover', boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }} />
                        <img src="/teammix.jpeg" alt="Team Mix" style={{ width: '100%', borderRadius: 12, objectFit: 'cover', boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }} />
                        <img src="/teamphotoonthefield.jpeg" alt="Team Photo on Field" style={{ width: '100%', borderRadius: 12, objectFit: 'cover', boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }} />
                    </div>
                </div>
                {/* Founders Section */}
                <Foundersection customStyle={{ margin: '2rem auto', maxWidth: 1100 }} />
            </section>

            {/* Other sections: refactor to fetch and pass data, or move to separate components */}

            {/* Mobile CSS: hide overlay CTAs and show stacked CTAs below the video */}
            <style>{`
                @media (max-width: 720px) {
                    .hero-cta { display: none !important; pointer-events: none !important; }
                    .hero-cta-mobile { display: block !important; }
                    /* nudge headline down slightly on mobile to avoid overlap */
                    #hero-headline { font-size: 1.6rem !important; top: calc(40% + 20px) !important; padding: 0 0.6rem !important; }
                    #hero-frame { padding-top: 56.25% !important; }
                }
            `}</style>
        </div>
    );
}

export default Home;