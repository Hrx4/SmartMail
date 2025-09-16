
import {  Route, Routes } from "react-router-dom";
import "./App.css";
import Mails from "./pages/Mails";
import NotFound from "./pages/NotFound";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Landing from "./pages/Landing";

function App() {

  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider
        clientId="701387727683-62g9q10v0v77bae2prvam0idopa6uobs.apps.googleusercontent.com"
      >
        <Landing/>
        
      </GoogleOAuthProvider>
    );
  };
 
  return (
    <>
      <Routes>
        <Route path="/" element={<GoogleAuthWrapper/>} />
        <Route path="/mails/*" element={<Mails/>} />
        
        <Route path="*" element={ <NotFound />} />  
        
      </Routes>
    </>
  );
}

export default App;
