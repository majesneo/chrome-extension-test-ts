import {Site} from "./interface";


declare var $: any;


(function (window:Window) {

    interface PopupSites {
        getSites: () => Promise<Site[]>
    }


    class SitesSoftomate implements PopupSites {
        async getSites(): Promise<Site[]> {
            return window.app.api.getApiSitesSoftomate('https://www.softomate.net/ext/employees/list.json')
        }
    }

    class PopupService {
        constructor(public PopupSites: PopupSites) {
        }

        async render() {
            const item = $('.list__item')
            const payload = await this.PopupSites.getSites()
            if (payload) {
                for (let index = 0; index < payload.length; index++) {
                    const link = $.create('a');
                    link.textContent = payload[index].name;
                    link.href = 'https://' + payload[index].domain
                    link.setAttribute('target', '_blank');
                    item.append(link);
                }
            }
        }
    }

    const popupService = new PopupService(new SitesSoftomate())
    popupService.render()
})(window);
