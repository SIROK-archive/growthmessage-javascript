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
            this.scaleDialog();
            this.bindEvents();
        }
        hide() {
            this.parentElement.innerHTML = '';
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
                    if( button.intent.type==='url' ){
                        data._screenIsUrlType = true;
                    }
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
            this.el.width = Math.max(
                D.body.scrollWidth, D.documentElement.scrollWidth,
                D.body.offsetWidth, D.documentElement.offsetWidth,
                D.body.clientWidth, D.documentElement.clientWidth
            );
            this.el.style.width = this.el.width + 'px';
            this.el.height = Math.max(
                D.body.scrollHeight, D.documentElement.scrollHeight,
                D.body.offsetHeight, D.documentElement.offsetHeight,
                D.body.clientHeight, D.documentElement.clientHeight
            );
            this.el.style.height = this.el.height + 'px';
        }
        fitDialog() {
            var D = document;
            var el:any = document.body.getElementsByClassName('growthmessage-dialog__inner')[0];
            el.width = Math.max(
                D.body.clientWidth, D.documentElement.clientWidth
            );
            el.style.width = el.style.width + 'px';
            el.height = Math.min(
                D.body.clientHeight, D.documentElement.clientHeight
            );
            el.style.height = el.height + 'px';
            el.top = Math.max(window.pageYOffset, D.documentElement.scrollTop);
            el.style.top = el.top + 'px';
        }
        scaleDialog() {
            var el:any = document.body.getElementsByClassName('growthmessage-dialog__inner')[0];
            setTimeout(()=>{
                var D = document;
                var height = Math.min(
                    D.body.clientHeight, D.documentElement.clientHeight
                );
                if( el.offsetHeight <= height ) return;
                el.style.transform = 'scale(' + (height / el.offsetHeight * 0.85) + ')';
                el.style.transformOrigin = 'center top';
                el.style.top = el.top + height * 0.075 + 'px';
            }, 100);
        }
        bindEvents() {
            var els = this.el.getElementsByClassName('js__growthmessage-dialog__button-close');
            [].slice.call(els).forEach((el)=>{
                el.addEventListener('click', ()=>{
                    this.hide();
                });
            });
        }
    }
}
