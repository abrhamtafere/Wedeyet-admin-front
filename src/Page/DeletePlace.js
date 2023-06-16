import React, { useState } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import DeleteConfirmationDialog from './Deleteconfirm';
import  axios  from 'axios';
import { useCookies } from 'react-cookie';

const DeletePlacePage = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
    const [cookies, setCookies, removeCookie] = useCookies();

    const navigate = useNavigate();
    const { id } =  useParams();
  const token =  cookies.token
  const handleDelete = () => {
    // Perform your delete logic here
    console.log(" Place Delete!")
    // axios delete request
    axios.delete(`https://wedeyet.herokuapp.com/api/place/delete/${id}`,
      { headers: { "Authorization": `Bearer ${token}` } })
      .then((response) => {
        console.log(response.data);
       }).
      catch((err) => { console.log(err) })
    // ...
    console.log(` Place with ID ${id} Deleted!`);
  };

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    handleDelete();
    setShowConfirmation(false);
    navigate('/superAdminPage');

  };

  const handleCancelDelete = () => {
    console.log(" Place Delete Cancel!")
    setShowConfirmation(false);
  };

  return (
    <div>
      <button onClick={handleDeleteClick}>Delete</button>
      {showConfirmation && (
        <DeleteConfirmationDialog
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default DeletePlacePage;
