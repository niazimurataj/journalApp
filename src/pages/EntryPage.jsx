import React from 'react';
import styles from './EntryPage.module.css'; // Assuming you have some styles defined here
import PlushyMirror from '../components/PlushyMirror'; // Importing the PlushyMirror component
import { useState } from 'react';
import ArchedBackground from '../components/ArchedBackground'; // Importing the ArchedBackground component

function EntryPage() {
    return (
        <div className={styles.entryPageContainer}>
            <PlushyMirror className={styles.plushyMirrorCanvas} />
            <ArchedBackground>
                {/* The main content of the Entry Page */}
                <div className={styles.entryContent} backgroundColor="#f0f0f0" style={{ padding: '20px', borderRadius: '8px' }}>
                    <h1>Entry Page</h1>
                    <textarea
                        style={{
                            width: '60%',
                            minHeight: '200px',
                            padding: '10px',
                            fontSize: '16px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            resize: 'vertical'
                        }}
                        placeholder="Enter your text here..."
                    ></textarea>
                    <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {/* Worked Out */}
                        <div>
                            <label style={{ marginRight: '12px', fontWeight: 'bold' }}>Worked out?</label>
                            <button type="button" style={{ marginRight: '8px' }}>Yes</button>
                            <button type="button">No</button>
                        </div>
                        {/* Monitored Spending */}
                        <div>
                            <label style={{ marginRight: '12px', fontWeight: 'bold' }}>Monitored spending?</label>
                            <button type="button" style={{ marginRight: '8px' }}>Yes</button>
                            <button type="button">No</button>
                        </div>
                        {/* Nutrition */}
                        <div>
                            <label style={{ marginRight: '12px', fontWeight: 'bold' }}>Nutrition?</label>
                            <input
                                type="range"
                                min="1"
                                max="5"
                                defaultValue="3"
                                style={{ verticalAlign: 'middle', marginRight: '12px' }}
                                list="nutrition-marks"
                            />
                            <datalist id="nutrition-marks">
                                <option value="1" label="Terrible" />
                                <option value="2" label="Bad" />
                                <option value="3" label="Moderate" />
                                <option value="4" label="Good" />
                                <option value="5" label="Great" />
                            </datalist>
                            <span style={{ fontSize: '12px', color: '#888' }}>Terrible&nbsp;&nbsp;Bad&nbsp;&nbsp;Moderate&nbsp;&nbsp;Good&nbsp;&nbsp;Great</span>
                        </div>
                        {/* Productivity */}
                        <div>
                            <label style={{ marginRight: '12px', fontWeight: 'bold' }}>Productivity?</label>
                            <input
                                type="range"
                                min="1"
                                max="5"
                                defaultValue="3"
                                style={{ verticalAlign: 'middle', marginRight: '12px' }}
                                list="productivity-marks"
                            />
                            <datalist id="productivity-marks">
                                <option value="1" label="Terrible" />
                                <option value="2" label="Bad" />
                                <option value="3" label="Moderate" />
                                <option value="4" label="Good" />
                                <option value="5" label="Great" />
                            </datalist>
                            <span style={{ fontSize: '12px', color: '#888' }}>Terrible&nbsp;&nbsp;Bad&nbsp;&nbsp;Moderate&nbsp;&nbsp;Good&nbsp;&nbsp;Great</span>
                        </div>
                    </div>
                </div>
            </ArchedBackground>
        </div>
    );
}

export default EntryPage;