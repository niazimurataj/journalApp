import { useState } from 'react'
import AnalysisPage from './pages/AnalysisPage'
import EntryPage from './pages/EntryPage'
import LogPage from './pages/LogPage'
import Header from './components/Header'
import Footer from './components/Footer'
import styles from './App.module.css' // Updated to use module CSS
import PlushyMirror from './components/PlushyMirror'
import ArchedBackground from './components/ArchedBackground'

const source = 'https://sieve-prod-us-central1-persistent-bucket.storage.googleapis.com/7542bf63-aad6-4f31-a8f4-5b9b93995efe/9f6ec7de-7321-4189-a512-1f06a1ef1340/1dfc6407-cbd6-4512-8f59-156136ab8b4e/tmpu_o9zm07.gif?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=abhi-admin%40sieve-grapefruit.iam.gserviceaccount.com%2F20250718%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250718T232800Z&X-Goog-Expires=172800&X-Goog-SignedHeaders=host&x-goog-signature=b067ab7518b12bd18d71a09ba4d04dec6098a0c3c01468c1e8a97841d333cbc44abb4068573ffbf33c781618394b9e46ecc627911ade63756a38c558246b71fabbd4f80d4a162954f66840187a1db8f25d2d4b23b7928cec745e39b41cb8525e14e11c0870afc1152c03fad86b49eb680dcacc5a414bbcea85dc4d6c0c99cb32d3049e9eb38e5ca9f24f6756f053e7b960aa74d19b4c3f71f3820f46daee464286f8590fd6019bb6b8d697d03031776a42d32a68c41c9829c0a76047755f5e683ee1d2ee3fa1a9662952f7a6653160f8b1f018f961a9e4a1c01ce877f416a6a9c7b4755d941b10978c3a2291960529a77baaf06698ca6714fcf52fbfda9e01f5';


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
        src={source}
        alt="Right side gif"
        className={styles.rightSideGif}
      />
      <img 
        src={source}
        alt="Left side gif"
        className={styles.leftSideGif}
      />
    </div>
  )
}

export default App
