import React from "react";
import {Headers} from "./components/Header";
import {Step1}  from "./step1";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

import { Step2 } from "./step2";
import { Step3 } from "./Step3";
import {Result} from "./Result"

function App() {
  
  return (
   <>
   <Headers />
   <Router>
    <Routes>
      <Route exact path="/" element={<Step1 />} />
      
      <Route path="/step2" element={<Step2 />} />
      <Route path="/step3" element={<Step3 />} />
      <Route path="/result" element={<Result />}  />

      </Routes>
   </Router>

   </>
  );
}

export default App;
