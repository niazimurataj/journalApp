import React, { useState, useCallback } from 'react';

// Simple styles for the sidebar, button, and drop area
const styles = {
    sidebar: {
        width: 300,
        background: '#fff',
        borderRight: '1px solid #e5e7eb',
        height: '100vh',
        padding: '32px 16px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    header: {
        fontSize: 24,
        fontWeight: 700,
        marginBottom: 32,
        letterSpacing: 1,
    },
    goButtonWrapper: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 32,
    },
    goButton: {
        position: 'relative',
        padding: '12px 40px',
        fontSize: 18,
        fontWeight: 600,
        color: '#fff',
        background: '#2563eb',
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer',
        overflow: 'hidden',
        outline: 'none',
        zIndex: 1,
    },
    scanBorder: {
        content: '""',
        position: 'absolute',
        top: -4,
        left: -4,
        right: -4,
        bottom: -4,
        borderRadius: 10,
        border: '2px solid #2563eb',
        boxSizing: 'border-box',
        animation: 'scan 2s linear infinite',
        pointerEvents: 'none',
        zIndex: 0,
    },
    dropArea: {
        flex: 1,
        border: '2px dashed #2563eb',
        borderRadius: 8,
        background: '#f3f4f6',
        minHeight: 120,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.2s',
        marginBottom: 16,
    },
    dropAreaActive: {
        background: '#dbeafe',
    },
    cardId: {
        background: '#2563eb',
        color: '#fff',
        borderRadius: 4,
        padding: '4px 12px',
        margin: '4px 0',
        fontSize: 14,
        fontWeight: 500,
    },
};

// Keyframes for scanning border
const scanKeyframes = `
@keyframes scan {
    0% { box-shadow: 0 0 0 0 #2563eb44; }
    50% { box-shadow: 0 0 0 6px #2563eb22; }
    100% { box-shadow: 0 0 0 0 #2563eb44; }
}
`;

export default function AnalysisSidebar({ onAnalyze }) {
    const [dragActive, setDragActive] = useState(false);
    const [cardIds, setCardIds] = useState([]);

    // Handle drop event
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setDragActive(false);
        // Assume card ID is in dataTransfer under 'card/id'
        const id = e.dataTransfer.getData('card/id');
        if (id && !cardIds.includes(id)) {
            setCardIds((prev) => [...prev, id]);
        }
    }, [cardIds]);

    // Handle drag events
    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };
    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragActive(false);
    };

    // Handle Go button click
    const handleGo = () => {
        if (onAnalyze) {
            onAnalyze(cardIds);
        } else {
            alert('Analyzing cards: ' + cardIds.join(', '));
        }
    };

    return (
        <aside style={styles.sidebar}>
            <style>{scanKeyframes}</style>
            <div style={styles.header}>Analyze.</div>
            <div style={styles.goButtonWrapper}>
                <button style={styles.goButton} onClick={handleGo}>
                    Go
                    <span
                        style={{
                            ...styles.scanBorder,
                            animation: 'scan 2s linear infinite',
                            position: 'absolute',
                            top: -4,
                            left: -4,
                            right: -4,
                            bottom: -4,
                            borderRadius: 10,
                            border: '2px solid #2563eb',
                            pointerEvents: 'none',
                            zIndex: 0,
                        }}
                    />
                </button>
            </div>
            <div
                style={{
                    ...styles.dropArea,
                    ...(dragActive ? styles.dropAreaActive : {}),
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {cardIds.length === 0 ? (
                    <span style={{ color: '#2563eb', fontWeight: 500 }}>
                        Drag cards here
                    </span>
                ) : (
                    cardIds.map((id) => (
                        <div key={id} style={styles.cardId}>
                            Card ID: {id}
                        </div>
                    ))
                )}
            </div>
        </aside>
    );
}