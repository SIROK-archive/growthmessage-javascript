/// <reference path="vender/t.d.ts" />
/// <reference path="events.ts" />

module GrowthMessage {
    export class Dialog extends GrowthMessage.Events {
        private parentElement:any;
        constructor() {
            super();
        }
        open() {
            this.parentElement = document.body.getElementsByClassName('growthmessage')[0];
            this.render(GrowthMessage.module.require('dialog-text.html'), {
                title : 'hogehoge',
                body : 'fugafugafugafugafugafugafugafuga'
            });
        }
        render(template:string, data:{}) {
            var html = new GrowthMessage.t(template).render(data);
            this.parentElement.innerHTML = html;
        }
    }
}
