import React from 'react';
import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <span className={styles.text}>
                    © {new Date().getFullYear()} Sandbox App. All rights reserved.
                </span>
            </div>
        </footer>
    );
}

export default Footer;