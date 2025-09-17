import { Mail, Star } from "lucide-react";
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
      <div className="  w-full flex flex-col gap-1 p-1 overflow-y-scroll">
        
        {emails && emails.length === 0 ?(
          <div className="text-center px-6 my-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No emails found</h3>
          </div>
        ): filteredEmails && filteredEmails.length === 0 ?(
          <div className="text-center px-6 my-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2"> No emails for this filter</h3>
                 </div>
        ):
        (
          filteredEmails.map((email) => {
            return (
              <>
                <div
                  key={email.messageId}
                  onClick={() => navigate(`/mails/inbox/${email.messageId}`)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors
                    bg-blue-50 border-r-2 border-blue-600`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {email.sender[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className={`text-sm truncate 'text-gray-700`}>
                          {email.sender}
                        </p>
                        <div className="flex items-center space-x-1">
                          {email.isStarred && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                          <span className="text-xs text-gray-500">{new Date(email?.receivedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <p className={`text-sm mb-1 ${!email.isRead ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                        {email.subject}
                      </p>
                      <div className=" flex items-center justify-between">
                        <p className="text-xs text-gray-500 truncate w-[90%]">{email.body}</p>
                      <div 
           
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-full hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span  className="text-xs">{email.folder}</span>
          </div>
                      </div>
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
