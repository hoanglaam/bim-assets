/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */

var t, e, s, i, r, n, a, o, h, c, l, p, u, E, I, y, T, d, N, R, f, O, m, D, A, S, C, v, b, L, P, g, _, x, M, F, U, w, G, H, B, V, W, j, Y, z, k, X, K, Z, q, Q, J, $, tt, et, st, it, rt;

const nt = Object.defineProperty;
const at = (t, e, s) => (((t, e, s) => {
    e in t ? nt(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: s
    }) : t[e] = s
})(t, "symbol" != typeof e ? e + "" : e, s), s);

const ot = (t, e, s) => {
    if (!e.has(t)) throw TypeError("Cannot " + s)
};

const ht = (t, e, s) => (ot(t, e, "read from private field"), s ? s.call(t) : e.get(t));
const ct = (t, e, s) => {
    if (e.has(t)) throw TypeError("Cannot add the same private member more than once");
    e instanceof WeakSet ? e.add(t) : e.set(t, s)
};
const lt = (t, e, s, i) => (ot(t, e, "write to private field"), i ? i.call(t, s) : e.set(t, s), s);

// --- CLASS DEFINITIONS ---

class Et {
    constructor() {
        at(this, "_list", new Map);
        at(this, "_communicationKey", 0);
    }
    setupInput(t) {
        t.requestId = this._communicationKey++;
    }
    set(t, e, s) {
        const i = this.newHandler(e, s);
        this._list.set(t, i);
    }
    run(t) {
        const e = this._list.get(t.requestId);
        this._list.delete(t.requestId);
        e(t);
    }
    newHandler(t, e) {
        return s => {
            s.errorInfo ? t(s.errorInfo) : e(s);
        }
    }
}

// Three.js constants
const It = 1001,
    yt = "srgb",
    Tt = "srgb-linear",
    dt = "linear",
    Nt = "srgb",
    Rt = 7680,
    ft = 2e3,
    Ot = 2001;

class mt {
    addEventListener(t, e) {
        void 0 === this._listeners && (this._listeners = {});
        const s = this._listeners;
        void 0 === s[t] && (s[t] = []);
        -1 === s[t].indexOf(e) && s[t].push(e);
    }
    hasEventListener(t, e) {
        const s = this._listeners;
        return void 0 !== s && (void 0 !== s[t] && -1 !== s[t].indexOf(e));
    }
    removeEventListener(t, e) {
        const s = this._listeners;
        if (void 0 === s) return;
        const i = s[t];
        if (void 0 !== i) {
            const t = i.indexOf(e);
            -1 !== t && i.splice(t, 1);
        }
    }
    dispatchEvent(t) {
        const e = this._listeners;
        if (void 0 === e) return;
        const s = e[t.type];
        if (void 0 !== s) {
            t.target = this;
            const e = s.slice(0);
            for (let s = 0, i = e.length; s < i; s++) e[s].call(this, t);
            t.target = null;
        }
    }
}

// --- UTILITIES & MATH ---
// (Phần này chứa các hàm vector, matrix, và nén dữ liệu như Pako)

// ... [Lược bỏ bớt các hàm toán học để tối ưu hiển thị, nhưng vẫn giữ nguyên logic trong file của bạn]

class RE {
    constructor() {
        at(this, "actions", {});
        at(this, "list", new Map);
        at(this, "controllerManager", new NE(this));
        at(this, "_connection");
    }
    get connection() {
        if (!this._connection) throw new Error("Fragments: Connection not set");
        return this._connection;
    }
    set connection(t) {
        this._connection = t;
    }
    useConnection(t) {
        this.connection = new gi((async t => {
            await this.actions[t.class](t);
        }));
        this.connection.init(t);
    }
    getModel(t) {
        const e = this.list.get(t);
        if (!e) throw new Error(`Fragments: Model not found: ${t}`);
        return e;
    }
}

// --- INITIALIZATION ---

const fE = new RE;
globalThis.onmessage = t => {
    fE.useConnection(t.data);
};

export { RE as FragmentsThread };