
import axios from 'axios'
import {backend} from '../../backend'
import { LogOut, Mail, Plus } from 'lucide-react'
const Navbar = ({search , setSearch} : {search : string , setSearch : Function}) => {

  const handleLogout = async () => {
    const response = await axios.get(`${backend}/logout` , {
      withCredentials: true
    })

    if(response.status===200){
      window.location.href = '/'
    }
      
  }

  return (
    <div className=' w-full h-20  flex border-b border-gray-200 '>
        <div className='  h-16 w-full m-auto flex justify-around items-center flex-row '>
        <div className="p-4  border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">SmartMail</span>
          </div>
        </div>
        <input type="text" name="" id="" className=' w-1/2 h-5/6 rounded-lg p-2 border border-gray-200' placeholder='Search emails' value={search} onChange={(e) => setSearch(e.target.value)}/>
        
        <button 
            onClick={handleLogout}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-full hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-xs">Logout</span>
          </button>

        </div>
    </div>
  )
}

export default Navbar