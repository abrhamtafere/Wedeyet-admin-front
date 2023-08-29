import React, { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { styled } from "@mui/system";
import { cookies, useCookies } from "react-cookie";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const BlueLinkStyle = {
  color: "blue",
};
const RedLinkStyle = {
  color: "red",
};
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

const convertLocation = (input) => {
  const inputArray = input.slice(1, -1);
  return inputArray.split(",").map(Number);
};

function EditPlacePage() {
  //{editId, handleClose}
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [cookies, setCookies, removeCookie] = useCookies();
  const [AllCategory, setAllCategory] = useState([]);
  const [AllSubCategory, setAllSubCategory] = useState([]);
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [telegram, setTelegram] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [formData, setFormData] = useState({});
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(formData.category);
  const token = cookies.token;
  const { id } = useParams();
  // const id = editId;

  useEffect(() => {
    axios
      .get("https://wedeyet.herokuapp.com/api/place/all/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.Places;
        console.log("place data: ", data);
        const res = data.map((item, index) => ({
          ...item,
          category: item.category.name,
          subCategory: item.subCategory.name,
          location: JSON.stringify([
            item.location.coordinates[0],
            item.location.coordinates[1],
          ]),
        }));
        // location:item.location.coordinates}))
        // filter place with id
        //location:JSON.stringify([item.location.coordinates[0], item.location.coordinates[1]])}))
        console.log(" All Places ", res);
        setPlaces(res);
        const currentPlace = res.filter((place) => place._id == id);
        console.log(" Id ", currentPlace);
        setFormData(currentPlace[0]);
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
        //i can add here the filter for subCatergory
        const data = response.data.SubServices;
        setAllSubCategory(data);
      })
      .catch((error) => {
        console.error(error);
        console.log(error);
      });
  }, []);

  // remove empty string value from object
  const removeEmptyString = (obj) =>
    Object.entries(obj).reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {});
  //  check object has name property

  const handleEditPlace = (event) => {
    event.preventDefault();
    const updatedData = {
      name,
      description,
      category,
      subCategory,
      phoneNumber,
      telegram,
      location,
      website,
      address,
    };
    const updateData = removeEmptyString(updatedData);
    updateData.hasOwnProperty("location") &&
      (updateData.location = {
        types: "Point",
        coordinates: convertLocation(location),
      });

    axios
      .put(`https://wedeyet.herokuapp.com/api/place/update/${id}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setResponse(data.message);
        console.log("Update ", data);
        navigate("/superAdminPage");
      })
      .catch((error) => {
        setError("Place update Filed!");
        console.error(error);
      });
  };

  // console.log(" Form Data : ",places)
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));
  // };
  if (!formData.category) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <h2 className="mb-4 text-2xl">
        Edit Place: <span className="text-green-500">{formData.name}</span>
      </h2>
      <Box
        component="form"
        sx={{
          display: "grid",
          placeItems: "center",
          gap: "1rem",
          "& .MuiTextField-root": { width: "70%" },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="flex flex-row w-full gap-8">
          <div className="flex flex-col w-1/2 justify-center items-end">
            {console.log("form name; : ", formData.category)}
            <TextField
              required
              id="outlined-required"
              label="Name"
              defaultValue={formData.name}
              onChange={(e) => setName(e.target.value)}
              sx={{ marginBottom: "1rem" }}
            />

            <InputLabel id="demo-simple-select-label">Area</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={formData.area}
              label="Area"
              autoWidth
              onChange={(e) => setArea(e.target.value)}
              sx={{ width: "70%", marginBottom: "1rem" }}
            >
              {Area.map((cat, index) => (
                <MenuItem key={index} value={cat} defaultValue={formData.area}>
                  {cat}
                </MenuItem>
              ))}
            </Select>

            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={formData.category}
              label="Category"
              autoWidth
              onChange={(e) => {
                setCategory(e.target.value);
                setSelectedCategory(e.target.value);
                console.log("tota; ", selectedCategory);
              }}
              sx={{ width: "70%", marginBottom: "1rem" }}
            >
              <MenuItem value={formData.category}>{formData.category}</MenuItem>
              {AllCategory.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>

            <InputLabel id="demo-simple-select-label">SubCategory</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="SubCategory"
              autoWidth
              defaultValue={formData.subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              sx={{ width: "70%", marginBottom: "1rem" }}
            >
              <MenuItem value={formData.subCategory}>
                {formData.subCategory}
              </MenuItem>
              {AllSubCategory.filter(
                (item) => item.category.id === selectedCategory
              ).length > 0
                ? AllSubCategory.filter(
                    (item) => item.category.id === selectedCategory
                  ).map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </MenuItem>
                  ))
                : AllSubCategory.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </MenuItem>
                  ))}
            </Select>

            <TextField
              id="outlined-basic"
              label="Location"
              variant="outlined"
              defaultValue={formData.location}
              onChange={(e) => setLocation(e.target.value)}
              sx={{ width: "100%", marginBottom: "1rem" }}
            />
          </div>
          <div className="flex flex-col w-1/2 justify-between">
            <TextField
              id="outlined-basic"
              label="Telegram"
              variant="outlined"
              defaultValue={formData.telegram}
              onChange={(e) => setTelegram(e.target.value)}
              sx={{ width: "100%", marginBottom: "1rem" }}
            />
            <TextField
              id="outlined-basic"
              label="Website"
              variant="outlined"
              defaultValue={formData.website}
              onChange={(e) => setWebsite(e.target.value)}
              sx={{ width: "100%", marginBottom: "1rem" }}
            />
            <TextField
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              defaultValue={formData.phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              sx={{ width: "100%", marginBottom: "1rem" }}
            />
            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              defaultValue={formData.address}
              onChange={(e) => setAddress(e.target.value)}
              sx={{ width: "100%", marginBottom: "1rem" }}
            />

            <StyledTextarea
              aria-label="minimum height"
              minRows={2}
              defaultValue={formData.description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ width: "70%", marginBottom: "1rem" }}
              className="border"
            />
          </div>
        </div>

        {/* <div
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginBottom: "1rem",
          }}
          className="text-3xl"
        >
          <Button
  variant="contained"
  color="primary"
  onClick={handleEditPlace}
  className="px-4 py-2  text-white rounded hover:bg-blue-600"
>
  Save Changesj
</Button>
        </div> */}
        <div className="flex justify-center w-full mb-4">
  <button
    type="button"
    onClick={handleEditPlace}
    className="px-4 py-2 text-white bg-black rounded hover:bg-gray-900"
  >
    Save Changes
  </button>
</div>

        <div>
          {response && (
            <div>
              <h3>response</h3>
            </div>
          )}
          {error && (
            <div>
              <h3>error</h3>
            </div>
          )}
        </div>
      </Box>
    </div>
  );
}

export default EditPlacePage;
