import { useState } from 'react'
import { Button } from './components/ui/button'
import {ThemeProvider} from './components/theme-provider'
import './App.css'
import { ModeToggle } from './components/mode-toggle'
import { DotLottie, DotLottieReact } from '@lottiefiles/dotlottie-react'

function App() {
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

  const handleClick = () => {
    dotLottie?.play()
  }

  return (
    <ThemeProvider defaultTheme='dark' storageKey="vite-ui-theme">
      <div className='flex'>
      <Button variant={'outline'} onClick={handleClick}>Click
      {/* <DotLottieReact
        className={`absolute ${dotLottie?.isPlaying ? 'visible' : ''}`}
        dotLottieRefCallback={setDotLottie}
        src="https://lottie.host/2dd8e44b-8afb-4b57-85fd-fe853b334c4a/AvR4yfn09S.lottie"
      /> */}
      </Button>
      <ModeToggle></ModeToggle>
      </div>
    </ThemeProvider>
  )
}

export default App
