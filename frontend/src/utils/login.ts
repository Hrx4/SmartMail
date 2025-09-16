import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { useNavigate } from "react-router-dom"

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

    export default googleLogin