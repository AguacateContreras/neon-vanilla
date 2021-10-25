import Widget from "./widget.js";

const image = "https://images.wsj.net/im-140539?width=1280&size=1.77777778";

class MyWidget extends Widget {
    constructor ( config ) {
        const init = {
            HTML:   `<div>
                        <h2>${ config.title || "" }</h2>
                        <p>${ config.contents || "" }</p>
                        <button class="hide-show">Hide</button>
                        <button class="enable-disable">Disable</button>
                        <button class="destroy">Destroy!</button>
                    </div>`,
            className: "my-widget"
        };
        super(Object.assign(config || {}, init));
        this.activate();
        this.bindEvents();
    }
    bindEvents () {
        const hideShowButton = this.element.querySelector(".hide-show");
        hideShowButton.addEventListener('click', () => {
            if (this.active) {
                this.deactivate();
                hideShowButton.innerHTML = "Show";
                return;
            }
            hideShowButton.innerHTML = "Hide";
            this.activate();
        });
        const enableDisable = this.element.querySelector(".enable-disable");
        enableDisable.addEventListener('click', () => {
            if (this.disabled) {
                this.enable();
                enableDisable.innerHTML = "Disable";
                return;
            }
            enableDisable.innerHTML = "Enable";
            this.disable();
        });
        const destroyButton = this.element.querySelector('.destroy');
        destroyButton.addEventListener('click', ()=>{
            this.destroy();
        })
    }
}
var w = new MyWidget({
    title: "Hello!",
    contents: `<img src="${image}">`
});

w.render( document.body );