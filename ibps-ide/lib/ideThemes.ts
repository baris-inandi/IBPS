export interface IIdeThemes {
  dark: {
    [key: string]: string;
  };
  light: {
    [key: string]: string;
  };
}

export const ideThemes: IIdeThemes = {
  dark: {
    "Titanium": "theme-dark-titanium", // DO NOT CHANGE: DEFAULT DARK THEME!!
    "One Dark": "theme-dark-onedark",
    "Rose Pine": "theme-dark-rosepine",
    "Cobalt": "theme-dark-cobalt",
    "Earth": "theme-dark-earth",
    "Monokai": "theme-dark-monokai",
  },
  light: {
    Silver: "theme-light-silver", // DO NOT CHANGE: DEFAULT LIGHT THEME!!
    Lake: "theme-light-lake",
    Solarized: "theme-light-solarized",
    Ruby: "theme-light-ruby",
  },
};
