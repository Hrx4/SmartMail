import axios from "axios";
import {  useState } from "react";

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




  const [openModal, setOpenModal] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
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
          window.location.href = '/login'
        }
    } catch (error:any) {
      if(error && error?.response?.status===401){
        window.location.href = '/login'
      }
      console.log(error);
    }
    setLoading(false)
  };

  const addAccount = () => {
    setOpenModal(true);
  };

  

 



  return (
    <>
    <div className=" w-60  h-full p-2 border border-black bg-[#BDDDFC] ">
            <button className="w-full h-12 rounded-lg p-2 border bg-blue-500 text-white mb-4" onClick={addAccount}>
              Add account
            </button>

      <div className="text-xl font-bold mb-3">Select account</div>
      <select
        name="account"
        id="account"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
        className=" w-full h-12 rounded-lg p-2 border"
      > 
        <option value="All">All</option>
        {userAccounts && userAccounts.map((acc)=>{
          return (
            <option value={acc} key={acc}>{acc}</option>
          )
        })}
      </select>
      <div className="text-xl font-bold mb-3 mt-4">Select Folder</div>
      <select
        name="folder"
        id="folder"
        value={folder}
        onChange={(e) => {
          setFolder(e.target.value)
        }}
        className=" w-full h-12 rounded-lg p-2 border"
      >
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Important">Important</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Spam">Spam</option>
        <option value="Newsletter">Newsletter</option>
      </select>
    </div>
    <div>
      {openModal && <Modal email={email} password={password} setOpenModal={setOpenModal} setEmail={setEmail} setPassword={setPassword} addEmailToImap={addEmailToImap} loading={loading} />}
    </div>
    </>
    
  );
};


 const Modal = ({
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
          <button className=" top-2 right-2 absolute p-2 text-white rounded-lg bg-red-500 hover:bg-red-600 hover:text-black " onClick={()=>setOpenModal(false)}>close</button>
          <input type="text" placeholder="Enter email" value={email} className="w-full h-12 rounded-lg p-2 border mt-10" onChange={(e)=>{setEmail(e.target.value) , console.log(e.target.value)}}/>
          <input type="text" placeholder="Enter App Password" value={password} className="w-full h-12 rounded-lg p-2 border mt-4" onChange={(e)=>setPassword(e.target.value)}/>

<button disabled={ loading } className="w-full h-12 rounded-lg p-2 border bg-blue-500 text-white mt-4" onClick={addEmailToImap}>
            {loading ? "Loading..." : "Add Email"}
          </button>
          
        </div>
      </div>
    )
  }

export default Sidebar;
