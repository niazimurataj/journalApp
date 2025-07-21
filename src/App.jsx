import { useState } from 'react'
import AnalysisPage from './pages/AnalysisPage'
import EntryPage from './pages/EntryPage'
import LogPage from './pages/LogPage'
import Header from './components/Header'
import Footer from './components/Footer'
import styles from './App.module.css' // Updated to use module CSS
import PlushyMirror from './components/PlushyMirror'
import ArchedBackground from './components/ArchedBackground'
import guardian from './assets/guardian.gif'


function App() {
  // Okay, so this is the main state for which page is showing.
  // useState('entry') means we start on the entry page by default.
  const [page, setPage] = useState('entry')

  // This function decides which page component to render based on the current state.
  // It checks the value of 'page' and returns the corresponding component.
  const renderPage = () => {
    switch (page) {
      case 'analysis':
        return <AnalysisPage />
      case 'log':
        return <LogPage />
      case 'entry':
      default:
        // If 'page' is 'entry' or anything unexpected, just show EntryPage.
        return <EntryPage />
    }
  }

  return (
    <div className={styles.appContainer}>
      <PlushyMirror className={styles.plushyMirrorCanvas} />
      <ArchedBackground>
        {/* The main content of the current page */}
        <div className={styles.pageContent}>
          {renderPage()}
        </div>
      </ArchedBackground>
      <img 
        src={guardian}
        alt="Right side gif"
        className={styles.rightSideGif}
      />
      <img 
        src={guardian}
        alt="Left side gif"
        className={styles.leftSideGif}
      />
    </div>
  )
}

export default App
