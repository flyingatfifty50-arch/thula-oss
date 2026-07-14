/* @ds-bundle: {"format":3,"namespace":"ThulaTravelDesignSystem_e4d756","components":[],"sourceHashes":{"social/image-slot.js":"9309434cb09c","ui_kits/website/chrome.jsx":"5c70fd66ed2f","ui_kits/website/image-slot.js":"cf5f1791dd04","ui_kits/website/pages1.jsx":"a38a160dea09","ui_kits/website/pages2.jsx":"060df98fd831","ui_kits/website/tweaks-panel.jsx":"7f64c6909a8b","ui_kits/website/ui.jsx":"d353f904e26d"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ThulaTravelDesignSystem_e4d756 = window.ThulaTravelDesignSystem_e4d756 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// social/image-slot.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever you want the user to
 * supply an image. You control the slot's shape and size; the user fills it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The host bridge only allows sidecar writes at the project root, so the
 * HTML that uses this component is assumed to live at the project root too
 * (same constraint as design_canvas.jsx).
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          object-fit: cover | contain | fill.       (default 'cover')
 *                With cover (the default) double-clicking the filled slot
 *                enters a reframe mode: the whole image spills past the mask
 *                (translucent outside, opaque inside), drag to reposition,
 *                corner-drag to scale. The crop persists alongside the image
 *                in the sidecar. contain/fill stay static.
 *   position     object-position for fit=contain|fill.     (default '50% 50%')
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. A user drop overrides
 *                it; clearing the drop reveals src again.
 *
 * Size and layout come from ordinary CSS on the element — width/height
 * inline or from a parent grid — so it composes with any layout.
 *
 * Usage:
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet = ':host{display:inline-block;position:relative;vertical-align:top;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;color:rgba(0,0,0,.55);width:240px;height:160px}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(0,0,0,.04)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  '.spill{position:absolute;transform:translate(-50%,-50%);display:none;z-index:1;' + '  cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .spill{display:block}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px;text-decoration-color:rgba(0,0,0,.25)}' + '.empty:hover .sub u{color:rgba(0,0,0,.75);text-decoration-color:currentColor}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed rgba(0,0,0,.25);' + '  transition:border-color .12s}' + ':host([data-over]) .ring{border-color:#c96442}' + ':host([data-filled]) .ring{display:none}' +
  // Controls sit BELOW the mask (top:100%), absolutely positioned so the
  // author-declared slot height is unaffected. The gap is padding, not a
  // top offset, so the hover target stays contiguous with the frame.
  '.ctl{position:absolute;top:100%;left:50%;transform:translateX(-50%);padding-top:8px;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'position', 'placeholder', 'src', 'id'];
    }
    constructor() {
      super();
      const root = this.attachShadow({
        mode: 'open'
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="ring" part="ring"></div>' + '</div>' + '<div class="spill">' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' + '<div class="ctl"><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="clear" title="Remove image">Remove</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (act === 'replace') {
          this._exitReframe(true);
          this._input.click();
        }
        if (act === 'clear') {
          this._exitReframe(false);
          this._gen++;
          this._local = null;
          if (this.id) setSlot(this.id, null);else this._render();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      this._img.addEventListener('load', () => this._applyView());
      // Gated on editable + fit=cover so share links and contain/fill slots
      // stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const base = Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (commit) this._commitView();
    }
    attributeChangedCallback() {
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is only meaningful for fit=cover — contain/fill
    // keep the old object-fit path and double-click is a no-op.
    _reframes() {
      return this.hasAttribute('data-filled') && (this.getAttribute('fit') || 'cover') === 'cover';
    }

    // Cover-baseline geometry, shared by clamp/apply/resize. Null until the
    // img has loaded (naturalWidth is 0 before that) or when the slot has no
    // layout box — ResizeObserver fires with a 0×0 rect under display:none,
    // and clamping against a degenerate 1×1 frame would silently pull the
    // stored pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      return {
        iw,
        ih,
        fw,
        fh,
        base: Math.max(fw / iw, fh / ih)
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      const fit = this.getAttribute('fit') || 'cover';
      if (fit !== 'cover' || !g) {
        // Non-cover, or dimensions not known yet (before img load).
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = fit;
        this._img.style.objectPosition = this.getAttribute('position') || '50% 50%';
        return;
      }
      // Cover baseline: img fills the frame on its tighter axis at s=1, so
      // pan works immediately on the overflowing axis without zooming first.
      // Width/height and left/top are all frame-% — depends only on the
      // frame aspect ratio, so a responsive resize keeps the same crop. The
      // spill layer mirrors the same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      this._spill.style.width = w;
      this._spill.style.height = h;
      this._spill.style.left = l;
      this._spill.style.top = t;
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      if (url) {
        if (this._img.getAttribute('src') !== url) {
          this._img.src = url;
          this._ghost.src = url;
        }
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        this._empty.style.display = 'flex';
        this.removeAttribute('data-filled');
      }
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "social/image-slot.js", error: String((e && e.message) || e) }); }

// ui_kits/website/chrome.jsx
try { (() => {
/* ===========================================================
   THULA TRAVEL — NavBar + Footer (chrome)
   =========================================================== */

