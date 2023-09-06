import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function RegistrationForm({closeModal, addItem}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [cookies, setCookies, removeCookie] = useCookies();
  const token = cookies.token;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    closeModal();
    try {
      const response = await axios.post(
        'https://wedeyet.herokuapp.com/api/auth/register',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      addItem(response.data.user);
      // setAdmins(prev => [...prev, formData]);
      
      // console.log('user created: ', response.data); // Log the response data
      // Add any additional logic based on the response
    } catch (error) {
      console.error(error); // Handle any errors
    }
  };

  return (
    <div className="modal-content flex flex-col justify-center items-center m-auto w-fit lg:w-1/3  rounded-lg shadow-lg overflow-auto h-screen mt-8">
      <form className="flex flex-col  bg-gray-300 p-4 gap-4 w-full rounded-lg my-16 mt-40">
        <h1>Registration Form</h1>
        <h2 className="text-2xl font-bold mb-6">Registration Form</h2>
        <div className="mb-4">
          <label className="block font-medium mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full rounded-md px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">Select Role</option>
            <option value="ADMIN">Admin</option>
            <option value="SUPERADMIN">SuperAdmin</option>
          </select>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
