import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext"; // Corrected import path

import Home from "./pages/Home";
import Chat from "./pages/Chat";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <SocketProvider> {/* Wrap your entire app in the SocketProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Wrap the Chat route with ProtectedRoute */}
          <Route path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </SocketProvider>
  );
};

export default App;
