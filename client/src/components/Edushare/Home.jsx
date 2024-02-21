import React from 'react'
import Header from './Header'
import Navbar from './Navbar';
import Classcard from './Classcard';
import '../../style/Home.css'
//import To_do from './To_do';
export default function Home() {
  return (
    
      <div>
     <Header />
     <Navbar />
     
        <div className='classcard'>
          <Classcard />
        </div>
     </div> 
  )
}
