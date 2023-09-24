import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Pagination, PaginationItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const pageSize = 10; // Number of items per page
const PlaceRegistration = () => {
  const Area = [
    "Abacoran sefer",
    "Abadina",
    "Abnet",
    "Adis ketem",
    "Adis sefer",
    "Adisu gebeya",
    "Agust",
    "Akaki kalit",
    "Amanuel area",
    "Ambassador",
    "American gibi",
    "Arat kilo",
    "Aroge kera",
    "Kolfe",
    "18",
    "Asko",
    "birchiko",
    "fabrica",
    "Atklt tera",
    "Atena tera",
    "Autobus tera",
    "Aware",
    "Ayat",
    "Ayer Tena",
    "Beg tera",
    "Bherawi",
    "Beklo bet",
    "Bsrate gebriel",
    "Biss mebrat",
    "Bole",
    "ayat",
    "Bole Michael",
    "Bole airport",
    "Bulgaria mazoria",
    "Cinema Ras",
    "Dar mar",
    "Datsun sefer",
    "Doro manekia",
    "Enderase",
    "Enkulal fabrica",
    "Ere bekentu",
    "Gedam sefer",
    "Geja sefer",
    "Gerji",
    "Giorgis",
    "Gola Michael",
    "Goma kuteba",
    "Gotera",
    "Habte giorgis",
    "Jemo",
    "Kara alo",
    "Kazanchis",
    "Kebena",
    "Kera",
    "Kirkos",
    "Kolfe",
    "Kotebe",
    "Kuas meda",
    "La gare(leghar)",
    "Lafto",
    "Lancha",
    "Lebu",
    "Leg tafo",
    "Lekwwanda",
    "Ldeta",
    "Mechare meda",
    "Bole Medhanialem",
    "Megenagna",
    "Mekanisa",
    "Menaharia",
    "kazanchis",
    "Mennen",
    "Merkato",
    "Mesalemia",
    "Meshualekia",
    "Meskel flower",
    "Mexico",
    "Kera",
    "Mobil",
    "Mola Maru",
    "Nfas silk",
    "lafto",
    "Olompia",
    "Paster",
    "Piasa(piazza)",
    "Posta bet",
    "Ras mekonn dildiy",
    "Repi",
    "Riche",
    "Rufael",
    "Ruwanda",
    "Sar bet",
    "Saris",
    "Saris abo",
    "Sebara Babur",
    "Sebategna",
    "Semen mazegaja",
    "Senga tera",
    "Serategna sefer",
    "Sheh ojele (shegole)",
    "Shiromeda",
    "Shola",
    "Somali tera",
    "3kutr mazoria (total)",
    "Sunshine real estate",
    "Talian sefer",
    "Teklehaymanot",
    "Tor hayloch",
    "Urael",
    "Vatican",
    "Webe berha",
    "Wolo sefer",
    "Winget",
    "Yeka",
    "Yohannes",
    "Zenebe werk real estate",
    "Bela",
    "Bulbula",
    "Haya hulet (22)",
    "Ayer Tena",
    "Japan",
    "Bole bras",
    "Alem  bank",
    "Entoto",
    "Tulu dimtu",
    "Semit",
    "Chichinia",
    "Meskel adebabay",
    "4 kilo",
    "6 kilo",
    "Goro",
    "Tafo",
    "Augusta",
    "Gewasa",
    "Bole arabsa",
  ];

  const [name, setName] = useState("");
  const [places, setPlaces] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAreaModalOpen, setIsAreaModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Get the current page of places
  const currentPlaces = Area.slice(startIndex, endIndex);

  const openAreaModal = () => {
    setIsAreaModalOpen(true);
  };

  const closeAreaModal = () => {
    setIsAreaModalOpen(false);
  };

  const handlePaginationClick = (page) => {
    setCurrentPage(page);
  };

  const handleRegistration = (e) => {
    e.preventDefault();

    // Register and add place to the list
    const newPlace = { name };
    // try {
    // Make a POST request to add the place
    // const response = await axios.post('https://wedeyet.herokuapp.com/api/area/create/', newPlace);
    // const addedPlace = response.data; // Assuming the response contains the added place object

    // Update the places state with the added place
    // setPlaces([...places, addedPlace]);

    // Clear input field
    // setName('');
    // } catch (error) {
    // Handle error if the request fails
    // console.error('Error adding place:', error);
    // Optionally, display an error message to the user
    // }
    setPlaces([...places, newPlace]);
    // i replace places with Area for test purpose
    // Clear input field
    setName("");
  };

  const handleEdit = (index, newName) => {
    const updatedPlaces = [...places];
    updatedPlaces[index].name = newName;
    setPlaces(updatedPlaces);
    setEditIndex(-1);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this place?")) {
      const updatedPlaces = [...places];
      updatedPlaces.splice(index, 1);
      setPlaces(updatedPlaces);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPlaces = Area.filter((place) =>
    // place.name.toLowerCase().includes(searchTerm.toLowerCase())
    place.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(Area.length / pageSize);
  
  return (
    <div className="container mx-auto p-4 w-3/4">
      <h2 className="text-lg font-bold mb-4">Register and Add Places</h2>
      <button
          onClick={openAreaModal}
          className="flex text-xl bg-lime-400 hover:bg-lime-500 text-white font-bold py-1 px-2 rounded flex items-center mr-2 "
        >
          <AddIcon className="mr-1" fontSize="large" />
          Add User
        </button>
      <Modal open={isAreaModalOpen} onClose={closeAreaModal} className="m-4">
        <div className="bg-white p-4 w-96 mx-auto mt-24">
          <h2 className="text-lg font-bold mb-4">Add Places</h2>
          <form onSubmit={handleRegistration} className="mb-8">
            <div className="mb-4">
              <label for="name" className="block mb-1 text-lg font-semibold">
                Place Name:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
                placeholder="Enter place name"
                required
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
              >
                Register and Add Place
              </button>

              <Button
                variant="contained"
                onClick={closeAreaModal}
                className="mt-4 bg-red-300 "
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Modal>
      {Area.length > 0 && (
        <div>
          <div className="flex flex justify-between mt-6">
          <h2 className="text-lg font-bold">Registered Places</h2>
            <div className="flex flex-col mb-4 w-1/3 ">
              <label for="search" className="block mb-1">
                Search:
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={handleSearch}
                className="p-2 border border-gray-300 rounded w-full"
                placeholder="Search places"
              />
            </div>
          </div>
          <div>
            <table className="w-full lg:1/2 ">
              <thead>
                <tr>
                  <th className="text-xl font-semi-bold border border-gray-100 px-4 py-2">
                    Place Name
                  </th>
                  <th className="text-xl font-semi-bold border border-gray-100 px-4 py-2">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPlaces.map((place, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-gray-200`}
                  >
                    <td className="text-lg px-4 py-2">{place}</td>
                    <td className=" px-4 py-2 flex justify-center items-center gap-2">
                      <button
                        className="px-4 py-1 border border-blue-500 text-blue-600 font-semi-bold hover:text-white rounded xoutline hover:bg-blue-600 mr-2 transition-colors duration-300"
                        onClick={() => handleEdit(index, place)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-4 py-1 border border-red-500 text-red-600 font-semi-bold hover:text-white rounded outline-none hover:bg-red-600 transition-colors duration-300"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            {/* <div className=" flex justify-center mt-4">
              {Array.from({ length: Math.ceil(Area.length / pageSize) }).map(
                (_, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 mx-1 rounded ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-black"
                    } hover:bg-blue-500 hover:text-white transition-colors duration-300`}
                    onClick={() => handlePaginationClick(index + 1)}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div> */}
            <div className="flex justify-center mt-4">
              <Pagination
                count={Math.ceil(Area.length / pageSize)}
                page={currentPage}
                onChange={(_, page) => handlePaginationClick(page)}
                variant="outlined"
                shape="rounded"
                // showFirstButton
                // showLastButton
                className="flex justify-center mt-4"
                classes={{
                  ul: "flex items-center space-x-1",
                  outlined: "border border-gray-200 p-2 rounded-lg",
                  rounded: "rounded-lg",
                }}

                renderItem={(item) => (
                  <PaginationItem 
                    {...item}
                    className={`px-4 py-2 hover:text-blue-500 transition-colors duration-300 ${
                      item.selected ? ' text-blue-600' : 'bg-gray-300 text-black'
                    }`}
                  /> 
                )}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceRegistration;
