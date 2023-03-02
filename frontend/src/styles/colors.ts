const BASKETBALL = '#EE6730';
export const ORANGE = BASKETBALL;

export const NAVY = '#374151';

export const PRIMARY = ORANGE;

export const LIGHT_BACKGROUND = '#f8fafc';
export const DARK_BACKGROUND = '#1e293b';

export const LIGHT_CARD = '#fff';
export const DARK_CARD = '#334155';

export const LIGHT_TEXT = '#f8fafc';
export const DARK_TEXT = '#1e293b';

export const LIGHT_BORDER = '#d8d8d8';
export const DARK_BORDER = '#272729';

export const LIGHT_NOTIFICATION = '';
export const DARK_NOTIFICATION = '';

export const LIGHT_THEME = {
    dark: false,
    colors: {
        primary: PRIMARY,
        background: LIGHT_BACKGROUND,
        card: LIGHT_CARD,
        text: DARK_TEXT,
        border: LIGHT_BORDER,
        notification: LIGHT_NOTIFICATION,
    },
};

export const DARK_THEME = {
    dark: true, // whether or not this theme is a dark mode
    colors: {
        primary: PRIMARY, // the primary color of the app
        background: DARK_BACKGROUND, // the color for the background
        card: DARK_CARD, // the color for cards and headers
        text: LIGHT_TEXT, // the standard text color
        border: DARK_BORDER, // the color of borders
        notification: DARK_NOTIFICATION, // the colors of popups
    },
};

export const ERROR_BACKGROUND = '#ffcfcd';
export const ERROR_TEXT = 'red';
