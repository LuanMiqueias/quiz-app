import React from 'react';
import logo from  '../../assets/icons/logo.svg';
import {Link} from 'react-router-dom'

import './style.css'
function Header({children}){
    return(
       <header>
         <div className="content">
            <Link to="/"><img src={logo} alt="Logo" title="logo"/></Link>
            {children}
         </div>
      </header>
    )
}

export default Header