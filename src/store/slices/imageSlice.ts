import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface ImageState {
  imageBlobURL: string
  fileName: string;
}

// Define the initial state using that type
const initialState: ImageState = {
  imageBlobURL: "",
  fileName: "",
}

export const imageSlice = createSlice({
  name: 'image',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setImagePath: (state, action: PayloadAction<string>) => {
      state.imageBlobURL = action.payload
    },
    setFileName: (state, action: PayloadAction<string>) => {
      state.fileName = action.payload
    }
  },
})

export const { setImagePath, setFileName } = imageSlice.actions

export default imageSlice.reducer