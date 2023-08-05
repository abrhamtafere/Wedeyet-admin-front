import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { styled } from '@mui/system';
import { cookies,useCookies } from 'react-cookie';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import axios from 'axios'
import { useParams,useNavigate } from 'react-router-dom';

const BlueLinkStyle = {
    color: 'blue'
};
const RedLinkStyle = {
    color: 'red'
}
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
  `,
  );

const Area = ["Abacoran sefer", "Abadina", "Abnet", "Adis ketem", "Adis sefer", "Adisu gebeya", "Agust", "Akaki kalit",
  "Amanuel area", "Ambassador", "American gibi", "Arat kilo", "Aroge kera","Kolfe", "18", "Asko", "Asko", "birchiko", "fabrica", "Atklt tera" ,
  "Atena tera", "Autobus tera" ,"Aware" ,"Ayat", "Ayer Tena" ,"Beg tera" ,"Bherawi" ,"Beklo bet", "Bsrate gebriel", "Biss mebrat", "Bole", "ayat", "Bole Michael", "Bole airport", "Bulgaria mazoria",
  "Cinema Ras", "Dar mar", "Datsun sefer", "Doro manekia", "Enderase", "Enkulal fabrica", "Ere bekentu", "Gedam sefer", "Geja sefer",
  "Gerji", "Giorgis", "Gola Michael", "Goma kuteba", "Gotera", "Habte giorgis", "Jemo", "Kara alo", "Kazanchis", "Kebena","Kera", "Kirkos", "Kolfe", "Kotebe", "Kuas meda",
  "La gare(leghar)", "Lafto", "Lancha", "Lebu", "Leg tafo", "Lekwwanda", "Ldeta", "Mechare meda", "Bole Medhanialem", "Megenagna", "Mekanisa", "Menaharia", "kazanchis", "Mennen", "Merkato", "Mesalemia", "Meshualekia",
  "Meskel flower" ,"Mexico" ,"Kera" ,"Mobil" ,"Mola Maru" ,"Nfas silk" ,"lafto" ,"Olompia" ,"Paster" ,"Piasa(piazza)","Posta bet" ,"Ras mekonn dildiy",
  "Repi", "Riche", "Rufael", "Ruwanda", "Sar bet", "Saris", "Saris abo","Sebara Babur","Sebategna" , "Semen mazegaja", "Senga tera", "Serategna sefer", "Sheh ojele (shegole)",
  "Shiromeda", "Shola", "Somali tera", "3kutr mazoria (total)", "Sunshine real estate", "Talian sefer", "Teklehaymanot", "Tor hayloch", "Urael", "Vatican", "Webe berha",
  "Wolo sefer", "Winget", "Yeka", "Yohannes", "Zenebe werk real estate", "Bela","Bulbula", "Haya hulet (22)","Ayer Tena","Japan","Bole bras", "Alem  bank", "Entoto",
  "Tulu dimtu", "Semit","Chichinia", "Meskel adebabay", "4 kilo","6 kilo", "Goro", "Tafo", "Augusta", "Gewasa", "Bole arabsa"
];

const convertLocation = (input) => {
  const inputArray = input.slice(1, -1);
  return inputArray.split(',').map(Number);
}

function EditPlacePage() {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([])
  const [cookies, setCookies, removeCookie] = useCookies();
  const [AllCategory, setAllCategory] = useState([]);
  const [AllSubCategory, setAllSubCategory] = useState([]);
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('')
  const [description, setDescription] = useState('');
  const [telegram,setTelegram] =  useState('')
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [formData, setFormData] = useState({});
  const [response, setResponse] = useState('')
  const [error,setError] = useState('')
  const token  = cookies.token;
  const { id } =  useParams();

   
  useEffect(() => {
    axios.get('https://wedeyet.herokuapp.com/api/place/all/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        const data = response.data.Places;
        const res = data.map((item, index) => ({ ...item,category:item.category.name,subCategory:item.subCategory.name}))
        // filter place with id
        console.log(" All Places ",res)
        setPlaces(res)
        const currentPlace = res.filter((place) => place._id == id)
        console.log(" Id ",currentPlace)
        setFormData(currentPlace[0])
      })
      .catch(error => {
        console.error(error);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get('https://wedeyet.herokuapp.com/api/service/all/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
        const data = response.data.Services;
        setAllCategory(data);
      })
      .catch(error => {
        console.error(error);
        console.log(error);
      });
  }, []);

    useEffect(() => {
    axios.get('https://wedeyet.herokuapp.com/api/subService/all/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        const data = response.data.SubServices;
        setAllSubCategory(data);
      })
      .catch(error => {
        console.error(error);
        console.log(error);
      });
    }, []);
  

  // remove empty string value from object
  const removeEmptyString = (obj) => Object.entries(obj).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
  //  check object has name property

  const handleEditPlace = (event) => {
    event.preventDefault();
    const updatedData = { name, description, category, subCategory, phoneNumber, telegram, location, website, address }
    const updateData = removeEmptyString(updatedData)
    updateData.hasOwnProperty('location') && (updateData.location = { types: "Point",coordinates:convertLocation(location) })

    axios.put(`https://wedeyet.herokuapp.com/api/place/update/${id}`, updateData, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((response) => {
      const data = response.data
      setResponse(data.message)
      console.log("Update ", data)
      navigate('/superAdminPage');

    }).catch(error => {
      setError("Place update Filed!")
     console.error(error)
    })
    
  };


  // console.log(" Form Data : ",places)

  return (
    <div>
  <h2>Edit Place {formData.name}</h2>
  <Box
    component="form"
    sx={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.1rem', 
      justifyContent: 'center', // Align content horizontally to the center
      alignItems: 'center', 
      '& .MuiTextField-root': { width: '70%' },
    }}
    noValidate
    autoComplete="off"
  >
    <div>
      <TextField
        required
        id="outlined-required"
        label="Name"
        placeholder={formData.name}
        onChange={(e) => setName(e.target.value)}
        sx={{ marginBottom: '1rem' }}
      />

      <InputLabel id="demo-simple-select-label">Area</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        placeholder={formData.area}
        label="Area"
        autoWidth
        onChange={(e) => setArea(e.target.value)}
        sx={{ width: '70%', marginBottom: '1rem' }}
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
        placeholder={formData.category}
        label="Category"
        autoWidth
        onChange={(e) => setCategory(e.target.value)}
        sx={{ width: '70%', marginBottom: '1rem' }}
      >
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
        onChange={(e) => setSubCategory(e.target.value)}
        sx={{ width: '70%', marginBottom: '1rem' }}
      >
        {AllSubCategory.map((cat) => (
          <MenuItem key={cat._id} value={cat._id}>
            {cat.name}
          </MenuItem>
        ))}
      </Select>

      <TextField
        id="outlined-basic"
        label="Location"
        variant="outlined"
        placeholder={
          formData.location ? formData.location.coordinates : formData.location
        }
        onChange={(e) => setLocation(e.target.value)}
        sx={{ width: '100%', marginBottom: '1rem' }}
      />
    </div>

    <div>
      <TextField
        id="outlined-basic"
        label="Telegram"
        variant="outlined"
        placeholder={formData.telegram}
        onChange={(e) => setTelegram(e.target.value)}
        sx={{ width: '100%', marginBottom: '1rem' }}
      />
      <TextField
        id="outlined-basic"
        label="Website"
        variant="outlined"
        placeholder={formData.website}
        onChange={(e) => setWebsite(e.target.value)}
        sx={{ width: '100%', marginBottom: '1rem' }}
      />
      <TextField
        id="outlined-basic"
        label="Phone Number"
        variant="outlined"
        placeholder={formData.phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        sx={{ width: '100%', marginBottom: '1rem' }}
      />
      <TextField
        id="outlined-basic"
        label="Address"
        variant="outlined"
        placeholder={formData.address}
        onChange={(e) => setAddress(e.target.value)}
        sx={{ width: '100%', marginBottom: '1rem' }}
      />

<StyledTextarea
        aria-label="minimum height"
        minRows={2}
        placeholder={formData.description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ width: '70%', marginBottom: '1rem' }}
      />
    </div>

    <div></div>
    <div sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button variant="contained" color="primary" onClick={handleEditPlace} sx={{ width: '50%' }}>
        Save Changes
      </Button>
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
};

export default EditPlacePage;
