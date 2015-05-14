var GrowthMessage;(function(window){function c(a){this.t=a}function l(a,b){for(var e=b.split(".");e.length;){if(!(e[0]in a))return!1;a=a[e.shift()]}return a}function d(a,b){return a.replace(h,function(e,a,i,f,c,h,k,m){var f=l(b,f),j="",g;if(!f)return"!"==i?d(c,b):k?d(m,b):"";if(!i)return d(h,b);if("@"==i){e=b._key;a=b._val;for(g in f)f.hasOwnProperty(g)&&(b._key=g,b._val=f[g],j+=d(c,b));b._key=e;b._val=a;return j}}).replace(k,function(a,c,d){return(a=l(b,d))||0===a?"%"==c?(new Option(a)).innerHTML.replace(/"/g,"&quot;"):
a:""})}var h=/\{\{(([@!]?)(.+?))\}\}(([\s\S]+?)(\{\{:\1\}\}([\s\S]+?))?)\{\{\/\1\}\}/g,k=/\{\{([=%])(.+?)\}\}/g;c.prototype.render=function(a){return d(this.t,a)};window.t=c})(GrowthMessage || (GrowthMessage = {}));
var GrowthMessage;
(function (GrowthMessage) {
    var Events = (function () {
        function Events() {
            this.events = {};
        }
        Events.prototype.on = function (eventName, callbackName, thisArg) {
            this.events[eventName] = {
                callbackName: callbackName,
                thisArg: thisArg
            };
        };
        Events.prototype.trigger = function (eventName, arg) {
            var event = this.events[eventName];
            if (!event)
                return;
            var thisArg = event.thisArg ? event.thisArg : this;
            thisArg[event.callbackName](arg);
        };
        return Events;
    })();
    GrowthMessage.Events = Events;
})(GrowthMessage || (GrowthMessage = {}));
/// <reference path="events.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GrowthMessage;
(function (GrowthMessage) {
    var App = (function (_super) {
        __extends(App, _super);
        function App(options) {
            _super.call(this);
            this.config = new GrowthMessage.Config();
            this.dialog = new GrowthMessage.Dialog();
            this.overlay = new GrowthMessage.Overlay();
            this.userAgent = new GrowthMessage.UserAgent();
            if (!this.userAgent.isViewable())
                return;
            this.id = options.id;
            this.render();
            this.setStyles();
            this.bindEvents();
        }
        App.prototype.render = function () {
            var el = document.createElement('div');
            el.className = 'growthmessage';
            document.body.appendChild(el);
            this.el = document.body.getElementsByClassName(el.className)[0];
        };
        App.prototype.setStyles = function () {
            var styles = GrowthMessage.module.require('styles.css');
            var el = document.createElement('style');
            el.type = 'text/css';
            el.innerHTML = styles;
            document.getElementsByTagName('head')[0].appendChild(el);
        };
        App.prototype.bindEvents = function () {
            this.on('hook', 'open', this.dialog);
        };
        return App;
    })(GrowthMessage.Events);
    GrowthMessage.App = App;
})(GrowthMessage || (GrowthMessage = {}));
/// <reference path="events.ts" />
var GrowthMessage;
(function (GrowthMessage) {
    var Config = (function (_super) {
        __extends(Config, _super);
        function Config() {
            _super.call(this);
            this.data = {
                "created": "2015-05-09T10:56:06+0000",
                "eventId": "Event:P5C3vzoLOEijnlVj:Default:Open",
                "frequency": 1,
                "segmentId": "Segment:P5C3vzoLOEijnlVj:Default:All",
                "cap": 100,
                "archived": null,
                "version": 3,
                "id": "PBHNxGGXDvZwmF7C",
                "type": "image",
                "task": {
                    "created": "2015-04-29T20:44:17+0000",
                    "applicationId": "P5C3vzoLOEijnlVj",
                    "disabled": false,
                    "availableFrom": "2015-03-31T20:43:42+0000",
                    "availableTo": "2015-05-30T20:43:42+0000",
                    "updated": "2015-05-13T05:37:22+0000",
                    "description": "",
                    "name": "テンプレート",
                    "id": "PBHNxFzRAJCbeJzS",
                    "messages": null
                },
                "buttons": [
                    {
                        "created": "2015-05-09T10:56:07+0000",
                        "type": "image",
                        "message": null,
                        "intent": {
                            "extra": {
                                "view": "view_x",
                                "action": "open_view"
                            },
                            "created": "2015-05-09T10:56:00+0000",
                            "applicationId": "P5C3vzoLOEijnlVj",
                            "description": "",
                            "name": "ビューXを開く",
                            "id": "PCBT6eyyGDmbSaqV",
                            "type": "custom"
                        },
                        "picture": {
                            "url": "http://growthmessage.s3-ap-northeast-1.amazonaws.com/pictures/PBHNrmKWXffI7J8K.png",
                            "created": "2015-04-29T20:43:56+0000",
                            "applicationId": "P5C3vzoLOEijnlVj",
                            "deleted": null,
                            "updated": "2015-04-29T20:43:56+0000",
                            "width": 600,
                            "height": 100,
                            "name": "message_button_a.png",
                            "id": "PBHNrmKWXffI7J8K",
                            "extension": "png"
                        },
                        "id": "PCBT8NakhmGVdzT7"
                    },
                    {
                        "created": "2015-05-09T10:56:07+0000",
                        "type": "image",
                        "message": null,
                        "intent": {
                            "created": "2015-04-01T01:45:47+0000",
                            "applicationId": "P5C3vzoLOEijnlVj",
                            "description": "何もしません",
                            "name": "なし",
                            "id": "P8Z2cC64j2m6Oq5b",
                            "type": "noop"
                        },
                        "picture": {
                            "url": "http://growthmessage.s3-ap-northeast-1.amazonaws.com/pictures/PBHNt1hv4yoK6y7e.png",
                            "created": "2015-04-29T20:44:01+0000",
                            "applicationId": "P5C3vzoLOEijnlVj",
                            "deleted": null,
                            "updated": "2015-04-29T20:44:01+0000",
                            "width": 600,
                            "height": 100,
                            "name": "message_button_b.png",
                            "id": "PBHNt1hv4yoK6y7e",
                            "extension": "png"
                        },
                        "id": "PCBT8O10MQLnp8Yp"
                    },
                    {
                        "created": "2015-05-09T10:56:07+0000",
                        "type": "close",
                        "message": null,
                        "intent": {
                            "created": "2015-04-01T01:45:47+0000",
                            "applicationId": "P5C3vzoLOEijnlVj",
                            "description": "何もしません",
                            "name": "なし",
                            "id": "P8Z2cC64j2m6Oq5b",
                            "type": "noop"
                        },
                        "picture": {
                            "url": "http://growthmessage.s3-ap-northeast-1.amazonaws.com/pictures/PAWVlWykDsEOVzbD.png",
                            "created": "2015-04-21T20:20:31+0000",
                            "applicationId": "P5C3vzoLOEijnlVj",
                            "deleted": null,
                            "updated": "2015-04-21T20:20:31+0000",
                            "width": 50,
                            "height": 50,
                            "name": "close_button.png",
                            "id": "PAWVlWykDsEOVzbD",
                            "extension": "png"
                        },
                        "id": "PCBT8ODjEYEX8Fec"
                    }
                ],
                "picture": {
                    "url": "http://growthmessage.s3-ap-northeast-1.amazonaws.com/pictures/PBHNqPsEgKW52TQC.png",
                    "created": "2015-04-29T20:43:51+0000",
                    "applicationId": "P5C3vzoLOEijnlVj",
                    "deleted": null,
                    "updated": "2015-04-29T20:43:51+0000",
                    "width": 600,
                    "height": 730,
                    "name": "message_background.png",
                    "id": "PBHNqPsEgKW52TQC",
                    "extension": "png"
                }
            };
        }
        Config.prototype.get = function () {
            return this.data;
        };
        return Config;
    })(GrowthMessage.Events);
    GrowthMessage.Config = Config;
})(GrowthMessage || (GrowthMessage = {}));
/// <reference path="vender/t.d.ts" />
/// <reference path="events.ts" />
var GrowthMessage;
(function (GrowthMessage) {
    var Dialog = (function (_super) {
        __extends(Dialog, _super);
        function Dialog() {
            _super.call(this);
        }
        Dialog.prototype.open = function () {
            this.parentElement = document.body.getElementsByClassName('growthmessage')[0];
            this.render(GrowthMessage.module.require('dialog-text.html'), {
                title: 'hogehoge',
                body: 'fugafugafugafugafugafugafugafuga'
            });
        };
        Dialog.prototype.render = function (template, data) {
            var html = new GrowthMessage.t(template).render(data);
            this.parentElement.innerHTML = html;
        };
        return Dialog;
    })(GrowthMessage.Events);
    GrowthMessage.Dialog = Dialog;
})(GrowthMessage || (GrowthMessage = {}));
var GrowthMessage;
(function (GrowthMessage) {
    var Module = (function () {
        function Module() {
        }
        Module.prototype.exports = function (name, src) {
            this[name] = src;
        };
        Module.prototype.require = function (name) {
            return this[name];
        };
        return Module;
    })();
    GrowthMessage.module = new Module();
})(GrowthMessage || (GrowthMessage = {}));
/// <reference path="events.ts" />
var GrowthMessage;
(function (GrowthMessage) {
    var Overlay = (function (_super) {
        __extends(Overlay, _super);
        function Overlay() {
            _super.call(this);
        }
        return Overlay;
    })(GrowthMessage.Events);
    GrowthMessage.Overlay = Overlay;
})(GrowthMessage || (GrowthMessage = {}));
/// <reference path="events.ts" />
var GrowthMessage;
(function (GrowthMessage) {
    var UserAgent = (function (_super) {
        __extends(UserAgent, _super);
        function UserAgent() {
            _super.call(this);
            this.UA = window.navigator.userAgent.toLowerCase();
        }
        UserAgent.prototype.isViewable = function () {
            var _this = this;
            var is = function (text) {
                return _this.UA.indexOf(text) != -1;
            };
            return (is('iphone os 6_') || is('iphone os 7_') || is('iphone os 8_') || is('iphone os 9_') || is('iphone os 10_') || (is('android 4.') && is('mobile safari')) || (is('android 5.') && is('mobile safari')) || (is('android 6.') && is('mobile safari')));
        };
        return UserAgent;
    })(GrowthMessage.Events);
    GrowthMessage.UserAgent = UserAgent;
})(GrowthMessage || (GrowthMessage = {}));

if(GrowthMessage.module){
GrowthMessage.module.exports("styles.css", ".growthmessage-dialog {\n    position : absolute;\n    top : 0px;\n    left : 0px;\n    width : 100%;\n    height : 100%;\n    display : table;\n    background-color : rgba(0,0,0,0.9);\n}\n.growthmessage-dialog__margin-left {\n    display : table-cell;\n    width : 7.5%\n}\n.growthmessage-dialog__margin-right {\n    display : table-cell;\n    width : 7.5%\n}\n.growthmessage-dialog__inner {\n    display : table-cell;\n    width : 85%;\n    vertical-align : middle;\n}\n.growthmessage-dialog__contents {\n    display : table;\n    table-layout : fixed;\n    box-sizing : border-box;\n    overflow : hidden;\n    width : 100%;\n    background-color : #eaeaea;\n    border-top : 1px solid #fff;\n    border-radius : 10px;\n}\n.growthmessage-dialog-text__title {\n    margin : 21px 14px 7px 14px;\n    text-align : center;\n    word-wrap : break-word;\n    line-height : 42px;\n    font-size : 28px;\n}\n.growthmessage-dialog-text__body {\n    margin : 7px 28px 28px 28px;\n    text-align : center;\n    word-wrap : break-word;\n    line-height : 33px;\n    font-size : 22px;\n}\n.growthmessage-dialog-text__buttons {\n    display : table;\n    width : 100%;\n    border-top : 1px solid #b4b4b4;\n}\n.growthmessage-dialog-text__button {\n    display : table-cell;\n    box-sizing : border-box;\n    padding : 14px 7px;\n    text-align : center;\n    vertical-align : middle;\n    word-wrap : break-word;\n    font-size : 16px;\n    color : #1678e5;\n}\n");
GrowthMessage.module.exports("dialog-image.html", "<div class=\"growthmessage-dialog-image\">\n    \n</div>\n");
GrowthMessage.module.exports("dialog-text.html", "<div class=\"growthmessage-dialog\">\n    <div class=\"growthmessage-dialog__margin-left\"></div>\n    <div class=\"growthmessage-dialog__inner\">\n        <div class=\"growthmessage-dialog__contents\">\n            <div class=\"growthmessage-dialog-text__title\">\n                {{=title}}\n            </div>\n            <div class=\"growthmessage-dialog-text__body\">\n                {{%body}}\n            </div>\n            <div class=\"growthmessage-dialog-text__buttons\">\n                <div class=\"growthmessage-dialog-text__button\">\n                    piyopiyo\n                </div>\n                <div class=\"growthmessage-dialog-text__button\">\n                    piyopiyo\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"growthmessage-dialog__margin-right\"></div>\n</div>\n");
}