(function (window) {
    class Api {
        constructor() {
        }

        async getApiSitesSoftomate(url: string) {
            try {
                const responseJson = await fetch(url)
                const sites = await responseJson.json()
                console.log(sites, ' getApiSitesSoftomate')
                window.app.store.setSitesSoftomate(sites)
                return sites
            } catch (error) {
                console.log('error:', error);
            }
        }
    }

    window.app.api = new Api()
}(window))
