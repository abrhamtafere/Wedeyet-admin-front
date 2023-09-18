import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { AddBox, Edit, Delete } from "@mui/icons-material";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  addEmailTemplate,
  editEmailTemplate,
  deleteEmailTemplate,
} from "../../redux/EmailTemplate";
import Lable from "../global/Lable";
import ButtonComponent from "../global/ButtonComponent";
const EmailTemplateComponent = () => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState(EditorState.createEmpty());
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const templates = useSelector((state) => state.emailState.templates);
  const handleAdd = () => {
    dispatch(
      addEmailTemplate({
        subject,
        body: body.getCurrentContent().getPlainText(),
      })
    );
    setSubject("");
    setBody(EditorState.createEmpty());
  };

  const handleEdit = () => {
    dispatch(
      editEmailTemplate({
        id: currentId,
        subject,
        body: body.getCurrentContent().getPlainText(),
      })
    );
    setSubject("");
    setBody(EditorState.createEmpty());
    setEditMode(false);
    setCurrentId(null);
  };

  const handleView = (template) => {
    setSubject(template.subject);
    setBody(EditorState.createWithContent(template.body));
    setEditMode(true);
    setCurrentId(template.id);
  };

  const handleDelete = (id) => {
    dispatch(deleteEmailTemplate(id));
  };

  return (
    <>
      <Box
        mt={"10px"}
        display="flex"
        flexDirection="column"
        pt={"10px"}
        pb={"10px"}
        pl={"50px"}
        pr={"50px"}
        mb={"30px"}
        justifyContent="center"
        alignItems="center"
        width={"100%"}
      >
        <Box
          mt={"10px"}
          bgcolor={"white"}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          pt={"10px"}
          pb={"10px"}
          pl={"50px"}
          pr={"50px"}
          mb={"30px"}
          width={"100%"}
        >
          <Box width={"100%"}>
            <Lable text={"Add Subject"} />
            <TextField
              className="w-full md:w-1/2"
              label="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <Lable text={"Add Body"} />
            <Box
              padding={"5px"}
              width={"100%"}
              // bgcolor={"light"}
              className="min-h-[40vh] bg-gray-100"
            >
              <Editor
                editorState={body}
                onEditorStateChange={setBody}
                className="min-h-50vh bg-blue-300"
                placeholder="write your message here ..."
              />
            </Box>
          </Box>
          <ButtonComponent
            onClick={editMode ? handleEdit : handleAdd}
            buttonText={editMode ? "Edit" : "Add"}
          />
          {/* <Button onClick={editMode ? handleEdit : handleAdd}>{editMode ? 'Edit' : 'Add'}</Button> */}
        </Box>
        <Grid container spacing={2}>
          {/* Replace templates with your actual data */}
          {templates.map((template) => (
            <Grid item xs={6} key={template.id}>
              <Card>
                <CardContent>
                  <div>Subject: {template.subject}</div>
                  <div>Body: {template.body}</div>
                </CardContent>

                <CardContent>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Box display={"flex"} alignItems={"center"}>
                      <IconButton onClick={() => handleDelete(template.id)}>
                        <Delete />
                      </IconButton>
                      <IconButton onClick={() => handleView(template)}>
                        <Edit />
                      </IconButton>
                    </Box>
                    <ButtonComponent buttonText={"use"} onClick={{}} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default EmailTemplateComponent;
