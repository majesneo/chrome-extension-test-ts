import {Site} from "./interface";

(function (window) {
    class Store {
        private SitesSoftomate: Site[]
        private static instance: Store

        constructor() {

            if (Store.instance) {
                return Store.instance
            }
            Store.instance = this
        }

        setSitesSoftomate(site: Site[]) {
            console.log(site, 'setSitesSoftomate')
            this.SitesSoftomate = site
        }

        getSitesSoftomate() {
            return this.SitesSoftomate
        }

    }



    window.app.store = new Store()
})(window)

