var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://az725175.vo.msecnd.net/scripts/jsll-4.js';
script.id = 'awaBase';
document.head.appendChild(script);

/*Initialization of AWA must be set to onload*/
jQuery('#awaBase').on('load', function() {
    var awaConfig = {
        useBeacon: true,
        syncMuid: false,
        useDefaultContentName: true,
        muidDomain: "microsoft.com",
        autoCapture: {
            onUnload: true,
            pageView: true,
            onLoad: true,
            click: true,
            scroll: true,
            resize: true,
            context: true,
            jsError: true,
            addin: true,
            perf: true
        },
        coreData: {
            appId: "techCS"
        }
    };
    awa.init(awaConfig);
});
