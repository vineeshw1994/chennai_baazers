import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../../../../components/Admin/dashboard/DashSidebar";
import DashMain from "../../../../components/Admin/dashmain/DashMain";
import Products from "../../../../components/Admin/products/Products";
import Users from "../../../../components/Admin/users/Users";
import Orders from "../../../../components/Admin/orders/Orders";
import Reports from "../../../../components/Admin/reports/Reports";
import About from "../../../../components/Admin/about/About";
import Settings from "../../../../components/Admin/settings/Profile";
import Banners from "../../../../components/Admin/banners/Banners";
import BaseCategory from "../../../../components/Admin/products/BaseCategory";
import Brands from "../../../../components/Admin/products/Brands";
import Variants from "../../../../components/Admin/products/Variants";
import AddProduct from "../../../../components/Admin/products/AddProduct";
import AddBaseCategory from "../../../../components/Admin/products/AddBaseCategory";
import AddSubCategory from "../../../../components/Admin/products/AddSubCategory";
import SubCategory from "../../../../components/Admin/products/SubCategory";
import NavBanner from "../../../../components/Admin/banners/NavBanner";
import ProductBanner from "../../../../components/Admin/banners/ProductBanner";
import SpecialDayBanner from "../../../../components/Admin/banners/SpecialDayBanner";
import AddNavBanner from "../../../../components/Admin/banners/AddNavBanner";
import AddProductBanner from "../../../../components/Admin/banners/AddProductBanner";
import GeneralSettings from "../../../../components/Admin/settings/GeneralSettings";
import Role from "../../../../components/Admin/settings/Role";
import AddRole from "../../../../components/Admin/settings/AddRole";
import AddBrand from '../../../../components/Admin/brand/AddBrand'

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get("tab");
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div>
        <DashSidebar />
      </div>
      {/* main dashboard */}
      {tab === "dashmain" && <DashMain />}

      {/* products page */}
      {tab === "products" && <Products />}
      {/* Base category page */}
      {tab === "basecategory" && <BaseCategory />}
      {/* Sub category page */}
      {tab === "subcategory" && <SubCategory />}
      {/* variant page   */}
      {tab === "variants" && <Variants />}
      {/* brands page */}
      {tab === "brands" && <Brands />}
      {tab === "add-brand" && <AddBrand />}

      {/* add product */}
      {tab === "addproduct" && <AddProduct />}
      {/* add base categories  */}
      {tab === "addbasecategory" && <AddBaseCategory />}
      {/* add sub categories  */}
      {tab === "addsubcategory" && <AddSubCategory />}

      {/* users page */}
      {tab === "users" && <Users />}

      {/* orders  page */}
      {tab === "orders" && <Orders />}

      {/* order status */}
      {/* order status */}
      {/* {tab.match(/^orderstatus\/\d+$/) && <OrderStatus />} */}

      {/* reports page */}
      {tab === "reports" && <Reports />}

      {/* settings page */}
      {tab === "admin-profile" && <Settings />}
      {/* general settings */}
      {tab === 'general-settings' && <GeneralSettings /> }
      {/* roles and permissions */}
      {tab === 'role' && <Role /> }
      {/* add role */}
      {tab === 'addrole' && <AddRole /> }

      {/* about page */}
      {tab === "about" && <About />}

      {/* banner page */}
      {tab === "banners" && <Banners />}

      {/* home banners */}
      {tab === 'navbanner' && <NavBanner />}
      {/* product banner */}
      {tab === 'product-banner' && <ProductBanner />}
      {/* special Day Banner */}
      {tab === 'special-day-banner' && <SpecialDayBanner />}
      {/* add navbanner */}
      {tab === 'addnavbanner' && <AddNavBanner />}
      {/* product banner */}
      {tab === 'addproduct-banner' && <AddProductBanner /> }
    </div>
  );
};

export default Dashboard;
