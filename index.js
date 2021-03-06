'use strict';

var http = require('http');

var Y = require('./Y');
var WebApp = require('./web/Application');

var Logger = require('./log/Logger');
var Cookie = require('./web/Cookie');
var WebRequest = require('./web/Request');
var WebResponse = require('./web/Response');
var WebController = require('./web/Controller');

/**
 * 入口
 */
class YNode {
    
    /**
     * constructor
     *
     * @param JSON config 配置信息
     */
    constructor(config) {
        if(undefined === config) {
            throw new TypeError('The app config is required');
        }
        
        this.server = null;
        this.app = new WebApp(config);
    }
    
    // 中间层
    requestListener(req, res) {
        try {
            this.app.requestListener(req, res);
            
        } catch(e) {
            res.setHeader('Content-Type', 'text/plain');
            res.writeHead(500);
            res.end(Y.app.debug ? e.message : 'The server encountered an internal error');
        }
    }
    
    /**
     * listen
     *
     * @param int port
     * @param Function callback
     */
    listen(port, callback) {
        this.server = http.createServer(this.requestListener.bind(this));
        this.server.listen(port, callback);
        
        return this.server;
    }
    
}

/**
 * handler
 */
YNode.Y = Y;

/**
 * Logger
 */
YNode.Logger = Logger;

/**
 * Cookie
 */
YNode.Cookie = Cookie;

/**
 * Web request
 */
YNode.WebRequest = WebRequest;

/**
 * Web response
 */
YNode.WebResponse = WebResponse;

/**
 * WebController handler
 */
YNode.WebController = WebController;

module.exports = YNode;
