import React from 'react'
import Login from './Login.js'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home.js'
import Supplier from './Supplier.js'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/supplier' element={<Supplier/>}></Route>
      </Routes>
      
    </BrowserRouter>
  )
}

export default App