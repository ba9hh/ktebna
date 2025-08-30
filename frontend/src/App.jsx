import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./home/Home.jsx";
import Login from "./auth/Login.jsx";
import Account from "./account/Account.jsx";
import { AuthProvider } from "./AuthProvider.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ChatApp from "./chat/ChatApp.jsx";
import UserPosts from "./account/UserPosts.jsx";
import UserSavedPosts from "./account/UserSavedPosts.jsx";
import UserConversations from "./account/UserConversations.jsx";
import Books2 from "./home/Books2.jsx";
import { ToastContainer } from "react-toastify";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import { MobileFiltersProvider } from "./context/MobileFiltersContext.jsx";
function App() {
  return (
    <>
      <GoogleOAuthProvider
        clientId={
          /*clientId*/ "739869680076-jlv9amicing7jf86gasmar79v2hel8vb.apps.googleusercontent.com"
        }
      >
        <AuthProvider>
          <MobileFiltersProvider>
            <ToastContainer />
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route
                  path="/books"
                  element={
                    <div className="mt-6">
                      <Books2 />
                    </div>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/account" element={<Account />}>
                  <Route index element={null} />
                  <Route path="posts" element={<UserPosts />} />
                  <Route path="savedPosts" element={<UserSavedPosts />} />
                  <Route path="conversations" element={<UserConversations />} />
                </Route>
                <Route path="/chat/:otherUserId" element={<ChatApp />} />
              </Route>
            </Routes>
          </MobileFiltersProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
