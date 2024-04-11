import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchFilms = createAsyncThunk(
  "films/fetchFilms",
  async function (
    { filmName = "Avatar", type = "" },
    { rejectWithValue, dispatch, getState }
  ) {
    try {
      const page = getState().counter.value;
      const response = await fetch(
        `http://www.omdbapi.com/?i=tt3896198&apikey=1abc45aa&s=${filmName}&type=${type}&page=${page}`
      );

      if (!response.ok) {
        throw new Error("Server Error");
      }

      const data = await response.json();

      dispatch(setFilms(data.Search));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const filmsSlice = createSlice({
  name: "films",
  initialState: {
    films: [],
    status: null,
    error: null,
  },
  reducers: {
    setFilms(state, action) {
      state.films = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilms.pending, (state) => {
      state.status = "Loading";
      state.error = null;
    });
    builder.addCase(fetchFilms.fulfilled, (state, action) => {
      state.status = "Resolved";
    });
    builder.addCase(fetchFilms.rejected, (state, action) => {
      state.status = "Rejected";
      state.error = action.payload;
    });
  },
});

const { setFilms } = filmsSlice.actions;
export default filmsSlice.reducer;
