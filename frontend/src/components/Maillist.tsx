import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Maillist = ({ emails  }: { emails: any[] }) => {
  const [category, setCategory] = useState("");

  const handleClick = async (subject: string, body: string) => {
    console.log(subject, body);
    const response = await axios.post("https://outbox-assignment.vercel.app/category", {
      email: {
        subject: subject,
        body: body,
      },
    });
    console.log(response.data.category);
    setCategory(response.data.category);
  };

  useEffect(() => {
    if (category !== "") {
      alert(category)
      setCategory("")
    }
  }, [category]);

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
                >
                  <div className=" w-full flex font-bold  items-center">
                    <div className=" w-full line-clamp-1">
                      {email?.subject}
                    </div>
                    <button
                      className=" bg-red-300 p-2 text-xs rounded-lg mr-auto"
                      onClick={() =>
                        handleClick(
                          email._source?.subject,
                          email?.body
                        )
                      }
                    >
                      Category
                    </button>
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
