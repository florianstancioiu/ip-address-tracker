'use strict';

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = globalThis,
  i = t.trustedTypes,
  s = i
    ? i.createPolicy('lit-html', {
        createHTML: (t) => t,
      })
    : void 0,
  e = '$lit$',
  h = `lit$${Math.random().toFixed(9).slice(2)}$`,
  o = '?' + h,
  n = `<${o}>`,
  r = document,
  l = () => r.createComment(''),
  c = (t) => null === t || ('object' != typeof t && 'function' != typeof t),
  a = Array.isArray,
  u = (t) => a(t) || 'function' == typeof t?.[Symbol.iterator],
  d = '[ \t\n\f\r]',
  f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  v = /-->/g,
  _ = />/g,
  m = RegExp(
    `>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,
    'g'
  ),
  p = /'/g,
  g = /"/g,
  $ = /^(?:script|style|textarea|title)$/i,
  y =
    (t) =>
    (i, ...s) => ({
      _$litType$: t,
      strings: i,
      values: s,
    }),
  x = y(1),
  w = Symbol.for('lit-noChange'),
  T = Symbol.for('lit-nothing'),
  A = new WeakMap(),
  E = r.createTreeWalker(r, 129);
function C(t, i) {
  if (!Array.isArray(t) || !t.hasOwnProperty('raw'))
    throw Error('invalid template strings array');
  return void 0 !== s ? s.createHTML(i) : i;
}
const P = (t, i) => {
  const s = t.length - 1,
    o = [];
  let r,
    l = 2 === i ? '<svg>' : '',
    c = f;
  for (let i = 0; i < s; i++) {
    const s = t[i];
    let a,
      u,
      d = -1,
      y = 0;
    for (; y < s.length && ((c.lastIndex = y), (u = c.exec(s)), null !== u); )
      (y = c.lastIndex),
        c === f
          ? '!--' === u[1]
            ? (c = v)
            : void 0 !== u[1]
            ? (c = _)
            : void 0 !== u[2]
            ? ($.test(u[2]) && (r = RegExp('</' + u[2], 'g')), (c = m))
            : void 0 !== u[3] && (c = m)
          : c === m
          ? '>' === u[0]
            ? ((c = r ?? f), (d = -1))
            : void 0 === u[1]
            ? (d = -2)
            : ((d = c.lastIndex - u[2].length),
              (a = u[1]),
              (c = void 0 === u[3] ? m : '"' === u[3] ? g : p))
          : c === g || c === p
          ? (c = m)
          : c === v || c === _
          ? (c = f)
          : ((c = m), (r = void 0));
    const x = c === m && t[i + 1].startsWith('/>') ? ' ' : '';
    l +=
      c === f
        ? s + n
        : d >= 0
        ? (o.push(a), s.slice(0, d) + e + s.slice(d) + h + x)
        : s + h + (-2 === d ? i : x);
  }
  return [C(t, l + (t[s] || '<?>') + (2 === i ? '</svg>' : '')), o];
};
class V {
  constructor({ strings: t, _$litType$: s }, n) {
    let r;
    this.parts = [];
    let c = 0,
      a = 0;
    const u = t.length - 1,
      d = this.parts,
      [f, v] = P(t, s);
    if (
      ((this.el = V.createElement(f, n)),
      (E.currentNode = this.el.content),
      2 === s)
    ) {
      const t = this.el.content.firstChild;
      t.replaceWith(...t.childNodes);
    }
    for (; null !== (r = E.nextNode()) && d.length < u; ) {
      if (1 === r.nodeType) {
        if (r.hasAttributes())
          for (const t of r.getAttributeNames())
            if (t.endsWith(e)) {
              const i = v[a++],
                s = r.getAttribute(t).split(h),
                e = /([.?@])?(.*)/.exec(i);
              d.push({
                type: 1,
                index: c,
                name: e[2],
                strings: s,
                ctor:
                  '.' === e[1] ? k : '?' === e[1] ? H : '@' === e[1] ? I : R,
              }),
                r.removeAttribute(t);
            } else
              t.startsWith(h) &&
                (d.push({
                  type: 6,
                  index: c,
                }),
                r.removeAttribute(t));
        if ($.test(r.tagName)) {
          const t = r.textContent.split(h),
            s = t.length - 1;
          if (s > 0) {
            r.textContent = i ? i.emptyScript : '';
            for (let i = 0; i < s; i++)
              r.append(t[i], l()),
                E.nextNode(),
                d.push({
                  type: 2,
                  index: ++c,
                });
            r.append(t[s], l());
          }
        }
      } else if (8 === r.nodeType)
        if (r.data === o)
          d.push({
            type: 2,
            index: c,
          });
        else {
          let t = -1;
          for (; -1 !== (t = r.data.indexOf(h, t + 1)); )
            d.push({
              type: 7,
              index: c,
            }),
              (t += h.length - 1);
        }
      c++;
    }
  }
  static createElement(t, i) {
    const s = r.createElement('template');
    return (s.innerHTML = t), s;
  }
}
function N(t, i, s = t, e) {
  if (i === w) return i;
  let h = void 0 !== e ? s._$Co?.[e] : s._$Cl;
  const o = c(i) ? void 0 : i._$litDirective$;
  return (
    h?.constructor !== o &&
      (h?._$AO?.(!1),
      void 0 === o ? (h = void 0) : ((h = new o(t)), h._$AT(t, s, e)),
      void 0 !== e ? ((s._$Co ??= [])[e] = h) : (s._$Cl = h)),
    void 0 !== h && (i = N(t, h._$AS(t, i.values), h, e)),
    i
  );
}
class S {
  constructor(t, i) {
    (this._$AV = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = i);
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const {
        el: { content: i },
        parts: s,
      } = this._$AD,
      e = (t?.creationScope ?? r).importNode(i, !0);
    E.currentNode = e;
    let h = E.nextNode(),
      o = 0,
      n = 0,
      l = s[0];
    for (; void 0 !== l; ) {
      if (o === l.index) {
        let i;
        2 === l.type
          ? (i = new M(h, h.nextSibling, this, t))
          : 1 === l.type
          ? (i = new l.ctor(h, l.name, l.strings, this, t))
          : 6 === l.type && (i = new L$1(h, this, t)),
          this._$AV.push(i),
          (l = s[++n]);
      }
      o !== l?.index && ((h = E.nextNode()), o++);
    }
    return (E.currentNode = r), e;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV)
      void 0 !== s &&
        (void 0 !== s.strings
          ? (s._$AI(t, s, i), (i += s.strings.length - 2))
          : s._$AI(t[i])),
        i++;
  }
}
class M {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, s, e) {
    (this.type = 2),
      (this._$AH = T),
      (this._$AN = void 0),
      (this._$AA = t),
      (this._$AB = i),
      (this._$AM = s),
      (this.options = e),
      (this._$Cv = e?.isConnected ?? !0);
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return void 0 !== i && 11 === t?.nodeType && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    (t = N(this, t, i)),
      c(t)
        ? t === T || null == t || '' === t
          ? (this._$AH !== T && this._$AR(), (this._$AH = T))
          : t !== this._$AH && t !== w && this._(t)
        : void 0 !== t._$litType$
        ? this.$(t)
        : void 0 !== t.nodeType
        ? this.T(t)
        : u(t)
        ? this.k(t)
        : this._(t);
  }
  S(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), (this._$AH = this.S(t)));
  }
  _(t) {
    this._$AH !== T && c(this._$AH)
      ? (this._$AA.nextSibling.data = t)
      : this.T(r.createTextNode(t)),
      (this._$AH = t);
  }
  $(t) {
    const { values: i, _$litType$: s } = t,
      e =
        'number' == typeof s
          ? this._$AC(t)
          : (void 0 === s.el &&
              (s.el = V.createElement(C(s.h, s.h[0]), this.options)),
            s);
    if (this._$AH?._$AD === e) this._$AH.p(i);
    else {
      const t = new S(e, this),
        s = t.u(this.options);
      t.p(i), this.T(s), (this._$AH = t);
    }
  }
  _$AC(t) {
    let i = A.get(t.strings);
    return void 0 === i && A.set(t.strings, (i = new V(t))), i;
  }
  k(t) {
    a(this._$AH) || ((this._$AH = []), this._$AR());
    const i = this._$AH;
    let s,
      e = 0;
    for (const h of t)
      e === i.length
        ? i.push((s = new M(this.S(l()), this.S(l()), this, this.options)))
        : (s = i[e]),
        s._$AI(h),
        e++;
    e < i.length && (this._$AR(s && s._$AB.nextSibling, e), (i.length = e));
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t && t !== this._$AB; ) {
      const i = t.nextSibling;
      t.remove(), (t = i);
    }
  }
  setConnected(t) {
    void 0 === this._$AM && ((this._$Cv = t), this._$AP?.(t));
  }
}
class R {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, e, h) {
    (this.type = 1),
      (this._$AH = T),
      (this._$AN = void 0),
      (this.element = t),
      (this.name = i),
      (this._$AM = e),
      (this.options = h),
      s.length > 2 || '' !== s[0] || '' !== s[1]
        ? ((this._$AH = Array(s.length - 1).fill(new String())),
          (this.strings = s))
        : (this._$AH = T);
  }
  _$AI(t, i = this, s, e) {
    const h = this.strings;
    let o = !1;
    if (void 0 === h)
      (t = N(this, t, i, 0)),
        (o = !c(t) || (t !== this._$AH && t !== w)),
        o && (this._$AH = t);
    else {
      const e = t;
      let n, r;
      for (t = h[0], n = 0; n < h.length - 1; n++)
        (r = N(this, e[s + n], i, n)),
          r === w && (r = this._$AH[n]),
          (o ||= !c(r) || r !== this._$AH[n]),
          r === T ? (t = T) : t !== T && (t += (r ?? '') + h[n + 1]),
          (this._$AH[n] = r);
    }
    o && !e && this.j(t);
  }
  j(t) {
    t === T
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, t ?? '');
  }
}
class k extends R {
  constructor() {
    super(...arguments), (this.type = 3);
  }
  j(t) {
    this.element[this.name] = t === T ? void 0 : t;
  }
}
class H extends R {
  constructor() {
    super(...arguments), (this.type = 4);
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== T);
  }
}
class I extends R {
  constructor(t, i, s, e, h) {
    super(t, i, s, e, h), (this.type = 5);
  }
  _$AI(t, i = this) {
    if ((t = N(this, t, i, 0) ?? T) === w) return;
    const s = this._$AH,
      e =
        (t === T && s !== T) ||
        t.capture !== s.capture ||
        t.once !== s.once ||
        t.passive !== s.passive,
      h = t !== T && (s === T || e);
    e && this.element.removeEventListener(this.name, this, s),
      h && this.element.addEventListener(this.name, this, t),
      (this._$AH = t);
  }
  handleEvent(t) {
    'function' == typeof this._$AH
      ? this._$AH.call(this.options?.host ?? this.element, t)
      : this._$AH.handleEvent(t);
  }
}
let L$1 = class L {
  constructor(t, i, s) {
    (this.element = t),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = i),
      (this.options = s);
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    N(this, t);
  }
};
const Z = t.litHtmlPolyfillSupport;
Z?.(V, M), (t.litHtmlVersions ??= []).push('3.1.3');
const j = (t, i, s) => {
  const e = s?.renderBefore ?? i;
  let h = e._$litPart$;
  if (void 0 === h) {
    const t = s?.renderBefore ?? null;
    e._$litPart$ = h = new M(i.insertBefore(l(), t), t, void 0, s ?? {});
  }
  return h._$AI(t), h;
};

let current;
let currentId = 0;
function setCurrent(state) {
  current = state;
}
function clear() {
  current = null;
  currentId = 0;
}
function notify() {
  return currentId++;
}

const phaseSymbol = Symbol('haunted.phase');
const hookSymbol = Symbol('haunted.hook');
const updateSymbol = Symbol('haunted.update');
const commitSymbol = Symbol('haunted.commit');
const effectsSymbol = Symbol('haunted.effects');
const layoutEffectsSymbol = Symbol('haunted.layoutEffects');
const contextEvent = 'haunted.context';

class State {
  update;
  host;
  virtual;
  [hookSymbol];
  [effectsSymbol];
  [layoutEffectsSymbol];
  constructor(update, host) {
    this.update = update;
    this.host = host;
    this[hookSymbol] = new Map();
    this[effectsSymbol] = [];
    this[layoutEffectsSymbol] = [];
  }
  run(cb) {
    setCurrent(this);
    let res = cb();
    clear();
    return res;
  }
  _runEffects(phase) {
    let effects = this[phase];
    setCurrent(this);
    for (let effect of effects) {
      effect.call(this);
    }
    clear();
  }
  runEffects() {
    this._runEffects(effectsSymbol);
  }
  runLayoutEffects() {
    this._runEffects(layoutEffectsSymbol);
  }
  teardown() {
    let hooks = this[hookSymbol];
    hooks.forEach((hook) => {
      if (typeof hook.teardown === 'function') {
        hook.teardown();
      }
    });
  }
}

const defer = Promise.resolve().then.bind(Promise.resolve());
function runner() {
  let tasks = [];
  let id;
  function runTasks() {
    id = null;
    let t = tasks;
    tasks = [];
    for (var i = 0, len = t.length; i < len; i++) {
      t[i]();
    }
  }
  return function (task) {
    tasks.push(task);
    if (id == null) {
      id = defer(runTasks);
    }
  };
}
const read = runner();
const write = runner();
class BaseScheduler {
  renderer;
  host;
  state;
  [phaseSymbol];
  _updateQueued;
  constructor(renderer, host) {
    this.renderer = renderer;
    this.host = host;
    this.state = new State(this.update.bind(this), host);
    this[phaseSymbol] = null;
    this._updateQueued = false;
  }
  update() {
    if (this._updateQueued) return;
    read(() => {
      let result = this.handlePhase(updateSymbol);
      write(() => {
        this.handlePhase(commitSymbol, result);
        write(() => {
          this.handlePhase(effectsSymbol);
        });
      });
      this._updateQueued = false;
    });
    this._updateQueued = true;
  }
  handlePhase(phase, arg) {
    this[phaseSymbol] = phase;
    switch (phase) {
      case commitSymbol:
        this.commit(arg);
        this.runEffects(layoutEffectsSymbol);
        return;
      case updateSymbol:
        return this.render();
      case effectsSymbol:
        return this.runEffects(effectsSymbol);
    }
  }
  render() {
    return this.state.run(() => this.renderer.call(this.host, this.host));
  }
  runEffects(phase) {
    this.state._runEffects(phase);
  }
  teardown() {
    this.state.teardown();
  }
}

const toCamelCase = (val = '') =>
  val.replace(/-+([a-z])?/g, (_, char) => (char ? char.toUpperCase() : ''));
function makeComponent(render) {
  class Scheduler extends BaseScheduler {
    frag;
    renderResult;
    constructor(renderer, frag, host) {
      super(renderer, host || frag);
      this.frag = frag;
    }
    commit(result) {
      this.renderResult = render(result, this.frag);
    }
  }
  function component(renderer, baseElementOrOptions, options) {
    const BaseElement =
      (options || baseElementOrOptions || {}).baseElement || HTMLElement;
    const {
      observedAttributes = [],
      useShadowDOM = true,
      shadowRootInit = {},
      styleSheets,
    } = options || baseElementOrOptions || {};
    class Element extends BaseElement {
      _scheduler;
      static get observedAttributes() {
        return renderer.observedAttributes || observedAttributes || [];
      }
      constructor() {
        super();
        if (useShadowDOM === false) {
          this._scheduler = new Scheduler(renderer, this);
        } else {
          const shadowRoot = this.attachShadow({
            mode: 'open',
            ...shadowRootInit,
          });
          if (styleSheets) shadowRoot.adoptedStyleSheets = styleSheets;
          this._scheduler = new Scheduler(renderer, shadowRoot, this);
        }
      }
      connectedCallback() {
        this._scheduler.update();
        this._scheduler.renderResult?.setConnected(true);
      }
      disconnectedCallback() {
        this._scheduler.teardown();
        this._scheduler.renderResult?.setConnected(false);
      }
      attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
          return;
        }
        let val = newValue === '' ? true : newValue;
        Reflect.set(this, toCamelCase(name), val);
      }
    }
    function reflectiveProp(initialValue) {
      let value = initialValue;
      let isSetup = false;
      return Object.freeze({
        enumerable: true,
        configurable: true,
        get() {
          return value;
        },
        set(newValue) {
          // Avoid scheduling update when prop value hasn't changed
          if (isSetup && value === newValue) return;
          isSetup = true;
          value = newValue;
          if (this._scheduler) {
            this._scheduler.update();
          }
        },
      });
    }
    const proto = new Proxy(BaseElement.prototype, {
      getPrototypeOf(target) {
        return target;
      },
      set(target, key, value, receiver) {
        let desc;
        if (key in target) {
          desc = Object.getOwnPropertyDescriptor(target, key);
          if (desc && desc.set) {
            desc.set.call(receiver, value);
            return true;
          }
          Reflect.set(target, key, value, receiver);
          return true;
        }
        if (typeof key === 'symbol' || key[0] === '_') {
          desc = {
            enumerable: true,
            configurable: true,
            writable: true,
            value,
          };
        } else {
          desc = reflectiveProp(value);
        }
        Object.defineProperty(receiver, key, desc);
        if (desc.set) {
          desc.set.call(receiver, value);
        }
        return true;
      },
    });
    Object.setPrototypeOf(Element.prototype, proto);
    return Element;
  }
  return component;
}

class Hook {
  id;
  state;
  constructor(id, state) {
    this.id = id;
    this.state = state;
  }
}
function use(Hook, ...args) {
  let id = notify();
  let hooks = current[hookSymbol];
  let hook = hooks.get(id);
  if (!hook) {
    hook = new Hook(id, current, ...args);
    hooks.set(id, hook);
  }
  return hook.update(...args);
}
function hook(Hook) {
  return use.bind(null, Hook);
}

function createEffect(setEffects) {
  return hook(
    class extends Hook {
      callback;
      lastValues;
      values;
      _teardown;
      constructor(id, state, ignored1, ignored2) {
        super(id, state);
        setEffects(state, this);
      }
      update(callback, values) {
        this.callback = callback;
        this.values = values;
      }
      call() {
        const hasChanged = !this.values || this.hasChanged();
        this.lastValues = this.values;
        if (hasChanged) {
          this.run();
        }
      }
      run() {
        this.teardown();
        this._teardown = this.callback.call(this.state);
      }
      teardown() {
        if (typeof this._teardown === 'function') {
          this._teardown();
        }
      }
      hasChanged() {
        return (
          !this.lastValues ||
          this.values.some((value, i) => this.lastValues[i] !== value)
        );
      }
    }
  );
}

function setEffects(state, cb) {
  state[effectsSymbol].push(cb);
}
/**
 * @function
 * @param {() => void} effect - callback function that runs each time dependencies change
 * @param {unknown[]} [dependencies] - list of dependencies to the effect
 * @return {void}
 */
const useEffect = createEffect(setEffects);

const getEmitter = (host) => {
  if (host instanceof Element) return host;
  return host.startNode || host.endNode || host.parentNode;
};
/**
 * @function
 * @template T
 * @param    {Context<T>} context
 * @return   {T}
 */
const useContext = hook(
  class extends Hook {
    Context;
    value;
    _ranEffect;
    _unsubscribe;
    constructor(id, state, _) {
      super(id, state);
      this._updater = this._updater.bind(this);
      this._ranEffect = false;
      this._unsubscribe = null;
      setEffects(state, this);
    }
    update(Context) {
      if (this.Context !== Context) {
        this._subscribe(Context);
        this.Context = Context;
      }
      return this.value;
    }
    call() {
      if (!this._ranEffect) {
        this._ranEffect = true;
        if (this._unsubscribe) this._unsubscribe();
        this._subscribe(this.Context);
        this.state.update();
      }
    }
    _updater(value) {
      this.value = value;
      this.state.update();
    }
    _subscribe(Context) {
      const detail = {
        Context,
        callback: this._updater,
      };
      const emitter = getEmitter(this.state.host);
      emitter.dispatchEvent(
        new CustomEvent(contextEvent, {
          detail,
          // carrier
          bubbles: true,
          // to bubble up in tree
          cancelable: true,
          // to be able to cancel
          composed: true, // to pass ShadowDOM boundaries
        })
      );
      const { unsubscribe = null, value } = detail;
      this.value = unsubscribe ? value : Context.defaultValue;
      this._unsubscribe = unsubscribe;
    }
    teardown() {
      if (this._unsubscribe) {
        this._unsubscribe();
      }
    }
  }
);

function makeContext(component) {
  return (defaultValue) => {
    const Context = {
      Provider: class extends HTMLElement {
        listeners;
        _value;
        constructor() {
          super();
          this.listeners = new Set();
          this.addEventListener(contextEvent, this);
        }
        disconnectedCallback() {
          this.removeEventListener(contextEvent, this);
        }
        handleEvent(event) {
          const { detail } = event;
          if (detail.Context === Context) {
            detail.value = this.value;
            detail.unsubscribe = this.unsubscribe.bind(this, detail.callback);
            this.listeners.add(detail.callback);
            event.stopPropagation();
          }
        }
        unsubscribe(callback) {
          this.listeners.delete(callback);
        }
        set value(value) {
          this._value = value;
          for (let callback of this.listeners) {
            callback(value);
          }
        }
        get value() {
          return this._value;
        }
      },
      Consumer: component(
        function ({ render }) {
          const context = useContext(Context);
          return render(context);
        },
        {
          useShadowDOM: false,
        }
      ),
      defaultValue,
    };
    return Context;
  };
}

/**
 * @function
 * @template T
 * @param  {() => T} fn function to memoize
 * @param  {unknown[]} values dependencies to the memoized computation
 * @return {T} The next computed value
 */
hook(
  class extends Hook {
    value;
    values;
    constructor(id, state, fn, values) {
      super(id, state);
      this.value = fn();
      this.values = values;
    }
    update(fn, values) {
      if (this.hasChanged(values)) {
        this.values = values;
        this.value = fn();
      }
      return this.value;
    }
    hasChanged(values = []) {
      return values.some((value, i) => this.values[i] !== value);
    }
  }
);

function setLayoutEffects(state, cb) {
  state[layoutEffectsSymbol].push(cb);
}
/**
 * @function
 * @param  {Effect} callback effecting callback
 * @param  {unknown[]} [values] dependencies to the effect
 * @return {void}
 */
createEffect(setLayoutEffects);

/**
 * @function
 * @template {*} T
 * @param {T} [initialState] - Optional initial state
 * @return {readonly [state: T, updaterFn: StateUpdater<T>]} stateTuple - Tuple of current state and state updater function
 */
const useState = hook(
  class extends Hook {
    args;
    constructor(id, state, initialValue) {
      super(id, state);
      this.updater = this.updater.bind(this);
      if (typeof initialValue === 'function') {
        initialValue = initialValue();
      }
      this.makeArgs(initialValue);
    }
    update() {
      return this.args;
    }
    updater(value) {
      const [previousValue] = this.args;
      if (typeof value === 'function') {
        const updaterFn = value;
        value = updaterFn(previousValue);
      }
      if (Object.is(previousValue, value)) {
        return;
      }
      this.makeArgs(value);
      this.state.update();
    }
    makeArgs(value) {
      this.args = Object.freeze([value, this.updater]);
    }
  }
);

/**
 * Given a reducer function, initial state, and optional state initializer function, returns a tuple of state and dispatch function.
 * @function
 * @template S State
 * @template I Initial State
 * @template A Action
 * @param {Reducer<S, A>} reducer - reducer function to compute the next state given the previous state and the action
 * @param {I} initialState - the initial state of the reducer
 * @param {(init: I) => S} [init=undefined] - Optional initializer function, called on initialState if provided
 * @return {readonly [S, (action: A) => void]}
 */
hook(
  class extends Hook {
    reducer;
    currentState;
    constructor(id, state, _, initialState, init) {
      super(id, state);
      this.dispatch = this.dispatch.bind(this);
      this.currentState =
        init !== undefined ? init(initialState) : initialState;
    }
    update(reducer) {
      this.reducer = reducer;
      return [this.currentState, this.dispatch];
    }
    dispatch(action) {
      this.currentState = this.reducer(this.currentState, action);
      this.state.update();
    }
  }
);

function pion({ render }) {
  const component = makeComponent(render);
  const createContext = makeContext(component);
  return {
    component,
    createContext,
  };
}

const { component, createContext } = pion({
  render: j,
});

const reset = `
/*
  1. Use a more-intuitive box-sizing model.
*/
*, *::before, *::after {
  box-sizing: border-box;
}
/*
  2. Remove default margin
*/
* {
  margin: 0;
}
/*
  Typographic tweaks!
  3. Add accessible line-height
  4. Improve text rendering
*/
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
/*
  5. Improve media defaults
*/
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
/*
  6. Remove built-in form typography styles
*/
input, button, textarea, select {
  font: inherit;
}
/*
  7. Avoid text overflows
*/
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
/*
  8. Create a root stacking context
*/
#root, #__next {
  isolation: isolate;
}
`;

const headerStyle = `
.wrapper {
  height: 300px;
  background-image: linear-gradient(225deg, var(--clr-2) 2.99%, var(--clr-3) 100%);
  background-image: url('./header-bg.png'), linear-gradient(225deg, var(--clr-2) 2.99%, var(--clr-3) 100%);
  background-position: center center;
  padding: 26px 24px;
  position: relative;
}

