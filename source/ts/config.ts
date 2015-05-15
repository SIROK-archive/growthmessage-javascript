/// <reference path="vender/nanoajax.d.ts" />
/// <reference path="events.ts" />

module GrowthMessage {
    export class Config extends GrowthMessage.Events {
        private data = {};
        constructor(){
            super();
            this.on('load', 'check');
            this.load('/sample/json/image-2buttons.json');
        }
        load(url:string, params?:{}){
            GrowthMessage.nanoajax.ajax({
                url: url,
                method: 'GET'
            }, ()=>{
                this.trigger('load');
            });
        }
        check(){

        }
        get(){
            return this.data;
        }
    }
}
