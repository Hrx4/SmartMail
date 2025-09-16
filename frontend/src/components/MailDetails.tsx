import { useEffect, useState } from "react"
import {  useParams } from "react-router-dom"
import { backend } from "../../backend"
import axios from "axios"
import { Trash2 } from "lucide-react"

const MailDetails = () => {
    const params = useParams()
    // const navigate = useNavigate()
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
          window.location.href = '/'
        }
        const data = await response.data;
        setEmail(data)
      };
      fetchEmail();
    }, [])
    

  return (
    <div className=" w-full flex flex-col gap-3 p-2 overflow-y-scroll border-t border-gray-200 ">
      {email && <>
      
                <div className="border-b border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">{email.subject}</h2>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                          {email.sender[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{email?.sender}</p>
                          <p className="text-xs text-gray-500">to {email?.account} • {new Date(email?.receivedAt).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className=" text-center space-x-2">
                      
                      <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-full hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2">
                        <span  className="text-xs">{email.folder}</span>
                      </div>
                    </div>
                  </div>
                </div>

        
      <div className=" px-3 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{__html:email.parsedHTML}}/>
      </>}
    </div>
  )
}

export default MailDetails