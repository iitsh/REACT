import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Compteur from './Exemple1'
import MonComposant from './Exemple2'
import Increment from './Exemple3_incrementation'
import Decrement from './Exemple3_decrementation'
import Increment_dec_ini from './Exemple3_incrementation'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Increment_dec_ini />
  </StrictMode>,
)
