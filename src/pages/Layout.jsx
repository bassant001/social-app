import React from 'react'
import { Outlet } from 'react-router'
import MyNavbar from '../components/Navbar'

export default function Layout() {
  return (
    <>
    <MyNavbar/>
    <Outlet/>
    </>
  )
}
