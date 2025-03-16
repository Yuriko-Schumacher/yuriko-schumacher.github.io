
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    // Adapted from https://github.com/then/is-promise/blob/master/index.js
    // Distributed under MIT License https://github.com/then/is-promise/blob/master/LICENSE
    function is_promise(value) {
        return !!value && (typeof value === 'object' || typeof value === 'function') && typeof value.then === 'function';
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text$1(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text$1(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }
    class HtmlTag {
        constructor(is_svg = false) {
            this.is_svg = false;
            this.is_svg = is_svg;
            this.e = this.n = null;
        }
        c(html) {
            this.h(html);
        }
        m(html, target, anchor = null) {
            if (!this.e) {
                if (this.is_svg)
                    this.e = svg_element(target.nodeName);
                /** #7364  target for <template> may be provided as #document-fragment(11) */
                else
                    this.e = element((target.nodeType === 11 ? 'TEMPLATE' : target.nodeName));
                this.t = target.tagName !== 'TEMPLATE' ? target : target.content;
                this.c(html);
            }
            this.i(anchor);
        }
        h(html) {
            this.e.innerHTML = html;
            this.n = Array.from(this.e.nodeName === 'TEMPLATE' ? this.e.content.childNodes : this.e.childNodes);
        }
        i(anchor) {
            for (let i = 0; i < this.n.length; i += 1) {
                insert(this.t, this.n[i], anchor);
            }
        }
        p(html) {
            this.d();
            this.h(html);
            this.i(this.a);
        }
        d() {
            this.n.forEach(detach);
        }
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    let render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = /* @__PURE__ */ Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    /**
     * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
     */
    function flush_render_callbacks(fns) {
        const filtered = [];
        const targets = [];
        render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
        targets.forEach((c) => c());
        render_callbacks = filtered;
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }

    function handle_promise(promise, info) {
        const token = info.token = {};
        function update(type, index, key, value) {
            if (info.token !== token)
                return;
            info.resolved = value;
            let child_ctx = info.ctx;
            if (key !== undefined) {
                child_ctx = child_ctx.slice();
                child_ctx[key] = value;
            }
            const block = type && (info.current = type)(child_ctx);
            let needs_flush = false;
            if (info.block) {
                if (info.blocks) {
                    info.blocks.forEach((block, i) => {
                        if (i !== index && block) {
                            group_outros();
                            transition_out(block, 1, 1, () => {
                                if (info.blocks[i] === block) {
                                    info.blocks[i] = null;
                                }
                            });
                            check_outros();
                        }
                    });
                }
                else {
                    info.block.d(1);
                }
                block.c();
                transition_in(block, 1);
                block.m(info.mount(), info.anchor);
                needs_flush = true;
            }
            info.block = block;
            if (info.blocks)
                info.blocks[index] = block;
            if (needs_flush) {
                flush();
            }
        }
        if (is_promise(promise)) {
            const current_component = get_current_component();
            promise.then(value => {
                set_current_component(current_component);
                update(info.then, 1, info.value, value);
                set_current_component(null);
            }, error => {
                set_current_component(current_component);
                update(info.catch, 2, info.error, error);
                set_current_component(null);
                if (!info.hasCatch) {
                    throw error;
                }
            });
            // if we previously had a then/catch block, destroy it
            if (info.current !== info.pending) {
                update(info.pending, 0);
                return true;
            }
        }
        else {
            if (info.current !== info.then) {
                update(info.then, 1, info.value, promise);
                return true;
            }
            info.resolved = promise;
        }
    }
    function update_await_block_branch(info, ctx, dirty) {
        const child_ctx = ctx.slice();
        const { resolved } = info;
        if (info.current === info.then) {
            child_ctx[info.value] = resolved;
        }
        if (info.current === info.catch) {
            child_ctx[info.error] = resolved;
        }
        info.block.p(child_ctx, dirty);
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            flush_render_callbacks($$.after_update);
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.2' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    class InternMap extends Map {
      constructor(entries, key = keyof) {
        super();
        Object.defineProperties(this, {_intern: {value: new Map()}, _key: {value: key}});
        if (entries != null) for (const [key, value] of entries) this.set(key, value);
      }
      get(key) {
        return super.get(intern_get(this, key));
      }
      has(key) {
        return super.has(intern_get(this, key));
      }
      set(key, value) {
        return super.set(intern_set(this, key), value);
      }
      delete(key) {
        return super.delete(intern_delete(this, key));
      }
    }

    function intern_get({_intern, _key}, value) {
      const key = _key(value);
      return _intern.has(key) ? _intern.get(key) : value;
    }

    function intern_set({_intern, _key}, value) {
      const key = _key(value);
      if (_intern.has(key)) return _intern.get(key);
      _intern.set(key, value);
      return value;
    }

    function intern_delete({_intern, _key}, value) {
      const key = _key(value);
      if (_intern.has(key)) {
        value = _intern.get(key);
        _intern.delete(key);
      }
      return value;
    }

    function keyof(value) {
      return value !== null && typeof value === "object" ? value.valueOf() : value;
    }

    function identity(x) {
      return x;
    }

    function group(values, ...keys) {
      return nest(values, identity, identity, keys);
    }

    function nest(values, map, reduce, keys) {
      return (function regroup(values, i) {
        if (i >= keys.length) return reduce(values);
        const groups = new InternMap();
        const keyof = keys[i++];
        let index = -1;
        for (const value of values) {
          const key = keyof(value, ++index, values);
          const group = groups.get(key);
          if (group) group.push(value);
          else groups.set(key, [value]);
        }
        for (const [key, values] of groups) {
          groups.set(key, regroup(values, i));
        }
        return map(groups);
      })(values, 0);
    }

    function filter(values, test) {
      if (typeof test !== "function") throw new TypeError("test is not a function");
      const array = [];
      let index = -1;
      for (const value of values) {
        if (test(value, ++index, values)) {
          array.push(value);
        }
      }
      return array;
    }

    var EOL = {},
        EOF = {},
        QUOTE = 34,
        NEWLINE = 10,
        RETURN = 13;

    function objectConverter(columns) {
      return new Function("d", "return {" + columns.map(function(name, i) {
        return JSON.stringify(name) + ": d[" + i + "] || \"\"";
      }).join(",") + "}");
    }

    function customConverter(columns, f) {
      var object = objectConverter(columns);
      return function(row, i) {
        return f(object(row), i, columns);
      };
    }

    // Compute unique columns in order of discovery.
    function inferColumns(rows) {
      var columnSet = Object.create(null),
          columns = [];

      rows.forEach(function(row) {
        for (var column in row) {
          if (!(column in columnSet)) {
            columns.push(columnSet[column] = column);
          }
        }
      });

      return columns;
    }

    function pad(value, width) {
      var s = value + "", length = s.length;
      return length < width ? new Array(width - length + 1).join(0) + s : s;
    }

    function formatYear(year) {
      return year < 0 ? "-" + pad(-year, 6)
        : year > 9999 ? "+" + pad(year, 6)
        : pad(year, 4);
    }

    function formatDate(date) {
      var hours = date.getUTCHours(),
          minutes = date.getUTCMinutes(),
          seconds = date.getUTCSeconds(),
          milliseconds = date.getUTCMilliseconds();
      return isNaN(date) ? "Invalid Date"
          : formatYear(date.getUTCFullYear()) + "-" + pad(date.getUTCMonth() + 1, 2) + "-" + pad(date.getUTCDate(), 2)
          + (milliseconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "." + pad(milliseconds, 3) + "Z"
          : seconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "Z"
          : minutes || hours ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + "Z"
          : "");
    }

    function dsvFormat(delimiter) {
      var reFormat = new RegExp("[\"" + delimiter + "\n\r]"),
          DELIMITER = delimiter.charCodeAt(0);

      function parse(text, f) {
        var convert, columns, rows = parseRows(text, function(row, i) {
          if (convert) return convert(row, i - 1);
          columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
        });
        rows.columns = columns || [];
        return rows;
      }

      function parseRows(text, f) {
        var rows = [], // output rows
            N = text.length,
            I = 0, // current character index
            n = 0, // current line number
            t, // current token
            eof = N <= 0, // current token followed by EOF?
            eol = false; // current token followed by EOL?

        // Strip the trailing newline.
        if (text.charCodeAt(N - 1) === NEWLINE) --N;
        if (text.charCodeAt(N - 1) === RETURN) --N;

        function token() {
          if (eof) return EOF;
          if (eol) return eol = false, EOL;

          // Unescape quotes.
          var i, j = I, c;
          if (text.charCodeAt(j) === QUOTE) {
            while (I++ < N && text.charCodeAt(I) !== QUOTE || text.charCodeAt(++I) === QUOTE);
            if ((i = I) >= N) eof = true;
            else if ((c = text.charCodeAt(I++)) === NEWLINE) eol = true;
            else if (c === RETURN) { eol = true; if (text.charCodeAt(I) === NEWLINE) ++I; }
            return text.slice(j + 1, i - 1).replace(/""/g, "\"");
          }

          // Find next delimiter or newline.
          while (I < N) {
            if ((c = text.charCodeAt(i = I++)) === NEWLINE) eol = true;
            else if (c === RETURN) { eol = true; if (text.charCodeAt(I) === NEWLINE) ++I; }
            else if (c !== DELIMITER) continue;
            return text.slice(j, i);
          }

          // Return last token before EOF.
          return eof = true, text.slice(j, N);
        }

        while ((t = token()) !== EOF) {
          var row = [];
          while (t !== EOL && t !== EOF) row.push(t), t = token();
          if (f && (row = f(row, n++)) == null) continue;
          rows.push(row);
        }

        return rows;
      }

      function preformatBody(rows, columns) {
        return rows.map(function(row) {
          return columns.map(function(column) {
            return formatValue(row[column]);
          }).join(delimiter);
        });
      }

      function format(rows, columns) {
        if (columns == null) columns = inferColumns(rows);
        return [columns.map(formatValue).join(delimiter)].concat(preformatBody(rows, columns)).join("\n");
      }

      function formatBody(rows, columns) {
        if (columns == null) columns = inferColumns(rows);
        return preformatBody(rows, columns).join("\n");
      }

      function formatRows(rows) {
        return rows.map(formatRow).join("\n");
      }

      function formatRow(row) {
        return row.map(formatValue).join(delimiter);
      }

      function formatValue(value) {
        return value == null ? ""
            : value instanceof Date ? formatDate(value)
            : reFormat.test(value += "") ? "\"" + value.replace(/"/g, "\"\"") + "\""
            : value;
      }

      return {
        parse: parse,
        parseRows: parseRows,
        format: format,
        formatBody: formatBody,
        formatRows: formatRows,
        formatRow: formatRow,
        formatValue: formatValue
      };
    }

    var csv$1 = dsvFormat(",");

    var csvParse = csv$1.parse;

    function responseText(response) {
      if (!response.ok) throw new Error(response.status + " " + response.statusText);
      return response.text();
    }

    function text(input, init) {
      return fetch(input, init).then(responseText);
    }

    function dsvParse(parse) {
      return function(input, init, row) {
        if (arguments.length === 2 && typeof init === "function") row = init, init = undefined;
        return text(input, init).then(function(response) {
          return parse(response, row);
        });
      };
    }

    var csv = dsvParse(csvParse);

    function responseJson(response) {
      if (!response.ok) throw new Error(response.status + " " + response.statusText);
      if (response.status === 204 || response.status === 205) return;
      return response.json();
    }

    function json(input, init) {
      return fetch(input, init).then(responseJson);
    }

    function Transform(k, x, y) {
      this.k = k;
      this.x = x;
      this.y = y;
    }

    Transform.prototype = {
      constructor: Transform,
      scale: function(k) {
        return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
      },
      translate: function(x, y) {
        return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
      },
      apply: function(point) {
        return [point[0] * this.k + this.x, point[1] * this.k + this.y];
      },
      applyX: function(x) {
        return x * this.k + this.x;
      },
      applyY: function(y) {
        return y * this.k + this.y;
      },
      invert: function(location) {
        return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
      },
      invertX: function(x) {
        return (x - this.x) / this.k;
      },
      invertY: function(y) {
        return (y - this.y) / this.k;
      },
      rescaleX: function(x) {
        return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
      },
      rescaleY: function(y) {
        return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
      },
      toString: function() {
        return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
      }
    };

    new Transform(1, 0, 0);

    Transform.prototype;

    /* src/Components/NavBar.svelte generated by Svelte v3.59.2 */

    const file$5 = "src/Components/NavBar.svelte";

    function create_fragment$6(ctx) {
    	let div1;
    	let div0;
    	let nav;
    	let ul0;
    	let li0;
    	let a0;
    	let strong;
    	let t1;
    	let ul1;
    	let li1;
    	let a1;
    	let t3;
    	let li2;
    	let a2;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			nav = element("nav");
    			ul0 = element("ul");
    			li0 = element("li");
    			a0 = element("a");
    			strong = element("strong");
    			strong.textContent = "Yuriko Schumacher";
    			t1 = space();
    			ul1 = element("ul");
    			li1 = element("li");
    			a1 = element("a");
    			a1.textContent = "About";
    			t3 = space();
    			li2 = element("li");
    			a2 = element("a");
    			a2.textContent = "Work";
    			add_location(strong, file$5, 5, 27, 125);
    			attr_dev(a0, "href", "#about");
    			attr_dev(a0, "class", "svelte-164agi8");
    			add_location(a0, file$5, 5, 10, 108);
    			attr_dev(li0, "class", "svelte-164agi8");
    			add_location(li0, file$5, 4, 8, 93);
    			attr_dev(ul0, "class", "nav__logo svelte-164agi8");
    			add_location(ul0, file$5, 3, 6, 62);
    			attr_dev(a1, "href", "#about");
    			add_location(a1, file$5, 9, 12, 231);
    			attr_dev(li1, "class", "svelte-164agi8");
    			add_location(li1, file$5, 9, 8, 227);
    			attr_dev(a2, "href", "#work");
    			add_location(a2, file$5, 10, 12, 275);
    			attr_dev(li2, "class", "svelte-164agi8");
    			add_location(li2, file$5, 10, 8, 271);
    			attr_dev(ul1, "class", "nav__menu svelte-164agi8");
    			add_location(ul1, file$5, 8, 6, 196);
    			attr_dev(nav, "class", "svelte-164agi8");
    			add_location(nav, file$5, 2, 4, 50);
    			attr_dev(div0, "class", "nav__container svelte-164agi8");
    			add_location(div0, file$5, 1, 2, 17);
    			attr_dev(div1, "id", "nav");
    			attr_dev(div1, "class", "svelte-164agi8");
    			add_location(div1, file$5, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, nav);
    			append_dev(nav, ul0);
    			append_dev(ul0, li0);
    			append_dev(li0, a0);
    			append_dev(a0, strong);
    			append_dev(nav, t1);
    			append_dev(nav, ul1);
    			append_dev(ul1, li1);
    			append_dev(li1, a1);
    			append_dev(ul1, t3);
    			append_dev(ul1, li2);
    			append_dev(li2, a2);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('NavBar', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<NavBar> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class NavBar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NavBar",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    function u(t){return null==t}var b=new RegExp(/\s+([^\s]*)\s*$/);function m(t,n){return void 0===n&&(n=" "),u(t)?"":String(t).replace(b,n+"$1")}

    /* src/Components/About.svelte generated by Svelte v3.59.2 */
    const file$4 = "src/Components/About.svelte";

    function create_fragment$5(ctx) {
    	let div4;
    	let div3;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let div2;
    	let h1;
    	let t2;
    	let p0;
    	let t3;
    	let a0;
    	let t5;
    	let t6_value = m("important stories.") + "";
    	let t6;
    	let t7;
    	let p1;
    	let t8;
    	let span0;
    	let t10;
    	let span1;
    	let t12;
    	let span2;
    	let t14;
    	let span3;
    	let t16;
    	let span4;
    	let t18;
    	let span5;
    	let t20;
    	let span6;
    	let t22;
    	let span7;
    	let t24;
    	let t25_value = m("on projects!") + "";
    	let t25;
    	let t26;
    	let div1;
    	let ul0;
    	let li0;
    	let a1;
    	let i0;
    	let t27;
    	let t28;
    	let li1;
    	let a2;
    	let i1;
    	let t29;
    	let t30;
    	let ul1;
    	let li2;
    	let a3;
    	let t32;
    	let li3;
    	let a4;
    	let t34;
    	let li4;
    	let a5;
    	let i2;
    	let t35;
    	let li5;
    	let a6;
    	let i3;
    	let t36;
    	let li6;
    	let a7;
    	let i4;

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div3 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			div2 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Hi, I'm Yuriko.";
    			t2 = space();
    			p0 = element("p");
    			t3 = text$1("Currently, I work as a ");
    			a0 = element("a");
    			a0.textContent = "data visuals designer/developer";
    			t5 = text$1(" at the Texas Tribune. I am passionate about designing and producing meaningful (and beautiful ✨) graphics/data tools that tell ");
    			t6 = text$1(t6_value);
    			t7 = space();
    			p1 = element("p");
    			t8 = text$1("My skills currently include: front-end development with frameworks like ");
    			span0 = element("span");
    			span0.textContent = "React";
    			t10 = text$1(" and ");
    			span1 = element("span");
    			span1.textContent = "Svelte";
    			t12 = text$1(", JavaScript libraries including ");
    			span2 = element("span");
    			span2.textContent = "d3.js";
    			t14 = text$1(" and ");
    			span3 = element("span");
    			span3.textContent = "three.js";
    			t16 = text$1(", data analysis and statistical analysis in ");
    			span4 = element("span");
    			span4.textContent = "R";
    			t18 = text$1(", GIS analysis and production using ");
    			span5 = element("span");
    			span5.textContent = "QGIS";
    			t20 = text$1(", design tools like ");
    			span6 = element("span");
    			span6.textContent = "figma";
    			t22 = text$1(", and graphics prodution with ");
    			span7 = element("span");
    			span7.textContent = "Illustrator";
    			t24 = text$1(". I'm constantly exploring new technologies as I pursue the best ways to execute ");
    			t25 = text$1(t25_value);
    			t26 = space();
    			div1 = element("div");
    			ul0 = element("ul");
    			li0 = element("li");
    			a1 = element("a");
    			i0 = element("i");
    			t27 = text$1("\n              yuriko.schumacher@gmail.com");
    			t28 = space();
    			li1 = element("li");
    			a2 = element("a");
    			i1 = element("i");
    			t29 = text$1(" 646-668-0656");
    			t30 = space();
    			ul1 = element("ul");
    			li2 = element("li");
    			a3 = element("a");
    			a3.textContent = "Resume";
    			t32 = space();
    			li3 = element("li");
    			a4 = element("a");
    			a4.textContent = "Work";
    			t34 = space();
    			li4 = element("li");
    			a5 = element("a");
    			i2 = element("i");
    			t35 = space();
    			li5 = element("li");
    			a6 = element("a");
    			i3 = element("i");
    			t36 = space();
    			li6 = element("li");
    			a7 = element("a");
    			i4 = element("i");
    			if (!src_url_equal(img.src, img_src_value = "./image/yuriko.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "width", "350");
    			attr_dev(img, "class", "svelte-ivrt5s");
    			add_location(img, file$4, 7, 6, 158);
    			attr_dev(div0, "class", "about__img svelte-ivrt5s");
    			add_location(div0, file$4, 6, 4, 127);
    			add_location(h1, file$4, 10, 6, 257);
    			attr_dev(a0, "href", "https://www.texastribune.org/about/staff/yuriko-schumacher/");
    			attr_dev(a0, "target", "_blank");
    			add_location(a0, file$4, 12, 31, 323);
    			attr_dev(p0, "class", "svelte-ivrt5s");
    			add_location(p0, file$4, 11, 6, 288);
    			attr_dev(span0, "class", "skill svelte-ivrt5s");
    			add_location(span0, file$4, 15, 80, 711);
    			attr_dev(span1, "class", "skill svelte-ivrt5s");
    			add_location(span1, file$4, 15, 117, 748);
    			attr_dev(span2, "class", "skill svelte-ivrt5s");
    			add_location(span2, file$4, 15, 183, 814);
    			attr_dev(span3, "class", "skill svelte-ivrt5s");
    			add_location(span3, file$4, 15, 220, 851);
    			attr_dev(span4, "class", "skill svelte-ivrt5s");
    			add_location(span4, file$4, 15, 299, 930);
    			attr_dev(span5, "class", "skill svelte-ivrt5s");
    			add_location(span5, file$4, 15, 363, 994);
    			attr_dev(span6, "class", "skill svelte-ivrt5s");
    			add_location(span6, file$4, 15, 414, 1045);
    			attr_dev(span7, "class", "skill svelte-ivrt5s");
    			add_location(span7, file$4, 15, 476, 1107);
    			attr_dev(p1, "class", "svelte-ivrt5s");
    			add_location(p1, file$4, 14, 6, 627);
    			attr_dev(i0, "class", "far fa-envelope");
    			add_location(i0, file$4, 21, 15, 1450);
    			attr_dev(a1, "href", "mailto:yuriko.schumacher@gmail.com");
    			add_location(a1, file$4, 20, 12, 1390);
    			attr_dev(li0, "class", "font--special svelte-ivrt5s");
    			add_location(li0, file$4, 19, 10, 1351);
    			attr_dev(i1, "class", "fas fa-phone");
    			add_location(i1, file$4, 27, 15, 1646);
    			attr_dev(a2, "href", "tel:6466680656");
    			add_location(a2, file$4, 26, 12, 1606);
    			attr_dev(li1, "class", "font--special svelte-ivrt5s");
    			add_location(li1, file$4, 25, 10, 1567);
    			attr_dev(ul0, "class", "about__list contact-info svelte-ivrt5s");
    			add_location(ul0, file$4, 18, 8, 1303);
    			attr_dev(a3, "href", "https://github.com/Yuriko-Schumacher/yuriko-schumacher.github.io/blob/main/public/pdf/resume.pdf");
    			attr_dev(a3, "target", "_blank");
    			add_location(a3, file$4, 33, 12, 1817);
    			attr_dev(li2, "class", "font--special svelte-ivrt5s");
    			add_location(li2, file$4, 32, 10, 1778);
    			attr_dev(a4, "href", "#work");
    			add_location(a4, file$4, 36, 12, 2016);
    			attr_dev(li3, "class", "font--special svelte-ivrt5s");
    			add_location(li3, file$4, 35, 10, 1977);
    			attr_dev(i2, "class", "fa-brands fa-x-twitter");
    			add_location(i2, file$4, 40, 15, 2150);
    			attr_dev(a5, "href", "https://x.com/yuriko_a_s");
    			attr_dev(a5, "target", "_blank");
    			add_location(a5, file$4, 39, 12, 2084);
    			attr_dev(li4, "class", "svelte-ivrt5s");
    			add_location(li4, file$4, 38, 10, 2067);
    			attr_dev(i3, "class", "fab fa-github");
    			add_location(i3, file$4, 44, 15, 2314);
    			attr_dev(a6, "href", "https://github.com/Yuriko-Schumacher");
    			attr_dev(a6, "target", "_blank");
    			add_location(a6, file$4, 43, 12, 2236);
    			attr_dev(li5, "class", "svelte-ivrt5s");
    			add_location(li5, file$4, 42, 10, 2219);
    			attr_dev(i4, "class", "fab fa-linkedin");
    			add_location(i4, file$4, 51, 15, 2533);
    			attr_dev(a7, "href", "https://www.linkedin.com/in/yuriko-schumacher/?locale=en_US");
    			attr_dev(a7, "target", "_blank");
    			add_location(a7, file$4, 48, 12, 2404);
    			attr_dev(li6, "class", "svelte-ivrt5s");
    			add_location(li6, file$4, 47, 10, 2387);
    			attr_dev(ul1, "class", "about__list svelte-ivrt5s");
    			add_location(ul1, file$4, 31, 8, 1743);
    			attr_dev(div1, "class", "about__lists svelte-ivrt5s");
    			add_location(div1, file$4, 17, 6, 1268);
    			attr_dev(div2, "class", "about__info svelte-ivrt5s");
    			add_location(div2, file$4, 9, 4, 225);
    			attr_dev(div3, "class", "about__container svelte-ivrt5s");
    			add_location(div3, file$4, 5, 2, 92);
    			attr_dev(div4, "class", "about svelte-ivrt5s");
    			attr_dev(div4, "id", "about");
    			add_location(div4, file$4, 4, 0, 59);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div3);
    			append_dev(div3, div0);
    			append_dev(div0, img);
    			append_dev(div3, t0);
    			append_dev(div3, div2);
    			append_dev(div2, h1);
    			append_dev(div2, t2);
    			append_dev(div2, p0);
    			append_dev(p0, t3);
    			append_dev(p0, a0);
    			append_dev(p0, t5);
    			append_dev(p0, t6);
    			append_dev(div2, t7);
    			append_dev(div2, p1);
    			append_dev(p1, t8);
    			append_dev(p1, span0);
    			append_dev(p1, t10);
    			append_dev(p1, span1);
    			append_dev(p1, t12);
    			append_dev(p1, span2);
    			append_dev(p1, t14);
    			append_dev(p1, span3);
    			append_dev(p1, t16);
    			append_dev(p1, span4);
    			append_dev(p1, t18);
    			append_dev(p1, span5);
    			append_dev(p1, t20);
    			append_dev(p1, span6);
    			append_dev(p1, t22);
    			append_dev(p1, span7);
    			append_dev(p1, t24);
    			append_dev(p1, t25);
    			append_dev(div2, t26);
    			append_dev(div2, div1);
    			append_dev(div1, ul0);
    			append_dev(ul0, li0);
    			append_dev(li0, a1);
    			append_dev(a1, i0);
    			append_dev(a1, t27);
    			append_dev(ul0, t28);
    			append_dev(ul0, li1);
    			append_dev(li1, a2);
    			append_dev(a2, i1);
    			append_dev(a2, t29);
    			append_dev(div1, t30);
    			append_dev(div1, ul1);
    			append_dev(ul1, li2);
    			append_dev(li2, a3);
    			append_dev(ul1, t32);
    			append_dev(ul1, li3);
    			append_dev(li3, a4);
    			append_dev(ul1, t34);
    			append_dev(ul1, li4);
    			append_dev(li4, a5);
    			append_dev(a5, i2);
    			append_dev(ul1, t35);
    			append_dev(ul1, li5);
    			append_dev(li5, a6);
    			append_dev(a6, i3);
    			append_dev(ul1, t36);
    			append_dev(ul1, li6);
    			append_dev(li6, a7);
    			append_dev(a7, i4);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('About', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<About> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ widont: m });
    	return [];
    }

    class About extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "About",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    function slugize(str) {
      return str.replace(" ", "-").toUpperCase();
    }

    /* src/Components/WorkCard.svelte generated by Svelte v3.59.2 */
    const file$3 = "src/Components/WorkCard.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	return child_ctx;
    }

    // (25:22) {#if data.is_featured == "TRUE"}
    function create_if_block_1(ctx) {
    	let i;

    	const block = {
    		c: function create() {
    			i = element("i");
    			attr_dev(i, "class", "fa-solid fa-star svelte-4zr9mq");
    			add_location(i, file$3, 24, 54, 823);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(25:22) {#if data.is_featured == \\\"TRUE\\\"}",
    		ctx
    	});

    	return block;
    }

    // (30:10) {#each data.skill as skill}
    function create_each_block_2(ctx) {
    	let li;
    	let t_value = /*skill*/ ctx[8] + "";
    	let t;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t = text$1(t_value);
    			attr_dev(li, "class", "svelte-4zr9mq");
    			add_location(li, file$3, 30, 12, 1059);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1 && t_value !== (t_value = /*skill*/ ctx[8] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(30:10) {#each data.skill as skill}",
    		ctx
    	});

    	return block;
    }

    // (36:10) {#each data.role as role}
    function create_each_block_1(ctx) {
    	let li;
    	let t_value = /*role*/ ctx[5] + "";
    	let t;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t = text$1(t_value);
    			attr_dev(li, "class", "svelte-4zr9mq");
    			add_location(li, file$3, 36, 12, 1207);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1 && t_value !== (t_value = /*role*/ ctx[5] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(36:10) {#each data.role as role}",
    		ctx
    	});

    	return block;
    }

    // (40:8) {#if data.viz.length != 0}
    function create_if_block(ctx) {
    	let ul;
    	let t;
    	let each_value = /*data*/ ctx[0].viz;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			ul = element("ul");
    			t = text$1("Visualization types:\n            ");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(ul, "class", "works__tools svelte-4zr9mq");
    			add_location(ul, file$3, 40, 10, 1300);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);
    			append_dev(ul, t);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(ul, null);
    				}
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1) {
    				each_value = /*data*/ ctx[0].viz;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(40:8) {#if data.viz.length != 0}",
    		ctx
    	});

    	return block;
    }

    // (43:12) {#each data.viz as viz}
    function create_each_block$1(ctx) {
    	let li;
    	let t_value = /*viz*/ ctx[2] + "";
    	let t;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t = text$1(t_value);
    			attr_dev(li, "class", "svelte-4zr9mq");
    			add_location(li, file$3, 43, 14, 1409);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1 && t_value !== (t_value = /*viz*/ ctx[2] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(43:12) {#each data.viz as viz}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let a;
    	let div6;
    	let div0;
    	let img;
    	let img_src_value;
    	let img_alt_value;
    	let t0;
    	let div5;
    	let div3;
    	let div1;
    	let t1_value = /*formatDate*/ ctx[1](/*data*/ ctx[0].date) + "";
    	let t1;
    	let t2;
    	let div2;
    	let t3_value = /*data*/ ctx[0].media + "";
    	let t3;
    	let t4;
    	let h2;
    	let t5_value = /*data*/ ctx[0].title + "";
    	let t5;
    	let t6;
    	let html_tag;
    	let raw_value = m(/*data*/ ctx[0].description) + "";
    	let t7;
    	let div4;
    	let ul0;
    	let t8;
    	let t9;
    	let ul1;
    	let t10;
    	let t11;
    	let a_href_value;
    	let if_block0 = /*data*/ ctx[0].is_featured == "TRUE" && create_if_block_1(ctx);
    	let each_value_2 = /*data*/ ctx[0].skill;
    	validate_each_argument(each_value_2);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_1[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	let each_value_1 = /*data*/ ctx[0].role;
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	let if_block1 = /*data*/ ctx[0].viz.length != 0 && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			a = element("a");
    			div6 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			div5 = element("div");
    			div3 = element("div");
    			div1 = element("div");
    			t1 = text$1(t1_value);
    			t2 = space();
    			div2 = element("div");
    			t3 = text$1(t3_value);
    			t4 = space();
    			h2 = element("h2");
    			t5 = text$1(t5_value);
    			if (if_block0) if_block0.c();
    			t6 = space();
    			html_tag = new HtmlTag(false);
    			t7 = space();
    			div4 = element("div");
    			ul0 = element("ul");
    			t8 = text$1("Skills:\n          ");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t9 = space();
    			ul1 = element("ul");
    			t10 = text$1("Roles:\n          ");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t11 = space();
    			if (if_block1) if_block1.c();
    			attr_dev(img, "class", " svelte-4zr9mq");
    			attr_dev(img, "loading", "lazy");
    			if (!src_url_equal(img.src, img_src_value = "./image/" + /*data*/ ctx[0].id + "." + /*data*/ ctx[0].img)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "width", "400");
    			attr_dev(img, "alt", img_alt_value = /*data*/ ctx[0].title);
    			add_location(img, file$3, 17, 6, 418);
    			attr_dev(div0, "class", "works__img svelte-4zr9mq");
    			add_location(div0, file$3, 16, 4, 387);
    			attr_dev(div1, "class", "works__date font--special svelte-4zr9mq");
    			add_location(div1, file$3, 21, 8, 620);
    			attr_dev(div2, "class", "works__media font--special");
    			add_location(div2, file$3, 22, 8, 697);
    			attr_dev(div3, "class", "works__info works__info__top svelte-4zr9mq");
    			add_location(div3, file$3, 20, 6, 569);
    			attr_dev(h2, "class", "svelte-4zr9mq");
    			add_location(h2, file$3, 24, 6, 775);
    			html_tag.a = t7;
    			attr_dev(ul0, "class", "works__tools svelte-4zr9mq");
    			add_location(ul0, file$3, 27, 8, 965);
    			attr_dev(ul1, "class", "works__tools svelte-4zr9mq");
    			add_location(ul1, file$3, 33, 8, 1116);
    			attr_dev(div4, "class", "works__info works__info__bottom svelte-4zr9mq");
    			add_location(div4, file$3, 26, 6, 911);
    			attr_dev(div5, "class", "works__description");
    			add_location(div5, file$3, 19, 4, 530);
    			attr_dev(div6, "class", "works__work svelte-4zr9mq");
    			add_location(div6, file$3, 15, 2, 357);
    			attr_dev(a, "href", a_href_value = /*data*/ ctx[0].link);
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "class", "svelte-4zr9mq");
    			add_location(a, file$3, 14, 0, 316);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, div6);
    			append_dev(div6, div0);
    			append_dev(div0, img);
    			append_dev(div6, t0);
    			append_dev(div6, div5);
    			append_dev(div5, div3);
    			append_dev(div3, div1);
    			append_dev(div1, t1);
    			append_dev(div3, t2);
    			append_dev(div3, div2);
    			append_dev(div2, t3);
    			append_dev(div5, t4);
    			append_dev(div5, h2);
    			append_dev(h2, t5);
    			if (if_block0) if_block0.m(h2, null);
    			append_dev(div5, t6);
    			html_tag.m(raw_value, div5);
    			append_dev(div5, t7);
    			append_dev(div5, div4);
    			append_dev(div4, ul0);
    			append_dev(ul0, t8);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				if (each_blocks_1[i]) {
    					each_blocks_1[i].m(ul0, null);
    				}
    			}

    			append_dev(div4, t9);
    			append_dev(div4, ul1);
    			append_dev(ul1, t10);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(ul1, null);
    				}
    			}

    			append_dev(div4, t11);
    			if (if_block1) if_block1.m(div4, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*data*/ 1 && !src_url_equal(img.src, img_src_value = "./image/" + /*data*/ ctx[0].id + "." + /*data*/ ctx[0].img)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*data*/ 1 && img_alt_value !== (img_alt_value = /*data*/ ctx[0].title)) {
    				attr_dev(img, "alt", img_alt_value);
    			}

    			if (dirty & /*data*/ 1 && t1_value !== (t1_value = /*formatDate*/ ctx[1](/*data*/ ctx[0].date) + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*data*/ 1 && t3_value !== (t3_value = /*data*/ ctx[0].media + "")) set_data_dev(t3, t3_value);
    			if (dirty & /*data*/ 1 && t5_value !== (t5_value = /*data*/ ctx[0].title + "")) set_data_dev(t5, t5_value);

    			if (/*data*/ ctx[0].is_featured == "TRUE") {
    				if (if_block0) ; else {
    					if_block0 = create_if_block_1(ctx);
    					if_block0.c();
    					if_block0.m(h2, null);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (dirty & /*data*/ 1 && raw_value !== (raw_value = m(/*data*/ ctx[0].description) + "")) html_tag.p(raw_value);

    			if (dirty & /*data*/ 1) {
    				each_value_2 = /*data*/ ctx[0].skill;
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_2(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(ul0, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_2.length;
    			}

    			if (dirty & /*data*/ 1) {
    				each_value_1 = /*data*/ ctx[0].role;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}

    			if (/*data*/ ctx[0].viz.length != 0) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block(ctx);
    					if_block1.c();
    					if_block1.m(div4, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (dirty & /*data*/ 1 && a_href_value !== (a_href_value = /*data*/ ctx[0].link)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (if_block0) if_block0.d();
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('WorkCard', slots, []);

    	const formatDate = dateString => {
    		const [month, year] = dateString.split('-');
    		const date = new Date(year, month - 1); // month is zero-based
    		return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    	};

    	let { data } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (data === undefined && !('data' in $$props || $$self.$$.bound[$$self.$$.props['data']])) {
    			console.warn("<WorkCard> was created without expected prop 'data'");
    		}
    	});

    	const writable_props = ['data'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<WorkCard> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('data' in $$props) $$invalidate(0, data = $$props.data);
    	};

    	$$self.$capture_state = () => ({ widont: m, formatDate, data });

    	$$self.$inject_state = $$props => {
    		if ('data' in $$props) $$invalidate(0, data = $$props.data);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [data, formatDate];
    }

    class WorkCard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { data: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "WorkCard",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get data() {
    		throw new Error("<WorkCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set data(value) {
    		throw new Error("<WorkCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Work.svelte generated by Svelte v3.59.2 */
    const file$2 = "src/Components/Work.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (17:4) {#each data as d}
    function create_each_block(ctx) {
    	let workcard;
    	let current;

    	workcard = new WorkCard({
    			props: { data: /*d*/ ctx[1] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(workcard.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(workcard, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const workcard_changes = {};
    			if (dirty & /*data*/ 1) workcard_changes.data = /*d*/ ctx[1];
    			workcard.$set(workcard_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(workcard.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(workcard.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(workcard, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(17:4) {#each data as d}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div2;
    	let div0;
    	let h1;
    	let t1;
    	let p;
    	let t2;
    	let i;
    	let t3;
    	let t4_value = m("by date.") + "";
    	let t4;
    	let t5;
    	let div1;
    	let current;
    	let each_value = /*data*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			h1.textContent = "My work:";
    			t1 = space();
    			p = element("p");
    			t2 = text$1("This selection showcases some of my best work, ranging from my projects at Northeastern University to my recent contributions at the Texas Tribune. Stars ");
    			i = element("i");
    			t3 = text$1(" indicate the selection of work that I'm the most proud of. Other ones are sorted ");
    			t4 = text$1(t4_value);
    			t5 = space();
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h1, "class", "svelte-6rzdab");
    			add_location(h1, file$2, 11, 4, 253);
    			attr_dev(i, "class", "fa-solid fa-star");
    			add_location(i, file$2, 12, 161, 432);
    			attr_dev(p, "class", "svelte-6rzdab");
    			add_location(p, file$2, 12, 4, 275);
    			attr_dev(div0, "class", "work__intro svelte-6rzdab");
    			add_location(div0, file$2, 10, 2, 223);
    			attr_dev(div1, "class", "work-cards svelte-6rzdab");
    			add_location(div1, file$2, 15, 2, 583);
    			attr_dev(div2, "id", "work");
    			attr_dev(div2, "class", "svelte-6rzdab");
    			add_location(div2, file$2, 9, 0, 205);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, h1);
    			append_dev(div0, t1);
    			append_dev(div0, p);
    			append_dev(p, t2);
    			append_dev(p, i);
    			append_dev(p, t3);
    			append_dev(p, t4);
    			append_dev(div2, t5);
    			append_dev(div2, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div1, null);
    				}
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*data*/ 1) {
    				each_value = /*data*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div1, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Work', slots, []);
    	let { data } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (data === undefined && !('data' in $$props || $$self.$$.bound[$$self.$$.props['data']])) {
    			console.warn("<Work> was created without expected prop 'data'");
    		}
    	});

    	const writable_props = ['data'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Work> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('data' in $$props) $$invalidate(0, data = $$props.data);
    	};

    	$$self.$capture_state = () => ({
    		widont: m,
    		slugize,
    		WorkCard,
    		filter,
    		group,
    		data
    	});

    	$$self.$inject_state = $$props => {
    		if ('data' in $$props) $$invalidate(0, data = $$props.data);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [data];
    }

    class Work extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { data: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Work",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get data() {
    		throw new Error("<Work>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set data(value) {
    		throw new Error("<Work>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Other.svelte generated by Svelte v3.59.2 */

    const { console: console_1 } = globals;

    function create_fragment$2(ctx) {
    	const block = {
    		c: noop,
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Other', slots, []);
    	let { data } = $$props;
    	console.log(data);

    	$$self.$$.on_mount.push(function () {
    		if (data === undefined && !('data' in $$props || $$self.$$.bound[$$self.$$.props['data']])) {
    			console_1.warn("<Other> was created without expected prop 'data'");
    		}
    	});

    	const writable_props = ['data'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Other> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('data' in $$props) $$invalidate(0, data = $$props.data);
    	};

    	$$self.$capture_state = () => ({ data });

    	$$self.$inject_state = $$props => {
    		if ('data' in $$props) $$invalidate(0, data = $$props.data);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [data];
    }

    class Other extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { data: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Other",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get data() {
    		throw new Error("<Other>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set data(value) {
    		throw new Error("<Other>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Footer.svelte generated by Svelte v3.59.2 */

    const file$1 = "src/Components/Footer.svelte";

    function create_fragment$1(ctx) {
    	let footer;
    	let div1;
    	let div0;
    	let ul0;
    	let li0;
    	let a0;
    	let i0;
    	let t0;
    	let t1;
    	let li1;
    	let a1;
    	let i1;
    	let t2;
    	let t3;
    	let ul1;
    	let li2;
    	let a2;
    	let t5;
    	let li3;
    	let a3;
    	let i2;
    	let t6;
    	let li4;
    	let a4;
    	let i3;
    	let t7;
    	let li5;
    	let a5;
    	let i4;
    	let t8;
    	let div2;
    	let p;

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			div1 = element("div");
    			div0 = element("div");
    			ul0 = element("ul");
    			li0 = element("li");
    			a0 = element("a");
    			i0 = element("i");
    			t0 = text$1(" yuriko.schumacher@gmail.com");
    			t1 = space();
    			li1 = element("li");
    			a1 = element("a");
    			i1 = element("i");
    			t2 = text$1(" 646-668-0656");
    			t3 = space();
    			ul1 = element("ul");
    			li2 = element("li");
    			a2 = element("a");
    			a2.textContent = "Resume";
    			t5 = space();
    			li3 = element("li");
    			a3 = element("a");
    			i2 = element("i");
    			t6 = space();
    			li4 = element("li");
    			a4 = element("a");
    			i3 = element("i");
    			t7 = space();
    			li5 = element("li");
    			a5 = element("a");
    			i4 = element("i");
    			t8 = space();
    			div2 = element("div");
    			p = element("p");
    			p.textContent = "© Yuriko Schumacher 2025";
    			attr_dev(i0, "class", "far fa-envelope");
    			add_location(i0, file$1, 6, 13, 216);
    			attr_dev(a0, "href", "mailto:yuriko.schumacher@gmail.com");
    			add_location(a0, file$1, 5, 10, 158);
    			attr_dev(li0, "class", "font--special svelte-avky4g");
    			add_location(li0, file$1, 4, 8, 121);
    			attr_dev(i1, "class", "fas fa-phone");
    			add_location(i1, file$1, 11, 13, 388);
    			attr_dev(a1, "href", "tel:6466680656");
    			add_location(a1, file$1, 10, 10, 350);
    			attr_dev(li1, "class", "font--special svelte-avky4g");
    			add_location(li1, file$1, 9, 8, 313);
    			attr_dev(ul0, "class", "about__list contact-info svelte-avky4g");
    			add_location(ul0, file$1, 3, 6, 75);
    			attr_dev(a2, "href", "https://github.com/Yuriko-Schumacher/yuriko-schumacher.github.io/blob/main/public/pdf/resume.pdf");
    			attr_dev(a2, "target", "_blank");
    			add_location(a2, file$1, 17, 10, 547);
    			attr_dev(li2, "class", "font--special svelte-avky4g");
    			add_location(li2, file$1, 16, 8, 510);
    			attr_dev(i2, "class", "fa-brands fa-x-twitter");
    			add_location(i2, file$1, 21, 13, 782);
    			attr_dev(a3, "href", "https://x.com/yuriko_a_s");
    			attr_dev(a3, "target", "_blank");
    			add_location(a3, file$1, 20, 10, 718);
    			attr_dev(li3, "class", "svelte-avky4g");
    			add_location(li3, file$1, 19, 8, 703);
    			attr_dev(i3, "class", "fab fa-github");
    			add_location(i3, file$1, 26, 13, 949);
    			attr_dev(a4, "href", "https://github.com/Yuriko-Schumacher");
    			attr_dev(a4, "target", "_blank");
    			add_location(a4, file$1, 25, 10, 873);
    			attr_dev(li4, "class", "svelte-avky4g");
    			add_location(li4, file$1, 24, 8, 858);
    			attr_dev(i4, "class", "fab fa-linkedin");
    			add_location(i4, file$1, 33, 13, 1154);
    			attr_dev(a5, "href", "https://www.linkedin.com/in/yuriko-schumacher/?locale=en_US");
    			attr_dev(a5, "target", "_blank");
    			add_location(a5, file$1, 30, 10, 1031);
    			attr_dev(li5, "class", "svelte-avky4g");
    			add_location(li5, file$1, 29, 8, 1016);
    			attr_dev(ul1, "class", "about__list svelte-avky4g");
    			add_location(ul1, file$1, 15, 6, 477);
    			attr_dev(div0, "class", "about__lists svelte-avky4g");
    			add_location(div0, file$1, 2, 4, 42);
    			attr_dev(div1, "class", "footer__info");
    			add_location(div1, file$1, 1, 2, 11);
    			attr_dev(p, "class", "font--special");
    			add_location(p, file$1, 40, 4, 1274);
    			attr_dev(div2, "class", "credit");
    			add_location(div2, file$1, 39, 2, 1249);
    			add_location(footer, file$1, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);
    			append_dev(footer, div1);
    			append_dev(div1, div0);
    			append_dev(div0, ul0);
    			append_dev(ul0, li0);
    			append_dev(li0, a0);
    			append_dev(a0, i0);
    			append_dev(a0, t0);
    			append_dev(ul0, t1);
    			append_dev(ul0, li1);
    			append_dev(li1, a1);
    			append_dev(a1, i1);
    			append_dev(a1, t2);
    			append_dev(div0, t3);
    			append_dev(div0, ul1);
    			append_dev(ul1, li2);
    			append_dev(li2, a2);
    			append_dev(ul1, t5);
    			append_dev(ul1, li3);
    			append_dev(li3, a3);
    			append_dev(a3, i2);
    			append_dev(ul1, t6);
    			append_dev(ul1, li4);
    			append_dev(li4, a4);
    			append_dev(a4, i3);
    			append_dev(ul1, t7);
    			append_dev(ul1, li5);
    			append_dev(li5, a5);
    			append_dev(a5, i4);
    			append_dev(footer, t8);
    			append_dev(footer, div2);
    			append_dev(div2, p);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Footer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.59.2 */
    const file = "src/App.svelte";

    // (1:0) <script>   import { csv, json }
    function create_catch_block(ctx) {
    	const block = {
    		c: noop,
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_catch_block.name,
    		type: "catch",
    		source: "(1:0) <script>   import { csv, json }",
    		ctx
    	});

    	return block;
    }

    // (41:28)      <Work data={datasets[0]}
    function create_then_block(ctx) {
    	let work;
    	let current;

    	work = new Work({
    			props: { data: /*datasets*/ ctx[0][0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(work.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(work, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const work_changes = {};
    			if (dirty & /*datasets*/ 1) work_changes.data = /*datasets*/ ctx[0][0];
    			work.$set(work_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(work.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(work.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(work, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_then_block.name,
    		type: "then",
    		source: "(41:28)      <Work data={datasets[0]}",
    		ctx
    	});

    	return block;
    }

    // (1:0) <script>   import { csv, json }
    function create_pending_block(ctx) {
    	const block = {
    		c: noop,
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_pending_block.name,
    		type: "pending",
    		source: "(1:0) <script>   import { csv, json }",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let navbar;
    	let t0;
    	let about;
    	let t1;
    	let t2;
    	let footer;
    	let current;
    	navbar = new NavBar({ $$inline: true });
    	about = new About({ $$inline: true });

    	let info = {
    		ctx,
    		current: null,
    		token: null,
    		hasCatch: false,
    		pending: create_pending_block,
    		then: create_then_block,
    		catch: create_catch_block,
    		value: 3,
    		blocks: [,,,]
    	};

    	handle_promise(/*promise*/ ctx[1], info);
    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(navbar.$$.fragment);
    			t0 = space();
    			create_component(about.$$.fragment);
    			t1 = space();
    			info.block.c();
    			t2 = space();
    			create_component(footer.$$.fragment);
    			add_location(main, file, 37, 0, 1173);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(navbar, main, null);
    			append_dev(main, t0);
    			mount_component(about, main, null);
    			append_dev(main, t1);
    			info.block.m(main, info.anchor = null);
    			info.mount = () => main;
    			info.anchor = t2;
    			append_dev(main, t2);
    			mount_component(footer, main, null);
    			current = true;
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			update_await_block_branch(info, ctx, dirty);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navbar.$$.fragment, local);
    			transition_in(about.$$.fragment, local);
    			transition_in(info.block);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(navbar.$$.fragment, local);
    			transition_out(about.$$.fragment, local);

    			for (let i = 0; i < 3; i += 1) {
    				const block = info.blocks[i];
    				transition_out(block);
    			}

    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(navbar);
    			destroy_component(about);
    			info.block.d();
    			info.token = null;
    			info = null;
    			destroy_component(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let { datasets = [] } = $$props;
    	let promise = getData();

    	async function getData() {
    		let workD = await csv("data/work.csv");
    		workD = workD.sort((a, b) => a.is_featured - b.is_featured);

    		workD = workD.map(d => {
    			const newD = {};
    			newD.date = d.date;
    			newD.description = d.description;
    			newD.id = d.id;
    			newD.img = d.img;
    			newD.is_featured = d.is_featured;
    			newD.is_interactive = d.is_interactive;
    			newD.link = d.link;
    			newD.media = d.media;
    			newD.role = [d.role_1, d.role_2, d.role_3, d.role_4].filter(r => r != "");
    			newD.skill = [d.skill_1, d.skill_2, d.skill_3].filter(s => s != "");
    			newD.viz = [d.viz_1, d.viz_2, d.viz_3, d.viz_4, d.viz_5].filter(v => v != "");
    			newD.title = d.title;
    			return newD;
    		});

    		let otherD = await csv("data/other.csv");
    		$$invalidate(0, datasets = [workD, otherD]);
    	}

    	const writable_props = ['datasets'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('datasets' in $$props) $$invalidate(0, datasets = $$props.datasets);
    	};

    	$$self.$capture_state = () => ({
    		csv,
    		json,
    		NavBar,
    		About,
    		Work,
    		Other,
    		Footer,
    		datasets,
    		promise,
    		getData
    	});

    	$$self.$inject_state = $$props => {
    		if ('datasets' in $$props) $$invalidate(0, datasets = $$props.datasets);
    		if ('promise' in $$props) $$invalidate(1, promise = $$props.promise);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [datasets, promise];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { datasets: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}

    	get datasets() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set datasets(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const app = new App({
      target: document.body,
      props: {},
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
