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
    "--color-surface-pale-f2": "#C9D7F8",
  };

  export const oliveTheme = {
    "--color-solid": "#D4C5E2",
    "--color-surface": "#4C6663",
    "--color-surface-faint": "#80CFA9",
    "--color-primary": "#C9D7F8",
    "--color-surface-pale": "#C9D7F8",
    "--color-surface-pale-f2": "#C9D7F8",
  }
  
  export const modernaTheme = {
    "--color-solid": "#240B36",
    "--color-surface": "#A4031F",
    "--color-surface-faint": "#DB9065",
    "--color-primary": "#F2A359",
    "--color-surface-pale": "#F2DC5D",
    "--color-surface-pale-f2": "#F2DC5D",
  }
  
  export const applyTheme = nextTheme => {
      const theme = nextTheme;
      // console.log(theme);
      Object.keys(theme).map(key => {
        const value = theme[key];
        document.documentElement.style.setProperty(key, value);
      });
  };