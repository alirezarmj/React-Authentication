import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "./store/Auth-Context";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        {!authCtx.isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
        {authCtx.isLoggedIn ? <Route path="/profile" element={<UserProfile />} /> : <Route path="/profile" element={<Navigate replace to="/auth" />} />}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
      <Toaster position="top-center" gutter={12} containerStyle={{ margin: "8px" }} toastOptions={{ success: { duration: 3000 }, error: { duration: 5000 }, style: { fontSize: "16px", maxWidth: "500px" } }} />
    </Layout>
  );
}

export default App;
