var GrowthMessage;(function(global, exports){exports.ajax = function (params, callback) {
  if (typeof params == 'string') params = {url: params}
  var headers = params.headers || {}
    , body = params.body
    , method = params.method || (body ? 'POST' : 'GET')
    , withCredentials = params.withCredentials || false

  var req = getRequest()

  // has no effect in IE
  // has no effect for same-origin requests
  // has no effect in CORS if user has disabled 3rd party cookies
  req.withCredentials = withCredentials

  req.onreadystatechange = function () {
    if (req.readyState == 4)
      callback(req.status, req.responseText, req)
  }

  if (body) {
    setDefault(headers, 'X-Requested-With', 'XMLHttpRequest')
    setDefault(headers, 'Content-Type', 'application/x-www-form-urlencoded')
  }

  req.open(method, params.url, true)

  for (var field in headers)
    req.setRequestHeader(field, headers[field])

  req.send(body)
}

function getRequest() {
  if (global.XMLHttpRequest)
    return new global.XMLHttpRequest;
  else
    try { return new global.ActiveXObject("MSXML2.XMLHTTP.3.0"); } catch(e) {}
  throw new Error('no xmlhttp request able to be created')
}

function setDefault(obj, key, value) {
  obj[key] = obj[key] || value
}
GrowthMessage.nanoajax=exports;}(window, GrowthMessage || (GrowthMessage = {})));
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
/// <reference path="vender/nanoajax.d.ts" />
/// <reference path="events.ts" />
var GrowthMessage;
(function (GrowthMessage) {
    var Config = (function (_super) {
        __extends(Config, _super);
        function Config() {
            _super.call(this);
            this.data = {};
            this.on('load', 'check');
            this.load('/sample/json/image-2buttons.json');
        }
        Config.prototype.load = function (url, params) {
            var _this = this;
            GrowthMessage.nanoajax.ajax({
                url: url,
                method: 'GET'
            }, function () {
                _this.trigger('load');
            });
        };
        Config.prototype.check = function () {
        };
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
                body: 'fugafugafugafugafugafugafugafuga',
                buttons: [
                    { label: 'piyo' },
                    { label: 'piyopiyo' }
                ]
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
GrowthMessage.module.exports("styles.css", ".growthmessage-dialog{position:absolute;top:0px;left:0px;width:100%;height:100%;display:table;background-color:rgba(0,0,0,0.9)}.growthmessage-dialog__margin-left,.growthmessage-dialog__margin-right{display:table-cell;width:7.5%}.growthmessage-dialog__inner{display:table-cell;width:85%;vertical-align:middle}.growthmessage-dialog__contents{display:table;table-layout:fixed;box-sizing:border-box;overflow:hidden;width:100%;background-color:#eaeaea;border-top:1px solid #fff;border-radius:10px}.growthmessage-dialog-text__title{margin:21px 14px 7px 14px;text-align:center;word-wrap:break-word;line-height:42px;font-size:28px}.growthmessage-dialog-text__body{margin:7px 28px 28px 28px;text-align:center;word-wrap:break-word;line-height:33px;font-size:22px}.growthmessage-dialog-text__buttons{display:table;table-layout:fixed;width:100%;border-top:1px solid #b4b4b4}.growthmessage-dialog-text__button{display:table-cell;box-sizing:border-box;padding:14px 7px;border-right:1px solid #b4b4b4;text-align:center;vertical-align:middle;word-wrap:break-word;font-size:16px;color:#1678e5}.growthmessage-dialog-text__button:last-child{border-right:none}\n");
GrowthMessage.module.exports("dialog-image.html", "<div class=\"growthmessage-dialog-image\">\n    \n</div>\n");
GrowthMessage.module.exports("dialog-text.html", "<div class=\"growthmessage-dialog\">\n    <div class=\"growthmessage-dialog__margin-left\"></div>\n    <div class=\"growthmessage-dialog__inner\">\n        <div class=\"growthmessage-dialog__contents\">\n            <div class=\"growthmessage-dialog-text__title\">\n                {{=title}}\n            </div>\n            <div class=\"growthmessage-dialog-text__body\">\n                {{%body}}\n            </div>\n            <div class=\"growthmessage-dialog-text__buttons\">\n                {{@buttons}}\n                    <div class=\"growthmessage-dialog-text__button\">\n                        {{=_val.label}}\n                    </div>\n                {{/@buttons}}\n            </div>\n        </div>\n    </div>\n    <div class=\"growthmessage-dialog__margin-right\"></div>\n</div>\n");
}