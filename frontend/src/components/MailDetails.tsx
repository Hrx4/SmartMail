import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { backend } from "../../backend"
import axios from "axios"

const MailDetails = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [email , setEmail] = useState<any>()


    useEffect(() => {
      const fetchEmail = async () => {
        const response = await axios.post(`${backend}/getemailbyid`,
          {
            id : params.id
          },
          {
            withCredentials: true
          }
        );
        if(response.status===401){
          window.location.href = '/login'
        }
        const data = await response.data;
        setEmail(data)
      };
      fetchEmail();
    }, [])
    

  return (
    <div className=" w-full flex flex-col gap-3 p-2 overflow-y-scroll border-t border-black bg-[#BDDDFC]">
      {email && <>
      
        <div className=" w-full flex font-bold text-3xl items-center border-b border-gray-400 pb-2">
          <button className=" pr-2" onClick={()=>navigate('/mails')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div className=" w-full ">
            {email?.subject}
          </div>
          <div
            className=" bg-red-300 p-2 text-xs rounded-lg mr-auto"
          >
            {email?.folder}
          </div>
        </div>

          <div className="flex gap-2 px-3">From
            <div className="font-bold"> 
              {email?.sender}</div> to         <div className="font-bold">
                {email?.account}</div> at <div className="font-bold">
                  {new Date(email?.receivedAt).toLocaleString()}
                </div>
          </div>
        
      <div className=" px-3 " dangerouslySetInnerHTML={{__html:email.parsedHTML}}/>
      </>}
    </div>
  )
}

export default MailDetails