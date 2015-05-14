/// <reference path="vender/t.d.ts" />
/// <reference path="events.ts" />

module GrowthMessage {
    export class Dialog extends GrowthMessage.Events {
        private styles = {
            '.growthmessage-dialog-text__title' : {
                'font-size' : '24px'
            },
            '.growthmessage-dialog-text__body' : {
                'font-size' : '16px'
            },
            '.growthmessage-dialog-text__button' : {
                'width' : '300px',
                'font-size' : '16px',
                'color' : '#fff',
                'background-color' : '#000'
            }
        };
        constructor() {
            super();
        }
        open() {
            this.render('dialog-text', {});
            this.setStyles(this.styles);
        }
        render(moduleName:string, data:{}) {
            var src = GrowthMessage.module.require(moduleName);
            var html = new GrowthMessage.t(src).render(data);
            var parent:any = document.body.getElementsByClassName('growthmessage')[0];
            parent.innerHTML = html;
        }
        setStyles(styles:{}) {
            Object.keys(styles).forEach((selector)=>{
                var style = styles[selector];
                var el:any = document.body.querySelectorAll(selector)[0];
                if(!el) return;
                Object.keys(style).forEach((key)=>{
                    el.style[key] = style[key];
                });
            });
        }
    }
}
