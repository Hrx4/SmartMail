import { useNavigate } from "react-router-dom";


const Maillist = ({ emails , folder , account  }: { emails: any[] , folder: string , account: string }) => {

 const navigate = useNavigate();

 const filteredEmails = emails?.filter(
  (email) =>
    (folder === "All" || email.folder === folder) &&
    (account === "All" || email.account === account)
);
 

  return (
    <>
      <div className="  w-full flex flex-col gap-1 p-1 overflow-y-scroll border-t border-black bg-[#BDDDFC]">
        
        {emails && emails.length === 0 ?(
          <div className=" w-[99%] ml-auto mr-auto p-2 flex-1 flex justify-center items-center text-7xl border bg-[#88BDF2] cursor-pointer rounded-lg  ">
            No Emails
          </div>
        ): filteredEmails && filteredEmails.length === 0 ?(
          <div className=" w-[99%] ml-auto mr-auto p-2 flex-1 flex justify-center items-center text-7xl border bg-[#88BDF2] cursor-pointer rounded-lg  ">
            No emails for this filter
          </div>
        ):
        (
          filteredEmails.map((email) => {
            return (
              <>
                <div
                  key={email.messageId}
                  className=" w-[99%] ml-auto mr-auto p-2 h-24 border bg-[#88BDF2] cursor-pointer rounded-lg hover:bg-[#6eabe7] "
                  onClick={() => {
                    navigate(`/mails/${email.messageId}`);
                  }}
                >
                  <div className=" w-full flex font-bold  items-center">
                    <div className=" w-full line-clamp-1">
                      {email?.subject}
                    </div>
                    <div
                      className=" bg-red-300 p-2 text-xs rounded-lg mr-auto"
                      
                    >
                      {email?.folder}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className=" w-[80%] line-clamp-1 ">
                    {email?.body}
                    
                  </div>
                  <div className=" text-xs text-gray-600 ">
                      {
                        new Date(email?.receivedAt).toLocaleDateString()
                      }
                    </div>
                  </div>
                </div>
              </>
            )
          })
        )
      }
      
      
        
      </div>
    </>
  );
};




// <>
//                 <div
//                   key={email.messageId}
//                   className=" w-[99%] ml-auto mr-auto p-2 h-24 border bg-[#88BDF2] cursor-pointer rounded-lg  "
//                   onClick={() => {
//                     navigate(`/mails/${email.messageId}`);
//                   }}
//                 >
//                   <div className=" w-full flex font-bold  items-center">
//                     <div className=" w-full line-clamp-1">
//                       {email?.subject}
//                     </div>
//                     <div
//                       className=" bg-red-300 p-2 text-xs rounded-lg mr-auto"
                      
//                     >
//                       {email?.folder}
//                     </div>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <div className=" w-[80%] line-clamp-1 ">
//                     {email?.body}
                    
//                   </div>
//                   <div className=" text-xs text-gray-600 ">
//                       {
//                         new Date(email?.receivedAt).toLocaleDateString()
//                       }
//                     </div>
//                   </div>
//                 </div>
//               </>




export default Maillist;