const TT_NAV = [{
  id: 'hero',
  label: 'Home'
}, {
  id: 'about',
  label: 'About'
}, {
  id: 'packages',
  label: 'Retreats'
}, {
  id: 'blog',
  label: 'Journal'
}, {
  id: 'cta',
  label: 'Contact'
}];
function NavBar({
  page,
  onNav,
  dark = false
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const sc = document.querySelector('.tt-scroll');
    if (!sc) return;
    const onScroll = () => setScrolled(sc.scrollTop > 24);
    sc.addEventListener('scroll', onScroll);
    return () => sc.removeEventListener('scroll', onScroll);
  }, []);
  const onDarkHero = dark && !scrolled;
  const fg = onDarkHero ? 'var(--fg-on-dark)' : 'var(--ink)';
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      transition: 'all var(--dur) var(--ease-soft)',
      background: scrolled ? 'rgba(251,244,233,0.86)' : dark ? 'linear-gradient(180deg, rgba(51,39,31,0.42), rgba(51,39,31,0))' : 'transparent',
      backdropFilter: scrolled ? 'saturate(1.4) blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '18px 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => onNav('hero'),
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 30,
    color: fg,
    tagline: true
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, TT_NAV.map(n => {
    const active = page === n.id;
    return /*#__PURE__*/React.createElement("button", {
      key: n.id,
      onClick: () => onNav(n.id),
      style: {
        fontFamily: 'var(--font-serif)',
        fontWeight: active ? 600 : 500,
        fontSize: 15.5,
        color: fg,
        opacity: active ? 1 : 0.78,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '8px 14px',
        borderRadius: 'var(--r-pill)',
        position: 'relative',
        transition: 'opacity var(--dur)'
      },
      onMouseEnter: e => e.currentTarget.style.opacity = 1,
      onMouseLeave: e => e.currentTarget.style.opacity = active ? 1 : 0.78
    }, n.label, active && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: '50%',
        bottom: 2,
        transform: 'translateX(-50%)',
        width: 5,
        height: 5,
        borderRadius: 999,
        background: 'var(--primary)'
      }
    }));
  })), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: onDarkHero ? 'ghost' : 'primary',
    iconRight: "arrow-right",
    onClick: () => onNav('cta')
  }, "Plan your retreat")));
}
function Footer({
  onNav
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--forest-700)',
      color: 'var(--fg-on-dark)',
      paddingTop: 'var(--s-9)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '0 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.6fr 1fr 1fr 1.4fr',
      gap: 48,
      paddingBottom: 'var(--s-8)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Wordmark, {
    size: 36,
    color: "var(--fg-on-dark)",
    tagline: true
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'rgba(251,244,233,0.72)',
      marginTop: 18,
      maxWidth: 300,
      fontSize: 16
    }
  }, "Thula means \u201Cbe still.\u201D We craft quiet, bespoke wellness escapes across South Africa \u2014 made for women who need to exhale."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 22
    }
  }, ['instagram', 'facebook', 'youtube'].map(s => /*#__PURE__*/React.createElement("span", {
    key: s,
    style: {
      width: 42,
      height: 42,
      borderRadius: 999,
      display: 'grid',
      placeItems: 'center',
      border: '1px solid rgba(251,244,233,0.28)',
      color: 'rgba(251,244,233,0.85)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s,
    size: 18
  }))))), [{
    h: 'Explore',
    items: [['Retreats', 'packages'], ['The Journal', 'blog'], ['Our story', 'about'], ['Contact', 'cta']]
  }, {
    h: 'Retreats',
    items: [['Cederberg Stillness', 'packages'], ['Winelands Restore', 'packages'], ['Wild Coast Reset', 'packages'], ['Kruger Quiet', 'packages']]
  }].map(col => /*#__PURE__*/React.createElement("div", {
    key: col.h
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 600,
      fontSize: 15,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--amber-400)',
      marginBottom: 18
    }
  }, col.h), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, col.items.map(([t, id]) => /*#__PURE__*/React.createElement("li", {
    key: t
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => onNav(id),
    style: {
      color: 'rgba(251,244,233,0.78)',
      cursor: 'pointer',
      fontSize: 15.5,
      textDecoration: 'none'
    }
  }, t)))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 600,
      fontSize: 15,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--amber-400)',
      marginBottom: 18
    }
  }, "Stay close"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'rgba(251,244,233,0.72)',
      fontSize: 15.5,
      marginBottom: 16
    }
  }, "Slow letters, no noise. The occasional sunset and a spot before anyone else."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      background: 'rgba(251,244,233,0.08)',
      borderRadius: 'var(--r-pill)',
      padding: 6,
      border: '1px solid rgba(251,244,233,0.2)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "your email",
    style: {
      flex: 1,
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: 'var(--fg-on-dark)',
      fontFamily: 'var(--font-serif)',
      fontSize: 15,
      padding: '8px 14px'
    }
  }), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "primary",
    icon: "send",
    style: {
      padding: '10px 16px'
    }
  }, '')))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid rgba(251,244,233,0.18)',
      padding: '26px 0 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'rgba(251,244,233,0.6)',
      fontSize: 14
    }
  }, "\xA9 2026 Thula Travel \xB7 Made slowly in South Africa \uD83C\uDDFF\uD83C\uDDE6"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 26
    }
  }, ['Privacy', 'Terms', 'Responsible travel'].map(t => /*#__PURE__*/React.createElement("a", {
    key: t,
    style: {
      color: 'rgba(251,244,233,0.6)',
      fontSize: 14,
      cursor: 'pointer',
      textDecoration: 'none'
    }
  }, t))))));
}
Object.assign(window, {
  NavBar,
  Footer,
  TT_NAV
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/image-slot.js
try { (() => {
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever you want the user to
 * supply an image. You control the slot's shape and size; the user fills it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The host bridge only allows sidecar writes at the project root, so the
 * HTML that uses this component is assumed to live at the project root too
 * (same constraint as design_canvas.jsx).
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          object-fit: cover | contain | fill.       (default 'cover')
 *                With cover (the default) double-clicking the filled slot
 *                enters a reframe mode: the whole image spills past the mask
 *                (translucent outside, opaque inside), drag to reposition,
 *                corner-drag to scale. The crop persists alongside the image
 *                in the sidecar. contain/fill stay static.
 *   position     object-position for fit=contain|fill.     (default '50% 50%')
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. A user drop overrides
 *                it; clearing the drop reveals src again.
 *
 * Size and layout come from ordinary CSS on the element — width/height
 * inline or from a parent grid — so it composes with any layout.
 *
 * Usage:
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet = ':host{display:inline-block;position:relative;vertical-align:top;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;color:rgba(0,0,0,.55);width:240px;height:160px}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(0,0,0,.04)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  '.spill{position:absolute;transform:translate(-50%,-50%);display:none;z-index:1;' + '  cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .spill{display:block}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px;text-decoration-color:rgba(0,0,0,.25)}' + '.empty:hover .sub u{color:rgba(0,0,0,.75);text-decoration-color:currentColor}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed rgba(0,0,0,.25);' + '  transition:border-color .12s}' + ':host([data-over]) .ring{border-color:#c96442}' + ':host([data-filled]) .ring{display:none}' +
  // Controls sit BELOW the mask (top:100%), absolutely positioned so the
  // author-declared slot height is unaffected. The gap is padding, not a
  // top offset, so the hover target stays contiguous with the frame.
  '.ctl{position:absolute;top:100%;left:50%;transform:translateX(-50%);padding-top:8px;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'position', 'placeholder', 'src', 'id'];
    }
    constructor() {
      super();
      const root = this.attachShadow({
        mode: 'open'
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="ring" part="ring"></div>' + '</div>' + '<div class="spill">' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' + '<div class="ctl"><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="clear" title="Remove image">Remove</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (act === 'replace') {
          this._exitReframe(true);
          this._input.click();
        }
        if (act === 'clear') {
          this._exitReframe(false);
          this._gen++;
          this._local = null;
          if (this.id) setSlot(this.id, null);else this._render();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      this._img.addEventListener('load', () => this._applyView());
      // Gated on editable + fit=cover so share links and contain/fill slots
      // stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const base = Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (commit) this._commitView();
    }
    attributeChangedCallback() {
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is only meaningful for fit=cover — contain/fill
    // keep the old object-fit path and double-click is a no-op.
    _reframes() {
      return this.hasAttribute('data-filled') && (this.getAttribute('fit') || 'cover') === 'cover';
    }

    // Cover-baseline geometry, shared by clamp/apply/resize. Null until the
    // img has loaded (naturalWidth is 0 before that) or when the slot has no
    // layout box — ResizeObserver fires with a 0×0 rect under display:none,
    // and clamping against a degenerate 1×1 frame would silently pull the
    // stored pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      return {
        iw,
        ih,
        fw,
        fh,
        base: Math.max(fw / iw, fh / ih)
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      const fit = this.getAttribute('fit') || 'cover';
      if (fit !== 'cover' || !g) {
        // Non-cover, or dimensions not known yet (before img load).
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = fit;
        this._img.style.objectPosition = this.getAttribute('position') || '50% 50%';
        return;
      }
      // Cover baseline: img fills the frame on its tighter axis at s=1, so
      // pan works immediately on the overflowing axis without zooming first.
      // Width/height and left/top are all frame-% — depends only on the
      // frame aspect ratio, so a responsive resize keeps the same crop. The
      // spill layer mirrors the same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      this._spill.style.width = w;
      this._spill.style.height = h;
      this._spill.style.left = l;
      this._spill.style.top = t;
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      if (url) {
        if (this._img.getAttribute('src') !== url) {
          this._img.src = url;
          this._ghost.src = url;
        }
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        this._empty.style.display = 'flex';
        this.removeAttribute('data-filled');
      }
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/image-slot.js", error: String((e && e.message) || e) }); }

// ui_kits/website/pages1.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* ===========================================================
   THULA TRAVEL — Hero page + About page
   =========================================================== */

function Stat({
  n,
  label
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 700,
      fontSize: 38,
      color: 'var(--clay-600)',
      lineHeight: 1
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    className: "small",
    style: {
      marginTop: 6
    }
  }, label));
}
function HeroPage({
  onNav
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      minHeight: '92vh',
      display: 'flex',
      alignItems: 'center',
      background: FIGURE_GRADIENTS.sunset,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'url(../../assets/photos/hero-capetown.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center 38%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(90deg, rgba(20,30,18,0.72) 0%, rgba(20,30,18,0.42) 38%, rgba(20,30,18,0.08) 70%, rgba(20,30,18,0) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(158,32,25,0.18) 0%, transparent 30%, transparent 60%, rgba(11,74,46,0.42) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0.10,
      mixBlendMode: 'overlay',
      backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 0.6px, transparent 0.6px)',
      backgroundSize: '4px 4px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 1240,
      margin: '0 auto',
      padding: '120px 40px 80px',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    tone: "amber",
    icon: "map-pin"
  }, "Bespoke retreats \xB7 South Africa"), /*#__PURE__*/React.createElement("h1", {
    style: {
      color: 'var(--fg-on-clay)',
      marginTop: 22,
      fontSize: 'clamp(3rem, 7vw, 6rem)'
    }
  }, "Come be still"), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      color: 'rgba(255,251,244,0.94)',
      maxWidth: 560,
      marginTop: 18,
      fontSize: 22
    }
  }, "Quiet, hand-crafted wellness escapes for women \u2014 where the only thing on the itinerary is you. No noise. No rush. Just sunsets you\u2019ll feel in your chest."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginTop: 34,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "primary",
    iconRight: "arrow-right",
    onClick: () => onNav('packages')
  }, "Find your retreat"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "ghost",
    icon: "play",
    onClick: () => onNav('about')
  }, "Why Thula")))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 26,
      left: '50%',
      transform: 'translateX(-50%)',
      color: 'rgba(255,251,244,0.8)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-serif)',
      fontStyle: 'italic',
      fontSize: 14
    }
  }, "scroll, slowly ", /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down",
    size: 18
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--card)',
      borderBottom: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '34px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow",
    style: {
      color: 'var(--ink-mute)'
    }
  }, "As felt by women in"), ['Cape Town', 'London', 'New York', 'Nairobi', 'Berlin'].map(c => /*#__PURE__*/React.createElement("span", {
    key: c,
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 600,
      fontSize: 19,
      color: 'var(--ink-soft)'
    }
  }, c)))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--bg)',
      padding: '110px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '0 40px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 72,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "The Thula way"), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 18
    }
  }, "Travel that gives you back to yourself"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 20,
      fontSize: 18
    }
  }, "We don\u2019t do bucket lists. We do unhurried mornings, slow walks through fynbos, and dinners where nobody checks their phone. Every retreat is built by hand around one woman, or one small circle of them \u2014 with safety, comfort and quiet held tightly throughout."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 48,
      marginTop: 38
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    n: "11",
    label: "Retreats across SA"
  }), /*#__PURE__*/React.createElement(Stat, {
    n: "6",
    label: "Women, max, per circle"
  }), /*#__PURE__*/React.createElement(Stat, {
    n: "100%",
    label: "Female-guided"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconRight: "arrow-right",
    onClick: () => onNav('about')
  }, "Read our story"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Figure, {
    variant: "fynbos",
    height: 300,
    label: "Fynbos trail, Cederberg",
    style: {
      marginTop: 36
    }
  }), /*#__PURE__*/React.createElement(Figure, {
    variant: "dusk",
    height: 300,
    label: "Sundowners, Wild Coast"
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--sand)',
      padding: '110px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '0 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Where you could be"), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 16
    }
  }, "A few quiet corners we love")), /*#__PURE__*/React.createElement(Button, {
    variant: "soft",
    iconRight: "arrow-right",
    onClick: () => onNav('packages')
  }, "See all retreats")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 24,
      marginTop: 44
    }
  }, [{
    v: 'savanna',
    t: 'Cederberg Stillness',
    d: '5 nights · mountain quiet',
    p: 'from R24,500',
    tone: 'clay'
  }, {
    v: 'eucalyptus',
    t: 'Winelands Restore',
    d: '4 nights · vineyard & spa',
    p: 'from R21,000',
    tone: 'sage'
  }, {
    v: 'dusk',
    t: 'Wild Coast Reset',
    d: '6 nights · ocean & wild',
    p: 'from R27,800',
    tone: 'plum'
  }].map(c => /*#__PURE__*/React.createElement(RetreatCard, _extends({
    key: c.t
  }, c, {
    onNav: onNav
  })))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--forest-600)',
      padding: '120px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 940,
      margin: '0 auto',
      padding: '0 40px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "quote",
    size: 42,
    style: {
      color: 'var(--amber-400)',
      justifyContent: 'center'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 500,
      fontStyle: 'italic',
      fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
      lineHeight: 1.4,
      color: 'var(--fg-on-dark)',
      marginTop: 20
    }
  }, "\u201CI arrived holding my breath. By the third sunset I\u2019d forgotten I was holding anything at all.\u201D"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26,
      color: 'var(--amber-300)',
      fontFamily: 'var(--font-serif)',
      fontWeight: 600
    }
  }, "Lindiwe M. \xB7 Cederberg, 2025"))));
}
function RetreatCard({
  v,
  t,
  d,
  p,
  tone,
  onNav,
  span
}) {
  const [hover, setHover] = useState(false);
  return /*#__PURE__*/React.createElement("article", {
    onClick: () => onNav && onNav('packages'),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--card)',
      borderRadius: 'var(--r-lg)',
      overflow: 'hidden',
      cursor: 'pointer',
      border: '1px solid var(--line)',
      boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
      transform: hover ? 'translateY(-4px)' : 'none',
      transition: 'all var(--dur) var(--ease)',
      gridColumn: span ? 'span 2' : 'auto'
    }
  }, /*#__PURE__*/React.createElement(Figure, {
    variant: v,
    height: 210,
    radius: "0",
    label: t
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '22px 24px 26px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 22
    }
  }, t), /*#__PURE__*/React.createElement(Pill, {
    tone: tone
  }, p)), /*#__PURE__*/React.createElement("p", {
    className: "small",
    style: {
      marginTop: 8
    }
  }, d), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 18,
      color: 'var(--primary)',
      fontFamily: 'var(--font-serif)',
      fontWeight: 600,
      fontSize: 15
    }
  }, "Explore this retreat ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 16,
    style: {
      transform: hover ? 'translateX(4px)' : 'none',
      transition: 'transform var(--dur)'
    }
  }))));
}
function AboutPage({
  onNav
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg)'
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--blush-100)',
      padding: '130px 0 90px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1000,
      margin: '0 auto',
      padding: '0 40px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    center: true
  }, "Our story"), /*#__PURE__*/React.createElement("h1", {
    style: {
      marginTop: 18
    }
  }, "We built the trip we needed"), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: 680,
      margin: '22px auto 0'
    }
  }, "Thula started with two friends, one burnt-out year, and a borrowed cottage in the Cederberg. We came home different. So we made it our work to give that to other women."))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '40px 0 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 'min(56vw, 560px)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'url(../../assets/photos/winelands-pano.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center 42%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, var(--paper) 0%, rgba(251,244,233,0) 14%, rgba(251,244,233,0) 84%, var(--paper) 100%)'
    }
  }), /*#__PURE__*/React.createElement("figcaption", {
    className: "small",
    style: {
      position: 'absolute',
      right: 20,
      bottom: 16,
      fontStyle: 'italic',
      color: 'rgba(255,251,244,0.92)',
      textShadow: '0 1px 10px rgba(20,30,18,0.5)'
    }
  }, "The Winelands at last light \xB7 Franschhoek"))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '20px 0 100px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '0 40px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 72
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Quiet is a craft")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18
    }
  }, "Anyone can book a hotel. Building genuine quiet takes work \u2014 the kind nobody sees. We choose places far from noise, guides who know when not to speak, and itineraries with deliberate gaps in them. We handle every logistic so you handle nothing."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      marginTop: 18
    }
  }, "And because we\u2019re women planning for women, the things that usually go unsaid \u2014 safety, privacy, dietary needs, the freedom to do absolutely nothing \u2014 are the first things we plan for.")))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--sand)',
      padding: '100px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '0 40px'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "What we hold close"), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 16,
      maxWidth: 600
    }
  }, "Five things we\u2019ll never rush"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 22,
      marginTop: 44
    }
  }, [{
    i: 'shield-check',
    t: 'Safety, quietly',
    d: 'Vetted stays, female guides, and someone awake so you can truly sleep.'
  }, {
    i: 'leaf',
    t: 'Light on the land',
    d: 'Small groups, local hosts, and partners who give back to the places we visit.'
  }, {
    i: 'heart-handshake',
    t: 'Made for you',
    d: 'Every retreat bespoke — your pace, your needs, your version of rest.'
  }, {
    i: 'users',
    t: 'Real circles',
    d: 'Six women, maximum. Enough for warmth, never enough for noise.'
  }, {
    i: 'sun',
    t: 'Slow on purpose',
    d: 'Gaps in the itinerary are the itinerary. Doing nothing counts.'
  }, {
    i: 'map',
    t: 'Deeply local',
    d: 'South Africa shown by the people who love it most — never a tour-bus view.'
  }].map(v => /*#__PURE__*/React.createElement(ValueCard, _extends({
    key: v.t
  }, v)))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '100px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '0 40px'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "The hands behind it"), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 16
    }
  }, "Two founders, one obsession with rest"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 28,
      marginTop: 44
    }
  }, [{
    v: 'dusk',
    n: 'Naledi Khumalo',
    r: 'Co-founder · Experience',
    q: '“Rest isn’t a reward. It’s the whole point.”'
  }, {
    v: 'fynbos',
    n: 'Sofia Pretorius',
    r: 'Co-founder · Journeys',
    q: '“I plan the trip so you can lose track of it.”'
  }].map(f => /*#__PURE__*/React.createElement("div", {
    key: f.n,
    style: {
      display: 'flex',
      gap: 22,
      alignItems: 'center',
      background: 'var(--card)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--r-lg)',
      padding: 22,
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement(Figure, {
    variant: f.v,
    height: 150,
    style: {
      width: 150,
      flexShrink: 0
    },
    radius: "var(--r-md)"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 21
    }
  }, f.n), /*#__PURE__*/React.createElement("div", {
    className: "small",
    style: {
      color: 'var(--primary)',
      fontWeight: 600
    }
  }, f.r), /*#__PURE__*/React.createElement("p", {
    style: {
      fontStyle: 'italic',
      marginTop: 12,
      fontSize: 16
    }
  }, f.q))))))));
}
function ValueCard({
  i,
  t,
  d
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--card)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--r-lg)',
      padding: '28px 26px',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 52,
      height: 52,
      borderRadius: 'var(--r-md)',
      background: 'var(--clay-100)',
      display: 'grid',
      placeItems: 'center',
      color: 'var(--clay-600)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: i,
    size: 24
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 20,
      marginTop: 18
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 8,
      fontSize: 16
    }
  }, d));
}
Object.assign(window, {
  HeroPage,
  AboutPage,
  RetreatCard,
  ValueCard,
  Stat
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/pages1.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/pages2.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* ===========================================================
   THULA TRAVEL — Packages, Journal (blog), CTA pages
   =========================================================== */

const TT_PACKAGES = [{
  v: 'savanna',
  t: 'Cederberg Stillness',
  d: 'Red-rock silence, rooibos at dawn, and star-fields with no city glow. The original Thula.',
  nights: '5 nights',
  who: 'Solo or 2',
  p: 'R24,500',
  tags: ['Mountain', 'Stargazing', 'Digital detox'],
  tone: 'clay'
}, {
  v: 'eucalyptus',
  t: 'Winelands Restore',
  d: 'Slow vineyard mornings, long spa afternoons, and dinners that taste like the season.',
  nights: '4 nights',
  who: 'Up to 4',
  p: 'R21,000',
  tags: ['Spa', 'Wine', 'Gentle'],
  tone: 'sage'
}, {
  v: 'dusk',
  t: 'Wild Coast Reset',
  d: 'Empty beaches, sea air, and the kind of horizon that puts everything back in proportion.',
  nights: '6 nights',
  who: 'Up to 6',
  p: 'R27,800',
  tags: ['Ocean', 'Walking', 'Wild'],
  tone: 'plum'
}, {
  v: 'sunset',
  t: 'Kruger Quiet',
  d: 'Game drives without the crowds, then hammock afternoons. Awe and rest, in one place.',
  nights: '5 nights',
  who: 'Up to 4',
  p: 'R32,400',
  tags: ['Safari', 'Bush', 'Awe'],
  tone: 'amber'
}, {
  v: 'fynbos',
  t: 'Karoo Breathwork',
  d: 'Big sky, bigger silence. Daily breathwork, journaling, and absolutely nowhere to be.',
  nights: '4 nights',
  who: 'Up to 6',
  p: 'R19,600',
  tags: ['Breathwork', 'Journaling', 'Solitude'],
  tone: 'sage'
}, {
  v: 'dusk',
  t: 'Garden Route Wander',
  d: 'Forest, lagoon and coast strung together by slow drives and slower meals.',
  nights: '7 nights',
  who: 'Up to 4',
  p: 'R34,900',
  tags: ['Forest', 'Coast', 'Road'],
  tone: 'plum'
}];
function PackagesPage({
  onNav
}) {
  const [filter, setFilter] = useState('All');
  const chips = ['All', 'Mountain', 'Ocean', 'Spa', 'Safari', 'Solo'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg)'
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--amber-100)',
      padding: '130px 0 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '0 40px'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Our retreats"), /*#__PURE__*/React.createElement("h1", {
    style: {
      marginTop: 16
    }
  }, "Pick a feeling, not a checklist"), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: 620,
      marginTop: 18
    }
  }, "Every one is bespoke and women-only. Choose a starting point below \u2014 we\u2019ll shape the rest around you over a cup of tea."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 32,
      flexWrap: 'wrap'
    }
  }, chips.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => setFilter(c),
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 600,
      fontSize: 15,
      padding: '9px 18px',
      borderRadius: 'var(--r-pill)',
      cursor: 'pointer',
      transition: 'all var(--dur)',
      border: '1.5px solid ' + (filter === c ? 'var(--primary)' : 'var(--line)'),
      background: filter === c ? 'var(--primary)' : 'var(--card)',
      color: filter === c ? 'var(--fg-on-clay)' : 'var(--ink-soft)'
    }
  }, c))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '70px 0 110px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '0 40px',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 26
    }
  }, TT_PACKAGES.map(p => /*#__PURE__*/React.createElement(PackageCard, _extends({
    key: p.t
  }, p, {
    onNav: onNav
  }))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '0 0 110px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '0 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 'var(--r-xl)',
      overflow: 'hidden',
      background: FIGURE_GRADIENTS.eucalyptus,
      padding: '70px 60px',
      color: 'var(--fg-on-dark)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(100% 120% at 90% 0%, rgba(255,255,255,0.18), transparent 50%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 560
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    tone: "amber",
    icon: "sparkles"
  }, "Fully bespoke"), /*#__PURE__*/React.createElement("h2", {
    style: {
      color: 'var(--fg-on-dark)',
      marginTop: 18
    }
  }, "Don\u2019t see your kind of quiet?"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'rgba(251,244,233,0.88)',
      fontSize: 18,
      marginTop: 14
    }
  }, "Tell us what rest looks like for you and we\u2019ll build it from scratch \u2014 your dates, your people, your pace. This is what we do best."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "primary",
    iconRight: "arrow-right",
    onClick: () => onNav('cta')
  }, "Design my retreat")))))));
}
function PackageCard({
  v,
  t,
  d,
  nights,
  who,
  p,
  tags,
  tone,
  onNav
}) {
  const [hover, setHover] = useState(false);
  return /*#__PURE__*/React.createElement("article", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--card)',
      borderRadius: 'var(--r-lg)',
      overflow: 'hidden',
      border: '1px solid var(--line)',
      boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
      transform: hover ? 'translateY(-4px)' : 'none',
      transition: 'all var(--dur) var(--ease)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(Figure, {
    variant: v,
    height: 200,
    radius: "0",
    label: t
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 14,
      right: 14
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    tone: "blush",
    icon: "moon"
  }, nights))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '22px 24px 26px',
      display: 'flex',
      flexDirection: 'column',
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 22
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 8,
      fontSize: 15.5,
      flex: 1
    }
  }, d), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      marginTop: 16
    }
  }, tags.map(tg => /*#__PURE__*/React.createElement(Pill, {
    key: tg,
    tone: tone
  }, tg))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginTop: 16,
      color: 'var(--ink-mute)',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users",
    size: 15
  }), " ", who)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
      paddingTop: 18,
      borderTop: '1px solid var(--line-soft)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "small"
  }, "from"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 700,
      fontSize: 22,
      color: 'var(--ink)'
    }
  }, p)), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "primary",
    iconRight: "arrow-right",
    onClick: () => onNav('cta')
  }, "Enquire"))));
}

