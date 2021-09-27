export interface Site {
    name: string
    domain: string
    message: string
}
declare global {
    interface Window {
        type:Window,
        $: {
            type: () => void
            create: () => void
        },
        app: any,
        store: {
            setSitesSoftomate:(site:Site[])=>void
        },
    }
}

