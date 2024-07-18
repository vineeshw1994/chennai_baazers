import React, { useEffect, useState } from "react";
import location from "../../../assets/location.png";
import { useSelector, useDispatch } from "react-redux";
import { Button, Drawer, FloatingLabel, Tooltip } from "flowbite-react";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import { BsThreeDotsVertical } from "react-icons/bs";

const Address = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [userAddress, setUserAddress] = useState(null);
  const [selected, setSelected] = useState(null);
  const [editModel, setEditModel] = useState(false);
  const [addressData, setAddressData] = useState({});
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleSelect = (value) => {
    setSelected(value);
  };

  console.log(addressData);
  const handleClose = () => setIsOpen(false);
  const handleEditModelClose = () => setEditModel(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const addressChange = (e) => {
    setAddressData({ ...addressData, [e.target.id]: e.target.value });
  };

  const fetchSingleAddress = async (id) => {
    try {
      const res = await fetch(`/api/user/single-address/${currentUser.id}`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      setAddressData({
        id: data.address.id,
        houseNo: data.address.houseNo || "",
        flatNo: data.address.flatNo || "",
        username: data.address.username || "",
        address: data.address.address || "",
        district: data.address.district || "",
        state: data.address.state || "",
        pincode: data.address.pincode || "",
        landmark: data.address.landmark || "",
      });
      setSelected(data.address.type);
    } catch (error) {
      return toast.error("Internal Error");
    }
  };

  const closeAddressDrawer = () => {
    setIsOpen(false);
  };

  const fetchAddress = async () => {
    try {
      const res = await fetch(`/api/user/getaddress/${currentUser.id}`);
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      if (data.success) {
        setUserAddress(data.address);
      }
    } catch (error) {
      return toast.error("Internal Error");
    }
  };
  useEffect(() => {
    fetchAddress();
  }, []);

  const handleSubmit = async () => {
    if (!formData.houseNo && !formData.flatNo) {
      return toast.error("Either House No or Flat No is required");
    }
    if (!formData.username || formData.username === "") {
      return toast.error("User name is required");
    }
    if (!formData.address || formData.address === "") {
      return toast.error("Address is required");
    }
    if (!formData.district || formData.district === "") {
      return toast.error("District is required");
    }
    if (!formData.state || formData.state === "") {
      return toast.error("State is required");
    }
    if (!formData.pincode || formData.pincode === "") {
      return toast.error("Pincode is required");
    }
    if (!selected || selected === null) {
      return toast.error("Select Type");
    }
    try {
      setLoading(true);
      const res = await fetch(`/api/user/address/${currentUser.id}`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          saveAs: selected,
          mobile: currentUser.mobile,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoading(false);
        return toast.error(data.message);
      }
      if (data.success) {
        fetchAddress();
        setIsOpen(false);
        setLoading(false);
        setFormData({});
        return toast.success(data.message);
      }
    } catch (error) {
      setLoading(false);
      return toast.error("Internal Error");
    }
  };

  const handleUpdate = async () => {
    if (!addressData.houseNo && !addressData.flatNo) {
      return toast.error("Either House No or Flat No is required");
    }
    if (!addressData.username || addressData.username === "") {
      return toast.error("User name is required");
    }
    if (!addressData.address || addressData.address === "") {
      return toast.error("Address is required");
    }
    if (!addressData.district || addressData.district === "") {
      return toast.error("District is required");
    }
    if (!addressData.state || addressData.state === "") {
      return toast.error("State is required");
    }
    if (!addressData.pincode || addressData.pincode === "") {
      return toast.error("Pincode is required");
    }
    if (!selected || selected === null) {
      return toast.error("Select the Type");
    }

    try {
      setUpdateLoading(true);
      const res = await fetch(`/api/user/address-update/${currentUser.id}`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...addressData,
          saveAs: selected,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setUpdateLoading(false);
        return toast.error(data.message);
      }

      setUpdateLoading(false);
      setEditModel(false);
      setAddressData({});
      fetchAddress();
      return toast.success(data.message);
    } catch (error) {
      return toast.error("Internal Error");
    }
  };

  return (
    <div className="mx-auto w-full pt-6 pl-8">
      <div className="">
        <h2 className=" font-poetsen mx-6 font-medium text-lg text-white bg-indigo-700 rounded-lg text-center">
         Your Address
        </h2>
      </div>

      {userAddress ? (
        userAddress &&
        userAddress.map((data) => (
          <div
            key={data.id}
            className="w-1/2 my-6 border py-2 px-3 rounded-lg border-gray-400"
          >
            <div className="flex justify-between items-center my-2">
              <div className="flex items-center gap-4">
                <h1 className="font-lora font-semibold capitalize">
                  {data.username}
                </h1>
                <p className="bg-teal-700 text-white px-2 rounded-xl font-lora text-sm font-medium">
                  {data.type}
                </p>
              </div>
              <Tooltip content="Edit" placement="left" style="light">
                <BsThreeDotsVertical
                  onClick={() => {
                    setEditModel(true), fetchSingleAddress(data.id);
                  }}
                  className="cursor-pointer"
                />
              </Tooltip>
            </div>
            <p className="text-xs font-lora capitalize font-medium">
              {data.houseNo ? data.houseNo : data.flatNo},{" "}
              <span>{data.address}</span>
            </p>
            <p className="text-xs font-lora capitalize font-medium">
              {data.district} , {data.state},{data.pincode}
            </p>
            <p className="text-sm font-lora font-semibold">
              Mobile: {data.mobile}
            </p>
          </div>
        ))
      ) : (
        <div className="my-8 ">
          <img
            src={location}
            alt="Location"
            className="w-1/2 h-80 rounded-xl mx-auto "
          />
        </div>
      )}

      <div
        onClick={() => setIsOpen(true)}
        className="bg-sky-600 rounded-3xl py-3 w-1/2 cursor-pointer mx-auto hover:bg-sky-800"
      >
        <p className="text-white text-center font-lora font-semibold ">
          <span>+</span> Add New Adderss
        </p>
      </div>

      {/* drawer */}
      <Drawer open={isOpen} onClose={handleClose} position="right">
        <div className="flex justify-between items-center mb-8 mt-3 ">
          <h2 className="font-poetsen font-medium text-black text-xl">
            Add Address
          </h2>
          <IoMdClose
            onClick={closeAddressDrawer}
            className="text-2xl cursor-pointer"
          />
        </div>
        <Drawer.Items>
          <div className="bg-gray-100 rounded-xl pb-20 relative">
            <div className=" py-2 px-2">
              <FloatingLabel
                variant="standard"
                label="Name *"
                className="font-lora text-black font-medium "
                id="username"
                onChange={handleChange}
              />
              <div className="w-full flex justify-between items-center gap-2">
                <FloatingLabel
                  variant="standard"
                  label="House No*"
                  id="houseNo"
                  onChange={handleChange}
                  className="font-lora text-black font-medium flex-1 "
                />
                <FloatingLabel
                  variant="standard"
                  label="Flat No *"
                  className="font-lora text-black font-medium flex-1 "
                  id="flatNo"
                  onChange={handleChange}
                />
              </div>
              <FloatingLabel
                variant="standard"
                label="Address *"
                className="font-lora text-black font-medium "
                id="address"
                onChange={handleChange}
              />
              <FloatingLabel
                variant="standard"
                label="District*"
                className="font-lora text-black font-medium "
                id="district"
                onChange={handleChange}
              />
              <FloatingLabel
                variant="standard"
                label="State *"
                className="font-lora text-black font-medium "
                id="state"
                onChange={handleChange}
              />
              <FloatingLabel
                variant="standard"
                label="Pin code *"
                className="font-lora text-black font-medium "
                id="pincode"
                onChange={handleChange}
              />
              <FloatingLabel
                variant="standard"
                label="Land Mark *"
                className="font-lora text-black font-medium "
                id="landmark"
                onChange={handleChange}
              />
            </div>
            <div>
              <h2 className="font-poetsen font-medium my-2">Save as</h2>
              <div className="flex justify-between items-center gap-3 w-full">
                <input
                  type="text"
                  id="home"
                  value="home"
                  readOnly
                  onClick={() => handleSelect("home")}
                  className={`text-center rounded-full capitalize font-lora font-medium cursor-pointer w-1/2 ${
                    selected === "home"
                      ? "bg-teal-800 text-white"
                      : "text-teal-800"
                  }`}
                />
                <input
                  type="text"
                  id="work"
                  value="work"
                  readOnly
                  onClick={() => handleSelect("work")}
                  className={`text-center rounded-full capitalize font-lora font-medium cursor-pointer w-1/2 ${
                    selected === "work"
                      ? "bg-teal-800 text-white"
                      : "text-teal-800"
                  }`}
                />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0  flex justify-center my-4">
              {loading ? (
                <Button color="blue" pill className="flex-1 mx-4">
                  loading...
                </Button>
              ) : (
                <Button
                  color="blue"
                  pill
                  className="flex-1 mx-4"
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              )}
            </div>
          </div>
        </Drawer.Items>
      </Drawer>

      {/* address edited  drawer */}
      <Drawer open={editModel} onClose={handleEditModelClose} position="right">
        <div className="flex justify-between items-center mb-8 mt-3 ">
          <h2 className="font-poetsen font-medium text-black text-xl">
            Edit Address
          </h2>
          <IoMdClose
            onClick={handleEditModelClose}
            className="text-2xl cursor-pointer"
          />
        </div>
        <Drawer.Items>
          <div className="bg-gray-100 rounded-xl pb-20 relative">
            <div className=" py-2 px-2">
              <FloatingLabel
                variant="standard"
                label="Name *"
                className="font-lora text-black font-medium "
                id="username"
                value={addressData.username}
                onChange={addressChange}
              />
              <div className="w-full flex justify-between items-center gap-2">
                <FloatingLabel
                  variant="standard"
                  label="House No*"
                  id="houseNo"
                  value={addressData.houseNo}
                  onChange={addressChange}
                  className="font-lora text-black font-medium flex-1 "
                />
                <FloatingLabel
                  variant="standard"
                  label="Flat No *"
                  className="font-lora text-black font-medium flex-1 "
                  id="flatNo"
                  value={addressData.flatNo}
                  onChange={addressChange}
                />
              </div>
              <FloatingLabel
                variant="standard"
                label="Address *"
                className="font-lora text-black font-medium "
                id="address"
                value={addressData.address}
                onChange={addressChange}
              />
              <FloatingLabel
                variant="standard"
                label="District*"
                className="font-lora text-black font-medium "
                id="district"
                value={addressData.district}
                onChange={addressChange}
              />
              <FloatingLabel
                variant="standard"
                label="State *"
                className="font-lora text-black font-medium "
                id="state"
                value={addressData.state}
                onChange={addressChange}
              />
              <FloatingLabel
                variant="standard"
                label="Pin code *"
                className="font-lora text-black font-medium "
                id="pincode"
                value={addressData.pincode}
                onChange={addressChange}
              />
              <FloatingLabel
                variant="standard"
                label="Land Mark *"
                className="font-lora text-black font-medium "
                id="landmark"
                value={addressData.landmark}
                onChange={addressChange}
              />
            </div>
            <div>
              <h2 className="font-poetsen font-medium my-2">Save as</h2>
              <div className="flex justify-between items-center gap-3 w-full">
                <input
                  type="text"
                  id="home"
                  value={selected === "home" ? "home" : "home"}
                  readOnly
                  onClick={() => handleSelect("home")}
                  className={`text-center rounded-full capitalize font-lora font-medium cursor-pointer w-1/2 ${
                    selected === "home"
                      ? "bg-teal-800 text-white"
                      : "text-teal-800"
                  }`}
                />
                <input
                  type="text"
                  id="work"
                  value={selected === "work" ? "work" : "work"}
                  readOnly
                  onClick={() => handleSelect("work")}
                  className={`text-center rounded-full capitalize font-lora font-medium cursor-pointer w-1/2 ${
                    selected === "work"
                      ? "bg-teal-800 text-white"
                      : "text-teal-800"
                  }`}
                />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0  flex justify-center my-4">
              {updateLoading ? (
                <Button color="blue" pill className="flex-1 mx-4">
                  loading...
                </Button>
              ) : (
                <Button
                  color="blue"
                  pill
                  className="flex-1 mx-4"
                  onClick={handleUpdate}
                >
                  Update
                </Button>
              )}
            </div>
          </div>
        </Drawer.Items>
      </Drawer>
    </div>
  );
};

export default Address;