/* ---------------- JOURNAL (blog) ---------------- */
const TT_POSTS = [{
  v: 'sunset',
  cat: 'Slow living',
  t: 'The art of the unscheduled afternoon',
  x: 'On why we leave gaps in every itinerary — and what tends to grow in them.',
  min: '5 min',
  feat: true
}, {
  v: 'fynbos',
  cat: 'Places',
  t: 'A love letter to the Cederberg',
  x: 'Red rock, rooibos and the kind of silence you can hear.',
  min: '6 min'
}, {
  v: 'dusk',
  cat: 'Wellness',
  t: 'Breathwork for women who can’t switch off',
  x: 'Three gentle practices you can take home from the Karoo.',
  min: '4 min'
}, {
  v: 'eucalyptus',
  cat: 'Travel notes',
  t: 'Packing light, travelling lighter',
  x: 'What to actually bring on a quiet retreat (less than you think).',
  min: '3 min'
}, {
  v: 'savanna',
  cat: 'Stories',
  t: 'Six strangers, one table, one week',
  x: 'How small circles of women become something rarer than friends.',
  min: '7 min'
}];
function BlogPage({
  onNav
}) {
  const [feat, ...rest] = TT_POSTS;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg)'
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--sage-100)',
      padding: '130px 0 70px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '0 40px'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "var(--sage-700)"
  }, "The Journal"), /*#__PURE__*/React.createElement("h1", {
    style: {
      marginTop: 16
    }
  }, "Slow words for slower days"), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: 600,
      marginTop: 16
    }
  }, "Field notes, gentle practices and love letters to the places we send you. Read one with tea."))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '70px 0 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '0 40px'
    }
  }, /*#__PURE__*/React.createElement("article", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.15fr 1fr',
      gap: 44,
      alignItems: 'center',
      background: 'var(--card)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--r-xl)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement(Figure, {
    variant: feat.v,
    height: 400,
    radius: "0",
    label: "Featured story"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 48px 20px 8px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    tone: "clay"
  }, feat.cat), /*#__PURE__*/React.createElement("span", {
    className: "small"
  }, feat.min, " read")), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 18,
      fontSize: 'clamp(2rem,3vw,2.6rem)'
    }
  }, feat.t), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 16,
      fontSize: 18
    }
  }, feat.x), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconRight: "arrow-right"
  }, "Read the story")))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '40px 0 110px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '0 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 28
    }
  }, rest.map(post => /*#__PURE__*/React.createElement(PostCard, _extends({
    key: post.t
  }, post)))))));
}
function PostCard({
  v,
  cat,
  t,
  x,
  min
}) {
  const [hover, setHover] = useState(false);
  return /*#__PURE__*/React.createElement("article", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      gap: 22,
      background: 'var(--card)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--r-lg)',
      overflow: 'hidden',
      padding: 18,
      cursor: 'pointer',
      boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      transition: 'all var(--dur)'
    }
  }, /*#__PURE__*/React.createElement(Figure, {
    variant: v,
    height: 170,
    radius: "var(--r-md)",
    style: {
      width: 190,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingRight: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    tone: "sage"
  }, cat), /*#__PURE__*/React.createElement("span", {
    className: "small"
  }, min)), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 20,
      marginTop: 12
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 8,
      fontSize: 15
    }
  }, x)));
}

