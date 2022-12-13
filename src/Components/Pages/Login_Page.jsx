import React, { useState,useEffect } from 'react'

const Login_Page = () => {
  const [value,setvalue]=useState({
    password:"",
    email:"",
    login:false,
    store:null,
    post:"HI",
  })
  // const login=()=>{
  //   fetch('http://localhost:8000/auth/register?email=ni@email.com&password=niteesh',{
  //     method:"POST",
  //     // body:JSON.stringify(value)
  //   }).then((response)=>{
  //     response.json().then((result)=>{
  //       console.log("Result",result);
  //       // localStorage.setItem('login',JSON.stringify({
  //       //   login:true,
  //       //   token:result.token
  //       // }))

  //     })
  //   })
  // }
  // useEffect(() => {
  //  fetch('http://localhost:8000/auth/register?email=ni@email.com&password=niteesh',{
  //     method:"POST"
  //   }).then((response)=>response.json().then((result)=>console.log(result)))
 
  // }, )
  useEffect(()=>{
storeCollector()
console.log(value.login," : LOGIN")
  },[])

  const storeCollector=()=>{
    // console.log("LOGIN",value.login)
    let store=JSON.parse(localStorage.getItem("login"))
    if(store && store.login)
    {
      setvalue({login:true,store:store})
    }
    console.log(value.login," : LOGIN")
    
  }
  const login=()=>{
    console.log("LOGIN")
    fetch('http://localhost:8000/auth/login',{
      method:"POST",
      body:JSON.stringify(value)
    }).then((response)=>response.json()
    .then((result)=>{console.log(result.access_token);
    localStorage.setItem('login',JSON.stringify({
      login:true,
      token:result.access_token
    }))
  storeCollector()
  })
    
    )
    
  }
const Post=()=>{
  console.log("POST",value.post,"Token ",value.store.token);
  let token="Bearer "+value.store.token
  fetch('http://localhost:8000/auth/register',{
    method:"POST",
    headers:{
      "Authorization":token
    },
    body:JSON.stringify(value.post)
  }).then((response)=>response.json()
  .then((result)=>{console.log(result);
  // localStorage.setItem('login',JSON.stringify({
  //   login:true,
  //   token:result.access_token
  // }))
storeCollector()
})
  
  )
  
}
return (<>
  { !value.login ?  <div>
 
    
 <input type="text" onChange={(event)=>{setvalue({email:event.target.value})}} />
<br/><br/>

 <input type="text" onChange={(event)=>{setvalue({password:event.target.value})}} />
<br/><br/>    


<button onClick={()=>{login()}} >Login</button>

</div>:
<div>
  <textarea onChange={(event)=>{setvalue({post:event.target.value})}}/>
  <button onClick={()=>Post()}>POST</button>
</div> }
 
  </>
  
  )
}

export default Login_Page