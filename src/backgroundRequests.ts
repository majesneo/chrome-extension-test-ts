



/*

chrome.runtime.onMessage.addListener((request, sender, response) => {
    const {payload} = request
    if (payload && payload === 'getSitesSoftomate') {
        response({payload: result})
    }
})
*/


chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    var tab = tabs[0];
    console.log(tab.url, 'tab.url');
});
