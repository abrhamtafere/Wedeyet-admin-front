import React from "react";
import { useState, useEffect, useSelector } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useCookies } from "react-cookie";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import { Link } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Icon,
  Modal,
} from "@mui/material"; //Link
import AddIcon from "@mui/icons-material/Add";
import EditPlacePage from '../../Page/EditPlace';
//

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
const CustomButton = styled(Button)`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  padding: 12px 24px;
  border-radius: 12px;
  color: white;
`;
const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);
// const BlueLinkStyle = {
//   color: "blue",
//   textDecoration: 'none',
// };

const tableCellStyle = {
  fontSize: "15px", // Adjust the font size as needed
};

const tableHeadStyle = {
  fontSize: "18px", // Adjust the font size as needed
  fontWeight: "600",
};

const BlueLinkStyle = {
  color: "white",
  backgroundColor: "#3979E4",
  textDecoration: "none",
  padding: "8px 16px",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.3s ease-in-out",
};

const BlueButtonHoverStyle = {
  backgroundColor: "#1851AD", // New background color for hover
};

const RedLinkStyle = {
  color: "white",
  backgroundColor: "#FD4646",
  textDecoration: "none",
  padding: "8px 16px",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.3s ease-in-out",
};
const editPlace = (params) => {
  const linkUrl = `/edit/place/${params.getValue("_id")}`;

  return <Link to={linkUrl}>{params.value}</Link>;
};

