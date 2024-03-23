import './header.css'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

import Logo from '../../assets/Logo.png'
import SearchPanel from '../searchPanel/SearchPanel'

const Header = () => {
    const arrayLinks = [
        {title : 'home' , path : '/'},
        {title : 'about' , path : '/about'},
        {title : 'byGenre' , path : '/search'}
      ]

      
      const [isVisible, setIsVisible] = useState(false)
      

  return (
    <header>
      <div className="headerMain_container">
      <Link to = '/'>
              <div className = 'header_logo'>
                   <img src={Logo} alt="Logo"/>
                   <h2>movie<span>App</span></h2>
              </div>
        </Link>
        <div className= 'header_nav'>
            <ul className='nav-items'>
                {arrayLinks?.map((el,idx)=>{
                    return <li key={idx}>
                              <Link to={el.path}> {el.title} </Link> 
                           </li>
                })}
                <li><FontAwesomeIcon icon={faSearch} color='blue' onClick={()=>setIsVisible((prev)=>!prev)}/> </li>  
            </ul>
        </div>
      </div>

      <SearchPanel isVisible={isVisible} setIsVisible={setIsVisible}/>
    </header>
  )
}

export default Header