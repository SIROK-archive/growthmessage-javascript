/// <reference path="vender/t.d.ts" />
/// <reference path="events.ts" />

module GrowthMessage {
    export class Dialog extends GrowthMessage.Events {
        private el:any;
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
            this.setElement();
            this.fitOverlay();
            this.fitDialog();
            this.scrollToTop();
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
        setElement() {
            this.el = document.body.getElementsByClassName('growthmessage-dialog')[0];
        }
        fitOverlay() {
            var D = document;
            this.el.style.width = Math.max(
                D.body.scrollWidth, D.documentElement.scrollWidth,
                D.body.offsetWidth, D.documentElement.offsetWidth,
                D.body.clientWidth, D.documentElement.clientWidth
            ) + 'px';
            this.el.style.height = Math.max(
                D.body.scrollHeight, D.documentElement.scrollHeight,
                D.body.offsetHeight, D.documentElement.offsetHeight,
                D.body.clientHeight, D.documentElement.clientHeight
            ) + 'px';
        }
        fitDialog() {
            var D = document;
            var el:any = document.body.getElementsByClassName('growthmessage-dialog__inner')[0];
            el.style.width = Math.max(
                D.body.clientWidth, D.documentElement.clientWidth
            ) + 'px';
            el.style.height = Math.min(
                D.body.clientHeight, D.documentElement.clientHeight
            ) + 'px';
        }
        scrollToTop() {
            window.scrollTo(0, 1);
        }
    }
}
