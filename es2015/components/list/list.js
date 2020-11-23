import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { DomController } from '../../platform/dom-controller';
import { GestureController } from '../../gestures/gesture-controller';
import { Ion } from '../ion';
import { isTrueProperty } from '../../util/util';
import { ItemSlidingGesture } from '../item/item-sliding-gesture';
import { Platform } from '../../platform/platform';
/**
 * The List is a widely used interface element in almost any mobile app,
 * and can include content ranging from basic text all the way to
 * buttons, toggles, icons, and thumbnails.
 *
 * Both the list, which contains items, and the list items themselves
 * can be any HTML element.
 *
 * Using the List and Item components make it easy to support various
 * interaction modes such as swipe to edit, drag to reorder, and
 * removing items.
 *
 * @demo /docs/demos/src/list/
 * @see {@link /docs/components#lists List Component Docs}
 * @advanced
 *
 * Enable the sliding items.
 *
 * ```ts
 * import { Component, ViewChild } from '@angular/core';
 * import { List } from 'ionic-angular';
 *
 * @Component({...})
 * export class MyClass {
 *   @ViewChild(List) list: List;
 *
 *   constructor() { }
 *
 *   stopSliding() {
 *     this.list.enableSlidingItems(false);
 *   }
 * }
 * ```
 *
 */
export class List extends Ion {
    constructor(config, elementRef, renderer, _plt, _gestureCtrl, _domCtrl) {
        super(config, elementRef, renderer, 'list');
        this._plt = _plt;
        this._gestureCtrl = _gestureCtrl;
        this._domCtrl = _domCtrl;
        this._enableSliding = true;
        this._containsSlidingItems = false;
    }
    /**
     * @input {boolean} If true, the sliding items will be enabled.
     */
    get sliding() {
        return this._enableSliding;
    }
    set sliding(val) {
        this._enableSliding = isTrueProperty(val);
        this._updateSlidingState();
    }
    /**
     * @hidden
     */
    containsSlidingItem(contains) {
        this._containsSlidingItems = contains;
        this._updateSlidingState();
    }
    _updateSlidingState() {
        let shouldSlide = this._enableSliding && this._containsSlidingItems;
        if (!shouldSlide) {
            this._slidingGesture && this._slidingGesture.destroy();
            this._slidingGesture = null;
        }
        else if (!this._slidingGesture) {
            (void 0) /* console.debug */;
            this._slidingGesture = new ItemSlidingGesture(this._plt, this, this._gestureCtrl, this._domCtrl);
            this._slidingGesture.listen();
        }
    }
    /**
     * Close any sliding items that are open.
     */
    closeSlidingItems() {
        this._slidingGesture && this._slidingGesture.closeOpened();
    }
    /**
     * @hidden
     */
    destroy() {
        this._slidingGesture && this._slidingGesture.destroy();
    }
}
List.decorators = [
    { type: Directive, args: [{
                selector: 'ion-list',
            },] },
];
/** @nocollapse */
List.ctorParameters = () => [
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
    { type: Platform, },
    { type: GestureController, },
    { type: DomController, },
];
List.propDecorators = {
    'sliding': [{ type: Input },],
};
//# sourceMappingURL=list.js.map