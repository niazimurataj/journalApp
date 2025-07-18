import React from 'react';
import styles from './ArchedBackground.module.css';

function ArchedBackground( {children}) {
    return (
        <div className={styles.archContainer}>
                {children}
        </div>
    );
}

export default ArchedBackground;