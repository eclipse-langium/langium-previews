class br {
  constructor() {
    this.listeners = [], this.unexpectedErrorHandler = function(t) {
      setTimeout(() => {
        throw t.stack ? We.isErrorNoTelemetry(t) ? new We(t.message + `

` + t.stack) : new Error(t.message + `

` + t.stack) : t;
      }, 0);
    };
  }
  addListener(t) {
    return this.listeners.push(t), () => {
      this._removeListener(t);
    };
  }
  emit(t) {
    this.listeners.forEach((n) => {
      n(t);
    });
  }
  _removeListener(t) {
    this.listeners.splice(this.listeners.indexOf(t), 1);
  }
  setUnexpectedErrorHandler(t) {
    this.unexpectedErrorHandler = t;
  }
  getUnexpectedErrorHandler() {
    return this.unexpectedErrorHandler;
  }
  onUnexpectedError(t) {
    this.unexpectedErrorHandler(t), this.emit(t);
  }
  onUnexpectedExternalError(t) {
    this.unexpectedErrorHandler(t);
  }
}
const xr = new br();
function Xs(e) {
  pr(e) || xr.onUnexpectedError(e);
}
function dn(e) {
  if (e instanceof Error) {
    const { name: t, message: n } = e, s = e.stacktrace || e.stack;
    return {
      $isError: !0,
      name: t,
      message: n,
      stack: s,
      noTelemetry: We.isErrorNoTelemetry(e)
    };
  }
  return e;
}
const Tt = "Canceled";
function pr(e) {
  return e instanceof _r ? !0 : e instanceof Error && e.name === Tt && e.message === Tt;
}
class _r extends Error {
  constructor() {
    super(Tt), this.name = this.message;
  }
}
class We extends Error {
  constructor(t) {
    super(t), this.name = "CodeExpectedError";
  }
  static fromError(t) {
    if (t instanceof We)
      return t;
    const n = new We();
    return n.message = t.message, n.stack = t.stack, n;
  }
  static isErrorNoTelemetry(t) {
    return t.name === "CodeExpectedError";
  }
}
class me extends Error {
  constructor(t) {
    super(t || "An unexpected bug occurred."), Object.setPrototypeOf(this, me.prototype);
  }
}
function Lr(e, t) {
  const n = this;
  let s = !1, r;
  return function() {
    if (s)
      return r;
    if (s = !0, t)
      try {
        r = e.apply(n, arguments);
      } finally {
        t();
      }
    else
      r = e.apply(n, arguments);
    return r;
  };
}
function ze(e, t) {
  const n = Ze(e, t);
  return n === -1 ? void 0 : e[n];
}
function Ze(e, t, n = 0, s = e.length) {
  let r = n, i = s;
  for (; r < i; ) {
    const l = Math.floor((r + i) / 2);
    t(e[l]) ? r = l + 1 : i = l;
  }
  return r - 1;
}
function wr(e, t) {
  const n = Vt(e, t);
  return n === e.length ? void 0 : e[n];
}
function Vt(e, t, n = 0, s = e.length) {
  let r = n, i = s;
  for (; r < i; ) {
    const l = Math.floor((r + i) / 2);
    t(e[l]) ? i = l : r = l + 1;
  }
  return r;
}
const St = class St {
  constructor(t) {
    this._array = t, this._findLastMonotonousLastIdx = 0;
  }
  findLastMonotonous(t) {
    if (St.assertInvariants) {
      if (this._prevFindLastPredicate) {
        for (const s of this._array)
          if (this._prevFindLastPredicate(s) && !t(s))
            throw new Error("MonotonousArray: current predicate must be weaker than (or equal to) the previous predicate.");
      }
      this._prevFindLastPredicate = t;
    }
    const n = Ze(this._array, t, this._findLastMonotonousLastIdx);
    return this._findLastMonotonousLastIdx = n + 1, n === -1 ? void 0 : this._array[n];
  }
};
St.assertInvariants = !1;
let dt = St;
function vr(e, t, n = (s, r) => s === r) {
  if (e === t)
    return !0;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (let s = 0, r = e.length; s < r; s++)
    if (!n(e[s], t[s]))
      return !1;
  return !0;
}
function* Nr(e, t) {
  let n, s;
  for (const r of e)
    s !== void 0 && t(s, r) ? n.push(r) : (n && (yield n), n = [r]), s = r;
  n && (yield n);
}
function Sr(e, t) {
  for (let n = 0; n <= e.length; n++)
    t(n === 0 ? void 0 : e[n - 1], n === e.length ? void 0 : e[n]);
}
function Cr(e, t) {
  for (let n = 0; n < e.length; n++)
    t(n === 0 ? void 0 : e[n - 1], e[n], n + 1 === e.length ? void 0 : e[n + 1]);
}
function Ar(e, t) {
  for (const n of t)
    e.push(n);
}
var qt;
(function(e) {
  function t(i) {
    return i < 0;
  }
  e.isLessThan = t;
  function n(i) {
    return i <= 0;
  }
  e.isLessThanOrEqual = n;
  function s(i) {
    return i > 0;
  }
  e.isGreaterThan = s;
  function r(i) {
    return i === 0;
  }
  e.isNeitherLessOrGreaterThan = r, e.greaterThan = 1, e.lessThan = -1, e.neitherLessOrGreaterThan = 0;
})(qt || (qt = {}));
function ot(e, t) {
  return (n, s) => t(e(n), e(s));
}
const ut = (e, t) => e - t;
function Rr(e) {
  return (t, n) => -e(t, n);
}
const Ve = class Ve {
  constructor(t) {
    this.iterate = t;
  }
  forEach(t) {
    this.iterate((n) => (t(n), !0));
  }
  toArray() {
    const t = [];
    return this.iterate((n) => (t.push(n), !0)), t;
  }
  filter(t) {
    return new Ve((n) => this.iterate((s) => t(s) ? n(s) : !0));
  }
  map(t) {
    return new Ve((n) => this.iterate((s) => n(t(s))));
  }
  some(t) {
    let n = !1;
    return this.iterate((s) => (n = t(s), !n)), n;
  }
  findFirst(t) {
    let n;
    return this.iterate((s) => t(s) ? (n = s, !1) : !0), n;
  }
  findLast(t) {
    let n;
    return this.iterate((s) => (t(s) && (n = s), !0)), n;
  }
  findLastMaxBy(t) {
    let n, s = !0;
    return this.iterate((r) => ((s || qt.isGreaterThan(t(r, n))) && (s = !1, n = r), !0)), n;
  }
};
Ve.empty = new Ve((t) => {
});
let gn = Ve;
class yr {
  constructor() {
    this.map = /* @__PURE__ */ new Map();
  }
  add(t, n) {
    let s = this.map.get(t);
    s || (s = /* @__PURE__ */ new Set(), this.map.set(t, s)), s.add(n);
  }
  delete(t, n) {
    const s = this.map.get(t);
    s && (s.delete(n), s.size === 0 && this.map.delete(t));
  }
  forEach(t, n) {
    const s = this.map.get(t);
    s && s.forEach(n);
  }
  get(t) {
    const n = this.map.get(t);
    return n || /* @__PURE__ */ new Set();
  }
}
var gt;
(function(e) {
  function t(b) {
    return b && typeof b == "object" && typeof b[Symbol.iterator] == "function";
  }
  e.is = t;
  const n = Object.freeze([]);
  function s() {
    return n;
  }
  e.empty = s;
  function* r(b) {
    yield b;
  }
  e.single = r;
  function i(b) {
    return t(b) ? b : r(b);
  }
  e.wrap = i;
  function l(b) {
    return b || n;
  }
  e.from = l;
  function* o(b) {
    for (let w = b.length - 1; w >= 0; w--)
      yield b[w];
  }
  e.reverse = o;
  function u(b) {
    return !b || b[Symbol.iterator]().next().done === !0;
  }
  e.isEmpty = u;
  function c(b) {
    return b[Symbol.iterator]().next().value;
  }
  e.first = c;
  function h(b, w) {
    for (const _ of b)
      if (w(_))
        return !0;
    return !1;
  }
  e.some = h;
  function f(b, w) {
    for (const _ of b)
      if (w(_))
        return _;
  }
  e.find = f;
  function* m(b, w) {
    for (const _ of b)
      w(_) && (yield _);
  }
  e.filter = m;
  function* d(b, w) {
    let _ = 0;
    for (const R of b)
      yield w(R, _++);
  }
  e.map = d;
  function* g(...b) {
    for (const w of b)
      yield* w;
  }
  e.concat = g;
  function p(b, w, _) {
    let R = _;
    for (const y of b)
      R = w(R, y);
    return R;
  }
  e.reduce = p;
  function* L(b, w, _ = b.length) {
    for (w < 0 && (w += b.length), _ < 0 ? _ += b.length : _ > b.length && (_ = b.length); w < _; w++)
      yield b[w];
  }
  e.slice = L;
  function v(b, w = Number.POSITIVE_INFINITY) {
    const _ = [];
    if (w === 0)
      return [_, b];
    const R = b[Symbol.iterator]();
    for (let y = 0; y < w; y++) {
      const E = R.next();
      if (E.done)
        return [_, e.empty()];
      _.push(E.value);
    }
    return [_, { [Symbol.iterator]() {
      return R;
    } }];
  }
  e.consume = v;
  async function N(b) {
    const w = [];
    for await (const _ of b)
      w.push(_);
    return Promise.resolve(w);
  }
  e.asyncToArray = N;
})(gt || (gt = {}));
function Qs(e) {
  if (gt.is(e)) {
    const t = [];
    for (const n of e)
      if (n)
        try {
          n.dispose();
        } catch (s) {
          t.push(s);
        }
    if (t.length === 1)
      throw t[0];
    if (t.length > 1)
      throw new AggregateError(t, "Encountered errors while disposing of store");
    return Array.isArray(e) ? [] : e;
  } else if (e)
    return e.dispose(), e;
}
function Er(...e) {
  return bt(() => Qs(e));
}
function bt(e) {
  return {
    dispose: Lr(() => {
      e();
    })
  };
}
const Ct = class Ct {
  constructor() {
    this._toDispose = /* @__PURE__ */ new Set(), this._isDisposed = !1;
  }
  dispose() {
    this._isDisposed || (this._isDisposed = !0, this.clear());
  }
  get isDisposed() {
    return this._isDisposed;
  }
  clear() {
    if (this._toDispose.size !== 0)
      try {
        Qs(this._toDispose);
      } finally {
        this._toDispose.clear();
      }
  }
  add(t) {
    if (!t)
      return t;
    if (t === this)
      throw new Error("Cannot register a disposable on itself!");
    return this._isDisposed ? Ct.DISABLE_DISPOSED_WARNING || console.warn(new Error(
      "Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!"
    ).stack) : this._toDispose.add(t), t;
  }
  delete(t) {
    if (t) {
      if (t === this)
        throw new Error("Cannot dispose a disposable on itself!");
      this._toDispose.delete(t), t.dispose();
    }
  }
  deleteAndLeak(t) {
    t && this._toDispose.has(t) && this._toDispose.delete(t);
  }
};
Ct.DISABLE_DISPOSED_WARNING = !1;
let Ke = Ct;
const mn = class mn {
  constructor() {
    this._store = new Ke(), this._store;
  }
  dispose() {
    this._store.dispose();
  }
  _register(t) {
    if (t === this)
      throw new Error("Cannot register a disposable on itself!");
    return this._store.add(t);
  }
};
mn.None = Object.freeze({ dispose() {
} });
let $e = mn;
const qe = class qe {
  constructor(t) {
    this.element = t, this.next = qe.Undefined, this.prev = qe.Undefined;
  }
};
qe.Undefined = new qe(void 0);
let W = qe;
class Mr {
  constructor() {
    this._first = W.Undefined, this._last = W.Undefined, this._size = 0;
  }
  get size() {
    return this._size;
  }
  isEmpty() {
    return this._first === W.Undefined;
  }
  clear() {
    let t = this._first;
    for (; t !== W.Undefined; ) {
      const n = t.next;
      t.prev = W.Undefined, t.next = W.Undefined, t = n;
    }
    this._first = W.Undefined, this._last = W.Undefined, this._size = 0;
  }
  unshift(t) {
    return this._insert(t, !1);
  }
  push(t) {
    return this._insert(t, !0);
  }
  _insert(t, n) {
    const s = new W(t);
    if (this._first === W.Undefined)
      this._first = s, this._last = s;
    else if (n) {
      const i = this._last;
      this._last = s, s.prev = i, i.next = s;
    } else {
      const i = this._first;
      this._first = s, s.next = i, i.prev = s;
    }
    this._size += 1;
    let r = !1;
    return () => {
      r || (r = !0, this._remove(s));
    };
  }
  shift() {
    if (this._first !== W.Undefined) {
      const t = this._first.element;
      return this._remove(this._first), t;
    }
  }
  pop() {
    if (this._last !== W.Undefined) {
      const t = this._last.element;
      return this._remove(this._last), t;
    }
  }
  _remove(t) {
    if (t.prev !== W.Undefined && t.next !== W.Undefined) {
      const n = t.prev;
      n.next = t.next, t.next.prev = n;
    } else
      t.prev === W.Undefined && t.next === W.Undefined ? (this._first = W.Undefined, this._last = W.Undefined) : t.next === W.Undefined ? (this._last = this._last.prev, this._last.next = W.Undefined) : t.prev === W.Undefined && (this._first = this._first.next, this._first.prev = W.Undefined);
    this._size -= 1;
  }
  *[Symbol.iterator]() {
    let t = this._first;
    for (; t !== W.Undefined; )
      yield t.element, t = t.next;
  }
}
const kr = globalThis.performance && typeof globalThis.performance.now == "function";
class yt {
  static create(t) {
    return new yt(t);
  }
  constructor(t) {
    this._now = kr && t === !1 ? Date.now : globalThis.performance.now.bind(globalThis.performance), this._startTime = this._now(), this._stopTime = -1;
  }
  stop() {
    this._stopTime = this._now();
  }
  reset() {
    this._startTime = this._now(), this._stopTime = -1;
  }
  elapsed() {
    return this._stopTime !== -1 ? this._stopTime - this._startTime : this._now() - this._startTime;
  }
}
var Bt;
(function(e) {
  e.None = () => $e.None;
  function t(S, x) {
    return f(S, () => {
    }, 0, void 0, !0, void 0, x);
  }
  e.defer = t;
  function n(S) {
    return (x, C = null, A) => {
      let k = !1, F;
      return F = S((B) => {
        if (!k)
          return F ? F.dispose() : k = !0, x.call(C, B);
      }, null, A), k && F.dispose(), F;
    };
  }
  e.once = n;
  function s(S, x, C) {
    return c((A, k = null, F) => S((B) => A.call(k, x(B)), null, F), C);
  }
  e.map = s;
  function r(S, x, C) {
    return c((A, k = null, F) => S((B) => {
      x(B), A.call(k, B);
    }, null, F), C);
  }
  e.forEach = r;
  function i(S, x, C) {
    return c((A, k = null, F) => S((B) => x(B) && A.call(k, B), null, F), C);
  }
  e.filter = i;
  function l(S) {
    return S;
  }
  e.signal = l;
  function o(...S) {
    return (x, C = null, A) => {
      const k = Er(...S.map((F) => F((B) => x.call(C, B))));
      return h(k, A);
    };
  }
  e.any = o;
  function u(S, x, C, A) {
    let k = C;
    return s(S, (F) => (k = x(k, F), k), A);
  }
  e.reduce = u;
  function c(S, x) {
    let C;
    const A = {
      onWillAddFirstListener() {
        C = S(k.fire, k);
      },
      onDidRemoveLastListener() {
        C == null || C.dispose();
      }
    }, k = new ae(A);
    return x == null || x.add(k), k.event;
  }
  function h(S, x) {
    return x instanceof Array ? x.push(S) : x && x.add(S), S;
  }
  function f(S, x, C = 100, A = !1, k = !1, F, B) {
    let X, Z, Ee, rt = 0, Ne;
    const mr = {
      leakWarningThreshold: F,
      onWillAddFirstListener() {
        X = S((dr) => {
          rt++, Z = x(Z, dr), A && !Ee && (it.fire(Z), Z = void 0), Ne = () => {
            const gr = Z;
            Z = void 0, Ee = void 0, (!A || rt > 1) && it.fire(gr), rt = 0;
          }, typeof C == "number" ? (clearTimeout(Ee), Ee = setTimeout(Ne, C)) : Ee === void 0 && (Ee = 0, queueMicrotask(Ne));
        });
      },
      onWillRemoveListener() {
        k && rt > 0 && (Ne == null || Ne());
      },
      onDidRemoveLastListener() {
        Ne = void 0, X.dispose();
      }
    }, it = new ae(mr);
    return B == null || B.add(it), it.event;
  }
  e.debounce = f;
  function m(S, x = 0, C) {
    return e.debounce(S, (A, k) => A ? (A.push(k), A) : [k], x, void 0, !0, void 0, C);
  }
  e.accumulate = m;
  function d(S, x = (A, k) => A === k, C) {
    let A = !0, k;
    return i(S, (F) => {
      const B = A || !x(F, k);
      return A = !1, k = F, B;
    }, C);
  }
  e.latch = d;
  function g(S, x, C) {
    return [
      e.filter(S, x, C),
      e.filter(S, (A) => !x(A), C)
    ];
  }
  e.split = g;
  function p(S, x = !1, C = [], A) {
    let k = C.slice(), F = S((Z) => {
      k ? k.push(Z) : X.fire(Z);
    });
    A && A.add(F);
    const B = () => {
      k == null || k.forEach((Z) => X.fire(Z)), k = null;
    }, X = new ae({
      onWillAddFirstListener() {
        F || (F = S((Z) => X.fire(Z)), A && A.add(F));
      },
      onDidAddFirstListener() {
        k && (x ? setTimeout(B) : B());
      },
      onDidRemoveLastListener() {
        F && F.dispose(), F = null;
      }
    });
    return A && A.add(X), X.event;
  }
  e.buffer = p;
  function L(S, x) {
    return (A, k, F) => {
      const B = x(new N());
      return S(function(X) {
        const Z = B.evaluate(X);
        Z !== v && A.call(k, Z);
      }, void 0, F);
    };
  }
  e.chain = L;
  const v = Symbol("HaltChainable");
  class N {
    constructor() {
      this.steps = [];
    }
    map(x) {
      return this.steps.push(x), this;
    }
    forEach(x) {
      return this.steps.push((C) => (x(C), C)), this;
    }
    filter(x) {
      return this.steps.push((C) => x(C) ? C : v), this;
    }
    reduce(x, C) {
      let A = C;
      return this.steps.push((k) => (A = x(A, k), A)), this;
    }
    latch(x = (C, A) => C === A) {
      let C = !0, A;
      return this.steps.push((k) => {
        const F = C || !x(k, A);
        return C = !1, A = k, F ? k : v;
      }), this;
    }
    evaluate(x) {
      for (const C of this.steps)
        if (x = C(x), x === v)
          break;
      return x;
    }
  }
  function b(S, x, C = (A) => A) {
    const A = (...X) => B.fire(C(...X)), k = () => S.on(x, A), F = () => S.removeListener(x, A), B = new ae(
      { onWillAddFirstListener: k, onDidRemoveLastListener: F }
    );
    return B.event;
  }
  e.fromNodeEventEmitter = b;
  function w(S, x, C = (A) => A) {
    const A = (...X) => B.fire(C(...X)), k = () => S.addEventListener(x, A), F = () => S.removeEventListener(x, A), B = new ae(
      { onWillAddFirstListener: k, onDidRemoveLastListener: F }
    );
    return B.event;
  }
  e.fromDOMEventEmitter = w;
  function _(S) {
    return new Promise((x) => n(S)(x));
  }
  e.toPromise = _;
  function R(S) {
    const x = new ae();
    return S.then((C) => {
      x.fire(C);
    }, () => {
      x.fire(void 0);
    }).finally(() => {
      x.dispose();
    }), x.event;
  }
  e.fromPromise = R;
  function y(S, x, C) {
    return x(C), S((A) => x(A));
  }
  e.runAndSubscribe = y;
  class E {
    constructor(x, C) {
      this._observable = x, this._counter = 0, this._hasChanged = !1;
      const A = {
        onWillAddFirstListener: () => {
          x.addObserver(this);
        },
        onDidRemoveLastListener: () => {
          x.removeObserver(this);
        }
      };
      this.emitter = new ae(A), C && C.add(this.emitter);
    }
    beginUpdate(x) {
      this._counter++;
    }
    handlePossibleChange(x) {
    }
    handleChange(x, C) {
      this._hasChanged = !0;
    }
    endUpdate(x) {
      this._counter--, this._counter === 0 && (this._observable.reportChanges(), this._hasChanged && (this._hasChanged = !1, this.emitter.fire(this._observable.get())));
    }
  }
  function I(S, x) {
    return new E(S, x).emitter.event;
  }
  e.fromObservable = I;
  function j(S) {
    return (x, C, A) => {
      let k = 0, F = !1;
      const B = {
        beginUpdate() {
          k++;
        },
        endUpdate() {
          k--, k === 0 && (S.reportChanges(), F && (F = !1, x.call(C)));
        },
        handlePossibleChange() {
        },
        handleChange() {
          F = !0;
        }
      };
      S.addObserver(B), S.reportChanges();
      const X = {
        dispose() {
          S.removeObserver(B);
        }
      };
      return A instanceof Ke ? A.add(X) : Array.isArray(A) && A.push(X), X;
    };
  }
  e.fromObservableLight = j;
})(Bt || (Bt = {}));
const Be = class Be {
  constructor(t) {
    this.listenerCount = 0, this.invocationCount = 0, this.elapsedOverall = 0, this.durations = [], this.name = `${t}_${Be._idPool++}`, Be.all.add(this);
  }
  start(t) {
    this._stopWatch = new yt(), this.listenerCount = t;
  }
  stop() {
    if (this._stopWatch) {
      const t = this._stopWatch.elapsed();
      this.durations.push(t), this.elapsedOverall += t, this.invocationCount += 1, this._stopWatch = void 0;
    }
  }
};
Be.all = /* @__PURE__ */ new Set(), Be._idPool = 0;
let It = Be, Dr = -1;
class Pr {
  constructor(t, n = Math.random().toString(18).slice(2, 5)) {
    this.threshold = t, this.name = n, this._warnCountdown = 0;
  }
  dispose() {
    var t;
    (t = this._stacks) == null || t.clear();
  }
  check(t, n) {
    const s = this.threshold;
    if (s <= 0 || n < s)
      return;
    this._stacks || (this._stacks = /* @__PURE__ */ new Map());
    const r = this._stacks.get(t.value) || 0;
    if (this._stacks.set(t.value, r + 1), this._warnCountdown -= 1, this._warnCountdown <= 0) {
      this._warnCountdown = s * 0.5;
      let i, l = 0;
      for (const [o, u] of this._stacks)
        (!i || l < u) && (i = o, l = u);
      console.warn(`[${this.name}] potential listener LEAK detected, having ${n} listeners already. MOST frequent listener (${l}):`), console.warn(i);
    }
    return () => {
      const i = this._stacks.get(t.value) || 0;
      this._stacks.set(t.value, i - 1);
    };
  }
}
class ln {
  static create() {
    return new ln(new Error().stack ?? "");
  }
  constructor(t) {
    this.value = t;
  }
  print() {
    console.warn(this.value.split(`
`).slice(2).join(`
`));
  }
}
let Fr = 0;
class Et {
  constructor(t) {
    this.value = t, this.id = Fr++;
  }
}
const Tr = 2;
class ae {
  constructor(t) {
    var n, s, r, i;
    this._size = 0, this._options = t, this._leakageMon = (n = this._options) != null && n.leakWarningThreshold ? new Pr(((s = this._options) == null ? void 0 : s.leakWarningThreshold) ?? Dr) : void 0, this._perfMon = (r = this._options) != null && r._profName ? new It(this._options._profName) : void 0, this._deliveryQueue = (i = this._options) == null ? void 0 : i.deliveryQueue;
  }
  dispose() {
    var t, n, s, r;
    this._disposed || (this._disposed = !0, ((t = this._deliveryQueue) == null ? void 0 : t.current) === this && this._deliveryQueue.reset(), this._listeners && (this._listeners = void 0, this._size = 0), (s = (n = this._options) == null ? void 0 : n.onDidRemoveLastListener) == null || s.call(n), (r = this._leakageMon) == null || r.dispose());
  }
  get event() {
    return this._event ?? (this._event = (t, n, s) => {
      var o, u, c, h;
      if (this._leakageMon && this._size > this._leakageMon.threshold * 3)
        return console.warn(`[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far`), $e.None;
      if (this._disposed)
        return $e.None;
      n && (t = t.bind(n));
      const r = new Et(t);
      let i;
      this._leakageMon && this._size >= Math.ceil(this._leakageMon.threshold * 0.2) && (r.stack = ln.create(), i = this._leakageMon.check(r.stack, this._size + 1)), this._listeners ? this._listeners instanceof Et ? (this._deliveryQueue ?? (this._deliveryQueue = new Vr()), this._listeners = [this._listeners, r]) : this._listeners.push(r) : ((u = (o = this._options) == null ? void 0 : o.onWillAddFirstListener) == null || u.call(o, this), this._listeners = r, (h = (c = this._options) == null ? void 0 : c.onDidAddFirstListener) == null || h.call(c, this)), this._size++;
      const l = bt(() => {
        i == null || i(), this._removeListener(r);
      });
      return s instanceof Ke ? s.add(l) : Array.isArray(s) && s.push(l), l;
    }), this._event;
  }
  _removeListener(t) {
    var i, l, o, u;
    if ((l = (i = this._options) == null ? void 0 : i.onWillRemoveListener) == null || l.call(i, this), !this._listeners)
      return;
    if (this._size === 1) {
      this._listeners = void 0, (u = (o = this._options) == null ? void 0 : o.onDidRemoveLastListener) == null || u.call(o, this), this._size = 0;
      return;
    }
    const n = this._listeners, s = n.indexOf(t);
    if (s === -1)
      throw console.log("disposed?", this._disposed), console.log("size?", this._size), console.log("arr?", JSON.stringify(this._listeners)), new Error("Attempted to dispose unknown listener");
    this._size--, n[s] = void 0;
    const r = this._deliveryQueue.current === this;
    if (this._size * Tr <= n.length) {
      let c = 0;
      for (let h = 0; h < n.length; h++)
        n[h] ? n[c++] = n[h] : r && (this._deliveryQueue.end--, c < this._deliveryQueue.i && this._deliveryQueue.i--);
      n.length = c;
    }
  }
  _deliver(t, n) {
    var r;
    if (!t)
      return;
    const s = ((r = this._options) == null ? void 0 : r.onListenerError) || Xs;
    if (!s) {
      t.value(n);
      return;
    }
    try {
      t.value(n);
    } catch (i) {
      s(i);
    }
  }
  _deliverQueue(t) {
    const n = t.current._listeners;
    for (; t.i < t.end; )
      this._deliver(n[t.i++], t.value);
    t.reset();
  }
  fire(t) {
    var n, s, r, i;
    if ((n = this._deliveryQueue) != null && n.current && (this._deliverQueue(this._deliveryQueue), (s = this._perfMon) == null || s.stop()), (r = this._perfMon) == null || r.start(this._size), this._listeners)
      if (this._listeners instanceof Et)
        this._deliver(this._listeners, t);
      else {
        const l = this._deliveryQueue;
        l.enqueue(this, t, this._listeners.length), this._deliverQueue(l);
      }
    (i = this._perfMon) == null || i.stop();
  }
  hasListeners() {
    return this._size > 0;
  }
}
class Vr {
  constructor() {
    this.i = -1, this.end = 0;
  }
  enqueue(t, n, s) {
    this.i = 0, this.end = s, this.current = t, this.value = n;
  }
  reset() {
    this.i = this.end, this.current = void 0, this.value = void 0;
  }
}
function qr(e) {
  return typeof e == "string";
}
function Br(e) {
  let t = [];
  for (; Object.prototype !== e; )
    t = t.concat(Object.getOwnPropertyNames(e)), e = Object.getPrototypeOf(e);
  return t;
}
function Ut(e) {
  const t = [];
  for (const n of Br(e))
    typeof e[n] == "function" && t.push(n);
  return t;
}
function Ir(e, t) {
  const n = (r) => function() {
    const i = Array.prototype.slice.call(arguments, 0);
    return t(r, i);
  }, s = {};
  for (const r of e)
    s[r] = n(r);
  return s;
}
let Ur = typeof document < "u" && document.location && document.location.hash.indexOf("pseudo=true") >= 0;
function Hr(e, t) {
  let n;
  return t.length === 0 ? n = e : n = e.replace(/\{(\d+)\}/g, (s, r) => {
    const i = r[0], l = t[i];
    let o = s;
    return typeof l == "string" ? o = l : (typeof l == "number" || typeof l == "boolean" || l === void 0 || l === null) && (o = String(l)), o;
  }), Ur && (n = "［" + n.replace(/[aouei]/g, "$&$&") + "］"), n;
}
let Wr, zr = {};
function H(e, t, n, ...s) {
  const r = typeof t == "object" ? t.key : t, i = (zr[e] ?? {})[r] ?? n;
  return Hr(i, s);
}
function $r(e) {
  return Wr;
}
const Fe = "en";
let Ht = !1, Wt = !1, at, ct = Fe, bn = Fe, ie;
const Ce = globalThis;
let K;
typeof Ce.vscode < "u" && typeof Ce.vscode.process < "u" ? K = Ce.vscode.process : typeof process < "u" && (K = process);
var Os;
const Gr = typeof ((Os = K == null ? void 0 : K.versions) == null ? void 0 : Os.electron) == "string", jr = Gr && (K == null ? void 0 : K.type) === "renderer";
if (typeof K == "object") {
  Ht = K.platform === "win32", Wt = K.platform === "darwin", K.platform, K.env.CI || K.env.BUILD_ARTIFACTSTAGINGDIRECTORY, at = Fe, ct = Fe;
  const e = K.env.VSCODE_NLS_CONFIG;
  if (e)
    try {
      const t = JSON.parse(e), n = t.availableLanguages["*"];
      at = t.locale, bn = t.osLocale, ct = n || Fe;
    } catch {
    }
} else
  typeof navigator == "object" && !jr ? (ie = navigator.userAgent, Ht = ie.indexOf("Windows") >= 0, Wt = ie.indexOf("Macintosh") >= 0, (ie.indexOf("Macintosh") >= 0 || ie.indexOf("iPad") >= 0 || ie.indexOf("iPhone") >= 0) && navigator.maxTouchPoints && navigator.maxTouchPoints > 0, ie.indexOf("Linux") >= 0, (ie == null ? void 0 : ie.indexOf("Mobi")) >= 0, $r(
    H(
      "vs/base/common/platform",
      { key: "ensureLoaderPluginIsLoaded", comment: ["{Locked}"] },
      "_"
    )
  ), at = Fe, ct = at, bn = navigator.language) : console.error("Unable to resolve platform.");
var xn;
(function(e) {
  e[e.Web = 0] = "Web", e[e.Mac = 1] = "Mac", e[e.Linux = 2] = "Linux", e[e.Windows = 3] = "Windows";
})(xn || (xn = {}));
const et = Ht, Or = Wt, he = ie, ge = ct;
var pn;
(function(e) {
  function t() {
    return ge;
  }
  e.value = t;
  function n() {
    return ge.length === 2 ? ge === "en" : ge.length >= 3 ? ge[0] === "e" && ge[1] === "n" && ge[2] === "-" : !1;
  }
  e.isDefaultVariant = n;
  function s() {
    return ge === "en";
  }
  e.isDefault = s;
})(pn || (pn = {}));
const Xr = typeof Ce.postMessage == "function" && !Ce.importScripts;
(() => {
  if (Xr) {
    const e = [];
    Ce.addEventListener("message", (n) => {
      if (n.data && n.data.vscodeScheduleAsyncWork)
        for (let s = 0, r = e.length; s < r; s++) {
          const i = e[s];
          if (i.id === n.data.vscodeScheduleAsyncWork) {
            e.splice(s, 1), i.callback();
            return;
          }
        }
    });
    let t = 0;
    return (n) => {
      const s = ++t;
      e.push({
        id: s,
        callback: n
      }), Ce.postMessage({ vscodeScheduleAsyncWork: s }, "*");
    };
  }
  return (e) => setTimeout(e);
})();
var _n;
(function(e) {
  e[e.Windows = 1] = "Windows", e[e.Macintosh = 2] = "Macintosh", e[e.Linux = 3] = "Linux";
})(_n || (_n = {}));
const Qr = !!(he && he.indexOf("Chrome") >= 0);
he && he.indexOf("Firefox") >= 0;
!Qr && he && he.indexOf("Safari") >= 0;
he && he.indexOf("Edg/") >= 0;
he && he.indexOf("Android") >= 0;
const Js = Object.freeze(function(e, t) {
  const n = setTimeout(e.bind(t), 0);
  return { dispose() {
    clearTimeout(n);
  } };
});
var xt;
(function(e) {
  function t(n) {
    return n === e.None || n === e.Cancelled || n instanceof ht ? !0 : !n || typeof n != "object" ? !1 : typeof n.isCancellationRequested == "boolean" && typeof n.onCancellationRequested == "function";
  }
  e.isCancellationToken = t, e.None = Object.freeze({
    isCancellationRequested: !1,
    onCancellationRequested: Bt.None
  }), e.Cancelled = Object.freeze({
    isCancellationRequested: !0,
    onCancellationRequested: Js
  });
})(xt || (xt = {}));
class ht {
  constructor() {
    this._isCancelled = !1, this._emitter = null;
  }
  cancel() {
    this._isCancelled || (this._isCancelled = !0, this._emitter && (this._emitter.fire(void 0), this.dispose()));
  }
  get isCancellationRequested() {
    return this._isCancelled;
  }
  get onCancellationRequested() {
    return this._isCancelled ? Js : (this._emitter || (this._emitter = new ae()), this._emitter.event);
  }
  dispose() {
    this._emitter && (this._emitter.dispose(), this._emitter = null);
  }
}
class Jr {
  constructor(t) {
    this._token = void 0, this._parentListener = void 0, this._parentListener = t && t.onCancellationRequested(this.cancel, this);
  }
  get token() {
    return this._token || (this._token = new ht()), this._token;
  }
  cancel() {
    this._token ? this._token instanceof ht && this._token.cancel() : this._token = xt.Cancelled;
  }
  dispose(t = !1) {
    var n;
    t && this.cancel(), (n = this._parentListener) == null || n.dispose(), this._token ? this._token instanceof ht && this._token.dispose() : this._token = xt.None;
  }
}
class Yr {
  constructor(t) {
    this.fn = t, this.lastCache = void 0, this.lastArgKey = void 0;
  }
  get(t) {
    const n = JSON.stringify(t);
    return this.lastArgKey !== n && (this.lastArgKey = n, this.lastCache = this.fn(t)), this.lastCache;
  }
}
class Ln {
  constructor(t) {
    this.executor = t, this._didRun = !1;
  }
  get hasValue() {
    return this._didRun;
  }
  get value() {
    if (!this._didRun)
      try {
        this._value = this.executor();
      } catch (t) {
        this._error = t;
      } finally {
        this._didRun = !0;
      }
    if (this._error)
      throw this._error;
    return this._value;
  }
  get rawValue() {
    return this._value;
  }
}
function Zr(e) {
  return e.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g, "\\$&");
}
function Kr(e) {
  return e.split(/\r\n|\r|\n/);
}
function ei(e) {
  for (let t = 0, n = e.length; t < n; t++) {
    const s = e.charCodeAt(t);
    if (s !== 32 && s !== 9)
      return t;
  }
  return -1;
}
function ti(e, t = e.length - 1) {
  for (let n = t; n >= 0; n--) {
    const s = e.charCodeAt(n);
    if (s !== 32 && s !== 9)
      return n;
  }
  return -1;
}
function Ys(e) {
  return e >= 65 && e <= 90;
}
function zt(e) {
  return 55296 <= e && e <= 56319;
}
function ni(e) {
  return 56320 <= e && e <= 57343;
}
function si(e, t) {
  return (e - 55296 << 10) + (t - 56320) + 65536;
}
function ri(e, t, n) {
  const s = e.charCodeAt(n);
  if (zt(s) && n + 1 < t) {
    const r = e.charCodeAt(n + 1);
    if (ni(r))
      return si(s, r);
  }
  return s;
}
const ii = /^[\t\n\r\x20-\x7E]*$/;
function ai(e) {
  return ii.test(e);
}
const ue = class ue {
  static getInstance(t) {
    return ue.cache.get(Array.from(t));
  }
  static getLocales() {
    return ue._locales.value;
  }
  constructor(t) {
    this.confusableDictionary = t;
  }
  isAmbiguous(t) {
    return this.confusableDictionary.has(t);
  }
  getPrimaryConfusable(t) {
    return this.confusableDictionary.get(t);
  }
  getConfusableCodePoints() {
    return new Set(this.confusableDictionary.keys());
  }
};
ue.ambiguousCharacterData = new Ln(() => JSON.parse('{"_common":[8232,32,8233,32,5760,32,8192,32,8193,32,8194,32,8195,32,8196,32,8197,32,8198,32,8200,32,8201,32,8202,32,8287,32,8199,32,8239,32,2042,95,65101,95,65102,95,65103,95,8208,45,8209,45,8210,45,65112,45,1748,45,8259,45,727,45,8722,45,10134,45,11450,45,1549,44,1643,44,8218,44,184,44,42233,44,894,59,2307,58,2691,58,1417,58,1795,58,1796,58,5868,58,65072,58,6147,58,6153,58,8282,58,1475,58,760,58,42889,58,8758,58,720,58,42237,58,451,33,11601,33,660,63,577,63,2429,63,5038,63,42731,63,119149,46,8228,46,1793,46,1794,46,42510,46,68176,46,1632,46,1776,46,42232,46,1373,96,65287,96,8219,96,8242,96,1370,96,1523,96,8175,96,65344,96,900,96,8189,96,8125,96,8127,96,8190,96,697,96,884,96,712,96,714,96,715,96,756,96,699,96,701,96,700,96,702,96,42892,96,1497,96,2036,96,2037,96,5194,96,5836,96,94033,96,94034,96,65339,91,10088,40,10098,40,12308,40,64830,40,65341,93,10089,41,10099,41,12309,41,64831,41,10100,123,119060,123,10101,125,65342,94,8270,42,1645,42,8727,42,66335,42,5941,47,8257,47,8725,47,8260,47,9585,47,10187,47,10744,47,119354,47,12755,47,12339,47,11462,47,20031,47,12035,47,65340,92,65128,92,8726,92,10189,92,10741,92,10745,92,119311,92,119355,92,12756,92,20022,92,12034,92,42872,38,708,94,710,94,5869,43,10133,43,66203,43,8249,60,10094,60,706,60,119350,60,5176,60,5810,60,5120,61,11840,61,12448,61,42239,61,8250,62,10095,62,707,62,119351,62,5171,62,94015,62,8275,126,732,126,8128,126,8764,126,65372,124,65293,45,120784,50,120794,50,120804,50,120814,50,120824,50,130034,50,42842,50,423,50,1000,50,42564,50,5311,50,42735,50,119302,51,120785,51,120795,51,120805,51,120815,51,120825,51,130035,51,42923,51,540,51,439,51,42858,51,11468,51,1248,51,94011,51,71882,51,120786,52,120796,52,120806,52,120816,52,120826,52,130036,52,5070,52,71855,52,120787,53,120797,53,120807,53,120817,53,120827,53,130037,53,444,53,71867,53,120788,54,120798,54,120808,54,120818,54,120828,54,130038,54,11474,54,5102,54,71893,54,119314,55,120789,55,120799,55,120809,55,120819,55,120829,55,130039,55,66770,55,71878,55,2819,56,2538,56,2666,56,125131,56,120790,56,120800,56,120810,56,120820,56,120830,56,130040,56,547,56,546,56,66330,56,2663,57,2920,57,2541,57,3437,57,120791,57,120801,57,120811,57,120821,57,120831,57,130041,57,42862,57,11466,57,71884,57,71852,57,71894,57,9082,97,65345,97,119834,97,119886,97,119938,97,119990,97,120042,97,120094,97,120146,97,120198,97,120250,97,120302,97,120354,97,120406,97,120458,97,593,97,945,97,120514,97,120572,97,120630,97,120688,97,120746,97,65313,65,119808,65,119860,65,119912,65,119964,65,120016,65,120068,65,120120,65,120172,65,120224,65,120276,65,120328,65,120380,65,120432,65,913,65,120488,65,120546,65,120604,65,120662,65,120720,65,5034,65,5573,65,42222,65,94016,65,66208,65,119835,98,119887,98,119939,98,119991,98,120043,98,120095,98,120147,98,120199,98,120251,98,120303,98,120355,98,120407,98,120459,98,388,98,5071,98,5234,98,5551,98,65314,66,8492,66,119809,66,119861,66,119913,66,120017,66,120069,66,120121,66,120173,66,120225,66,120277,66,120329,66,120381,66,120433,66,42932,66,914,66,120489,66,120547,66,120605,66,120663,66,120721,66,5108,66,5623,66,42192,66,66178,66,66209,66,66305,66,65347,99,8573,99,119836,99,119888,99,119940,99,119992,99,120044,99,120096,99,120148,99,120200,99,120252,99,120304,99,120356,99,120408,99,120460,99,7428,99,1010,99,11429,99,43951,99,66621,99,128844,67,71922,67,71913,67,65315,67,8557,67,8450,67,8493,67,119810,67,119862,67,119914,67,119966,67,120018,67,120174,67,120226,67,120278,67,120330,67,120382,67,120434,67,1017,67,11428,67,5087,67,42202,67,66210,67,66306,67,66581,67,66844,67,8574,100,8518,100,119837,100,119889,100,119941,100,119993,100,120045,100,120097,100,120149,100,120201,100,120253,100,120305,100,120357,100,120409,100,120461,100,1281,100,5095,100,5231,100,42194,100,8558,68,8517,68,119811,68,119863,68,119915,68,119967,68,120019,68,120071,68,120123,68,120175,68,120227,68,120279,68,120331,68,120383,68,120435,68,5024,68,5598,68,5610,68,42195,68,8494,101,65349,101,8495,101,8519,101,119838,101,119890,101,119942,101,120046,101,120098,101,120150,101,120202,101,120254,101,120306,101,120358,101,120410,101,120462,101,43826,101,1213,101,8959,69,65317,69,8496,69,119812,69,119864,69,119916,69,120020,69,120072,69,120124,69,120176,69,120228,69,120280,69,120332,69,120384,69,120436,69,917,69,120492,69,120550,69,120608,69,120666,69,120724,69,11577,69,5036,69,42224,69,71846,69,71854,69,66182,69,119839,102,119891,102,119943,102,119995,102,120047,102,120099,102,120151,102,120203,102,120255,102,120307,102,120359,102,120411,102,120463,102,43829,102,42905,102,383,102,7837,102,1412,102,119315,70,8497,70,119813,70,119865,70,119917,70,120021,70,120073,70,120125,70,120177,70,120229,70,120281,70,120333,70,120385,70,120437,70,42904,70,988,70,120778,70,5556,70,42205,70,71874,70,71842,70,66183,70,66213,70,66853,70,65351,103,8458,103,119840,103,119892,103,119944,103,120048,103,120100,103,120152,103,120204,103,120256,103,120308,103,120360,103,120412,103,120464,103,609,103,7555,103,397,103,1409,103,119814,71,119866,71,119918,71,119970,71,120022,71,120074,71,120126,71,120178,71,120230,71,120282,71,120334,71,120386,71,120438,71,1292,71,5056,71,5107,71,42198,71,65352,104,8462,104,119841,104,119945,104,119997,104,120049,104,120101,104,120153,104,120205,104,120257,104,120309,104,120361,104,120413,104,120465,104,1211,104,1392,104,5058,104,65320,72,8459,72,8460,72,8461,72,119815,72,119867,72,119919,72,120023,72,120179,72,120231,72,120283,72,120335,72,120387,72,120439,72,919,72,120494,72,120552,72,120610,72,120668,72,120726,72,11406,72,5051,72,5500,72,42215,72,66255,72,731,105,9075,105,65353,105,8560,105,8505,105,8520,105,119842,105,119894,105,119946,105,119998,105,120050,105,120102,105,120154,105,120206,105,120258,105,120310,105,120362,105,120414,105,120466,105,120484,105,618,105,617,105,953,105,8126,105,890,105,120522,105,120580,105,120638,105,120696,105,120754,105,1110,105,42567,105,1231,105,43893,105,5029,105,71875,105,65354,106,8521,106,119843,106,119895,106,119947,106,119999,106,120051,106,120103,106,120155,106,120207,106,120259,106,120311,106,120363,106,120415,106,120467,106,1011,106,1112,106,65322,74,119817,74,119869,74,119921,74,119973,74,120025,74,120077,74,120129,74,120181,74,120233,74,120285,74,120337,74,120389,74,120441,74,42930,74,895,74,1032,74,5035,74,5261,74,42201,74,119844,107,119896,107,119948,107,120000,107,120052,107,120104,107,120156,107,120208,107,120260,107,120312,107,120364,107,120416,107,120468,107,8490,75,65323,75,119818,75,119870,75,119922,75,119974,75,120026,75,120078,75,120130,75,120182,75,120234,75,120286,75,120338,75,120390,75,120442,75,922,75,120497,75,120555,75,120613,75,120671,75,120729,75,11412,75,5094,75,5845,75,42199,75,66840,75,1472,108,8739,73,9213,73,65512,73,1633,108,1777,73,66336,108,125127,108,120783,73,120793,73,120803,73,120813,73,120823,73,130033,73,65321,73,8544,73,8464,73,8465,73,119816,73,119868,73,119920,73,120024,73,120128,73,120180,73,120232,73,120284,73,120336,73,120388,73,120440,73,65356,108,8572,73,8467,108,119845,108,119897,108,119949,108,120001,108,120053,108,120105,73,120157,73,120209,73,120261,73,120313,73,120365,73,120417,73,120469,73,448,73,120496,73,120554,73,120612,73,120670,73,120728,73,11410,73,1030,73,1216,73,1493,108,1503,108,1575,108,126464,108,126592,108,65166,108,65165,108,1994,108,11599,73,5825,73,42226,73,93992,73,66186,124,66313,124,119338,76,8556,76,8466,76,119819,76,119871,76,119923,76,120027,76,120079,76,120131,76,120183,76,120235,76,120287,76,120339,76,120391,76,120443,76,11472,76,5086,76,5290,76,42209,76,93974,76,71843,76,71858,76,66587,76,66854,76,65325,77,8559,77,8499,77,119820,77,119872,77,119924,77,120028,77,120080,77,120132,77,120184,77,120236,77,120288,77,120340,77,120392,77,120444,77,924,77,120499,77,120557,77,120615,77,120673,77,120731,77,1018,77,11416,77,5047,77,5616,77,5846,77,42207,77,66224,77,66321,77,119847,110,119899,110,119951,110,120003,110,120055,110,120107,110,120159,110,120211,110,120263,110,120315,110,120367,110,120419,110,120471,110,1400,110,1404,110,65326,78,8469,78,119821,78,119873,78,119925,78,119977,78,120029,78,120081,78,120185,78,120237,78,120289,78,120341,78,120393,78,120445,78,925,78,120500,78,120558,78,120616,78,120674,78,120732,78,11418,78,42208,78,66835,78,3074,111,3202,111,3330,111,3458,111,2406,111,2662,111,2790,111,3046,111,3174,111,3302,111,3430,111,3664,111,3792,111,4160,111,1637,111,1781,111,65359,111,8500,111,119848,111,119900,111,119952,111,120056,111,120108,111,120160,111,120212,111,120264,111,120316,111,120368,111,120420,111,120472,111,7439,111,7441,111,43837,111,959,111,120528,111,120586,111,120644,111,120702,111,120760,111,963,111,120532,111,120590,111,120648,111,120706,111,120764,111,11423,111,4351,111,1413,111,1505,111,1607,111,126500,111,126564,111,126596,111,65259,111,65260,111,65258,111,65257,111,1726,111,64428,111,64429,111,64427,111,64426,111,1729,111,64424,111,64425,111,64423,111,64422,111,1749,111,3360,111,4125,111,66794,111,71880,111,71895,111,66604,111,1984,79,2534,79,2918,79,12295,79,70864,79,71904,79,120782,79,120792,79,120802,79,120812,79,120822,79,130032,79,65327,79,119822,79,119874,79,119926,79,119978,79,120030,79,120082,79,120134,79,120186,79,120238,79,120290,79,120342,79,120394,79,120446,79,927,79,120502,79,120560,79,120618,79,120676,79,120734,79,11422,79,1365,79,11604,79,4816,79,2848,79,66754,79,42227,79,71861,79,66194,79,66219,79,66564,79,66838,79,9076,112,65360,112,119849,112,119901,112,119953,112,120005,112,120057,112,120109,112,120161,112,120213,112,120265,112,120317,112,120369,112,120421,112,120473,112,961,112,120530,112,120544,112,120588,112,120602,112,120646,112,120660,112,120704,112,120718,112,120762,112,120776,112,11427,112,65328,80,8473,80,119823,80,119875,80,119927,80,119979,80,120031,80,120083,80,120187,80,120239,80,120291,80,120343,80,120395,80,120447,80,929,80,120504,80,120562,80,120620,80,120678,80,120736,80,11426,80,5090,80,5229,80,42193,80,66197,80,119850,113,119902,113,119954,113,120006,113,120058,113,120110,113,120162,113,120214,113,120266,113,120318,113,120370,113,120422,113,120474,113,1307,113,1379,113,1382,113,8474,81,119824,81,119876,81,119928,81,119980,81,120032,81,120084,81,120188,81,120240,81,120292,81,120344,81,120396,81,120448,81,11605,81,119851,114,119903,114,119955,114,120007,114,120059,114,120111,114,120163,114,120215,114,120267,114,120319,114,120371,114,120423,114,120475,114,43847,114,43848,114,7462,114,11397,114,43905,114,119318,82,8475,82,8476,82,8477,82,119825,82,119877,82,119929,82,120033,82,120189,82,120241,82,120293,82,120345,82,120397,82,120449,82,422,82,5025,82,5074,82,66740,82,5511,82,42211,82,94005,82,65363,115,119852,115,119904,115,119956,115,120008,115,120060,115,120112,115,120164,115,120216,115,120268,115,120320,115,120372,115,120424,115,120476,115,42801,115,445,115,1109,115,43946,115,71873,115,66632,115,65331,83,119826,83,119878,83,119930,83,119982,83,120034,83,120086,83,120138,83,120190,83,120242,83,120294,83,120346,83,120398,83,120450,83,1029,83,1359,83,5077,83,5082,83,42210,83,94010,83,66198,83,66592,83,119853,116,119905,116,119957,116,120009,116,120061,116,120113,116,120165,116,120217,116,120269,116,120321,116,120373,116,120425,116,120477,116,8868,84,10201,84,128872,84,65332,84,119827,84,119879,84,119931,84,119983,84,120035,84,120087,84,120139,84,120191,84,120243,84,120295,84,120347,84,120399,84,120451,84,932,84,120507,84,120565,84,120623,84,120681,84,120739,84,11430,84,5026,84,42196,84,93962,84,71868,84,66199,84,66225,84,66325,84,119854,117,119906,117,119958,117,120010,117,120062,117,120114,117,120166,117,120218,117,120270,117,120322,117,120374,117,120426,117,120478,117,42911,117,7452,117,43854,117,43858,117,651,117,965,117,120534,117,120592,117,120650,117,120708,117,120766,117,1405,117,66806,117,71896,117,8746,85,8899,85,119828,85,119880,85,119932,85,119984,85,120036,85,120088,85,120140,85,120192,85,120244,85,120296,85,120348,85,120400,85,120452,85,1357,85,4608,85,66766,85,5196,85,42228,85,94018,85,71864,85,8744,118,8897,118,65366,118,8564,118,119855,118,119907,118,119959,118,120011,118,120063,118,120115,118,120167,118,120219,118,120271,118,120323,118,120375,118,120427,118,120479,118,7456,118,957,118,120526,118,120584,118,120642,118,120700,118,120758,118,1141,118,1496,118,71430,118,43945,118,71872,118,119309,86,1639,86,1783,86,8548,86,119829,86,119881,86,119933,86,119985,86,120037,86,120089,86,120141,86,120193,86,120245,86,120297,86,120349,86,120401,86,120453,86,1140,86,11576,86,5081,86,5167,86,42719,86,42214,86,93960,86,71840,86,66845,86,623,119,119856,119,119908,119,119960,119,120012,119,120064,119,120116,119,120168,119,120220,119,120272,119,120324,119,120376,119,120428,119,120480,119,7457,119,1121,119,1309,119,1377,119,71434,119,71438,119,71439,119,43907,119,71919,87,71910,87,119830,87,119882,87,119934,87,119986,87,120038,87,120090,87,120142,87,120194,87,120246,87,120298,87,120350,87,120402,87,120454,87,1308,87,5043,87,5076,87,42218,87,5742,120,10539,120,10540,120,10799,120,65368,120,8569,120,119857,120,119909,120,119961,120,120013,120,120065,120,120117,120,120169,120,120221,120,120273,120,120325,120,120377,120,120429,120,120481,120,5441,120,5501,120,5741,88,9587,88,66338,88,71916,88,65336,88,8553,88,119831,88,119883,88,119935,88,119987,88,120039,88,120091,88,120143,88,120195,88,120247,88,120299,88,120351,88,120403,88,120455,88,42931,88,935,88,120510,88,120568,88,120626,88,120684,88,120742,88,11436,88,11613,88,5815,88,42219,88,66192,88,66228,88,66327,88,66855,88,611,121,7564,121,65369,121,119858,121,119910,121,119962,121,120014,121,120066,121,120118,121,120170,121,120222,121,120274,121,120326,121,120378,121,120430,121,120482,121,655,121,7935,121,43866,121,947,121,8509,121,120516,121,120574,121,120632,121,120690,121,120748,121,1199,121,4327,121,71900,121,65337,89,119832,89,119884,89,119936,89,119988,89,120040,89,120092,89,120144,89,120196,89,120248,89,120300,89,120352,89,120404,89,120456,89,933,89,978,89,120508,89,120566,89,120624,89,120682,89,120740,89,11432,89,1198,89,5033,89,5053,89,42220,89,94019,89,71844,89,66226,89,119859,122,119911,122,119963,122,120015,122,120067,122,120119,122,120171,122,120223,122,120275,122,120327,122,120379,122,120431,122,120483,122,7458,122,43923,122,71876,122,66293,90,71909,90,65338,90,8484,90,8488,90,119833,90,119885,90,119937,90,119989,90,120041,90,120197,90,120249,90,120301,90,120353,90,120405,90,120457,90,918,90,120493,90,120551,90,120609,90,120667,90,120725,90,5059,90,42204,90,71849,90,65282,34,65284,36,65285,37,65286,38,65290,42,65291,43,65294,46,65295,47,65296,48,65297,49,65298,50,65299,51,65300,52,65301,53,65302,54,65303,55,65304,56,65305,57,65308,60,65309,61,65310,62,65312,64,65316,68,65318,70,65319,71,65324,76,65329,81,65330,82,65333,85,65334,86,65335,87,65343,95,65346,98,65348,100,65350,102,65355,107,65357,109,65358,110,65361,113,65362,114,65364,116,65365,117,65367,119,65370,122,65371,123,65373,125,119846,109],"_default":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"cs":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"de":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"es":[8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"fr":[65374,126,65306,58,65281,33,8216,96,8245,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"it":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"ja":[8211,45,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65292,44,65307,59],"ko":[8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"pl":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"pt-BR":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"qps-ploc":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"ru":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,305,105,921,73,1009,112,215,120,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"tr":[160,32,8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"zh-hans":[65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41],"zh-hant":[8211,45,65374,126,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65307,59]}')), ue.cache = new Yr((t) => {
  function n(h) {
    const f = /* @__PURE__ */ new Map();
    for (let m = 0; m < h.length; m += 2)
      f.set(h[m], h[m + 1]);
    return f;
  }
  function s(h, f) {
    const m = new Map(h);
    for (const [d, g] of f)
      m.set(d, g);
    return m;
  }
  function r(h, f) {
    if (!h)
      return f;
    const m = /* @__PURE__ */ new Map();
    for (const [d, g] of h)
      f.has(d) && m.set(d, g);
    return m;
  }
  const i = ue.ambiguousCharacterData.value;
  let l = t.filter((h) => !h.startsWith("_") && h in i);
  l.length === 0 && (l = ["_default"]);
  let o;
  for (const h of l) {
    const f = n(i[h]);
    o = r(o, f);
  }
  const u = n(i._common), c = s(u, o);
  return new ue(c);
}), ue._locales = new Ln(() => Object.keys(ue.ambiguousCharacterData.value).filter((t) => !t.startsWith("_")));
let tt = ue;
const Ie = class Ie {
  static getRawData() {
    return JSON.parse("[9,10,11,12,13,32,127,160,173,847,1564,4447,4448,6068,6069,6155,6156,6157,6158,7355,7356,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8203,8204,8205,8206,8207,8234,8235,8236,8237,8238,8239,8287,8288,8289,8290,8291,8292,8293,8294,8295,8296,8297,8298,8299,8300,8301,8302,8303,10240,12288,12644,65024,65025,65026,65027,65028,65029,65030,65031,65032,65033,65034,65035,65036,65037,65038,65039,65279,65440,65520,65521,65522,65523,65524,65525,65526,65527,65528,65532,78844,119155,119156,119157,119158,119159,119160,119161,119162,917504,917505,917506,917507,917508,917509,917510,917511,917512,917513,917514,917515,917516,917517,917518,917519,917520,917521,917522,917523,917524,917525,917526,917527,917528,917529,917530,917531,917532,917533,917534,917535,917536,917537,917538,917539,917540,917541,917542,917543,917544,917545,917546,917547,917548,917549,917550,917551,917552,917553,917554,917555,917556,917557,917558,917559,917560,917561,917562,917563,917564,917565,917566,917567,917568,917569,917570,917571,917572,917573,917574,917575,917576,917577,917578,917579,917580,917581,917582,917583,917584,917585,917586,917587,917588,917589,917590,917591,917592,917593,917594,917595,917596,917597,917598,917599,917600,917601,917602,917603,917604,917605,917606,917607,917608,917609,917610,917611,917612,917613,917614,917615,917616,917617,917618,917619,917620,917621,917622,917623,917624,917625,917626,917627,917628,917629,917630,917631,917760,917761,917762,917763,917764,917765,917766,917767,917768,917769,917770,917771,917772,917773,917774,917775,917776,917777,917778,917779,917780,917781,917782,917783,917784,917785,917786,917787,917788,917789,917790,917791,917792,917793,917794,917795,917796,917797,917798,917799,917800,917801,917802,917803,917804,917805,917806,917807,917808,917809,917810,917811,917812,917813,917814,917815,917816,917817,917818,917819,917820,917821,917822,917823,917824,917825,917826,917827,917828,917829,917830,917831,917832,917833,917834,917835,917836,917837,917838,917839,917840,917841,917842,917843,917844,917845,917846,917847,917848,917849,917850,917851,917852,917853,917854,917855,917856,917857,917858,917859,917860,917861,917862,917863,917864,917865,917866,917867,917868,917869,917870,917871,917872,917873,917874,917875,917876,917877,917878,917879,917880,917881,917882,917883,917884,917885,917886,917887,917888,917889,917890,917891,917892,917893,917894,917895,917896,917897,917898,917899,917900,917901,917902,917903,917904,917905,917906,917907,917908,917909,917910,917911,917912,917913,917914,917915,917916,917917,917918,917919,917920,917921,917922,917923,917924,917925,917926,917927,917928,917929,917930,917931,917932,917933,917934,917935,917936,917937,917938,917939,917940,917941,917942,917943,917944,917945,917946,917947,917948,917949,917950,917951,917952,917953,917954,917955,917956,917957,917958,917959,917960,917961,917962,917963,917964,917965,917966,917967,917968,917969,917970,917971,917972,917973,917974,917975,917976,917977,917978,917979,917980,917981,917982,917983,917984,917985,917986,917987,917988,917989,917990,917991,917992,917993,917994,917995,917996,917997,917998,917999]");
  }
  static getData() {
    return this._data || (this._data = new Set(Ie.getRawData())), this._data;
  }
  static isInvisibleCharacter(t) {
    return Ie.getData().has(t);
  }
  static get codePoints() {
    return Ie.getData();
  }
};
Ie._data = void 0;
let Qe = Ie;
const li = "$initialize";
class oi {
  constructor(t, n, s, r) {
    this.vsWorker = t, this.req = n, this.method = s, this.args = r, this.type = 0;
  }
}
class wn {
  constructor(t, n, s, r) {
    this.vsWorker = t, this.seq = n, this.res = s, this.err = r, this.type = 1;
  }
}
class ui {
  constructor(t, n, s, r) {
    this.vsWorker = t, this.req = n, this.eventName = s, this.arg = r, this.type = 2;
  }
}
class ci {
  constructor(t, n, s) {
    this.vsWorker = t, this.req = n, this.event = s, this.type = 3;
  }
}
class hi {
  constructor(t, n) {
    this.vsWorker = t, this.req = n, this.type = 4;
  }
}
class fi {
  constructor(t) {
    this._workerId = -1, this._handler = t, this._lastSentReq = 0, this._pendingReplies = /* @__PURE__ */ Object.create(null), this._pendingEmitters = /* @__PURE__ */ new Map(), this._pendingEvents = /* @__PURE__ */ new Map();
  }
  setWorkerId(t) {
    this._workerId = t;
  }
  sendMessage(t, n) {
    const s = String(++this._lastSentReq);
    return new Promise((r, i) => {
      this._pendingReplies[s] = {
        resolve: r,
        reject: i
      }, this._send(new oi(this._workerId, s, t, n));
    });
  }
  listen(t, n) {
    let s = null;
    const r = new ae({
      onWillAddFirstListener: () => {
        s = String(++this._lastSentReq), this._pendingEmitters.set(s, r), this._send(new ui(this._workerId, s, t, n));
      },
      onDidRemoveLastListener: () => {
        this._pendingEmitters.delete(s), this._send(new hi(this._workerId, s)), s = null;
      }
    });
    return r.event;
  }
  handleMessage(t) {
    !t || !t.vsWorker || this._workerId !== -1 && t.vsWorker !== this._workerId || this._handleMessage(t);
  }
  _handleMessage(t) {
    switch (t.type) {
      case 1:
        return this._handleReplyMessage(t);
      case 0:
        return this._handleRequestMessage(t);
      case 2:
        return this._handleSubscribeEventMessage(t);
      case 3:
        return this._handleEventMessage(t);
      case 4:
        return this._handleUnsubscribeEventMessage(t);
    }
  }
  _handleReplyMessage(t) {
    if (!this._pendingReplies[t.seq]) {
      console.warn("Got reply to unknown seq");
      return;
    }
    const n = this._pendingReplies[t.seq];
    if (delete this._pendingReplies[t.seq], t.err) {
      let s = t.err;
      t.err.$isError && (s = new Error(), s.name = t.err.name, s.message = t.err.message, s.stack = t.err.stack), n.reject(s);
      return;
    }
    n.resolve(t.res);
  }
  _handleRequestMessage(t) {
    const n = t.req;
    this._handler.handleMessage(t.method, t.args).then((r) => {
      this._send(new wn(this._workerId, n, r, void 0));
    }, (r) => {
      r.detail instanceof Error && (r.detail = dn(r.detail)), this._send(new wn(this._workerId, n, void 0, dn(r)));
    });
  }
  _handleSubscribeEventMessage(t) {
    const n = t.req, s = this._handler.handleEvent(t.eventName, t.arg)((r) => {
      this._send(new ci(this._workerId, n, r));
    });
    this._pendingEvents.set(n, s);
  }
  _handleEventMessage(t) {
    if (!this._pendingEmitters.has(t.req)) {
      console.warn("Got event for unknown req");
      return;
    }
    this._pendingEmitters.get(t.req).fire(t.event);
  }
  _handleUnsubscribeEventMessage(t) {
    if (!this._pendingEvents.has(t.req)) {
      console.warn("Got unsubscribe for unknown req");
      return;
    }
    this._pendingEvents.get(t.req).dispose(), this._pendingEvents.delete(t.req);
  }
  _send(t) {
    const n = [];
    if (t.type === 0)
      for (let s = 0; s < t.args.length; s++)
        t.args[s] instanceof ArrayBuffer && n.push(t.args[s]);
    else
      t.type === 1 && t.res instanceof ArrayBuffer && n.push(t.res);
    this._handler.sendMessage(t, n);
  }
}
function Zs(e) {
  return e[0] === "o" && e[1] === "n" && Ys(e.charCodeAt(2));
}
function Ks(e) {
  return /^onDynamic/.test(e) && Ys(e.charCodeAt(9));
}
function mi(e, t, n) {
  const s = (l) => function() {
    const o = Array.prototype.slice.call(arguments, 0);
    return t(l, o);
  }, r = (l) => function(o) {
    return n(l, o);
  }, i = {};
  for (const l of e) {
    if (Ks(l)) {
      i[l] = r(l);
      continue;
    }
    if (Zs(l)) {
      i[l] = n(l, void 0);
      continue;
    }
    i[l] = s(l);
  }
  return i;
}
class di {
  constructor(t, n) {
    this._requestHandlerFactory = n, this._requestHandler = null, this._protocol = new fi({
      sendMessage: (s, r) => {
        t(s, r);
      },
      handleMessage: (s, r) => this._handleMessage(s, r),
      handleEvent: (s, r) => this._handleEvent(s, r)
    });
  }
  onmessage(t) {
    this._protocol.handleMessage(t);
  }
  _handleMessage(t, n) {
    if (t === li)
      return this.initialize(n[0], n[1], n[2], n[3]);
    if (!this._requestHandler || typeof this._requestHandler[t] != "function")
      return Promise.reject(new Error("Missing requestHandler or method: " + t));
    try {
      return Promise.resolve(this._requestHandler[t].apply(this._requestHandler, n));
    } catch (s) {
      return Promise.reject(s);
    }
  }
  _handleEvent(t, n) {
    if (!this._requestHandler)
      throw new Error("Missing requestHandler");
    if (Ks(t)) {
      const s = this._requestHandler[t].call(this._requestHandler, n);
      if (typeof s != "function")
        throw new Error(`Missing dynamic event ${t} on request handler.`);
      return s;
    }
    if (Zs(t)) {
      const s = this._requestHandler[t];
      if (typeof s != "function")
        throw new Error(`Missing event ${t} on request handler.`);
      return s;
    }
    throw new Error(`Malformed event name ${t}`);
  }
  initialize(t, n, s, r) {
    this._protocol.setWorkerId(t);
    const o = mi(r, (u, c) => this._protocol.sendMessage(u, c), (u, c) => this._protocol.listen(u, c));
    return this._requestHandlerFactory ? (this._requestHandler = this._requestHandlerFactory(o), Promise.resolve(Ut(this._requestHandler))) : (n && (typeof n.baseUrl < "u" && delete n.baseUrl, typeof n.paths < "u" && typeof n.paths.vs < "u" && delete n.paths.vs, typeof n.trustedTypesPolicy < "u" && delete n.trustedTypesPolicy, n.catchError = !0, globalThis.require.config(n)), new Promise((u, c) => {
      const h = globalThis.require;
      h([s], (f) => {
        if (this._requestHandler = f.create(o), !this._requestHandler) {
          c(new Error("No RequestHandler!"));
          return;
        }
        u(Ut(this._requestHandler));
      }, c);
    }));
  }
}
class pe {
  constructor(t, n, s, r) {
    this.originalStart = t, this.originalLength = n, this.modifiedStart = s, this.modifiedLength = r;
  }
  getOriginalEnd() {
    return this.originalStart + this.originalLength;
  }
  getModifiedEnd() {
    return this.modifiedStart + this.modifiedLength;
  }
}
function vn(e, t) {
  return (t << 5) - t + e | 0;
}
function gi(e, t) {
  t = vn(149417, t);
  for (let n = 0, s = e.length; n < s; n++)
    t = vn(e.charCodeAt(n), t);
  return t;
}
class Nn {
  constructor(t) {
    this.source = t;
  }
  getElements() {
    const t = this.source, n = new Int32Array(t.length);
    for (let s = 0, r = t.length; s < r; s++)
      n[s] = t.charCodeAt(s);
    return n;
  }
}
function bi(e, t, n) {
  return new Le(new Nn(e), new Nn(t)).ComputeDiff(n).changes;
}
class Me {
  static Assert(t, n) {
    if (!t)
      throw new Error(n);
  }
}
class ke {
  static Copy(t, n, s, r, i) {
    for (let l = 0; l < i; l++)
      s[r + l] = t[n + l];
  }
  static Copy2(t, n, s, r, i) {
    for (let l = 0; l < i; l++)
      s[r + l] = t[n + l];
  }
}
class Sn {
  constructor() {
    this.m_changes = [], this.m_originalStart = 1073741824, this.m_modifiedStart = 1073741824, this.m_originalCount = 0, this.m_modifiedCount = 0;
  }
  MarkNextChange() {
    (this.m_originalCount > 0 || this.m_modifiedCount > 0) && this.m_changes.push(new pe(
      this.m_originalStart,
      this.m_originalCount,
      this.m_modifiedStart,
      this.m_modifiedCount
    )), this.m_originalCount = 0, this.m_modifiedCount = 0, this.m_originalStart = 1073741824, this.m_modifiedStart = 1073741824;
  }
  AddOriginalElement(t, n) {
    this.m_originalStart = Math.min(this.m_originalStart, t), this.m_modifiedStart = Math.min(this.m_modifiedStart, n), this.m_originalCount++;
  }
  AddModifiedElement(t, n) {
    this.m_originalStart = Math.min(this.m_originalStart, t), this.m_modifiedStart = Math.min(this.m_modifiedStart, n), this.m_modifiedCount++;
  }
  getChanges() {
    return (this.m_originalCount > 0 || this.m_modifiedCount > 0) && this.MarkNextChange(), this.m_changes;
  }
  getReverseChanges() {
    return (this.m_originalCount > 0 || this.m_modifiedCount > 0) && this.MarkNextChange(), this.m_changes.reverse(), this.m_changes;
  }
}
class Le {
  constructor(t, n, s = null) {
    this.ContinueProcessingPredicate = s, this._originalSequence = t, this._modifiedSequence = n;
    const [r, i, l] = Le._getElements(t), [o, u, c] = Le._getElements(n);
    this._hasStrings = l && c, this._originalStringElements = r, this._originalElementsOrHash = i, this._modifiedStringElements = o, this._modifiedElementsOrHash = u, this.m_forwardHistory = [], this.m_reverseHistory = [];
  }
  static _isStringArray(t) {
    return t.length > 0 && typeof t[0] == "string";
  }
  static _getElements(t) {
    const n = t.getElements();
    if (Le._isStringArray(n)) {
      const s = new Int32Array(n.length);
      for (let r = 0, i = n.length; r < i; r++)
        s[r] = gi(n[r], 0);
      return [n, s, !0];
    }
    return n instanceof Int32Array ? [[], n, !1] : [[], new Int32Array(n), !1];
  }
  ElementsAreEqual(t, n) {
    return this._originalElementsOrHash[t] !== this._modifiedElementsOrHash[n] ? !1 : this._hasStrings ? this._originalStringElements[t] === this._modifiedStringElements[n] : !0;
  }
  ElementsAreStrictEqual(t, n) {
    if (!this.ElementsAreEqual(t, n))
      return !1;
    const s = Le._getStrictElement(this._originalSequence, t), r = Le._getStrictElement(this._modifiedSequence, n);
    return s === r;
  }
  static _getStrictElement(t, n) {
    return typeof t.getStrictElement == "function" ? t.getStrictElement(n) : null;
  }
  OriginalElementsAreEqual(t, n) {
    return this._originalElementsOrHash[t] !== this._originalElementsOrHash[n] ? !1 : this._hasStrings ? this._originalStringElements[t] === this._originalStringElements[n] : !0;
  }
  ModifiedElementsAreEqual(t, n) {
    return this._modifiedElementsOrHash[t] !== this._modifiedElementsOrHash[n] ? !1 : this._hasStrings ? this._modifiedStringElements[t] === this._modifiedStringElements[n] : !0;
  }
  ComputeDiff(t) {
    return this._ComputeDiff(0, this._originalElementsOrHash.length - 1, 0, this._modifiedElementsOrHash.length - 1, t);
  }
  _ComputeDiff(t, n, s, r, i) {
    const l = [!1];
    let o = this.ComputeDiffRecursive(t, n, s, r, l);
    return i && (o = this.PrettifyChanges(o)), {
      quitEarly: l[0],
      changes: o
    };
  }
  ComputeDiffRecursive(t, n, s, r, i) {
    for (i[0] = !1; t <= n && s <= r && this.ElementsAreEqual(t, s); )
      t++, s++;
    for (; n >= t && r >= s && this.ElementsAreEqual(n, r); )
      n--, r--;
    if (t > n || s > r) {
      let f;
      return s <= r ? (Me.Assert(t === n + 1, "originalStart should only be one more than originalEnd"), f = [
        new pe(t, 0, s, r - s + 1)
      ]) : t <= n ? (Me.Assert(s === r + 1, "modifiedStart should only be one more than modifiedEnd"), f = [
        new pe(t, n - t + 1, s, 0)
      ]) : (Me.Assert(t === n + 1, "originalStart should only be one more than originalEnd"), Me.Assert(s === r + 1, "modifiedStart should only be one more than modifiedEnd"), f = []), f;
    }
    const l = [0], o = [0], u = this.ComputeRecursionPoint(t, n, s, r, l, o, i), c = l[0], h = o[0];
    if (u !== null)
      return u;
    if (!i[0]) {
      const f = this.ComputeDiffRecursive(t, c, s, h, i);
      let m = [];
      return i[0] ? m = [
        new pe(
          c + 1,
          n - (c + 1) + 1,
          h + 1,
          r - (h + 1) + 1
        )
      ] : m = this.ComputeDiffRecursive(c + 1, n, h + 1, r, i), this.ConcatenateChanges(f, m);
    }
    return [
      new pe(
        t,
        n - t + 1,
        s,
        r - s + 1
      )
    ];
  }
  WALKTRACE(t, n, s, r, i, l, o, u, c, h, f, m, d, g, p, L, v, N) {
    let b = null, w = null, _ = new Sn(), R = n, y = s, E = d[0] - L[0] - r, I = -1073741824, j = this.m_forwardHistory.length - 1;
    do {
      const S = E + t;
      S === R || S < y && c[S - 1] < c[S + 1] ? (f = c[S + 1], g = f - E - r, f < I && _.MarkNextChange(), I = f, _.AddModifiedElement(f + 1, g), E = S + 1 - t) : (f = c[S - 1] + 1, g = f - E - r, f < I && _.MarkNextChange(), I = f - 1, _.AddOriginalElement(f, g + 1), E = S - 1 - t), j >= 0 && (c = this.m_forwardHistory[j], t = c[0], R = 1, y = c.length - 1);
    } while (--j >= -1);
    if (b = _.getReverseChanges(), N[0]) {
      let S = d[0] + 1, x = L[0] + 1;
      if (b !== null && b.length > 0) {
        const C = b[b.length - 1];
        S = Math.max(S, C.getOriginalEnd()), x = Math.max(x, C.getModifiedEnd());
      }
      w = [
        new pe(
          S,
          m - S + 1,
          x,
          p - x + 1
        )
      ];
    } else {
      _ = new Sn(), R = l, y = o, E = d[0] - L[0] - u, I = 1073741824, j = v ? this.m_reverseHistory.length - 1 : this.m_reverseHistory.length - 2;
      do {
        const S = E + i;
        S === R || S < y && h[S - 1] >= h[S + 1] ? (f = h[S + 1] - 1, g = f - E - u, f > I && _.MarkNextChange(), I = f + 1, _.AddOriginalElement(f + 1, g + 1), E = S + 1 - i) : (f = h[S - 1], g = f - E - u, f > I && _.MarkNextChange(), I = f, _.AddModifiedElement(f + 1, g + 1), E = S - 1 - i), j >= 0 && (h = this.m_reverseHistory[j], i = h[0], R = 1, y = h.length - 1);
      } while (--j >= -1);
      w = _.getChanges();
    }
    return this.ConcatenateChanges(b, w);
  }
  ComputeRecursionPoint(t, n, s, r, i, l, o) {
    let u = 0, c = 0, h = 0, f = 0, m = 0, d = 0;
    t--, s--, i[0] = 0, l[0] = 0, this.m_forwardHistory = [], this.m_reverseHistory = [];
    const g = n - t + (r - s), p = g + 1, L = new Int32Array(p), v = new Int32Array(p), N = r - s, b = n - t, w = t - s, _ = n - r, y = (b - N) % 2 === 0;
    L[N] = t, v[b] = n, o[0] = !1;
    for (let E = 1; E <= g / 2 + 1; E++) {
      let I = 0, j = 0;
      h = this.ClipDiagonalBound(N - E, E, N, p), f = this.ClipDiagonalBound(N + E, E, N, p);
      for (let x = h; x <= f; x += 2) {
        x === h || x < f && L[x - 1] < L[x + 1] ? u = L[x + 1] : u = L[x - 1] + 1, c = u - (x - N) - w;
        const C = u;
        for (; u < n && c < r && this.ElementsAreEqual(u + 1, c + 1); )
          u++, c++;
        if (L[x] = u, u + c > I + j && (I = u, j = c), !y && Math.abs(x - b) <= E - 1 && u >= v[x])
          return i[0] = u, l[0] = c, C <= v[x] && E <= 1448 ? this.WALKTRACE(N, h, f, w, b, m, d, _, L, v, u, n, i, c, r, l, y, o) : null;
      }
      const S = (I - t + (j - s) - E) / 2;
      if (this.ContinueProcessingPredicate !== null && !this.ContinueProcessingPredicate(I, S))
        return o[0] = !0, i[0] = I, l[0] = j, S > 0 && E <= 1448 ? this.WALKTRACE(N, h, f, w, b, m, d, _, L, v, u, n, i, c, r, l, y, o) : (t++, s++, [
          new pe(
            t,
            n - t + 1,
            s,
            r - s + 1
          )
        ]);
      m = this.ClipDiagonalBound(b - E, E, b, p), d = this.ClipDiagonalBound(b + E, E, b, p);
      for (let x = m; x <= d; x += 2) {
        x === m || x < d && v[x - 1] >= v[x + 1] ? u = v[x + 1] - 1 : u = v[x - 1], c = u - (x - b) - _;
        const C = u;
        for (; u > t && c > s && this.ElementsAreEqual(u, c); )
          u--, c--;
        if (v[x] = u, y && Math.abs(x - N) <= E && u <= L[x])
          return i[0] = u, l[0] = c, C >= L[x] && E <= 1448 ? this.WALKTRACE(N, h, f, w, b, m, d, _, L, v, u, n, i, c, r, l, y, o) : null;
      }
      if (E <= 1447) {
        let x = new Int32Array(f - h + 2);
        x[0] = N - h + 1, ke.Copy2(L, h, x, 1, f - h + 1), this.m_forwardHistory.push(x), x = new Int32Array(d - m + 2), x[0] = b - m + 1, ke.Copy2(v, m, x, 1, d - m + 1), this.m_reverseHistory.push(x);
      }
    }
    return this.WALKTRACE(N, h, f, w, b, m, d, _, L, v, u, n, i, c, r, l, y, o);
  }
  PrettifyChanges(t) {
    for (let n = 0; n < t.length; n++) {
      const s = t[n], r = n < t.length - 1 ? t[n + 1].originalStart : this._originalElementsOrHash.length, i = n < t.length - 1 ? t[n + 1].modifiedStart : this._modifiedElementsOrHash.length, l = s.originalLength > 0, o = s.modifiedLength > 0;
      for (; s.originalStart + s.originalLength < r && s.modifiedStart + s.modifiedLength < i && (!l || this.OriginalElementsAreEqual(s.originalStart, s.originalStart + s.originalLength)) && (!o || this.ModifiedElementsAreEqual(s.modifiedStart, s.modifiedStart + s.modifiedLength)); ) {
        const c = this.ElementsAreStrictEqual(s.originalStart, s.modifiedStart);
        if (this.ElementsAreStrictEqual(s.originalStart + s.originalLength, s.modifiedStart + s.modifiedLength) && !c)
          break;
        s.originalStart++, s.modifiedStart++;
      }
      const u = [null];
      if (n < t.length - 1 && this.ChangesOverlap(t[n], t[n + 1], u)) {
        t[n] = u[0], t.splice(n + 1, 1), n--;
        continue;
      }
    }
    for (let n = t.length - 1; n >= 0; n--) {
      const s = t[n];
      let r = 0, i = 0;
      if (n > 0) {
        const f = t[n - 1];
        r = f.originalStart + f.originalLength, i = f.modifiedStart + f.modifiedLength;
      }
      const l = s.originalLength > 0, o = s.modifiedLength > 0;
      let u = 0, c = this._boundaryScore(s.originalStart, s.originalLength, s.modifiedStart, s.modifiedLength);
      for (let f = 1; ; f++) {
        const m = s.originalStart - f, d = s.modifiedStart - f;
        if (m < r || d < i || l && !this.OriginalElementsAreEqual(m, m + s.originalLength) || o && !this.ModifiedElementsAreEqual(d, d + s.modifiedLength))
          break;
        const p = (m === r && d === i ? 5 : 0) + this._boundaryScore(m, s.originalLength, d, s.modifiedLength);
        p > c && (c = p, u = f);
      }
      s.originalStart -= u, s.modifiedStart -= u;
      const h = [null];
      if (n > 0 && this.ChangesOverlap(t[n - 1], t[n], h)) {
        t[n - 1] = h[0], t.splice(n, 1), n++;
        continue;
      }
    }
    if (this._hasStrings)
      for (let n = 1, s = t.length; n < s; n++) {
        const r = t[n - 1], i = t[n], l = i.originalStart - r.originalStart - r.originalLength, o = r.originalStart, u = i.originalStart + i.originalLength, c = u - o, h = r.modifiedStart, f = i.modifiedStart + i.modifiedLength, m = f - h;
        if (l < 5 && c < 20 && m < 20) {
          const d = this._findBetterContiguousSequence(o, c, h, m, l);
          if (d) {
            const [g, p] = d;
            (g !== r.originalStart + r.originalLength || p !== r.modifiedStart + r.modifiedLength) && (r.originalLength = g - r.originalStart, r.modifiedLength = p - r.modifiedStart, i.originalStart = g + l, i.modifiedStart = p + l, i.originalLength = u - i.originalStart, i.modifiedLength = f - i.modifiedStart);
          }
        }
      }
    return t;
  }
  _findBetterContiguousSequence(t, n, s, r, i) {
    if (n < i || r < i)
      return null;
    const l = t + n - i + 1, o = s + r - i + 1;
    let u = 0, c = 0, h = 0;
    for (let f = t; f < l; f++)
      for (let m = s; m < o; m++) {
        const d = this._contiguousSequenceScore(f, m, i);
        d > 0 && d > u && (u = d, c = f, h = m);
      }
    return u > 0 ? [c, h] : null;
  }
  _contiguousSequenceScore(t, n, s) {
    let r = 0;
    for (let i = 0; i < s; i++) {
      if (!this.ElementsAreEqual(t + i, n + i))
        return 0;
      r += this._originalStringElements[t + i].length;
    }
    return r;
  }
  _OriginalIsBoundary(t) {
    return t <= 0 || t >= this._originalElementsOrHash.length - 1 ? !0 : this._hasStrings && /^\s*$/.test(this._originalStringElements[t]);
  }
  _OriginalRegionIsBoundary(t, n) {
    if (this._OriginalIsBoundary(t) || this._OriginalIsBoundary(t - 1))
      return !0;
    if (n > 0) {
      const s = t + n;
      if (this._OriginalIsBoundary(s - 1) || this._OriginalIsBoundary(s))
        return !0;
    }
    return !1;
  }
  _ModifiedIsBoundary(t) {
    return t <= 0 || t >= this._modifiedElementsOrHash.length - 1 ? !0 : this._hasStrings && /^\s*$/.test(this._modifiedStringElements[t]);
  }
  _ModifiedRegionIsBoundary(t, n) {
    if (this._ModifiedIsBoundary(t) || this._ModifiedIsBoundary(t - 1))
      return !0;
    if (n > 0) {
      const s = t + n;
      if (this._ModifiedIsBoundary(s - 1) || this._ModifiedIsBoundary(s))
        return !0;
    }
    return !1;
  }
  _boundaryScore(t, n, s, r) {
    const i = this._OriginalRegionIsBoundary(t, n) ? 1 : 0, l = this._ModifiedRegionIsBoundary(s, r) ? 1 : 0;
    return i + l;
  }
  ConcatenateChanges(t, n) {
    const s = [];
    if (t.length === 0 || n.length === 0)
      return n.length > 0 ? n : t;
    if (this.ChangesOverlap(t[t.length - 1], n[0], s)) {
      const r = new Array(t.length + n.length - 1);
      return ke.Copy(t, 0, r, 0, t.length - 1), r[t.length - 1] = s[0], ke.Copy(n, 1, r, t.length, n.length - 1), r;
    } else {
      const r = new Array(t.length + n.length);
      return ke.Copy(t, 0, r, 0, t.length), ke.Copy(n, 0, r, t.length, n.length), r;
    }
  }
  ChangesOverlap(t, n, s) {
    if (Me.Assert(t.originalStart <= n.originalStart, "Left change is not less than or equal to right change"), Me.Assert(t.modifiedStart <= n.modifiedStart, "Left change is not less than or equal to right change"), t.originalStart + t.originalLength >= n.originalStart || t.modifiedStart + t.modifiedLength >= n.modifiedStart) {
      const r = t.originalStart;
      let i = t.originalLength;
      const l = t.modifiedStart;
      let o = t.modifiedLength;
      return t.originalStart + t.originalLength >= n.originalStart && (i = n.originalStart + n.originalLength - t.originalStart), t.modifiedStart + t.modifiedLength >= n.modifiedStart && (o = n.modifiedStart + n.modifiedLength - t.modifiedStart), s[0] = new pe(r, i, l, o), !0;
    } else
      return s[0] = null, !1;
  }
  ClipDiagonalBound(t, n, s, r) {
    if (t >= 0 && t < r)
      return t;
    const i = s, l = r - s - 1, o = n % 2 === 0;
    if (t < 0) {
      const u = i % 2 === 0;
      return o === u ? 0 : 1;
    } else {
      const u = l % 2 === 0;
      return o === u ? r - 1 : r - 2;
    }
  }
}
let Ae;
const Mt = globalThis.vscode;
if (typeof Mt < "u" && typeof Mt.process < "u") {
  const e = Mt.process;
  Ae = {
    get platform() {
      return e.platform;
    },
    get arch() {
      return e.arch;
    },
    get env() {
      return e.env;
    },
    cwd() {
      return e.cwd();
    }
  };
} else
  typeof process < "u" ? Ae = {
    get platform() {
      return process.platform;
    },
    get arch() {
      return process.arch;
    },
    get env() {
      return process.env;
    },
    cwd() {
      return process.env.VSCODE_CWD || process.cwd();
    }
  } : Ae = {
    get platform() {
      return et ? "win32" : Or ? "darwin" : "linux";
    },
    get arch() {
    },
    get env() {
      return {};
    },
    cwd() {
      return "/";
    }
  };
const pt = Ae.cwd, xi = Ae.env, pi = Ae.platform;
Ae.arch;
const _i = 65, Li = 97, wi = 90, vi = 122, we = 46, Q = 47, ee = 92, be = 58, Ni = 63;
class er extends Error {
  constructor(t, n, s) {
    let r;
    typeof n == "string" && n.indexOf("not ") === 0 ? (r = "must not be", n = n.replace(/^not /, "")) : r = "must be";
    const i = t.indexOf(".") !== -1 ? "property" : "argument";
    let l = `The "${t}" ${i} ${r} of type ${n}`;
    l += `. Received type ${typeof s}`, super(l), this.code = "ERR_INVALID_ARG_TYPE";
  }
}
function Si(e, t) {
  if (e === null || typeof e != "object")
    throw new er(t, "Object", e);
}
function $(e, t) {
  if (typeof e != "string")
    throw new er(t, "string", e);
}
const re = pi === "win32";
function P(e) {
  return e === Q || e === ee;
}
function $t(e) {
  return e === Q;
}
function xe(e) {
  return e >= _i && e <= wi || e >= Li && e <= vi;
}
function _t(e, t, n, s) {
  let r = "", i = 0, l = -1, o = 0, u = 0;
  for (let c = 0; c <= e.length; ++c) {
    if (c < e.length)
      u = e.charCodeAt(c);
    else {
      if (s(u))
        break;
      u = Q;
    }
    if (s(u)) {
      if (!(l === c - 1 || o === 1))
        if (o === 2) {
          if (r.length < 2 || i !== 2 || r.charCodeAt(r.length - 1) !== we || r.charCodeAt(r.length - 2) !== we) {
            if (r.length > 2) {
              const h = r.lastIndexOf(n);
              h === -1 ? (r = "", i = 0) : (r = r.slice(0, h), i = r.length - 1 - r.lastIndexOf(n)), l = c, o = 0;
              continue;
            } else if (r.length !== 0) {
              r = "", i = 0, l = c, o = 0;
              continue;
            }
          }
          t && (r += r.length > 0 ? `${n}..` : "..", i = 2);
        } else
          r.length > 0 ? r += `${n}${e.slice(l + 1, c)}` : r = e.slice(l + 1, c), i = c - l - 1;
      l = c, o = 0;
    } else
      u === we && o !== -1 ? ++o : o = -1;
  }
  return r;
}
function tr(e, t) {
  Si(t, "pathObject");
  const n = t.dir || t.root, s = t.base || `${t.name || ""}${t.ext || ""}`;
  return n ? n === t.root ? `${n}${s}` : `${n}${e}${s}` : s;
}
const O = {
  resolve(...e) {
    let t = "", n = "", s = !1;
    for (let r = e.length - 1; r >= -1; r--) {
      let i;
      if (r >= 0) {
        if (i = e[r], $(i, "path"), i.length === 0)
          continue;
      } else
        t.length === 0 ? i = pt() : (i = xi[`=${t}`] || pt(), (i === void 0 || i.slice(0, 2).toLowerCase() !== t.toLowerCase() && i.charCodeAt(2) === ee) && (i = `${t}\\`));
      const l = i.length;
      let o = 0, u = "", c = !1;
      const h = i.charCodeAt(0);
      if (l === 1)
        P(h) && (o = 1, c = !0);
      else if (P(h))
        if (c = !0, P(i.charCodeAt(1))) {
          let f = 2, m = f;
          for (; f < l && !P(i.charCodeAt(f)); )
            f++;
          if (f < l && f !== m) {
            const d = i.slice(m, f);
            for (m = f; f < l && P(i.charCodeAt(f)); )
              f++;
            if (f < l && f !== m) {
              for (m = f; f < l && !P(i.charCodeAt(f)); )
                f++;
              (f === l || f !== m) && (u = `\\\\${d}\\${i.slice(m, f)}`, o = f);
            }
          }
        } else
          o = 1;
      else
        xe(h) && i.charCodeAt(1) === be && (u = i.slice(0, 2), o = 2, l > 2 && P(i.charCodeAt(2)) && (c = !0, o = 3));
      if (u.length > 0)
        if (t.length > 0) {
          if (u.toLowerCase() !== t.toLowerCase())
            continue;
        } else
          t = u;
      if (s) {
        if (t.length > 0)
          break;
      } else if (n = `${i.slice(o)}\\${n}`, s = c, c && t.length > 0)
        break;
    }
    return n = _t(n, !s, "\\", P), s ? `${t}\\${n}` : `${t}${n}` || ".";
  },
  normalize(e) {
    $(e, "path");
    const t = e.length;
    if (t === 0)
      return ".";
    let n = 0, s, r = !1;
    const i = e.charCodeAt(0);
    if (t === 1)
      return $t(i) ? "\\" : e;
    if (P(i))
      if (r = !0, P(e.charCodeAt(1))) {
        let o = 2, u = o;
        for (; o < t && !P(e.charCodeAt(o)); )
          o++;
        if (o < t && o !== u) {
          const c = e.slice(u, o);
          for (u = o; o < t && P(e.charCodeAt(o)); )
            o++;
          if (o < t && o !== u) {
            for (u = o; o < t && !P(e.charCodeAt(o)); )
              o++;
            if (o === t)
              return `\\\\${c}\\${e.slice(u)}\\`;
            o !== u && (s = `\\\\${c}\\${e.slice(u, o)}`, n = o);
          }
        }
      } else
        n = 1;
    else
      xe(i) && e.charCodeAt(1) === be && (s = e.slice(0, 2), n = 2, t > 2 && P(e.charCodeAt(2)) && (r = !0, n = 3));
    let l = n < t ? _t(e.slice(n), !r, "\\", P) : "";
    return l.length === 0 && !r && (l = "."), l.length > 0 && P(e.charCodeAt(t - 1)) && (l += "\\"), s === void 0 ? r ? `\\${l}` : l : r ? `${s}\\${l}` : `${s}${l}`;
  },
  isAbsolute(e) {
    $(e, "path");
    const t = e.length;
    if (t === 0)
      return !1;
    const n = e.charCodeAt(0);
    return P(n) || t > 2 && xe(n) && e.charCodeAt(1) === be && P(e.charCodeAt(2));
  },
  join(...e) {
    if (e.length === 0)
      return ".";
    let t, n;
    for (let i = 0; i < e.length; ++i) {
      const l = e[i];
      $(l, "path"), l.length > 0 && (t === void 0 ? t = n = l : t += `\\${l}`);
    }
    if (t === void 0)
      return ".";
    let s = !0, r = 0;
    if (typeof n == "string" && P(n.charCodeAt(0))) {
      ++r;
      const i = n.length;
      i > 1 && P(n.charCodeAt(1)) && (++r, i > 2 && (P(n.charCodeAt(2)) ? ++r : s = !1));
    }
    if (s) {
      for (; r < t.length && P(t.charCodeAt(r)); )
        r++;
      r >= 2 && (t = `\\${t.slice(r)}`);
    }
    return O.normalize(t);
  },
  relative(e, t) {
    if ($(e, "from"), $(t, "to"), e === t)
      return "";
    const n = O.resolve(e), s = O.resolve(t);
    if (n === s || (e = n.toLowerCase(), t = s.toLowerCase(), e === t))
      return "";
    let r = 0;
    for (; r < e.length && e.charCodeAt(r) === ee; )
      r++;
    let i = e.length;
    for (; i - 1 > r && e.charCodeAt(i - 1) === ee; )
      i--;
    const l = i - r;
    let o = 0;
    for (; o < t.length && t.charCodeAt(o) === ee; )
      o++;
    let u = t.length;
    for (; u - 1 > o && t.charCodeAt(u - 1) === ee; )
      u--;
    const c = u - o, h = l < c ? l : c;
    let f = -1, m = 0;
    for (; m < h; m++) {
      const g = e.charCodeAt(r + m);
      if (g !== t.charCodeAt(o + m))
        break;
      g === ee && (f = m);
    }
    if (m !== h) {
      if (f === -1)
        return s;
    } else {
      if (c > h) {
        if (t.charCodeAt(o + m) === ee)
          return s.slice(o + m + 1);
        if (m === 2)
          return s.slice(o + m);
      }
      l > h && (e.charCodeAt(r + m) === ee ? f = m : m === 2 && (f = 3)), f === -1 && (f = 0);
    }
    let d = "";
    for (m = r + f + 1; m <= i; ++m)
      (m === i || e.charCodeAt(m) === ee) && (d += d.length === 0 ? ".." : "\\..");
    return o += f, d.length > 0 ? `${d}${s.slice(o, u)}` : (s.charCodeAt(o) === ee && ++o, s.slice(o, u));
  },
  toNamespacedPath(e) {
    if (typeof e != "string" || e.length === 0)
      return e;
    const t = O.resolve(e);
    if (t.length <= 2)
      return e;
    if (t.charCodeAt(0) === ee) {
      if (t.charCodeAt(1) === ee) {
        const n = t.charCodeAt(2);
        if (n !== Ni && n !== we)
          return `\\\\?\\UNC\\${t.slice(2)}`;
      }
    } else if (xe(t.charCodeAt(0)) && t.charCodeAt(1) === be && t.charCodeAt(2) === ee)
      return `\\\\?\\${t}`;
    return e;
  },
  dirname(e) {
    $(e, "path");
    const t = e.length;
    if (t === 0)
      return ".";
    let n = -1, s = 0;
    const r = e.charCodeAt(0);
    if (t === 1)
      return P(r) ? e : ".";
    if (P(r)) {
      if (n = s = 1, P(e.charCodeAt(1))) {
        let o = 2, u = o;
        for (; o < t && !P(e.charCodeAt(o)); )
          o++;
        if (o < t && o !== u) {
          for (u = o; o < t && P(e.charCodeAt(o)); )
            o++;
          if (o < t && o !== u) {
            for (u = o; o < t && !P(e.charCodeAt(o)); )
              o++;
            if (o === t)
              return e;
            o !== u && (n = s = o + 1);
          }
        }
      }
    } else
      xe(r) && e.charCodeAt(1) === be && (n = t > 2 && P(e.charCodeAt(2)) ? 3 : 2, s = n);
    let i = -1, l = !0;
    for (let o = t - 1; o >= s; --o)
      if (P(e.charCodeAt(o))) {
        if (!l) {
          i = o;
          break;
        }
      } else
        l = !1;
    if (i === -1) {
      if (n === -1)
        return ".";
      i = n;
    }
    return e.slice(0, i);
  },
  basename(e, t) {
    t !== void 0 && $(t, "ext"), $(e, "path");
    let n = 0, s = -1, r = !0, i;
    if (e.length >= 2 && xe(e.charCodeAt(0)) && e.charCodeAt(1) === be && (n = 2), t !== void 0 && t.length > 0 && t.length <= e.length) {
      if (t === e)
        return "";
      let l = t.length - 1, o = -1;
      for (i = e.length - 1; i >= n; --i) {
        const u = e.charCodeAt(i);
        if (P(u)) {
          if (!r) {
            n = i + 1;
            break;
          }
        } else
          o === -1 && (r = !1, o = i + 1), l >= 0 && (u === t.charCodeAt(l) ? --l === -1 && (s = i) : (l = -1, s = o));
      }
      return n === s ? s = o : s === -1 && (s = e.length), e.slice(n, s);
    }
    for (i = e.length - 1; i >= n; --i)
      if (P(e.charCodeAt(i))) {
        if (!r) {
          n = i + 1;
          break;
        }
      } else
        s === -1 && (r = !1, s = i + 1);
    return s === -1 ? "" : e.slice(n, s);
  },
  extname(e) {
    $(e, "path");
    let t = 0, n = -1, s = 0, r = -1, i = !0, l = 0;
    e.length >= 2 && e.charCodeAt(1) === be && xe(e.charCodeAt(0)) && (t = s = 2);
    for (let o = e.length - 1; o >= t; --o) {
      const u = e.charCodeAt(o);
      if (P(u)) {
        if (!i) {
          s = o + 1;
          break;
        }
        continue;
      }
      r === -1 && (i = !1, r = o + 1), u === we ? n === -1 ? n = o : l !== 1 && (l = 1) : n !== -1 && (l = -1);
    }
    return n === -1 || r === -1 || l === 0 || l === 1 && n === r - 1 && n === s + 1 ? "" : e.slice(n, r);
  },
  format: tr.bind(null, "\\"),
  parse(e) {
    $(e, "path");
    const t = { root: "", dir: "", base: "", ext: "", name: "" };
    if (e.length === 0)
      return t;
    const n = e.length;
    let s = 0, r = e.charCodeAt(0);
    if (n === 1)
      return P(r) ? (t.root = t.dir = e, t) : (t.base = t.name = e, t);
    if (P(r)) {
      if (s = 1, P(e.charCodeAt(1))) {
        let f = 2, m = f;
        for (; f < n && !P(e.charCodeAt(f)); )
          f++;
        if (f < n && f !== m) {
          for (m = f; f < n && P(e.charCodeAt(f)); )
            f++;
          if (f < n && f !== m) {
            for (m = f; f < n && !P(e.charCodeAt(f)); )
              f++;
            f === n ? s = f : f !== m && (s = f + 1);
          }
        }
      }
    } else if (xe(r) && e.charCodeAt(1) === be) {
      if (n <= 2)
        return t.root = t.dir = e, t;
      if (s = 2, P(e.charCodeAt(2))) {
        if (n === 3)
          return t.root = t.dir = e, t;
        s = 3;
      }
    }
    s > 0 && (t.root = e.slice(0, s));
    let i = -1, l = s, o = -1, u = !0, c = e.length - 1, h = 0;
    for (; c >= s; --c) {
      if (r = e.charCodeAt(c), P(r)) {
        if (!u) {
          l = c + 1;
          break;
        }
        continue;
      }
      o === -1 && (u = !1, o = c + 1), r === we ? i === -1 ? i = c : h !== 1 && (h = 1) : i !== -1 && (h = -1);
    }
    return o !== -1 && (i === -1 || h === 0 || h === 1 && i === o - 1 && i === l + 1 ? t.base = t.name = e.slice(l, o) : (t.name = e.slice(l, i), t.base = e.slice(l, o), t.ext = e.slice(i, o))), l > 0 && l !== s ? t.dir = e.slice(0, l - 1) : t.dir = t.root, t;
  },
  sep: "\\",
  delimiter: ";",
  win32: null,
  posix: null
}, Ci = (() => {
  if (re) {
    const e = /\\/g;
    return () => {
      const t = pt().replace(e, "/");
      return t.slice(t.indexOf("/"));
    };
  }
  return () => pt();
})(), Y = {
  resolve(...e) {
    let t = "", n = !1;
    for (let s = e.length - 1; s >= -1 && !n; s--) {
      const r = s >= 0 ? e[s] : Ci();
      $(r, "path"), r.length !== 0 && (t = `${r}/${t}`, n = r.charCodeAt(0) === Q);
    }
    return t = _t(t, !n, "/", $t), n ? `/${t}` : t.length > 0 ? t : ".";
  },
  normalize(e) {
    if ($(e, "path"), e.length === 0)
      return ".";
    const t = e.charCodeAt(0) === Q, n = e.charCodeAt(e.length - 1) === Q;
    return e = _t(e, !t, "/", $t), e.length === 0 ? t ? "/" : n ? "./" : "." : (n && (e += "/"), t ? `/${e}` : e);
  },
  isAbsolute(e) {
    return $(e, "path"), e.length > 0 && e.charCodeAt(0) === Q;
  },
  join(...e) {
    if (e.length === 0)
      return ".";
    let t;
    for (let n = 0; n < e.length; ++n) {
      const s = e[n];
      $(s, "path"), s.length > 0 && (t === void 0 ? t = s : t += `/${s}`);
    }
    return t === void 0 ? "." : Y.normalize(t);
  },
  relative(e, t) {
    if ($(e, "from"), $(t, "to"), e === t || (e = Y.resolve(e), t = Y.resolve(t), e === t))
      return "";
    const n = 1, s = e.length, r = s - n, i = 1, l = t.length - i, o = r < l ? r : l;
    let u = -1, c = 0;
    for (; c < o; c++) {
      const f = e.charCodeAt(n + c);
      if (f !== t.charCodeAt(i + c))
        break;
      f === Q && (u = c);
    }
    if (c === o)
      if (l > o) {
        if (t.charCodeAt(i + c) === Q)
          return t.slice(i + c + 1);
        if (c === 0)
          return t.slice(i + c);
      } else
        r > o && (e.charCodeAt(n + c) === Q ? u = c : c === 0 && (u = 0));
    let h = "";
    for (c = n + u + 1; c <= s; ++c)
      (c === s || e.charCodeAt(c) === Q) && (h += h.length === 0 ? ".." : "/..");
    return `${h}${t.slice(i + u)}`;
  },
  toNamespacedPath(e) {
    return e;
  },
  dirname(e) {
    if ($(e, "path"), e.length === 0)
      return ".";
    const t = e.charCodeAt(0) === Q;
    let n = -1, s = !0;
    for (let r = e.length - 1; r >= 1; --r)
      if (e.charCodeAt(r) === Q) {
        if (!s) {
          n = r;
          break;
        }
      } else
        s = !1;
    return n === -1 ? t ? "/" : "." : t && n === 1 ? "//" : e.slice(0, n);
  },
  basename(e, t) {
    t !== void 0 && $(t, "ext"), $(e, "path");
    let n = 0, s = -1, r = !0, i;
    if (t !== void 0 && t.length > 0 && t.length <= e.length) {
      if (t === e)
        return "";
      let l = t.length - 1, o = -1;
      for (i = e.length - 1; i >= 0; --i) {
        const u = e.charCodeAt(i);
        if (u === Q) {
          if (!r) {
            n = i + 1;
            break;
          }
        } else
          o === -1 && (r = !1, o = i + 1), l >= 0 && (u === t.charCodeAt(l) ? --l === -1 && (s = i) : (l = -1, s = o));
      }
      return n === s ? s = o : s === -1 && (s = e.length), e.slice(n, s);
    }
    for (i = e.length - 1; i >= 0; --i)
      if (e.charCodeAt(i) === Q) {
        if (!r) {
          n = i + 1;
          break;
        }
      } else
        s === -1 && (r = !1, s = i + 1);
    return s === -1 ? "" : e.slice(n, s);
  },
  extname(e) {
    $(e, "path");
    let t = -1, n = 0, s = -1, r = !0, i = 0;
    for (let l = e.length - 1; l >= 0; --l) {
      const o = e.charCodeAt(l);
      if (o === Q) {
        if (!r) {
          n = l + 1;
          break;
        }
        continue;
      }
      s === -1 && (r = !1, s = l + 1), o === we ? t === -1 ? t = l : i !== 1 && (i = 1) : t !== -1 && (i = -1);
    }
    return t === -1 || s === -1 || i === 0 || i === 1 && t === s - 1 && t === n + 1 ? "" : e.slice(t, s);
  },
  format: tr.bind(null, "/"),
  parse(e) {
    $(e, "path");
    const t = { root: "", dir: "", base: "", ext: "", name: "" };
    if (e.length === 0)
      return t;
    const n = e.charCodeAt(0) === Q;
    let s;
    n ? (t.root = "/", s = 1) : s = 0;
    let r = -1, i = 0, l = -1, o = !0, u = e.length - 1, c = 0;
    for (; u >= s; --u) {
      const h = e.charCodeAt(u);
      if (h === Q) {
        if (!o) {
          i = u + 1;
          break;
        }
        continue;
      }
      l === -1 && (o = !1, l = u + 1), h === we ? r === -1 ? r = u : c !== 1 && (c = 1) : r !== -1 && (c = -1);
    }
    if (l !== -1) {
      const h = i === 0 && n ? 1 : i;
      r === -1 || c === 0 || c === 1 && r === l - 1 && r === i + 1 ? t.base = t.name = e.slice(h, l) : (t.name = e.slice(h, r), t.base = e.slice(h, l), t.ext = e.slice(r, l));
    }
    return i > 0 ? t.dir = e.slice(0, i - 1) : n && (t.dir = "/"), t;
  },
  sep: "/",
  delimiter: ":",
  win32: null,
  posix: null
};
Y.win32 = O.win32 = O;
Y.posix = O.posix = Y;
re ? O.normalize : Y.normalize;
re ? O.isAbsolute : Y.isAbsolute;
re ? O.join : Y.join;
re ? O.resolve : Y.resolve;
re ? O.relative : Y.relative;
re ? O.dirname : Y.dirname;
re ? O.basename : Y.basename;
re ? O.extname : Y.extname;
re ? O.parse : Y.parse;
re ? O.sep : Y.sep;
re ? O.delimiter : Y.delimiter;
const Ai = /^\w[\w\d+.-]*$/, Ri = /^\//, yi = /^\/\//;
function Ei(e, t) {
  if (!e.scheme && t)
    throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${e.authority}", path: "${e.path}", query: "${e.query}", fragment: "${e.fragment}"}`);
  if (e.scheme && !Ai.test(e.scheme))
    throw new Error("[UriError]: Scheme contains illegal characters.");
  if (e.path) {
    if (e.authority) {
      if (!Ri.test(e.path))
        throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
    } else if (yi.test(e.path))
      throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
  }
}
function Mi(e, t) {
  return !e && !t ? "file" : e;
}
function ki(e, t) {
  switch (e) {
    case "https":
    case "http":
    case "file":
      t ? t[0] !== le && (t = le + t) : t = le;
      break;
  }
  return t;
}
const U = "", le = "/", Di = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
class Re {
  static isUri(t) {
    return t instanceof Re ? !0 : t ? typeof t.authority == "string" && typeof t.fragment == "string" && typeof t.path == "string" && typeof t.query == "string" && typeof t.scheme == "string" && typeof t.fsPath == "string" && typeof t.with == "function" && typeof t.toString == "function" : !1;
  }
  constructor(t, n, s, r, i, l = !1) {
    typeof t == "object" ? (this.scheme = t.scheme || U, this.authority = t.authority || U, this.path = t.path || U, this.query = t.query || U, this.fragment = t.fragment || U) : (this.scheme = Mi(t, l), this.authority = n || U, this.path = ki(this.scheme, s || U), this.query = r || U, this.fragment = i || U, Ei(this, l));
  }
  get fsPath() {
    return Gt(this, !1);
  }
  with(t) {
    if (!t)
      return this;
    let { scheme: n, authority: s, path: r, query: i, fragment: l } = t;
    return n === void 0 ? n = this.scheme : n === null && (n = U), s === void 0 ? s = this.authority : s === null && (s = U), r === void 0 ? r = this.path : r === null && (r = U), i === void 0 ? i = this.query : i === null && (i = U), l === void 0 ? l = this.fragment : l === null && (l = U), n === this.scheme && s === this.authority && r === this.path && i === this.query && l === this.fragment ? this : new De(n, s, r, i, l);
  }
  static parse(t, n = !1) {
    const s = Di.exec(t);
    return s ? new De(
      s[2] || U,
      lt(s[4] || U),
      lt(s[5] || U),
      lt(s[7] || U),
      lt(s[9] || U),
      n
    ) : new De(U, U, U, U, U);
  }
  static file(t) {
    let n = U;
    if (et && (t = t.replace(/\\/g, le)), t[0] === le && t[1] === le) {
      const s = t.indexOf(le, 2);
      s === -1 ? (n = t.substring(2), t = le) : (n = t.substring(2, s), t = t.substring(s) || le);
    }
    return new De("file", n, t, U, U);
  }
  static from(t, n) {
    return new De(
      t.scheme,
      t.authority,
      t.path,
      t.query,
      t.fragment,
      n
    );
  }
  static joinPath(t, ...n) {
    if (!t.path)
      throw new Error("[UriError]: cannot call joinPath on URI without path");
    let s;
    return et && t.scheme === "file" ? s = Re.file(O.join(Gt(t, !0), ...n)).path : s = Y.join(t.path, ...n), t.with({ path: s });
  }
  toString(t = !1) {
    return jt(this, t);
  }
  toJSON() {
    return this;
  }
  static revive(t) {
    if (t) {
      if (t instanceof Re)
        return t;
      {
        const n = new De(t);
        return n._formatted = t.external ?? null, n._fsPath = t._sep === nr ? t.fsPath ?? null : null, n;
      }
    } else
      return t;
  }
}
const nr = et ? 1 : void 0;
class De extends Re {
  constructor() {
    super(...arguments), this._formatted = null, this._fsPath = null;
  }
  get fsPath() {
    return this._fsPath || (this._fsPath = Gt(this, !1)), this._fsPath;
  }
  toString(t = !1) {
    return t ? jt(this, !0) : (this._formatted || (this._formatted = jt(this, !1)), this._formatted);
  }
  toJSON() {
    const t = {
      $mid: 1
    };
    return this._fsPath && (t.fsPath = this._fsPath, t._sep = nr), this._formatted && (t.external = this._formatted), this.path && (t.path = this.path), this.scheme && (t.scheme = this.scheme), this.authority && (t.authority = this.authority), this.query && (t.query = this.query), this.fragment && (t.fragment = this.fragment), t;
  }
}
const sr = {
  58: "%3A",
  47: "%2F",
  63: "%3F",
  35: "%23",
  91: "%5B",
  93: "%5D",
  64: "%40",
  33: "%21",
  36: "%24",
  38: "%26",
  39: "%27",
  40: "%28",
  41: "%29",
  42: "%2A",
  43: "%2B",
  44: "%2C",
  59: "%3B",
  61: "%3D",
  32: "%20"
};
function Cn(e, t, n) {
  let s, r = -1;
  for (let i = 0; i < e.length; i++) {
    const l = e.charCodeAt(i);
    if (l >= 97 && l <= 122 || l >= 65 && l <= 90 || l >= 48 && l <= 57 || l === 45 || l === 46 || l === 95 || l === 126 || t && l === 47 || n && l === 91 || n && l === 93 || n && l === 58)
      r !== -1 && (s += encodeURIComponent(e.substring(r, i)), r = -1), s !== void 0 && (s += e.charAt(i));
    else {
      s === void 0 && (s = e.substr(0, i));
      const o = sr[l];
      o !== void 0 ? (r !== -1 && (s += encodeURIComponent(e.substring(r, i)), r = -1), s += o) : r === -1 && (r = i);
    }
  }
  return r !== -1 && (s += encodeURIComponent(e.substring(r))), s !== void 0 ? s : e;
}
function Pi(e) {
  let t;
  for (let n = 0; n < e.length; n++) {
    const s = e.charCodeAt(n);
    s === 35 || s === 63 ? (t === void 0 && (t = e.substr(0, n)), t += sr[s]) : t !== void 0 && (t += e[n]);
  }
  return t !== void 0 ? t : e;
}
function Gt(e, t) {
  let n;
  return e.authority && e.path.length > 1 && e.scheme === "file" ? n = `//${e.authority}${e.path}` : e.path.charCodeAt(0) === 47 && (e.path.charCodeAt(1) >= 65 && e.path.charCodeAt(1) <= 90 || e.path.charCodeAt(1) >= 97 && e.path.charCodeAt(1) <= 122) && e.path.charCodeAt(2) === 58 ? t ? n = e.path.substr(1) : n = e.path[1].toLowerCase() + e.path.substr(2) : n = e.path, et && (n = n.replace(/\//g, "\\")), n;
}
function jt(e, t) {
  const n = t ? Pi : Cn;
  let s = "", { scheme: r, authority: i, path: l, query: o, fragment: u } = e;
  if (r && (s += r, s += ":"), (i || r === "file") && (s += le, s += le), i) {
    let c = i.indexOf("@");
    if (c !== -1) {
      const h = i.substr(0, c);
      i = i.substr(c + 1), c = h.lastIndexOf(":"), c === -1 ? s += n(h, !1, !1) : (s += n(h.substr(0, c), !1, !1), s += ":", s += n(h.substr(c + 1), !1, !0)), s += "@";
    }
    i = i.toLowerCase(), c = i.lastIndexOf(":"), c === -1 ? s += n(i, !1, !0) : (s += n(i.substr(0, c), !1, !0), s += i.substr(c));
  }
  if (l) {
    if (l.length >= 3 && l.charCodeAt(0) === 47 && l.charCodeAt(2) === 58) {
      const c = l.charCodeAt(1);
      c >= 65 && c <= 90 && (l = `/${String.fromCharCode(c + 32)}:${l.substr(3)}`);
    } else if (l.length >= 2 && l.charCodeAt(1) === 58) {
      const c = l.charCodeAt(0);
      c >= 65 && c <= 90 && (l = `${String.fromCharCode(c + 32)}:${l.substr(2)}`);
    }
    s += n(l, !0, !1);
  }
  return o && (s += "?", s += n(o, !1, !1)), u && (s += "#", s += t ? u : Cn(u, !1, !1)), s;
}
function rr(e) {
  try {
    return decodeURIComponent(e);
  } catch {
    return e.length > 3 ? e.substr(0, 3) + rr(e.substr(3)) : e;
  }
}
const An = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
function lt(e) {
  return e.match(An) ? e.replace(An, (t) => rr(t)) : e;
}
class J {
  constructor(t, n) {
    this.lineNumber = t, this.column = n;
  }
  with(t = this.lineNumber, n = this.column) {
    return t === this.lineNumber && n === this.column ? this : new J(t, n);
  }
  delta(t = 0, n = 0) {
    return this.with(this.lineNumber + t, this.column + n);
  }
  equals(t) {
    return J.equals(this, t);
  }
  static equals(t, n) {
    return !t && !n ? !0 : !!t && !!n && t.lineNumber === n.lineNumber && t.column === n.column;
  }
  isBefore(t) {
    return J.isBefore(this, t);
  }
  static isBefore(t, n) {
    return t.lineNumber < n.lineNumber ? !0 : n.lineNumber < t.lineNumber ? !1 : t.column < n.column;
  }
  isBeforeOrEqual(t) {
    return J.isBeforeOrEqual(this, t);
  }
  static isBeforeOrEqual(t, n) {
    return t.lineNumber < n.lineNumber ? !0 : n.lineNumber < t.lineNumber ? !1 : t.column <= n.column;
  }
  static compare(t, n) {
    const s = t.lineNumber | 0, r = n.lineNumber | 0;
    if (s === r) {
      const i = t.column | 0, l = n.column | 0;
      return i - l;
    }
    return s - r;
  }
  clone() {
    return new J(this.lineNumber, this.column);
  }
  toString() {
    return "(" + this.lineNumber + "," + this.column + ")";
  }
  static lift(t) {
    return new J(t.lineNumber, t.column);
  }
  static isIPosition(t) {
    return t && typeof t.lineNumber == "number" && typeof t.column == "number";
  }
  toJSON() {
    return {
      lineNumber: this.lineNumber,
      column: this.column
    };
  }
}
class D {
  constructor(t, n, s, r) {
    t > s || t === s && n > r ? (this.startLineNumber = s, this.startColumn = r, this.endLineNumber = t, this.endColumn = n) : (this.startLineNumber = t, this.startColumn = n, this.endLineNumber = s, this.endColumn = r);
  }
  isEmpty() {
    return D.isEmpty(this);
  }
  static isEmpty(t) {
    return t.startLineNumber === t.endLineNumber && t.startColumn === t.endColumn;
  }
  containsPosition(t) {
    return D.containsPosition(this, t);
  }
  static containsPosition(t, n) {
    return !(n.lineNumber < t.startLineNumber || n.lineNumber > t.endLineNumber || n.lineNumber === t.startLineNumber && n.column < t.startColumn || n.lineNumber === t.endLineNumber && n.column > t.endColumn);
  }
  static strictContainsPosition(t, n) {
    return !(n.lineNumber < t.startLineNumber || n.lineNumber > t.endLineNumber || n.lineNumber === t.startLineNumber && n.column <= t.startColumn || n.lineNumber === t.endLineNumber && n.column >= t.endColumn);
  }
  containsRange(t) {
    return D.containsRange(this, t);
  }
  static containsRange(t, n) {
    return !(n.startLineNumber < t.startLineNumber || n.endLineNumber < t.startLineNumber || n.startLineNumber > t.endLineNumber || n.endLineNumber > t.endLineNumber || n.startLineNumber === t.startLineNumber && n.startColumn < t.startColumn || n.endLineNumber === t.endLineNumber && n.endColumn > t.endColumn);
  }
  strictContainsRange(t) {
    return D.strictContainsRange(this, t);
  }
  static strictContainsRange(t, n) {
    return !(n.startLineNumber < t.startLineNumber || n.endLineNumber < t.startLineNumber || n.startLineNumber > t.endLineNumber || n.endLineNumber > t.endLineNumber || n.startLineNumber === t.startLineNumber && n.startColumn <= t.startColumn || n.endLineNumber === t.endLineNumber && n.endColumn >= t.endColumn);
  }
  plusRange(t) {
    return D.plusRange(this, t);
  }
  static plusRange(t, n) {
    let s, r, i, l;
    return n.startLineNumber < t.startLineNumber ? (s = n.startLineNumber, r = n.startColumn) : n.startLineNumber === t.startLineNumber ? (s = n.startLineNumber, r = Math.min(n.startColumn, t.startColumn)) : (s = t.startLineNumber, r = t.startColumn), n.endLineNumber > t.endLineNumber ? (i = n.endLineNumber, l = n.endColumn) : n.endLineNumber === t.endLineNumber ? (i = n.endLineNumber, l = Math.max(n.endColumn, t.endColumn)) : (i = t.endLineNumber, l = t.endColumn), new D(s, r, i, l);
  }
  intersectRanges(t) {
    return D.intersectRanges(this, t);
  }
  static intersectRanges(t, n) {
    let s = t.startLineNumber, r = t.startColumn, i = t.endLineNumber, l = t.endColumn;
    const o = n.startLineNumber, u = n.startColumn, c = n.endLineNumber, h = n.endColumn;
    return s < o ? (s = o, r = u) : s === o && (r = Math.max(r, u)), i > c ? (i = c, l = h) : i === c && (l = Math.min(l, h)), s > i || s === i && r > l ? null : new D(
      s,
      r,
      i,
      l
    );
  }
  equalsRange(t) {
    return D.equalsRange(this, t);
  }
  static equalsRange(t, n) {
    return !t && !n ? !0 : !!t && !!n && t.startLineNumber === n.startLineNumber && t.startColumn === n.startColumn && t.endLineNumber === n.endLineNumber && t.endColumn === n.endColumn;
  }
  getEndPosition() {
    return D.getEndPosition(this);
  }
  static getEndPosition(t) {
    return new J(t.endLineNumber, t.endColumn);
  }
  getStartPosition() {
    return D.getStartPosition(this);
  }
  static getStartPosition(t) {
    return new J(t.startLineNumber, t.startColumn);
  }
  toString() {
    return "[" + this.startLineNumber + "," + this.startColumn + " -> " + this.endLineNumber + "," + this.endColumn + "]";
  }
  setEndPosition(t, n) {
    return new D(this.startLineNumber, this.startColumn, t, n);
  }
  setStartPosition(t, n) {
    return new D(t, n, this.endLineNumber, this.endColumn);
  }
  collapseToStart() {
    return D.collapseToStart(this);
  }
  static collapseToStart(t) {
    return new D(
      t.startLineNumber,
      t.startColumn,
      t.startLineNumber,
      t.startColumn
    );
  }
  collapseToEnd() {
    return D.collapseToEnd(this);
  }
  static collapseToEnd(t) {
    return new D(t.endLineNumber, t.endColumn, t.endLineNumber, t.endColumn);
  }
  delta(t) {
    return new D(
      this.startLineNumber + t,
      this.startColumn,
      this.endLineNumber + t,
      this.endColumn
    );
  }
  static fromPositions(t, n = t) {
    return new D(t.lineNumber, t.column, n.lineNumber, n.column);
  }
  static lift(t) {
    return t ? new D(
      t.startLineNumber,
      t.startColumn,
      t.endLineNumber,
      t.endColumn
    ) : null;
  }
  static isIRange(t) {
    return t && typeof t.startLineNumber == "number" && typeof t.startColumn == "number" && typeof t.endLineNumber == "number" && typeof t.endColumn == "number";
  }
  static areIntersectingOrTouching(t, n) {
    return !(t.endLineNumber < n.startLineNumber || t.endLineNumber === n.startLineNumber && t.endColumn < n.startColumn || n.endLineNumber < t.startLineNumber || n.endLineNumber === t.startLineNumber && n.endColumn < t.startColumn);
  }
  static areIntersecting(t, n) {
    return !(t.endLineNumber < n.startLineNumber || t.endLineNumber === n.startLineNumber && t.endColumn <= n.startColumn || n.endLineNumber < t.startLineNumber || n.endLineNumber === t.startLineNumber && n.endColumn <= t.startColumn);
  }
  static compareRangesUsingStarts(t, n) {
    if (t && n) {
      const i = t.startLineNumber | 0, l = n.startLineNumber | 0;
      if (i === l) {
        const o = t.startColumn | 0, u = n.startColumn | 0;
        if (o === u) {
          const c = t.endLineNumber | 0, h = n.endLineNumber | 0;
          if (c === h) {
            const f = t.endColumn | 0, m = n.endColumn | 0;
            return f - m;
          }
          return c - h;
        }
        return o - u;
      }
      return i - l;
    }
    return (t ? 1 : 0) - (n ? 1 : 0);
  }
  static compareRangesUsingEnds(t, n) {
    return t.endLineNumber === n.endLineNumber ? t.endColumn === n.endColumn ? t.startLineNumber === n.startLineNumber ? t.startColumn - n.startColumn : t.startLineNumber - n.startLineNumber : t.endColumn - n.endColumn : t.endLineNumber - n.endLineNumber;
  }
  static spansMultipleLines(t) {
    return t.endLineNumber > t.startLineNumber;
  }
  toJSON() {
    return this;
  }
}
function Rn(e) {
  return e < 0 ? 0 : e > 255 ? 255 : e | 0;
}
function Pe(e) {
  return e < 0 ? 0 : e > 4294967295 ? 4294967295 : e | 0;
}
class Fi {
  constructor(t) {
    this.values = t, this.prefixSum = new Uint32Array(t.length), this.prefixSumValidIndex = new Int32Array(1), this.prefixSumValidIndex[0] = -1;
  }
  getCount() {
    return this.values.length;
  }
  insertValues(t, n) {
    t = Pe(t);
    const s = this.values, r = this.prefixSum, i = n.length;
    return i === 0 ? !1 : (this.values = new Uint32Array(s.length + i), this.values.set(s.subarray(0, t), 0), this.values.set(s.subarray(t), t + i), this.values.set(n, t), t - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = t - 1), this.prefixSum = new Uint32Array(this.values.length), this.prefixSumValidIndex[0] >= 0 && this.prefixSum.set(r.subarray(0, this.prefixSumValidIndex[0] + 1)), !0);
  }
  setValue(t, n) {
    return t = Pe(t), n = Pe(n), this.values[t] === n ? !1 : (this.values[t] = n, t - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = t - 1), !0);
  }
  removeValues(t, n) {
    t = Pe(t), n = Pe(n);
    const s = this.values, r = this.prefixSum;
    if (t >= s.length)
      return !1;
    const i = s.length - t;
    return n >= i && (n = i), n === 0 ? !1 : (this.values = new Uint32Array(s.length - n), this.values.set(s.subarray(0, t), 0), this.values.set(s.subarray(t + n), t), this.prefixSum = new Uint32Array(this.values.length), t - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = t - 1), this.prefixSumValidIndex[0] >= 0 && this.prefixSum.set(r.subarray(0, this.prefixSumValidIndex[0] + 1)), !0);
  }
  getTotalSum() {
    return this.values.length === 0 ? 0 : this._getPrefixSum(this.values.length - 1);
  }
  getPrefixSum(t) {
    return t < 0 ? 0 : (t = Pe(t), this._getPrefixSum(t));
  }
  _getPrefixSum(t) {
    if (t <= this.prefixSumValidIndex[0])
      return this.prefixSum[t];
    let n = this.prefixSumValidIndex[0] + 1;
    n === 0 && (this.prefixSum[0] = this.values[0], n++), t >= this.values.length && (t = this.values.length - 1);
    for (let s = n; s <= t; s++)
      this.prefixSum[s] = this.prefixSum[s - 1] + this.values[s];
    return this.prefixSumValidIndex[0] = Math.max(this.prefixSumValidIndex[0], t), this.prefixSum[t];
  }
  getIndexOf(t) {
    t = Math.floor(t), this.getTotalSum();
    let n = 0, s = this.values.length - 1, r = 0, i = 0, l = 0;
    for (; n <= s; )
      if (r = n + (s - n) / 2 | 0, i = this.prefixSum[r], l = i - this.values[r], t < l)
        s = r - 1;
      else if (t >= i)
        n = r + 1;
      else
        break;
    return new Ti(r, t - l);
  }
}
class Ti {
  constructor(t, n) {
    this.index = t, this.remainder = n, this._prefixSumIndexOfResultBrand = void 0, this.index = t, this.remainder = n;
  }
}
class Vi {
  constructor(t, n, s, r) {
    this._uri = t, this._lines = n, this._eol = s, this._versionId = r, this._lineStarts = null, this._cachedTextValue = null;
  }
  dispose() {
    this._lines.length = 0;
  }
  get version() {
    return this._versionId;
  }
  getText() {
    return this._cachedTextValue === null && (this._cachedTextValue = this._lines.join(this._eol)), this._cachedTextValue;
  }
  onEvents(t) {
    t.eol && t.eol !== this._eol && (this._eol = t.eol, this._lineStarts = null);
    const n = t.changes;
    for (const s of n)
      this._acceptDeleteRange(s.range), this._acceptInsertText(new J(s.range.startLineNumber, s.range.startColumn), s.text);
    this._versionId = t.versionId, this._cachedTextValue = null;
  }
  _ensureLineStarts() {
    if (!this._lineStarts) {
      const t = this._eol.length, n = this._lines.length, s = new Uint32Array(n);
      for (let r = 0; r < n; r++)
        s[r] = this._lines[r].length + t;
      this._lineStarts = new Fi(s);
    }
  }
  _setLineText(t, n) {
    this._lines[t] = n, this._lineStarts && this._lineStarts.setValue(t, this._lines[t].length + this._eol.length);
  }
  _acceptDeleteRange(t) {
    if (t.startLineNumber === t.endLineNumber) {
      if (t.startColumn === t.endColumn)
        return;
      this._setLineText(t.startLineNumber - 1, this._lines[t.startLineNumber - 1].substring(0, t.startColumn - 1) + this._lines[t.startLineNumber - 1].substring(t.endColumn - 1));
      return;
    }
    this._setLineText(t.startLineNumber - 1, this._lines[t.startLineNumber - 1].substring(0, t.startColumn - 1) + this._lines[t.endLineNumber - 1].substring(t.endColumn - 1)), this._lines.splice(t.startLineNumber, t.endLineNumber - t.startLineNumber), this._lineStarts && this._lineStarts.removeValues(t.startLineNumber, t.endLineNumber - t.startLineNumber);
  }
  _acceptInsertText(t, n) {
    if (n.length === 0)
      return;
    const s = Kr(n);
    if (s.length === 1) {
      this._setLineText(t.lineNumber - 1, this._lines[t.lineNumber - 1].substring(0, t.column - 1) + s[0] + this._lines[t.lineNumber - 1].substring(t.column - 1));
      return;
    }
    s[s.length - 1] += this._lines[t.lineNumber - 1].substring(t.column - 1), this._setLineText(t.lineNumber - 1, this._lines[t.lineNumber - 1].substring(0, t.column - 1) + s[0]);
    const r = new Uint32Array(s.length - 1);
    for (let i = 1; i < s.length; i++)
      this._lines.splice(t.lineNumber + i - 1, 0, s[i]), r[i - 1] = s[i].length + this._eol.length;
    this._lineStarts && this._lineStarts.insertValues(t.lineNumber, r);
  }
}
const qi = "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?";
function Bi(e = "") {
  let t = "(-?\\d*\\.\\d\\w*)|([^";
  for (const n of qi)
    e.indexOf(n) >= 0 || (t += "\\" + n);
  return t += "\\s]+)", new RegExp(t, "g");
}
const ir = Bi();
function ar(e) {
  let t = ir;
  if (e && e instanceof RegExp)
    if (e.global)
      t = e;
    else {
      let n = "g";
      e.ignoreCase && (n += "i"), e.multiline && (n += "m"), e.unicode && (n += "u"), t = new RegExp(e.source, n);
    }
  return t.lastIndex = 0, t;
}
const lr = new Mr();
lr.unshift({
  maxLen: 1e3,
  windowSize: 15,
  timeBudget: 150
});
function on(e, t, n, s, r) {
  if (t = ar(t), r || (r = gt.first(lr)), n.length > r.maxLen) {
    let c = e - r.maxLen / 2;
    return c < 0 ? c = 0 : s += c, n = n.substring(c, e + r.maxLen / 2), on(e, t, n, s, r);
  }
  const i = Date.now(), l = e - 1 - s;
  let o = -1, u = null;
  for (let c = 1; !(Date.now() - i >= r.timeBudget); c++) {
    const h = l - r.windowSize * c;
    t.lastIndex = Math.max(0, h);
    const f = Ii(t, n, l, o);
    if (!f && u || (u = f, h <= 0))
      break;
    o = h;
  }
  if (u) {
    const c = {
      word: u[0],
      startColumn: s + 1 + u.index,
      endColumn: s + 1 + u.index + u[0].length
    };
    return t.lastIndex = 0, c;
  }
  return null;
}
function Ii(e, t, n, s) {
  let r;
  for (; r = e.exec(t); ) {
    const i = r.index || 0;
    if (i <= n && e.lastIndex >= n)
      return r;
    if (s > 0 && i > s)
      return null;
  }
  return null;
}
class un {
  constructor(t) {
    const n = Rn(t);
    this._defaultValue = n, this._asciiMap = un._createAsciiMap(n), this._map = /* @__PURE__ */ new Map();
  }
  static _createAsciiMap(t) {
    const n = new Uint8Array(256);
    return n.fill(t), n;
  }
  set(t, n) {
    const s = Rn(n);
    t >= 0 && t < 256 ? this._asciiMap[t] = s : this._map.set(t, s);
  }
  get(t) {
    return t >= 0 && t < 256 ? this._asciiMap[t] : this._map.get(t) || this._defaultValue;
  }
  clear() {
    this._asciiMap.fill(this._defaultValue), this._map.clear();
  }
}
class Ui {
  constructor(t, n, s) {
    const r = new Uint8Array(t * n);
    for (let i = 0, l = t * n; i < l; i++)
      r[i] = s;
    this._data = r, this.rows = t, this.cols = n;
  }
  get(t, n) {
    return this._data[t * this.cols + n];
  }
  set(t, n, s) {
    this._data[t * this.cols + n] = s;
  }
}
class Hi {
  constructor(t) {
    let n = 0, s = 0;
    for (let i = 0, l = t.length; i < l; i++) {
      const [o, u, c] = t[i];
      u > n && (n = u), o > s && (s = o), c > s && (s = c);
    }
    n++, s++;
    const r = new Ui(s, n, 0);
    for (let i = 0, l = t.length; i < l; i++) {
      const [o, u, c] = t[i];
      r.set(o, u, c);
    }
    this._states = r, this._maxCharCode = n;
  }
  nextState(t, n) {
    return n < 0 || n >= this._maxCharCode ? 0 : this._states.get(t, n);
  }
}
let kt = null;
function Wi() {
  return kt === null && (kt = new Hi([
    [1, 104, 2],
    [1, 72, 2],
    [1, 102, 6],
    [1, 70, 6],
    [2, 116, 3],
    [2, 84, 3],
    [3, 116, 4],
    [3, 84, 4],
    [4, 112, 5],
    [4, 80, 5],
    [5, 115, 9],
    [5, 83, 9],
    [5, 58, 10],
    [6, 105, 7],
    [6, 73, 7],
    [7, 108, 8],
    [7, 76, 8],
    [8, 101, 9],
    [8, 69, 9],
    [9, 58, 10],
    [10, 47, 11],
    [11, 47, 12]
  ])), kt;
}
let je = null;
function zi() {
  if (je === null) {
    je = new un(0);
    const e = ` 	<>'"、。｡､，．：；‘〈「『〔（［｛｢｣｝］）〕』」〉’｀～…`;
    for (let n = 0; n < e.length; n++)
      je.set(e.charCodeAt(n), 1);
    const t = ".,;:";
    for (let n = 0; n < t.length; n++)
      je.set(t.charCodeAt(n), 2);
  }
  return je;
}
class Lt {
  static _createLink(t, n, s, r, i) {
    let l = i - 1;
    do {
      const o = n.charCodeAt(l);
      if (t.get(o) !== 2)
        break;
      l--;
    } while (l > r);
    if (r > 0) {
      const o = n.charCodeAt(r - 1), u = n.charCodeAt(l);
      (o === 40 && u === 41 || o === 91 && u === 93 || o === 123 && u === 125) && l--;
    }
    return {
      range: {
        startLineNumber: s,
        startColumn: r + 1,
        endLineNumber: s,
        endColumn: l + 2
      },
      url: n.substring(r, l + 1)
    };
  }
  static computeLinks(t, n = Wi()) {
    const s = zi(), r = [];
    for (let i = 1, l = t.getLineCount(); i <= l; i++) {
      const o = t.getLineContent(i), u = o.length;
      let c = 0, h = 0, f = 0, m = 1, d = !1, g = !1, p = !1, L = !1;
      for (; c < u; ) {
        let v = !1;
        const N = o.charCodeAt(c);
        if (m === 13) {
          let b;
          switch (N) {
            case 40:
              d = !0, b = 0;
              break;
            case 41:
              b = d ? 0 : 1;
              break;
            case 91:
              p = !0, g = !0, b = 0;
              break;
            case 93:
              p = !1, b = g ? 0 : 1;
              break;
            case 123:
              L = !0, b = 0;
              break;
            case 125:
              b = L ? 0 : 1;
              break;
            case 39:
            case 34:
            case 96:
              f === N ? b = 1 : f === 39 || f === 34 || f === 96 ? b = 0 : b = 1;
              break;
            case 42:
              b = f === 42 ? 1 : 0;
              break;
            case 124:
              b = f === 124 ? 1 : 0;
              break;
            case 32:
              b = p ? 0 : 1;
              break;
            default:
              b = s.get(N);
          }
          b === 1 && (r.push(Lt._createLink(s, o, i, h, c)), v = !0);
        } else if (m === 12) {
          let b;
          N === 91 ? (g = !0, b = 0) : b = s.get(N), b === 1 ? v = !0 : m = 13;
        } else
          m = n.nextState(m, N), m === 0 && (v = !0);
        v && (m = 1, d = !1, g = !1, L = !1, h = c + 1, f = N), c++;
      }
      m === 13 && r.push(Lt._createLink(s, o, i, h, u));
    }
    return r;
  }
}
function $i(e) {
  return !e || typeof e.getLineCount != "function" || typeof e.getLineContent != "function" ? [] : Lt.computeLinks(e);
}
const At = class At {
  constructor() {
    this._defaultValueSet = [
      ["true", "false"],
      ["True", "False"],
      ["Private", "Public", "Friend", "ReadOnly", "Partial", "Protected", "WriteOnly"],
      ["public", "protected", "private"]
    ];
  }
  navigateValueSet(t, n, s, r, i) {
    if (t && n) {
      const l = this.doNavigateValueSet(n, i);
      if (l)
        return {
          range: t,
          value: l
        };
    }
    if (s && r) {
      const l = this.doNavigateValueSet(r, i);
      if (l)
        return {
          range: s,
          value: l
        };
    }
    return null;
  }
  doNavigateValueSet(t, n) {
    const s = this.numberReplace(t, n);
    return s !== null ? s : this.textReplace(t, n);
  }
  numberReplace(t, n) {
    const s = Math.pow(10, t.length - (t.lastIndexOf(".") + 1));
    let r = Number(t);
    const i = parseFloat(t);
    return !isNaN(r) && !isNaN(i) && r === i ? r === 0 && !n ? null : (r = Math.floor(r * s), r += n ? s : -s, String(r / s)) : null;
  }
  textReplace(t, n) {
    return this.valueSetsReplace(this._defaultValueSet, t, n);
  }
  valueSetsReplace(t, n, s) {
    let r = null;
    for (let i = 0, l = t.length; r === null && i < l; i++)
      r = this.valueSetReplace(t[i], n, s);
    return r;
  }
  valueSetReplace(t, n, s) {
    let r = t.indexOf(n);
    return r >= 0 ? (r += s ? 1 : -1, r < 0 ? r = t.length - 1 : r %= t.length, t[r]) : null;
  }
};
At.INSTANCE = new At();
let Ot = At;
class cn {
  constructor() {
    this._keyCodeToStr = [], this._strToKeyCode = /* @__PURE__ */ Object.create(null);
  }
  define(t, n) {
    this._keyCodeToStr[t] = n, this._strToKeyCode[n.toLowerCase()] = t;
  }
  keyCodeToStr(t) {
    return this._keyCodeToStr[t];
  }
  strToKeyCode(t) {
    return this._strToKeyCode[t.toLowerCase()] || 0;
  }
}
const ft = new cn(), Xt = new cn(), Qt = new cn(), Gi = new Array(230), ji = /* @__PURE__ */ Object.create(null), Oi = /* @__PURE__ */ Object.create(null);
(function() {
  const e = "", t = [
    [1, 0, "None", 0, "unknown", 0, "VK_UNKNOWN", e, e],
    [1, 1, "Hyper", 0, e, 0, e, e, e],
    [1, 2, "Super", 0, e, 0, e, e, e],
    [1, 3, "Fn", 0, e, 0, e, e, e],
    [1, 4, "FnLock", 0, e, 0, e, e, e],
    [1, 5, "Suspend", 0, e, 0, e, e, e],
    [1, 6, "Resume", 0, e, 0, e, e, e],
    [1, 7, "Turbo", 0, e, 0, e, e, e],
    [1, 8, "Sleep", 0, e, 0, "VK_SLEEP", e, e],
    [1, 9, "WakeUp", 0, e, 0, e, e, e],
    [0, 10, "KeyA", 31, "A", 65, "VK_A", e, e],
    [0, 11, "KeyB", 32, "B", 66, "VK_B", e, e],
    [0, 12, "KeyC", 33, "C", 67, "VK_C", e, e],
    [0, 13, "KeyD", 34, "D", 68, "VK_D", e, e],
    [0, 14, "KeyE", 35, "E", 69, "VK_E", e, e],
    [0, 15, "KeyF", 36, "F", 70, "VK_F", e, e],
    [0, 16, "KeyG", 37, "G", 71, "VK_G", e, e],
    [0, 17, "KeyH", 38, "H", 72, "VK_H", e, e],
    [0, 18, "KeyI", 39, "I", 73, "VK_I", e, e],
    [0, 19, "KeyJ", 40, "J", 74, "VK_J", e, e],
    [0, 20, "KeyK", 41, "K", 75, "VK_K", e, e],
    [0, 21, "KeyL", 42, "L", 76, "VK_L", e, e],
    [0, 22, "KeyM", 43, "M", 77, "VK_M", e, e],
    [0, 23, "KeyN", 44, "N", 78, "VK_N", e, e],
    [0, 24, "KeyO", 45, "O", 79, "VK_O", e, e],
    [0, 25, "KeyP", 46, "P", 80, "VK_P", e, e],
    [0, 26, "KeyQ", 47, "Q", 81, "VK_Q", e, e],
    [0, 27, "KeyR", 48, "R", 82, "VK_R", e, e],
    [0, 28, "KeyS", 49, "S", 83, "VK_S", e, e],
    [0, 29, "KeyT", 50, "T", 84, "VK_T", e, e],
    [0, 30, "KeyU", 51, "U", 85, "VK_U", e, e],
    [0, 31, "KeyV", 52, "V", 86, "VK_V", e, e],
    [0, 32, "KeyW", 53, "W", 87, "VK_W", e, e],
    [0, 33, "KeyX", 54, "X", 88, "VK_X", e, e],
    [0, 34, "KeyY", 55, "Y", 89, "VK_Y", e, e],
    [0, 35, "KeyZ", 56, "Z", 90, "VK_Z", e, e],
    [0, 36, "Digit1", 22, "1", 49, "VK_1", e, e],
    [0, 37, "Digit2", 23, "2", 50, "VK_2", e, e],
    [0, 38, "Digit3", 24, "3", 51, "VK_3", e, e],
    [0, 39, "Digit4", 25, "4", 52, "VK_4", e, e],
    [0, 40, "Digit5", 26, "5", 53, "VK_5", e, e],
    [0, 41, "Digit6", 27, "6", 54, "VK_6", e, e],
    [0, 42, "Digit7", 28, "7", 55, "VK_7", e, e],
    [0, 43, "Digit8", 29, "8", 56, "VK_8", e, e],
    [0, 44, "Digit9", 30, "9", 57, "VK_9", e, e],
    [0, 45, "Digit0", 21, "0", 48, "VK_0", e, e],
    [1, 46, "Enter", 3, "Enter", 13, "VK_RETURN", e, e],
    [1, 47, "Escape", 9, "Escape", 27, "VK_ESCAPE", e, e],
    [1, 48, "Backspace", 1, "Backspace", 8, "VK_BACK", e, e],
    [1, 49, "Tab", 2, "Tab", 9, "VK_TAB", e, e],
    [1, 50, "Space", 10, "Space", 32, "VK_SPACE", e, e],
    [0, 51, "Minus", 88, "-", 189, "VK_OEM_MINUS", "-", "OEM_MINUS"],
    [0, 52, "Equal", 86, "=", 187, "VK_OEM_PLUS", "=", "OEM_PLUS"],
    [0, 53, "BracketLeft", 92, "[", 219, "VK_OEM_4", "[", "OEM_4"],
    [0, 54, "BracketRight", 94, "]", 221, "VK_OEM_6", "]", "OEM_6"],
    [0, 55, "Backslash", 93, "\\", 220, "VK_OEM_5", "\\", "OEM_5"],
    [0, 56, "IntlHash", 0, e, 0, e, e, e],
    [0, 57, "Semicolon", 85, ";", 186, "VK_OEM_1", ";", "OEM_1"],
    [0, 58, "Quote", 95, "'", 222, "VK_OEM_7", "'", "OEM_7"],
    [0, 59, "Backquote", 91, "`", 192, "VK_OEM_3", "`", "OEM_3"],
    [0, 60, "Comma", 87, ",", 188, "VK_OEM_COMMA", ",", "OEM_COMMA"],
    [0, 61, "Period", 89, ".", 190, "VK_OEM_PERIOD", ".", "OEM_PERIOD"],
    [0, 62, "Slash", 90, "/", 191, "VK_OEM_2", "/", "OEM_2"],
    [1, 63, "CapsLock", 8, "CapsLock", 20, "VK_CAPITAL", e, e],
    [1, 64, "F1", 59, "F1", 112, "VK_F1", e, e],
    [1, 65, "F2", 60, "F2", 113, "VK_F2", e, e],
    [1, 66, "F3", 61, "F3", 114, "VK_F3", e, e],
    [1, 67, "F4", 62, "F4", 115, "VK_F4", e, e],
    [1, 68, "F5", 63, "F5", 116, "VK_F5", e, e],
    [1, 69, "F6", 64, "F6", 117, "VK_F6", e, e],
    [1, 70, "F7", 65, "F7", 118, "VK_F7", e, e],
    [1, 71, "F8", 66, "F8", 119, "VK_F8", e, e],
    [1, 72, "F9", 67, "F9", 120, "VK_F9", e, e],
    [1, 73, "F10", 68, "F10", 121, "VK_F10", e, e],
    [1, 74, "F11", 69, "F11", 122, "VK_F11", e, e],
    [1, 75, "F12", 70, "F12", 123, "VK_F12", e, e],
    [1, 76, "PrintScreen", 0, e, 0, e, e, e],
    [1, 77, "ScrollLock", 84, "ScrollLock", 145, "VK_SCROLL", e, e],
    [1, 78, "Pause", 7, "PauseBreak", 19, "VK_PAUSE", e, e],
    [1, 79, "Insert", 19, "Insert", 45, "VK_INSERT", e, e],
    [1, 80, "Home", 14, "Home", 36, "VK_HOME", e, e],
    [1, 81, "PageUp", 11, "PageUp", 33, "VK_PRIOR", e, e],
    [1, 82, "Delete", 20, "Delete", 46, "VK_DELETE", e, e],
    [1, 83, "End", 13, "End", 35, "VK_END", e, e],
    [1, 84, "PageDown", 12, "PageDown", 34, "VK_NEXT", e, e],
    [1, 85, "ArrowRight", 17, "RightArrow", 39, "VK_RIGHT", "Right", e],
    [1, 86, "ArrowLeft", 15, "LeftArrow", 37, "VK_LEFT", "Left", e],
    [1, 87, "ArrowDown", 18, "DownArrow", 40, "VK_DOWN", "Down", e],
    [1, 88, "ArrowUp", 16, "UpArrow", 38, "VK_UP", "Up", e],
    [1, 89, "NumLock", 83, "NumLock", 144, "VK_NUMLOCK", e, e],
    [1, 90, "NumpadDivide", 113, "NumPad_Divide", 111, "VK_DIVIDE", e, e],
    [1, 91, "NumpadMultiply", 108, "NumPad_Multiply", 106, "VK_MULTIPLY", e, e],
    [1, 92, "NumpadSubtract", 111, "NumPad_Subtract", 109, "VK_SUBTRACT", e, e],
    [1, 93, "NumpadAdd", 109, "NumPad_Add", 107, "VK_ADD", e, e],
    [1, 94, "NumpadEnter", 3, e, 0, e, e, e],
    [1, 95, "Numpad1", 99, "NumPad1", 97, "VK_NUMPAD1", e, e],
    [1, 96, "Numpad2", 100, "NumPad2", 98, "VK_NUMPAD2", e, e],
    [1, 97, "Numpad3", 101, "NumPad3", 99, "VK_NUMPAD3", e, e],
    [1, 98, "Numpad4", 102, "NumPad4", 100, "VK_NUMPAD4", e, e],
    [1, 99, "Numpad5", 103, "NumPad5", 101, "VK_NUMPAD5", e, e],
    [1, 100, "Numpad6", 104, "NumPad6", 102, "VK_NUMPAD6", e, e],
    [1, 101, "Numpad7", 105, "NumPad7", 103, "VK_NUMPAD7", e, e],
    [1, 102, "Numpad8", 106, "NumPad8", 104, "VK_NUMPAD8", e, e],
    [1, 103, "Numpad9", 107, "NumPad9", 105, "VK_NUMPAD9", e, e],
    [1, 104, "Numpad0", 98, "NumPad0", 96, "VK_NUMPAD0", e, e],
    [1, 105, "NumpadDecimal", 112, "NumPad_Decimal", 110, "VK_DECIMAL", e, e],
    [0, 106, "IntlBackslash", 97, "OEM_102", 226, "VK_OEM_102", e, e],
    [1, 107, "ContextMenu", 58, "ContextMenu", 93, e, e, e],
    [1, 108, "Power", 0, e, 0, e, e, e],
    [1, 109, "NumpadEqual", 0, e, 0, e, e, e],
    [1, 110, "F13", 71, "F13", 124, "VK_F13", e, e],
    [1, 111, "F14", 72, "F14", 125, "VK_F14", e, e],
    [1, 112, "F15", 73, "F15", 126, "VK_F15", e, e],
    [1, 113, "F16", 74, "F16", 127, "VK_F16", e, e],
    [1, 114, "F17", 75, "F17", 128, "VK_F17", e, e],
    [1, 115, "F18", 76, "F18", 129, "VK_F18", e, e],
    [1, 116, "F19", 77, "F19", 130, "VK_F19", e, e],
    [1, 117, "F20", 78, "F20", 131, "VK_F20", e, e],
    [1, 118, "F21", 79, "F21", 132, "VK_F21", e, e],
    [1, 119, "F22", 80, "F22", 133, "VK_F22", e, e],
    [1, 120, "F23", 81, "F23", 134, "VK_F23", e, e],
    [1, 121, "F24", 82, "F24", 135, "VK_F24", e, e],
    [1, 122, "Open", 0, e, 0, e, e, e],
    [1, 123, "Help", 0, e, 0, e, e, e],
    [1, 124, "Select", 0, e, 0, e, e, e],
    [1, 125, "Again", 0, e, 0, e, e, e],
    [1, 126, "Undo", 0, e, 0, e, e, e],
    [1, 127, "Cut", 0, e, 0, e, e, e],
    [1, 128, "Copy", 0, e, 0, e, e, e],
    [1, 129, "Paste", 0, e, 0, e, e, e],
    [1, 130, "Find", 0, e, 0, e, e, e],
    [1, 131, "AudioVolumeMute", 117, "AudioVolumeMute", 173, "VK_VOLUME_MUTE", e, e],
    [1, 132, "AudioVolumeUp", 118, "AudioVolumeUp", 175, "VK_VOLUME_UP", e, e],
    [1, 133, "AudioVolumeDown", 119, "AudioVolumeDown", 174, "VK_VOLUME_DOWN", e, e],
    [1, 134, "NumpadComma", 110, "NumPad_Separator", 108, "VK_SEPARATOR", e, e],
    [0, 135, "IntlRo", 115, "ABNT_C1", 193, "VK_ABNT_C1", e, e],
    [1, 136, "KanaMode", 0, e, 0, e, e, e],
    [0, 137, "IntlYen", 0, e, 0, e, e, e],
    [1, 138, "Convert", 0, e, 0, e, e, e],
    [1, 139, "NonConvert", 0, e, 0, e, e, e],
    [1, 140, "Lang1", 0, e, 0, e, e, e],
    [1, 141, "Lang2", 0, e, 0, e, e, e],
    [1, 142, "Lang3", 0, e, 0, e, e, e],
    [1, 143, "Lang4", 0, e, 0, e, e, e],
    [1, 144, "Lang5", 0, e, 0, e, e, e],
    [1, 145, "Abort", 0, e, 0, e, e, e],
    [1, 146, "Props", 0, e, 0, e, e, e],
    [1, 147, "NumpadParenLeft", 0, e, 0, e, e, e],
    [1, 148, "NumpadParenRight", 0, e, 0, e, e, e],
    [1, 149, "NumpadBackspace", 0, e, 0, e, e, e],
    [1, 150, "NumpadMemoryStore", 0, e, 0, e, e, e],
    [1, 151, "NumpadMemoryRecall", 0, e, 0, e, e, e],
    [1, 152, "NumpadMemoryClear", 0, e, 0, e, e, e],
    [1, 153, "NumpadMemoryAdd", 0, e, 0, e, e, e],
    [1, 154, "NumpadMemorySubtract", 0, e, 0, e, e, e],
    [1, 155, "NumpadClear", 131, "Clear", 12, "VK_CLEAR", e, e],
    [1, 156, "NumpadClearEntry", 0, e, 0, e, e, e],
    [1, 0, e, 5, "Ctrl", 17, "VK_CONTROL", e, e],
    [1, 0, e, 4, "Shift", 16, "VK_SHIFT", e, e],
    [1, 0, e, 6, "Alt", 18, "VK_MENU", e, e],
    [1, 0, e, 57, "Meta", 91, "VK_COMMAND", e, e],
    [1, 157, "ControlLeft", 5, e, 0, "VK_LCONTROL", e, e],
    [1, 158, "ShiftLeft", 4, e, 0, "VK_LSHIFT", e, e],
    [1, 159, "AltLeft", 6, e, 0, "VK_LMENU", e, e],
    [1, 160, "MetaLeft", 57, e, 0, "VK_LWIN", e, e],
    [1, 161, "ControlRight", 5, e, 0, "VK_RCONTROL", e, e],
    [1, 162, "ShiftRight", 4, e, 0, "VK_RSHIFT", e, e],
    [1, 163, "AltRight", 6, e, 0, "VK_RMENU", e, e],
    [1, 164, "MetaRight", 57, e, 0, "VK_RWIN", e, e],
    [1, 165, "BrightnessUp", 0, e, 0, e, e, e],
    [1, 166, "BrightnessDown", 0, e, 0, e, e, e],
    [1, 167, "MediaPlay", 0, e, 0, e, e, e],
    [1, 168, "MediaRecord", 0, e, 0, e, e, e],
    [1, 169, "MediaFastForward", 0, e, 0, e, e, e],
    [1, 170, "MediaRewind", 0, e, 0, e, e, e],
    [1, 171, "MediaTrackNext", 124, "MediaTrackNext", 176, "VK_MEDIA_NEXT_TRACK", e, e],
    [1, 172, "MediaTrackPrevious", 125, "MediaTrackPrevious", 177, "VK_MEDIA_PREV_TRACK", e, e],
    [1, 173, "MediaStop", 126, "MediaStop", 178, "VK_MEDIA_STOP", e, e],
    [1, 174, "Eject", 0, e, 0, e, e, e],
    [1, 175, "MediaPlayPause", 127, "MediaPlayPause", 179, "VK_MEDIA_PLAY_PAUSE", e, e],
    [1, 176, "MediaSelect", 128, "LaunchMediaPlayer", 181, "VK_MEDIA_LAUNCH_MEDIA_SELECT", e, e],
    [1, 177, "LaunchMail", 129, "LaunchMail", 180, "VK_MEDIA_LAUNCH_MAIL", e, e],
    [1, 178, "LaunchApp2", 130, "LaunchApp2", 183, "VK_MEDIA_LAUNCH_APP2", e, e],
    [1, 179, "LaunchApp1", 0, e, 0, "VK_MEDIA_LAUNCH_APP1", e, e],
    [1, 180, "SelectTask", 0, e, 0, e, e, e],
    [1, 181, "LaunchScreenSaver", 0, e, 0, e, e, e],
    [1, 182, "BrowserSearch", 120, "BrowserSearch", 170, "VK_BROWSER_SEARCH", e, e],
    [1, 183, "BrowserHome", 121, "BrowserHome", 172, "VK_BROWSER_HOME", e, e],
    [1, 184, "BrowserBack", 122, "BrowserBack", 166, "VK_BROWSER_BACK", e, e],
    [1, 185, "BrowserForward", 123, "BrowserForward", 167, "VK_BROWSER_FORWARD", e, e],
    [1, 186, "BrowserStop", 0, e, 0, "VK_BROWSER_STOP", e, e],
    [1, 187, "BrowserRefresh", 0, e, 0, "VK_BROWSER_REFRESH", e, e],
    [1, 188, "BrowserFavorites", 0, e, 0, "VK_BROWSER_FAVORITES", e, e],
    [1, 189, "ZoomToggle", 0, e, 0, e, e, e],
    [1, 190, "MailReply", 0, e, 0, e, e, e],
    [1, 191, "MailForward", 0, e, 0, e, e, e],
    [1, 192, "MailSend", 0, e, 0, e, e, e],
    [1, 0, e, 114, "KeyInComposition", 229, e, e, e],
    [1, 0, e, 116, "ABNT_C2", 194, "VK_ABNT_C2", e, e],
    [1, 0, e, 96, "OEM_8", 223, "VK_OEM_8", e, e],
    [1, 0, e, 0, e, 0, "VK_KANA", e, e],
    [1, 0, e, 0, e, 0, "VK_HANGUL", e, e],
    [1, 0, e, 0, e, 0, "VK_JUNJA", e, e],
    [1, 0, e, 0, e, 0, "VK_FINAL", e, e],
    [1, 0, e, 0, e, 0, "VK_HANJA", e, e],
    [1, 0, e, 0, e, 0, "VK_KANJI", e, e],
    [1, 0, e, 0, e, 0, "VK_CONVERT", e, e],
    [1, 0, e, 0, e, 0, "VK_NONCONVERT", e, e],
    [1, 0, e, 0, e, 0, "VK_ACCEPT", e, e],
    [1, 0, e, 0, e, 0, "VK_MODECHANGE", e, e],
    [1, 0, e, 0, e, 0, "VK_SELECT", e, e],
    [1, 0, e, 0, e, 0, "VK_PRINT", e, e],
    [1, 0, e, 0, e, 0, "VK_EXECUTE", e, e],
    [1, 0, e, 0, e, 0, "VK_SNAPSHOT", e, e],
    [1, 0, e, 0, e, 0, "VK_HELP", e, e],
    [1, 0, e, 0, e, 0, "VK_APPS", e, e],
    [1, 0, e, 0, e, 0, "VK_PROCESSKEY", e, e],
    [1, 0, e, 0, e, 0, "VK_PACKET", e, e],
    [1, 0, e, 0, e, 0, "VK_DBE_SBCSCHAR", e, e],
    [1, 0, e, 0, e, 0, "VK_DBE_DBCSCHAR", e, e],
    [1, 0, e, 0, e, 0, "VK_ATTN", e, e],
    [1, 0, e, 0, e, 0, "VK_CRSEL", e, e],
    [1, 0, e, 0, e, 0, "VK_EXSEL", e, e],
    [1, 0, e, 0, e, 0, "VK_EREOF", e, e],
    [1, 0, e, 0, e, 0, "VK_PLAY", e, e],
    [1, 0, e, 0, e, 0, "VK_ZOOM", e, e],
    [1, 0, e, 0, e, 0, "VK_NONAME", e, e],
    [1, 0, e, 0, e, 0, "VK_PA1", e, e],
    [1, 0, e, 0, e, 0, "VK_OEM_CLEAR", e, e]
  ], n = [], s = [];
  for (const r of t) {
    const [i, l, o, u, c, h, f, m, d] = r;
    if (s[l] || (s[l] = !0, ji[o] = l, Oi[o.toLowerCase()] = l), !n[u]) {
      if (n[u] = !0, !c)
        throw new Error(`String representation missing for key code ${u} around scan code ${o}`);
      ft.define(u, c), Xt.define(u, m || c), Qt.define(u, d || m || c);
    }
    h && (Gi[h] = u);
  }
})();
var yn;
(function(e) {
  function t(o) {
    return ft.keyCodeToStr(o);
  }
  e.toString = t;
  function n(o) {
    return ft.strToKeyCode(o);
  }
  e.fromString = n;
  function s(o) {
    return Xt.keyCodeToStr(o);
  }
  e.toUserSettingsUS = s;
  function r(o) {
    return Qt.keyCodeToStr(o);
  }
  e.toUserSettingsGeneral = r;
  function i(o) {
    return Xt.strToKeyCode(o) || Qt.strToKeyCode(o);
  }
  e.fromUserSettings = i;
  function l(o) {
    if (o >= 98 && o <= 113)
      return null;
    switch (o) {
      case 16:
        return "Up";
      case 18:
        return "Down";
      case 15:
        return "Left";
      case 17:
        return "Right";
    }
    return ft.keyCodeToStr(o);
  }
  e.toElectronAccelerator = l;
})(yn || (yn = {}));
function Xi(e, t) {
  const n = (t & 65535) << 16 >>> 0;
  return (e | n) >>> 0;
}
class te extends D {
  constructor(t, n, s, r) {
    super(t, n, s, r), this.selectionStartLineNumber = t, this.selectionStartColumn = n, this.positionLineNumber = s, this.positionColumn = r;
  }
  toString() {
    return "[" + this.selectionStartLineNumber + "," + this.selectionStartColumn + " -> " + this.positionLineNumber + "," + this.positionColumn + "]";
  }
  equalsSelection(t) {
    return te.selectionsEqual(this, t);
  }
  static selectionsEqual(t, n) {
    return t.selectionStartLineNumber === n.selectionStartLineNumber && t.selectionStartColumn === n.selectionStartColumn && t.positionLineNumber === n.positionLineNumber && t.positionColumn === n.positionColumn;
  }
  getDirection() {
    return this.selectionStartLineNumber === this.startLineNumber && this.selectionStartColumn === this.startColumn ? 0 : 1;
  }
  setEndPosition(t, n) {
    return this.getDirection() === 0 ? new te(this.startLineNumber, this.startColumn, t, n) : new te(t, n, this.startLineNumber, this.startColumn);
  }
  getPosition() {
    return new J(this.positionLineNumber, this.positionColumn);
  }
  getSelectionStart() {
    return new J(this.selectionStartLineNumber, this.selectionStartColumn);
  }
  setStartPosition(t, n) {
    return this.getDirection() === 0 ? new te(t, n, this.endLineNumber, this.endColumn) : new te(this.endLineNumber, this.endColumn, t, n);
  }
  static fromPositions(t, n = t) {
    return new te(t.lineNumber, t.column, n.lineNumber, n.column);
  }
  static fromRange(t, n) {
    return n === 0 ? new te(
      t.startLineNumber,
      t.startColumn,
      t.endLineNumber,
      t.endColumn
    ) : new te(
      t.endLineNumber,
      t.endColumn,
      t.startLineNumber,
      t.startColumn
    );
  }
  static liftSelection(t) {
    return new te(
      t.selectionStartLineNumber,
      t.selectionStartColumn,
      t.positionLineNumber,
      t.positionColumn
    );
  }
  static selectionsArrEqual(t, n) {
    if (t && !n || !t && n)
      return !1;
    if (!t && !n)
      return !0;
    if (t.length !== n.length)
      return !1;
    for (let s = 0, r = t.length; s < r; s++)
      if (!this.selectionsEqual(t[s], n[s]))
        return !1;
    return !0;
  }
  static isISelection(t) {
    return t && typeof t.selectionStartLineNumber == "number" && typeof t.selectionStartColumn == "number" && typeof t.positionLineNumber == "number" && typeof t.positionColumn == "number";
  }
  static createWithDirection(t, n, s, r, i) {
    return i === 0 ? new te(t, n, s, r) : new te(s, r, t, n);
  }
}
const En = /* @__PURE__ */ Object.create(null);
function a(e, t) {
  if (qr(t)) {
    const n = En[t];
    if (n === void 0)
      throw new Error(`${e} references an unknown codicon: ${t}`);
    t = n;
  }
  return En[e] = t, { id: e };
}
const M = {
  add: a("add", 6e4),
  plus: a("plus", 6e4),
  gistNew: a("gist-new", 6e4),
  repoCreate: a("repo-create", 6e4),
  lightbulb: a("lightbulb", 60001),
  lightBulb: a("light-bulb", 60001),
  repo: a("repo", 60002),
  repoDelete: a("repo-delete", 60002),
  gistFork: a("gist-fork", 60003),
  repoForked: a("repo-forked", 60003),
  gitPullRequest: a("git-pull-request", 60004),
  gitPullRequestAbandoned: a("git-pull-request-abandoned", 60004),
  recordKeys: a("record-keys", 60005),
  keyboard: a("keyboard", 60005),
  tag: a("tag", 60006),
  tagAdd: a("tag-add", 60006),
  tagRemove: a("tag-remove", 60006),
  gitPullRequestLabel: a("git-pull-request-label", 60006),
  person: a("person", 60007),
  personFollow: a("person-follow", 60007),
  personOutline: a("person-outline", 60007),
  personFilled: a("person-filled", 60007),
  gitBranch: a("git-branch", 60008),
  gitBranchCreate: a("git-branch-create", 60008),
  gitBranchDelete: a("git-branch-delete", 60008),
  sourceControl: a("source-control", 60008),
  mirror: a("mirror", 60009),
  mirrorPublic: a("mirror-public", 60009),
  star: a("star", 60010),
  starAdd: a("star-add", 60010),
  starDelete: a("star-delete", 60010),
  starEmpty: a("star-empty", 60010),
  comment: a("comment", 60011),
  commentAdd: a("comment-add", 60011),
  alert: a("alert", 60012),
  warning: a("warning", 60012),
  search: a("search", 60013),
  searchSave: a("search-save", 60013),
  logOut: a("log-out", 60014),
  signOut: a("sign-out", 60014),
  logIn: a("log-in", 60015),
  signIn: a("sign-in", 60015),
  eye: a("eye", 60016),
  eyeUnwatch: a("eye-unwatch", 60016),
  eyeWatch: a("eye-watch", 60016),
  circleFilled: a("circle-filled", 60017),
  primitiveDot: a("primitive-dot", 60017),
  closeDirty: a("close-dirty", 60017),
  debugBreakpoint: a("debug-breakpoint", 60017),
  debugBreakpointDisabled: a("debug-breakpoint-disabled", 60017),
  debugBreakpointPending: a("debug-breakpoint-pending", 60377),
  debugHint: a("debug-hint", 60017),
  primitiveSquare: a("primitive-square", 60018),
  edit: a("edit", 60019),
  pencil: a("pencil", 60019),
  info: a("info", 60020),
  issueOpened: a("issue-opened", 60020),
  gistPrivate: a("gist-private", 60021),
  gitForkPrivate: a("git-fork-private", 60021),
  lock: a("lock", 60021),
  mirrorPrivate: a("mirror-private", 60021),
  close: a("close", 60022),
  removeClose: a("remove-close", 60022),
  x: a("x", 60022),
  repoSync: a("repo-sync", 60023),
  sync: a("sync", 60023),
  clone: a("clone", 60024),
  desktopDownload: a("desktop-download", 60024),
  beaker: a("beaker", 60025),
  microscope: a("microscope", 60025),
  vm: a("vm", 60026),
  deviceDesktop: a("device-desktop", 60026),
  file: a("file", 60027),
  fileText: a("file-text", 60027),
  more: a("more", 60028),
  ellipsis: a("ellipsis", 60028),
  kebabHorizontal: a("kebab-horizontal", 60028),
  mailReply: a("mail-reply", 60029),
  reply: a("reply", 60029),
  organization: a("organization", 60030),
  organizationFilled: a("organization-filled", 60030),
  organizationOutline: a("organization-outline", 60030),
  newFile: a("new-file", 60031),
  fileAdd: a("file-add", 60031),
  newFolder: a("new-folder", 60032),
  fileDirectoryCreate: a("file-directory-create", 60032),
  trash: a("trash", 60033),
  trashcan: a("trashcan", 60033),
  history: a("history", 60034),
  clock: a("clock", 60034),
  folder: a("folder", 60035),
  fileDirectory: a("file-directory", 60035),
  symbolFolder: a("symbol-folder", 60035),
  logoGithub: a("logo-github", 60036),
  markGithub: a("mark-github", 60036),
  github: a("github", 60036),
  terminal: a("terminal", 60037),
  console: a("console", 60037),
  repl: a("repl", 60037),
  zap: a("zap", 60038),
  symbolEvent: a("symbol-event", 60038),
  error: a("error", 60039),
  stop: a("stop", 60039),
  variable: a("variable", 60040),
  symbolVariable: a("symbol-variable", 60040),
  array: a("array", 60042),
  symbolArray: a("symbol-array", 60042),
  symbolModule: a("symbol-module", 60043),
  symbolPackage: a("symbol-package", 60043),
  symbolNamespace: a("symbol-namespace", 60043),
  symbolObject: a("symbol-object", 60043),
  symbolMethod: a("symbol-method", 60044),
  symbolFunction: a("symbol-function", 60044),
  symbolConstructor: a("symbol-constructor", 60044),
  symbolBoolean: a("symbol-boolean", 60047),
  symbolNull: a("symbol-null", 60047),
  symbolNumeric: a("symbol-numeric", 60048),
  symbolNumber: a("symbol-number", 60048),
  symbolStructure: a("symbol-structure", 60049),
  symbolStruct: a("symbol-struct", 60049),
  symbolParameter: a("symbol-parameter", 60050),
  symbolTypeParameter: a("symbol-type-parameter", 60050),
  symbolKey: a("symbol-key", 60051),
  symbolText: a("symbol-text", 60051),
  symbolReference: a("symbol-reference", 60052),
  goToFile: a("go-to-file", 60052),
  symbolEnum: a("symbol-enum", 60053),
  symbolValue: a("symbol-value", 60053),
  symbolRuler: a("symbol-ruler", 60054),
  symbolUnit: a("symbol-unit", 60054),
  activateBreakpoints: a("activate-breakpoints", 60055),
  archive: a("archive", 60056),
  arrowBoth: a("arrow-both", 60057),
  arrowDown: a("arrow-down", 60058),
  arrowLeft: a("arrow-left", 60059),
  arrowRight: a("arrow-right", 60060),
  arrowSmallDown: a("arrow-small-down", 60061),
  arrowSmallLeft: a("arrow-small-left", 60062),
  arrowSmallRight: a("arrow-small-right", 60063),
  arrowSmallUp: a("arrow-small-up", 60064),
  arrowUp: a("arrow-up", 60065),
  bell: a("bell", 60066),
  bold: a("bold", 60067),
  book: a("book", 60068),
  bookmark: a("bookmark", 60069),
  debugBreakpointConditionalUnverified: a("debug-breakpoint-conditional-unverified", 60070),
  debugBreakpointConditional: a("debug-breakpoint-conditional", 60071),
  debugBreakpointConditionalDisabled: a("debug-breakpoint-conditional-disabled", 60071),
  debugBreakpointDataUnverified: a("debug-breakpoint-data-unverified", 60072),
  debugBreakpointData: a("debug-breakpoint-data", 60073),
  debugBreakpointDataDisabled: a("debug-breakpoint-data-disabled", 60073),
  debugBreakpointLogUnverified: a("debug-breakpoint-log-unverified", 60074),
  debugBreakpointLog: a("debug-breakpoint-log", 60075),
  debugBreakpointLogDisabled: a("debug-breakpoint-log-disabled", 60075),
  briefcase: a("briefcase", 60076),
  broadcast: a("broadcast", 60077),
  browser: a("browser", 60078),
  bug: a("bug", 60079),
  calendar: a("calendar", 60080),
  caseSensitive: a("case-sensitive", 60081),
  check: a("check", 60082),
  checklist: a("checklist", 60083),
  chevronDown: a("chevron-down", 60084),
  dropDownButton: a("drop-down-button", 60084),
  chevronLeft: a("chevron-left", 60085),
  chevronRight: a("chevron-right", 60086),
  chevronUp: a("chevron-up", 60087),
  chromeClose: a("chrome-close", 60088),
  chromeMaximize: a("chrome-maximize", 60089),
  chromeMinimize: a("chrome-minimize", 60090),
  chromeRestore: a("chrome-restore", 60091),
  circle: a("circle", 60092),
  circleOutline: a("circle-outline", 60092),
  debugBreakpointUnverified: a("debug-breakpoint-unverified", 60092),
  circleSlash: a("circle-slash", 60093),
  circuitBoard: a("circuit-board", 60094),
  clearAll: a("clear-all", 60095),
  clippy: a("clippy", 60096),
  closeAll: a("close-all", 60097),
  cloudDownload: a("cloud-download", 60098),
  cloudUpload: a("cloud-upload", 60099),
  code: a("code", 60100),
  collapseAll: a("collapse-all", 60101),
  colorMode: a("color-mode", 60102),
  commentDiscussion: a("comment-discussion", 60103),
  compareChanges: a("compare-changes", 60157),
  creditCard: a("credit-card", 60105),
  dash: a("dash", 60108),
  dashboard: a("dashboard", 60109),
  database: a("database", 60110),
  debugContinue: a("debug-continue", 60111),
  debugDisconnect: a("debug-disconnect", 60112),
  debugPause: a("debug-pause", 60113),
  debugRestart: a("debug-restart", 60114),
  debugStart: a("debug-start", 60115),
  debugStepInto: a("debug-step-into", 60116),
  debugStepOut: a("debug-step-out", 60117),
  debugStepOver: a("debug-step-over", 60118),
  debugStop: a("debug-stop", 60119),
  debug: a("debug", 60120),
  deviceCameraVideo: a("device-camera-video", 60121),
  deviceCamera: a("device-camera", 60122),
  deviceMobile: a("device-mobile", 60123),
  diffAdded: a("diff-added", 60124),
  diffIgnored: a("diff-ignored", 60125),
  diffModified: a("diff-modified", 60126),
  diffRemoved: a("diff-removed", 60127),
  diffRenamed: a("diff-renamed", 60128),
  diff: a("diff", 60129),
  discard: a("discard", 60130),
  editorLayout: a("editor-layout", 60131),
  emptyWindow: a("empty-window", 60132),
  exclude: a("exclude", 60133),
  extensions: a("extensions", 60134),
  eyeClosed: a("eye-closed", 60135),
  fileBinary: a("file-binary", 60136),
  fileCode: a("file-code", 60137),
  fileMedia: a("file-media", 60138),
  filePdf: a("file-pdf", 60139),
  fileSubmodule: a("file-submodule", 60140),
  fileSymlinkDirectory: a("file-symlink-directory", 60141),
  fileSymlinkFile: a("file-symlink-file", 60142),
  fileZip: a("file-zip", 60143),
  files: a("files", 60144),
  filter: a("filter", 60145),
  flame: a("flame", 60146),
  foldDown: a("fold-down", 60147),
  foldUp: a("fold-up", 60148),
  fold: a("fold", 60149),
  folderActive: a("folder-active", 60150),
  folderOpened: a("folder-opened", 60151),
  gear: a("gear", 60152),
  gift: a("gift", 60153),
  gistSecret: a("gist-secret", 60154),
  gist: a("gist", 60155),
  gitCommit: a("git-commit", 60156),
  gitCompare: a("git-compare", 60157),
  gitMerge: a("git-merge", 60158),
  githubAction: a("github-action", 60159),
  githubAlt: a("github-alt", 60160),
  globe: a("globe", 60161),
  grabber: a("grabber", 60162),
  graph: a("graph", 60163),
  gripper: a("gripper", 60164),
  heart: a("heart", 60165),
  home: a("home", 60166),
  horizontalRule: a("horizontal-rule", 60167),
  hubot: a("hubot", 60168),
  inbox: a("inbox", 60169),
  issueClosed: a("issue-closed", 60324),
  issueReopened: a("issue-reopened", 60171),
  issues: a("issues", 60172),
  italic: a("italic", 60173),
  jersey: a("jersey", 60174),
  json: a("json", 60175),
  bracket: a("bracket", 60175),
  kebabVertical: a("kebab-vertical", 60176),
  key: a("key", 60177),
  law: a("law", 60178),
  lightbulbAutofix: a("lightbulb-autofix", 60179),
  linkExternal: a("link-external", 60180),
  link: a("link", 60181),
  listOrdered: a("list-ordered", 60182),
  listUnordered: a("list-unordered", 60183),
  liveShare: a("live-share", 60184),
  loading: a("loading", 60185),
  location: a("location", 60186),
  mailRead: a("mail-read", 60187),
  mail: a("mail", 60188),
  markdown: a("markdown", 60189),
  megaphone: a("megaphone", 60190),
  mention: a("mention", 60191),
  milestone: a("milestone", 60192),
  gitPullRequestMilestone: a("git-pull-request-milestone", 60192),
  mortarBoard: a("mortar-board", 60193),
  move: a("move", 60194),
  multipleWindows: a("multiple-windows", 60195),
  mute: a("mute", 60196),
  noNewline: a("no-newline", 60197),
  note: a("note", 60198),
  octoface: a("octoface", 60199),
  openPreview: a("open-preview", 60200),
  package: a("package", 60201),
  paintcan: a("paintcan", 60202),
  pin: a("pin", 60203),
  play: a("play", 60204),
  run: a("run", 60204),
  plug: a("plug", 60205),
  preserveCase: a("preserve-case", 60206),
  preview: a("preview", 60207),
  project: a("project", 60208),
  pulse: a("pulse", 60209),
  question: a("question", 60210),
  quote: a("quote", 60211),
  radioTower: a("radio-tower", 60212),
  reactions: a("reactions", 60213),
  references: a("references", 60214),
  refresh: a("refresh", 60215),
  regex: a("regex", 60216),
  remoteExplorer: a("remote-explorer", 60217),
  remote: a("remote", 60218),
  remove: a("remove", 60219),
  replaceAll: a("replace-all", 60220),
  replace: a("replace", 60221),
  repoClone: a("repo-clone", 60222),
  repoForcePush: a("repo-force-push", 60223),
  repoPull: a("repo-pull", 60224),
  repoPush: a("repo-push", 60225),
  report: a("report", 60226),
  requestChanges: a("request-changes", 60227),
  rocket: a("rocket", 60228),
  rootFolderOpened: a("root-folder-opened", 60229),
  rootFolder: a("root-folder", 60230),
  rss: a("rss", 60231),
  ruby: a("ruby", 60232),
  saveAll: a("save-all", 60233),
  saveAs: a("save-as", 60234),
  save: a("save", 60235),
  screenFull: a("screen-full", 60236),
  screenNormal: a("screen-normal", 60237),
  searchStop: a("search-stop", 60238),
  server: a("server", 60240),
  settingsGear: a("settings-gear", 60241),
  settings: a("settings", 60242),
  shield: a("shield", 60243),
  smiley: a("smiley", 60244),
  sortPrecedence: a("sort-precedence", 60245),
  splitHorizontal: a("split-horizontal", 60246),
  splitVertical: a("split-vertical", 60247),
  squirrel: a("squirrel", 60248),
  starFull: a("star-full", 60249),
  starHalf: a("star-half", 60250),
  symbolClass: a("symbol-class", 60251),
  symbolColor: a("symbol-color", 60252),
  symbolCustomColor: a("symbol-customcolor", 60252),
  symbolConstant: a("symbol-constant", 60253),
  symbolEnumMember: a("symbol-enum-member", 60254),
  symbolField: a("symbol-field", 60255),
  symbolFile: a("symbol-file", 60256),
  symbolInterface: a("symbol-interface", 60257),
  symbolKeyword: a("symbol-keyword", 60258),
  symbolMisc: a("symbol-misc", 60259),
  symbolOperator: a("symbol-operator", 60260),
  symbolProperty: a("symbol-property", 60261),
  wrench: a("wrench", 60261),
  wrenchSubaction: a("wrench-subaction", 60261),
  symbolSnippet: a("symbol-snippet", 60262),
  tasklist: a("tasklist", 60263),
  telescope: a("telescope", 60264),
  textSize: a("text-size", 60265),
  threeBars: a("three-bars", 60266),
  thumbsdown: a("thumbsdown", 60267),
  thumbsup: a("thumbsup", 60268),
  tools: a("tools", 60269),
  triangleDown: a("triangle-down", 60270),
  triangleLeft: a("triangle-left", 60271),
  triangleRight: a("triangle-right", 60272),
  triangleUp: a("triangle-up", 60273),
  twitter: a("twitter", 60274),
  unfold: a("unfold", 60275),
  unlock: a("unlock", 60276),
  unmute: a("unmute", 60277),
  unverified: a("unverified", 60278),
  verified: a("verified", 60279),
  versions: a("versions", 60280),
  vmActive: a("vm-active", 60281),
  vmOutline: a("vm-outline", 60282),
  vmRunning: a("vm-running", 60283),
  watch: a("watch", 60284),
  whitespace: a("whitespace", 60285),
  wholeWord: a("whole-word", 60286),
  window: a("window", 60287),
  wordWrap: a("word-wrap", 60288),
  zoomIn: a("zoom-in", 60289),
  zoomOut: a("zoom-out", 60290),
  listFilter: a("list-filter", 60291),
  listFlat: a("list-flat", 60292),
  listSelection: a("list-selection", 60293),
  selection: a("selection", 60293),
  listTree: a("list-tree", 60294),
  debugBreakpointFunctionUnverified: a("debug-breakpoint-function-unverified", 60295),
  debugBreakpointFunction: a("debug-breakpoint-function", 60296),
  debugBreakpointFunctionDisabled: a("debug-breakpoint-function-disabled", 60296),
  debugStackframeActive: a("debug-stackframe-active", 60297),
  circleSmallFilled: a("circle-small-filled", 60298),
  debugStackframeDot: a("debug-stackframe-dot", 60298),
  debugStackframe: a("debug-stackframe", 60299),
  debugStackframeFocused: a("debug-stackframe-focused", 60299),
  debugBreakpointUnsupported: a("debug-breakpoint-unsupported", 60300),
  symbolString: a("symbol-string", 60301),
  debugReverseContinue: a("debug-reverse-continue", 60302),
  debugStepBack: a("debug-step-back", 60303),
  debugRestartFrame: a("debug-restart-frame", 60304),
  callIncoming: a("call-incoming", 60306),
  callOutgoing: a("call-outgoing", 60307),
  menu: a("menu", 60308),
  expandAll: a("expand-all", 60309),
  feedback: a("feedback", 60310),
  gitPullRequestReviewer: a("git-pull-request-reviewer", 60310),
  groupByRefType: a("group-by-ref-type", 60311),
  ungroupByRefType: a("ungroup-by-ref-type", 60312),
  account: a("account", 60313),
  gitPullRequestAssignee: a("git-pull-request-assignee", 60313),
  bellDot: a("bell-dot", 60314),
  debugConsole: a("debug-console", 60315),
  library: a("library", 60316),
  output: a("output", 60317),
  runAll: a("run-all", 60318),
  syncIgnored: a("sync-ignored", 60319),
  pinned: a("pinned", 60320),
  githubInverted: a("github-inverted", 60321),
  debugAlt: a("debug-alt", 60305),
  serverProcess: a("server-process", 60322),
  serverEnvironment: a("server-environment", 60323),
  pass: a("pass", 60324),
  stopCircle: a("stop-circle", 60325),
  playCircle: a("play-circle", 60326),
  record: a("record", 60327),
  debugAltSmall: a("debug-alt-small", 60328),
  vmConnect: a("vm-connect", 60329),
  cloud: a("cloud", 60330),
  merge: a("merge", 60331),
  exportIcon: a("export", 60332),
  graphLeft: a("graph-left", 60333),
  magnet: a("magnet", 60334),
  notebook: a("notebook", 60335),
  redo: a("redo", 60336),
  checkAll: a("check-all", 60337),
  pinnedDirty: a("pinned-dirty", 60338),
  passFilled: a("pass-filled", 60339),
  circleLargeFilled: a("circle-large-filled", 60340),
  circleLarge: a("circle-large", 60341),
  circleLargeOutline: a("circle-large-outline", 60341),
  combine: a("combine", 60342),
  gather: a("gather", 60342),
  table: a("table", 60343),
  variableGroup: a("variable-group", 60344),
  typeHierarchy: a("type-hierarchy", 60345),
  typeHierarchySub: a("type-hierarchy-sub", 60346),
  typeHierarchySuper: a("type-hierarchy-super", 60347),
  gitPullRequestCreate: a("git-pull-request-create", 60348),
  runAbove: a("run-above", 60349),
  runBelow: a("run-below", 60350),
  notebookTemplate: a("notebook-template", 60351),
  debugRerun: a("debug-rerun", 60352),
  workspaceTrusted: a("workspace-trusted", 60353),
  workspaceUntrusted: a("workspace-untrusted", 60354),
  workspaceUnspecified: a("workspace-unspecified", 60355),
  terminalCmd: a("terminal-cmd", 60356),
  terminalDebian: a("terminal-debian", 60357),
  terminalLinux: a("terminal-linux", 60358),
  terminalPowershell: a("terminal-powershell", 60359),
  terminalTmux: a("terminal-tmux", 60360),
  terminalUbuntu: a("terminal-ubuntu", 60361),
  terminalBash: a("terminal-bash", 60362),
  arrowSwap: a("arrow-swap", 60363),
  copy: a("copy", 60364),
  personAdd: a("person-add", 60365),
  filterFilled: a("filter-filled", 60366),
  wand: a("wand", 60367),
  debugLineByLine: a("debug-line-by-line", 60368),
  inspect: a("inspect", 60369),
  layers: a("layers", 60370),
  layersDot: a("layers-dot", 60371),
  layersActive: a("layers-active", 60372),
  compass: a("compass", 60373),
  compassDot: a("compass-dot", 60374),
  compassActive: a("compass-active", 60375),
  azure: a("azure", 60376),
  issueDraft: a("issue-draft", 60377),
  gitPullRequestClosed: a("git-pull-request-closed", 60378),
  gitPullRequestDraft: a("git-pull-request-draft", 60379),
  debugAll: a("debug-all", 60380),
  debugCoverage: a("debug-coverage", 60381),
  runErrors: a("run-errors", 60382),
  folderLibrary: a("folder-library", 60383),
  debugContinueSmall: a("debug-continue-small", 60384),
  beakerStop: a("beaker-stop", 60385),
  graphLine: a("graph-line", 60386),
  graphScatter: a("graph-scatter", 60387),
  pieChart: a("pie-chart", 60388),
  bracketDot: a("bracket-dot", 60389),
  bracketError: a("bracket-error", 60390),
  lockSmall: a("lock-small", 60391),
  azureDevops: a("azure-devops", 60392),
  verifiedFilled: a("verified-filled", 60393),
  newLine: a("newline", 60394),
  layout: a("layout", 60395),
  layoutActivitybarLeft: a("layout-activitybar-left", 60396),
  layoutActivitybarRight: a("layout-activitybar-right", 60397),
  layoutPanelLeft: a("layout-panel-left", 60398),
  layoutPanelCenter: a("layout-panel-center", 60399),
  layoutPanelJustify: a("layout-panel-justify", 60400),
  layoutPanelRight: a("layout-panel-right", 60401),
  layoutPanel: a("layout-panel", 60402),
  layoutSidebarLeft: a("layout-sidebar-left", 60403),
  layoutSidebarRight: a("layout-sidebar-right", 60404),
  layoutStatusbar: a("layout-statusbar", 60405),
  layoutMenubar: a("layout-menubar", 60406),
  layoutCentered: a("layout-centered", 60407),
  layoutSidebarRightOff: a("layout-sidebar-right-off", 60416),
  layoutPanelOff: a("layout-panel-off", 60417),
  layoutSidebarLeftOff: a("layout-sidebar-left-off", 60418),
  target: a("target", 60408),
  indent: a("indent", 60409),
  recordSmall: a("record-small", 60410),
  errorSmall: a("error-small", 60411),
  arrowCircleDown: a("arrow-circle-down", 60412),
  arrowCircleLeft: a("arrow-circle-left", 60413),
  arrowCircleRight: a("arrow-circle-right", 60414),
  arrowCircleUp: a("arrow-circle-up", 60415),
  heartFilled: a("heart-filled", 60420),
  map: a("map", 60421),
  mapFilled: a("map-filled", 60422),
  circleSmall: a("circle-small", 60423),
  bellSlash: a("bell-slash", 60424),
  bellSlashDot: a("bell-slash-dot", 60425),
  commentUnresolved: a("comment-unresolved", 60426),
  gitPullRequestGoToChanges: a("git-pull-request-go-to-changes", 60427),
  gitPullRequestNewChanges: a("git-pull-request-new-changes", 60428),
  searchFuzzy: a("search-fuzzy", 60429),
  commentDraft: a("comment-draft", 60430),
  send: a("send", 60431),
  sparkle: a("sparkle", 60432),
  insert: a("insert", 60433),
  mic: a("mic", 60434),
  thumbsDownFilled: a("thumbsdown-filled", 60435),
  thumbsUpFilled: a("thumbsup-filled", 60436),
  coffee: a("coffee", 60437),
  snake: a("snake", 60438),
  game: a("game", 60439),
  vr: a("vr", 60440),
  chip: a("chip", 60441),
  piano: a("piano", 60442),
  music: a("music", 60443),
  micFilled: a("mic-filled", 60444),
  gitFetch: a("git-fetch", 60445),
  copilot: a("copilot", 60446),
  lightbulbSparkle: a("lightbulb-sparkle", 60447),
  lightbulbSparkleAutofix: a("lightbulb-sparkle-autofix", 60447),
  robot: a("robot", 60448),
  sparkleFilled: a("sparkle-filled", 60449),
  diffSingle: a("diff-single", 60450),
  diffMultiple: a("diff-multiple", 60451),
  surroundWith: a("surround-with", 60452),
  gitStash: a("git-stash", 60454),
  gitStashApply: a("git-stash-apply", 60455),
  gitStashPop: a("git-stash-pop", 60456),
  runAllCoverage: a("run-all-coverage", 60461),
  runCoverage: a("run-all-coverage", 60460),
  coverage: a("coverage", 60462),
  githubProject: a("github-project", 60463),
  dialogError: a("dialog-error", "error"),
  dialogWarning: a("dialog-warning", "warning"),
  dialogInfo: a("dialog-info", "info"),
  dialogClose: a("dialog-close", "close"),
  treeItemExpanded: a("tree-item-expanded", "chevron-down"),
  treeFilterOnTypeOn: a("tree-filter-on-type-on", "list-filter"),
  treeFilterOnTypeOff: a("tree-filter-on-type-off", "list-selection"),
  treeFilterClear: a("tree-filter-clear", "close"),
  treeItemLoading: a("tree-item-loading", "loading"),
  menuSelection: a("menu-selection", "check"),
  menuSubmenu: a("menu-submenu", "chevron-right"),
  menuBarMore: a("menubar-more", "more"),
  scrollbarButtonLeft: a("scrollbar-button-left", "triangle-left"),
  scrollbarButtonRight: a("scrollbar-button-right", "triangle-right"),
  scrollbarButtonUp: a("scrollbar-button-up", "triangle-up"),
  scrollbarButtonDown: a("scrollbar-button-down", "triangle-down"),
  toolBarMore: a("toolbar-more", "more"),
  quickInputBack: a("quick-input-back", "arrow-left")
};
class Qi {
  constructor() {
    this._tokenizationSupports = /* @__PURE__ */ new Map(), this._factories = /* @__PURE__ */ new Map(), this._onDidChange = new ae(), this.onDidChange = this._onDidChange.event, this._colorMap = null;
  }
  handleChange(t) {
    this._onDidChange.fire({
      changedLanguages: t,
      changedColorMap: !1
    });
  }
  register(t, n) {
    return this._tokenizationSupports.set(t, n), this.handleChange([t]), bt(() => {
      this._tokenizationSupports.get(t) === n && (this._tokenizationSupports.delete(t), this.handleChange([t]));
    });
  }
  get(t) {
    return this._tokenizationSupports.get(t) || null;
  }
  registerFactory(t, n) {
    var r;
    (r = this._factories.get(t)) == null || r.dispose();
    const s = new Ji(this, t, n);
    return this._factories.set(t, s), bt(() => {
      const i = this._factories.get(t);
      !i || i !== s || (this._factories.delete(t), i.dispose());
    });
  }
  async getOrCreate(t) {
    const n = this.get(t);
    if (n)
      return n;
    const s = this._factories.get(t);
    return !s || s.isResolved ? null : (await s.resolve(), this.get(t));
  }
  isResolved(t) {
    if (this.get(t))
      return !0;
    const s = this._factories.get(t);
    return !!(!s || s.isResolved);
  }
  setColorMap(t) {
    this._colorMap = t, this._onDidChange.fire({
      changedLanguages: Array.from(this._tokenizationSupports.keys()),
      changedColorMap: !0
    });
  }
  getColorMap() {
    return this._colorMap;
  }
  getDefaultBackground() {
    return this._colorMap && this._colorMap.length > 2 ? this._colorMap[2] : null;
  }
}
class Ji extends $e {
  get isResolved() {
    return this._isResolved;
  }
  constructor(t, n, s) {
    super(), this._registry = t, this._languageId = n, this._factory = s, this._isDisposed = !1, this._resolvePromise = null, this._isResolved = !1;
  }
  dispose() {
    this._isDisposed = !0, super.dispose();
  }
  async resolve() {
    return this._resolvePromise || (this._resolvePromise = this._create()), this._resolvePromise;
  }
  async _create() {
    const t = await this._factory.tokenizationSupport;
    this._isResolved = !0, t && !this._isDisposed && this._register(this._registry.register(this._languageId, t));
  }
}
class Yi {
  constructor(t, n, s) {
    this.offset = t, this.type = n, this.language = s, this._tokenBrand = void 0;
  }
  toString() {
    return "(" + this.offset + ", " + this.type + ")";
  }
}
var Mn;
(function(e) {
  const t = /* @__PURE__ */ new Map();
  t.set(0, M.symbolMethod), t.set(1, M.symbolFunction), t.set(2, M.symbolConstructor), t.set(3, M.symbolField), t.set(4, M.symbolVariable), t.set(5, M.symbolClass), t.set(6, M.symbolStruct), t.set(7, M.symbolInterface), t.set(8, M.symbolModule), t.set(9, M.symbolProperty), t.set(10, M.symbolEvent), t.set(11, M.symbolOperator), t.set(12, M.symbolUnit), t.set(13, M.symbolValue), t.set(15, M.symbolEnum), t.set(14, M.symbolConstant), t.set(15, M.symbolEnum), t.set(16, M.symbolEnumMember), t.set(17, M.symbolKeyword), t.set(27, M.symbolSnippet), t.set(18, M.symbolText), t.set(19, M.symbolColor), t.set(20, M.symbolFile), t.set(21, M.symbolReference), t.set(22, M.symbolCustomColor), t.set(23, M.symbolFolder), t.set(24, M.symbolTypeParameter), t.set(25, M.account), t.set(26, M.issues);
  function n(i) {
    let l = t.get(i);
    return l || (console.info("No codicon found for CompletionItemKind " + i), l = M.symbolProperty), l;
  }
  e.toIcon = n;
  const s = /* @__PURE__ */ new Map();
  s.set("method", 0), s.set("function", 1), s.set("constructor", 2), s.set("field", 3), s.set("variable", 4), s.set("class", 5), s.set("struct", 6), s.set("interface", 7), s.set("module", 8), s.set("property", 9), s.set("event", 10), s.set("operator", 11), s.set("unit", 12), s.set("value", 13), s.set("constant", 14), s.set("enum", 15), s.set("enum-member", 16), s.set("enumMember", 16), s.set("keyword", 17), s.set("snippet", 27), s.set("text", 18), s.set("color", 19), s.set("file", 20), s.set("reference", 21), s.set("customcolor", 22), s.set("folder", 23), s.set("type-parameter", 24), s.set("typeParameter", 24), s.set("account", 25), s.set("issue", 26);
  function r(i, l) {
    let o = s.get(i);
    return typeof o > "u" && !l && (o = 9), o;
  }
  e.fromString = r;
})(Mn || (Mn = {}));
var kn;
(function(e) {
  e[e.Automatic = 0] = "Automatic", e[e.Explicit = 1] = "Explicit";
})(kn || (kn = {}));
var Dn;
(function(e) {
  e[e.Invoke = 1] = "Invoke", e[e.TriggerCharacter = 2] = "TriggerCharacter", e[e.ContentChange = 3] = "ContentChange";
})(Dn || (Dn = {}));
var Pn;
(function(e) {
  e[e.Text = 0] = "Text", e[e.Read = 1] = "Read", e[e.Write = 2] = "Write";
})(Pn || (Pn = {}));
H("vs/editor/common/languages", "Array", "array"), H("vs/editor/common/languages", "Boolean", "boolean"), H("vs/editor/common/languages", "Class", "class"), H("vs/editor/common/languages", "Constant", "constant"), H("vs/editor/common/languages", "Constructor", "constructor"), H("vs/editor/common/languages", "Enum", "enumeration"), H("vs/editor/common/languages", "EnumMember", "enumeration member"), H("vs/editor/common/languages", "Event", "event"), H("vs/editor/common/languages", "Field", "field"), H("vs/editor/common/languages", "File", "file"), H("vs/editor/common/languages", "Function", "function"), H("vs/editor/common/languages", "Interface", "interface"), H("vs/editor/common/languages", "Key", "key"), H("vs/editor/common/languages", "Method", "method"), H("vs/editor/common/languages", "Module", "module"), H("vs/editor/common/languages", "Namespace", "namespace"), H("vs/editor/common/languages", "Null", "null"), H("vs/editor/common/languages", "Number", "number"), H("vs/editor/common/languages", "Object", "object"), H("vs/editor/common/languages", "Operator", "operator"), H("vs/editor/common/languages", "Package", "package"), H("vs/editor/common/languages", "Property", "property"), H("vs/editor/common/languages", "String", "string"), H("vs/editor/common/languages", "Struct", "struct"), H("vs/editor/common/languages", "TypeParameter", "type parameter"), H("vs/editor/common/languages", "Variable", "variable");
var Fn;
(function(e) {
  const t = /* @__PURE__ */ new Map();
  t.set(0, M.symbolFile), t.set(1, M.symbolModule), t.set(2, M.symbolNamespace), t.set(3, M.symbolPackage), t.set(4, M.symbolClass), t.set(5, M.symbolMethod), t.set(6, M.symbolProperty), t.set(7, M.symbolField), t.set(8, M.symbolConstructor), t.set(9, M.symbolEnum), t.set(10, M.symbolInterface), t.set(11, M.symbolFunction), t.set(12, M.symbolVariable), t.set(13, M.symbolConstant), t.set(14, M.symbolString), t.set(15, M.symbolNumber), t.set(16, M.symbolBoolean), t.set(17, M.symbolArray), t.set(18, M.symbolObject), t.set(19, M.symbolKey), t.set(20, M.symbolNull), t.set(21, M.symbolEnumMember), t.set(22, M.symbolStruct), t.set(23, M.symbolEvent), t.set(24, M.symbolOperator), t.set(25, M.symbolTypeParameter);
  function n(s) {
    let r = t.get(s);
    return r || (console.info("No codicon found for SymbolKind " + s), r = M.symbolProperty), r;
  }
  e.toIcon = n;
})(Fn || (Fn = {}));
const ne = class ne {
  static fromValue(t) {
    switch (t) {
      case "comment":
        return ne.Comment;
      case "imports":
        return ne.Imports;
      case "region":
        return ne.Region;
    }
    return new ne(t);
  }
  constructor(t) {
    this.value = t;
  }
};
ne.Comment = new ne("comment"), ne.Imports = new ne("imports"), ne.Region = new ne("region");
let Tn = ne;
var Vn;
(function(e) {
  function t(n) {
    return !n || typeof n != "object" ? !1 : typeof n.id == "string" && typeof n.title == "string";
  }
  e.is = t;
})(Vn || (Vn = {}));
var qn;
(function(e) {
  e[e.Collapsed = 0] = "Collapsed", e[e.Expanded = 1] = "Expanded";
})(qn || (qn = {}));
var Bn;
(function(e) {
  e[e.Unresolved = 0] = "Unresolved", e[e.Resolved = 1] = "Resolved";
})(Bn || (Bn = {}));
var In;
(function(e) {
  e[e.Editing = 0] = "Editing", e[e.Preview = 1] = "Preview";
})(In || (In = {}));
var Un;
(function(e) {
  e[e.Type = 1] = "Type", e[e.Parameter = 2] = "Parameter";
})(Un || (Un = {}));
new Qi();
var Hn;
(function(e) {
  e[e.None = 0] = "None", e[e.Option = 1] = "Option", e[e.Default = 2] = "Default", e[e.Preferred = 3] = "Preferred";
})(Hn || (Hn = {}));
var Wn;
(function(e) {
  e[e.Invoke = 0] = "Invoke", e[e.Automatic = 1] = "Automatic";
})(Wn || (Wn = {}));
var zn;
(function(e) {
  e[e.Unknown = 0] = "Unknown", e[e.Disabled = 1] = "Disabled", e[e.Enabled = 2] = "Enabled";
})(zn || (zn = {}));
var $n;
(function(e) {
  e[e.Invoke = 1] = "Invoke", e[e.Auto = 2] = "Auto";
})($n || ($n = {}));
var Gn;
(function(e) {
  e[e.None = 0] = "None", e[e.KeepWhitespace = 1] = "KeepWhitespace", e[e.InsertAsSnippet = 4] = "InsertAsSnippet";
})(Gn || (Gn = {}));
var jn;
(function(e) {
  e[e.Method = 0] = "Method", e[e.Function = 1] = "Function", e[e.Constructor = 2] = "Constructor", e[e.Field = 3] = "Field", e[e.Variable = 4] = "Variable", e[e.Class = 5] = "Class", e[e.Struct = 6] = "Struct", e[e.Interface = 7] = "Interface", e[e.Module = 8] = "Module", e[e.Property = 9] = "Property", e[e.Event = 10] = "Event", e[e.Operator = 11] = "Operator", e[e.Unit = 12] = "Unit", e[e.Value = 13] = "Value", e[e.Constant = 14] = "Constant", e[e.Enum = 15] = "Enum", e[e.EnumMember = 16] = "EnumMember", e[e.Keyword = 17] = "Keyword", e[e.Text = 18] = "Text", e[e.Color = 19] = "Color", e[e.File = 20] = "File", e[e.Reference = 21] = "Reference", e[e.Customcolor = 22] = "Customcolor", e[e.Folder = 23] = "Folder", e[e.TypeParameter = 24] = "TypeParameter", e[e.User = 25] = "User", e[e.Issue = 26] = "Issue", e[e.Snippet = 27] = "Snippet";
})(jn || (jn = {}));
var On;
(function(e) {
  e[e.Deprecated = 1] = "Deprecated";
})(On || (On = {}));
var Xn;
(function(e) {
  e[e.Invoke = 0] = "Invoke", e[e.TriggerCharacter = 1] = "TriggerCharacter", e[e.TriggerForIncompleteCompletions = 2] = "TriggerForIncompleteCompletions";
})(Xn || (Xn = {}));
var Qn;
(function(e) {
  e[e.EXACT = 0] = "EXACT", e[e.ABOVE = 1] = "ABOVE", e[e.BELOW = 2] = "BELOW";
})(Qn || (Qn = {}));
var Jn;
(function(e) {
  e[e.NotSet = 0] = "NotSet", e[e.ContentFlush = 1] = "ContentFlush", e[e.RecoverFromMarkers = 2] = "RecoverFromMarkers", e[e.Explicit = 3] = "Explicit", e[e.Paste = 4] = "Paste", e[e.Undo = 5] = "Undo", e[e.Redo = 6] = "Redo";
})(Jn || (Jn = {}));
var Yn;
(function(e) {
  e[e.LF = 1] = "LF", e[e.CRLF = 2] = "CRLF";
})(Yn || (Yn = {}));
var Zn;
(function(e) {
  e[e.Text = 0] = "Text", e[e.Read = 1] = "Read", e[e.Write = 2] = "Write";
})(Zn || (Zn = {}));
var Kn;
(function(e) {
  e[e.None = 0] = "None", e[e.Keep = 1] = "Keep", e[e.Brackets = 2] = "Brackets", e[e.Advanced = 3] = "Advanced", e[e.Full = 4] = "Full";
})(Kn || (Kn = {}));
var es;
(function(e) {
  e[e.acceptSuggestionOnCommitCharacter = 0] = "acceptSuggestionOnCommitCharacter", e[e.acceptSuggestionOnEnter = 1] = "acceptSuggestionOnEnter", e[e.accessibilitySupport = 2] = "accessibilitySupport", e[e.accessibilityPageSize = 3] = "accessibilityPageSize", e[e.ariaLabel = 4] = "ariaLabel", e[e.ariaRequired = 5] = "ariaRequired", e[e.autoClosingBrackets = 6] = "autoClosingBrackets", e[e.autoClosingComments = 7] = "autoClosingComments", e[e.screenReaderAnnounceInlineSuggestion = 8] = "screenReaderAnnounceInlineSuggestion", e[e.autoClosingDelete = 9] = "autoClosingDelete", e[e.autoClosingOvertype = 10] = "autoClosingOvertype", e[e.autoClosingQuotes = 11] = "autoClosingQuotes", e[e.autoIndent = 12] = "autoIndent", e[e.automaticLayout = 13] = "automaticLayout", e[e.autoSurround = 14] = "autoSurround", e[e.bracketPairColorization = 15] = "bracketPairColorization", e[e.guides = 16] = "guides", e[e.codeLens = 17] = "codeLens", e[e.codeLensFontFamily = 18] = "codeLensFontFamily", e[e.codeLensFontSize = 19] = "codeLensFontSize", e[e.colorDecorators = 20] = "colorDecorators", e[e.colorDecoratorsLimit = 21] = "colorDecoratorsLimit", e[e.columnSelection = 22] = "columnSelection", e[e.comments = 23] = "comments", e[e.contextmenu = 24] = "contextmenu", e[e.copyWithSyntaxHighlighting = 25] = "copyWithSyntaxHighlighting", e[e.cursorBlinking = 26] = "cursorBlinking", e[e.cursorSmoothCaretAnimation = 27] = "cursorSmoothCaretAnimation", e[e.cursorStyle = 28] = "cursorStyle", e[e.cursorSurroundingLines = 29] = "cursorSurroundingLines", e[e.cursorSurroundingLinesStyle = 30] = "cursorSurroundingLinesStyle", e[e.cursorWidth = 31] = "cursorWidth", e[e.disableLayerHinting = 32] = "disableLayerHinting", e[e.disableMonospaceOptimizations = 33] = "disableMonospaceOptimizations", e[e.domReadOnly = 34] = "domReadOnly", e[e.dragAndDrop = 35] = "dragAndDrop", e[e.dropIntoEditor = 36] = "dropIntoEditor", e[e.emptySelectionClipboard = 37] = "emptySelectionClipboard", e[e.experimentalWhitespaceRendering = 38] = "experimentalWhitespaceRendering", e[e.extraEditorClassName = 39] = "extraEditorClassName", e[e.fastScrollSensitivity = 40] = "fastScrollSensitivity", e[e.find = 41] = "find", e[e.fixedOverflowWidgets = 42] = "fixedOverflowWidgets", e[e.folding = 43] = "folding", e[e.foldingStrategy = 44] = "foldingStrategy", e[e.foldingHighlight = 45] = "foldingHighlight", e[e.foldingImportsByDefault = 46] = "foldingImportsByDefault", e[e.foldingMaximumRegions = 47] = "foldingMaximumRegions", e[e.unfoldOnClickAfterEndOfLine = 48] = "unfoldOnClickAfterEndOfLine", e[e.fontFamily = 49] = "fontFamily", e[e.fontInfo = 50] = "fontInfo", e[e.fontLigatures = 51] = "fontLigatures", e[e.fontSize = 52] = "fontSize", e[e.fontWeight = 53] = "fontWeight", e[e.fontVariations = 54] = "fontVariations", e[e.formatOnPaste = 55] = "formatOnPaste", e[e.formatOnType = 56] = "formatOnType", e[e.glyphMargin = 57] = "glyphMargin", e[e.gotoLocation = 58] = "gotoLocation", e[e.hideCursorInOverviewRuler = 59] = "hideCursorInOverviewRuler", e[e.hover = 60] = "hover", e[e.inDiffEditor = 61] = "inDiffEditor", e[e.inlineSuggest = 62] = "inlineSuggest", e[e.inlineEdit = 63] = "inlineEdit", e[e.letterSpacing = 64] = "letterSpacing", e[e.lightbulb = 65] = "lightbulb", e[e.lineDecorationsWidth = 66] = "lineDecorationsWidth", e[e.lineHeight = 67] = "lineHeight", e[e.lineNumbers = 68] = "lineNumbers", e[e.lineNumbersMinChars = 69] = "lineNumbersMinChars", e[e.linkedEditing = 70] = "linkedEditing", e[e.links = 71] = "links", e[e.matchBrackets = 72] = "matchBrackets", e[e.minimap = 73] = "minimap", e[e.mouseStyle = 74] = "mouseStyle", e[e.mouseWheelScrollSensitivity = 75] = "mouseWheelScrollSensitivity", e[e.mouseWheelZoom = 76] = "mouseWheelZoom", e[e.multiCursorMergeOverlapping = 77] = "multiCursorMergeOverlapping", e[e.multiCursorModifier = 78] = "multiCursorModifier", e[e.multiCursorPaste = 79] = "multiCursorPaste", e[e.multiCursorLimit = 80] = "multiCursorLimit", e[e.occurrencesHighlight = 81] = "occurrencesHighlight", e[e.overviewRulerBorder = 82] = "overviewRulerBorder", e[e.overviewRulerLanes = 83] = "overviewRulerLanes", e[e.padding = 84] = "padding", e[e.pasteAs = 85] = "pasteAs", e[e.parameterHints = 86] = "parameterHints", e[e.peekWidgetDefaultFocus = 87] = "peekWidgetDefaultFocus", e[e.definitionLinkOpensInPeek = 88] = "definitionLinkOpensInPeek", e[e.quickSuggestions = 89] = "quickSuggestions", e[e.quickSuggestionsDelay = 90] = "quickSuggestionsDelay", e[e.readOnly = 91] = "readOnly", e[e.readOnlyMessage = 92] = "readOnlyMessage", e[e.renameOnType = 93] = "renameOnType", e[e.renderControlCharacters = 94] = "renderControlCharacters", e[e.renderFinalNewline = 95] = "renderFinalNewline", e[e.renderLineHighlight = 96] = "renderLineHighlight", e[e.renderLineHighlightOnlyWhenFocus = 97] = "renderLineHighlightOnlyWhenFocus", e[e.renderValidationDecorations = 98] = "renderValidationDecorations", e[e.renderWhitespace = 99] = "renderWhitespace", e[e.revealHorizontalRightPadding = 100] = "revealHorizontalRightPadding", e[e.roundedSelection = 101] = "roundedSelection", e[e.rulers = 102] = "rulers", e[e.scrollbar = 103] = "scrollbar", e[e.scrollBeyondLastColumn = 104] = "scrollBeyondLastColumn", e[e.scrollBeyondLastLine = 105] = "scrollBeyondLastLine", e[e.scrollPredominantAxis = 106] = "scrollPredominantAxis", e[e.selectionClipboard = 107] = "selectionClipboard", e[e.selectionHighlight = 108] = "selectionHighlight", e[e.selectOnLineNumbers = 109] = "selectOnLineNumbers", e[e.showFoldingControls = 110] = "showFoldingControls", e[e.showUnused = 111] = "showUnused", e[e.snippetSuggestions = 112] = "snippetSuggestions", e[e.smartSelect = 113] = "smartSelect", e[e.smoothScrolling = 114] = "smoothScrolling", e[e.stickyScroll = 115] = "stickyScroll", e[e.stickyTabStops = 116] = "stickyTabStops", e[e.stopRenderingLineAfter = 117] = "stopRenderingLineAfter", e[e.suggest = 118] = "suggest", e[e.suggestFontSize = 119] = "suggestFontSize", e[e.suggestLineHeight = 120] = "suggestLineHeight", e[e.suggestOnTriggerCharacters = 121] = "suggestOnTriggerCharacters", e[e.suggestSelection = 122] = "suggestSelection", e[e.tabCompletion = 123] = "tabCompletion", e[e.tabIndex = 124] = "tabIndex", e[e.unicodeHighlighting = 125] = "unicodeHighlighting", e[e.unusualLineTerminators = 126] = "unusualLineTerminators", e[e.useShadowDOM = 127] = "useShadowDOM", e[e.useTabStops = 128] = "useTabStops", e[e.wordBreak = 129] = "wordBreak", e[e.wordSeparators = 130] = "wordSeparators", e[e.wordWrap = 131] = "wordWrap", e[e.wordWrapBreakAfterCharacters = 132] = "wordWrapBreakAfterCharacters", e[e.wordWrapBreakBeforeCharacters = 133] = "wordWrapBreakBeforeCharacters", e[e.wordWrapColumn = 134] = "wordWrapColumn", e[e.wordWrapOverride1 = 135] = "wordWrapOverride1", e[e.wordWrapOverride2 = 136] = "wordWrapOverride2", e[e.wrappingIndent = 137] = "wrappingIndent", e[e.wrappingStrategy = 138] = "wrappingStrategy", e[e.showDeprecated = 139] = "showDeprecated", e[e.inlayHints = 140] = "inlayHints", e[e.editorClassName = 141] = "editorClassName", e[e.pixelRatio = 142] = "pixelRatio", e[e.tabFocusMode = 143] = "tabFocusMode", e[e.layoutInfo = 144] = "layoutInfo", e[e.wrappingInfo = 145] = "wrappingInfo", e[e.defaultColorDecorators = 146] = "defaultColorDecorators", e[e.colorDecoratorsActivatedOn = 147] = "colorDecoratorsActivatedOn", e[e.inlineCompletionsAccessibilityVerbose = 148] = "inlineCompletionsAccessibilityVerbose";
})(es || (es = {}));
var ts;
(function(e) {
  e[e.TextDefined = 0] = "TextDefined", e[e.LF = 1] = "LF", e[e.CRLF = 2] = "CRLF";
})(ts || (ts = {}));
var ns;
(function(e) {
  e[e.LF = 0] = "LF", e[e.CRLF = 1] = "CRLF";
})(ns || (ns = {}));
var ss;
(function(e) {
  e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 3] = "Right";
})(ss || (ss = {}));
var rs;
(function(e) {
  e[e.None = 0] = "None", e[e.Indent = 1] = "Indent", e[e.IndentOutdent = 2] = "IndentOutdent", e[e.Outdent = 3] = "Outdent";
})(rs || (rs = {}));
var is;
(function(e) {
  e[e.Both = 0] = "Both", e[e.Right = 1] = "Right", e[e.Left = 2] = "Left", e[e.None = 3] = "None";
})(is || (is = {}));
var as;
(function(e) {
  e[e.Type = 1] = "Type", e[e.Parameter = 2] = "Parameter";
})(as || (as = {}));
var ls;
(function(e) {
  e[e.Automatic = 0] = "Automatic", e[e.Explicit = 1] = "Explicit";
})(ls || (ls = {}));
var os;
(function(e) {
  e[e.Invoke = 0] = "Invoke", e[e.Automatic = 1] = "Automatic";
})(os || (os = {}));
var Jt;
(function(e) {
  e[e.DependsOnKbLayout = -1] = "DependsOnKbLayout", e[e.Unknown = 0] = "Unknown", e[e.Backspace = 1] = "Backspace", e[e.Tab = 2] = "Tab", e[e.Enter = 3] = "Enter", e[e.Shift = 4] = "Shift", e[e.Ctrl = 5] = "Ctrl", e[e.Alt = 6] = "Alt", e[e.PauseBreak = 7] = "PauseBreak", e[e.CapsLock = 8] = "CapsLock", e[e.Escape = 9] = "Escape", e[e.Space = 10] = "Space", e[e.PageUp = 11] = "PageUp", e[e.PageDown = 12] = "PageDown", e[e.End = 13] = "End", e[e.Home = 14] = "Home", e[e.LeftArrow = 15] = "LeftArrow", e[e.UpArrow = 16] = "UpArrow", e[e.RightArrow = 17] = "RightArrow", e[e.DownArrow = 18] = "DownArrow", e[e.Insert = 19] = "Insert", e[e.Delete = 20] = "Delete", e[e.Digit0 = 21] = "Digit0", e[e.Digit1 = 22] = "Digit1", e[e.Digit2 = 23] = "Digit2", e[e.Digit3 = 24] = "Digit3", e[e.Digit4 = 25] = "Digit4", e[e.Digit5 = 26] = "Digit5", e[e.Digit6 = 27] = "Digit6", e[e.Digit7 = 28] = "Digit7", e[e.Digit8 = 29] = "Digit8", e[e.Digit9 = 30] = "Digit9", e[e.KeyA = 31] = "KeyA", e[e.KeyB = 32] = "KeyB", e[e.KeyC = 33] = "KeyC", e[e.KeyD = 34] = "KeyD", e[e.KeyE = 35] = "KeyE", e[e.KeyF = 36] = "KeyF", e[e.KeyG = 37] = "KeyG", e[e.KeyH = 38] = "KeyH", e[e.KeyI = 39] = "KeyI", e[e.KeyJ = 40] = "KeyJ", e[e.KeyK = 41] = "KeyK", e[e.KeyL = 42] = "KeyL", e[e.KeyM = 43] = "KeyM", e[e.KeyN = 44] = "KeyN", e[e.KeyO = 45] = "KeyO", e[e.KeyP = 46] = "KeyP", e[e.KeyQ = 47] = "KeyQ", e[e.KeyR = 48] = "KeyR", e[e.KeyS = 49] = "KeyS", e[e.KeyT = 50] = "KeyT", e[e.KeyU = 51] = "KeyU", e[e.KeyV = 52] = "KeyV", e[e.KeyW = 53] = "KeyW", e[e.KeyX = 54] = "KeyX", e[e.KeyY = 55] = "KeyY", e[e.KeyZ = 56] = "KeyZ", e[e.Meta = 57] = "Meta", e[e.ContextMenu = 58] = "ContextMenu", e[e.F1 = 59] = "F1", e[e.F2 = 60] = "F2", e[e.F3 = 61] = "F3", e[e.F4 = 62] = "F4", e[e.F5 = 63] = "F5", e[e.F6 = 64] = "F6", e[e.F7 = 65] = "F7", e[e.F8 = 66] = "F8", e[e.F9 = 67] = "F9", e[e.F10 = 68] = "F10", e[e.F11 = 69] = "F11", e[e.F12 = 70] = "F12", e[e.F13 = 71] = "F13", e[e.F14 = 72] = "F14", e[e.F15 = 73] = "F15", e[e.F16 = 74] = "F16", e[e.F17 = 75] = "F17", e[e.F18 = 76] = "F18", e[e.F19 = 77] = "F19", e[e.F20 = 78] = "F20", e[e.F21 = 79] = "F21", e[e.F22 = 80] = "F22", e[e.F23 = 81] = "F23", e[e.F24 = 82] = "F24", e[e.NumLock = 83] = "NumLock", e[e.ScrollLock = 84] = "ScrollLock", e[e.Semicolon = 85] = "Semicolon", e[e.Equal = 86] = "Equal", e[e.Comma = 87] = "Comma", e[e.Minus = 88] = "Minus", e[e.Period = 89] = "Period", e[e.Slash = 90] = "Slash", e[e.Backquote = 91] = "Backquote", e[e.BracketLeft = 92] = "BracketLeft", e[e.Backslash = 93] = "Backslash", e[e.BracketRight = 94] = "BracketRight", e[e.Quote = 95] = "Quote", e[e.OEM_8 = 96] = "OEM_8", e[e.IntlBackslash = 97] = "IntlBackslash", e[e.Numpad0 = 98] = "Numpad0", e[e.Numpad1 = 99] = "Numpad1", e[e.Numpad2 = 100] = "Numpad2", e[e.Numpad3 = 101] = "Numpad3", e[e.Numpad4 = 102] = "Numpad4", e[e.Numpad5 = 103] = "Numpad5", e[e.Numpad6 = 104] = "Numpad6", e[e.Numpad7 = 105] = "Numpad7", e[e.Numpad8 = 106] = "Numpad8", e[e.Numpad9 = 107] = "Numpad9", e[e.NumpadMultiply = 108] = "NumpadMultiply", e[e.NumpadAdd = 109] = "NumpadAdd", e[e.NUMPAD_SEPARATOR = 110] = "NUMPAD_SEPARATOR", e[e.NumpadSubtract = 111] = "NumpadSubtract", e[e.NumpadDecimal = 112] = "NumpadDecimal", e[e.NumpadDivide = 113] = "NumpadDivide", e[e.KEY_IN_COMPOSITION = 114] = "KEY_IN_COMPOSITION", e[e.ABNT_C1 = 115] = "ABNT_C1", e[e.ABNT_C2 = 116] = "ABNT_C2", e[e.AudioVolumeMute = 117] = "AudioVolumeMute", e[e.AudioVolumeUp = 118] = "AudioVolumeUp", e[e.AudioVolumeDown = 119] = "AudioVolumeDown", e[e.BrowserSearch = 120] = "BrowserSearch", e[e.BrowserHome = 121] = "BrowserHome", e[e.BrowserBack = 122] = "BrowserBack", e[e.BrowserForward = 123] = "BrowserForward", e[e.MediaTrackNext = 124] = "MediaTrackNext", e[e.MediaTrackPrevious = 125] = "MediaTrackPrevious", e[e.MediaStop = 126] = "MediaStop", e[e.MediaPlayPause = 127] = "MediaPlayPause", e[e.LaunchMediaPlayer = 128] = "LaunchMediaPlayer", e[e.LaunchMail = 129] = "LaunchMail", e[e.LaunchApp2 = 130] = "LaunchApp2", e[e.Clear = 131] = "Clear", e[e.MAX_VALUE = 132] = "MAX_VALUE";
})(Jt || (Jt = {}));
var Yt;
(function(e) {
  e[e.Hint = 1] = "Hint", e[e.Info = 2] = "Info", e[e.Warning = 4] = "Warning", e[e.Error = 8] = "Error";
})(Yt || (Yt = {}));
var Zt;
(function(e) {
  e[e.Unnecessary = 1] = "Unnecessary", e[e.Deprecated = 2] = "Deprecated";
})(Zt || (Zt = {}));
var us;
(function(e) {
  e[e.Inline = 1] = "Inline", e[e.Gutter = 2] = "Gutter";
})(us || (us = {}));
var cs;
(function(e) {
  e[e.UNKNOWN = 0] = "UNKNOWN", e[e.TEXTAREA = 1] = "TEXTAREA", e[e.GUTTER_GLYPH_MARGIN = 2] = "GUTTER_GLYPH_MARGIN", e[e.GUTTER_LINE_NUMBERS = 3] = "GUTTER_LINE_NUMBERS", e[e.GUTTER_LINE_DECORATIONS = 4] = "GUTTER_LINE_DECORATIONS", e[e.GUTTER_VIEW_ZONE = 5] = "GUTTER_VIEW_ZONE", e[e.CONTENT_TEXT = 6] = "CONTENT_TEXT", e[e.CONTENT_EMPTY = 7] = "CONTENT_EMPTY", e[e.CONTENT_VIEW_ZONE = 8] = "CONTENT_VIEW_ZONE", e[e.CONTENT_WIDGET = 9] = "CONTENT_WIDGET", e[e.OVERVIEW_RULER = 10] = "OVERVIEW_RULER", e[e.SCROLLBAR = 11] = "SCROLLBAR", e[e.OVERLAY_WIDGET = 12] = "OVERLAY_WIDGET", e[e.OUTSIDE_EDITOR = 13] = "OUTSIDE_EDITOR";
})(cs || (cs = {}));
var hs;
(function(e) {
  e[e.AIGenerated = 1] = "AIGenerated";
})(hs || (hs = {}));
var fs;
(function(e) {
  e[e.TOP_RIGHT_CORNER = 0] = "TOP_RIGHT_CORNER", e[e.BOTTOM_RIGHT_CORNER = 1] = "BOTTOM_RIGHT_CORNER", e[e.TOP_CENTER = 2] = "TOP_CENTER";
})(fs || (fs = {}));
var ms;
(function(e) {
  e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 4] = "Right", e[e.Full = 7] = "Full";
})(ms || (ms = {}));
var ds;
(function(e) {
  e[e.Left = 0] = "Left", e[e.Right = 1] = "Right", e[e.None = 2] = "None", e[e.LeftOfInjectedText = 3] = "LeftOfInjectedText", e[e.RightOfInjectedText = 4] = "RightOfInjectedText";
})(ds || (ds = {}));
var gs;
(function(e) {
  e[e.Off = 0] = "Off", e[e.On = 1] = "On", e[e.Relative = 2] = "Relative", e[e.Interval = 3] = "Interval", e[e.Custom = 4] = "Custom";
})(gs || (gs = {}));
var bs;
(function(e) {
  e[e.None = 0] = "None", e[e.Text = 1] = "Text", e[e.Blocks = 2] = "Blocks";
})(bs || (bs = {}));
var xs;
(function(e) {
  e[e.Smooth = 0] = "Smooth", e[e.Immediate = 1] = "Immediate";
})(xs || (xs = {}));
var ps;
(function(e) {
  e[e.Auto = 1] = "Auto", e[e.Hidden = 2] = "Hidden", e[e.Visible = 3] = "Visible";
})(ps || (ps = {}));
var Kt;
(function(e) {
  e[e.LTR = 0] = "LTR", e[e.RTL = 1] = "RTL";
})(Kt || (Kt = {}));
var _s;
(function(e) {
  e.Off = "off", e.OnCode = "onCode", e.On = "on";
})(_s || (_s = {}));
var Ls;
(function(e) {
  e[e.Invoke = 1] = "Invoke", e[e.TriggerCharacter = 2] = "TriggerCharacter", e[e.ContentChange = 3] = "ContentChange";
})(Ls || (Ls = {}));
var ws;
(function(e) {
  e[e.File = 0] = "File", e[e.Module = 1] = "Module", e[e.Namespace = 2] = "Namespace", e[e.Package = 3] = "Package", e[e.Class = 4] = "Class", e[e.Method = 5] = "Method", e[e.Property = 6] = "Property", e[e.Field = 7] = "Field", e[e.Constructor = 8] = "Constructor", e[e.Enum = 9] = "Enum", e[e.Interface = 10] = "Interface", e[e.Function = 11] = "Function", e[e.Variable = 12] = "Variable", e[e.Constant = 13] = "Constant", e[e.String = 14] = "String", e[e.Number = 15] = "Number", e[e.Boolean = 16] = "Boolean", e[e.Array = 17] = "Array", e[e.Object = 18] = "Object", e[e.Key = 19] = "Key", e[e.Null = 20] = "Null", e[e.EnumMember = 21] = "EnumMember", e[e.Struct = 22] = "Struct", e[e.Event = 23] = "Event", e[e.Operator = 24] = "Operator", e[e.TypeParameter = 25] = "TypeParameter";
})(ws || (ws = {}));
var vs;
(function(e) {
  e[e.Deprecated = 1] = "Deprecated";
})(vs || (vs = {}));
var Ns;
(function(e) {
  e[e.Hidden = 0] = "Hidden", e[e.Blink = 1] = "Blink", e[e.Smooth = 2] = "Smooth", e[e.Phase = 3] = "Phase", e[e.Expand = 4] = "Expand", e[e.Solid = 5] = "Solid";
})(Ns || (Ns = {}));
var Ss;
(function(e) {
  e[e.Line = 1] = "Line", e[e.Block = 2] = "Block", e[e.Underline = 3] = "Underline", e[e.LineThin = 4] = "LineThin", e[e.BlockOutline = 5] = "BlockOutline", e[e.UnderlineThin = 6] = "UnderlineThin";
})(Ss || (Ss = {}));
var Cs;
(function(e) {
  e[e.AlwaysGrowsWhenTypingAtEdges = 0] = "AlwaysGrowsWhenTypingAtEdges", e[e.NeverGrowsWhenTypingAtEdges = 1] = "NeverGrowsWhenTypingAtEdges", e[e.GrowsOnlyWhenTypingBefore = 2] = "GrowsOnlyWhenTypingBefore", e[e.GrowsOnlyWhenTypingAfter = 3] = "GrowsOnlyWhenTypingAfter";
})(Cs || (Cs = {}));
var As;
(function(e) {
  e[e.None = 0] = "None", e[e.Same = 1] = "Same", e[e.Indent = 2] = "Indent", e[e.DeepIndent = 3] = "DeepIndent";
})(As || (As = {}));
const Ue = class Ue {
  static chord(t, n) {
    return Xi(t, n);
  }
};
Ue.CtrlCmd = 2048, Ue.Shift = 1024, Ue.Alt = 512, Ue.WinCtrl = 256;
let en = Ue;
function Zi() {
  return {
    editor: void 0,
    languages: void 0,
    CancellationTokenSource: Jr,
    Emitter: ae,
    KeyCode: Jt,
    KeyMod: en,
    Position: J,
    Range: D,
    Selection: te,
    SelectionDirection: Kt,
    MarkerSeverity: Yt,
    MarkerTag: Zt,
    Uri: Re,
    Token: Yi
  };
}
var Rs;
(function(e) {
  e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 4] = "Right", e[e.Full = 7] = "Full";
})(Rs || (Rs = {}));
var ys;
(function(e) {
  e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 3] = "Right";
})(ys || (ys = {}));
var Es;
(function(e) {
  e[e.Inline = 1] = "Inline", e[e.Gutter = 2] = "Gutter";
})(Es || (Es = {}));
var Ms;
(function(e) {
  e[e.Both = 0] = "Both", e[e.Right = 1] = "Right", e[e.Left = 2] = "Left", e[e.None = 3] = "None";
})(Ms || (Ms = {}));
function Ki(e, t, n, s, r) {
  if (s === 0)
    return !0;
  const i = t.charCodeAt(s - 1);
  if (e.get(i) !== 0 || i === 13 || i === 10)
    return !0;
  if (r > 0) {
    const l = t.charCodeAt(s);
    if (e.get(l) !== 0)
      return !0;
  }
  return !1;
}
function e1(e, t, n, s, r) {
  if (s + r === n)
    return !0;
  const i = t.charCodeAt(s + r);
  if (e.get(i) !== 0 || i === 13 || i === 10)
    return !0;
  if (r > 0) {
    const l = t.charCodeAt(s + r - 1);
    if (e.get(l) !== 0)
      return !0;
  }
  return !1;
}
function t1(e, t, n, s, r) {
  return Ki(e, t, n, s, r) && e1(e, t, n, s, r);
}
class n1 {
  constructor(t, n) {
    this._wordSeparators = t, this._searchRegex = n, this._prevMatchStartIndex = -1, this._prevMatchLength = 0;
  }
  reset(t) {
    this._searchRegex.lastIndex = t, this._prevMatchStartIndex = -1, this._prevMatchLength = 0;
  }
  next(t) {
    const n = t.length;
    let s;
    do {
      if (this._prevMatchStartIndex + this._prevMatchLength === n || (s = this._searchRegex.exec(t), !s))
        return null;
      const r = s.index, i = s[0].length;
      if (r === this._prevMatchStartIndex && i === this._prevMatchLength) {
        if (i === 0) {
          ri(t, n, this._searchRegex.lastIndex) > 65535 ? this._searchRegex.lastIndex += 2 : this._searchRegex.lastIndex += 1;
          continue;
        }
        return null;
      }
      if (this._prevMatchStartIndex = r, this._prevMatchLength = i, !this._wordSeparators || t1(this._wordSeparators, t, n, r, i))
        return s;
    } while (s);
    return null;
  }
}
function s1(e, t = "Unreachable") {
  throw new Error(t);
}
function wt(e) {
  if (!e()) {
    debugger;
    e(), Xs(new me("Assertion Failed"));
  }
}
function or(e, t) {
  let n = 0;
  for (; n < e.length - 1; ) {
    const s = e[n], r = e[n + 1];
    if (!t(s, r))
      return !1;
    n++;
  }
  return !0;
}
class r1 {
  static computeUnicodeHighlights(t, n, s) {
    const r = s ? s.startLineNumber : 1, i = s ? s.endLineNumber : t.getLineCount(), l = new ks(n), o = l.getCandidateCodePoints();
    let u;
    o === "allNonBasicAscii" ? u = new RegExp("[^\\t\\n\\r\\x20-\\x7E]", "g") : u = new RegExp(`${i1(Array.from(o))}`, "g");
    const c = new n1(null, u), h = [];
    let f = !1, m, d = 0, g = 0, p = 0;
    e:
      for (let L = r, v = i; L <= v; L++) {
        const N = t.getLineContent(L), b = N.length;
        c.reset(0);
        do
          if (m = c.next(N), m) {
            let w = m.index, _ = m.index + m[0].length;
            if (w > 0) {
              const I = N.charCodeAt(w - 1);
              zt(I) && w--;
            }
            if (_ + 1 < b) {
              const I = N.charCodeAt(_ - 1);
              zt(I) && _++;
            }
            const R = N.substring(w, _);
            let y = on(w + 1, ir, N, 0);
            y && y.endColumn <= w + 1 && (y = null);
            const E = l.shouldHighlightNonBasicASCII(R, y ? y.word : null);
            if (E !== 0) {
              if (E === 3 ? d++ : E === 2 ? g++ : E === 1 ? p++ : s1(), h.length >= 1e3) {
                f = !0;
                break e;
              }
              h.push(new D(L, w + 1, L, _ + 1));
            }
          }
        while (m);
      }
    return {
      ranges: h,
      hasMore: f,
      ambiguousCharacterCount: d,
      invisibleCharacterCount: g,
      nonBasicAsciiCharacterCount: p
    };
  }
  static computeUnicodeHighlightReason(t, n) {
    const s = new ks(n);
    switch (s.shouldHighlightNonBasicASCII(t, null)) {
      case 0:
        return null;
      case 2:
        return { kind: 1 };
      case 3: {
        const i = t.codePointAt(0), l = s.ambiguousCharacters.getPrimaryConfusable(i), o = tt.getLocales().filter((u) => !tt.getInstance(/* @__PURE__ */ new Set([...n.allowedLocales, u])).isAmbiguous(i));
        return { kind: 0, confusableWith: String.fromCodePoint(l), notAmbiguousInLocales: o };
      }
      case 1:
        return { kind: 2 };
    }
  }
}
function i1(e, t) {
  return `[${Zr(e.map((s) => String.fromCodePoint(s)).join(""))}]`;
}
class ks {
  constructor(t) {
    this.options = t, this.allowedCodePoints = new Set(t.allowedCodePoints), this.ambiguousCharacters = tt.getInstance(new Set(t.allowedLocales));
  }
  getCandidateCodePoints() {
    if (this.options.nonBasicASCII)
      return "allNonBasicAscii";
    const t = /* @__PURE__ */ new Set();
    if (this.options.invisibleCharacters)
      for (const n of Qe.codePoints)
        Ds(String.fromCodePoint(n)) || t.add(n);
    if (this.options.ambiguousCharacters)
      for (const n of this.ambiguousCharacters.getConfusableCodePoints())
        t.add(n);
    for (const n of this.allowedCodePoints)
      t.delete(n);
    return t;
  }
  shouldHighlightNonBasicASCII(t, n) {
    const s = t.codePointAt(0);
    if (this.allowedCodePoints.has(s))
      return 0;
    if (this.options.nonBasicASCII)
      return 1;
    let r = !1, i = !1;
    if (n)
      for (const l of n) {
        const o = l.codePointAt(0), u = ai(l);
        r = r || u, !u && !this.ambiguousCharacters.isAmbiguous(o) && !Qe.isInvisibleCharacter(o) && (i = !0);
      }
    return !r && i ? 0 : this.options.invisibleCharacters && !Ds(t) && Qe.isInvisibleCharacter(s) ? 2 : this.options.ambiguousCharacters && this.ambiguousCharacters.isAmbiguous(s) ? 3 : 0;
  }
}
function Ds(e) {
  return e === " " || e === `
` || e === "	";
}
class mt {
  constructor(t, n, s) {
    this.changes = t, this.moves = n, this.hitTimeout = s;
  }
}
class hn {
  constructor(t, n) {
    this.lineRangeMapping = t, this.changes = n;
  }
  flip() {
    return new hn(this.lineRangeMapping.flip(), this.changes.map((t) => t.flip()));
  }
}
class V {
  static addRange(t, n) {
    let s = 0;
    for (; s < n.length && n[s].endExclusive < t.start; )
      s++;
    let r = s;
    for (; r < n.length && n[r].start <= t.endExclusive; )
      r++;
    if (s === r)
      n.splice(s, 0, t);
    else {
      const i = Math.min(t.start, n[s].start), l = Math.max(t.endExclusive, n[r - 1].endExclusive);
      n.splice(s, r - s, new V(i, l));
    }
  }
  static tryCreate(t, n) {
    if (!(t > n))
      return new V(t, n);
  }
  static ofLength(t) {
    return new V(0, t);
  }
  static ofStartAndLength(t, n) {
    return new V(t, t + n);
  }
  constructor(t, n) {
    if (this.start = t, this.endExclusive = n, t > n)
      throw new me(`Invalid range: ${this.toString()}`);
  }
  get isEmpty() {
    return this.start === this.endExclusive;
  }
  delta(t) {
    return new V(this.start + t, this.endExclusive + t);
  }
  deltaStart(t) {
    return new V(this.start + t, this.endExclusive);
  }
  deltaEnd(t) {
    return new V(this.start, this.endExclusive + t);
  }
  get length() {
    return this.endExclusive - this.start;
  }
  toString() {
    return `[${this.start}, ${this.endExclusive})`;
  }
  equals(t) {
    return this.start === t.start && this.endExclusive === t.endExclusive;
  }
  containsRange(t) {
    return this.start <= t.start && t.endExclusive <= this.endExclusive;
  }
  contains(t) {
    return this.start <= t && t < this.endExclusive;
  }
  join(t) {
    return new V(
      Math.min(this.start, t.start),
      Math.max(this.endExclusive, t.endExclusive)
    );
  }
  intersect(t) {
    const n = Math.max(this.start, t.start), s = Math.min(this.endExclusive, t.endExclusive);
    if (n <= s)
      return new V(n, s);
  }
  intersects(t) {
    const n = Math.max(this.start, t.start), s = Math.min(this.endExclusive, t.endExclusive);
    return n < s;
  }
  intersectsOrTouches(t) {
    const n = Math.max(this.start, t.start), s = Math.min(this.endExclusive, t.endExclusive);
    return n <= s;
  }
  isBefore(t) {
    return this.endExclusive <= t.start;
  }
  isAfter(t) {
    return this.start >= t.endExclusive;
  }
  slice(t) {
    return t.slice(this.start, this.endExclusive);
  }
  substring(t) {
    return t.substring(this.start, this.endExclusive);
  }
  clip(t) {
    if (this.isEmpty)
      throw new me(`Invalid clipping range: ${this.toString()}`);
    return Math.max(this.start, Math.min(this.endExclusive - 1, t));
  }
  clipCyclic(t) {
    if (this.isEmpty)
      throw new me(`Invalid clipping range: ${this.toString()}`);
    return t < this.start ? this.endExclusive - (this.start - t) % this.length : t >= this.endExclusive ? this.start + (t - this.start) % this.length : t;
  }
  map(t) {
    const n = [];
    for (let s = this.start; s < this.endExclusive; s++)
      n.push(t(s));
    return n;
  }
  forEach(t) {
    for (let n = this.start; n < this.endExclusive; n++)
      t(n);
  }
}
class T {
  static fromRange(t) {
    return new T(t.startLineNumber, t.endLineNumber);
  }
  static fromRangeInclusive(t) {
    return new T(t.startLineNumber, t.endLineNumber + 1);
  }
  static subtract(t, n) {
    return n ? t.startLineNumber < n.startLineNumber && n.endLineNumberExclusive < t.endLineNumberExclusive ? [
      new T(t.startLineNumber, n.startLineNumber),
      new T(n.endLineNumberExclusive, t.endLineNumberExclusive)
    ] : n.startLineNumber <= t.startLineNumber && t.endLineNumberExclusive <= n.endLineNumberExclusive ? [] : n.endLineNumberExclusive < t.endLineNumberExclusive ? [new T(
      Math.max(n.endLineNumberExclusive, t.startLineNumber),
      t.endLineNumberExclusive
    )] : [new T(t.startLineNumber, Math.min(n.startLineNumber, t.endLineNumberExclusive))] : [t];
  }
  static joinMany(t) {
    if (t.length === 0)
      return [];
    let n = new ce(t[0].slice());
    for (let s = 1; s < t.length; s++)
      n = n.getUnion(new ce(t[s].slice()));
    return n.ranges;
  }
  static ofLength(t, n) {
    return new T(t, t + n);
  }
  static deserialize(t) {
    return new T(t[0], t[1]);
  }
  constructor(t, n) {
    if (t > n)
      throw new me(`startLineNumber ${t} cannot be after endLineNumberExclusive ${n}`);
    this.startLineNumber = t, this.endLineNumberExclusive = n;
  }
  contains(t) {
    return this.startLineNumber <= t && t < this.endLineNumberExclusive;
  }
  get isEmpty() {
    return this.startLineNumber === this.endLineNumberExclusive;
  }
  delta(t) {
    return new T(this.startLineNumber + t, this.endLineNumberExclusive + t);
  }
  deltaLength(t) {
    return new T(this.startLineNumber, this.endLineNumberExclusive + t);
  }
  get length() {
    return this.endLineNumberExclusive - this.startLineNumber;
  }
  join(t) {
    return new T(
      Math.min(this.startLineNumber, t.startLineNumber),
      Math.max(this.endLineNumberExclusive, t.endLineNumberExclusive)
    );
  }
  toString() {
    return `[${this.startLineNumber},${this.endLineNumberExclusive})`;
  }
  intersect(t) {
    const n = Math.max(this.startLineNumber, t.startLineNumber), s = Math.min(this.endLineNumberExclusive, t.endLineNumberExclusive);
    if (n <= s)
      return new T(n, s);
  }
  intersectsStrict(t) {
    return this.startLineNumber < t.endLineNumberExclusive && t.startLineNumber < this.endLineNumberExclusive;
  }
  overlapOrTouch(t) {
    return this.startLineNumber <= t.endLineNumberExclusive && t.startLineNumber <= this.endLineNumberExclusive;
  }
  equals(t) {
    return this.startLineNumber === t.startLineNumber && this.endLineNumberExclusive === t.endLineNumberExclusive;
  }
  toInclusiveRange() {
    return this.isEmpty ? null : new D(
      this.startLineNumber,
      1,
      this.endLineNumberExclusive - 1,
      Number.MAX_SAFE_INTEGER
    );
  }
  toExclusiveRange() {
    return new D(this.startLineNumber, 1, this.endLineNumberExclusive, 1);
  }
  mapToLineArray(t) {
    const n = [];
    for (let s = this.startLineNumber; s < this.endLineNumberExclusive; s++)
      n.push(t(s));
    return n;
  }
  forEach(t) {
    for (let n = this.startLineNumber; n < this.endLineNumberExclusive; n++)
      t(n);
  }
  serialize() {
    return [this.startLineNumber, this.endLineNumberExclusive];
  }
  includes(t) {
    return this.startLineNumber <= t && t < this.endLineNumberExclusive;
  }
  toOffsetRange() {
    return new V(this.startLineNumber - 1, this.endLineNumberExclusive - 1);
  }
}
class ce {
  constructor(t = []) {
    this._normalizedRanges = t;
  }
  get ranges() {
    return this._normalizedRanges;
  }
  addRange(t) {
    if (t.length === 0)
      return;
    const n = Vt(this._normalizedRanges, (r) => r.endLineNumberExclusive >= t.startLineNumber), s = Ze(this._normalizedRanges, (r) => r.startLineNumber <= t.endLineNumberExclusive) + 1;
    if (n === s)
      this._normalizedRanges.splice(n, 0, t);
    else if (n === s - 1) {
      const r = this._normalizedRanges[n];
      this._normalizedRanges[n] = r.join(t);
    } else {
      const r = this._normalizedRanges[n].join(this._normalizedRanges[s - 1]).join(t);
      this._normalizedRanges.splice(n, s - n, r);
    }
  }
  contains(t) {
    const n = ze(this._normalizedRanges, (s) => s.startLineNumber <= t);
    return !!n && n.endLineNumberExclusive > t;
  }
  intersects(t) {
    const n = ze(this._normalizedRanges, (s) => s.startLineNumber < t.endLineNumberExclusive);
    return !!n && n.endLineNumberExclusive > t.startLineNumber;
  }
  getUnion(t) {
    if (this._normalizedRanges.length === 0)
      return t;
    if (t._normalizedRanges.length === 0)
      return this;
    const n = [];
    let s = 0, r = 0, i = null;
    for (; s < this._normalizedRanges.length || r < t._normalizedRanges.length; ) {
      let l = null;
      if (s < this._normalizedRanges.length && r < t._normalizedRanges.length) {
        const o = this._normalizedRanges[s], u = t._normalizedRanges[r];
        o.startLineNumber < u.startLineNumber ? (l = o, s++) : (l = u, r++);
      } else
        s < this._normalizedRanges.length ? (l = this._normalizedRanges[s], s++) : (l = t._normalizedRanges[r], r++);
      i === null ? i = l : i.endLineNumberExclusive >= l.startLineNumber ? i = new T(
        i.startLineNumber,
        Math.max(i.endLineNumberExclusive, l.endLineNumberExclusive)
      ) : (n.push(i), i = l);
    }
    return i !== null && n.push(i), new ce(n);
  }
  subtractFrom(t) {
    const n = Vt(this._normalizedRanges, (l) => l.endLineNumberExclusive >= t.startLineNumber), s = Ze(this._normalizedRanges, (l) => l.startLineNumber <= t.endLineNumberExclusive) + 1;
    if (n === s)
      return new ce([t]);
    const r = [];
    let i = t.startLineNumber;
    for (let l = n; l < s; l++) {
      const o = this._normalizedRanges[l];
      o.startLineNumber > i && r.push(new T(i, o.startLineNumber)), i = o.endLineNumberExclusive;
    }
    return i < t.endLineNumberExclusive && r.push(new T(i, t.endLineNumberExclusive)), new ce(r);
  }
  toString() {
    return this._normalizedRanges.map((t) => t.toString()).join(", ");
  }
  getIntersection(t) {
    const n = [];
    let s = 0, r = 0;
    for (; s < this._normalizedRanges.length && r < t._normalizedRanges.length; ) {
      const i = this._normalizedRanges[s], l = t._normalizedRanges[r], o = i.intersect(l);
      o && !o.isEmpty && n.push(o), i.endLineNumberExclusive < l.endLineNumberExclusive ? s++ : r++;
    }
    return new ce(n);
  }
  getWithDelta(t) {
    return new ce(this._normalizedRanges.map((n) => n.delta(t)));
  }
}
class oe {
  static inverse(t, n, s) {
    const r = [];
    let i = 1, l = 1;
    for (const u of t) {
      const c = new oe(new T(i, u.original.startLineNumber), new T(l, u.modified.startLineNumber));
      c.modified.isEmpty || r.push(c), i = u.original.endLineNumberExclusive, l = u.modified.endLineNumberExclusive;
    }
    const o = new oe(new T(i, n + 1), new T(l, s + 1));
    return o.modified.isEmpty || r.push(o), r;
  }
  static clip(t, n, s) {
    const r = [];
    for (const i of t) {
      const l = i.original.intersect(n), o = i.modified.intersect(s);
      l && !l.isEmpty && o && !o.isEmpty && r.push(new oe(l, o));
    }
    return r;
  }
  constructor(t, n) {
    this.original = t, this.modified = n;
  }
  toString() {
    return `{${this.original.toString()}->${this.modified.toString()}}`;
  }
  flip() {
    return new oe(this.modified, this.original);
  }
  join(t) {
    return new oe(this.original.join(t.original), this.modified.join(t.modified));
  }
  get changedLineCount() {
    return Math.max(this.original.length, this.modified.length);
  }
}
class ye extends oe {
  constructor(t, n, s) {
    super(t, n), this.innerChanges = s;
  }
  flip() {
    var t;
    return new ye(this.modified, this.original, (t = this.innerChanges) == null ? void 0 : t.map((n) => n.flip()));
  }
}
class nt {
  constructor(t, n) {
    this.originalRange = t, this.modifiedRange = n;
  }
  toString() {
    return `{${this.originalRange.toString()}->${this.modifiedRange.toString()}}`;
  }
  flip() {
    return new nt(this.modifiedRange, this.originalRange);
  }
}
const a1 = 3;
class l1 {
  computeDiff(t, n, s) {
    var u;
    const i = new cr(t, n, {
      maxComputationTime: s.maxComputationTimeMs,
      shouldIgnoreTrimWhitespace: s.ignoreTrimWhitespace,
      shouldComputeCharChanges: !0,
      shouldMakePrettyDiff: !0,
      shouldPostProcessCharChanges: !0
    }).computeDiff(), l = [];
    let o = null;
    for (const c of i.changes) {
      let h;
      c.originalEndLineNumber === 0 ? h = new T(c.originalStartLineNumber + 1, c.originalStartLineNumber + 1) : h = new T(c.originalStartLineNumber, c.originalEndLineNumber + 1);
      let f;
      c.modifiedEndLineNumber === 0 ? f = new T(c.modifiedStartLineNumber + 1, c.modifiedStartLineNumber + 1) : f = new T(c.modifiedStartLineNumber, c.modifiedEndLineNumber + 1);
      let m = new ye(h, f, (u = c.charChanges) == null ? void 0 : u.map((d) => new nt(new D(
        d.originalStartLineNumber,
        d.originalStartColumn,
        d.originalEndLineNumber,
        d.originalEndColumn
      ), new D(
        d.modifiedStartLineNumber,
        d.modifiedStartColumn,
        d.modifiedEndLineNumber,
        d.modifiedEndColumn
      ))));
      o && (o.modified.endLineNumberExclusive === m.modified.startLineNumber || o.original.endLineNumberExclusive === m.original.startLineNumber) && (m = new ye(
        o.original.join(m.original),
        o.modified.join(m.modified),
        o.innerChanges && m.innerChanges ? o.innerChanges.concat(m.innerChanges) : void 0
      ), l.pop()), l.push(m), o = m;
    }
    return wt(() => or(l, (c, h) => h.original.startLineNumber - c.original.endLineNumberExclusive === h.modified.startLineNumber - c.modified.endLineNumberExclusive && c.original.endLineNumberExclusive < h.original.startLineNumber && c.modified.endLineNumberExclusive < h.modified.startLineNumber)), new mt(l, [], i.quitEarly);
  }
}
function ur(e, t, n, s) {
  return new Le(e, t, n).ComputeDiff(s);
}
let Ps = class {
  constructor(t) {
    const n = [], s = [];
    for (let r = 0, i = t.length; r < i; r++)
      n[r] = tn(t[r], 1), s[r] = nn(t[r], 1);
    this.lines = t, this._startColumns = n, this._endColumns = s;
  }
  getElements() {
    const t = [];
    for (let n = 0, s = this.lines.length; n < s; n++)
      t[n] = this.lines[n].substring(this._startColumns[n] - 1, this._endColumns[n] - 1);
    return t;
  }
  getStrictElement(t) {
    return this.lines[t];
  }
  getStartLineNumber(t) {
    return t + 1;
  }
  getEndLineNumber(t) {
    return t + 1;
  }
  createCharSequence(t, n, s) {
    const r = [], i = [], l = [];
    let o = 0;
    for (let u = n; u <= s; u++) {
      const c = this.lines[u], h = t ? this._startColumns[u] : 1, f = t ? this._endColumns[u] : c.length + 1;
      for (let m = h; m < f; m++)
        r[o] = c.charCodeAt(m - 1), i[o] = u + 1, l[o] = m, o++;
      !t && u < s && (r[o] = 10, i[o] = u + 1, l[o] = c.length + 1, o++);
    }
    return new o1(r, i, l);
  }
};
class o1 {
  constructor(t, n, s) {
    this._charCodes = t, this._lineNumbers = n, this._columns = s;
  }
  toString() {
    return "[" + this._charCodes.map(
      (t, n) => (t === 10 ? "\\n" : String.fromCharCode(t)) + `-(${this._lineNumbers[n]},${this._columns[n]})`
    ).join(", ") + "]";
  }
  _assertIndex(t, n) {
    if (t < 0 || t >= n.length)
      throw new Error("Illegal index");
  }
  getElements() {
    return this._charCodes;
  }
  getStartLineNumber(t) {
    return t > 0 && t === this._lineNumbers.length ? this.getEndLineNumber(t - 1) : (this._assertIndex(t, this._lineNumbers), this._lineNumbers[t]);
  }
  getEndLineNumber(t) {
    return t === -1 ? this.getStartLineNumber(t + 1) : (this._assertIndex(t, this._lineNumbers), this._charCodes[t] === 10 ? this._lineNumbers[t] + 1 : this._lineNumbers[t]);
  }
  getStartColumn(t) {
    return t > 0 && t === this._columns.length ? this.getEndColumn(t - 1) : (this._assertIndex(t, this._columns), this._columns[t]);
  }
  getEndColumn(t) {
    return t === -1 ? this.getStartColumn(t + 1) : (this._assertIndex(t, this._columns), this._charCodes[t] === 10 ? 1 : this._columns[t] + 1);
  }
}
class He {
  constructor(t, n, s, r, i, l, o, u) {
    this.originalStartLineNumber = t, this.originalStartColumn = n, this.originalEndLineNumber = s, this.originalEndColumn = r, this.modifiedStartLineNumber = i, this.modifiedStartColumn = l, this.modifiedEndLineNumber = o, this.modifiedEndColumn = u;
  }
  static createFromDiffChange(t, n, s) {
    const r = n.getStartLineNumber(t.originalStart), i = n.getStartColumn(t.originalStart), l = n.getEndLineNumber(t.originalStart + t.originalLength - 1), o = n.getEndColumn(t.originalStart + t.originalLength - 1), u = s.getStartLineNumber(t.modifiedStart), c = s.getStartColumn(t.modifiedStart), h = s.getEndLineNumber(t.modifiedStart + t.modifiedLength - 1), f = s.getEndColumn(t.modifiedStart + t.modifiedLength - 1);
    return new He(
      r,
      i,
      l,
      o,
      u,
      c,
      h,
      f
    );
  }
}
function u1(e) {
  if (e.length <= 1)
    return e;
  const t = [e[0]];
  let n = t[0];
  for (let s = 1, r = e.length; s < r; s++) {
    const i = e[s], l = i.originalStart - (n.originalStart + n.originalLength), o = i.modifiedStart - (n.modifiedStart + n.modifiedLength);
    Math.min(l, o) < a1 ? (n.originalLength = i.originalStart + i.originalLength - n.originalStart, n.modifiedLength = i.modifiedStart + i.modifiedLength - n.modifiedStart) : (t.push(i), n = i);
  }
  return t;
}
class Je {
  constructor(t, n, s, r, i) {
    this.originalStartLineNumber = t, this.originalEndLineNumber = n, this.modifiedStartLineNumber = s, this.modifiedEndLineNumber = r, this.charChanges = i;
  }
  static createFromDiffResult(t, n, s, r, i, l, o) {
    let u, c, h, f, m;
    if (n.originalLength === 0 ? (u = s.getStartLineNumber(n.originalStart) - 1, c = 0) : (u = s.getStartLineNumber(n.originalStart), c = s.getEndLineNumber(n.originalStart + n.originalLength - 1)), n.modifiedLength === 0 ? (h = r.getStartLineNumber(n.modifiedStart) - 1, f = 0) : (h = r.getStartLineNumber(n.modifiedStart), f = r.getEndLineNumber(n.modifiedStart + n.modifiedLength - 1)), l && n.originalLength > 0 && n.originalLength < 20 && n.modifiedLength > 0 && n.modifiedLength < 20 && i()) {
      const d = s.createCharSequence(t, n.originalStart, n.originalStart + n.originalLength - 1), g = r.createCharSequence(t, n.modifiedStart, n.modifiedStart + n.modifiedLength - 1);
      if (d.getElements().length > 0 && g.getElements().length > 0) {
        let p = ur(d, g, i, !0).changes;
        o && (p = u1(p)), m = [];
        for (let L = 0, v = p.length; L < v; L++)
          m.push(He.createFromDiffChange(p[L], d, g));
      }
    }
    return new Je(
      u,
      c,
      h,
      f,
      m
    );
  }
}
class cr {
  constructor(t, n, s) {
    this.shouldComputeCharChanges = s.shouldComputeCharChanges, this.shouldPostProcessCharChanges = s.shouldPostProcessCharChanges, this.shouldIgnoreTrimWhitespace = s.shouldIgnoreTrimWhitespace, this.shouldMakePrettyDiff = s.shouldMakePrettyDiff, this.originalLines = t, this.modifiedLines = n, this.original = new Ps(t), this.modified = new Ps(n), this.continueLineDiff = Fs(s.maxComputationTime), this.continueCharDiff = Fs(s.maxComputationTime === 0 ? 0 : Math.min(s.maxComputationTime, 5e3));
  }
  computeDiff() {
    if (this.original.lines.length === 1 && this.original.lines[0].length === 0)
      return this.modified.lines.length === 1 && this.modified.lines[0].length === 0 ? {
        quitEarly: !1,
        changes: []
      } : {
        quitEarly: !1,
        changes: [{
          originalStartLineNumber: 1,
          originalEndLineNumber: 1,
          modifiedStartLineNumber: 1,
          modifiedEndLineNumber: this.modified.lines.length,
          charChanges: void 0
        }]
      };
    if (this.modified.lines.length === 1 && this.modified.lines[0].length === 0)
      return {
        quitEarly: !1,
        changes: [{
          originalStartLineNumber: 1,
          originalEndLineNumber: this.original.lines.length,
          modifiedStartLineNumber: 1,
          modifiedEndLineNumber: 1,
          charChanges: void 0
        }]
      };
    const t = ur(this.original, this.modified, this.continueLineDiff, this.shouldMakePrettyDiff), n = t.changes, s = t.quitEarly;
    if (this.shouldIgnoreTrimWhitespace) {
      const o = [];
      for (let u = 0, c = n.length; u < c; u++)
        o.push(Je.createFromDiffResult(this.shouldIgnoreTrimWhitespace, n[u], this.original, this.modified, this.continueCharDiff, this.shouldComputeCharChanges, this.shouldPostProcessCharChanges));
      return {
        quitEarly: s,
        changes: o
      };
    }
    const r = [];
    let i = 0, l = 0;
    for (let o = -1, u = n.length; o < u; o++) {
      const c = o + 1 < u ? n[o + 1] : null, h = c ? c.originalStart : this.originalLines.length, f = c ? c.modifiedStart : this.modifiedLines.length;
      for (; i < h && l < f; ) {
        const m = this.originalLines[i], d = this.modifiedLines[l];
        if (m !== d) {
          {
            let g = tn(m, 1), p = tn(d, 1);
            for (; g > 1 && p > 1; ) {
              const L = m.charCodeAt(g - 2), v = d.charCodeAt(p - 2);
              if (L !== v)
                break;
              g--, p--;
            }
            (g > 1 || p > 1) && this._pushTrimWhitespaceCharChange(r, i + 1, 1, g, l + 1, 1, p);
          }
          {
            let g = nn(m, 1), p = nn(d, 1);
            const L = m.length + 1, v = d.length + 1;
            for (; g < L && p < v; ) {
              const N = m.charCodeAt(g - 1), b = m.charCodeAt(p - 1);
              if (N !== b)
                break;
              g++, p++;
            }
            (g < L || p < v) && this._pushTrimWhitespaceCharChange(r, i + 1, g, L, l + 1, p, v);
          }
        }
        i++, l++;
      }
      c && (r.push(Je.createFromDiffResult(this.shouldIgnoreTrimWhitespace, c, this.original, this.modified, this.continueCharDiff, this.shouldComputeCharChanges, this.shouldPostProcessCharChanges)), i += c.originalLength, l += c.modifiedLength);
    }
    return {
      quitEarly: s,
      changes: r
    };
  }
  _pushTrimWhitespaceCharChange(t, n, s, r, i, l, o) {
    if (this._mergeTrimWhitespaceCharChange(t, n, s, r, i, l, o))
      return;
    let u;
    this.shouldComputeCharChanges && (u = [new He(
      n,
      s,
      n,
      r,
      i,
      l,
      i,
      o
    )]), t.push(new Je(
      n,
      n,
      i,
      i,
      u
    ));
  }
  _mergeTrimWhitespaceCharChange(t, n, s, r, i, l, o) {
    const u = t.length;
    if (u === 0)
      return !1;
    const c = t[u - 1];
    return c.originalEndLineNumber === 0 || c.modifiedEndLineNumber === 0 ? !1 : c.originalEndLineNumber === n && c.modifiedEndLineNumber === i ? (this.shouldComputeCharChanges && c.charChanges && c.charChanges.push(new He(
      n,
      s,
      n,
      r,
      i,
      l,
      i,
      o
    )), !0) : c.originalEndLineNumber + 1 === n && c.modifiedEndLineNumber + 1 === i ? (c.originalEndLineNumber = n, c.modifiedEndLineNumber = i, this.shouldComputeCharChanges && c.charChanges && c.charChanges.push(new He(
      n,
      s,
      n,
      r,
      i,
      l,
      i,
      o
    )), !0) : !1;
  }
}
function tn(e, t) {
  const n = ei(e);
  return n === -1 ? t : n + 1;
}
function nn(e, t) {
  const n = ti(e);
  return n === -1 ? t : n + 2;
}
function Fs(e) {
  if (e === 0)
    return () => !0;
  const t = Date.now();
  return () => Date.now() - t < e;
}
class de {
  static trivial(t, n) {
    return new de([new z(V.ofLength(t.length), V.ofLength(n.length))], !1);
  }
  static trivialTimedOut(t, n) {
    return new de([new z(V.ofLength(t.length), V.ofLength(n.length))], !0);
  }
  constructor(t, n) {
    this.diffs = t, this.hitTimeout = n;
  }
}
class z {
  static invert(t, n) {
    const s = [];
    return Sr(t, (r, i) => {
      s.push(z.fromOffsetPairs(r ? r.getEndExclusives() : fe.zero, i ? i.getStarts() : new fe(
        n,
        (r ? r.seq2Range.endExclusive - r.seq1Range.endExclusive : 0) + n
      )));
    }), s;
  }
  static fromOffsetPairs(t, n) {
    return new z(new V(t.offset1, n.offset1), new V(t.offset2, n.offset2));
  }
  constructor(t, n) {
    this.seq1Range = t, this.seq2Range = n;
  }
  swap() {
    return new z(this.seq2Range, this.seq1Range);
  }
  toString() {
    return `${this.seq1Range} <-> ${this.seq2Range}`;
  }
  join(t) {
    return new z(this.seq1Range.join(t.seq1Range), this.seq2Range.join(t.seq2Range));
  }
  delta(t) {
    return t === 0 ? this : new z(this.seq1Range.delta(t), this.seq2Range.delta(t));
  }
  deltaStart(t) {
    return t === 0 ? this : new z(this.seq1Range.deltaStart(t), this.seq2Range.deltaStart(t));
  }
  deltaEnd(t) {
    return t === 0 ? this : new z(this.seq1Range.deltaEnd(t), this.seq2Range.deltaEnd(t));
  }
  intersectsOrTouches(t) {
    return this.seq1Range.intersectsOrTouches(t.seq1Range) || this.seq2Range.intersectsOrTouches(t.seq2Range);
  }
  intersect(t) {
    const n = this.seq1Range.intersect(t.seq1Range), s = this.seq2Range.intersect(t.seq2Range);
    if (!(!n || !s))
      return new z(n, s);
  }
  getStarts() {
    return new fe(this.seq1Range.start, this.seq2Range.start);
  }
  getEndExclusives() {
    return new fe(this.seq1Range.endExclusive, this.seq2Range.endExclusive);
  }
}
const Se = class Se {
  constructor(t, n) {
    this.offset1 = t, this.offset2 = n;
  }
  toString() {
    return `${this.offset1} <-> ${this.offset2}`;
  }
  delta(t) {
    return t === 0 ? this : new Se(this.offset1 + t, this.offset2 + t);
  }
  equals(t) {
    return this.offset1 === t.offset1 && this.offset2 === t.offset2;
  }
};
Se.zero = new Se(0, 0), Se.max = new Se(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
let fe = Se;
const Rt = class Rt {
  isValid() {
    return !0;
  }
};
Rt.instance = new Rt();
let st = Rt;
class c1 {
  constructor(t) {
    if (this.timeout = t, this.startTime = Date.now(), this.valid = !0, t <= 0)
      throw new me("timeout must be positive");
  }
  isValid() {
    if (!(Date.now() - this.startTime < this.timeout) && this.valid) {
      this.valid = !1;
      debugger;
    }
    return this.valid;
  }
  disable() {
    this.timeout = Number.MAX_SAFE_INTEGER, this.isValid = () => !0, this.valid = !0;
  }
}
class Dt {
  constructor(t, n) {
    this.width = t, this.height = n, this.array = [], this.array = new Array(t * n);
  }
  get(t, n) {
    return this.array[t + n * this.width];
  }
  set(t, n, s) {
    this.array[t + n * this.width] = s;
  }
}
function sn(e) {
  return e === 32 || e === 9;
}
const Ye = class Ye {
  static getKey(t) {
    let n = this.chrKeys.get(t);
    return n === void 0 && (n = this.chrKeys.size, this.chrKeys.set(t, n)), n;
  }
  constructor(t, n, s) {
    this.range = t, this.lines = n, this.source = s, this.histogram = [];
    let r = 0;
    for (let i = t.startLineNumber - 1; i < t.endLineNumberExclusive - 1; i++) {
      const l = n[i];
      for (let u = 0; u < l.length; u++) {
        r++;
        const c = l[u], h = Ye.getKey(c);
        this.histogram[h] = (this.histogram[h] || 0) + 1;
      }
      r++;
      const o = Ye.getKey(`
`);
      this.histogram[o] = (this.histogram[o] || 0) + 1;
    }
    this.totalCount = r;
  }
  computeSimilarity(t) {
    let n = 0;
    const s = Math.max(this.histogram.length, t.histogram.length);
    for (let r = 0; r < s; r++)
      n += Math.abs((this.histogram[r] ?? 0) - (t.histogram[r] ?? 0));
    return 1 - n / (this.totalCount + t.totalCount);
  }
};
Ye.chrKeys = /* @__PURE__ */ new Map();
let vt = Ye;
class h1 {
  compute(t, n, s = st.instance, r) {
    if (t.length === 0 || n.length === 0)
      return de.trivial(t, n);
    const i = new Dt(t.length, n.length), l = new Dt(t.length, n.length), o = new Dt(t.length, n.length);
    for (let g = 0; g < t.length; g++)
      for (let p = 0; p < n.length; p++) {
        if (!s.isValid())
          return de.trivialTimedOut(t, n);
        const L = g === 0 ? 0 : i.get(g - 1, p), v = p === 0 ? 0 : i.get(g, p - 1);
        let N;
        t.getElement(g) === n.getElement(p) ? (g === 0 || p === 0 ? N = 0 : N = i.get(g - 1, p - 1), g > 0 && p > 0 && l.get(g - 1, p - 1) === 3 && (N += o.get(g - 1, p - 1)), N += r ? r(g, p) : 1) : N = -1;
        const b = Math.max(L, v, N);
        if (b === N) {
          const w = g > 0 && p > 0 ? o.get(g - 1, p - 1) : 0;
          o.set(g, p, w + 1), l.set(g, p, 3);
        } else
          b === L ? (o.set(g, p, 0), l.set(g, p, 1)) : b === v && (o.set(g, p, 0), l.set(g, p, 2));
        i.set(g, p, b);
      }
    const u = [];
    let c = t.length, h = n.length;
    function f(g, p) {
      (g + 1 !== c || p + 1 !== h) && u.push(new z(new V(g + 1, c), new V(p + 1, h))), c = g, h = p;
    }
    let m = t.length - 1, d = n.length - 1;
    for (; m >= 0 && d >= 0; )
      l.get(m, d) === 3 ? (f(m, d), m--, d--) : l.get(m, d) === 1 ? m-- : d--;
    return f(-1, -1), u.reverse(), new de(u, !1);
  }
}
class hr {
  compute(t, n, s = st.instance) {
    if (t.length === 0 || n.length === 0)
      return de.trivial(t, n);
    const r = t, i = n;
    function l(p, L) {
      for (; p < r.length && L < i.length && r.getElement(p) === i.getElement(L); )
        p++, L++;
      return p;
    }
    let o = 0;
    const u = new f1();
    u.set(0, l(0, 0));
    const c = new m1();
    c.set(0, u.get(0) === 0 ? null : new Ts(null, 0, 0, u.get(0)));
    let h = 0;
    e:
      for (; ; ) {
        if (o++, !s.isValid())
          return de.trivialTimedOut(r, i);
        const p = -Math.min(o, i.length + o % 2), L = Math.min(o, r.length + o % 2);
        for (h = p; h <= L; h += 2) {
          const v = h === L ? -1 : u.get(h + 1), N = h === p ? -1 : u.get(h - 1) + 1, b = Math.min(Math.max(v, N), r.length), w = b - h;
          if (b > r.length || w > i.length)
            continue;
          const _ = l(b, w);
          u.set(h, _);
          const R = b === v ? c.get(h + 1) : c.get(h - 1);
          if (c.set(h, _ !== b ? new Ts(R, b, w, _ - b) : R), u.get(h) === r.length && u.get(h) - h === i.length)
            break e;
        }
      }
    let f = c.get(h);
    const m = [];
    let d = r.length, g = i.length;
    for (; ; ) {
      const p = f ? f.x + f.length : 0, L = f ? f.y + f.length : 0;
      if ((p !== d || L !== g) && m.push(new z(new V(p, d), new V(L, g))), !f)
        break;
      d = f.x, g = f.y, f = f.prev;
    }
    return m.reverse(), new de(m, !1);
  }
}
class Ts {
  constructor(t, n, s, r) {
    this.prev = t, this.x = n, this.y = s, this.length = r;
  }
}
class f1 {
  constructor() {
    this.positiveArr = new Int32Array(10), this.negativeArr = new Int32Array(10);
  }
  get(t) {
    return t < 0 ? (t = -t - 1, this.negativeArr[t]) : this.positiveArr[t];
  }
  set(t, n) {
    if (t < 0) {
      if (t = -t - 1, t >= this.negativeArr.length) {
        const s = this.negativeArr;
        this.negativeArr = new Int32Array(s.length * 2), this.negativeArr.set(s);
      }
      this.negativeArr[t] = n;
    } else {
      if (t >= this.positiveArr.length) {
        const s = this.positiveArr;
        this.positiveArr = new Int32Array(s.length * 2), this.positiveArr.set(s);
      }
      this.positiveArr[t] = n;
    }
  }
}
class m1 {
  constructor() {
    this.positiveArr = [], this.negativeArr = [];
  }
  get(t) {
    return t < 0 ? (t = -t - 1, this.negativeArr[t]) : this.positiveArr[t];
  }
  set(t, n) {
    t < 0 ? (t = -t - 1, this.negativeArr[t] = n) : this.positiveArr[t] = n;
  }
}
class Nt {
  constructor(t, n, s) {
    this.lines = t, this.considerWhitespaceChanges = s, this.elements = [], this.firstCharOffsetByLine = [], this.additionalOffsetByLine = [];
    let r = !1;
    n.start > 0 && n.endExclusive >= t.length && (n = new V(n.start - 1, n.endExclusive), r = !0), this.lineRange = n, this.firstCharOffsetByLine[0] = 0;
    for (let i = this.lineRange.start; i < this.lineRange.endExclusive; i++) {
      let l = t[i], o = 0;
      if (r)
        o = l.length, l = "", r = !1;
      else if (!s) {
        const u = l.trimStart();
        o = l.length - u.length, l = u.trimEnd();
      }
      this.additionalOffsetByLine.push(o);
      for (let u = 0; u < l.length; u++)
        this.elements.push(l.charCodeAt(u));
      i < t.length - 1 && (this.elements.push(10), this.firstCharOffsetByLine[i - this.lineRange.start + 1] = this.elements.length);
    }
    this.additionalOffsetByLine.push(0);
  }
  toString() {
    return `Slice: "${this.text}"`;
  }
  get text() {
    return this.getText(new V(0, this.length));
  }
  getText(t) {
    return this.elements.slice(t.start, t.endExclusive).map((n) => String.fromCharCode(n)).join("");
  }
  getElement(t) {
    return this.elements[t];
  }
  get length() {
    return this.elements.length;
  }
  getBoundaryScore(t) {
    const n = qs(t > 0 ? this.elements[t - 1] : -1), s = qs(t < this.elements.length ? this.elements[t] : -1);
    if (n === 7 && s === 8)
      return 0;
    if (n === 8)
      return 150;
    let r = 0;
    return n !== s && (r += 10, n === 0 && s === 1 && (r += 1)), r += Vs(n), r += Vs(s), r;
  }
  translateOffset(t) {
    if (this.lineRange.isEmpty)
      return new J(this.lineRange.start + 1, 1);
    const n = Ze(this.firstCharOffsetByLine, (s) => s <= t);
    return new J(
      this.lineRange.start + n + 1,
      t - this.firstCharOffsetByLine[n] + this.additionalOffsetByLine[n] + 1
    );
  }
  translateRange(t) {
    return D.fromPositions(this.translateOffset(t.start), this.translateOffset(t.endExclusive));
  }
  findWordContaining(t) {
    if (t < 0 || t >= this.elements.length || !Pt(this.elements[t]))
      return;
    let n = t;
    for (; n > 0 && Pt(this.elements[n - 1]); )
      n--;
    let s = t;
    for (; s < this.elements.length && Pt(this.elements[s]); )
      s++;
    return new V(n, s);
  }
  countLinesIn(t) {
    return this.translateOffset(t.endExclusive).lineNumber - this.translateOffset(t.start).lineNumber;
  }
  isStronglyEqual(t, n) {
    return this.elements[t] === this.elements[n];
  }
  extendToFullLines(t) {
    const n = ze(this.firstCharOffsetByLine, (r) => r <= t.start) ?? 0, s = wr(this.firstCharOffsetByLine, (r) => t.endExclusive <= r) ?? this.elements.length;
    return new V(n, s);
  }
}
function Pt(e) {
  return e >= 97 && e <= 122 || e >= 65 && e <= 90 || e >= 48 && e <= 57;
}
const d1 = {
  0: 0,
  1: 0,
  2: 0,
  3: 10,
  4: 2,
  5: 30,
  6: 3,
  7: 10,
  8: 10
};
function Vs(e) {
  return d1[e];
}
function qs(e) {
  return e === 10 ? 8 : e === 13 ? 7 : sn(e) ? 6 : e >= 97 && e <= 122 ? 0 : e >= 65 && e <= 90 ? 1 : e >= 48 && e <= 57 ? 2 : e === -1 ? 3 : e === 44 || e === 59 ? 5 : 4;
}
function g1(e, t, n, s, r, i) {
  let { moves: l, excludedChanges: o } = x1(e, t, n, i);
  if (!i.isValid())
    return [];
  const u = e.filter((h) => !o.has(h)), c = p1(u, s, r, t, n, i);
  return Ar(l, c), l = _1(l), l = l.filter((h) => {
    const f = h.original.toOffsetRange().slice(t).map((d) => d.trim());
    return f.join(`
`).length >= 15 && b1(f, (d) => d.length >= 2) >= 2;
  }), l = L1(e, l), l;
}
function b1(e, t) {
  let n = 0;
  for (const s of e)
    t(s) && n++;
  return n;
}
function x1(e, t, n, s) {
  const r = [], i = e.filter((u) => u.modified.isEmpty && u.original.length >= 3).map((u) => new vt(u.original, t, u)), l = new Set(e.filter((u) => u.original.isEmpty && u.modified.length >= 3).map((u) => new vt(u.modified, n, u))), o = /* @__PURE__ */ new Set();
  for (const u of i) {
    let c = -1, h;
    for (const f of l) {
      const m = u.computeSimilarity(f);
      m > c && (c = m, h = f);
    }
    if (c > 0.9 && h && (l.delete(h), r.push(new oe(u.range, h.range)), o.add(u.source), o.add(h.source)), !s.isValid())
      return { moves: r, excludedChanges: o };
  }
  return { moves: r, excludedChanges: o };
}
function p1(e, t, n, s, r, i) {
  const l = [], o = new yr();
  for (const m of e)
    for (let d = m.original.startLineNumber; d < m.original.endLineNumberExclusive - 2; d++) {
      const g = `${t[d - 1]}:${t[d + 1 - 1]}:${t[d + 2 - 1]}`;
      o.add(g, { range: new T(d, d + 3) });
    }
  const u = [];
  e.sort(ot((m) => m.modified.startLineNumber, ut));
  for (const m of e) {
    let d = [];
    for (let g = m.modified.startLineNumber; g < m.modified.endLineNumberExclusive - 2; g++) {
      const p = `${n[g - 1]}:${n[g + 1 - 1]}:${n[g + 2 - 1]}`, L = new T(g, g + 3), v = [];
      o.forEach(p, ({ range: N }) => {
        for (const w of d)
          if (w.originalLineRange.endLineNumberExclusive + 1 === N.endLineNumberExclusive && w.modifiedLineRange.endLineNumberExclusive + 1 === L.endLineNumberExclusive) {
            w.originalLineRange = new T(
              w.originalLineRange.startLineNumber,
              N.endLineNumberExclusive
            ), w.modifiedLineRange = new T(
              w.modifiedLineRange.startLineNumber,
              L.endLineNumberExclusive
            ), v.push(w);
            return;
          }
        const b = {
          modifiedLineRange: L,
          originalLineRange: N
        };
        u.push(b), v.push(b);
      }), d = v;
    }
    if (!i.isValid())
      return [];
  }
  u.sort(Rr(ot((m) => m.modifiedLineRange.length, ut)));
  const c = new ce(), h = new ce();
  for (const m of u) {
    const d = m.modifiedLineRange.startLineNumber - m.originalLineRange.startLineNumber, g = c.subtractFrom(m.modifiedLineRange), p = h.subtractFrom(m.originalLineRange).getWithDelta(d), L = g.getIntersection(p);
    for (const v of L.ranges) {
      if (v.length < 3)
        continue;
      const N = v, b = v.delta(-d);
      l.push(new oe(b, N)), c.addRange(N), h.addRange(b);
    }
  }
  l.sort(ot((m) => m.original.startLineNumber, ut));
  const f = new dt(e);
  for (let m = 0; m < l.length; m++) {
    const d = l[m], g = f.findLastMonotonous((R) => R.original.startLineNumber <= d.original.startLineNumber), p = ze(e, (R) => R.modified.startLineNumber <= d.modified.startLineNumber), L = Math.max(d.original.startLineNumber - g.original.startLineNumber, d.modified.startLineNumber - p.modified.startLineNumber), v = f.findLastMonotonous((R) => R.original.startLineNumber < d.original.endLineNumberExclusive), N = ze(e, (R) => R.modified.startLineNumber < d.modified.endLineNumberExclusive), b = Math.max(v.original.endLineNumberExclusive - d.original.endLineNumberExclusive, N.modified.endLineNumberExclusive - d.modified.endLineNumberExclusive);
    let w;
    for (w = 0; w < L; w++) {
      const R = d.original.startLineNumber - w - 1, y = d.modified.startLineNumber - w - 1;
      if (R > s.length || y > r.length || c.contains(y) || h.contains(R) || !Bs(s[R - 1], r[y - 1], i))
        break;
    }
    w > 0 && (h.addRange(new T(d.original.startLineNumber - w, d.original.startLineNumber)), c.addRange(new T(d.modified.startLineNumber - w, d.modified.startLineNumber)));
    let _;
    for (_ = 0; _ < b; _++) {
      const R = d.original.endLineNumberExclusive + _, y = d.modified.endLineNumberExclusive + _;
      if (R > s.length || y > r.length || c.contains(y) || h.contains(R) || !Bs(s[R - 1], r[y - 1], i))
        break;
    }
    _ > 0 && (h.addRange(new T(
      d.original.endLineNumberExclusive,
      d.original.endLineNumberExclusive + _
    )), c.addRange(new T(
      d.modified.endLineNumberExclusive,
      d.modified.endLineNumberExclusive + _
    ))), (w > 0 || _ > 0) && (l[m] = new oe(new T(
      d.original.startLineNumber - w,
      d.original.endLineNumberExclusive + _
    ), new T(
      d.modified.startLineNumber - w,
      d.modified.endLineNumberExclusive + _
    )));
  }
  return l;
}
function Bs(e, t, n) {
  if (e.trim() === t.trim())
    return !0;
  if (e.length > 300 && t.length > 300)
    return !1;
  const r = new hr().compute(new Nt([e], new V(0, 1), !1), new Nt([t], new V(0, 1), !1), n);
  let i = 0;
  const l = z.invert(r.diffs, e.length);
  for (const h of l)
    h.seq1Range.forEach((f) => {
      sn(e.charCodeAt(f)) || i++;
    });
  function o(h) {
    let f = 0;
    for (let m = 0; m < e.length; m++)
      sn(h.charCodeAt(m)) || f++;
    return f;
  }
  const u = o(e.length > t.length ? e : t);
  return i / u > 0.6 && u > 10;
}
function _1(e) {
  if (e.length === 0)
    return e;
  e.sort(ot((n) => n.original.startLineNumber, ut));
  const t = [e[0]];
  for (let n = 1; n < e.length; n++) {
    const s = t[t.length - 1], r = e[n], i = r.original.startLineNumber - s.original.endLineNumberExclusive, l = r.modified.startLineNumber - s.modified.endLineNumberExclusive;
    if (i >= 0 && l >= 0 && i + l <= 2) {
      t[t.length - 1] = s.join(r);
      continue;
    }
    t.push(r);
  }
  return t;
}
function L1(e, t) {
  const n = new dt(e);
  return t = t.filter((s) => {
    const r = n.findLastMonotonous((o) => o.original.startLineNumber < s.original.endLineNumberExclusive) || new oe(new T(1, 1), new T(1, 1)), i = ze(e, (o) => o.modified.startLineNumber < s.modified.endLineNumberExclusive);
    return r !== i;
  }), t;
}
function Is(e, t, n) {
  let s = n;
  return s = Us(e, t, s), s = Us(e, t, s), s = w1(e, t, s), s;
}
function Us(e, t, n) {
  if (n.length === 0)
    return n;
  const s = [];
  s.push(n[0]);
  for (let i = 1; i < n.length; i++) {
    const l = s[s.length - 1];
    let o = n[i];
    if (o.seq1Range.isEmpty || o.seq2Range.isEmpty) {
      const u = o.seq1Range.start - l.seq1Range.endExclusive;
      let c;
      for (c = 1; c <= u && !(e.getElement(o.seq1Range.start - c) !== e.getElement(o.seq1Range.endExclusive - c) || t.getElement(o.seq2Range.start - c) !== t.getElement(o.seq2Range.endExclusive - c)); c++)
        ;
      if (c--, c === u) {
        s[s.length - 1] = new z(new V(l.seq1Range.start, o.seq1Range.endExclusive - u), new V(l.seq2Range.start, o.seq2Range.endExclusive - u));
        continue;
      }
      o = o.delta(-c);
    }
    s.push(o);
  }
  const r = [];
  for (let i = 0; i < s.length - 1; i++) {
    const l = s[i + 1];
    let o = s[i];
    if (o.seq1Range.isEmpty || o.seq2Range.isEmpty) {
      const u = l.seq1Range.start - o.seq1Range.endExclusive;
      let c;
      for (c = 0; c < u && !(!e.isStronglyEqual(o.seq1Range.start + c, o.seq1Range.endExclusive + c) || !t.isStronglyEqual(o.seq2Range.start + c, o.seq2Range.endExclusive + c)); c++)
        ;
      if (c === u) {
        s[i + 1] = new z(new V(o.seq1Range.start + u, l.seq1Range.endExclusive), new V(o.seq2Range.start + u, l.seq2Range.endExclusive));
        continue;
      }
      c > 0 && (o = o.delta(c));
    }
    r.push(o);
  }
  return s.length > 0 && r.push(s[s.length - 1]), r;
}
function w1(e, t, n) {
  if (!e.getBoundaryScore || !t.getBoundaryScore)
    return n;
  for (let s = 0; s < n.length; s++) {
    const r = s > 0 ? n[s - 1] : void 0, i = n[s], l = s + 1 < n.length ? n[s + 1] : void 0, o = new V(
      r ? r.seq1Range.endExclusive + 1 : 0,
      l ? l.seq1Range.start - 1 : e.length
    ), u = new V(
      r ? r.seq2Range.endExclusive + 1 : 0,
      l ? l.seq2Range.start - 1 : t.length
    );
    i.seq1Range.isEmpty ? n[s] = Hs(i, e, t, o, u) : i.seq2Range.isEmpty && (n[s] = Hs(i.swap(), t, e, u, o).swap());
  }
  return n;
}
function Hs(e, t, n, s, r) {
  let l = 1;
  for (; e.seq1Range.start - l >= s.start && e.seq2Range.start - l >= r.start && n.isStronglyEqual(e.seq2Range.start - l, e.seq2Range.endExclusive - l) && l < 100; )
    l++;
  l--;
  let o = 0;
  for (; e.seq1Range.start + o < s.endExclusive && e.seq2Range.endExclusive + o < r.endExclusive && n.isStronglyEqual(e.seq2Range.start + o, e.seq2Range.endExclusive + o) && o < 100; )
    o++;
  if (l === 0 && o === 0)
    return e;
  let u = 0, c = -1;
  for (let h = -l; h <= o; h++) {
    const f = e.seq2Range.start + h, m = e.seq2Range.endExclusive + h, d = e.seq1Range.start + h, g = t.getBoundaryScore(d) + n.getBoundaryScore(f) + n.getBoundaryScore(m);
    g > c && (c = g, u = h);
  }
  return e.delta(u);
}
function v1(e, t, n) {
  const s = [];
  for (const r of n) {
    const i = s[s.length - 1];
    if (!i) {
      s.push(r);
      continue;
    }
    r.seq1Range.start - i.seq1Range.endExclusive <= 2 || r.seq2Range.start - i.seq2Range.endExclusive <= 2 ? s[s.length - 1] = new z(i.seq1Range.join(r.seq1Range), i.seq2Range.join(r.seq2Range)) : s.push(r);
  }
  return s;
}
function N1(e, t, n) {
  const s = z.invert(n, e.length), r = [];
  let i = new fe(0, 0);
  function l(u, c) {
    if (u.offset1 < i.offset1 || u.offset2 < i.offset2)
      return;
    const h = e.findWordContaining(u.offset1), f = t.findWordContaining(u.offset2);
    if (!h || !f)
      return;
    let m = new z(h, f);
    const d = m.intersect(c);
    let g = d.seq1Range.length, p = d.seq2Range.length;
    for (; s.length > 0; ) {
      const L = s[0];
      if (!(L.seq1Range.intersects(h) || L.seq2Range.intersects(f)))
        break;
      const N = e.findWordContaining(L.seq1Range.start), b = t.findWordContaining(L.seq2Range.start), w = new z(N, b), _ = w.intersect(L);
      if (g += _.seq1Range.length, p += _.seq2Range.length, m = m.join(w), m.seq1Range.endExclusive >= L.seq1Range.endExclusive)
        s.shift();
      else
        break;
    }
    g + p < (m.seq1Range.length + m.seq2Range.length) * 2 / 3 && r.push(m), i = m.getEndExclusives();
  }
  for (; s.length > 0; ) {
    const u = s.shift();
    u.seq1Range.isEmpty || (l(u.getStarts(), u), l(u.getEndExclusives().delta(-1), u));
  }
  return S1(n, r);
}
function S1(e, t) {
  const n = [];
  for (; e.length > 0 || t.length > 0; ) {
    const s = e[0], r = t[0];
    let i;
    s && (!r || s.seq1Range.start < r.seq1Range.start) ? i = e.shift() : i = t.shift(), n.length > 0 && n[n.length - 1].seq1Range.endExclusive >= i.seq1Range.start ? n[n.length - 1] = n[n.length - 1].join(i) : n.push(i);
  }
  return n;
}
function C1(e, t, n) {
  let s = n;
  if (s.length === 0)
    return s;
  let r = 0, i;
  do {
    i = !1;
    const l = [
      s[0]
    ];
    for (let o = 1; o < s.length; o++) {
      let h = function(m, d) {
        const g = new V(c.seq1Range.endExclusive, u.seq1Range.start);
        return e.getText(g).replace(/\s/g, "").length <= 4 && (m.seq1Range.length + m.seq2Range.length > 5 || d.seq1Range.length + d.seq2Range.length > 5);
      };
      const u = s[o], c = l[l.length - 1];
      h(c, u) ? (i = !0, l[l.length - 1] = l[l.length - 1].join(u)) : l.push(u);
    }
    s = l;
  } while (r++ < 10 && i);
  return s;
}
function A1(e, t, n) {
  let s = n;
  if (s.length === 0)
    return s;
  let r = 0, i;
  do {
    i = !1;
    const o = [
      s[0]
    ];
    for (let u = 1; u < s.length; u++) {
      let f = function(d, g) {
        const p = new V(h.seq1Range.endExclusive, c.seq1Range.start);
        if (e.countLinesIn(p) > 5 || p.length > 500)
          return !1;
        const v = e.getText(p).trim();
        if (v.length > 20 || v.split(/\r\n|\r|\n/).length > 1)
          return !1;
        const N = e.countLinesIn(d.seq1Range), b = d.seq1Range.length, w = t.countLinesIn(d.seq2Range), _ = d.seq2Range.length, R = e.countLinesIn(g.seq1Range), y = g.seq1Range.length, E = t.countLinesIn(g.seq2Range), I = g.seq2Range.length, j = 2 * 40 + 50;
        function S(x) {
          return Math.min(x, j);
        }
        return Math.pow(Math.pow(S(N * 40 + b), 1.5) + Math.pow(S(w * 40 + _), 1.5), 1.5) + Math.pow(Math.pow(S(R * 40 + y), 1.5) + Math.pow(S(E * 40 + I), 1.5), 1.5) > (j ** 1.5) ** 1.5 * 1.3;
      };
      const c = s[u], h = o[o.length - 1];
      f(h, c) ? (i = !0, o[o.length - 1] = o[o.length - 1].join(c)) : o.push(c);
    }
    s = o;
  } while (r++ < 10 && i);
  const l = [];
  return Cr(s, (o, u, c) => {
    let h = u;
    function f(v) {
      return v.length > 0 && v.trim().length <= 3 && u.seq1Range.length + u.seq2Range.length > 100;
    }
    const m = e.extendToFullLines(u.seq1Range), d = e.getText(new V(m.start, u.seq1Range.start));
    f(d) && (h = h.deltaStart(-d.length));
    const g = e.getText(new V(u.seq1Range.endExclusive, m.endExclusive));
    f(g) && (h = h.deltaEnd(g.length));
    const p = z.fromOffsetPairs(o ? o.getEndExclusives() : fe.zero, c ? c.getStarts() : fe.max), L = h.intersect(p);
    l.length > 0 && L.getStarts().equals(l[l.length - 1].getEndExclusives()) ? l[l.length - 1] = l[l.length - 1].join(L) : l.push(L);
  }), l;
}
class Ws {
  constructor(t, n) {
    this.trimmedHash = t, this.lines = n;
  }
  getElement(t) {
    return this.trimmedHash[t];
  }
  get length() {
    return this.trimmedHash.length;
  }
  getBoundaryScore(t) {
    const n = t === 0 ? 0 : zs(this.lines[t - 1]), s = t === this.lines.length ? 0 : zs(this.lines[t]);
    return 1e3 - (n + s);
  }
  getText(t) {
    return this.lines.slice(t.start, t.endExclusive).join(`
`);
  }
  isStronglyEqual(t, n) {
    return this.lines[t] === this.lines[n];
  }
}
function zs(e) {
  let t = 0;
  for (; t < e.length && (e.charCodeAt(t) === 32 || e.charCodeAt(t) === 9); )
    t++;
  return t;
}
class R1 {
  constructor() {
    this.dynamicProgrammingDiffing = new h1(), this.myersDiffingAlgorithm = new hr();
  }
  computeDiff(t, n, s) {
    if (t.length <= 1 && vr(t, n, (_, R) => _ === R))
      return new mt([], [], !1);
    if (t.length === 1 && t[0].length === 0 || n.length === 1 && n[0].length === 0)
      return new mt([
        new ye(new T(1, t.length + 1), new T(1, n.length + 1), [
          new nt(new D(1, 1, t.length, t[0].length + 1), new D(1, 1, n.length, n[0].length + 1))
        ])
      ], [], !1);
    const r = s.maxComputationTimeMs === 0 ? st.instance : new c1(s.maxComputationTimeMs), i = !s.ignoreTrimWhitespace, l = /* @__PURE__ */ new Map();
    function o(_) {
      let R = l.get(_);
      return R === void 0 && (R = l.size, l.set(_, R)), R;
    }
    const u = t.map((_) => o(_.trim())), c = n.map((_) => o(_.trim())), h = new Ws(u, t), f = new Ws(c, n), m = h.length + f.length < 1700 ? this.dynamicProgrammingDiffing.compute(h, f, r, (_, R) => t[_] === n[R] ? n[R].length === 0 ? 0.1 : 1 + Math.log(1 + n[R].length) : 0.99) : this.myersDiffingAlgorithm.compute(h, f);
    let d = m.diffs, g = m.hitTimeout;
    d = Is(h, f, d), d = C1(h, f, d);
    const p = [], L = (_) => {
      if (i)
        for (let R = 0; R < _; R++) {
          const y = v + R, E = N + R;
          if (t[y] !== n[E]) {
            const I = this.refineDiff(t, n, new z(new V(y, y + 1), new V(E, E + 1)), r, i);
            for (const j of I.mappings)
              p.push(j);
            I.hitTimeout && (g = !0);
          }
        }
    };
    let v = 0, N = 0;
    for (const _ of d) {
      wt(() => _.seq1Range.start - v === _.seq2Range.start - N);
      const R = _.seq1Range.start - v;
      L(R), v = _.seq1Range.endExclusive, N = _.seq2Range.endExclusive;
      const y = this.refineDiff(t, n, _, r, i);
      y.hitTimeout && (g = !0);
      for (const E of y.mappings)
        p.push(E);
    }
    L(t.length - v);
    const b = $s(p, t, n);
    let w = [];
    return s.computeMoves && (w = this.computeMoves(b, t, n, u, c, r, i)), wt(() => {
      function _(y, E) {
        if (y.lineNumber < 1 || y.lineNumber > E.length)
          return !1;
        const I = E[y.lineNumber - 1];
        return !(y.column < 1 || y.column > I.length + 1);
      }
      function R(y, E) {
        return !(y.startLineNumber < 1 || y.startLineNumber > E.length + 1 || y.endLineNumberExclusive < 1 || y.endLineNumberExclusive > E.length + 1);
      }
      for (const y of b) {
        if (!y.innerChanges)
          return !1;
        for (const E of y.innerChanges)
          if (!(_(E.modifiedRange.getStartPosition(), n) && _(E.modifiedRange.getEndPosition(), n) && _(E.originalRange.getStartPosition(), t) && _(E.originalRange.getEndPosition(), t)))
            return !1;
        if (!R(y.modified, n) || !R(y.original, t))
          return !1;
      }
      return !0;
    }), new mt(b, w, g);
  }
  computeMoves(t, n, s, r, i, l, o) {
    return g1(t, n, s, r, i, l).map((h) => {
      const f = this.refineDiff(n, s, new z(h.original.toOffsetRange(), h.modified.toOffsetRange()), l, o), m = $s(f.mappings, n, s, !0);
      return new hn(h, m);
    });
  }
  refineDiff(t, n, s, r, i) {
    const l = new Nt(t, s.seq1Range, i), o = new Nt(n, s.seq2Range, i), u = l.length + o.length < 500 ? this.dynamicProgrammingDiffing.compute(l, o, r) : this.myersDiffingAlgorithm.compute(l, o, r);
    let c = u.diffs;
    return c = Is(l, o, c), c = N1(l, o, c), c = v1(l, o, c), c = A1(l, o, c), {
      mappings: c.map((f) => new nt(l.translateRange(f.seq1Range), o.translateRange(f.seq2Range))),
      hitTimeout: u.hitTimeout
    };
  }
}
function $s(e, t, n, s = !1) {
  const r = [];
  for (const i of Nr(e.map((l) => y1(l, t, n)), (l, o) => l.original.overlapOrTouch(o.original) || l.modified.overlapOrTouch(o.modified))) {
    const l = i[0], o = i[i.length - 1];
    r.push(new ye(
      l.original.join(o.original),
      l.modified.join(o.modified),
      i.map((u) => u.innerChanges[0])
    ));
  }
  return wt(() => !s && r.length > 0 && r[0].original.startLineNumber !== r[0].modified.startLineNumber ? !1 : or(r, (i, l) => l.original.startLineNumber - i.original.endLineNumberExclusive === l.modified.startLineNumber - i.modified.endLineNumberExclusive && i.original.endLineNumberExclusive < l.original.startLineNumber && i.modified.endLineNumberExclusive < l.modified.startLineNumber)), r;
}
function y1(e, t, n) {
  let s = 0, r = 0;
  e.modifiedRange.endColumn === 1 && e.originalRange.endColumn === 1 && e.originalRange.startLineNumber + s <= e.originalRange.endLineNumber && e.modifiedRange.startLineNumber + s <= e.modifiedRange.endLineNumber && (r = -1), e.modifiedRange.startColumn - 1 >= n[e.modifiedRange.startLineNumber - 1].length && e.originalRange.startColumn - 1 >= t[e.originalRange.startLineNumber - 1].length && e.originalRange.startLineNumber <= e.originalRange.endLineNumber + r && e.modifiedRange.startLineNumber <= e.modifiedRange.endLineNumber + r && (s = 1);
  const i = new T(
    e.originalRange.startLineNumber + s,
    e.originalRange.endLineNumber + 1 + r
  ), l = new T(
    e.modifiedRange.startLineNumber + s,
    e.modifiedRange.endLineNumber + 1 + r
  );
  return new ye(i, l, [e]);
}
const Ft = {
  getLegacy: () => new l1(),
  getDefault: () => new R1()
};
function ve(e, t) {
  const n = Math.pow(10, t);
  return Math.round(e * n) / n;
}
class G {
  constructor(t, n, s, r = 1) {
    this._rgbaBrand = void 0, this.r = Math.min(255, Math.max(0, t)) | 0, this.g = Math.min(255, Math.max(0, n)) | 0, this.b = Math.min(255, Math.max(0, s)) | 0, this.a = ve(Math.max(Math.min(1, r), 0), 3);
  }
  static equals(t, n) {
    return t.r === n.r && t.g === n.g && t.b === n.b && t.a === n.a;
  }
}
class se {
  constructor(t, n, s, r) {
    this._hslaBrand = void 0, this.h = Math.max(Math.min(360, t), 0) | 0, this.s = ve(Math.max(Math.min(1, n), 0), 3), this.l = ve(Math.max(Math.min(1, s), 0), 3), this.a = ve(Math.max(Math.min(1, r), 0), 3);
  }
  static equals(t, n) {
    return t.h === n.h && t.s === n.s && t.l === n.l && t.a === n.a;
  }
  static fromRGBA(t) {
    const n = t.r / 255, s = t.g / 255, r = t.b / 255, i = t.a, l = Math.max(n, s, r), o = Math.min(n, s, r);
    let u = 0, c = 0;
    const h = (o + l) / 2, f = l - o;
    if (f > 0) {
      switch (c = Math.min(h <= 0.5 ? f / (2 * h) : f / (2 - 2 * h), 1), l) {
        case n:
          u = (s - r) / f + (s < r ? 6 : 0);
          break;
        case s:
          u = (r - n) / f + 2;
          break;
        case r:
          u = (n - s) / f + 4;
          break;
      }
      u *= 60, u = Math.round(u);
    }
    return new se(u, c, h, i);
  }
  static _hue2rgb(t, n, s) {
    return s < 0 && (s += 1), s > 1 && (s -= 1), s < 1 / 6 ? t + (n - t) * 6 * s : s < 1 / 2 ? n : s < 2 / 3 ? t + (n - t) * (2 / 3 - s) * 6 : t;
  }
  static toRGBA(t) {
    const n = t.h / 360, { s, l: r, a: i } = t;
    let l, o, u;
    if (s === 0)
      l = o = u = r;
    else {
      const c = r < 0.5 ? r * (1 + s) : r + s - r * s, h = 2 * r - c;
      l = se._hue2rgb(h, c, n + 1 / 3), o = se._hue2rgb(h, c, n), u = se._hue2rgb(h, c, n - 1 / 3);
    }
    return new G(Math.round(l * 255), Math.round(o * 255), Math.round(u * 255), i);
  }
}
class Te {
  constructor(t, n, s, r) {
    this._hsvaBrand = void 0, this.h = Math.max(Math.min(360, t), 0) | 0, this.s = ve(Math.max(Math.min(1, n), 0), 3), this.v = ve(Math.max(Math.min(1, s), 0), 3), this.a = ve(Math.max(Math.min(1, r), 0), 3);
  }
  static equals(t, n) {
    return t.h === n.h && t.s === n.s && t.v === n.v && t.a === n.a;
  }
  static fromRGBA(t) {
    const n = t.r / 255, s = t.g / 255, r = t.b / 255, i = Math.max(n, s, r), l = Math.min(n, s, r), o = i - l, u = i === 0 ? 0 : o / i;
    let c;
    return o === 0 ? c = 0 : i === n ? c = ((s - r) / o % 6 + 6) % 6 : i === s ? c = (r - n) / o + 2 : c = (n - s) / o + 4, new Te(Math.round(c * 60), u, i, t.a);
  }
  static toRGBA(t) {
    const { h: n, s, v: r, a: i } = t, l = r * s, o = l * (1 - Math.abs(n / 60 % 2 - 1)), u = r - l;
    let [c, h, f] = [0, 0, 0];
    return n < 60 ? (c = l, h = o) : n < 120 ? (c = o, h = l) : n < 180 ? (h = l, f = o) : n < 240 ? (h = o, f = l) : n < 300 ? (c = o, f = l) : n <= 360 && (c = l, f = o), c = Math.round((c + u) * 255), h = Math.round((h + u) * 255), f = Math.round((f + u) * 255), new G(c, h, f, i);
  }
}
const q = class q {
  static fromHex(t) {
    return q.Format.CSS.parseHex(t) || q.red;
  }
  static equals(t, n) {
    return !t && !n ? !0 : !t || !n ? !1 : t.equals(n);
  }
  get hsla() {
    return this._hsla ? this._hsla : se.fromRGBA(this.rgba);
  }
  get hsva() {
    return this._hsva ? this._hsva : Te.fromRGBA(this.rgba);
  }
  constructor(t) {
    if (t)
      if (t instanceof G)
        this.rgba = t;
      else if (t instanceof se)
        this._hsla = t, this.rgba = se.toRGBA(t);
      else if (t instanceof Te)
        this._hsva = t, this.rgba = Te.toRGBA(t);
      else
        throw new Error("Invalid color ctor argument");
    else
      throw new Error("Color needs a value");
  }
  equals(t) {
    return !!t && G.equals(this.rgba, t.rgba) && se.equals(this.hsla, t.hsla) && Te.equals(this.hsva, t.hsva);
  }
  getRelativeLuminance() {
    const t = q._relativeLuminanceForComponent(this.rgba.r), n = q._relativeLuminanceForComponent(this.rgba.g), s = q._relativeLuminanceForComponent(this.rgba.b), r = 0.2126 * t + 0.7152 * n + 0.0722 * s;
    return ve(r, 4);
  }
  static _relativeLuminanceForComponent(t) {
    const n = t / 255;
    return n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
  }
  getContrastRatio(t) {
    const n = this.getRelativeLuminance(), s = t.getRelativeLuminance();
    return n > s ? (n + 0.05) / (s + 0.05) : (s + 0.05) / (n + 0.05);
  }
  isDarker() {
    return (this.rgba.r * 299 + this.rgba.g * 587 + this.rgba.b * 114) / 1e3 < 128;
  }
  isLighter() {
    return (this.rgba.r * 299 + this.rgba.g * 587 + this.rgba.b * 114) / 1e3 >= 128;
  }
  isLighterThan(t) {
    const n = this.getRelativeLuminance(), s = t.getRelativeLuminance();
    return n > s;
  }
  isDarkerThan(t) {
    const n = this.getRelativeLuminance(), s = t.getRelativeLuminance();
    return n < s;
  }
  lighten(t) {
    return new q(new se(this.hsla.h, this.hsla.s, this.hsla.l + this.hsla.l * t, this.hsla.a));
  }
  darken(t) {
    return new q(new se(this.hsla.h, this.hsla.s, this.hsla.l - this.hsla.l * t, this.hsla.a));
  }
  transparent(t) {
    const { r: n, g: s, b: r, a: i } = this.rgba;
    return new q(new G(n, s, r, i * t));
  }
  isTransparent() {
    return this.rgba.a === 0;
  }
  isOpaque() {
    return this.rgba.a === 1;
  }
  opposite() {
    return new q(new G(255 - this.rgba.r, 255 - this.rgba.g, 255 - this.rgba.b, this.rgba.a));
  }
  blend(t) {
    const n = t.rgba, s = this.rgba.a, r = n.a, i = s + r * (1 - s);
    if (i < 1e-6)
      return q.transparent;
    const l = this.rgba.r * s / i + n.r * r * (1 - s) / i, o = this.rgba.g * s / i + n.g * r * (1 - s) / i, u = this.rgba.b * s / i + n.b * r * (1 - s) / i;
    return new q(new G(l, o, u, i));
  }
  makeOpaque(t) {
    if (this.isOpaque() || t.rgba.a !== 1)
      return this;
    const { r: n, g: s, b: r, a: i } = this.rgba;
    return new q(new G(
      t.rgba.r - i * (t.rgba.r - n),
      t.rgba.g - i * (t.rgba.g - s),
      t.rgba.b - i * (t.rgba.b - r),
      1
    ));
  }
  flatten(...t) {
    const n = t.reduceRight((s, r) => q._flatten(r, s));
    return q._flatten(this, n);
  }
  static _flatten(t, n) {
    const s = 1 - t.rgba.a;
    return new q(new G(
      s * n.rgba.r + t.rgba.a * t.rgba.r,
      s * n.rgba.g + t.rgba.a * t.rgba.g,
      s * n.rgba.b + t.rgba.a * t.rgba.b
    ));
  }
  toString() {
    return this._toString || (this._toString = q.Format.CSS.format(this)), this._toString;
  }
  static getLighterColor(t, n, s) {
    if (t.isLighterThan(n))
      return t;
    s = s || 0.5;
    const r = t.getRelativeLuminance(), i = n.getRelativeLuminance();
    return s = s * (i - r) / i, t.lighten(s);
  }
  static getDarkerColor(t, n, s) {
    if (t.isDarkerThan(n))
      return t;
    s = s || 0.5;
    const r = t.getRelativeLuminance(), i = n.getRelativeLuminance();
    return s = s * (r - i) / r, t.darken(s);
  }
};
q.white = new q(new G(255, 255, 255, 1)), q.black = new q(new G(0, 0, 0, 1)), q.red = new q(new G(255, 0, 0, 1)), q.blue = new q(new G(0, 0, 255, 1)), q.green = new q(new G(0, 255, 0, 1)), q.cyan = new q(new G(0, 255, 255, 1)), q.lightgrey = new q(new G(211, 211, 211, 1)), q.transparent = new q(new G(0, 0, 0, 0));
let Ge = q;
(function(e) {
  (function(t) {
    (function(n) {
      function s(d) {
        return d.rgba.a === 1 ? `rgb(${d.rgba.r}, ${d.rgba.g}, ${d.rgba.b})` : e.Format.CSS.formatRGBA(d);
      }
      n.formatRGB = s;
      function r(d) {
        return `rgba(${d.rgba.r}, ${d.rgba.g}, ${d.rgba.b}, ${+d.rgba.a.toFixed(2)})`;
      }
      n.formatRGBA = r;
      function i(d) {
        return d.hsla.a === 1 ? `hsl(${d.hsla.h}, ${(d.hsla.s * 100).toFixed(2)}%, ${(d.hsla.l * 100).toFixed(2)}%)` : e.Format.CSS.formatHSLA(d);
      }
      n.formatHSL = i;
      function l(d) {
        return `hsla(${d.hsla.h}, ${(d.hsla.s * 100).toFixed(2)}%, ${(d.hsla.l * 100).toFixed(2)}%, ${d.hsla.a.toFixed(2)})`;
      }
      n.formatHSLA = l;
      function o(d) {
        const g = d.toString(16);
        return g.length !== 2 ? "0" + g : g;
      }
      function u(d) {
        return `#${o(d.rgba.r)}${o(d.rgba.g)}${o(d.rgba.b)}`;
      }
      n.formatHex = u;
      function c(d, g = !1) {
        return g && d.rgba.a === 1 ? e.Format.CSS.formatHex(d) : `#${o(d.rgba.r)}${o(d.rgba.g)}${o(d.rgba.b)}${o(Math.round(d.rgba.a * 255))}`;
      }
      n.formatHexA = c;
      function h(d) {
        return d.isOpaque() ? e.Format.CSS.formatHex(d) : e.Format.CSS.formatRGBA(d);
      }
      n.format = h;
      function f(d) {
        const g = d.length;
        if (g === 0 || d.charCodeAt(0) !== 35)
          return null;
        if (g === 7) {
          const p = 16 * m(d.charCodeAt(1)) + m(d.charCodeAt(2)), L = 16 * m(d.charCodeAt(3)) + m(d.charCodeAt(4)), v = 16 * m(d.charCodeAt(5)) + m(d.charCodeAt(6));
          return new e(new G(p, L, v, 1));
        }
        if (g === 9) {
          const p = 16 * m(d.charCodeAt(1)) + m(d.charCodeAt(2)), L = 16 * m(d.charCodeAt(3)) + m(d.charCodeAt(4)), v = 16 * m(d.charCodeAt(5)) + m(d.charCodeAt(6)), N = 16 * m(d.charCodeAt(7)) + m(d.charCodeAt(8));
          return new e(new G(p, L, v, N / 255));
        }
        if (g === 4) {
          const p = m(d.charCodeAt(1)), L = m(d.charCodeAt(2)), v = m(d.charCodeAt(3));
          return new e(new G(16 * p + p, 16 * L + L, 16 * v + v));
        }
        if (g === 5) {
          const p = m(d.charCodeAt(1)), L = m(d.charCodeAt(2)), v = m(d.charCodeAt(3)), N = m(d.charCodeAt(4));
          return new e(new G(16 * p + p, 16 * L + L, 16 * v + v, (16 * N + N) / 255));
        }
        return null;
      }
      n.parseHex = f;
      function m(d) {
        switch (d) {
          case 48:
            return 0;
          case 49:
            return 1;
          case 50:
            return 2;
          case 51:
            return 3;
          case 52:
            return 4;
          case 53:
            return 5;
          case 54:
            return 6;
          case 55:
            return 7;
          case 56:
            return 8;
          case 57:
            return 9;
          case 97:
            return 10;
          case 65:
            return 10;
          case 98:
            return 11;
          case 66:
            return 11;
          case 99:
            return 12;
          case 67:
            return 12;
          case 100:
            return 13;
          case 68:
            return 13;
          case 101:
            return 14;
          case 69:
            return 14;
          case 102:
            return 15;
          case 70:
            return 15;
        }
        return 0;
      }
    })(t.CSS || (t.CSS = {}));
  })(e.Format || (e.Format = {}));
})(Ge || (Ge = {}));
function fr(e) {
  const t = [];
  for (const n of e) {
    const s = Number(n);
    (s || s === 0 && n.replace(/\s/g, "") !== "") && t.push(s);
  }
  return t;
}
function fn(e, t, n, s) {
  return {
    red: e / 255,
    blue: n / 255,
    green: t / 255,
    alpha: s
  };
}
function Oe(e, t) {
  const n = t.index, s = t[0].length;
  if (!n)
    return;
  const r = e.positionAt(n);
  return {
    startLineNumber: r.lineNumber,
    startColumn: r.column,
    endLineNumber: r.lineNumber,
    endColumn: r.column + s
  };
}
function E1(e, t) {
  if (!e)
    return;
  const n = Ge.Format.CSS.parseHex(t);
  if (n)
    return {
      range: e,
      color: fn(n.rgba.r, n.rgba.g, n.rgba.b, n.rgba.a)
    };
}
function Gs(e, t, n) {
  if (!e || t.length !== 1)
    return;
  const r = t[0].values(), i = fr(r);
  return {
    range: e,
    color: fn(i[0], i[1], i[2], n ? i[3] : 1)
  };
}
function js(e, t, n) {
  if (!e || t.length !== 1)
    return;
  const r = t[0].values(), i = fr(r), l = new Ge(new se(
    i[0],
    i[1] / 100,
    i[2] / 100,
    n ? i[3] : 1
  ));
  return {
    range: e,
    color: fn(l.rgba.r, l.rgba.g, l.rgba.b, l.rgba.a)
  };
}
function Xe(e, t) {
  return typeof e == "string" ? [...e.matchAll(t)] : e.findMatches(t);
}
function M1(e) {
  const t = [], s = Xe(e, /\b(rgb|rgba|hsl|hsla)(\([0-9\s,.\%]*\))|(#)([A-Fa-f0-9]{3})\b|(#)([A-Fa-f0-9]{4})\b|(#)([A-Fa-f0-9]{6})\b|(#)([A-Fa-f0-9]{8})\b/gm);
  if (s.length > 0)
    for (const r of s) {
      const i = r.filter((c) => c !== void 0), l = i[1], o = i[2];
      if (!o)
        continue;
      let u;
      if (l === "rgb") {
        const c = /^\(\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*\)$/gm;
        u = Gs(Oe(e, r), Xe(o, c), !1);
      } else if (l === "rgba") {
        const c = /^\(\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(0[.][0-9]+|[.][0-9]+|[01][.]|[01])\s*\)$/gm;
        u = Gs(Oe(e, r), Xe(o, c), !0);
      } else if (l === "hsl") {
        const c = /^\(\s*(36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*\)$/gm;
        u = js(Oe(e, r), Xe(o, c), !1);
      } else if (l === "hsla") {
        const c = /^\(\s*(36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(0[.][0-9]+|[.][0-9]+|[01][.]|[01])\s*\)$/gm;
        u = js(Oe(e, r), Xe(o, c), !0);
      } else
        l === "#" && (u = E1(Oe(e, r), l + o));
      u && t.push(u);
    }
  return t;
}
function k1(e) {
  return !e || typeof e.getValue != "function" || typeof e.positionAt != "function" ? [] : M1(e);
}
class D1 extends Vi {
  get uri() {
    return this._uri;
  }
  get eol() {
    return this._eol;
  }
  getValue() {
    return this.getText();
  }
  findMatches(t) {
    const n = [];
    for (let s = 0; s < this._lines.length; s++) {
      const r = this._lines[s], i = this.offsetAt(new J(s + 1, 1)), l = r.matchAll(t);
      for (const o of l)
        (o.index || o.index === 0) && (o.index = o.index + i), n.push(o);
    }
    return n;
  }
  getLinesContent() {
    return this._lines.slice(0);
  }
  getLineCount() {
    return this._lines.length;
  }
  getLineContent(t) {
    return this._lines[t - 1];
  }
  getWordAtPosition(t, n) {
    const s = on(t.column, ar(n), this._lines[t.lineNumber - 1], 0);
    return s ? new D(
      t.lineNumber,
      s.startColumn,
      t.lineNumber,
      s.endColumn
    ) : null;
  }
  getWordUntilPosition(t, n) {
    const s = this.getWordAtPosition(t, n);
    return s ? {
      word: this._lines[t.lineNumber - 1].substring(s.startColumn - 1, t.column - 1),
      startColumn: s.startColumn,
      endColumn: t.column
    } : {
      word: "",
      startColumn: t.column,
      endColumn: t.column
    };
  }
  words(t) {
    const n = this._lines, s = this._wordenize.bind(this);
    let r = 0, i = "", l = 0, o = [];
    return {
      *[Symbol.iterator]() {
        for (; ; )
          if (l < o.length) {
            const u = i.substring(o[l].start, o[l].end);
            l += 1, yield u;
          } else if (r < n.length)
            i = n[r], o = s(i, t), l = 0, r += 1;
          else
            break;
      }
    };
  }
  getLineWords(t, n) {
    const s = this._lines[t - 1], r = this._wordenize(s, n), i = [];
    for (const l of r)
      i.push({
        word: s.substring(l.start, l.end),
        startColumn: l.start + 1,
        endColumn: l.end + 1
      });
    return i;
  }
  _wordenize(t, n) {
    const s = [];
    let r;
    for (n.lastIndex = 0; (r = n.exec(t)) && r[0].length !== 0; )
      s.push({ start: r.index, end: r.index + r[0].length });
    return s;
  }
  getValueInRange(t) {
    if (t = this._validateRange(t), t.startLineNumber === t.endLineNumber)
      return this._lines[t.startLineNumber - 1].substring(t.startColumn - 1, t.endColumn - 1);
    const n = this._eol, s = t.startLineNumber - 1, r = t.endLineNumber - 1, i = [];
    i.push(this._lines[s].substring(t.startColumn - 1));
    for (let l = s + 1; l < r; l++)
      i.push(this._lines[l]);
    return i.push(this._lines[r].substring(0, t.endColumn - 1)), i.join(n);
  }
  offsetAt(t) {
    return t = this._validatePosition(t), this._ensureLineStarts(), this._lineStarts.getPrefixSum(t.lineNumber - 2) + (t.column - 1);
  }
  positionAt(t) {
    t = Math.floor(t), t = Math.max(0, t), this._ensureLineStarts();
    const n = this._lineStarts.getIndexOf(t), s = this._lines[n.index].length;
    return {
      lineNumber: 1 + n.index,
      column: 1 + Math.min(n.remainder, s)
    };
  }
  _validateRange(t) {
    const n = this._validatePosition({ lineNumber: t.startLineNumber, column: t.startColumn }), s = this._validatePosition({ lineNumber: t.endLineNumber, column: t.endColumn });
    return n.lineNumber !== t.startLineNumber || n.column !== t.startColumn || s.lineNumber !== t.endLineNumber || s.column !== t.endColumn ? {
      startLineNumber: n.lineNumber,
      startColumn: n.column,
      endLineNumber: s.lineNumber,
      endColumn: s.column
    } : t;
  }
  _validatePosition(t) {
    if (!J.isIPosition(t))
      throw new Error("bad position");
    let { lineNumber: n, column: s } = t, r = !1;
    if (n < 1)
      n = 1, s = 1, r = !0;
    else if (n > this._lines.length)
      n = this._lines.length, s = this._lines[n - 1].length + 1, r = !0;
    else {
      const i = this._lines[n - 1].length + 1;
      s < 1 ? (s = 1, r = !0) : s > i && (s = i, r = !0);
    }
    return r ? { lineNumber: n, column: s } : t;
  }
}
const _e = class _e {
  constructor(t, n) {
    this._host = t, this._models = /* @__PURE__ */ Object.create(null), this._foreignModuleFactory = n, this._foreignModule = null;
  }
  dispose() {
    this._models = /* @__PURE__ */ Object.create(null);
  }
  _getModel(t) {
    return this._models[t];
  }
  _getModels() {
    const t = [];
    return Object.keys(this._models).forEach((n) => t.push(this._models[n])), t;
  }
  acceptNewModel(t) {
    this._models[t.url] = new D1(Re.parse(t.url), t.lines, t.EOL, t.versionId);
  }
  acceptModelChanged(t, n) {
    if (!this._models[t])
      return;
    this._models[t].onEvents(n);
  }
  acceptRemovedModel(t) {
    this._models[t] && delete this._models[t];
  }
  async computeUnicodeHighlights(t, n, s) {
    const r = this._getModel(t);
    return r ? r1.computeUnicodeHighlights(r, n, s) : { ranges: [], hasMore: !1, ambiguousCharacterCount: 0, invisibleCharacterCount: 0, nonBasicAsciiCharacterCount: 0 };
  }
  async computeDiff(t, n, s, r) {
    const i = this._getModel(t), l = this._getModel(n);
    return !i || !l ? null : _e.computeDiff(i, l, s, r);
  }
  static computeDiff(t, n, s, r) {
    const i = r === "advanced" ? Ft.getDefault() : Ft.getLegacy(), l = t.getLinesContent(), o = n.getLinesContent(), u = i.computeDiff(l, o, s), c = u.changes.length > 0 ? !1 : this._modelsAreIdentical(t, n);
    function h(f) {
      return f.map(
        (m) => {
          var d;
          return [m.original.startLineNumber, m.original.endLineNumberExclusive, m.modified.startLineNumber, m.modified.endLineNumberExclusive, (d = m.innerChanges) == null ? void 0 : d.map((g) => [
            g.originalRange.startLineNumber,
            g.originalRange.startColumn,
            g.originalRange.endLineNumber,
            g.originalRange.endColumn,
            g.modifiedRange.startLineNumber,
            g.modifiedRange.startColumn,
            g.modifiedRange.endLineNumber,
            g.modifiedRange.endColumn
          ])];
        }
      );
    }
    return {
      identical: c,
      quitEarly: u.hitTimeout,
      changes: h(u.changes),
      moves: u.moves.map((f) => [
        f.lineRangeMapping.original.startLineNumber,
        f.lineRangeMapping.original.endLineNumberExclusive,
        f.lineRangeMapping.modified.startLineNumber,
        f.lineRangeMapping.modified.endLineNumberExclusive,
        h(f.changes)
      ])
    };
  }
  static _modelsAreIdentical(t, n) {
    const s = t.getLineCount(), r = n.getLineCount();
    if (s !== r)
      return !1;
    for (let i = 1; i <= s; i++) {
      const l = t.getLineContent(i), o = n.getLineContent(i);
      if (l !== o)
        return !1;
    }
    return !0;
  }
  async computeDirtyDiff(t, n, s) {
    const r = this._getModel(t), i = this._getModel(n);
    if (!r || !i)
      return null;
    const l = r.getLinesContent(), o = i.getLinesContent();
    return new cr(l, o, {
      shouldComputeCharChanges: !1,
      shouldPostProcessCharChanges: !1,
      shouldIgnoreTrimWhitespace: s,
      shouldMakePrettyDiff: !0,
      maxComputationTime: 1e3
    }).computeDiff().changes;
  }
  async computeMoreMinimalEdits(t, n, s) {
    const r = this._getModel(t);
    if (!r)
      return n;
    const i = [];
    let l;
    n = n.slice(0).sort((u, c) => {
      if (u.range && c.range)
        return D.compareRangesUsingStarts(u.range, c.range);
      const h = u.range ? 0 : 1, f = c.range ? 0 : 1;
      return h - f;
    });
    let o = 0;
    for (let u = 1; u < n.length; u++)
      D.getEndPosition(n[o].range).equals(D.getStartPosition(n[u].range)) ? (n[o].range = D.fromPositions(D.getStartPosition(n[o].range), D.getEndPosition(n[u].range)), n[o].text += n[u].text) : (o++, n[o] = n[u]);
    n.length = o + 1;
    for (let { range: u, text: c, eol: h } of n) {
      if (typeof h == "number" && (l = h), D.isEmpty(u) && !c)
        continue;
      const f = r.getValueInRange(u);
      if (c = c.replace(/\r\n|\n|\r/g, r.eol), f === c)
        continue;
      if (Math.max(c.length, f.length) > _e._diffLimit) {
        i.push({ range: u, text: c });
        continue;
      }
      const m = bi(f, c, s), d = r.offsetAt(D.lift(u).getStartPosition());
      for (const g of m) {
        const p = r.positionAt(d + g.originalStart), L = r.positionAt(d + g.originalStart + g.originalLength), v = {
          text: c.substr(g.modifiedStart, g.modifiedLength),
          range: { startLineNumber: p.lineNumber, startColumn: p.column, endLineNumber: L.lineNumber, endColumn: L.column }
        };
        r.getValueInRange(v.range) !== v.text && i.push(v);
      }
    }
    return typeof l == "number" && i.push({ eol: l, text: "", range: { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0 } }), i;
  }
  computeHumanReadableDiff(t, n, s) {
    const r = this._getModel(t);
    if (!r)
      return n;
    const i = [];
    let l;
    n = n.slice(0).sort((o, u) => {
      if (o.range && u.range)
        return D.compareRangesUsingStarts(o.range, u.range);
      const c = o.range ? 0 : 1, h = u.range ? 0 : 1;
      return c - h;
    });
    for (let { range: o, text: u, eol: c } of n) {
      let p = function(v, N) {
        return new J(
          v.lineNumber + N.lineNumber - 1,
          N.lineNumber === 1 ? v.column + N.column - 1 : N.column
        );
      }, L = function(v, N) {
        const b = [];
        for (let w = N.startLineNumber; w <= N.endLineNumber; w++) {
          const _ = v[w - 1];
          w === N.startLineNumber && w === N.endLineNumber ? b.push(_.substring(N.startColumn - 1, N.endColumn - 1)) : w === N.startLineNumber ? b.push(_.substring(N.startColumn - 1)) : w === N.endLineNumber ? b.push(_.substring(0, N.endColumn - 1)) : b.push(_);
        }
        return b;
      };
      if (typeof c == "number" && (l = c), D.isEmpty(o) && !u)
        continue;
      const h = r.getValueInRange(o);
      if (u = u.replace(/\r\n|\n|\r/g, r.eol), h === u)
        continue;
      if (Math.max(u.length, h.length) > _e._diffLimit) {
        i.push({ range: o, text: u });
        continue;
      }
      const f = h.split(/\r\n|\n|\r/), m = u.split(/\r\n|\n|\r/), d = Ft.getDefault().computeDiff(f, m, s), g = D.lift(o).getStartPosition();
      for (const v of d.changes)
        if (v.innerChanges)
          for (const N of v.innerChanges)
            i.push({
              range: D.fromPositions(p(g, N.originalRange.getStartPosition()), p(g, N.originalRange.getEndPosition())),
              text: L(m, N.modifiedRange).join(r.eol)
            });
        else
          throw new me("The experimental diff algorithm always produces inner changes");
    }
    return typeof l == "number" && i.push({ eol: l, text: "", range: { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0 } }), i;
  }
  async computeLinks(t) {
    const n = this._getModel(t);
    return n ? $i(n) : null;
  }
  async computeDefaultDocumentColors(t) {
    const n = this._getModel(t);
    return n ? k1(n) : null;
  }
  async textualSuggest(t, n, s, r) {
    const i = new yt(), l = new RegExp(s, r), o = /* @__PURE__ */ new Set();
    e:
      for (const u of t) {
        const c = this._getModel(u);
        if (c) {
          for (const h of c.words(l))
            if (!(h === n || !isNaN(Number(h))) && (o.add(h), o.size > _e._suggestionsLimit))
              break e;
        }
      }
    return { words: Array.from(o), duration: i.elapsed() };
  }
  async computeWordRanges(t, n, s, r) {
    const i = this._getModel(t);
    if (!i)
      return /* @__PURE__ */ Object.create(null);
    const l = new RegExp(s, r), o = /* @__PURE__ */ Object.create(null);
    for (let u = n.startLineNumber; u < n.endLineNumber; u++) {
      const c = i.getLineWords(u, l);
      for (const h of c) {
        if (!isNaN(Number(h.word)))
          continue;
        let f = o[h.word];
        f || (f = [], o[h.word] = f), f.push({
          startLineNumber: u,
          startColumn: h.startColumn,
          endLineNumber: u,
          endColumn: h.endColumn
        });
      }
    }
    return o;
  }
  async navigateValueSet(t, n, s, r, i) {
    const l = this._getModel(t);
    if (!l)
      return null;
    const o = new RegExp(r, i);
    n.startColumn === n.endColumn && (n = {
      startLineNumber: n.startLineNumber,
      startColumn: n.startColumn,
      endLineNumber: n.endLineNumber,
      endColumn: n.endColumn + 1
    });
    const u = l.getValueInRange(n), c = l.getWordAtPosition({ lineNumber: n.startLineNumber, column: n.startColumn }, o);
    if (!c)
      return null;
    const h = l.getValueInRange(c);
    return Ot.INSTANCE.navigateValueSet(n, u, c, h, s);
  }
  loadForeignModule(t, n, s) {
    const l = {
      host: Ir(s, (o, u) => this._host.fhr(o, u)),
      getMirrorModels: () => this._getModels()
    };
    return this._foreignModuleFactory ? (this._foreignModule = this._foreignModuleFactory(l, n), Promise.resolve(Ut(this._foreignModule))) : Promise.reject(new Error("Unexpected usage"));
  }
  fmr(t, n) {
    if (!this._foreignModule || typeof this._foreignModule[t] != "function")
      return Promise.reject(new Error("Missing requestHandler or method: " + t));
    try {
      return Promise.resolve(this._foreignModule[t].apply(this._foreignModule, n));
    } catch (s) {
      return Promise.reject(s);
    }
  }
};
_e._diffLimit = 1e5, _e._suggestionsLimit = 1e4;
let rn = _e;
typeof importScripts == "function" && (globalThis.monaco = Zi());
let an = !1;
function P1(e) {
  if (an)
    return;
  an = !0;
  const t = new di((n) => {
    globalThis.postMessage(n);
  }, (n) => new rn(n, e));
  globalThis.onmessage = (n) => {
    t.onmessage(n.data);
  };
}
globalThis.onmessage = (e) => {
  an || P1(null);
};
export {
  P1 as initialize
};