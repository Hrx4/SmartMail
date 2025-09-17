import axios from "axios";
import { backend } from "../../backend";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Delete, Mail } from "lucide-react";

const Queries = () => {

    const [queries, setQueries] = useState<any[]>([])

    const navigate = useNavigate()


    const deleteQuery = async (id: string) => {
        try {
            const response = await axios.delete(`${backend}/deletequery`, {
                data: {
                    id
                },
                withCredentials: true
            });
            if (response.status === 200) {
                setQueries((prevState) => prevState.filter((query) => query._id !== id));
            }
        } catch (error: any) {
            if (error && error?.response?.status === 401) {
                navigate('/')
            }
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const response = await axios.get(`${backend}/allqueries`, {
                        withCredentials: true
                    }
                );
                if (response.status === 401) {
                    navigate('/')
                }
                const data = await response.data;
                setQueries(data);
            } catch (error: any) {
                if (error && error?.response?.status === 401) {
                    navigate('/')
                }
                console.log(error)
            }
        };
        fetchQueries();
    }, []);

  return (
    <div className="w-full flex flex-col gap-1 p-1 overflow-y-scroll">
        {
            queries && queries.length === 0 ? <div className="text-center px-6 my-auto">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No queries found</h3>
      </div> :
      queries?.map((query) => {
        return (
          <div key={query?._id} className="p-4 cursor-pointer  hover:bg-gray-50 transition-colors bg-blue-50 border-r-2 border-blue-600">
            
              
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500 ">{query?.queryText}</p>
                <Delete className="w-4 h-4 text-gray-600  hover:text-red-600 rounded-lg transition-colors" onClick={()=>{deleteQuery(query?._id)}}/>
                
            </div>
          </div>
        )
      })  
        }
    </div>
  )}

export default Queries