/* ---------------- CTA / CONTACT ---------------- */
function CtaPage({
  onNav
}) {
  const [sent, setSent] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg)'
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      background: FIGURE_GRADIENTS.dusk,
      padding: '140px 0 120px',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(100% 90% at 80% 0%, rgba(255,255,255,0.2), transparent 50%), radial-gradient(120% 120% at 10% 100%, rgba(35,53,41,0.4), transparent 55%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 760,
      margin: '0 auto',
      padding: '0 40px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    tone: "amber",
    icon: "mail"
  }, "Let\u2019s begin"), /*#__PURE__*/React.createElement("h1", {
    style: {
      color: 'var(--fg-on-clay)',
      marginTop: 20,
      fontSize: 'clamp(2.8rem,6vw,5rem)'
    }
  }, "Tell us where it hurts to rush"), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      color: 'rgba(255,251,244,0.94)',
      marginTop: 18
    }
  }, "Share a little about you and the kind of quiet you\u2019re craving. We\u2019ll write back within two days \u2014 no call centre, just one of us."))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '0 0 120px',
      marginTop: -70
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 980,
      margin: '0 auto',
      padding: '0 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.3fr 1fr',
      gap: 0,
      background: 'var(--card)',
      borderRadius: 'var(--r-xl)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-lg)',
      border: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '48px 48px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 24
    }
  }, "Start your retreat"), /*#__PURE__*/React.createElement("p", {
    className: "small",
    style: {
      marginTop: 6
    }
  }, "It all begins with a cup of tea and a few details."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Your name",
    placeholder: "e.g. Lindiwe"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Email",
    placeholder: "you@email.com"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Group size",
    placeholder: "Just me"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Rough dates",
    placeholder: "Spring 2026"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "What does rest look like for you?",
    placeholder: "Mountains, silence, no wifi\u2026",
    area: true
  }), sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      color: 'var(--sage-700)',
      background: 'var(--sage-100)',
      padding: '14px 18px',
      borderRadius: 'var(--r-md)',
      fontFamily: 'var(--font-serif)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check-circle",
    size: 20
  }), " Thank you \u2014 we\u2019ll be in touch within two days.") : /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "primary",
    iconRight: "arrow-right",
    onClick: () => setSent(true)
  }, "Send it our way"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--forest-600)',
      color: 'var(--fg-on-dark)',
      padding: '48px 40px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--fg-on-dark)',
      fontSize: 22
    }
  }, "Or reach us directly"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 22,
      marginTop: 28
    }
  }, [{
    i: 'mail',
    t: 'hello@thula.travel',
    s: 'We answer every one, slowly and properly.'
  }, {
    i: 'phone',
    t: '+27 21 000 0000',
    s: 'Cape Town · Mon–Fri, 9–4 SAST'
  }, {
    i: 'message-circle',
    t: 'WhatsApp us',
    s: 'For quick questions before you book.'
  }].map(c => /*#__PURE__*/React.createElement("div", {
    key: c.t,
    style: {
      display: 'flex',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--r-md)',
      background: 'rgba(251,244,233,0.12)',
      display: 'grid',
      placeItems: 'center',
      color: 'var(--amber-400)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: c.i,
    size: 20
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 600,
      fontSize: 17
    }
  }, c.t), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'rgba(251,244,233,0.7)',
      fontSize: 14,
      marginTop: 2
    }
  }, c.s))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      paddingTop: 24,
      borderTop: '1px solid rgba(251,244,233,0.18)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      color: 'var(--amber-300)',
      fontStyle: 'italic',
      fontFamily: 'var(--font-serif)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart",
    size: 18
  }), " \u201CThula\u201D \u2014 isiZulu for be still.")))))));
}
function Field({
  label,
  placeholder,
  area
}) {
  const [focus, setFocus] = useState(false);
  const common = {
    width: '100%',
    fontFamily: 'var(--font-serif)',
    fontSize: 16,
    color: 'var(--ink)',
    padding: '13px 16px',
    borderRadius: 'var(--r-md)',
    background: 'var(--paper)',
    border: '1.5px solid ' + (focus ? 'var(--primary)' : 'var(--line)'),
    outline: 'none',
    boxShadow: focus ? '0 0 0 4px rgba(212,130,95,0.18)' : 'none',
    transition: 'all var(--dur)',
    resize: 'vertical'
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "label",
    style: {
      display: 'block',
      marginBottom: 7
    }
  }, label), area ? /*#__PURE__*/React.createElement("textarea", {
    rows: 3,
    placeholder: placeholder,
    style: common,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  }) : /*#__PURE__*/React.createElement("input", {
    placeholder: placeholder,
    style: common,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  }));
}
Object.assign(window, {
  PackagesPage,
  BlogPage,
  CtaPage,
  PackageCard,
  PostCard,
  Field,
  TT_PACKAGES,
  TT_POSTS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/pages2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/tweaks-panel.jsx
try { (() => {
/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ui.jsx
try { (() => {
/* ===========================================================
   THULA TRAVEL — UI Kit primitives
   Buttons, pills, nav, footer, figure placeholders, icons.
   Exports to window for cross-file use.
   =========================================================== */

const {
  useState,
  useEffect,
  useRef
} = React;

/* ---- Icon: thin Lucide line icons via CDN ---- */
function Icon({
  name,
  size = 20,
  strokeWidth = 1.75,
  style = {}
}) {
  const ref = useRef(null);
  useEffect(() => {
    if (window.lucide && ref.current) {
      ref.current.innerHTML = '';
      const el = document.createElement('i');
      el.setAttribute('data-lucide', name);
      ref.current.appendChild(el);
      window.lucide.createIcons({
        attrs: {
          width: size,
          height: size,
          'stroke-width': strokeWidth
        },
        nameAttr: 'data-lucide'
      });
    }
  }, [name, size, strokeWidth]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    className: "tt-icon",
    style: {
      display: 'inline-flex',
      ...style
    }
  });
}

/* ---- Wordmark ---- */
function Wordmark({
  size = 30,
  color = 'var(--ink)',
  tagline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-script)',
      fontWeight: 700,
      fontSize: size,
      color,
      letterSpacing: '0.5px'
    }
  }, "Thula"), tagline && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 600,
      fontSize: size * 0.26,
      letterSpacing: '0.34em',
      textTransform: 'uppercase',
      color: 'var(--ink-mute)',
      marginTop: 4,
      marginLeft: 3
    }
  }, "Travel"));
}

