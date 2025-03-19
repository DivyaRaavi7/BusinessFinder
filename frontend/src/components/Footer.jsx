import React from 'react';

const Footer = () => {
    const styles = {
        footerContainer: {
            background: 'linear-gradient(135deg, #2c2c54, #472f92)',
            color: '#fff',
            padding: '60px 20px',
            textAlign: 'center',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
        },
        content: {
            maxWidth: '1200px',
            margin: '0 auto',
        },
        heading: {
            fontSize: '2rem',
            marginBottom: '10px',
        },
        subText: {
            color: '#b3b3cc',
            marginBottom: '30px',
        },
        button: {
            backgroundColor: '#82ccdd',
            color: '#1a1a2e',
            border: 'none',
            padding: '12px 30px',
            borderRadius: '25px',
            cursor: 'pointer',
            fontWeight: '600',
        },
        linksContainer: {
            display: 'flex',
            justifyContent: 'space-evenly',
            marginTop: '50px',
            flexWrap: 'wrap',
        },
        linkSection: {
            textAlign: 'left',
        },
        linkTitle: {
            fontSize: '1.2rem',
            fontWeight: '600',
            marginBottom: '10px',
        },
        linkItem: {
            color: '#b3b3cc',
            textDecoration: 'none',
            display: 'block',
            marginBottom: '5px',
            cursor: 'pointer',
        },
        socialIcons: {
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            marginTop: '30px',
        },
        icon: {
            color: '#b3b3cc',
            fontSize: '1.5rem',
            cursor: 'pointer',
        },
        copyright: {
            marginTop: '40px',
            fontSize: '0.9rem',
            color: '#b3b3cc',
        },
    };

    return (
        <div style={styles.footerContainer}>
            <div style={styles.content}>
                <h2 style={styles.heading}>Want to partner with us?</h2>
                <p style={styles.subText}>
                    If you're interested in our partnership and would like to find out more,
                    one of our advisors is excited to help.
                </p>
                <button style={styles.button}>Get Started</button>

                <div style={styles.linksContainer}>
                    <div style={styles.linkSection}>
                        <h3 style={styles.linkTitle}>Partnerships</h3>
                        <a style={styles.linkItem}>Websites</a>
                        <a style={styles.linkItem}>Social Media</a>
                        <a style={styles.linkItem}>Branding</a>
                    </div>

                    <div style={styles.linkSection}>
                        <h3 style={styles.linkTitle}>About</h3>
                        <a style={styles.linkItem}>Our Why</a>
                        <a style={styles.linkItem}>Our Work</a>
                        <a style={styles.linkItem}>Careers</a>
                    </div>

                    <div style={styles.linkSection}>
                        <h3 style={styles.linkTitle}>Support</h3>
                        <a style={styles.linkItem}>Support Request</a>
                        <a style={styles.linkItem}>Contact</a>
                    </div>

                    <div style={styles.linkSection}>
                        <h3 style={styles.linkTitle}>Follow Us</h3>
                        <div style={styles.socialIcons}>
                            <i className="fab fa-facebook-f" style={styles.icon}></i>
                            <i className="fab fa-twitter" style={styles.icon}></i>
                            <i className="fab fa-linkedin-in" style={styles.icon}></i>
                            <i className="fab fa-instagram" style={styles.icon}></i>
                        </div>
                    </div>
                </div>

                <p style={styles.copyright}>
                    ©2025 BusinessFinder ltd. All rights reserved. | <span>Privacy Policy</span>
                </p>
            </div>
        </div>
    );
};

export default Footer;
