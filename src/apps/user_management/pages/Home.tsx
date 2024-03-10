// import React from 'react'
import { NavBar } from '../components'
import '../styles/HomeStyle.css';

// um: user management

export const Home = () => {
  return (
    <>
      <NavBar />
      <div className='um-home'>
        <div className='um-home-explain'>
          <h2>Welcome to this base project</h2>
          <p>What do I mean with "base"?</p>
          <p>
            Well you can use this project as base for other projects, having an user and roles management 
            is something usual in projects. You can custom many things in this project as well you could 
            expand it! which is very welcome
          </p>
          <p>There are two options:</p>
          <ul>
            <li>Let users to register by themselfs</li>
            <li>Admin or someone (with the privilege to do) will create the users and give the credentials</li>
          </ul>
          <p>At the end you could give credentials to users to use recovery password or not. It all depends on
            you, so I'll recommend you to watch my youtube video where I explain how you can adjust the privileges.
            Click <a href="#" target='_blank'>here</a>
          </p>
        </div>
      </div>
    </>
  )
}
