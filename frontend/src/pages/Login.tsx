import {useGoogleLogin} from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const navigate = useNavigate()

    const ResponseGoogle = async (authResponse:any)=>{
        try {
            console.log(authResponse.code)
            const res = await axios.get(`http://localhost:5000/auth?code=${authResponse.code}`, {
                withCredentials: true
            })
            if(res.status === 200){
              localStorage.setItem('email', res.data.mainEmail)
              localStorage.setItem('picture', res.data.picture)
               navigate('/mails')
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: ResponseGoogle,
        flow: 'auth-code'
    })
  

  return (
    <div className="flex flex-col items-center justify-center h-dvh">
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={googleLogin}>
        Login with Google
      </button>
    </div>
  )
}

export default Login