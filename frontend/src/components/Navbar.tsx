
import {backend} from '../../backend'
const Navbar = ({search , setSearch} : {search : string , setSearch : Function}) => {
  return (
    <div className=' w-full h-20  flex bg-[#6A89A7] '>
        <div className='  h-16 w-full m-auto flex justify-around items-center flex-row '>
        <div className=" text-xl font-bold font-serif">
            REACHINBOX
        </div>
        <input type="text" name="" id="" className=' w-1/2 h-5/6 rounded-lg p-2 border border-black  ' placeholder='Search emails' value={search} onChange={(e) => setSearch(e.target.value)}/>
        
        <div className=' bg-[#F8EFBA] p-2 rounded-lg font-semibold cursor-pointer hover:bg-[#EAB543] ' onClick={async () => {
          await fetch(`${backend}/auth`)
        }}>
          Login
        </div>

        </div>
    </div>
  )
}

export default Navbar