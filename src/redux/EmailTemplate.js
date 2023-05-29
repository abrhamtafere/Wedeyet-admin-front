import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  templates: [],
};

const emailTemplateSlice = createSlice({
  name: 'emailTemplates',
  initialState,
  reducers: {
    addEmailTemplate: (state, action) => {
      const newTemplate = {
        id: Date.now(),
        subject: action.payload.subject,
        body: action.payload.body,
      };
      state.templates.push(newTemplate);
    },
    editEmailTemplate: (state, action) => {
      const index = state.templates.findIndex((template) => template.id === action.payload.id);
      if (index !== -1) {
        state.templates[index].subject = action.payload.subject;
        state.templates[index].body = action.payload.body;
      }
    },
    deleteEmailTemplate: (state, action) => {
      state.templates = state.templates.filter((template) => template.id !== action.payload);
    },
  },
});

export const { addEmailTemplate, editEmailTemplate, deleteEmailTemplate } = emailTemplateSlice.actions;
export default emailTemplateSlice.reducer;