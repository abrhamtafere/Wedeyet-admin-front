import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  TotalServices:null,
  ServiceSubService:[],

  sub: [
   /*  {
      "id": 1,
      "mainID":1,
      "mainName": " Main Category 1",
      "name": " sub Category 1",
      "image": "material-symbols:restaurant",
      "maincategory": "restaurant"
    },
    {
      "id": 2,
      "mainID":1,
      "mainName": " Main Category 1",
      "name": " sub Category 2",
      "image": "material-symbols:restaurant",
      "maincategory": "Shop"
    },
    {
      "id": 3,
      "mainID":2,
      "mainName": " Main Category 2",
      "name": " sub Category 3",
      "image": "material-symbols:restaurant",
      "maincategory": "Home"
    },
     {
      "id": 3,
      "mainID":2,
      "mainName": " Main Category 2",
      "name": " sub Category 4",
      "image": "material-symbols:restaurant",
      "maincategory": "Home"
    },
    {
      "id": 3,
      "mainID":3,
      "mainName": " Main Category 3",
      "name": " sub Category 5",
      "image": "material-symbols:restaurant",
      "maincategory": "Home"
    },
    {
      "id": 3,
      "mainID":3,
      "mainName": " Main Category 3",
      "name": " sub Category 6",
      "image": "material-symbols:restaurant",
      "maincategory": "Home"
    },
    {
      "id": 3,
      "mainID":4,
      "mainName": " Main Category 4",
      "name": " sub Category 7",
      "image": "material-symbols:restaurant",
      "maincategory": "Home"
    },
    {
      "id": 3,
      "mainID":4,
      "mainName": " Main Category 4",
      "name": " sub Category 8",
      "image": "material-symbols:restaurant",
      "maincategory": "Home"
    }
 */

  ],
  mainCategory: []
};



export const mainCategorySlice = createSlice({
  name: "mainCategory",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.ServiceSubService = action.payload.ServiceSubService;
      state.TotalServices = action.payload.TotalServices;
      // state.sub=action.payload.sub;
    },
    setMainCategory: (state, action) => {
      state.mainCategory = action.payload;
    },
    addNewMainCategory(state, action) {
      state.mainCategory.unshift(action.payload)
    },
    addNewSubCategory(state, action) {
      const { id, mainID, name, image, subcategoriename } = action.payload
      const index = state.mainCategory.findIndex((d) => d.id == mainID)
      console.log(state.mainCategory[index])
      if (index !== -1) {
        state.mainCategory[index].subcategories.unshift({ id: id, name: name, image: image, })
        state.sub.unshift({ id: id, name: name, image: image, subcategoriename })
      }

    },
    setFilterSub: (state, action) => {
            
      state.sub= state.sub.filter((d) => d.mainID === action.payload)
  // state.sub=action.payload.sub;
    },
    editMainCategory(state, action) {
      const index = state.mainCategory.findIndex((d) => d.id === action.payload.id)
      if (index !== -1) {
        state.mainCategory[index] = action.payload
      }
    },
    editSubCategory(state, action) {
      const index = state.sub.findIndex((d) => d.id === action.payload.id)
      if (index !== -1) {
        state.sub[index] = action.payload
      }
    },
    deleteSubCategory: (state, action) => {
      state.sub = state.sub.filter((d) => d.id !== action.payload)
      //  state.mainCategory.filter(item => action.payload.id==!item.id);
    },

    deleteRows: (state, action) => {
      state.mainCategory.Services = state.mainCategory.Services.filter((d) => d._id !== action.payload)
      //  state.mainCategory.filter(item => action.payload.id==!item.id);
    }


  },

},
);

export const { setData, setMainCategory,deleteRows, addNewMainCategory, editMainCategory, addNewSubCategory, editSubCategory, deleteSubCategory,setFilterSub } =
  mainCategorySlice.actions;
export default mainCategorySlice.reducer;