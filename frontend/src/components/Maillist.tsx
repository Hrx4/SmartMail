import { useNavigate } from "react-router-dom";


const Maillist = ({ emails  }: { emails: any[] }) => {

 const navigate = useNavigate();

  return (
    <>
      <div className="  w-full flex flex-col gap-1 p-1 overflow-y-scroll border-t border-black bg-[#BDDDFC]">
        
        {emails.length === 0 && (
          <div className=" w-[99%] ml-auto mr-auto p-2 flex-1 flex justify-center items-center text-7xl border bg-[#88BDF2] cursor-pointer rounded-lg  ">
            No Emails
          </div>
        )}
        {emails &&
          emails.map((email) => {
            return (
              <>
                <div
                  key={email.messageId}
                  className=" w-[99%] ml-auto mr-auto p-2 h-24 border bg-[#88BDF2] cursor-pointer rounded-lg  "
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
                  <div className=" w-full line-clamp-1">
                    {email?.body}
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default Maillist;
