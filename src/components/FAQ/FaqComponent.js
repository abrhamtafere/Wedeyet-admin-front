import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { addFAQ, editFAQ, deleteFAQ } from '../../redux/Faq';
import ButtonComponent from '../global/ButtonComponent';
import Lable from '../global/Lable';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const FaqComponent = () => {
  const dispatch = useDispatch();
  const faqs = useSelector(state => state.faqSate);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editId, setEditId] = useState(null);

  const handleAddFAQ = () => {
    if (editId) {
      dispatch(editFAQ({ id: editId, question, answer }));
      setEditId(null);
    } else {
      dispatch(addFAQ({ question, answer }));
    }
    setQuestion('');
    setAnswer('');
  };

  const handleEdit = (faq) => {
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setEditId(faq.id);
    window.scrollTo(0, 0);
  };

  const handleDelete = (id) => {
    dispatch(deleteFAQ(id));
  };

  return (
    <>
      <Box m={"20px"} p={"10px"} bgcolor={"white"} width="50%" display="flex" flexDirection="column" justifyContent="center">
        <Lable text={"Question"} />
        <TextField
          label="Question"
          variant="outlined"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Lable text={"Answer"} />
        <TextField
          label="Answer"
          variant="outlined"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          fullWidth
          margin="normal"
          multiline
        />
        <ButtonComponent buttonText={editId ? 'Save' : 'Add FAQ'} onClick={handleAddFAQ} />
      </Box>
      <Box m={"30px"} p={"10px"} bgcolor={"white"} width="70%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Lable text={"FAQS"} />
        {faqs && faqs.map(faq => (
          <Box mt={"5px"} p={"10px"} width="100%" display="flex" flexDirection="column">
            <Accordion key={faq.id} width="100%">

              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{
                flexDirection: "row-reverse", alignItems: "center"
              }} >
                <Box width="100%" ml={"5px"} display={"flex"} alignItems="center">
                  <Typography>{faq.question}</Typography>
                </Box>
                <Box gap={"10px"} display="flex" justifyContent="center" alignItems="center">

                  <Box onClick={() => handleEdit(faq)} bgcolor={"#F3F6F9"} p={"4px"} display={"flex"} justifyContent="flex-left" alignItems="center" borderRadius={"3px"} sx={{ cursor: "pointer" }}>
                    <EditIcon color="warning" />
                  </Box>

                  <Box onClick={() => handleDelete(faq.id)} bgcolor={"#F3F6F9"} p={"4px"} display={"flex"} justifyContent="flex-left" alignItems="center" borderRadius={"3px"} sx={{ cursor: "pointer" }}>
                    <DeleteIcon color="error" />
                  </Box>

                </Box>
              </AccordionSummary>
              <AccordionDetails width="100%" >
                <Box bgcolor={"#efefef "} p={"5px"}>
                  <Typography>{faq.answer}</Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default FaqComponent;