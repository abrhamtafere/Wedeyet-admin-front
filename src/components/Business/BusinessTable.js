import React from 'react';
import { Table,Button } from 'antd';
import { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import BusinessComponent from './BusinessComponent';
import { setServiceData } from '../../redux/Services';
const initialData  = {
  "id":1,
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
       ] ,}
  



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

const expandedRowRender = (record) => {
  const columns = [
    { title: 'Branch Name', dataIndex: 'branchName', key: 'branchName' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Select Place', dataIndex: 'selectplace', key: 'selectplace' },
    { title: 'Branch Telegram User Name', dataIndex: 'branchTelegramUserName', key: 'branchTelegramUserName' },
    { title: 'Branch Location', dataIndex: 'branchLocation', key: 'branchLocation' },
  ];

  return <Table columns={columns} dataSource={record.Branchs} pagination={false} />;
};

const BusinessTable = () => {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(setServiceData(initialData))
  },[])
  const serviceData=useSelector((state) => state.serviceState.service);

    const [data, setData] = useState(initialData);


console.log(data)
    const handleEdit = (record) => {
      console.log('Edit', record);
      window.scrollTo(100, 0);
     <BusinessComponent edit={true} record={record}/>
   };

    const handleDelete = (record) => {
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
    const columns = [
      {
        title: 'Business Name',
        dataIndex: 'businessName',
      },
      {
        title: 'Selected Main Category',
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
    <Table
      columns={columns}
      expandable={{
        expandedRowRender,
        rowExpandable: record => !!record.Branchs && record.Branchs.length > 0,
      }}
      dataSource={data ? [data] : []}
      pagination={{ pageSize: 5 }}
      rowKey="id"
    />
  );
};

export default BusinessTable;