@media screen and (min-width: 1110px) {
  .wrapper {
    height: 280px;
  }
}
`;

const searchStyle = `
h1 {
  color: var(--clr-1);
  font-size: 26px;
  text-align: center;
  margin-bottom: 29px;
}

.input-wrapper {
  height: 58px;
  line-height: 58px;
  border-radius: 15px;
  background: var(--clr-1);
  box-shadow: 0px 50px 50px -25px rgba(0, 0, 0, 0.10);
  position: relative;
  margin-bottom: 24px;
  border-radius: 15px;
  overflow: hidden;
}

.input-wrapper input {
  width: 100%;
  margin: 0;
  padding: 0 82px 0 24px;
  border: 0;
}

.input-wrapper  .input-chevron-right {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}

@media screen and (min-width: 1110px) {
  .input-wrapper {
    max-width: 555px;
    margin: 0 auto 48px;
  }
}
`;

const Search = () => {
  const { ip, setIp, setLocationData } = useContext(ipContext);
  useEffect(async () => {
    const apiKey = 'at_SwtYifMWjcF7GCNWzRmkivTf1L0ow';
    const response = await fetch(
      `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ip}`
    );
    const data = await response.json();
    setLocationData(data);
  }, [ip]);
  return x`
    <style>
      ${reset}
      ${searchStyle}
    </style>
    <div class="wrapper">
      <h1>IP Address Tracker</h1>

      <div class="input-wrapper">
        <input
          value=${ip}
          @change=${(event) => {
            const target = event.target;
            setIp(target.value);
          }}
          placeholder="Search for any valid IP address"
        />
        <svg
          class="input-chevron-right"
          width="58"
          height="58"
          viewBox="0 0 58 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0H43C51.2843 0 58 6.71573 58 15V43C58 51.2843 51.2843 58 43 58H0V0Z"
            fill="black"
          />
          <path d="M26 23L32 29L26 35" stroke="white" stroke-width="3" />
        </svg>
      </div>
    </div>
  `;
};
customElements.define('app-search', component(Search));

const cardStyle = `
:host {
  float: left;
  padding: 24px;
  width: 100%;
  position: absolute;
  left: 0;
  z-index: 1000;
}

