import React, { useState } from 'react'
import { auth, googleProvider } from "../firebase"
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'

const Auth = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.log(error)
        }
    }

    const signInWithgoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (error) {
            console.log(error)
        }
    }
    
    const logOut = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div>
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='email' />
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='password' />

            <button onClick={signIn}> sign In</button>
            <button onClick={signInWithgoogle}> Sign in With Google</button>
            <button onClick={logOut}>logOut </button>
        </div>
    )
}

export default Auth