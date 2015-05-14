module GrowthMessage {
    export class Events {
        events = {};

        on(event:string, callback:Function){
            this.events[event] = callback;
        }
        trigger(event:string, arg:any){
            this.events[event](arg);
        }
    }
}
