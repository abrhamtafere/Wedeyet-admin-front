import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    service: []
};



export const serviceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {
        setServiceData: (state, action) => {
                 state.service.unshift(action.payload)
        }
        // state.sub=action.payload.sub;
        //     },
        //     addNewMainCategory(state, action) {
        //       state.mainCategory.unshift(action.payload)
        //     },
        //     addNewSubCategory(state, action) {
        //       const { id, mainID, name, image, subcategoriename } = action.payload
        //       const index = state.mainCategory.findIndex((d) => d.id == mainID)
        //       console.log(state.mainCategory[index])
        //       if (index !== -1) {
        //         state.mainCategory[index].subcategories.unshift({ id: id, name: name, image: image, })
        //         state.sub.unshift({ id: id, name: name, image: image, subcategoriename })
        //       }

        //     },
        //     setFilterSub: (state, action) => {

        //       state.sub= state.sub.filter((d) => d.mainID === action.payload)
        //   // state.sub=action.payload.sub;
        //     },
        //     editMainCategory(state, action) {
        //       const index = state.mainCategory.findIndex((d) => d.id === action.payload.id)
        //       if (index !== -1) {
        //         state.mainCategory[index] = action.payload
        //       }
        //     },
        //     editSubCategory(state, action) {
        //       const index = state.sub.findIndex((d) => d.id === action.payload.id)
        //       if (index !== -1) {
        //         state.sub[index] = action.payload
        //       }
        //     },
        //     deleteSubCategory: (state, action) => {
        //       state.sub = state.sub.filter((d) => d.id !== action.payload)
        //       //  state.mainCategory.filter(item => action.payload.id==!item.id);
        //     },

        //     deleteRows: (state, action) => {
        //       state.mainCategory = state.mainCategory.filter((d) => d.id !== action.payload)
        //       //  state.mainCategory.filter(item => action.payload.id==!item.id);
        //     }


    },
}
);

export const { setServiceData } =
serviceSlice.actions;
export default serviceSlice.reducer;