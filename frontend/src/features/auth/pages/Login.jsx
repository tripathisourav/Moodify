import React, { useState } from 'react'
import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Link, useNavigate } from 'react-router'
import '../styles/form.scss'
import FormGroup from '../components/FormGroup'

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const { handleLogin, loading, user } = useAuth()

  if (loading) {
    return <main><h1>Loading....</h1></main>
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const res = await handleLogin(username, password)
    // console.log(res);

    if (res?.user) {
      navigate('/')
    }

    setUsername("")
    setPassword("")

  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <input type="text" name='username'
            onChange={(e) => {
              setUsername(e.target.value)
            }} placeholder='Enter Username' />

          <input type="password" name='password'
            onChange={(e) => {
              setPassword(e.target.value)
            }} placeholder='Enter Password' />

          {/* <FormGroup type={'text'} name={'username'} placeholder={'Enter Username or Email'} setUsername={setUsername}/>
            <FormGroup type={'password'} name={'password'} placeholder={'Enter Password'} setUsername={setUsername}/> */}


          <button className='button primary-button'>Login</button>
        </form>

        <p>Don't have an account <Link className='toggleAuthForm' to='/register'>register</Link></p>
      </div>
    </main>
  )
}

export default Login