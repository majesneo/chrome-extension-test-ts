(function (window) {


    chrome.runtime.onInstalled.addListener(() => {
        console.log('run')
        console.log(window, 'window')
        console.log(window.app, 'window')
    });
})(window)

