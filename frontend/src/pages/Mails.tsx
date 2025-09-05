
import { useEffect, useState } from "react";
import Maillist from "../components/Maillist";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";


 const Mails = () => {

     const [account, setAccount] = useState("All");
    const [folder, setFolder] = useState("INBOX");
    const [search, setSearch] = useState("");
    const [emails, setEmails] = useState([]);
    const[addEmail, setAddEmail] = useState(false)
    const [userAccounts, setUserAccounts] = useState<string[]>([])
    const [loading , setLoading] = useState(false)

    const navigate= useNavigate()

    useEffect(() => {
    
      const fetchEmails = async () => {
        setLoading(true)
        const response = await axios.post("http://localhost:5000/allmails",
          {},{
            withCredentials: true
          }
        );

        if(response.status===401){
          navigate('/login')
        }

        const data = await response.data;
        setUserAccounts(data.mailIds)
        console.log(data);
        setEmails(data.emails);
        setLoading(false)
      };
      fetchEmails();
    }, [account, folder , search , addEmail]);

    return (
        <div className=" h-dvh  flex flex-col ">
        <Navbar search={search} setSearch={setSearch} />
        <div className=" flex flex-1 overflow-hidden">
          <Sidebar
            account={account}
            setAccount={setAccount}
            folder={folder}
            setFolder={setFolder}
            setAddEmail={setAddEmail}
            addEmail={addEmail}
            userAccounts = {userAccounts}
          />
          <Maillist emails={emails}  />
        </div>
      </div>
    )
}

export default Mails