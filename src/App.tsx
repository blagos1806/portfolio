import './i18n'   // side-effect: inicializa o i18next
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="App">
          My Portfolio
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
