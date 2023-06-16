import React from 'react';
import { Table, Button } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BusinessComponent from './BusinessComponent';
import { setServiceData,addBranch, editPlace, editBranch, deletePlace, deleteBranch} from '../../redux/Services';
import { Box,  Avatar } from "@mui/material"
import { Add } from '@mui/icons-material';
const initialData = {
  "id": 1,
  "businessName": "Business Name 1",
  "businessImages": [
    "blob:http://localhost:3000/7486b7bb-40b7-411a-b4bc-84a0546e531e",
    "blob:http://localhost:3000/3bfb50fc-eaad-471f-ae10-91ea2861e13a",
    "blob:http://localhost:3000/9de45ef9-bde1-4ed6-8eb3-8c91737b385d",
    "blob:http://localhost:3000/9068ca9d-091d-4471-9dd4-af9786c8ea02"
  ],
  "selectedMainCategory": "Main Category 2",
  "subcategory": " sub Category 3",
  "servicePlace": "Sebara Babur",
  "servicePhone": "+251953054815",
  "serviceLocation": "Busniness Location",
  "serviceTelegram": "@AbmanWolde",
  "aboutService": "About Comapny",
  "services": [
    "Free Delivery"
  ],
  "Branchs": [
    {
      "id": 1,
      "branchName": "Branch Name 1",
      "file": [
        "blob:http://localhost:3000/a32c26fb-89a2-46c2-825f-93c9901feeaf",
        "blob:http://localhost:3000/3fae755b-c65a-434c-b8fb-c359a1f370da"
      ],
      "phone": "+251947081180",
      "selectplace": "Saris abo",
      "branchTelegramUserName": "@BranchTelegram",
      "branchLocation": "Branch Location"
    }
  ],
}




// const columns = [
//   {
//     title: 'Business Name',
//     dataIndex: 'businessName',
//   },
//   {
//     title: 'Selected Main Category',
//     dataIndex: 'selectedMainCategory',
//   },
//   {
//     title: 'Subcategory',
//     dataIndex: 'subcategory',
//   },
//   {
//     title: 'Service Place',
//     dataIndex: 'servicePlace',
//   },
//   {
//     title: 'Service Phone',
//     dataIndex: 'servicePhone',
//   },
//   {
//     title: 'Service Location',
//     dataIndex: 'serviceLocation',
//   },
//   {
//     title: 'Service Telegram',
//     dataIndex: 'serviceTelegram',
//   },
//   {
//     title: 'About Service',
//     dataIndex: 'aboutService',
//   },
//   {
//     title: 'Actions',
//     key: 'actions',
//     render: (text, record) => (
//         <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
//         <Button onClick={() => handleEdit(record)} style={{ backgroundColor: 'blue', color: 'white', marginRight: 8 }}>Edit</Button>
//         <Button onClick={() => handleDelete(record)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</Button>
//       </div>
//     ),
//   },

// ];