/* ---- Button ---- */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  onClick,
  style = {}
}) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const pads = {
    sm: '10px 18px',
    md: '14px 26px',
    lg: '17px 34px'
  };
  const fonts = {
    sm: 15,
    md: 16,
    lg: 17
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 9,
    fontFamily: 'var(--font-serif)',
    fontWeight: 600,
    fontSize: fonts[size],
    padding: pads[size],
    borderRadius: 'var(--r-pill)',
    border: '1.5px solid transparent',
    cursor: 'pointer',
    transition: 'all var(--dur) var(--ease)',
    whiteSpace: 'nowrap',
    transform: press ? 'scale(0.97)' : 'scale(1)',
    ...style
  };
  const variants = {
    primary: {
      background: hover ? 'var(--primary-hover)' : 'var(--primary)',
      color: 'var(--fg-on-clay)',
      boxShadow: hover ? 'var(--shadow-glow)' : 'var(--shadow-sm)'
    },
    secondary: {
      background: hover ? 'var(--ink)' : 'transparent',
      color: hover ? 'var(--fg-on-dark)' : 'var(--ink)',
      borderColor: 'var(--ink)'
    },
    soft: {
      background: hover ? 'var(--amber-300)' : 'var(--amber-100)',
      color: 'var(--clay-700)'
    },
    ghost: {
      background: hover ? 'rgba(255,255,255,0.14)' : 'transparent',
      color: 'var(--fg-on-dark)',
      borderColor: 'rgba(255,255,255,0.45)'
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    style: {
      ...base,
      ...variants[variant]
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    onClick: onClick
  }, icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: fonts[size] + 2
  }), children, iconRight && /*#__PURE__*/React.createElement(Icon, {
    name: iconRight,
    size: fonts[size] + 2
  }));
}

