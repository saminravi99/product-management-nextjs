import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark';

interface ThemeState {
    theme: Theme;
}

// Always start with light mode by default
const initialState: ThemeState = {
    theme: 'light',
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<Theme>) => {
            console.log('🔄 Redux: setTheme action:', action.payload);
            state.theme = action.payload;
        },
        toggleTheme: (state) => {
            const newTheme = state.theme === 'light' ? 'dark' : 'light';
            console.log('🔄 Redux: toggleTheme action:', state.theme, '→', newTheme);
            state.theme = newTheme;
        },
    },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
