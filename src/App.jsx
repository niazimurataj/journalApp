import { useState } from 'react'
import AnalysisPage from './pages/AnalysisPage'
import EntryPage from './pages/EntryPage'
import LogPage from './pages/LogPage'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css' // Assuming you have some global styles here
import PlushyMirror from './components/PlushyMirror'


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
    <div className="App">
      {/* Header gets setPage as a prop, so I guess Header can change which page is showing? */}
      <Header setPage={setPage} />
      {/* This is where the main content changes depending on 'page' */}
      {renderPage()}
      {/* Footer is always shown, nothing fancy here */}
      <PlushyMirror />
      <Footer />
      {/*TODO: make the above a background to the journal*/}
    </div>
  )
}

export default App
