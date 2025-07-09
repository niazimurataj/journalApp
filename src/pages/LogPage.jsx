import React from 'react';
import { useState } from 'react';
import AnalysisSidebar from '../components/AnalysisSidebar';

function LogPage() {
    const [showSidebar, setShowSidebar] = useState(false);

    const journalEntries = [
        { id: 1, title: 'Entry 1', content: 'Today I learned about React.' },
        { id: 2, title: 'Entry 2', content: 'Worked on a cool project.' },
        { id: 3, title: 'Entry 3', content: 'Had a productive meeting.' },
    ];

    function handleDragStart(e, entry) {
        e.dataTransfer.setData('application/json', JSON.stringify(entry));
    }

    function VerticalCarousel() {
        const [current, setCurrent] = useState(0);

        const prev = () => setCurrent((c) => (c === 0 ? journalEntries.length - 1 : c - 1));
        const next = () => setCurrent((c) => (c === journalEntries.length - 1 ? 0 : c + 1));

        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 300 }}>
                <button onClick={prev} style={{ marginBottom: 8 }}>↑</button>
                <div
                    draggable
                    onDragStart={(e) => handleDragStart(e, journalEntries[current])}
                    style={{
                        border: '1px solid #ccc',
                        borderRadius: 8,
                        padding: 16,
                        marginBottom: 8,
                        background: '#fff',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        width: '100%',
                        cursor: 'grab',
                    }}
                >
                    <h3>{journalEntries[current].title}</h3>
                    <p>{journalEntries[current].content}</p>
                </div>
                <button onClick={next}>↓</button>
            </div>
        );
    }

    return (
        <div>
            <h1>Log Page</h1>
            <div style={{ display: 'flex' }}>
                <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 10 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <input
                            type="checkbox"
                            checked={showSidebar}
                            onChange={() => setShowSidebar((v) => !v)}
                        />
                        Show Analysis Sidebar
                    </label>
                </div>
                {showSidebar && (
                    <AnalysisSidebar
                        onDrop={e => {
                            e.preventDefault();
                            const data = e.dataTransfer.getData('application/json');
                            // handle dropped data here
                        }}
                        onDragOver={e => e.preventDefault()}
                        style={{ minWidth: 250, borderRight: '1px solid #eee', background: '#fafafa' }}
                    />
                )}
                <div style={{ flex: 1, marginLeft: showSidebar ? 250 : 0, transition: 'margin-left 0.2s' }}>
                    <VerticalCarousel />
                </div>
            </div>
        </div>
    );
}

export default LogPage;