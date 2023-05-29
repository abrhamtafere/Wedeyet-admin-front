import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box,TextField, Button, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {addFAQ, editFAQ, deleteFAQ} from '../../redux/Faq';
import ButtonComponent from '../global/ButtonComponent';
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
    <Box  m={"30px"} p={"10px"} bgcolor={"white"} width="50%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <TextField
        label="Question"
        variant="outlined"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Answer"
        variant="outlined"
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        fullWidth
        margin="normal"
        multiline
      />
      <ButtonComponent buttonText= {editId ? 'Save' : 'Add FAQ'} onClick={handleAddFAQ}/>
      </Box>
      <Box  m={"30px"} p={"10px"} bgcolor={"white"} width="70%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      {faqs&&faqs.map(faq => (
        <Box mt={"5px"} p={"10px"}width="100%" display="flex" flexDirection="column">
        <Accordion key={faq.id } width="100%">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}width="100%">
            <Typography>{faq.question}</Typography><Button onClick={() => handleEdit(faq)}>Edit</Button>

            <Button onClick={() => handleDelete(faq.id)}>Delete</Button>
          </AccordionSummary>
          <AccordionDetails width="100%">
            <Typography>{faq.answer}</Typography>

          </AccordionDetails>
        </Accordion>
        </Box>
      ))}
      </Box>
    </>
  );
};

export default FaqComponent;