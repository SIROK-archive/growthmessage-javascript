/// <reference path="events.ts" />

module GrowthMessage {
    export class App extends GrowthMessage.Events {
        id:string;
        config = new GrowthMessage.Config();
        dialog = new GrowthMessage.Dialog();
        overlay = new GrowthMessage.Overlay();
        userAgent = new GrowthMessage.UserAgent();

        constructor(options:{id:string}) {
            super();
            this.id = options.id;
            this.render();
            this.bindEvents();
        }
        render() {
            var el = document.createElement('div');
            el.className = 'growthmessage';
            document.body.appendChild(el);
        }
        bindEvents() {
            this.on('hook', 'open', this.dialog);
        }
    }
}
