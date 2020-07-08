import { forEachValue } from '../util';

export default class Module {
  constructor (rawModule) {
    this._rawModule = rawModule || {};
    this._children = rawModule.modules || {};
    this.state = rawModule.state || {};
    this.namespaced = !!rawModule.namespaced;
  }

  getChild (key) {
    /**
     * @desc 得到一个模块的子模块
     * @param { String } key - key值
     */
    return this._children[key];
  }

  forEachChild (fn) {
    forEachValue(this._children, (value, key) => {
      fn(value, key);
    });
  }

  forEachGetter (fn) {
    if(this._rawModule.getters) {
      forEachValue(this._rawModule.getters, fn);
    }
  }

  forEachMutation (fn) {
    if(this._rawModule.mutations) {
      forEachValue(this._rawModule.mutations, fn);
    }
  }

  forEachAction (fn) {
    if(this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn);
    }
  }
}