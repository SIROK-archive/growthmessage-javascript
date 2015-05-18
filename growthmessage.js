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

  req.onreadystatechange = function () {
    if (req.readyState == 4)
      callback(req.status, req.responseText, req)
  }

  if (body) {
    setDefault(headers, 'X-Requested-With', 'XMLHttpRequest')
    setDefault(headers, 'Content-Type', 'application/x-www-form-urlencoded')
  }

  req.open(method, params.url, true)
  req.withCredentials = withCredentials

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
            this.userAgent = new GrowthMessage.UserAgent();
            if (!this.userAgent.isViewable())
                return;
            this.id = options.id;
            this.render();
            this.setStyles();
            this.bindEvents();
            this.config.load('/sample/json/image-2buttons.json');
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
            this.on('hook', 'open');
            this.config.on('set', 'open', this);
        };
        App.prototype.open = function () {
            this.dialog.open(this.config.get());
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
            this.on('load', 'set');
        }
        Config.prototype.load = function (url, params) {
            var _this = this;
            GrowthMessage.nanoajax.ajax({
                url: url,
                method: 'GET'
            }, function (code, responseText) {
                _this.trigger('load', JSON.parse(responseText));
            });
        };
        Config.prototype.set = function (responseText) {
            this.data = responseText;
            this.trigger('set');
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
            this.templates = {
                'plain': 'dialog-text.html',
                'image': 'dialog-image.html'
            };
        }
        Dialog.prototype.open = function (data) {
            this.parentElement = document.body.getElementsByClassName('growthmessage')[0];
            this.render(data);
            this.setElement();
            this.fitOverlay();
            this.fitDialog();
            this.scaleDialog();
            this.bindEvents();
            this.animateForOpen(100);
        };
        Dialog.prototype.hide = function (delay) {
            var _this = this;
            if (delay === void 0) { delay = 0; }
            setTimeout(function () {
                _this.parentElement.innerHTML = '';
            }, delay);
        };
        Dialog.prototype.render = function (data) {
            var template = GrowthMessage.module.require(this.templates[data.type]);
            var html = new GrowthMessage.t(template).render(this.filter(data));
            this.parentElement.innerHTML = html;
        };
        Dialog.prototype.filter = function (data) {
            var newButtons = [];
            data.buttons.forEach(function (button, index) {
                if (button.type === 'screen') {
                    data._screen = button;
                    if (button.intent.type === 'url') {
                        data._screenIsUrlType = true;
                    }
                }
                else if (button.type === 'close') {
                    data._close = button;
                }
                else {
                    if (button.intent.type === 'url') {
                        button._isUrlType = true;
                    }
                    newButtons.push(button);
                }
            });
            data.buttons = newButtons;
            return data;
        };
        Dialog.prototype.setElement = function () {
            this.el = document.body.getElementsByClassName('growthmessage-dialog')[0];
        };
        Dialog.prototype.animateForOpen = function (delay) {
            var _this = this;
            if (delay === void 0) { delay = 0; }
            setTimeout(function () {
                var el = document.body.getElementsByClassName('growthmessage-dialog__contents')[0];
                el.style['transform'] = 'scale(1)';
                el.style['-webkit-transform'] = 'scale(1)';
                _this.el.style.opacity = 1;
            }, delay);
        };
        Dialog.prototype.animateForClose = function () {
            this.el.style.opacity = 0;
        };
        Dialog.prototype.fitOverlay = function () {
            var D = document;
            this.el.width = Math.max(D.body.offsetWidth, D.documentElement.offsetWidth, D.body.clientWidth, D.documentElement.clientWidth);
            this.el.style.width = this.el.width + 'px';
            this.el.height = Math.max(D.body.scrollHeight, D.documentElement.scrollHeight, D.body.offsetHeight, D.documentElement.offsetHeight, D.body.clientHeight, D.documentElement.clientHeight);
            this.el.style.height = this.el.height + 'px';
        };
        Dialog.prototype.fitDialog = function () {
            var D = document;
            var el = document.body.getElementsByClassName('growthmessage-dialog__inner')[0];
            el.width = Math.max(D.body.clientWidth, D.documentElement.clientWidth);
            el.style.width = el.style.width + 'px';
            el.height = Math.min(D.body.clientHeight, D.documentElement.clientHeight);
            el.style.height = el.height + 'px';
            el.top = Math.max(window.pageYOffset, D.documentElement.scrollTop);
            el.style.top = el.top + 'px';
        };
        Dialog.prototype.scaleDialog = function () {
            var el = document.body.getElementsByClassName('growthmessage-dialog__inner')[0];
            setTimeout(function () {
                var D = document;
                var height = Math.min(D.body.clientHeight, D.documentElement.clientHeight);
                if (el.offsetHeight <= height)
                    return;
                el.style.transform = 'scale(' + (height / el.offsetHeight * 0.85) + ')';
                el.style.transformOrigin = 'center top';
                el.style.top = el.top + height * 0.075 + 'px';
            }, 100);
        };
        Dialog.prototype.bindEvents = function () {
            var _this = this;
            var eventName = ('ontouchstart' in window) ? 'touchend' : 'click';
            this.el.addEventListener(eventName, function (e) {
                if (!_this.hasClass(e.target, 'js__growthmessage-dialog__button-close'))
                    return;
                _this.animateForClose();
                _this.hide(300);
            });
        };
        Dialog.prototype.hasClass = function (el, name) {
            return (el.className.split(' ').indexOf(name) >= 0);
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
GrowthMessage.module.exports("styles.css", ".growthmessage-dialog{position:absolute;top:0px;left:0px;width:100%;height:100%;background-color:rgba(0,0,0,0.5);opacity:0;font-family:sans-serif;-webkit-transition:all 0.2s;transition:all 0.2s}.growthmessage-dialog__inner{position:absolute;top:0px;left:0px;width:100%;max-height:85%;display:table}.growthmessage-dialog__margin-left,.growthmessage-dialog__margin-right{display:table-cell;width:7.5%}.growthmessage-dialog__contents{display:table-cell;width:85%;vertical-align:middle;-webkit-transform:scale(1.1);transform:scale(1.1);-webkit-transition:all 0.3s;transition:all 0.3s}.growthmessage-dialog-text{display:table;table-layout:fixed;box-sizing:border-box;overflow:hidden;width:100%;background-color:#eaeaea;border-top:1px solid #fff;border-radius:7px}.growthmessage-dialog-text__title{margin:21px 14px 7px 14px;text-align:center;word-wrap:break-word;line-height:24px;font-size:17px;font-weight:bold}.growthmessage-dialog-text__body{margin:0px 21px 21px 21px;text-align:center;word-wrap:break-word;line-height:17px;font-size:13px}.growthmessage-dialog-text__buttons{display:table;table-layout:fixed;width:100%;border-top:1px solid #ccc}.growthmessage-dialog-text__button{display:table-cell;box-sizing:border-box;padding:14px 7px;border-right:1px solid #ccc;text-align:center;vertical-align:middle;word-wrap:break-word;text-decoration:none;font-size:17px;color:#1678e5}.growthmessage-dialog-text__button:hover{background:#efefef;font-weight:bold}.growthmessage-dialog-text__button:last-child{border-right:none}.growthmessage-dialog-image{position:relative;display:table;table-layout:fixed;box-sizing:border-box;width:100%;font-size:0}.growthmessage-dialog-image__bg{display:table-cell;width:100%}.growthmessage-dialog-image__bg img{width:100%}.growthmessage-dialog-image__buttons{display:table-cell;position:absolute;bottom:0;left:0;width:100%;text-align:center;vertical-align:bottom}.growthmessage-dialog-image__button{display:block;width:100%;text-align:center}.growthmessage-dialog-image__button img{width:100%}.growthmessage-dialog__button-close{position:absolute;top:0;right:0;-webkit-transform:translate(50%, -50%) scale(0.5);transform:translate(50%, -50%) scale(0.5);font-size:0}\n");
GrowthMessage.module.exports("dialog-image.html", "<div class=\"js__growthmessage-dialog__button-close growthmessage-dialog\">\n    <div class=\"growthmessage-dialog__inner\">\n        <div class=\"js__growthmessage-dialog__button-close growthmessage-dialog__margin-left\"></div>\n        <div class=\"js__growthmessage-dialog__button-close growthmessage-dialog__contents\">\n            <div class=\"growthmessage-dialog-image\">\n                {{_screenIsUrlType}}\n                    <a href=\"{{=_screen.intent.url}}\" class=\"growthmessage-dialog-image__bg\">\n                        <img src=\"{{=picture.url}}\">\n                    </a>\n                {{:_screenIsUrlType}}\n                    <div class=\"growthmessage-dialog-image__bg\">\n                        <img src=\"{{=picture.url}}\" class=\"{{_screen}}js__growthmessage-dialog__button-close{{/_screen}}\">\n                    </div>\n                {{/_screenIsUrlType}}\n                <div class=\"growthmessage-dialog-image__buttons\">\n                    {{@buttons}}\n                        {{_val._isUrlType}}\n                            <a href=\"{{=_val.intent.url}}\" class=\"growthmessage-dialog-image__button\">\n                                <img src=\"{{=_val.picture.url}}\" class=\"js__growthmessage-dialog__button-close\">\n                            </a>\n                        {{:_val._isUrlType}}\n                            <div class=\"growthmessage-dialog-image__button\">\n                                <img src=\"{{=_val.picture.url}}\" class=\"js__growthmessage-dialog__button-close\">\n                            </div>\n                        {{/_val._isUrlType}}\n                    {{/@buttons}}\n                </div>\n                {{_close}}\n                    <img src=\"{{=_close.picture.url}}\" class=\"js__growthmessage-dialog__button-close growthmessage-dialog__button-close\">\n                {{/_close}}\n            </div>\n        </div>\n        <div class=\"js__growthmessage-dialog__button-close growthmessage-dialog__margin-right\"></div>\n    </div>\n</div>\n");
GrowthMessage.module.exports("dialog-text.html", "<div class=\"js__growthmessage-dialog__button-close growthmessage-dialog\">\n    <div class=\"growthmessage-dialog__inner\">\n        <div class=\"js__growthmessage-dialog__button-close growthmessage-dialog__margin-left\"></div>\n        <div class=\"js__growthmessage-dialog__button-close growthmessage-dialog__contents\">\n            <div class=\"growthmessage-dialog-text\">\n                <div class=\"growthmessage-dialog-text__title\">\n                    {{=caption}}\n                </div>\n                <div class=\"growthmessage-dialog-text__body\">\n                    {{=text}}\n                </div>\n                <div class=\"growthmessage-dialog-text__buttons\">\n                    {{@buttons}}\n                        {{_val._isUrlType}}\n                            <a href=\"{{=_val.intent.url}}\" class=\"growthmessage-dialog-text__button\">\n                                {{=_val.label}}\n                            </a>\n                        {{:_val._isUrlType}}\n                            <div class=\"js__growthmessage-dialog__button-close growthmessage-dialog-text__button\">\n                                {{=_val.label}}\n                            </div>\n                        {{/_val._isUrlType}}\n                    {{/@buttons}}\n                </div>\n            </div>\n        </div>\n        <div class=\"js__growthmessage-dialog__button-close growthmessage-dialog__margin-right\"></div>\n    </div>\n</div>\n");
}