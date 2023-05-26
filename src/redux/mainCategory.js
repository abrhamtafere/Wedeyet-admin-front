import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sub: [
    {
      "id": 1,
      "mainID":1,
      "name": " sub Category 1",
      "image": "material-symbols:restaurant",
      "maincategory": "restaurant"
    },
    {
      "id": 2,
      "mainID":1,
      "name": " sub Category 2",
      "image": "material-symbols:restaurant",
      "maincategory": "Shop"
    },
    {
      "id": 3,
      "mainID":2,
      "name": " sub Category 3",
      "image": "material-symbols:restaurant",
      "maincategory": "Home"
    },
     {
      "id": 3,
      "mainID":2,
      "name": " sub Category 4",
      "image": "material-symbols:restaurant",
      "maincategory": "Home"
    },
    {
      "id": 3,
      "mainID":3,
      "name": " sub Category 5",
      "image": "material-symbols:restaurant",
      "maincategory": "Home"
    },
    {
      "id": 3,
      "mainID":3,
      "name": " sub Category 6",
      "image": "material-symbols:restaurant",
      "maincategory": "Home"
    },
    {
      "id": 3,
      "mainID":4,
      "name": " sub Category 7",
      "image": "material-symbols:restaurant",
      "maincategory": "Home"
    },
    {
      "id": 3,
      "mainID":4,
      "name": " sub Category 8",
      "image": "material-symbols:restaurant",
      "maincategory": "Home"
    }


  ],
  mainCategory: [
    // {
    //   "id": 1,
    //   "name": " Main Category 1",
    //   "image": "material-symbols:restaurant",
    //   "subcategories": [
    //     {
    //         "id": 1,
    //         "name": "Subcategory 1",
    //         "image": "https://via.placeholder.com/150"
    //       },
    //     {
    //       "id": 2,
    //       "name": "Subcategory 2",
    //       "image": "https://via.placeholder.com/150"
    //     }
    //   ]
    // },
    // {
    //   "id": 2,
    //   "name": "Main Category 2",
    //   "image": "material-symbols:home-repair-service",
    //   "subcategories": [
    //     {
    //       "id": 3,
    //       "name": "Subcategory 3",
    //       "image": "https://via.placeholder.com/150"
    //     },
    //     {
    //       "id": 4,
    //       "name": "Subcategory 4",
    //       "image": "https://via.placeholder.com/150"
    //     }
    //   ]
    // },
    // {
    //     "id": 3,
    //     "name": "Main Category 3",
    //     "image": "material-symbols:add-box-outline-rounded",
    //     "subcategories": [
    //       {
    //         "id": 5,
    //         "name": "Subcategory 3",
    //         "image": "https://via.placeholder.com/150"
    //       },
    //       {
    //         "id": 6,
    //         "name": "Subcategory 4",
    //         "image": "https://via.placeholder.com/150"
    //       }
    //     ]
    //   },
    //   {
    //     "id": 4,
    //     "name": "Main Category 4",
    //     "image": "material-symbols:home-repair-service",
    //     "subcategories": [
    //       {
    //         "id": 3,
    //         "name": "Subcategory 5",
    //         "image": "https://via.placeholder.com/150"
    //       },
    //       {
    //         "id": 4,
    //         "name": "Subcategory 5",
    //         "image": "https://via.placeholder.com/150"
    //       }
    //     ]
    //   }
  ]
};



export const mainCategorySlice = createSlice({
  name: "mainCategory",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.mainCategory = action.payload.MainCategories;
      // state.sub=action.payload.sub;
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
      state.mainCategory = state.mainCategory.filter((d) => d.id !== action.payload)
      //  state.mainCategory.filter(item => action.payload.id==!item.id);
    }


  },

},
);

export const { setData, deleteRows, addNewMainCategory, editMainCategory, addNewSubCategory, editSubCategory, deleteSubCategory,setFilterSub } =
  mainCategorySlice.actions;
export default mainCategorySlice.reducer;