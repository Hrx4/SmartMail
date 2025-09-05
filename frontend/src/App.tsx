
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Mails from "./pages/Mails";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {

  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider
        clientId="701387727683-62g9q10v0v77bae2prvam0idopa6uobs.apps.googleusercontent.com"
      >
        <Login/>
        
      </GoogleOAuthProvider>
    );
  };
 
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<GoogleAuthWrapper />} />
        <Route path="/mails" element={<Mails />} />
        <Route path="*" element={ <NotFound />} />  
        
      </Routes>
    </>
  );
}

export default App;
