import {Site} from "./interface";


declare var $: any;


(function (window: Window) {

    interface AlertSites {
        getSites: () => Promise<Site[]>
    }


    class SitesSoftomate implements AlertSites {
        async getSites(): Promise<Site[]> {
            return window.app.api.getApiSitesSoftomate('https://www.softomate.net/ext/employees/list.json')
        }
    }

    class AlertService {
        constructor(public AlertSites: AlertSites) {
        }

        async sendSitesOnRender() {
            const payload = await this.AlertSites.getSites()
            chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
                sendResponse(payload)
            });
        }
    }

    chrome.runtime.onMessage.addListener(
        function(req, sender, cb) {
            const {some}=req
            if ( some&&some==='sendSitesOnRender'){
                alertService.sendSitesOnRender()
                cb({other: 'req addListener'});
            }
        }
    );


    const alertService = new AlertService(new SitesSoftomate())
    alertService.sendSitesOnRender()
})(window);
