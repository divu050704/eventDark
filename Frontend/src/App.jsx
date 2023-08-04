import React from 'react'
import getCookie from './custom/getCookie';
import Home from './components/Home';

function App() {
  const [verified, setVerified] = React.useState(false)
  
  React.useEffect(()=>{
    fetch("http://localhost:8000/verify/",{credentials: "include", headers:{'X-CSRFToken': getCookie("csrftoken")}})
      .then(res => res.json())
      .then(data => data.Pass ? setVerified(true) : setVerified(false))
  },[])
  return (
    <>
      <Home verified={verified}/>
    </>
  )
}

export default App
