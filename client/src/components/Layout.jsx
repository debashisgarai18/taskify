import React from 'react'
import { Outlet } from 'react-router-dom'
import HomeNavbar from './HomeNavbar'

const Layout = () => {
  return (
    <div>
        <HomeNavbar />
        <Outlet />
    </div>
  )
}

export default Layout


// This is mainly used to post a layout which will eventually keep the navbar in the top and render the other components under it 