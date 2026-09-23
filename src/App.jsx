import { Navigate, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import MobileNavigation from "./components/MobileNavigation";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import FindBusiness from "./pages/FindBusiness";
import ProviderProfile from "./pages/ProviderProfile";
import FindPartner from "./pages/FindPartner";
import INeedHelp from "./pages/INeedHelp";
import Opportunities from "./pages/Opportunities";
import ArrivalGuide from "./pages/ArrivalGuide";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import MyBusinessProfile from "./pages/MyBusinessProfile";
import BusinessDocuments from "./pages/BusinessDocuments";
import EditBusinessProfile from "./pages/EditBusinessProfile";
import AccountSettings from "./pages/AccountSettings";
import Register from "./pages/Register";
import BusinessDashboard from "./pages/BusinessDashboard";
import Admin from "./pages/Admin";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

export default function App() {
return ( <div className="app"> <Header />

  <main className="app__main">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/find-business" element={<FindBusiness />} />
      <Route path="/provider/:id" element={<ProviderProfile />} />
      <Route path="/find-partner" element={<FindPartner />} />
      <Route path="/need-help" element={<INeedHelp />} />
      <Route path="/opportunities" element={<Opportunities />} />
      <Route path="/arrival-guide" element={<ArrivalGuide />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/profile" element={<Profile />} />

      <Route
        path="/my-business-profile"
        element={<MyBusinessProfile />}
      />

      <Route
        path="/business-documents"
        element={<BusinessDocuments />}
      />

      <Route
        path="/edit-business-profile"
        element={<EditBusinessProfile />}
      />

      <Route
        path="/account-settings"
        element={<AccountSettings />}
      />

      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<BusinessDashboard />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  </main>

  <MobileNavigation />
  <Footer />
</div>

);
}
