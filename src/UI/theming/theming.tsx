export const lightTheme = {
    "--color-solid": "black",
    "--color-surface": "white",
    "--color-primary": "teal"
  };
  
  export const darkTheme = {
    "--color-solid": "#e3e5e0",
    "--color-surface": "#342434",
    "--color-surface-faint": "rgba(34,24,34,0.7)",
    "--color-primary": "purple",
    "--color-surface-pale": "#443444",
    "--color-surface-pale-f2": "#544454",
  };
  
  export const applyTheme = nextTheme => {
      const theme = nextTheme;
      // console.log(theme);
      Object.keys(theme).map(key => {
        const value = theme[key];
        document.documentElement.style.setProperty(key, value);
      });
  };