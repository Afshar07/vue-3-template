module.exports = {
    pwa: {
        name: 'Malieh Iran',
        themeColor: '#06b6d4',
        msTileColor: '#7367f0',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',

        // configure the workbox plugin
        workboxPluginMode: 'GenerateSW',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            // swSrc: 'dev/sw.js',
            // ...other Workbox options...
        }
    }
};