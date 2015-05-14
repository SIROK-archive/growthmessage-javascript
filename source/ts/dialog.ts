/// <reference path="events.ts" />

module GrowthMessage {
    export class Dialog extends GrowthMessage.Events {
        constructor(){
            super();
        }
        open(){
            console.log('opened!');
        }
    }
}