/* ---- Pill / Tag ---- */
function Pill({
  children,
  tone = 'sage',
  icon
}) {
  const tones = {
    sage: {
      bg: 'var(--sage-100)',
      fg: 'var(--sage-700)'
    },
    clay: {
      bg: 'var(--clay-100)',
      fg: 'var(--clay-700)'
    },
    amber: {
      bg: 'var(--amber-100)',
      fg: 'var(--amber-600)'
    },
    plum: {
      bg: '#F0E5E7',
      fg: 'var(--plum-600)'
    },
    blush: {
      bg: 'var(--blush-100)',
      fg: 'var(--clay-600)'
    }
  }[tone];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: tones.bg,
      color: tones.fg,
      borderRadius: 'var(--r-pill)',
      padding: '6px 14px',
      fontFamily: 'var(--font-serif)',
      fontWeight: 600,
      fontSize: 13.5,
      letterSpacing: '0.01em'
    }
  }, icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 14
  }), children);
}
function Eyebrow({
  children,
  color = 'var(--primary)',
  center
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      justifyContent: center ? 'center' : 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 1.5,
      background: color,
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "eyebrow",
    style: {
      color
    }
  }, children), center && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 1.5,
      background: color,
      borderRadius: 2
    }
  }));
}

/* ---- Figure: on-brand sunset placeholder (drop real photos here) ---- */
const FIGURE_GRADIENTS = {
  sunset: 'var(--fig-sunset)',
  savanna: 'var(--fig-savanna)',
  fynbos: 'var(--fig-fynbos)',
  dusk: 'var(--fig-dusk)',
  eucalyptus: 'var(--fig-eucalyptus)'
};
const slugify = s => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/* Figure = on-brand gradient + a drop-in photo slot on top.
   Empty → shows the flag-toned gradient (the brand placeholder).
   Drag a photo onto it → the photo fills the frame.
   Pass slot={false} to render a pure decorative gradient (no drop target). */
