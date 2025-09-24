import axios from "axios";
import { AlertCircle, Briefcase, Heart, Inbox, MessageSquare, Newspaper, Plus, Shield, X } from "lucide-react";
import {  useState } from "react";
import { backend } from "../../backend";
import { useNavigate } from "react-router-dom";

const Sidebar = ({
  account,
  setAccount,
  folder,
  setFolder,
  setAddEmail,
  addEmail,
  userAccounts,
}: {
  account: string;
  setAccount: Function;
  folder: string;
  setFolder: Function;
  setAddEmail: Function;
  addEmail: boolean;
  userAccounts: string[];
}) => {


  const categories = [
    { name: 'All', icon: Inbox, count: 12 },
    { name: 'Important', icon: AlertCircle, count: 3 },
    { name: 'Work', icon: Briefcase, count: 8 },
    { name: 'Personal', icon: Heart, count: 2 },
    { name: 'Spam', icon: Shield, count: 15 },
    { name: 'Newsletter', icon: Newspaper, count: 24 }
  ];


const navigate = useNavigate()

  const [openModal, setOpenModal] = useState(false);
  const [openQueryModal, setOpenQueryModal] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [query , setQuery] = useState("");
  const[loading , setLoading] = useState(false)
  const addEmailToImap = async () => {
    setLoading(true)
    try {
      const response = await axios.post("http://localhost:5000/addemail", {
      email: email,
      password: password,
    },
  {
    withCredentials: true
  });
    if (response.status === 200) {
      setAddEmail(!addEmail)
      setOpenModal(false);
      
      
    }
    else if(response.status===401){
          window.location.href = '/'
        }
    } catch (error:any) {
      if(error && error?.response?.status===401){
        window.location.href = '/'
      }
      console.log(error);
    }
    setLoading(false)
  };

  const handleQuery=async ()=>{
    setLoading(true)
    try {
      
      const response = await axios.post(`${backend}/addquery`,
        {
          queryText: query
        },
        {
          withCredentials: true
        }
      );
      if(response.status===200){
        setQuery("")
      }
    } catch (error:any) {
      if(error && error?.response?.status===401){
        window.location.href = '/'
      }
      console.log(error)
    }
    setLoading(false)
  }

  const addAccount = () => {
    setOpenModal(true);
  };

  const addQuery = () => {
    setOpenQueryModal(true);
  };


  return (
    <>
    <div className=" w-60  h-full  border-r border-gray-200 overflow-y-scroll">

      <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Accounts</span>
            <button className="text-xs text-blue-600 hover:text-blue-700 font-medium" onClick={addAccount}>
              + Add
            </button>
          </div>
          <div className="space-y-2">
            {userAccounts.map((item) => (
              <button
                key={item}
                onClick={() => setAccount(item)}
                className={`w-full flex items-center space-x-3 p-2 rounded-lg text-left transition-colors duration-200 ${
                  account === item
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                  {item?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  {/* <p className="text-sm font-medium text-gray-900 truncate">{account.name}</p> */}
                  <p className="text-xs text-gray-500 truncate">{item}</p>
                </div>
                
              </button>
            ))}
          </div>
        </div>


<div className="flex-1 px-2 py-3">
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => {setFolder(category.name)
                  navigate('/mails')}
                }
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                  folder === category.name
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <category.icon className="w-4 h-4" />
                  <span className="font-medium">{category.name}</span>
                </div>
                
              </button>
            ))}
          </div>
        </div>

<div className="p-4 border-t border-gray-200 ">
          <button 
            onClick={addQuery}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-full hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Queries</span>
          </button>
        </div>
        <button className="flex items-center space-x-2 mb-3 rounded-lg  border-gray-200 p-4 w-full text-gray-700 hover:bg-gray-100" onClick={()=>navigate("/mails/queries")}>
            <MessageSquare className="w-4 h-4 text-gray-600" />
            <span className="font-medium text-gray-900">All Queries</span>
          </button>


    </div>
    <div>
      {openModal && <AccountModal email={email} password={password} setOpenModal={setOpenModal} setEmail={setEmail} setPassword={setPassword} addEmailToImap={addEmailToImap} loading={loading} />}
    </div>
    <div>
      {openQueryModal && <QueryModal setOpenQueryModal={setOpenQueryModal} query={query} setQuery={setQuery}handleQuery={handleQuery} loading={loading}/>}
    </div>
    </>
    
  );
};


 const AccountModal = ({
    email,
    password,
    setOpenModal,
    setEmail,
    setPassword,
    addEmailToImap,
    loading
  }:{
    email: string;
    password: string;
    setOpenModal: Function;
    setEmail: Function;
    setPassword: Function;
    addEmailToImap: () => void;
    loading: boolean;
  })=>{
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow-lg absolute">
          {/* <button className=" top-2 right-2 absolute p-2 text-white rounded-lg bg-red-500 hover:bg-red-600 hover:text-black " onClick={()=>setOpenModal(false)}>close</button> */}
          <h3 className="text-lg font-semibold text-gray-900">Add account</h3>
          <button
                onClick={() => setOpenModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors top-2 right-2 absolute"
              >
                <X className="w-5 h-5" />
              </button>
          <input type="text" placeholder="Enter email" value={email} className="w-full h-12 rounded-lg p-2 border mt-10" onChange={(e)=>{setEmail(e.target.value) , console.log(e.target.value)}}/>
          <input type="text" placeholder="Enter App Password" value={password} className="w-full h-12 rounded-lg p-2 border mt-4" onChange={(e)=>setPassword(e.target.value)}/>

<button disabled={ loading } className="w-full h-12 rounded-lg p-2 border bg-blue-500 text-white mt-4" onClick={addEmailToImap}>
            {loading ? "Loading..." : "Add Email"}
          </button>
          
        </div>
      </div>
    )
  }

  const QueryModal = ({
    setOpenQueryModal,
    query,
    setQuery,
    handleQuery,
    loading
  }:{
    setOpenQueryModal: Function;
    query: string;
    setQuery: Function;
    handleQuery: () => void;
        loading: boolean;

  }
)=>{
              return (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow-lg absolute">
          {/* <button className=" top-2 right-2 absolute p-2 text-white rounded-lg bg-red-500 hover:bg-red-600 hover:text-black " onClick={()=>setOpenModal(false)}>close</button> */}
          <h3 className="text-lg font-semibold text-gray-900 pb-3">Add Query</h3>
              <button
                onClick={() => setOpenQueryModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors top-2 right-2 absolute"
              >
                <X className="w-5 h-5" />
              </button>
                <textarea
                  rows={8}
                  cols={50}
                  placeholder="Compose your message..."
                  value={query}
                  onChange={(e)=>setQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
<button disabled={ loading } className="w-full h-12 rounded-lg p-2 border bg-blue-500 text-white mt-4" onClick={handleQuery}>
            {loading ? "Loading..." : "Add"}
          </button>
          
        </div>
      </div>
              )
  }

export default Sidebar;
