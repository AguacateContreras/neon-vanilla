/*
    Important: This module is not based on Neon,
    it only helps us to be able to do multiple extends.
    It has a lot of room for improvement, feel free to modify it.
*/

export default class Neon  {
    constructor ( config ) {
        this.NeonOutputClass = class {};
        if( config.includes ) {
            this.includes = config.includes;
            this.#performIncludes();
        }
    }
    #performIncludes () {
        this.includes.forEach( Class => this.#addToClass(Class) );
    }
    #addToClass ( Class ) {
        Object.getOwnPropertyNames(Class.prototype).forEach( method => {
            if (method === "constructor") {
                return;
            }
            this.NeonOutputClass.prototype[method] = Class.prototype[method];
        } );
    }
    use () {
        return this.NeonOutputClass;
    }
}
