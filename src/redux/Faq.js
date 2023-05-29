import { createSlice } from '@reduxjs/toolkit';

const faqSlice = createSlice({
  name: 'faqs',
  initialState: [],
  reducers: {
    addFAQ: (state, action) => {
      const newFaq = {
        id: Date.now(),
        question: action.payload.question,
        answer: action.payload.answer,
      };
      state.push(newFaq);
    },
    editFAQ: (state, action) => {
      const index = state.findIndex(faq => faq.id === action.payload.id);
      if (index !== -1) {
        state[index].question = action.payload.question;
        state[index].answer = action.payload.answer;
      }
    },
    deleteFAQ: (state, action) => {
      const index = state.findIndex(faq => faq.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addFAQ, editFAQ, deleteFAQ } = faqSlice.actions
export default faqSlice.reducer;