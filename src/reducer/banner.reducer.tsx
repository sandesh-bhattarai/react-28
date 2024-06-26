import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../config/axios.config";

export const getBannerDetail: any = createAsyncThunk(
    "banner/getBannerDetail",
    async(id: any) => {
        try {
            const response: any = await axiosInstance.get("/banner/"+id, {
                headers: {
                    "Authorization": "Bearer "+localStorage.getItem("accessToken")
                }
            })
            return response.result;
        } catch(exception) {
            throw exception;
        }
    }
)

const BannerSlice = createSlice({
    name: "banner",
    initialState: {
        listAll: null,
        bannerDetail: null
    },
    reducers: {
        helloWorld: (state, action) => {
            state.listAll = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getBannerDetail.fulfilled, (state, action) => {
            state.bannerDetail = action.payload
        })  
        builder.addCase(getBannerDetail.rejected, (state) => {
            state.bannerDetail=null;
        }) 
    }
})

export const {helloWorld} = BannerSlice.actions;
export default BannerSlice.reducer;