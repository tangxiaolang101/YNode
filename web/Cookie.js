/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

/**
 * 一条 HTTP cookie 信息
 *
 * name=value; Expires=expires; Path=path; Domain=domain[; secure][; httponly]
 */
class Cookie {
    
    /**
     * constructor
     *
     * @param String name cookie name
     * @param String value cookie value
     * @param Integer expires cookie expires milliseconds
     * @param String path cookie path
     * @param String domain cookie domain
     * @param Boolean secure cookie secure
     * @param Boolean httpOnly cookie httpOnly
     */
    constructor(name, value, expires, path, domain, secure, httpOnly) {
        this.name = name;
        this.value = value;
        this.expires = undefined === expires ? 0 : expires;
        this.path = undefined === path ? '/' : path;
        this.domain = undefined === domain ? '' : domain;
        this.secure = undefined === secure ? false : secure;
        this.httpOnly = undefined === httpOnly ? false : httpOnly;
    }
    
    toString() {
        var ret = [this.name + '=' + this.value];
        
        if(0 !== this.expires) {
            ret.push('Expires=' + new Date(this.expires).toUTCString());
        }
        ret.push('Path=' + this.path);
        if('' !== this.domain) {
            ret.push('Domain=' + this.domain);
        }
        if(this.secure) {
            ret.push('Secure');
        }
        if(this.httpOnly) {
            ret.push('HttpOnly');
        }
        
        return ret.join('; ');
    }
    
}

module.exports = Cookie;