function Figure({
  variant = 'sunset',
  label,
  caption,
  height = 280,
  radius = 'var(--r-lg)',
  slot = true,
  slotId,
  style = {},
  children
}) {
  const id = slotId || 'photo-' + (slugify(label) || variant) + '-' + Math.round(height);
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height,
      borderRadius: radius,
      overflow: 'hidden',
      background: FIGURE_GRADIENTS[variant],
      boxShadow: 'var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(120% 90% at 30% 10%, rgba(255,255,255,0.28), transparent 55%), radial-gradient(120% 120% at 80% 100%, rgba(20,30,18,0.32), transparent 60%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0.16,
      mixBlendMode: 'overlay',
      backgroundImage: 'radial-gradient(rgba(255,255,255,0.7) 0.5px, transparent 0.5px)',
      backgroundSize: '4px 4px'
    }
  }), slot ? /*#__PURE__*/React.createElement("image-slot", {
    id: id,
    shape: "rect",
    fit: "cover",
    placeholder: label ? 'Drop a photo · ' + label : 'Drop a photo',
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%'
    }
  }) : label && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 16,
      bottom: 14,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      color: 'rgba(255,251,244,0.92)',
      fontFamily: 'var(--font-serif)',
      fontStyle: 'italic',
      fontSize: 14,
      textShadow: '0 1px 8px rgba(20,30,18,0.4)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "camera",
    size: 15
  }), " ", label), children), caption && /*#__PURE__*/React.createElement("figcaption", {
    className: "small",
    style: {
      marginTop: 10,
      fontStyle: 'italic'
    }
  }, caption));
}
Object.assign(window, {
  Icon,
  Wordmark,
  Button,
  Pill,
  Eyebrow,
  Figure,
  FIGURE_GRADIENTS,
  useState,
  useEffect,
  useRef
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ui.jsx", error: String((e && e.message) || e) }); }

})();
