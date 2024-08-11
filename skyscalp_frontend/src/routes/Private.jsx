import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Private() {
    // const {isLoggedIn } = useAuth()
    const user = JSON.parse(localStorage.getItem('user'))
    let isLoggedIn = false
    if(user){
        isLoggedIn = user.isLoggedIn 
    }
    return (
        isLoggedIn && isLoggedIn ? <Outlet /> : <Navigate to="../login" />
    )
}
