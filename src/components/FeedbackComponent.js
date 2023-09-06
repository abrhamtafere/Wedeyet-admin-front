import React, { useState } from "react";
import { Popover, List, ListItem, ListItemText, Snackbar, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { IconButton, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

export const FeedbackComponent = ({ message, severity, onClose, setFeedbacks }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationCount, setNotificationCount] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const handleViewDetails = (feedback) => {
    setFeedbacks(prev => prev.filter((pre) => pre._id !== feedback._id))
    setSelectedFeedback(feedback);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedFeedback(null);
  };
  
  const handleViewFeedbacks = () => {
    setAnchorEl(null);
    // setNotificationCount((prevCount) => prevCount - message.length);
    setNotificationCount((prevCount) => 0);
    // setFeedbacks(prev => prev.filter((pre) => pre._id !== id))
    // setFeedbacks([]);
  };

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const time = (createdAt) => {
    const dateObj = new Date(createdAt);
return dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  }

  const formatDateTime = (createdAt) => {
    const currentDateTime = new Date();
    const createdAtDateTime = new Date(createdAt);
  
    // Calculate the time difference in milliseconds
    const timeDifference = currentDateTime - createdAtDateTime;
  
    // Calculate the number of milliseconds in a day
    const millisecondsInDay = 24 * 60 * 60 * 1000;
  
    if (timeDifference < millisecondsInDay) {
      // Display time if it occurred within the last day
      const options = { weekday: "long", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: true };
      return createdAtDateTime.toLocaleString([], options);
    } else if (timeDifference < 2 * millisecondsInDay) {
      // Display "yesterday" if it occurred yesterday
      return "Yesterday";
    } else {
      // Display the full date if it occurred more than one day ago
      const options = { weekday: "long", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: true };
      return createdAtDateTime.toLocaleString([], options);
    }
  }

  return (
    <div className="flex flex-col">
      <IconButton
        color="inherit"
        className="mr-2"
        onClick={handleNotificationClick}
      >
        <Badge badgeContent={message.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleNotificationClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        className="mt-4"
      >
        {console.log("feedbacks man: ", message)}
        <List className="p-2 max-w-xs mt-[200px]  border-green-500 ml-4">
          {message.map((feedback, index) => (
            <ListItem
              key={index}
              className="flex items-center justify-between mb-1  bg-stone-50 hover:bg-gray-200 rounded-1 truncate  text-ellipsis w-fit" >
              <div className="flex-shrink-0">
                {/* Replace with your desired icon component */}
                <span className="text-gray-400 bg-lime-200 mr-2 p-0.5 bg-gray-  rounded-full ">
                  <PersonOutlineIcon />
                </span>
              </div>
              <div className="flex flex-row w-full justify-between items-center">
                <div className="flex flex-col w-44  truncate ">
                  <ListItemText
                    primary={feedback.message}
                    className="flex  "
                    // sx={{ maxWidth: "200px" }}
                  />
                  <div className='flex w-fit gap-1'>
                  <ListItemText primary={`${time(feedback.createdAt)} by`} className="text-sm text-indigo-300" />
                    <ListItemText primary={feedback.name} className="text-sm text-cyan-300 " />
                  </div>
                  
                </div>
                <button className="text-white px-4 rounded-md bg-lime-300 hover:bg-lime-400 flex justify-end ml-2 items-center cursor-pointer h-5/6 py-1 mr-0.5"
                onClick={() => handleViewDetails(feedback)}
                >
                  View
                </button>
              </div>
            </ListItem>
          ))}
          <ListItem
            button
            // onClick={handleViewFeedbacks}
            className="bg-lime-400 flex justify-end"
          >
            <div className="bg-lime-400 hover:bg-lime-500 w-full flex items-center  justify-center py-2 rounded">

            <h2 className='w-fit text-white font-bold'>View Feedbacks</h2>
            </div>
          </ListItem>
        </List>
      </Popover>
      {/* Feedback Details Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Feedback Details</DialogTitle>
        <DialogContent>
          {selectedFeedback && (
            <div>
              <p>{selectedFeedback.message}</p>
              <p>{selectedFeedback.name}</p>
              <p>{selectedFeedback.email}</p>
              <p>{formatDateTime(selectedFeedback.createdAt)}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
