/// <reference path="vender/t.d.ts" />
/// <reference path="events.ts" />

module GrowthMessage {
    export class Dialog extends GrowthMessage.Events {
        private parentElement:any;
        private templates = {
            'plain' : 'dialog-text.html',
            'image' : 'dialog-image.html'
        };
        constructor() {
            super();
        }
        open(data:{type:string}) {
            this.parentElement = document.body.getElementsByClassName('growthmessage')[0];
            this.render(data);
        }
        render(data:{type:string}) {
            var template = GrowthMessage.module.require(this.templates[data.type]);
            var html = new GrowthMessage.t(template).render(this.filter(data));
            this.parentElement.innerHTML = html;
        }
        filter(data:any):{} {
            var newButtons = [];
            data.buttons.forEach((button, index)=>{
                if( button.type==='screen' ){
                    data._screen = button;
                } else if( button.type==='close' ) {
                    data._close = button;
                } else {
                    newButtons.push(button);
                }
            });
            data.buttons = newButtons;
            return data;
        }
    }
}
