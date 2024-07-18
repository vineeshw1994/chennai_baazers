import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import CartIcon from "../../components/user/carticon/CartIcon";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button, Drawer } from "flowbite-react";
import { FaUserCircle, FaBoxOpen, FaHeart, FaUserShield } from "react-icons/fa";
import { IoSettings, IoNotifications, IoCloseOutline } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { HiOutlineBars3, HiMiniBars3 } from "react-icons/hi2";
import { FaLocationDot } from "react-icons/fa6";
import "../layouts/style.css";
import logo from "../../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../../redux/user/userSlice";
import { BiSolidCart } from "react-icons/bi";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { cartCount } = useSelector((state) => state.cartCount);
  const [showMenu, setShowMenu] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const [showDropDown, setShowDropDown] = useState(false);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState({
    items: [],
    total: 0,
    discount: 0,
  });
  const [products, setProducts] = useState([]);
  const [categoryDropDown, setCategoryDropDown] = useState(false);

  console.log(cartItems.items.length, "this is header");

  console.log(cartCount?.items?.length, "its a length of cart");

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const toggleDropdown = () => {
    setCategoryDropDown(!categoryDropDown);
  };

  const handleCart = () => {
    if (currentUser) {
      navigate("/cart");
      setShowMenu(false);
    } else {
      navigate("/login");
      setShowMenu(false);
    }
  };

  const handleChange = async (e) => {
    const searchValue = e.target.value;

    // Handle Esc key press to clear products
    if (e.key === "Escape") {
      e.target.value = ""; // Clear input field
      setProducts([]); // Clear products state
      return;
    }

    // Handle Backspace key press to clear products when input is empty
    if (e.key === "Backspace" && searchValue === "") {
      setProducts([]);
      return;
    }
    if (searchValue === "") {
      setProducts([]);
      return;
    }

    try {
      const res = await fetch(
        `/api/search/search-products?name=${encodeURIComponent(searchValue)}`
      );
      const data = await res.json();
      if (!data.success) {
        toast.error(data.message);
      } else {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      return toast.error("Internal Error");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchValue("");
  };

  const handleSearch = (proId) => {
    navigate(`/shop/${proId}`);
    setShowMenu(false);
    setSearchValue(null);
    setProducts([]);
  };
  console.log(products);
  const handleDropdown = () => {
    setShowDropDown((prevState) => !prevState);
  };

  const handleMouseEnter = () => {
    setShowDropDown(true);
  };

  const handleMouseLeave = () => {
    setShowDropDown(false);
  };

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

  // FETCH CATEGORIES FROM API
  const fetchCategory = async () => {
    try {
      const res = await fetch("/api/category/categories");
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }

      if (data.success) {
        return setCategories(data.category);
      } else {
        return toast.error(data.message);
      }
    } catch (error) {
      return toast.error("Internal Error");
    }
  };
  useEffect(() => {
    fetchCategory();
  }, [currentUser]);
  const handleClick = (cateId) => {
    navigate(`/cate-shop/${cateId}`);
    setCategoryDropDown(false);
  };

  return (
    <div className="  flex items-center justify-between py-2 px-3  bg-sky-700 border-gray-300 w-full mx-auto sticky top-0 z-20">
      {/* Logo */}

      {/* Hamburger Icon */}
      <div className="lg:hidden flex items-center">
        <button>
          {showMenu ? (
            <IoMdClose className="text-4xl text-white" />
          ) : (
            <div className="flex items-center gap-4">
              <HiOutlineBars3
                onClick={toggleMenu}
                className="text-4xl text-white"
              />
              <div className="lg:hidden xl:hidden 2xl:hidden block relative ">
                <div
                  className="py-2 px-4 cursor-pointer rounded-md flex items-center gap-4   bg-teal-700 text-gray-800 hover:bg-teal-800 focus:outline-none focus:bg-gray-200"
                  onClick={toggleDropdown}
                >
                  <p className="text-white font-lato font-medium text-sm">
                    {" "}
                    Categories
                  </p>
                  {categoryDropDown ? (
                    <IoIosArrowDropup className="text-white text-xl" />
                  ) : (
                    <IoIosArrowDropdown className="text-white text-xl" />
                  )}
                </div>
                {categoryDropDown && (
                  <div
                    onMouseLeave={toggleDropdown}
                    className="absolute mt-2 w-60 bg-white rounded-lg shadow-lg overflow-hidden z-10"
                  >
                    <ul>
                      {categories &&
                        categories.length > 0 &&
                        categories.map((cate) => (
                          <li
                            key={cate.id}
                            onClick={() => handleClick(cate.id)}
                            className="block py-2 px-4 font-lato text-gray-800 hover:text-white hover:bg-blue-700 transition duration-900 border-b "
                          >
                            {cate.name}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </button>
      </div>

      {showMenu ? (
        <Link
          to="/"
          className="text-lg xl:text-2xl lg:text-xl md:text-xl sm:text-lg font-medium cursor-pointer lg:block "
        >
          <img
            src={logo}
            className="w-20 h-16 object-contain rounded-2xl"
            alt="Logo"
          />
        </Link>
      ) : (
        <Link
          to="/"
          className="text-lg xl:text-2xl lg:text-xl md:text-xl sm:text-lg font-medium cursor-pointer lg:block "
        >
          <img
            src={logo}
            className="w-20 h-16 object-contain rounded-2xl"
            alt="Logo"
          />
        </Link>
      )}

      {/* Responsive Menu */}
      <Drawer open={showMenu} onClose={toggleMenu}>
        <div className="flex items-center justify-between mx-2">
          <Link to="/">
            <h2 className="text-lg xl:text-2xl lg:text-xl md:text-xl sm:text-lg font-medium font-lora cursor-pointer">
              <img src={logo} className="w-20   object-contain" alt="Logo" />
            </h2>
          </Link>
          <IoMdClose
            onClick={toggleMenu}
            className="text-2xl cursor-pointer my-4"
          />
        </div>
        <hr className="my-2" />
        <Drawer.Items>
          <div>
            <div className="flex w-full px-2 items-center py-4 rounded-lg shadow-md overflow-hidden mt-4">
              <input
                type="text"
                id="search"
                placeholder="Search Products"
                className="p-3 border-none rounded-lg outline-none "
                value={searchValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              {searchValue && (
                <button className="px-1 py-3" onClick={handleClear}>
                  <IoCloseOutline className="text-2xl text-red-600" />
                </button>
              )}
              <CiSearch
                onClick={handleSearch}
                className=" cursor-pointer text-white bg-blue-500 rounded h-12 w-10 shadow-sm "
              />
            </div>

            {currentUser ? (
              <Button.Group className="flex flex-col  mt-4  mr-1">
                <Link
                  to="/profile?tab=profile"
                  onClick={() => setShowMenu(false)}
                >
                  <Button color="gray" className="w-full">
                    <FaUserCircle className="mr-3 text-lg text-teal-700 " />
                    Profile
                  </Button>
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setShowMenu(false)}
                  className=""
                >
                  <Button color="gray" className="w-full ">
                    <BiSolidCart className="mr-3 text-xl text-teal-700 " />
                    Cart
                  </Button>
                </Link>
                <Link
                  to="/profile?tab=orders"
                  onClick={() => setShowMenu(false)}
                >
                  <Button color="gray" className="w-full">
                    <FaBoxOpen className="mr-3 text-lg text-teal-700 " />
                    Orders
                  </Button>
                </Link>
                <Link
                  to="/profile?tab=wishlist"
                  onClick={() => setShowMenu(false)}
                >
                  <Button color="gray" className="w-full">
                    <FaHeart className="mr-3 text-lg text-teal-700 " />
                    Wishlist
                  </Button>
                </Link>
                <Link
                  to="/profile?tab=address"
                  onClick={() => setShowMenu(false)}
                >
                  <Button color="gray" className="w-full">
                    <FaLocationDot className="mr-3 text-lg text-teal-700 " />
                    Address
                  </Button>
                </Link>
                <Link
                  to="/profile?tab=settings"
                  onClick={() => setShowMenu(false)}
                >
                  <Button color="gray" className="w-full">
                    <IoSettings className="mr-2 text-lg text-teal-700" />
                    Settings
                  </Button>
                </Link>
                <Link
                  to="/profile?tab=about"
                  onClick={() => setShowMenu(false)}
                >
                  <Button color="gray" className="w-full">
                    <FaUserShield className="mr-2 text-lg text-teal-700" />
                    About Us
                  </Button>
                </Link>
                <Link
                  to="/profile?tab=notification"
                  onClick={() => setShowMenu(false)}
                >
                  <Button color="gray" className="w-full">
                    <IoNotifications className="mr-1 text-lg text-teal-700" />
                    Notification
                  </Button>
                </Link>
                <Button color="gray" onClick={handleSignout}>
                  <RiLogoutCircleLine className="mr-2 text-lg text-teal-700" />
                  Logout
                </Button>
              </Button.Group>
            ) : (
              <div className="my-4 text-center">
                <Link to="/login" onClick={() => setShowMenu(false)}>
                  <button className="border w-full rounded py-3 px-5 bg-blue-500 text-white hover:bg-sky-500 ">
                    Sign-Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </Drawer.Items>
      </Drawer>

      <div className="relative w-1/3 hidden lg:flex ml-20 ">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <IoIosSearch
            className="text-2xl xl:text-2xl text-gray-800 cursor-pointer"
            onClick={handleSearch}
          />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full py-3 ps-10  text-base font-medium font-lato border text-gray-600  rounded-lg bg-gray-50 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search products...."
          onClick={handleKeyDown}
          onChange={handleChange}
        />
        {/* <button
          type="button"
          onClick={handleSearch}
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button> */}
        {products && (
          <div className="absolute w-full max-h-96 overflow-y-auto mt-2  bg-white rounded-lg shadow-lg top-11  overflow-hidden z-10">
            <ul>
              {products &&
                products.length > 0 &&
                products.map((cate) => (
                  <li
                    key={cate.id}
                    onClick={() => handleSearch(cate.id)}
                    className="flex items-center shadow-sm-light h-14 gap-2 py-2 px-4 font-lato text-gray-800 hover:text-white hover:bg-blue-700 transition duration-900 border-b "
                  >
                    <img
                      src={cate.images[0].url}
                      className="w-8 h-8 object-contain rounded-md"
                      alt=""
                    />
                    <p className="font-lato text-sm">{cate.name}</p>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>

      {/* Regular Menu */}
      <div className="hidden lg:flex items-center ">
        {currentUser ? (
          <div onClick={handleCart} className="flex items-center mx-4">
            <CartIcon cartCount={cartCount?.items?.length} />
          </div>
        ) : (
          <div className="flex items-center mx-4">
            <Link to="/login">
              <CartIcon />
            </Link>
          </div>
        )}

        {/* Conditionally render login button or user image and name */}
        {currentUser ? (
          <div
            onClick={handleDropdown}
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
            className="flex flex-col items-center justify-center"
          >
            <img
              src={currentUser.profilePic}
              alt="User"
              className="w-10 h-10 rounded-full mr-2 cursor-pointer"
            />
            <span className="text-sm  text-white font-semibold">
              {currentUser.username}
            </span>
          </div>
        ) : (
          <Link to="/login">
            <button className="border rounded py-3 px-5 bg-blue-500 text-white hover:bg-sky-500 ">
              Sign-Up
            </button>
          </Link>
        )}
      </div>
      {showDropDown && (
        <Button.Group
          onMouseLeave={handleMouseLeave}
          className="flex flex-col mt-1 z-20 absolute top-20 right-0 mr-1"
        >
          <Link to="/profile?tab=profile">
            <Button color="gray" className="w-36">
              <FaUserCircle className="mr-3 text-lg text-teal-700 " />
              Profile
            </Button>
          </Link>
          <Link to="/profile?tab=orders">
            <Button color="gray" className="w-36">
              <FaBoxOpen className="mr-3 text-lg text-teal-700 " />
              Orders
            </Button>
          </Link>
          <Link to="/profile?tab=settings">
            <Button color="gray" className="w-36">
              <IoSettings className="mr-2 text-lg text-teal-700" />
              Settings
            </Button>
          </Link>
          <Link
            to="/profile?tab=notification"
            onClick={() => setShowMenu(false)}
          >
            <Button color="gray" className="w-36">
              <IoNotifications className="mr-2 text-lg text-teal-700" />
              Notification
            </Button>
          </Link>
          <Button color="gray" onClick={handleSignout}>
            <RiLogoutCircleLine className="mr-2 text-lg text-teal-700" />
            Logout
          </Button>
        </Button.Group>
      )}
    </div>
  );
};

export default Navbar;
