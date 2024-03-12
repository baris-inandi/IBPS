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
    "GitHub Default": "theme-dark-githubdefault",
    "GitHub Dimmed": "theme-dark-githubdimmed",
    "Nord": "theme-dark-nord",
  },
  light: {
    Silver: "theme-light-silver", // DO NOT CHANGE: DEFAULT LIGHT THEME!!
    Icy: "theme-light-icy",
    Lake: "theme-light-lake",
    Solarized: "theme-light-solarized",
    Ruby: "theme-light-ruby",
  },
};
