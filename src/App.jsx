import { useState } from 'react'
import AnalysisPage from './pages/AnalysisPage'
import EntryPage from './pages/EntryPage'
import LogPage from './pages/LogPage'
import Header from './components/Header'
import Footer from './components/Footer'
import styles from './App.module.css' // Updated to use module CSS
import PlushyMirror from './components/PlushyMirror'
import ArchedBackground from './components/ArchedBackground'


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
        src="https://sieve-prod-us-central1-persistent-bucket.storage.googleapis.com/7542bf63-aad6-4f31-a8f4-5b9b93995efe/d140b5a6-5601-4bfa-a1ab-ea35b0040226/64caeb94-32e9-458a-b010-14f6af682f11/tmpi982pv2v.gif?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=abhi-admin%40sieve-grapefruit.iam.gserviceaccount.com%2F20250718%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250718T230758Z&X-Goog-Expires=172800&X-Goog-SignedHeaders=host&x-goog-signature=5aec64ed48f1bd1e57fd5aa5fe41c5269230c8cba659e48b34dbb2c7f82f8d2a3c4a90d44cecc9284c247ce4c3a66c555c38096c8af1611492c621c84305643d4a46a6770c95a1d818987efb529a70a0139429524c6853e5d875ff025e1b2acacae0f7b8964080737794187fe3d9859ec900c330af53529c8a1918fe568ca7a3d6590ce9b70703fd1da6bf35d7eedea1a59c69b3e75e758bcf6a9b9e32f439bd518358c392fc857395fc8bc76793aca05858a02dd7434f5e4dd617ce11c531d03521f298b397ea279c54275c1a644d5595d4d37132a6d16e5ad8477b8669f0d6f09b4b5a3f4443962616d84fc577863ee27d7e863994d68ffc5b0e68cef2e461"
        alt="Right side gif"
        className={styles.rightSideGif}
      />
      <img 
        src="https://sieve-prod-us-central1-persistent-bucket.storage.googleapis.com/7542bf63-aad6-4f31-a8f4-5b9b93995efe/d140b5a6-5601-4bfa-a1ab-ea35b0040226/64caeb94-32e9-458a-b010-14f6af682f11/tmpi982pv2v.gif?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=abhi-admin%40sieve-grapefruit.iam.gserviceaccount.com%2F20250718%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250718T230758Z&X-Goog-Expires=172800&X-Goog-SignedHeaders=host&x-goog-signature=5aec64ed48f1bd1e57fd5aa5fe41c5269230c8cba659e48b34dbb2c7f82f8d2a3c4a90d44cecc9284c247ce4c3a66c555c38096c8af1611492c621c84305643d4a46a6770c95a1d818987efb529a70a0139429524c6853e5d875ff025e1b2acacae0f7b8964080737794187fe3d9859ec900c330af53529c8a1918fe568ca7a3d6590ce9b70703fd1da6bf35d7eedea1a59c69b3e75e758bcf6a9b9e32f439bd518358c392fc857395fc8bc76793aca05858a02dd7434f5e4dd617ce11c531d03521f298b397ea279c54275c1a644d5595d4d37132a6d16e5ad8477b8669f0d6f09b4b5a3f4443962616d84fc577863ee27d7e863994d68ffc5b0e68cef2e461"
        alt="Left side gif"
        className={styles.leftSideGif}
      />
    </div>
  )
}

export default App
