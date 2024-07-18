import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../../../../components/user/profile/ProfileSidebar";
import DashProfile from "../../../../components/user/profile/Profile";
import Orders from "../../../../components/user/profile/Orders";
import Notification from "../../../../components/user/profile/Notification";
import Settings from "../../../../components/user/profile/Settings";
import ProfileInfo from "../../../../components/user/profile/ProfileInfo";
import WishList from "../../../../components/user/wishlist/WishList";
import Address from "../../../../components/user/profile/Address";
import About from "../../../../components/user/about/About";
// import DashPosts from '../components/DashPosts';
// import DashUsers from '../components/DashUsers';
// import DashComments from '../components/DashComments';
// import DashboardComp from '../components/DashboardComp';

const Profile = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="lg:block xl:block 2xl:block hidden">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}
      {tab === "profile" && <DashProfile />}
      {/* orders... */}
      {tab === "orders" && <Orders />}
      {/* settings */}
      {tab === "settings" && <Settings />}
      {/* notifications  */}
      {tab === "notification" && <Notification />}
      {/* profile info */}
      {tab === "profile-info" && <ProfileInfo />}
      {/* address  */}
      {tab === "address" && <Address />}
      {/* wishlist */}
      {tab === "wishlist" && <WishList />}
      {/* about eshop */}
      {tab === "about" && <About />}
    </div>
  );
};

export default Profile;