const BusinessTable = ({ serviceData }) => {
  const dispatch = useDispatch()
  
  const [data, setData] = useState(serviceData);
  const expandedRowRender = (record) => {
    const handleBranchEdit = (record) => {
      if (record.branchName) {
        // Delete branch
        setData(prevData => ({
          ...prevData,
          Branchs: prevData.Branchs.filter(branch => branch.id !== record.id),
        }));
      } else {
        // Delete business
        setData(null);
      }
    };
    const handleBranchDelete = (record) => {
      console.log(record)
   dispatch(deleteBranch({placeId:record.serviceId,branchId:record.id}))
    };
    const columns = [
      { title: 'Branch id', dataIndex: 'id', key: 'id' },
      {
        title: 'Branch Name',
        key: 'branchname',
        render: (text, record) => (
          <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p>{record.branchName}</p>
            <Box
              sx={{
                display: 'flex',
                '& > *': {
                  m: 1,
                },
              }}
            >
              {record.file.slice(0, 1).map((image) => (
                <Avatar key={image} alt="Image" src={image} />
  
              ))}
              {record.file.length > 1 && (
                <Avatar>
                  <Box display="flex" alignItems="center" justifyContent={"center"}><Add /><p>{record.file.slice(1, record.file.length).length}</p></Box>
                </Avatar>
              )}
            </Box>
          </div>
        ),
      },
     
      { title: 'Phone', dataIndex: 'phone', key: 'phone' },
      { title: 'Select Place', dataIndex: 'selectplace', key: 'selectplace' },
      { title: 'Branch Telegram User Name', dataIndex: 'branchTelegramUserName', key: 'branchTelegramUserName' },
      { title: 'Branch Location', dataIndex: 'branchLocation', key: 'branchLocation' },
      {title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
          <Button onClick={() => handleBranchEdit(record)} style={{ backgroundColor: 'yellow', color: 'white', marginRight: 8 }}>Edit</Button>
          <Button onClick={() => handleBranchDelete(record)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</Button>
        </div>
      ),
    },
  
    ];
  
    return <Table columns={columns} dataSource={record.Branchs} pagination={false} />;
  };
  console.log(serviceData)
  const handleEdit = (record) => {
    console.log('Edit', record);
    window.scrollTo(100, 0);
    <BusinessComponent edit={true} record={record} />
  };


  const handleDelete = (record) => {
    dispatch(deletePlace(record.id) )
  };
  const columns = [
    {
      title: 'Business id',
      dataIndex: 'id',
      key: 'id',
    },

    {
      title: 'Business Name',
      key: 'businessname',
      render: (text, record) => (
        <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p>{record.businessName}</p>
          <Box
            sx={{
              display: 'flex',
              '& > *': {
                m: 1,
              },
            }}
          >
            {record.businessImages.slice(0, 1).map((image) => (
              <Avatar key={image} alt="Image" src={image} />

            ))}
            {record.businessImages.length > 1 && (
              <Avatar>
                <Box display="flex" alignItems="center" justifyContent={"center"}><Add /><p>{record.businessImages.slice(1, record.businessImages.length).length}</p></Box>
              </Avatar>
            )}
          </Box>
        </div>
      ),
    },
    {
      title: 'Main Category',
      dataIndex: 'selectedMainCategory',
    },
    {
      title: 'Subcategory',
      dataIndex: 'subcategory',
    },
    {
      title: 'Service Place',
      dataIndex: 'servicePlace',
    },
    {
      title: 'Service Phone',
      dataIndex: 'servicePhone',
    },
    {
      title: 'Service Location',
      dataIndex: 'serviceLocation',
    },
    {
      title: 'Service Tag',
      render: (text, record) => (
        <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p>{record.services[0]}</p>
          <Box
            sx={{
              display: 'flex',
              '& > *': {
                m: 1,
              },
            }}
          >
  
            {record.services.length > 1 && (
              <Avatar>
                <Box display="flex" alignItems="center" justifyContent={"center"}><Add /><p>{record.services.slice(1, record.services.length).length}</p></Box>
              </Avatar>
            )}
          </Box>
        </div>
      ),
    },
    {
      title: 'Service Telegram',
      dataIndex: 'serviceTelegram',
    },
    {
      title: 'About Service',
      dataIndex: 'aboutService',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
          <Button onClick={() => handleEdit(record)} style={{ backgroundColor: 'yellow', color: 'white', marginRight: 8 }}>Edit</Button>
          <Button onClick={() => handleDelete(record)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</Button>
        </div>
      ),
    },

  ];

  return (
    <Box width={"95%"} height={"400px"} m={"5px"}p={"10px"} bgcolor={"white"}>
      <p>Service Lists</p>
    <Table
    
      columns={columns}
      expandable={{
        expandedRowRender,
        rowExpandable: record => !!record.Branchs && record.Branchs.length > 0,
      }}
      dataSource={serviceData ? serviceData : []}
      pagination={{ pageSize: 5 }}
      scroll={{ x: '100%' }}
      rowKey="id"
    />
    </Box>
  );
};

export default BusinessTable;