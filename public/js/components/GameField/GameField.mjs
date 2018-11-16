'use strict';

import "/js/components/GameField/GameField.tmpl.js"

export default class GameFieldComponent {
    constructor({ el = document.body } = {}) {
        this._el = el;
    }

    render() {
        const data = null;
        const template = window.fest['js/components/GameField/GameField.tmpl'](data);
        let div = document.createElement('div');
        div.innerHTML = template;
        this._el.appendChild(div.firstChild);

        document.getElementById("gamefield_back_btn").addEventListener("click", (event) => {
            event.preventDefault();
            // Закончить игру
            // window.bus.publish("destroy-game");
            window.bus.publish("draw-menu");
        });
    }

    drawLoading() {

    }

    drawField() {

    }
}