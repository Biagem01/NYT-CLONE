import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Article } from "@/lib/types";
import { loadFavoritesFromFirestore } from "@/lib/firebaseFavorites";

// Tipi e stato iniziale
interface FavoritesState {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  articles: [],
  loading: false,
  error: null,
};

// Thunk per caricare i preferiti da Firestore
export const loadFavorites = createAsyncThunk<Article[], string>(
  "favorites/loadFavorites",
  async (userId, thunkAPI) => {
    try {
      const favorites = await loadFavoritesFromFirestore(userId);
      return favorites;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Slice
const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<Article>) {
      const exists = state.articles.some((a) => a.uri === action.payload.uri);
      if (!exists) {
        state.articles.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.articles = state.articles.filter((a) => a.uri !== action.payload);
    },
    clearFavorites(state) {
      state.articles = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(loadFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export delle actions e del reducer
export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