const columns = [
  { field: "_id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "area", headerName: "Area", width: 130 },
  { field: "category", headerName: "Category", width: 130 },
  { field: "subCategory", headerName: "Sub Category", width: 130 },
  { field: "phoneNumber", headerName: "Phone", width: 130 },
  { field: "website", headerName: "Website", width: 130 },
  { field: "telegram", headerName: "Telegram", width: 130 },
];

function SuperAdmin() {
  const [places, setPlaces] = useState([]);
  const [ServiceSubService, setServiceSubService] = useState([]);
  const [AllCategory, setAllCategory] = useState([]);
  const [AllSubCategory, setAllSubCategory] = useState([]);
  const [FilteredSubCategory, setFilteredSubCategory] = useState([]);
  const [cookies, setCookies, removeCookie] = useCookies();
  const [open, setOpen] = React.useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, places.length - page * rowsPerPage);

  // Form Data
  const token = cookies.token;
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [telegram, setTelegram] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [addPlaceResponse, setAddPlaceResponse] = useState("");
  const [error, setError] = useState("");
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpen = () => {
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpenEdit(false);
  };

  const convertLocation = (input) => {
    const inputArray = input.slice(1, -1);
    return inputArray.split(",").map(Number);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    console.log(
      "Selected Category ",
      selectedCategory,
      " All SubCategory ",
      AllSubCategory
    );
    console.log("Sub Category List AA ", selectedCategory);

    setCategory(selectedCategory);
    const subCategoryList = AllSubCategory.filter(
      (item) => item.category.id == selectedCategory
    );
    console.log("Sub Category List ", subCategoryList);
    setFilteredSubCategory(subCategoryList);
  };

  const handleAddPlace = () => {
    const data = {
      name,
      area,
      phoneNumber,
      website,
      telegram,
      category,
      subCategory,
      description,
      location,
      address,
    };
    console.log("Form Submitted !");
    data.location = {
      type: "Point",
      coordinates: convertLocation(data.location),
    };
    // console.log(data,token)
    axios
      .post("https://wedeyet.herokuapp.com/api/place/create/", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const result = response.data.Place;
        console.log("result: ", data);
        console.log("result: ", result);
        const lastId = places[places.length - 1].id;
        const place = { ...result, id: lastId + 1 };
        setAddPlaceResponse(place.name + " Added Successfully");
        setError(null);

        console.log("place ", place);
        setPlaces([...places, place]);
        setName("");
        setArea("");
        setCategory("");
        setSubCategory("");
        setPhoneNumber("");
        setWebsite("");
        setTelegram("");
        setDescription("");
        setLocation("");
        setAddress("");
      })
      .catch((error) => {
        setError("Failed To Add Place");
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get("https://wedeyet.herokuapp.com/api/place/all/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.Places;
        console.log("Welcome Place ", data);
        const res = data.map((item, index) => ({
          ...item,
          category: item.category.name,
          subCategory: item.subCategory.name,
        }));
        setPlaces(res);
      })
      .catch((error) => {
        console.error(error);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://wedeyet.herokuapp.com/api/service/category/all/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.ServiceSubService;
        console.log("Welcome | ", data);
        setServiceSubService(data);
      })
      .catch((error) => {
        console.error(error);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://wedeyet.herokuapp.com/api/service/all/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.Services;
        setAllCategory(data);
        // setAll(data);
      })
      .catch((error) => {
        console.error(error);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://wedeyet.herokuapp.com/api/subService/all/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.SubServices;
        console.log("Sub CAtegory ", data);
        setAllSubCategory(data);
      })
      .catch((error) => {
        console.error(error);
        console.log(error);
      });
  }, []);

  //delete
  const handleDelete = (id) => {
    // Perform your delete logic here
    console.log(" Place Delete!");
    // axios delete request
    axios
      .delete(`https://wedeyet.herokuapp.com/api/place/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // ...
    console.log(` Place with ID ${id} Deleted!`);
  };

  const handleDeleteClick = (itemId) => {
    setDeletingItemId(itemId);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    handleDelete(deletingItemId);
    setShowConfirmation(false);
    setPlaces((prevs) => prevs.filter((place) => place._id !== deletingItemId));
    console.log("removed: ", deletingItemId, "id rem", places._id);
    setDeletingItemId(null);
    // navigate('/superAdminPage');
  };

  const handleCancelDelete = () => {
    console.log(" Place Delete Cancel!");
    setDeletingItemId(null);
    setShowConfirmation(false);
  };

  return (
    <div className="bg-400 border p-24 m-8">
      <div className="flex justify-end pb-2 pr-2">
        <button
          onClick={openModal}
          className="flex text-2xl bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center 
       "
        >
          <AddIcon className="mr-2" fontSize="large" />
          Add New
        </button>
      </div>

      <Modal open={isModalOpen} onClose={closeModal} className="m-4">
        <div className="flex justify-center items-center ">
          <div className="bg-white shadow-md rounded-md p-4 space-y-4 w-full md:w-2/4">
            <h1>Add Place here</h1>
            <form className="flex flex-col justify-center items-center ">
              <div className="flex flex-row gap-6">
                <div className="flex flex-col w-1/2 gap-2">
                  <TextField
                    required
                    id="outlined-required"
                    label="Name"
                    placeholder="Admas University"
                    onChange={(e) => setName(e.target.value)}
                    className="col-span-2"
                  />

                  <div>
                    <InputLabel id="demo-simple-select-label">Area</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={area}
                      label="Area"
                      autoWidth
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full"
                    >
                      {Area.map((cat, index) => (
                        <MenuItem key={index} value={cat}>
                          {cat}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <InputLabel id="demo-simple-select-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={category}
                      label="Category"
                      autoWidth
                      onChange={handleCategoryChange}
                      className="w-full"
                    >
                      {AllCategory.map((cat) => (
                        <MenuItem key={cat._id} value={cat.name}>
                          {cat.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <InputLabel id="demo-simple-select-label">
                      SubCategory
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={subCategory}
                      label="SubCCategory"
                      autoWidth
                      onChange={(e) => setSubCategory(e.target.value)}
                      className="w-full"
                    >
                      {FilteredSubCategory.length === 0
                        ? AllSubCategory.map((cat) => (
                            <MenuItem key={cat._id} value={cat._id}>
                              {cat.name}
                            </MenuItem>
                          ))
                        : FilteredSubCategory.map((cat) => (
                            <MenuItem key={cat._id} value={cat._id}>
                              {cat.name}
                            </MenuItem>
                          ))}
                    </Select>
                  </div>
                  <TextField
                    id="outlined-basic"
                    label="Telegram"
                    variant="outlined"
                    placeholder="@nahoo_tv"
                    onChange={(e) => setTelegram(e.target.value)}
                    className="col-span-2 w-full"
                  />
                </div>
                <div className="flex flex-col  w-1/2 gap-5">
                  <TextField
                    id="outlined-basic"
                    label="Website"
                    variant="outlined"
                    placeholder="https://malta.com"
                    onChange={(e) => setWebsite(e.target.value)}
                    className="col-span-2"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Phone Number"
                    variant="outlined"
                    placeholder="09xxxxxxxx"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="col-span-2"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Address"
                    variant="outlined"
                    placeholder="Near Edna Mall"
                    onChange={(e) => setAddress(e.target.value)}
                    className="col-span-2"
                  />

                  <TextField
                    id="outlined-basic"
                    label="Location"
                    variant="outlined"
                    placeholder="[9.88353,32.0910]"
                    onChange={(e) => setLocation(e.target.value)}
                    className="col-span-2"
                  />
                  <StyledTextarea
                    aria-label="minimum height"
                    minRows={2}
                    placeholder="Place Description"
                    onChange={(e) => setDescription(e.target.value)}
                    className="col-span-2 w-full border"
                  />
                </div>
              </div>

              <div
                className="mt-4"
                // onClick={closeModal}
              >
                <Button
                  // onClick={closeModal}
                  variant="contained"
                  color="primary"
                  onClick={handleAddPlace}
                  className="col-span-2 self-center"
                >
                  <SaveIcon />
                  Add Place
                </Button>
              </div>

              {addPlaceResponse && (
                <div>
                  <h3>Form Submission Successful!</h3>
                  <pre>{JSON.stringify(addPlaceResponse, null, 2)}</pre>
                </div>
              )}
              {error && (
                <div>
                  <h3>Form Submission Failed!</h3>
                  <pre>{JSON.stringify(error, null, 2)}</pre>
                </div>
              )}
            </form>
          </div>
        </div>
      </Modal>
      {/* place informations */}
      <Box component="div" sx={{ height: 500 }}>
        <TableContainer
          style={{ height: 500, width: "100%", paddingRight: "20px" }}
        >
          <h2>All Places</h2>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell style={tableHeadStyle}>Name</TableCell>
                <TableCell style={tableHeadStyle}>Area</TableCell>
                <TableCell style={tableHeadStyle}>Category</TableCell>
                <TableCell style={tableHeadStyle}>SubCategory</TableCell>
                <TableCell style={tableHeadStyle}>Phone</TableCell>
                <TableCell style={tableHeadStyle}>Telegram</TableCell>
                <TableCell style={tableHeadStyle}>Website</TableCell>
                <TableCell style={tableHeadStyle} align="center" colSpan={2}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? places.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : places
              ).map((item) => (
                <TableRow key={item._id}>
                  <TableCell style={tableCellStyle}>{item.name}</TableCell>
                  <TableCell style={tableCellStyle}>{item.area}</TableCell>
                  <TableCell style={tableCellStyle}>{item.category}</TableCell>
                  <TableCell style={tableCellStyle}>
                    {item.subCategory}
                  </TableCell>
                  <TableCell style={tableCellStyle}>
                    {item.phoneNumber}
                  </TableCell>
                  <TableCell style={tableCellStyle}>{item.telegram}</TableCell>
                  <TableCell>
                    <Link
                      to={item.website}
                      target="_blank"
                      style={{ textDecoration: "none" }}
                    >
                      {item.website}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/edit/${item._id}`}
                      onClick={() => handleOpen()}
                      style={BlueLinkStyle}
                      sx={{
                        "&:hover": BlueButtonHoverStyle, // Apply hover style when hovering the button
                      }}
                    >
                      Edit
                    </Link>
                    {/* <Modal open={openEdit} onClose={handleClose}>
                      <EditPlacePage editId={item._id} handleClose={handleClose} />
                    </Modal> */}
                  </TableCell>
                  <TableCell>
                    <p
                      style={RedLinkStyle}
                      onClick={() => handleDeleteClick(item._id)}
                    >
                      Delete
                    </p>
                  </TableCell>
                  <Dialog open={showConfirmation} onClose={handleCancelDelete}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                      Are you sure you want to delete this item?
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCancelDelete} color="primary">
                        Cancel
                      </Button>
                      <Button
                        onClick={handleConfirmDelete}
                        color="error"
                        autoFocus
                      >
                        Delete
                      </Button>
                    </DialogActions>
                  </Dialog>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={9} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={places.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </div>
  );
}

export default SuperAdmin;
