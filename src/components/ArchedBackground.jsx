import React from 'react';
import styles from './ArchedBackground.module.css';

// We'll pass the links as a new prop called 'headerLinks'
function ArchedBackground({ children, headerLinks }) {
    return (
        <div className={styles.archContainer}>
            {/* The navigation will now live inside the arch */}
            {headerLinks}

            {/* The rest of your content */}
            <div className={styles.contentWrapper}>
                {children}
            </div>
        </div>
    );
}

export default ArchedBackground;