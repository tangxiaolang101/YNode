/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var Y = require('../Y');

/**
 * 应用基类
 */
class Application {
    
    /**
     * constructor
     *
     * @param JSON config 配置信息
     */
    constructor(config) {
        /**
         * @var JSON 自定义路由配置
         *
         * 'routes': {
         *     // 注意正则需转义
         *     // 把下面这个模式 路由到 user 目录下的 IndexController 并有两个参数 id uid
         *     '/show/(\\d+)/(\\d+)': {
         *         'prefix': 'user',
         *         'controllerId': 'index',
         *         'params': {
         *             'key': ['id', 'uid'],
         *             'segment': [1, 2]
         *         }
         *     }
         * }
         */
        this.routes = null;
        
        /**
         * @var JSON 注册的模块
         *
         * 'modules': {
         *     'bbs': 'app/modules/bbs'
         * }
         */
        this.modules = null;
        
        /**
         * @var String 默认路由
         */
        this.defaultRoute = 'index/index';
        
        /**
         * @var String 默认控制器命名空间
         */
        this.defaultControllerNamespace = 'app/controllers';
        
        /**
         * @var String 默认控制器
         */
        this.defaultControllerId = 'index';
        
        /**
         * @var String 当前的模块
         */
        this.moduleId = '';
        
        /**
         * @var String 当前的控制器
         */
        this.controllerId = '';
        
        /**
         * @var String 前缀目录
         */
        this.routePrefix = '';
        
        /**
         * @var String 文件扩展名
         */
        this.fileExtention = '.js';
        
        /**
         * @var Boolean 调试
         */
        this.debug = false;
        
        /**
         * mime type
         *
         * {'html': 'text/html', ...}
         */
        this.mime = null;
        
        Y.app = this;
        this.init(config);
        Y.config(this, config);
    }
    
    /**
     * 初始化应用
     *
     * @param Array config 应用配置
     * @throws ReferenceError 当丢失必要配置项目时
     */
    init(config) {
        if(undefined === config.id) {
            throw new ReferenceError('The "id" configuration is required');
        }
        
        if(undefined !== config.appPath) {
            this.setAppPath(config.appPath);
            delete config.appPath;
            
        } else {
            throw new ReferenceError('The "appPath" configuration is required');
        }
        
        if(undefined !== config.runtimePath) {
            this.setRuntimePath(config.runtimePath);
            delete config.runtimePath;
            
        } else {
            // set "app/runtime"
            this.setRuntimePath( this.getAppPath() + '/runtime');
        }
        
        if(undefined !== config.rootPath) {
            this.setRootPath(config.rootPath);
            delete config.rootPath;
            
        } else {
            this.setRootPath(process.env.pwd);
        }
    }
    
    /**
     * 设置应用路径
     *
     * @param String path 应用路径
     */
    setAppPath(path) {
        Y.setPathAlias('@app', path);
    }
    
    /**
     * 得到应用目录
     *
     * @return String 路径
     */
    getAppPath(){
        return Y.getPathAlias('@app');
    }
    
    /**
     * 设置 runtime 路径
     *
     * @param String path 路径
     */
    setRuntimePath(path) {
        Y.setPathAlias('@runtime', path);
    }
    
    /**
     * 得到 runtime 目录
     *
     * @return String 路径
     */
    getRuntimePath() {
        return Y.getPathAlias('@runtime');
    }
    
    /**
     * 设置 root 路径
     *
     * @param String path 路径
     */
    setRootPath(path) {
        Y.setPathAlias('@root', path);
    }
    
    /**
     * 得到 root 目录
     *
     * @return String 路径
     */
    getRootPath() {
        return Y.getPathAlias('@root');
    }
    
    /**
     * handler request
     *
     * @param Object request
     * @param Object response
     */
    requestListener(request, response) {}
    
    /**
     * 创建控制器
     * 路由 'xxx/yyy' 中 xxx 可能为模块 id 或前缀目录  
     * 如 xxx 模块的 yyy 控制器 或 xxx 目录下的 yyy 控制器
     *
     * @param Object request
     * @return Object 控制器
     */
    createController(request) {}
}

module.exports = Application;
