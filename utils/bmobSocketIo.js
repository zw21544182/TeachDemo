/*!
 * Bmob WeChat applet SDK
 * http://www.bmob.cn
 * Copyright Bmob, Inc.
 * The Bmob WeChat applet SDK is freely distributable under the MIT license.
 * (c) 2016-2050 Magic
 */


(function (root) {

  var io = ('undefined' === typeof module ? {} : module.exports);
  var BmobSocketIo = {};
  exports.BmobSocketIo = BmobSocketIo;


  /**
   * socket.io
   * Copyright(c) 2017 Magic <730170034@qq.com>
   * MIT Licensed
   */

  (function (exports, global, root) {

    /**
     * IO namespace.
     *
     * @namespace
     */

    var io = exports;

    /**
     *
     * @api public
     */

    io.version = 'V1.0.0';


    io.JSON = JSON;



    /**
     * Protocol implemented.
     *
     * @api public
     */

    io.protocol = 1;



    /**
     * Available transports, these will be populated with the available transports
     *
     * @api public
     */

    io.transports = [];

    /**
     * Keep track of jsonp callbacks.
     *
     * @api private
     */

    io.j = [];

    /**
     * Keep track of our io.Sockets
     *
     * @api private
     */
    io.sockets = {};
    /**
   * Manages connections to hosts.
   *
   * @param {String} uri
   * @Param {Boolean} force creation of new socket (defaults to false)
   * @api public
   */

    io.connect = function (host, details) {
      var uri = io.util.parseUri(host)
        , uuri
        , socket;

      if (global && global.location) {
        uri.protocol = uri.protocol || global.location.protocol.slice(0, -1);
        uri.host = uri.host;
        uri.port = uri.port || global.location.port;
      }

      uuri = io.util.uniqueUri(uri);

      var options = {
        host: uri.host
        , secure: 'https' == uri.protocol
        , port: ""
        , query: uri.query || ''
      };


      io.util.merge(options, details);

      if (options['force new connection'] || !io.sockets[uuri]) {
        socket = new io.Socket(options);
      }

      if (!options['force new connection'] && socket) {
        io.sockets[uuri] = socket;
      }



      console.log("connect")
      socket = socket || io.sockets[uuri];

      // if path is different from '' or /
      return socket.of(uri.path.length > 1 ? uri.path : '');
    }

  })('object' === typeof module ? module.exports : (this.io = {}), this);




  /**
   * socket.io
   * Copyright(c) 2017 Magic <730170034@qq.com>
   * MIT Licensed
   */

  (function (exports, io) {

    /**
     * Expose constructor.
     */

    exports.EventEmitter = EventEmitter;

    /**
     * Event emitter constructor.
     *
     * @api public.
     */

    function EventEmitter() { };

    /**
     * Adds a listener
     *
     * @api public
     */

    EventEmitter.prototype.on = function (name, fn) {
      if (!this.$events) {
        this.$events = {};
      }

      if (!this.$events[name]) {
        this.$events[name] = fn;
      } else if (io.util.isArray(this.$events[name])) {
        this.$events[name].push(fn);
      } else {
        this.$events[name] = [this.$events[name], fn];
      }

      return this;
    };

    EventEmitter.prototype.addListener = EventEmitter.prototype.on;

    /**
     * Adds a volatile listener.
     *
     * @api public
     */

    EventEmitter.prototype.once = function (name, fn) {
      var self = this;

      function on() {
        self.removeListener(name, on);
        fn.apply(this, arguments);
      };

      on.listener = fn;
      this.on(name, on);

      return this;
    };

    /**
     * Removes a listener.
     *
     * @api public
     */

    EventEmitter.prototype.removeListener = function (name, fn) {
      if (this.$events && this.$events[name]) {
        var list = this.$events[name];

        if (io.util.isArray(list)) {
          var pos = -1;

          for (var i = 0, l = list.length; i < l; i++) {
            if (list[i] === fn || (list[i].listener && list[i].listener === fn)) {
              pos = i;
              break;
            }
          }

          if (pos < 0) {
            return this;
          }

          list.splice(pos, 1);

          if (!list.length) {
            delete this.$events[name];
          }
        } else if (list === fn || (list.listener && list.listener === fn)) {
          delete this.$events[name];
        }
      }

      return this;
    };

    /**
     * Removes all listeners for an event.
     *
     * @api public
     */

    EventEmitter.prototype.removeAllListeners = function (name) {
      if (name === undefined) {
        this.$events = {};
        return this;
      }

      if (this.$events && this.$events[name]) {
        this.$events[name] = null;
      }

      return this;
    };

    /**
     * Gets all listeners for a certain event.
     *
     * @api publci
     */

    EventEmitter.prototype.listeners = function (name) {
      if (!this.$events) {
        this.$events = {};
      }

      if (!this.$events[name]) {
        this.$events[name] = [];
      }

      if (!io.util.isArray(this.$events[name])) {
        this.$events[name] = [this.$events[name]];
      }

      return this.$events[name];
    };

    /**
     * Emits an event.
     *
     * @api public
     */

    EventEmitter.prototype.emit = function (name) {
      if (!this.$events) {
        return false;
      }

      var handler = this.$events[name];

      if (!handler) {
        return false;
      }

      var args = Array.prototype.slice.call(arguments, 1);

      if ('function' == typeof handler) {
        handler.apply(this, args);
      } else if (io.util.isArray(handler)) {
        var listeners = handler.slice();

        for (var i = 0, l = listeners.length; i < l; i++) {
          listeners[i].apply(this, args);
        }
      } else {
        return false;
      }

      return true;
    };

  })(
    'undefined' != typeof io ? io : module.exports
    , 'undefined' != typeof io ? io : module.parent.exports
    );




  /**
   * socket.io
   * Copyright(c) 2017 Magic <730170034@qq.com>
   * MIT Licensed
   */

  (function (exports, global) {

    /**
     * Utilities namespace.
     *
     * @namespace
     */

    var util = exports.util = {};

    /**
     * Parses an URI
     *
     * @api public
     */

    var re = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

    var parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password',
      'host', 'port', 'relative', 'path', 'directory', 'file', 'query',
      'anchor'];

    util.parseUri = function (str) {
      var m = re.exec(str || '')
        , uri = {}
        , i = 14;

      while (i--) {
        uri[parts[i]] = m[i] || '';
      }

      return uri;
    };

    /**
     * Produces a unique url that identifies a Socket.IO connection.
     *
     * @param {Object} uri
     * @api public
     */

    util.uniqueUri = function (uri) {
      var protocol = uri.protocol
        , host = uri.host
        , port = uri.port;

      if (global) {
        host = host || document.domain;
        port = port || (protocol == 'https'
          && document.location.protocol !== 'https:' ? 443 : document.location.port);
      } else {
        host = host || 'localhost';

        if (!port && protocol == 'https') {
          port = 443;
        }
      }

      return (protocol || 'http') + '://' + host + ':' + (port || 80);
    };

    /**
     * Mergest 2 query strings in to once unique query string
     *
     * @param {String} base
     * @param {String} addition
     * @api public
     */

    util.query = function (base, addition) {
      var query = util.chunkQuery(base || '')
        , components = [];

      util.merge(query, util.chunkQuery(addition || ''));
      for (var part in query) {
        if (query.hasOwnProperty(part)) {
          components.push(part + '=' + query[part]);
        }
      }

      return components.length ? '?' + components.join('&') : '';
    };

    /**
     * Transforms a querystring in to an object
     *
     * @param {String} qs
     * @api public
     */

    util.chunkQuery = function (qs) {
      var query = {}
        , params = qs.split('&')
        , i = 0
        , l = params.length
        , kv;

      for (; i < l; ++i) {
        kv = params[i].split('=');
        if (kv[0]) {
          query[kv[0]] = kv[1];
        }
      }

      return query;
    };

    /**
     * Executes the given function when the page is loaded.
     *
     *     io.util.load(function () { console.log('page loaded'); });
     *
     * @param {Function} fn
     * @api public
     */

    var pageLoaded = false;

    util.load = function (fn) {
      if (pageLoaded) {
        return fn();
      }

      util.on(global, 'load', fn, false);
    };

    /**
     * Adds an event.
     *
     * @api private
     */

    util.on = function (element, event, fn, capture) {
      if (element.attachEvent) {
        element.attachEvent('on' + event, fn);
      } else if (element.addEventListener) {
        element.addEventListener(event, fn, capture);
      }
    };




    /**
     * Change the internal pageLoaded value.
     */

    if ('undefined' != typeof window) {
      util.load(function () {
        pageLoaded = true;
      });
    }

    /**
     * Defers a function to ensure a spinner is not displayed by the browser
     *
     * @param {Function} fn
     * @api public
     */

    util.defer = function (fn) {
      if (!util.ua.webkit || 'undefined' != typeof importScripts) {
        return fn();
      }

      util.load(function () {
        setTimeout(fn, 100);
      });
    };

    /**
     * Merges two objects.
     *
     * @api public
     */

    util.merge = function merge(target, additional, deep, lastseen) {
      var seen = lastseen || []
        , depth = typeof deep == 'undefined' ? 2 : deep
        , prop;

      for (prop in additional) {
        if (additional.hasOwnProperty(prop) && util.indexOf(seen, prop) < 0) {
          if (typeof target[prop] !== 'object' || !depth) {
            target[prop] = additional[prop];
            seen.push(additional[prop]);
          } else {
            util.merge(target[prop], additional[prop], depth - 1, seen);
          }
        }
      }

      return target;
    };

    /**
     * Merges prototypes from objects
     *
     * @api public
     */

    util.mixin = function (ctor, ctor2) {
      util.merge(ctor.prototype, ctor2.prototype);
    };

    /**
     * Shortcut for prototypical and static inheritance.
     *
     * @api private
     */

    util.inherit = function (ctor, ctor2) {
      function f() { };
      f.prototype = ctor2.prototype;
      ctor.prototype = new f;
    };

    /**
     * Checks if the given object is an Array.
     *
     *     io.util.isArray([]); // true
     *     io.util.isArray({}); // false
     *
     * @param Object obj
     * @api public
     */

    util.isArray = Array.isArray || function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };

    /**
     * Intersects values of two arrays into a third
     *
     * @api public
     */

    util.intersect = function (arr, arr2) {
      var ret = []
        , longest = arr.length > arr2.length ? arr : arr2
        , shortest = arr.length > arr2.length ? arr2 : arr;

      for (var i = 0, l = shortest.length; i < l; i++) {
        if (~util.indexOf(longest, shortest[i]))
          ret.push(shortest[i]);
      }

      return ret;
    }

    /**
     * Array indexOf compatibility.
     *
     * @see bit.ly/a5Dxa2
     * @api public
     */

    util.indexOf = function (arr, o, i) {

      for (var j = arr.length, i = i < 0 ? i + j < 0 ? 0 : i + j : i || 0;
        i < j && arr[i] !== o; i++) { }

      return j <= i ? -1 : i;
    };

    /**
     * Converts enumerables to array.
     *
     * @api public
     */

    util.toArray = function (enu) {
      var arr = [];

      for (var i = 0, l = enu.length; i < l; i++)
        arr.push(enu[i]);

      return arr;
    };

    /**
     * UA / engines detection namespace.
     *
     * @namespace
     */

    util.ua = {};

    /**
     * Whether the UA supports CORS for XHR.
     *
     * @api public
     */

    util.ua.hasCORS = 'undefined' != typeof XMLHttpRequest && (function () {
      try {
        var a = new XMLHttpRequest();
      } catch (e) {
        return false;
      }

      return a.withCredentials != undefined;
    })();

    /**
     * Detect webkit.
     *
     * @api public
     */

    util.ua.webkit = 'undefined' != typeof navigator
      && /webkit/i.test(navigator.userAgent);

    /**
    * Detect iPad/iPhone/iPod.
    *
    * @api public
    */

    util.ua.iDevice = 'undefined' != typeof navigator
      && /iPad|iPhone|iPod/i.test(navigator.userAgent);

  })('undefined' != typeof io ? io : module.exports, this);

  /**
 * socket.io
 * Copyright(c) 2017 Magic <730170034@qq.com>
 * MIT Licensed
 */

  (function (exports, io, global) {

    /**
     * Expose constructor.
     */

    exports.Socket = Socket;

    /**
     * Create a new `Socket.IO client` which can establish a persistent
     * connection with a Socket.IO enabled server.
     *
     * @api public
     */

    function Socket(options) {
      this.options = {
        port: 80
        , secure: true
        , document: false
        , resource: 'socket.io'
        , transports: io.transports
        , 'connect timeout': 10000
        , 'try multiple transports': true
        , 'reconnect': true
        , 'reconnection delay': 500
        , 'reconnection limit': Infinity
        , 'reopen delay': 3000
        , 'max reconnection attempts': 10
        , 'sync disconnect on unload': false
        , 'auto connect': true
        , 'flash policy port': 10843
        , 'manualFlush': false
      };

      io.util.merge(this.options, options);

      this.connected = false;
      this.open = false;
      this.connecting = false;
      this.reconnecting = false;
      this.namespaces = {};
      this.buffer = [];
      this.doBuffer = false;

      if (this.options['sync disconnect on unload'] &&
        (!this.isXDomain() || io.util.ua.hasCORS)) {
        var self = this;
        io.util.on(global, 'beforeunload', function () {
          self.disconnectSync();
        }, false);
      }

      if (this.options['auto connect']) {
        this.connect();
      }
    };

    /**
     * Apply EventEmitter mixin.
     */

    io.util.mixin(Socket, io.EventEmitter);

    /**
     * Returns a namespace listener/emitter for this socket
     *
     * @api public
     */

    Socket.prototype.of = function (name) {
      if (!this.namespaces[name]) {
        this.namespaces[name] = new io.SocketNamespace(this, name);

        if (name !== '') {
          this.namespaces[name].packet({ type: 'connect' });
        }
      }

      return this.namespaces[name];
    };

    /**
     * Emits the given event to the Socket and all namespaces
     *
     * @api private
     */

    Socket.prototype.publish = function () {
      this.emit.apply(this, arguments);

      var nsp;

      for (var i in this.namespaces) {
        if (this.namespaces.hasOwnProperty(i)) {
          nsp = this.of(i);
          nsp.$emit.apply(nsp, arguments);
        }
      }
    };

    /**
     * 链接 handshake
     *
     * @api private
     */

    function empty() { };

    Socket.prototype.handshake = function (fn) {
      var self = this
        , options = this.options;

      function complete(data) {
        if (data instanceof Error) {
          self.connecting = false;
          self.onError(data.message);
        } else {
          fn.apply(null, data.split(':'));
        }
      };

      options.secure = true;
      var url = [
        'http' + (options.secure ? 's' : '') + ':/'
        , options.host
        , options.resource
        , io.protocol
        , io.util.query(this.options.query, 't=' + +new Date)
      ].join('/');


      var dataObject = {};
      var data = JSON.stringify(dataObject);

      var method = "GET";

      wx.request({
        method: method,
        url: url,
        data: data,
        header: {
          'content-type': 'text/plain'
        },
        success: function (res) {
          if (res.data && res.data.code) {
            console.log("request error");
          } else if (res.statusCode != 200) {
            console.log("request error");

          } else {
            complete(res.data);
          }

        },
        fail: function (e) {
          console.log("request error");
        }
      });

    };

    /**
     * Find an available transport based on the options supplied in the constructor.
     *
     * @api private
     */

    Socket.prototype.getTransport = function (override) {
      var transports = override || this.transports, match;

      for (var i = 0, transport; transport = transports[i]; i++) {
        if (transport) {
          return new io.Transport[transport](this, this.sessionid);
        }
      }

      return null;
    };

    /**
     * Connects to the server.
     *
     * @param {Function} [fn] Callback.
     * @returns {io.Socket}
     * @api public
     */

    Socket.prototype.connect = function (fn) {
      if (this.connecting) {
        return this;
      }

      var self = this;
      self.connecting = true;

      this.handshake(function (sid, heartbeat, close, transports) {
        self.sessionid = sid;
        self.closeTimeout = close * 1000;
        self.heartbeatTimeout = heartbeat * 1000;

        if (!self.transports)
          self.transports = self.origTransports = (transports ? io.util.intersect(
            transports.split(',')
            , self.options.transports
          ) : self.options.transports);

        self.setHeartbeatTimeout();

        function connect(transports) {
          if (self.transport) self.transport.clearTimeouts();

          self.transport = self.getTransport(transports);

          if (!self.transport) return self.publish('connect_failed');

          // once the transport is ready
          self.transport.ready(self, function () {
            self.connecting = true;
            self.publish('connecting', self.transport.name);
            self.transport.open();

            if (self.options['connect timeout']) {
              self.connectTimeoutTimer = setTimeout(function () {
                if (!self.connected) {
                  self.connecting = false;

                  if (self.options['try multiple transports']) {
                    var remaining = self.transports;

                    while (remaining.length > 0 && remaining.splice(0, 1)[0] !=
                      self.transport.name) { }

                    if (remaining.length) {
                      connect(remaining);
                    } else {
                      self.publish('connect_failed2');
                    }
                  }
                }
              }, self.options['connect timeout']);
            }
          });
        }

        connect(self.transports);

        self.once('connect', function (){
          clearTimeout(self.connectTimeoutTimer);

          fn && typeof fn == 'function' && fn();
        });
      });

      return this;
    };

    /**
     * Clears and sets a new heartbeat timeout using the value given by the
     * server during the handshake.
     *
     * @api private
     */

    Socket.prototype.setHeartbeatTimeout = function () {
      clearTimeout(this.heartbeatTimeoutTimer);
      if (this.transport && !this.transport.heartbeats()) return;

      var self = this;
      this.heartbeatTimeoutTimer = setTimeout(function () {
        self.transport.onClose();
      }, this.heartbeatTimeout);
    };

    /**
     * Sends a message.
     *
     * @param {Object} data packet.
     * @returns {io.Socket}
     * @api public
     */

    Socket.prototype.packet = function (data) {
      if (this.connected && !this.doBuffer) {
        this.transport.packet(data);
      } else {
        this.buffer.push(data);
      }

      return this;
    };

    /**
     * Sets buffer state
     *
     * @api private
     */

    Socket.prototype.setBuffer = function (v) {
      this.doBuffer = v;

      if (!v && this.connected && this.buffer.length) {
        if (!this.options['manualFlush']) {
          this.flushBuffer();
        }
      }
    };

    /**
     * Flushes the buffer data over the wire.
     * To be invoked manually when 'manualFlush' is set to true.
     *
     * @api public
     */

    Socket.prototype.flushBuffer = function () {
      this.transport.payload(this.buffer);
      this.buffer = [];
    };


    /**
     * Disconnect the established connect.
     *
     * @returns {io.Socket}
     * @api public
     */

    Socket.prototype.disconnect = function () {
      if (this.connected || this.connecting) {
        if (this.open) {
          this.of('').packet({ type: 'disconnect' });
        }

        // handle disconnection immediately
        this.onDisconnect('booted');
      }

      return this;
    };

    /**
     * Disconnects the socket with a sync XHR.
     *
     * @api private
     */

    Socket.prototype.disconnectSync = function () {
      // ensure disconnection
      var xhr = io.util.request();
      var uri = [
        'http' + (this.options.secure ? 's' : '') + ':/'
        , this.options.host + ':' + this.options.port
        , this.options.resource
        , io.protocol
        , ''
        , this.sessionid
      ].join('/') + '/?disconnect=1';

      xhr.open('GET', uri, false);
      xhr.send(null);

      // handle disconnection immediately
      this.onDisconnect('booted');
    };

    /**
     * Check if we need to use cross domain enabled transports. Cross domain would
     * be a different port or different domain name.
     *
     * @returns {Boolean}
     * @api private
     */

    Socket.prototype.isXDomain = function () {

      // var port = global.location.port ||
      //   ('https:' == global.location.protocol ? 443 : 80);
      var port = "";

      return port;
    };

    /**
     * Called upon handshake.
     *
     * @api private
     */

    Socket.prototype.onConnect = function () {
      if (!this.connected) {
        this.connected = true;
        this.connecting = false;
        if (!this.doBuffer) {
          // make sure to flush the buffer
          this.setBuffer(false);
        }
        this.emit('connect');
      }
    };

    /**
     * Called when the transport opens
     *
     * @api private
     */

    Socket.prototype.onOpen = function () {
      this.open = true;
    };

    /**
     * Called when the transport closes.
     *
     * @api private
     */

    Socket.prototype.onClose = function () {
      this.open = false;
      clearTimeout(this.heartbeatTimeoutTimer);
    };

    /**
     * Called when the transport first opens a connection
     *
     * @param text
     */

    Socket.prototype.onPacket = function (packet) {
      this.of(packet.endpoint).onPacket(packet);
    };

    /**
     * Handles an error.
     *
     * @api private
     */

    Socket.prototype.onError = function (err) {
      if (err && err.advice) {
        if (err.advice === 'reconnect' && (this.connected || this.connecting)) {
          this.disconnect();
          if (this.options.reconnect) {
            this.reconnect();
          }
        }
      }

      this.publish('error', err && err.reason ? err.reason : err);
    };

    /**
     * Called when the transport disconnects.
     *
     * @api private
     */

    Socket.prototype.onDisconnect = function (reason) {
      var wasConnected = this.connected
        , wasConnecting = this.connecting;

      this.connected = false;
      this.connecting = false;
      this.open = false;

      if (wasConnected || wasConnecting) {
        this.transport.close();
        this.transport.clearTimeouts();
        if (wasConnected) {
          this.publish('disconnect', reason);

          if ('booted' != reason && this.options.reconnect && !this.reconnecting) {
            this.reconnect();
          }
        }
      }
    };

    /**
     * Called upon reconnection.
     *
     * @api private
     */

    Socket.prototype.reconnect = function () {
      this.reconnecting = true;
      this.reconnectionAttempts = 0;
      this.reconnectionDelay = this.options['reconnection delay'];

      var self = this
        , maxAttempts = this.options['max reconnection attempts']
        , tryMultiple = this.options['try multiple transports']
        , limit = this.options['reconnection limit'];

      function reset() {
        if (self.connected) {
          for (var i in self.namespaces) {
            if (self.namespaces.hasOwnProperty(i) && '' !== i) {
              self.namespaces[i].packet({ type: 'connect' });
            }
          }
          self.publish('reconnect', self.transport.name, self.reconnectionAttempts);
        }

        clearTimeout(self.reconnectionTimer);

        self.removeListener('connect_failed', maybeReconnect);
        self.removeListener('connect', maybeReconnect);

        self.reconnecting = false;

        delete self.reconnectionAttempts;
        delete self.reconnectionDelay;
        delete self.reconnectionTimer;
        delete self.redoTransports;

        self.options['try multiple transports'] = tryMultiple;
      };

      function maybeReconnect() {
        if (!self.reconnecting) {
          return;
        }

        if (self.connected) {
          return reset();
        };

        if (self.connecting && self.reconnecting) {
          return self.reconnectionTimer = setTimeout(maybeReconnect, 1000);
        }

        if (self.reconnectionAttempts++ >= maxAttempts) {
          if (!self.redoTransports) {
            self.on('connect_failed', maybeReconnect);
            self.options['try multiple transports'] = true;
            self.transports = self.origTransports;
            self.transport = self.getTransport();
            self.redoTransports = true;
            self.connect();
          } else {
            self.publish('reconnect_failed');
            reset();
          }
        } else {
          if (self.reconnectionDelay < limit) {
            self.reconnectionDelay *= 2; // exponential back off
          }

          self.connect();
          self.publish('reconnecting', self.reconnectionDelay, self.reconnectionAttempts);
          self.reconnectionTimer = setTimeout(maybeReconnect, self.reconnectionDelay);
        }
      };

      this.options['try multiple transports'] = false;
      this.reconnectionTimer = setTimeout(maybeReconnect, this.reconnectionDelay);

      this.on('connect', maybeReconnect);
    };

  })(
    'undefined' != typeof io ? io : module.exports
    , 'undefined' != typeof io ? io : module.parent.exports
    , this
    );




  /**
   * socket.io
   * Copyright(c) 2017 Magic <730170034@qq.com>
   * MIT Licensed
   */

  (function (exports, io) {

    /**
     * Expose constructor.
     */

    exports.SocketNamespace = SocketNamespace;

    /**
     * Socket namespace constructor.
     *
     * @constructor
     * @api public
     */

    function SocketNamespace(socket, name) {
      this.socket = socket;
      this.name = name || '';
      this.flags = {};
      this.json = new Flag(this, 'json');
      this.ackPackets = 0;
      this.acks = {};
    };

    /**
     * Apply EventEmitter mixin.
     */

    io.util.mixin(SocketNamespace, io.EventEmitter);

    /**
     * Copies emit since we override it
     *
     * @api private
     */

    SocketNamespace.prototype.$emit = io.EventEmitter.prototype.emit;
    // SocketNamespace.prototype.$emit = false;

    /**
     * Creates a new namespace, by proxying the request to the socket. This
     * allows us to use the synax as we do on the server.
     *
     * @api public
     */

    SocketNamespace.prototype.of = function () {
      return this.socket.of.apply(this.socket, arguments);
    };

    /**
     * Sends a packet.
     *
     * @api private
     */

    SocketNamespace.prototype.packet = function (packet) {
      packet.endpoint = this.name;
      this.socket.packet(packet);
      this.flags = {};
      return this;
    };

    /**
     * Sends a message
     *
     * @api public
     */

    SocketNamespace.prototype.send = function (data, fn) {
      var packet = {
        type: this.flags.json ? 'json' : 'message'
        , data: data
      };

      if ('function' == typeof fn) {
        packet.id = ++this.ackPackets;
        packet.ack = true;
        this.acks[packet.id] = fn;
      }

      return this.packet(packet);
    };

    /**
     * Emits an event
     *
     * @api public
     */

    SocketNamespace.prototype.emit = function (name) {
      var args = Array.prototype.slice.call(arguments, 1)
        , lastArg = args[args.length - 1]
        , packet = {
          type: 'event'
          , name: name
        };

      if ('function' == typeof lastArg) {
        packet.id = ++this.ackPackets;
        packet.ack = 'data';
        this.acks[packet.id] = lastArg;
        args = args.slice(0, args.length - 1);
      }

      packet.args = args;

      return this.packet(packet);
    };

    /**
     * Disconnects the namespace
     *
     * @api private
     */

    SocketNamespace.prototype.disconnect = function () {
      if (this.name === '') {
        this.socket.disconnect();
      } else {
        this.packet({ type: 'disconnect' });
        this.$emit('disconnect');
      }

      return this;
    };

    /**
     * Handles a packet
     *
     * @api private
     */

    SocketNamespace.prototype.onPacket = function (packet) {
      var self = this;

      function ack() {
        self.packet({
          type: 'ack'
          , args: io.util.toArray(arguments)
          , ackId: packet.id
        });
      };

      switch (packet.type) {
        case 'connect':
          this.$emit('connect');
          break;

        case 'disconnect':
          if (this.name === '') {
            this.socket.onDisconnect(packet.reason || 'booted');
          } else {
            this.$emit('disconnect', packet.reason);
          }
          break;

        case 'message':
        case 'json':
          var params = ['message', packet.data];

          if (packet.ack == 'data') {
            params.push(ack);
          } else if (packet.ack) {
            this.packet({ type: 'ack', ackId: packet.id });
          }

          this.$emit.apply(this, params);
          break;

        case 'event':
          var params = [packet.name].concat(packet.args);

          if (packet.ack == 'data')
            params.push(ack);

          this.$emit.apply(this, params);
          break;

        case 'ack':
          if (this.acks[packet.ackId]) {
            this.acks[packet.ackId].apply(this, packet.args);
            delete this.acks[packet.ackId];
          }
          break;

        case 'error':
          if (packet.advice) {
            this.socket.onError(packet);
          } else {
            if (packet.reason == 'unauthorized') {
              this.$emit('connect_failed', packet.reason);
            } else {
              this.$emit('error', packet.reason);
            }
          }
          break;
      }
    };

    /**
     * Flag interface.
     *
     * @api private
     */

    function Flag(nsp, name) {
      this.namespace = nsp;
      this.name = name;
    };

    /**
     * Send a message
     *
     * @api public
     */

    Flag.prototype.send = function () {
      this.namespace.flags[this.name] = true;
      this.namespace.send.apply(this.namespace, arguments);
    };

    /**
     * Emit an event
     *
     * @api public
     */

    Flag.prototype.emit = function () {
      this.namespace.flags[this.name] = true;
      this.namespace.emit.apply(this.namespace, arguments);
    };

  })(
    'undefined' != typeof io ? io : module.exports
    , 'undefined' != typeof io ? io : module.parent.exports
    );


  /**
   * socket.io
   * Copyright(c) 2017 Magic <730170034@qq.com>
   * MIT Licensed
   */

  (function (exports, io) {

    /**
     * Expose constructor.
     */

    exports.Transport = Transport;

    /**
     * This is the transport template for all supported transport methods.
     *
     * @constructor
     * @api public
     */

    function Transport(socket, sessid) {
      this.socket = socket;
      this.sessid = sessid;
    };

    /**
     * Apply EventEmitter mixin.
     */

    io.util.mixin(Transport, io.EventEmitter);


    /**
     * Indicates whether heartbeats is enabled for this transport
     *
     * @api private
     */

    Transport.prototype.heartbeats = function () {
      return true;
    }

    /**
     * Handles the response from the server. When a new response is received
     * it will automatically update the timeout, decode the message and
     * forwards the response to the onMessage function for further processing.
     *
     * @param {String} data Response from the server.
     * @api private
     */

    Transport.prototype.onData = function (data) {
      this.clearCloseTimeout();

      // If the connection in currently open (or in a reopening state) reset the close
      // timeout since we have just received data. This check is necessary so
      // that we don't reset the timeout on an explicitly disconnected connection.
      if (this.socket.connected || this.socket.connecting || this.socket.reconnecting) {
        this.setCloseTimeout();
      }

      if (data !== '') {
        // todo: we should only do decodePayload for xhr transports
        var msgs = io.parser.decodePayload(data);

        if (msgs && msgs.length) {
          for (var i = 0, l = msgs.length; i < l; i++) {
            this.onPacket(msgs[i]);
          }
        }
      }

      return this;
    };

    /**
     * Handles packets.
     *
     * @api private
     */

    Transport.prototype.onPacket = function (packet) {
      this.socket.setHeartbeatTimeout();

      if (packet.type == 'heartbeat') {
        return this.onHeartbeat();
      }

      if (packet.type == 'connect' && packet.endpoint == '') {
        this.onConnect();
      }

      if (packet.type == 'error' && packet.advice == 'reconnect') {
        this.isOpen = false;
      }

      this.socket.onPacket(packet);

      return this;
    };

    /**
     * Sets close timeout
     *
     * @api private
     */

    Transport.prototype.setCloseTimeout = function () {
      if (!this.closeTimeout) {
        var self = this;

        this.closeTimeout = setTimeout(function () {
          self.onDisconnect();
        }, this.socket.closeTimeout);
      }
    };

    /**
     * Called when transport disconnects.
     *
     * @api private
     */

    Transport.prototype.onDisconnect = function () {
      if (this.isOpen) this.close();
      this.clearTimeouts();
      this.socket.onDisconnect();
      return this;
    };

    /**
     * Called when transport connects
     *
     * @api private
     */

    Transport.prototype.onConnect = function () {
      this.socket.onConnect();
      return this;
    }

    /**
     * Clears close timeout
     *
     * @api private
     */

    Transport.prototype.clearCloseTimeout = function () {
      if (this.closeTimeout) {
        clearTimeout(this.closeTimeout);
        this.closeTimeout = null;
      }
    };

    /**
     * Clear timeouts
     *
     * @api private
     */

    Transport.prototype.clearTimeouts = function () {
      this.clearCloseTimeout();

      if (this.reopenTimeout) {
        clearTimeout(this.reopenTimeout);
      }
    };

    /**
     * Sends a packet
     *
     * @param {Object} packet object.
     * @api private
     */

    Transport.prototype.packet = function (packet) {
      this.send(io.parser.encodePacket(packet));
    };

    /**
     * Send the received heartbeat message back to server. So the server
     * knows we are still connected.
     *
     * @param {String} heartbeat Heartbeat response from the server.
     * @api private
     */

    Transport.prototype.onHeartbeat = function (heartbeat) {
      this.packet({ type: 'heartbeat' });
    };

    /**
     * Called when the transport opens.
     *
     * @api private
     */

    Transport.prototype.onOpen = function () {
      this.isOpen = true;
      this.clearCloseTimeout();
      this.socket.onOpen();
    };

    /**
     * Notifies the base when the connection with the Socket.IO server
     * has been disconnected.
     *
     * @api private
     */

    Transport.prototype.onClose = function () {
      var self = this;

      /* FIXME: reopen delay causing a infinit loop
      this.reopenTimeout = setTimeout(function () {
        self.open();
      }, this.socket.options['reopen delay']);*/

      this.isOpen = false;
      this.socket.onClose();
      this.onDisconnect();
    };

    /**
     * Generates a connection url based on the Socket.IO URL Protocol.
     * See <https://github.com/learnboost/socket.io-node/> for more details.
     *
     * @returns {String} Connection url
     * @api private
     */

    Transport.prototype.prepareUrl = function () {
      var options = this.socket.options;

      return this.scheme() + '://'
        + options.host + ':' + options.port + '/'
        + options.resource + '/' + io.protocol
        + '/' + this.name + '/' + this.sessid;
    };

    /**
     * Checks if the transport is ready to start a connection.
     *
     * @param {Socket} socket The socket instance that needs a transport
     * @param {Function} fn The callback
     * @api private
     */

    Transport.prototype.ready = function (socket, fn) {
      fn.call(this);
    };
  })(
    'undefined' != typeof io ? io : module.exports
    , 'undefined' != typeof io ? io : module.parent.exports
    );



  /**
   * socket.io
   * Copyright(c) 2017 Magic <730170034@qq.com>
   * MIT Licensed
   */

  (function (exports, io, global) {

    /**
     * Expose constructor.
     */

    exports.websocket = WS;

    /**
     * The WebSocket transport uses the HTML5 WebSocket API to establish an
     * persistent connection with the Socket.IO server. This transport will also
     * be inherited by the FlashSocket fallback as it provides a API compatible
     * polyfill for the WebSockets.
     *
     * @constructor
     * @extends {io.Transport}
     * @api public
     */

    function WS(socket) {
      io.Transport.apply(this, arguments);
    };

    /**
     * Inherits from Transport.
     */

    io.util.inherit(WS, io.Transport);

    /**
     * Transport name
     *
     * @api public
     */

    WS.prototype.name = 'websocket';

    /**
     * Initializes a new `WebSocket` connection with the Socket.IO server. We attach
     * all the appropriate listeners to handle the responses from the server.
     *
     * @returns {Transport}
     * @api public
     */

    WS.prototype.open = function () {
      var query = io.util.query(this.socket.options.query)
        , self = this
        , Socket



      //微信Socket
      Socket = wx.connectSocket;


      //开始连接
      var url = this.prepareUrl() + query;
      this.websocket = new Socket({
        url: url,
        data: {
          x: '',
          y: ''
        },
        header: {
          'content-type': 'application/json'
        },
        protocols: ['protocol1'],
        method: "GET"
      });

      wx.onSocketOpen(function (res) {
        console.log('WebSocket连接已打开！')

        self.onOpen();
        self.socket.setBuffer(false);
      })

      wx.onSocketError(function (res) {
        console.log('WebSocket连接打开失败，请检查！')
      })



      wx.onSocketMessage(function (res) {
        console.log('收到服务器内容：' + res.data)
        self.onData(res.data);
      })

      this.websocket.send = function (res) {
        console.log("发送一次消息", res)
        wx.sendSocketMessage({
          data: res
        })
      };


      wx.onSocketClose(function (res) {
        self.onClose();
        self.socket.setBuffer(true);
        console.log('WebSocket 已关闭！')
      })

      this.websocket.close = function (res) {
        wx.closeSocket();
      }



      this.websocket.onopen = function () {
        self.onOpen();
        self.socket.setBuffer(false);
      };
      this.websocket.onmessage = function (ev) {
        self.onData(ev.data);
      };
      this.websocket.onclose = function () {
        self.onClose();
        self.socket.setBuffer(true);
      };
      this.websocket.onerror = function (e) {
        self.onError(e);
      };

      return this;
    };

    /**
     * Send a message to the Socket.IO server. The message will automatically be
     * encoded in the correct message format.
     *
     * @returns {Transport}
     * @api public
     */

    // Do to a bug in the current IDevices browser, we need to wrap the send in a
    // setTimeout, when they resume from sleeping the browser will crash if
    // we don't allow the browser time to detect the socket has been closed
    if (io.util.ua.iDevice) {
      WS.prototype.send = function (data) {
        var self = this;
        setTimeout(function () {
          self.websocket.send(data);
        }, 0);
        return this;
      };
    } else {
      WS.prototype.send = function (data) {
        this.websocket.send(data);
        return this;
      };
    }

    /**
     * Payload
     *
     * @api private
     */

    WS.prototype.payload = function (arr) {
      for (var i = 0, l = arr.length; i < l; i++) {
        this.packet(arr[i]);
      }
      return this;
    };

    /**
     * Disconnect the established `WebSocket` connection.
     *
     * @returns {Transport}
     * @api public
     */

    WS.prototype.close = function () {
      this.websocket.close();
      return this;
    };

    /**
     * Handle the errors that `WebSocket` might be giving when we
     * are attempting to connect or send messages.
     *
     * @param {Error} e The error.
     * @api private
     */

    WS.prototype.onError = function (e) {
      this.socket.onError(e);
    };

    /**
     * Returns the appropriate scheme for the URI generation.
     *
     * @api private
     */
    WS.prototype.scheme = function () {
      return this.socket.options.secure ? 'wss' : 'wss';
    };

    /**
     * Checks if the browser has support for native `WebSockets` and that
     * it's not the polyfill created for the FlashSocket transport.
     *
     * @return {Boolean}
     * @api public
     */

    WS.check = function () {
      return ('WebSocket' in global && !('__addTask' in WebSocket))
        || 'MozWebSocket' in global;
    };

    /**
     * Check if the `WebSocket` transport support cross domain communications.
     *
     * @returns {Boolean}
     * @api public
     */

    WS.xdomainCheck = function () {
      return true;
    };

    /**
     * Add the transport to your public io.transports array.
     *
     * @api private
     */

    io.transports.push('websocket');

  })(
    'undefined' != typeof io ? io.Transport : module.exports
    , 'undefined' != typeof io ? io : module.parent.exports
    , this
    );



  /**
   * socket.io
   * Copyright(c) 2017 Magic <730170034@qq.com>
   * MIT Licensed
   */

  (function (exports, io) {
    console.log('9999', exports, 'lllll', io, '000000');
    /**
     * Parser namespace.
     *
     * @namespace
     */

    var parser = exports.parser = {};

    /**
     * Packet types.
     */

    var packets = parser.packets = [
      'disconnect'
      , 'connect'
      , 'heartbeat'
      , 'message'
      , 'json'
      , 'event'
      , 'ack'
      , 'error'
      , 'noop'
    ];

    /**
     * Errors reasons.
     */

    var reasons = parser.reasons = [
      'transport not supported'
      , 'client not handshaken'
      , 'unauthorized'
    ];

    /**
     * Errors advice.
     */

    var advice = parser.advice = [
      'reconnect'
    ];

    /**
     * Shortcuts.
     */

    var JSON = io.JSON
      , indexOf = io.util.indexOf;

    /**
     * Encodes a packet.
     *
     * @api private
     */

    parser.encodePacket = function (packet) {
      var type = indexOf(packets, packet.type)
        , id = packet.id || ''
        , endpoint = packet.endpoint || ''
        , ack = packet.ack
        , data = null;

      switch (packet.type) {
        case 'error':
          var reason = packet.reason ? indexOf(reasons, packet.reason) : ''
            , adv = packet.advice ? indexOf(advice, packet.advice) : '';

          if (reason !== '' || adv !== '')
            data = reason + (adv !== '' ? ('+' + adv) : '');

          break;

        case 'message':
          if (packet.data !== '')
            data = packet.data;
          break;

        case 'event':
          var ev = { name: packet.name };

          if (packet.args && packet.args.length) {
            ev.args = packet.args;
          }

          data = JSON.stringify(ev);
          break;

        case 'json':
          data = JSON.stringify(packet.data);
          break;

        case 'connect':
          if (packet.qs)
            data = packet.qs;
          break;

        case 'ack':
          data = packet.ackId
            + (packet.args && packet.args.length
              ? '+' + JSON.stringify(packet.args) : '');
          break;
      }

      // construct packet with required fragments
      var encoded = [
        type
        , id + (ack == 'data' ? '+' : '')
        , endpoint
      ];

      // data fragment is optional
      if (data !== null && data !== undefined)
        encoded.push(data);

      return encoded.join(':');
    };

    /**
     * Encodes multiple messages (payload).
     *
     * @param {Array} messages
     * @api private
     */

    parser.encodePayload = function (packets) {
      var decoded = '';

      if (packets.length == 1)
        return packets[0];

      for (var i = 0, l = packets.length; i < l; i++) {
        var packet = packets[i];
        decoded += '\ufffd' + packet.length + '\ufffd' + packets[i];
      }

      return decoded;
    };

    /**
     * Decodes a packet
     *
     * @api private
     */

    var regexp = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;

    parser.decodePacket = function (data) {
      var pieces = data.match(regexp);

      if (!pieces) return {};

      var id = pieces[2] || ''
        , data = pieces[5] || ''
        , packet = {
          type: packets[pieces[1]]
          , endpoint: pieces[4] || ''
        };

      // whether we need to acknowledge the packet
      if (id) {
        packet.id = id;
        if (pieces[3])
          packet.ack = 'data';
        else
          packet.ack = true;
      }

      // handle different packet types
      switch (packet.type) {
        case 'error':
          var pieces = data.split('+');
          packet.reason = reasons[pieces[0]] || '';
          packet.advice = advice[pieces[1]] || '';
          break;

        case 'message':
          packet.data = data || '';
          break;

        case 'event':
          try {
            var opts = JSON.parse(data);
            packet.name = opts.name;
            packet.args = opts.args;
          } catch (e) { }

          packet.args = packet.args || [];
          break;

        case 'json':
          try {
            packet.data = JSON.parse(data);
          } catch (e) { }
          break;

        case 'connect':
          packet.qs = data || '';
          break;

        case 'ack':
          var pieces = data.match(/^([0-9]+)(\+)?(.*)/);
          if (pieces) {
            packet.ackId = pieces[1];
            packet.args = [];

            if (pieces[3]) {
              try {
                packet.args = pieces[3] ? JSON.parse(pieces[3]) : [];
              } catch (e) { }
            }
          }
          break;

        case 'disconnect':
        case 'heartbeat':
          break;
      };

      return packet;
    };

    /**
     * Decodes data payload. Detects multiple messages
     *
     * @return {Array} messages
     * @api public
     */

    parser.decodePayload = function (data) {
      // IE doesn't like data[i] for unicode chars, charAt works fine
      if (data.charAt(0) == '\ufffd') {
        var ret = [];

        for (var i = 1, length = ''; i < data.length; i++) {
          if (data.charAt(i) == '\ufffd') {
            ret.push(parser.decodePacket(data.substr(i + 1).substr(0, length)));
            i += Number(length) + 1;
            length = '';
          } else {
            length += data.charAt(i);
          }
        }

        return ret;
      } else {
        return [parser.decodePacket(data)];
      }
    };

  })(
    'undefined' != typeof io ? io : module.exports
    , 'undefined' != typeof io ? io : module.parent.exports
    );



  /**
   * socket.io
   * Copyright(c) 2017 Magic <730170034@qq.com>
   * MIT Licensed
   */



  /**
 * 初始化时需要调用这个函数。可以从BmobSocketIo中获取所需的key
 *
 * @param {String} applicationId 你的 Application ID.
 * @param {String} masterKey (optional) 你的 BmobSocketIo Master Key.
 */
  BmobSocketIo.initialize = function (applicationId) {
    if (!applicationId) {
      throw "BmobSocketIo.initialize() need a applicationId";
    }
    BmobSocketIo._initialize(applicationId);
  };

  BmobSocketIo.serverURL = "wss://wss.bmob.cn/";

  BmobSocketIo.obj = null;

  BmobSocketIo.init = function (applicationId) {
    //sockeit obj
    BmobSocketIo.obj = io.connect(BmobSocketIo.serverURL);

    //监听服务器的响应
    BmobSocketIo.obj.on("server_pub", function (resp) {

      var data = JSON.parse(resp);

      switch (data.action) {
        case "updateTable":
          BmobSocketIo.onUpdateTable(data.tableName, data.data);
          break;
        case "updateRow":
          BmobSocketIo.onUpdateRow(data.tableName, data.objectId, data.data);
          break;
        case "deleteTable":
          BmobSocketIo.onDeleteTable(data.tableName, data.data);
          break;
        case "deleteRow":
          BmobSocketIo.onDeleteRow(data.tableName, data.objectId, data.data);
          break;
      }
    });

    // //连接上socket.io服务器后触发的事件
    BmobSocketIo.obj.on("client_send_data", function (resp) {
      io.BmobSocketIo.onInitListen();
    });



    BmobSocketIo.obj.on("disconnect", function() {
      console.log("You have disconnected from the server")
    })

  };


  /**
   * Call this method first to set up authentication tokens for BmobSocketIo.
   * This method is for BmobSocketIo's own private use.
   * @param {String} applicationId Your BmobSocketIo Application ID
   */
  BmobSocketIo._initialize = function (applicationId) {
    BmobSocketIo.applicationId = applicationId;

    // //sockeit obj
    // BmobSocketIo.obj = io.connect(BmobSocketIo.serverURL);

    // //监听服务器的响应
    // BmobSocketIo.obj.on("server_pub", function (resp) {

    //   var data = JSON.parse(resp);

    //   switch (data.action) {
    //     case "updateTable":
    //       BmobSocketIo.onUpdateTable(data.tableName, data.data);
    //       break;
    //     case "updateRow":
    //       BmobSocketIo.onUpdateRow(data.tableName, data.objectId, data.data);
    //       break;
    //     case "deleteTable":
    //       BmobSocketIo.onDeleteTable(data.tableName, data.data);
    //       break;
    //     case "deleteRow":
    //       BmobSocketIo.onDeleteRow(data.tableName, data.objectId, data.data);
    //       break;
    //   }
    // });

    // // //连接上socket.io服务器后触发的事件
    // BmobSocketIo.obj.on("client_send_data", function (resp) {
    //   io.BmobSocketIo.onInitListen();
    // });

  };



  //"unsub_updateTable" ,"unsub_updateRow", "unsub_deleteTable", "unsub_deleteRow"
  //订阅更新数据表的数据
  BmobSocketIo.updateTable = function (tablename) {

    var data = { "appKey": BmobSocketIo.applicationId, "tableName": tablename, "objectId": "", "action": "updateTable" };
    BmobSocketIo.obj.emit("client_sub", JSON.stringify(data));

  };

  //取消订阅更新数据表的数据
  BmobSocketIo.unsubUpdateTable = function (tablename) {

    var data = { "appKey": BmobSocketIo.applicationId, "tableName": tablename, "objectId": "", "action": "unsub_updateTable" };
    BmobSocketIo.obj.emit("client_unsub", JSON.stringify(data));

  };


  //订阅行更新的数据
  BmobSocketIo.updateRow = function (tablename, objectId) {

    var data = { "appKey": BmobSocketIo.applicationId, "tableName": tablename, "objectId": objectId, "action": "updateRow" };
    BmobSocketIo.obj.emit("client_sub", JSON.stringify(data));

  };


  //取消订阅行更新的数据
  BmobSocketIo.unsubUpdateRow = function (tablename, objectId) {

    var data = { "appKey": BmobSocketIo.applicationId, "tableName": tablename, "objectId": objectId, "action": "unsub_updateRow" };
    BmobSocketIo.obj.emit("client_unsub", JSON.stringify(data));

  };

  //订阅表删除的数据
  BmobSocketIo.deleteTable = function (tablename) {

    var data = { "appKey": BmobSocketIo.applicationId, "tableName": tablename, "objectId": "", "action": "deleteTable" };
    BmobSocketIo.obj.emit("client_sub", JSON.stringify(data));

  };

  //取消订阅表删除的数据
  BmobSocketIo.unsubDeleteTable = function (tablename) {

    var data = { "appKey": BmobSocketIo.applicationId, "tableName": tablename, "objectId": "", "action": "unsub_deleteTable" };
    BmobSocketIo.obj.emit("client_unsub", JSON.stringify(data));

  };

  //订阅更新数据表的数据
  BmobSocketIo.deleteRow = function (tablename, objectId) {

    var data = { "appKey": BmobSocketIo.applicationId, "tableName": tablename, "objectId": objectId, "action": "deleteRow" };
    BmobSocketIo.obj.emit("client_sub", JSON.stringify(data));

  };

  //订阅更新数据表的数据
  BmobSocketIo.unsubDeleteRow = function (tablename, objectId) {

    var data = { "appKey": BmobSocketIo.applicationId, "tableName": tablename, "objectId": objectId, "action": "unsub_deleteRow" };
    BmobSocketIo.obj.emit("client_unsub", JSON.stringify(data));

  };



  //监听服务器返回的更新数据表的数据，需要用户重写
  BmobSocketIo.onUpdateTable = function (tablename, data) {

  };

  //监听服务器返回的更新数据表的数据，需要用户重写
  BmobSocketIo.onUpdateRow = function (tablename, objectId, data) {

  };

  //监听服务器返回的更新数据表的数据，需要用户重写
  BmobSocketIo.onDeleteTable = function (tablename, data) {

  };

  //监听服务器返回的更新数据表的数据，需要用户重写
  BmobSocketIo.onDeleteRow = function (tablename, objectId, data) {

  };

  //初始连接socket.io服务器后，需要监听的事件都写在这个函数内，
  //注意，必须要把监听的数据写在这个函数内，
  //当浏览器因意外断网后，服务器上的订阅事件会取消，js脚本会重新连接服务器，写在这个函数内的订阅事件会重新在服务器上订阅
  BmobSocketIo.onInitListen = function () {

  };

}.call(this));