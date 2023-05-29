import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    service: [{
        "id": 1,
        "businessName": "Business Name 1",
        "businessImages": [
            "https://th.bing.com/th/id/OIP.vrHPw23IMemjVWaAI6C1xAHaDl?w=332&h=169&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            "blob:http://localhost:3000/3bfb50fc-eaad-471f-ae10-91ea2861e13a",
            "blob:http://localhost:3000/9de45ef9-bde1-4ed6-8eb3-8c91737b385d",
            "blob:http://localhost:3000/9068ca9d-091d-4471-9dd4-af9786c8ea02"
        ],
        "selectedMainCategory": "Main Category 2",
        "subcategory": " sub Category 3",
        "servicePlace": "Sebara Babur",
        "servicePhone": "+251953054815",
        "serviceLocation": "Busniness Location",
        "serviceTelegram": "@AbmanWolde",
        "aboutService": "About Comapny",
        "services": [
            "Free Delivery"
        ],
        "Branchs": [
            {   
                "id": 1,
                "serviceId":1,
                "branchName": "Branch Name 1",
                "file": [
                    "https://th.bing.com/th/id/R.c78329be283ba5ef270d7316e05fd3b3?rik=TskTCSITBDJ4eQ&pid=ImgRaw&r=0",
                    "blob:http://localhost:3000/3fae755b-c65a-434c-b8fb-c359a1f370da"
                ],
                "phone": "+251947081180",
                "selectplace": "Saris abo",
                "branchTelegramUserName": "@BranchTelegram",
                "branchLocation": "Branch Location"
            }
        ],
    }]
};



export const serviceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {
        setServiceData: (state, action) => {
            state.service.unshift(action.payload)
        },
        addBranch(state, action) {
            const placeIndex = state.service.findIndex(
                place => place.id === action.payload
            );
            state.service[placeIndex].Branchs.push(action.payload.branch);
        },
        editPlace(state, action) {
            const placeIndex = state.service.findIndex(
                place => place.id === action.payload.id
            );
            state.service[placeIndex] = action.payload;
        },
        editBranch(state, action) {
            const placeIndex = state.service.findIndex(
                place => place.id === action.payload.placeId
            );
            const branchIndex = state.service[placeIndex].Branchs.findIndex(
                branch => branch.id === action.payload.branch.id
            );
            state.service[placeIndex].Branchs[branchIndex] = action.payload.branch;
        },
        deletePlace(state, action) {
            state.service = state.service.filter(place => place.id !== action.payload);
        },
        deleteBranch(state, action) {
            const placeIndex = state.service.findIndex(
                place => place.id === action.payload.placeId
            );
            state.service[placeIndex].Branchs = state.service[
                placeIndex
            ].Branchs.filter(branch => branch.id !== action.payload.branchId);
        },
    },
}

);

export const { setServiceData,addBranch, editPlace, editBranch, deletePlace, deleteBranch  } =
    serviceSlice.actions;
export default serviceSlice.reducer;