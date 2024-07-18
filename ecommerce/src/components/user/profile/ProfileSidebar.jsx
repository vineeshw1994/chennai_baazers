import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaBoxOpen, FaHeart, FaUserCircle, FaUserShield } from "react-icons/fa";
import { FaFileCircleQuestion, FaLocationDot } from "react-icons/fa6";
import { IoNotifications, IoSettings } from "react-icons/io5";
import { Button } from "flowbite-react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../../../redux/user/userSlice";
const ProfileSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [myaccountOpen, setMyaccountOpen] = useState(false);
  const [helpSupport, setHelpSupport] = useState(false);
  const [offerDiscount, setOfferDiscount] = useState(false);
  const [moreInformation, setMoreInformation] = useState(false);

  useEffect(() => {
    setMyaccountOpen(true);
    setHelpSupport(false);
    setOfferDiscount(false);
    setMoreInformation(true);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout");
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      if (data.success) {
        dispatch(signoutSuccess());
        navigate("/");
      }
    } catch (error) {
      return toast.error("Internal Error");
    }
  };
  return (
    <div className="w-full mt-14  mx-2 mb-4 border border-gray-400 rounded-xl px-3 py-2 bg-gray-100">
      <div className="py-2  w-64">
        <h2>
          <button
            className="flex items-center justify-between w-full text-left font-semibold py-2"
            onClick={(e) => {
              e.preventDefault();
              setMyaccountOpen(!myaccountOpen);
            }}
            aria-expanded={myaccountOpen}
            aria-controls={`accordion-text-01`}
          >
            <span className="capitalize font-poetsen font-medium text-lg">
              my account
            </span>
            {myaccountOpen ? (
              <FiChevronUp className="text-2xl text-teal-800" />
            ) : (
              <FiChevronDown className="text-2xl text-teal-800" />
            )}
          </button>
        </h2>
        <div
          id={`accordion-text-01`}
          role="region"
          aria-labelledby={`accordion-title-01`}
          className={`grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${
            myaccountOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          {myaccountOpen ? (
            <Button.Group className="flex flex-col mt-3 mr-1">
              <Link
                to="/profile?tab=profile"
                className="border-b mb-3 flex items-center mx-2 pb-4 "
              >
                <FaUserCircle className="mr-3 text-2xl text-sky-700 " />
                <p className="w-full border-none font-medium font-lora text-black text-base">
                  Profile
                </p>
              </Link>
              <Link
                to="/profile?tab=orders"
                className="border-b mb-3 flex items-center mx-2 pb-4 "
              >
                <FaBoxOpen className="mr-3 text-2xl text-sky-700 capitalize " />
                <p className="w-full border-none font-medium font-lora text-black text-base">
                  My Orders
                </p>
              </Link>
              <Link
                to="/profile?tab=wishlist"
                className="border-b mb-3 flex items-center mx-2 pb-4 "
              >
                <FaHeart className="mr-3 text-2xl text-sky-700 capitalize " />
                <p className="w-full border-none font-medium font-lora text-black text-base">
                  Wish List
                </p>
              </Link>
              <Link
                to="/profile?tab=address"
                className="border-b mb-2 flex items-center mx-2 pb-4 "
              >
                <FaLocationDot className="mr-3 text-2xl text-sky-700 capitalize " />
                <p className="w-full border-none font-medium font-lora text-black text-base">
                  Delivery Addresses
                </p>
              </Link>
              <Link
                to="/profile?tab=notification"
                className="border-b mb-2 flex items-center mx-2 pb-4 "
              >
                <IoNotifications className="mr-3 text-2xl text-sky-700 capitalize " />
                <p className="w-full border-none font-medium font-lora text-black text-base">
                  Notification
                </p>
              </Link>
            </Button.Group>
          ) : null}
        </div>
      </div>

      <div className="py-2 w-64">
        <h2>
          <button
            className="flex items-center justify-between w-full text-left font-semibold py-2"
            onClick={(e) => {
              e.preventDefault();
              setHelpSupport(!helpSupport);
            }}
            aria-expanded={helpSupport}
            aria-controls={`accordion-text-01`}
          >
            <span className="capitalize font-poetsen font-medium text-lg">
              help & support
            </span>
            {helpSupport ? (
              <FiChevronUp className="text-2xl text-teal-800" />
            ) : (
              <FiChevronDown className="text-2xl text-teal-800" />
            )}
          </button>
        </h2>
        <div
          id={`accordion-text-01`}
          role="region"
          aria-labelledby={`accordion-title-01`}
          className={`grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${
            helpSupport
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          {helpSupport ? (
            <Button.Group className="flex flex-col mt-3 mr-1">
              <Link
                to="/profile?tab=profile"
                className="border-b mb-3 flex items-center mx-2 pb-4 "
              >
                <FaFileCircleQuestion className="mr-3 text-2xl text-sky-700 " />
                <p className="w-full border-none font-medium font-lora text-black text-base">
                  Need Help
                </p>
              </Link>
              {/* <Link
              to="/profile?tab=orders"
              className="border-b mb-3 flex items-center mx-2 pb-4 "
            >
              <FaBoxOpen className="mr-3 text-2xl text-sky-700 capitalize " />
              <p className="w-full border-none font-medium font-lora text-black text-base">
                My Orders
              </p>
            </Link> */}
            </Button.Group>
          ) : null}
        </div>
      </div>

      <div className="py-2 w-64">
        <h2>
          <button
            className="flex items-center justify-between w-full text-left font-semibold py-2"
            onClick={(e) => {
              e.preventDefault();
              setOfferDiscount(!offerDiscount);
            }}
            aria-expanded={offerDiscount}
            aria-controls={`accordion-text-01`}
          >
            <span className="capitalize font-poetsen font-medium text-lg">
              Offers & Discounts
            </span>
            {offerDiscount ? (
              <FiChevronUp className="text-2xl text-teal-800" />
            ) : (
              <FiChevronDown className="text-2xl text-teal-800" />
            )}
          </button>
        </h2>
        <div
          id={`accordion-text-01`}
          role="region"
          aria-labelledby={`accordion-title-01`}
          className={`grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${
            offerDiscount
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <p className="pb-3 font-lora font-semibold ml-4">No Offers</p>
          </div>
        </div>
      </div>

      <div className="py-2 w-64">
        <h2>
          <button
            className="flex items-center justify-between w-full text-left font-semibold py-2"
            onClick={(e) => {
              e.preventDefault();
              setMoreInformation(!moreInformation);
            }}
            aria-expanded={moreInformation}
            aria-controls={`accordion-text-01`}
          >
            <span className="capitalize font-poetsen font-medium text-lg">
              More Information
            </span>
            {moreInformation ? (
              <FiChevronUp className="text-2xl text-teal-800" />
            ) : (
              <FiChevronDown className="text-2xl text-teal-800" />
            )}
          </button>
        </h2>
        <div
          id={`accordion-text-01`}
          role="region"
          aria-labelledby={`accordion-title-01`}
          className={`grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${
            moreInformation
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          {moreInformation ? (
            <Button.Group className="flex flex-col mt-3 mr-1">
              <Link
                to="/profile?tab=about"
                className="border-b mb-3 flex items-center mx-2 pb-4 "
              >
                <FaUserShield className="mr-3 text-2xl text-sky-700 " />
                <p className="w-full border-none font-medium font-lora text-black text-base">
                  About E-Shop
                </p>
              </Link>
              <Link
                to="/profile?tab=settings"
                className="border-b mb-3 flex items-center mx-2 pb-4 "
              >
                <IoSettings className="mr-3 text-2xl text-sky-700 " />
                <p className="w-full border-none font-medium font-lora text-black text-base">
                  Settings
                </p>
              </Link>

              <div
                to="/profile?tab=profile"
                className="border-b mb-3 flex items-center mx-2 pb-4 cursor-pointer "
                onClick={handleSignout}
              >
                <RiLogoutCircleLine className="mr-3 text-2xl text-sky-700 " />
                <p className="w-full border-none font-medium font-lora text-black text-base">
                  Logout
                </p>
              </div>
            </Button.Group>
          ) : null}
          {/* <div className="overflow-hidden">
            <div className="w-full">
              <Button color="gray" onClick={handleSignout} className="w-full">
                <RiLogoutCircleLine className="mr-2 text-lg text-teal-700" />
                Logout
              </Button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
