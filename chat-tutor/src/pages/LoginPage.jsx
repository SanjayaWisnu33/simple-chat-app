import React, {useEffect, useState} from 'react'
import { useAuth } from '../utils/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

const LoginPage = () => {
    const {user, handleUserLogin} = useAuth()
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        email:'',
        password:''
    })

    useEffect(()=>{
        if(user){
            navigate('/')
        }
    }, [])

    const handleInputChange =(e)=>{
        let name = e.target.name
        let value = e.target.value

        setCredentials({...credentials,[name]:value})
    }

  return (
    <div className="auth--container">
        <div className='form--wrapper'>
            <form onSubmit={(e)=>{handleUserLogin(e,credentials)}}>
                <div className='field--wrapper'>
                    <label>Email</label>
                    <input type="email" name="email"  placeholder='Masukan email anda' value={credentials.email} onChange={handleInputChange} required />
                </div>
                <div className='field--wrapper'>
                    <label>Password</label>
                    <input type="password" name="password" placeholder='Masukan password anda' value={credentials.password} onChange={handleInputChange} required />
                </div>
                <div className='field--wrapper'>
                    <input type="submit" value="Login" className='btn btn--lg btn--main'/>
                </div>
            </form>

            <p>Silahkan buat akun jika tidak punya <Link to ="/register">Disini</Link></p>
        </div>
    </div>
  )
}

export default LoginPage