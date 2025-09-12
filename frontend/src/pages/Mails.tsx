
import { useEffect, useState } from "react";
import Maillist from "../components/Maillist";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import MailDetails from "../components/MailDetails";
import {io} from 'socket.io-client';

 const Mails = () => {


     const [account, setAccount] = useState("All");
    const [folder, setFolder] = useState("INBOX");
    const [search, setSearch] = useState("");
    const [emails, setEmails] = useState<any[]>([]);
    const[addEmail, setAddEmail] = useState(false)
    const [userAccounts, setUserAccounts] = useState<string[]>([])
    const [loading , setLoading] = useState(false)

    const navigate= useNavigate()

    const socket = io('http://localhost:5000');

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
      socket.on("welcome", (msg) => {
      console.log(msg);
    });
      socket.on("newEmail", (msg) => {
        console.log(msg);
        setEmails([...emails, msg])
        setLoading(false)
      });
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
          <Routes>
            <Route path=":id" element={<MailDetails />} />
            <Route index element={<Maillist emails={emails} />} />
          </Routes>
          
        </div>
      </div>
    )
}

export default Mails