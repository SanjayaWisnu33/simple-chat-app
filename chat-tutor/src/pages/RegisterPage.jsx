import React,{useState}from 'react'
import { useAuth } from '../utils/AuthContext'
import { Link } from 'react-router-dom'

export const RegisterPage = () => {
    
    const {handleUserRegister} = useAuth()
    
    const [credentials, setCredentials] = useState({
        name:'',
        email:'',
        password1:'',
        password2:''
    })

    const handleInputChange =(e)=>{
        let name = e.target.name
        let value = e.target.value

        setCredentials({...credentials,[name]:value})
    }

  return (
       <div className="auth--container">
        <div className='form--wrapper'>
            <form onSubmit={(e)=>{handleUserRegister(e,credentials)}}>
                <div className='field--wrapper'>
                    <label>Nama</label>
                    <input type="text" name="name"  placeholder='Masukan nama anda' value={credentials.name} onChange={handleInputChange} required />
                </div>
                <div className='field--wrapper'>
                    <label>Email</label>
                    <input type="email" name="email"  placeholder='Masukan email anda' value={credentials.email} onChange={handleInputChange} required />
                </div>
                <div className='field--wrapper'>
                    <label>Password</label>
                    <input type="password" name="password1" placeholder='Masukan password anda' value={credentials.password1} onChange={handleInputChange} required />
                </div>
                <div className='field--wrapper'>
                    <label>Konfirmasi Password</label>
                    <input type="password" name="password2" placeholder='Masukan ulang password anda' value={credentials.password2} onChange={handleInputChange} required />
                </div>
                <div className='field--wrapper'>
                    <input type="submit" value="Login" className='btn btn--lg btn--main'/>
                </div>
            </form>

            <p>Silahkan login jika sudah mempunyai akun <Link to ="/login">Disini</Link></p>
        </div>
    </div>
  )
}
