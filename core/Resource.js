/**
 * 资源
 */
'use strict';

var url = require('url');
var path = require('path');

class Resource {
    
    /**
     * 是否是静态资源
     *
     * @param String pathName 访问路径
     */
    static isStatic(pathName) {
        var ret = false;
        var ext = path.extname(pathName);
        for(let key in Resource.Mime) {
            if(ext === '.' + key) {
                ret = true;
                break;
            }
        }
        
        return ret;
    }
    
    /**
     * 处理静态资源
     *
     * @param Object request
     * @param Object response
     */
    static handler(request, response) {}
    
}

/**
 * MimeType
 */
Resource.Mime = {
    'js': 'text/javascript'
    ,'css': 'text/css'
    ,'html': 'text/html'
    ,'htm': 'text/html'

    ,'ico': 'image/x-icon'
    ,'gif': 'image/gif'
    ,'png': 'image/png'
    ,'jpg': 'image/jpeg'
    ,'jpeg': 'image/jpeg'

    ,'svg': 'image/svg+xml'
    ,'tiff': 'image/tiff'

    ,'swf': 'application/x-shockwave-flash'
    ,'wav': 'audio/x-wav'
    ,'wma': 'audio/x-ms-wma'
    ,'wmv': 'video/x-ms-wmv'
    ,'mp3': 'audio/mpeg'
    ,'mp4': 'video/mp4'
    ,'mpeg': 'video/mpeg'
    ,'avi': 'video/x-msvideo'
};

module.exports = Resource;