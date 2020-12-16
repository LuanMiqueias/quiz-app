import React from 'react';
import logo from  '../../assets/icons/logo.svg';
import {Link} from 'react-router-dom'

import './style.css'
function Header({children}){
    return(
       <header>
         <div className="content">
            <Link to="/" className="logo"><img src={logo} alt="Logo" title="logo" height="40px"/></Link>
            {children}
         </div>
      </header>
    )
}

export default Header