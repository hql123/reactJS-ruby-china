import React from 'react'
import HeaderComponent from '../components/header'
import FooterComponent from '../components/footer'
import '../assets/styles/app.css';

let App = ({ children }) => {
  return (
    <div>
      <HeaderComponent />
      {children}
      <FooterComponent />
    </div>
  );
}


export default App
