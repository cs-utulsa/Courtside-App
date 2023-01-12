module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'babel-plugin-module-resolver',
                {
                    root: ['./src'],
                    extensions: [
                        '.ios.js',
                        '.android.js',
                        '.js',
                        '.ts',
                        '.tsx',
                        '.json',
                    ],
                    alias: {
                        '@assets': './src/assets',
                        '@components': './src/components',
                        '@constants': './src/constants',
                        '@contexts': './src/contexts',
                        '@hooks': './src/hooks',
                        '@navigation': './src/navigation',
                        '@pages': './src/pages',
                        '@types': './src/types',
                        '@styles': './src/styles',
                    },
                },
            ],
        ],
    };
};
