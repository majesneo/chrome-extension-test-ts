import {Site} from "./interface";

declare var $: any;
(function (window: Window) {
    let sites: Site[],
        messageView: string,
        currentPage: string,
        alertIsVisible: Boolean

    function setTimer() {
        const hours = 1;
        const now = new Date().getTime();
        const setupTime = localStorage.getItem('setupTime');
        if (setupTime == null) {
            localStorage.setItem('setupTime', String(now))
        } else {
            if (now - +setupTime > hours * 60 * 60 * 1000) {
                localStorage.clear()
                localStorage.setItem('setupTime', String(now));
                chrome.runtime.sendMessage({some: 'sendSitesOnRender'}, function (r) {
                    console.log(r);
                })
            }
        }
    }

    function checkHideAlert() {
        return localStorage.hasOwnProperty('hideAlert')
    }

    function checkThreeSession() {
        let sessionNumber = Number(sessionStorage.getItem('session'))
        if (sessionNumber >= 3) {
            alertIsVisible = false
            return true
        } else {
            setSession(++sessionNumber)
        }
    }

    function setSession(value) {
        sessionStorage.setItem("session", value);
    }

    function init() {
        chrome.runtime.sendMessage('ping', payload => {
            if (chrome.runtime.lastError) {
                setTimeout(init, 1000);
            } else {
                setTimer()
                if (checkHideAlert() || checkThreeSession()) {
                    alertIsVisible = false
                } else {
                    sites = payload
                    alertIsVisible = true
                    getUrlPage()
                }

            }
        });
    }

    init();


    function getUrlPage() {
        currentPage = window.location.href
        if (currentPage) {
            checkDomain()
        }
    }

    function checkDomain() {
        if (sites && sites.length > 0) {
            sites.forEach(site => {
                if (currentPage.indexOf(site.domain) !== -1) {
                    const {message} = site
                    messageView = message
                    renderAlert()
                    renderMessage()
                }
            })
        }
    }

    function renderAlert() {
        $('body').insertAdjacentHTML('beforebegin', `<div class="alert">
      <div class="close">x</div>
      <div id="message">
      </div>
    </div>`)
        setEventListenrs()
    }

    function hideAlert() {
        if (!alertIsVisible) {
            $(".alert").setAttribute('style', 'display:none');
        } else {
            $(".alert").setAttribute('style', 'display:block');
        }

    }

    function renderMessage() {
        $("#message").textContent = messageView
    }

    function setEventListenrs() {
        $('.close').addEventListener('click', () => {
            localStorage.setItem('hideAlert', 'true')
            alertIsVisible = false
            hideAlert()
        })
    }


})(window)
