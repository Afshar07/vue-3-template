module.exports = {
    devServer:{
        open:process.platform ==='darwin',
        host:'0.0.0.0',
        port:5173,
        https:true,
        hotOnly:false

    },
    pwa: {
        name: 'MaliehIran',
        themeColor: '#06b6d4',
        msTileColor: '#7367f0',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',

        // configure the workbox plugin
        workboxPluginMode: 'InjectManifest',
        manifestPath:'/manifest.json',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            // swSrc: 'dev/sw.js',
            // ...other Workbox options...
        },
        // manifestOptions:{
        //     name:'1Minex',
        //     short_name:'1Minex',
        //     start_url:'/',
        //     display:'standalone',
        //     theme_color:'#4DBA87'
        // }
    }


};