.inner-wrapper {
  width: 100%;
  background-color: var(--clr-1);
  border-radius: 15px;
  box-shadow: 0px 50px 50px -25px rgba(0, 0, 0, 0.10);
  padding: 28px 0 0;
}

.item {
  text-align: center;
}

.item:last-child {
  padding-bottom: 24px;
}

.item:last-child .sub-title {
  margin-bottom: 0;
}

.item .title {
  color: var(--clr-4);
  opacity: 0.5;
  font-size: 10px;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 1.458px;
  text-transform: uppercase;
  margin-bottom: 7px;
}

.item .sub-title {
  color: var(--clr-4);
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 120% */
  letter-spacing: -0.179px; 
  margin-bottom: 24px;
}

@media screen and (min-width: 1110px) {
  :host{
    float: left;
    padding: 0;
    width: 100%;
    position: absolute;
    z-index: 1000;
  }

  .inner-wrapper {
    max-width: 1110px;
    margin: 0 auto;
    padding: 43px 32px;
  }

  .inner-wrapper-2 {
    display: flex;
    justify-content: space-evenly;
    gap: 32px;
    padding-top: 0;
  }

  .wrapper {
    width: 100%;
  }

  .item {
    text-align: left;
    border-right: 1px solid #ccc;
    padding-right: 32px;
    max-width: 30%;
  }

  .item:last-child {
    border-right: 0;
  }

  .item .title {
    margin-bottom: 13px;
    font-size: 12px;
  }

  .item .sub-title {
    font-size: 26px;
  }
}
`;

const Card = () => {
  const { locationData } = useContext(ipContext);
  return x`
    <style>
      ${reset}
      ${cardStyle}
    </style>
    <div class="wrapper">
      <div class="inner-wrapper">
        <div class="inner-wrapper-2">
          <div class="item">
            <p class="title">IP Address</p>
            <p class="sub-title">${locationData?.ip}</p>
          </div>
          <div class="item">
            <p class="title">Location</p>
            <p class="sub-title">
              ${locationData?.location?.city},
              ${locationData?.location?.country}
            </p>
          </div>
          <div class="item">
            <p class="title">Timezone</p>
            <p class="sub-title">${locationData?.location?.timezone}</p>
          </div>
          <div class="item">
            <p class="title">ISP</p>
            <p class="sub-title">${locationData?.isp}</p>
          </div>
        </div>
      </div>
    </div>
  `;
};
customElements.define('app-card', component(Card));

const Header = () => {
  return x`
    <style>
      ${reset}
      ${headerStyle}
    </style>
    <div class="wrapper">
      <app-search></app-search>
      <app-card></app-card>
    </div>
  `;
};
customElements.define('app-header', component(Header));

const mapStyle = `
.wrapper {
  height: calc(100vh - 300px);
}

