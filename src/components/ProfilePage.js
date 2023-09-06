import React, { useState, useEffect } from "react";
// import { Modal, Button } from "@mui/material";
import { Modal, Button } from "@mui/material";
import { useCookies } from "react-cookie";
import axios from "axios";

const UserProfile = ({ user }) => {
  const [data, setData] = useState({
    firstName: "Abrham",
    lastName: "T",
    phoneNumber: "0909092020",
    email: "abrham@gmail.com",
    password: "$2b$10$51cNBvMf82xOujMqGYVANuRx9BXUQerKG60G37aYzJFF9AwrjwBSC",
    plainPassword: "12345678",
    role: "ADMIN",
    image: "./profile.avif",
  });
  const [cookies, setCookies, removeCookie] = useCookies();
  const token = cookies.token;
  console.log(token);

  const [user1, setUser1] = useState(user);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [firstName, setFirstName] = useState(user1.firstName);
  const [lastName, setLastName] = useState(user1.lastName);
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(user1.phoneNumber);
  const [photo, setPhoto] = useState("");

  if (!user1.lastName) {
    return <h1>loading...</h1>;
  }

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Handle form submissi
    const updatedData = {
      firstName,
      lastName,
      phoneNumber,
    };

    try {
      // Send the PUT request to update the user data
      const response = await axios.put(
        `https://wedeyet.herokuapp.com/api/auth/update/${user._id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle the response as needed
      console.log("User data updated:", response.data);

      setUser1({ ...user, ...updatedData });
      console.log("updated data: ", updatedData);
      // Close the modal or perform any other action
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating user data:", error);
      // Handle error appropriately, such as showing an error message to the user
    }
  };

  return (
    <div className="relative ">
      <div className="bg-gray-100 rounded-lg shadow-lg p-6 relative z-10 h-[80vh]">
        <div
          className=" h-1/3 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('./Capture.PNG')" }}
        ></div>
        <div className="flex flex-col mt-[-65px] items-center z-30">
          <img
            src="./profile.avif"
            alt="User"
            className="w-32 h-32 rounded-full mb-4 bg-white p-1"
          />
          <h2 className="text-2xl font-semibold">
            {user1.firstName} {user1.lastName}
          </h2>
          <p className="text-base text-gray-500">{user1.role}</p>
        </div>
        {/* // */}
        <Modal
          open={isEditModalOpen}
          onClose={handleModalClose}
          aria-labelledby="edit-modal"
          className="mt-8"
        >
          <div className="modal-content flex justify-center items-center m-auto h-fit w-fit lg:w-1/4 mt-auto  rounded-lg shadow-lg">
            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col  bg-gray-300 p-4 gap-4 w-full rounded-lg"
            >
              <h2 className="text-2xl font-semibold">Edit Profile</h2>
              <div className="form-group flex flex-col">
                <label htmlFor="name" className="text-gray-800">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="form-group flex flex-col">
                <label htmlFor="lastname" className="text-gray-800">
                  Lastname:
                </label>
                <input
                  type="text"
                  id="lastname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="form-group flex flex-col">
                <label htmlFor="password" className="text-gray-800">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="form-group flex flex-col">
                <label htmlFor="phoneNumber" className="text-gray-800">
                  Phone Number:
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="form-group flex flex-row gap-8">
                <label htmlFor="photo" className="text-gray-800">
                  Photo:
                </label>
                <div className="relative w-32 h-32 mt-2 border-2 border-dashed border-gray-400 rounded-md overflow-hidden">
                  <input
                    type="file"
                    id="photo"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0"
                  />
                  {photo ? (
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Selected Photo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-12 h-12 text-gray-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              <div className="button-group flex justify-end gap-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal>
        {/* // */}
        <div className="mt-6">
          <p className="text-xl">
            <strong>Email:</strong> {user1.email}
          </p>
          <p className="text-xl">
            <strong>Phone Number:</strong> {user1.phoneNumber}
          </p>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-6"
          onClick={handleEditClick}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
