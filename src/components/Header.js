import React from 'react'
import { Bars3Icon } from '@heroicons/react/24/solid'
import './app.css';
import { Link } from 'react-router-dom';
import Home from './Home';
const Header = () => {
  return (
    <div className='top'>
      <a className="t" href='#'>SIVAPRAKASH</a>
      <nav>
        <ul>
        <li><Link to={<Home/>}></Link></li>
        <li><a href='#'>About</a></li>
        <li><a href='#'>Project</a></li>
        <li><a href='#'>Contact</a></li>
      </ul>
      </nav>
    </div>
  )
}

export default Header