#map {
  width: 100%;
  height: 800px;
}

@media screen and (min-width: 1110px) {
 .wrapper {
    height: calc(100vh - 280px);
  } 
}
`;

const Map$1 = (element) => {
  const { locationData } = useContext(ipContext);
  useEffect(() => {
    const mapDiv = element.shadowRoot.querySelector('#map');
    // @ts-ignore
    const map = L.map(mapDiv).setView(
      [locationData.location.lat, locationData.location.lng],
      13
    );
    // @ts-ignore
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    return () => {
      map.remove();
    };
  }, [locationData.ip]);
  return x`
    <style>
      ${reset}
      ${mapStyle}
    </style>
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      crossorigin=""
    />
    <div class="wrapper">
      <div id="map"></div>
    </div>
  `;
};
customElements.define('app-map', component(Map$1));

const ipContext = createContext({
  ip: '',
  setIp: () => {},
  locationData: {
    location: {
      lat: 44.43225,
      lng: 26.10626,
    },
  },
  setLocationData: () => {},
});
customElements.define('ip-provider', ipContext.Provider);
const App = () => {
  const [ip, setIp] = useState('');
  const [locationData, setLocationData] = useState({
    location: {
      lat: 44.43225,
      lng: 26.10626,
    },
  });
  return x`
    <style>
      ${reset}
    </style>
    <ip-provider .value=${{ ip, setIp, locationData, setLocationData }}>
      <div>
        <app-header></app-header>
        <app-map></app-map>
      </div>
    </ip-provider>
  `;
};
customElements.define('main-app', component(App));

exports.ipContext = ipContext;
