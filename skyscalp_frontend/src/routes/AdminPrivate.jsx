import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminPrivate() {
    // const {isLoggedIn } = useAuth()
    const user = JSON.parse(localStorage.getItem('user'))
    let isLoggedIn = false
    if (user && user.isAdmin) {
        isLoggedIn = user.isLoggedIn
    }
    return (
        isLoggedIn && isLoggedIn ? <Outlet /> : <Navigate to="../login" />
    )
}
