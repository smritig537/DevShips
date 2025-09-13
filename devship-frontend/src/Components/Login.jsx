import React from 'react'
import { useState } from 'react'
import axios from 'axios';

const Login = () => {
  const [email,setEmailId] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async () =>{
    
    try {
      const res = await axios.post('http://localhost:5000/login',{
        email,
        password,
      },{withCredentials:true})
      console.log(res)
    } catch (error) {
      console.log('error',error)
    }
  }
  return (
   <div className='flex justify-center items-center my-10'>
    <div className="card card-dash bg-base-100 w-96">
  <div className="card-body">
  <h1 className='card-title justify-center'>Login</h1>
    <label className='form-control w-full max-w-xs py-2 my-2'>
      <span className="label-text">Email ID</span>
      <input type="email" placeholder="Email" className="input input-bordered w-full max-w-xs "
      value={email}
      onChange={(e) => setEmailId(e.target.value)} />
    </label>
     <label className='form-control w-full max-w-xs py-2 my-2'>
      <span className="label-text">Password</span>
      <input type="password" placeholder="password" className="input input-bordered w-full max-w-xs"
      value={password}
      onChange={(e) => setPassword(e.target.value)} />
    </label>
    <div className="card-actions justify-center m-2">
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  
  </div>
</div>
   </div>
  )
}

export default Login
