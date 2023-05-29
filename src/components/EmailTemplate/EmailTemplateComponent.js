import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Card, CardContent, TextField, Button, IconButton } from '@mui/material';
import { AddBox, Edit, Delete } from '@mui/icons-material';
 import { Editor } from 'react-draft-wysiwyg';
 import { EditorState } from 'draft-js';
import { addEmailTemplate, editEmailTemplate, deleteEmailTemplate } from '../../redux/EmailTemplate';
const EmailTemplateComponent = () => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState(EditorState.createEmpty());
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
    const templates = useSelector((state) => state.emailState.templates);
  const handleAdd = () => {
    dispatch(addEmailTemplate({ subject, body: body.getCurrentContent().getPlainText() }));
    setSubject('');
    setBody(EditorState.createEmpty());
  };

  const handleEdit = () => {
    dispatch(editEmailTemplate({ id: currentId, subject, body: body.getCurrentContent().getPlainText() }));
    setSubject('');
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
      <TextField label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
      <Editor editorState={body} onEditorStateChange={setBody} />
      <Button onClick={editMode ? handleEdit : handleAdd}>{editMode ? 'Edit' : 'Add'}</Button>
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
                <IconButton onClick={() => handleView(template)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(template.id)}>
                  <Delete />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default EmailTemplateComponent;