import React, { useState } from 'react';

function Header({ setPage }) {
  return (
    <header>
      <nav>
        <button onClick={() => setPage('entry')}>Entry</button>
        <button onClick={() => setPage('analysis')}>Analysis</button>
        <button onClick={() => setPage('log')}>Log</button>
      </nav>
    </header>
  )
}

export default Header;
