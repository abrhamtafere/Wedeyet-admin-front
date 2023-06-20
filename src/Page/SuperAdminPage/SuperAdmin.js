import React from 'react'
import { useState, useEffect,useSelector } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { useCookies } from 'react-cookie';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import { Link } from 'react-router-dom';

const Area= ["Abacoran sefer", "Abadina", "Abnet", "Adis ketem", "Adis sefer", "Adisu gebeya", "Agust", "Akaki kalit",
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
const CustomButton = styled(Button)`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  padding: 12px 24px;
  border-radius: 12px;
  color: white`;;
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
  const BlueLinkStyle = {
    color: 'blue'
};
const RedLinkStyle = {
    color: 'red'
}
 const editPlace = (params) => {
    const linkUrl = `/edit/place/${params.getValue('_id')}`;

    return (
      <Link to={linkUrl}>
        {params.value}
      </Link>
    );
  }

const columns = [
  { field: '_id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'area', headerName: 'Area', width: 130 },
  { field: 'category', headerName: 'Category', width: 130 },
  { field: 'subCategory', headerName: 'Sub Category', width: 130 },
  { field: 'phoneNumber', headerName: 'Phone', width: 130 },
  { field: 'website', headerName: 'Website', width: 130 },
  { field: 'telegram', headerName: 'Telegram', width: 130 },
]
function SuperAdmin() {
  const [places, setPlaces] = useState([]);
  const [ServiceSubService, setServiceSubService] = useState([]);
  const [AllCategory, setAllCategory] = useState([]);
  const [AllSubCategory, setAllSubCategory] = useState([]);
  const [FilteredSubCategory, setFilteredSubCategory] = useState([]);
  const [cookies, setCookies, removeCookie] = useCookies();
  const [open, setOpen] = React.useState(true);
  
  // Form Data
  const token = cookies.token
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [website, setWebsite] = useState('');
  const [telegram, setTelegram] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [addPlaceResponse, setAddPlaceResponse] = useState('');
  const [error, setError] = useState('');

  const convertLocation = (input) => {
    const inputArray = input.slice(1, -1);
    return inputArray.split(',').map(Number);
  }

  const handleCategoryChange = (e) => { 
    const selectedCategory = e.target.value;
    console.log("Selected Category ", selectedCategory,
      " All SubCategory ", AllSubCategory)
    setCategory(selectedCategory); 
    const subCategoryList = AllSubCategory.filter((item) => item.category.id == selectedCategory);
    console.log("Sub Category List ", subCategoryList)
    setFilteredSubCategory(subCategoryList);
  }

  const handleAddPlace = () => {
    const data = { name, area, phoneNumber, website, telegram, category, subCategory, description, location, address }
    console.log("Form Submitted !")
    data.location = { type: "Point", "coordinates": convertLocation(data.location) };
    // console.log(data,token)
    axios.post('https://wedeyet.herokuapp.com/api/place/create/', data,
      { headers: { 'Authorization': `Bearer ${token}` } })
      .then(response => {
        const result = response.data.Place;
        // console.log(result);
        const lastId = places[places.length - 1].id;
        const place = { ...result, id: lastId + 1 };
        setAddPlaceResponse(place.name + " Added Successfully");
        setError(null);
        console.log(place);
        setPlaces([...places, place]);
        setName('');
        setArea('');
        setCategory('');
        setSubCategory('');
        setPhoneNumber(''); 
        setWebsite('');
        setTelegram('');
        setDescription('');
        setLocation('');
        setAddress('');
      }).catch(error => {
        setError("Failed To Add Place")
        console.error(error)
      })
  }

  useEffect(() => {
    axios.get('https://wedeyet.herokuapp.com/api/place/all/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
        const data = response.data.Places;
        console.log("Welcome Place ",data)
        const res = data.map((item, index) => ({ ...item,category:item.category.name,subCategory:item.subCategory.name}))
        setPlaces(res);
      })
      .catch(error => {
        console.error(error);
        console.log(error);
      });
  }, []);

   useEffect(() => {
    axios.get('https://wedeyet.herokuapp.com/api/service/category/all/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        const data = response.data.ServiceSubService;
        console.log("Welcome | ",data)
        setServiceSubService(data);
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
    })
      .then(response => {
        const data = response.data.Services;
        setAllCategory(data);
        // setAll(data);
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
        // console.log("Sub CAtegory ",data)
        setAllSubCategory(data);
      })
      .catch(error => {
        console.error(error);
        console.log(error);
      });
    }, []);
  
  return (
    <div>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Name"
            placeholder="Admas University"
            onChange={(e) => setName(e.target.value)}
        />
  
        <InputLabel id="demo-simple-select-label">Area</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={area}
              label="Area"
              autoWidth
          onChange={(e)=>setArea(e.target.value)}
            >   
          {Area.map((cat,index) => (
            <MenuItem key={index} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
          <div>
            <div>
      </div>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
              label="Category"
              autoWidth
              onChange={handleCategoryChange}
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
          value={subCategory}
          label="SubCCategory"
          autoWidth
          onChange={(e)=>setSubCategory(e.target.value)}
            >   
              {FilteredSubCategory.length == 0 ?
                AllSubCategory.map((cat) => (
            <MenuItem key={cat._id} value={cat._id}>
              {cat.name}
            </MenuItem>
          )) :
          FilteredSubCategory.map((cat) => (
            <MenuItem key={cat._id} value={cat._id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
          </div>
          <div>
            <TextField id="outlined-basic" label="Telegram" variant="outlined" placeholder="@nahoo_tv" onChange={ (e)=>setTelegram(e.target.value)} />
            <TextField id="outlined-basic" label="Website" variant="outlined" placeholder="https://malta.com" onChange={ (e)=>setWebsite(e.target.value)}/>
            <TextField id="outlined-basic" label="Phone Number" variant="outlined" placeholder="09xxxxxxxx" onChange={ (e)=>setPhoneNumber(e.target.value)}/>
            <TextField id="outlined-basic" label="Address" variant="outlined"  placeholder="Near Edna Mall" onChange={ (e)=>setAddress(e.target.value)}/>
          </div>
          <div>
            <TextField id="outlined-basic" label="Location" variant="outlined" placeholder="[9.88353,32.0910]" onChange={ (e)=>setLocation(e.target.value)} />
            <StyledTextarea   aria-label="minimum height"   minRows={2}   placeholder="Place Description" onChange={ (e)=>setDescription(e.target.value)} />
          </div>
          <div>
            <Button variant="contained" color="primary" onClick={handleAddPlace} ><SaveIcon/>Add Place</Button>
          </div>
          <div>
            {addPlaceResponse && (<div>   <h3>Form Submission Successful!</h3>
              <pre>{JSON.stringify(addPlaceResponse, null, 2)}</pre>
            </div>)
            }
            {error && (<div>   <h3>Form Submission Failed!</h3>
                <pre>{JSON.stringify(error, null, 2)}</pre>
              </div>)
              }
          </div>
      </div>
    </Box>  
    <div style={{ height: 400, width: '100%' }}>
        <h2>All Places</h2>
      <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Area</th>
          <th>Category</th>
          <th>SubCategory</th>
          <th>Phone</th>
          <th>Telegram</th>
          <th>Website</th>
          <th style={BlueLinkStyle}>Edit</th>
          <th style={RedLinkStyle}>Delete</th>
        </tr>
      </thead>
      <tbody>
        {places.map((item) => (
          <tr key={item._id}>
            <td>{item.name}</td>
            <td>{item.area}</td>
            <td>{item.category}</td>
            <td>{item.subCategory}</td>
            <td>{item.phoneNumber}</td>
            <td>{item.telegram}</td>
            <td> 
              <a href={item.website} target="_blank">
                {item.website}</a>
            </td>
            <td>
              <a href={`edit/${item._id}`} style={BlueLinkStyle}>Edit</a>
            </td>
             <td>
              <a href={`delete/${item._id}`} style={RedLinkStyle}>Delete</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  </div>
  );
}



export default SuperAdmin