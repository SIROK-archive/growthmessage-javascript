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
            this.on('xxxxx', function(){});
        }
    }
}
