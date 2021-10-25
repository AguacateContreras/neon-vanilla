import Neon from './neon.js'
import CustomEventSupport from './custom_event_support.js'
import NodeSupport from './node_support.js'

export default class Widget extends new Neon({ includes: [CustomEventSupport, NodeSupport] }).use() {
    HTML = "<div></div>";
    ELEMENT_CLASS = 'widget';
    active = false;
    disabled = false;
    #destroyed = false;
    constructor ( config ) {
        super();
        this.HTML = config.HTML;
        Object.keys( config || {}).forEach( propertyName => {
            this[propertyName] = config[propertyName];
        });
        if( this.element == null ) {
            this.template = document.createElement("template");
            this.template.innerHTML = this.HTML.replace(/\s\s+/g, '');
            this.element = this.template.content.childNodes[0];
            this.element.classList.add(this.ELEMENT_CLASS);
        }
        if (this.hasOwnProperty('className') === true) {
            this.element.classList.add(this.className);
        }
    }
    #activate () {
        this.active = true;
        this.element.classList.add('active');
    }
    activate () {
        if ( this.#destroyed === true ) {
            console.warn('calling on destroyed object');
        }
        this.dispatch('beforeActivate');
        this.#activate();
        this.dispatch('activate');
        return this;
    }
    #deactivate () {
        this.active = false;
        this.element.classList.remove('active');
    }
    deactivate () {
        if ( this.#destroyed === true ) {
            console.warn('calling on destroyed object');
        }
        this.dispatch('beforeDeactivate');
        this.#deactivate();
        this.dispatch('deactivate');
        return this;
    }
    #enable () {
        this.disabled = false;
        this.element.classList.remove('disable');
    }
    enable () {
        if ( this.#destroyed === true ) {
            console.warn('calling on destroyed object');
        }
        this.dispatch('beforeEnable');
        this.#enable();
        this.dispatch('enable');
        return this;
    }
    #disable () {
        this.disabled = true;
        this.element.classList.add('disable');
    }
    disable () {
        if ( this.#destroyed === true ) {
            console.warn('calling on destroyed object');
        }
        this.dispatch('beforeDisable');
        this.#disable();
        this.dispatch('disable');
        return this;
    }
    #destroy () {
        let childrenLength;
        if (this.element) {
            this.element.parentNode.removeChild(this.element);
        }
        if (this.children != null ) {
            childrenLength = this.children.length;
            while (childrenLength > 0) {
                this.children[0].destroy();
                if (this.children.length === childrenLength) {
                    this.children.shift();
                }
                childrenLength--;
            }
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.children   = null;
        this.element    = null;
    }
    destroy () {
        if (this.#destroyed === true) {
            console.warn('calling on destroyed object');
        }
        this.dispatch('beforeDestroy');
        this.#destroy();
        this.dispatch('destroy');
        this.eventListeners = null;
        this.#destroyed     = true;
        return null;
    }
    render ( element, beforeElement ) {
        if (this.__destroyed === true) {
            console.warn('calling on destroyed object');
        }
        this.dispatch('beforeRender', {
            element : element,
            beforeElement : beforeElement
        });
        if (beforeElement) {
            beforeElement.insertBefore(this.template.content);
        } else {
            element.appendChild( this.template.content )
        }
        this.dispatch('render');
        return this;
    }
};