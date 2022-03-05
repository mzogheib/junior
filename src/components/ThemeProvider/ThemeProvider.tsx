import React, { FC } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

// Pass the base MUI theme into Emotion so that it is accessible by Emotion's styled function.
// The declaration file ensures the full type of MUI's Theme is available to styled components.

const ThemeProvider: FC = ({ children }) => (
  <EmotionThemeProvider theme={createTheme()}>{children}</EmotionThemeProvider>
);

export default ThemeProvider;
