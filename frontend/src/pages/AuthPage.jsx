import React from 'react'
import Header from '../components/Header'
import SignupCard from '../components/SignupCard'
import authScreenAtom from '../atoms/authAtom'
import LoginCard from '../components/LoginCard'
import { useSetRecoilState } from 'recoil'
import { useRecoilValue } from 'recoil'
const AuthPage = () => {
    const authScreenState=useRecoilValue(authScreenAtom);
    
  return (
    <div>
      {/* <Header/> */}
      {authScreenState==="login" ? <LoginCard/> : <SignupCard/>}
    </div>
  )
}

export default AuthPage
