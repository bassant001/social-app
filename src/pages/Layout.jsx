import React from 'react'
import { Outlet } from 'react-router'
import MyNavbar from '../components/Navbar'

export default function Layout() {
  return (
    <>
    <MyNavbar/>
    <div className=' bg-gray-300 min-h-screen w-screen pt-20 '><Outlet/></div>
    </>
  )
}
