import React from 'react'
import Header from './Header'
import Main from './main2'
import { BrowserRouter } from 'react-router-dom'
import Footer from './Footer'


export default function Myapp2() {
  return (
    <div>
      <BrowserRouter> {/*pour activer le routage dans l'application et pour évite le rechargement de page*/}
      <Header />
      <Main />
      <Footer/>
      </BrowserRouter>
    </div>

  )
}
