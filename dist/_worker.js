var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn2 = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn2, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// ../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn2) {
    return fn2;
  }
  runInAsyncScope(fn2, thisArg, ...args) {
    return fn2.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// ../../AppData/Roaming/npm/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
if (!("__unenv__" in performance)) {
  const proto = Performance.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// ../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// ../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// ../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// ../../AppData/Roaming/npm/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// ../../AppData/Roaming/npm/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// ../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// ../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// ../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// ../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x2, y2, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// ../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// ../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// ../../AppData/Roaming/npm/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert: assert2,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// ../../AppData/Roaming/npm/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// _worker.js
var Zs = Object.defineProperty;
var Ut = /* @__PURE__ */ __name((e) => {
  throw TypeError(e);
}, "Ut");
var Qs = /* @__PURE__ */ __name((e, t, s) => t in e ? Zs(e, t, { enumerable: true, configurable: true, writable: true, value: s }) : e[t] = s, "Qs");
var h = /* @__PURE__ */ __name((e, t, s) => Qs(e, typeof t != "symbol" ? t + "" : t, s), "h");
var xt = /* @__PURE__ */ __name((e, t, s) => t.has(e) || Ut("Cannot " + s), "xt");
var u = /* @__PURE__ */ __name((e, t, s) => (xt(e, t, "read from private field"), s ? s.call(e) : t.get(e)), "u");
var y = /* @__PURE__ */ __name((e, t, s) => t.has(e) ? Ut("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), "y");
var f = /* @__PURE__ */ __name((e, t, s, a) => (xt(e, t, "write to private field"), a ? a.call(e, s) : t.set(e, s), s), "f");
var x = /* @__PURE__ */ __name((e, t, s) => (xt(e, t, "access private method"), s), "x");
var Wt = /* @__PURE__ */ __name((e, t, s, a) => ({ set _(n) {
  f(e, t, n, s);
}, get _() {
  return u(e, t, a);
} }), "Wt");
var Yt = /* @__PURE__ */ __name((e, t, s) => (a, n) => {
  let i = -1;
  return r(0);
  async function r(o) {
    if (o <= i) throw new Error("next() called multiple times");
    i = o;
    let d, l = false, c;
    if (e[o] ? (c = e[o][0][0], a.req.routeIndex = o) : c = o === e.length && n || void 0, c) try {
      d = await c(a, () => r(o + 1));
    } catch (p) {
      if (p instanceof Error && t) a.error = p, d = await t(p, a), l = true;
      else throw p;
    }
    else a.finalized === false && s && (d = await s(a));
    return d && (a.finalized === false || l) && (a.res = d), a;
  }
  __name(r, "r");
}, "Yt");
var ea = /* @__PURE__ */ Symbol();
var ta = /* @__PURE__ */ __name(async (e, t = /* @__PURE__ */ Object.create(null)) => {
  const { all: s = false, dot: a = false } = t, i = (e instanceof ys ? e.raw.headers : e.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? sa(e, { all: s, dot: a }) : {};
}, "ta");
async function sa(e, t) {
  const s = await e.formData();
  return s ? aa(s, t) : {};
}
__name(sa, "sa");
function aa(e, t) {
  const s = /* @__PURE__ */ Object.create(null);
  return e.forEach((a, n) => {
    t.all || n.endsWith("[]") ? na(s, n, a) : s[n] = a;
  }), t.dot && Object.entries(s).forEach(([a, n]) => {
    a.includes(".") && (ia(s, a, n), delete s[a]);
  }), s;
}
__name(aa, "aa");
var na = /* @__PURE__ */ __name((e, t, s) => {
  e[t] !== void 0 ? Array.isArray(e[t]) ? e[t].push(s) : e[t] = [e[t], s] : t.endsWith("[]") ? e[t] = [s] : e[t] = s;
}, "na");
var ia = /* @__PURE__ */ __name((e, t, s) => {
  if (/(?:^|\.)__proto__\./.test(t)) return;
  let a = e;
  const n = t.split(".");
  n.forEach((i, r) => {
    r === n.length - 1 ? a[i] = s : ((!a[i] || typeof a[i] != "object" || Array.isArray(a[i]) || a[i] instanceof File) && (a[i] = /* @__PURE__ */ Object.create(null)), a = a[i]);
  });
}, "ia");
var _s = /* @__PURE__ */ __name((e) => {
  const t = e.split("/");
  return t[0] === "" && t.shift(), t;
}, "_s");
var ra = /* @__PURE__ */ __name((e) => {
  const { groups: t, path: s } = oa(e), a = _s(s);
  return da(a, t);
}, "ra");
var oa = /* @__PURE__ */ __name((e) => {
  const t = [];
  return e = e.replace(/\{[^}]+\}/g, (s, a) => {
    const n = `@${a}`;
    return t.push([n, s]), n;
  }), { groups: t, path: e };
}, "oa");
var da = /* @__PURE__ */ __name((e, t) => {
  for (let s = t.length - 1; s >= 0; s--) {
    const [a] = t[s];
    for (let n = e.length - 1; n >= 0; n--) if (e[n].includes(a)) {
      e[n] = e[n].replace(a, t[s][1]);
      break;
    }
  }
  return e;
}, "da");
var it = {};
var la = /* @__PURE__ */ __name((e, t) => {
  if (e === "*") return "*";
  const s = e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (s) {
    const a = `${e}#${t}`;
    return it[a] || (s[2] ? it[a] = t && t[0] !== ":" && t[0] !== "*" ? [a, s[1], new RegExp(`^${s[2]}(?=/${t})`)] : [e, s[1], new RegExp(`^${s[2]}$`)] : it[a] = [e, s[1], true]), it[a];
  }
  return null;
}, "la");
var jt = /* @__PURE__ */ __name((e, t) => {
  try {
    return t(e);
  } catch {
    return e.replace(/(?:%[0-9A-Fa-f]{2})+/g, (s) => {
      try {
        return t(s);
      } catch {
        return s;
      }
    });
  }
}, "jt");
var hs = /* @__PURE__ */ __name((e) => jt(e, decodeURI), "hs");
var fs = /* @__PURE__ */ __name((e) => {
  const t = e.url, s = t.indexOf("/", t.indexOf(":") + 4);
  let a = s;
  for (; a < t.length; a++) {
    const n = t.charCodeAt(a);
    if (n === 37) {
      const i = t.indexOf("?", a), r = t.indexOf("#", a), o = i === -1 ? r === -1 ? void 0 : r : r === -1 ? i : Math.min(i, r), d = t.slice(s, o);
      return hs(d.includes("%25") ? d.replace(/%25/g, "%2525") : d);
    } else if (n === 63 || n === 35) break;
  }
  return t.slice(s, a);
}, "fs");
var ca = /* @__PURE__ */ __name((e) => {
  const t = fs(e);
  return t.length > 1 && t.at(-1) === "/" ? t.slice(0, -1) : t;
}, "ca");
var Ie = /* @__PURE__ */ __name((e, t, ...s) => (s.length && (t = Ie(t, ...s)), `${(e == null ? void 0 : e[0]) === "/" ? "" : "/"}${e}${t === "/" ? "" : `${(e == null ? void 0 : e.at(-1)) === "/" ? "" : "/"}${(t == null ? void 0 : t[0]) === "/" ? t.slice(1) : t}`}`), "Ie");
var bs = /* @__PURE__ */ __name((e) => {
  if (e.charCodeAt(e.length - 1) !== 63 || !e.includes(":")) return null;
  const t = e.split("/"), s = [];
  let a = "";
  return t.forEach((n) => {
    if (n !== "" && !/\:/.test(n)) a += "/" + n;
    else if (/\:/.test(n)) if (/\?/.test(n)) {
      s.length === 0 && a === "" ? s.push("/") : s.push(a);
      const i = n.replace("?", "");
      a += "/" + i, s.push(a);
    } else a += "/" + n;
  }), s.filter((n, i, r) => r.indexOf(n) === i);
}, "bs");
var wt = /* @__PURE__ */ __name((e) => /[%+]/.test(e) ? (e.indexOf("+") !== -1 && (e = e.replace(/\+/g, " ")), e.indexOf("%") !== -1 ? jt(e, vs) : e) : e, "wt");
var gs = /* @__PURE__ */ __name((e, t, s) => {
  let a;
  if (!s && t && !/[%+]/.test(t)) {
    let r = e.indexOf("?", 8);
    if (r === -1) return;
    for (e.startsWith(t, r + 1) || (r = e.indexOf(`&${t}`, r + 1)); r !== -1; ) {
      const o = e.charCodeAt(r + t.length + 1);
      if (o === 61) {
        const d = r + t.length + 2, l = e.indexOf("&", d);
        return wt(e.slice(d, l === -1 ? void 0 : l));
      } else if (o == 38 || isNaN(o)) return "";
      r = e.indexOf(`&${t}`, r + 1);
    }
    if (a = /[%+]/.test(e), !a) return;
  }
  const n = {};
  a ?? (a = /[%+]/.test(e));
  let i = e.indexOf("?", 8);
  for (; i !== -1; ) {
    const r = e.indexOf("&", i + 1);
    let o = e.indexOf("=", i);
    o > r && r !== -1 && (o = -1);
    let d = e.slice(i + 1, o === -1 ? r === -1 ? void 0 : r : o);
    if (a && (d = wt(d)), i = r, d === "") continue;
    let l;
    o === -1 ? l = "" : (l = e.slice(o + 1, r === -1 ? void 0 : r), a && (l = wt(l))), s ? (n[d] && Array.isArray(n[d]) || (n[d] = []), n[d].push(l)) : n[d] ?? (n[d] = l);
  }
  return t ? n[t] : n;
}, "gs");
var ua = gs;
var pa = /* @__PURE__ */ __name((e, t) => gs(e, t, true), "pa");
var vs = decodeURIComponent;
var Jt = /* @__PURE__ */ __name((e) => jt(e, vs), "Jt");
var Ne;
var J;
var re;
var Es;
var xs;
var Dt;
var de;
var ds;
var ys = (ds = class {
  static {
    __name(this, "ds");
  }
  constructor(e, t = "/", s = [[]]) {
    y(this, re);
    h(this, "raw");
    y(this, Ne);
    y(this, J);
    h(this, "routeIndex", 0);
    h(this, "path");
    h(this, "bodyCache", {});
    y(this, de, (e2) => {
      const { bodyCache: t2, raw: s2 } = this, a = t2[e2];
      if (a) return a;
      const n = Object.keys(t2)[0];
      return n ? t2[n].then((i) => (n === "json" && (i = JSON.stringify(i)), new Response(i)[e2]())) : t2[e2] = s2[e2]();
    });
    this.raw = e, this.path = t, f(this, J, s), f(this, Ne, {});
  }
  param(e) {
    return e ? x(this, re, Es).call(this, e) : x(this, re, xs).call(this);
  }
  query(e) {
    return ua(this.url, e);
  }
  queries(e) {
    return pa(this.url, e);
  }
  header(e) {
    if (e) return this.raw.headers.get(e) ?? void 0;
    const t = {};
    return this.raw.headers.forEach((s, a) => {
      t[a] = s;
    }), t;
  }
  async parseBody(e) {
    return ta(this, e);
  }
  json() {
    return u(this, de).call(this, "text").then((e) => JSON.parse(e));
  }
  text() {
    return u(this, de).call(this, "text");
  }
  arrayBuffer() {
    return u(this, de).call(this, "arrayBuffer");
  }
  blob() {
    return u(this, de).call(this, "blob");
  }
  formData() {
    return u(this, de).call(this, "formData");
  }
  addValidatedData(e, t) {
    u(this, Ne)[e] = t;
  }
  valid(e) {
    return u(this, Ne)[e];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [ea]() {
    return u(this, J);
  }
  get matchedRoutes() {
    return u(this, J)[0].map(([[, e]]) => e);
  }
  get routePath() {
    return u(this, J)[0].map(([[, e]]) => e)[this.routeIndex].path;
  }
}, Ne = /* @__PURE__ */ new WeakMap(), J = /* @__PURE__ */ new WeakMap(), re = /* @__PURE__ */ new WeakSet(), Es = /* @__PURE__ */ __name(function(e) {
  const t = u(this, J)[0][this.routeIndex][1][e], s = x(this, re, Dt).call(this, t);
  return s && /\%/.test(s) ? Jt(s) : s;
}, "Es"), xs = /* @__PURE__ */ __name(function() {
  const e = {}, t = Object.keys(u(this, J)[0][this.routeIndex][1]);
  for (const s of t) {
    const a = x(this, re, Dt).call(this, u(this, J)[0][this.routeIndex][1][s]);
    a !== void 0 && (e[s] = /\%/.test(a) ? Jt(a) : a);
  }
  return e;
}, "xs"), Dt = /* @__PURE__ */ __name(function(e) {
  return u(this, J)[1] ? u(this, J)[1][e] : e;
}, "Dt"), de = /* @__PURE__ */ new WeakMap(), ds);
var ma = { Stringify: 1 };
var ws = /* @__PURE__ */ __name(async (e, t, s, a, n) => {
  typeof e == "object" && !(e instanceof String) && (e instanceof Promise || (e = e.toString()), e instanceof Promise && (e = await e));
  const i = e.callbacks;
  return i != null && i.length ? (n ? n[0] += e : n = [e], Promise.all(i.map((o) => o({ phase: t, buffer: n, context: a }))).then((o) => Promise.all(o.filter(Boolean).map((d) => ws(d, t, false, a, n))).then(() => n[0]))) : Promise.resolve(e);
}, "ws");
var _a = "text/plain; charset=UTF-8";
var kt = /* @__PURE__ */ __name((e, t) => ({ "Content-Type": e, ...t }), "kt");
var Ye = /* @__PURE__ */ __name((e, t) => new Response(e, t), "Ye");
var Ve;
var Xe;
var te;
var Le;
var se;
var M;
var Ge;
var Me;
var $e;
var xe;
var Ze;
var Qe;
var le;
var Ce;
var ls;
var ha = (ls = class {
  static {
    __name(this, "ls");
  }
  constructor(e, t) {
    y(this, le);
    y(this, Ve);
    y(this, Xe);
    h(this, "env", {});
    y(this, te);
    h(this, "finalized", false);
    h(this, "error");
    y(this, Le);
    y(this, se);
    y(this, M);
    y(this, Ge);
    y(this, Me);
    y(this, $e);
    y(this, xe);
    y(this, Ze);
    y(this, Qe);
    h(this, "render", (...e2) => (u(this, Me) ?? f(this, Me, (t2) => this.html(t2)), u(this, Me).call(this, ...e2)));
    h(this, "setLayout", (e2) => f(this, Ge, e2));
    h(this, "getLayout", () => u(this, Ge));
    h(this, "setRenderer", (e2) => {
      f(this, Me, e2);
    });
    h(this, "header", (e2, t2, s) => {
      this.finalized && f(this, M, Ye(u(this, M).body, u(this, M)));
      const a = u(this, M) ? u(this, M).headers : u(this, xe) ?? f(this, xe, new Headers());
      t2 === void 0 ? a.delete(e2) : s != null && s.append ? a.append(e2, t2) : a.set(e2, t2);
    });
    h(this, "status", (e2) => {
      f(this, Le, e2);
    });
    h(this, "set", (e2, t2) => {
      u(this, te) ?? f(this, te, /* @__PURE__ */ new Map()), u(this, te).set(e2, t2);
    });
    h(this, "get", (e2) => u(this, te) ? u(this, te).get(e2) : void 0);
    h(this, "newResponse", (...e2) => x(this, le, Ce).call(this, ...e2));
    h(this, "body", (e2, t2, s) => x(this, le, Ce).call(this, e2, t2, s));
    h(this, "text", (e2, t2, s) => !u(this, xe) && !u(this, Le) && !t2 && !s && !this.finalized ? new Response(e2) : x(this, le, Ce).call(this, e2, t2, kt(_a, s)));
    h(this, "json", (e2, t2, s) => x(this, le, Ce).call(this, JSON.stringify(e2), t2, kt("application/json", s)));
    h(this, "html", (e2, t2, s) => {
      const a = /* @__PURE__ */ __name((n) => x(this, le, Ce).call(this, n, t2, kt("text/html; charset=UTF-8", s)), "a");
      return typeof e2 == "object" ? ws(e2, ma.Stringify, false, {}).then(a) : a(e2);
    });
    h(this, "redirect", (e2, t2) => {
      const s = String(e2);
      return this.header("Location", /[^\x00-\xFF]/.test(s) ? encodeURI(s) : s), this.newResponse(null, t2 ?? 302);
    });
    h(this, "notFound", () => (u(this, $e) ?? f(this, $e, () => Ye()), u(this, $e).call(this, this)));
    f(this, Ve, e), t && (f(this, se, t.executionCtx), this.env = t.env, f(this, $e, t.notFoundHandler), f(this, Qe, t.path), f(this, Ze, t.matchResult));
  }
  get req() {
    return u(this, Xe) ?? f(this, Xe, new ys(u(this, Ve), u(this, Qe), u(this, Ze))), u(this, Xe);
  }
  get event() {
    if (u(this, se) && "respondWith" in u(this, se)) return u(this, se);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (u(this, se)) return u(this, se);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return u(this, M) || f(this, M, Ye(null, { headers: u(this, xe) ?? f(this, xe, new Headers()) }));
  }
  set res(e) {
    if (u(this, M) && e) {
      e = Ye(e.body, e);
      for (const [t, s] of u(this, M).headers.entries()) if (t !== "content-type") if (t === "set-cookie") {
        const a = u(this, M).headers.getSetCookie();
        e.headers.delete("set-cookie");
        for (const n of a) e.headers.append("set-cookie", n);
      } else e.headers.set(t, s);
    }
    f(this, M, e), this.finalized = true;
  }
  get var() {
    return u(this, te) ? Object.fromEntries(u(this, te)) : {};
  }
}, Ve = /* @__PURE__ */ new WeakMap(), Xe = /* @__PURE__ */ new WeakMap(), te = /* @__PURE__ */ new WeakMap(), Le = /* @__PURE__ */ new WeakMap(), se = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakMap(), Ge = /* @__PURE__ */ new WeakMap(), Me = /* @__PURE__ */ new WeakMap(), $e = /* @__PURE__ */ new WeakMap(), xe = /* @__PURE__ */ new WeakMap(), Ze = /* @__PURE__ */ new WeakMap(), Qe = /* @__PURE__ */ new WeakMap(), le = /* @__PURE__ */ new WeakSet(), Ce = /* @__PURE__ */ __name(function(e, t, s) {
  const a = u(this, M) ? new Headers(u(this, M).headers) : u(this, xe) ?? new Headers();
  if (typeof t == "object" && "headers" in t) {
    const i = t.headers instanceof Headers ? t.headers : new Headers(t.headers);
    for (const [r, o] of i) r.toLowerCase() === "set-cookie" ? a.append(r, o) : a.set(r, o);
  }
  if (s) for (const [i, r] of Object.entries(s)) if (typeof r == "string") a.set(i, r);
  else {
    a.delete(i);
    for (const o of r) a.append(i, o);
  }
  const n = typeof t == "number" ? t : (t == null ? void 0 : t.status) ?? u(this, Le);
  return Ye(e, { status: n, headers: a });
}, "Ce"), ls);
var O = "ALL";
var fa = "all";
var ba = ["get", "post", "put", "delete", "options", "patch"];
var ks = "Can not add a route since the matcher is already built.";
var Ss = class extends Error {
  static {
    __name(this, "Ss");
  }
};
var ga = "__COMPOSED_HANDLER";
var va = /* @__PURE__ */ __name((e) => e.text("404 Not Found", 404), "va");
var Kt = /* @__PURE__ */ __name((e, t) => {
  if ("getResponse" in e) {
    const s = e.getResponse();
    return t.newResponse(s.body, s);
  }
  return console.error(e), t.text("Internal Server Error", 500);
}, "Kt");
var z;
var j;
var Ts;
var V;
var ye;
var rt;
var ot;
var Fe;
var ya = (Fe = class {
  static {
    __name(this, "Fe");
  }
  constructor(t = {}) {
    y(this, j);
    h(this, "get");
    h(this, "post");
    h(this, "put");
    h(this, "delete");
    h(this, "options");
    h(this, "patch");
    h(this, "all");
    h(this, "on");
    h(this, "use");
    h(this, "router");
    h(this, "getPath");
    h(this, "_basePath", "/");
    y(this, z, "/");
    h(this, "routes", []);
    y(this, V, va);
    h(this, "errorHandler", Kt);
    h(this, "onError", (t2) => (this.errorHandler = t2, this));
    h(this, "notFound", (t2) => (f(this, V, t2), this));
    h(this, "fetch", (t2, ...s) => x(this, j, ot).call(this, t2, s[1], s[0], t2.method));
    h(this, "request", (t2, s, a2, n2) => t2 instanceof Request ? this.fetch(s ? new Request(t2, s) : t2, a2, n2) : (t2 = t2.toString(), this.fetch(new Request(/^https?:\/\//.test(t2) ? t2 : `http://localhost${Ie("/", t2)}`, s), a2, n2)));
    h(this, "fire", () => {
      addEventListener("fetch", (t2) => {
        t2.respondWith(x(this, j, ot).call(this, t2.request, t2, void 0, t2.request.method));
      });
    });
    [...ba, fa].forEach((i) => {
      this[i] = (r, ...o) => (typeof r == "string" ? f(this, z, r) : x(this, j, ye).call(this, i, u(this, z), r), o.forEach((d) => {
        x(this, j, ye).call(this, i, u(this, z), d);
      }), this);
    }), this.on = (i, r, ...o) => {
      for (const d of [r].flat()) {
        f(this, z, d);
        for (const l of [i].flat()) o.map((c) => {
          x(this, j, ye).call(this, l.toUpperCase(), u(this, z), c);
        });
      }
      return this;
    }, this.use = (i, ...r) => (typeof i == "string" ? f(this, z, i) : (f(this, z, "*"), r.unshift(i)), r.forEach((o) => {
      x(this, j, ye).call(this, O, u(this, z), o);
    }), this);
    const { strict: a, ...n } = t;
    Object.assign(this, n), this.getPath = a ?? true ? t.getPath ?? fs : ca;
  }
  route(t, s) {
    const a = this.basePath(t);
    return s.routes.map((n) => {
      var r;
      let i;
      s.errorHandler === Kt ? i = n.handler : (i = /* @__PURE__ */ __name(async (o, d) => (await Yt([], s.errorHandler)(o, () => n.handler(o, d))).res, "i"), i[ga] = n.handler), x(r = a, j, ye).call(r, n.method, n.path, i);
    }), this;
  }
  basePath(t) {
    const s = x(this, j, Ts).call(this);
    return s._basePath = Ie(this._basePath, t), s;
  }
  mount(t, s, a) {
    let n, i;
    a && (typeof a == "function" ? i = a : (i = a.optionHandler, a.replaceRequest === false ? n = /* @__PURE__ */ __name((d) => d, "n") : n = a.replaceRequest));
    const r = i ? (d) => {
      const l = i(d);
      return Array.isArray(l) ? l : [l];
    } : (d) => {
      let l;
      try {
        l = d.executionCtx;
      } catch {
      }
      return [d.env, l];
    };
    n || (n = (() => {
      const d = Ie(this._basePath, t), l = d === "/" ? 0 : d.length;
      return (c) => {
        const p = new URL(c.url);
        return p.pathname = p.pathname.slice(l) || "/", new Request(p, c);
      };
    })());
    const o = /* @__PURE__ */ __name(async (d, l) => {
      const c = await s(n(d.req.raw), ...r(d));
      if (c) return c;
      await l();
    }, "o");
    return x(this, j, ye).call(this, O, Ie(t, "*"), o), this;
  }
}, z = /* @__PURE__ */ new WeakMap(), j = /* @__PURE__ */ new WeakSet(), Ts = /* @__PURE__ */ __name(function() {
  const t = new Fe({ router: this.router, getPath: this.getPath });
  return t.errorHandler = this.errorHandler, f(t, V, u(this, V)), t.routes = this.routes, t;
}, "Ts"), V = /* @__PURE__ */ new WeakMap(), ye = /* @__PURE__ */ __name(function(t, s, a) {
  t = t.toUpperCase(), s = Ie(this._basePath, s);
  const n = { basePath: this._basePath, path: s, method: t, handler: a };
  this.router.add(t, s, [a, n]), this.routes.push(n);
}, "ye"), rt = /* @__PURE__ */ __name(function(t, s) {
  if (t instanceof Error) return this.errorHandler(t, s);
  throw t;
}, "rt"), ot = /* @__PURE__ */ __name(function(t, s, a, n) {
  if (n === "HEAD") return (async () => new Response(null, await x(this, j, ot).call(this, t, s, a, "GET")))();
  const i = this.getPath(t, { env: a }), r = this.router.match(n, i), o = new ha(t, { path: i, matchResult: r, env: a, executionCtx: s, notFoundHandler: u(this, V) });
  if (r[0].length === 1) {
    let l;
    try {
      l = r[0][0][0][0](o, async () => {
        o.res = await u(this, V).call(this, o);
      });
    } catch (c) {
      return x(this, j, rt).call(this, c, o);
    }
    return l instanceof Promise ? l.then((c) => c || (o.finalized ? o.res : u(this, V).call(this, o))).catch((c) => x(this, j, rt).call(this, c, o)) : l ?? u(this, V).call(this, o);
  }
  const d = Yt(r[0], this.errorHandler, u(this, V));
  return (async () => {
    try {
      const l = await d(o);
      if (!l.finalized) throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return l.res;
    } catch (l) {
      return x(this, j, rt).call(this, l, o);
    }
  })();
}, "ot"), Fe);
var Ds = [];
function Ea(e, t) {
  const s = this.buildAllMatchers(), a = /* @__PURE__ */ __name(((n, i) => {
    const r = s[n] || s[O], o = r[2][i];
    if (o) return o;
    const d = i.match(r[0]);
    if (!d) return [[], Ds];
    const l = d.indexOf("", 1);
    return [r[1][l], d];
  }), "a");
  return this.match = a, a(e, t);
}
__name(Ea, "Ea");
var ct = "[^/]+";
var Ke = ".*";
var ze = "(?:|/.*)";
var Be = /* @__PURE__ */ Symbol();
var xa = new Set(".\\+*[^]$()");
function wa(e, t) {
  return e.length === 1 ? t.length === 1 ? e < t ? -1 : 1 : -1 : t.length === 1 || e === Ke || e === ze ? 1 : t === Ke || t === ze ? -1 : e === ct ? 1 : t === ct ? -1 : e.length === t.length ? e < t ? -1 : 1 : t.length - e.length;
}
__name(wa, "wa");
var we;
var ke;
var X;
var De;
var ka = (De = class {
  static {
    __name(this, "De");
  }
  constructor() {
    y(this, we);
    y(this, ke);
    y(this, X, /* @__PURE__ */ Object.create(null));
  }
  insert(t, s, a, n, i) {
    if (t.length === 0) {
      if (u(this, we) !== void 0) throw Be;
      if (i) return;
      f(this, we, s);
      return;
    }
    const [r, ...o] = t, d = r === "*" ? o.length === 0 ? ["", "", Ke] : ["", "", ct] : r === "/*" ? ["", "", ze] : r.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let l;
    if (d) {
      const c = d[1];
      let p = d[2] || ct;
      if (c && d[2] && (p === ".*" || (p = p.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(p)))) throw Be;
      if (l = u(this, X)[p], !l) {
        if (Object.keys(u(this, X)).some((_) => _ !== Ke && _ !== ze)) throw Be;
        if (i) return;
        l = u(this, X)[p] = new De(), c !== "" && f(l, ke, n.varIndex++);
      }
      !i && c !== "" && a.push([c, u(l, ke)]);
    } else if (l = u(this, X)[r], !l) {
      if (Object.keys(u(this, X)).some((c) => c.length > 1 && c !== Ke && c !== ze)) throw Be;
      if (i) return;
      l = u(this, X)[r] = new De();
    }
    l.insert(o, s, a, n, i);
  }
  buildRegExpStr() {
    const s = Object.keys(u(this, X)).sort(wa).map((a) => {
      const n = u(this, X)[a];
      return (typeof u(n, ke) == "number" ? `(${a})@${u(n, ke)}` : xa.has(a) ? `\\${a}` : a) + n.buildRegExpStr();
    });
    return typeof u(this, we) == "number" && s.unshift(`#${u(this, we)}`), s.length === 0 ? "" : s.length === 1 ? s[0] : "(?:" + s.join("|") + ")";
  }
}, we = /* @__PURE__ */ new WeakMap(), ke = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakMap(), De);
var ht;
var et;
var cs;
var Sa = (cs = class {
  static {
    __name(this, "cs");
  }
  constructor() {
    y(this, ht, { varIndex: 0 });
    y(this, et, new ka());
  }
  insert(e, t, s) {
    const a = [], n = [];
    for (let r = 0; ; ) {
      let o = false;
      if (e = e.replace(/\{[^}]+\}/g, (d) => {
        const l = `@\\${r}`;
        return n[r] = [l, d], r++, o = true, l;
      }), !o) break;
    }
    const i = e.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let r = n.length - 1; r >= 0; r--) {
      const [o] = n[r];
      for (let d = i.length - 1; d >= 0; d--) if (i[d].indexOf(o) !== -1) {
        i[d] = i[d].replace(o, n[r][1]);
        break;
      }
    }
    return u(this, et).insert(i, t, a, u(this, ht), s), a;
  }
  buildRegExp() {
    let e = u(this, et).buildRegExpStr();
    if (e === "") return [/^$/, [], []];
    let t = 0;
    const s = [], a = [];
    return e = e.replace(/#(\d+)|@(\d+)|\.\*\$/g, (n, i, r) => i !== void 0 ? (s[++t] = Number(i), "$()") : (r !== void 0 && (a[Number(r)] = ++t), "")), [new RegExp(`^${e}`), s, a];
  }
}, ht = /* @__PURE__ */ new WeakMap(), et = /* @__PURE__ */ new WeakMap(), cs);
var Ta = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var dt = /* @__PURE__ */ Object.create(null);
function As(e) {
  return dt[e] ?? (dt[e] = new RegExp(e === "*" ? "" : `^${e.replace(/\/\*$|([.\\+*[^\]$()])/g, (t, s) => s ? `\\${s}` : "(?:|/.*)")}$`));
}
__name(As, "As");
function Da() {
  dt = /* @__PURE__ */ Object.create(null);
}
__name(Da, "Da");
function Aa(e) {
  var l;
  const t = new Sa(), s = [];
  if (e.length === 0) return Ta;
  const a = e.map((c) => [!/\*|\/:/.test(c[0]), ...c]).sort(([c, p], [_, b]) => c ? 1 : _ ? -1 : p.length - b.length), n = /* @__PURE__ */ Object.create(null);
  for (let c = 0, p = -1, _ = a.length; c < _; c++) {
    const [b, v, T] = a[c];
    b ? n[v] = [T.map(([D]) => [D, /* @__PURE__ */ Object.create(null)]), Ds] : p++;
    let E;
    try {
      E = t.insert(v, p, b);
    } catch (D) {
      throw D === Be ? new Ss(v) : D;
    }
    b || (s[p] = T.map(([D, k]) => {
      const N = /* @__PURE__ */ Object.create(null);
      for (k -= 1; k >= 0; k--) {
        const [P, L] = E[k];
        N[P] = L;
      }
      return [D, N];
    }));
  }
  const [i, r, o] = t.buildRegExp();
  for (let c = 0, p = s.length; c < p; c++) for (let _ = 0, b = s[c].length; _ < b; _++) {
    const v = (l = s[c][_]) == null ? void 0 : l[1];
    if (!v) continue;
    const T = Object.keys(v);
    for (let E = 0, D = T.length; E < D; E++) v[T[E]] = o[v[T[E]]];
  }
  const d = [];
  for (const c in r) d[c] = s[r[c]];
  return [i, d, n];
}
__name(Aa, "Aa");
function je(e, t) {
  if (e) {
    for (const s of Object.keys(e).sort((a, n) => n.length - a.length)) if (As(s).test(t)) return [...e[s]];
  }
}
__name(je, "je");
var ce;
var ue;
var ft;
var Rs;
var us;
var Ra = (us = class {
  static {
    __name(this, "us");
  }
  constructor() {
    y(this, ft);
    h(this, "name", "RegExpRouter");
    y(this, ce);
    y(this, ue);
    h(this, "match", Ea);
    f(this, ce, { [O]: /* @__PURE__ */ Object.create(null) }), f(this, ue, { [O]: /* @__PURE__ */ Object.create(null) });
  }
  add(e, t, s) {
    var o;
    const a = u(this, ce), n = u(this, ue);
    if (!a || !n) throw new Error(ks);
    a[e] || [a, n].forEach((d) => {
      d[e] = /* @__PURE__ */ Object.create(null), Object.keys(d[O]).forEach((l) => {
        d[e][l] = [...d[O][l]];
      });
    }), t === "/*" && (t = "*");
    const i = (t.match(/\/:/g) || []).length;
    if (/\*$/.test(t)) {
      const d = As(t);
      e === O ? Object.keys(a).forEach((l) => {
        var c;
        (c = a[l])[t] || (c[t] = je(a[l], t) || je(a[O], t) || []);
      }) : (o = a[e])[t] || (o[t] = je(a[e], t) || je(a[O], t) || []), Object.keys(a).forEach((l) => {
        (e === O || e === l) && Object.keys(a[l]).forEach((c) => {
          d.test(c) && a[l][c].push([s, i]);
        });
      }), Object.keys(n).forEach((l) => {
        (e === O || e === l) && Object.keys(n[l]).forEach((c) => d.test(c) && n[l][c].push([s, i]));
      });
      return;
    }
    const r = bs(t) || [t];
    for (let d = 0, l = r.length; d < l; d++) {
      const c = r[d];
      Object.keys(n).forEach((p) => {
        var _;
        (e === O || e === p) && ((_ = n[p])[c] || (_[c] = [...je(a[p], c) || je(a[O], c) || []]), n[p][c].push([s, i - l + d + 1]));
      });
    }
  }
  buildAllMatchers() {
    const e = /* @__PURE__ */ Object.create(null);
    return Object.keys(u(this, ue)).concat(Object.keys(u(this, ce))).forEach((t) => {
      e[t] || (e[t] = x(this, ft, Rs).call(this, t));
    }), f(this, ce, f(this, ue, void 0)), Da(), e;
  }
}, ce = /* @__PURE__ */ new WeakMap(), ue = /* @__PURE__ */ new WeakMap(), ft = /* @__PURE__ */ new WeakSet(), Rs = /* @__PURE__ */ __name(function(e) {
  const t = [];
  let s = e === O;
  return [u(this, ce), u(this, ue)].forEach((a) => {
    const n = a[e] ? Object.keys(a[e]).map((i) => [i, a[e][i]]) : [];
    n.length !== 0 ? (s || (s = true), t.push(...n)) : e !== O && t.push(...Object.keys(a[O]).map((i) => [i, a[O][i]]));
  }), s ? Aa(t) : null;
}, "Rs"), us);
var pe;
var ae;
var ps;
var Oa = (ps = class {
  static {
    __name(this, "ps");
  }
  constructor(e) {
    h(this, "name", "SmartRouter");
    y(this, pe, []);
    y(this, ae, []);
    f(this, pe, e.routers);
  }
  add(e, t, s) {
    if (!u(this, ae)) throw new Error(ks);
    u(this, ae).push([e, t, s]);
  }
  match(e, t) {
    if (!u(this, ae)) throw new Error("Fatal error");
    const s = u(this, pe), a = u(this, ae), n = s.length;
    let i = 0, r;
    for (; i < n; i++) {
      const o = s[i];
      try {
        for (let d = 0, l = a.length; d < l; d++) o.add(...a[d]);
        r = o.match(e, t);
      } catch (d) {
        if (d instanceof Ss) continue;
        throw d;
      }
      this.match = o.match.bind(o), f(this, pe, [o]), f(this, ae, void 0);
      break;
    }
    if (i === n) throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, r;
  }
  get activeRouter() {
    if (u(this, ae) || u(this, pe).length !== 1) throw new Error("No active router has been determined yet.");
    return u(this, pe)[0];
  }
}, pe = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), ps);
var Je = /* @__PURE__ */ Object.create(null);
var ja = /* @__PURE__ */ __name((e) => {
  for (const t in e) return true;
  return false;
}, "ja");
var me;
var C;
var Se;
var qe;
var I;
var ne;
var Ee;
var Pe;
var Ia = (Pe = class {
  static {
    __name(this, "Pe");
  }
  constructor(t, s, a) {
    y(this, ne);
    y(this, me);
    y(this, C);
    y(this, Se);
    y(this, qe, 0);
    y(this, I, Je);
    if (f(this, C, a || /* @__PURE__ */ Object.create(null)), f(this, me, []), t && s) {
      const n = /* @__PURE__ */ Object.create(null);
      n[t] = { handler: s, possibleKeys: [], score: 0 }, f(this, me, [n]);
    }
    f(this, Se, []);
  }
  insert(t, s, a) {
    f(this, qe, ++Wt(this, qe)._);
    let n = this;
    const i = ra(s), r = [];
    for (let o = 0, d = i.length; o < d; o++) {
      const l = i[o], c = i[o + 1], p = la(l, c), _ = Array.isArray(p) ? p[0] : l;
      if (_ in u(n, C)) {
        n = u(n, C)[_], p && r.push(p[1]);
        continue;
      }
      u(n, C)[_] = new Pe(), p && (u(n, Se).push(p), r.push(p[1])), n = u(n, C)[_];
    }
    return u(n, me).push({ [t]: { handler: a, possibleKeys: r.filter((o, d, l) => l.indexOf(o) === d), score: u(this, qe) } }), n;
  }
  search(t, s) {
    var c;
    const a = [];
    f(this, I, Je);
    let i = [this];
    const r = _s(s), o = [], d = r.length;
    let l = null;
    for (let p = 0; p < d; p++) {
      const _ = r[p], b = p === d - 1, v = [];
      for (let E = 0, D = i.length; E < D; E++) {
        const k = i[E], N = u(k, C)[_];
        N && (f(N, I, u(k, I)), b ? (u(N, C)["*"] && x(this, ne, Ee).call(this, a, u(N, C)["*"], t, u(k, I)), x(this, ne, Ee).call(this, a, N, t, u(k, I))) : v.push(N));
        for (let P = 0, L = u(k, Se).length; P < L; P++) {
          const nt = u(k, Se)[P], Q = u(k, I) === Je ? {} : { ...u(k, I) };
          if (nt === "*") {
            const Re = u(k, C)["*"];
            Re && (x(this, ne, Ee).call(this, a, Re, t, u(k, I)), f(Re, I, Q), v.push(Re));
            continue;
          }
          const [Gs, Ht, Ue] = nt;
          if (!_ && !(Ue instanceof RegExp)) continue;
          const ee = u(k, C)[Gs];
          if (Ue instanceof RegExp) {
            if (l === null) {
              l = new Array(d);
              let Oe = s[0] === "/" ? 1 : 0;
              for (let We = 0; We < d; We++) l[We] = Oe, Oe += r[We].length + 1;
            }
            const Re = s.substring(l[p]), Et = Ue.exec(Re);
            if (Et) {
              if (Q[Ht] = Et[0], x(this, ne, Ee).call(this, a, ee, t, u(k, I), Q), ja(u(ee, C))) {
                f(ee, I, Q);
                const Oe = ((c = Et[0].match(/\//)) == null ? void 0 : c.length) ?? 0;
                (o[Oe] || (o[Oe] = [])).push(ee);
              }
              continue;
            }
          }
          (Ue === true || Ue.test(_)) && (Q[Ht] = _, b ? (x(this, ne, Ee).call(this, a, ee, t, Q, u(k, I)), u(ee, C)["*"] && x(this, ne, Ee).call(this, a, u(ee, C)["*"], t, Q, u(k, I))) : (f(ee, I, Q), v.push(ee)));
        }
      }
      const T = o.shift();
      i = T ? v.concat(T) : v;
    }
    return a.length > 1 && a.sort((p, _) => p.score - _.score), [a.map(({ handler: p, params: _ }) => [p, _])];
  }
}, me = /* @__PURE__ */ new WeakMap(), C = /* @__PURE__ */ new WeakMap(), Se = /* @__PURE__ */ new WeakMap(), qe = /* @__PURE__ */ new WeakMap(), I = /* @__PURE__ */ new WeakMap(), ne = /* @__PURE__ */ new WeakSet(), Ee = /* @__PURE__ */ __name(function(t, s, a, n, i) {
  for (let r = 0, o = u(s, me).length; r < o; r++) {
    const d = u(s, me)[r], l = d[a] || d[O], c = {};
    if (l !== void 0 && (l.params = /* @__PURE__ */ Object.create(null), t.push(l), n !== Je || i && i !== Je)) for (let p = 0, _ = l.possibleKeys.length; p < _; p++) {
      const b = l.possibleKeys[p], v = c[l.score];
      l.params[b] = i != null && i[b] && !v ? i[b] : n[b] ?? (i == null ? void 0 : i[b]), c[l.score] = true;
    }
  }
}, "Ee"), Pe);
var Te;
var ms;
var Ca = (ms = class {
  static {
    __name(this, "ms");
  }
  constructor() {
    h(this, "name", "TrieRouter");
    y(this, Te);
    f(this, Te, new Ia());
  }
  add(e, t, s) {
    const a = bs(t);
    if (a) {
      for (let n = 0, i = a.length; n < i; n++) u(this, Te).insert(e, a[n], s);
      return;
    }
    u(this, Te).insert(e, t, s);
  }
  match(e, t) {
    return u(this, Te).search(e, t);
  }
}, Te = /* @__PURE__ */ new WeakMap(), ms);
var A = class extends ya {
  static {
    __name(this, "A");
  }
  constructor(e = {}) {
    super(e), this.router = e.router ?? new Oa({ routers: [new Ra(), new Ca()] });
  }
};
var Ba = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var zt = /* @__PURE__ */ __name((e, t = La) => {
  const s = /\.([a-zA-Z0-9]+?)$/, a = e.match(s);
  if (!a) return;
  let n = t[a[1].toLowerCase()];
  return n && n.startsWith("text") && (n += "; charset=utf-8"), n;
}, "zt");
var Na = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var La = Na;
var Ma = /* @__PURE__ */ __name((...e) => {
  let t = e.filter((n) => n !== "").join("/");
  t = t.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const s = t.split("/"), a = [];
  for (const n of s) n === ".." && a.length > 0 && a.at(-1) !== ".." ? a.pop() : n !== "." && a.push(n);
  return a.join("/") || ".";
}, "Ma");
var Os = { br: ".br", zstd: ".zst", gzip: ".gz" };
var $a = Object.keys(Os);
var Fa = "index.html";
var qa = /* @__PURE__ */ __name((e) => {
  const t = e.root ?? "./", s = e.path, a = e.join ?? Ma;
  return async (n, i) => {
    var c, p, _, b;
    if (n.finalized) return i();
    let r;
    if (e.path) r = e.path;
    else try {
      if (r = hs(n.req.path), /(?:^|[\/\\])\.{1,2}(?:$|[\/\\])|[\/\\]{2,}/.test(r)) throw new Error();
    } catch {
      return await ((c = e.onNotFound) == null ? void 0 : c.call(e, n.req.path, n)), i();
    }
    let o = a(t, !s && e.rewriteRequestPath ? e.rewriteRequestPath(r) : r);
    e.isDir && await e.isDir(o) && (o = a(o, Fa));
    const d = e.getContent;
    let l = await d(o, n);
    if (l instanceof Response) return n.newResponse(l.body, l);
    if (l) {
      const v = e.mimes && zt(o, e.mimes) || zt(o);
      if (n.header("Content-Type", v || "application/octet-stream"), e.precompressed && (!v || Ba.test(v))) {
        const T = new Set((p = n.req.header("Accept-Encoding")) == null ? void 0 : p.split(",").map((E) => E.trim()));
        for (const E of $a) {
          if (!T.has(E)) continue;
          const D = await d(o + Os[E], n);
          if (D) {
            l = D, n.header("Content-Encoding", E), n.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((_ = e.onFound) == null ? void 0 : _.call(e, o, n)), n.body(l);
    }
    await ((b = e.onNotFound) == null ? void 0 : b.call(e, o, n)), await i();
  };
}, "qa");
var Pa = /* @__PURE__ */ __name(async (e, t) => {
  let s;
  t && t.manifest ? typeof t.manifest == "string" ? s = JSON.parse(t.manifest) : s = t.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? s = JSON.parse(__STATIC_CONTENT_MANIFEST) : s = __STATIC_CONTENT_MANIFEST;
  let a;
  t && t.namespace ? a = t.namespace : a = __STATIC_CONTENT;
  const n = s[e];
  if (!n) return null;
  const i = await a.get(n, { type: "stream" });
  return i || null;
}, "Pa");
var Ha = /* @__PURE__ */ __name((e) => async function(s, a) {
  return qa({ ...e, getContent: /* @__PURE__ */ __name(async (i) => Pa(i, { manifest: e.manifest, namespace: e.namespace ? e.namespace : s.env ? s.env.__STATIC_CONTENT : void 0 }), "getContent") })(s, a);
}, "Ha");
var Ua = /* @__PURE__ */ __name((e) => Ha(e), "Ua");
var G = { name: "Growth-engine365X", version: "ver1.00", tagline: "X \u81EA\u52D5\u6295\u7A3F\u30D7\u30E9\u30C3\u30C8\u30D5\u30A9\u30FC\u30E0", longName: "X \u81EA\u52D5\u6295\u7A3F\u30D7\u30E9\u30C3\u30C8\u30D5\u30A9\u30FC\u30E0", icon: "fa-bolt" };
var Wa = `
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<style>
:root{
  --sidebar:#1E2A3B;--sidebar-hover:#2A3B52;--sidebar-active:#2F4A7A;
  --accent:#2563EB;--accent-hover:#1D4ED8;--accent-light:#EFF6FF;
  --paper:#F7F8FB;--paper-soft:#F1F3F7;--card:#FFFFFF;
  --ink:#1F2937;--ink-muted:#6B7280;--ink-faint:#9CA3AF;--line:#E5E7EB;
}
*,*::before,*::after{box-sizing:border-box}
html,body{margin:0;padding:0;background:var(--paper);color:var(--ink);font-family:'Noto Sans JP',Inter,system-ui,sans-serif;font-size:14px;line-height:1.5;min-height:100vh}

/* ===== \u30EC\u30A4\u30A2\u30A6\u30C8 ===== */
.min-h-screen{min-height:100vh}
.flex{display:flex}.flex-col{flex-direction:column}.flex-1{flex:1 1 0%}
.flex-shrink-0{flex-shrink:0}.flex-wrap{flex-wrap:wrap}.min-w-0{min-width:0}
.items-center{align-items:center}.items-start{align-items:flex-start}
.justify-between{justify-content:space-between}.justify-center{justify-content:center}.justify-end{justify-content:flex-end}
.grid{display:grid}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}
@media(min-width:768px){.md:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}}
@media(min-width:1024px){.lg:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}
.overflow-y-auto{overflow-y:auto}.overflow-hidden{overflow:hidden}
.space-y-4>*+*{margin-top:1rem}.space-y-3>*+*{margin-top:.75rem}.space-y-2>*+*{margin-top:.5rem}
.fixed{position:fixed}.relative{position:relative}.absolute{position:absolute}
.inset-0{top:0;right:0;bottom:0;left:0}
.z-50{z-index:50}.z-40{z-index:40}

/* ===== \u30B5\u30A4\u30BA ===== */
.w-full{width:100%}.h-full{height:100%}
.w-56{width:14rem}.w-8{width:2rem}.h-8{height:2rem}
.w-13{width:3.25rem}.h-13{height:3.25rem}
.max-w-md{max-width:28rem}.max-w-xs{max-width:20rem}

/* ===== \u30B9\u30DA\u30FC\u30B7\u30F3\u30B0 ===== */
.p-2{padding:.5rem}.p-4{padding:1rem}.p-6{padding:1.5rem}.p-8{padding:2rem}
.px-1{padding-left:.25rem;padding-right:.25rem}
.px-3{padding-left:.75rem;padding-right:.75rem}
.px-4{padding-left:1rem;padding-right:1rem}
.px-6{padding-left:1.5rem;padding-right:1.5rem}
.py-2{padding-top:.5rem;padding-bottom:.5rem}
.py-3{padding-top:.75rem;padding-bottom:.75rem}
.py-4{padding-top:1rem;padding-bottom:1rem}
.py-6{padding-top:1.5rem;padding-bottom:1.5rem}
.py-10{padding-top:2.5rem;padding-bottom:2.5rem}
.mb-1{margin-bottom:.25rem}.mb-2{margin-bottom:.5rem}.mb-3{margin-bottom:.75rem}.mb-4{margin-bottom:1rem}.mb-6{margin-bottom:1.5rem}
.mt-0.5{margin-top:.125rem}.mt-1{margin-top:.25rem}.mt-2{margin-top:.5rem}.mt-3{margin-top:.75rem}.mt-4{margin-top:1rem}
.ml-1{margin-left:.25rem}.ml-2{margin-left:.5rem}.mr-2{margin-right:.5rem}.ml-auto{margin-left:auto}
.gap-1{gap:.25rem}.gap-2{gap:.5rem}.gap-3{gap:.75rem}.gap-4{gap:1rem}

/* ===== \u30C6\u30AD\u30B9\u30C8 ===== */
.text-xs{font-size:.75rem;line-height:1rem}
.text-sm{font-size:.875rem;line-height:1.25rem}
.text-base{font-size:1rem;line-height:1.5rem}
.text-lg{font-size:1.125rem;line-height:1.75rem}
.text-xl{font-size:1.25rem;line-height:1.75rem}
.text-2xl{font-size:1.5rem;line-height:2rem}
.text-[10px]{font-size:10px}
.text-[6px]{font-size:6px}
.font-medium{font-weight:500}.font-semibold{font-weight:600}.font-bold{font-weight:700}
.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.text-center{text-align:center}.text-left{text-align:left}.text-right{text-align:right}
.leading-relaxed{line-height:1.625}.underline{text-decoration:underline}
.uppercase{text-transform:uppercase}.tracking-wider{letter-spacing:.05em}
.whitespace-pre-wrap{white-space:pre-wrap}
.font-mono{font-family:'JetBrains Mono',monospace}

/* ===== \u30AB\u30E9\u30FC ===== */
.text-white{color:#fff}
.text-ink{color:var(--ink)}.text-ink-muted{color:var(--ink-muted)}.text-ink-faint{color:var(--ink-faint)}
.text-accent{color:var(--accent)}
.text-[#A7B6CE]{color:#A7B6CE}
.text-red-500{color:#EF4444}.text-red-600{color:#DC2626}.text-red-700{color:#B91C1C}
.text-amber-600{color:#D97706}.text-amber-800{color:#92400E}
.text-emerald-600{color:#059669}.text-emerald-700{color:#047857}.text-emerald-800{color:#065F46}
.text-blue-500{color:#3B82F6}
.bg-white{background:#fff}.bg-paper{background:var(--paper)}.bg-paper-soft{background:var(--paper-soft)}
.bg-accent{background:var(--accent)}
.bg-[#2F4A7A]{background:#2F4A7A}
.bg-sidebar{background:var(--sidebar)}
.bg-black/50{background:rgba(0,0,0,.5)}

/* ===== \u30DC\u30FC\u30C0\u30FC ===== */
.border{border:1px solid var(--line)}.border-b{border-bottom:1px solid var(--line)}.border-t{border-top:1px solid var(--line)}.border-r{border-right:1px solid var(--line)}
.border-line{border-color:var(--line)}
.border-[#2A3B52]{border-color:#2A3B52}
.rounded{border-radius:.25rem}.rounded-md{border-radius:.375rem}.rounded-lg{border-radius:.5rem}
.rounded-xl{border-radius:.75rem}.rounded-2xl{border-radius:1rem}.rounded-full{border-radius:9999px}
.shadow-sm{box-shadow:0 1px 2px rgba(0,0,0,.05)}
.shadow-xl{box-shadow:0 20px 25px -5px rgba(0,0,0,.1),0 10px 10px -5px rgba(0,0,0,.04)}

/* ===== \u30E6\u30FC\u30C6\u30A3\u30EA\u30C6\u30A3 ===== */
.cursor-pointer{cursor:pointer}
.hidden{display:none!important}.hide{display:none!important}.block{display:block}.inline-block{display:inline-block}.inline-flex{display:inline-flex}
.opacity-50{opacity:.5}.select-all{user-select:all}
.divider{height:1px;background:var(--line);margin:1rem 0}
.last:border-0:last-child{border-bottom:none!important}
.hover:text-white:hover{color:#fff}

/* ===== \u5165\u529B ===== */
.inp{
  display:block;width:100%;padding:.625rem .875rem;border-radius:.5rem;
  background:#fff;border:1px solid var(--line);color:var(--ink);
  font-size:.95rem;font-family:inherit;outline:none;
  transition:border-color .15s,box-shadow .15s;
}
.inp::placeholder{color:var(--ink-faint)}
.inp:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(37,99,235,.12)}
textarea.inp{min-height:6rem;resize:vertical;line-height:1.6}
select.inp{cursor:pointer}
.input-mono{font-family:'JetBrains Mono',monospace;letter-spacing:.05em}

/* ===== \u30DC\u30BF\u30F3 ===== */
.btn{
  display:inline-flex;align-items:center;gap:.4rem;
  padding:.55rem 1rem;border-radius:.4rem;
  font-size:.92rem;font-weight:500;font-family:inherit;
  cursor:pointer;transition:all .15s;border:1px solid transparent;
  line-height:1.25;white-space:nowrap;text-decoration:none;
}
.btn-primary{background:var(--accent);color:#fff;box-shadow:0 1px 2px rgba(0,0,0,.08)}
.btn-primary:hover{background:var(--accent-hover)}
.btn-ghost{background:#fff;color:var(--ink);border-color:var(--line)}
.btn-ghost:hover{background:var(--paper-soft);border-color:var(--ink-faint)}
.btn-subtle{background:var(--accent-light);color:var(--accent-hover);border-color:rgba(239,246,255,.5)}
.btn-subtle:hover{background:rgba(37,99,235,.1)}
.btn-danger{background:#fff;color:#B91C1C;border-color:#FECACA}
.btn-danger:hover{background:#FEF2F2}
.btn-sm{padding:.4rem .7rem;font-size:.8rem}

/* ===== \u30AB\u30FC\u30C9 ===== */
.card{background:#fff;border:1px solid var(--line);border-radius:.75rem;padding:1.5rem;box-shadow:0 1px 2px rgba(0,0,0,.05)}
.card-sm{padding:1rem}

/* ===== \u30B5\u30A4\u30C9\u30D0\u30FC ===== */
aside.w-56{
  width:14rem;background:var(--sidebar);
  flex-shrink:0;display:flex;flex-direction:column;min-height:100vh;
}
.nav-item{
  display:flex;align-items:center;gap:.7rem;
  padding:.68rem .9rem;border-radius:.4rem;
  font-size:.95rem;font-weight:600;color:#A7B6CE;
  cursor:pointer;transition:background .15s,color .15s;
  margin:2px .5rem;text-decoration:none;
}
.nav-item:hover{background:var(--sidebar-hover);color:#fff}
.nav-item.active{background:var(--sidebar-active);color:#fff;box-shadow:inset 3px 0 0 #60A5FA}
.nav-item i{width:1.2rem;text-align:center;font-size:1rem;opacity:.9;flex-shrink:0}

/* ===== \u30E9\u30D9\u30EB ===== */
.field-label{display:flex;align-items:center;gap:.4rem;font-size:.85rem;font-weight:600;color:var(--ink);margin-bottom:.4rem}
.field-label i.icon-red{color:#EF4444}.field-label i.icon-blue{color:#3B82F6}
.field-label i.icon-yellow{color:#F59E0B}.field-label i.icon-purple{color:#8B5CF6}.field-label i.icon-green{color:#10B981}

/* ===== \u30D0\u30C3\u30B8 ===== */
.pill{display:inline-flex;align-items:center;gap:.25rem;padding:.125rem .5rem;border-radius:9999px;font-size:.75rem;font-weight:600;border:1px solid transparent;white-space:nowrap}
.pill-ok{background:#ECFDF5;color:#065F46;border-color:#A7F3D0}
.pill-warn{background:#FFFBEB;color:#92400E;border-color:#FDE68A}
.pill-err{background:#FEF2F2;color:#991B1B;border-color:#FECACA}
.pill-soft{background:var(--paper-soft);color:var(--ink-muted);border-color:var(--line)}
.pill-blue{background:var(--accent-light);color:var(--accent-hover);border-color:rgba(239,246,255,.8)}

/* ===== \u30A2\u30E9\u30FC\u30C8 ===== */
.alert{display:flex;align-items:flex-start;gap:.5rem;padding:.75rem 1rem;border-radius:.375rem;font-size:.875rem;line-height:1.625;border:1px solid transparent}
.alert-warn{background:#FFFBEB;border-color:#FCD34D;color:#78350F}
.alert-ok{background:#ECFDF5;border-color:#6EE7B7;color:#064E3B}
.alert-err{background:#FEF2F2;border-color:#FECACA;color:#7F1D1D}
.alert-info{background:var(--accent-light);border-color:var(--accent-light);color:var(--accent-hover)}

/* ===== \u30C6\u30FC\u30D6\u30EB ===== */
table.data{width:100%;border-collapse:collapse;font-size:.875rem}
table.data thead th{padding:.625rem .75rem;text-align:left;font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--ink-muted);background:var(--paper-soft);border-bottom:1px solid var(--line)}
table.data tbody td{padding:.625rem .75rem;border-bottom:1px solid rgba(229,231,235,.6);color:var(--ink);vertical-align:middle}
table.data tbody tr:hover{background:#F9FAFB}

/* ===== FAB ===== */
.fab{position:fixed;bottom:1.5rem;right:1.5rem;width:3.25rem;height:3.25rem;border-radius:9999px;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 25px rgba(37,99,235,.35);cursor:pointer;border:none;transition:transform .15s,background .15s;z-index:40}
.fab:hover{transform:scale(1.05);background:var(--accent-hover)}

/* ===== \u4F7F\u7528\u4F8B\u30DC\u30BF\u30F3 ===== */
.example-btn{display:inline-flex;align-items:center;gap:.25rem;padding:.25rem .625rem;border-radius:.25rem;background:var(--accent-light);color:var(--accent-hover);border:1px solid rgba(239,246,255,.8);font-size:.75rem;font-weight:500;font-family:inherit;cursor:pointer;transition:background .15s}
.example-btn:hover{background:rgba(37,99,235,.1)}

/* ===== \u30BB\u30AF\u30B7\u30E7\u30F3\u30BF\u30A4\u30C8\u30EB ===== */
.section-title{display:flex;align-items:center;gap:.6rem;font-size:1.4rem;font-weight:700;color:var(--ink);margin:0 0 .35rem}
.section-title i{color:var(--accent)}
.section-desc{font-size:.85rem;color:var(--ink-muted);margin:.25rem 0 0}

/* ===== \u30ED\u30B0\u30A4\u30F3\u30AB\u30FC\u30C9 ===== */
.login-card{background:#fff;border:1px solid var(--line);border-radius:1rem;padding:2rem;box-shadow:0 20px 40px rgba(0,0,0,.1)}

/* ===== \u30BF\u30D6 ===== */
.tab-btn{display:inline-flex;align-items:center;gap:.375rem;padding:.5rem 1rem;font-size:.8rem;font-weight:500;font-family:inherit;cursor:pointer;border:none;border-bottom:2px solid transparent;background:transparent;color:var(--ink-muted);transition:color .15s,border-color .15s}
.tab-btn.active{color:var(--accent);border-bottom-color:var(--accent)}
.tab-btn:hover:not(.active){color:var(--ink)}
.tab-pane{display:none}.tab-pane.active{display:block}

/* ===== \u30E2\u30FC\u30C0\u30EB ===== */
.modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:50}
.modal-box{background:#fff;border-radius:.75rem;padding:1.5rem;width:100%;max-width:32rem;box-shadow:0 25px 50px rgba(0,0,0,.25)}

/* ===== \u30B9\u30AF\u30ED\u30FC\u30EB\u30D0\u30FC ===== */
::-webkit-scrollbar{width:6px;height:6px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:4px}
::-webkit-scrollbar-thumb:hover{background:#94A3B8}

/* ===== \u8FFD\u52A0: \u30EC\u30B9\u30DD\u30F3\u30B7\u30D6\u30FB\u30B5\u30A4\u30BA\u4FEE\u6B63 ===== */
html, body { font-size: 14px; }

/* Tailwind\u30EC\u30B9\u30DD\u30F3\u30B7\u30D6\u30B0\u30EA\u30C3\u30C9\uFF08CDN\u3067\u30AB\u30D0\u30FC\u3055\u308C\u308B\u304C\u5FF5\u306E\u305F\u3081\uFF09 */
@media(min-width:768px){.md:grid-cols-5{grid-template-columns:repeat(5,minmax(0,1fr))}}
@media(min-width:1024px){.lg:col-span-2{grid-column:span 2/span 2}}
@media(min-width:1024px){.lg:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}}

/* sr-only (\u30A2\u30AF\u30BB\u30B7\u30D3\u30EA\u30C6\u30A3) */
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}

/* p-3, gap-6 */
.p-3{padding:.75rem}.gap-6{gap:1.5rem}

/* ===== \u7BA1\u7406\u753B\u9762 (/admin) \u5C02\u7528\u30B9\u30BF\u30A4\u30EB ===== */
.bg-surface{background:#FFFFFF}
.bg-surface-raised{background:#F8FAFC}
.text-brand-400{color:#64748B}
.border-brand-800/40{border-color:#E5E7EB}
.bg-surface-raised/80{background:rgba(248,250,252,.95)}
.brand-logo{background:linear-gradient(135deg,#1E40AF,#2563EB)}
/* \u7BA1\u7406\u753B\u9762 \u4E2D\u592E\u5BC4\u305B\u5F37\u5236 + \u5E45\u3092\u72ED\u3081\u308B */
body.admin-body{background:#F1F5F9}
body.admin-body .min-h-screen{max-width:100%;margin:0 auto}
body.admin-body header > div,
body.admin-body nav > div,
body.admin-body main{margin-left:auto!important;margin-right:auto!important;width:100%}
body.admin-body main{max-width:90rem!important;padding-left:1.5rem;padding-right:1.5rem}
body.admin-body header > div,
body.admin-body nav > div{max-width:90rem;padding-left:1.5rem;padding-right:1.5rem}
body.admin-body nav{border-bottom:1px solid #E5E7EB}
body.admin-body section{max-width:90rem;margin:0 auto}
.tab-trigger{padding:.55rem 1rem;border-radius:.4rem .4rem 0 0;font-size:.9rem;font-weight:600;color:#64748B;background:transparent;border:none;cursor:pointer;border-bottom:2px solid transparent;transition:all .15s;white-space:nowrap}
.tab-trigger:hover{color:#1E40AF;background:#F1F5F9}
.tab-trigger.active{color:#1E40AF;border-bottom-color:#2563EB;background:#EFF6FF}
.data-table{width:100%;border-collapse:collapse;font-size:.88rem}
.data-table thead th{text-align:left;padding:.7rem .85rem;background:#F1F5F9;color:#1F2937;font-weight:600;font-size:.85rem;border-bottom:1px solid #E5E7EB}
.data-table tbody td{padding:.7rem .85rem;border-bottom:1px solid #F1F5F9;color:#1F2937;vertical-align:middle}
.data-table tbody tr:hover{background:#F8FAFC}
.admin-license-table th,.admin-license-table td{padding:.55rem .55rem}
.admin-license-table .license-email-input{width:12.5rem;min-width:10rem;padding:.35rem .45rem;font-size:.78rem}
.admin-actions{display:flex;gap:.3rem;white-space:nowrap;align-items:center}
.input-field{display:block;width:100%;padding:.5rem .75rem;border-radius:.4rem;background:#fff;border:1px solid #E5E7EB;color:#1F2937;font-size:.88rem;font-family:inherit;outline:none;transition:border-color .15s}
.input-field:focus{border-color:#2563EB;box-shadow:0 0 0 3px rgba(37,99,235,.12)}
.btn-ghost.text-xs{padding:.3rem .55rem;font-size:.72rem}
/* \u7BA1\u7406\u753B\u9762 .text-white \u3092\u5B9F\u8272\u306B */
header.bg-surface-raised/80 .text-white{color:#1F2937}
nav.bg-surface .text-white{color:#1F2937}
section .text-white{color:#1F2937}
.hidden-force{display:none!important}
.pill-warn{background:#FEF3C7;color:#92400E;padding:.15rem .5rem;border-radius:.25rem;font-size:.72rem;font-weight:600}
.pill-ok{background:#ECFDF5;color:#065F46;padding:.15rem .5rem;border-radius:.25rem;font-size:.72rem;font-weight:600}
.pill-blue{background:#EFF6FF;color:#1D4ED8;padding:.15rem .5rem;border-radius:.25rem;font-size:.72rem;font-weight:600}
.pill-soft{background:#F3F4F6;color:#6B7280;padding:.15rem .5rem;border-radius:.25rem;font-size:.72rem;font-weight:600}
.pill-err{background:#FEF2F2;color:#991B1B;padding:.15rem .5rem;border-radius:.25rem;font-size:.72rem;font-weight:600}

/* ===== \u30E2\u30D0\u30A4\u30EB \u30EC\u30B9\u30DD\u30F3\u30B7\u30D6 ===== */
.mobile-menu-toggle{display:none;position:fixed;top:.6rem;left:.6rem;z-index:60;background:var(--sidebar);color:#fff;border:none;border-radius:.4rem;width:2.5rem;height:2.5rem;cursor:pointer;font-size:1.1rem;box-shadow:0 2px 6px rgba(0,0,0,.2)}
.mobile-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:45}
@media(max-width:767px){
  html,body{font-size:14px}
  .mobile-menu-toggle{display:flex;align-items:center;justify-content:center}
  aside.w-56{position:fixed;top:0;left:0;height:100vh;z-index:50;transform:translateX(-100%);transition:transform .25s ease}
  aside.w-56.is-open{transform:translateX(0)}
  body.menu-open .mobile-overlay{display:block}
  main,.flex-1{padding-left:0!important}
  main{padding-top:3.5rem!important;padding-left:.75rem!important;padding-right:.75rem!important}
  .card{padding:1rem}
  .section-title{font-size:1.15rem}
  .section-desc{font-size:.78rem}
  .grid-cols-1.md:grid-cols-2,.grid-cols-1.md:grid-cols-3,.grid-cols-1.md:grid-cols-4,.grid-cols-1.md:grid-cols-5{grid-template-columns:1fr!important}
  table.data{display:block;overflow-x:auto;-webkit-overflow-scrolling:touch}
  .btn{padding:.55rem .8rem;font-size:.85rem}
  .inp{font-size:16px;padding:.55rem .7rem}
  /* \u30D1\u30BF\u30FC\u30F3\u5225AI\u751F\u6210 5\u30AB\u30FC\u30C9\u30922\u5217\u306B */
  #patt-grid{grid-template-columns:repeat(2,1fr)!important}
  #voice-grid{grid-template-columns:repeat(2,1fr)!important}
}
@media(max-width:480px){
  #patt-grid,#voice-grid{grid-template-columns:1fr 1fr!important}
}

/* hover\u7CFB */
.hover:bg-paper-soft:hover{background:var(--paper-soft)}
.hover:bg-accent-light:hover{background:var(--accent-light)}
.hover:border-accent:hover{border-color:var(--accent)}
.hover:text-ink:hover{color:var(--ink)}

/* bg-accent-light, border-accent, text-accent (\u5358\u72EC\u30AF\u30E9\u30B9) */
.bg-accent-light{background:var(--accent-light)}
.border-accent{border-color:var(--accent)}
.border-0{border:none}

/* \u30B5\u30A4\u30C9\u30D0\u30FC\u5E45\u78BA\u4FDD */
aside.w-56{
  width:14rem !important;
  min-width:14rem !important;
  flex-shrink:0 !important;
}

/* \u30CA\u30D3\u30B2\u30FC\u30B7\u30E7\u30F3\u7E26\u4E26\u3073\u4FDD\u8A3C */
nav.flex-1 { display:flex !important; flex-direction:column; }

/* \u30AB\u30FC\u30C9\u5185\u4F59\u767D */
.card { padding:1.25rem; }

/* \u30C6\u30FC\u30D6\u30EB\u30BB\u30EB\u4F59\u767D */
table.data tbody td { padding:.5rem .75rem; }

/* \u30E2\u30D0\u30A4\u30EB\u5BFE\u5FDC */
@media(max-width:640px){
  .flex-wrap{ flex-wrap:wrap }
  aside.w-56{ width:12rem !important; min-width:12rem !important }
}
</style>
`;
var Ya = "bg-paper text-ink min-h-screen font-sans antialiased";
function It(e, t, s = {}) {
  return `<!DOCTYPE html>
<html lang="ja">
<head>
${Wa}
<title>${e} \u2014 ${G.name}</title>
<script>
// \u65E9\u671F\u30B0\u30ED\u30FC\u30D0\u30EB\u5B9A\u7FA9: \u5404\u30DA\u30FC\u30B8script\u3067 toast() \u3092\u76F4\u63A5\u547C\u3079\u308B\u3088\u3046\u306B
window.toast = window.toast || function(msg, kind) {
  kind = kind || 'info';
  var host = document.getElementById('toast-host');
  if (!host) {
    host = document.createElement('div');
    host.id = 'toast-host';
    if (document.body) document.body.appendChild(host);
    else { document.addEventListener('DOMContentLoaded', function(){ document.body.appendChild(host); }); }
  }
  var bg = kind === 'ok' ? '#065F46' : kind === 'err' ? '#991B1B' : '#1F2937';
  var icon = kind === 'ok' ? 'fa-check' : kind === 'err' ? 'fa-xmark' : 'fa-info-circle';
  var t = document.createElement('div');
  t.style.cssText = 'position:fixed;bottom:1rem;right:1rem;z-index:100;background:' + bg + ';color:#fff;padding:.65rem 1rem;border-radius:.45rem;font-size:.82rem;box-shadow:0 8px 20px rgba(0,0,0,.25);display:flex;align-items:center;gap:.5rem;';
  t.innerHTML = '<i class="fas ' + icon + '"></i>' + msg;
  host.appendChild(t);
  setTimeout(function(){ t.remove(); }, 3000);
};
window.doLogout = window.doLogout || function() {
  fetch('/api/auth/logout', { method: 'POST' }).then(function(){ location.href = '/login'; });
};
window.switchAccount = window.switchAccount || function(id) {
  if (!id) return;
  fetch('/api/admin/accounts/' + id + '/current', { method: 'POST' }).then(function(){ location.reload(); });
};
// JST\u56FA\u5B9A\u3067 datetime-local \u7528\u306E\u5024 (YYYY-MM-DDTHH:MM) \u3092\u751F\u6210
// addMinutes: \u4F55\u5206\u5F8C\u306E\u6642\u523B\u306B\u3059\u308B\u304B (\u30C7\u30D5\u30A9\u30EB\u30C80=\u73FE\u5728\u306EJST\u6642\u523B)
// \u6CE8\u610F: <input type="datetime-local"> \u306F\u30D6\u30E9\u30A6\u30B6TZ\u3067value\u3092\u89E3\u91C8\u3059\u308B\u305F\u3081\u3001
//       \u30D6\u30E9\u30A6\u30B6TZ\u304CJST\u3067\u306A\u3044\u5834\u5408\u306F\u8868\u793A\u304C\u30BA\u30EC\u308B\u3002\u672C\u95A2\u6570\u306F\u30D6\u30E9\u30A6\u30B6TZ\u88DC\u6B63\u6E08\u306E\u5024\u3092\u8FD4\u3059\u3002
window.jstNowDatetimeLocal = window.jstNowDatetimeLocal || function(addMinutes) {
  // \u73FE\u5728\u306EJST\u3092\u8868\u3059\u6642\u523B (UTC\u57FA\u6E96\u306Ems)
  var nowMs = Date.now() + ((addMinutes||0) * 60 * 1000);
  // \u30B5\u30FC\u30D0\u30FC\u6642\u523B\u30AA\u30D5\u30BB\u30C3\u30C8\u304C\u3042\u308C\u3070\u88DC\u6B63
  if (typeof window.serverTimeOffsetMs === 'number') nowMs += window.serverTimeOffsetMs;
  // \u30D6\u30E9\u30A6\u30B6\u306E\u30ED\u30FC\u30AB\u30EBTZ\u8868\u793A\u3067\u300CJST\u3068\u540C\u3058\u6642\u523B\u6587\u5B57\u5217\u300D\u304C\u8868\u793A\u3055\u308C\u308B\u3088\u3046\u306B\u3001
  // \u30ED\u30FC\u30AB\u30EBTZ-JST \u306E\u5DEE\u5206\u3092\u52A0\u7B97\u3059\u308B\uFF08JST\u30D6\u30E9\u30A6\u30B6\u3067\u306F\u5DEE\u5206=0\u3067\u4F55\u3082\u5909\u308F\u3089\u306A\u3044\uFF09
  var localOffsetMin = new Date(nowMs).getTimezoneOffset(); // \u30ED\u30FC\u30AB\u30EB\u2192UTC\u306E\u5206\uFF08JST\u306A\u3089-540\uFF09
  var jstOffsetMin = -540; // JST = UTC+9 = -540\u5206
  var diffMin = jstOffsetMin - localOffsetMin;
  var displayMs = nowMs + (diffMin * 60 * 1000);
  var dd = new Date(displayMs);
  var pad = function(n){ return String(n).padStart(2,'0'); };
  return dd.getFullYear()+'-'+pad(dd.getMonth()+1)+'-'+pad(dd.getDate())+'T'+pad(dd.getHours())+':'+pad(dd.getMinutes());
};
// datetime-local \u306E\u5024 (\u30ED\u30FC\u30AB\u30EBTZ\u3067\u89E3\u91C8\u3055\u308C\u308B) \u3092 JST\u6587\u5B57\u5217\u306B\u5909\u63DB\u3059\u308B\u30D8\u30EB\u30D1\u30FC
window.datetimeLocalToJst = window.datetimeLocalToJst || function(dtValue) {
  if (!dtValue) return '';
  // dtValue \u306F YYYY-MM-DDTHH:MM \u5F62\u5F0F\u3002\u30D6\u30E9\u30A6\u30B6\u306F\u3053\u308C\u3092\u30ED\u30FC\u30AB\u30EBTZ\u6642\u523B\u3068\u3057\u3066\u89E3\u91C8\u3059\u308B\u3002
  // jstNowDatetimeLocal \u3067\u88DC\u6B63\u6E08\u306E\u5024\u304C\u5165\u3063\u3066\u3044\u308C\u3070\u3001\u3053\u308C\u306F\u300CJST\u6642\u523B \u3092\u30ED\u30FC\u30AB\u30EBTZ\u8868\u793A\u306B\u5909\u63DB\u3057\u305F\u5024\u300D\u306B\u306A\u308B\u3002
  // \u3064\u307E\u308A new Date(dtValue) \u3059\u308B\u3068 \u30ED\u30FC\u30AB\u30EBTZ \u2192 UTC\u5909\u63DB\u304C\u884C\u308F\u308C\u3001JST\u304B\u30899\u6642\u9593\u5F15\u304B\u308C\u308B\u3002
  // \u305D\u308C\u3092 JST \u306B\u623B\u3059\u306B\u306F\u518D\u5EA6 +9\u6642\u9593 \u3059\u308B\u3002
  var d = new Date(dtValue);
  var jstMs = d.getTime() + (9 * 60 * 60 * 1000);
  var jst = new Date(jstMs);
  var pad = function(n){ return String(n).padStart(2,'0'); };
  return jst.getUTCFullYear()+'-'+pad(jst.getUTCMonth()+1)+'-'+pad(jst.getUTCDate())+' '+pad(jst.getUTCHours())+':'+pad(jst.getUTCMinutes())+':'+pad(jst.getUTCSeconds());
};

// \u2605 \u81EA\u52D5 cron \u30AD\u30C3\u30AB\u30FC: \u30E6\u30FC\u30B6\u30FC\u304C\u30C0\u30C3\u30B7\u30E5\u30DC\u30FC\u30C9\u3092\u958B\u304F\u305F\u3073\u306B\u3001\u88CF\u3067 /cron/tick \u3092\u547C\u3076
//    Cloudflare cron triggers \u304C\u672A\u8A2D\u5B9A/\u672A\u7A3C\u50CD\u3067\u3082\u3001\u30E6\u30FC\u30B6\u30FC\u304C\u753B\u9762\u3092\u958B\u3051\u3070\u4E88\u7D04\u6295\u7A3F\u304C\u5B9F\u884C\u3055\u308C\u308B\u3002
//    \u591A\u6570\u306E\u30E6\u30FC\u30B6\u30FC\u304C\u5229\u7528\u3059\u308B\u30B7\u30B9\u30C6\u30E0\u3067\u306F\u8AB0\u304B\u3057\u3089\u304C\u30C0\u30C3\u30B7\u30E5\u30DC\u30FC\u30C9\u3092\u958B\u3044\u3066\u3044\u308B\u305F\u3081\u3001
//    \u5B9F\u8CEA\u7684\u306B\u5E38\u6642\u52D5\u4F5C\u3059\u308B\u3002\u5B9F\u884C\u983B\u5EA6\u306F1\u30DA\u30FC\u30B8\u306B\u3064\u304D\u521D\u56DE(2\u79D2\u5F8C)+5\u5206\u6BCE\u306E\u9593\u9694\u3002
//    \u8A8D\u8A3C\u5FC5\u9808\u30A8\u30F3\u30C9\u30DD\u30A4\u30F3\u30C8\u306A\u306E\u3067\u30ED\u30B0\u30A4\u30F3\u4E2D\u306E\u30E6\u30FC\u30B6\u30FC\u3057\u304B\u8D77\u52D5\u3067\u304D\u305A\u3001\u5B89\u5168\u3002
window.__autoCronStart = window.__autoCronStart || function() {
  if (window.__autoCronStarted) return;
  window.__autoCronStarted = true;
  // \u30ED\u30B0\u30A4\u30F3\u753B\u9762\u30FB\u7BA1\u7406\u753B\u9762\u306F\u9664\u5916
  var path = location.pathname;
  if (path === '/login' || path.indexOf('/admin') === 0 || path === '/') return;
  // \u30B5\u30FC\u30D0\u30FC\u6642\u523B\u540C\u671F\uFF08\u30D6\u30E9\u30A6\u30B6\u3068\u30B5\u30FC\u30D0\u30FC\u306E\u30BA\u30EC\u53D6\u5F97\uFF09
  fetch('/api/server-time').then(function(r){ return r.json(); }).then(function(j){
    if (j && j.now_ms) {
      window.serverTimeOffsetMs = j.now_ms - Date.now();
    }
  }).catch(function(){});
  // tick \u8D77\u52D5\u95A2\u6570\uFF08\u30D0\u30C3\u30AF\u30B0\u30E9\u30A6\u30F3\u30C9\u5B9F\u884C\u3001\u7D50\u679C\u306F\u7121\u8996\uFF09
  var runTick = function() {
    fetch('/api/admin/cron/run-tick', { method:'POST', headers:{'content-type':'application/json'}, body:'{}' })
      .then(function(r){ return r.json(); })
      .then(function(j){
        if (j && j.success && j.result) {
          var processed = j.result.processed || 0;
          var success = j.result.success || 0;
          if (processed > 0 && success > 0 && typeof toast === 'function') {
            toast('\u4E88\u7D04\u6295\u7A3F ' + success + ' \u4EF6\u3092\u5B9F\u884C\u3057\u307E\u3057\u305F', 'ok');
          }
        }
      })
      .catch(function(){});
    fetch('/api/admin/cron/run-autopilot', { method:'POST', headers:{'content-type':'application/json'}, body:'{}' })
      .then(function(){}).catch(function(){});
  };
  // \u521D\u56DE: \u30DA\u30FC\u30B8\u30ED\u30FC\u30C92\u79D2\u5F8C\uFF08\u63CF\u753B\u512A\u5148\uFF09
  setTimeout(runTick, 2000);
  // \u4EE5\u964D: 5\u5206\u6BCE
  setInterval(runTick, 5 * 60 * 1000);
};
// \u81EA\u52D5\u8D77\u52D5
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){ window.__autoCronStart(); });
  } else {
    window.__autoCronStart();
  }
}
// \u30B0\u30ED\u30FC\u30D0\u30EB\u540D\u524D\u7A7A\u9593\u306E var \u3068\u3057\u3066\u518D\u5BA3\u8A00\uFF08\u5404\u30DA\u30FC\u30B8 <script> \u304B\u3089\u76F4\u63A5 toast() \u3092\u547C\u3079\u308B\u3088\u3046 var \u5BA3\u8A00\uFF09
var toast = window.toast;
var doLogout = window.doLogout;
var switchAccount = window.switchAccount;
<\/script>
</head>
<body class="${s.bodyClass ?? Ya}">
${t}
</body>
</html>`;
}
__name(It, "It");
var js = new A();
js.get("/login", (e) => {
  const t = `
<main class="min-h-screen flex items-center justify-center px-4 py-12 bg-paper">
  <div class="w-full max-w-md">
    <!-- \u30D6\u30E9\u30F3\u30C9\u30ED\u30B4 -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center gap-2 mb-3">
        <div class="w-11 h-11 rounded-xl bg-sidebar flex items-center justify-center">
          <i class="fas ${G.icon} text-white text-xl"></i>
        </div>
        <div class="text-left">
          <div class="text-xl font-bold text-ink tracking-tight">${G.name}</div>
          <div class="text-xs text-ink-muted">${G.tagline}</div>
        </div>
      </div>
    </div>

    <!-- \u30BF\u30D6\u4ED8\u304D\u30AB\u30FC\u30C9 -->
    <div class="login-card">
      <div class="flex gap-1 mb-6 p-1 bg-paper rounded-lg">
        <button onclick="showTab('login')"    id="tab-login"    class="flex-1 py-2 text-sm rounded-md bg-white text-accent shadow-sm font-semibold">\u30ED\u30B0\u30A4\u30F3</button>
        <button onclick="showTab('register')" id="tab-register" class="flex-1 py-2 text-sm rounded-md text-ink-muted hover:text-ink">\u65B0\u898F\u767B\u9332</button>
        <button onclick="showTab('license')"  id="tab-license"  class="flex-1 py-2 text-sm rounded-md text-ink-muted hover:text-ink">\u30E9\u30A4\u30BB\u30F3\u30B9</button>
      </div>

      <!-- \u30ED\u30B0\u30A4\u30F3 -->
      <form id="login-form" class="space-y-4" onsubmit="return doLogin(event)">
        <div>
          <label class="field-label"><i class="fas fa-envelope icon-blue"></i>\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9</label>
          <input type="email" id="login-email" class="inp" required autocomplete="email">
        </div>
        <div>
          <label class="field-label"><i class="fas fa-lock icon-yellow"></i>\u30D1\u30B9\u30EF\u30FC\u30C9</label>
          <input type="password" id="login-password" class="inp" required autocomplete="current-password">
        </div>
        <button type="submit" class="btn btn-primary w-full justify-center">
          <i class="fas fa-arrow-right-to-bracket"></i>\u30ED\u30B0\u30A4\u30F3
        </button>
        <div id="login-error" class="text-red-600 text-xs text-center hide"></div>
      </form>

      <!-- \u65B0\u898F\u767B\u9332 -->
      <form id="register-form" class="space-y-4 hide" onsubmit="return doRegister(event)">
        <div>
          <label class="field-label"><i class="fas fa-envelope icon-blue"></i>\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9</label>
          <input type="email" id="reg-email" class="inp" required>
        </div>
        <div>
          <label class="field-label"><i class="fas fa-lock icon-yellow"></i>\u30D1\u30B9\u30EF\u30FC\u30C9 <span class="text-ink-faint">(8\u6587\u5B57\u4EE5\u4E0A)</span></label>
          <input type="password" id="reg-password" class="inp" required minlength="8">
        </div>
        <button type="submit" class="btn btn-primary w-full justify-center">
          <i class="fas fa-user-plus"></i>\u767B\u9332
        </button>
        <div id="register-error" class="text-red-600 text-xs text-center hide"></div>
        <div id="register-success" class="text-emerald-700 text-xs text-center hide"></div>
      </form>

      <!-- \u30E9\u30A4\u30BB\u30F3\u30B9\u30AD\u30FC\u8A8D\u8A3C -->
      <form id="license-form" class="space-y-4 hide" onsubmit="return doLicenseActivate(event)">
        <div class="alert alert-info">
          <i class="fas fa-info-circle mt-0.5"></i>
          <div class="text-xs">
            \u30ED\u30B0\u30A4\u30F3\u6E08\u30A2\u30AB\u30A6\u30F3\u30C8\u306B\u30E9\u30A4\u30BB\u30F3\u30B9\u30AD\u30FC\u3092\u7D10\u4ED8\u3051\u307E\u3059\u3002<br>
            \u672A\u30ED\u30B0\u30A4\u30F3\u306E\u5834\u5408\u306F\u3001\u5148\u306B\u30ED\u30B0\u30A4\u30F3\u307E\u305F\u306F\u65B0\u898F\u767B\u9332\u3057\u3066\u304F\u3060\u3055\u3044\u3002
          </div>
        </div>
        <div>
          <label class="field-label"><i class="fas fa-key icon-yellow"></i>\u30E9\u30A4\u30BB\u30F3\u30B9\u30AD\u30FC</label>
          <input type="text" id="license-key" class="inp input-mono" style="text-transform:uppercase"
                 placeholder="VPS-GE365X-XXXXXXXX" required
                 pattern="VPS-GE365X-[A-Za-z0-9]{6,12}">
        </div>
        <button type="submit" class="btn btn-primary w-full justify-center">
          <i class="fas fa-key"></i>\u30E9\u30A4\u30BB\u30F3\u30B9\u3092\u8A8D\u8A3C
        </button>
        <div id="license-error" class="text-red-600 text-xs text-center hide"></div>
        <div id="license-success" class="text-emerald-700 text-xs text-center hide"></div>
      </form>
    </div>

    <p class="text-center text-ink-faint text-xs mt-6">
      \xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} ${G.name}
    </p>
  </div>
</main>

<script>
function showTab(name) {
  ['login','register','license'].forEach(n => {
    const tab = document.getElementById('tab-' + n);
    if (n === name) {
      tab.className = 'flex-1 py-2 text-sm rounded-md bg-white text-accent shadow-sm font-semibold';
    } else {
      tab.className = 'flex-1 py-2 text-sm rounded-md text-ink-muted hover:text-ink';
    }
    document.getElementById(n + '-form').classList.toggle('hide', n !== name);
  });
  ['login-error','register-error','register-success','license-error','license-success']
    .forEach(id => { const el = document.getElementById(id); if (el) el.classList.add('hide'); });
}

function showError(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.classList.remove('hide');
}
function showSuccess(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.classList.remove('hide');
}

async function doLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  try {
    const r = await fetch('/api/auth/login', {
      method: 'POST', headers: {'content-type':'application/json'},
      body: JSON.stringify({ email, password }),
    });
    const j = await r.json();
    if (!r.ok) {
      const map = {
        invalid_credentials: '\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u307E\u305F\u306F\u30D1\u30B9\u30EF\u30FC\u30C9\u304C\u9055\u3044\u307E\u3059',
        not_approved: '\u7BA1\u7406\u8005\u306B\u3088\u308B\u627F\u8A8D\u5F85\u3061\u3067\u3059',
        invalid_input: '\u5165\u529B\u5185\u5BB9\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044',
      };
      showError('login-error', map[j.error] || '\u30ED\u30B0\u30A4\u30F3\u306B\u5931\u6557\u3057\u307E\u3057\u305F');
      return false;
    }
    location.href = j.is_admin ? '/admin' : '/dashboard';
  } catch (err) {
    showError('login-error', '\u901A\u4FE1\u30A8\u30E9\u30FC: ' + err.message);
  }
  return false;
}

async function doRegister(e) {
  e.preventDefault();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  try {
    const r = await fetch('/api/auth/register', {
      method: 'POST', headers: {'content-type':'application/json'},
      body: JSON.stringify({ email, password }),
    });
    const j = await r.json();
    if (!r.ok) {
      const map = {
        email_taken: '\u3053\u306E\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u306F\u65E2\u306B\u767B\u9332\u3055\u308C\u3066\u3044\u307E\u3059',
        invite_only: '\u73FE\u5728\u306F\u62DB\u5F85\u5236\u3067\u3059\u3002\u7BA1\u7406\u8005\u3078\u3054\u9023\u7D61\u304F\u3060\u3055\u3044\u3002',
        invalid_input: '\u5165\u529B\u5185\u5BB9\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044',
      };
      showError('register-error', map[j.error] || '\u767B\u9332\u306B\u5931\u6557\u3057\u307E\u3057\u305F');
      return false;
    }
    showSuccess('register-success', j.message || '\u767B\u9332\u3057\u307E\u3057\u305F');
  } catch (err) {
    showError('register-error', '\u901A\u4FE1\u30A8\u30E9\u30FC: ' + err.message);
  }
  return false;
}

async function doLicenseActivate(e) {
  e.preventDefault();
  const license_key = document.getElementById('license-key').value.trim().toUpperCase();
  try {
    const r = await fetch('/api/auth/license/activate', {
      method: 'POST', headers: {'content-type':'application/json'},
      body: JSON.stringify({ license_key }),
    });
    const j = await r.json();
    if (!r.ok) {
      const map = {
        unauthenticated: '\u5148\u306B\u30ED\u30B0\u30A4\u30F3\u3057\u3066\u304F\u3060\u3055\u3044',
        invalid_license_format: '\u30E9\u30A4\u30BB\u30F3\u30B9\u30AD\u30FC\u306E\u66F8\u5F0F\u304C\u4E0D\u6B63\u3067\u3059',
        license_not_found: '\u30E9\u30A4\u30BB\u30F3\u30B9\u30AD\u30FC\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093',
        license_inactive: '\u3053\u306E\u30E9\u30A4\u30BB\u30F3\u30B9\u306F\u7121\u52B9\u5316\u3055\u308C\u3066\u3044\u307E\u3059',
        license_expired: '\u3053\u306E\u30E9\u30A4\u30BB\u30F3\u30B9\u306F\u671F\u9650\u5207\u308C\u3067\u3059',
        license_already_used: '\u3053\u306E\u30E9\u30A4\u30BB\u30F3\u30B9\u306F\u4ED6\u306E\u30A2\u30AB\u30A6\u30F3\u30C8\u3067\u4F7F\u7528\u4E2D\u3067\u3059',
      };
      showError('license-error', map[j.error] || '\u30A2\u30AF\u30C6\u30A3\u30D9\u30FC\u30C8\u306B\u5931\u6557\u3057\u307E\u3057\u305F');
      return false;
    }
    showSuccess('license-success', \`\u8A8D\u8A3C\u5B8C\u4E86: \${j.plan_code} / \${j.status}\`);
    setTimeout(() => { location.href = '/dashboard'; }, 1200);
  } catch (err) {
    showError('license-error', '\u901A\u4FE1\u30A8\u30E9\u30FC: ' + err.message);
  }
  return false;
}
<\/script>
`;
  return e.html(It("\u30ED\u30B0\u30A4\u30F3", t));
});
var ie = new TextEncoder();
var Is = new TextDecoder();
function ut(e) {
  let t = "";
  for (let s = 0; s < e.length; s++) t += String.fromCharCode(e[s]);
  return btoa(t);
}
__name(ut, "ut");
function pt(e) {
  const t = atob(e), s = new Uint8Array(t.length);
  for (let a = 0; a < t.length; a++) s[a] = t.charCodeAt(a);
  return s;
}
__name(pt, "pt");
function St(e) {
  return ut(e).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
__name(St, "St");
function Vt(e) {
  const t = "=".repeat((4 - e.length % 4) % 4);
  return pt((e + t).replace(/-/g, "+").replace(/_/g, "/"));
}
__name(Vt, "Vt");
function Ct(e) {
  const t = new Uint8Array(e);
  return crypto.getRandomValues(t), t;
}
__name(Ct, "Ct");
var Xt = 1e5;
var Ja = 32;
async function Bt(e) {
  const t = Ct(16), s = await crypto.subtle.importKey("raw", ie.encode(e), { name: "PBKDF2" }, false, ["deriveBits"]), a = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: t, iterations: Xt, hash: "SHA-256" }, s, Ja * 8);
  return `pbkdf2$${Xt}$${ut(t)}$${ut(new Uint8Array(a))}`;
}
__name(Bt, "Bt");
async function Cs(e, t) {
  try {
    const [s, a, n, i] = t.split("$");
    if (s !== "pbkdf2") return false;
    const r = parseInt(a, 10), o = pt(n), d = pt(i), l = await crypto.subtle.importKey("raw", ie.encode(e), { name: "PBKDF2" }, false, ["deriveBits"]), c = new Uint8Array(await crypto.subtle.deriveBits({ name: "PBKDF2", salt: o, iterations: r, hash: "SHA-256" }, l, d.length * 8));
    return Ka(c, d);
  } catch {
    return false;
  }
}
__name(Cs, "Cs");
function Ka(e, t) {
  if (e.length !== t.length) return false;
  let s = 0;
  for (let a = 0; a < e.length; a++) s |= e[a] ^ t[a];
  return s === 0;
}
__name(Ka, "Ka");
async function Bs(e) {
  return crypto.subtle.importKey("raw", ie.encode(e), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}
__name(Bs, "Bs");
async function za(e, t, s = 3600 * 24 * 7) {
  const a = Math.floor(Date.now() / 1e3), n = { iat: a, exp: a + s, ...e }, i = St(ie.encode(JSON.stringify({ alg: "HS256", typ: "JWT" }))), r = St(ie.encode(JSON.stringify(n))), o = `${i}.${r}`, d = await Bs(t), l = new Uint8Array(await crypto.subtle.sign("HMAC", d, ie.encode(o)));
  return `${o}.${St(l)}`;
}
__name(za, "za");
async function Va(e, t) {
  try {
    const [s, a, n] = e.split(".");
    if (!s || !a || !n) return null;
    const i = await Bs(t);
    if (!await crypto.subtle.verify("HMAC", i, Vt(n), ie.encode(`${s}.${a}`))) return null;
    const o = JSON.parse(Is.decode(Vt(a)));
    return o.exp && o.exp < Math.floor(Date.now() / 1e3) ? null : o;
  } catch {
    return null;
  }
}
__name(Va, "Va");
async function Ns(e) {
  const t = ie.encode(e), s = t.length >= 32 ? t.slice(0, 32) : new Uint8Array(await crypto.subtle.digest("SHA-256", t));
  return crypto.subtle.importKey("raw", s, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
}
__name(Ns, "Ns");
async function _e(e, t) {
  const s = Ct(12), a = await Ns(t), n = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv: s }, a, ie.encode(e))), i = new Uint8Array(s.length + n.length);
  return i.set(s), i.set(n, s.length), ut(i);
}
__name(_e, "_e");
async function At(e, t) {
  const s = pt(e), a = s.slice(0, 12), n = s.slice(12);
  const tryKeys = [t, "ge365x-encryption-key-2026-shared", "ge365x-default-encryption-key-2026"].filter((k) => k && k.length > 0);
  for (const k of tryKeys) {
    try {
      const i = await Ns(k), r = await crypto.subtle.decrypt({ name: "AES-GCM", iv: a }, i, n);
      const dec = Is.decode(r);
      if (dec && dec.length > 0) return dec;
    } catch {
    }
  }
  throw new Error("decrypt_failed");
}
__name(At, "At");
var Gt = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function Zt(e = "VPS-GE365X") {
  const t = Ct(8);
  let s = "";
  for (let a = 0; a < 8; a++) s += Gt[t[a] % Gt.length];
  return `${e}-${s}`;
}
__name(Zt, "Zt");
async function Gx(e, t) {
  try {
    if (!e.env.LICENSE_HUB_SHARED_SECRET) return { ok: false, skipped: true, error: "missing_license_hub_secret" };
    const s = String(e.env.LICENSE_HUB_URL || "https://ge365-license-hub.1btcjpy.workers.dev").replace(/\/+$/, "");
    const a = await fetch(`${s}/api/license/register-issued`, { method: "POST", headers: { "content-type": "application/json", "x-license-hub-secret": String(e.env.LICENSE_HUB_SHARED_SECRET || "").trim() }, body: JSON.stringify(t) });
    const n = await a.json().catch(() => ({}));
    return a.ok ? n : { ok: false, status: a.status, ...n };
  } catch (s) {
    return { ok: false, error: (s == null ? void 0 : s.message) || String(s) };
  }
}
__name(Gx, "Gx");
async function Hx(e, t) {
  try {
    const s = String(t.to || "").trim().toLowerCase();
    if (!s || !s.includes("@")) return { ok: false, skipped: true, error: "missing_email" };
    if (!e.env.RESEND_API_KEY) return { ok: false, skipped: true, error: "missing_resend_api_key" };
    const a = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${String(e.env.RESEND_API_KEY).trim()}` },
      body: JSON.stringify({
        from: e.env.EMAIL_FROM || "GE365X <onboarding@resend.dev>",
        to: s,
        subject: "GE365X ライセンスキー発行のお知らせ",
        text: `GE365Xのライセンスキーを発行しました。\n\nライセンスキー: ${t.license_key}\nプラン: ${t.plan_code || "-"}\n期限: ${t.expires_at || "無期限"}\n\nログイン画面のライセンスタブから認証してください。`
      })
    });
    const n = await a.json().catch(() => ({}));
    const i = n?.message || n?.error || (n?.errors && n.errors[0] && (n.errors[0].message || n.errors[0].error));
    return a.ok ? { ok: true, result: n } : { ok: false, status: a.status, error: i || `resend_${a.status}`, result: n };
  } catch (s) {
    return { ok: false, error: (s == null ? void 0 : s.message) || String(s) };
  }
}
__name(Hx, "Hx");
function Xa(e) {
  return /^VPS-GE365X-[A-Z0-9]{6,12}$/i.test(e.trim());
}
__name(Xa, "Xa");
function g() {
  return new Date(Date.now() + 324e5).toISOString().replace("T", " ").slice(0, 19);
}
__name(g, "g");
function ge365xAddSecondsJst(e, t) {
  const s = Date.parse(String(e || "").replace(" ", "T") + "+09:00");
  if (Number.isNaN(s)) return e;
  return new Date(s + t * 1e3 + 324e5).toISOString().replace("T", " ").slice(0, 19);
}
__name(ge365xAddSecondsJst, "ge365xAddSecondsJst");
function Ga(e, t) {
  const a = (e.headers.get("cookie") || "").split(";").map((n) => n.trim()).find((n) => n.startsWith(t + "="));
  return a ? decodeURIComponent(a.slice(t.length + 1)) : null;
}
__name(Ga, "Ga");
function Ls(e, t, s = {}) {
  const a = [`${e}=${encodeURIComponent(t)}`];
  return a.push(`Path=${s.path ?? "/"}`), s.maxAge !== void 0 && a.push(`Max-Age=${s.maxAge}`), s.httpOnly !== false && a.push("HttpOnly"), s.secure !== false && a.push("Secure"), a.push(`SameSite=${s.sameSite ?? "Lax"}`), a.join("; ");
}
__name(Ls, "Ls");
var Nt = "ge365x_session";
function Za(e) {
  const t = e.req.header("Authorization") || e.req.header("authorization");
  return t && t.startsWith("Bearer ") ? t.slice(7) : Ga(e.req.raw, Nt);
}
__name(Za, "Za");
async function m(e, t) {
  const s = Za(e);
  if (!s) return e.json({ error: "unauthenticated" }, 401);
  const a = await Va(s, e.env.JWT_SECRET);
  if (!(a != null && a.uid)) {
    const clear3 = Ls(Nt, "", { maxAge: 0 });
    return new Response(JSON.stringify({ error: "invalid_token", message: "\u30BB\u30C3\u30B7\u30E7\u30F3\u304C\u7121\u52B9\u3067\u3059\u3002\u518D\u5EA6\u30ED\u30B0\u30A4\u30F3\u3057\u3066\u304F\u3060\u3055\u3044" }), { status: 401, headers: { "content-type": "application/json", "set-cookie": clear3 } });
  }
  try {
    const sess = await e.env.DB.prepare("SELECT value FROM system_settings WHERE key = ?").bind("user_session_iat:" + a.uid).first();
    if (sess && sess.value) {
      const validFrom = parseInt(sess.value, 10);
      if (a.iat && a.iat < validFrom) {
        const clear3 = Ls(Nt, "", { maxAge: 0 });
        return new Response(JSON.stringify({ error: "session_replaced", message: "\u5225\u306E\u7AEF\u672B\u3067\u30ED\u30B0\u30A4\u30F3\u3055\u308C\u305F\u305F\u3081\u30BB\u30C3\u30B7\u30E7\u30F3\u304C\u7121\u52B9\u5316\u3055\u308C\u307E\u3057\u305F" }), { status: 401, headers: { "content-type": "application/json", "set-cookie": clear3 } });
      }
    }
  } catch {
  }
  const n = await e.env.DB.prepare("SELECT id,email,is_approved,is_admin,trial_start,trial_end FROM users WHERE id = ?").bind(a.uid).first();
  if (!n) {
    const clear3 = Ls(Nt, "", { maxAge: 0 });
    return new Response(JSON.stringify({ error: "user_not_found", message: "\u30E6\u30FC\u30B6\u30FC\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3002\u518D\u5EA6\u30ED\u30B0\u30A4\u30F3\u3057\u3066\u304F\u3060\u3055\u3044" }), { status: 401, headers: { "content-type": "application/json", "set-cookie": clear3 } });
  }
  if (n.is_approved === 0) return e.json({ error: "not_approved", message: "\u30A2\u30AB\u30A6\u30F3\u30C8\u304C\u627F\u8A8D\u5F85\u3061\u3067\u3059" }, 403);
  const i = await e.env.DB.prepare("SELECT plan_code,status FROM user_subscriptions WHERE user_id = ?").bind(n.id).first(), r = { id: n.id, email: n.email, is_admin: n.is_admin === 1, is_approved: n.is_approved === 1, plan_code: i == null ? void 0 : i.plan_code, subscription_status: i == null ? void 0 : i.status };
  e.set("user", r), await t();
}
__name(m, "m");
async function R(e, t) {
  const s = e.get("user");
  if (!s) return e.json({ error: "unauthenticated" }, 401);
  if (!s.is_admin) return e.json({ error: "forbidden" }, 403);
  await t();
}
__name(R, "R");
async function mPage(e, t) {
  const s = Za(e);
  if (!s) {
    const clear3 = Ls(Nt, "", { maxAge: 0 });
    return new Response(null, { status: 302, headers: { "location": "/login", "set-cookie": clear3 } });
  }
  const a = await Va(s, e.env.JWT_SECRET);
  if (!(a != null && a.uid)) {
    const clear3 = Ls(Nt, "", { maxAge: 0 });
    return new Response(null, { status: 302, headers: { "location": "/login", "set-cookie": clear3 } });
  }
  try {
    const sess = await e.env.DB.prepare("SELECT value FROM system_settings WHERE key = ?").bind("user_session_iat:" + a.uid).first();
    if (sess && sess.value) {
      const validFrom = parseInt(sess.value, 10);
      if (a.iat && a.iat < validFrom) {
        const clear3 = Ls(Nt, "", { maxAge: 0 });
        return new Response(null, { status: 302, headers: { "location": "/login?msg=session_replaced", "set-cookie": clear3 } });
      }
    }
  } catch {
  }
  const n = await e.env.DB.prepare("SELECT id,email,is_approved,is_admin,trial_start,trial_end FROM users WHERE id = ?").bind(a.uid).first();
  if (!n) {
    const clear3 = Ls(Nt, "", { maxAge: 0 });
    return new Response(null, { status: 302, headers: { "location": "/login", "set-cookie": clear3 } });
  }
  if (n.is_approved === 0) return new Response(null, { status: 302, headers: { "location": "/login?msg=not_approved" } });
  const i = await e.env.DB.prepare("SELECT plan_code,status FROM user_subscriptions WHERE user_id = ?").bind(n.id).first(), r = { id: n.id, email: n.email, is_admin: n.is_admin === 1, is_approved: n.is_approved === 1, plan_code: i == null ? void 0 : i.plan_code, subscription_status: i == null ? void 0 : i.status };
  e.set("user", r), await t();
}
__name(mPage, "mPage");
async function Z(e, t, s = {}) {
  const a = e.req.header("cf-connecting-ip") || e.req.header("x-forwarded-for") || "", n = e.req.header("user-agent") || "";
  await e.env.DB.prepare(`INSERT INTO auth_logs (user_id, email, event_type, ip_address, user_agent, metadata)
     VALUES (?, ?, ?, ?, ?, ?)`).bind(s.userId ?? null, s.email ?? null, t, a, n, s.metadata ? JSON.stringify(s.metadata) : null).run();
}
__name(Z, "Z");
var Qa = [{ key: "dashboard", label: "\u30C0\u30C3\u30B7\u30E5\u30DC\u30FC\u30C9", icon: "fa-gauge-high", path: "/dashboard" }, { key: "target", label: "\u30BF\u30FC\u30B2\u30C3\u30C8\u8A2D\u5B9A", icon: "fa-bullseye", path: "/dashboard/target" }, { key: "voice", label: "\u30D6\u30E9\u30F3\u30C9\u30DC\u30A4\u30B9", icon: "fa-palette", path: "/dashboard/voice" }, { key: "pattern", label: "\u30D1\u30BF\u30FC\u30F3\u5225AI\u751F\u6210", icon: "fa-wand-magic-sparkles", path: "/dashboard/pattern" }, { key: "generate", label: "AI\u751F\u62102", icon: "fa-pen-to-square", path: "/dashboard/generate" }, { key: "posts", label: "X\u6295\u7A3F\u7BA1\u7406", icon: "fa-brands fa-x-twitter", path: "/dashboard/posts" }, { key: "thread", label: "\u30C4\u30EA\u30FC\u6295\u7A3F", icon: "fa-reply", path: "/dashboard/thread" }, { key: "scheduled", label: "\u4E88\u7D04\u72B6\u6CC1", icon: "fa-calendar", path: "/dashboard/scheduled" }, { key: "autopilot", label: "\u30AA\u30FC\u30C8\u30D1\u30A4\u30ED\u30C3\u30C8", icon: "fa-plane-departure", path: "/dashboard/autopilot" }, { key: "buzz", label: "\u30D0\u30BA\u30EA\u30B5\u30FC\u30C1AI", icon: "fa-chart-simple", path: "/dashboard/buzz-research" }, { key: "rakuten", label: "\u697D\u5929\u30A2\u30D5\u30A3\u30EA", icon: "fa-cart-shopping", path: "/dashboard/rakuten" }, { key: "accounts", label: "\u30A2\u30AB\u30A6\u30F3\u30C8\u7BA1\u7406", icon: "fa-users-gear", path: "/dashboard/accounts" }, { key: "api", label: "API\u8A2D\u5B9A", icon: "fa-key", path: "/dashboard/api" }, { key: "export", label: "\u4E00\u62EC\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9", icon: "fa-download", path: "/dashboard/export" }];
function en(e, t) {
  return `
<aside class="w-56 bg-sidebar flex-shrink-0 flex flex-col">
  <div class="px-4 py-4 border-b border-[#2A3B52]">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 rounded-md bg-[#2F4A7A] flex items-center justify-center">
        <i class="fas ${G.icon} text-white text-sm"></i>
      </div>
      <div class="min-w-0">
        <div class="text-white font-bold text-sm truncate">${G.name}</div>
        <div class="text-[10px] text-[#A7B6CE]">${G.version}</div>
      </div>
    </div>
  </div>

  <nav class="flex-1 py-3 overflow-y-auto">
    ${Qa.map((s) => `
      <a href="${s.path}" class="nav-item ${s.key === e ? "active" : ""}">
        <i class="fas ${s.icon}"></i>
        <span>${s.label}</span>
      </a>
    `).join("")}
  </nav>

  <div class="px-3 py-3 border-t border-[#2A3B52]">
    <div class="text-[10px] text-[#A7B6CE] mb-2 px-1">\u73FE\u5728\u306E\u30E6\u30FC\u30B6\u30FC</div>
    <div class="bg-[#2A3B52] rounded-md p-2 text-xs">
      <div class="text-white truncate">${t.email}</div>
      <div class="flex items-center justify-between mt-1">
        <span class="pill pill-blue" style="background:rgba(96,165,250,.15);color:#93C5FD;border-color:rgba(96,165,250,.3)">${t.plan_code || "-"}</span>
        <button onclick="doLogout()" class="text-[#A7B6CE] hover:text-white text-xs"><i class="fas fa-right-from-bracket"></i></button>
      </div>
    </div>
  </div>
</aside>`;
}
__name(en, "en");
function tn(e, t) {
  return `
<div class="bg-white border-b border-line px-6 py-3 flex items-center justify-between gap-4">
  <div class="flex items-center gap-3">
    <label class="text-xs text-ink-muted">\u73FE\u5728\u306E\u30A2\u30AB\u30A6\u30F3\u30C8:</label>
    <select class="inp" style="width:auto;min-width:12rem" id="acct-sw" onchange="switchAccount(this.value)">
      ${e.length === 0 ? '<option value="">\uFF08\u672A\u767B\u9332\uFF09</option>' : e.map((s) => `<option value="${s.id}" ${t === s.id ? "selected" : ""}>@${s.x_username || s.account_name}</option>`).join("")}
    </select>
  </div>
  <div class="flex items-center gap-2 text-xs text-ink-muted">
    <span class="pill pill-ok"><i class="fas fa-circle text-[6px]"></i>Connected</span>
    <span id="jst-clock"></span>
  </div>
</div>
<script>
  (function() {
    function updateClock() {
      const el = document.getElementById('jst-clock');
      if (!el) return;
      // \u30D6\u30E9\u30A6\u30B6\u30BF\u30A4\u30E0\u30BE\u30FC\u30F3\u975E\u4F9D\u5B58\u306EJST\u56FA\u5B9A\u8868\u793A
      const ms = Date.now() + (9 * 60 * 60 * 1000);
      const d = new Date(ms);
      const pad = function(n){ return String(n).padStart(2,'0'); };
      const y = d.getUTCFullYear();
      const mo = pad(d.getUTCMonth()+1);
      const da = pad(d.getUTCDate());
      const h = pad(d.getUTCHours());
      const mi = pad(d.getUTCMinutes());
      const se = pad(d.getUTCSeconds());
      el.textContent = 'JST ' + y + '/' + mo + '/' + da + ' ' + h + ':' + mi + ':' + se;
    }
    updateClock();
    setInterval(updateClock, 1000);
  })();
<\/script>`;
}
__name(tn, "tn");
var sn = `
<div id="toast-host"></div>
<script>
  window.doLogout = function() {
    fetch('/api/auth/logout', { method: 'POST' })
      .then(() => { location.href = '/login'; });
  };
  window.switchAccount = function(id) {
    if (!id) return;
    fetch('/api/admin/accounts/' + id + '/current', { method: 'POST' })
      .then(() => location.reload());
  };
  window.toast = function(msg, kind) {
    kind = kind || 'info';
    var host = document.getElementById('toast-host');
    if (!host) {
      host = document.createElement('div');
      host.id = 'toast-host';
      document.body.appendChild(host);
    }
    var bg = kind === 'ok' ? '#065F46' : kind === 'err' ? '#991B1B' : '#1F2937';
    var icon = kind === 'ok' ? 'fa-check' : kind === 'err' ? 'fa-xmark' : 'fa-info-circle';
    var t = document.createElement('div');
    t.style.cssText = 'position:fixed;bottom:1rem;right:1rem;z-index:100;background:' + bg + ';color:#fff;padding:.65rem 1rem;border-radius:.45rem;font-size:.82rem;box-shadow:0 8px 20px rgba(0,0,0,.25);display:flex;align-items:center;gap:.5rem;';
    t.innerHTML = '<i class="fas ' + icon + '"></i>' + msg;
    host.appendChild(t);
    setTimeout(function(){ t.remove(); }, 3000);
  };
<\/script>
`;
function an(e) {
  return `
${sn}
<button class="mobile-menu-toggle" onclick="(function(){var a=document.querySelector('aside.w-56');var b=document.body;a.classList.toggle('is-open');b.classList.toggle('menu-open');})()" aria-label="\u30E1\u30CB\u30E5\u30FC" type="button"><i class="fas fa-bars"></i></button>
<div class="mobile-overlay" onclick="document.querySelector('aside.w-56').classList.remove('is-open');document.body.classList.remove('menu-open');"></div>
<div class="min-h-screen flex bg-paper">
  ${en(e.active, e.user)}

  <main class="flex-1 min-w-0 flex flex-col">
    ${tn(e.accounts, e.currentAccountId)}
    <div class="flex-1 p-6 overflow-y-auto">
      ${e.pageBody}
    </div>
  </main>
</div>

<!-- AI\u30B5\u30DD\u30FC\u30C8\u30C1\u30E3\u30C3\u30C8\u30DC\u30BF\u30F3 -->
<button id="ai-chat-btn" type="button" onclick="aiChatToggle()" style="position:fixed;bottom:1.25rem;right:1.25rem;z-index:60;background:#2563EB;color:#fff;border:none;width:3.4rem;height:3.4rem;border-radius:50%;cursor:pointer;box-shadow:0 4px 12px rgba(37,99,235,.4);font-size:1.4rem" aria-label="AI\u30B5\u30DD\u30FC\u30C8"><i class="fas fa-robot"></i></button>

<!-- AI\u30B5\u30DD\u30FC\u30C8\u30C1\u30E3\u30C3\u30C8\u7A93 -->
<div id="ai-chat-modal" style="display:none;position:fixed;bottom:5.25rem;right:1.25rem;z-index:65;width:22rem;max-width:calc(100vw - 2rem);max-height:32rem;background:#fff;border:1px solid var(--line);border-radius:.75rem;box-shadow:0 8px 32px rgba(0,0,0,.18);overflow:hidden;flex-direction:column">
  <div style="background:linear-gradient(135deg,#2563EB,#1E40AF);color:#fff;padding:.75rem 1rem;display:flex;align-items:center;justify-content:space-between">
    <div style="display:flex;align-items:center;gap:.5rem;font-weight:600"><i class="fas fa-robot"></i>AI\u30B5\u30DD\u30FC\u30C8</div>
    <button onclick="aiChatToggle()" type="button" style="background:none;border:none;color:#fff;cursor:pointer;font-size:1.1rem"><i class="fas fa-xmark"></i></button>
  </div>
  <div id="ai-chat-log" style="flex:1;overflow-y:auto;padding:.75rem;background:#F9FAFB;min-height:14rem;max-height:22rem;font-size:.85rem">
    <div style="background:#EFF6FF;color:#1E40AF;padding:.6rem .8rem;border-radius:.6rem;margin-bottom:.5rem">\u3053\u3093\u306B\u3061\u306F\uFF01GE365x\u306E\u4F7F\u3044\u65B9\u3092\u3054\u6848\u5185\u3057\u307E\u3059\u3002\u4E0B\u306E\u300C\u3088\u304F\u3042\u308B\u8CEA\u554F\u300D\u304B\u3089\u9078\u3076\u304B\u3001\u30E1\u30C3\u30BB\u30FC\u30B8\u3092\u76F4\u63A5\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002</div>
    <div id="ai-chat-topics" style="display:flex;flex-wrap:wrap;gap:.3rem;margin-top:.5rem"></div>
  </div>
  <div style="padding:.5rem;border-top:1px solid var(--line);display:flex;gap:.4rem">
    <input type="text" id="ai-chat-input" placeholder="\u8CEA\u554F\u3092\u5165\u529B..." style="flex:1;padding:.5rem .7rem;border:1px solid var(--line);border-radius:.4rem;font-size:.85rem;outline:none" onkeydown="if(event.key==='Enter')aiChatSend()">
    <button type="button" onclick="aiChatSend()" style="background:#2563EB;color:#fff;border:none;border-radius:.4rem;padding:0 .8rem;cursor:pointer"><i class="fas fa-paper-plane"></i></button>
  </div>
</div>

<script>
window.aiChatToggle = function() {
  const m = document.getElementById('ai-chat-modal');
  const isShown = m.style.display === 'flex';
  m.style.display = isShown ? 'none' : 'flex';
  if (!isShown && !window.__aiTopicsLoaded) {
    window.__aiTopicsLoaded = true;
    fetch('/api/admin/chatbot/topics').then(r => r.json()).then(j => {
      const root = document.getElementById('ai-chat-topics');
      if (!root) return;
      root.innerHTML = (j.topics || []).map(t =>
        '<button type="button" onclick="aiChatAsk(\\''+t.title.replace(/\\'/g,'\\\\\\'')+'\\')" style="background:#fff;border:1px solid #DBEAFE;color:#1D4ED8;padding:.3rem .55rem;border-radius:.5rem;font-size:.72rem;cursor:pointer">' + t.title + '</button>'
      ).join('');
    }).catch(()=>{});
  }
};
window.aiChatAppend = function(text, isUser) {
  const log = document.getElementById('ai-chat-log');
  const div = document.createElement('div');
  div.style.cssText = isUser
    ? 'background:#2563EB;color:#fff;padding:.55rem .75rem;border-radius:.55rem;margin-bottom:.45rem;margin-left:2rem;text-align:right;white-space:pre-wrap'
    : 'background:#fff;color:#111827;border:1px solid var(--line);padding:.55rem .75rem;border-radius:.55rem;margin-bottom:.45rem;margin-right:2rem;white-space:pre-wrap';
  div.textContent = text;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
};
window.aiChatAsk = async function(question) {
  aiChatAppend(question, true);
  try {
    const r = await fetch('/api/admin/chatbot/ask',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({question})});
    const j = await r.json();
    aiChatAppend((j.title?'\u3010'+j.title+'\u3011\\n':'') + (j.answer || '\u56DE\u7B54\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F'), false);
  } catch(e) { aiChatAppend('\u901A\u4FE1\u30A8\u30E9\u30FC: '+e.message, false); }
};
window.aiChatSend = function() {
  const inp = document.getElementById('ai-chat-input');
  const v = inp.value.trim();
  if (!v) return;
  inp.value = '';
  aiChatAsk(v);
};
<\/script>
`;
}
__name(an, "an");
var he = `
<div class="alert alert-warn">
  <i class="fas fa-triangle-exclamation mt-0.5"></i>
  <div>\u30A2\u30AB\u30A6\u30F3\u30C8\u304C\u9078\u629E\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002<a href="/dashboard/accounts" class="underline font-semibold">\u30A2\u30AB\u30A6\u30F3\u30C8\u7BA1\u7406</a>\u3067\u767B\u9332\u3057\u3066\u304F\u3060\u3055\u3044\u3002</div>
</div>
`;
function w(e) {
  return (e || "").replace(/[&<>"']/g, (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[t]);
}
__name(w, "w");
function Lt(e, scheduled) {
  const status = e || "";
  if (status === "approved" || status === "scheduled" || status === "pending" && scheduled) return '<span class="pill pill-blue">\u4E88\u7D04\u6E08</span>';
  return { pending: '<span class="pill pill-soft">\u4E0B\u66F8\u304D</span>', publishing: '<span class="pill pill-blue">\u9001\u4FE1\u4E2D</span>', posted: '<span class="pill pill-ok">\u6295\u7A3F\u6E08</span>', failed: '<span class="pill pill-err">\u5931\u6557</span>', cancelled: '<span class="pill pill-soft">\u30AD\u30E3\u30F3\u30BB\u30EB</span>', draft: '<span class="pill pill-soft">\u4E0B\u66F8\u304D</span>' }[status] || `<span class="pill pill-soft">${status || "\u672A\u6295\u7A3F"}</span>`;
}
__name(Lt, "Lt");
function nn(e) {
  const { stats: t, health: s, recentLogs: a } = e;
  return `
<div class="space-y-4" style="display:flex;flex-direction:column;gap:1rem">
  <div>
    <h1 class="section-title"><i class="fas fa-gauge-high"></i>\u30C0\u30C3\u30B7\u30E5\u30DC\u30FC\u30C9</h1>
    <p class="section-desc">\u4ECA\u65E5\u306E\u6295\u7A3F\u72B6\u6CC1\u3092\u4E00\u89A7\u3067\u304D\u307E\u3059\u3002</p>
  </div>

  <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
    <div class="card card-sm"><div class="text-xs text-ink-muted">X\u30A2\u30AB\u30A6\u30F3\u30C8</div><div class="text-2xl font-bold text-ink mt-1">${t.accounts}</div></div>
    <div class="card card-sm"><div class="text-xs text-ink-muted">\u672C\u65E5\u306E\u6295\u7A3F</div><div class="text-2xl font-bold text-ink mt-1">${t.today}</div></div>
    <div class="card card-sm"><div class="text-xs text-ink-muted">\u4E88\u7D04\u4E2D</div><div class="text-2xl font-bold text-ink mt-1">${t.pending}</div></div>
    <div class="card card-sm"><div class="text-xs text-ink-muted">\u672C\u65E5\u5931\u6557</div><div class="text-2xl font-bold text-red-600 mt-1">${t.failed}</div></div>
  </div>

  <!-- \u4E88\u7D04\u6295\u7A3F\u306E\u5373\u6642\u30C1\u30A7\u30C3\u30AF\u30DC\u30BF\u30F3\uFF08\u8AB0\u3067\u3082\u30EF\u30F3\u30AF\u30EA\u30C3\u30AF\u3067\u4E88\u7D04\u51E6\u7406\u3092\u5F37\u5236\u5B9F\u884C\uFF09 -->
  <div class="card" style="background:#EFF6FF;border:1px solid #BFDBFE">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem">
      <div>
        <h3 class="font-bold text-ink" style="margin:0 0 .35rem 0"><i class="fas fa-bolt text-accent"></i> \u4E88\u7D04\u6295\u7A3F\u3092\u4ECA\u3059\u3050\u30C1\u30A7\u30C3\u30AF</h3>
        <p class="text-xs text-ink-muted" style="margin:0">\u4E88\u7D04\u6642\u523B\u3092\u904E\u304E\u305F\u6295\u7A3F\u304C\u53CD\u6620\u3055\u308C\u306A\u3044\u6642\u306B\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u30B5\u30FC\u30D0\u30FC\u306F1\u5206\u6BCE\u306B\u81EA\u52D5\u30C1\u30A7\u30C3\u30AF\u3057\u307E\u3059\u304C\u3001\u5373\u6642\u78BA\u8A8D\u3057\u305F\u3044\u6642\u306B\u4F7F\u3048\u307E\u3059\u3002</p>
      </div>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap">
        <button class="btn btn-primary" onclick="runCronTickNow(this)"><i class="fas fa-play"></i>X\u6295\u7A3F\u3092\u4ECA\u3059\u3050\u30C1\u30A7\u30C3\u30AF</button>
        <button class="btn btn-ghost" onclick="runCronAutopilotNow(this)"><i class="fas fa-plane"></i>\u30AA\u30FC\u30C8\u30D1\u30A4\u30ED\u30C3\u30C8\u3092\u4ECA\u3059\u3050\u30C1\u30A7\u30C3\u30AF</button>
      </div>
    </div>
    <div id="cron-result" style="margin-top:.6rem;font-size:.85rem"></div>
  </div>

  <script>
  window.runCronTickNow = async function(btn) {
    const out = document.getElementById('cron-result');
    if (btn) btn.disabled = true;
    out.innerHTML = '<span style="color:#6B7280"><i class="fas fa-spinner fa-spin"></i> \u5B9F\u884C\u4E2D...</span>';
    try {
      const r = await fetch('/api/admin/cron/run-tick', {method:'POST'});
      const j = await r.json();
      if (j.success) {
        const res = j.result || {};
        out.innerHTML = '<span style="color:#059669"><i class="fas fa-check"></i> \u5B8C\u4E86: \u51E6\u7406 ' + (res.processed||0) + ' \u4EF6 / \u6210\u529F ' + (res.success||0) + ' \u4EF6 / \u5931\u6557 ' + (res.failed||0) + ' \u4EF6</span>';
        toast('\u4E88\u7D04\u6295\u7A3F\u30C1\u30A7\u30C3\u30AF\u5B8C\u4E86 (\u6210\u529F ' + (res.success||0) + ' \u4EF6)','ok');
        if ((res.success||0) > 0) setTimeout(()=>location.reload(), 1500);
      } else {
        out.innerHTML = '<span style="color:#dc2626"><i class="fas fa-xmark"></i> \u5931\u6557: ' + (j.error||'unknown') + '</span>';
        toast('\u30C1\u30A7\u30C3\u30AF\u5931\u6557','err');
      }
    } catch(e) {
      out.innerHTML = '<span style="color:#dc2626">\u30A8\u30E9\u30FC: ' + e.message + '</span>';
    } finally {
      if (btn) btn.disabled = false;
    }
  };
  window.runCronAutopilotNow = async function(btn) {
    const out = document.getElementById('cron-result');
    if (btn) btn.disabled = true;
    out.innerHTML = '<span style="color:#6B7280"><i class="fas fa-spinner fa-spin"></i> \u5B9F\u884C\u4E2D...</span>';
    try {
      const r = await fetch('/api/admin/cron/run-autopilot', {method:'POST'});
      const j = await r.json();
      if (j.success) {
        const res = j.result || {};
        out.innerHTML = '<span style="color:#059669"><i class="fas fa-check"></i> \u30AA\u30FC\u30C8\u30D1\u30A4\u30ED\u30C3\u30C8\u5B8C\u4E86: \u51E6\u7406 ' + (res.processed||0) + ' \u4EF6 / \u6210\u529F ' + (res.success||0) + ' \u4EF6 / \u5931\u6557 ' + (res.failed||0) + ' \u4EF6</span>';
        toast('\u30AA\u30FC\u30C8\u30D1\u30A4\u30ED\u30C3\u30C8\u30C1\u30A7\u30C3\u30AF\u5B8C\u4E86','ok');
      } else {
        out.innerHTML = '<span style="color:#dc2626"><i class="fas fa-xmark"></i> \u5931\u6557: ' + (j.error||'unknown') + '</span>';
      }
    } catch(e) {
      out.innerHTML = '<span style="color:#dc2626">\u30A8\u30E9\u30FC: ' + e.message + '</span>';
    } finally {
      if (btn) btn.disabled = false;
    }
  };
  <\/script>

  <div class="grid grid-cols-1 gap-4">
    <div class="card">
      <h3 class="font-bold text-ink mb-3"><i class="fas fa-clock-rotate-left text-accent"></i> \u76F4\u8FD1\u306E\u6295\u7A3F\u30ED\u30B0</h3>
      ${a.length === 0 ? `
        <div class="text-ink-muted text-sm text-center py-6">\u6295\u7A3F\u30ED\u30B0\u306A\u3057</div>
      ` : a.map((n) => `
        <div class="py-2 border-b border-line/50 last:border-0">
          <div class="text-sm text-ink truncate">${w((n.content || "").slice(0, 80))}...</div>
          <div class="text-xs text-ink-muted mt-0.5">@${w(n.x_username || "-")} \xB7 ${n.posted_at || "-"}</div>
        </div>
      `).join("")}
    </div>
  </div>
</div>`;
}
__name(nn, "nn");
function rn(e) {
  const t = e.target || {};
  return `
<div class="space-y-4">
  <div>
    <h1 class="section-title"><i class="fas fa-bullseye"></i>\u30BF\u30FC\u30B2\u30C3\u30C8\u8A2D\u5B9A</h1>
    <p class="section-desc">\u6295\u7A3F\u306E\u30BF\u30FC\u30B2\u30C3\u30C8\u8AAD\u8005\u3092\u8A2D\u5B9A\u3057\u307E\u3059\u3002AI\u751F\u6210\u6642\u306B\u81EA\u52D5\u3067\u30D7\u30ED\u30F3\u30D7\u30C8\u306B\u6CE8\u5165\u3055\u308C\u307E\u3059\u3002</p>
  </div>
  
  <div class="card">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-bold text-ink">\u30BF\u30FC\u30B2\u30C3\u30C8\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8</h3>
      <button class="example-btn" onclick="fillTargetExample()"><i class="fas fa-pencil"></i>\u4F7F\u7528\u4F8B</button>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:.75rem">
      <div>
        <label class="field-label"><i class="fas fa-child icon-purple"></i>\u5E74\u9F62\u5C64</label>
        <input type="text" id="tg-age" class="inp" value="${w(t.age_range)}" placeholder="\u4F8B: 25~40\u4EE3">
      </div>
      <div>
        <label class="field-label"><i class="fas fa-venus-mars icon-purple"></i>\u6027\u5225</label>
        <select id="tg-gender" class="inp">
          <option value="">\u6307\u5B9A\u306A\u3057</option>
          <option value="\u7537\u6027" ${t.gender === "\u7537\u6027" ? "selected" : ""}>\u7537\u6027</option>
          <option value="\u5973\u6027" ${t.gender === "\u5973\u6027" ? "selected" : ""}>\u5973\u6027</option>
          <option value="\u305D\u306E\u4ED6" ${t.gender === "\u305D\u306E\u4ED6" ? "selected" : ""}>\u305D\u306E\u4ED6</option>
        </select>
      </div>
    </div>
    <div class="mb-3">
      <label class="field-label"><i class="fas fa-briefcase icon-yellow"></i>\u8077\u696D</label>
      <input type="text" id="tg-occ" class="inp" value="${w(t.occupation)}" placeholder="\u4F8B: \u4F1A\u793E\u54E1 / \u30D5\u30EA\u30FC\u30E9\u30F3\u30B9">
    </div>
    <div class="mb-3">
      <label class="field-label"><i class="fas fa-heart icon-red"></i>\u75DB\u307F\u30FB\u60A9\u307F</label>
      <textarea id="tg-pains" class="inp" rows="3" style="min-height:5rem" placeholder="\u8AAD\u8005\u304C\u62B1\u3048\u3066\u3044\u308B\u5177\u4F53\u7684\u306A\u60A9\u307F\u30FB\u75DB\u307F\u3092\u66F8\u304F">${w(t.pains)}</textarea>
    </div>
    <div class="mb-3">
      <label class="field-label"><i class="fas fa-star icon-yellow"></i>\u6B32\u6C42\u30FB\u9858\u671B</label>
      <textarea id="tg-desires" class="inp" rows="3" style="min-height:5rem" placeholder="\u8AAD\u8005\u304C\u300C\u3053\u3046\u306A\u308A\u305F\u3044\u300D\u3068\u601D\u3063\u3066\u3044\u308B\u7406\u60F3\u50CF">${w(t.desires)}</textarea>
    </div>
    <div class="mb-3">
      <label class="field-label"><i class="fas fa-bolt icon-yellow"></i>\u884C\u52D5\u30C8\u30EA\u30AC\u30FC\uFF08\u53CD\u5FDC\u3059\u308B\u304D\u3063\u304B\u3051\uFF09</label>
      <textarea id="tg-trigger" class="inp" rows="3" style="min-height:5rem" placeholder="\u3053\u306E\u8AAD\u8005\u304C\u30A2\u30AF\u30B7\u30E7\u30F3\u3092\u8D77\u3053\u3059\u77AC\u9593\u30FB\u30AD\u30FC\u30EF\u30FC\u30C9">${w(t.purchase_triggers)}</textarea>
    </div>
    <div style="display:flex;align-items:center;gap:.5rem;padding-top:.5rem">
      <button class="btn btn-primary" onclick="saveTarget()" style="padding:.85rem 2.5rem;font-size:1rem;font-weight:700"><i class="fas fa-save"></i>\u4FDD\u5B58</button>
      <span id="tg-msg" class="text-xs"></span>
    </div>
  </div>
</div>
<script>
function fillTargetExample() {
  document.getElementById('tg-age').value = '30~50\u4EE3';
  document.getElementById('tg-gender').value = '\u7537\u6027';
  document.getElementById('tg-occ').value = '\u30B5\u30E9\u30EA\u30FC\u30DE\u30F3 / \u7D4C\u55B6\u8005';
  document.getElementById('tg-pains').value = '\u8001\u5F8C\u8CC7\u91D1\u304C\u4E0D\u5B89\u3002\\n\u6295\u8CC7\u3067\u5931\u6557\u7D9A\u304D\u3002\\n\u6642\u9593\u304C\u306A\u304F\u3066\u526F\u696D\u304C\u7D9A\u304B\u306A\u3044\u3002';
  document.getElementById('tg-desires').value = '\u670810\u4E07\u5186\u306E\u5B89\u5B9A\u3057\u305F\u526F\u53CE\u5165\u3002\\n\u7D4C\u6E08\u7684\u81EA\u7531\u3092\u5F97\u305F\u3044\u3002';
  document.getElementById('tg-trigger').value = '\u300C\u81EA\u52D5\u5316\u300D\u300C\u518D\u73FE\u6027\u300D\u300C\u5B9F\u7E3E\u300D\u3068\u3044\u3046\u8A00\u8449\u306B\u53CD\u5FDC\u3059\u308B\u3002';
}
async function saveTarget() {
  const body = {
    age_range: document.getElementById('tg-age').value,
    gender: document.getElementById('tg-gender').value,
    occupation: document.getElementById('tg-occ').value,
    pains: document.getElementById('tg-pains').value,
    desires: document.getElementById('tg-desires').value,
    purchase_triggers: document.getElementById('tg-trigger').value,
  };
  const r = await fetch('/api/admin/target', {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(body)});
  const j = await r.json();
  const msg = document.getElementById('tg-msg');
  if (j.success) { msg.textContent = '\u4FDD\u5B58\u3057\u307E\u3057\u305F'; msg.className = 'text-xs ml-2 text-emerald-600'; }
  else { msg.textContent = '\u4FDD\u5B58\u5931\u6557: ' + (j.error || ''); msg.className = 'text-xs ml-2 text-red-600'; }
}
<\/script>`;
}
__name(rn, "rn");
function on2(e) {
  const t = e.voice || {}, s = [{ k: "authority", l: "\u6A29\u5A01\u578B", sub: "\u5C02\u9580\u5BB6\u3068\u3057\u3066\u65AD\u5B9A", t: "\u5C02\u9580\u5BB6\u3068\u3057\u3066\u65AD\u5B9A\u7684\u306B\u3001\u7C21\u6F54\u306B\u3001\u6839\u62E0\u3092\u793A\u3057\u3066\u66F8\u304F\u3002", icon: "fa-user-tie" }, { k: "empathy", l: "\u5171\u611F\u578B", sub: "\u5BC4\u308A\u6DFB\u3046", t: "\u8AAD\u8005\u306E\u60A9\u307F\u306B\u5BC4\u308A\u6DFB\u3044\u3001\u5171\u611F\u3092\u8D77\u70B9\u306B\u8A9E\u308A\u304B\u3051\u308B\u3088\u3046\u306B\u66F8\u304F\u3002", icon: "fa-heart" }, { k: "provocative", l: "\u717D\u308A\u578B", sub: "\u5371\u6A5F\u611F\u3092\u8A34\u304F", t: "\u554F\u984C\u3092\u92ED\u304F\u7A81\u304D\u3001\u5371\u6A5F\u611F\u3092\u6301\u305F\u305B\u308B\u66F8\u304D\u65B9\u306B\u3059\u308B\u3002", icon: "fa-bolt" }, { k: "story", l: "\u30B9\u30C8\u30FC\u30EA\u30FC\u578B", sub: "\u7269\u8A9E\u3067\u4F1D\u3048\u308B", t: "\u4F53\u9A13\u8AC7\u3084\u5909\u5316\u306E\u6D41\u308C\u3092\u611F\u3058\u3055\u305B\u308B\u69CB\u6210\u3067\u66F8\u304F\u3002", icon: "fa-book-open" }, { k: "problem_raise", l: "\u554F\u984C\u63D0\u8D77\u578B", sub: "\u8AB2\u984C\u304B\u3089\u63D0\u793A", t: "\u6700\u521D\u306B\u8AB2\u984C\u3092\u63D0\u793A\u3057\u3001\u305D\u306E\u539F\u56E0\u3068\u89E3\u6C7A\u7B56\u3092\u793A\u3059\u3002", icon: "fa-circle-question" }];
  const cur = t.voice_key || "authority";
  return `
<div class="space-y-4">
  <div>
    <h1 class="section-title"><i class="fas fa-palette"></i>\u30D6\u30E9\u30F3\u30C9\u30DC\u30A4\u30B9</h1>
    <p class="section-desc">5\u3064\u306E\u30DC\u30A4\u30B9\u30B9\u30BF\u30A4\u30EB\u304B\u3089\u9078\u3093\u3067\u304F\u3060\u3055\u3044\u3002AI\u751F\u6210\u6642\u306B\u30C8\u30FC\u30F3\u3068\u3057\u3066\u6CE8\u5165\u3055\u308C\u307E\u3059\u3002</p>
  </div>

  <div class="card space-y-4">
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:.5rem" id="voice-grid">
      ${s.map((a) => `
        <div onclick="selectVoice(this,'${a.k}','${a.t.replace(/'/g, "\\'")}')" data-val="${a.k}"
          style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.4rem;padding:1.1rem .5rem;border:2px solid ${cur === a.k ? "var(--accent, #2563EB)" : "var(--line)"};border-radius:.625rem;cursor:pointer;background:${cur === a.k ? "var(--accent-light, #EFF6FF)" : "#fff"};color:${cur === a.k ? "var(--accent, #2563EB)" : "var(--ink)"};transition:all .15s;text-align:center">
          <i class="fas ${a.icon}" style="font-size:1.35rem"></i>
          <span style="font-size:.85rem;font-weight:700;line-height:1.2">${a.l}</span>
          <span style="font-size:.7rem;color:#6B7280;font-weight:400">${a.sub}</span>
        </div>
      `).join("")}
    </div>
    <input type="hidden" id="vc-key" value="${cur}">

    <div>
      <label class="field-label">\u53E3\u8ABF</label>
      <input type="text" id="vc-tone" class="inp" value="${w(t.tone)}" placeholder="\u4F8B: \u5C02\u9580\u5BB6\u3068\u3057\u3066\u65AD\u5B9A\u7684\u306B\u3001\u7C21\u6F54\u306B\u3001\u6839\u62E0\u3092\u793A\u3057\u3066\u66F8\u304F">
    </div>
    <div>
      <label class="field-label">\u4E16\u754C\u89B3</label>
      <textarea id="vc-world" class="inp" placeholder="\u3042\u306A\u305F\u304C\u898B\u3066\u3044\u308B\u4E16\u754C\u3001\u4F1D\u3048\u305F\u3044\u4FA1\u5024\u89B3">${w(t.worldview)}</textarea>
    </div>
    <div>
      <label class="field-label">\u500B\u4EBA\u30B9\u30C8\u30FC\u30EA\u30FC\uFF08\u4EFB\u610F\uFF09</label>
      <textarea id="vc-story" class="inp" placeholder="\u904E\u53BB\u306E\u4F53\u9A13\u3084\u8EE2\u6A5F\u3002AI \u304C\u81EA\u7136\u306B\u7E54\u308A\u4EA4\u305C\u307E\u3059">${w(t.personal_story)}</textarea>
    </div>
    <div>
      <label class="field-label">\u7981\u6B62\u30EF\u30FC\u30C9\uFF08\u6539\u884C\u533A\u5207\u308A\uFF09</label>
      <textarea id="vc-ng" class="inp" placeholder="\u7D76\u5BFE\u306B\u4F7F\u308F\u306A\u3044\u30EF\u30FC\u30C9">${w(t.prohibited_words)}</textarea>
    </div>
    <div style="display:flex;gap:.5rem;align-items:center;padding-top:.5rem">
      <button class="btn btn-primary" onclick="saveVoice()" style="padding:.85rem 2.5rem;font-size:1rem;font-weight:700"><i class="fas fa-save"></i>\u4FDD\u5B58</button>
      <span id="vc-msg" style="font-size:.85rem;align-self:center"></span>
    </div>
  </div>
</div>
<script>
function selectVoice(el, key, tone) {
  document.querySelectorAll('#voice-grid > div').forEach(d => {
    d.style.borderColor = 'var(--line)';
    d.style.background = '#fff';
    d.style.color = 'var(--ink)';
  });
  el.style.borderColor = 'var(--accent, #2563EB)';
  el.style.background = 'var(--accent-light, #EFF6FF)';
  el.style.color = 'var(--accent, #2563EB)';
  document.getElementById('vc-key').value = key;
  if (tone && !document.getElementById('vc-tone').value.trim()) {
    document.getElementById('vc-tone').value = tone;
  }
}
window.selectVoice = selectVoice;

async function saveVoice() {
  const body = {
    voice_key: document.getElementById('vc-key').value,
    tone: document.getElementById('vc-tone').value,
    worldview: document.getElementById('vc-world').value,
    personal_story: document.getElementById('vc-story').value,
    prohibited_words: document.getElementById('vc-ng').value,
  };
  const r = await fetch('/api/admin/voice', {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(body)});
  const j = await r.json();
  const msg = document.getElementById('vc-msg');
  if (j.success) { msg.textContent = '\u2713 \u4FDD\u5B58\u3057\u307E\u3057\u305F'; msg.style.color = '#059669'; toast('\u4FDD\u5B58\u3057\u307E\u3057\u305F','ok'); }
  else { msg.textContent = '\u2717 \u4FDD\u5B58\u5931\u6557'; msg.style.color = '#dc2626'; toast('\u4FDD\u5B58\u5931\u6557','err'); }
}
window.saveVoice = saveVoice;
<\/script>`;
}
__name(on2, "on");
function dn(e) {
  var s, a, n;
  const t = [["problem", "\u554F\u984C\u63D0\u8D77\u578B", "fa-circle-question", "\u75DB\u307F\u3092\u7A81\u304F"], ["before_after", "\u30D3\u30D5\u30A9\u30FC\u30A2\u30D5\u30BF\u30FC\u578B", "fa-right-left", "\u5909\u5316\u3092\u898B\u305B\u308B"], ["contrarian", "\u9006\u5F35\u308A\u578B", "fa-rotate-left", "\u5E38\u8B58\u3092\u8986\u3059"], ["howto", "HowTo\u5B9F\u6F14\u578B", "fa-list-ol", "\u624B\u9806\u3067\u898B\u305B\u308B"], ["numbers", "\u6570\u5B57\u30A4\u30F3\u30D1\u30AF\u30C8\u578B", "fa-hashtag", "\u6570\u5B57\u3067\u8A34\u304F"]];
  return `
<div class="space-y-4">
  <div>
    <h1 class="section-title"><i class="fas fa-wand-magic-sparkles"></i>\u30D1\u30BF\u30FC\u30F3\u5225AI\u751F\u6210</h1>
    <p class="section-desc">5\u3064\u306E\u6295\u7A3F\u30D1\u30BF\u30FC\u30F3\u304B\u3089\u9078\u3093\u3067AI\u751F\u6210\u3002\u751F\u6210\u5F8C\u306E\u5404\u30AB\u30FC\u30C9\u306B\u753B\u50CF\u30FB\u52D5\u753B\u3092\u500B\u5225\u8A2D\u5B9A\u3057\u3066\u6295\u7A3F\u3002</p>
  </div>

  <div class="card space-y-4">
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:.5rem" id="patt-grid">
      ${t.map(([i, r, o, p], d) => `
        <div onclick="selectPatt(this,'${i}')" data-val="${i}"
          style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.4rem;padding:1.1rem .5rem;border:2px solid ${d === 0 ? "var(--accent, #2563EB)" : "var(--line)"};border-radius:.625rem;cursor:pointer;background:${d === 0 ? "var(--accent-light, #EFF6FF)" : "#fff"};color:${d === 0 ? "var(--accent, #2563EB)" : "var(--ink)"};transition:all .15s;text-align:center">
          <i class="fas ${o}" style="font-size:1.35rem"></i>
          <span style="font-size:.85rem;font-weight:700;line-height:1.2">${r}</span>
          <span style="font-size:.7rem;color:#6B7280;font-weight:400">${p}</span>
        </div>
      `).join("")}
    </div>
    <input type="hidden" id="patt-val" value="problem">

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="field-label">\u30C6\u30FC\u30DE <span style="color:#dc2626">*</span></label>
        <input type="text" id="pa-theme" class="inp" placeholder="\u4F8B: AI\u81EA\u52D5\u5316\u30671\u65E515\u5206\u904B\u7528">
      </div>
      <div>
        <label class="field-label">\u30AD\u30FC\u30EF\u30FC\u30C9</label>
        <input type="text" id="pa-kw" class="inp" placeholder="\u4F8B: AI, \u81EA\u52D5\u5316, \u6642\u77ED, \u4ED5\u7D44\u307F">
      </div>
    </div>

    <div style="display:flex;align-items:center;gap:.75rem">
      <label class="field-label" style="margin:0">\u751F\u6210\u6570</label>
      <select id="pa-count" class="inp" style="width:6rem">
        <option value="1">1\u4EF6</option><option value="2">2\u4EF6</option><option value="3" selected>3\u4EF6</option><option value="4">4\u4EF6</option><option value="5">5\u4EF6</option><option value="6">6\u4EF6</option><option value="7">7\u4EF6</option><option value="8">8\u4EF6</option><option value="9">9\u4EF6</option><option value="10">10\u4EF6</option>
      </select>
    </div>

    <div style="border:1px solid var(--line);border-radius:.5rem;padding:1rem;background:var(--paper-soft)">
      <div style="font-weight:600;color:var(--accent);margin-bottom:.625rem"><i class="fas fa-sliders"></i> \u6295\u7A3F\u30AA\u30D7\u30B7\u30E7\u30F3</div>
      <div class="space-y-3">
        <div>
          <label class="field-label">\u6295\u7A3F\u672B\u5C3E\u306E\u8FFD\u8A18\uFF08\u4EFB\u610F\uFF09</label>
          <input type="text" id="pa-footer" class="inp" placeholder="\u4F8B: \u8A73\u3057\u304F\u306F\u30D7\u30ED\u30D5\u30EA\u30F3\u30AF\u304B\u3089\u{1F447}">
        </div>
        <div>
          <label class="field-label">URL\uFF08\u4EFB\u610F\uFF09</label>
          <input type="url" id="pa-link" class="inp" placeholder="https://">
        </div>
        <div>
          <label class="field-label">\u672C\u6587\u30E2\u30FC\u30C9</label>
          <div style="display:flex;gap:1.5rem;margin-top:.25rem">
            <label style="display:flex;align-items:center;gap:.4rem;cursor:pointer"><input type="radio" name="pa-mode" value="body" checked><span style="font-size:.9rem">\u672C\u6587\uFF08\u751F\u6210\u305D\u306E\u307E\u307E\uFF09</span></label>
            <label style="display:flex;align-items:center;gap:.4rem;cursor:pointer"><input type="radio" name="pa-mode" value="140"><span style="font-size:.9rem">140\u6587\u5B57\u4EE5\u5185</span></label>
            <label style="display:flex;align-items:center;gap:.4rem;cursor:pointer"><input type="radio" name="pa-mode" value="simple"><span style="font-size:.9rem">\u30B7\u30F3\u30D7\u30EB</span></label>
          </div>
        </div>
      </div>
    </div>

    <input type="hidden" id="pa-tag" value="">

    <div style="display:flex;gap:.5rem;align-items:center;flex-wrap:wrap">
      <button class="btn btn-primary" style="flex:1;justify-content:center;padding:.75rem" onclick="doPatternGenerate()"><i class="fas fa-wand-magic-sparkles"></i>\u9078\u629E\u30D1\u30BF\u30FC\u30F3\u3067AI\u751F\u6210</button>
      <button class="btn btn-ghost" onclick="paSaveDraft()"><i class="fas fa-floppy-disk"></i>\u4E0B\u66F8\u304D\u4FDD\u5B58</button>
      <button class="btn btn-ghost" onclick="paLoadDraft()"><i class="fas fa-folder-open"></i>\u4E0B\u66F8\u304D\u518D\u958B</button>
    </div>
  </div>

  <div id="pa-results"></div>
</div>
<script>
function selectPatt(el, val) {
  document.querySelectorAll('#patt-grid > div').forEach(d => {
    d.style.borderColor = 'var(--line)';
    d.style.background = '#fff';
    d.style.color = 'var(--ink)';
    d.dataset.selected = '0';
  });
  el.style.borderColor = 'var(--accent, #2563EB)';
  el.style.background = 'var(--accent-light, #EFF6FF)';
  el.style.color = 'var(--accent, #2563EB)';
  el.dataset.selected = '1';
  document.getElementById('patt-val').value = val;
}
window.selectPatt = selectPatt;

function paResultCardHtml(g) {
  const id = g.id;
  const body = (g.body || '').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const patt = g.pattern_type || '';
  const pattLabels = {problem:'\u554F\u984C\u63D0\u8D77\u578B',before_after:'\u30D3\u30D5\u30A9\u30FC\u30A2\u30D5\u30BF\u30FC\u578B',contrarian:'\u9006\u5F35\u308A\u578B',howto:'HowTo\u5B9F\u6F14\u578B',numbers:'\u6570\u5B57\u30A4\u30F3\u30D1\u30AF\u30C8\u578B'};
  const pattLabel = pattLabels[patt] || patt || '';
  return '<div class="card card-sm" id="pa-card-'+id+'" data-pid="'+id+'" style="margin-bottom:.75rem;padding:1rem;border:1px solid var(--line);border-radius:.5rem;background:#fff">' +
    (pattLabel?'<div style="font-size:.7rem;color:#2563EB;background:#EFF6FF;display:inline-block;padding:.15rem .5rem;border-radius:.25rem;margin-bottom:.5rem;font-weight:600">'+pattLabel+'</div>':'') +
    '<div class="whitespace-pre-line text-sm leading-relaxed text-ink" style="white-space:pre-line">' + body + '</div>' +
    '<div class="text-xs text-ink-muted mt-2">' + (g.body||'').length + ' \u6587\u5B57</div>' +
    '<div id="pa-media-'+id+'" style="margin-top:.5rem;display:flex;gap:.25rem;flex-wrap:wrap"></div>' +
    '<div style="display:flex;gap:.4rem;margin-top:.75rem;flex-wrap:wrap;align-items:center">' +
      '<button class="btn btn-ghost btn-sm" type="button" onclick="paAttachAny('+id+',\\'image\\')"><i class="fas fa-image"></i>\u753B\u50CF</button>' +
      '<button class="btn btn-ghost btn-sm" type="button" onclick="paAttachAny('+id+',\\'video\\')"><i class="fas fa-film"></i>\u52D5\u753B</button>' +
      '<input type="datetime-local" id="pa-sched-'+id+'" class="inp" style="width:13rem;padding:.4rem .5rem;font-size:.85rem">' +
      '<button class="btn btn-primary btn-sm" type="button" onclick="paSchedule('+id+')"><i class="fas fa-calendar-plus"></i>\u65E5\u6642\u4E88\u7D04</button>' +
      '<button class="btn btn-primary btn-sm" type="button" onclick="paPostNow('+id+')" style="background:#059669;border-color:#059669"><i class="fa-brands fa-x-twitter"></i>\u4ECA\u3059\u3050\u6295\u7A3F</button>' +
      '<span id="pa-status-'+id+'" class="text-xs"></span>' +
    '</div>' +
  '</div>';
}
window.paResultCardHtml = paResultCardHtml;

window.paAttachedMedia = window.paAttachedMedia || {};

function paRenderMedia(pid) {
  const el = document.getElementById('pa-media-'+pid); if (!el) return;
  const arr = window.paAttachedMedia[pid] || [];
  el.innerHTML = arr.map(m =>
    '<div style="display:flex;align-items:center;gap:.25rem;background:#F3F4F6;border-radius:.25rem;padding:.15rem .4rem;font-size:.7rem">' +
      '<i class="fas '+(m.type==='video'?'fa-film':'fa-image')+'"></i>' +
      '<span style="max-width:10rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="'+(m.name||'').replace(/"/g,'&quot;')+'">'+(m.name||'media')+'</span>' +
      '<button type="button" onclick="paRemoveMedia('+pid+','+m.id+')" style="background:none;border:none;cursor:pointer;color:#dc2626"><i class="fas fa-xmark"></i></button>' +
    '</div>'
  ).join('');
}
window.paRenderMedia = paRenderMedia;

window.paRemoveMedia = function(pid, mid) {
  const arr = window.paAttachedMedia[pid] || [];
  window.paAttachedMedia[pid] = arr.filter(m => m.id !== mid);
  paRenderMedia(pid);
  paSyncMediaToPost(pid);
};

async function paSyncMediaToPost(pid) {
  const arr = window.paAttachedMedia[pid] || [];
  const ids = arr.map(m => m.id);
  await fetch('/api/admin/posts/'+pid+'/attach-media', {
    method:'POST', headers:{'content-type':'application/json'},
    body: JSON.stringify({media_ids: ids})
  });
}
window.paSyncMediaToPost = paSyncMediaToPost;

window.paAttachImageUrl = function(pid) {
  const u = prompt('\u753B\u50CF\u306EURL\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044'); if (!u) return;
  paAddRemoteMedia(pid, u, 'image');
};
window.paAttachVideoUrl = function(pid) {
  const u = prompt('\u52D5\u753B\u306EURL\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044'); if (!u) return;
  paAddRemoteMedia(pid, u, 'video');
};
window.paAttachAny = async function(pid, kind) {
  window.paAttachedMedia = window.paAttachedMedia || {};
  window.paAttachedMedia[pid] = window.paAttachedMedia[pid] || [];
  if (window.paAttachedMedia[pid].length >= 4) { toast('\u6DFB\u4ED8\u306F\u6700\u59274\u4EF6\u307E\u3067','err'); return; }
  // \u30D5\u30A9\u30EB\u30C0\u3092\u76F4\u63A5\u958B\u304F\uFF08\u30D5\u30A1\u30A4\u30EB\u30D4\u30C3\u30AB\u30FC\uFF09
  if (kind === 'image') paAttachImageFile(pid);
  else paAttachVideoFile(pid);
};
async function paAddRemoteMedia(pid, url, ftype) {
  try {
    const r = await fetch('/api/admin/media/url', {
      method:'POST', headers:{'content-type':'application/json'},
      body: JSON.stringify({url, file_type: ftype})
    });
    const j = await r.json();
    if (!j.success) { toast('\u767B\u9332\u5931\u6557: '+(j.error||''),'err'); return; }
    window.paAttachedMedia[pid] = window.paAttachedMedia[pid] || [];
    if (window.paAttachedMedia[pid].length >= 4) { toast('\u6DFB\u4ED8\u306F\u6700\u59274\u4EF6\u307E\u3067','err'); return; }
    window.paAttachedMedia[pid].push({id: j.id, type: ftype, name: url.split('/').pop()||'remote'});
    paRenderMedia(pid);
    await paSyncMediaToPost(pid);
    toast('\u6DFB\u4ED8\u3057\u307E\u3057\u305F','ok');
  } catch (e) { toast('\u30A8\u30E9\u30FC: '+e.message,'err'); }
}

function paPickFile(accept) {
  return new Promise(res => {
    const inp = document.createElement('input');
    inp.type = 'file'; inp.accept = accept;
    inp.onchange = () => res(inp.files && inp.files[0] || null);
    inp.click();
  });
}
window.paAttachImageFile = async function(pid) {
  const f = await paPickFile('image/*'); if (!f) return;
  paUploadFile(pid, f, 'image');
};
window.paAttachVideoFile = async function(pid) {
  const f = await paPickFile('video/*'); if (!f) return;
  paUploadFile(pid, f, 'video');
};
async function paUploadFile(pid, file, ftype) {
  try {
    const fd = new FormData(); fd.append('file', file);
    toast('\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u4E2D...','info');
    const r = await fetch('/api/admin/media', {method:'POST', body: fd});
    const j = await r.json();
    if (!j.success) { toast('\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u5931\u6557: '+(j.error||''),'err'); return; }
    window.paAttachedMedia[pid] = window.paAttachedMedia[pid] || [];
    if (window.paAttachedMedia[pid].length >= 4) { toast('\u6DFB\u4ED8\u306F\u6700\u59274\u4EF6\u307E\u3067','err'); return; }
    window.paAttachedMedia[pid].push({id: j.id, type: ftype, name: file.name});
    paRenderMedia(pid);
    await paSyncMediaToPost(pid);
    toast('\u6DFB\u4ED8\u3057\u307E\u3057\u305F','ok');
  } catch (e) { toast('\u30A8\u30E9\u30FC: '+e.message,'err'); }
}

window.paSchedule = async function(pid) {
  const dt = document.getElementById('pa-sched-'+pid).value;
  if (!dt) { toast('\u4E88\u7D04\u65E5\u6642\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044','err'); return; }
  const stEl = document.getElementById('pa-status-'+pid);
  stEl.textContent = '\u4E88\u7D04\u4E2D...'; stEl.style.color='#6B7280';
  await paSyncMediaToPost(pid);
  const scheduledAt = datetimeLocalToJst(dt);
  const r = await fetch('/api/admin/posts/'+pid+'/schedule', {
    method:'POST', headers:{'content-type':'application/json'},
    body: JSON.stringify({scheduled_at: scheduledAt})
  });
  const j = await r.json();
  if (j.success) { stEl.textContent='\u4E88\u7D04\u5B8C\u4E86 ('+(j.effective_scheduled_at||scheduledAt)+')'; stEl.style.color='#059669'; toast('\u4E88\u7D04\u5B8C\u4E86','ok'); }
  else { stEl.textContent='\u5931\u6557: '+(j.error||''); stEl.style.color='#dc2626'; toast('\u4E88\u7D04\u5931\u6557: '+(j.error||''),'err'); }
};

window.paPostNow = async function(pid) {
  if (!confirm('\u3053\u306E\u6295\u7A3F\u3092\u4ECA\u3059\u3050X\u306B\u6295\u7A3F\u3057\u307E\u3059\u304B\uFF1F')) return;
  const stEl = document.getElementById('pa-status-'+pid);
  stEl.textContent = '\u6295\u7A3F\u4E2D...'; stEl.style.color='#6B7280';
  await paSyncMediaToPost(pid);
  const r = await fetch('/api/admin/posts/'+pid+'/post-now', {
    method:'POST', headers:{'content-type':'application/json'},
    body: JSON.stringify({})
  });
  const j = await r.json();
  if (j.success) { stEl.textContent='\u6295\u7A3F\u5B8C\u4E86 (ID:'+(j.tweet_id||'-')+')'; stEl.style.color='#059669'; toast('\u6295\u7A3F\u3057\u307E\u3057\u305F','ok'); }
  else { stEl.textContent='\u5931\u6557: '+(j.error||''); stEl.style.color='#dc2626'; toast('\u6295\u7A3F\u5931\u6557: '+(j.error||''),'err'); }
};

async function doPatternGenerate_legacy_unused() { /* removed */ }

function paSaveDraft() {
  const draft = {
    pattern: document.getElementById('patt-val').value,
    theme: document.getElementById('pa-theme').value,
    kw: document.getElementById('pa-kw').value,
    count: document.getElementById('pa-count').value,
    footer: document.getElementById('pa-footer') ? document.getElementById('pa-footer').value : '',
    link: document.getElementById('pa-link').value,
    mode: (document.querySelector('input[name="pa-mode"]:checked')||{}).value || 'body',
  };
  try { sessionStorage.setItem('pa_draft', JSON.stringify(draft)); toast('\u4E0B\u66F8\u304D\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F','ok'); }
  catch(e) { toast('\u4FDD\u5B58\u5931\u6557: '+e.message,'err'); }
}
window.paSaveDraft = paSaveDraft;
function paLoadDraft() {
  try {
    const raw = sessionStorage.getItem('pa_draft');
    if (!raw) { toast('\u4FDD\u5B58\u3055\u308C\u305F\u4E0B\u66F8\u304D\u304C\u3042\u308A\u307E\u305B\u3093','info'); return; }
    const d = JSON.parse(raw);
    if (d.theme) document.getElementById('pa-theme').value = d.theme;
    if (d.kw) document.getElementById('pa-kw').value = d.kw;
    if (d.count) document.getElementById('pa-count').value = d.count;
    if (d.footer && document.getElementById('pa-footer')) document.getElementById('pa-footer').value = d.footer;
    if (d.link) document.getElementById('pa-link').value = d.link;
    if (d.mode) {
      const r = document.querySelector('input[name="pa-mode"][value="'+d.mode+'"]');
      if (r) r.checked = true;
    }
    if (d.pattern) {
      const cell = document.querySelector('#patt-grid > div[data-val="'+d.pattern+'"]');
      if (cell) selectPatt(cell, d.pattern);
    }
    toast('\u4E0B\u66F8\u304D\u3092\u518D\u958B\u3057\u307E\u3057\u305F','ok');
  } catch(e) { toast('\u8AAD\u8FBC\u5931\u6557: '+e.message,'err'); }
}
window.paLoadDraft = paLoadDraft;

async function doPatternGenerate() {
  const patt = document.getElementById('patt-val').value;
  const theme = document.getElementById('pa-theme').value.trim();
  if (!theme) { toast('\u30C6\u30FC\u30DE\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044', 'err'); return; }
  const cntVal = parseInt(document.getElementById('pa-count').value, 10) || 1;
  const cnt = Math.min(Math.max(cntVal, 1), 10);
  const modeEl = document.querySelector('input[name="pa-mode"]:checked');
  const postMode = modeEl ? modeEl.value : 'body';
  const footer = document.getElementById('pa-footer') ? document.getElementById('pa-footer').value : '';
  const body = {
    theme,
    keywords: document.getElementById('pa-kw').value,
    pattern_type: patt,
    post_mode: postMode,
    link_url: document.getElementById('pa-link').value,
    hashtags: document.getElementById('pa-tag').value,
    footer: footer,
    count: cnt,
  };
  const root = document.getElementById('pa-results');
  root.innerHTML = '<div class="text-sm text-ink-muted" style="padding:.5rem"><i class="fas fa-spinner fa-spin"></i> \u751F\u6210\u4E2D... ('+cnt+'\u4EF6)</div>';
  try {
    const r = await fetch('/api/admin/posts/generate', {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(body)});
    const j = await r.json();
    if (!j.success) { root.innerHTML='<div class="text-sm" style="color:#dc2626;padding:.5rem">\u751F\u6210\u5931\u6557: ' + (j.error || '') + '</div>'; toast('\u751F\u6210\u5931\u6557: ' + (j.error || ''), 'err'); return; }
    root.innerHTML = '<div class="mt-4"><h3 class="font-bold text-ink mb-3"><i class="fas fa-circle-check text-emerald-600"></i> \u751F\u6210\u7D50\u679C ' + j.generated.length + '\u4EF6</h3><div>' +
      j.generated.map(g => paResultCardHtml(Object.assign({pattern_type: patt}, g))).join('') +
    '</div></div>';
    toast(j.generated.length + '\u4EF6\u751F\u6210\u3057\u307E\u3057\u305F', 'ok');
  } catch(e) {
    root.innerHTML='<div class="text-sm" style="color:#dc2626;padding:.5rem">\u30A8\u30E9\u30FC: '+e.message+'</div>';
    toast('\u30A8\u30E9\u30FC: '+e.message,'err');
  }
}
window.doPatternGenerate = doPatternGenerate;
<\/script>`;
}
__name(dn, "dn");
function ln(e) {
  return `
<div class="space-y-4">
  
  <div>
    <h1 class="section-title"><i class="fas fa-pen-to-square"></i>AI\u751F\u62102</h1>
  </div>
  <div class="card space-y-5">
    <h3 class="font-bold text-ink">X\u6295\u7A3F\u751F\u6210</h3>
    <div>
      <label class="field-label"><i class="fas fa-pencil icon-blue"></i>\u30D7\u30ED\u30F3\u30D7\u30C8 <span class="text-red-500">*</span></label>
      <textarea id="ge-prompt" class="inp" style="min-height:9rem" placeholder="\u4F8B: AI\u81EA\u52D5\u5316\u3067\u526F\u696D\u53CE\u76CA\u3092\u4F5C\u308B\u65B9\u6CD5\u306B\u3064\u3044\u3066140\u5B57\u4EE5\u5185\u306E\u6295\u7A3F\u3092\u4F5C\u6210"></textarea>
    </div>
    <div>
      <label class="field-label"><i class="fas fa-list-ol icon-yellow"></i>\u751F\u6210\u6570</label>
      <select id="ge-count" class="inp" style="width:8rem">
        <option value="1">1\u4EF6</option><option value="2">2\u4EF6</option><option value="3" selected>3\u4EF6</option><option value="4">4\u4EF6</option><option value="5">5\u4EF6</option><option value="6">6\u4EF6</option><option value="7">7\u4EF6</option><option value="8">8\u4EF6</option><option value="9">9\u4EF6</option><option value="10">10\u4EF6</option>
      </select>
    </div>
    <div class="border border-line rounded-lg p-4 bg-paper-soft">
      <div class="font-semibold text-accent mb-3"><i class="fas fa-sliders"></i> \u6295\u7A3F\u30AA\u30D7\u30B7\u30E7\u30F3</div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="field-label"><i class="fas fa-signature icon-blue"></i>\u6295\u7A3F\u672B\u5C3E\u306E\u8FFD\u8A18\uFF08\u4EFB\u610F\uFF09</label>
          <input type="text" id="ge-footer" class="inp" placeholder="\u4F8B: \u8A73\u3057\u304F\u306F\u30D7\u30ED\u30D5\u30EA\u30F3\u30AF\u304B\u3089\u{1F447}">
        </div>
        <div>
          <label class="field-label"><i class="fas fa-link icon-blue"></i>URL\uFF08\u4EFB\u610F\uFF09</label>
          <input type="url" id="ge-url" class="inp" placeholder="https://">
        </div>
      </div>
      <div class="mt-3">
        <label class="field-label"><i class="fas fa-align-left icon-blue"></i>\u672C\u6587\u30E2\u30FC\u30C9</label>
        <div class="flex gap-4">
          <label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="ge-mode" value="body" checked class="accent-accent"><span class="text-sm">\u672C\u6587</span></label>
          <label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="ge-mode" value="140" class="accent-accent"><span class="text-sm">140\u6587\u5B57\u4EE5\u5185</span></label>
          <label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="ge-mode" value="simple" class="accent-accent"><span class="text-sm">\u30B7\u30F3\u30D7\u30EB</span></label>
        </div>
      </div>
    </div>
    <div class="flex gap-2 items-stretch">
      <button class="btn btn-primary flex-1 justify-center" style="padding:.85rem 1rem;font-size:.95rem;font-weight:600" onclick="doGen2()"><i class="fas fa-pencil"></i>AI\u751F\u6210</button>
      <button class="btn btn-ghost" onclick="toast('\u4E0B\u66F8\u304D\u4FDD\u5B58:\u5B9F\u88C5\u4E2D','info')"><i class="fas fa-save"></i>\u4E0B\u66F8\u304D\u4FDD\u5B58</button>
      <button class="btn btn-ghost" onclick="toast('\u4E0B\u66F8\u304D\u518D\u958B:\u5B9F\u88C5\u4E2D','info')"><i class="fas fa-folder-open"></i>\u4E0B\u66F8\u304D\u518D\u958B</button>
    </div>
    <div id="ge-results"></div>
  </div>
</div>
<script>
// AI\u751F\u62102 \u3067\u3082 paResultCardHtml/paAttachAny\u7B49\u3092\u4F7F\u3046\u305F\u3081\u3001\u6700\u5C0F\u9650\u306E\u95A2\u6570\u3092\u5B9A\u7FA9
window.paAttachedMedia = window.paAttachedMedia || {};
function paResultCardHtml(g) {
  const id = g.id;
  const body = (g.body || '').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const patt = g.pattern_type || '';
  const pattLabels = {problem:'\u554F\u984C\u63D0\u8D77\u578B',before_after:'\u30D3\u30D5\u30A9\u30FC\u30A2\u30D5\u30BF\u30FC\u578B',contrarian:'\u9006\u5F35\u308A\u578B',howto:'HowTo\u5B9F\u6F14\u578B',numbers:'\u6570\u5B57\u30A4\u30F3\u30D1\u30AF\u30C8\u578B'};
  const pattLabel = pattLabels[patt] || patt || '';
  return '<div class="card card-sm" id="pa-card-'+id+'" data-pid="'+id+'" style="margin-bottom:.75rem;padding:1rem;border:1px solid var(--line);border-radius:.5rem;background:#fff">' +
    (pattLabel?'<div style="font-size:.7rem;color:#2563EB;background:#EFF6FF;display:inline-block;padding:.15rem .5rem;border-radius:.25rem;margin-bottom:.5rem;font-weight:600">'+pattLabel+'</div>':'') +
    '<div class="whitespace-pre-line text-sm leading-relaxed text-ink" style="white-space:pre-line">' + body + '</div>' +
    '<div class="text-xs text-ink-muted mt-2">' + (g.body||'').length + ' \u6587\u5B57</div>' +
    '<div id="pa-media-'+id+'" style="margin-top:.5rem;display:flex;gap:.25rem;flex-wrap:wrap"></div>' +
    '<div style="display:flex;gap:.4rem;margin-top:.75rem;flex-wrap:wrap;align-items:center">' +
      '<button class="btn btn-ghost btn-sm" type="button" onclick="paAttachAny('+id+',\\'image\\')"><i class="fas fa-image"></i>\u753B\u50CF</button>' +
      '<button class="btn btn-ghost btn-sm" type="button" onclick="paAttachAny('+id+',\\'video\\')"><i class="fas fa-film"></i>\u52D5\u753B</button>' +
      '<input type="datetime-local" id="pa-sched-'+id+'" class="inp" style="width:13rem;padding:.4rem .5rem;font-size:.85rem">' +
      '<button class="btn btn-primary btn-sm" type="button" onclick="paSchedule('+id+')"><i class="fas fa-calendar-plus"></i>\u65E5\u6642\u4E88\u7D04</button>' +
      '<button class="btn btn-primary btn-sm" type="button" onclick="paPostNow('+id+')" style="background:#059669;border-color:#059669"><i class="fa-brands fa-x-twitter"></i>\u4ECA\u3059\u3050\u6295\u7A3F</button>' +
      '<span id="pa-status-'+id+'" class="text-xs"></span>' +
    '</div>' +
  '</div>';
}
function paRenderMedia(pid) {
  const el = document.getElementById('pa-media-'+pid); if (!el) return;
  const arr = window.paAttachedMedia[pid] || [];
  el.innerHTML = arr.map(m =>
    '<div style="display:flex;align-items:center;gap:.25rem;background:#F3F4F6;border-radius:.25rem;padding:.15rem .4rem;font-size:.7rem">' +
      '<i class="fas '+(m.type==='video'?'fa-film':'fa-image')+'"></i>' +
      '<span style="max-width:10rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="'+(m.name||'').replace(/"/g,'&quot;')+'">'+(m.name||'media')+'</span>' +
      '<button type="button" onclick="paRemoveMedia('+pid+','+m.id+')" style="background:none;border:none;cursor:pointer;color:#dc2626"><i class="fas fa-xmark"></i></button>' +
    '</div>'
  ).join('');
}
window.paRemoveMedia = function(pid, mid) {
  const arr = window.paAttachedMedia[pid] || [];
  window.paAttachedMedia[pid] = arr.filter(m => m.id !== mid);
  paRenderMedia(pid);
  paSyncMediaToPost(pid);
};
async function paSyncMediaToPost(pid) {
  const arr = window.paAttachedMedia[pid] || [];
  const ids = arr.map(m => m.id);
  await fetch('/api/admin/posts/'+pid+'/attach-media', {
    method:'POST', headers:{'content-type':'application/json'},
    body: JSON.stringify({media_ids: ids})
  });
}
window.paAttachAny = async function(pid, kind) {
  window.paAttachedMedia[pid] = window.paAttachedMedia[pid] || [];
  if (window.paAttachedMedia[pid].length >= 4) { toast('\u6DFB\u4ED8\u306F\u6700\u59274\u4EF6\u307E\u3067','err'); return; }
  // \u30D5\u30A9\u30EB\u30C0\u3092\u76F4\u63A5\u958B\u304F\uFF08\u30D5\u30A1\u30A4\u30EB\u30D4\u30C3\u30AB\u30FC\uFF09
  const inp = document.createElement('input'); inp.type='file'; inp.accept = kind==='image'?'image/*':'video/*';
  inp.onchange = async () => {
    const f = inp.files && inp.files[0]; if(!f) return;
    const fd = new FormData(); fd.append('file', f);
    toast('\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u4E2D...','info');
    const r = await fetch('/api/admin/media',{method:'POST', body: fd});
    const j = await r.json();
    if(!j.success){ toast('\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u5931\u6557: '+(j.error||''),'err'); return; }
    window.paAttachedMedia[pid].push({id: j.id, type: kind, name: f.name});
    paRenderMedia(pid);
    await paSyncMediaToPost(pid);
    toast(kind==='image'?'\u753B\u50CF\u3092\u6DFB\u4ED8\u3057\u307E\u3057\u305F':'\u52D5\u753B\u3092\u6DFB\u4ED8\u3057\u307E\u3057\u305F','ok');
  };
  inp.click();
};
window.paSchedule = async function(pid) {
  const dt = document.getElementById('pa-sched-'+pid).value;
  if (!dt) { toast('\u4E88\u7D04\u65E5\u6642\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044','err'); return; }
  const stEl = document.getElementById('pa-status-'+pid);
  stEl.textContent = '\u4E88\u7D04\u4E2D...'; stEl.style.color='#6B7280';
  const scheduledAt = datetimeLocalToJst(dt);
  const r = await fetch('/api/admin/posts/'+pid+'/schedule', {
    method:'POST', headers:{'content-type':'application/json'},
    body: JSON.stringify({scheduled_at: scheduledAt})
  });
  const j = await r.json();
  if (j.success) { stEl.textContent='\u4E88\u7D04\u5B8C\u4E86'; stEl.style.color='#059669'; toast('\u4E88\u7D04\u5B8C\u4E86','ok'); }
  else { stEl.textContent='\u5931\u6557: '+(j.error||''); stEl.style.color='#dc2626'; toast('\u4E88\u7D04\u5931\u6557','err'); }
};
window.paPostNow = async function(pid) {
  if (!confirm('\u3053\u306E\u6295\u7A3F\u3092\u4ECA\u3059\u3050X\u306B\u6295\u7A3F\u3057\u307E\u3059\u304B\uFF1F')) return;
  const stEl = document.getElementById('pa-status-'+pid);
  stEl.textContent = '\u6295\u7A3F\u4E2D...'; stEl.style.color='#6B7280';
  const r = await fetch('/api/admin/posts/'+pid+'/post-now', {
    method:'POST', headers:{'content-type':'application/json'}, body:'{}'
  });
  const j = await r.json();
  if (j.success) { stEl.textContent='\u6295\u7A3F\u5B8C\u4E86'; stEl.style.color='#059669'; toast('\u6295\u7A3F\u3057\u307E\u3057\u305F','ok'); }
  else { stEl.textContent='\u5931\u6557: '+(j.error||''); stEl.style.color='#dc2626'; toast('\u6295\u7A3F\u5931\u6557: '+(j.error||''),'err'); }
};

async function doGen2() {
  const prompt = document.getElementById('ge-prompt').value.trim();
  if (!prompt) { toast('\u30D7\u30ED\u30F3\u30D7\u30C8\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044','err'); return; }
  const count = parseInt(document.getElementById('ge-count').value, 10) || 3;
  const mode = document.querySelector('input[name="ge-mode"]:checked').value;
  const footer = document.getElementById('ge-footer').value;
  const url = document.getElementById('ge-url').value;
  const root = document.getElementById('ge-results');
  root.innerHTML = '<div class="text-sm text-ink-muted" style="padding:.5rem"><i class="fas fa-spinner fa-spin"></i> \u751F\u6210\u4E2D... ('+count+'\u4EF6)</div>';
  try {
    const r = await fetch('/api/admin/posts/generate', {
      method:'POST', headers:{'content-type':'application/json'},
      body: JSON.stringify({ theme: prompt, count, post_mode: mode, footer_text: footer, link_url: url }),
    });
    const j = await r.json();
    if (!j.success) { root.innerHTML = '<div style="color:#dc2626;padding:.5rem">\u751F\u6210\u5931\u6557: '+(j.error||'')+'</div>'; toast('\u751F\u6210\u5931\u6557: ' + (j.error||''),'err'); return; }
    root.innerHTML = '<div class="mt-4"><h3 class="font-bold text-ink mb-3"><i class="fas fa-circle-check text-emerald-600"></i> \u751F\u6210\u7D50\u679C '+j.generated.length+'\u4EF6</h3><div>' +
      j.generated.map(g => (typeof paResultCardHtml==='function' ? paResultCardHtml(g) : '<div class="card card-sm"><div class="whitespace-pre-line text-sm text-ink">' + (g.body||'').replace(/</g,'&lt;') + '</div></div>')).join('') +
    '</div></div>';
    toast(j.generated.length + '\u4EF6\u751F\u6210\u3057\u307E\u3057\u305F','ok');
  } catch(e) {
    root.innerHTML = '<div style="color:#dc2626;padding:.5rem">\u30A8\u30E9\u30FC: '+e.message+'</div>';
    toast('\u30A8\u30E9\u30FC: '+e.message,'err');
  }
}
<\/script>`;
}
__name(ln, "ln");
function cn(e) {
  const { month: t, y: s, m: a, posts: n, stats: i } = e;
  return `
<div class="space-y-4">
  
  <div>
    <h1 class="section-title"><i class="fa-brands fa-x-twitter"></i>X\u6295\u7A3F\u7BA1\u7406</h1>
  </div>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2">
      <button class="btn btn-ghost" onclick="navMonth(-1)"><i class="fas fa-chevron-left"></i></button>
      <span class="text-lg font-bold text-ink px-2">${s}\u5E74 ${a}\u6708</span>
      <button class="btn btn-ghost" onclick="navMonth(1)"><i class="fas fa-chevron-right"></i></button>
      <button class="btn btn-primary btn-sm" onclick="thisMonth()">\u5F53\u6708</button>
    </div>
    <div class="flex gap-2">
      <button class="btn btn-primary" onclick="openSchedModal()"><i class="fas fa-plus"></i>\u65B0\u898F\u4E88\u7D04\u6295\u7A3F</button>
      <button class="btn btn-ghost" onclick="dlExportPosts()" title="\u6295\u7A3F\u30C7\u30FC\u30BF\u3092CSV\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9"><i class="fas fa-download"></i>CSV</button>
      <button class="btn btn-danger" onclick="bulkDel()" id="bulk-del-btn" disabled><i class="fas fa-trash"></i>\u4E00\u62EC\u524A\u9664</button>
    </div>
  </div>
  <div class="flex items-center gap-6 text-sm">
    <div>\u5408\u8A08: <span class="font-bold">${i.total}\u4EF6</span></div>
    <div>\u6295\u7A3F\u6E08: <span class="font-bold text-emerald-600">${i.posted}\u4EF6</span></div>
    <div>\u672A\u6295\u7A3F: <span class="font-bold text-amber-600">${i.pending}\u4EF6</span></div>
    <div>\u4E0B\u66F8\u304D: <span class="font-bold text-ink-muted">${i.draft || 0}\u4EF6</span></div>
    <div>\u4E88\u7D04\u6E08: <span class="font-bold text-blue-600">${i.scheduled || 0}\u4EF6</span></div>
    <div>\u5931\u6557: <span class="font-bold text-red-600">${i.failed}\u4EF6</span></div>
  </div>
  <div style="display:flex;gap:.4rem;flex-wrap:wrap;border-bottom:1px solid var(--line);padding-bottom:.5rem">
    <button type="button" class="btn btn-sm xst-tab xst-active" data-st="all" onclick="filterPosts(this,'all')"><i class="fas fa-list"></i>\u3059\u3079\u3066</button>
    <button type="button" class="btn btn-sm xst-tab" data-st="posted" onclick="filterPosts(this,'posted')"><i class="fas fa-check"></i>\u6295\u7A3F\u6E08</button>
    <button type="button" class="btn btn-sm xst-tab" data-st="pending" onclick="filterPosts(this,'pending')"><i class="fas fa-clock"></i>\u672A\u6295\u7A3F</button>
    <button type="button" class="btn btn-sm xst-tab" data-st="draft" onclick="filterPosts(this,'draft')"><i class="fas fa-file-pen"></i>\u4E0B\u66F8\u304D</button>
    <button type="button" class="btn btn-sm xst-tab" data-st="scheduled" onclick="filterPosts(this,'scheduled')"><i class="fas fa-calendar-check"></i>\u4E88\u7D04\u6E08</button>
    <button type="button" class="btn btn-sm xst-tab" data-st="failed" onclick="filterPosts(this,'failed')"><i class="fas fa-triangle-exclamation"></i>\u5931\u6557</button>
    <style>.xst-tab{background:#fff;border:1px solid var(--line);color:var(--ink-muted)}.xst-tab.xst-active{background:var(--accent);color:#fff;border-color:var(--accent)}</style>
  </div>
  <div class="card" style="padding:0">
    <table class="data">
      <thead><tr>
        <th style="width:40px"><input type="checkbox" onchange="checkAll(this.checked)"></th>
        <th>ID</th><th>\u672C\u6587</th><th>\u30E2\u30FC\u30C9</th><th>\u4E88\u7D04\u65E5\u6642</th><th>\u72B6\u614B</th><th>\u30A2\u30AB\u30A6\u30F3\u30C8</th><th></th>
      </tr></thead>
      <tbody>
        ${n.length === 0 ? '<tr><td colspan="8" class="text-center text-ink-muted py-10">\u3053\u306E\u6708\u306E\u6295\u7A3F\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093</td></tr>' : n.map((r) => `
            <tr data-status="${r.status || ""}" data-scheduled="${r.scheduled_at ? "1" : "0"}" class="post-row">
              <td><input type="checkbox" class="post-chk" value="${r.id}" onchange="updateBulk()"></td>
              <td class="font-mono text-xs text-ink-faint">${r.id}</td>
              <td class="max-w-md"><div class="truncate">${w((r.body || "").slice(0, 80))}</div></td>
              <td>${r.post_mode === "140" ? "140\u6587\u5B57" : r.post_mode === "thread" ? "\u30B9\u30EC\u30C3\u30C9" : "\u30D5\u30EB\u6587\u7AE0"}</td>
              <td class="text-xs font-mono">${r.scheduled_at || "\u2014"}</td>
              <td>${Lt(r.status, r.scheduled_at)}</td>
              <td class="text-xs">@${w(r.x_username || "-")}</td>
              <td class="text-right">
                ${r.status !== "posted" ? `<button class="btn btn-subtle btn-sm" onclick="postNow(${r.id})" title="\u4ECA\u3059\u3050\u6295\u7A3F"><i class="fa-brands fa-x-twitter"></i>\u4ECA\u3059\u3050\u6295\u7A3F</button>` : ""}
                ${r.status !== "posted" ? `<button class="btn btn-ghost btn-sm" onclick="openSchedRowModal(${r.id})" title="\u4E88\u7D04\u65E5\u6642\u3092\u8A2D\u5B9A" style="background:#FEF3C7;color:#92400E;border-color:#FDE68A"><i class="fas fa-calendar-plus"></i>\u4E88\u7D04\u6295\u7A3F</button>` : ""}
                <button class="btn btn-danger btn-sm" onclick="delPost(${r.id})"><i class="fas fa-trash"></i>\u524A\u9664</button>
              </td>
            </tr>
          `).join("")}
      </tbody>
    </table>
  </div>

  <!-- \u65B0\u898F\u4E88\u7D04\u6295\u7A3F\u30E2\u30FC\u30C0\u30EB -->
  <div id="post-sched-modal" style="display:none;position:fixed;inset:0;z-index:80;background:rgba(0,0,0,.5);overflow-y:auto;padding:1rem;align-items:flex-start;justify-content:center">
    <div style="background:#fff;border-radius:.75rem;max-width:38rem;width:100%;padding:1.5rem;margin:2rem auto;position:relative">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem">
        <h3 style="font-size:1.05rem;font-weight:700">\u65B0\u898F\u4E88\u7D04\u6295\u7A3F</h3>
        <button onclick="closeSchedModal()" type="button" style="background:none;border:none;cursor:pointer;color:#6B7280;font-size:1.25rem"><i class="fas fa-xmark"></i></button>
      </div>
      <div class="space-y-3">
        <div>
          <label class="field-label">\u672C\u6587 <span style="color:#dc2626">*</span></label>
          <textarea id="ps-body" class="inp" style="min-height:7rem" placeholder="\u30C4\u30A4\u30FC\u30C8\u672C\u6587\uFF08\u6700\u5927280\u6587\u5B57\uFF09" maxlength="280"></textarea>
        </div>
        <div>
          <label class="field-label">\u4E88\u7D04\u65E5\u6642 <span style="color:#dc2626">*</span></label>
          <input type="datetime-local" id="ps-when" class="inp">
        </div>
        <div>
          <label class="field-label">URL\uFF08\u4EFB\u610F\uFF09</label>
          <input type="url" id="ps-url" class="inp" placeholder="https://">
        </div>
        <div style="border:1px solid var(--line);border-radius:.5rem;padding:.75rem;background:var(--paper-soft)">
          <div style="font-weight:600;color:var(--accent);margin-bottom:.5rem"><i class="fas fa-photo-film"></i> \u30E1\u30C7\u30A3\u30A2\u6DFB\u4ED8\uFF08\u4EFB\u610F\u30FB\u6700\u59274\u4EF6\uFF09</div>
          <div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-bottom:.5rem">
            <button type="button" class="btn btn-ghost btn-sm" onclick="psAttachAny('image')"><i class="fas fa-image"></i>\u753B\u50CF</button>
            <button type="button" class="btn btn-ghost btn-sm" onclick="psAttachAny('video')"><i class="fas fa-film"></i>\u52D5\u753B</button>
          </div>
          <div id="ps-media-list" style="display:flex;flex-wrap:wrap"></div>
        </div>
        <div style="display:flex;gap:.5rem;padding-top:.5rem;justify-content:flex-end">
          <button type="button" class="btn btn-ghost" onclick="closeSchedModal()">\u30AD\u30E3\u30F3\u30BB\u30EB</button>
          <button type="button" class="btn btn-primary" onclick="submitScheduledPost()"><i class="fas fa-calendar-plus"></i>\u4E88\u7D04\u767B\u9332</button>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
window.filterPosts = function(btn, st) {
  document.querySelectorAll('.xst-tab').forEach(b => b.classList.remove('xst-active'));
  btn.classList.add('xst-active');
  document.querySelectorAll('tr.post-row').forEach(tr => {
    const s = tr.getAttribute('data-status') || '';
    const sched = tr.getAttribute('data-scheduled') === '1';
    let show = false;
    if (st === 'all') show = true;
    else if (st === 'posted') show = (s === 'posted');
    else if (st === 'failed') show = (s === 'failed' || s === 'rejected' || s === 'error');
    else if (st === 'draft') show = (s === 'draft');
    else if (st === 'scheduled') show = ((s === 'approved' || s === 'pending' || s === 'publishing') && sched);
    else if (st === 'pending') show = ((s === 'pending' || s === 'approved') && !sched);
    tr.style.display = show ? '' : 'none';
  });
};
window.openSchedRowModal = function(postId) {
  // \u65E2\u5B58\u30E2\u30FC\u30C0\u30EB\u3092\u524A\u9664
  const old = document.getElementById('row-sched-modal');
  if (old) old.remove();

  // 1\u6642\u9593\u5F8C\u3092JST\u56FA\u5B9A\u3067\u30C7\u30D5\u30A9\u30EB\u30C8\u5024\u306B
  const def = jstNowDatetimeLocal(60);

  const modal = document.createElement('div');
  modal.id = 'row-sched-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:90;background:rgba(0,0,0,.55);display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:1rem';
  modal.innerHTML =
    '<div style="background:#fff;border-radius:.75rem;max-width:28rem;width:100%;padding:1.5rem;margin:5rem auto;position:relative">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem">' +
        '<h3 style="font-size:1.05rem;font-weight:700"><i class="fas fa-calendar-plus"></i> \u4E88\u7D04\u65E5\u6642\u3092\u8A2D\u5B9A</h3>' +
        '<button onclick="document.getElementById(\\'row-sched-modal\\').remove()" type="button" style="background:none;border:none;cursor:pointer;color:#6B7280;font-size:1.25rem"><i class="fas fa-xmark"></i></button>' +
      '</div>' +
      '<div style="font-size:.82rem;color:#6B7280;margin-bottom:.75rem">\u6295\u7A3FID: <code style="background:#F3F4F6;padding:.1rem .35rem;border-radius:.25rem">' + postId + '</code></div>' +
      '<div style="margin-bottom:1rem">' +
        '<label class="field-label">\u4E88\u7D04\u65E5\u6642 <span style="color:#dc2626">*</span></label>' +
        '<input type="datetime-local" id="row-sched-when" class="inp" value="' + def + '">' +
      '</div>' +
      '<div style="display:flex;gap:.5rem;justify-content:flex-end">' +
        '<button type="button" class="btn btn-ghost" onclick="document.getElementById(\\'row-sched-modal\\').remove()">\u30AD\u30E3\u30F3\u30BB\u30EB</button>' +
        '<button type="button" class="btn btn-primary" onclick="submitRowSched(' + postId + ')"><i class="fas fa-check"></i>\u4E88\u7D04\u767B\u9332</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(modal);
};

window.submitRowSched = async function(postId) {
  const dt = document.getElementById('row-sched-when').value;
  if (!dt) { toast('\u4E88\u7D04\u65E5\u6642\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044','err'); return; }
  const scheduledAt = datetimeLocalToJst(dt);
  try {
    const r = await fetch('/api/admin/posts/'+postId+'/schedule', {
      method:'POST', headers:{'content-type':'application/json'},
      body: JSON.stringify({scheduled_at: scheduledAt})
    });
    const j = await r.json();
    if (j.success) {
      toast('\u4E88\u7D04\u3057\u307E\u3057\u305F ('+(j.effective_scheduled_at||scheduledAt)+')','ok');
      document.getElementById('row-sched-modal').remove();
      setTimeout(()=>location.reload(),900);
    } else toast('\u4E88\u7D04\u5931\u6557: '+(j.error||''),'err');
  } catch(e) { toast('\u30A8\u30E9\u30FC: '+e.message,'err'); }
};
window.openSchedModal = function() {
  window.psMedia = [];
  psRenderMedia();
  document.getElementById('ps-body').value = '';
  document.getElementById('ps-when').value = '';
  document.getElementById('ps-url').value = '';
  const m = document.getElementById('post-sched-modal');
  m.style.display = 'flex';
};
window.closeSchedModal = function() { document.getElementById('post-sched-modal').style.display = 'none'; };
window.psMedia = [];
function psRenderMedia() {
  const el = document.getElementById('ps-media-list'); if (!el) return;
  el.innerHTML = (window.psMedia||[]).map(m =>
    '<div style="display:inline-flex;align-items:center;gap:.25rem;background:#F3F4F6;border-radius:.25rem;padding:.15rem .4rem;font-size:.7rem;margin:.15rem">'+
      '<i class="fas '+(m.type==='video'?'fa-film':'fa-image')+'"></i>'+
      '<span style="max-width:9rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="'+(m.name||'').replace(/"/g,'&quot;')+'">'+(m.name||'media')+'</span>'+
      '<button type="button" onclick="psRemoveMedia('+m.id+')" style="background:none;border:none;cursor:pointer;color:#dc2626"><i class="fas fa-xmark"></i></button>'+
    '</div>'
  ).join('');
}
window.psRemoveMedia = function(mid) { window.psMedia = (window.psMedia||[]).filter(m => m.id !== mid); psRenderMedia(); };
window.psAttachAny = async function(kind) {
  if ((window.psMedia||[]).length >= 4) { toast('\u6DFB\u4ED8\u306F\u6700\u59274\u4EF6\u307E\u3067','err'); return; }
  // \u30D5\u30A9\u30EB\u30C0\u3092\u76F4\u63A5\u958B\u304F\uFF08\u30D5\u30A1\u30A4\u30EB\u30D4\u30C3\u30AB\u30FC\uFF09
  const inp = document.createElement('input'); inp.type='file'; inp.accept = kind==='image'?'image/*':'video/*';
  inp.onchange = async () => {
    const f = inp.files && inp.files[0]; if(!f) return;
    const fd = new FormData(); fd.append('file', f);
    toast('\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u4E2D...','info');
    const r = await fetch('/api/admin/media',{method:'POST', body: fd});
    const j = await r.json();
    if(!j.success){ toast('\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u5931\u6557','err'); return; }
    window.psMedia.push({id:j.id, type:kind, name:f.name});
    psRenderMedia();
    toast(kind==='image'?'\u753B\u50CF\u3092\u6DFB\u4ED8\u3057\u307E\u3057\u305F':'\u52D5\u753B\u3092\u6DFB\u4ED8\u3057\u307E\u3057\u305F','ok');
  };
  inp.click();
};
window.submitScheduledPost = async function() {
  const body = document.getElementById('ps-body').value.trim();
  const when = document.getElementById('ps-when').value;
  if (!body) { toast('\u672C\u6587\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044','err'); return; }
  if (!when) { toast('\u4E88\u7D04\u65E5\u6642\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044','err'); return; }
  const scheduledAt = when.replace('T',' ') + ':00';
  try {
    const r = await fetch('/api/admin/posts',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({
      body, scheduled_at: scheduledAt, status:'approved', post_mode:'body',
      link_url: document.getElementById('ps-url').value || null,
      source_type:'manual_scheduled',
    })});
    const j = await r.json();
    if (!j.success) { toast('\u767B\u9332\u5931\u6557: '+(j.error||''),'err'); return; }
    if ((window.psMedia||[]).length > 0) {
      await fetch('/api/admin/posts/'+j.id+'/attach-media',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({media_ids:window.psMedia.map(m=>m.id)})});
    }
    toast('\u4E88\u7D04\u6295\u7A3F\u3092\u767B\u9332\u3057\u307E\u3057\u305F','ok');
    closeSchedModal();
    setTimeout(()=>location.reload(), 800);
  } catch(e) { toast('\u30A8\u30E9\u30FC: '+e.message,'err'); }
};

function dlExportPosts() {
  const url = '/api/admin/export/posts?month=${t}';
  fetch(url).then(r => {
    if (!r.ok) throw new Error('\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u5931\u6557');
    const cd = r.headers.get('content-disposition') || '';
    const match = cd.match(/filename="?([^"]+)"?/);
    const filename = match ? match[1] : 'ge365x_posts.csv';
    return r.blob().then(blob => ({ blob, filename }));
  }).then(({ blob, filename }) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    toast(filename + ' \u3092\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u3057\u307E\u3057\u305F', 'ok');
  }).catch(e => toast(e.message, 'err'));
}
function navMonth(delta) {
  const [y, m] = '${t}'.split('-').map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  location.href = '/dashboard/posts?month=' + d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0');
}
function thisMonth() { location.href = '/dashboard/posts'; }
function checkAll(v) {
  document.querySelectorAll('.post-chk').forEach(c => c.checked = v);
  updateBulk();
}
function updateBulk() {
  const n = document.querySelectorAll('.post-chk:checked').length;
  document.getElementById('bulk-del-btn').disabled = n === 0;
}
async function bulkDel() {
  const ids = [...document.querySelectorAll('.post-chk:checked')].map(c => parseInt(c.value, 10));
  if (!ids.length || !confirm(ids.length + '\u4EF6\u3092\u524A\u9664\u3057\u307E\u3059\u304B?')) return;
  for (const id of ids) {
    await fetch('/api/admin/posts/' + id, { method: 'DELETE' });
  }
  toast(ids.length + '\u4EF6\u524A\u9664\u3057\u307E\u3057\u305F', 'ok');
  location.reload();
}
async function postNow(id) {
  const r = await fetch('/api/admin/posts/' + id + '/post-now', { method: 'POST', headers:{'content-type':'application/json'}, body: '{}' });
  const j = await r.json();
  if (j.success) { toast('\u6295\u7A3F\u3057\u307E\u3057\u305F', 'ok'); setTimeout(()=>location.reload(), 800); }
  else toast('\u5931\u6557: ' + (j.error||''), 'err');
}
window.postNow = postNow;
async function delPost(id) {
  if (!confirm('\u524A\u9664\u3057\u307E\u3059\u304B?')) return;
  const r = await fetch('/api/admin/posts/' + id, { method: 'DELETE' });
  const j = await r.json().catch(()=>({success:true}));
  if (j.success !== false) { toast('\u524A\u9664\u3057\u307E\u3057\u305F', 'ok'); setTimeout(()=>location.reload(), 600); }
  else toast('\u524A\u9664\u5931\u6557: ' + (j.error||''), 'err');
}
window.delPost = delPost;
window.checkAll = function(checked) {
  document.querySelectorAll('.post-chk').forEach(c => c.checked = checked);
  updateBulk();
};
window.updateBulk = function() {
  const n = document.querySelectorAll('.post-chk:checked').length;
  const btn = document.getElementById('bulk-del-btn');
  if (btn) btn.disabled = n === 0;
};
window.bulkDel = async function() {
  const ids = [...document.querySelectorAll('.post-chk:checked')].map(c => c.value);
  if (!ids.length) return;
  if (!confirm(ids.length + '\u4EF6\u3092\u524A\u9664\u3057\u307E\u3059\u304B?')) return;
  await Promise.all(ids.map(id => fetch('/api/admin/posts/' + id, { method:'DELETE' })));
  toast(ids.length + '\u4EF6\u3092\u524A\u9664\u3057\u307E\u3057\u305F', 'ok');
  setTimeout(()=>location.reload(), 600);
};
window.dlExportPosts = function() {
  location.href = '/api/admin/export/posts.csv';
};
function escapeHtml(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]); }
function statusPill(s) {
  const map = {pending:'pill-soft',approved:'pill-blue',scheduled:'pill-blue',publishing:'pill-blue',posted:'pill-ok',failed:'pill-err',cancelled:'pill-soft',draft:'pill-soft'};
  const txt = {pending:'\u4E0B\u66F8\u304D',approved:'\u4E88\u7D04\u6E08',scheduled:'\u4E88\u7D04\u6E08',publishing:'\u9001\u4FE1\u4E2D',posted:'\u6295\u7A3F\u6E08',failed:'\u5931\u6557',cancelled:'\u30AD\u30E3\u30F3\u30BB\u30EB',draft:'\u4E0B\u66F8\u304D'}[s] || s;
  return '<span class="pill ' + (map[s]||'pill-soft') + '">' + txt + '</span>';
}
<\/script>`;
}
__name(cn, "cn");
function un(e) {
  return `
<div class="space-y-4">
  <div>
    <h1 class="section-title"><i class="fas fa-reply"></i>\u30C4\u30EA\u30FC\u6295\u7A3F\uFF08\u65E2\u5B58\u6295\u7A3F\u3078\u306E\u30B3\u30E1\u30F3\u30C8\u8FFD\u52A0\uFF09</h1>
  </div>
  
  <div class="card">
    <h3 class="font-bold text-ink mb-3"><i class="fas fa-reply text-accent"></i> \u30B3\u30E1\u30F3\u30C8\u5148\u6295\u7A3F\u3092\u9078\u629E <span class="text-xs text-red-500 font-normal">\uFF08\u5FC5\u9808\uFF09</span></h3>
    <div class="alert alert-warn mb-3">
      <div class="text-xs leading-relaxed">\u30B3\u30E1\u30F3\u30C8\u3092\u8FFD\u52A0\u3057\u305F\u3044\u65E2\u5B58\u306EX\u6295\u7A3F\u3092\u9078\u3093\u3067\u304F\u3060\u3055\u3044\u3002\u672A\u9078\u629E\u3067\u306F\u6295\u7A3F\u3067\u304D\u307E\u305B\u3093\u3002</div>
    </div>
    <div class="flex items-center gap-2 flex-wrap">
      <button class="btn btn-ghost" onclick="loadRecent()"><i class="fas fa-rotate"></i>\u76F4\u8FD1\u306E\u6295\u7A3F\u3092\u53D6\u5F97</button>
      <select id="th-target-pick" class="inp" style="width:30rem;display:none" onchange="onPickTarget(this.value)">
        <option value="">\u2014 \u76F4\u8FD1\u306E\u6295\u7A3F\u304B\u3089\u9078\u629E \u2014</option>
      </select>
      <input type="hidden" id="th-target-id" value="">
    </div>
    <div id="th-target-info" class="mt-3">
      <div class="text-xs text-red-600"><i class="fas fa-triangle-exclamation"></i> \u30B3\u30E1\u30F3\u30C8\u5148\u304C\u672A\u9078\u629E\u3067\u3059</div>
    </div>
  </div>
  <div class="card">
    <h3 class="font-bold text-ink mb-3"><i class="fas fa-comment-dots text-accent"></i> \u8FD4\u4FE1\u672C\u6587 <span class="text-xs text-ink-muted font-normal">\uFF081\u4EF6\u4EE5\u4E0A\uFF09</span></h3>
    <div id="th-replies" class="space-y-4">
      ${pn(1)}
    </div>
    <div class="mt-4 flex items-center gap-2 flex-wrap">
      <button class="btn btn-ghost" onclick="addReply()"><i class="fas fa-plus"></i>\u8FD4\u4FE1\u8FFD\u52A0</button>
      <span class="text-xs text-ink-muted" style="margin-left:.5rem">\u6700\u592720\u4EF6 / \u5404\u8FD4\u4FE1\u306B\u753B\u50CF\u30FB\u52D5\u753B\u3092\u6700\u59274\u4EF6\u6DFB\u4ED8\u53EF</span>
      <span style="flex:1"></span>
      <button class="btn" style="background:#10B981;color:#fff;border-color:#10B981" onclick="submitNow()"><i class="fas fa-paper-plane"></i>\u4ECA\u3059\u3050\u6295\u7A3F</button>
      <button class="btn btn-primary" onclick="submitSchedule()"><i class="fas fa-calendar"></i>\u4E88\u7D04\u6295\u7A3F</button>
      <button class="btn btn-ghost" onclick="saveDraft()"><i class="fas fa-floppy-disk"></i>\u4E0B\u66F8\u304D\u4FDD\u5B58</button>
      <button class="btn btn-ghost" onclick="previewThread()"><i class="fas fa-eye"></i>\u30D7\u30EC\u30D3\u30E5\u30FC</button>
    </div>
  </div>
  <div class="card">
    <h3 class="font-bold text-ink mb-3">\u8FD4\u4FE1\u5C65\u6B74</h3>
    ${e.history.length === 0 ? `
      <div class="text-center text-ink-muted py-10">
        <i class="fas fa-inbox text-3xl mb-2 text-ink-faint"></i>
        <div>\u8FD4\u4FE1\u6295\u7A3F\u306F\u307E\u3060\u3042\u308A\u307E\u305B\u3093</div>
      </div>
    ` : e.history.map((t) => `
      <div class="border border-line rounded-lg p-3 mb-2">
        <div class="text-xs text-ink-muted mb-1">Parent: <span class="font-mono text-accent">${t.thread_parent_id || "-"}</span> ${Lt(t.status)}</div>
        <div class="text-sm whitespace-pre-line">${w((t.body || "").slice(0, 200))}</div>
      </div>
    `).join("")}
  </div>
</div>
<script>
function renderReplyItemJs(n) {
  return '<div class="reply-item" data-idx="'+n+'">' +
    '<div class="flex items-center justify-between mb-1">' +
      '<label class="text-sm font-semibold text-accent">\u8FD4\u4FE1 '+n+'</label>' +
      (n > 1 ? '<button class="btn btn-danger btn-sm" type="button" onclick="removeReplyItem(this)"><i class="fas fa-times"></i></button>' : '') +
    '</div>' +
    '<textarea class="inp th-reply" placeholder="\u8FD4\u4FE1'+n+'\u306E\u672C\u6587\u3092\u5165\u529B" maxlength="280"></textarea>' +
    '<div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-top:.4rem">' +
      '<button type="button" class="btn btn-ghost btn-sm" onclick="thAttachAny(this,\\'image\\')"><i class="fas fa-image"></i>\u753B\u50CF</button>' +
      '<button type="button" class="btn btn-ghost btn-sm" onclick="thAttachAny(this,\\'video\\')"><i class="fas fa-film"></i>\u52D5\u753B</button>' +
    '</div>' +
    '<div class="th-media-list" style="display:flex;flex-wrap:wrap;margin-top:.3rem"></div>' +
  '</div>';
}
function addReply() {
  const list = document.getElementById('th-replies');
  if (list.children.length >= 20) { toast('\u8FD4\u4FE1\u306F\u6700\u592720\u4EF6\u307E\u3067\u3067\u3059','err'); return; }
  const n = list.children.length + 1;
  list.insertAdjacentHTML('beforeend', renderReplyItemJs(n));
}
window.addReply = addReply;
function removeReplyItem(btn){
  const item = btn.closest('.reply-item');
  if (item) item.remove();
  renumber();
}
window.removeReplyItem = removeReplyItem;
function renumber() {
  [...document.getElementById('th-replies').children].forEach((el, i) => {
    const lbl = el.querySelector('label'); if (lbl) lbl.textContent = '\u8FD4\u4FE1 ' + (i+1);
    el.dataset.idx = i+1;
  });
}
function loadRecent() {
  const sel = document.getElementById('th-target-pick');
  if (sel) sel.innerHTML = '<option value="">\u8AAD\u8FBC\u4E2D...</option>';
  fetch('/api/admin/thread/recent-posts').then(r => r.json()).then(j => {
    const items = (j.posts || []).filter(x => x.external_post_id).slice(0, 30);
    if (!sel) return;
    if (!items.length) {
      sel.innerHTML = '<option value="">\u2014 \u6295\u7A3F\u6E08\u307F\u306E\u8A18\u4E8B\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093 \u2014</option>';
      sel.style.display = '';
      toast('\u6295\u7A3F\u6E08\u307F\u8A18\u4E8B\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093','err');
      return;
    }
    sel.innerHTML = '<option value="">\u2014 \u76F4\u8FD1\u306E\u6295\u7A3F\u304B\u3089\u9078\u629E ('+items.length+'\u4EF6) \u2014</option>' +
      items.map(it => {
        const id = it.external_post_id;
        const acct = it.x_username || it.joined_account_name || '';
        const txt = (it.content || '').slice(0, 40).replace(/\\n/g,' ').replace(/</g,'&lt;');
        const dt = (it.posted_at || it.created_at || '').slice(5, 16);
        return '<option value="' + id + '">[' + dt + '] @' + acct + ': ' + txt + '...</option>';
      }).join('');
    sel.style.display = '';
    toast('\u76F4\u8FD1 ' + items.length + ' \u4EF6\u3092\u53D6\u5F97\u3057\u307E\u3057\u305F','ok');
  }).catch(e => {
    if (sel) sel.innerHTML = '<option value="">\u2014 \u53D6\u5F97\u5931\u6557 \u2014</option>';
    toast('\u53D6\u5F97\u5931\u6557: ' + e.message, 'err');
  });
}
window.loadRecent = loadRecent;
window.onPickTarget = function(id) {
  document.getElementById('th-target-id').value = id || '';
  updateTarget();
};

// \u8FD4\u4FE1\u30A2\u30A4\u30C6\u30E0\u3054\u3068\u306E\u6DFB\u4ED8\u30E1\u30C7\u30A3\u30A2
function thRenderItemMedia(item){
  const arr = item._media || [];
  const list = item.querySelector('.th-media-list');
  if (!list) return;
  list.innerHTML = arr.map(m =>
    '<div style="display:inline-flex;align-items:center;gap:.25rem;background:#F3F4F6;border-radius:.25rem;padding:.15rem .4rem;font-size:.7rem;margin:.1rem">'+
      '<i class="fas '+(m.type==='video'?'fa-film':'fa-image')+'"></i>'+
      '<span style="max-width:9rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="'+(m.name||'').replace(/"/g,'&quot;')+'">'+(m.name||'media')+'</span>'+
      '<button type="button" data-mid="'+m.id+'" onclick="thRemoveItemMedia(this)" style="background:none;border:none;cursor:pointer;color:#dc2626"><i class="fas fa-xmark"></i></button>'+
    '</div>'
  ).join('');
}
window.thRemoveItemMedia = function(btn){
  const item = btn.closest('.reply-item');
  const mid = parseInt(btn.dataset.mid, 10);
  item._media = (item._media||[]).filter(m => m.id !== mid);
  thRenderItemMedia(item);
};
window.thAttachUrl = async function(btn, kind){
  const item = btn.closest('.reply-item');
  item._media = item._media || [];
  if (item._media.length >= 4) { toast('1\u8FD4\u4FE1\u3042\u305F\u308A\u6700\u59274\u4EF6','err'); return; }
  const u = prompt(kind==='image'?'\u753B\u50CF\u306EURL\u3092\u5165\u529B':'\u52D5\u753B\u306EURL\u3092\u5165\u529B'); if (!u) return;
  const r = await fetch('/api/admin/media/url',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({url:u, file_type:kind})});
  const j = await r.json();
  if(!j.success){ toast('\u767B\u9332\u5931\u6557: '+(j.error||''),'err'); return; }
  item._media.push({id:j.id, type:kind, name:u.split('/').pop()||'remote'});
  thRenderItemMedia(item);
};
window.thAttachAny = async function(btn, kind){
  const item = btn.closest('.reply-item');
  item._media = item._media || [];
  if (item._media.length >= 4) { toast('1\u8FD4\u4FE1\u3042\u305F\u308A\u6700\u59274\u4EF6','err'); return; }
  // \u30D5\u30A9\u30EB\u30C0\u3092\u76F4\u63A5\u958B\u304F\uFF08\u30D5\u30A1\u30A4\u30EB\u30D4\u30C3\u30AB\u30FC\uFF09
  const inp = document.createElement('input'); inp.type='file'; inp.accept = kind==='image'?'image/*':'video/*';
  inp.onchange = async () => {
    const f = inp.files && inp.files[0]; if(!f) return;
    const fd = new FormData(); fd.append('file', f);
    toast('\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u4E2D...','info');
    try {
      const r = await fetch('/api/admin/media',{method:'POST', body: fd});
      const j = await r.json();
      if(!j.success){ toast('\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u5931\u6557: '+(j.error||''),'err'); return; }
      item._media.push({id:j.id, type:kind, name:f.name});
      thRenderItemMedia(item);
      toast(kind==='image'?'\u753B\u50CF\u3092\u6DFB\u4ED8\u3057\u307E\u3057\u305F':'\u52D5\u753B\u3092\u6DFB\u4ED8\u3057\u307E\u3057\u305F','ok');
    } catch(e) { toast('\u30A8\u30E9\u30FC: '+e.message,'err'); }
  };
  inp.click();
};
window.thAttachFile = async function(btn, kind){
  const item = btn.closest('.reply-item');
  item._media = item._media || [];
  if (item._media.length >= 4) { toast('1\u8FD4\u4FE1\u3042\u305F\u308A\u6700\u59274\u4EF6','err'); return; }
  const inp = document.createElement('input'); inp.type='file'; inp.accept = kind==='image'?'image/*':'video/*';
  inp.onchange = async () => {
    const f = inp.files && inp.files[0]; if(!f) return;
    const fd = new FormData(); fd.append('file', f);
    toast('\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u4E2D...','info');
    const r = await fetch('/api/admin/media',{method:'POST', body: fd});
    const j = await r.json();
    if(!j.success){ toast('\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u5931\u6557: '+(j.error||''),'err'); return; }
    item._media.push({id:j.id, type:kind, name:f.name});
    thRenderItemMedia(item);
  };
  inp.click();
};

function saveDraft() { toast('\u4E0B\u66F8\u304D\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F\uFF08\u7C21\u6613\uFF09','info'); }
window.saveDraft = saveDraft;
function previewThread() {
  const d = collect(); if (!d) return;
  const total = d.tweets.reduce((a,t)=>a+(t.media_ids||[]).length,0);

  // \u65E2\u5B58\u306E\u30D7\u30EC\u30D3\u30E5\u30FC\u8981\u7D20\u3092\u524A\u9664
  const old = document.getElementById('th-preview-modal');
  if (old) old.remove();

  const modal = document.createElement('div');
  modal.id = 'th-preview-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:90;background:rgba(0,0,0,.55);display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:1rem';

  const safeId = (d.target_tweet_id || '').replace(/[^0-9a-zA-Z]/g, '');
  let html = '<div style="background:#fff;border-radius:.75rem;max-width:42rem;width:100%;padding:1.5rem;margin:2rem auto;position:relative">';
  html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem">';
  html += '<h3 style="font-size:1.1rem;font-weight:700"><i class="fas fa-eye"></i> \u30C4\u30EA\u30FC\u6295\u7A3F\u30D7\u30EC\u30D3\u30E5\u30FC</h3>';
  html += '<button onclick="document.getElementById(\\'th-preview-modal\\').remove()" type="button" style="background:none;border:none;cursor:pointer;color:#6B7280;font-size:1.25rem"><i class="fas fa-xmark"></i></button>';
  html += '</div>';
  html += '<div style="font-size:.8rem;color:#6B7280;margin-bottom:.75rem">\u30B3\u30E1\u30F3\u30C8\u5148 ID: <code style="background:#F3F4F6;padding:.1rem .35rem;border-radius:.25rem">' + safeId + '</code> / \u8FD4\u4FE1 ' + d.tweets.length + ' \u4EF6 / \u6DFB\u4ED8 ' + total + ' \u4EF6</div>';

  d.tweets.forEach((t, i) => {
    html += '<div style="position:relative;padding:.85rem 1rem;border:1px solid #E5E7EB;border-radius:.5rem;margin-bottom:.6rem;background:#F9FAFB">';
    html += '<div style="font-size:.7rem;color:#2563EB;font-weight:700;margin-bottom:.35rem">\u8FD4\u4FE1 ' + (i+1) + '</div>';
    const txt = (t.body || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\\n/g,'<br>');
    html += '<div style="font-size:.92rem;line-height:1.55;color:#1F2937;white-space:pre-line">' + txt + '</div>';
    html += '<div style="font-size:.7rem;color:#9CA3AF;margin-top:.4rem">' + (t.body||'').length + ' \u6587\u5B57' + ((t.media_ids||[]).length > 0 ? ' / \u30E1\u30C7\u30A3\u30A2 ' + t.media_ids.length + ' \u4EF6\u6DFB\u4ED8' : '') + '</div>';
    html += '</div>';
    if (i < d.tweets.length - 1) {
      html += '<div style="text-align:center;color:#9CA3AF;margin:-.2rem 0 .2rem"><i class="fas fa-arrow-down"></i></div>';
    }
  });

  html += '<div style="display:flex;justify-content:flex-end;margin-top:1rem;padding-top:.75rem;border-top:1px solid #E5E7EB">';
  html += '<button type="button" onclick="document.getElementById(\\'th-preview-modal\\').remove()" class="btn btn-primary">\u9589\u3058\u308B</button>';
  html += '</div>';
  html += '</div>';

  modal.innerHTML = html;
  document.body.appendChild(modal);
}
window.previewThread = previewThread;

function updateTarget() {
  const v = document.getElementById('th-target-id').value.trim();
  const el = document.getElementById('th-target-info');
  if (!v) el.innerHTML = '<div class="text-xs text-red-600"><i class="fas fa-triangle-exclamation"></i> \u30B3\u30E1\u30F3\u30C8\u5148\u304C\u672A\u9078\u629E\u3067\u3059</div>';
  else el.innerHTML = '<div class="text-xs text-emerald-700"><i class="fas fa-check"></i> \u30B3\u30E1\u30F3\u30C8\u5148: <span class="font-mono">' + escapeHtml(v) + '</span></div>';
}
window.updateTarget = updateTarget;

function collect() {
  const tid = document.getElementById('th-target-id').value.trim();
  if (!tid) { toast('\u30B3\u30E1\u30F3\u30C8\u5148\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044','err'); return null; }
  const items = [...document.querySelectorAll('#th-replies .reply-item')];
  const tweets = items.map(it => {
    const ta = it.querySelector('.th-reply');
    const body = (ta ? ta.value : '').trim();
    const media_ids = (it._media || []).map(m => m.id);
    return { body, media_ids };
  }).filter(t => t.body.length > 0);
  if (!tweets.length) { toast('\u8FD4\u4FE1\u672C\u6587\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044','err'); return null; }
  if (tweets.length > 20) { toast('\u8FD4\u4FE1\u306F\u6700\u592720\u4EF6\u307E\u3067\u3067\u3059','err'); return null; }
  return { target_tweet_id: tid, tweets };
}

async function submitNow() {
  const d = collect(); if (!d) return;
  if (!confirm(d.tweets.length+'\u4EF6\u306E\u30C4\u30EA\u30FC\u6295\u7A3F\u3092\u5B9F\u884C\u3057\u307E\u3059\u304B\uFF1F')) return;
  toast('\u9001\u4FE1\u4E2D...','info');
  try {
    const r = await fetch('/api/admin/thread/post-now',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(d)});
    const j = await r.json();
    if (j.success) { toast('\u9001\u4FE1\u5B8C\u4E86('+(j.posted||d.tweets.length)+'\u4EF6)','ok'); setTimeout(()=>location.reload(),1500); }
    else toast('\u9001\u4FE1\u5931\u6557: '+(j.error||''),'err');
  } catch(e) { toast('\u30A8\u30E9\u30FC: '+e.message,'err'); }
}
window.submitNow = submitNow;

async function submitSchedule() {
  const d = collect(); if (!d) return;
  // \u65E2\u5B58\u306E\u30E2\u30FC\u30C0\u30EB\u3092\u524A\u9664
  const old = document.getElementById('th-sched-modal');
  if (old) old.remove();
  // 1\u6642\u9593\u5F8C\u3092JST\u56FA\u5B9A\u3067\u30C7\u30D5\u30A9\u30EB\u30C8\u5024\u306B
  const def = jstNowDatetimeLocal(60);
  const modal = document.createElement('div');
  modal.id = 'th-sched-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:90;background:rgba(0,0,0,.55);display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:1rem';
  modal.innerHTML =
    '<div style="background:#fff;border-radius:.75rem;max-width:28rem;width:100%;padding:1.5rem;margin:5rem auto;position:relative">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem">' +
        '<h3 style="font-size:1.05rem;font-weight:700"><i class="fas fa-calendar-plus"></i> \u30C4\u30EA\u30FC\u6295\u7A3F\u306E\u4E88\u7D04\u65E5\u6642</h3>' +
        '<button onclick="document.getElementById(\\'th-sched-modal\\').remove()" type="button" style="background:none;border:none;cursor:pointer;color:#6B7280;font-size:1.25rem"><i class="fas fa-xmark"></i></button>' +
      '</div>' +
      '<div style="font-size:.82rem;color:#6B7280;margin-bottom:.75rem">' + d.tweets.length + '\u4EF6\u306E\u8FD4\u4FE1\u3092\u4E88\u7D04\u3057\u307E\u3059</div>' +
      '<div style="margin-bottom:1rem">' +
        '<label class="field-label">\u4E88\u7D04\u65E5\u6642 <span style="color:#dc2626">*</span></label>' +
        '<input type="datetime-local" id="th-sched-when" class="inp" value="' + def + '">' +
      '</div>' +
      '<div style="display:flex;gap:.5rem;justify-content:flex-end">' +
        '<button type="button" class="btn btn-ghost" onclick="document.getElementById(\\'th-sched-modal\\').remove()">\u30AD\u30E3\u30F3\u30BB\u30EB</button>' +
        '<button type="button" class="btn btn-primary" onclick="confirmThSchedule()"><i class="fas fa-check"></i>\u4E88\u7D04\u767B\u9332</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(modal);
  // \u4E88\u7D04\u30C7\u30FC\u30BF\u3092\u4E00\u6642\u4FDD\u5B58
  window.__pendingThSchedData = d;
}
window.submitSchedule = submitSchedule;
window.confirmThSchedule = async function() {
  const dt = document.getElementById('th-sched-when').value;
  if (!dt) { toast('\u4E88\u7D04\u65E5\u6642\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044','err'); return; }
  const d = window.__pendingThSchedData;
  if (!d) { toast('\u4E88\u7D04\u30C7\u30FC\u30BF\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093','err'); return; }
  d.scheduled_at = datetimeLocalToJst(dt);
  try {
    const r = await fetch('/api/admin/thread/schedule',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(d)});
    const j = await r.json();
    if (j.success) {
      toast('\u4E88\u7D04\u3057\u307E\u3057\u305F ('+d.scheduled_at+')','ok');
      const m = document.getElementById('th-sched-modal'); if (m) m.remove();
      setTimeout(()=>location.reload(),1200);
    } else toast('\u4E88\u7D04\u5931\u6557: '+(j.error||''),'err');
  } catch(e) { toast('\u30A8\u30E9\u30FC: '+e.message,'err'); }
};

function escapeHtml(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]); }
<\/script>`;
}
__name(un, "un");
function pn(e) {
  return `
    <div class="reply-item" data-idx="${e}">
      <div class="flex items-center justify-between mb-1">
        <label class="text-sm font-semibold text-accent">\u8FD4\u4FE1 ${e}</label>
        ${e > 1 ? `<button class="btn btn-danger btn-sm" onclick="removeReplyItem(this)" type="button"><i class="fas fa-times"></i></button>` : ""}
      </div>
      <textarea class="inp th-reply" placeholder="\u8FD4\u4FE1${e}\u306E\u672C\u6587\u3092\u5165\u529B" maxlength="280"></textarea>
      <div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-top:.4rem">
        <button type="button" class="btn btn-ghost btn-sm" onclick="thAttachAny(this,'image')"><i class="fas fa-image"></i>\u753B\u50CF</button>
        <button type="button" class="btn btn-ghost btn-sm" onclick="thAttachAny(this,'video')"><i class="fas fa-film"></i>\u52D5\u753B</button>
      </div>
      <div class="th-media-list" style="display:flex;flex-wrap:wrap;margin-top:.3rem"></div>
    </div>`;
}
__name(pn, "pn");
function mn(e) {
  return `
<div class="space-y-4">
  <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.5rem">
    <div>
      <h1 class="section-title"><i class="fas fa-calendar"></i>\u4E88\u7D04\u72B6\u6CC1</h1>
      <p class="section-desc">\u4E88\u7D04\u6E08\u307F\u6295\u7A3F\u30FB\u30AA\u30FC\u30C8\u30D1\u30A4\u30ED\u30C3\u30C8\u30B8\u30E7\u30D6\u306E\u78BA\u8A8D</p>
    </div>
    <div style="display:flex;gap:.5rem">
      <button id="btn-cal" class="btn btn-primary btn-sm" onclick="setView('cal')"><i class="fas fa-calendar"></i>\u30AB\u30EC\u30F3\u30C0\u30FC</button>
      <button id="btn-list" class="btn btn-ghost btn-sm" onclick="setView('list')"><i class="fas fa-list"></i>\u4E00\u89A7</button>
    </div>
  </div>
  

  <div id="sc-cal-view">
    <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1rem;flex-wrap:wrap">
      <button class="btn btn-ghost btn-sm" onclick="prevMonth()"><i class="fas fa-chevron-left"></i></button>
      <span id="sc-month-label" style="font-size:1rem;font-weight:700;min-width:7rem;text-align:center"></span>
      <button class="btn btn-ghost btn-sm" onclick="nextMonth()"><i class="fas fa-chevron-right"></i></button>
      <button class="btn btn-subtle btn-sm" onclick="goToday()">\u4ECA\u65E5</button>
      <span id="sc-status" style="font-size:.75rem;color:var(--ink-muted)"></span>
    </div>
    <div style="background:#fff;border:1px solid var(--line);border-radius:.75rem;overflow:hidden">
      <div style="display:grid;grid-template-columns:repeat(7,1fr);background:var(--paper-soft);border-bottom:1px solid var(--line)">
        ${["\u65E5", "\u6708", "\u706B", "\u6C34", "\u6728", "\u91D1", "\u571F"].map((s, a) => `
          <div style="padding:.5rem;text-align:center;font-size:.75rem;font-weight:600;color:${a === 0 ? "#ef4444" : a === 6 ? "#2563EB" : "var(--ink-muted)"}">${s}</div>
        `).join("")}
      </div>
      <div id="sc-cal-grid" style="display:grid;grid-template-columns:repeat(7,1fr)"><div style="grid-column:1 / span 7;padding:2rem;text-align:center;color:var(--ink-muted);font-size:.85rem"><i class="fas fa-spinner fa-spin"></i> \u8AAD\u307F\u8FBC\u307F\u4E2D...</div></div>
    </div>
    <div id="sc-empty-cal" style="display:none;padding:1rem;text-align:center;color:var(--ink-muted);font-size:.85rem">\u4E88\u7D04\u6295\u7A3F\u306F\u3042\u308A\u307E\u305B\u3093</div>
  </div>

  <div id="sc-list-view" style="display:none">
    <div class="card" style="padding:0">
      <table class="data" style="width:100%">
        <thead><tr><th>\u4E88\u7D04\u65E5\u6642</th><th>\u7A2E\u5225</th><th>\u30A2\u30AB\u30A6\u30F3\u30C8</th><th>\u672C\u6587</th><th>\u72B6\u614B</th><th></th></tr></thead>
        <tbody id="sc-list-body">
          <tr><td colspan="6" style="text-align:center;color:var(--ink-muted);padding:2.5rem"><i class="fas fa-spinner fa-spin"></i> \u8AAD\u307F\u8FBC\u307F\u4E2D...</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- \u65E5\u4ED8\u30AF\u30EA\u30C3\u30AF\u30E2\u30FC\u30C0\u30EB -->
<div id="sc-modal" style="display:none;position:fixed;inset:0;z-index:80;background:rgba(0,0,0,.4);align-items:center;justify-content:center;padding:1rem">
  <div style="background:#fff;border-radius:.75rem;max-width:42rem;width:100%;max-height:90vh;overflow:auto;padding:1.25rem;position:relative">
    <button onclick="scCloseModal()" style="position:absolute;top:.75rem;right:.75rem;background:none;border:none;font-size:1.25rem;cursor:pointer;color:#6B7280"><i class="fas fa-xmark"></i></button>
    <h3 id="sc-modal-title" style="font-size:1rem;font-weight:700;margin-bottom:1rem"></h3>
    <div id="sc-modal-body"></div>
  </div>
</div>

<script>
(function(){
  let SCHEDULED = [];
  let curYear, curMonth, scLoaded = false;
  const now = new Date();
  curYear = now.getFullYear();
  curMonth = now.getMonth();

  function setView(v) {
    document.getElementById('sc-cal-view').style.display = v==='cal'?'block':'none';
    document.getElementById('sc-list-view').style.display = v==='list'?'block':'none';
    document.getElementById('btn-cal').className = v==='cal'?'btn btn-primary btn-sm':'btn btn-ghost btn-sm';
    document.getElementById('btn-list').className = v==='list'?'btn btn-primary btn-sm':'btn btn-ghost btn-sm';
  }
  window.setView = setView;

  async function loadSchedule() {
    const stEl = document.getElementById('sc-status');
    if (stEl) stEl.textContent = '\u8AAD\u307F\u8FBC\u307F\u4E2D...';
    try {
      const r = await fetch('/api/admin/posts-scheduled');
      if (!r.ok) throw new Error('HTTP '+r.status);
      const j = await r.json();
      SCHEDULED = j.posts || [];
      scLoaded = true;
      if (stEl) stEl.textContent = '';
      buildCalendar();
      buildList();
    } catch(e) {
      if (stEl) { stEl.textContent = '\u4E88\u7D04\u72B6\u6CC1\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F'; stEl.style.color='#dc2626'; }
      const grid = document.getElementById('sc-cal-grid');
      if (grid) grid.innerHTML = '<div style="grid-column:1 / span 7;padding:2rem;text-align:center;color:#dc2626;font-size:.85rem">\u4E88\u7D04\u72B6\u6CC1\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F</div>';
      const lb = document.getElementById('sc-list-body');
      if (lb) lb.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#dc2626;padding:2.5rem">\u4E88\u7D04\u72B6\u6CC1\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F</td></tr>';
    }
  }
  window.reloadSchedule = loadSchedule;

  function statusBadge(s) {
    const map = {posted:['\u6295\u7A3F\u6E08','#065F46','#ECFDF5'],failed:['\u5931\u6557','#991B1B','#FEF2F2'],pending:['\u4E0B\u66F8\u304D','#6B7280','#F3F4F6'],approved:['\u4E88\u7D04\u6E08','#1D4ED8','#EFF6FF'],scheduled:['\u4E88\u7D04\u6E08','#1D4ED8','#EFF6FF'],draft:['\u4E0B\u66F8\u304D','#6B7280','#F3F4F6'],cancelled:['\u53D6\u6D88','#6B7280','#F3F4F6'],canceled:['\u53D6\u6D88','#6B7280','#F3F4F6'],publishing:['\u6295\u7A3F\u4E2D','#92400E','#FFFBEB'],configured:['\u4E88\u7D04\u6E08','#1D4ED8','#EFF6FF']};
    const m = map[s] || [s||'-','#6B7280','#F3F4F6'];
    return '<span style="display:inline-block;padding:.1rem .5rem;font-size:.7rem;border-radius:.25rem;color:'+m[1]+';background:'+m[2]+';font-weight:600">'+m[0]+'</span>';
  }

  function srcLabel(s) {
    if (s==='autopilot') return '<span style="font-size:.65rem;background:#FEF3C7;color:#92400E;padding:.1rem .35rem;border-radius:.25rem;font-weight:600">AP</span>';
    if (s==='pattern_generated_post'||s==='pattern_ai') return '<span style="font-size:.65rem;background:#EDE9FE;color:#6D28D9;padding:.1rem .35rem;border-radius:.25rem;font-weight:600">\u30D1\u30BF\u30FC\u30F3</span>';
    return '';
  }

  function buildCalendar() {
    const lbl = document.getElementById('sc-month-label');
    if (lbl) lbl.textContent = curYear + '\u5E74 ' + (curMonth+1) + '\u6708';
    const grid = document.getElementById('sc-cal-grid');
    if (!grid) return;
    const first = new Date(curYear, curMonth, 1);
    const lastDay = new Date(curYear, curMonth+1, 0).getDate();
    const startDow = first.getDay();
    const today = new Date();
    const todayStr = today.getFullYear()+'-'+String(today.getMonth()+1).padStart(2,'0')+'-'+String(today.getDate()).padStart(2,'0');

    const byDate = {};
    SCHEDULED.forEach(p => {
      const d = (p.scheduled_at||'').slice(0,10);
      if (!d) return;
      if (!byDate[d]) byDate[d] = [];
      byDate[d].push(p);
    });

    const monthHasAny = Object.keys(byDate).some(k => k.startsWith(curYear+'-'+String(curMonth+1).padStart(2,'0')));
    const emptyEl = document.getElementById('sc-empty-cal');
    if (emptyEl) emptyEl.style.display = (scLoaded && !monthHasAny) ? 'block':'none';

    let html = '';
    let day = 1 - startDow;
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        const isCurrentMonth = day >= 1 && day <= lastDay;
        const dateStr = isCurrentMonth ? curYear+'-'+String(curMonth+1).padStart(2,'0')+'-'+String(day).padStart(2,'0') : '';
        const isToday = dateStr === todayStr;
        const posts = byDate[dateStr] || [];
        const textColor = col===0?'#ef4444':col===6?'#2563EB':'var(--ink)';
        const cursor = isCurrentMonth ? 'cursor:pointer;' : '';
        const click = isCurrentMonth ? ' onclick="scOpenDay(\\''+dateStr+'\\')"' : '';
        html += '<div'+click+' style="position:relative;min-height:7rem;border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:.375rem;background:' + (isToday?'#EFF6FF':'#fff') + ';' + cursor + '">';
        if (isCurrentMonth) {
          html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.25rem">';
          html += '<span style="font-size:.8rem;font-weight:'+(isToday?'700':'400')+';color:'+textColor+'">' + day + '</span>';
          html += '<button type="button" onclick="event.stopPropagation();scNewAP(\\''+dateStr+'\\')" title="\u3053\u306E\u65E5\u306B\u30AA\u30FC\u30C8\u30D1\u30A4\u30ED\u30C3\u30C8\u65B0\u898F\u4F5C\u6210" style="background:#F3F4F6;border:1px solid var(--line);border-radius:.25rem;padding:0 .35rem;font-size:.7rem;color:#6B7280;cursor:pointer;line-height:1.2"><i class="fas fa-plus"></i></button>';
          html += '</div>';
          if (posts.length > 0) html += '<div style="margin-bottom:2px"><span style="font-size:.65rem;background:#1D4ED8;color:#fff;border-radius:.75rem;padding:0 .4rem;font-weight:600">'+posts.length+'\u4EF6</span></div>';
          // \u7E265\xD7\u6A2A4=20\u4EF6\u307E\u3067\u8868\u793A\u3002\u30B0\u30EA\u30C3\u30C92\u5217\u3067\u5BC6\u5EA6\u3092\u9AD8\u3081\u308B
          html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1px">';
          posts.slice(0,10).forEach(p => {
            const color = p.status==='posted'?'#065F46':p.status==='failed'?'#991B1B':'#1D4ED8';
            const bg = p.status==='posted'?'#ECFDF5':p.status==='failed'?'#FEF2F2':p.source_type==='autopilot'?'#FEF3C7':'#EFF6FF';
            const label = p.source_type==='autopilot' ? '[AP]' : '';
            const timeStr = (p.scheduled_at||'').slice(11,16) || '--:--';
            html += '<div style="background:'+bg+';color:'+color+';font-size:.6rem;padding:1px 3px;border-radius:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height:1.2" title="'+timeStr+' '+((p.body||'').replace(/"/g,"&quot;")).slice(0,80)+'">' + '<span style="font-weight:700;font-family:monospace">' + timeStr + '</span> ' + label + '</div>';
          });
          html += '</div>';
          if (posts.length > 10) html += '<div style="font-size:.65rem;color:var(--ink-muted)">+' + (posts.length-10) + '\u4EF6</div>';
        }
        html += '</div>';
        day++;
      }
      if (day > lastDay && row >= 3) break;
    }
    grid.innerHTML = html;
  }

  function buildList() {
    const tb = document.getElementById('sc-list-body');
    if (!tb) return;
    if (SCHEDULED.length === 0) {
      tb.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--ink-muted);padding:2.5rem">\u4E88\u7D04\u6295\u7A3F\u306F\u3042\u308A\u307E\u305B\u3093</td></tr>';
      return;
    }
    tb.innerHTML = SCHEDULED.map(p => {
      const isAP = p.source_type==='autopilot' || (typeof p.id==='string' && p.id.indexOf('ap-')===0);
      return '<tr>' +
        '<td style="font-size:.75rem;font-family:monospace">'+(p.scheduled_at||'-')+'</td>' +
        '<td style="font-size:.7rem">'+(isAP?'<span style="background:#FEF3C7;color:#92400E;padding:.1rem .35rem;border-radius:.25rem;font-weight:600">AP</span>':'<span style="background:#EFF6FF;color:#1D4ED8;padding:.1rem .35rem;border-radius:.25rem;font-weight:600">\u4E88\u7D04</span>')+'</td>' +
        '<td style="font-size:.75rem">@'+(p.x_username||p.account_name||'-')+'</td>' +
        '<td style="font-size:.75rem;max-width:18rem"><div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+(p.body||'').slice(0,80).replace(/</g,'&lt;')+'</div></td>' +
        '<td>'+statusBadge(p.status)+'</td>' +
        '<td style="white-space:nowrap">' +
          (isAP ? '' : '<button class="btn btn-ghost btn-sm" onclick="scEditPost(\\''+p.id+'\\')"><i class="fas fa-pen"></i></button>') +
          '<button class="btn btn-danger btn-sm" onclick="scDeletePost(\\''+p.id+'\\')"><i class="fas fa-trash"></i></button>' +
        '</td>' +
      '</tr>';
    }).join('');
  }

  window.prevMonth = function() { curMonth--; if(curMonth<0){curMonth=11;curYear--;} buildCalendar(); };
  window.nextMonth = function() { curMonth++; if(curMonth>11){curMonth=0;curYear++;} buildCalendar(); };
  window.goToday = function() { const n=new Date(); curYear=n.getFullYear(); curMonth=n.getMonth(); buildCalendar(); };

  window.scOpenDay = function(dateStr) {
    const posts = SCHEDULED.filter(p => (p.scheduled_at||'').slice(0,10) === dateStr);
    document.getElementById('sc-modal-title').textContent = dateStr + ' \u306E\u4E88\u7D04 ('+posts.length+'\u4EF6)';
    const body = document.getElementById('sc-modal-body');
    if (posts.length === 0) {
      body.innerHTML = '<div style="text-align:center;padding:1.5rem;color:#6B7280">\u3053\u306E\u65E5\u306B\u4E88\u7D04\u306F\u3042\u308A\u307E\u305B\u3093</div>';
    } else {
      body.innerHTML = posts.map(p => {
        const isAP = p.source_type==='autopilot' || (typeof p.id==='string' && p.id.indexOf('ap-')===0);
        return '<div style="border:1px solid var(--line);border-radius:.5rem;padding:.75rem;margin-bottom:.5rem">' +
          '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:.5rem;margin-bottom:.5rem">' +
            '<div style="font-size:.75rem;font-family:monospace;color:#6B7280">'+(p.scheduled_at||'-')+' '+srcLabel(p.source_type)+'</div>' +
            '<div>'+statusBadge(p.status)+'</div>' +
          '</div>' +
          '<div style="font-size:.85rem;white-space:pre-wrap;color:#111827;margin-bottom:.5rem">'+(p.body||'').replace(/</g,'&lt;')+'</div>' +
          '<div style="font-size:.7rem;color:#6B7280;margin-bottom:.5rem">@'+(p.x_username||p.account_name||'-')+(isAP?' (\u30AA\u30FC\u30C8\u30D1\u30A4\u30ED\u30C3\u30C8)':'')+'</div>' +
          '<div style="display:flex;gap:.4rem;flex-wrap:wrap">' +
            (isAP ? '' : '<button class="btn btn-ghost btn-sm" onclick="scEditPost(\\''+p.id+'\\')"><i class="fas fa-pen"></i>\u7DE8\u96C6</button>') +
            '<button class="btn btn-danger btn-sm" onclick="scDeletePost(\\''+p.id+'\\')"><i class="fas fa-trash"></i>\u524A\u9664</button>' +
          '</div>' +
        '</div>';
      }).join('');
    }
    const m = document.getElementById('sc-modal');
    m.style.display = 'flex';
  };
  window.scCloseModal = function() { document.getElementById('sc-modal').style.display = 'none'; };

  window.scNewAP = function(dateStr) {
    // \u30AA\u30FC\u30C8\u30D1\u30A4\u30ED\u30C3\u30C8\u753B\u9762\u306B\u65E5\u4ED8\u30AF\u30A8\u30EA\u4ED8\u304D\u3067\u9077\u79FB
    location.href = '/dashboard/autopilot?date=' + encodeURIComponent(dateStr) + '&new=1';
  };

  window.scEditPost = function(pid) {
    const p = SCHEDULED.find(x => String(x.id) === String(pid));
    if (!p) return;
    if (typeof p.id==='string' && p.id.indexOf('ap-')===0) { toast('\u30AA\u30FC\u30C8\u30D1\u30A4\u30ED\u30C3\u30C8\u306F\u7DE8\u96C6\u4E0D\u53EF','info'); return; }
    const body = document.getElementById('sc-modal-body');
    body.innerHTML = '<div>' +
      '<label class="field-label">\u672C\u6587</label>' +
      '<textarea id="sc-edit-body" class="inp" style="min-height:6rem">'+(p.body||'').replace(/</g,'&lt;')+'</textarea>' +
      '<label class="field-label" style="margin-top:.75rem">\u4E88\u7D04\u65E5\u6642</label>' +
      '<input type="datetime-local" id="sc-edit-at" class="inp" value="'+(p.scheduled_at||'').replace(' ','T').slice(0,16)+'">' +
      '<div style="display:flex;gap:.5rem;margin-top:.75rem">' +
        '<button class="btn btn-primary" onclick="scSaveEdit('+p.id+')"><i class="fas fa-save"></i>\u4FDD\u5B58</button>' +
        '<button class="btn btn-ghost" onclick="scCloseModal()"><i class="fas fa-times"></i>\u9589\u3058\u308B</button>' +
      '</div>' +
    '</div>';
    document.getElementById('sc-modal-title').textContent = '\u4E88\u7D04 #'+p.id+' \u306E\u7DE8\u96C6';
    document.getElementById('sc-modal').style.display = 'flex';
  };

  window.scSaveEdit = async function(pid) {
    const newBody = document.getElementById('sc-edit-body').value;
    const newAt = document.getElementById('sc-edit-at').value;
    const at = newAt ? newAt.replace('T',' ') + ':00' : null;
    try {
      const r = await fetch('/api/admin/posts/'+pid, {
        method:'PUT', headers:{'content-type':'application/json'},
        body: JSON.stringify({body: newBody, scheduled_at: at, post_mode: 'body'})
      });
      const j = await r.json();
      if (j.success) { toast('\u4FDD\u5B58\u3057\u307E\u3057\u305F','ok'); scCloseModal(); loadSchedule(); }
      else toast('\u4FDD\u5B58\u5931\u6557: '+(j.error||''),'err');
    } catch(e) { toast('\u30A8\u30E9\u30FC: '+e.message,'err'); }
  };

  window.scDeletePost = async function(pid) {
    if (!confirm('\u3053\u306E\u4E88\u7D04\u3092\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F')) return;
    try {
      const isAP = typeof pid==='string' && pid.indexOf('ap-')===0;
      let url, opts;
      if (isAP) {
        const apid = pid.replace('ap-','');
        url = '/api/admin/autopilot/jobs/'+apid;
        opts = {method:'DELETE'};
      } else {
        url = '/api/admin/posts/'+pid+'/cancel';
        opts = {method:'POST'};
      }
      const r = await fetch(url, opts);
      const j = await r.json();
      if (j.success || j.ok) { toast('\u524A\u9664\u3057\u307E\u3057\u305F','ok'); scCloseModal(); loadSchedule(); }
      else toast('\u524A\u9664\u5931\u6557: '+(j.error||''),'err');
    } catch(e) { toast('\u30A8\u30E9\u30FC: '+e.message,'err'); }
  };

  window.cancelPost = function(id) { return scDeletePost(id); };

  document.addEventListener('DOMContentLoaded', loadSchedule);
  if (document.readyState !== 'loading') loadSchedule();
})();
<\/script>`;
}
__name(mn, "mn");
function _n(e) {
  return `
<div class="space-y-4">
  <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.5rem">
    <div>
      <h1 class="section-title"><i class="fas fa-plane-departure"></i>\u30AA\u30FC\u30C8\u30D1\u30A4\u30ED\u30C3\u30C8</h1>
      <p class="section-desc">\u30AB\u30EC\u30F3\u30C0\u30FC\u4E88\u7D04\u67A0\u306B\u5BFE\u3057\u3066\u3001\u751F\u6210\u65B9\u5F0F\u30FB\u5185\u5BB9\u30FB\u6295\u7A3F\u8A2D\u5B9A\u3092\u4E8B\u524D\u767B\u9332\u3067\u304D\u307E\u3059\u3002</p>
    </div>
    <button class="btn btn-primary" onclick="openApModal()"><i class="fas fa-plus"></i>\u65B0\u898F\u4F5C\u6210</button>
  </div>
  <div class="card">
    <h3 class="font-bold text-ink mb-3">\u4E88\u7D04\u4E00\u89A7</h3>
    <table class="data">
      <thead><tr><th>No</th><th>\u751F\u6210\u65E5\u6642</th><th>\u6295\u7A3F\u65E5\u6642</th><th>\u30A2\u30AB\u30A6\u30F3\u30C8</th><th>\u751F\u6210\u65B9\u5F0F</th><th>\u30C6\u30FC\u30DE</th><th>\u72B6\u614B</th><th></th></tr></thead>
      <tbody>
        ${e.jobs.length === 0 ? '<tr><td colspan="8" class="text-center text-ink-muted py-10">\u4E88\u7D04\u304C\u307E\u3060\u3042\u308A\u307E\u305B\u3093</td></tr>' : e.jobs.map((t, s) => `
            <tr>
              <td class="text-xs text-ink-faint">${t.reservation_no || String(s + 1).padStart(4, "0")}</td>
              <td class="text-xs">${t.generate_at || "\u2014"}</td>
              <td class="text-xs">${t.publish_at || "\u2014"}</td>
              <td class="text-xs">@${w(t.x_username || "-")}</td>
              <td><span class="pill pill-soft">${w(t.content_mode || "-")}</span></td>
              <td class="text-xs max-w-xs truncate">${w(t.theme || "\u2014")}${t.error_message ? `<div style="font-size:.7rem;color:#dc2626;margin-top:.2rem">\u26A0 ${w((t.error_message || "").slice(0, 80))}</div>` : ""}</td>
              <td>${(() => {
    const st2 = t.status || "";
    if (st2 === "posted") return '<span class="pill pill-ok">\u6295\u7A3F\u6E08</span>';
    if (st2 === "generated") return '<span class="pill pill-blue">\u4E88\u7D04\u4E2D</span>';
    if (st2 === "error" || st2 === "failed") return '<span class="pill pill-err">\u5931\u6557</span>';
    if (st2 === "draft") return '<span class="pill pill-soft">\u4E0B\u66F8\u4FDD\u5B58</span>';
    return '<span class="pill pill-blue">\u672A\u6295\u7A3F</span>';
  })()}</td>
              <td class="text-right">
                ${t.status !== "posted" ? `<button class="btn btn-primary btn-sm" onclick="retryApJob(${t.id})" title="\u518D\u6295\u7A3F\uFF08\u6295\u7A3F\u65E5\u6642\u3092\u518D\u8A2D\u5B9A\u3057\u3066\u5373\u6642\u5B9F\u884C\uFF09"><i class="fas fa-rotate-right"></i>\u518D\u6295\u7A3F</button>` : ""}
                <button class="btn btn-danger btn-sm" onclick="delApJob(${t.id})"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
          `).join("")}
      </tbody>
    </table>
  </div>

  <!-- \u30E2\u30FC\u30C0\u30EB -->
  <div id="ap-modal" style="display:none;position:fixed;inset:0;z-index:80;background:rgba(0,0,0,.5);overflow-y:auto;padding:1rem;align-items:flex-start;justify-content:center">
    <div style="background:#fff;border-radius:.75rem;max-width:42rem;width:100%;padding:1.5rem;margin:2rem auto;position:relative">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem">
        <h3 style="font-size:1.05rem;font-weight:700">\u30AA\u30FC\u30C8\u30D1\u30A4\u30ED\u30C3\u30C8\u65B0\u898F\u4F5C\u6210</h3>
        <button onclick="closeApModal()" type="button" style="background:none;border:none;cursor:pointer;color:#6B7280;font-size:1.25rem"><i class="fas fa-xmark"></i></button>
      </div>
      <div style="margin-bottom:.75rem">
        <button type="button" class="btn btn-ghost btn-sm" onclick="apLoadDraft()"><i class="fas fa-folder-open"></i>\u4E0B\u66F8\u304D\u304B\u3089\u518D\u958B</button>
      </div>
      <div class="space-y-3">
        <div>
          <label class="field-label">\u30A2\u30AB\u30A6\u30F3\u30C8</label>
          <select id="ap-account" class="inp">
            <option value="">\u2014</option>
            ${e.accounts.map((t) => `<option value="${t.id}">@${w(t.x_username || t.account_name)}</option>`).join("")}
          </select>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="field-label">\u751F\u6210\u65E5\u6642</label>
            <input type="datetime-local" id="ap-gen" class="inp">
          </div>
          <div>
            <label class="field-label">\u6295\u7A3F\u65E5\u6642</label>
            <input type="datetime-local" id="ap-pub" class="inp" onchange="deriveGenAt()">
          </div>
        </div>
        <div>
          <label class="field-label">\u751F\u6210\u65B9\u5F0F</label>
          <select id="ap-mode" class="inp">
            <option value="problem" selected>\u554F\u984C\u63D0\u8D77\u578B</option>
            <option value="before_after">\u30D3\u30D5\u30A9\u30FC\u30A2\u30D5\u30BF\u30FC\u578B</option>
            <option value="contrarian">\u9006\u5F35\u308A\u578B</option>
            <option value="howto">HowTo\u5B9F\u6F14\u578B</option>
            <option value="numbers">\u6570\u5B57\u30A4\u30F3\u30D1\u30AF\u30C8\u578B</option>
            <option value="freetext">\u81EA\u7531\u5165\u529B</option>
          </select>
        </div>
        <div>
          <label class="field-label">\u30C6\u30FC\u30DE <span style="color:#dc2626">*</span></label>
          <input type="text" id="ap-theme" class="inp" placeholder="\u4F8B: AI\u81EA\u52D5\u5316\u3067\u526F\u696D\u53CE\u76CA\u3092\u4F5C\u308B\u65B9\u6CD5">
        </div>
        <div>
          <label class="field-label">\u30AD\u30FC\u30EF\u30FC\u30C9</label>
          <input type="text" id="ap-kw" class="inp" placeholder="\u4F8B: AI, \u81EA\u52D5\u5316, \u526F\u696D">
        </div>
        <div style="border:1px solid var(--line);border-radius:.5rem;padding:.875rem;background:var(--paper-soft)">
          <div style="font-weight:600;color:var(--accent);margin-bottom:.625rem">\u6295\u7A3F\u30AA\u30D7\u30B7\u30E7\u30F3</div>
          <div class="space-y-2">
            <div>
              <label class="field-label">\u6295\u7A3F\u672B\u5C3E\u8FFD\u8A18</label>
              <input type="text" id="ap-footer" class="inp" placeholder="\u4F8B: \u8A73\u3057\u304F\u306F\u30D7\u30ED\u30D5\u30EA\u30F3\u30AF\u304B\u3089\u{1F447}">
            </div>
            <div>
              <label class="field-label">URL</label>
              <input type="url" id="ap-url" class="inp" placeholder="https://">
            </div>
            <div>
              <label class="field-label">\u672C\u6587\u30E2\u30FC\u30C9</label>
              <div style="display:flex;gap:1rem;margin-top:.25rem">
                <label style="display:flex;align-items:center;gap:.4rem;cursor:pointer"><input type="radio" name="ap-pm" value="body" checked><span style="font-size:.9rem">\u672C\u6587</span></label>
                <label style="display:flex;align-items:center;gap:.4rem;cursor:pointer"><input type="radio" name="ap-pm" value="140"><span style="font-size:.9rem">140\u6587\u5B57</span></label>
                <label style="display:flex;align-items:center;gap:.4rem;cursor:pointer"><input type="radio" name="ap-pm" value="simple"><span style="font-size:.9rem">\u30B7\u30F3\u30D7\u30EB</span></label>
              </div>
            </div>
          </div>
        </div>
        <div style="border:1px solid var(--line);border-radius:.5rem;padding:.875rem;background:var(--paper-soft)">
          <div style="font-weight:600;color:var(--accent);margin-bottom:.625rem"><i class="fas fa-photo-film"></i> \u30E1\u30C7\u30A3\u30A2\u6DFB\u4ED8\uFF08\u4EFB\u610F\u30FB\u6700\u59274\u4EF6\uFF09</div>
          <div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-bottom:.5rem">
            <button type="button" class="btn btn-ghost btn-sm" onclick="apAttachAny('image')"><i class="fas fa-image"></i>\u753B\u50CF</button>
            <button type="button" class="btn btn-ghost btn-sm" onclick="apAttachAny('video')"><i class="fas fa-film"></i>\u52D5\u753B</button>
          </div>
          <div id="ap-media-list" style="display:flex;flex-wrap:wrap"></div>
        </div>
        <div style="display:flex;gap:.5rem;padding-top:.5rem;justify-content:flex-end">
          <button type="button" class="btn btn-ghost" onclick="apSaveDraft()"><i class="fas fa-floppy-disk"></i>\u4E0B\u66F8\u304D\u4FDD\u5B58</button>
          <button type="button" class="btn btn-ghost" onclick="closeApModal()">\u30AD\u30E3\u30F3\u30BB\u30EB</button>
          <button type="button" class="btn btn-primary" onclick="submitApJob()"><i class="fas fa-check"></i>\u4F5C\u6210</button>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
function openApModal() {
  window.apMedia = window.apMedia || [];
  apRenderMedia();
  const m=document.getElementById('ap-modal');
  m.style.display='flex';
  m.style.alignItems='flex-start';
  m.style.justifyContent='center';
}
function closeApModal() { document.getElementById('ap-modal').style.display='none'; }
window.openApModal = openApModal;
window.closeApModal = closeApModal;
function deriveGenAt() {
  const pub = document.getElementById('ap-pub').value;
  if (!pub || document.getElementById('ap-gen').value) return;
  const d = new Date(pub); d.setMinutes(d.getMinutes() - 2);
  const pad = n => String(n).padStart(2,'0');
  document.getElementById('ap-gen').value = d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+'T'+pad(d.getHours())+':'+pad(d.getMinutes());
}
window.deriveGenAt = deriveGenAt;

window.apMedia = [];
function apRenderMedia(){
  const el=document.getElementById('ap-media-list'); if(!el) return;
  el.innerHTML = (window.apMedia||[]).map(m=>
    '<div style="display:inline-flex;align-items:center;gap:.25rem;background:#F3F4F6;border-radius:.25rem;padding:.15rem .4rem;font-size:.7rem;margin:.15rem">'+
      '<i class="fas '+(m.type==='video'?'fa-film':'fa-image')+'"></i>'+
      '<span style="max-width:9rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="'+(m.name||'').replace(/"/g,'&quot;')+'">'+(m.name||'media')+'</span>'+
      '<button type="button" onclick="apRemoveMedia('+m.id+')" style="background:none;border:none;cursor:pointer;color:#dc2626"><i class="fas fa-xmark"></i></button>'+
    '</div>'
  ).join('');
}
window.apRemoveMedia = function(mid){ window.apMedia = (window.apMedia||[]).filter(m=>m.id!==mid); apRenderMedia(); };

// \u753B\u50CF/\u52D5\u753B \u30DC\u30BF\u30F3: \u76F4\u63A5\u30D5\u30A1\u30A4\u30EB\u30D4\u30C3\u30AB\u30FC\u3092\u958B\u304F
window.apAttachAny = async function(kind){
  if((window.apMedia||[]).length>=4){ toast('\u6DFB\u4ED8\u306F\u6700\u59274\u4EF6\u307E\u3067','err'); return; }
  const inp = document.createElement('input'); inp.type='file'; inp.accept = kind==='image'?'image/*':'video/*';
  inp.onchange = async () => {
    const f = inp.files && inp.files[0]; if(!f) return;
    const fd = new FormData(); fd.append('file', f);
    toast('\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u4E2D...','info');
    const r = await fetch('/api/admin/media',{method:'POST', body: fd});
    const j = await r.json();
    if(!j.success){ toast('\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u5931\u6557: '+(j.error||''),'err'); return; }
    window.apMedia = window.apMedia || [];
    window.apMedia.push({id:j.id, type:kind, name:f.name});
    apRenderMedia();
    toast(kind==='image'?'\u753B\u50CF\u3092\u6DFB\u4ED8\u3057\u307E\u3057\u305F':'\u52D5\u753B\u3092\u6DFB\u4ED8\u3057\u307E\u3057\u305F','ok');
  };
  inp.click();
};

window.apSaveDraft = function(){
  const d = {
    account: document.getElementById('ap-account').value,
    gen: document.getElementById('ap-gen').value,
    pub: document.getElementById('ap-pub').value,
    mode: document.getElementById('ap-mode').value,
    theme: document.getElementById('ap-theme').value,
    kw: document.getElementById('ap-kw').value,
    footer: document.getElementById('ap-footer').value,
    url: document.getElementById('ap-url').value,
    pm: (document.querySelector('input[name="ap-pm"]:checked')||{}).value || 'body',
    media: window.apMedia || [],
  };
  try { sessionStorage.setItem('ap_draft', JSON.stringify(d)); toast('\u4E0B\u66F8\u304D\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F','ok'); }
  catch(e) { toast('\u4FDD\u5B58\u5931\u6557: '+e.message,'err'); }
};
window.apLoadDraft = function(){
  try {
    const raw = sessionStorage.getItem('ap_draft');
    if (!raw) { toast('\u4FDD\u5B58\u3055\u308C\u305F\u4E0B\u66F8\u304D\u304C\u3042\u308A\u307E\u305B\u3093','info'); return; }
    const d = JSON.parse(raw);
    if (d.account) document.getElementById('ap-account').value = d.account;
    if (d.gen) document.getElementById('ap-gen').value = d.gen;
    if (d.pub) document.getElementById('ap-pub').value = d.pub;
    if (d.mode) document.getElementById('ap-mode').value = d.mode;
    if (d.theme) document.getElementById('ap-theme').value = d.theme;
    if (d.kw) document.getElementById('ap-kw').value = d.kw;
    if (d.footer) document.getElementById('ap-footer').value = d.footer;
    if (d.url) document.getElementById('ap-url').value = d.url;
    if (d.pm) { const r=document.querySelector('input[name="ap-pm"][value="'+d.pm+'"]'); if(r)r.checked=true; }
    window.apMedia = Array.isArray(d.media) ? d.media : [];
    apRenderMedia();
    toast('\u4E0B\u66F8\u304D\u3092\u518D\u958B\u3057\u307E\u3057\u305F','ok');
  } catch(e) { toast('\u8AAD\u8FBC\u5931\u6557: '+e.message,'err'); }
};

async function submitApJob() {
  const body = {
    account_id: parseInt(document.getElementById('ap-account').value, 10) || null,
    generate_at: document.getElementById('ap-gen').value.replace('T',' '),
    publish_at: document.getElementById('ap-pub').value.replace('T',' '),
    content_mode: document.getElementById('ap-mode').value,
    theme: document.getElementById('ap-theme').value.trim(),
    keywords: document.getElementById('ap-kw').value,
    link_url: document.getElementById('ap-url').value,
    post_mode: (document.querySelector('input[name="ap-pm"]:checked')||{}).value || 'body',
    media_ids: (window.apMedia||[]).map(m=>m.id),
  };
  if (!body.theme) { toast('\u30C6\u30FC\u30DE\u3092\u5165\u529B','err'); return; }
  if (!body.publish_at) { toast('\u6295\u7A3F\u65E5\u6642\u3092\u5165\u529B','err'); return; }
  if (!body.account_id) { toast('\u30A2\u30AB\u30A6\u30F3\u30C8\u3092\u9078\u629E','err'); return; }
  try {
    const r = await fetch('/api/admin/autopilot/jobs', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(body) });
    const j = await r.json();
    if (j.success) { toast('\u4F5C\u6210\u3057\u307E\u3057\u305F','ok'); closeApModal(); setTimeout(()=>location.reload(), 600); }
    else toast('\u5931\u6557: '+(j.error||''),'err');
  } catch(e) { toast('\u30A8\u30E9\u30FC: '+e.message,'err'); }
}
window.submitApJob = submitApJob;
async function delApJob(id) {
  if (!confirm('\u524A\u9664\u3057\u307E\u3059\u304B?')) return;
  try {
    const r = await fetch('/api/admin/autopilot/jobs/' + id, { method:'DELETE' });
    const j = await r.json();
    if (j.success) location.reload();
    else toast('\u524A\u9664\u5931\u6557','err');
  } catch(e) { toast('\u30A8\u30E9\u30FC: '+e.message,'err'); }
}
window.delApJob = delApJob;
async function retryApJob(id) {
  // \u65E2\u5B58\u306E\u30E2\u30FC\u30C0\u30EB\u3092\u524A\u9664
  const old = document.getElementById('ap-retry-modal');
  if (old) old.remove();
  // \u518D\u6295\u7A3F\u306F\u300C\u4ECA\u3059\u3050\u300D\u3092\u521D\u671F\u5024\u306B\u3059\u308B
  const def = jstNowDatetimeLocal(0);
  const modal = document.createElement('div');
  modal.id = 'ap-retry-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:90;background:rgba(0,0,0,.55);display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:1rem';
  modal.innerHTML =
    '<div style="background:#fff;border-radius:.75rem;max-width:28rem;width:100%;padding:1.5rem;margin:5rem auto;position:relative">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem">' +
        '<h3 style="font-size:1.05rem;font-weight:700"><i class="fas fa-rotate-right"></i> \u518D\u6295\u7A3F \u2014 \u6295\u7A3F\u65E5\u6642</h3>' +
        '<button onclick="document.getElementById(\\'ap-retry-modal\\').remove()" type="button" style="background:none;border:none;cursor:pointer;color:#6B7280;font-size:1.25rem"><i class="fas fa-xmark"></i></button>' +
      '</div>' +
      '<div style="font-size:.82rem;color:#6B7280;margin-bottom:.75rem">\u30B8\u30E7\u30D6ID: <code style="background:#F3F4F6;padding:.1rem .35rem;border-radius:.25rem">' + id + '</code></div>' +
      '<div style="margin-bottom:1rem">' +
        '<label class="field-label">\u65B0\u3057\u3044\u6295\u7A3F\u65E5\u6642 <span style="color:#dc2626">*</span></label>' +
        '<input type="datetime-local" id="ap-retry-when" class="inp" value="' + def + '">' +
        '<div style="font-size:.7rem;color:#6B7280;margin-top:.3rem">\u6307\u5B9A\u6642\u523B\u306E2\u5206\u524D\u306BAI\u751F\u6210\u304C\u8D70\u308A\u3001\u305D\u306E\u5F8CX\u306B\u6295\u7A3F\u3055\u308C\u307E\u3059</div>' +
      '</div>' +
      '<div style="display:flex;gap:.5rem;justify-content:flex-end">' +
        '<button type="button" class="btn btn-ghost" onclick="document.getElementById(\\'ap-retry-modal\\').remove()">\u30AD\u30E3\u30F3\u30BB\u30EB</button>' +
        '<button type="button" class="btn btn-primary" onclick="confirmApRetry(' + id + ')"><i class="fas fa-check"></i>\u518D\u6295\u7A3F</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(modal);
}
window.retryApJob = retryApJob;
window.confirmApRetry = async function(id) {
  const dt = document.getElementById('ap-retry-when').value;
  if (!dt) { toast('\u6295\u7A3F\u65E5\u6642\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044','err'); return; }
  const publishAt = datetimeLocalToJst(dt);
  try {
    const r = await fetch('/api/admin/autopilot/jobs/' + id + '/retry', {
      method:'POST',
      headers:{'content-type':'application/json'},
      body: JSON.stringify({ publish_at: publishAt })
    });
    const j = await r.json();
    if (j.success) {
      toast('\u518D\u6295\u7A3F\u4E88\u7D04\u3057\u307E\u3057\u305F ('+(j.publish_at||publishAt)+')','ok');
      const m = document.getElementById('ap-retry-modal'); if (m) m.remove();
      setTimeout(()=>location.reload(),900);
    } else toast('\u5931\u6557: ' + (j.error||''),'err');
  } catch(e) { toast('\u30A8\u30E9\u30FC: '+e.message,'err'); }
};

// URL ?new=1 \u3067\u81EA\u52D5\u7684\u306B\u30E2\u30FC\u30C0\u30EB\u3092\u958B\u304D\u3001?date=YYYY-MM-DD \u3092\u6295\u7A3F\u65E5\u6642\u306B\u53CD\u6620
(function autoOpenAP(){
  try {
    const params = new URLSearchParams(location.search);
    if (params.get('new') === '1') {
      setTimeout(()=>{
        openApModal();
        const dateStr = params.get('date');
        if (dateStr) {
          const pubEl = document.getElementById('ap-pub');
          if (pubEl) {
            pubEl.value = dateStr + 'T09:00';
            deriveGenAt();
          }
        }
      }, 100);
    }
  } catch(e) {}
})();

function escapeHtml(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]); }
<\/script>`;
}
__name(_n, "_n");
function hn(e) {
  return `
<div class="space-y-4">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="section-title"><i class="fas fa-users-gear"></i>\u30A2\u30AB\u30A6\u30F3\u30C8\u7BA1\u7406</h1>
      <p class="section-desc">X\u30A2\u30AB\u30A6\u30F3\u30C8\u306E\u767B\u9332\u30FB\u30C8\u30FC\u30AF\u30F3\u7BA1\u7406\u3092\u884C\u3044\u307E\u3059\u3002</p>
    </div>
    <button class="btn btn-primary" onclick="openAddAcct()"><i class="fas fa-plus"></i>\u30A2\u30AB\u30A6\u30F3\u30C8\u8FFD\u52A0</button>
  </div>
  ${e.accounts.length === 0 ? `
    <div class="alert alert-info">
      <i class="fas fa-info-circle mt-0.5"></i>
      <div>X\u30A2\u30AB\u30A6\u30F3\u30C8\u672A\u767B\u9332\u3002X Developer Portal \u3067 Consumer Key/Secret \u3068 Access Token/Secret \u3092\u53D6\u5F97\u3057\u3001\u4E0A\u306E\u300C\u30A2\u30AB\u30A6\u30F3\u30C8\u8FFD\u52A0\u300D\u304B\u3089\u767B\u9332\u3057\u3066\u304F\u3060\u3055\u3044\u3002<br>
      <span class="text-xs opacity-70">\u203B OAuth 1.0a User Context \u8A8D\u8A3C\u306E\u305F\u3081\u3001\u30D6\u30E9\u30A6\u30B6\u30EA\u30C0\u30A4\u30EC\u30AF\u30C8\u306F\u4E0D\u8981\u3067\u3059</span></div>
    </div>
  ` : `
    <div class="card" style="padding:0">
      <table class="data">
        <thead><tr><th>\u30A2\u30AB\u30A6\u30F3\u30C8\u540D</th><th>@handle</th><th>\u6700\u7D42\u6295\u7A3F</th><th>\u72B6\u614B</th><th></th></tr></thead>
        <tbody>
          ${e.accounts.map((t) => `
            <tr>
              <td class="font-semibold">${w(t.account_name)}</td>
              <td class="text-accent">@${w(t.x_username || "\u672A\u8A8D\u8A3C")}</td>
              <td class="text-xs text-ink-muted">${t.last_posted_at || "-"}</td>
              <td>${t.is_active ? '<span class="pill pill-ok">\u6709\u52B9</span>' : '<span class="pill pill-soft">\u505C\u6B62</span>'}</td>
              <td class="text-right">
                <button class="btn btn-subtle btn-sm" onclick="testAcct(${t.id})"><i class="fas fa-vial"></i>\u8AAD\u307F\u53D6\u308A\u78BA\u8A8D</button>
                <button class="btn btn-danger btn-sm" onclick="delAcct(${t.id})"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `}

  <div id="add-acct-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);align-items:center;justify-content:center;z-index:50;padding:1rem">
    <div style="background:#fff;border-radius:.75rem;max-width:32rem;width:100%;padding:1.5rem">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold">X\u30A2\u30AB\u30A6\u30F3\u30C8\u8FFD\u52A0</h3>
        <button onclick="closeAddAcct()" class="text-ink-muted"><i class="fas fa-xmark text-xl"></i></button>
      </div>
      <div class="space-y-3">
        <div class="alert alert-info text-xs">X Developer Portal \u2192 Keys and tokens \u3067\u3001\u540C\u3058\u30A2\u30D7\u30EA\u306E API Key / API Secret / Access Token / Access Token Secret \u3092\u3059\u3079\u3066\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002</div>
        <div>
          <label class="field-label"><i class="fas fa-tag icon-blue"></i>\u30A2\u30AB\u30A6\u30F3\u30C8\u8868\u793A\u540D</label>
          <input type="text" id="na-name" class="inp" placeholder="\u4F8B: KATO \u30E1\u30A4\u30F3">
        </div>
        <div>
          <label class="field-label"><i class="fas fa-key icon-yellow"></i>API Key</label>
          <input type="text" id="na-api-key" class="inp input-mono" autocomplete="off" autocapitalize="none" spellcheck="false" inputmode="text" name="ge365x_x_api_key">
        </div>
        <div>
          <label class="field-label"><i class="fas fa-key icon-yellow"></i>API Key Secret</label>
          <input type="password" id="na-api-secret" class="inp input-mono" autocomplete="new-password" autocapitalize="none" spellcheck="false" name="ge365x_x_api_secret">
        </div>
        <div>
          <label class="field-label"><i class="fas fa-key icon-yellow"></i>Access Token</label>
          <input type="text" id="na-token" class="inp input-mono" placeholder="1234567890-xxxxx" autocomplete="off" autocapitalize="none" spellcheck="false" inputmode="text" name="ge365x_x_access_token">
        </div>
        <div>
          <label class="field-label"><i class="fas fa-key icon-yellow"></i>Access Token Secret</label>
          <input type="password" id="na-secret" class="inp input-mono" autocomplete="new-password" autocapitalize="none" spellcheck="false" name="ge365x_x_access_token_secret">
        </div>
        <div class="flex gap-2 pt-2">
          <button class="btn btn-ghost flex-1" onclick="closeAddAcct()">\u30AD\u30E3\u30F3\u30BB\u30EB</button>
          <button class="btn btn-primary flex-1" onclick="submitAddAcct()"><i class="fas fa-check"></i>\u8FFD\u52A0</button>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
function openAddAcct() { document.getElementById('add-acct-modal').style.display='flex'; }
function closeAddAcct() { document.getElementById('add-acct-modal').style.display='none'; }
async function submitAddAcct() {
  const body = {
    account_name: document.getElementById('na-name').value.trim(),
    api_key: document.getElementById('na-api-key').value.trim(),
    api_secret: document.getElementById('na-api-secret').value.trim(),
    access_token: document.getElementById('na-token').value.trim(),
    access_token_secret: document.getElementById('na-secret').value.trim(),
  };
  if (!body.account_name || !body.api_key || !body.api_secret || !body.access_token || !body.access_token_secret) { toast('\u5168\u3066\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044','err'); return; }
  const r = await fetch('/api/admin/accounts', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(body) });
  const j = await r.json();
  if (j.success) { toast('\u8FFD\u52A0\u3057\u307E\u3057\u305F','ok'); location.reload(); } else toast('\u5931\u6557','err');
}
async function testAcct(id) {
  const r = await fetch('/api/admin/accounts/' + id + '/test', { method:'POST' });
  const j = await r.json();
  if (j.success) { toast('\u8AAD\u307F\u53D6\u308AOK: @' + (j.me?.username || 'ok') + ' / \u6295\u7A3F\u53EF\u5426\u306F\u4ECA\u3059\u3050\u6295\u7A3F\u3067\u5225\u5224\u5B9A','ok'); location.reload(); }
  else toast('\u63A5\u7D9ANG: ' + (j.error || ''),'err');
}
async function delAcct(id) {
  if (!confirm('\u524A\u9664\u3057\u307E\u3059\u304B?')) return;
  await fetch('/api/admin/accounts/' + id, { method:'DELETE' });
  location.reload();
}
function escapeHtml(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]); }
<\/script>`;
}
__name(hn, "hn");
function fn(e) {
  const t = [{ key: "posts", label: "\u6295\u7A3F\u30AD\u30E5\u30FC", desc: "\u5168\u6295\u7A3F\u30C7\u30FC\u30BF\uFF08\u4E88\u7D04\u30FB\u6295\u7A3F\u6E08\u30FB\u5931\u6557\u542B\u3080\uFF09", icon: "fa-brands fa-x-twitter", color: "text-blue-600" }, { key: "logs", label: "\u6295\u7A3F\u30ED\u30B0", desc: "\u6295\u7A3F\u5B9F\u884C\u306E\u5168\u5C65\u6B74\uFF08\u6210\u529F\u30FB\u5931\u6557\uFF09", icon: "fa-clipboard-list", color: "text-emerald-600" }, { key: "drafts", label: "\u4E0B\u66F8\u304D", desc: "\u4FDD\u5B58\u6E08\u307F\u306E\u4E0B\u66F8\u304D\u30C7\u30FC\u30BF", icon: "fa-file-pen", color: "text-sky-600" }, { key: "kpi", label: "KPI", desc: "\u65E5\u5225\u6295\u7A3F\u6570\u30FB\u5931\u6557\u6570\u306E\u7D71\u8A08", icon: "fa-chart-line", color: "text-rose-600" }, { key: "accounts", label: "X\u30A2\u30AB\u30A6\u30F3\u30C8", desc: "\u30A2\u30AB\u30A6\u30F3\u30C8\u60C5\u5831\uFF08\u30C8\u30FC\u30AF\u30F3\u9664\u5916\uFF09", icon: "fa-users-gear", color: "text-indigo-600" }], s = [{ key: "admin/users", label: "\u30E6\u30FC\u30B6\u30FC\u4E00\u89A7", desc: "\u5168\u30E6\u30FC\u30B6\u30FC\uFF08\u30D7\u30E9\u30F3\u30FB\u627F\u8A8D\u72B6\u614B\u542B\u3080\uFF09", icon: "fa-users", color: "text-blue-600" }, { key: "admin/licenses", label: "\u30E9\u30A4\u30BB\u30F3\u30B9", desc: "\u30E9\u30A4\u30BB\u30F3\u30B9\u30AD\u30FC\u306E\u5168\u30C7\u30FC\u30BF", icon: "fa-key", color: "text-amber-600" }, { key: "admin/subs", label: "\u30B5\u30D6\u30B9\u30AF\u30EA\u30D7\u30B7\u30E7\u30F3", desc: "\u5168\u5951\u7D04\u60C5\u5831", icon: "fa-credit-card", color: "text-emerald-600" }, { key: "admin/audit", label: "\u76E3\u67FB\u30ED\u30B0", desc: "\u8A8D\u8A3C\u30FB\u64CD\u4F5C\u30ED\u30B0", icon: "fa-shield-halved", color: "text-red-600" }];
  return `
<div class="space-y-6">
  <div>
    <h1 class="section-title"><i class="fas fa-download"></i>\u4E00\u62EC\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9</h1>
    <p class="section-desc">\u5404\u30C7\u30FC\u30BF\u3092CSV\u5F62\u5F0F\u3067\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u3067\u304D\u307E\u3059\u3002Excel\u3084Google\u30B9\u30D7\u30EC\u30C3\u30C9\u30B7\u30FC\u30C8\u3067\u958B\u3051\u307E\u3059\u3002</p>
  </div>

  <!-- \u5168\u30C7\u30FC\u30BF\u4E00\u62EC -->
  <div class="card">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="font-bold text-ink"><i class="fas fa-box-archive text-accent"></i> \u5168\u30C7\u30FC\u30BF\u4E00\u62EC</h3>
        <p class="text-xs text-ink-muted mt-1">\u5168\u30C7\u30FC\u30BF\u3092JSON\u5F62\u5F0F\u3067\u4E00\u62EC\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u3057\u307E\u3059\uFF08\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u7528\u9014\uFF09</p>
      </div>
      <button class="btn btn-primary" onclick="dlExport('all')">
        <i class="fas fa-download"></i>\u5168\u30C7\u30FC\u30BF JSON
      </button>
    </div>
  </div>

  <!-- \u500B\u5225\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9 -->
  <div class="card">
    <h3 class="font-bold text-ink mb-4"><i class="fas fa-file-csv text-accent"></i> \u500B\u5225\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\uFF08CSV\uFF09</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      ${t.map((a) => `
        <div class="border border-line rounded-lg p-4 hover:border-accent hover:bg-accent-light/30 transition-all">
          <div class="flex items-start justify-between gap-2">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <i class="fas ${a.icon} ${a.color}"></i>
                <span class="font-semibold text-sm text-ink">${a.label}</span>
              </div>
              <p class="text-xs text-ink-muted">${a.desc}</p>
            </div>
            <button class="btn btn-ghost btn-sm flex-shrink-0" onclick="dlExport('${a.key}')" title="${a.label}\u3092CSV\u3067\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9">
              <i class="fas fa-download"></i>
            </button>
          </div>
        </div>
      `).join("")}
    </div>
  </div>

  ${e.isAdmin ? `
  <!-- \u7BA1\u7406\u8005\u5411\u3051 -->
  <div class="card">
    <h3 class="font-bold text-ink mb-1"><i class="fas fa-shield-halved text-red-500"></i> \u7BA1\u7406\u8005\u30A8\u30AF\u30B9\u30DD\u30FC\u30C8</h3>
    <p class="text-xs text-ink-muted mb-4">\u7BA1\u7406\u8005\u306E\u307F\u304C\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u3067\u304D\u308B\u30B7\u30B9\u30C6\u30E0\u5168\u4F53\u306E\u30C7\u30FC\u30BF\u3067\u3059\u3002</p>
    <div class="flex items-center gap-3 mb-4">
      <button class="btn btn-primary" onclick="dlExport('admin/all')">
        <i class="fas fa-download"></i>\u7BA1\u7406\u8005\u5168\u30C7\u30FC\u30BF JSON
      </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      ${s.map((a) => `
        <div class="border border-line rounded-lg p-4 hover:border-accent hover:bg-accent-light/30 transition-all">
          <div class="flex items-start justify-between gap-2">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <i class="fas ${a.icon} ${a.color}"></i>
                <span class="font-semibold text-sm text-ink">${a.label}</span>
              </div>
              <p class="text-xs text-ink-muted">${a.desc}</p>
            </div>
            <button class="btn btn-ghost btn-sm flex-shrink-0" onclick="dlExport('${a.key}')" title="${a.label}\u3092CSV\u3067\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9">
              <i class="fas fa-download"></i>
            </button>
          </div>
        </div>
      `).join("")}
    </div>
  </div>
  ` : ""}

  <!-- \u4F7F\u3044\u65B9 -->
  <div class="card bg-paper-soft">
    <h3 class="font-bold text-ink mb-3"><i class="fas fa-circle-info text-accent"></i> \u4F7F\u3044\u65B9</h3>
    <ul class="text-sm text-ink-muted space-y-2">
      <li class="flex items-start gap-2">
        <i class="fas fa-check text-emerald-500 mt-0.5"></i>
        <span>CSV\u30D5\u30A1\u30A4\u30EB\u306FBOM\u4ED8\u304DUTF-8\u3067\u51FA\u529B\u3055\u308C\u308B\u305F\u3081\u3001Excel\u3067\u76F4\u63A5\u958B\u3044\u3066\u3082\u6587\u5B57\u5316\u3051\u3057\u307E\u305B\u3093\u3002</span>
      </li>
      <li class="flex items-start gap-2">
        <i class="fas fa-check text-emerald-500 mt-0.5"></i>
        <span>\u5404CSV\u306F\u6700\u592710,000\u4EF6\u307E\u3067\u30A8\u30AF\u30B9\u30DD\u30FC\u30C8\u3055\u308C\u307E\u3059\u3002</span>
      </li>
      <li class="flex items-start gap-2">
        <i class="fas fa-check text-emerald-500 mt-0.5"></i>
        <span>\u300C\u5168\u30C7\u30FC\u30BFJSON\u300D\u306F\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u76EE\u7684\u3067\u3001\u5168\u30C6\u30FC\u30D6\u30EB\u306E\u30C7\u30FC\u30BF\u3092\u307E\u3068\u3081\u3066\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u3057\u307E\u3059\u3002</span>
      </li>
      <li class="flex items-start gap-2">
        <i class="fas fa-lock text-amber-500 mt-0.5"></i>
        <span>X\u30A2\u30AB\u30A6\u30F3\u30C8\u306E\u30A2\u30AF\u30BB\u30B9\u30C8\u30FC\u30AF\u30F3\u306F\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3\u4E0A\u30A8\u30AF\u30B9\u30DD\u30FC\u30C8\u3055\u308C\u307E\u305B\u3093\u3002</span>
      </li>
    </ul>
  </div>
</div>
<script>
function dlExport(key) {
  toast('\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u958B\u59CB...', 'info');
  const url = '/api/admin/export/' + key;
  fetch(url)
    .then(r => {
      if (!r.ok) throw new Error('\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u5931\u6557 (' + r.status + ')');
      const cd = r.headers.get('content-disposition') || '';
      const match = cd.match(/filename="?([^"]+)"?/);
      const filename = match ? match[1] : 'ge365x_export.' + (key.includes('all') ? 'json' : 'csv');
      return r.blob().then(blob => ({ blob, filename }));
    })
    .then(({ blob, filename }) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
      toast(filename + ' \u3092\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u3057\u307E\u3057\u305F', 'ok');
    })
    .catch(e => toast(e.message, 'err'));
}
<\/script>`;
}
__name(fn, "fn");
function bn(e) {
  const t = e.settings || {};
  return `
<div class="space-y-4">
  <div>
    <h1 class="section-title"><i class="fas fa-key"></i>API\u8A2D\u5B9A</h1>
    <p class="section-desc">X API / OpenAI / Google Gemini / Telegram \u306E\u8A2D\u5B9A\u3092\u884C\u3044\u307E\u3059\u3002</p>
  </div>

  <div class="card space-y-4">
    <h3 class="font-bold text-ink" style="font-size:1rem"><i class="fa-brands fa-x-twitter"></i> X API\u8A2D\u5B9A\uFF08OAuth 1.0a User Context\uFF09</h3>
    <div class="alert alert-warn">
      <i class="fas fa-triangle-exclamation" style="margin-top:2px"></i>
      <div style="font-size:.82rem">\u91CD\u8981: App permissions \u3092\u300CRead\u300D\u304B\u3089\u300CRead and Write\u300D\u306B\u5909\u66F4\u3057\u305F\u5834\u5408\u3001\u5FC5\u305A\u300CKeys and tokens\u300D\u30BF\u30D6\u3067 <strong>Access Token &amp; Secret \u3092 Regenerate\uFF08\u518D\u767A\u884C\uFF09</strong> \u3057\u3066\u304F\u3060\u3055\u3044\u3002</div>
    </div>
    <div>
      <label class="field-label"><i class="fas fa-key icon-yellow"></i>API Key (Consumer Key)</label>
      <input type="text" id="api-xk" class="inp input-mono" placeholder="${t.api_key_set ? "\u2713 \u8A2D\u5B9A\u6E08\u307F\uFF08\u5909\u66F4\u3059\u308B\u5834\u5408\u306F\u65B0\u3057\u3044\u30AD\u30FC\u3092\u5165\u529B\uFF09" : "\u672A\u8A2D\u5B9A"}" value="">
    </div>
    <div>
      <label class="field-label"><i class="fas fa-key icon-yellow"></i>API Secret (Consumer Secret)</label>
      <input type="password" id="api-xs" class="inp input-mono" placeholder="${t.api_secret_set ? "\u2713 \u8A2D\u5B9A\u6E08\u307F\uFF08\u5909\u66F4\u3059\u308B\u5834\u5408\u306F\u65B0\u3057\u3044\u30AD\u30FC\u3092\u5165\u529B\uFF09" : "\u672A\u8A2D\u5B9A"}" value="">
    </div>
    <div>
      <label class="field-label"><i class="fas fa-shield-keyhole icon-blue"></i>Bearer Token（バズリサーチ用・任意）</label>
      <input type="password" id="api-xbearer" class="inp input-mono" placeholder="${t.x_bearer_token_set ? "✓ 設定済み（変更する場合のみ入力）" : "X Developer Portal の Bearer Token"}" value="">
    </div>
    <div style="display:flex;gap:.5rem;align-items:center;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="saveXApi()"><i class="fas fa-save"></i>\u4FDD\u5B58</button>
      <button class="btn btn-ghost" onclick="testApi('x')"><i class="fas fa-plug"></i>\u63A5\u7D9A\u30C6\u30B9\u30C8</button>
      <button class="btn btn-ghost" onclick="clearXApiBlock()"><i class="fas fa-rotate"></i>X APIブロック解除確認</button>
      <span id="xapi-status" style="font-size:.8rem;color:var(--ink-muted)">\u672A\u63A5\u7D9A\u78BA\u8A8D\uFF08\u4FDD\u5B58\u5F8C\u306B\u300C\u63A5\u7D9A\u30C6\u30B9\u30C8\u300D\u3092\u5B9F\u884C\u3057\u3066\u304F\u3060\u3055\u3044\uFF09</span>
    </div>
  </div>

  <div class="card space-y-4">
    <h3 class="font-bold text-ink" style="font-size:1rem"><i class="fas fa-circle-nodes" style="color:#10A37F"></i> OpenAI API\u8A2D\u5B9A</h3>
    <p style="font-size:.82rem;color:var(--ink-muted)">AI\u8A18\u4E8B\u751F\u6210\u306B\u4F7F\u7528\u3059\u308BOpenAI API\u30AD\u30FC\u3092\u8A2D\u5B9A\u3057\u307E\u3059\u3002</p>
    <div>
      <label class="field-label"><i class="fas fa-key icon-green"></i>OpenAI API Key</label>
      <input type="password" id="api-oai" class="inp input-mono" placeholder="${t.openai_api_key ? "\u2713 \u8A2D\u5B9A\u6E08\u307F\uFF08\u5909\u66F4\u3059\u308B\u5834\u5408\u306F\u65B0\u3057\u3044\u30AD\u30FC\u3092\u5165\u529B\uFF09" : "\u672A\u8A2D\u5B9A"}" value="">
    </div>
    <div>
      <label class="field-label"><i class="fas fa-microchip icon-blue"></i>\u30E2\u30C7\u30EB</label>
      <select id="api-model" class="inp" style="max-width:16rem">
        <option value="gpt-4o-mini" ${(t.openai_model || "gpt-4o-mini") === "gpt-4o-mini" ? "selected" : ""}>gpt-4o-mini\uFF08\u63A8\u5968\u30FB\u4F4E\u30B3\u30B9\u30C8\uFF09</option>
        <option value="gpt-4o" ${(t.openai_model || "") === "gpt-4o" ? "selected" : ""}>gpt-4o\uFF08\u9AD8\u6027\u80FD\uFF09</option>
        <option value="gpt-4-turbo" ${(t.openai_model || "") === "gpt-4-turbo" ? "selected" : ""}>gpt-4-turbo</option>
      </select>
    </div>
    <div style="display:flex;gap:.5rem;align-items:center;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="saveOpenAI()"><i class="fas fa-save"></i>\u4FDD\u5B58</button>
      <button class="btn btn-ghost" onclick="testApi('openai')"><i class="fas fa-plug"></i>\u63A5\u7D9A\u30C6\u30B9\u30C8</button>
      <span id="oai-status" style="font-size:.8rem;color:var(--ink-muted)"></span>
    </div>
  </div>

  <div class="card space-y-4">
    <h3 class="font-bold text-ink" style="font-size:1rem"><i class="fas fa-gem" style="color:#4285F4"></i> Google Gemini API\u8A2D\u5B9A</h3>
    <p style="font-size:.82rem;color:var(--ink-muted)">Google AI Studio \u3067\u53D6\u5F97\u3057\u305F API \u30AD\u30FC\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002</p>
    <div>
      <label class="field-label"><i class="fas fa-key icon-blue"></i>Gemini API Key</label>
      <input type="password" id="api-gem" class="inp input-mono" placeholder="${t.gemini_api_key ? "\u2713 \u8A2D\u5B9A\u6E08\u307F\uFF08\u5909\u66F4\u3059\u308B\u5834\u5408\u306F\u65B0\u3057\u3044\u30AD\u30FC\u3092\u5165\u529B\uFF09" : "\u672A\u8A2D\u5B9A"}" value="">
    </div>
    <div>
      <label class="field-label"><i class="fas fa-microchip icon-blue"></i>\u30E2\u30C7\u30EB</label>
      <select id="api-gem-model" class="inp" style="max-width:16rem">
        <option value="gemini-1.5-flash" ${(t.gemini_model || "gemini-1.5-flash") === "gemini-1.5-flash" ? "selected" : ""}>gemini-1.5-flash\uFF08\u63A8\u5968\uFF09</option>
        <option value="gemini-1.5-pro" ${(t.gemini_model || "") === "gemini-1.5-pro" ? "selected" : ""}>gemini-1.5-pro</option>
        <option value="gemini-2.0-flash" ${(t.gemini_model || "") === "gemini-2.0-flash" ? "selected" : ""}>gemini-2.0-flash</option>
      </select>
    </div>
    <div style="display:flex;gap:.5rem;align-items:center;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="saveGemini()"><i class="fas fa-save"></i>\u4FDD\u5B58</button>
      <button class="btn btn-ghost" onclick="testApi('gemini')"><i class="fas fa-plug"></i>\u63A5\u7D9A\u30C6\u30B9\u30C8</button>
      <span id="gem-status" style="font-size:.8rem;color:var(--ink-muted)"></span>
    </div>
  </div>

  <div class="card space-y-4">
    <h3 class="font-bold text-ink" style="font-size:1rem"><i class="fa-brands fa-telegram" style="color:#2AABEE"></i> Telegram \u901A\u77E5\u8A2D\u5B9A</h3>
    <p style="font-size:.82rem;color:var(--ink-muted)">\u6295\u7A3F\u6210\u529F\u30FB\u5931\u6557\u3092 Telegram \u306B\u901A\u77E5\u3057\u307E\u3059\uFF08\u4EFB\u610F\uFF09\u3002</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
      <div>
        <label class="field-label"><i class="fas fa-robot icon-blue"></i>Bot Token</label>
        <input type="password" id="api-tg-tok" class="inp input-mono" placeholder="${t.telegram_bot_token ? "\u2713 \u8A2D\u5B9A\u6E08\u307F\uFF08\u5909\u66F4\u3059\u308B\u5834\u5408\u306F\u65B0\u3057\u3044\u30AD\u30FC\u3092\u5165\u529B\uFF09" : "\u672A\u8A2D\u5B9A"}" value="">
      </div>
      <div>
        <label class="field-label"><i class="fas fa-hashtag icon-blue"></i>Chat ID</label>
        <input type="text" id="api-tg-chat" class="inp input-mono" placeholder="\u4F8B: -1001234567890" value="${w(t.telegram_chat_id || "")}" pattern="-?[0-9]+">
      </div>
    </div>
    <div style="display:flex;gap:.5rem;align-items:center;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="saveTelegram()"><i class="fas fa-save"></i>\u4FDD\u5B58</button>
      <button class="btn btn-ghost" onclick="testApi('telegram')"><i class="fas fa-paper-plane"></i>\u30C6\u30B9\u30C8\u9001\u4FE1</button>
      <span id="tg-status" style="font-size:.8rem;color:var(--ink-muted)"></span>
    </div>
  </div>

  <div class="card space-y-4">
    <h3 class="font-bold text-ink" style="font-size:1rem"><i class="fas fa-cart-shopping" style="color:#bf0f3d"></i> 楽天API設定</h3>
    <div class="alert alert-warn">
      <i class="fas fa-crown" style="margin-top:2px"></i>
      <div style="font-size:.82rem"><strong>Pro版のみ使用可能です。</strong> 楽天市場・ランキング・楽天ブックス・楽天トラベルの検索に使用します。</div>
    </div>
    <div class="alert alert-info">
      <i class="fas fa-circle-info" style="margin-top:2px"></i>
      <div style="font-size:.82rem">保存中のApplication ID: <strong>${t.rakuten_application_id ? `${w(String(t.rakuten_application_id).slice(0, 4))}...（${String(t.rakuten_application_id).length}文字）` : "未保存"}</strong> / Access key: <strong>${t.rakuten_access_key_set ? "保存済み" : "未保存"}</strong></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
      <div><label class="field-label">アプリケーションURL（必須）</label><input id="rak-application-url" class="inp input-mono" value="${w(t.rakuten_application_url || "")}" placeholder="例: https://example.com"></div>
      <div><label class="field-label">アプリケーションID（必須）</label><input id="rak-application-id" class="inp input-mono" value="${w(t.rakuten_application_id || "")}" placeholder="楽天Web ServiceのApplication ID"></div>
      <div><label class="field-label">アクセスキー</label><input id="rak-access-key" type="password" class="inp input-mono" placeholder="${t.rakuten_access_key_set ? "保存済み。403/400時は楽天画面のAccess keyを再入力" : "必須"}"></div>
      <div><label class="field-label">アフィリエイトID（任意）</label><input id="rak-affiliate-id" class="inp input-mono" value="${w(t.rakuten_affiliate_id || "")}" placeholder="空でも検索可能"></div>
    </div>
    <div class="text-xs text-ink-muted">「楽天アプリID」は不要です。楽天デベロッパーズの詳細画面にある「アプリケーションID」と「Access key」を保存してください。アフィリエイトIDは任意です。</div>
    <div style="display:flex;gap:.5rem;align-items:center;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="saveRakutenSettings()"><i class="fas fa-save"></i>保存</button>
      <button class="btn btn-ghost" onclick="testApi('rakuten')"><i class="fas fa-plug"></i>設定確認</button>
      <span id="rak-status" style="font-size:.8rem;color:var(--ink-muted)"></span>
    </div>
  </div>
</div>
<script>
function setStatus(id,msg,ok){const el=document.getElementById(id);if(el){el.textContent=msg;el.style.color=ok?'#059669':'#DC2626';}}
async function saveXApi(){
  const r=await fetch('/api/admin/api-settings/x',{method:'POST',headers:{'content-type':'application/json'},
    body:JSON.stringify({api_key:document.getElementById('api-xk').value,api_secret:document.getElementById('api-xs').value,bearer_token:document.getElementById('api-xbearer').value})});
  const j=await r.json();
  if(j.success){toast('X API\u8A2D\u5B9A\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F','ok');}else{toast('\u4FDD\u5B58\u5931\u6557: '+(j.error||''),'err');}
}
window.saveXApi = saveXApi;
async function saveOpenAI(){
  const key=document.getElementById('api-oai').value.trim();
  const r=await fetch('/api/admin/api-settings/openai',{method:'POST',headers:{'content-type':'application/json'},
    body:JSON.stringify({openai_key:key,openai_model:document.getElementById('api-model').value})});
  const j=await r.json();
  if(j.success){toast('OpenAI\u8A2D\u5B9A\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F','ok');}else{toast('\u4FDD\u5B58\u5931\u6557: '+(j.error||''),'err');}
}
window.saveOpenAI = saveOpenAI;
async function saveGemini(){
  const key=document.getElementById('api-gem').value.trim();
  const r=await fetch('/api/admin/api-settings/gemini',{method:'POST',headers:{'content-type':'application/json'},
    body:JSON.stringify({gemini_key:key,gemini_model:document.getElementById('api-gem-model').value})});
  const j=await r.json();
  if(j.success){toast('Gemini\u8A2D\u5B9A\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F','ok');}else{toast('\u4FDD\u5B58\u5931\u6557: '+(j.error||''),'err');}
}
window.saveGemini = saveGemini;
async function saveTelegram(){
  const chatId = document.getElementById('api-tg-chat').value.trim();
  if (chatId && !/^-?[0-9]+$/.test(chatId)) {
    toast('Chat ID\u306F\u6570\u5B57\u306E\u307F\uFF08\u4F8B: -1001234567890\uFF09','err'); return;
  }
  const r=await fetch('/api/admin/api-settings/telegram',{method:'POST',headers:{'content-type':'application/json'},
    body:JSON.stringify({telegram_token:document.getElementById('api-tg-tok').value,telegram_chat_id:chatId})});
  const j=await r.json();
  if(j.success){toast('Telegram\u8A2D\u5B9A\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F','ok');}else{toast('\u4FDD\u5B58\u5931\u6557: '+(j.error||''),'err');}
}
window.saveTelegram = saveTelegram;
async function saveRakutenSettings(){
  const r=await fetch('/api/admin/api-settings/rakuten',{method:'POST',headers:{'content-type':'application/json'},
    body:JSON.stringify({
      application_url:document.getElementById('rak-application-url').value.trim(),
      application_id:document.getElementById('rak-application-id').value.trim(),
      access_key:document.getElementById('rak-access-key').value.trim(),
      affiliate_id:document.getElementById('rak-affiliate-id').value.trim()
    })});
  const j=await r.json();
  if(j.success){setStatus('rak-status','✓ 楽天API設定を保存しました',true);toast('楽天API設定を保存しました','ok');}
  else{setStatus('rak-status','✗ '+(j.error||'保存失敗'),false);toast('保存失敗: '+(j.error||''),'err');}
}
window.saveRakutenSettings = saveRakutenSettings;
async function clearXApiBlock(){
  setStatus('xapi-status','X APIブロック状態を解除中...',true);
  try{
    const r=await fetch('/api/admin/api-settings/x/clear-block',{method:'POST'});
    const j=await r.json();
    if(j.success){setStatus('xapi-status','✓ '+(j.message||'解除しました。バズリサーチを再実行してください。'),true);toast('X APIブロック状態を解除しました','ok');}
    else{setStatus('xapi-status','✗ '+(j.error||'解除失敗'),false);}
  }catch(e){setStatus('xapi-status','✗ ネットワークエラー',false);}
}
window.clearXApiBlock = clearXApiBlock;
async function testApi(kind){
  const statusId = kind==='x'?'xapi-status':kind==='openai'?'oai-status':kind==='gemini'?'gem-status':kind==='rakuten'?'rak-status':'tg-status';
  setStatus(statusId,'\u30C6\u30B9\u30C8\u4E2D...', true);
  try {
    const r=await fetch('/api/admin/api-settings/'+kind+'/test',{method:'POST'});
    const j=await r.json();
    if(j.success||j.ok){setStatus(statusId,'\u2713 \u63A5\u7D9AOK: '+(j.message||j.username||''),true);}
    else{setStatus(statusId,'\u2717 '+(j.error||'\u63A5\u7D9A\u5931\u6557'),false);}
  } catch(e){setStatus(statusId,'\u2717 \u30CD\u30C3\u30C8\u30EF\u30FC\u30AF\u30A8\u30E9\u30FC',false);}
}
window.testApi = testApi;
<\/script>`;
}
__name(bn, "bn");
function ge365xIsProUser(e) {
  return String(e?.plan_code || "").toLowerCase().includes("pro");
}
__name(ge365xIsProUser, "ge365xIsProUser");
function ge365xProLockPage(e) {
  return `
<div class="space-y-4">
  <div>
    <h1 class="section-title"><i class="fas fa-lock"></i>${e}</h1>
    <p class="section-desc">この機能はProプラン限定です。</p>
  </div>
  <div class="card">
    <div class="alert alert-warn">
      <i class="fas fa-crown" style="margin-top:2px"></i>
      <div>
        <div class="font-bold">Proプランで利用できます</div>
        <div class="text-sm">ライセンスをProに変更すると、楽天アフィリエイトとバズリサーチAIが表示されます。</div>
      </div>
    </div>
  </div>
</div>`;
}
__name(ge365xProLockPage, "ge365xProLockPage");
function ge365xRakutenPage(e) {
  if (!e.isPro) return ge365xProLockPage("楽天アフィリエイト");
  return `
<div class="space-y-4">
  <div>
    <h1 class="section-title"><i class="fas fa-cart-shopping"></i>楽天アフィリエイト</h1>
    <p class="section-desc">楽天APIから商品・ランキング・ブックス・トラベル情報を取得し、AI投稿文と一緒にX投稿へ利用します。</p>
  </div>
  <details class="card space-y-4" style="padding:0;order:2">
    <summary style="cursor:pointer;padding:1rem;font-weight:700;color:#334155"><i class="fas fa-link"></i> 商品URLから直接作成する場合だけ開く</summary>
    <div class="space-y-4" style="padding:0 1rem 1rem">
    <div class="alert alert-info">
      <i class="fas fa-circle-info" style="margin-top:2px"></i>
      <div style="font-size:.82rem">通常は下のキーワード検索を使います。商品URLから作成は、特定の商品ページだけを直接使いたい場合の補助機能です。</div>
    </div>
    <div style="display:grid;grid-template-columns:1.5fr 1fr;gap:1rem">
      <div><label class="field-label">楽天商品URL（必須）</label><input id="rak-manual-url" class="inp input-mono" placeholder="https://item.rakuten.co.jp/..."></div>
      <div><label class="field-label">価格（任意）</label><input id="rak-manual-price" class="inp" placeholder="例: 2980"></div>
      <div><label class="field-label">商品名（必須）</label><input id="rak-manual-name" class="inp" placeholder="例: 美容サプリ 30日分"></div>
      <div><label class="field-label">ショップ名（任意）</label><input id="rak-manual-shop" class="inp" placeholder="例: 楽天ショップ名"></div>
      <div style="grid-column:1/-1"><label class="field-label">画像URL（任意）</label><input id="rak-manual-img" class="inp input-mono" placeholder="https://...jpg / png"></div>
      <div style="grid-column:1/-1"><label class="field-label">投稿テーマ（任意）</label><input id="rak-manual-theme" class="inp" placeholder="例: 40代向け美容ケア"></div>
    </div>
    <div style="display:flex;gap:.5rem;flex-wrap:wrap">
      <button class="btn btn-ghost" onclick="fetchRakutenProductFromUrl()"><i class="fas fa-download"></i>楽天から取得</button>
      <button class="btn btn-primary" onclick="createManualRakutenItem()"><i class="fas fa-wand-magic-sparkles"></i>投稿素材を作成</button>
      <button class="btn btn-ghost" onclick="clearManualRakutenItem()"><i class="fas fa-eraser"></i>クリア</button>
    </div>
    <div id="rak-manual-images"></div>
    <div id="rak-manual-result"></div>
    </div>
  </details>

  <div class="card space-y-4" style="order:1">
    <h3 class="font-bold text-ink"><i class="fas fa-magnifying-glass"></i> 楽天データ検索</h3>
    <div class="alert alert-warn">
      <i class="fas fa-crown" style="margin-top:2px"></i>
      <div style="font-size:.82rem"><strong>Pro版のみ使用可能です。</strong> キーワードから楽天商品を取得し、画像・リンク・AI文を作成します。</div>
    </div>
    <div style="display:grid;grid-template-columns:1.2fr 2fr 1fr 1fr;gap:1rem">
      <div><label class="field-label">API種別</label><select id="rak-api-type" class="inp" onchange="changeRakutenApiType()">
        <option value="ichiba_search">楽天市場商品検索</option>
        <option value="ichiba_ranking">楽天市場ランキングAPI</option>
        <option value="books_total">楽天ブックス系API</option>
        <option value="travel_simple">楽天トラベル系API</option>
      </select></div>
      <div><label class="field-label">キーワード</label><input id="rak-keyword" class="inp" placeholder="例: 美容 サプリ"></div>
      <div><label class="field-label">ジャンルID</label><input id="rak-genre" class="inp" value="0"></div>
      <div><label class="field-label">取得数</label><input id="rak-hits" class="inp" type="number" min="1" max="30" value="10"></div>
      <div><label class="field-label">並び順</label><select id="rak-sort" class="inp"><option value="">標準</option><option value="+itemPrice">安い順</option><option value="-itemPrice">高い順</option><option value="-reviewAverage">レビュー順</option></select></div>
    </div>
    <div><label class="field-label">楽天APIテストフォームURL（任意）</label><input id="rak-direct-url" class="inp input-mono" placeholder="楽天APIテストフォームに表示されたURLをそのまま貼ると、そのURLで検索します"></div>
    <button class="btn btn-primary" onclick="searchRakutenItems()"><i class="fas fa-magnifying-glass"></i>検索</button>
    <div id="rak-results" class="space-y-3"></div>
  </div>
</div>
<script>
let rakutenItems = [];
window.rakutenAffiliateId='';
fetch('/api/admin/api-settings/rakuten-public').then(r=>r.json()).then(j=>{if(j&&j.success)window.rakutenAffiliateId=j.affiliate_id||'';}).catch(()=>{});
function rakutenBuildAffiliateUrl(itemUrl){
  const raw=(itemUrl||'').trim();
  if(!raw)return '';
  const aff=(window.rakutenAffiliateId||'').trim();
  if(!aff)return raw;
  try{
    const encoded=encodeURIComponent(raw);
    return 'https://hb.afl.rakuten.co.jp/hgc/'+encodeURIComponent(aff)+'/?pc='+encoded+'&m='+encoded;
  }catch(e){return raw;}
}
function createManualRakutenItem(){
  const url=document.getElementById('rak-manual-url').value.trim();
  const name=document.getElementById('rak-manual-name').value.trim();
  if(!url){toast('楽天商品URLを入力してください','err');return;}
  if(!name){toast('商品名を入力してください','err');return;}
  const item={
    api_type:'manual_url',
    item_code:'manual-'+Date.now(),
    item_name:name,
    item_price:document.getElementById('rak-manual-price').value.trim(),
    shop_name:document.getElementById('rak-manual-shop').value.trim(),
    item_url:url,
    affiliate_url:rakutenBuildAffiliateUrl(url),
    has_affiliate_url:!!(window.rakutenAffiliateId||'').trim(),
    image_url:document.getElementById('rak-manual-img').value.trim(),
    image_urls:[document.getElementById('rak-manual-img').value.trim()].filter(Boolean),
    review_average:'',
    review_count:0
  };
  rakutenItems.unshift(item);
  window.rakSelectedItem=0;
  const box=document.getElementById('rak-manual-result');
  box.innerHTML='<div class="alert alert-info">投稿素材を作成しました。下の操作からAI文生成・画像コード作成・投稿キュー保存ができます。</div><div id="rak-manual-card"></div>';
  renderRakutenItems(document.getElementById('rak-manual-card'));
  const theme=document.getElementById('rak-manual-theme').value.trim();
  if(theme) document.getElementById('rak-keyword').value=theme;
}
async function fetchRakutenProductFromUrl(){
  const url=document.getElementById('rak-manual-url').value.trim();
  if(!url){toast('楽天商品URLを入力してください','err');return;}
  const imgBox=document.getElementById('rak-manual-images');
  imgBox.innerHTML='<div class="text-sm text-ink-muted">楽天ページから取得中...</div>';
  try{
    const r=await fetch('/api/admin/rakuten/fetch-product',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({url})});
    const j=await r.json();
    if(!j.success){imgBox.innerHTML='<div class="alert alert-warn">'+escapeHtml(j.error||'取得失敗')+'</div>';return;}
    if(j.name&&!document.getElementById('rak-manual-name').value.trim())document.getElementById('rak-manual-name').value=j.name;
    if(j.price&&!document.getElementById('rak-manual-price').value.trim())document.getElementById('rak-manual-price').value=j.price;
    if(j.shop&&!document.getElementById('rak-manual-shop').value.trim())document.getElementById('rak-manual-shop').value=j.shop;
    if(j.image_url)document.getElementById('rak-manual-img').value=j.image_url;
    const imgs=(j.image_urls||[]).filter(Boolean).map(String);
    window.rakManualFetchedImages=imgs;
    imgBox.innerHTML='<div class="card" style="background:#f8fafc"><h4 class="font-bold mb-2">画像を選択する</h4>'+(imgs.length?'<div style="display:flex;gap:.55rem;flex-wrap:wrap">'+imgs.map((img,idx)=>'<button type="button" onclick="setManualRakutenImageByIndex('+idx+')" style="border:2px solid '+(idx===0?'#ec4899':'#e5e7eb')+';border-radius:.45rem;padding:.15rem;background:#fff"><img src="'+escapeHtml(img)+'" style="width:72px;height:72px;object-fit:cover"></button>').join('')+'</div>':'<div class="text-sm text-ink-muted">画像候補は取得できませんでした。</div>')+'</div>';
    toast('楽天ページから取得しました','ok');
  }catch(e){
    imgBox.innerHTML='<div class="alert alert-warn">'+escapeHtml(e.message||String(e))+'</div>';
  }
}
function setManualRakutenImage(url){
  document.getElementById('rak-manual-img').value=url;
}
function setManualRakutenImageByIndex(idx){
  const imgs=window.rakManualFetchedImages||[];
  const url=String(imgs[idx]||'');
  if(url)document.getElementById('rak-manual-img').value=url;
}
function clearManualRakutenItem(){
  ['rak-manual-url','rak-manual-name','rak-manual-price','rak-manual-shop','rak-manual-img','rak-manual-theme'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  const box=document.getElementById('rak-manual-result'); if(box)box.innerHTML='';
}
function changeRakutenApiType(){
  const t=document.getElementById('rak-api-type').value;
  document.getElementById('rak-keyword').placeholder = t==='travel_simple' ? '例: 東京 大阪 温泉' : t==='books_total' ? '例: ビジネス AI' : '例: 美容 サプリ';
  document.getElementById('rak-sort').disabled = t !== 'ichiba_search';
}
async function searchRakutenItems(){
  const apiType = document.getElementById('rak-api-type').value;
  const kw = document.getElementById('rak-keyword').value.trim();
  if(apiType !== 'ichiba_ranking' && !kw){toast('キーワードを入力してください','err');return;}
  const box = document.getElementById('rak-results');
  box.innerHTML = '<div class="text-sm text-ink-muted">検索中...</div>';
  try{
    const directUrl = document.getElementById('rak-direct-url')?.value.trim() || '';
    if(directUrl){
      const directOnly = await searchRakutenDirectUrl(directUrl);
      if(!directOnly.success){box.innerHTML='<div class="alert alert-warn">'+escapeHtml(directOnly.error||'検索失敗')+'</div>';return;}
      rakutenItems = directOnly.items || [];
      window.rakSelectedItem=0;
      renderRakutenItems(box);
      return;
    }
    const qs = new URLSearchParams({api_type:apiType, keyword:kw, genreId:document.getElementById('rak-genre').value||'0', hits:document.getElementById('rak-hits').value||'10', sort:document.getElementById('rak-sort').value||''});
    const r = await fetch('/api/admin/rakuten/search?' + qs.toString());
    const j = await r.json();
    if(!j.success){
      const direct = await searchRakutenItemsDirect(apiType, kw, qs);
      if(direct.success){
        rakutenItems = direct.items || [];
      } else {
        const scrape = await searchRakutenMallByKeyword(apiType, kw);
        if(!scrape.success){
          box.innerHTML='<div class="alert alert-warn">楽天商品取得失敗<br><small>API: '+escapeHtml(j.error||'-')+'</small><br><small>ブラウザ: '+escapeHtml(direct.error||'-')+'</small><br><small>楽天検索: '+escapeHtml(scrape.error||'-')+'</small></div>';
          return;
        } else {
          rakutenItems = scrape.items || [];
        }
      }
    } else {
      rakutenItems = j.items || [];
      const wanted=Number(document.getElementById('rak-hits').value||'10')||10;
      if(apiType==='ichiba_search' && rakutenItems.length < Math.min(3,wanted)){
        const scrape = await searchRakutenMallByKeyword(apiType, kw);
        if(scrape.success && Array.isArray(scrape.items) && scrape.items.length){
          const seen=new Set(rakutenItems.map(x=>String(x.item_url||x.affiliate_url||x.item_code||'')));
          for(const item of scrape.items){
            const key=String(item.item_url||item.affiliate_url||item.item_code||'');
            if(key && !seen.has(key)){
              seen.add(key);
              rakutenItems.push(item);
            }
            if(rakutenItems.length>=wanted)break;
          }
        }
      }
    }
    window.rakSelectedItem=0;
    renderRakutenItems(box);
  }catch(err){
    rakutenItems=[rakutenFallbackSearchItem(kw)];
    window.rakSelectedItem=0;
    box.innerHTML='<div class="alert alert-warn">検索処理でエラーが出たため、楽天検索リンク素材として表示します: '+escapeHtml(err.message||String(err))+'</div>';
    renderRakutenItems(box);
  }
}
function rakutenFallbackSearchItem(kw){
  const searchUrl='https://search.rakuten.co.jp/search/mall/'+encodeURIComponent(kw||'楽天')+'/';
  return {api_type:'rakuten_search_link',item_code:'rakuten-search-link',item_name:(kw||'楽天')+' の楽天検索結果',item_price:'',shop_name:'楽天市場',item_url:searchUrl,affiliate_url:rakutenBuildAffiliateUrl(searchUrl),has_affiliate_url:!!(window.rakutenAffiliateId||'').trim(),image_url:'',image_urls:[],review_average:'',review_count:0};
}
async function searchRakutenMallByKeyword(apiType, kw){
  if(apiType!=='ichiba_search')return {success:false,error:'楽天市場商品検索のみ対応'};
  try{
    const qs=new URLSearchParams({keyword:kw||document.getElementById('rak-keyword').value.trim(),hits:document.getElementById('rak-hits').value||'10'});
    const r=await fetch('/api/admin/rakuten/scrape-search?'+qs.toString());
    const j=await r.json();
    return j;
  }catch(e){return {success:false,error:e.message||String(e)};}
}
function renderRakutenItems(box){
  if(!rakutenItems.length){box.innerHTML='<div class="alert alert-warn">表示できる商品がありません。</div>';return;}
  window.rakSelectedItem = Number.isInteger(Number(window.rakSelectedItem)) ? Number(window.rakSelectedItem) : 0;
  if(window.rakSelectedItem >= rakutenItems.length) window.rakSelectedItem = 0;
  renderRakutenMinimalResults(box);
}
function renderRakutenWorkbenchFallback(box, err){
  try{
    const i=Number(window.rakSelectedItem)||0;
    const it=rakutenItems[i]||{};
    const imgs=(it.image_urls&&it.image_urls.length?it.image_urls:[it.image_url]).filter(Boolean).map(String);
    window.rakSelectedImages=window.rakSelectedImages||{};
    if(!Array.isArray(window.rakSelectedImages[i])) window.rakSelectedImages[i]=imgs[0]?[imgs[0]]:[];
    const selectedImgs=(window.rakSelectedImages[i]||[]).map(String).filter(Boolean);
    window.rakSelectedImages[i]=selectedImgs;
    const img=selectedImgs[0]||imgs[0]||'';
    const price=it.item_price?String(it.item_price).replace(/円$/,'')+'円':'価格情報なし';
    const postUrl=String(it.affiliate_url||it.item_url||'').trim();
    const itemTabs=rakutenItems.slice(0,12).map((x,idx)=>'<button type="button" data-rak-action="select-item" data-rak-index="'+idx+'" style="border:2px solid '+(idx===i?'#ec4899':'#e5e7eb')+';border-radius:.55rem;padding:.25rem;background:#fff;display:flex;gap:.45rem;align-items:center;max-width:210px"><img src="'+escapeHtml(x.image_url||'')+'" style="width:42px;height:42px;object-fit:cover;border-radius:.35rem"><span style="font-size:.75rem;line-height:1.25;white-space:normal;text-align:left">'+escapeHtml((x.item_name||'商品').slice(0,34))+'</span></button>').join('');
    const imageButtons=imgs.map((src,idx)=>'<button type="button" data-rak-action="select-image" data-rak-index="'+i+'" data-rak-img="'+idx+'" title="クリックで選択/解除" style="position:relative;border:2px solid '+(selectedImgs.includes(src)?'#ec4899':'#e5e7eb')+';border-radius:.45rem;padding:.15rem;background:#fff"><img src="'+escapeHtml(src)+'" style="width:72px;height:72px;object-fit:cover">'+(selectedImgs.includes(src)?'<span style="position:absolute;right:-6px;top:-6px;background:#ec4899;color:#fff;border-radius:999px;font-size:.7rem;width:1.25rem;height:1.25rem;display:flex;align-items:center;justify-content:center">✓</span>':'')+'</button>').join('');
    const problemAlert = err ? '<div class="alert alert-warn">楽天検索結果の詳細表示で問題が出たため、成功時の表示形式に切り替えました。</div>' : '';
    box.innerHTML =
      problemAlert+
      '<div id="rak-workbench">'+
      '<div class="card" style="background:#f8fafc;padding:1rem;margin-bottom:1rem"><div class="font-bold mb-2">検索結果から商品を選択</div><div style="display:flex;gap:.55rem;flex-wrap:wrap">'+itemTabs+'</div></div>'+
      '<div style="display:grid;grid-template-columns:minmax(320px,1fr) minmax(320px,1fr);gap:1.25rem;align-items:start">'+
        '<div class="card" style="background:#e8f8ff;padding:1rem"><div style="display:flex;gap:1rem;align-items:flex-start;justify-content:center">'+
          (img?'<img src="'+escapeHtml(img)+'" style="width:240px;height:240px;object-fit:contain;background:#fff;border-radius:.4rem;border:1px solid #e5e7eb">':'')+
          '<div style="max-width:360px"><div class="text-sm font-bold" style="color:#0f766e">'+escapeHtml(it.item_name||'')+'</div><div class="text-sm mt-1">価格: '+escapeHtml(price)+'</div><div class="text-xs text-ink-muted mt-1">'+escapeHtml(it.shop_name||'')+'</div><div class="mt-2"><button type="button" class="btn btn-primary btn-sm" data-rak-action="open-link" data-rak-index="'+i+'">楽天で確認</button></div></div>'+
        '</div></div>'+
        '<div class="card" style="padding:1rem">'+
          '<h3 class="font-bold mb-2">投稿画像を選択する</h3><div class="text-xs text-ink-muted mb-2">最大4枚まで。選択した画像は本文投稿に添付されます。</div><div style="display:flex;gap:.55rem;flex-wrap:wrap;min-height:82px">'+(imageButtons||'<div class="text-sm text-ink-muted">画像がありません</div>')+'</div><div class="text-xs text-ink-muted mt-2">選択中: '+selectedImgs.length+' / 4枚</div><button class="btn btn-ghost btn-sm mt-2" data-rak-action="fetch-images" data-rak-index="'+i+'"><i class="fas fa-images"></i>商品ページから画像を追加取得</button>'+
        '</div>'+
      '</div>'+
      '<div class="card mt-3" style="padding:1rem"><h3 class="font-bold mb-2">X投稿用URL</h3><label class="field-label">アフィリエイトURL</label><input id="rak-x-url-'+i+'" class="inp input-mono" readonly><div id="rak-x-url-note-'+i+'" class="text-xs text-ink-muted mt-1"></div><div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.75rem"><button class="btn btn-primary btn-sm" data-rak-action="copy-url" data-rak-index="'+i+'"><i class="fas fa-link"></i>URLをコピー</button><button class="btn btn-ghost btn-sm" data-rak-action="short-url" data-rak-index="'+i+'"><i class="fas fa-compress"></i>短縮URL化</button><button type="button" class="btn btn-ghost btn-sm" data-rak-action="open-link" data-rak-index="'+i+'"><i class="fas fa-up-right-from-square"></i>リンク確認</button></div><div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:1rem"><button class="btn btn-primary" data-rak-action="draft-body" data-rak-index="'+i+'"><i class="fas fa-wand-magic-sparkles"></i>AI投稿文を作る</button><button class="btn btn-ghost" data-rak-action="draft-simple" data-rak-index="'+i+'"><i class="fas fa-bolt"></i>シンプル生成</button></div><div id="rak-draft-'+i+'" class="mt-3"></div><div id="rak-code-'+i+'" style="display:none"></div><textarea id="rak-aff-code-'+i+'" style="display:none" readonly></textarea></div>'+
      '</div>';
    const urlInput=document.getElementById('rak-x-url-'+i);
    if(urlInput)urlInput.value=postUrl;
    const urlNote=document.getElementById('rak-x-url-note-'+i);
    if(urlNote)urlNote.textContent=isRakutenAffiliateUrl(postUrl)?'楽天アフィリエイトURLです。X投稿にはこのURLを使います。':(it.has_affiliate_url?'楽天アフィリエイトURLです。X投稿にはこのURLを使います。':'通常商品URLです。アフィリエイトIDが保存されている場合は楽天APIからアフィリエイトURLを取得します。');
    rakutenBindWorkbenchEvents();
  }catch(fallbackErr){
    console.error('rakuten fallback render failed', fallbackErr);
    renderRakutenMinimalResults(box);
  }
}
function renderRakutenMinimalResults(box){
  const i=Number(window.rakSelectedItem)||0;
  const it=rakutenItems[i]||{};
  const imgs=(it.image_urls&&it.image_urls.length?it.image_urls:[it.image_url]).filter(Boolean).map(String);
  const selected=(window.rakSelectedImages&&Array.isArray(window.rakSelectedImages[i])?window.rakSelectedImages[i]:imgs[0]?[imgs[0]]:[]).slice(0,4);
  window.rakSelectedImages=window.rakSelectedImages||{};
  window.rakSelectedImages[i]=selected;
  box.innerHTML='<div id="rak-workbench"></div>';
  const root=document.getElementById('rak-workbench');
  if(!root)return;
  const tabs=document.createElement('div');
  tabs.className='card';
  tabs.style.cssText='background:#f8fafc;padding:1rem;margin-bottom:1rem';
  const tabTitle=document.createElement('div');
  tabTitle.className='font-bold mb-2';
  tabTitle.textContent='検索結果から商品を選択';
  const tabList=document.createElement('div');
  tabList.style.cssText='display:flex;gap:.55rem;flex-wrap:wrap';
  rakutenItems.slice(0,12).forEach((x,idx)=>{
    const btn=document.createElement('button');
    btn.type='button';
    btn.dataset.rakAction='select-item';
    btn.dataset.rakIndex=String(idx);
    btn.style.cssText='border:2px solid '+(idx===i?'#ec4899':'#e5e7eb')+';border-radius:.55rem;padding:.25rem;background:#fff;display:flex;gap:.45rem;align-items:center;max-width:210px';
    const im=document.createElement('img');
    im.src=String(x.image_url||'');
    im.style.cssText='width:42px;height:42px;object-fit:cover;border-radius:.35rem';
    const sp=document.createElement('span');
    sp.style.cssText='font-size:.75rem;line-height:1.25;white-space:normal;text-align:left';
    sp.textContent=String(x.item_name||'商品').slice(0,34);
    btn.appendChild(im); btn.appendChild(sp); tabList.appendChild(btn);
  });
  tabs.appendChild(tabTitle); tabs.appendChild(tabList); root.appendChild(tabs);
  const grid=document.createElement('div');
  grid.style.cssText='display:grid;grid-template-columns:minmax(320px,1fr) minmax(320px,1fr);gap:1.25rem;align-items:start';
  const product=document.createElement('div');
  product.className='card';
  product.style.cssText='background:#e8f8ff;padding:1rem';
  const row=document.createElement('div');
  row.style.cssText='display:flex;gap:1rem;align-items:flex-start;justify-content:center';
  if((selected[0]||imgs[0])){
    const im=document.createElement('img');
    im.src=selected[0]||imgs[0];
    im.style.cssText='width:240px;height:240px;object-fit:contain;background:#fff;border-radius:.4rem;border:1px solid #e5e7eb';
    row.appendChild(im);
  }
  const info=document.createElement('div');
  info.style.cssText='max-width:360px';
  const name=document.createElement('div');
  name.className='text-sm font-bold';
  name.style.color='#0f766e';
  name.textContent=String(it.item_name||'');
  const price=document.createElement('div');
  price.className='text-sm mt-1';
  price.textContent='価格: '+(it.item_price?String(it.item_price).replace(/円$/,'')+'円':'価格情報なし');
  const shop=document.createElement('div');
  shop.className='text-xs text-ink-muted mt-1';
  shop.textContent=String(it.shop_name||'');
  const open=document.createElement('button');
  open.type='button'; open.className='btn btn-primary btn-sm mt-2';
  open.dataset.rakAction='open-link'; open.dataset.rakIndex=String(i);
  open.textContent='楽天で確認';
  info.appendChild(name); info.appendChild(price); info.appendChild(shop); info.appendChild(open);
  row.appendChild(info); product.appendChild(row); grid.appendChild(product);
  const imgCard=document.createElement('div');
  imgCard.className='card';
  imgCard.style.padding='1rem';
  const imgTitle=document.createElement('h3');
  imgTitle.className='font-bold mb-2';
  imgTitle.textContent='投稿画像を選択する';
  const imgHelp=document.createElement('div');
  imgHelp.className='text-xs text-ink-muted mb-2';
  imgHelp.textContent='最大4枚まで。選択した画像は本文投稿に添付されます。';
  const imgList=document.createElement('div');
  imgList.style.cssText='display:flex;gap:.55rem;flex-wrap:wrap;min-height:82px';
  imgs.forEach((src,idx)=>{
    const btn=document.createElement('button');
    btn.type='button'; btn.dataset.rakAction='select-image'; btn.dataset.rakIndex=String(i); btn.dataset.rakImg=String(idx);
    btn.style.cssText='position:relative;border:2px solid '+(selected.includes(src)?'#ec4899':'#e5e7eb')+';border-radius:.45rem;padding:.15rem;background:#fff';
    const im=document.createElement('img'); im.src=src; im.style.cssText='width:72px;height:72px;object-fit:cover';
    btn.appendChild(im);
    if(selected.includes(src)){
      const mark=document.createElement('span');
      mark.textContent='✓';
      mark.style.cssText='position:absolute;right:-6px;top:-6px;background:#ec4899;color:#fff;border-radius:999px;font-size:.7rem;width:1.25rem;height:1.25rem;display:flex;align-items:center;justify-content:center';
      btn.appendChild(mark);
    }
    imgList.appendChild(btn);
  });
  if(!imgs.length){
    const empty=document.createElement('div');
    empty.className='text-sm text-ink-muted';
    empty.textContent='画像がありません。下のボタンで商品ページから画像取得を試してください。';
    imgList.appendChild(empty);
  }
  const imgCount=document.createElement('div');
  imgCount.className='text-xs text-ink-muted mt-2';
  imgCount.textContent='選択中: '+selected.length+' / 4枚';
  const fetchBtn=document.createElement('button');
  fetchBtn.type='button'; fetchBtn.className='btn btn-ghost btn-sm mt-2'; fetchBtn.dataset.rakAction='fetch-images'; fetchBtn.dataset.rakIndex=String(i);
  fetchBtn.textContent='商品ページから画像を追加取得';
  imgCard.appendChild(imgTitle); imgCard.appendChild(imgHelp); imgCard.appendChild(imgList); imgCard.appendChild(imgCount); imgCard.appendChild(fetchBtn); grid.appendChild(imgCard);
  root.appendChild(grid);
  const urlCard=document.createElement('div');
  urlCard.className='card mt-3';
  urlCard.style.padding='1rem';
  const urlTitle=document.createElement('h3');
  urlTitle.className='font-bold mb-2';
  urlTitle.textContent='X投稿用URL';
  const urlLabel=document.createElement('label');
  urlLabel.className='field-label';
  urlLabel.textContent='アフィリエイトURL';
  const urlInput=document.createElement('input');
  urlInput.id='rak-x-url-'+i;
  urlInput.className='inp input-mono';
  urlInput.readOnly=true;
  const urlNote=document.createElement('div');
  urlNote.id='rak-x-url-note-'+i;
  urlNote.className='text-xs text-ink-muted mt-1';
  const urlActions=document.createElement('div');
  urlActions.style.cssText='display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.75rem';
  const makeActionButton=(cls,action,label,icon)=>{
    const btn=document.createElement('button');
    btn.type='button';
    btn.className=cls;
    btn.dataset.rakAction=action;
    btn.dataset.rakIndex=String(i);
    if(icon){
      const ico=document.createElement('i');
      ico.className=icon;
      btn.appendChild(ico);
      btn.appendChild(document.createTextNode(label));
    }else{
      btn.textContent=label;
    }
    return btn;
  };
  urlActions.appendChild(makeActionButton('btn btn-primary btn-sm','copy-url','URLをコピー','fas fa-link'));
  urlActions.appendChild(makeActionButton('btn btn-ghost btn-sm','short-url','短縮URL化','fas fa-compress'));
  urlActions.appendChild(makeActionButton('btn btn-ghost btn-sm','open-link','リンク確認','fas fa-up-right-from-square'));
  const draftActions=document.createElement('div');
  draftActions.style.cssText='display:flex;gap:.5rem;flex-wrap:wrap;margin-top:1rem';
  draftActions.appendChild(makeActionButton('btn btn-primary','draft-body','AI投稿文を作る','fas fa-wand-magic-sparkles'));
  draftActions.appendChild(makeActionButton('btn btn-ghost','draft-simple','シンプル生成','fas fa-bolt'));
  const modeHint=document.createElement('div');
  modeHint.className='rak-url-mode text-xs text-ink-muted mt-3';
  const affCode=document.createElement('textarea');
  affCode.id='rak-aff-code-'+i;
  affCode.style.display='none';
  affCode.readOnly=true;
  const draftBox=document.createElement('div');
  draftBox.id='rak-draft-'+i;
  draftBox.className='mt-3';
  const codeBox=document.createElement('div');
  codeBox.id='rak-code-'+i;
  codeBox.style.display='none';
  urlCard.appendChild(urlTitle);
  urlCard.appendChild(urlLabel);
  urlCard.appendChild(urlInput);
  urlCard.appendChild(urlNote);
  urlCard.appendChild(urlActions);
  urlCard.appendChild(draftActions);
  urlCard.appendChild(modeHint);
  urlCard.appendChild(affCode);
  urlCard.appendChild(draftBox);
  urlCard.appendChild(codeBox);
  root.appendChild(urlCard);
  const postUrl=String(it.affiliate_url||it.item_url||'').trim();
  if(urlInput)urlInput.value=postUrl;
  if(urlNote)urlNote.textContent=isRakutenAffiliateUrl(postUrl)?'楽天アフィリエイトURLです。X投稿にはこのURLを使います。':'X投稿にはこのURLを使います。';
  rakutenBindWorkbenchEvents();
  window.rakCodeModes=window.rakCodeModes||{};
  window.rakCodeModes[i]=window.rakCodeModes[i]||'image_text';
  try{buildRakutenAffiliateCode(i,240);}catch(e){console.error('rakuten affiliate code build failed',e);}
  if(imgs.length<=1 && !it._imageFetchTried) enrichSelectedRakutenImages(i, true);
}
function selectRakutenItem(i){
  window.rakSelectedItem=Number(i)||0;
  renderRakutenSafeResults();
  enrichSelectedRakutenImages(window.rakSelectedItem, true);
}
function renderRakutenSafeResults(){
  const work=document.getElementById('rak-workbench');
  const box=(work&&work.parentElement)||document.getElementById('rak-results')||document.getElementById('rak-manual-card');
  if(box)renderRakutenMinimalResults(box);
}
function rakutenBindWorkbenchEvents(){
  const box=document.getElementById('rak-workbench');
  if(!box)return;
  if(box.dataset.bound!=='1'){
    box.dataset.bound='1';
    box.addEventListener('click',function(ev){
      const btn=ev.target.closest('[data-rak-action]');
      if(!btn)return;
      rakutenHandleWorkbenchAction(btn);
    });
  }
  box.querySelectorAll('[data-rak-action]').forEach(btn=>{
    if(btn.dataset.directBound==='1')return;
    btn.dataset.directBound='1';
    btn.addEventListener('click',function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      rakutenHandleWorkbenchAction(btn);
    });
  });
}
function rakutenHandleWorkbenchAction(btn){
  if(!btn)return;
  const action=btn.dataset.rakAction;
  const i=Number(btn.dataset.rakIndex||window.rakSelectedItem||0);
  const idx=Number(btn.dataset.rakImg||0);
  if(action==='select-item')selectRakutenItem(i);
  else if(action==='select-image')selectRakutenImage(i,idx);
  else if(action==='open-link')openRakutenLink(i);
  else if(action==='fetch-images')enrichSelectedRakutenImages(i,false);
  else if(action==='copy-url')copyRakutenXUrl(i);
  else if(action==='short-url')shortenRakutenXUrl(i);
  else if(action==='draft-body')draftRakutenPost(i,'body');
  else if(action==='draft-simple')draftRakutenPost(i,'simple');
}
function renderRakutenWorkbench(){
  renderRakutenSafeResults();
}
async function enrichSelectedRakutenImages(i,silent){
  const it=rakutenItems[i]||{};
  if(!it.item_url || it._imageFetching)return;
  it._imageFetching=true;
  if(!silent)toast('商品ページから画像を取得中...','ok');
  try{
    const r=await fetch('/api/admin/rakuten/fetch-product',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({url:it.item_url})});
    const j=await r.json();
    it._imageFetchTried=true;
    if(j.success){
      const merged=[...(it.image_urls||[]),...(j.image_urls||[]),j.image_url].filter(Boolean);
      it.image_urls=[...new Set(merged)];
      it.image_url=it.image_url||it.image_urls[0]||'';
      if(j.name&&!it.item_name)it.item_name=j.name;
      if(j.price&&!it.item_price)it.item_price=j.price;
      if(j.shop&&!it.shop_name)it.shop_name=j.shop;
      if(!silent)toast('画像を追加取得しました','ok');
      if((window.rakSelectedItem||0)===i)renderRakutenSafeResults();
    }else if(!silent){
      toast(j.error||'画像を追加取得できませんでした','err');
    }
  }catch(e){
    if(!silent)toast(e.message||String(e),'err');
  }finally{
    it._imageFetching=false;
  }
}
async function searchRakutenDirectUrl(rawUrl){
  try{
    const url=new URL(rawUrl);
    const data=await rakutenJsonp(url.toString());
    if(data.error||data.error_description)return {success:false,error:(data.error_description||data.error)+' / URL: '+url.toString()};
    const source=Array.isArray(data.Items)?data.Items:Array.isArray(data.items)?data.items:Array.isArray(data.hotels)?data.hotels:[];
    return {success:true,items:source.map(x=>normalizeRakutenItemClient(x,document.getElementById('rak-api-type').value||'ichiba_search'))};
  }catch(e){return {success:false,error:e.message||String(e)};}
}
async function searchRakutenItemsDirect(apiType, kw, qs){
  try{
    const cfgRes=await fetch('/api/admin/api-settings/rakuten-public');
    const cfg=await cfgRes.json();
    if(!cfg.success)return {success:false,error:cfg.error||'楽天API設定取得失敗'};
    const endpoints={
      ichiba_search:'https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401',
      ichiba_ranking:'https://openapi.rakuten.co.jp/ichibaranking/api/IchibaItem/Ranking/20220601',
      books_total:'https://openapi.rakuten.co.jp/services/api/BooksTotal/Search/20170404',
      travel_simple:'https://openapi.rakuten.co.jp/engine/api/Travel/SimpleHotelSearch/20170426'
    };
    const url=new URL(endpoints[apiType]||endpoints.ichiba_search);
    url.searchParams.set('format','json');
    url.searchParams.set('formatVersion','2');
    url.searchParams.set('applicationId',cfg.application_id);
    url.searchParams.set('accessKey',cfg.access_key);
    if(cfg.affiliate_id)url.searchParams.set('affiliateId',cfg.affiliate_id);
    if(kw)url.searchParams.set('keyword',kw);
    const genre=document.getElementById('rak-genre').value||'0';
    if(apiType==='ichiba_search'||apiType==='ichiba_ranking')url.searchParams.set('genreId',genre);
    if(apiType!=='ichiba_ranking')url.searchParams.set('hits',document.getElementById('rak-hits').value||'10');
    if(apiType==='ichiba_search'&&document.getElementById('rak-sort').value)url.searchParams.set('sort',document.getElementById('rak-sort').value);
    let data=await rakutenJsonp(url.toString());
    if(data.error||data.error_description){
      const legacyUrl=new URL(url.toString());
      if(apiType==='ichiba_search')legacyUrl.href='https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20170706';
      legacyUrl.searchParams.set('format','json');
      legacyUrl.searchParams.set('formatVersion','2');
      legacyUrl.searchParams.set('applicationId',cfg.application_id);
      if(cfg.affiliate_id)legacyUrl.searchParams.set('affiliateId',cfg.affiliate_id);
      if(kw)legacyUrl.searchParams.set('keyword',kw);
      if(apiType==='ichiba_search'||apiType==='ichiba_ranking')legacyUrl.searchParams.set('genreId',genre);
      if(apiType!=='ichiba_ranking')legacyUrl.searchParams.set('hits',document.getElementById('rak-hits').value||'10');
      if(apiType==='ichiba_search'&&document.getElementById('rak-sort').value)legacyUrl.searchParams.set('sort',document.getElementById('rak-sort').value);
      data=await rakutenJsonp(legacyUrl.toString());
    }
    if(data.error||data.error_description)return {success:false,error:(data.error_description||data.error)+' / URL: '+url.toString().replace(cfg.application_id,'APP_ID').replace(cfg.access_key,'ACCESS_KEY')};
    const source=Array.isArray(data.Items)?data.Items:Array.isArray(data.items)?data.items:Array.isArray(data.hotels)?data.hotels:[];
    return {success:true,items:source.map(x=>normalizeRakutenItemClient(x,apiType))};
  }catch(e){return {success:false,error:e.message||String(e)};}
}
function rakutenJsonp(url){
  return new Promise((resolve,reject)=>{
    const cb='ge365xRakutenCb_'+Date.now()+'_'+Math.random().toString(36).slice(2);
    const s=document.createElement('script');
    const u=new URL(url);
    u.searchParams.set('callback',cb);
    const timer=setTimeout(()=>{cleanup();reject(new Error('楽天API応答タイムアウト'));},20000);
    function cleanup(){clearTimeout(timer);try{delete window[cb];}catch(e){window[cb]=undefined;}s.remove();}
    window[cb]=(data)=>{cleanup();resolve(data||{});};
    s.onerror=()=>{cleanup();reject(new Error('楽天API接続失敗'));};
    s.src=u.toString();
    document.head.appendChild(s);
  });
}
function normalizeRakutenItemClient(e,apiType){
  const t=(e&&e.Item)||e?.Hotel?.[0]?.hotelBasicInfo||e?.hotel?.[0]?.hotelBasicInfo||e||{};
  const imgs=[...(Array.isArray(t.mediumImageUrls)?t.mediumImageUrls.map(x=>x.imageUrl||x):[]),...(Array.isArray(t.smallImageUrls)?t.smallImageUrls.map(x=>x.imageUrl||x):[]),t.largeImageUrl,t.mediumImageUrl,t.hotelImageUrl].filter(Boolean);
  const url=t.itemUrl||t.affiliateUrl||t.reviewUrl||t.hotelInformationUrl||t.planListUrl||'';
  return {api_type:apiType,item_code:t.itemCode||t.isbn||t.hotelNo||'',item_name:t.itemName||t.title||t.hotelName||'',item_price:t.itemPrice||t.salesPrice||t.hotelMinCharge||0,shop_name:t.shopName||t.publisherName||t.hotelSpecial||'',item_url:url,affiliate_url:t.affiliateUrl||url,has_affiliate_url:!!t.affiliateUrl,image_url:imgs[0]||'',image_urls:[...new Set(imgs)],review_average:t.reviewAverage||t.reviewAverageValue||'',review_count:t.reviewCount||0};
}
function openRakutenLink(i){const it=rakutenItems[i]||{};const u=String(it.affiliate_url||it.item_url||'').trim(); if(u) window.open(u,'_blank','noopener');}
function showRakutenAffiliateCode(i){
  const it=rakutenItems[i]||{};
  const imgs=(it.image_urls&&it.image_urls.length?it.image_urls:[it.image_url]).filter(Boolean);
  const box=document.getElementById('rak-code-'+i);
  if(!box)return;
  if(!imgs.length){box.innerHTML='<div class="alert alert-warn">画像URLが取得できませんでした。</div>';return;}
  window.rakSelectedImages=window.rakSelectedImages||{};
  window.rakSelectedImages[i]=window.rakSelectedImages[i]||[imgs[0]];
  box.innerHTML='<div class="card" style="background:#f8fafc"><h4 class="font-bold mb-2">画像を選択する</h4><div style="display:flex;gap:.55rem;flex-wrap:wrap">'+imgs.map((img,idx)=>'<button type="button" onclick="selectRakutenImage('+i+','+idx+')" style="border:2px solid '+(idx===0?'#ec4899':'#e5e7eb')+';border-radius:.45rem;padding:.15rem;background:#fff"><img src="'+escapeHtml(img)+'" style="width:64px;height:64px;object-fit:cover"></button>').join('')+'</div><h4 class="font-bold mt-3 mb-2">サイズを選択する</h4><div style="display:flex;gap:.5rem;flex-wrap:wrap">'+[400,300,240,128,80,64].map(s=>'<button class="btn btn-ghost btn-sm" onclick="buildRakutenAffiliateCode('+i+','+s+')">'+s+' x '+s+'</button>').join('')+'</div><div class="rak-url-mode text-xs text-ink-muted mt-3"></div><textarea id="rak-aff-code-'+i+'" class="inp input-mono mt-1" style="min-height:130px" readonly></textarea><button class="btn btn-primary btn-sm mt-2" onclick="copyRakutenAffiliateCode('+i+')"><i class="fas fa-copy"></i>コードをコピー</button></div>';
  buildRakutenAffiliateCode(i,240);
}
function selectRakutenImage(i,idx){
  const imgs=(rakutenItems[i].image_urls&&rakutenItems[i].image_urls.length?rakutenItems[i].image_urls:[rakutenItems[i].image_url]).filter(Boolean);
  const src=imgs[idx]||imgs[0]||'';
  const keepUrl=getRakutenXUrl(i);
  const draftBox=document.getElementById('rak-draft-'+i);
  const keepDraftHtml=draftBox?draftBox.innerHTML:'';
  const keepMain=draftBox?draftBox.querySelector('textarea')?.value||'':'';
  const keepComment=document.getElementById('rak-tree-comment-'+i)?.value||'';
  const keepSchedule=document.getElementById('rak-schedule-at-'+i)?.value||'';
  window.rakSelectedImages=window.rakSelectedImages||{};
  let selected=Array.isArray(window.rakSelectedImages[i])?window.rakSelectedImages[i].slice():window.rakSelectedImages[i]?[window.rakSelectedImages[i]]:[];
  if(selected.includes(src)){
    selected=selected.filter(x=>x!==src);
  }else{
    if(selected.length>=4){toast('画像は最大4枚までです','err');return;}
    selected.push(src);
  }
  window.rakSelectedImages[i]=selected;
  window.rakSelectedMediaIds=window.rakSelectedMediaIds||{};
  delete window.rakSelectedMediaIds[i];
  renderRakutenSafeResults();
  if(keepUrl)document.querySelectorAll('.rak-url-field-'+i+', #rak-x-url-'+i).forEach(el=>{el.value=keepUrl;});
  if(keepDraftHtml){
    const newDraft=document.getElementById('rak-draft-'+i);
    if(newDraft){
      newDraft.innerHTML=keepDraftHtml;
      const ta=newDraft.querySelector('textarea');
      if(ta)ta.value=keepMain;
      const c=document.getElementById('rak-tree-comment-'+i);
      if(c)c.value=keepComment;
      const sc=document.getElementById('rak-schedule-at-'+i);
      if(sc)sc.value=keepSchedule;
    }
  }
  buildRakutenAffiliateCode(i,240);
}
async function ensureRakutenSelectedMedia(i){
  const raw=(window.rakSelectedImages&&window.rakSelectedImages[i])||(rakutenItems[i]&&rakutenItems[i].image_url)||'';
  const imgs=(Array.isArray(raw)?raw:[raw]).filter(Boolean).slice(0,4);
  if(!imgs.length)return [];
  window.rakSelectedMediaIds=window.rakSelectedMediaIds||{};
  const cached=window.rakSelectedMediaIds[i];
  if(cached&&cached.key===imgs.join('|'))return cached.ids;
  const ids=[];
  for(const img of imgs){
    const r=await fetch('/api/admin/media/url',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({url:img,file_type:'image'})});
    const j=await r.json();
    if(!j.success||!j.id)throw new Error(j.error||'画像登録に失敗しました');
    ids.push(j.id);
  }
  window.rakSelectedMediaIds[i]={key:imgs.join('|'),ids};
  return ids;
}
function isRakutenAffiliateUrl(url){
  return /https?:\/\/hb\.afl\.rakuten\.co\.jp\//i.test(String(url||''));
}
function setRakutenCodeMode(i,mode){
  window.rakCodeModes=window.rakCodeModes||{};
  window.rakCodeModes[i]=mode;
  buildRakutenAffiliateCode(i,240);
}
function buildRakutenAffiliateCode(i,size){
  const it=rakutenItems[i]||{};
  const link=String(it.affiliate_url||it.item_url||'');
  const rawImg=(window.rakSelectedImages&&window.rakSelectedImages[i])||it.image_url||'';
  const img=String((Array.isArray(rawImg)?rawImg[0]:rawImg)||it.image_url||'');
  const title=escapeHtml(it.item_name||'楽天商品');
  const label=it.has_affiliate_url?'アフィリエイトURL':'通常商品URL（アフィリエイトID未設定）';
  const mode=(window.rakCodeModes&&window.rakCodeModes[i])||'image_text';
  const safeLink=escapeHtml(link);
  const safeImg=escapeHtml(img);
  let code='';
  if(mode==='link') code=link;
  else if(mode==='text') code='<a href="'+safeLink+'" target="_blank" rel="nofollow sponsored noopener">'+title+'</a>';
  else if(mode==='image') code='<a href="'+safeLink+'" target="_blank" rel="nofollow sponsored noopener"><img src="'+safeImg+'" alt="'+title+'" width="'+size+'" height="'+size+'" style="object-fit:contain;border:0;max-width:100%;height:auto"></a>';
  else code='<table border="0" cellpadding="0" cellspacing="0"><tr><td><div style="border:1px solid #95a5a6;border-radius:8px;background:#fff;width:'+size+'px;padding:8px;text-align:center;overflow:hidden"><a href="'+safeLink+'" target="_blank" rel="nofollow sponsored noopener"><img src="'+safeImg+'" alt="'+title+'" width="'+size+'" height="'+size+'" style="object-fit:contain;border:0;max-width:100%;height:auto"></a><div style="font-size:12px;line-height:1.5;margin-top:6px"><a href="'+safeLink+'" target="_blank" rel="nofollow sponsored noopener">'+title+'</a></div></div></td></tr></table>';
  const ta=document.getElementById('rak-aff-code-'+i);
  if(ta)ta.value=code;
  const note=ta&&ta.previousElementSibling;
  if(note&&note.classList&&note.classList.contains('rak-url-mode'))note.textContent=label;
}
function getRakutenXUrl(i){
  const treeInput=document.getElementById('rak-tree-url-'+i);
  if(treeInput&&treeInput.value)return treeInput.value;
  const input=document.getElementById('rak-x-url-'+i);
  const it=rakutenItems[i]||{};
  return (input&&input.value)||(it.affiliate_url||it.item_url||'');
}
async function copyRakutenAffiliateCode(i){
  const ta=document.getElementById('rak-aff-code-'+i);
  if(!ta)return;
  ta.select();
  try{await navigator.clipboard.writeText(ta.value);toast('アフィリエイトコードをコピーしました','ok');}
  catch(e){document.execCommand('copy');toast('コードをコピーしました','ok');}
}
async function copyRakutenXUrl(i){
  const input=document.getElementById('rak-x-url-'+i);
  const url=getRakutenXUrl(i);
  if(!url){toast('X投稿用URLがありません','err');return;}
  try{await navigator.clipboard.writeText(url);toast('X投稿用URLをコピーしました','ok');}
  catch(e){if(input){input.select();document.execCommand('copy');toast('X投稿用URLをコピーしました','ok');}}
}
async function shortenRakutenXUrl(i){
  const input=document.getElementById('rak-x-url-'+i);
  const note=document.getElementById('rak-x-url-note-'+i);
  const btn=document.querySelector('[data-rak-action="short-url"][data-rak-index="'+i+'"]');
  const url=getRakutenXUrl(i);
  if(!url){toast('短縮するURLがありません','err');return;}
  if(note)note.textContent='短縮URLを作成中...';
  if(btn)btn.textContent='短縮中...';
  try{
    const r=await fetch('/api/admin/shorten-url',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({url})});
    const j=await r.json();
    if(j.success&&j.short_url){
      if(input)input.value=j.short_url;
      document.querySelectorAll('.rak-url-field-'+i).forEach(el=>{el.value=j.short_url;});
      if(note)note.textContent=isRakutenAffiliateUrl(url)?'短縮URLを作成しました。元URLは楽天アフィリエイトURLです。':'短縮URLを作成しました。X投稿にはこのURLを使えます。';
      toast('短縮URLを作成しました','ok');
    }else{
      if(note)note.textContent=j.error||'短縮URL化できませんでした。元URLをそのまま使ってください。';
      toast('短縮URL化できませんでした','err');
    }
  }catch(e){
    if(note)note.textContent='短縮URL化できませんでした。元URLをそのまま使ってください。';
    toast('短縮URL化できませんでした','err');
  }finally{
    if(btn)btn.innerHTML='<i class="fas fa-compress"></i>短縮URL化';
  }
}
function rakutenDefaultScheduleLocal(){
  return typeof jstNowDatetimeLocal==='function' ? jstNowDatetimeLocal(0) : new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,16);
}
async function draftRakutenPost(i, mode){
  const theme = document.getElementById('rak-keyword').value.trim();
  mode = mode || 'body';
  const box = document.getElementById('rak-draft-'+i);
  if(box)box.innerHTML='<div class="alert alert-info">投稿文を生成中...</div>';
  const r = await fetch('/api/admin/rakuten/draft',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({item:rakutenItems[i],theme,post_mode:mode})});
  const j = await r.json();
  if(!j.success){box.innerHTML='<div class="alert alert-warn">'+(j.error||'生成失敗')+'</div>';return;}
  const url=getRakutenXUrl(i);
  box.dataset.postMode=mode;
  const defaultComment='商品はこちら';
  box.innerHTML='<label class="field-label">メイン投稿</label><textarea class="inp" style="min-height:110px">'+escapeHtml(j.draft||'')+'</textarea><div class="card mt-2" style="background:#f8fafc;padding:.85rem"><div class="font-bold mb-2">ツリー投稿</div><label class="field-label">URL上部コメント</label><textarea id="rak-tree-comment-'+i+'" class="inp" style="min-height:72px">'+escapeHtml(defaultComment)+'</textarea><label class="field-label mt-2">X投稿用URL</label><input id="rak-tree-url-'+i+'" class="inp input-mono rak-url-field-'+i+'" readonly></div><label class="field-label mt-2">一括予約日時</label><input id="rak-schedule-at-'+i+'" type="datetime-local" class="inp" value="'+rakutenDefaultScheduleLocal()+'"><div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.5rem"><button class="btn btn-primary btn-sm" onclick="saveRakutenPost('+i+',\\'schedule\\')"><i class="fas fa-calendar-check"></i>一括予約投稿</button><button class="btn btn-ghost btn-sm" onclick="saveRakutenPost('+i+',\\'now\\')"><i class="fas fa-paper-plane"></i>今すぐ投稿</button><button class="btn btn-ghost btn-sm" onclick="saveRakutenPost('+i+',\\'draft\\')"><i class="fas fa-plus"></i>下書き保存</button><button class="btn btn-ghost btn-sm" onclick="copyRakutenXUrl('+i+')"><i class="fas fa-link"></i>URLをコピー</button></div><div id="rak-post-result-'+i+'" class="mt-2"></div>';
  const treeUrl=document.getElementById('rak-tree-url-'+i);
  if(treeUrl)treeUrl.value=url;
}
async function saveRakutenPost(i, mode){
  const txt = document.querySelector('#rak-draft-'+i+' textarea')?.value || '';
  const comment = document.getElementById('rak-tree-comment-'+i)?.value || '商品はこちら';
  const scheduledLocal = document.getElementById('rak-schedule-at-'+i)?.value || '';
  const scheduledAt = mode==='schedule' ? datetimeLocalToJst(scheduledLocal) : null;
  const accountId = parseInt(document.getElementById('acct-sw')?.value || '', 10) || null;
  if(!txt.trim()){toast('メイン投稿文を作成してください','err');return;}
  let mediaIds=[];
  try{mediaIds=await ensureRakutenSelectedMedia(i);}catch(e){toast(e.message||String(e),'err');return;}
  const payload = {tweets:[{body:txt,media_ids:mediaIds},{body:comment,link_url:getRakutenXUrl(i)}],account_id:accountId,source_type:'rakuten_affiliate'};
  if(mode==='now'){
    const rNow = await fetch('/api/admin/posts/rakuten-thread-now',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});
    const jNow = await rNow.json();
    const resultBox=document.getElementById('rak-post-result-'+i);
    if(jNow.success){
      if(resultBox)resultBox.innerHTML='<div class="alert alert-ok">メイン投稿とツリー投稿を送信しました。親ID: '+escapeHtml(jNow.parent_tweet_id||'')+' / 返信ID: '+escapeHtml(jNow.reply_tweet_id||'')+'</div>';
      toast('メイン投稿とツリー投稿を送信しました','ok');
    }else{
      if(resultBox)resultBox.innerHTML='<div class="alert alert-warn">投稿失敗: '+escapeHtml(jNow.error||'')+'</div>';
      toast('投稿失敗: '+(jNow.error||''),'err');
    }
    return;
  }
  if(mode==='schedule')payload.scheduled_at=scheduledAt;
  const r = await fetch('/api/admin/posts/thread',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});
  const j = await r.json();
  const resultBox=document.getElementById('rak-post-result-'+i);
  if(j.success){
    if(resultBox)resultBox.innerHTML='<div class="alert alert-ok">'+(mode==='schedule'?'一括予約しました: '+escapeHtml(scheduledAt||''):'下書き保存しました')+'</div>';
    toast(mode==='schedule'?'一括予約しました':'下書き保存しました','ok');
  }else{
    if(resultBox)resultBox.innerHTML='<div class="alert alert-warn">保存失敗: '+escapeHtml(j.error||'')+'</div>';
    toast('保存失敗: '+(j.error||''),'err');
  }
}
function escapeHtml(s){return String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);}
<\/script>`;
}
__name(ge365xRakutenPage, "ge365xRakutenPage");
function ge365xBuzzPage(e) {
  if (!e.isPro) return ge365xProLockPage("バズリサーチAI");
  return `
<div class="space-y-4">
  <div>
    <h1 class="section-title"><i class="fas fa-chart-simple"></i>バズリサーチAI</h1>
    <p class="section-desc">テーマからXで伸びている投稿とアカウントを探し、バズ要素を分析します。</p>
  </div>
  <div class="card space-y-4">
    <h3 class="font-bold text-ink"><i class="fas fa-magnifying-glass-chart"></i> バズ投稿を探す</h3>
    <div style="display:grid;grid-template-columns:1fr;gap:1rem">
      <div><label class="field-label">テーマ・キーワード</label><input id="buzz-theme" class="inp" placeholder="例: ユニクロ 夏 / AI自動化 副業"></div>
    </div>
    <div style="display:flex;gap:.75rem;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="searchBuzzAccounts()"><i class="fas fa-fire"></i>バズ投稿を探す</button>
      <button class="btn btn-ghost" onclick="runBuzzTestMode()"><i class="fas fa-vial"></i>X APIなしでテスト確認</button>
    </div>
  </div>
  <details class="card space-y-4" style="padding:0">
    <summary style="cursor:pointer;padding:1rem;font-weight:700;color:#334155">条件を指定してバズ投稿を探す</summary>
    <div class="space-y-4" style="padding:0 1rem 1rem">
      <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;gap:1rem">
        <div><label class="field-label">含めたい言葉</label><textarea id="buzz-extra-keywords" class="inp" style="min-height:110px" placeholder="例: 限定価格&#10;レビュー高評価&#10;夏コーデ"></textarea></div>
        <div><label class="field-label">最低推定閲覧数</label><input id="buzz-min-impressions" class="inp" type="number" min="0" value="100000"></div>
        <div><label class="field-label">最低いいね</label><input id="buzz-min-likes" class="inp" type="number" min="0" value="0"></div>
        <div><label class="field-label">最低リポスト</label><input id="buzz-min-retweets" class="inp" type="number" min="0" value="0"></div>
        <div><label class="field-label">投稿後の経過分</label><input id="buzz-min-age" class="inp" type="number" min="0" value="0"></div>
        <div><label class="field-label">表示件数</label><input id="buzz-limit" class="inp" type="number" min="10" max="100" value="20"></div>
      </div>
      <button class="btn btn-ghost" onclick="searchBuzzAccounts()"><i class="fas fa-fire"></i>この条件で投稿を探す</button>
    </div>
  </details>
  <details class="card space-y-4" style="padding:0">
    <summary style="cursor:pointer;padding:1rem;font-weight:700;color:#334155">X API停止中の手動バズ分析</summary>
    <div class="space-y-3" style="padding:0 1rem 1rem">
      <div class="alert alert-info text-sm">X APIが上限で止まっている間も、投稿文・閲覧数・いいね・リポストを貼り付けてバズスコア化できます。</div>
      <textarea id="buzz-manual-posts" class="inp" style="min-height:170px" placeholder="1行に1投稿: 投稿文 | 閲覧数 | いいね | リポスト | URL&#10;例: 夏のユニクロ新作が便利すぎる | 120000 | 900 | 120 | https://x.com/..."></textarea>
      <button class="btn btn-primary" onclick="analyzeManualBuzz()"><i class="fas fa-chart-line"></i>手動データを分析</button>
    </div>
  </details>
  <div id="buzz-result" class="space-y-3"></div>
</div>
<script>
async function searchBuzzAccounts(){
  const theme=document.getElementById('buzz-theme').value.trim();
  if(!theme){toast('テーマを入力してください','err');return;}
  const limit=Number(document.getElementById('buzz-limit')?.value||20);
  const extra=document.getElementById('buzz-extra-keywords')?.value.trim()||'';
  const minImpressions=Number(document.getElementById('buzz-min-impressions')?.value||100000);
  const minLikes=Number(document.getElementById('buzz-min-likes')?.value||0);
  const minRetweets=Number(document.getElementById('buzz-min-retweets')?.value||0);
  const minAgeMinutes=Number(document.getElementById('buzz-min-age')?.value||0);
  const box=document.getElementById('buzz-result');
  box.innerHTML='<div class="card text-sm text-ink-muted">Xから条件に合うバズ投稿を検索中...</div>';
  const r=await fetch('/api/admin/buzz-research/search?'+new URLSearchParams({theme,limit:String(limit),extra,min_impressions:String(minImpressions),min_likes:String(minLikes),min_retweets:String(minRetweets),min_age_minutes:String(minAgeMinutes)}));
  const j=await r.json();
  if(!j.success){
    const url='https://x.com/search?q='+encodeURIComponent(theme+' min_faves:100')+'&src=typed_query&f=live';
    box.innerHTML='<div class="alert alert-warn">'+escapeHtml(j.error||'検索失敗')+'</div><div class="card"><h3 class="font-bold mb-2">X検索で確認</h3><p class="text-sm text-ink-muted">X APIで取得できない場合は、この検索リンクから伸びている投稿を確認できます。</p><a class="btn btn-primary mt-2" href="'+url+'" target="_blank">Xでバズ投稿を探す</a></div>';
    return;
  }
  renderBuzzAccounts(j);
}
function analyzeManualBuzz(){
  const raw=document.getElementById('buzz-manual-posts')?.value||'';
  const rows=raw.split('\\n').map(x=>x.trim()).filter(Boolean);
  if(!rows.length){toast('投稿データを入力してください','err');return;}
  const posts=rows.map((line,i)=>{
    const cols=line.split('|').map(x=>x.trim());
    const text=cols[0]||'';
    const impressions=Number((cols[1]||'0').replace(/,/g,''))||0;
    const likes=Number((cols[2]||'0').replace(/,/g,''))||0;
    const retweets=Number((cols[3]||'0').replace(/,/g,''))||0;
    const url=cols[4]||'#';
    const replies=0, quotes=0;
    const buzz_score=Math.round(impressions*0.01 + likes*2 + retweets*6);
    return {id:'manual-'+i,text,username:'手動入力',name:'Manual',likes,retweets,replies,quotes,impressions,buzz_score,url,impressions_is_estimated:false,age_minutes:0};
  }).filter(p=>p.text).sort((a,b)=>b.buzz_score-a.buzz_score);
  renderBuzzAccounts({success:true,source:'manual',theme:'手動分析',accounts:[],posts,total_fetched:posts.length,manual:true});
}
async function runBuzzTestMode(){
  const theme=document.getElementById('buzz-theme').value.trim()||'テスト';
  const box=document.getElementById('buzz-result');
  box.innerHTML='<div class="card text-sm text-ink-muted">X APIを使わずテストデータで確認中...</div>';
  const r=await fetch('/api/admin/buzz-research/test-mode?'+new URLSearchParams({theme}));
  const j=await r.json();
  if(!j.success){box.innerHTML='<div class="alert alert-warn">'+escapeHtml(j.error||'テスト確認失敗')+'</div>';return;}
  renderBuzzAccounts(j);
}
function renderBuzzAccounts(j){
  const box=document.getElementById('buzz-result');
  const accounts=j.accounts||[];
  const posts=j.posts||[];
  const reason=(j.analysis||'').split('\\n')[0]||'X APIで取得できませんでした';
  const sourceHtml=j.test_mode?'<div class="alert alert-info"><b>テスト確認モード</b><br>X APIを使わず、固定データでバズ投稿抽出・スコア化・表示を確認しました。</div>':j.manual?'<div class="alert alert-info">手動入力データをバズスコア順に分析しました。</div>':j.x_api_blocked?'<div class="alert alert-warn"><b>X APIでブロック中です。</b><br>'+escapeHtml(reason)+'<br>GE365X側では解除できません。X Developer PortalでBilling / Spend capを上げるか、次回請求サイクル開始後に再実行してください。上の「手動バズ分析」で開発確認は継続できます。</div>':j.fallback?'<div class="alert alert-warn">X APIから実データを取得できません: '+escapeHtml(reason)+'</div>':'';
  const accountHtml=accounts.length?accounts.map((a,i)=>'<div class="card" style="padding:1rem"><div style="display:flex;justify-content:space-between;gap:1rem;align-items:flex-start"><div><div class="font-bold">'+(i+1)+'. @'+escapeHtml(a.username||'')+'</div><div class="text-sm text-ink-muted">'+escapeHtml(a.name||'')+'</div><div class="text-xs text-ink-muted mt-1">フォロワー '+(a.followers||0)+' / 対象投稿 '+(a.post_count||0)+'</div></div><div class="text-right"><div class="text-2xl font-bold" style="color:#2563eb">'+(a.buzz_score||0)+'</div><div class="text-xs text-ink-muted">バズスコア</div></div></div><div class="mt-2 text-sm">いいね '+(a.likes||0)+' / リポスト '+(a.retweets||0)+' / 返信 '+(a.replies||0)+'</div><a class="btn btn-ghost btn-sm mt-2" href="https://x.com/'+escapeHtml(a.username||'')+'" target="_blank">アカウントを見る</a></div>').join(''):'<div class="alert alert-warn">候補アカウントがありません。</div>';
  const relaxedHtml=j.relaxed?'<div class="alert alert-warn">指定条件なしのため、X APIで取得できた投稿をバズスコア順に表示しています。</div>':'';
  const postHtml=j.x_api_blocked?'<div class="alert alert-warn">X APIが課金上限で停止しているため、バズ投稿の自動取得は実行できません。</div>':posts.length?posts.slice(0,10).map((p)=>'<div class="card" style="padding:1rem"><div class="text-sm">'+escapeHtml(p.text||'')+'</div><div class="text-xs text-ink-muted mt-2">@'+escapeHtml(p.username||'')+' / いいね '+(p.likes||0)+' / リポスト '+(p.retweets||0)+' / 返信 '+(p.replies||0)+' / '+(p.impressions_is_estimated?'推定閲覧 ':'閲覧 ') +(p.impressions||0)+' / 投稿後 '+(p.age_minutes||0)+'分 / スコア '+(p.buzz_score||0)+'</div><a class="btn btn-primary btn-sm mt-2" href="'+escapeHtml(p.url||'#')+'" target="_blank">バズ投稿を見る</a></div>').join(''):'<div class="alert alert-warn">条件に合う投稿がありません。現在のX APIで取得できる数値から、最低推定閲覧数10万以上に届く投稿だけを表示しています。条件を下げる場合は「条件を指定してバズ投稿を探す」で変更してください。</div>';
  box.innerHTML=sourceHtml+relaxedHtml+'<div class="card"><h3 class="font-bold mb-3">バズ投稿</h3><div class="space-y-3">'+postHtml+'</div></div><div class="card"><h3 class="font-bold mb-3">投稿元アカウント</h3><div class="space-y-3">'+accountHtml+'</div></div>';
}
function escapeHtml(s){return String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);}
<\/script>`;
}
__name(ge365xBuzzPage, "ge365xBuzzPage");
var H = new A();
async function gn(e, t) {
  const { results: s } = await e.env.DB.prepare(`SELECT id, account_name, x_username, is_current
       FROM x_accounts WHERE user_id = ? AND is_active = 1 ORDER BY id`).bind(t.id).all(), a = (s || []).map((i) => ({ id: i.id, account_name: i.account_name, x_username: i.x_username })), n = (s || []).find((i) => i.is_current === 1);
  return { accounts: a, currentAccountId: (n == null ? void 0 : n.id) ?? null };
}
__name(gn, "gn");
H.get("/", (e) => e.redirect("/login"));
async function K(e, t, s) {
  const a = e.get("user"), { accounts: n, currentAccountId: i } = await gn(e, a), r = n.length > 0 && i !== null, o = await Promise.resolve(s({ user: a, hasAccount: r, accounts: n, currentAccountId: i })), d = an({ active: t, user: a, accounts: n, currentAccountId: i, pageBody: o });
  return e.html(It("GE365x", d));
}
__name(K, "K");
H.get("/dashboard", mPage, async (e) => K(e, "dashboard", async ({ user: t, hasAccount: s }) => {
  const a = await e.env.DB.prepare("SELECT COUNT(*) AS n FROM x_accounts WHERE user_id=?").bind(t.id).first(), n = await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_logs WHERE user_id=? AND DATE(created_at)=DATE('now','+9 hours') AND status='posted'").bind(t.id).first(), i = await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_queue WHERE user_id=? AND status IN ('pending','approved')").bind(t.id).first(), r = await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_logs WHERE user_id=? AND status='failed' AND DATE(created_at)=DATE('now','+9 hours')").bind(t.id).first(), { results: o } = await e.env.DB.prepare(`SELECT id, account_name, x_username, account_health_score, health_status, is_active
         FROM x_accounts WHERE user_id = ? ORDER BY id`).bind(t.id).all(), { results: d } = await e.env.DB.prepare(`SELECT pl.content, pl.status, pl.posted_at, xa.x_username
         FROM post_logs pl LEFT JOIN x_accounts xa ON xa.id = pl.account_id
         WHERE pl.user_id = ? AND pl.status = 'posted'
         ORDER BY pl.id DESC LIMIT 5`).bind(t.id).all();
  return nn({ stats: { accounts: (a == null ? void 0 : a.n) ?? 0, today: (n == null ? void 0 : n.n) ?? 0, pending: (i == null ? void 0 : i.n) ?? 0, failed: (r == null ? void 0 : r.n) ?? 0 }, health: o || [], recentLogs: d || [] });
}));
H.get("/dashboard/target", mPage, async (e) => K(e, "target", async ({ user: t, currentAccountId: s, hasAccount: a }) => {
  const n = String(s ?? "default"), i = await e.env.DB.prepare("SELECT * FROM target_templates WHERE account_id=? AND user_id=? LIMIT 1").bind(n, t.id).first();
  return rn({ target: i, hasAccount: a, noAccountAlert: he });
}));
H.get("/dashboard/voice", mPage, async (e) => K(e, "voice", async ({ user: t, currentAccountId: s, hasAccount: a }) => {
  const n = String(s ?? "default"), i = await e.env.DB.prepare("SELECT * FROM brand_voice WHERE account_id=? AND user_id=? LIMIT 1").bind(n, t.id).first();
  return on2({ voice: i, hasAccount: a, noAccountAlert: he });
}));
H.get("/dashboard/pattern", mPage, async (e) => K(e, "pattern", async ({ user: t, hasAccount: s, currentAccountId: a, accounts: n }) => {
  const i = String(a ?? "default"), r = await e.env.DB.prepare("SELECT age_range, gender FROM target_templates WHERE account_id=? AND user_id=? LIMIT 1").bind(i, t.id).first(), o = await e.env.DB.prepare("SELECT tone FROM brand_voice WHERE account_id=? AND user_id=? LIMIT 1").bind(i, t.id).first(), d = n.find((l) => l.id === a);
  return dn({ hasAccount: s, noAccountAlert: he, target: r, voice: o, currentAcct: d });
}));
H.get("/dashboard/generate", mPage, async (e) => K(e, "generate", ({ hasAccount: t }) => ln({ hasAccount: t, noAccountAlert: he })));
H.get("/dashboard/posts", mPage, async (e) => K(e, "posts", async ({ user: t, hasAccount: s }) => {
  const n = e.req.query("month") || (/* @__PURE__ */ new Date()).toISOString().slice(0, 7), [i, r] = n.split("-"), { results: o } = await e.env.DB.prepare(`SELECT pq.id, pq.body, pq.post_mode, pq.status, pq.account_id, pq.scheduled_at, xa.x_username
         FROM post_queue pq LEFT JOIN x_accounts xa ON xa.id = pq.account_id
        WHERE pq.user_id = ?
          AND strftime('%Y-%m', COALESCE(pq.posted_at, pq.scheduled_at, pq.created_at)) = ?
        ORDER BY pq.id DESC LIMIT 200`).bind(t.id, n).all(), d = (o || []).length, c = (o || []).filter((_) => _.status === "posted").length, p = (o || []).filter((_) => _.status === "failed" || _.status === "rejected" || _.status === "error").length, sched = (o || []).filter((_) => (_.status === "approved" || _.status === "pending" || _.status === "publishing") && _.scheduled_at).length, drft = (o || []).filter((_) => _.status === "draft").length, l = (o || []).filter((_) => (_.status === "pending" || _.status === "approved") && !_.scheduled_at).length;
  return cn({ hasAccount: s, noAccountAlert: he, month: n, y: i, m: parseInt(r, 10), posts: o || [], stats: { total: d, pending: l, posted: c, failed: p, scheduled: sched, draft: drft } });
}));
H.get("/dashboard/thread", mPage, async (e) => K(e, "thread", async ({ user: t, hasAccount: s }) => {
  const { results: a } = await e.env.DB.prepare(`SELECT pq.id, pq.body, pq.status, pq.posted_at, pq.created_at, pq.thread_parent_id
         FROM post_queue pq
        WHERE pq.user_id = ? AND pq.post_mode = 'thread' AND pq.thread_parent_id IS NOT NULL
        ORDER BY pq.id DESC LIMIT 30`).bind(t.id).all();
  return un({ hasAccount: s, noAccountAlert: he, history: a || [] });
}));
H.get("/dashboard/scheduled", mPage, async (e) => K(e, "scheduled", async ({ user: t, hasAccount: s }) => {
  const { results: a } = await e.env.DB.prepare(`SELECT pq.id, pq.body, pq.scheduled_at, pq.status, xa.x_username
         FROM post_queue pq LEFT JOIN x_accounts xa ON xa.id = pq.account_id
        WHERE pq.user_id = ? AND pq.scheduled_at IS NOT NULL
          AND pq.status NOT IN ('cancelled','rejected')
        ORDER BY pq.scheduled_at ASC LIMIT 100`).bind(t.id).all();
  return mn({ hasAccount: s, noAccountAlert: he, scheduled: a || [] });
}));
H.get("/dashboard/autopilot", mPage, async (e) => K(e, "autopilot", async ({ user: t, hasAccount: s, accounts: a }) => {
  const { results: n } = await e.env.DB.prepare(`SELECT aj.*, xa.x_username FROM autopilot_jobs aj
         LEFT JOIN x_accounts xa ON xa.id = aj.account_id
        WHERE aj.user_id = ?
        ORDER BY COALESCE(aj.publish_at, aj.generate_at, aj.created_at) DESC LIMIT 50`).bind(t.id).all();
  return _n({ hasAccount: s, noAccountAlert: he, accounts: a, jobs: n || [] });
}));
H.get("/dashboard/accounts", mPage, async (e) => K(e, "accounts", async ({ user: t }) => {
  const { results: s } = await e.env.DB.prepare(`SELECT id, account_name, x_username, account_health_score, health_status,
              daily_post_count, daily_post_limit, last_posted_at, is_active
         FROM x_accounts WHERE user_id = ? ORDER BY id DESC`).bind(t.id).all();
  return hn({ accounts: s || [] });
}));
H.get("/dashboard/api", mPage, async (e) => K(e, "api", async ({ user: t }) => {
  const s = await e.env.DB.prepare("SELECT * FROM x_api_settings WHERE user_id = ? ORDER BY id DESC LIMIT 1").bind(t.id).first();
  let xKeyDec = "", xSecDec = "";
  if (s) {
    try {
      xKeyDec = s.api_key ? await lt(s.api_key, e.env.ENCRYPTION_KEY) : "";
    } catch {
    }
    try {
      xSecDec = s.api_secret ? await lt(s.api_secret, e.env.ENCRYPTION_KEY) : "";
    } catch {
    }
  }
  const { results: ss2 } = await e.env.DB.prepare("SELECT key, value FROM system_settings WHERE key IN ('openai_api_key','openai_model','gemini_model','gemini_api_key','telegram_bot_token','telegram_chat_id','x_bearer_token')").all();
  const sm = {};
  for (const r of ss2 || []) sm[r.key] = r.value;
  const rak = await ge365xLoadRakutenSettings(e, t.id, false);
  return bn({ settings: { api_key: xKeyDec, api_secret: xSecDec, api_key_set: !!xKeyDec, api_secret_set: !!xSecDec, x_bearer_token_set: !!((s == null ? void 0 : s.bearer_token) || sm.x_bearer_token), openai_api_key: sm.openai_api_key || "", openai_model: sm.openai_model || "", gemini_api_key: sm.gemini_api_key || "", gemini_model: sm.gemini_model || "", telegram_bot_token: sm.telegram_bot_token || "", telegram_chat_id: sm.telegram_chat_id || "", rakuten_application_url: rak.application_url || "", rakuten_app_id: rak.rakuten_app_id || "", rakuten_application_id: rak.application_id || "", rakuten_affiliate_id: rak.affiliate_id || "", rakuten_access_key_set: !!rak.has_access_key } });
}));
H.get("/dashboard/buzz-research", mPage, async (e) => K(e, "buzz", async ({ user: t }) => ge365xBuzzPage({ isPro: ge365xIsProUser(t) })));
H.get("/dashboard/rakuten", mPage, async (e) => K(e, "rakuten", async ({ user: t }) => {
  const s = await ge365xLoadRakutenSettings(e, t.id);
  return ge365xRakutenPage({ isPro: ge365xIsProUser(t), settings: s });
}));
H.get("/dashboard/export", mPage, async (e) => K(e, "export", ({ user: t }) => fn({ isAdmin: t.is_admin })));
var F = new A();
F.post("/api/admin/cron/run-tick", m, R, async (e) => {
  try {
    const r = await S.fetch(new Request("https://internal/cron/tick", { method: "POST" }), e.env, e.executionCtx);
    const j2 = await r.json().catch(() => ({}));
    return e.json({ success: true, kind: "tick", result: j2 });
  } catch (err) {
    return e.json({ success: false, error: err.message }, 500);
  }
});
F.post("/api/admin/cron/run-autopilot", m, R, async (e) => {
  try {
    const r = await S.fetch(new Request("https://internal/cron/autopilot-tick", { method: "POST" }), e.env, e.executionCtx);
    const j2 = await r.json().catch(() => ({}));
    return e.json({ success: true, kind: "autopilot", result: j2 });
  } catch (err) {
    return e.json({ success: false, error: err.message }, 500);
  }
});
F.get("/admin", mPage, R, (e) => {
  const t = `
<div class="min-h-screen flex flex-col">
  <!-- \u30D8\u30C3\u30C0 -->
  <header class="border-b border-brand-800/40 bg-surface-raised/80 backdrop-blur">
    <div class="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
      <div class="flex items-center gap-3">
        <div class="brand-logo w-10 h-10 rounded-xl flex items-center justify-center">
          <i class="fas ${G.icon} text-white"></i>
        </div>
        <div>
          <div class="text-white font-bold tracking-tight">${G.name} <span class="text-brand-400 text-xs font-normal">\u7BA1\u7406</span></div>
          <div class="text-brand-400 text-xs">${G.longName}</div>
        </div>
      </div>
      <div class="flex items-center gap-3 text-sm">
        <button onclick="dlAdminExport('admin/all')" class="btn-ghost" title="\u7BA1\u7406\u8005\u5168\u30C7\u30FC\u30BFJSON"><i class="fas fa-download"></i>\u5168\u30C7\u30FC\u30BFDL</button>
        <a href="/dashboard" class="btn-ghost"><i class="fas fa-gauge"></i>\u30C0\u30C3\u30B7\u30E5\u30DC\u30FC\u30C9</a>
        <button onclick="doLogout()" class="btn-ghost"><i class="fas fa-right-from-bracket"></i>\u30ED\u30B0\u30A2\u30A6\u30C8</button>
      </div>
    </div>
  </header>

  <!-- \u30BF\u30D6 -->
  <nav class="border-b border-brand-800/40 bg-surface">
    <div class="max-w-7xl mx-auto flex gap-1 px-6 py-2 overflow-x-auto">
      <button onclick="showSection('users')"     id="nav-users"     class="tab-trigger active">\u30E6\u30FC\u30B6\u30FC</button>
      <button onclick="showSection('licenses')"  id="nav-licenses"  class="tab-trigger">\u30E9\u30A4\u30BB\u30F3\u30B9</button>
      <button onclick="showSection('subs')"      id="nav-subs"      class="tab-trigger">\u30B5\u30D6\u30B9\u30AF\u30EA\u30D7\u30B7\u30E7\u30F3</button>
      <button onclick="showSection('posts')"     id="nav-posts"     class="tab-trigger">\u6295\u7A3F\u7BA1\u7406</button>
      <button onclick="showSection('accounts')"  id="nav-accounts"  class="tab-trigger">X\u30A2\u30AB\u30A6\u30F3\u30C8</button>
      <button onclick="showSection('audit')"     id="nav-audit"     class="tab-trigger">\u76E3\u67FB\u30ED\u30B0</button>
      <button onclick="showSection('settings')"  id="nav-settings"  class="tab-trigger">\u30B7\u30B9\u30C6\u30E0\u8A2D\u5B9A</button>
    </div>
  </nav>

  <main class="flex-1 max-w-7xl mx-auto w-full px-6 py-8 space-y-6">

    <!-- === \u30E6\u30FC\u30B6\u30FC === -->
    <section id="section-users" class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-white">\u30E6\u30FC\u30B6\u30FC\u4E00\u89A7</h2>
        <div class="flex gap-2">
          <select id="users-filter" class="input-field w-auto" onchange="loadUsers()">
            <option value="all">\u5168\u3066</option>
            <option value="pending">\u627F\u8A8D\u5F85\u3061</option>
            <option value="approved">\u627F\u8A8D\u6E08</option>
            <option value="admin">\u7BA1\u7406\u8005</option>
          </select>
          <button onclick="loadUsers()" class="btn-ghost"><i class="fas fa-rotate"></i></button>
          <button onclick="dlAdminExport('admin/users')" class="btn-ghost" title="\u30E6\u30FC\u30B6\u30FC\u4E00\u89A7CSV"><i class="fas fa-download"></i></button>
        </div>
      </div>
      <div class="card overflow-x-auto">
        <table class="data-table" id="users-table">
          <thead><tr>
            <th>ID</th><th>\u30E1\u30FC\u30EB</th><th>\u627F\u8A8D</th><th>\u7BA1\u7406\u8005</th><th>\u30D7\u30E9\u30F3</th>
            <th>\u30E9\u30A4\u30BB\u30F3\u30B9</th><th>\u30B9\u30C6\u30FC\u30BF\u30B9</th><th>\u30C8\u30E9\u30A4\u30A2\u30EB\u7D42\u4E86</th><th>\u767B\u9332\u65E5</th><th>\u64CD\u4F5C</th>
          </tr></thead>
          <tbody id="users-tbody"><tr><td colspan="10" class="text-center text-brand-400 py-8">\u8AAD\u8FBC\u4E2D...</td></tr></tbody>
        </table>
      </div>
    </section>

    <!-- === \u30E9\u30A4\u30BB\u30F3\u30B9 === -->
    <section id="section-licenses" class="space-y-4 hidden-force">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-white">\u30E9\u30A4\u30BB\u30F3\u30B9\u30AD\u30FC\u7BA1\u7406</h2>
        <div class="flex gap-2">
          <button onclick="dlAdminExport('admin/licenses')" class="btn-ghost" title="\u30E9\u30A4\u30BB\u30F3\u30B9CSV"><i class="fas fa-download"></i></button>
          <button onclick="deleteUnlinkedTestLicenses()" class="btn-danger" title="\u767B\u9332\u30E1\u30FC\u30EB\u306E\u306A\u3044\u30C6\u30B9\u30C8\u30AD\u30FC\u3092\u524A\u9664">
            <i class="fas fa-broom"></i>\u30E1\u30FC\u30EB\u306A\u3057\u30C6\u30B9\u30C8\u524A\u9664
          </button>
          <button onclick="openIssueLicenseModal()" class="btn-primary">
            <i class="fas fa-plus"></i>\u65B0\u898F\u767A\u884C
          </button>
        </div>
      </div>
      <div class="card overflow-x-auto">
        <table class="data-table admin-license-table">
          <thead><tr>
            <th>ID</th><th>\u30AD\u30FC</th><th>\u7A2E\u5225</th><th>\u30D7\u30E9\u30F3</th><th>\u72B6\u614B</th>
            <th>\u767B\u9332\u30E1\u30FC\u30EB</th><th>\u8A8D\u8A3C\u30E6\u30FC\u30B6\u30FC</th><th>\u6709\u52B9\u671F\u9650</th><th>\u767A\u884C\u65E5</th><th>\u64CD\u4F5C</th>
          </tr></thead>
          <tbody id="licenses-tbody"><tr><td colspan="10" class="text-center text-brand-400 py-8">\u8AAD\u8FBC\u4E2D...</td></tr></tbody>
        </table>
      </div>

      <!-- \u767A\u884C\u30E2\u30FC\u30C0\u30EB -->
      <div id="issue-license-modal" class="fixed inset-0 bg-black/70 hidden items-center justify-center z-50 p-4">
        <div class="card max-w-md w-full" style="max-height:90vh;overflow-y:auto">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-white">\u65B0\u898F\u30E9\u30A4\u30BB\u30F3\u30B9\u767A\u884C</h3>
            <button onclick="closeIssueLicenseModal()" class="btn-ghost text-xs" title="\u9589\u3058\u308B"><i class="fas fa-xmark"></i></button>
          </div>
          <div class="space-y-4">
            <div>
              <label class="text-sm text-brand-300 mb-1 block">\u767B\u9332\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9</label>
              <input type="email" id="issue-email" class="input-field" placeholder="customer@example.com" required>
              <div class="text-xs text-brand-400 mt-1">\u767A\u884C\u3059\u308B\u30E1\u30FC\u30EB\u3068\u30E9\u30A4\u30BB\u30F3\u30B9\u30AD\u30FC\u3092\u540C\u6642\u306B\u56FA\u5B9A\u8868\u793A\u3057\u307E\u3059\u3002</div>
            </div>
            <div>
              <label class="text-sm text-brand-300 mb-1 block">\u30D7\u30E9\u30F3</label>
              <select id="issue-plan" class="input-field">
                <option value="ge365x_free">Free</option>
                <option value="ge365x_standard" selected>Standard</option>
                <option value="ge365x_pro">Pro</option>
              </select>
            </div>
            <div>
              <label class="text-sm text-brand-300 mb-1 block">\u7A2E\u5225</label>
              <select id="issue-type" class="input-field">
                <option value="paid" selected>paid\uFF08\u6709\u6599\uFF09</option>
                <option value="trial">trial\uFF08\u8A66\u7528\uFF09</option>
                <option value="lifetime">lifetime\uFF08\u6C38\u4E45\uFF09</option>
                <option value="comp">comp\uFF08\u62DB\u5F85\uFF09</option>
              </select>
            </div>
            <div>
              <label class="text-sm text-brand-300 mb-1 block">\u6709\u52B9\u671F\u9650\uFF08\u7701\u7565\u53EF\uFF09</label>
              <input type="date" id="issue-expires" class="input-field">
            </div>
            <div>
              <label class="text-sm text-brand-300 mb-1 block">\u767A\u884C\u6570</label>
              <input type="number" id="issue-count" class="input-field" value="1" min="1" max="100">
            </div>
            <div>
              <label class="text-sm text-brand-300 mb-1 block">\u30E1\u30E2</label>
              <input type="text" id="issue-note" class="input-field" placeholder="\u7528\u9014\u30FB\u9867\u5BA2\u540D\u306A\u3069">
            </div>
            <div class="flex gap-2">
              <button onclick="closeIssueLicenseModal()" class="btn-ghost flex-1">\u30AD\u30E3\u30F3\u30BB\u30EB</button>
              <button onclick="submitIssueLicense()" class="btn-primary flex-1">
                <i class="fas fa-key"></i>\u767A\u884C
              </button>
            </div>
            <div id="issue-result" class="hidden bg-surface border border-brand-700/40 rounded-lg p-3 font-mono text-xs text-brand-200"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- === \u30B5\u30D6\u30B9\u30AF === -->
    <section id="section-subs" class="space-y-4 hidden-force">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-white">\u30B5\u30D6\u30B9\u30AF\u30EA\u30D7\u30B7\u30E7\u30F3</h2>
        <button onclick="dlAdminExport('admin/subs')" class="btn-ghost" title="\u30B5\u30D6\u30B9\u30AF\u30EA\u30D7\u30B7\u30E7\u30F3CSV"><i class="fas fa-download"></i></button>
      </div>
      <div class="card overflow-x-auto">
        <table class="data-table">
          <thead><tr>
            <th>ID</th><th>\u30E6\u30FC\u30B6\u30FC</th><th>\u30D7\u30E9\u30F3</th><th>\u72B6\u614B</th>
            <th>\u958B\u59CB</th><th>\u671F\u9650</th><th>\u81EA\u52D5\u66F4\u65B0</th>
          </tr></thead>
          <tbody id="subs-tbody"><tr><td colspan="7" class="text-center text-brand-400 py-8">\u8AAD\u8FBC\u4E2D...</td></tr></tbody>
        </table>
      </div>
    </section>

    <!-- === \u6295\u7A3F\u7BA1\u7406 === -->
    <section id="section-posts" class="space-y-4 hidden-force">
      <h2 class="text-xl font-bold text-white">\u6295\u7A3F\u30AD\u30E5\u30FC / \u30ED\u30B0</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4" id="posts-stats"></div>
      <div class="card overflow-x-auto">
        <h3 class="text-white font-semibold mb-3">\u6700\u8FD1\u306E\u6295\u7A3F\u30ED\u30B0</h3>
        <table class="data-table">
          <thead><tr>
            <th>\u6642\u523B</th><th>\u30E6\u30FC\u30B6\u30FC</th><th>\u30A2\u30AB\u30A6\u30F3\u30C8</th><th>\u672C\u6587</th><th>\u72B6\u614B</th>
          </tr></thead>
          <tbody id="posts-tbody"><tr><td colspan="5" class="text-center text-brand-400 py-8">\u8AAD\u8FBC\u4E2D...</td></tr></tbody>
        </table>
      </div>
    </section>

    <!-- === X\u30A2\u30AB\u30A6\u30F3\u30C8 === -->
    <section id="section-accounts" class="space-y-4 hidden-force">
      <h2 class="text-xl font-bold text-white">X \u30A2\u30AB\u30A6\u30F3\u30C8</h2>
      <div class="card overflow-x-auto">
        <table class="data-table">
          <thead><tr>
            <th>ID</th><th>\u30E6\u30FC\u30B6\u30FC</th><th>@handle</th><th>\u72B6\u614B</th>
            <th>\u6700\u7D42\u4F7F\u7528</th><th>\u30C8\u30FC\u30AF\u30F3\u671F\u9650</th>
          </tr></thead>
          <tbody id="accounts-tbody"><tr><td colspan="6" class="text-center text-brand-400 py-8">\u8AAD\u8FBC\u4E2D...</td></tr></tbody>
        </table>
      </div>
    </section>

    <!-- === \u76E3\u67FB\u30ED\u30B0 === -->
    <section id="section-audit" class="space-y-4 hidden-force">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-white">\u8A8D\u8A3C\u30FB\u76E3\u67FB\u30ED\u30B0</h2>
        <button onclick="dlAdminExport('admin/audit')" class="btn-ghost" title="\u76E3\u67FB\u30ED\u30B0CSV"><i class="fas fa-download"></i></button>
      </div>
      <div class="card overflow-x-auto">
        <table class="data-table">
          <thead><tr>
            <th>\u6642\u523B</th><th>\u30E6\u30FC\u30B6\u30FC</th><th>\u30A4\u30D9\u30F3\u30C8</th><th>IP</th><th>User Agent</th>
          </tr></thead>
          <tbody id="audit-tbody"><tr><td colspan="5" class="text-center text-brand-400 py-8">\u8AAD\u8FBC\u4E2D...</td></tr></tbody>
        </table>
      </div>
    </section>

    <!-- === \u30B7\u30B9\u30C6\u30E0\u8A2D\u5B9A === -->
    <section id="section-settings" class="space-y-4 hidden-force">
      <h2 class="text-xl font-bold text-white">\u30B7\u30B9\u30C6\u30E0\u8A2D\u5B9A</h2>
      <div class="card">
        <div class="space-y-4" id="settings-form"></div>
      </div>
    </section>

  </main>
</div>

<script>
const sections = ['users','licenses','subs','posts','accounts','audit','settings'];
const loaders = {
  users: loadUsers, licenses: loadLicenses, subs: loadSubs,
  posts: loadPosts, accounts: loadAccounts, audit: loadAudit, settings: loadSettings
};

function showSection(name) {
  sections.forEach(s => {
    document.getElementById('nav-' + s).classList.toggle('active', s === name);
    document.getElementById('section-' + s).classList.toggle('hidden-force', s !== name);
  });
  if (loaders[name]) loaders[name]();
}

async function doLogout() {
  await fetch('/api/auth/logout', { method: 'POST' });
  location.href = '/login';
}

// ---------- \u30E6\u30FC\u30B6\u30FC ----------
async function loadUsers() {
  const filter = document.getElementById('users-filter').value;
  const r = await fetch('/api/admin/users?filter=' + filter);
  const j = await r.json();
  const tbody = document.getElementById('users-tbody');
  if (!j.users || !j.users.length) {
    tbody.innerHTML = '<tr><td colspan="10" class="text-center text-brand-400 py-6">\u5BFE\u8C61\u306A\u3057</td></tr>';
    return;
  }
  tbody.innerHTML = j.users.map(u => \`
    <tr>
      <td class="text-brand-300">\${u.id}</td>
      <td>\${u.email}</td>
      <td>\${u.is_approved ? '<span class="pill pill-active">\u627F\u8A8D\u6E08</span>' : '<span class="pill pill-pending">\u4FDD\u7559</span>'}</td>
      <td>\${u.is_admin ? '<i class="fas fa-shield text-brand-400"></i>' : ''}</td>
      <td class="text-xs">
        <div style="display:flex;gap:.35rem;align-items:center;min-width:11rem">
          <select id="user-plan-\${u.id}" class="input-field" style="width:8.5rem;padding:.25rem .35rem;font-size:.75rem">
            <option value="ge365x_free" \${u.plan_code==='ge365x_free'?'selected':''}>Free</option>
            <option value="ge365x_standard" \${u.plan_code==='ge365x_standard'?'selected':''}>Standard</option>
            <option value="ge365x_pro" \${u.plan_code==='ge365x_pro'?'selected':''}>Pro</option>
          </select>
          <button onclick="updateUserPlan(\${u.id})" class="btn-ghost text-xs" title="プラン保存"><i class="fas fa-floppy-disk"></i></button>
        </div>
      </td>
      <td class="font-mono text-xs">\${u.license_key || '-'}</td>
      <td>\${u.sub_status ? '<span class="pill pill-active">'+u.sub_status+'</span>' : '-'}</td>
      <td class="text-xs text-brand-300">\${u.trial_end || '-'}</td>
      <td class="text-xs text-brand-300">\${u.created_at}</td>
      <td><div class="admin-actions">
        \${u.is_approved
          ? \`<button onclick="toggleApprove(\${u.id},0)" class="btn-ghost text-xs"><i class="fas fa-ban"></i></button>\`
          : \`<button onclick="toggleApprove(\${u.id},1)" class="btn-primary text-xs"><i class="fas fa-check"></i></button>\`}
        <button onclick="toggleAdmin(\${u.id},\${u.is_admin?0:1})" class="btn-ghost text-xs">
          <i class="fas fa-shield"></i>
        </button>
        <button onclick="deleteUser(\${u.id}, '\${u.email}')" class="btn-danger text-xs" title="\u524A\u9664"><i class="fas fa-trash"></i></button>
      </div></td>
    </tr>
  \`).join('');
}
async function toggleApprove(id, to) {
  await fetch(\`/api/admin/users/\${id}/approve\`, {
    method: 'POST', headers: {'content-type':'application/json'},
    body: JSON.stringify({ is_approved: to }) });
  loadUsers();
}
async function toggleAdmin(id, to) {
  await fetch(\`/api/admin/users/\${id}/admin\`, {
    method: 'POST', headers: {'content-type':'application/json'},
    body: JSON.stringify({ is_admin: to }) });
  loadUsers();
}
async function updateUserPlan(id) {
  const sel = document.getElementById('user-plan-' + id);
  if (!sel) return;
  const r = await fetch(\`/api/admin/users/\${id}/plan\`, {
    method: 'POST',
    headers: {'content-type':'application/json'},
    body: JSON.stringify({ plan_code: sel.value })
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.ok) {
    alert('プラン変更に失敗しました: ' + (j.error || r.status));
    return;
  }
  loadUsers();
}
async function deleteUser(id, email) {
  if (!confirm(email + ' を削除しますか？\\n関連するライセンスの認証ユーザーは解除されます。')) return;
  const r = await fetch(\`/api/admin/users/\${id}\`, { method: 'DELETE' });
  if (!r.ok) { const j = await r.json().catch(()=>({})); alert('\u524A\u9664\u5931\u6557: ' + (j.error || r.status)); return; }
  loadUsers();
  loadLicenses();
}

// ---------- \u30E9\u30A4\u30BB\u30F3\u30B9 ----------
async function loadLicenses() {
  const r = await fetch('/api/admin/licenses');
  const j = await r.json();
  const tbody = document.getElementById('licenses-tbody');
  if (!j.licenses || !j.licenses.length) {
    tbody.innerHTML = '<tr><td colspan="10" class="text-center text-brand-400 py-6">\u767A\u884C\u6E08\u30AD\u30FC\u306A\u3057</td></tr>';
    return;
  }
  tbody.innerHTML = j.licenses.map(l => \`
    <tr>
      <td class="text-brand-300">\${l.id}</td>
      <td class="font-mono text-xs">\${l.license_key}</td>
      <td><span class="pill pill-inactive">\${l.license_type}</span></td>
      <td class="text-xs">\${l.plan_code || '-'}</td>
      <td>\${l.is_active ? '<span class="pill pill-active">\u6709\u52B9</span>' : '<span class="pill pill-inactive">\u7121\u52B9</span>'}</td>
      <td class="text-xs">
        <div class="admin-actions">
          <span id="license-email-\${l.id}" data-email="\${l.buyer_email || ''}">\${l.buyer_email || '\u672A\u8A2D\u5B9A'}</span>
          <button onclick="changeLicenseEmail(\${l.id}, '\${l.buyer_email || ''}')" class="btn-ghost text-xs" title="\u30E1\u30FC\u30EB\u5909\u66F4"><i class="fas fa-pen"></i></button>
        </div>
      </td>
      <td class="text-xs">\${l.user_email || (l.buyer_email ? l.buyer_email + ' \uFF08\u767A\u884C\u5148\uFF09' : '-')}</td>
      <td class="text-xs text-brand-300">\${l.expires_at || '\u7121\u671F\u9650'}</td>
      <td class="text-xs text-brand-300">\${l.created_at}</td>
      <td><div class="admin-actions">
        <button onclick="copyKey('\${l.license_key}')" class="btn-ghost text-xs" title="\u30B3\u30D4\u30FC"><i class="fas fa-copy"></i></button>
        <button onclick="sendLicenseMail(\${l.id})" class="btn-ghost text-xs" title="\u30E1\u30FC\u30EB\u9001\u4FE1"><i class="fas fa-envelope"></i></button>
        \${l.is_active
          ? \`<button onclick="revokeLicense(\${l.id})" class="btn-danger text-xs" title="\u7121\u52B9\u5316"><i class="fas fa-ban"></i></button>\`
          : \`<button onclick="reactivateLicense(\${l.id})" class="btn-ghost text-xs" title="\u518D\u6709\u52B9\u5316"><i class="fas fa-check"></i></button>\`}
        <button onclick="deleteLicense(\${l.id}, '\${l.license_key}')" class="btn-danger text-xs" title="\u524A\u9664"><i class="fas fa-trash"></i></button>
      </div></td>
    </tr>
  \`).join('');
}
function copyKey(k) { navigator.clipboard.writeText(k); }
async function saveLicenseEmailValue(id, email) {
  const r = await fetch(\`/api/admin/licenses/\${id}/email\`, {
    method: 'POST', headers: {'content-type':'application/json'},
    body: JSON.stringify({ buyer_email: email || null }),
  });
  if (!r.ok) { const j = await r.json().catch(()=>({})); alert('\u30E1\u30FC\u30EB\u4FDD\u5B58\u5931\u6557: ' + (j.error || r.status)); return; }
  loadLicenses();
  loadUsers();
}
async function changeLicenseEmail(id, currentEmail) {
  const email = prompt('\u767B\u9332\u30E1\u30FC\u30EB\u3092\u5909\u66F4\u3057\u307E\u3059\u3002\\n\u9593\u9055\u3044\u9632\u6B62\u306E\u305F\u3081\u3001\u4FEE\u6B63\u6642\u3060\u3051\u4F7F\u7528\u3057\u3066\u304F\u3060\u3055\u3044\u3002', currentEmail || '');
  if (email === null) return;
  const next = email.trim();
  if (next && !next.includes('@')) { alert('\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u304C\u4E0D\u6B63\u3067\u3059'); return; }
  if (!confirm('\u3053\u306E\u30E9\u30A4\u30BB\u30F3\u30B9\u306E\u767A\u884C\u5148\u3092\\n' + (next || '\u672A\u8A2D\u5B9A') + '\\n\u306B\u5909\u66F4\u3057\u307E\u3059\u304B\uFF1F')) return;
  await saveLicenseEmailValue(id, next);
}
async function sendLicenseMail(id) {
  const email = (document.getElementById('license-email-' + id).dataset.email || '').trim();
  if (!email) { alert('\u767B\u9332\u30E1\u30FC\u30EB\u3092\u5165\u529B\u3057\u3066\u304B\u3089\u9001\u4FE1\u3057\u3066\u304F\u3060\u3055\u3044'); return; }
  const r = await fetch(\`/api/admin/licenses/\${id}/send-mail\`, { method: 'POST' });
  const j = await r.json().catch(()=>({}));
  if (j.ok && j.mail && j.mail.ok) alert('\u30E1\u30FC\u30EB\u9001\u4FE1: OK');
  else alert('\u30E1\u30FC\u30EB\u9001\u4FE1: \u5931\u6557 ' + ((j.mail && (j.mail.error || j.mail.status)) || j.error || r.status));
}
function openIssueLicenseModal() {
  document.getElementById('issue-license-modal').classList.remove('hidden');
  document.getElementById('issue-license-modal').classList.add('flex');
  document.getElementById('issue-result').classList.add('hidden');
}
function closeIssueLicenseModal() {
  document.getElementById('issue-license-modal').classList.add('hidden');
  document.getElementById('issue-license-modal').classList.remove('flex');
}
async function submitIssueLicense() {
  const issueEmail = document.getElementById('issue-email').value.trim();
  if (!issueEmail || !issueEmail.includes('@')) { alert('\u767A\u884C\u5148\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u306F\u5FC5\u9808\u3067\u3059'); return; }
  const body = {
    plan_code: document.getElementById('issue-plan').value,
    license_type: document.getElementById('issue-type').value,
    expires_at: document.getElementById('issue-expires').value || null,
    count: parseInt(document.getElementById('issue-count').value, 10) || 1,
    note: document.getElementById('issue-note').value || null,
    buyer_email: issueEmail,
  };
  const r = await fetch('/api/admin/licenses/issue', {
    method: 'POST', headers: {'content-type':'application/json'},
    body: JSON.stringify(body),
  });
  const j = await r.json();
  if (!r.ok) { alert('\u767A\u884C\u5931\u6557: ' + (j.error || '')); return; }
  const el = document.getElementById('issue-result');
  const mailStatus = (j.mail || []).map(m => m && m.ok ? '\u30E1\u30FC\u30EB\u9001\u4FE1: OK' : '\u30E1\u30FC\u30EB\u9001\u4FE1: \u5931\u6557' + (m && (m.error || m.status) ? ' (' + (m.error || m.status) + ')' : ''));
  const pairs = (j.keys || []).map((key, idx) => '\u767A\u884C\u5148: ' + issueEmail + '\\n\u30E9\u30A4\u30BB\u30F3\u30B9: ' + key + '\\n' + (mailStatus[idx] || ''));
  el.textContent = pairs.join('\\n\\n');
  el.classList.remove('hidden');
  loadLicenses();
  loadUsers();
}
async function deleteUnlinkedTestLicenses() {
  if (!confirm('\u767B\u9332\u30E1\u30FC\u30EB\u3068\u8A8D\u8A3C\u30E6\u30FC\u30B6\u30FC\u304C\u306A\u3044\u30C6\u30B9\u30C8\u30E9\u30A4\u30BB\u30F3\u30B9\u3092\u524A\u9664\u3057\u307E\u3059\u3002')) return;
  const r = await fetch('/api/admin/licenses/unlinked-tests', { method: 'DELETE' });
  const j = await r.json().catch(()=>({}));
  if (!r.ok) { alert('\u524A\u9664\u5931\u6557: ' + (j.error || r.status)); return; }
  alert('\u524A\u9664\u3057\u307E\u3057\u305F: ' + (j.deleted || 0) + '\u4EF6');
  loadLicenses();
  loadUsers();
}
async function revokeLicense(id) {
  if (!confirm('\u3053\u306E\u30E9\u30A4\u30BB\u30F3\u30B9\u3092\u7121\u52B9\u5316\u3057\u307E\u3059\u304B\uFF1F')) return;
  await fetch(\`/api/admin/licenses/\${id}/revoke\`, { method: 'POST' });
  loadLicenses();
}
async function reactivateLicense(id) {
  await fetch(\`/api/admin/licenses/\${id}/reactivate\`, { method: 'POST' });
  loadLicenses();
}
async function deleteLicense(id, key) {
  if (!confirm(key + ' を完全削除しますか？')) return;
  const r = await fetch(\`/api/admin/licenses/\${id}\`, { method: 'DELETE' });
  if (!r.ok) { const j = await r.json().catch(()=>({})); alert('\u524A\u9664\u5931\u6557: ' + (j.error || r.status)); return; }
  loadLicenses();
}

// ---------- \u30B5\u30D6\u30B9\u30AF ----------
async function loadSubs() {
  const r = await fetch('/api/admin/subscriptions');
  const j = await r.json();
  const tbody = document.getElementById('subs-tbody');
  if (!j.subscriptions || !j.subscriptions.length) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center text-brand-400 py-6">\u5951\u7D04\u306A\u3057</td></tr>';
    return;
  }
  tbody.innerHTML = j.subscriptions.map(s => \`
    <tr>
      <td class="text-brand-300">\${s.id}</td>
      <td>\${s.user_email}</td>
      <td>\${s.plan_code}</td>
      <td><span class="pill pill-\${s.status==='active'?'active':'inactive'}">\${s.status}</span></td>
      <td class="text-xs text-brand-300">\${s.started_at || '-'}</td>
      <td class="text-xs text-brand-300">\${s.current_period_end || '-'}</td>
      <td>\${s.cancel_at_period_end ? '<span class="pill pill-pending">\u505C\u6B62\u4E88\u5B9A</span>' : '-'}</td>
    </tr>
  \`).join('');
}

// ---------- \u6295\u7A3F ----------
async function loadPosts() {
  const r = await fetch('/api/admin/posts/summary');
  const j = await r.json();
  const stats = document.getElementById('posts-stats');
  stats.innerHTML = (j.stats || []).map(s => \`
    <div class="card text-center">
      <div class="text-xs text-brand-400 uppercase tracking-wider">\${s.label}</div>
      <div class="text-2xl font-bold text-white mt-1">\${s.value}</div>
    </div>
  \`).join('');
  const tbody = document.getElementById('posts-tbody');
  if (!j.recent || !j.recent.length) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center text-brand-400 py-6">\u30ED\u30B0\u306A\u3057</td></tr>';
    return;
  }
  tbody.innerHTML = j.recent.map(p => \`
    <tr>
      <td class="text-xs text-brand-300">\${p.created_at}</td>
      <td class="text-xs">\${p.email || '-'}</td>
      <td class="text-xs">\${p.x_screen_name || '-'}</td>
      <td class="text-xs max-w-md truncate">\${p.content || ''}</td>
      <td><span class="pill pill-\${p.status==='success'?'active':(p.status==='failed'?'error':'inactive')}">\${p.status}</span></td>
    </tr>
  \`).join('');
}

// ---------- X\u30A2\u30AB\u30A6\u30F3\u30C8 ----------
async function loadAccounts() {
  const r = await fetch('/api/admin/x-accounts');
  const j = await r.json();
  const tbody = document.getElementById('accounts-tbody');
  if (!j.accounts || !j.accounts.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center text-brand-400 py-6">\u30A2\u30AB\u30A6\u30F3\u30C8\u306A\u3057</td></tr>';
    return;
  }
  tbody.innerHTML = j.accounts.map(a => \`
    <tr>
      <td class="text-brand-300">\${a.id}</td>
      <td class="text-xs">\${a.user_email}</td>
      <td>@\${a.x_screen_name || '-'}</td>
      <td>\${a.is_active ? '<span class="pill pill-active">\u6709\u52B9</span>' : '<span class="pill pill-inactive">\u505C\u6B62</span>'}</td>
      <td class="text-xs text-brand-300">\${a.last_used_at || '-'}</td>
      <td class="text-xs text-brand-300">\${a.token_expires_at || '-'}</td>
    </tr>
  \`).join('');
}

// ---------- \u76E3\u67FB ----------
async function loadAudit() {
  const r = await fetch('/api/admin/audit-logs');
  const j = await r.json();
  const tbody = document.getElementById('audit-tbody');
  if (!j.logs || !j.logs.length) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center text-brand-400 py-6">\u30ED\u30B0\u306A\u3057</td></tr>';
    return;
  }
  tbody.innerHTML = j.logs.map(l => \`
    <tr>
      <td class="text-xs text-brand-300">\${l.created_at}</td>
      <td class="text-xs">\${l.email || '-'}</td>
      <td><span class="pill pill-inactive">\${l.event_type}</span></td>
      <td class="text-xs text-brand-300">\${l.ip_address || ''}</td>
      <td class="text-xs text-brand-400 truncate max-w-xs">\${(l.user_agent||'').slice(0,60)}</td>
    </tr>
  \`).join('');
}

// ---------- \u8A2D\u5B9A ----------
async function loadSettings() {
  const r = await fetch('/api/admin/settings');
  const j = await r.json();
  // \u30C8\u30E9\u30A4\u30A2\u30EB\u65E5\u6570\u8A2D\u5B9A\u306E\u307F\u8868\u793A\uFF08GE365X / GE365 \u3092\u5206\u3051\u3066\u7BA1\u7406\uFF09
  const allowedKeys = ['trial_days_ge365x', 'trial_days_ge365', 'trial_days'];
  const filtered = (j.settings || []).filter(s => allowedKeys.includes(s.key));
  const legacyTrial = filtered.find(s => s.key === 'trial_days');
  if (!filtered.find(s => s.key === 'trial_days_ge365x')) {
    filtered.push({ key: 'trial_days_ge365x', value: legacyTrial?.value || '7', description: 'GE365X 新規登録時に付与するトライアル日数' });
  }
  if (!filtered.find(s => s.key === 'trial_days_ge365')) {
    filtered.push({ key: 'trial_days_ge365', value: '7', description: 'GE365 新規登録時に付与するトライアル日数' });
  }
  const visibleSettings = filtered.filter(s => s.key !== 'trial_days');
  const settingLabels = {
    trial_days_ge365x: 'GE365X トライアル日数',
    trial_days_ge365: 'GE365 トライアル日数',
    trial_days: '\u30C8\u30E9\u30A4\u30A2\u30EB\u65E5\u6570'
  };
  const form = document.getElementById('settings-form');
  form.innerHTML = visibleSettings.map(s => \`
    <div class="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm" style="border:1px solid #E5E7EB">
      <div class="flex-1">
        <div class="font-bold text-lg" style="color:#1F2937">\${settingLabels[s.key] || s.key}</div>
        <div class="text-sm" style="color:#6B7280">\${s.description || '\u65B0\u898F\u767B\u9332\u6642\u306B\u4ED8\u4E0E\u3059\u308B\u30C8\u30E9\u30A4\u30A2\u30EB\u65E5\u6570'}</div>
      </div>
      <input type="number" min="0" id="setting-\${s.key}" class="input-field" style="width:8rem;font-size:1rem" value="\${s.value || '7'}">
      <span style="color:#6B7280">\u65E5</span>
      <button onclick="saveSetting('\${s.key}')" class="btn-primary" style="padding:.5rem 1.25rem;background:#2563EB;color:#fff;border-radius:.4rem;border:none;cursor:pointer;font-weight:600"><i class="fas fa-save"></i> \u4FDD\u5B58</button>
    </div>
  \`).join('');
}
async function saveSetting(key) {
  const value = document.getElementById('setting-' + key).value;
  const r = await fetch('/api/admin/settings', {
    method: 'POST', headers: {'content-type':'application/json'},
    body: JSON.stringify({ key, value }),
  });
  const j = await r.json();
  const labels = { trial_days_ge365x: 'GE365X トライアル日数', trial_days_ge365: 'GE365 トライアル日数', trial_days: '\u30C8\u30E9\u30A4\u30A2\u30EB\u65E5\u6570' };
  if (j.success || j.ok) alert('\u4FDD\u5B58\u3057\u307E\u3057\u305F: ' + (labels[key] || key) + ' = ' + value + '\u65E5');
  else alert('\u4FDD\u5B58\u5931\u6557: ' + (j.error || 'unknown'));
}

// ---------- \u4E00\u62EC\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9 ----------
function dlAdminExport(key) {
  const url = '/api/admin/export/' + key;
  fetch(url).then(r => {
    if (!r.ok) throw new Error('\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u5931\u6557 (' + r.status + ')');
    const cd = r.headers.get('content-disposition') || '';
    const match = cd.match(/filename="?([^"]+)"?/);
    const filename = match ? match[1] : 'ge365x_' + key.replace('/', '_') + '.' + (key.includes('all') ? 'json' : 'csv');
    return r.blob().then(blob => ({ blob, filename }));
  }).then(({ blob, filename }) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }).catch(e => alert(e.message));
}

// \u8D77\u52D5\u6642
showSection('users');
<\/script>
`;
  return e.html(It("\u7BA1\u7406\u753B\u9762", t, { bodyClass: "bg-paper text-ink min-h-screen font-sans antialiased admin-body" }));
});
F.get("/api/admin/users", m, R, async (e) => {
  const t = e.req.query("filter") || "all", s = [];
  t === "pending" && s.push("u.is_approved = 0"), t === "approved" && s.push("u.is_approved = 1"), t === "admin" && s.push("u.is_admin = 1");
  const a = `
    SELECT u.id, u.email, u.is_approved, u.is_admin, u.trial_start, u.trial_end, u.created_at,
           s.plan_code, s.status AS sub_status,
           GROUP_CONCAT(DISTINCT l.license_key) AS license_key
      FROM users u
      LEFT JOIN user_subscriptions s ON s.user_id = u.id
      LEFT JOIN licenses l ON l.user_id = u.id OR lower(l.buyer_email) = lower(u.email)
      ${s.length ? "WHERE " + s.join(" AND ") : ""}
      GROUP BY u.id
      ORDER BY u.id DESC
      LIMIT 200`, { results: n } = await e.env.DB.prepare(a).all();
  return e.json({ users: n || [] });
});
F.post("/api/admin/users/:id/approve", m, R, async (e) => {
  const t = parseInt(e.req.param("id"), 10), { is_approved: s } = await e.req.json();
  return await e.env.DB.prepare("UPDATE users SET is_approved=?, updated_at=datetime('now','+9 hours') WHERE id=?").bind(s, t).run(), await Z(e, "admin_toggle_approval", { userId: e.get("user").id, metadata: { target_user_id: t, is_approved: s } }), e.json({ ok: true });
});
F.post("/api/admin/users/:id/admin", m, R, async (e) => {
  const t = parseInt(e.req.param("id"), 10), { is_admin: s } = await e.req.json();
  return await e.env.DB.prepare("UPDATE users SET is_admin=?, updated_at=datetime('now','+9 hours') WHERE id=?").bind(s, t).run(), await Z(e, "admin_toggle_admin", { userId: e.get("user").id, metadata: { target_user_id: t, is_admin: s } }), e.json({ ok: true });
});
F.post("/api/admin/users/:id/plan", m, R, async (e) => {
  const t = e.get("user"), s = parseInt(e.req.param("id"), 10), { plan_code: a } = await e.req.json();
  const n = ["ge365x_free", "ge365x_standard", "ge365x_pro"];
  if (!n.includes(a)) return e.json({ ok: false, error: "invalid_plan" }, 400);
  const i = await e.env.DB.prepare("SELECT id FROM users WHERE id=? LIMIT 1").bind(s).first();
  if (!i) return e.json({ ok: false, error: "user_not_found" }, 404);
  await e.env.DB.prepare(`INSERT INTO user_subscriptions
      (user_id, plan_code, status, started_at, current_period_end, updated_at)
     VALUES (?, ?, 'active', datetime('now','+9 hours'), '2099-12-31 23:59:59', datetime('now','+9 hours'))
     ON CONFLICT(user_id) DO UPDATE SET
       plan_code=excluded.plan_code,
       status='active',
       current_period_end='2099-12-31 23:59:59',
       cancel_at_period_end=0,
       updated_at=datetime('now','+9 hours')`).bind(s, a).run();
  return await Z(e, "admin_update_user_plan", { userId: t.id, metadata: { target_user_id: s, plan_code: a } }), e.json({ ok: true, plan_code: a });
});
F.delete("/api/admin/users/:id", m, R, async (e) => {
  const t = e.get("user"), s = parseInt(e.req.param("id"), 10);
  if (s === t.id) return e.json({ error: "cannot_delete_self" }, 400);
  await e.env.DB.prepare("UPDATE licenses SET user_id=NULL, activated_at=NULL, updated_at=datetime('now','+9 hours') WHERE user_id=?").bind(s).run();
  await e.env.DB.prepare("DELETE FROM user_subscriptions WHERE user_id=?").bind(s).run();
  await e.env.DB.prepare("DELETE FROM sessions WHERE user_id=?").bind(s).run().catch(() => null);
  await e.env.DB.prepare("DELETE FROM users WHERE id=?").bind(s).run();
  return await Z(e, "admin_delete_user", { userId: t.id, metadata: { target_user_id: s } }), e.json({ ok: true });
});
F.get("/api/admin/licenses", m, R, async (e) => {
  const { results: t } = await e.env.DB.prepare(`SELECT l.*, u.email AS user_email
       FROM licenses l
       LEFT JOIN users u ON u.id = l.user_id OR (l.user_id IS NULL AND lower(u.email) = lower(l.buyer_email))
       ORDER BY l.id DESC LIMIT 500`).all();
  return e.json({ licenses: t || [] });
});
F.post("/api/admin/licenses/issue", m, R, async (e) => {
  const t = e.get("user"), { plan_code: s, license_type: a, expires_at: n, count: i = 1, note: r, buyer_email: o = "" } = await e.req.json();
  if (i < 1 || i > 100) return e.json({ error: "invalid_count" }, 400);
  const d = o ? await e.env.DB.prepare("SELECT id FROM users WHERE lower(email)=lower(?) LIMIT 1").bind(o).first() : null;
  const p = [];
  for (let h = 0; h < i; h++) {
    let l = Zt("VPS-GE365X");
    for (let c = 0; c < 3 && await e.env.DB.prepare("SELECT 1 FROM licenses WHERE license_key=?").bind(l).first(); c++) l = Zt("VPS-GE365X");
    await e.env.DB.prepare(`INSERT INTO licenses (license_key, license_type, plan_code, user_id, is_active, activated_at, expires_at, issued_by, note, buyer_email)
       VALUES (?, ?, ?, ?, 1, ?, ?, ?, ?, ?)`).bind(l, a, s, d?.id || null, o ? g() : null, n ? n + " 23:59:59" : null, t.id, r || null, o || null).run(), p.push({ key: l, hub: await Gx(e, { product_code: "GE365X", license_key: l, plan_code: s || "ge365x_standard", status: o ? "active" : "unused", expires_at: n ? n + "T23:59:59Z" : null, created_at: g(), email: o || "" }), mail: await Hx(e, { to: o || "", license_key: l, plan_code: s || "ge365x_standard", expires_at: n ? n + " 23:59:59" : null }) });
  }
  return await Z(e, "admin_issue_license", { userId: t.id, metadata: { count: i, plan_code: s, license_type: a, buyer_email: o || "" } }), e.json({ ok: true, keys: p.map((l) => l.key), hub_sync: p.map((l) => l.hub), mail: p.map((l) => l.mail) });
});
F.post("/api/admin/licenses/:id/email", m, R, async (e) => {
  const t = parseInt(e.req.param("id"), 10), { buyer_email: s = "" } = await e.req.json(), a = String(s || "").trim().toLowerCase();
  if (a && !a.includes("@")) return e.json({ error: "invalid_email" }, 400);
  const n = a ? await e.env.DB.prepare("SELECT id FROM users WHERE lower(email)=lower(?) LIMIT 1").bind(a).first() : null;
  await e.env.DB.prepare("UPDATE licenses SET buyer_email=?, user_id=?, activated_at=CASE WHEN ? IS NOT NULL THEN COALESCE(activated_at, datetime('now','+9 hours')) ELSE activated_at END, updated_at=datetime('now','+9 hours') WHERE id=?").bind(a || null, n?.id || null, a || null, t).run();
  return await Z(e, "admin_update_license_email", { userId: e.get("user").id, metadata: { license_id: t, buyer_email: a || "" } }), e.json({ ok: true, matched_user_id: n?.id || null });
});
F.post("/api/admin/licenses/:id/send-mail", m, R, async (e) => {
  const t = parseInt(e.req.param("id"), 10);
  const s = await e.env.DB.prepare("SELECT license_key, plan_code, expires_at, buyer_email FROM licenses WHERE id=? LIMIT 1").bind(t).first();
  if (!s) return e.json({ error: "license_not_found" }, 404);
  const a = await Hx(e, { to: s.buyer_email || "", license_key: s.license_key, plan_code: s.plan_code || "ge365x_standard", expires_at: s.expires_at || null });
  return await Z(e, "admin_send_license_mail", { userId: e.get("user").id, metadata: { license_id: t, buyer_email: s.buyer_email || "", ok: !!a.ok, error: a.error || "" } }), e.json({ ok: true, mail: a });
});
F.delete("/api/admin/licenses/unlinked-tests", m, R, async (e) => {
  const t = await e.env.DB.prepare("SELECT COUNT(*) AS n FROM licenses WHERE (buyer_email IS NULL OR buyer_email='') AND user_id IS NULL").first();
  await e.env.DB.prepare("DELETE FROM license_activations WHERE license_id IN (SELECT id FROM licenses WHERE (buyer_email IS NULL OR buyer_email='') AND user_id IS NULL)").run().catch(() => null);
  await e.env.DB.prepare("DELETE FROM licenses WHERE (buyer_email IS NULL OR buyer_email='') AND user_id IS NULL").run();
  return await Z(e, "admin_delete_unlinked_test_licenses", { userId: e.get("user").id, metadata: { deleted: t?.n || 0 } }), e.json({ ok: true, deleted: t?.n || 0 });
});
F.post("/api/admin/licenses/:id/revoke", m, R, async (e) => {
  const t = parseInt(e.req.param("id"), 10);
  return await e.env.DB.prepare("UPDATE licenses SET is_active=0, updated_at=datetime('now','+9 hours') WHERE id=?").bind(t).run(), await e.env.DB.prepare(`INSERT INTO license_activations (license_id, user_id, event_type)
     VALUES (?, ?, 'revoked')`).bind(t, e.get("user").id).run(), e.json({ ok: true });
});
F.post("/api/admin/licenses/:id/reactivate", m, R, async (e) => {
  const t = parseInt(e.req.param("id"), 10);
  return await e.env.DB.prepare("UPDATE licenses SET is_active=1, updated_at=datetime('now','+9 hours') WHERE id=?").bind(t).run(), e.json({ ok: true });
});
F.delete("/api/admin/licenses/:id", m, R, async (e) => {
  const t = parseInt(e.req.param("id"), 10);
  await e.env.DB.prepare("DELETE FROM license_activations WHERE license_id=?").bind(t).run().catch(() => null);
  await e.env.DB.prepare("DELETE FROM licenses WHERE id=?").bind(t).run();
  return await Z(e, "admin_delete_license", { userId: e.get("user").id, metadata: { license_id: t } }), e.json({ ok: true });
});
F.get("/api/admin/subscriptions", m, R, async (e) => {
  const { results: t } = await e.env.DB.prepare(`SELECT s.*, u.email AS user_email
       FROM user_subscriptions s
       LEFT JOIN users u ON u.id = s.user_id
       ORDER BY s.updated_at DESC LIMIT 300`).all();
  return e.json({ subscriptions: t || [] });
});
F.get("/api/admin/posts/summary", m, R, async (e) => {
  const t = await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_queue").first(), s = await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_queue WHERE status='pending'").first(), a = await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_logs WHERE status='success'").first(), n = await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_logs WHERE status='failed'").first(), { results: i } = await e.env.DB.prepare(`SELECT pl.created_at, pl.content, pl.status,
            u.email, x.x_screen_name
       FROM post_logs pl
       LEFT JOIN users u  ON u.id = pl.user_id
       LEFT JOIN x_accounts x ON x.id = pl.x_account_id
       ORDER BY pl.created_at DESC LIMIT 100`).all();
  return e.json({ stats: [{ label: "\u5168\u30AD\u30E5\u30FC", value: (t == null ? void 0 : t.n) ?? 0 }, { label: "pending", value: (s == null ? void 0 : s.n) ?? 0 }, { label: "\u6210\u529F", value: (a == null ? void 0 : a.n) ?? 0 }, { label: "\u5931\u6557", value: (n == null ? void 0 : n.n) ?? 0 }], recent: i || [] });
});
F.get("/api/admin/x-accounts", m, R, async (e) => {
  const { results: t } = await e.env.DB.prepare(`SELECT xa.id, xa.x_screen_name, xa.is_active, xa.last_used_at, xa.token_expires_at,
            u.email AS user_email
       FROM x_accounts xa
       LEFT JOIN users u ON u.id = xa.user_id
       ORDER BY xa.id DESC LIMIT 500`).all();
  return e.json({ accounts: t || [] });
});
F.get("/api/admin/audit-logs", m, R, async (e) => {
  const { results: t } = await e.env.DB.prepare(`SELECT id, user_id, email, event_type, ip_address, user_agent, metadata, created_at
       FROM auth_logs ORDER BY id DESC LIMIT 300`).all();
  return e.json({ logs: t || [] });
});
F.get("/api/admin/settings", m, R, async (e) => {
  const { results: t } = await e.env.DB.prepare("SELECT key, value, description FROM system_settings ORDER BY key").all();
  return e.json({ settings: t || [] });
});
F.post("/api/admin/settings", m, R, async (e) => {
  const { key: t, value: s } = await e.req.json();
  return await e.env.DB.prepare(`INSERT INTO system_settings (key, value, updated_at)
     VALUES (?, ?, datetime('now','+9 hours'))
     ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=datetime('now','+9 hours')`).bind(t, s).run(), e.json({ ok: true });
});
var fe = new A();
fe.post("/api/auth/register", async (e) => {
  const t = await e.req.json(), s = (t.email || "").trim().toLowerCase(), a = t.password || "";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s) || a.length < 8) return e.json({ error: "invalid_input" }, 400);
  const n = await e.env.DB.prepare("SELECT value FROM system_settings WHERE key='invite_only'").first();
  if ((n == null ? void 0 : n.value) === "1") return e.json({ error: "invite_only" }, 403);
  if (await e.env.DB.prepare("SELECT 1 FROM users WHERE email = ?").bind(s).first()) return e.json({ error: "email_taken" }, 409);
  const r = await Bt(a), o = await e.env.DB.prepare("SELECT value FROM system_settings WHERE key='trial_days_ge365x'").first(), legacyTrial = await e.env.DB.prepare("SELECT value FROM system_settings WHERE key='trial_days'").first(), d = parseInt((o == null ? void 0 : o.value) ?? (legacyTrial == null ? void 0 : legacyTrial.value) ?? "7", 10), l = await e.env.DB.prepare("SELECT value FROM system_settings WHERE key='trial_require_approval'").first(), c = (l == null ? void 0 : l.value) !== "0";
  g();
  const _ = (await e.env.DB.prepare(`INSERT INTO users (email, password_hash, is_approved, is_admin, trial_start, trial_end)
     VALUES (?, ?, ?, 0, datetime('now','+9 hours'),
             datetime('now','+9 hours', '+' || ? || ' days'))`).bind(s, r, c ? 0 : 1, d).run()).meta.last_row_id;
  return await e.env.DB.prepare(`INSERT INTO user_subscriptions (user_id, plan_code, status, started_at, current_period_end)
     VALUES (?, 'ge365x_free', 'trial', datetime('now','+9 hours'),
             datetime('now','+9 hours', '+' || ? || ' days'))`).bind(_, d).run(), await e.env.DB.prepare(`INSERT INTO trial_history (email, user_id, trial_start, trial_end)
     VALUES (?, ?, datetime('now','+9 hours'),
             datetime('now','+9 hours', '+' || ? || ' days'))`).bind(s, _, d).run(), await Z(e, "register", { userId: _, email: s }), e.json({ ok: true, user_id: _, approved: !c, message: c ? "\u767B\u9332\u3092\u53D7\u3051\u4ED8\u3051\u307E\u3057\u305F\u3002\u7BA1\u7406\u8005\u306B\u3088\u308B\u627F\u8A8D\u5F8C\u306B\u30ED\u30B0\u30A4\u30F3\u3067\u304D\u307E\u3059\u3002" : "\u767B\u9332\u304C\u5B8C\u4E86\u3057\u307E\u3057\u305F\u3002\u30ED\u30B0\u30A4\u30F3\u3057\u3066\u304F\u3060\u3055\u3044\u3002" });
});
fe.post("/api/auth/login", async (e) => {
  const t = await e.req.json(), s = (t.email || "").trim().toLowerCase(), a = t.password || "";
  if (!s || !a) return e.json({ error: "invalid_input" }, 400);
  const n = await e.env.DB.prepare("SELECT id,email,password_hash,is_approved,is_admin FROM users WHERE email = ?").bind(s).first();
  if (!n) return await Z(e, "login_fail", { email: s, metadata: { reason: "no_user" } }), e.json({ error: "invalid_credentials" }, 401);
  if (!await Cs(a, n.password_hash)) return await Z(e, "login_fail", { userId: n.id, email: s, metadata: { reason: "bad_password" } }), e.json({ error: "invalid_credentials" }, 401);
  if (n.is_approved === 0) return await Z(e, "login_blocked", { userId: n.id, email: s, metadata: { reason: "not_approved" } }), e.json({ error: "not_approved" }, 403);
  const nowIat = Math.floor(Date.now() / 1e3);
  await e.env.DB.prepare(`INSERT INTO system_settings (key, value, description, updated_at)
       VALUES (?, ?, ?, datetime('now','+9 hours'))
       ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=datetime('now','+9 hours')`).bind("user_session_iat:" + n.id, String(nowIat), "User session iat (single-device enforcement)").run().catch(() => {
  });
  const r = await za({ uid: n.id, email: n.email, adm: n.is_admin === 1, iat: nowIat }, e.env.JWT_SECRET, 3600 * 24 * 7), o = Ls(Nt, r, { maxAge: 3600 * 24 * 7 });
  return await Z(e, "login_success", { userId: n.id, email: s }), new Response(JSON.stringify({ ok: true, user_id: n.id, email: n.email, is_admin: n.is_admin === 1 }), { headers: { "content-type": "application/json", "set-cookie": o } });
});
fe.post("/api/auth/logout", async (e) => {
  const t = e.get("user");
  t && await Z(e, "logout", { userId: t.id, email: t.email });
  const s = Ls(Nt, "", { maxAge: 0 });
  return new Response(JSON.stringify({ ok: true }), { headers: { "content-type": "application/json", "set-cookie": s } });
});
fe.get("/api/auth/me", m, (e) => e.json({ ok: true, user: e.get("user") }));
fe.post("/api/auth/license/activate", m, async (e) => {
  const t = e.get("user"), { license_key: s } = await e.req.json();
  if (!s || !Xa(s)) return e.json({ error: "invalid_license_format" }, 400);
  const a = s.trim().toUpperCase(), n = await e.env.DB.prepare("SELECT * FROM licenses WHERE license_key = ?").bind(a).first();
  if (!n) return e.json({ error: "license_not_found" }, 404);
  if (n.is_active === 0) return e.json({ error: "license_inactive" }, 409);
  if (n.expires_at && n.expires_at < g()) return e.json({ error: "license_expired" }, 409);
  if (n.user_id && n.user_id !== t.id) return e.json({ error: "license_already_used" }, 409);
  await e.env.DB.prepare(`UPDATE licenses
       SET user_id = ?, activated_at = COALESCE(activated_at, datetime('now','+9 hours')),
           updated_at = datetime('now','+9 hours')
     WHERE id = ?`).bind(t.id, n.id).run();
  const i = n.plan_code || "ge365x_standard", r = n.license_type === "trial" ? "trial" : "active", o = n.expires_at ? n.expires_at : n.license_type === "lifetime" ? "2099-12-31 23:59:59" : null;
  return await e.env.DB.prepare(`INSERT INTO user_subscriptions
       (user_id, plan_code, status, started_at, current_period_end, updated_at)
     VALUES (?, ?, ?, datetime('now','+9 hours'), ?, datetime('now','+9 hours'))
     ON CONFLICT(user_id) DO UPDATE SET
       plan_code = excluded.plan_code,
       status    = excluded.status,
       current_period_end = excluded.current_period_end,
       updated_at = datetime('now','+9 hours')`).bind(t.id, i, r, o).run(), await e.env.DB.prepare(`UPDATE users
       SET is_approved = 1, updated_at = datetime('now','+9 hours')
     WHERE id = ? AND is_approved = 0`).bind(t.id).run(), await e.env.DB.prepare(`INSERT INTO license_activations (license_id, user_id, event_type, ip_address, user_agent)
     VALUES (?, ?, 'activated', ?, ?)`).bind(n.id, t.id, e.req.header("cf-connecting-ip") || "", e.req.header("user-agent") || "").run(), await Z(e, "license_activate", { userId: t.id, email: t.email, metadata: { license_id: n.id, plan_code: i } }), e.json({ ok: true, plan_code: i, status: r, license_type: n.license_type, expires_at: o });
});
fe.post("/api/auth/password/change", m, async (e) => {
  const t = e.get("user"), { current_password: s, new_password: a } = await e.req.json();
  if (!s || !a || a.length < 8) return e.json({ error: "invalid_input" }, 400);
  const n = await e.env.DB.prepare("SELECT password_hash FROM users WHERE id = ?").bind(t.id).first();
  if (!n) return e.json({ error: "user_not_found" }, 404);
  if (!await Cs(s, n.password_hash)) return e.json({ error: "invalid_credentials" }, 401);
  const r = await Bt(a);
  return await e.env.DB.prepare("UPDATE users SET password_hash=?, updated_at=datetime('now','+9 hours') WHERE id=?").bind(r, t.id).run(), await Z(e, "password_change", { userId: t.id, email: t.email }), e.json({ ok: true });
});
fe.get("/setup", async (e) => {
  const t = e.req.query("token") || "", s = e.env.ADMIN_PASSWORD || "";
  if (!s || t !== s) return e.html(`<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8">
<title>Setup</title><style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#f7f8fb}
.card{background:#fff;border-radius:12px;padding:2rem;max-width:420px;width:100%;box-shadow:0 2px 12px rgba(0,0,0,.08);text-align:center}
h2{color:#dc2626;margin:0 0 .5rem}p{color:#6b7280;font-size:.9rem}</style></head>
<body><div class="card"><h2>\u274C \u8A8D\u8A3C\u5931\u6557</h2>
<p>URL\u306B\u6B63\u3057\u3044 token \u3092\u4ED8\u3051\u3066\u304F\u3060\u3055\u3044\u3002<br>\u4F8B: /setup?token=\uFF08ADMIN_PASSWORD\u306E\u5024\uFF09</p></div></body></html>`, 403);
  const a = "admin@ge365x.local", i = await Bt("Ge365x@Admin!"), r = await e.env.DB.prepare("SELECT id FROM users WHERE email = ?").bind(a).first();
  if (r) await e.env.DB.prepare("UPDATE users SET password_hash=?, is_admin=1, is_approved=1, updated_at=datetime('now','+9 hours') WHERE id=?").bind(i, r.id).run(), await e.env.DB.prepare("UPDATE user_subscriptions SET plan_code='ge365x_pro', status='active', current_period_end='2099-12-31 23:59:59' WHERE user_id=?").bind(r.id).run();
  else {
    const d = (await e.env.DB.prepare(`INSERT INTO users (email, password_hash, is_approved, is_admin, trial_start, trial_end)
       VALUES (?, ?, 1, 1, datetime('now','+9 hours'), '2099-12-31 23:59:59')`).bind(a, i).run()).meta.last_row_id;
    await e.env.DB.prepare(`INSERT OR REPLACE INTO user_subscriptions (user_id, plan_code, status, started_at, current_period_end)
       VALUES (?, 'ge365x_pro', 'active', datetime('now','+9 hours'), '2099-12-31 23:59:59')`).bind(d).run();
  }
  return e.html(`<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8">
<title>Setup \u5B8C\u4E86</title><style>
body{font-family:-apple-system,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#f0fdf4}
.card{background:#fff;border-radius:16px;padding:2.5rem;max-width:480px;width:100%;box-shadow:0 4px 20px rgba(0,0,0,.1);text-align:center}
h2{color:#16a34a;margin:0 0 1rem;font-size:1.5rem}.icon{font-size:3rem;margin-bottom:.5rem}
table{width:100%;border-collapse:collapse;margin:1.2rem 0;text-align:left}
td{padding:8px 12px;font-size:.9rem;border-bottom:1px solid #e5e7eb}
td:first-child{color:#6b7280;width:40%}
td:last-child{font-family:monospace;font-weight:600;color:#1f2937;background:#f8fafc;border-radius:4px}
.btn{display:block;background:#2563eb;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;margin-top:1.5rem;font-weight:600;font-size:1rem}
.warn{background:#fef3c7;border-radius:8px;padding:10px 14px;font-size:.8rem;color:#92400e;margin-top:1rem}</style></head>
<body><div class="card">
<div class="icon">\u2705</div>
<h2>\u7BA1\u7406\u8005\u30A2\u30AB\u30A6\u30F3\u30C8\u8A2D\u5B9A\u5B8C\u4E86</h2>
<p style="color:#6b7280;font-size:.9rem">\u4EE5\u4E0B\u306E\u60C5\u5831\u3067\u30ED\u30B0\u30A4\u30F3\u3057\u3066\u304F\u3060\u3055\u3044</p>
<table>
<tr><td>\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9</td><td>${a}</td></tr>
<tr><td>\u30D1\u30B9\u30EF\u30FC\u30C9</td><td>Ge365x@Admin!</td></tr>
<tr><td>\u6A29\u9650</td><td>Admin / Pro</td></tr>
</table>
<a class="btn" href="/login">\u2192 \u30ED\u30B0\u30A4\u30F3\u753B\u9762\u3078</a>
<div class="warn">\u26A0\uFE0F \u30ED\u30B0\u30A4\u30F3\u5F8C\u3059\u3050\u306B\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u5909\u66F4\u3057\u3066\u304F\u3060\u3055\u3044<br>\u3053\u306EURL\u306F\u8A2D\u5B9A\u5F8C\u3082\u6709\u52B9\u306A\u305F\u3081\u3001token \u3092\u77E5\u3089\u306A\u3044\u4EBA\u306B\u306F\u6559\u3048\u306A\u3044\u3067\u304F\u3060\u3055\u3044</div>
</div></body></html>`);
});
var be = new A();
be.get("/api/subscription/plans", async (e) => {
  const { results: t } = await e.env.DB.prepare(`SELECT code, name, description, monthly_price_jpy, yearly_price_jpy,
            daily_post_limit, x_account_limit, openai_token_monthly, features
       FROM subscription_plans
      WHERE is_active = 1
      ORDER BY sort_order ASC`).all(), s = (t || []).map((a) => ({ ...a, features: a.features ? JSON.parse(a.features) : [] }));
  return e.json({ plans: s });
});
be.get("/api/subscription/me", m, async (e) => {
  const t = e.get("user"), s = await e.env.DB.prepare(`SELECT s.plan_code, s.status, s.started_at, s.current_period_end, s.cancel_at_period_end,
            p.name AS plan_name, p.monthly_price_jpy, p.daily_post_limit, p.x_account_limit, p.features
       FROM user_subscriptions s
       LEFT JOIN subscription_plans p ON p.code = s.plan_code
      WHERE s.user_id = ?`).bind(t.id).first();
  return s ? e.json({ subscription: { ...s, features: s.features ? JSON.parse(s.features) : [] } }) : e.json({ subscription: null });
});
be.post("/api/subscription/cancel", m, async (e) => {
  const t = e.get("user");
  return await e.env.DB.prepare(`UPDATE user_subscriptions
       SET cancel_at_period_end = 1, updated_at = datetime('now','+9 hours')
     WHERE user_id = ?`).bind(t.id).run(), e.json({ ok: true });
});
be.post("/api/subscription/reactivate", m, async (e) => {
  const t = e.get("user");
  return await e.env.DB.prepare(`UPDATE user_subscriptions
       SET cancel_at_period_end = 0, status = 'active', updated_at = datetime('now','+9 hours')
     WHERE user_id = ?`).bind(t.id).run(), e.json({ ok: true });
});
be.get("/api/subscription/payments", m, async (e) => {
  const t = e.get("user"), { results: s } = await e.env.DB.prepare(`SELECT id, amount_jpy, currency, provider, external_id, status, plan_code, paid_at, created_at
       FROM payment_history
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT 50`).bind(t.id).all();
  return e.json({ payments: s || [] });
});
be.post("/api/subscription/stripe/checkout", m, async (e) => e.env.STRIPE_SECRET_KEY ? e.json({ error: "not_implemented_yet" }, 501) : e.json({ error: "stripe_not_configured" }, 501));
be.post("/api/subscription/webhook/stripe", async (e) => e.json({ received: true }));
var Qt = new TextEncoder();
var vn = "https://api.x.com/2";
var $ = class extends Error {
  static {
    __name(this, "$");
  }
  constructor(s, a = 0, n = "api_error") {
    super(s);
    h(this, "statusCode");
    h(this, "errorType");
    this.name = "XApiError", this.statusCode = a, this.errorType = n;
  }
};
var Mt = class extends $ {
  static {
    __name(this, "Mt");
  }
  constructor(s) {
    super("Rate limited by X API (429)", 429, "rate_limit");
    h(this, "resetAtEpoch");
    this.name = "XApiRateLimitError", this.resetAtEpoch = s;
  }
};
function oe(e) {
  return encodeURIComponent(e).replace(/[!'()*]/g, (t) => "%" + t.charCodeAt(0).toString(16).toUpperCase());
}
__name(oe, "oe");
function yn(e) {
  const t = new Uint8Array(e);
  return crypto.getRandomValues(t), [...t].map((s) => s.toString(16).padStart(2, "0")).join("");
}
__name(yn, "yn");
function En() {
  return yn(16);
}
__name(En, "En");
async function xn(e, t) {
  const s = await crypto.subtle.importKey("raw", Qt.encode(e), { name: "HMAC", hash: "SHA-1" }, false, ["sign"]), a = await crypto.subtle.sign("HMAC", s, Qt.encode(t)), n = new Uint8Array(a);
  let i = "";
  for (let r = 0; r < n.length; r++) i += String.fromCharCode(n[r]);
  return btoa(i);
}
__name(xn, "xn");
async function wn(e, t, s, a) {
  const n = { oauth_consumer_key: s.consumerKey, oauth_nonce: En(), oauth_signature_method: "HMAC-SHA1", oauth_timestamp: Math.floor(Date.now() / 1e3).toString(), oauth_token: s.accessToken, oauth_version: "1.0" }, i = new URL(t), r = { ...n };
  i.searchParams.forEach((_, b) => {
    r[b] = _;
  });
  const o = Object.keys(r).sort().map((_) => `${oe(_)}=${oe(r[_])}`).join("&"), d = [e.toUpperCase(), oe(`${i.origin}${i.pathname}`), oe(o)].join("&"), l = `${oe(s.consumerSecret)}&${oe(s.accessTokenSecret)}`, c = await xn(l, d);
  return n.oauth_signature = c, `OAuth ${Object.keys(n).sort().map((_) => `${oe(_)}="${oe(n[_])}"`).join(", ")}`;
}
__name(wn, "wn");
async function $t(e, t, s, a) {
  const n = `${vn}${t}`, i = await wn(e, n, a), r = { method: e, headers: { authorization: i, "content-type": "application/json" }, signal: AbortSignal.timeout(3e4) };
  s !== void 0 && (r.body = JSON.stringify(s));
  const o = await fetch(n, r);
  if (o.status === 429) {
    const d = o.headers.get("x-rate-limit-reset");
    throw new Mt(d ? Number(d) : void 0);
  }
  if (!o.ok) {
    const d = await o.text();
    let detail = d.slice(0, 300);
    try {
      const j2 = JSON.parse(d);
      if (j2.detail) detail = j2.detail;
      else if (j2.errors && j2.errors[0]) detail = j2.errors[0].message || j2.errors[0].detail || detail;
      else if (j2.title) detail = j2.title;
    } catch {
    }
    let hint = "";
    if (o.status === 401) hint = "\uFF08401 Unauthorized: X Developer Portal\u3067 App permissions \u3092 Read+Write \u306B\u5909\u66F4\u5F8C\u3001Keys and tokens \u30BF\u30D6\u3067 Access Token & Secret \u3092\u518D\u751F\u6210\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u518D\u751F\u6210\u5F8C\u306E\u65B0\u3057\u3044\u30C8\u30FC\u30AF\u30F3\u3092\u30A2\u30AB\u30A6\u30F3\u30C8\u7BA1\u7406\u306B\u767B\u9332\u3057\u76F4\u3059\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059\uFF09";
    else if (o.status === 403) hint = "\uFF08403 Forbidden: X API\u5074\u3067\u30D6\u30ED\u30C3\u30AF\u3055\u308C\u3066\u3044\u307E\u3059\uFF09";
    if (o.status === 403 && /spend cap|billing cycle/i.test(detail)) detail = "X APIの課金上限に到達しています。X Developer PortalでBilling / Spend capを上げるまで、このXアプリのAPI実行はブロックされます。接続テストがOKでも検索・投稿はできません。";
    throw new $(`X API ${e} ${t} failed: ${o.status} ${detail}${hint} / raw:${d.slice(0, 500)}`, o.status, "api_error");
  }
  return o.status === 204 ? {} : o.json();
}
__name($t, "$t");
async function Ms(e, t) {
  var a, n;
  const s = await xPostTweetWithFallback(e, { text: t });
  return { id: ((a = s == null ? void 0 : s.data) == null ? void 0 : a.id) || "", text: ((n = s == null ? void 0 : s.data) == null ? void 0 : n.text) || t };
}
__name(Ms, "Ms");
async function $s(e, t, s, a) {
  var r, o;
  const n = { text: t };
  s && s.length && (n.media = { media_ids: s.slice(0, 4) });
  const i = await xPostTweetWithFallback(e, n);
  return { id: ((r = i == null ? void 0 : i.data) == null ? void 0 : r.id) || "", text: ((o = i == null ? void 0 : i.data) == null ? void 0 : o.text) || t };
}
__name($s, "$s");
async function $sReply(e, t, parentId, s) {
  var r, o;
  const n = { text: t, reply: { in_reply_to_tweet_id: parentId } };
  s && s.length && (n.media = { media_ids: s.slice(0, 4) });
  const i = await xPostTweetWithFallback(e, n);
  return { id: ((r = i == null ? void 0 : i.data) == null ? void 0 : r.id) || "", text: ((o = i == null ? void 0 : i.data) == null ? void 0 : o.text) || t };
}
__name($sReply, "$sReply");
function xPolicySafeText(e) {
  const raw = String(e || "");
  if (/FX|投資|資産|利益|口座|トレード/i.test(raw)) {
    return "FXは少額から学ぶ\nリスク管理を忘れない";
  }
  let t = raw.replace(/\d+(\.\d+)?\s*%/g, "").replace(/必ず|確実|絶対|稼げる|儲かる|達成可能/g, "").replace(/\n{2,}/g, "\n").split(/\n+/).filter(Boolean).slice(0, 2).join("\n").trim();
  if (!t) t = "今日の気づきを確認\n小さく行動してみる";
  return simpleTwoLineText(t);
}
__name(xPolicySafeText, "xPolicySafeText");
function xUniqueTweetText(e) {
  const base = xPolicySafeText(e);
  const stamp = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit" }).replace(/\D/g, "");
  const mark = Math.random().toString(36).slice(2, 4);
  const first = simpleTwoLineText(base).split(/\n/)[0] || "今日の気づきを確認";
  return simpleTwoLineText(`${first}\n管理を意識 ${stamp}${mark}`);
}
__name(xUniqueTweetText, "xUniqueTweetText");
async function xPostTweetWithFallback(e, t) {
  try {
    return await $t("POST", "/tweets", t, e);
  } catch (s) {
    const a = s && s.message || "";
    if (!/403/.test(a) || !/You are not permitted to perform this action|duplicate content|Forbidden/i.test(a) || !t || !t.text) throw s;
    const n = { ...t, text: /duplicate content/i.test(a) ? xUniqueTweetText(t.text) : xPolicySafeText(t.text) };
    try {
      return await $t("POST", "/tweets", n, e);
    } catch (i) {
      const r = i && i.message || "";
      if (!/duplicate content/i.test(r)) throw i;
      return await $t("POST", "/tweets", { ...n, text: xUniqueTweetText(`${n.text}\n${Math.random().toString(36).slice(2, 6)}`) }, e);
    }
  }
}
__name(xPostTweetWithFallback, "xPostTweetWithFallback");
async function ge365xProbeTweetWrite(e) {
  let s;
  if (e != null && e.oauth2Bearer) {
    s = await fetch("https://api.x.com/2/tweets", {
      method: "POST",
      headers: { authorization: `Bearer ${e.oauth2Bearer}`, "content-type": "application/json" },
      body: JSON.stringify({}),
      signal: AbortSignal.timeout(3e4)
    });
  } else {
    const a = "https://api.x.com/2/tweets";
    const n = await wn("POST", a, e);
    s = await fetch(a, {
      method: "POST",
      headers: { authorization: n, "content-type": "application/json" },
      body: JSON.stringify({}),
      signal: AbortSignal.timeout(3e4)
    });
  }
  const a = await s.text();
  if (s.status === 400 || s.status === 422) return { ok: true, status: s.status, message: "書き込み権限チェックOK。空投稿のため投稿は作成されていません。" };
  return { ok: false, status: s.status, message: a.slice(0, 500) };
}
__name(ge365xProbeTweetWrite, "ge365xProbeTweetWrite");
async function kn(e) {
  var s, a, n, i;
  if (!e) throw new $("credentials\u672A\u8A2D\u5B9A", 0, "missing_credentials");
  if (!((s = e.consumerKey) != null && s.trim())) throw new $("API Key\u672A\u8A2D\u5B9A", 0, "missing_credentials");
  if (!((a = e.consumerSecret) != null && a.trim())) throw new $("API Secret\u672A\u8A2D\u5B9A", 0, "missing_credentials");
  if (!((n = e.accessToken) != null && n.trim())) throw new $("Access Token\u672A\u8A2D\u5B9A", 0, "missing_token");
  if (!((i = e.accessTokenSecret) != null && i.trim())) throw new $("Access Token Secret\u672A\u8A2D\u5B9A", 0, "missing_token");
  const t = await $t("GET", "/users/me?user.fields=profile_image_url,public_metrics", void 0, e);
  return t == null ? void 0 : t.data;
}
__name(kn, "kn");
async function Ft(e, t, s) {
  var o, d;
  let a = ((s == null ? void 0 : s.apiKey) ?? e.X_API_KEY ?? "").trim();
  let n = ((s == null ? void 0 : s.apiSecret) ?? e.X_API_SECRET ?? "").trim();
  if ((!a || !n) && e.DB && t && t.user_id) {
    try {
      const row = await e.DB.prepare("SELECT api_key, api_secret FROM x_api_settings WHERE user_id = ? ORDER BY id DESC LIMIT 1").bind(t.user_id).first();
      if (row) {
        if (!a && row.api_key) {
          try {
            a = (await At(row.api_key, e.ENCRYPTION_KEY)).trim();
          } catch {
          }
        }
        if (!n && row.api_secret) {
          try {
            n = (await At(row.api_secret, e.ENCRYPTION_KEY)).trim();
          } catch {
          }
        }
      }
    } catch {
    }
  }
  if (!a || !n) throw new $("X API Key/Secret \u672A\u8A2D\u5B9A", 0, "no_api_key");
  if (!((o = t == null ? void 0 : t.access_token) != null && o.trim())) throw new $("Access Token \u672A\u8A2D\u5B9A", 0, "no_token");
  if (!((d = t == null ? void 0 : t.access_token_secret) != null && d.trim())) throw new $("Access Token Secret \u672A\u8A2D\u5B9A", 0, "no_token_secret");
  let i, r;
  try {
    i = await At(t.access_token, e.ENCRYPTION_KEY);
  } catch {
    throw new $("Access Token \u306E\u5FA9\u53F7\u306B\u5931\u6557", 0, "decrypt_failed");
  }
  try {
    r = await At(t.access_token_secret, e.ENCRYPTION_KEY);
  } catch {
    throw new $("Access Token Secret \u306E\u5FA9\u53F7\u306B\u5931\u6557", 0, "decrypt_failed");
  }
  if (!i.trim()) throw new $("Access Token \u304C\u7A7A", 0, "decrypt_failed");
  if (!r.trim()) throw new $("Access Token Secret \u304C\u7A7A", 0, "decrypt_failed");
  let oauth2Bearer = "";
  if (t && t.oauth2_access_token) {
    try {
      oauth2Bearer = (await At(t.oauth2_access_token, e.ENCRYPTION_KEY)).trim();
    } catch {
    }
  }
  // Account-specific posting must never fall back to a global/userless OAuth2 token.
  // Otherwise an admin or another saved token can be used for the wrong X account.
  return { consumerKey: a, consumerSecret: n, accessToken: i, accessTokenSecret: r, oauth2Bearer };
}
__name(Ft, "Ft");
var xMU_URL = "https://upload.twitter.com/1.1/media/upload.json";
async function xMU_oauth(method, url, creds, bodyParams) {
  const oa2 = { oauth_consumer_key: creds.consumerKey, oauth_nonce: En(), oauth_signature_method: "HMAC-SHA1", oauth_timestamp: Math.floor(Date.now() / 1e3).toString(), oauth_token: creds.accessToken, oauth_version: "1.0" };
  const u2 = new URL(url);
  const ap = { ...oa2 };
  u2.searchParams.forEach((v, k) => {
    ap[k] = v;
  });
  if (bodyParams) for (const k of Object.keys(bodyParams)) ap[k] = bodyParams[k];
  const ps2 = Object.keys(ap).sort().map((k) => `${oe(k)}=${oe(ap[k])}`).join("&");
  const bs2 = [method.toUpperCase(), oe(`${u2.origin}${u2.pathname}`), oe(ps2)].join("&");
  const sk = `${oe(creds.consumerSecret)}&${oe(creds.accessTokenSecret)}`;
  oa2.oauth_signature = await xn(sk, bs2);
  return `OAuth ${Object.keys(oa2).sort().map((k) => `${oe(k)}="${oe(oa2[k])}"`).join(", ")}`;
}
__name(xMU_oauth, "xMU_oauth");
async function xMU_image(creds, bytes) {
  const u8 = new Uint8Array(bytes);
  let bin = "";
  const CH = 8192;
  for (let i = 0; i < u8.length; i += CH) bin += String.fromCharCode.apply(null, u8.subarray(i, i + CH));
  const b64 = btoa(bin);
  const auth = await xMU_oauth("POST", xMU_URL, creds, { media_data: b64 });
  const body = "media_data=" + encodeURIComponent(b64);
  const r = await fetch(xMU_URL, { method: "POST", headers: { authorization: auth, "content-type": "application/x-www-form-urlencoded" }, body, signal: AbortSignal.timeout(6e4) });
  if (!r.ok) {
    const t = await r.text();
    throw new $(`X media upload failed: ${r.status} ${t.slice(0, 300)}`, r.status, "media_upload_failed");
  }
  const j2 = await r.json();
  return j2.media_id_string || String(j2.media_id || "");
}
__name(xMU_image, "xMU_image");
async function xMU_video_init(creds, size, mime) {
  const params = { command: "INIT", total_bytes: String(size), media_type: mime, media_category: "tweet_video" };
  const auth = await xMU_oauth("POST", xMU_URL, creds, params);
  const body = Object.keys(params).map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join("&");
  const r = await fetch(xMU_URL, { method: "POST", headers: { authorization: auth, "content-type": "application/x-www-form-urlencoded" }, body, signal: AbortSignal.timeout(3e4) });
  if (!r.ok) {
    const t = await r.text();
    throw new $(`X media INIT failed: ${r.status} ${t.slice(0, 300)}`, r.status, "media_init_failed");
  }
  const j2 = await r.json();
  return j2.media_id_string || String(j2.media_id || "");
}
__name(xMU_video_init, "xMU_video_init");
async function xMU_video_append(creds, mediaId, bytes, segIdx) {
  const u8 = new Uint8Array(bytes);
  let bin = "";
  const CH = 8192;
  for (let i = 0; i < u8.length; i += CH) bin += String.fromCharCode.apply(null, u8.subarray(i, i + CH));
  const b64 = btoa(bin);
  const params = { command: "APPEND", media_id: mediaId, media_data: b64, segment_index: String(segIdx) };
  const auth = await xMU_oauth("POST", xMU_URL, creds, params);
  const body = Object.keys(params).map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join("&");
  const r = await fetch(xMU_URL, { method: "POST", headers: { authorization: auth, "content-type": "application/x-www-form-urlencoded" }, body, signal: AbortSignal.timeout(6e4) });
  if (!r.ok) {
    const t = await r.text();
    throw new $(`X media APPEND failed: ${r.status} ${t.slice(0, 300)}`, r.status, "media_append_failed");
  }
}
__name(xMU_video_append, "xMU_video_append");
async function xMU_video_finalize(creds, mediaId) {
  const params = { command: "FINALIZE", media_id: mediaId };
  const auth = await xMU_oauth("POST", xMU_URL, creds, params);
  const body = Object.keys(params).map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join("&");
  const r = await fetch(xMU_URL, { method: "POST", headers: { authorization: auth, "content-type": "application/x-www-form-urlencoded" }, body, signal: AbortSignal.timeout(3e4) });
  if (!r.ok) {
    const t = await r.text();
    throw new $(`X media FINALIZE failed: ${r.status} ${t.slice(0, 300)}`, r.status, "media_finalize_failed");
  }
  const j2 = await r.json();
  return j2;
}
__name(xMU_video_finalize, "xMU_video_finalize");
async function xMU_video(creds, bytes, mime) {
  const id = await xMU_video_init(creds, bytes.byteLength, mime);
  const CHUNK = 1024 * 1024 * 4;
  const u8 = new Uint8Array(bytes);
  let seg = 0;
  for (let off2 = 0; off2 < u8.length; off2 += CHUNK) {
    const slice = u8.slice(off2, Math.min(off2 + CHUNK, u8.length));
    await xMU_video_append(creds, id, slice.buffer, seg);
    seg++;
  }
  await xMU_video_finalize(creds, id);
  return id;
}
__name(xMU_video, "xMU_video");
async function xMU_upload(creds, bytes, mime) {
  if (mime && mime.startsWith("video/")) return xMU_video(creds, bytes, mime);
  return xMU_image(creds, bytes);
}
__name(xMU_upload, "xMU_upload");
async function readMediaBytes(env2, asset) {
  if (!asset || !asset.storage_path) return { bytes: null, mime: asset && asset.mime_type || "application/octet-stream" };
  const sp = asset.storage_path;
  if (sp.startsWith("data:")) {
    const m2 = sp.match(/^data:([^;]+);base64,(.+)$/);
    if (!m2) return { bytes: null, mime: asset.mime_type || "application/octet-stream" };
    const bin = atob(m2[2]);
    const u8 = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
    return { bytes: u8.buffer, mime: m2[1] || asset.mime_type || "image/jpeg" };
  }
  if (sp.startsWith("/media/")) {
    if (!env2.MEDIA_BUCKET) return { bytes: null, mime: asset.mime_type || "image/jpeg" };
    const obj = await env2.MEDIA_BUCKET.get(sp.slice(7));
    if (!obj) return { bytes: null, mime: asset.mime_type || "image/jpeg" };
    return { bytes: await obj.arrayBuffer(), mime: asset.mime_type || obj.httpMetadata && obj.httpMetadata.contentType || "image/jpeg" };
  }
  if (/^https?:/i.test(sp)) {
    const rr = await fetch(sp, { signal: AbortSignal.timeout(3e4) });
    if (!rr.ok) return { bytes: null, mime: asset.mime_type || "image/jpeg" };
    return { bytes: await rr.arrayBuffer(), mime: asset.mime_type || rr.headers.get("content-type") || "image/jpeg" };
  }
  return { bytes: null, mime: asset.mime_type || "application/octet-stream" };
}
__name(readMediaBytes, "readMediaBytes");
var ge = new A();
ge.get("/api/admin/accounts", m, async (e) => {
  const t = e.get("user"), { results: s } = await e.env.DB.prepare(`SELECT id, account_name, x_user_id, x_username,
            daily_post_count, daily_post_limit, last_posted_at,
            account_health_score, health_status, is_active, is_current, created_at
       FROM x_accounts WHERE user_id = ? ORDER BY id DESC`).bind(t.id).all();
  return e.json({ accounts: s || [] });
});
ge.post("/api/admin/accounts", m, async (e) => {
  var r, o;
  const t = e.get("user"), s = await e.req.json();
  if (!s.account_name) return e.json({ error: "account_name required" }, 400);
  if (!((s == null ? void 0 : s.api_key) != null && s.api_key.trim()) || !((s == null ? void 0 : s.api_secret) != null && s.api_secret.trim())) return e.json({ error: "api_key and api_secret required" }, 400);
  if (!((r = s.access_token) != null && r.trim()) || !((o = s.access_token_secret) != null && o.trim())) return e.json({ error: "access_token and access_token_secret required" }, 400);
  const apiKeyEnc = await _e(s.api_key.trim(), e.env.ENCRYPTION_KEY), apiSecretEnc = await _e(s.api_secret.trim(), e.env.ENCRYPTION_KEY);
  await e.env.DB.prepare("INSERT INTO x_api_settings (user_id, api_key, api_secret, is_active, created_at, updated_at) VALUES (?, ?, ?, 1, ?, ?)").bind(t.id, apiKeyEnc, apiSecretEnc, g(), g()).run();
  const a = await _e(s.access_token.trim(), e.env.ENCRYPTION_KEY), n = await _e(s.access_token_secret.trim(), e.env.ENCRYPTION_KEY);
  await e.env.DB.prepare("UPDATE x_accounts SET is_current=0 WHERE user_id=?").bind(t.id).run();
  const i = await e.env.DB.prepare(`INSERT INTO x_accounts
       (user_id, account_name, access_token, access_token_secret, daily_post_limit, is_active, is_current)
     VALUES (?, ?, ?, ?, ?, 1, 1)`).bind(t.id, s.account_name, a, n, s.daily_post_limit ?? 5).run();
  return e.json({ success: true, id: i.meta.last_row_id });
});
ge.post("/api/admin/accounts/:id/test", m, async (e) => {
  const t = e.get("user"), s = parseInt(e.req.param("id"), 10), a = await e.env.DB.prepare("SELECT * FROM x_accounts WHERE id=? AND user_id=?").bind(s, t.id).first();
  if (!a) return e.json({ success: false, error: "not_found" }, 404);
  try {
    const n = await Ft(e.env, a), i = await kn(n);
    return i != null && i.id && await e.env.DB.prepare(`UPDATE x_accounts SET x_user_id=?, x_username=?, is_active=1,
           account_health_score = MAX(account_health_score, 80),
           health_status = CASE WHEN account_health_score >= 80 THEN 'healthy' ELSE health_status END,
           updated_at=? WHERE id=?`).bind(i.id, i.username || null, g(), s).run(), e.json({ success: true, me: i });
  } catch (n) {
    const i = n instanceof $ ? n.statusCode : 0;
    return e.json({ success: false, error: n.message, status_code: i, error_type: n == null ? void 0 : n.errorType });
  }
});
ge.post("/api/admin/accounts/:id/current", m, async (e) => {
  const t = e.get("user"), s = parseInt(e.req.param("id"), 10);
  return await e.env.DB.batch([e.env.DB.prepare("UPDATE x_accounts SET is_current=0 WHERE user_id=?").bind(t.id), e.env.DB.prepare("UPDATE x_accounts SET is_current=1, updated_at=? WHERE id=? AND user_id=?").bind(g(), s, t.id)]), e.json({ success: true });
});
ge.post("/api/admin/accounts/:id/toggle", m, async (e) => {
  const t = e.get("user"), s = parseInt(e.req.param("id"), 10);
  return await e.env.DB.prepare("UPDATE x_accounts SET is_active = 1 - is_active, updated_at = ? WHERE id=? AND user_id=?").bind(g(), s, t.id).run(), e.json({ success: true });
});
ge.put("/api/admin/accounts/:id", m, async (e) => {
  var r, o;
  const t = e.get("user"), s = parseInt(e.req.param("id"), 10), a = await e.req.json(), n = [], i = [];
  if (a.account_name && (n.push("account_name=?"), i.push(a.account_name)), a.daily_post_limit !== void 0 && (n.push("daily_post_limit=?"), i.push(a.daily_post_limit)), (r = a.access_token) != null && r.trim()) {
    const d = await _e(a.access_token.trim(), e.env.ENCRYPTION_KEY);
    n.push("access_token=?"), i.push(d);
  }
  if ((o = a.access_token_secret) != null && o.trim()) {
    const d = await _e(a.access_token_secret.trim(), e.env.ENCRYPTION_KEY);
    n.push("access_token_secret=?"), i.push(d);
  }
  return n.length === 0 ? e.json({ success: false, error: "no_fields" }) : (n.push("updated_at=?"), i.push(g(), s, t.id), await e.env.DB.prepare(`UPDATE x_accounts SET ${n.join(", ")} WHERE id=? AND user_id=?`).bind(...i).run(), e.json({ success: true }));
});
ge.delete("/api/admin/accounts/:id", m, async (e) => {
  const t = e.get("user");
  return await e.env.DB.prepare("DELETE FROM x_accounts WHERE id=? AND user_id=?").bind(parseInt(e.req.param("id"), 10), t.id).run(), e.json({ success: true });
});
var Sn = ["20\u4EE3", "30\u4EE3", "40\u4EE3", "50\u4EE3"];
var Tn = ["\u7537\u6027", "\u5973\u6027"];
var Dn = ["\u7F8E\u5BB9", "\u5065\u5EB7", "\u526F\u696D", "\u6295\u8CC7", "AI\u6D3B\u7528", "\u30C0\u30A4\u30A8\u30C3\u30C8", "\u304A\u91D1"];
var An = { \u7F8E\u5BB9: "\u8001\u5316\u30FB\u808C\u8352\u308C\u30FB\u898B\u305F\u76EE\u306E\u5909\u5316", \u5065\u5EB7: "\u75B2\u308C\u3084\u3059\u3044\u30FB\u4F53\u529B\u4F4E\u4E0B\u30FB\u4E0D\u8ABF", \u526F\u696D: "\u6642\u9593\u304C\u306A\u3044\u30FB\u4F55\u304B\u3089\u59CB\u3081\u308B\u304B\u4E0D\u660E", \u6295\u8CC7: "\u52DD\u3066\u306A\u3044\u30FB\u8CC7\u7523\u304C\u5897\u3048\u306A\u3044", AI\u6D3B\u7528: "\u624B\u4F5C\u696D\u304C\u591A\u3044\u30FB\u52B9\u7387\u304C\u60AA\u3044", \u30C0\u30A4\u30A8\u30C3\u30C8: "\u30EA\u30D0\u30A6\u30F3\u30C9\u30FB\u7D9A\u304B\u306A\u3044", \u304A\u91D1: "\u8CAF\u307E\u3089\u306A\u3044\u30FB\u5C06\u6765\u4E0D\u5B89" };
var Rn = { \u7F8E\u5BB9: "\u82E5\u3005\u3057\u304F\u306A\u308A\u305F\u3044", \u5065\u5EB7: "\u5143\u6C17\u306B\u904E\u3054\u3057\u305F\u3044", \u526F\u696D: "\u53CE\u76CA\u5316\u3057\u305F\u3044", \u6295\u8CC7: "\u5B89\u5B9A\u3057\u3066\u5229\u76CA\u3092\u51FA\u3057\u305F\u3044", AI\u6D3B\u7528: "\u696D\u52D9\u3092\u81EA\u52D5\u5316\u3057\u305F\u3044", \u30C0\u30A4\u30A8\u30C3\u30C8: "\u7406\u60F3\u306E\u4F53\u578B\u306B\u306A\u308A\u305F\u3044", \u304A\u91D1: "\u7D4C\u6E08\u7684\u81EA\u7531\u3092\u5F97\u305F\u3044" };
var Fs = [];
for (const e of Sn) for (const t of Tn) for (const s of Dn) Fs.push({ key: `${e}_${t}_${s}`, label: `${e}${t}/${s}`, gender: t, age_range: e, genre: s, problem: An[s] || `${s}\u306B\u60A9\u3093\u3067\u3044\u308B`, goal: Rn[s] || `${s}\u3067\u6210\u679C\u3092\u51FA\u3057\u305F\u3044`, knowledge: "\u4E00\u822C" });
var On = [{ key: "authority", label: "\u6A29\u5A01\u578B", instruction: "\u5C02\u9580\u5BB6\u3068\u3057\u3066\u65AD\u5B9A\u7684\u306B\u3001\u7C21\u6F54\u306B\u3001\u6839\u62E0\u3092\u793A\u3057\u3066\u66F8\u304F\u3002" }, { key: "empathy", label: "\u5171\u611F\u578B", instruction: "\u8AAD\u8005\u306E\u60A9\u307F\u306B\u5BC4\u308A\u6DFB\u3044\u3001\u5171\u611F\u3092\u8D77\u70B9\u306B\u8A9E\u308A\u304B\u3051\u308B\u3088\u3046\u306B\u66F8\u304F\u3002" }, { key: "provocative", label: "\u717D\u308A\u578B", instruction: "\u554F\u984C\u3092\u92ED\u304F\u7A81\u304D\u3001\u5371\u6A5F\u611F\u3092\u6301\u305F\u305B\u308B\u66F8\u304D\u65B9\u306B\u3059\u308B\u3002" }, { key: "story", label: "\u30B9\u30C8\u30FC\u30EA\u30FC\u578B", instruction: "\u4F53\u9A13\u8AC7\u3084\u5909\u5316\u306E\u6D41\u308C\u3092\u611F\u3058\u3055\u305B\u308B\u69CB\u6210\u3067\u66F8\u304F\u3002" }, { key: "problem_raise", label: "\u554F\u984C\u63D0\u8D77\u578B", instruction: "\u6700\u521D\u306B\u8AB2\u984C\u3092\u63D0\u793A\u3057\u3001\u305D\u306E\u539F\u56E0\u3068\u89E3\u6C7A\u7B56\u3092\u793A\u3059\u3002" }];
var Rt = { problem: { name: "\u554F\u984C\u63D0\u8D77\u578B", instruction: `\u3010\u554F\u984C\u63D0\u8D77\u578B\u3011
1.\u5192\u982D\u3067\u8AAD\u8005\u306E\u75DB\u307F\u3092\u7A81\u304F\u8CEA\u554F
2.\u5177\u4F53\u7684\u306A\u72B6\u6CC1\u3092\u4E00\u3064\u306E\u81EA\u7136\u306A\u6587\u3068\u3057\u3066\u63CF\u5199\uFF08\u7B87\u6761\u66F8\u304D\u306B\u305B\u305A\u3001\u6D41\u308C\u308B\u65E5\u672C\u8A9E\u3067\uFF09
3.\u300C\u5B9F\u306F\u305D\u308C\u25CB\u25CB\u304C\u539F\u56E0\u300D\u3068\u6838\u5FC3
4.\u89E3\u6C7A\u306E\u65B9\u5411\u6027
5.CTA\u3067\u6B21\u306E\u30B9\u30C6\u30C3\u30D7\u3078
\u203B\u6700\u5F8C\u307E\u3067\u66F8\u304D\u5207\u308B\u3053\u3068
\u203B\u7B87\u6761\u66F8\u304D(\u30FB,\u25CF,\u25AA,\u2022)\u306F\u4E00\u5207\u4F7F\u308F\u305A\u3001\u81EA\u7136\u306A\u65E5\u672C\u8A9E\u306E\u6587\u7AE0\u306E\u307F\u3067\u66F8\u304F` }, before_after: { name: "\u30D3\u30D5\u30A9\u30FC\u30A2\u30D5\u30BF\u30FC\u578B", instruction: `\u3010\u5909\u5316\u304C\u4F1D\u308F\u308B\u69CB\u6210\u3011
\u5192\u982D\u3067\u904E\u53BB\u306E\u60A9\u307F\u3084\u72B6\u614B\u3092\u81EA\u7136\u306B\u63CF\u5199\u3057\u3001\u304D\u3063\u304B\u3051\u3084\u884C\u52D5\u3092\u793A\u3057\u3001\u73FE\u5728\u306E\u5909\u5316\u3084\u6210\u679C\u3092\u4F1D\u3048\u3001\u6700\u5F8C\u306B\u5B66\u3073\u3084\u63D0\u6848\u3092\u5165\u308C\u3066\u304F\u3060\u3055\u3044\u3002
\u300CBefore:\u300D\u300CAfter:\u300D\u306E\u30E9\u30D9\u30EB\u3092\u4F7F\u308F\u305A\u3001\u81EA\u7136\u306A\u8A9E\u308A\u53E3\u3067\u5909\u5316\u306E\u30B9\u30C8\u30FC\u30EA\u30FC\u3092\u4F1D\u3048\u308B\u3053\u3068\u3002
\u6BCE\u56DE\u7570\u306A\u308B\u8A00\u3044\u56DE\u3057\u30FB\u5C55\u958B\u306B\u3057\u3001\u540C\u3058\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u69CB\u6587\u3092\u7E70\u308A\u8FD4\u3055\u306A\u3044\u3053\u3068\u3002
\u203B\u7B87\u6761\u66F8\u304D(\u30FB,\u25CF,\u25AA,\u2022)\u306F\u4E00\u5207\u4F7F\u308F\u305A\u3001\u81EA\u7136\u306A\u65E5\u672C\u8A9E\u306E\u6587\u7AE0\u306E\u307F\u3067\u66F8\u304F` }, contrarian: { name: "\u9006\u5F35\u308A\u578B", instruction: `\u3010\u9006\u5F35\u308A\u578B\u3011
1.\u300C\u25CB\u25CB\u3059\u3079\u304D\u300D\u306E\u5E38\u8B58\u63D0\u793A
2.\u300C\u5B9F\u306F\u9006\u300D\u3068\u3072\u3063\u304F\u308A\u8FD4\u3059
3.\u6839\u62E0
4.\u4EE3\u66FF\u6848
5.CTA
\u203B\u7B87\u6761\u66F8\u304D(\u30FB,\u25CF,\u25AA,\u2022)\u306F\u4E00\u5207\u4F7F\u308F\u305A\u3001\u81EA\u7136\u306A\u65E5\u672C\u8A9E\u306E\u6587\u7AE0\u306E\u307F\u3067\u66F8\u304F` }, howto: { name: "HowTo\u5B9F\u6F14\u578B", instruction: `\u3010HowTo\u5B9F\u6F14\u578B\u3011
1.\u300C\u25CB\u25CB\u3059\u308B\u65B9\u6CD5\u300D\u5BA3\u8A00
2.Step1\u21922\u21923\u3092\u81EA\u7136\u306A\u6587\u7AE0\u3067\u7E4B\u3052\u3066\u8AAC\u660E
3.\u5404\u30B9\u30C6\u30C3\u30D7\u5177\u4F53\u4F8B
4.\u30EF\u30F3\u30DD\u30A4\u30F3\u30C8
5.CTA
\u203B\u7B87\u6761\u66F8\u304D(\u30FB,\u25CF,\u25AA,\u2022)\u306F\u4E00\u5207\u4F7F\u308F\u305A\u3001\u81EA\u7136\u306A\u65E5\u672C\u8A9E\u306E\u6587\u7AE0\u306E\u307F\u3067\u66F8\u304F` }, numbers: { name: "\u6570\u5B57\u30A4\u30F3\u30D1\u30AF\u30C8\u578B", instruction: `\u3010\u6570\u5B57\u30A4\u30F3\u30D1\u30AF\u30C8\u578B\u3011
1.\u5192\u982D\u306B\u30A4\u30F3\u30D1\u30AF\u30C8\u6570\u5B57
2.\u80CC\u666F
3.\u306A\u305C\u305D\u306E\u6570\u5B57\u304B
4.\u8AAD\u8005\u304C\u540C\u3058\u7D50\u679C\u3092\u5F97\u308B\u6761\u4EF6
5.CTA
\u203B\u7B87\u6761\u66F8\u304D(\u30FB,\u25CF,\u25AA,\u2022)\u306F\u4E00\u5207\u4F7F\u308F\u305A\u3001\u81EA\u7136\u306A\u65E5\u672C\u8A9E\u306E\u6587\u7AE0\u306E\u307F\u3067\u66F8\u304F` } };
async function qs(e, t) {
  var r, o, d;
  const s = t.model || "gpt-4o-mini", a = t.maxTokens || 4e3, n = t.temperature ?? 0.7, i = t.baseUrl || "https://api.openai.com/v1";
  for (let l = 1; l <= 3; l++) try {
    const c = await fetch(`${i}/chat/completions`, { method: "POST", headers: { authorization: `Bearer ${t.apiKey}`, "content-type": "application/json" }, body: JSON.stringify({ model: s, messages: e, max_tokens: a, temperature: n }), signal: AbortSignal.timeout(12e4) });
    if (!c.ok) {
      const _ = await c.text();
      if (c.status >= 500 && l < 3) {
        await new Promise((b) => setTimeout(b, 2e3 * l));
        continue;
      }
      throw new Error(`OpenAI API error: ${c.status} ${_.slice(0, 500)}`);
    }
    const p = await c.json();
    return ((d = (o = (r = p == null ? void 0 : p.choices) == null ? void 0 : r[0]) == null ? void 0 : o.message) == null ? void 0 : d.content) || "";
  } catch (c) {
    if (((c == null ? void 0 : c.name) === "TimeoutError" || (c == null ? void 0 : c.name) === "AbortError") && l < 3) {
      await new Promise((_) => setTimeout(_, 2e3 * l));
      continue;
    }
    throw c;
  }
  return "";
}
__name(qs, "qs");
function Ps(e) {
  let t = `\u4EE5\u4E0B\u306E\u30EB\u30FC\u30EB\u3092\u53B3\u5B88\u3057\u3066X(Twitter)\u6295\u7A3F\u6587\u3092\u751F\u6210\u3057\u3066\u304F\u3060\u3055\u3044\u3002
`;
  if (e.brandVoice && typeof e.brandVoice == "object" ? (t += `
\u3010\u30D6\u30E9\u30F3\u30C9\u30DC\u30A4\u30B9\u3011
`, e.brandVoice.tone && (t += `\u53E3\u8ABF: ${e.brandVoice.tone}
`), e.brandVoice.worldview && (t += `\u4E16\u754C\u89B3: ${e.brandVoice.worldview}
`), e.brandVoice.personal_story && (t += `\u500B\u4EBA\u30B9\u30C8\u30FC\u30EA\u30FC: ${e.brandVoice.personal_story}
`), e.brandVoice.prohibited_words && (t += `\u7981\u6B62\u30EF\u30FC\u30C9: ${e.brandVoice.prohibited_words.replace(/\n/g, ", ")}
`), t += `\u4E0A\u8A18\u306E\u53E3\u8ABF\u30FB\u4E16\u754C\u89B3\u3092\u5FC5\u305A\u5B88\u308B\u3053\u3068\u3002
`) : t += `\u53E3\u8ABF: \u4E01\u5BE7\u30FB\u7C21\u6F54\u30FB\u5B9F\u7528\u91CD\u8996
`, e.targetDna && typeof e.targetDna == "object") {
    const r = e.targetDna;
    t += `
\u3010\u30BF\u30FC\u30B2\u30C3\u30C8\u8AAD\u8005\u3011
`, r.age_range && (t += `\u5E74\u9F62\u5C64: ${r.age_range}
`), r.gender && (t += `\u6027\u5225: ${r.gender}
`), r.occupation && (t += `\u8077\u696D: ${r.occupation}
`), r.pains && (t += `\u60A9\u307F: ${r.pains.replace(/\n/g, " / ")}
`), r.desires && (t += `\u6B32\u6C42: ${r.desires.replace(/\n/g, " / ")}
`), r.purchase_triggers && (t += `\u884C\u52D5\u30C8\u30EA\u30AC\u30FC: ${r.purchase_triggers.replace(/\n/g, " / ")}
`), t += `\u3053\u306E\u8AAD\u8005\u304C\u81EA\u7136\u306B\u53CD\u5FDC\u3059\u308B\u8A9E\u5F59\u30FB\u4F8B\u3048\u3092\u4F7F\u3046\u3053\u3068\u3002
`;
  }
  const s = `
Markdown\u8A18\u53F7(#,##)\u7981\u6B62\u3002\u898B\u51FA\u3057\u306F\u300C\u25A0\u300D\u3002\u756A\u53F7\u30EA\u30B9\u30C8\u7981\u6B62\u3002\u7B87\u6761\u66F8\u304D(\u30FB,\u25CF,\u25AA,\u2022\u306A\u3069)\u306F\u4F7F\u308F\u305A\u3001\u81EA\u7136\u306A\u65E5\u672C\u8A9E\u306E\u6587\u7AE0\u306E\u307F\u3067\u66F8\u304F\u3002AI\u751F\u6210\u3063\u307D\u3044\u5B9A\u578B\u6587\u3084\u7F85\u5217\u3092\u907F\u3051\u3001\u4EBA\u9593\u304C\u66F8\u3044\u305F\u3088\u3046\u306A\u6D41\u308C\u308B\u6587\u7AE0\u306B\u3059\u308B\u3002`;
  let a = "";
  e.patternType && Rt[e.patternType] && (a = `
\u3010\u6295\u7A3F\u30D1\u30BF\u30FC\u30F3\uFF08\u69CB\u9020\u306E\u307F\uFF09\u3011
${Rt[e.patternType].instruction}`);
  let n = `\u30C6\u30FC\u30DE: ${e.theme || ""}${e.keywords ? `
\u30AD\u30FC\u30EF\u30FC\u30C9: ${e.keywords}` : ""}`;
  e.postMode === "140" ? n += `
140\u6587\u5B57\u4EE5\u5185\u306EX\u6295\u7A3F\u3092\u4F5C\u6210\u3002\u7C21\u6F54\u304B\u3064\u30A4\u30F3\u30D1\u30AF\u30C8\u91CD\u8996\u3002\u30CF\u30C3\u30B7\u30E5\u30BF\u30B0\u306F\u542B\u3081\u306A\u3044\u3002` : e.postMode === "simple" ? n += `
\u30B7\u30F3\u30D7\u30EB\u751F\u6210\u3068\u3057\u3066\u30012\u884C\u7A0B\u5EA6\u306E\u77ED\u3044X\u6295\u7A3F\u6587\u3060\u3051\u3092\u4F5C\u6210\u3002\u9577\u6587\u30FB\u672C\u6587\u8A18\u4E8B\u30FB\u898B\u51FA\u3057\u30FB\u7B87\u6761\u66F8\u304D\u306F\u7981\u6B62\u3002\u30CF\u30C3\u30B7\u30E5\u30BF\u30B0\u306F\u542B\u3081\u306A\u3044\u3002` : n += `
X\u6295\u7A3F\u7528\u306E\u30D5\u30EB\u6587\u7AE0\u3092\u4F5C\u6210\u3002\u8AAD\u307F\u3084\u3059\u304F\u6539\u884C\u3092\u5165\u308C\u308B\u3002\u30CF\u30C3\u30B7\u30E5\u30BF\u30B0\u306F\u542B\u3081\u306A\u3044\u3002`, e.cta && (n += `
CTA: ${e.cta}`), e.userInput && (n += `
\u8FFD\u52A0\u6307\u793A: ${e.userInput}`);
  const i = t + a + s;
  return { messages: [{ role: "system", content: i }, { role: "user", content: n }], systemPrompt: i, userPrompt: n };
}
__name(Ps, "Ps");
async function Hs(e, t, s, a, n, i = "body") {
  const { messages: r } = Ps({ theme: t, keywords: s, brandVoice: n, targetDna: a, postMode: i || "body" }), o = await qs(r, { apiKey: e, temperature: 0.8 });
  return bt(o, i);
}
__name(Hs, "Hs");
async function Us(e, t, s, a, n, i, r = "body") {
  if (!Rt[t]) throw new Error(`\u672A\u5BFE\u5FDC\u306E\u30D1\u30BF\u30FC\u30F3: ${t}`);
  const { messages: o } = Ps({ theme: s, keywords: a, brandVoice: i, targetDna: n, patternType: t, postMode: r || "body" }), d = await qs(o, { apiKey: e, temperature: 0.8 });
  return bt(d, r);
}
__name(Us, "Us");
function bt(e, t) {
  if (!e) return "";
  let s = e.replace(/^#{1,4}\s*/gm, "").replace(/^[笆ｪ・鞘蔓笳鞘｢繝ｻ\-\*]+\s*/gm, "").replace(/^\d+\.\s/gm, "").replace(/^(Step\d+)[:\s]/gim, "").replace(/^[竭竭｡竭｢竭｣竭､竭･竭ｦ竭ｧ竭ｨ竭ｩ]\s*/gm, "").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\n{3,}/g, `

`).trim();
  if (t === "simple") return simpleTwoLineText(s);
  return s = insertBreaks20(s), s = jn(s), t === "140" && s.length > 140 && (s = s.slice(0, 137) + "..."), t === "simple" && (s = s.split(/\n+/).filter(Boolean).slice(0, 2).join(`
`), s.length > 120 && (s = s.slice(0, 117) + "...")), s;
}
__name(bt, "bt");
function simpleTwoLineText(e) {
  let t = String(e || "").replace(/\r/g, "\n").replace(/^[■□◆◇・●○\-\*\s]+/gm, "").replace(/^\d+\.\s+/gm, "").replace(/#[^\s#]+/g, "").replace(/\s+/g, " ").trim();
  if (/FX|投資|資産|利益|口座|トレード/i.test(t)) return "FXは少額から学ぶ\nリスク管理を忘れない";
  const s = t.split(/(?<=[。！？!?])\s*/).map((a) => a.trim()).filter(Boolean);
  let a = s.length >= 2 ? s.slice(0, 2) : t.split(/[。！？!?、,]\s*/).map((n) => n.trim()).filter(Boolean).slice(0, 2);
  if (!a.length) a = ["今日できる小さな一歩を決める。", "無理なく続けることから始めよう。"];
  if (a.length === 1) a.push("まずは一つだけ行動してみよう。");
  a = a.slice(0, 2).map((n) => {
    n = n.replace(/[。！？!?]+$/g, "");
    return n.length > 13 ? n.slice(0, 12) + "…" : n;
  });
  return a.join(`
`);
}
__name(simpleTwoLineText, "simpleTwoLineText");
function xFitTweetText(e) {
  let t = String(e || "").trim();
  if (t.length <= 280) return t;
  t = t.replace(/\n{2,}/g, "\n").split(/\n+/).filter(Boolean).join("\n");
  if (t.length <= 280) return t;
  return t.slice(0, 277) + "...";
}
__name(xFitTweetText, "xFitTweetText");
function insertBreaks20(text) {
  if (!text) return "";
  const lines = text.split("\n");
  const out = [];
  for (const ln2 of lines) {
    if (!ln2.trim()) {
      out.push(ln2);
      continue;
    }
    if (/^https?:\/\//.test(ln2.trim()) || /^#/.test(ln2.trim())) {
      out.push(ln2);
      continue;
    }
    let buf = "";
    let cnt = 0;
    for (let i = 0; i < ln2.length; i++) {
      const ch = ln2[i];
      buf += ch;
      cnt++;
      if (cnt >= 18 && i < ln2.length - 1) {
        const next = ln2[i + 1];
        if (/[縲√ゑｼ・ｼ滂ｼ鯉ｼ・.!?\s]/.test(ch) || /[縲後趣ｼ・]/.test(next)) {
          out.push(buf);
          buf = "";
          cnt = 0;
        } else if (cnt >= 24) {
          out.push(buf);
          buf = "";
          cnt = 0;
        }
      }
    }
    if (buf) out.push(buf);
  }
  return out.join("\n");
}
__name(insertBreaks20, "insertBreaks20");
function jn(e) {
  if (!e) return "";
  const t = e.split(`
`).length, s = e.replace(/\n/g, "").length;
  if (t > 3 || s < 40) return e;
  const a = e.split(new RegExp("(?<=[\u3002\uFF01\uFF1F!?\\n])", "g")).filter((r) => r.trim());
  if (a.length <= 1) return e;
  let n = "", i = 0;
  for (let r = 0; r < a.length; r++) {
    const o = a[r].trim();
    if (o) {
      if (/^https?:\/\//.test(o) || /^#/.test(o) || /^@/.test(o)) {
        n && !n.endsWith(`
`) && (n += `
`), n += o, i = 0;
        continue;
      }
      n += o, i++, i >= 2 && r < a.length - 1 ? (n += `

`, i = 0) : r < a.length - 1 && !o.endsWith(`
`) && (n += `
`);
    }
  }
  return n.replace(/\n{3,}/g, `

`).trim();
}
__name(jn, "jn");
var In = new TextEncoder();
async function Ae(e) {
  const t = await crypto.subtle.digest("SHA-256", In.encode(e || ""));
  return [...new Uint8Array(t)].slice(0, 8).map((a) => a.toString(16).padStart(2, "0")).join("");
}
__name(Ae, "Ae");
function Ot(e) {
  const t = (e || "").replace(/\s+/g, "").slice(0, 2e3), s = /* @__PURE__ */ new Set();
  for (let a = 0; a < t.length - 1; a++) s.add(t.slice(a, a + 2));
  return s;
}
__name(Ot, "Ot");
function Ws(e, t) {
  const s = Ot(e), a = Ot(t);
  if (s.size === 0 && a.size === 0) return 0;
  let n = 0;
  for (const r of s) a.has(r) && n++;
  const i = s.size + a.size - n;
  return i === 0 ? 0 : n / i;
}
__name(Ws, "Ws");
var Cn = 15 * 1e3;
async function Ys(e, t) {
  const s = (/* @__PURE__ */ new Date()).toISOString(), a = new Date(Date.now() - Cn).toISOString(), n = await e.DB.prepare("SELECT account_id, locked_at FROM post_locks WHERE account_id = ?").bind(t).first();
  return n && n.locked_at > a ? false : (await e.DB.prepare(`INSERT INTO post_locks (account_id, locked_at) VALUES (?, ?)
     ON CONFLICT(account_id) DO UPDATE SET locked_at = excluded.locked_at`).bind(t, s).run(), true);
}
__name(Ys, "Ys");
async function Js(e, t) {
  await e.DB.prepare("DELETE FROM post_locks WHERE account_id = ?").bind(t).run();
}
__name(Js, "Js");
async function Ks(e, t, s, a, n, opts = {}) {
  const i = { ok: true, errors: [], warnings: [] }, r = await e.DB.prepare("SELECT daily_post_count, daily_post_limit, last_posted_at, last_daily_reset_date, health_status FROM x_accounts WHERE id = ?").bind(t).first();
  if (!r) return i.ok = false, i.errors.push({ code: "account_not_found", message: "\u30A2\u30AB\u30A6\u30F3\u30C8\u304C\u5B58\u5728\u3057\u307E\u305B\u3093" }), i;
  const o = new Date(Date.now() + 9 * 3600 * 1e3).toISOString().slice(0, 10);
  let d = r.daily_post_count || 0;
  if (r.last_daily_reset_date !== o && (d = 0), 0) {
  }
  const { results: l } = await e.DB.prepare(`SELECT id, body FROM post_queue
       WHERE account_id = ? AND status = 'posted'
       ORDER BY COALESCE(posted_at, scheduled_at, created_at) DESC
       LIMIT 5`).bind(t).all();
  if ((s || "").length > 20) for (const c of l || []) {
    if ((c.body || "").length <= 20) continue;
    const p = Ws(s, c.body || "");
    if (p >= 0.98) {
      i.errors.push({ code: "too_similar", message: `\u904E\u53BB\u6295\u7A3F (ID: ${c.id}) \u3068\u5B8C\u5168\u306B\u540C\u4E00\u306E\u6587\u7AE0\u3067\u3059` });
      break;
    }
  }
  if (a && !(opts && opts.skipLinkSpam)) {
    const c = await e.DB.prepare(`SELECT COUNT(*) AS n FROM post_queue
        WHERE account_id = ? AND link_url = ? AND status IN ('posted','approved','publishing')
          AND DATE(COALESCE(posted_at, scheduled_at, created_at)) >= DATE('now','+9 hours','-7 days')`).bind(t, a).first();
    ((c == null ? void 0 : c.n) ?? 0) >= 3 && i.errors.push({ code: "link_spam", message: `\u540C\u4E00\u30EA\u30F3\u30AF\u3092\u904E\u53BB7\u65E5\u3067${c == null ? void 0 : c.n}\u56DE\u4F7F\u7528\u3057\u3066\u3044\u307E\u3059` });
  }
  if (n) {
    const c = es(n);
    if (c.size > 0) {
      const { results: p } = await e.DB.prepare(`SELECT hashtags FROM post_queue
           WHERE account_id = ? AND status IN ('posted','approved','publishing') AND hashtags IS NOT NULL AND hashtags != ''
           ORDER BY COALESCE(posted_at, scheduled_at, created_at) DESC LIMIT 3`).bind(t).all();
      (p || []).length >= 3 && (p || []).every((b) => {
        const T = [...es(b.hashtags || "")].filter((D) => c.has(D)).length;
        return (c.size === 0 ? 0 : T / c.size) >= 0.8;
      }) && i.errors.push({ code: "hashtag_spam", message: "\u540C\u4E00\u30CF\u30C3\u30B7\u30E5\u30BF\u30B0\u30BB\u30C3\u30C8\u304C 3 \u56DE\u9023\u7D9A\u3067 80%\u4EE5\u4E0A\u4E00\u81F4\u3057\u3066\u3044\u307E\u3059" });
    }
  }
  return r.health_status === "risk" && i.errors.push({ code: "health_risk", message: "\u30A2\u30AB\u30A6\u30F3\u30C8\u5065\u5168\u6027\u30B9\u30B3\u30A2\u304C\u5371\u967A\u57DF\u3067\u3059\u3002\u6295\u7A3F\u3092\u63A7\u3048\u3066\u304F\u3060\u3055\u3044\u3002" }), i.ok = i.errors.length === 0, i;
}
__name(Ks, "Ks");
function es(e) {
  return new Set((e || "").split(/[\s,]+/).map((t) => t.trim().replace(/^#/, "").toLowerCase()).filter(Boolean));
}
__name(es, "es");
async function mt(e, t, s, a, n) {
  const i = await e.DB.prepare("SELECT account_health_score FROM x_accounts WHERE id = ?").bind(t).first();
  if (!i) return { score_after: 100, status_after: "healthy" };
  let r = Math.max(0, Math.min(100, (i.account_health_score ?? 100) + a));
  const o = r >= 80 ? "healthy" : r >= 60 ? "caution" : "risk";
  return await e.DB.prepare("UPDATE x_accounts SET account_health_score = ?, health_status = ?, updated_at = datetime('now','+9 hours') WHERE id = ?").bind(r, o, t).run(), await e.DB.prepare(`INSERT INTO account_health_events (account_id, event_type, delta, score_after, status_after, metadata)
     VALUES (?, ?, ?, ?, ?, ?)`).bind(t, s, a, r, o, n ? JSON.stringify(n) : null).run(), { score_after: r, status_after: o };
}
__name(mt, "mt");
function ge365xIsXExternalBlock(e) {
  return /spend cap|billing cycle|rate limited|rate limit|too many requests/i.test(String(e || ""));
}
__name(ge365xIsXExternalBlock, "ge365xIsXExternalBlock");
function ts(e) {
  if (!e) return Date.now();
  const t = e.replace(" ", "T") + "+09:00", s = Date.parse(t);
  return Number.isNaN(s) ? Date.now() : s;
}
__name(ts, "ts");
function ss(e) {
  return new Date(e + 324e5).toISOString().replace("T", " ").slice(0, 19);
}
__name(ss, "ss");
async function Bn(e, t, s) {
  const a = s.jitter_enabled !== false, n = s.jitter_minutes ?? 5, i = s.collision_avoidance_enabled !== false, r = s.min_spacing_seconds ?? 90;
  let o = ts(t), d = 0, l = 0;
  if (a && n > 0) {
    const _ = Math.floor((Math.random() * 2 - 1) * n * 60);
    d = _, o += _ * 1e3;
  }
  if (i && s.account_id) {
    const _ = ss(o), b = [s.account_id, _, _];
    let v = `
      SELECT COALESCE(effective_scheduled_at, scheduled_at) AS sat
        FROM post_queue
       WHERE account_id = ?
         AND status NOT IN ('cancelled','rejected','failed')
         AND COALESCE(effective_scheduled_at, scheduled_at) IS NOT NULL
         AND datetime(COALESCE(effective_scheduled_at, scheduled_at)) >= datetime(?, '-1 hours')
         AND datetime(COALESCE(effective_scheduled_at, scheduled_at)) <= datetime(?, '+1 hours')`;
    s.exclude_id && (v += " AND id != ?", b.push(s.exclude_id)), v += " ORDER BY sat ASC";
    const { results: T } = await e.DB.prepare(v).bind(...b).all();
    let E = true, D = 0;
    for (; E && D < 30; ) {
      E = false;
      for (const k of T || []) {
        const N = ts(k.sat), P = Math.abs(o - N) / 1e3;
        if (P < r) {
          const L = (r - P + 1) * 1e3 * (o >= N ? 1 : -1);
          o += L, l += Math.floor(L / 1e3), E = true;
        }
      }
      D++;
    }
  }
  const c = ss(o);
  return { effective_at: c, audit: { base_at: t, effective_at: c, jitter_applied_seconds: d, collision_adjusted_seconds: l, ruleset: { jitter_enabled: a, jitter_minutes: n, collision_avoidance_enabled: i, min_spacing_seconds: r } } };
}
__name(Bn, "Bn");
async function Nn(e, t, s, a) {
  await e.DB.prepare("INSERT INTO schedule_audits (post_id, account_id, audit_json) VALUES (?, ?, ?)").bind(t, s ?? null, JSON.stringify(a)).run();
}
__name(Nn, "Nn");
var Ln = 0.98;
async function Mn(e) {
  const t = [...Ot(e)].slice(0, 200), s = await Ae(e);
  return JSON.stringify({ bigrams: t, content_hash: s });
}
__name(Mn, "Mn");
async function $n(e, t, s, a) {
  await e.DB.prepare("INSERT INTO post_fingerprints (post_id, account_id, fingerprint) VALUES (?, ?, ?)").bind(t, s ?? null, a).run();
}
__name($n, "$n");
async function Fn(e, t, s, a = {}) {
  const n = { pass: true, blocked_reason: null, scores: [] };
  if (!t || !s) return n;
  const i = [s];
  let r = `SELECT id, body FROM post_queue
              WHERE account_id = ? AND body IS NOT NULL AND body != ''
                AND status IN ('posted','approved','publishing')`;
  a.post_id && (r += " AND id != ?", i.push(a.post_id)), r += " ORDER BY COALESCE(posted_at, scheduled_at, created_at) DESC LIMIT 5";
  const { results: o } = await e.DB.prepare(r).bind(...i).all();
  for (const d of o || []) {
    const l = Ws(t, d.body || "");
    if (n.scores.push({ post_id: d.id, similarity: l }), l >= Ln) {
      n.pass = false, n.blocked_reason = `\u904E\u53BB\u6295\u7A3F(ID:${d.id})\u3068\u985E\u4F3C\u5EA6 ${l.toFixed(2)} \u3067\u91CD\u8907`;
      break;
    }
  }
  return n;
}
__name(Fn, "Fn");
var U = new A();
async function qn(e, t, s) {
  const a = String(s ?? "default");
  let n = await e.DB.prepare("SELECT * FROM target_templates WHERE account_id = ? AND (user_id = ? OR user_id IS NULL) LIMIT 1").bind(a, t).first();
  n || (n = await e.DB.prepare("SELECT * FROM target_templates WHERE user_id = ? OR user_id IS NULL ORDER BY is_default DESC, id ASC LIMIT 1").bind(t).first());
  let i = await e.DB.prepare("SELECT * FROM brand_voice WHERE account_id = ? AND (user_id = ? OR user_id IS NULL) LIMIT 1").bind(a, t).first();
  return i || (i = await e.DB.prepare("SELECT * FROM brand_voice WHERE user_id = ? OR user_id IS NULL ORDER BY is_default DESC, id ASC LIMIT 1").bind(t).first()), { target: n, voice: i };
}
__name(qn, "qn");
async function as(e, t) {
  if (!(!e.TELEGRAM_BOT_TOKEN || !e.TELEGRAM_CHAT_ID)) try {
    await fetch(`https://api.telegram.org/bot${e.TELEGRAM_BOT_TOKEN}/sendMessage`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ chat_id: e.TELEGRAM_CHAT_ID, text: t, parse_mode: "HTML" }) });
  } catch {
  }
}
__name(as, "as");
async function ns(e, t) {
  try {
    await e.DB.prepare(`INSERT INTO post_logs
         (record_id, account_id, user_id, account_name, platform,
          source_type, generation_type, post_mode, content, content_hash, link_url,
          media_type, media_upload_status, media_id,
          thread_parent_id, thread_order, thread_total_count,
          recycle_source_post_id, recycle_rule,
          scheduled_at, executed_at, posted_at, status, error_message, api_response_summary)
       VALUES (?, ?, ?, ?, 'x', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(t.record_id ?? null, t.account_id ?? null, t.user_id ?? null, t.account_name ?? "", t.source_type ?? "", t.generation_type ?? null, t.post_mode ?? "body", t.content ?? "", t.content_hash ?? "", t.link_url ?? "", t.media_type ?? null, t.media_upload_status ?? null, t.media_id ?? null, t.thread_parent_id ?? null, t.thread_order ?? null, t.thread_total_count ?? null, t.recycle_source_post_id ?? null, t.recycle_rule ?? null, t.scheduled_at ?? null, t.executed_at ?? g(), t.posted_at ?? null, t.status ?? "posted", t.error_message ?? null, t.api_response_summary ?? null).run();
  } catch (s) {
    console.error("[PostLog]", s.message);
  }
}
__name(ns, "ns");
U.get("/api/admin/posts", m, async (e) => {
  const t = e.get("user"), s = e.req.query("status"), a = e.req.query("account_id"), n = e.req.query("post_mode"), i = parseInt(e.req.query("page") || "1", 10), r = 50, o = (i - 1) * r;
  let d = "WHERE pq.platform='x' AND pq.user_id = ?";
  const l = [t.id];
  s && s !== "all" && (d += " AND pq.status = ?", l.push(s)), a && (d += " AND pq.account_id = ?", l.push(Number(a))), n && n !== "all" && (d += " AND pq.post_mode = ?", l.push(n));
  const { results: c } = await e.env.DB.prepare(`SELECT pq.*, xa.account_name
       FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id = xa.id
       ${d} ORDER BY pq.created_at DESC LIMIT ? OFFSET ?`).bind(...l, r, o).all(), p = await e.env.DB.prepare(`SELECT COUNT(*) AS total FROM post_queue pq ${d}`).bind(...l).first();
  return e.json({ posts: c || [], total: (p == null ? void 0 : p.total) ?? 0, page: i });
});
U.get("/api/admin/posts/:id", m, async (e) => {
  const t = e.get("user"), s = parseInt(e.req.param("id"), 10), a = await e.env.DB.prepare(`SELECT pq.*, xa.account_name
       FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id = xa.id
       WHERE pq.id = ? AND pq.user_id = ?`).bind(s, t.id).first();
  return a ? e.json({ post: a }) : e.json({ error: "Not found" }, 404);
});
U.post("/api/admin/posts", m, async (e) => {
  const t = e.get("user"), s = await e.req.json();
  if (!s.body) return e.json({ error: "body is required" }, 400);
  const a = g(), n = await Ae(s.body);
  let acctId = s.account_id ?? null;
  if (!acctId) {
    let r = await e.env.DB.prepare("SELECT id FROM x_accounts WHERE user_id=? AND is_current=1 AND is_active=1 LIMIT 1").bind(t.id).first();
    if (!r) r = await e.env.DB.prepare("SELECT id FROM x_accounts WHERE user_id=? AND is_active=1 ORDER BY id ASC LIMIT 1").bind(t.id).first();
    acctId = (r == null ? void 0 : r.id) ?? null;
  }
  const effSched = s.scheduled_at ?? null;
  if (s.scheduled_at && s.post_mode === "scheduled_once") {
    const r = await e.env.DB.prepare(`SELECT id FROM post_queue WHERE platform='x' AND user_id=? AND account_id IS ?
         AND body=? AND COALESCE(link_url,'')=COALESCE(?,'') AND scheduled_at=? AND post_mode='scheduled_once'
         AND status NOT IN ('cancelled','failed')`).bind(t.id, s.account_id || null, s.body, s.link_url || "", s.scheduled_at).first();
    if (r) return e.json({ success: false, error: `Same content/time already exists (ID:${r.id})` });
  }
  const i = await e.env.DB.prepare(`INSERT INTO post_queue
       (platform, user_id, account_id, body, link_url, hashtags,
        post_mode, status, scheduled_at, effective_scheduled_at, content_hash, generation_type, source_type,
        recurrence_type, recurrence_rule, recurrence_end_at, next_run_at,
        recycle_rule, source_post_id, min_engagement_score, rewrite_mode,
        thread_parent_id, thread_order, thread_count, media_type, media_file_path,
        created_at, updated_at)
     VALUES ('x', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
             ?, ?, ?, ?,
             ?, ?, ?, ?,
             ?, ?, ?, ?, ?,
             ?, ?)`).bind(t.id, acctId, s.body, s.link_url ?? null, s.hashtags ?? null, s.post_mode ?? "body", s.status ?? "pending", s.scheduled_at ?? null, effSched, n, s.generation_type ?? null, s.source_type ?? "manual_post", s.recurrence_type ?? null, s.recurrence_rule ?? null, s.recurrence_end_at ?? null, s.next_run_at ?? null, s.recycle_rule ?? null, s.source_post_id ?? null, s.min_engagement_score ?? 0, s.rewrite_mode ?? null, s.thread_parent_id ?? null, s.thread_order ?? 0, s.thread_count ?? 0, s.media_type ?? null, s.media_file_path ?? null, a, a).run();
  return e.json({ success: true, id: i.meta.last_row_id });
});
U.post("/api/admin/posts/generate", m, async (e) => {
  const t = e.get("user");
  let s = e.env.OPENAI_API_KEY;
  if (!s) {
    try {
      const enc = await Tt(e, "openai_api_key");
      if (enc) {
        s = await lt(enc, e.env.ENCRYPTION_KEY);
      }
    } catch {
    }
  }
  const { theme: a, keywords: n, count: i, pattern_type: r, post_mode: o, link_url: d, hashtags: l, footer_text: c, account_id: p, generation_type: _ } = await e.req.json();
  if (!a) return e.json({ error: "theme required" }, 400);
  if (!s) return e.json({ error: "OpenAI API Key \u672A\u8A2D\u5B9A\uFF08API\u8A2D\u5B9A\u753B\u9762\u3067\u4FDD\u5B58\u3057\u3066\u304F\u3060\u3055\u3044\uFF09" }, 500);
  let b = p ?? null;
  if (!b) {
    let k = await e.env.DB.prepare("SELECT id FROM x_accounts WHERE user_id=? AND is_current=1 AND is_active=1 LIMIT 1").bind(t.id).first();
    if (!k) k = await e.env.DB.prepare("SELECT id FROM x_accounts WHERE user_id=? AND is_active=1 ORDER BY id ASC LIMIT 1").bind(t.id).first();
    b = (k == null ? void 0 : k.id) ?? null;
  }
  const { target: v, voice: T } = await qn(e.env, t.id, b), E = g(), D = [];
  try {
    const k = Math.min(i || 1, 10);
    for (let N = 0; N < k; N++) {
      const P = o || "body";
      let L;
      r ? L = await Us(s, r, a, n || "", v, T, P) : L = await Hs(s, a, n || "", v, T, P), c && (L = L.trimEnd() + `

` + c.trim());
      const nt = await Ae(L), Q = await e.env.DB.prepare(`INSERT INTO post_queue
           (platform, user_id, account_id, theme, keywords, body, link_url, hashtags, post_mode, pattern_type,
            content_hash, generation_type, source_type, status, created_at, updated_at)
         VALUES ('x', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)`).bind(t.id, b, a, n || "", L, d || null, l || null, P, r || null, nt, _ || r || "general", r ? "pattern_generated_post" : "ai_generated_post", E, E).run();
      D.push({ id: Q.meta.last_row_id, body: L, link_url: d || "", post_mode: P });
      try {
        await e.env.DB.prepare(`INSERT INTO generation_logs
             (user_id, account_id, brand_voice_id, target_setting_id, post_mode, generation_type, output_text)
           VALUES (?, ?, ?, ?, ?, ?, ?)`).bind(t.id, b, (T == null ? void 0 : T.id) ?? null, (v == null ? void 0 : v.id) ?? null, P, r || "general", L.slice(0, 500)).run();
      } catch {
      }
    }
    return e.json({ success: true, generated: D, count: D.length });
  } catch (k) {
    return e.json({ error: "AI error: " + k.message }, 500);
  }
});
U.post("/api/admin/posts/:id/approve", m, async (e) => {
  const t = e.get("user");
  return await e.env.DB.prepare("UPDATE post_queue SET status='approved', updated_at=? WHERE id=? AND user_id=?").bind(g(), parseInt(e.req.param("id"), 10), t.id).run(), e.json({ success: true });
});
U.post("/api/admin/posts/:id/reject", m, async (e) => {
  const t = e.get("user");
  return await e.env.DB.prepare("UPDATE post_queue SET status='rejected', updated_at=? WHERE id=? AND user_id=?").bind(g(), parseInt(e.req.param("id"), 10), t.id).run(), e.json({ success: true });
});
U.post("/api/admin/posts/:id/schedule", m, async (e) => {
  const t = e.get("user"), s = parseInt(e.req.param("id"), 10), { scheduled_at: a, jitter_enabled: n = true, jitter_minutes: i = 5, collision_avoidance_enabled: r = true, min_spacing_seconds: o = 90 } = await e.req.json();
  if (!a) return e.json({ error: "scheduled_at required" }, 400);
  const d = await e.env.DB.prepare("SELECT * FROM post_queue WHERE id=? AND user_id=?").bind(s, t.id).first();
  if (!d) return e.json({ success: false, error: "Not found" }, 404);
  const l = await Fn(e.env, d.body || "", d.account_id ?? null, { post_id: d.id });
  if (!l.pass) return e.json({ success: false, error: "\u985E\u4F3C: " + l.blocked_reason, similarity_blocked: true, scores: l.scores });
  const { effective_at: c, audit: p } = await Bn(e.env, a, { jitter_enabled: n, jitter_minutes: i, collision_avoidance_enabled: r, min_spacing_seconds: o, account_id: d.account_id, exclude_id: d.id }), _ = await Mn(d.body || "");
  return await $n(e.env, d.id, d.account_id, _), await e.env.DB.prepare(`UPDATE post_queue SET
       status='approved', base_scheduled_at=?, effective_scheduled_at=?, scheduled_at=?,
       jitter_enabled=?, jitter_minutes=?, collision_avoidance_enabled=?, min_spacing_seconds=?,
       schedule_resolution_log=?, updated_at=?
     WHERE id=?`).bind(a, c, c, n ? 1 : 0, i, r ? 1 : 0, o, JSON.stringify(p), g(), s).run(), await Nn(e.env, d.id, d.account_id, p), e.json({ success: true, base_scheduled_at: a, effective_scheduled_at: c, scheduled_at: c, audit: p });
});
U.post("/api/admin/posts/:id/post-now", m, async (e) => {
  const t = e.get("user"), s = parseInt(e.req.param("id"), 10), a = (await e.req.json().catch(() => ({}))).force_override === true, n = await e.env.DB.prepare("SELECT * FROM post_queue WHERE id=? AND user_id=?").bind(s, t.id).first();
  if (!n) return e.json({ success: false, error: "Not found" }, 404);
  let i = null;
  if (n.account_id && (i = await e.env.DB.prepare("SELECT * FROM x_accounts WHERE id=? AND user_id=?").bind(n.account_id, t.id).first()), !i) i = await e.env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_current=1 AND is_active=1 LIMIT 1").bind(t.id).first();
  if (!i) {
    i = await e.env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_active=1 ORDER BY id ASC LIMIT 1").bind(t.id).first();
  }
  if (i && !n.account_id) await e.env.DB.prepare("UPDATE post_queue SET account_id=? WHERE id=?").bind(i.id, s).run();
  if (!i) return e.json({ success: false, error: "No active X account" });
  const r = await Ks(e.env, i.id, n.body || "", n.link_url, n.hashtags, { skipLinkSpam: n.source_type === "rakuten_affiliate" }), o = r.errors.filter((d) => !(a && d.overridable));
  if (o.length > 0) {
    const d = r.errors.find((l) => l.overridable);
    return d && !a ? e.json({ success: false, error: d.message, overridable: true, cooldown_override: true }) : e.json({ success: false, error: "Safety: " + o.map((l) => l.message).join("; ") });
  }
  if (!await Ys(e.env, i.id)) return e.json({ success: false, error: "Account busy" });
  try {
    await e.env.DB.prepare("UPDATE post_queue SET status='publishing', updated_at=? WHERE id=?").bind(g(), s).run();
    const d = await Ft(e.env, i);
    let l = xFitTweetText(bt(n.body || "", n.post_mode));
    n.link_url && (l += `
` + n.link_url), n.hashtags && (l += `
` + n.hashtags);
    const c = [];
    if (n.media_json) try {
      const _ = JSON.parse(n.media_json);
      for (const b of (_ || []).slice(0, 4)) {
        const v = await e.env.DB.prepare("SELECT * FROM media_assets WHERE id=? AND user_id=?").bind(b, t.id).first();
        if (v) {
          if (!v.x_media_id) {
            try {
              const { bytes, mime } = await readMediaBytes(e.env, v);
              if (bytes) {
                const xid = await xMU_upload(d, bytes, mime);
                await e.env.DB.prepare("UPDATE media_assets SET x_media_id=?, upload_status='uploaded', updated_at=? WHERE id=?").bind(xid, g(), v.id).run();
                c.push(xid);
              }
            } catch (uErr) {
              console.error("[mediaUp]", uErr && uErr.message);
            }
          } else c.push(v.x_media_id);
        }
      }
    } catch {
    }
    const p = c.length > 0 ? await $s(d, l, c, null) : await Ms(d, l);
    return await e.env.DB.prepare("UPDATE post_queue SET status='posted', external_post_id=?, posted_at=?, error_message=NULL, updated_at=? WHERE id=?").bind(p.id || "", g(), g(), s).run(), await e.env.DB.prepare("UPDATE autopilot_jobs SET status='posted', error_message=NULL, updated_at=? WHERE generated_post_id=? AND user_id=?").bind(g(), s, t.id).run(), await e.env.DB.prepare(`UPDATE x_accounts SET last_posted_at=?, daily_post_count=daily_post_count+1,
         last_daily_reset_date = DATE('now','+9 hours'), updated_at=? WHERE id=?`).bind(g(), g(), i.id).run(), await ns(e.env, { record_id: s, account_id: i.id, user_id: t.id, account_name: i.account_name, source_type: n.source_type || "manual_post", generation_type: n.generation_type, post_mode: n.post_mode, content: n.body || "", content_hash: n.content_hash || "", link_url: n.link_url, posted_at: g(), status: "posted", api_response_summary: JSON.stringify({ tweet_id: p.id }) }), await as(e.env, `X posted @${i.x_username || i.account_name} ID:${p.id}`), e.json({ success: true, tweet_id: p.id });
  } catch (d) {
    return await e.env.DB.prepare("UPDATE post_queue SET status='failed', error_message=?, updated_at=? WHERE id=?").bind(d.message, g(), s).run(), await ns(e.env, { record_id: s, account_id: i.id, user_id: t.id, account_name: i.account_name, source_type: n.source_type, post_mode: n.post_mode, content: n.body || "", content_hash: n.content_hash || "", status: "failed", error_message: d.message }), ge365xIsXExternalBlock(d.message) ? await mt(e.env, i.id, "external_api_block", 0, { message: d.message }) : d instanceof Mt ? await mt(e.env, i.id, "rate_limit", -15) : await mt(e.env, i.id, "error", -5, { message: d.message }), await as(e.env, `X post FAILED #${s} ${d.message}`), e.json({ success: false, error: d.message });
  } finally {
    await Js(e.env, i.id);
  }
});
U.post("/api/admin/posts/:id/post-now-check", m, async (e) => {
  const t = e.get("user"), s = parseInt(e.req.param("id"), 10), a = await e.req.json().catch(() => ({})), n = await e.env.DB.prepare("SELECT * FROM post_queue WHERE id=? AND user_id=?").bind(s, t.id).first();
  if (!n) return e.json({ success: false, error: "Not found" }, 404);
  let i = null;
  if (n.account_id) i = await e.env.DB.prepare("SELECT * FROM x_accounts WHERE id=? AND user_id=?").bind(n.account_id, t.id).first();
  if (!i) i = await e.env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_current=1 AND is_active=1 LIMIT 1").bind(t.id).first();
  if (!i) i = await e.env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_active=1 ORDER BY id ASC LIMIT 1").bind(t.id).first();
  if (!i) return e.json({ success: false, error: "No active X account" });
  const r = await Ks(e.env, i.id, n.body || "", n.link_url, n.hashtags, { skipLinkSpam: n.source_type === "rakuten_affiliate" }), o = r.errors.filter((d) => !d.overridable);
  if (o.length > 0) return e.json({ success: false, error: "Safety: " + o.map((d) => d.message).join("; "), check_only: true });
  try {
    const d = await Ft(e.env, i);
    let l = xFitTweetText(bt(n.body || "", n.post_mode));
    n.link_url && (l += `
` + n.link_url);
    n.hashtags && (l += `
` + n.hashtags);
    const write_probe = a.write_probe === true ? await ge365xProbeTweetWrite(d) : null;
    return e.json({ success: true, check_only: true, account_id: i.id, account_name: i.account_name, x_username: i.x_username || "", text_length: l.length, has_api_key: !!d.consumerKey, has_api_secret: !!d.consumerSecret, has_access_token: !!d.accessToken, has_access_token_secret: !!d.accessTokenSecret, write_probe, media_count: n.media_json ? (() => {
      try {
        const c = JSON.parse(n.media_json);
        return Array.isArray(c) ? c.length : 0;
      } catch {
        return 0;
      }
    })() : 0, message: "投稿直前チェックOK。X APIへ投稿送信はしていません。" });
  } catch (d) {
    return e.json({ success: false, check_only: true, error: d.message || String(d), error_type: d == null ? void 0 : d.errorType });
  }
});
U.post("/api/admin/posts-scheduled-check", m, async (e) => {
  const t = e.get("user");
  const { results: rows } = await e.env.DB.prepare(`SELECT * FROM post_queue
      WHERE platform='x'
        AND user_id=?
        AND status IN ('pending','approved')
        AND COALESCE(effective_scheduled_at, scheduled_at) IS NOT NULL
      ORDER BY COALESCE(effective_scheduled_at, scheduled_at, created_at) ASC
      LIMIT 20`).bind(t.id).all();
  const checks = [];
  for (const n of rows || []) {
    let i = null;
    if (n.account_id) i = await e.env.DB.prepare("SELECT * FROM x_accounts WHERE id=? AND user_id=?").bind(n.account_id, t.id).first();
    if (!i) i = await e.env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_current=1 AND is_active=1 LIMIT 1").bind(t.id).first();
    if (!i) i = await e.env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_active=1 ORDER BY id ASC LIMIT 1").bind(t.id).first();
    const dueAt = n.effective_scheduled_at || n.scheduled_at;
    const isDue = dueAt ? Date.parse(dueAt.replace(" ", "T") + "+09:00") <= Date.now() : false;
    if (!i) {
      checks.push({ id: n.id, ok: false, due: isDue, scheduled_at: dueAt, error: "No active X account" });
      continue;
    }
    const r = await Ks(e.env, i.id, n.body || "", n.link_url, n.hashtags, { skipLinkSpam: n.source_type === "rakuten_affiliate" });
    const o = r.errors.filter((d) => !d.overridable);
    if (o.length > 0) {
      checks.push({ id: n.id, ok: false, due: isDue, scheduled_at: dueAt, account_id: i.id, error: "Safety: " + o.map((d) => d.message).join("; ") });
      continue;
    }
    try {
      const d = await Ft(e.env, i);
      let l = xFitTweetText(bt(n.body || "", n.post_mode));
      n.link_url && (l += `
` + n.link_url);
      n.hashtags && (l += `
` + n.hashtags);
      checks.push({ id: n.id, ok: true, due: isDue, scheduled_at: dueAt, account_id: i.id, account_name: i.account_name, x_username: i.x_username || "", text_length: l.length, has_api_key: !!d.consumerKey, has_api_secret: !!d.consumerSecret, has_access_token: !!d.accessToken, has_access_token_secret: !!d.accessTokenSecret, message: "予約投稿の実行直前チェックOK。X APIへ投稿送信はしていません。" });
    } catch (d) {
      checks.push({ id: n.id, ok: false, due: isDue, scheduled_at: dueAt, account_id: i.id, error: d.message || String(d), error_type: d == null ? void 0 : d.errorType });
    }
  }
  return e.json({ success: true, check_only: true, total: checks.length, due_count: checks.filter((c) => c.due).length, ok_count: checks.filter((c) => c.ok).length, checks });
});
U.put("/api/admin/posts/:id", m, async (e) => {
  const t = e.get("user"), s = parseInt(e.req.param("id"), 10), a = await e.req.json(), n = g(), i = a.body ? await Ae(a.body) : null;
  return a.media_json !== void 0 && a.body === void 0 ? (await e.env.DB.prepare("UPDATE post_queue SET media_json=?, updated_at=? WHERE id=? AND user_id=?").bind(a.media_json, n, s, t.id).run(), e.json({ success: true })) : a.account_id !== void 0 && a.body === void 0 ? (await e.env.DB.prepare("UPDATE post_queue SET account_id=?, updated_at=? WHERE id=? AND user_id=?").bind(a.account_id, n, s, t.id).run(), e.json({ success: true })) : (await e.env.DB.prepare(`UPDATE post_queue SET
       body=?, link_url=?, hashtags=?, scheduled_at=?, post_mode=?,
       media_json=COALESCE(?, media_json), content_hash=COALESCE(?, content_hash),
       recurrence_type=COALESCE(?, recurrence_type),
       recurrence_rule=COALESCE(?, recurrence_rule),
       next_run_at=COALESCE(?, next_run_at),
       recurrence_end_at=COALESCE(?, recurrence_end_at),
       updated_at=?
     WHERE id=? AND user_id=?`).bind(a.body, a.link_url ?? null, a.hashtags ?? null, a.scheduled_at ?? null, a.post_mode ?? "body", a.media_json ?? null, i, a.recurrence_type ?? null, a.recurrence_rule ?? null, a.next_run_at ?? null, a.recurrence_end_at ?? null, n, s, t.id).run(), e.json({ success: true }));
});
U.delete("/api/admin/posts/:id", m, async (e) => {
  const t = e.get("user");
  return await e.env.DB.prepare("DELETE FROM post_queue WHERE id=? AND user_id=?").bind(parseInt(e.req.param("id"), 10), t.id).run(), e.json({ success: true });
});
U.post("/api/admin/posts/:id/cancel", m, async (e) => {
  const t = e.get("user");
  return await e.env.DB.prepare("UPDATE post_queue SET status='cancelled', updated_at=? WHERE id=? AND user_id=?").bind(g(), parseInt(e.req.param("id"), 10), t.id).run(), e.json({ success: true });
});
U.get("/api/admin/posts-scheduled", m, async (e) => {
  const t = e.get("user"), s = e.req.query("account_id"), a = [t.id];
  let n = "WHERE pq.platform='x' AND pq.user_id=? AND pq.scheduled_at IS NOT NULL AND pq.status NOT IN ('cancelled','rejected')";
  s && (n += " AND pq.account_id=?", a.push(Number(s)));
  const { results: i } = await e.env.DB.prepare(`SELECT pq.*, xa.account_name
       FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id=xa.id
       ${n} ORDER BY pq.scheduled_at ASC`).bind(...a).all(), r = [t.id];
  let o = "WHERE aj.user_id=? AND aj.status NOT IN ('cancelled','error') AND aj.publish_at IS NOT NULL";
  s && (o += " AND aj.account_id=?", r.push(Number(s)));
  const { results: d } = await e.env.DB.prepare(`SELECT aj.id, aj.account_id, aj.theme AS body, aj.publish_at AS scheduled_at, aj.status,
            aj.content_mode AS post_type, 'autopilot' AS source_type, xa.account_name,
            aj.options_json AS media_json
       FROM autopilot_jobs aj LEFT JOIN x_accounts xa ON aj.account_id=xa.id
       ${o} ORDER BY aj.publish_at ASC`).bind(...r).all(), l = (d || []).map((p) => ({ ...p, post_mode: "body", id: "ap-" + p.id })), c = [...i || [], ...l].sort((p, _) => (p.scheduled_at || "").localeCompare(_.scheduled_at || ""));
  return e.json({ posts: c });
});
U.post("/api/admin/posts/thread", m, async (e) => {
  const t = e.get("user"), { tweets: s, link_url: a, account_id: n, scheduled_at: sched, source_type: sourceTypeRaw } = await e.req.json();
  if (!s || !Array.isArray(s) || s.length < 2) return e.json({ error: "Thread requires 2+ tweets" }, 400);
  let acctId = n ?? null;
  if (acctId) {
    const acct = await e.env.DB.prepare("SELECT id FROM x_accounts WHERE id=? AND user_id=?").bind(acctId, t.id).first();
    acctId = (acct == null ? void 0 : acct.id) ?? null;
  }
  if (!acctId) {
    const acct = await e.env.DB.prepare("SELECT id FROM x_accounts WHERE user_id=? AND is_current=1 AND is_active=1 LIMIT 1").bind(t.id).first() || await e.env.DB.prepare("SELECT id FROM x_accounts WHERE user_id=? AND is_active=1 ORDER BY id ASC LIMIT 1").bind(t.id).first();
    acctId = (acct == null ? void 0 : acct.id) ?? null;
  }
  if (!acctId) return e.json({ error: "No active X account" }, 400);
  const sourceType = sourceTypeRaw === "rakuten_affiliate" ? "rakuten_affiliate" : "manual_post";
  const firstMediaJson = Array.isArray(s[0].media_ids) && s[0].media_ids.length > 0 ? JSON.stringify(s[0].media_ids.slice(0, 4)) : null;
  const i = g(), status = sched ? "approved" : "pending", childSched = sched ? ge365xAddSecondsJst(sched, 1) : null, r = await Ae(s[0].body), d = (await e.env.DB.prepare(`INSERT INTO post_queue
       (platform, user_id, account_id, body, link_url, post_mode, thread_count,
        content_hash, source_type, status, scheduled_at, effective_scheduled_at, media_json, media_type, created_at, updated_at)
     VALUES ('x', ?, ?, ?, ?, 'thread', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(t.id, acctId, s[0].body, s[0].link_url ?? a ?? null, s.length, r, sourceType, status, sched ?? null, sched ?? null, firstMediaJson, firstMediaJson ? "image" : null, i, i).run()).meta.last_row_id, l = [d];
  for (let c = 1; c < s.length; c++) {
    const childMediaJson = Array.isArray(s[c].media_ids) && s[c].media_ids.length > 0 ? JSON.stringify(s[c].media_ids.slice(0, 4)) : null;
    const p = await Ae(s[c].body), _ = await e.env.DB.prepare(`INSERT INTO post_queue
         (platform, user_id, account_id, body, link_url, post_mode,
          thread_parent_id, thread_order, content_hash, source_type, status, scheduled_at, effective_scheduled_at, media_json, media_type, created_at, updated_at)
       VALUES ('x', ?, ?, ?, ?, 'thread', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(t.id, acctId, s[c].body, s[c].link_url ?? null, "prev:" + (l[c - 1] || d), c, p, sourceType, status, childSched, childSched, childMediaJson, childMediaJson ? "image" : null, i, i).run();
    l.push(_.meta.last_row_id);
  }
  return e.json({ success: true, parent_id: d, ids: l });
});
U.post("/api/admin/posts/rakuten-thread-now", m, async (e) => {
  const t = e.get("user");
  const { tweets: s, account_id: a } = await e.req.json().catch(() => ({}));
  if (!s || !Array.isArray(s) || s.length < 2) return e.json({ success: false, error: "Thread requires 2+ tweets" }, 400);
  let acct = null;
  if (a) acct = await e.env.DB.prepare("SELECT * FROM x_accounts WHERE id=? AND user_id=?").bind(a, t.id).first();
  if (!acct) acct = await e.env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_current=1 AND is_active=1 LIMIT 1").bind(t.id).first();
  if (!acct) acct = await e.env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_active=1 ORDER BY id ASC LIMIT 1").bind(t.id).first();
  if (!acct) return e.json({ success: false, error: "No active X account" }, 400);
  const mainText = xFitTweetText(bt(String(s[0].body || ""), "simple"));
  const replyText = xFitTweetText(`${String(s[1].body || "").trim()}\n${String(s[1].link_url || "").trim()}`.trim());
  const safety = await Ks(e.env, acct.id, mainText, s[1].link_url || "", "", { skipLinkSpam: true });
  if (!safety.ok) return e.json({ success: false, error: "Safety: " + safety.errors.map((r) => r.message).join("; ") }, 400);
  if (!await Ys(e.env, acct.id)) return e.json({ success: false, error: "Account busy" }, 409);
  const now = g();
  let parentId = null, replyId = null, parentQueueId = null, replyQueueId = null;
  try {
    const creds = await Ft(e.env, acct);
    const parentMediaIds = Array.isArray(s[0].media_ids) ? s[0].media_ids.slice(0, 4) : [];
    const xMediaIds = [];
    for (const mid of parentMediaIds) {
      const asset = await e.env.DB.prepare("SELECT * FROM media_assets WHERE id=? AND user_id=?").bind(mid, t.id).first();
      if (!asset) continue;
      if (asset.x_media_id) {
        xMediaIds.push(asset.x_media_id);
        continue;
      }
      const { bytes, mime } = await readMediaBytes(e.env, asset);
      if (bytes) {
        const xid = await xMU_upload(creds, bytes, mime);
        await e.env.DB.prepare("UPDATE media_assets SET x_media_id=?, upload_status='uploaded', updated_at=? WHERE id=? AND user_id=?").bind(xid, now, asset.id, t.id).run();
        xMediaIds.push(xid);
      }
    }
    const parent = xMediaIds.length > 0 ? await $s(creds, mainText, xMediaIds, null) : await Ms(creds, mainText);
    parentId = parent.id;
    const ph = await Ae(mainText);
    parentQueueId = (await e.env.DB.prepare(`INSERT INTO post_queue
       (platform, user_id, account_id, body, link_url, post_mode, thread_count,
        content_hash, source_type, status, external_post_id, posted_at, media_json, media_type, created_at, updated_at)
       VALUES ('x', ?, ?, ?, NULL, 'thread', 2, ?, 'rakuten_affiliate', 'posted', ?, ?, ?, ?, ?, ?)`).bind(t.id, acct.id, mainText, ph, parentId, now, parentMediaIds.length > 0 ? JSON.stringify(parentMediaIds) : null, parentMediaIds.length > 0 ? "image" : null, now, now).run()).meta.last_row_id;
    const reply = await $sReply(creds, replyText, parentId);
    replyId = reply.id;
    const rh = await Ae(replyText);
    replyQueueId = (await e.env.DB.prepare(`INSERT INTO post_queue
       (platform, user_id, account_id, body, link_url, post_mode,
        thread_parent_id, thread_order, content_hash, source_type, status, external_post_id, posted_at, created_at, updated_at)
       VALUES ('x', ?, ?, ?, ?, 'thread', ?, 1, ?, 'rakuten_affiliate', 'posted', ?, ?, ?, ?)`).bind(t.id, acct.id, String(s[1].body || "").trim(), s[1].link_url || null, parentQueueId, rh, replyId, now, now, now).run()).meta.last_row_id;
    await e.env.DB.prepare(`UPDATE x_accounts SET last_posted_at=?, daily_post_count=daily_post_count+2,
       last_daily_reset_date=DATE('now','+9 hours'), updated_at=? WHERE id=?`).bind(now, now, acct.id).run();
    return e.json({ success: true, parent_tweet_id: parentId, reply_tweet_id: replyId, parent_id: parentQueueId, reply_id: replyQueueId });
  } catch (err) {
    const msg = (err == null ? void 0 : err.message) || String(err);
    await e.env.DB.prepare(`INSERT INTO post_logs
       (account_id, user_id, platform, source_type, post_mode, content, status, error_message, created_at)
       VALUES (?, ?, 'x', 'rakuten_affiliate', 'thread', ?, 'failed', ?, ?)`).bind(acct.id, t.id, mainText, msg, now).run().catch(() => {
    });
    return e.json({ success: false, error: msg }, 500);
  } finally {
    await Js(e.env, acct.id).catch(() => {
    });
  }
});
var zs = new A();
var Pn = 5;
zs.post("/cron/tick", async (e) => {
  const t = g(), { results: s } = await e.env.DB.prepare(`SELECT * FROM post_queue
      WHERE platform='x'
        AND status IN ('pending','approved')
        AND COALESCE(effective_scheduled_at, scheduled_at) IS NOT NULL
        AND COALESCE(effective_scheduled_at, scheduled_at) <= datetime('now','+9 hours')
      ORDER BY COALESCE(effective_scheduled_at, scheduled_at, created_at) ASC
      LIMIT ?`).bind(Pn).all();
  let a = 0, n = 0, i = 0;
  for (const r of s || []) {
    const o = await e.env.DB.prepare("UPDATE post_queue SET status='publishing', updated_at=? WHERE id=? AND status IN ('pending','approved')").bind(t, r.id).run();
    if (!(!o.success || o.meta.changes === 0)) {
      a++;
      try {
        let acctRow = null;
        if (r.account_id) {
          acctRow = await e.env.DB.prepare("SELECT * FROM x_accounts WHERE id=?").bind(r.account_id).first();
        }
        if (!acctRow && r.user_id) {
          acctRow = await e.env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_current=1 AND is_active=1 LIMIT 1").bind(r.user_id).first();
        }
        if (!acctRow && r.user_id) {
          acctRow = await e.env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_active=1 ORDER BY id ASC LIMIT 1").bind(r.user_id).first();
        }
        if (!acctRow) throw new Error("account_not_found (user has no active X account)");
        if (!r.account_id && acctRow.id) {
          await e.env.DB.prepare("UPDATE post_queue SET account_id=? WHERE id=?").bind(acctRow.id, r.id).run();
          r.account_id = acctRow.id;
        }
        const d = acctRow;
        const l = await Ks(e.env, d.id, r.body || "", r.link_url, r.hashtags, { skipLinkSpam: r.source_type === "rakuten_affiliate" });
        if (!l.ok) throw new Error("safety: " + l.errors.map((c) => c.message).join("; "));
        if (!await Ys(e.env, d.id)) {
          await e.env.DB.prepare("UPDATE post_queue SET status='approved', updated_at=? WHERE id=?").bind(g(), r.id).run();
          continue;
        }
        try {
          const c = await Ft(e.env, d);
          let p = xFitTweetText(bt(r.body || "", r.post_mode));
          r.link_url && (p += `
` + r.link_url), r.hashtags && (p += `
` + r.hashtags);
          const _ = [];
          if (r.media_json) try {
            const v = JSON.parse(r.media_json);
            for (const T of (v || []).slice(0, 4)) {
              const E = await e.env.DB.prepare("SELECT * FROM media_assets WHERE id=?").bind(T).first();
              if (E) {
                if (!E.x_media_id) {
                  try {
                    const { bytes, mime } = await readMediaBytes(e.env, E);
                    if (bytes) {
                      const xid = await xMU_upload(c, bytes, mime);
                      await e.env.DB.prepare("UPDATE media_assets SET x_media_id=?, upload_status='uploaded', updated_at=? WHERE id=?").bind(xid, g(), E.id).run();
                      _.push(xid);
                    }
                  } catch (uErr) {
                    console.error("[mediaUp-cron]", uErr && uErr.message);
                  }
                } else _.push(E.x_media_id);
              }
            }
          } catch {
          }
          let replyToId = null;
          if (r.thread_parent_id) {
            const tp = String(r.thread_parent_id);
            if (tp.startsWith("prev:")) {
              const prevId = parseInt(tp.slice(5), 10);
              if (prevId) {
                const prev = await e.env.DB.prepare("SELECT external_post_id FROM post_queue WHERE id=?").bind(prevId).first();
                if (prev && prev.external_post_id) replyToId = prev.external_post_id;
                else throw new Error("\u89AA\u8FD4\u4FE1\u304C\u307E\u3060\u6295\u7A3F\u3055\u308C\u3066\u3044\u307E\u305B\u3093(post_queue id=" + prevId + ")");
              }
            } else if (/^\d+$/.test(tp)) {
              replyToId = tp;
            }
          }
          const b = replyToId ? _.length > 0 ? await $sReply(c, p, replyToId, _) : await $sReply(c, p, replyToId) : _.length > 0 ? await $s(c, p, _, null) : await Ms(c, p);
          await e.env.DB.prepare("UPDATE post_queue SET status='posted', external_post_id=?, posted_at=?, error_message=NULL, updated_at=? WHERE id=?").bind(b.id || "", g(), g(), r.id).run(), await e.env.DB.prepare("UPDATE autopilot_jobs SET status='posted', error_message=NULL, updated_at=? WHERE generated_post_id=? AND user_id=?").bind(g(), r.id, r.user_id).run(), await e.env.DB.prepare(`UPDATE x_accounts SET
             last_posted_at = ?,
             daily_post_count = CASE
               WHEN last_daily_reset_date != DATE('now','+9 hours') THEN 1
               ELSE daily_post_count + 1
             END,
             last_daily_reset_date = DATE('now','+9 hours'),
             updated_at = ?
           WHERE id = ?`).bind(g(), g(), d.id).run(), await e.env.DB.prepare(`INSERT INTO post_logs
             (record_id, account_id, user_id, account_name, platform, source_type, generation_type,
              post_mode, content, content_hash, link_url, posted_at, executed_at, status, api_response_summary)
           VALUES (?, ?, ?, ?, 'x', ?, ?, ?, ?, ?, ?, ?, ?, 'posted', ?)`).bind(r.id, d.id, r.user_id, d.account_name, r.source_type, r.generation_type, r.post_mode, r.body || "", r.content_hash || "", r.link_url || "", g(), g(), JSON.stringify({ tweet_id: b.id })).run(), await e.env.DB.prepare(`INSERT INTO kpi_metrics (account_id, user_id, metric_date, posts_sent)
           VALUES (?, ?, date('now','+9 hours'), 1)
           ON CONFLICT(account_id, metric_date) DO UPDATE SET
             posts_sent = posts_sent + 1,
             updated_at = datetime('now','+9 hours')`).bind(d.id, r.user_id).run(), n++;
        } finally {
          await Js(e.env, d.id);
        }
      } catch (d) {
        const l = (d == null ? void 0 : d.message) || "unknown_error";
        await e.env.DB.prepare("UPDATE post_queue SET status='failed', error_message=?, updated_at=? WHERE id=?").bind(l, g(), r.id).run(), await e.env.DB.prepare("UPDATE autopilot_jobs SET status='error', error_message=?, updated_at=? WHERE generated_post_id=? AND user_id=?").bind(l, g(), r.id, r.user_id).run(), await e.env.DB.prepare(`INSERT INTO post_logs
           (record_id, account_id, user_id, platform, source_type, post_mode, content, content_hash,
            status, error_message, executed_at)
         VALUES (?, ?, ?, 'x', ?, ?, ?, ?, 'failed', ?, ?)`).bind(r.id, r.account_id, r.user_id, r.source_type, r.post_mode, r.body || "", r.content_hash || "", l, g()).run(), r.account_id && (ge365xIsXExternalBlock(l) ? await mt(e.env, r.account_id, "external_api_block", 0, { message: l }) : d instanceof Mt ? await mt(e.env, r.account_id, "rate_limit", -15) : await mt(e.env, r.account_id, "error", -5, { message: l })), r.account_id && await e.env.DB.prepare(`INSERT INTO kpi_metrics (account_id, user_id, metric_date, posts_failed)
           VALUES (?, ?, date('now','+9 hours'), 1)
           ON CONFLICT(account_id, metric_date) DO UPDATE SET
             posts_failed = posts_failed + 1,
             updated_at = datetime('now','+9 hours')`).bind(r.account_id, r.user_id).run(), i++;
      }
    }
  }
  return e.json({ ok: true, processed: a, success: n, failed: i, now: t });
});
var ve = new A();
ve.get("/api/admin/autopilot/jobs", m, async (e) => {
  const t = e.get("user"), { results: s } = await e.env.DB.prepare(`SELECT aj.*, xa.account_name
       FROM autopilot_jobs aj LEFT JOIN x_accounts xa ON aj.account_id = xa.id
      WHERE aj.user_id = ?
      ORDER BY COALESCE(aj.generate_at, aj.publish_at, aj.created_at) DESC LIMIT 100`).bind(t.id).all(), { results: a } = await e.env.DB.prepare("SELECT id, account_name FROM x_accounts WHERE user_id = ? AND is_active = 1").bind(t.id).all();
  return e.json({ jobs: s || [], accounts: a || [] });
});
ve.get("/api/admin/autopilot/jobs/:id", m, async (e) => {
  const t = e.get("user"), s = await e.env.DB.prepare("SELECT * FROM autopilot_jobs WHERE id=? AND user_id=?").bind(parseInt(e.req.param("id"), 10), t.id).first();
  return s ? e.json(s) : e.json({ error: "not found" });
});
ve.post("/api/admin/autopilot/jobs", m, async (e) => {
  const t = e.get("user"), s = await e.req.json(), a = g(), n = (s.publish_at || s.generate_at || a).slice(0, 10), i = await e.env.DB.prepare(`SELECT COUNT(*) AS cnt FROM autopilot_jobs
       WHERE user_id=? AND account_id=?
         AND SUBSTR(COALESCE(publish_at, generate_at, created_at), 1, 10)=?
         AND status NOT IN ('cancelled')`).bind(t.id, s.account_id || 0, n).first();
  if (((i == null ? void 0 : i.cnt) ?? 0) >= 10) return e.json({ success: false, error: "\u3053\u306E\u65E5\u306F\u65E2\u306B10\u4EF6\u306E\u4E88\u7D04\u304C\u3042\u308A\u307E\u3059" });
  const r = await e.env.DB.prepare("SELECT MAX(CAST(reservation_no AS INTEGER)) AS mx FROM autopilot_jobs").first(), o = String(((r == null ? void 0 : r.mx) ?? 0) + 1).padStart(4, "0");
  let d = s.generate_at ?? null;
  if (s.publish_at && !s.generate_at) try {
    const p = /* @__PURE__ */ new Date(s.publish_at.replace(" ", "T") + "+09:00");
    p.setMinutes(p.getMinutes() - 2);
    const pad = /* @__PURE__ */ __name((n2) => String(n2).padStart(2, "0"), "pad");
    d = p.getFullYear() + "-" + pad(p.getMonth() + 1) + "-" + pad(p.getDate()) + " " + pad(p.getHours()) + ":" + pad(p.getMinutes()) + ":" + pad(p.getSeconds());
  } catch {
  }
  const l = d || s.publish_at ? "configured" : "draft";
  let optsJson = s.options_json || "{}";
  try {
    const o2 = typeof optsJson === "string" ? JSON.parse(optsJson) : optsJson;
    if (Array.isArray(s.media_ids) && s.media_ids.length > 0) o2.media_ids = s.media_ids.slice(0, 4);
    if (s.post_mode) o2.pm = s.post_mode;
    optsJson = JSON.stringify(o2);
  } catch {
    const o2 = {};
    if (Array.isArray(s.media_ids) && s.media_ids.length > 0) o2.media_ids = s.media_ids.slice(0, 4);
    if (s.post_mode) o2.pm = s.post_mode;
    optsJson = JSON.stringify(o2);
  }
  const c = await e.env.DB.prepare(`INSERT INTO autopilot_jobs
       (reservation_no, user_id, account_id, channel_type, content_mode, theme, keywords,
        prompt_text, options_json, title_memo, link_url, generate_at, publish_at, status, created_at, updated_at)
     VALUES (?, ?, ?, 'x', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(o, t.id, s.account_id ?? null, s.content_mode || "problem", s.theme || "", s.keywords || "", s.prompt_text || "", optsJson, s.title_memo || "", s.link_url || "", d, s.publish_at || null, l, a, a).run();
  return e.json({ success: true, id: c.meta.last_row_id, reservation_no: o });
});
ve.put("/api/admin/autopilot/jobs/:id", m, async (e) => {
  const t = e.get("user"), s = parseInt(e.req.param("id"), 10), a = await e.req.json(), n = g();
  let i = a.generate_at ?? null;
  if (a.publish_at && !a.generate_at) try {
    const o = /* @__PURE__ */ new Date(a.publish_at.replace(" ", "T") + "+09:00");
    o.setMinutes(o.getMinutes() - 2);
    const pad = /* @__PURE__ */ __name((n2) => String(n2).padStart(2, "0"), "pad");
    i = o.getFullYear() + "-" + pad(o.getMonth() + 1) + "-" + pad(o.getDate()) + " " + pad(o.getHours()) + ":" + pad(o.getMinutes()) + ":" + pad(o.getSeconds());
  } catch {
  }
  const r = i || a.publish_at ? "configured" : "draft";
  return await e.env.DB.prepare(`UPDATE autopilot_jobs SET
       content_mode=?, theme=?, keywords=?, prompt_text=?, options_json=?, title_memo=?,
       link_url=?, generate_at=?, publish_at=?, status=?, updated_at=?
     WHERE id=? AND user_id=?`).bind(a.content_mode || "problem", a.theme || "", a.keywords || "", a.prompt_text || "", a.options_json || "{}", a.title_memo || "", a.link_url || "", i, a.publish_at || null, r, n, s, t.id).run(), e.json({ success: true });
});
ve.delete("/api/admin/autopilot/jobs/:id", m, async (e) => {
  const t = e.get("user");
  return await e.env.DB.prepare("DELETE FROM autopilot_jobs WHERE id=? AND user_id=?").bind(parseInt(e.req.param("id"), 10), t.id).run(), e.json({ success: true });
});
ve.post("/api/admin/autopilot/jobs/:id/cancel", m, async (e) => {
  const t = e.get("user");
  return await e.env.DB.prepare("UPDATE autopilot_jobs SET status='cancelled', updated_at=? WHERE id=? AND user_id=?").bind(g(), parseInt(e.req.param("id"), 10), t.id).run(), e.json({ success: true });
});
ve.post("/api/admin/autopilot/jobs/:id/retry", m, async (e) => {
  const t = e.get("user"), s = parseInt(e.req.param("id"), 10);
  const job = await e.env.DB.prepare("SELECT * FROM autopilot_jobs WHERE id=? AND user_id=?").bind(s, t.id).first();
  if (!job) return e.json({ success: false, error: "not_found" }, 404);
  const reqBody = await e.req.json().catch(() => ({}));
  const pad = /* @__PURE__ */ __name((n) => String(n).padStart(2, "0"), "pad");
  const offsetJst = 9 * 60 * 60 * 1e3;
  let newPublishAt = reqBody.publish_at || null;
  if (!newPublishAt) {
    const np = new Date(Date.now() + offsetJst);
    newPublishAt = np.getUTCFullYear() + "-" + pad(np.getUTCMonth() + 1) + "-" + pad(np.getUTCDate()) + " " + pad(np.getUTCHours()) + ":" + pad(np.getUTCMinutes()) + ":" + pad(np.getUTCSeconds());
  }
  let newGenAt;
  try {
    const pubD = /* @__PURE__ */ new Date(newPublishAt.replace(" ", "T") + "+09:00");
    pubD.setMinutes(pubD.getMinutes() - 2);
    const j2 = new Date(pubD.getTime() + offsetJst);
    newGenAt = j2.getUTCFullYear() + "-" + pad(j2.getUTCMonth() + 1) + "-" + pad(j2.getUTCDate()) + " " + pad(j2.getUTCHours()) + ":" + pad(j2.getUTCMinutes()) + ":" + pad(j2.getUTCSeconds());
  } catch {
    const d = new Date(Date.now() + 60 * 1e3 + offsetJst);
    newGenAt = d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + " " + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds());
  }
  if (job.status === "generated" && job.generated_post_id) {
    await e.env.DB.prepare("UPDATE post_queue SET status='approved', scheduled_at=?, effective_scheduled_at=?, base_scheduled_at=?, error_message=NULL, posted_at=NULL, updated_at=? WHERE id=? AND user_id=?").bind(newPublishAt, newPublishAt, newPublishAt, g(), job.generated_post_id, t.id).run();
    await e.env.DB.prepare("UPDATE autopilot_jobs SET status='generated', publish_at=?, error_message=NULL, updated_at=? WHERE id=? AND user_id=?").bind(newPublishAt, g(), s, t.id).run();
    return e.json({ success: true, mode: "post_queue_reset", publish_at: newPublishAt, post_queue_id: job.generated_post_id });
  }
  await e.env.DB.prepare("UPDATE autopilot_jobs SET status='configured', generate_at=?, publish_at=?, error_message=NULL, generated_post_id=NULL, updated_at=? WHERE id=? AND user_id=?").bind(newGenAt, newPublishAt, g(), s, t.id).run();
  return e.json({ success: true, mode: "regenerate", next_at: newGenAt, publish_at: newPublishAt });
});
ve.post("/cron/autopilot-tick", async (e) => {
  let openaiKey = e.env.OPENAI_API_KEY;
  if (!openaiKey) {
    try {
      const enc = await Tt(e, "openai_api_key");
      if (enc) openaiKey = await lt(enc, e.env.ENCRYPTION_KEY);
    } catch {
    }
  }
  if (!openaiKey) return e.json({ ok: true, skipped: "no_openai_key" });
  const { results: t } = await e.env.DB.prepare(`SELECT * FROM autopilot_jobs
       WHERE status = 'configured'
         AND (
              (generate_at IS NOT NULL AND generate_at <= datetime('now','+9 hours'))
           OR (publish_at IS NOT NULL AND publish_at <= datetime('now','+9 hours'))
         )
       ORDER BY COALESCE(generate_at, publish_at) ASC LIMIT 5`).all();
  let s = 0;
  for (const a of t || []) try {
    const n = String(a.account_id ?? "default");
    let i = await e.env.DB.prepare("SELECT * FROM target_templates WHERE account_id=? AND user_id=? LIMIT 1").bind(n, a.user_id).first();
    i || (i = await e.env.DB.prepare("SELECT * FROM target_templates WHERE user_id=? ORDER BY is_default DESC LIMIT 1").bind(a.user_id).first());
    let r = await e.env.DB.prepare("SELECT * FROM brand_voice WHERE account_id=? AND user_id=? LIMIT 1").bind(n, a.user_id).first();
    r || (r = await e.env.DB.prepare("SELECT * FROM brand_voice WHERE user_id=? ORDER BY is_default DESC LIMIT 1").bind(a.user_id).first());
    let apOpts = {};
    try {
      apOpts = a.options_json ? JSON.parse(a.options_json) : {};
    } catch {
      apOpts = {};
    }
    const apPostModeRaw = apOpts.pm || apOpts.post_mode || "body";
    const apPostMode = ["body", "140", "simple"].includes(apPostModeRaw) ? apPostModeRaw : "body";
    let o;
    a.content_mode && a.content_mode !== "freetext" ? o = await Us(openaiKey, a.content_mode, a.theme || "", a.keywords || "", i, r, apPostMode) : o = await Hs(openaiKey, a.theme || "", a.keywords || "", i, r, apPostMode);
    const d = await Ae(o), l = g();
    let mediaJsonStr = null, mediaTypeStr = null;
    try {
      const opts = apOpts;
      if (Array.isArray(opts.media_ids) && opts.media_ids.length > 0) {
        mediaJsonStr = JSON.stringify(opts.media_ids.slice(0, 4));
        const ft2 = await e.env.DB.prepare("SELECT file_type FROM media_assets WHERE id=? AND user_id=?").bind(opts.media_ids[0], a.user_id).first();
        mediaTypeStr = (ft2 == null ? void 0 : ft2.file_type) || null;
      }
    } catch {
    }
    const c = await e.env.DB.prepare(`INSERT INTO post_queue
           (platform, user_id, account_id, body, link_url, post_mode,
            scheduled_at, effective_scheduled_at, base_scheduled_at,
            content_hash, generation_type, source_type, status, media_json, media_type, created_at, updated_at)
         VALUES ('x', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'autopilot', 'approved', ?, ?, ?, ?)`).bind(a.user_id, a.account_id, o, a.link_url, apPostMode, a.publish_at, a.publish_at, a.publish_at, d, a.content_mode, mediaJsonStr, mediaTypeStr, l, l).run();
    await e.env.DB.prepare("UPDATE autopilot_jobs SET status='generated', generated_post_id=?, updated_at=? WHERE id=?").bind(c.meta.last_row_id, l, a.id).run(), s++;
  } catch (n) {
    await e.env.DB.prepare("UPDATE autopilot_jobs SET status='error', error_message=?, updated_at=? WHERE id=?").bind((n == null ? void 0 : n.message) || "unknown_error", g(), a.id).run();
  }
  return e.json({ ok: true, generated: s, total: (t || []).length });
});
var is = { topics: [{ title: "\u6295\u7A3F\u306E\u57FA\u672C", keywords: ["\u6295\u7A3F", "\u30DD\u30B9\u30C8", "\u30C4\u30A4\u30FC\u30C8", "post", "tweet"], answer: "[\u65B0\u898F\u6295\u7A3F] \u30BF\u30D6\u304B\u3089\u672C\u6587\u3092\u5165\u529B\u3057\u300C\u6295\u7A3F\u30AD\u30E5\u30FC\u3078\u300D\u3067\u4E88\u7D04\u3067\u304D\u307E\u3059\u3002\u5373\u6642\u6295\u7A3F\u306F [\u4ECA\u3059\u3050\u6295\u7A3F] \u30DC\u30BF\u30F3\u304B\u3089\u3002" }, { title: "\u30AA\u30FC\u30C8\u30D1\u30A4\u30ED\u30C3\u30C8", keywords: ["\u30AA\u30FC\u30C8\u30D1\u30A4\u30ED\u30C3\u30C8", "autopilot", "\u81EA\u52D5\u6295\u7A3F", "\u81EA\u52D5"], answer: "[\u30AA\u30FC\u30C8\u30D1\u30A4\u30ED\u30C3\u30C8] \u30BF\u30D6\u3067\u30B8\u30E7\u30D6\u3092\u4F5C\u6210\u3059\u308B\u3068\u3001\u6307\u5B9A\u6642\u523B\u306B OpenAI \u304C\u6295\u7A3F\u6848\u3092\u751F\u6210\u3057\u30AD\u30E5\u30FC\u306B\u5165\u308A\u307E\u3059\u3002" }, { title: "\u30A2\u30AB\u30A6\u30F3\u30C8\u9023\u643A", keywords: ["\u9023\u643A", "\u30A2\u30AB\u30A6\u30F3\u30C8", "\u8FFD\u52A0", "OAuth", "\u30C8\u30FC\u30AF\u30F3"], answer: "X Developer Portal \u3067 Consumer Key/Secret \u3068 Access Token/Secret \u3092\u53D6\u5F97\u3057\u3001[\u30A2\u30AB\u30A6\u30F3\u30C8\u7BA1\u7406] \u304B\u3089\u8FFD\u52A0\u3057\u3066\u304F\u3060\u3055\u3044\u3002OAuth 1.0a User Context \u3092\u4F7F\u7528\u3057\u307E\u3059\u3002" }, { title: "\u30E9\u30A4\u30BB\u30F3\u30B9", keywords: ["\u30E9\u30A4\u30BB\u30F3\u30B9", "\u8A8D\u8A3C", "license", "VPS-GE365X"], answer: "\u30ED\u30B0\u30A4\u30F3\u753B\u9762\u306E [\u30E9\u30A4\u30BB\u30F3\u30B9] \u30BF\u30D6\u304B\u3089 VPS-GE365X-XXXXXXXX \u5F62\u5F0F\u306E\u30AD\u30FC\u3092\u5165\u529B\u3059\u308B\u3068\u30D7\u30E9\u30F3\u304C\u6709\u52B9\u5316\u3055\u308C\u307E\u3059\u3002" }, { title: "\u985E\u4F3C\u5EA6\u5236\u5FA1", keywords: ["\u985E\u4F3C", "\u91CD\u8907", "\u30D6\u30ED\u30C3\u30AF", "similarity"], answer: "\u540C\u4E00\u30A2\u30AB\u30A6\u30F3\u30C8\u306E\u76F4\u8FD15\u4EF6\u3068 Jaccard\u4FC2\u6570 0.7 \u4EE5\u4E0A\u306E\u985E\u4F3C\u304C\u3042\u308B\u3068\u6295\u7A3F\u304C\u30D6\u30ED\u30C3\u30AF\u3055\u308C\u307E\u3059\u3002" }, { title: "\u6295\u7A3F\u9593\u9694", keywords: ["\u9593\u9694", "\u6642\u9593", "cooldown", "spacing"], answer: "\u6700\u4F4E\u6295\u7A3F\u9593\u9694\u306F15\u5206\u3001\u63A8\u5968\u306F30\u301C120\u5206\u306E\u30E9\u30F3\u30C0\u30E0\u3002jitter \u3067 \xB15\u5206\u306E\u5FAE\u5206\u6563\u3082\u4ED8\u4E0E\u3055\u308C\u307E\u3059\u3002" }], default_response: "\u8A72\u5F53\u3059\u308B\u30C8\u30D4\u30C3\u30AF\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002[\u30A2\u30AB\u30A6\u30F3\u30C8\u7BA1\u7406][\u6295\u7A3F][\u30AA\u30FC\u30C8\u30D1\u30A4\u30ED\u30C3\u30C8][\u30E9\u30A4\u30BB\u30F3\u30B9] \u7B49\u306E\u30AD\u30FC\u30EF\u30FC\u30C9\u3067\u8A66\u3057\u3066\u304F\u3060\u3055\u3044\u3002" };
var tt = new A();
async function qt(e) {
  const t = await e.DB.prepare("SELECT json_data FROM chatbot_kb WHERE id = 1").first();
  if (t != null && t.json_data) try {
    return JSON.parse(t.json_data);
  } catch {
  }
  return await e.DB.prepare("INSERT OR IGNORE INTO chatbot_kb (id, json_data) VALUES (1, ?)").bind(JSON.stringify(is)).run(), is;
}
__name(qt, "qt");
tt.get("/api/admin/chatbot/topics", m, async (e) => {
  const t = await qt(e.env);
  return e.json({ topics: (t.topics || []).map((s, a) => ({ id: a, title: s.title, keywords: s.keywords })) });
});
function ge365xSupportManualAnswer(e) {
  const t = String(e || "").toLowerCase();
  const s = `\n\n上記で解決しない場合、または画面名・エラー内容が一致しない場合は、予測で操作せずカスタマーへ問い合わせてください。問い合わせ時は、表示されたエラー文、操作した画面名、発生時刻を一緒に伝えると確認が早くなります。`;
  if (!t.trim()) return "質問内容を入力してください。\n\n例: 「X投稿が403になる」「オートパイロットが投稿されない」「ライセンス認証の方法」など、困っている画面名と表示されたエラーをそのまま入力してください。" + s;
  if (/(api設定|api 設定|api|openai|gemini|telegram|テレグラム|楽天api|x api|キー|key|token|secret|トークン)/i.test(t)) return "API設定の基本手順です。\n\n1. GE365Xの左メニューから [API設定] を開きます。\n2. 使いたい機能に必要なAPI情報を入力します。\n3. 入力後、必ず [保存] を押します。\n4. 保存後、[テスト] または [設定確認] を押して接続確認をします。\n5. テストが失敗した場合は、表示されたエラー文をそのまま確認します。推測で別の欄に入力し直さないでください。\n\nX APIの設定:\n1. X Developer Portalで対象アプリを開きます。\n2. API Key、API Secret、Access Token、Access Token Secretを取得します。\n3. 投稿に使う場合は App permissions を Read and write にします。\n4. 権限を変更した場合、Access Token and Secretは必ず再生成します。\n5. GE365Xの [API設定] と [アカウント管理] に保存します。\n\nOpenAI APIの設定:\n1. OpenAIの管理画面でAPIキーを発行します。\n2. GE365Xの [API設定] にOpenAI APIキーを貼り付けます。\n3. AI生成、オートパイロット、記事生成で使用します。\n\nGemini APIの設定:\n1. Google AI StudioでAPIキーを発行します。\n2. GE365Xの [API設定] にGemini APIキーを貼り付けます。\n3. Geminiを使う生成機能で使用します。\n\nTelegram APIの設定:\n1. TelegramのBotFatherでBot Tokenを取得します。\n2. 通知先のChat IDを確認します。\n3. GE365Xの [API設定] にBot TokenとChat IDを保存します。\n4. [テスト送信] で通知が届くか確認します。\n\n楽天APIの設定:\n1. 楽天デベロッパーズでアプリケーションIDとAccess keyを取得します。\n2. GE365Xの [API設定] にアプリケーションURL、アプリケーションID、Access keyを保存します。\n3. アフィリエイトIDは任意です。持っている場合だけ入力します。\n4. [設定確認] を押して楽天APIの接続を確認します。\n\n上記のどれかが取得できない、または画面の名前が違う場合は、予測で進めずカスタマーへ問い合わせてください。" + s;
  if (/(403|401|投稿権限|unauthorized|forbidden|今すぐ投稿|投稿できない|post)/i.test(t)) return "X投稿ができない場合の確認手順です。\n\n1. まず [アカウント管理] を開き、対象のXアカウントが「有効」になっているか確認します。\n2. [接続テスト] を押して、読み取り接続が通るか確認します。\n3. 403 または投稿権限エラーが出る場合は、X Developer Portal側で App permissions が Read and write になっているか確認します。\n4. 権限を変更した後は、古い Access Token / Secret は使えません。必ず Access Token and Secret を再生成します。\n5. 再生成した Access Token と Access Token Secret を GE365X の [アカウント管理] に保存し直します。\n6. 保存後、再度 [接続テスト] を行い、問題なければ [今すぐ投稿] または [再投稿] を試します。" + s;
  if (/(オートパイロット|autopilot|自動投稿|予約|投稿されない|再投稿)/i.test(t)) return "オートパイロットが投稿されない場合の確認手順です。\n\n1. [オートパイロット] を開き、対象の予約が「未投稿」「失敗」「投稿済」のどれになっているか確認します。\n2. 「未投稿」のままの場合は、生成日時と投稿日時が現在時刻を過ぎているか確認します。\n3. 「失敗」の場合は、行に表示されているエラー文を確認します。403/401 が含まれる場合は、X側の投稿権限またはAccess Tokenの問題です。\n4. [再投稿] を押す前に、[アカウント管理] で接続テストを行います。\n5. 接続テストがOKでも、投稿権限がないAccess Tokenでは投稿できません。X Developer Portalで Read and write に変更し、Access Token and Secret を再生成してください。\n6. それでも投稿されない場合は、エラー文と予約番号を控えてカスタマーへ問い合わせてください。" + s;
  if (/(ライセンス|license|認証|プラン|pro|standard|free)/i.test(t)) return "ライセンスとプランの確認手順です。\n\n1. ログイン画面または管理画面で、ライセンスキーを入力します。\n2. 認証に成功すると、ユーザーのプランが Free / Standard / Pro のいずれかに反映されます。\n3. 管理者は [管理画面] の [ユーザー] タブで、各ユーザーのプランを変更できます。\n4. Pro限定機能が表示されない場合は、対象ユーザーのプランが Pro になっているか確認してください。\n5. ライセンスキー、登録メール、認証ユーザーが一致しない場合は、自己判断で削除せずカスタマーへ問い合わせてください。" + s;
  if (/(楽天|rakuten|アフィリ|アフィリエイト|application id|access key)/i.test(t)) return "楽天アフィリエイト機能の確認手順です。\n\n1. [API設定] を開き、楽天のアプリケーションURL、アプリケーションID、Access keyを保存します。\n2. アフィリエイトIDは任意ですが、持っている場合は入力してください。\n3. [設定確認] を押して、楽天APIに接続できるか確認します。\n4. 楽天側で短時間制限が出た場合は、数分待ってから1回だけ再実行してください。\n5. 400/403が続く場合は、楽天デベロッパーズの情報とGE365Xに保存した情報が一致しているか確認します。\n6. 画面に表示されたエラー文が不明な場合は、推測で何度も押さずカスタマーへ問い合わせてください。" + s;
  if (/(バズ|buzz|リサーチ|検索|閲覧数|いいね|リポスト)/i.test(t)) return "バズリサーチの使い方です。\n\n1. [バズリサーチAI] を開きます。\n2. テーマ・キーワードを入力します。\n3. 必要に応じて、最低閲覧数、最低いいね数、最低リポスト数を指定します。\n4. [バズ投稿を探す] を押すと、X APIで条件に合う投稿を検索します。\n5. 条件が厳しすぎると投稿が見つかりません。その場合は最低閲覧数やいいね数を下げて再検索してください。\n6. X APIの課金上限や権限エラーが出た場合は、GE365X側では解除できないため、X Developer Portalの設定を確認してください。" + s;
  if (/(画像|動画|アップロード|media|r2|ファイル)/i.test(t)) return "画像・動画アップロードの確認手順です。\n\n1. 投稿作成画面、AI生成画面、楽天アフィリ画面などで [画像] または [ファイルを選択] を押します。\n2. パソコンまたはスマホ内の画像ファイルを選びます。\n3. アップロード後、投稿カードに画像が表示されるか確認します。\n4. X投稿に使う場合、最大4枚まで添付できます。\n5. アップロードに失敗する場合は、ファイル形式、容量、通信状態を確認してください。\n6. どの形式が使えるか不明な場合は、カスタマーへ問い合わせてください。" + s;
  return "この質問は、現在のAIサポート内に確実な手順が登録されていません。\n\n予測で案内すると誤操作につながる可能性があります。画面名、表示されたエラー文、何を押した直後に起きたかを控えて、カスタマーへ問い合わせてください。\n\n確認するときのメモ例:\n1. 画面名: 例 [オートパイロット]\n2. 操作: 例 [再投稿] を押した\n3. エラー: 例 403 Forbidden\n4. 時刻: 例 2026/06/02 10:15";
}
__name(ge365xSupportManualAnswer, "ge365xSupportManualAnswer");
tt.post("/api/admin/chatbot/ask", m, async (e) => {
  const t = await qt(e.env), a = ((await e.req.json().catch(() => ({}))).question || "").toLowerCase().trim();
  const manual = ge365xSupportManualAnswer(a);
  if (manual) return e.json({ answer: manual, matched: true, manual: true });
  if (!a) return e.json({ answer: t.default_response });
  let n = null, i = 0;
  for (const r of t.topics || []) {
    let o = 0;
    for (const d of r.keywords || []) a.includes(d.toLowerCase()) && (o += d.length);
    o > i && (i = o, n = r);
  }
  return n ? e.json({ answer: n.answer, title: n.title, matched: true }) : e.json({ answer: t.default_response, matched: false });
});
tt.get("/api/admin/chatbot/topic/:id", m, async (e) => {
  const s = ((await qt(e.env)).topics || [])[parseInt(e.req.param("id"), 10)];
  return s ? e.json({ topic: s }) : e.json({ error: "\u30C8\u30D4\u30C3\u30AF\u672A\u767B\u9332" }, 404);
});
tt.put("/api/admin/chatbot/kb", m, R, async (e) => {
  const t = await e.req.json();
  return !t || !Array.isArray(t.topics) ? e.json({ error: "invalid_kb" }, 400) : (await e.env.DB.prepare(`INSERT INTO chatbot_kb (id, json_data, updated_at)
     VALUES (1, ?, datetime('now','+9 hours'))
     ON CONFLICT(id) DO UPDATE SET json_data=excluded.json_data, updated_at=excluded.updated_at`).bind(JSON.stringify(t)).run(), e.json({ success: true, topic_count: t.topics.length }));
});
var st = new A();
st.get("/api/admin/drafts", m, async (e) => {
  const t = e.get("user"), { results: s } = await e.env.DB.prepare(`SELECT id, account_id, title, body, link_url, hashtags, post_mode, created_at, updated_at
       FROM drafts WHERE user_id = ? ORDER BY updated_at DESC LIMIT 200`).bind(t.id).all();
  return e.json({ drafts: s || [] });
});
st.post("/api/admin/drafts", m, async (e) => {
  const t = e.get("user"), s = await e.req.json();
  if (!s.body) return e.json({ error: "body required" }, 400);
  const a = await e.env.DB.prepare(`INSERT INTO drafts (user_id, account_id, title, body, link_url, hashtags, post_mode)
     VALUES (?, ?, ?, ?, ?, ?, ?)`).bind(t.id, s.account_id ?? null, s.title ?? null, s.body, s.link_url ?? null, s.hashtags ?? null, s.post_mode ?? "body").run();
  return e.json({ success: true, id: a.meta.last_row_id });
});
st.put("/api/admin/drafts/:id", m, async (e) => {
  const t = e.get("user"), s = parseInt(e.req.param("id"), 10), a = await e.req.json();
  return await e.env.DB.prepare(`UPDATE drafts SET
       title = COALESCE(?, title),
       body = COALESCE(?, body),
       link_url = COALESCE(?, link_url),
       hashtags = COALESCE(?, hashtags),
       post_mode = COALESCE(?, post_mode),
       account_id = COALESCE(?, account_id),
       updated_at = ?
     WHERE id = ? AND user_id = ?`).bind(a.title ?? null, a.body ?? null, a.link_url ?? null, a.hashtags ?? null, a.post_mode ?? null, a.account_id ?? null, g(), s, t.id).run(), e.json({ success: true });
});
st.delete("/api/admin/drafts/:id", m, async (e) => {
  const t = e.get("user");
  return await e.env.DB.prepare("DELETE FROM drafts WHERE id=? AND user_id=?").bind(parseInt(e.req.param("id"), 10), t.id).run(), e.json({ success: true });
});
var at = new A();
at.get("/api/admin/media", m, async (e) => {
  const t = e.get("user"), { results: s } = await e.env.DB.prepare(`SELECT id, file_type, mime_type, file_name, byte_size, storage_path, x_media_id,
            upload_status, last_error, created_at
       FROM media_assets WHERE user_id = ? ORDER BY id DESC LIMIT 200`).bind(t.id).all();
  return e.json({ assets: s || [] });
});
at.post("/api/admin/media", m, async (e) => {
  const t = e.get("user");
  try {
    const fb = await e.req.parseBody();
    const a = fb.file;
    if (!a || typeof a === "string") return e.json({ success: false, error: "file required" }, 400);
    const mime = a.type || "application/octet-stream";
    const n = mime.startsWith("video/") ? "video" : "image";
    const sz = a.size || 0;
    if (sz > 20 * 1024 * 1024) return e.json({ success: false, error: "\u30D5\u30A1\u30A4\u30EB\u30B5\u30A4\u30BA\u304C\u5927\u304D\u3059\u304E\u307E\u3059 (20MB\u4E0A\u9650)" }, 413);
    const fileName = a.name || "upload.bin";
    if (e.env.MEDIA_BUCKET) {
      const i = `u${t.id}/${Date.now()}-${fileName.replace(/[^\w.\-]/g, "_")}`;
      await e.env.MEDIA_BUCKET.put(i, await a.arrayBuffer(), { httpMetadata: { contentType: mime } });
      const r = await e.env.DB.prepare(`INSERT INTO media_assets (user_id, file_type, mime_type, file_name, byte_size, storage_path, upload_status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, 'ready', ?, ?)`).bind(t.id, n, mime, fileName, sz, `/media/${i}`, g(), g()).run();
      return e.json({ success: true, id: r.meta.last_row_id, storage_path: `/media/${i}` });
    } else {
      const buf = await a.arrayBuffer();
      const u8 = new Uint8Array(buf);
      let bin = "";
      const CH = 8192;
      for (let i = 0; i < u8.length; i += CH) bin += String.fromCharCode.apply(null, u8.subarray(i, i + CH));
      const b64 = "data:" + mime + ";base64," + btoa(bin);
      const r = await e.env.DB.prepare(`INSERT INTO media_assets (user_id, file_type, mime_type, file_name, byte_size, storage_path, upload_status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, 'ready', ?, ?)`).bind(t.id, n, mime, fileName, sz, b64, g(), g()).run();
      return e.json({ success: true, id: r.meta.last_row_id, storage_path: "data:..." });
    }
  } catch (err) {
    console.error("[media-upload]", err);
    return e.json({ success: false, error: err && err.message || "upload error" }, 500);
  }
});
at.delete("/api/admin/media/:id", m, async (e) => {
  var n;
  const t = e.get("user"), s = parseInt(e.req.param("id"), 10), a = await e.env.DB.prepare("SELECT storage_path FROM media_assets WHERE id=? AND user_id=?").bind(s, t.id).first();
  if ((n = a == null ? void 0 : a.storage_path) != null && n.startsWith("/media/") && e.env.MEDIA_BUCKET) {
    const i = a.storage_path.slice(7);
    await e.env.MEDIA_BUCKET.delete(i).catch(() => {
    });
  }
  return await e.env.DB.prepare("DELETE FROM media_assets WHERE id=? AND user_id=?").bind(s, t.id).run(), e.json({ success: true });
});
at.post("/api/admin/media/url", m, async (e) => {
  const t = e.get("user");
  const { url: u2, file_type: ft2 } = await e.req.json().catch(() => ({}));
  if (!u2 || typeof u2 !== "string" || !/^https?:\/\//i.test(u2)) return e.json({ error: "valid url required" }, 400);
  const tt2 = g();
  const ft22 = ft2 || (/\.(mp4|mov|m4v|webm)(\?|$)/i.test(u2) ? "video" : "image");
  const r = await e.env.DB.prepare(`INSERT INTO media_assets (user_id, file_type, mime_type, file_name, byte_size, storage_path, upload_status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, 'ready', ?, ?)`).bind(t.id, ft22, ft22 === "video" ? "video/mp4" : "image/jpeg", u2.split("/").pop() || "remote", 0, u2, tt2, tt2).run();
  return e.json({ success: true, id: r.meta.last_row_id, storage_path: u2 });
});
at.post("/api/admin/media/:id/x-upload", m, async (e) => {
  const t = e.get("user");
  const sid = parseInt(e.req.param("id"), 10);
  const { account_id: aid } = await e.req.json().catch(() => ({}));
  const asset = await e.env.DB.prepare("SELECT * FROM media_assets WHERE id=? AND user_id=?").bind(sid, t.id).first();
  if (!asset) return e.json({ error: "asset not found" }, 404);
  if (asset.x_media_id) return e.json({ success: true, x_media_id: asset.x_media_id, cached: true });
  let acct = null;
  if (aid) acct = await e.env.DB.prepare("SELECT * FROM x_accounts WHERE id=? AND user_id=?").bind(aid, t.id).first();
  if (!acct) acct = await e.env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_current=1 LIMIT 1").bind(t.id).first();
  if (!acct) acct = await e.env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_active=1 ORDER BY id ASC LIMIT 1").bind(t.id).first();
  if (!acct) return e.json({ error: "No active X account" }, 400);
  let bytes, mime;
  try {
    if (asset.storage_path && asset.storage_path.startsWith("/media/")) {
      if (!e.env.MEDIA_BUCKET) return e.json({ error: "R2 not configured" }, 501);
      const key = asset.storage_path.slice(7);
      const obj = await e.env.MEDIA_BUCKET.get(key);
      if (!obj) return e.json({ error: "object not found in R2" }, 404);
      bytes = await obj.arrayBuffer();
      mime = asset.mime_type || obj.httpMetadata && obj.httpMetadata.contentType || "image/jpeg";
    } else if (asset.storage_path && /^https?:/i.test(asset.storage_path)) {
      const r = await fetch(asset.storage_path, { signal: AbortSignal.timeout(3e4) });
      if (!r.ok) return e.json({ error: "failed to fetch remote media: " + r.status }, 400);
      bytes = await r.arrayBuffer();
      mime = asset.mime_type || r.headers.get("content-type") || "image/jpeg";
    } else return e.json({ error: "unsupported storage_path" }, 400);
  } catch (err) {
    return e.json({ error: "media fetch error: " + err.message }, 500);
  }
  try {
    const creds = await Ft(e.env, acct);
    const xMid = await xMU_upload(creds, bytes, mime);
    await e.env.DB.prepare("UPDATE media_assets SET x_media_id=?, upload_status='uploaded', updated_at=? WHERE id=? AND user_id=?").bind(xMid, g(), sid, t.id).run();
    return e.json({ success: true, x_media_id: xMid });
  } catch (err) {
    await e.env.DB.prepare("UPDATE media_assets SET upload_status='failed', last_error=?, updated_at=? WHERE id=? AND user_id=?").bind(err && err.message || "unknown", g(), sid, t.id).run();
    return e.json({ success: false, error: err && err.message || "upload error" }, 500);
  }
});
at.post("/api/admin/posts/:id/attach-media", m, async (e) => {
  const t = e.get("user");
  const pid2 = parseInt(e.req.param("id"), 10);
  const { media_ids: mids } = await e.req.json().catch(() => ({ media_ids: [] }));
  if (!Array.isArray(mids)) return e.json({ error: "media_ids must be array" }, 400);
  const post = await e.env.DB.prepare("SELECT id, media_json FROM post_queue WHERE id=? AND user_id=?").bind(pid2, t.id).first();
  if (!post) return e.json({ error: "post not found" }, 404);
  let mediaType = null;
  if (mids.length > 0) {
    const f2 = await e.env.DB.prepare("SELECT file_type FROM media_assets WHERE id=? AND user_id=?").bind(mids[0], t.id).first();
    mediaType = (f2 == null ? void 0 : f2.file_type) || null;
  }
  await e.env.DB.prepare("UPDATE post_queue SET media_json=?, media_type=?, updated_at=? WHERE id=? AND user_id=?").bind(JSON.stringify(mids.slice(0, 4)), mediaType, g(), pid2, t.id).run();
  return e.json({ success: true });
});
at.get("/api/admin/thread/recent-posts", m, async (e) => {
  const t = e.get("user");
  const acctId = e.req.query("account_id");
  const params = [t.id];
  let acctCond = "";
  if (acctId) {
    acctCond = " AND pq.account_id=?";
    params.push(Number(acctId));
  }
  const { results: rq } = await e.env.DB.prepare(`SELECT pq.id, pq.body AS content, pq.external_post_id, pq.posted_at, pq.account_id,
       xa.account_name AS joined_account_name, xa.x_username
     FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id=xa.id
    WHERE pq.user_id=? AND pq.status='posted' AND pq.external_post_id IS NOT NULL AND pq.external_post_id <> ''${acctCond}
    ORDER BY COALESCE(pq.posted_at, pq.updated_at, pq.created_at) DESC LIMIT 30`).bind(...params).all();
  let merged = [...rq || []];
  try {
    const params2 = [t.id];
    let acctCond2 = "";
    if (acctId) {
      acctCond2 = " AND pl.account_id=?";
      params2.push(Number(acctId));
    }
    const { results: rl } = await e.env.DB.prepare(`SELECT pl.id, pl.content, pl.external_post_id, pl.posted_at, pl.account_id,
         xa.account_name AS joined_account_name, xa.x_username
       FROM post_logs pl LEFT JOIN x_accounts xa ON pl.account_id=xa.id
      WHERE pl.user_id=? AND pl.status='posted' AND pl.external_post_id IS NOT NULL AND pl.external_post_id <> ''${acctCond2}
      ORDER BY COALESCE(pl.posted_at, pl.created_at) DESC LIMIT 30`).bind(...params2).all();
    const seen = new Set(merged.map((r) => r.external_post_id));
    for (const r of rl || []) {
      if (!seen.has(r.external_post_id)) {
        seen.add(r.external_post_id);
        merged.push(r);
      }
    }
  } catch {
  }
  if (merged.length === 0) {
    try {
      const { results: rl2 } = await e.env.DB.prepare(`SELECT pl.id, pl.content, pl.api_response_summary, pl.posted_at, pl.account_id,
           xa.account_name AS joined_account_name, xa.x_username
         FROM post_logs pl LEFT JOIN x_accounts xa ON pl.account_id=xa.id
        WHERE pl.user_id=? AND pl.status='posted' AND pl.api_response_summary IS NOT NULL
        ORDER BY COALESCE(pl.posted_at, pl.created_at) DESC LIMIT 30`).bind(t.id).all();
      for (const r of rl2 || []) {
        try {
          const j2 = JSON.parse(r.api_response_summary || "{}");
          if (j2.tweet_id) {
            merged.push({ ...r, external_post_id: j2.tweet_id });
          }
        } catch {
        }
      }
    } catch {
    }
  }
  merged.sort((a, b) => (b.posted_at || "").localeCompare(a.posted_at || ""));
  return e.json({ posts: merged.slice(0, 30) });
});
at.post("/api/admin/thread/post-now", m, async (e) => {
  const t = e.get("user");
  const { target_tweet_id: tid, tweets: arr } = await e.req.json().catch(() => ({}));
  if (!tid || !Array.isArray(arr) || arr.length === 0) return e.json({ success: false, error: "target_tweet_id and tweets are required" }, 400);
  if (arr.length > 20) return e.json({ success: false, error: "max 20 replies" }, 400);
  const acct = await e.env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_current=1 LIMIT 1").bind(t.id).first() || await e.env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_active=1 ORDER BY id ASC LIMIT 1").bind(t.id).first();
  if (!acct) return e.json({ success: false, error: "No active X account" }, 400);
  let creds;
  try {
    creds = await Ft(e.env, acct);
  } catch (err) {
    return e.json({ success: false, error: err && err.message || "creds_failed" }, 400);
  }
  let parent = tid;
  const posted = [];
  const errs = [];
  for (let i = 0; i < arr.length; i++) {
    const it2 = arr[i];
    if (!it2.body || !it2.body.trim()) {
      errs.push({ index: i, error: "empty body" });
      continue;
    }
    const xMids = [];
    if (Array.isArray(it2.media_ids) && it2.media_ids.length > 0) {
      for (const mid of it2.media_ids.slice(0, 4)) {
        const v = await e.env.DB.prepare("SELECT * FROM media_assets WHERE id=? AND user_id=?").bind(mid, t.id).first();
        if (!v) continue;
        if (v.x_media_id) {
          xMids.push(v.x_media_id);
          continue;
        }
        try {
          const { bytes, mime } = await readMediaBytes(e.env, v);
          if (bytes) {
            const xid = await xMU_upload(creds, bytes, mime);
            await e.env.DB.prepare("UPDATE media_assets SET x_media_id=?, upload_status='uploaded', updated_at=? WHERE id=?").bind(xid, g(), v.id).run();
            xMids.push(xid);
          } else {
            console.error("[thread-mediaUp] no bytes for media id=" + mid + " path=" + v.storage_path);
          }
        } catch (uErr) {
          console.error("[thread-mediaUp]", uErr && uErr.message, "media id=" + mid);
        }
      }
    }
    try {
      const r = xMids.length > 0 ? await $sReply(creds, it2.body, parent, xMids) : await $sReply(creds, it2.body, parent);
      posted.push({ index: i, id: r.id });
      parent = r.id;
      const tt2 = g();
      await e.env.DB.prepare(`INSERT INTO post_queue
         (platform, user_id, account_id, body, post_mode, scheduled_at, effective_scheduled_at,
          status, source_type, thread_parent_id, external_post_id, posted_at, media_json, media_type, created_at, updated_at)
         VALUES ('x', ?, ?, ?, 'body', ?, ?, 'posted', 'thread', ?, ?, ?, ?, ?, ?, ?)`).bind(
        t.id,
        acct.id,
        it2.body,
        tt2,
        tt2,
        parent === r.id ? tid : parent,
        r.id,
        tt2,
        xMids.length > 0 ? JSON.stringify(it2.media_ids.slice(0, 4)) : null,
        xMids.length > 0 ? "image" : null,
        tt2,
        tt2
      ).run().catch(() => {
      });
    } catch (err) {
      errs.push({ index: i, error: err && err.message || "post_failed" });
      break;
    }
  }
  return e.json({ success: errs.length === 0, posted: posted.length, errors: errs, results: posted });
});
at.post("/api/admin/thread/schedule", m, async (e) => {
  const t = e.get("user");
  const { target_tweet_id: tid, tweets: arr, scheduled_at: sched } = await e.req.json().catch(() => ({}));
  if (!tid || !Array.isArray(arr) || arr.length === 0) return e.json({ success: false, error: "target_tweet_id and tweets are required" }, 400);
  if (!sched) return e.json({ success: false, error: "scheduled_at required" }, 400);
  if (arr.length > 20) return e.json({ success: false, error: "max 20 replies" }, 400);
  const acct = await e.env.DB.prepare("SELECT id FROM x_accounts WHERE user_id=? AND is_current=1 LIMIT 1").bind(t.id).first() || await e.env.DB.prepare("SELECT id FROM x_accounts WHERE user_id=? AND is_active=1 ORDER BY id ASC LIMIT 1").bind(t.id).first();
  if (!acct) return e.json({ success: false, error: "No active X account" }, 400);
  const tt2 = g();
  const ids = [];
  for (let i = 0; i < arr.length; i++) {
    const it2 = arr[i];
    if (!it2.body || !it2.body.trim()) continue;
    const mediaJson = Array.isArray(it2.media_ids) && it2.media_ids.length > 0 ? JSON.stringify(it2.media_ids.slice(0, 4)) : null;
    const r = await e.env.DB.prepare(`INSERT INTO post_queue
       (platform, user_id, account_id, body, post_mode, scheduled_at, effective_scheduled_at,
        status, source_type, thread_parent_id, media_json, media_type, created_at, updated_at)
       VALUES ('x', ?, ?, ?, 'body', ?, ?, 'approved', 'thread', ?, ?, ?, ?, ?)`).bind(
      t.id,
      acct.id,
      it2.body,
      sched,
      sched,
      i === 0 ? tid : "prev:" + (ids[i - 1] || ""),
      mediaJson,
      mediaJson ? "image" : null,
      tt2,
      tt2
    ).run();
    ids.push(r.meta.last_row_id);
  }
  return e.json({ success: true, ids });
});
at.get("/media/*", async (e) => {
  if (!e.env.MEDIA_BUCKET) return e.notFound();
  const t = e.req.path.replace(/^\/media\//, ""), s = await e.env.MEDIA_BUCKET.get(t);
  if (!s) return e.notFound();
  const a = new Headers();
  return s.writeHttpMetadata(a), a.set("etag", s.httpEtag), new Response(s.body, { headers: a });
});
var Pt = new A();
Pt.get("/api/admin/kpi", m, async (e) => {
  const t = e.get("user"), s = e.req.query("account_id"), a = parseInt(e.req.query("days") || "30", 10), n = [t.id, a];
  let i = "WHERE km.user_id = ? AND km.metric_date >= date('now','+9 hours','-' || ? || ' days')";
  s && (i += " AND km.account_id = ?", n.push(Number(s)));
  const { results: r } = await e.env.DB.prepare(`SELECT km.*, xa.account_name
       FROM kpi_metrics km LEFT JOIN x_accounts xa ON xa.id = km.account_id
       ${i} ORDER BY km.metric_date DESC, km.account_id ASC`).bind(...n).all();
  return e.json({ metrics: r || [] });
});
Pt.get("/api/admin/kpi/summary", m, async (e) => {
  const t = e.get("user"), s = await e.env.DB.prepare(`SELECT SUM(posts_sent) AS sent, SUM(posts_failed) AS failed
       FROM kpi_metrics WHERE user_id = ? AND metric_date = date('now','+9 hours')`).bind(t.id).first(), a = await e.env.DB.prepare(`SELECT SUM(posts_sent) AS sent, SUM(posts_failed) AS failed
       FROM kpi_metrics WHERE user_id = ? AND metric_date >= date('now','+9 hours','-7 days')`).bind(t.id).first();
  return e.json({ today: { sent: (s == null ? void 0 : s.sent) ?? 0, failed: (s == null ? void 0 : s.failed) ?? 0 }, week: { sent: (a == null ? void 0 : a.sent) ?? 0, failed: (a == null ? void 0 : a.failed) ?? 0 } });
});
var gt = new A();
gt.get("/api/admin/posts/recent-posted", m, async (e) => {
  const t = e.get("user");
  const { results: r } = await e.env.DB.prepare(`SELECT pq.id, pq.body AS content, pq.external_post_id, pq.posted_at, pq.created_at, xa.x_username, xa.account_name AS joined_account_name
       FROM post_queue pq LEFT JOIN x_accounts xa ON xa.id = pq.account_id
       WHERE pq.user_id = ? AND pq.status='posted' AND pq.external_post_id IS NOT NULL AND pq.external_post_id != ''
       ORDER BY COALESCE(pq.posted_at, pq.created_at) DESC LIMIT 30`).bind(t.id).all();
  return e.json({ logs: r || [] });
});
gt.get("/api/admin/logs/posts", m, async (e) => {
  const t = e.get("user"), s = e.req.query("status"), a = e.req.query("account_id"), n = [t.id];
  let i = "WHERE pl.user_id = ?";
  s && s !== "all" && (i += " AND pl.status = ?", n.push(s)), a && (i += " AND pl.account_id = ?", n.push(Number(a)));
  const { results: r } = await e.env.DB.prepare(`SELECT pl.*, xa.account_name AS joined_account_name
       FROM post_logs pl LEFT JOIN x_accounts xa ON pl.account_id = xa.id
       ${i} ORDER BY pl.id DESC LIMIT 300`).bind(...n).all();
  return e.json({ logs: r || [] });
});
gt.get("/api/admin/logs/generations", m, async (e) => {
  const t = e.get("user"), { results: s } = await e.env.DB.prepare(`SELECT gl.*, xa.account_name
       FROM generation_logs gl LEFT JOIN x_accounts xa ON gl.account_id = xa.id
       WHERE gl.user_id = ?
       ORDER BY gl.id DESC LIMIT 200`).bind(t.id).all();
  return e.json({ logs: s || [] });
});
gt.get("/api/admin/logs/health", m, async (e) => {
  const t = e.get("user"), { results: s } = await e.env.DB.prepare(`SELECT he.*, xa.account_name
       FROM account_health_events he LEFT JOIN x_accounts xa ON he.account_id = xa.id
       WHERE xa.user_id = ?
       ORDER BY he.id DESC LIMIT 200`).bind(t.id).all();
  return e.json({ logs: s || [] });
});
var vt = new A();
vt.get("/api/admin/target/presets", m, (e) => e.json({ templates: Fs }));
vt.get("/api/admin/target", m, async (e) => {
  const t = e.get("user"), s = e.req.query("account_id") || "default", a = await e.env.DB.prepare("SELECT * FROM target_templates WHERE account_id=? AND user_id=? LIMIT 1").bind(s, t.id).first();
  return e.json({ target: a });
});
vt.post("/api/admin/target", m, async (e) => {
  const t = e.get("user"), s = await e.req.json(), a = String(s.account_id ?? "default"), n = g(), i = await e.env.DB.prepare("SELECT id FROM target_templates WHERE account_id=? AND user_id=? LIMIT 1").bind(a, t.id).first();
  if (i) return await e.env.DB.prepare(`UPDATE target_templates SET
         template_key=?, label=?, age_range=?, gender=?, genre=?, occupation=?,
         pains=?, desires=?, purchase_triggers=?, problem=?, goal=?, knowledge=?,
         is_default=?, updated_at=?
       WHERE id=?`).bind(s.template_key ?? null, s.label ?? null, s.age_range ?? null, s.gender ?? null, s.genre ?? null, s.occupation ?? null, s.pains ?? null, s.desires ?? null, s.purchase_triggers ?? null, s.problem ?? null, s.goal ?? null, s.knowledge ?? null, s.is_default ? 1 : 0, n, i.id).run(), e.json({ success: true, id: i.id });
  {
    const r = await e.env.DB.prepare(`INSERT INTO target_templates
         (account_id, user_id, template_key, label, age_range, gender, genre, occupation,
          pains, desires, purchase_triggers, problem, goal, knowledge, is_default)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(a, t.id, s.template_key ?? null, s.label ?? null, s.age_range ?? null, s.gender ?? null, s.genre ?? null, s.occupation ?? null, s.pains ?? null, s.desires ?? null, s.purchase_triggers ?? null, s.problem ?? null, s.goal ?? null, s.knowledge ?? null, s.is_default ? 1 : 0).run();
    return e.json({ success: true, id: r.meta.last_row_id });
  }
});
var yt = new A();
yt.get("/api/admin/voice/presets", m, (e) => e.json({ templates: On }));
yt.get("/api/admin/voice", m, async (e) => {
  const t = e.get("user"), s = e.req.query("account_id") || "default", a = await e.env.DB.prepare("SELECT * FROM brand_voice WHERE account_id=? AND user_id=? LIMIT 1").bind(s, t.id).first();
  return e.json({ voice: a });
});
yt.post("/api/admin/voice", m, async (e) => {
  const t = e.get("user"), s = await e.req.json(), a = String(s.account_id ?? "default"), n = g(), i = await e.env.DB.prepare("SELECT id FROM brand_voice WHERE account_id=? AND user_id=? LIMIT 1").bind(a, t.id).first();
  if (i) return await e.env.DB.prepare(`UPDATE brand_voice SET
         voice_key=?, label=?, tone=?, worldview=?, personal_story=?,
         prohibited_words=?, sample_posts=?, is_default=?, updated_at=?
       WHERE id=?`).bind(s.voice_key ?? null, s.label ?? null, s.tone ?? null, s.worldview ?? null, s.personal_story ?? null, s.prohibited_words ?? null, s.sample_posts ?? null, s.is_default ? 1 : 0, n, i.id).run(), e.json({ success: true, id: i.id });
  {
    const r = await e.env.DB.prepare(`INSERT INTO brand_voice
         (account_id, user_id, voice_key, label, tone, worldview, personal_story,
          prohibited_words, sample_posts, is_default)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(a, t.id, s.voice_key ?? null, s.label ?? null, s.tone ?? null, s.worldview ?? null, s.personal_story ?? null, s.prohibited_words ?? null, s.sample_posts ?? null, s.is_default ? 1 : 0).run();
    return e.json({ success: true, id: r.meta.last_row_id });
  }
});
var He = new A();
He.get("/api/admin/api-settings", m, async (e) => {
  const t = e.get("user"), s = await e.env.DB.prepare("SELECT api_key, api_secret, bearer_token FROM x_api_settings WHERE user_id = ? ORDER BY id DESC LIMIT 1").bind(t.id).first(), a = await e.env.DB.prepare("SELECT key, value FROM system_settings WHERE key IN ('openai_api_key','openai_model','telegram_bot_token','telegram_chat_id','x_bearer_token')").all(), n = {};
  for (const l of a.results || []) n[l.key] = l.value;
  const i = s != null && s.api_key ? await lt(s.api_key, e.env.ENCRYPTION_KEY) : "", r = s != null && s.api_secret ? "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" : "", o = n.openai_api_key ? "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" : "", d = n.telegram_bot_token ? "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" : "";
  const l = await ge365xLoadRakutenSettings(e, t.id, false);
  return e.json({ api_key: i, api_secret: r, x_bearer_token_set: !!((s == null ? void 0 : s.bearer_token) || n.x_bearer_token), openai_key: o, openai_model: n.openai_model || "gpt-4o-mini", telegram_token: d, telegram_chat_id: n.telegram_chat_id || "", rakuten_application_url: l.application_url || "", rakuten_app_id: l.rakuten_app_id || "", rakuten_application_id: l.application_id || "", rakuten_affiliate_id: l.affiliate_id || "", rakuten_access_key_set: !!l.has_access_key });
});
He.post("/api/admin/api-settings/x", m, async (e) => {
  const t = e.get("user"), { api_key: s, api_secret: a, bearer_token: bt } = await e.req.json();
  const hasFreshBearer = !!(bt && !bt.includes("\u2022") && bt.trim());
  if (hasFreshBearer) {
    const encBearer = await _e(bt.trim(), e.env.ENCRYPTION_KEY);
    await _t(e, "x_bearer_token", encBearer, "X Bearer Token (AES暗号化)");
    await e.env.DB.prepare("UPDATE x_api_settings SET bearer_token=?, updated_at=datetime('now','+9 hours') WHERE user_id=?").bind(encBearer, t.id).run().catch(() => {
    });
  }
  const newKey = s && !s.includes("\u2022") ? s.trim() : null;
  const newSecret = a && !a.includes("\u2022") ? a.trim() : null;
  if (newKey || newSecret || hasFreshBearer) await e.env.DB.prepare("DELETE FROM system_settings WHERE key='x_api_spend_cap_blocked_until'").run();
  if ((newKey || newSecret) && !hasFreshBearer) {
    await e.env.DB.prepare("DELETE FROM system_settings WHERE key='x_bearer_token'").run();
    await e.env.DB.prepare("UPDATE x_api_settings SET bearer_token=NULL WHERE user_id=?").bind(t.id).run().catch(() => {
    });
  }
  if (!newKey && !newSecret) {
    const ex = await e.env.DB.prepare("SELECT id FROM x_api_settings WHERE user_id = ?").bind(t.id).first();
    if (!ex && hasFreshBearer) {
      const encBearer = await _e(bt.trim(), e.env.ENCRYPTION_KEY);
      await e.env.DB.prepare("INSERT INTO x_api_settings (user_id, api_key, api_secret, bearer_token) VALUES (?, ?, ?, ?)").bind(t.id, "", "", encBearer).run();
      return e.json({ success: true });
    }
    if (!ex) return e.json({ success: false, error: "\u5C11\u306A\u304F\u3068\u3082API Key\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044" }, 400);
    return e.json({ success: true, unchanged: true });
  }
  const encKey = newKey ? await _e(newKey, e.env.ENCRYPTION_KEY) : null;
  const encSec = newSecret ? await _e(newSecret, e.env.ENCRYPTION_KEY) : null;
  const exist = await e.env.DB.prepare("SELECT id FROM x_api_settings WHERE user_id = ?").bind(t.id).first();
  if (exist) {
    if (encKey && encSec) await e.env.DB.prepare("UPDATE x_api_settings SET api_key=?, api_secret=?, updated_at=datetime('now','+9 hours') WHERE user_id=?").bind(encKey, encSec, t.id).run();
    else if (encKey) await e.env.DB.prepare("UPDATE x_api_settings SET api_key=?, updated_at=datetime('now','+9 hours') WHERE user_id=?").bind(encKey, t.id).run();
    else if (encSec) await e.env.DB.prepare("UPDATE x_api_settings SET api_secret=?, updated_at=datetime('now','+9 hours') WHERE user_id=?").bind(encSec, t.id).run();
  } else {
    if (!encKey) return e.json({ success: false, error: "API Key\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044" }, 400);
    await e.env.DB.prepare("INSERT INTO x_api_settings (user_id, api_key, api_secret) VALUES (?, ?, ?)").bind(t.id, encKey, encSec || "").run();
  }
  return e.json({ success: true });
});
He.post("/api/admin/api-settings/openai", m, async (e) => {
  const { openai_key: t, openai_model: s } = await e.req.json();
  if (t && !t.includes("\u2022")) {
    const a = await _e(t.trim(), e.env.ENCRYPTION_KEY);
    await _t(e, "openai_api_key", a, "OpenAI API Key (AES\u6697\u53F7\u5316)");
  }
  return s && await _t(e, "openai_model", s, "OpenAI \u30E2\u30C7\u30EB\u540D"), e.json({ success: true });
});
He.post("/api/admin/api-settings/gemini", m, async (e) => {
  const { gemini_key: t, gemini_model: s } = await e.req.json();
  if (t && !t.includes("\u2022")) {
    const a = await _e(t.trim(), e.env.ENCRYPTION_KEY);
    await _t(e, "gemini_api_key", a, "Gemini API Key (AES\u6697\u53F7\u5316)");
  }
  return s && await _t(e, "gemini_model", s, "Gemini \u30E2\u30C7\u30EB\u540D"), e.json({ success: true });
});
He.post("/api/admin/api-settings/telegram", m, async (e) => {
  const { telegram_token: t, telegram_chat_id: s } = await e.req.json();
  if (t && !t.includes("\u2022")) {
    const a = await _e(t.trim(), e.env.ENCRYPTION_KEY);
    await _t(e, "telegram_bot_token", a, "Telegram Bot Token (AES\u6697\u53F7\u5316)");
  }
  return s && await _t(e, "telegram_chat_id", s, "Telegram Chat ID"), e.json({ success: true });
});
He.post("/api/admin/api-settings/:kind/test", m, async (e) => {
  const t = e.req.param("kind"), s = e.get("user");
  try {
    if (t === "x") {
      const a = await e.env.DB.prepare("SELECT api_key, api_secret FROM x_api_settings WHERE user_id = ? ORDER BY id DESC LIMIT 1").bind(s.id).first();
      if (!(a != null && a.api_key)) return e.json({ success: false, error: "X API Key \u672A\u8A2D\u5B9A" });
      const n = await lt(a.api_key, e.env.ENCRYPTION_KEY);
      return e.json({ success: !!n, message: n ? "X API Keyの保存確認OK。これは投稿権限や課金上限の確認ではありません。" : "\u5FA9\u53F7\u5931\u6557" });
    }
    if (t === "openai") {
      const a = await Tt(e, "openai_api_key");
      if (!a) return e.json({ success: false, error: "OpenAI Key \u672A\u8A2D\u5B9A" });
      const n = await lt(a, e.env.ENCRYPTION_KEY);
      if (!n) return e.json({ success: false, error: "\u5FA9\u53F7\u5931\u6557" });
      const i = await fetch("https://api.openai.com/v1/models", { headers: { Authorization: `Bearer ${n}` } });
      return i.ok ? e.json({ success: true, message: "OpenAI \u63A5\u7D9AOK" }) : e.json({ success: false, error: `OpenAI API ${i.status}` });
    }
    if (t === "gemini") {
      const a = await Tt(e, "gemini_api_key");
      if (!a) return e.json({ success: false, error: "Gemini Key \u672A\u8A2D\u5B9A" });
      const n = await lt(a, e.env.ENCRYPTION_KEY);
      if (!n) return e.json({ success: false, error: "\u5FA9\u53F7\u5931\u6557" });
      const i = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${n}`);
      return i.ok ? e.json({ success: true, message: "Gemini \u63A5\u7D9AOK" }) : e.json({ success: false, error: `Gemini API ${i.status}` });
    }
    if (t === "rakuten") {
      if (!ge365xIsProUser(s)) return e.json({ success: false, error: "pro_required" }, 403);
      const a = await ge365xLoadRakutenSettings(e, s.id, true);
      if (!a.application_url) return e.json({ success: false, error: "アプリケーションURLを保存してください。楽天デベロッパーズの許可されたWebサイトと一致させてください。" }, 400);
      if (!a.application_id || !a.access_key) return e.json({ success: false, error: "アプリケーションIDとアクセスキーを保存してください。アフィリエイトIDは任意です。" }, 400);
      const testUrl = ge365xBuildRakutenUrl("ichiba_search", { keyword: "楽天", genreId: "0", hits: "1" }, a);
      let testResult = await ge365xFetchRakuten(testUrl, a);
      const canUseLegacy = !String(a.application_id || "").includes("-");
      if (!testResult.ok && testResult.status === 403 && canUseLegacy) {
        const legacySettings = { ...a, legacy_api: true };
        const legacyUrl = ge365xBuildRakutenUrl("ichiba_search", { keyword: "楽天", genreId: "0", hits: "1" }, legacySettings);
        testResult = await ge365xFetchRakuten(legacyUrl, legacySettings);
        testResult.legacy = testResult.ok;
      }
      if (!testResult.ok) {
        return e.json({ success: false, error: ge365xRakutenErrorMessage(testResult.json, testResult.status, { ...a, application_url: testResult.referer || a.application_url, attempts: testResult.attempts }) }, 400);
      }
      return e.json({ success: true, message: `楽天API接続OK。${testResult.legacy ? "旧API互換で接続" : `送信元URL: ${testResult.referer || a.application_url} / 認証方式: ${testResult.authMode || "query"}`}` });
    }
    if (t === "telegram") {
      const a = await Tt(e, "telegram_bot_token"), n = await Tt(e, "telegram_chat_id");
      if (!a || !n) return e.json({ success: false, error: "Telegram \u672A\u8A2D\u5B9A" });
      const i = await lt(a, e.env.ENCRYPTION_KEY);
      if (!i) return e.json({ success: false, error: "\u5FA9\u53F7\u5931\u6557" });
      const o = await (await fetch(`https://api.telegram.org/bot${i}/sendMessage`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ chat_id: n, text: "\u2705 GE365x-web: Telegram \u63A5\u7D9A\u30C6\u30B9\u30C8\u6210\u529F" }) })).json();
      return o != null && o.ok ? e.json({ success: true, message: "Telegram \u9001\u4FE1\u6210\u529F" }) : e.json({ success: false, error: (o == null ? void 0 : o.description) || "Telegram \u9001\u4FE1\u5931\u6557" });
    }
    return e.json({ success: false, error: "unknown kind" }, 400);
  } catch (a) {
    return e.json({ success: false, error: (a == null ? void 0 : a.message) || String(a) });
  }
});
He.post("/api/admin/api-settings/x/clear-block", m, async (e) => {
  const t = e.get("user");
  await e.env.DB.prepare("DELETE FROM system_settings WHERE key IN ('x_api_spend_cap_blocked_until','x_bearer_token')").run();
  await e.env.DB.prepare("UPDATE x_api_settings SET bearer_token=NULL WHERE user_id=?").bind(t.id).run().catch(() => {
  });
  return e.json({ success: true, message: "X APIブロック状態と古いBearerキャッシュを解除しました。クレジット反映後か確認するため、バズリサーチを1回だけ再実行してください。" });
});
He.post("/api/admin/api-settings/rakuten", m, async (e) => {
  const t = e.get("user");
  if (!ge365xIsProUser(t)) return e.json({ success: false, error: "pro_required" }, 403);
  const s = await e.req.json();
  let applicationUrl = String(s.application_url || "").trim().replace(/\/+$/, "");
  if (applicationUrl && !/^https?:\/\//i.test(applicationUrl)) applicationUrl = `https://${applicationUrl}`;
  const applicationId = String(s.application_id || "").trim();
  const accessKey = String(s.access_key || "").trim();
  if (!applicationUrl) return e.json({ success: false, error: "アプリケーションURLを入力してください。楽天デベロッパーズの「許可されたWebサイト」と同じURLです。" }, 400);
  if (!applicationId) return e.json({ success: false, error: "アプリケーションIDを入力してください。アプリ名のGE365ではありません。" }, 400);
  if (!accessKey && !await Tt(e, `rakuten:${t.id}:access_key`)) return e.json({ success: false, error: "Access keyを入力してください。" }, 400);
  await _t(e, `rakuten:${t.id}:application_url`, applicationUrl, "Rakuten Application URL");
  await _t(e, `rakuten:${t.id}:rakuten_app_id`, "", "Rakuten App ID");
  await _t(e, `rakuten:${t.id}:application_id`, applicationId, "Rakuten Application ID");
  await _t(e, `rakuten:${t.id}:affiliate_id`, String(s.affiliate_id || "").trim(), "Rakuten Affiliate ID");
  if (accessKey && !accessKey.includes("\u2022")) {
    await _t(e, `rakuten:${t.id}:access_key`, await _e(accessKey, e.env.ENCRYPTION_KEY), "Rakuten Access Key (AES)");
  }
  return e.json({ success: true });
});
He.get("/api/admin/api-settings/rakuten-public", m, async (e) => {
  const t = e.get("user");
  if (!ge365xIsProUser(t)) return e.json({ success: false, error: "pro_required" }, 403);
  const s = await ge365xLoadRakutenSettings(e, t.id, true);
  if (!s.application_id || !s.access_key) return e.json({ success: false, error: "楽天API設定が不足しています" }, 400);
  return e.json({ success: true, application_id: s.application_id, access_key: s.access_key, affiliate_id: s.affiliate_id || "" });
});
He.get("/api/admin/rakuten/search", m, async (e) => {
  const t = e.get("user");
  if (!ge365xIsProUser(t)) return e.json({ success: false, error: "pro_required" }, 403);
  const s = await ge365xLoadRakutenSettings(e, t.id, true);
  if (!s.application_url) return e.json({ success: false, error: "楽天API設定が不足しています。アプリケーションURLを保存してください。" }, 400);
  if (!s.application_id || !s.access_key) return e.json({ success: false, error: "楽天API設定が不足しています" }, 400);
  const a = String(e.req.query("keyword") || "").trim();
  const apiType = String(e.req.query("api_type") || "ichiba_search");
  if (apiType !== "ichiba_ranking" && !a) return e.json({ success: false, error: "keyword_required" }, 400);
  const params = { keyword: a, genreId: String(e.req.query("genreId") || "0"), hits: String(e.req.query("hits") || "10"), sort: String(e.req.query("sort") || "") };
  const n = ge365xBuildRakutenUrl(apiType, params, s);
  let result = await ge365xFetchRakuten(n, s);
  const canUseLegacy = !String(s.application_id || "").includes("-");
  if (!result.ok && result.status === 403 && canUseLegacy) {
    const legacySettings = { ...s, legacy_api: true };
    const legacyUrl = ge365xBuildRakutenUrl(apiType, params, legacySettings);
    result = await ge365xFetchRakuten(legacyUrl, legacySettings);
  }
  const r = result.json || {};
  if (!result.ok) return e.json({ success: false, error: ge365xRakutenErrorMessage(r, result.status, { ...s, application_url: result.referer || s.application_url, attempts: result.attempts }) }, 502);
  const source = Array.isArray(r.Items) ? r.Items : Array.isArray(r.items) ? r.items : Array.isArray(r.hotels) ? r.hotels : [];
  const o = source.map((item) => ge365xNormalizeRakutenItem(item, apiType));
  return e.json({ success: true, items: o });
});
He.post("/api/admin/rakuten/fetch-product", m, async (e) => {
  const t = e.get("user");
  if (!ge365xIsProUser(t)) return e.json({ success: false, error: "pro_required" }, 403);
  const body = await e.req.json().catch(() => ({}));
  const url = String(body.url || "").trim();
  if (!/^https?:\/\/(item|search|books|travel)\.rakuten\.co\.jp\//i.test(url) && !/^https?:\/\/hb\.afl\.rakuten\.co\.jp\//i.test(url)) {
    return e.json({ success: false, error: "楽天の商品URLを入力してください。" }, 400);
  }
  try {
    const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 GE365X Rakuten Helper", accept: "text/html,application/xhtml+xml" }, signal: AbortSignal.timeout(15000) });
    const html = await res.text();
    const pick = (...patterns) => {
      for (const p of patterns) {
        const m2 = html.match(p);
        if (m2 && m2[1]) return m2[1].replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();
      }
      return "";
    };
    const name = pick(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i, /<meta[^>]+name=["']twitter:title["'][^>]+content=["']([^"']+)["']/i, /<title[^>]*>([^<]+)<\/title>/i).replace(/\s*[\-|｜]\s*楽天市場.*$/i, "");
    const image = pick(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i, /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i);
    const price = pick(/"price"\s*:\s*"?([0-9,]+)"?/i, /itemprop=["']price["'][^>]+content=["']([0-9,]+)["']/i, /価格[:：]?\s*([0-9,]+)円/i);
    const shop = pick(/"seller"\s*:\s*\{[^}]*"name"\s*:\s*"([^"]+)"/i, /<meta[^>]+property=["']og:site_name["'][^>]+content=["']([^"']+)["']/i);
    const imgs = [...html.matchAll(/https?:\/\/[^"'\s<>]+?\.(?:jpg|jpeg|png|webp)(?:\?[^"'\s<>]*)?/gi)].map((m2) => m2[0].replace(/&amp;/g, "&")).filter((x) => !/logo|icon|sprite|loading/i.test(x));
    const imageUrls = [...new Set([image, ...imgs].filter(Boolean))].slice(0, 24);
    return e.json({ success: true, name, price: price.replace(/,/g, ""), shop, image_url: imageUrls[0] || "", image_urls: imageUrls });
  } catch (err) {
    return e.json({ success: false, error: `楽天ページ取得失敗: ${(err == null ? void 0 : err.message) || String(err)}` }, 502);
  }
});
He.get("/api/admin/rakuten/scrape-search", m, async (e) => {
  const t = e.get("user");
  if (!ge365xIsProUser(t)) return e.json({ success: false, error: "pro_required" }, 403);
  const keyword = String(e.req.query("keyword") || "").trim();
  const hits = Math.max(1, Math.min(30, Number(e.req.query("hits") || 10)));
  if (!keyword) return e.json({ success: false, error: "キーワードを入力してください" }, 400);
  const settings = await ge365xLoadRakutenSettings(e, t.id, true);
  try {
    const searchUrl = `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(keyword)}/`;
    const res = await fetch(searchUrl, { headers: { "user-agent": "Mozilla/5.0 GE365X Rakuten Search", accept: "text/html,application/xhtml+xml" }, signal: AbortSignal.timeout(15000) });
    const html = await res.text();
    const items = [];
    const seenUrls = /* @__PURE__ */ new Set();
    const addScrapedItem = (cleanUrl, around, fallbackName = keyword) => {
      cleanUrl = String(cleanUrl || "").replace(/\\\//g, "/").replace(/&amp;/g, "&").split("?")[0].replace(/[\\]+$/g, "");
      if (!/^https?:\/\/item\.rakuten\.co\.jp\//i.test(cleanUrl) || seenUrls.has(cleanUrl) || items.length >= hits) return;
      seenUrls.add(cleanUrl);
      around = String(around || "").replace(/\\u003c/gi, "<").replace(/\\u003e/gi, ">").replace(/\\u0026/gi, "&").replace(/\\\//g, "/");
      const name = (around.match(/"itemName"\s*:\s*"([^"]{4,220})"/i)?.[1] || around.match(/"name"\s*:\s*"([^"]{4,220})"/i)?.[1] || around.match(/title=["']([^"']{4,220})["']/i)?.[1] || around.match(/alt=["']([^"']{4,220})["']/i)?.[1] || fallbackName).replace(/&amp;/g, "&").trim();
      const imgs = [...around.matchAll(/https?:\/\/(?:thumbnail\.image\.rakuten\.co\.jp|image\.rakuten\.co\.jp|tshop\.rakuten\.co\.jp|shop\.rakuten\.co\.jp|[^"'\\\s<>]+)[^"'\\\s<>]*?\.(?:jpg|jpeg|png|webp)(?:\?[^"'\\\s<>]*)?/ig)].map((m3) => m3[0].replace(/&amp;/g, "&")).filter((x) => !/logo|icon|sprite|loading|noimage/i.test(x));
      const uniqImgs = [...new Set(imgs)].slice(0, 16);
      const price = (around.match(/([0-9,]{2,})\s*円/)?.[1] || around.match(/"itemPrice"\s*:\s*([0-9]+)/i)?.[1] || "").replace(/,/g, "");
      const affUrl = settings.affiliate_id ? `https://hb.afl.rakuten.co.jp/hgc/${encodeURIComponent(settings.affiliate_id)}/?pc=${encodeURIComponent(cleanUrl)}&m=${encodeURIComponent(cleanUrl)}` : cleanUrl;
      items.push({ api_type: "rakuten_search_page", item_code: `scrape-${items.length + 1}`, item_name: name, item_price: price, shop_name: "", item_url: cleanUrl, affiliate_url: affUrl, has_affiliate_url: !!settings.affiliate_id, image_url: uniqImgs[0] || "", image_urls: uniqImgs, review_average: "", review_count: 0 });
    };
    const addStructuredItem = (product) => {
      if (!product || items.length >= hits) return;
      const cleanUrl = String(product.url || "").replace(/&amp;/g, "&").split("?")[0];
      if (!/^https?:\/\/item\.rakuten\.co\.jp\//i.test(cleanUrl) || seenUrls.has(cleanUrl)) return;
      seenUrls.add(cleanUrl);
      const imgs = Array.isArray(product.image) ? product.image : product.image ? [product.image] : [];
      const uniqImgs = [...new Set(imgs.map((x) => String(x || "").replace(/&amp;/g, "&")).filter(Boolean))].slice(0, 16);
      const offers = product.offers || {};
      const rating = product.aggregateRating || {};
      const affUrl = settings.affiliate_id ? `https://hb.afl.rakuten.co.jp/hgc/${encodeURIComponent(settings.affiliate_id)}/?pc=${encodeURIComponent(cleanUrl)}&m=${encodeURIComponent(cleanUrl)}` : cleanUrl;
      items.push({
        api_type: "rakuten_search_page",
        item_code: `scrape-${items.length + 1}`,
        item_name: String(product.name || keyword).replace(/&amp;/g, "&").trim(),
        item_price: String(offers.price || ""),
        shop_name: "",
        item_url: cleanUrl,
        affiliate_url: affUrl,
        has_affiliate_url: !!settings.affiliate_id,
        image_url: uniqImgs[0] || "",
        image_urls: uniqImgs,
        review_average: String(rating.ratingValue || ""),
        review_count: Number(rating.reviewCount || 0)
      });
    };
    const carouselMatch = html.match(/"structuredDataCarousel"\s*:\s*"((?:\\.|[^"\\])*)"/);
    if (carouselMatch && carouselMatch[1]) {
      try {
        const decoded = JSON.parse(`"${carouselMatch[1]}"`);
        const data = JSON.parse(decoded);
        const list = Array.isArray(data.itemListElement) ? data.itemListElement : [];
        for (const entry of list) addStructuredItem(entry && entry.item);
      } catch {
      }
    }
    const blocks = html.split(/(?:dui-card|searchresultitem|searchresultitemWrapper|item\??)/i);
    const sourceBlocks = blocks.length > 5 ? blocks : html.split(/<a\s+/i);
    for (const block of sourceBlocks) {
      if (items.length >= hits) break;
      const urlMatch = block.match(/https?:\/\/item\.rakuten\.co\.jp\/[^"'\\\s<>]+/i) || block.match(/href=["'](\/[^"']*\/[^"']*)["']/i);
      let itemUrl = urlMatch ? urlMatch[0].replace(/^href=["']/, "").replace(/["']$/, "") : "";
      if (itemUrl.startsWith("/")) itemUrl = `https://item.rakuten.co.jp${itemUrl}`;
      if (!/^https?:\/\/item\.rakuten\.co\.jp\//i.test(itemUrl)) continue;
      const cleanUrl = itemUrl.split("?")[0];
      addScrapedItem(cleanUrl, block, keyword);
    }
    if (items.length < hits) {
      const allUrlRe = /https?:\\?\/\\?\/item\.rakuten\.co\.jp\\?\/[^"'\\\s<>]+/ig;
      let mAll;
      while ((mAll = allUrlRe.exec(html)) && items.length < hits) {
        const around = html.slice(Math.max(0, mAll.index - 3000), Math.min(html.length, mAll.index + 3000));
        addScrapedItem(mAll[0], around, keyword);
      }
    }
    if (!items.length) {
      const urlRe = /https?:\\?\/\\?\/item\.rakuten\.co\.jp\\?\/[^"'\\\s<>]+/ig;
      let m2;
      while ((m2 = urlRe.exec(html)) && items.length < hits) {
        let raw = m2[0].replace(/\\\//g, "/").replace(/&amp;/g, "&");
        let cleanUrl = raw.split("?")[0].replace(/[\\]+$/g, "");
        const around = html.slice(Math.max(0, m2.index - 2500), Math.min(html.length, m2.index + 2500)).replace(/\\u003c/gi, "<").replace(/\\u003e/gi, ">").replace(/\\u0026/gi, "&").replace(/\\\//g, "/");
        addScrapedItem(cleanUrl, around, keyword);
      }
    }
    if (!items.length) return e.json({ success: false, error: "楽天検索ページから商品候補を取得できませんでした" }, 502);
    return e.json({ success: true, items });
  } catch (err) {
    return e.json({ success: false, error: `楽天検索取得失敗: ${(err == null ? void 0 : err.message) || String(err)}` }, 502);
  }
});
He.post("/api/admin/shorten-url", m, async (e) => {
  try {
    const body = await e.req.json();
    const rawUrl = String(body.url || "").trim();
    const parsed = new URL(rawUrl);
    if (!/^https?:$/i.test(parsed.protocol)) return e.json({ success: false, error: "URL形式が不正です" }, 400);
    const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(rawUrl)}`);
    const shortUrl = (await res.text()).trim();
    if (!res.ok || !/^https?:\/\/tinyurl\.com\//i.test(shortUrl)) {
      return e.json({ success: false, error: "短縮URL化できませんでした。元URLをそのまま使ってください。" }, 502);
    }
    return e.json({ success: true, short_url: shortUrl, original_url: rawUrl });
  } catch {
    return e.json({ success: false, error: "短縮URL化できませんでした。元URLをそのまま使ってください。" }, 502);
  }
});
He.post("/api/admin/rakuten/draft", m, async (e) => {
  const t = e.get("user");
  if (!ge365xIsProUser(t)) return e.json({ success: false, error: "pro_required" }, 403);
  const s = await e.req.json(), a = s.item || {}, n = String(s.theme || a.item_name || "おすすめ商品").trim(), postMode = String(s.post_mode || "body");
  let i = "";
  try {
    const enc = await Tt(e, "openai_api_key"), key = enc ? await lt(enc, e.env.ENCRYPTION_KEY) : "";
    if (key) {
      i = await Hs(key, `楽天アフィリエイト投稿: ${n}`, `${a.item_name || ""}\n価格:${a.item_price || ""}\nレビュー:${a.review_average || ""}\nリンク:${a.affiliate_url || a.item_url || ""}`, null, null, postMode === "simple" ? "simple" : "body");
    }
  } catch {
  }
  if (!i) i = ge365xRakutenFallbackDraft(a, n, postMode);
  return e.json({ success: true, draft: i, image_url: a.image_url || "" });
});
He.post("/api/admin/buzz-research/analyze", m, async (e) => {
  const t = e.get("user");
  if (!ge365xIsProUser(t)) return e.json({ success: false, error: "pro_required" }, 403);
  const s = await e.req.json(), a = String(s.theme || "バズ分析").trim(), n = Array.isArray(s.posts) ? s.posts : [];
  const i = n.map((r) => {
    const o = Number(r.impressions || 0), d = Number(r.likes || 0), l = Number(r.shares || 0), c = o > 0 ? ((d + l * 2) / o * 100) : 0;
    return { text: String(r.text || "").trim(), impressions: o, likes: d, shares: l, engagement_rate: Number(c.toFixed(2)), buzz_score: Math.round(o * 0.01 + d * 2 + l * 5 + c * 20) };
  }).filter((r) => r.text).sort((r, o) => o.buzz_score - r.buzz_score).slice(0, 10);
  let r = "";
  try {
    const enc = await Tt(e, "openai_api_key"), key = enc ? await lt(enc, e.env.ENCRYPTION_KEY) : "";
    if (key) r = await Hs(key, `X投稿のバズ分析結果を作成: ${a}`, i.map((o) => `本文:${o.text}\nアクセス:${o.impressions}\nいいね:${o.likes}\nシェア:${o.shares}\n反応率:${o.engagement_rate}%\nバズスコア:${o.buzz_score}`).join("\n\n"), null, null, "body");
  } catch {
  }
  if (!r) r = ge365xBuzzFallbackDraft(a, i);
  return e.json({ success: true, items: i, analysis: r });
});
He.get("/api/admin/buzz-research/test-mode", m, async (e) => {
  const t = e.get("user");
  if (!ge365xIsProUser(t)) return e.json({ success: false, error: "pro_required" }, 403);
  const theme = String(e.req.query("theme") || "テスト").trim();
  const rows = [
    { id: "test-1", text: `${theme}で保存数が伸びた投稿。冒頭で悩みを断言し、最後に比較表で行動を促す。`, username: "buzz_sample_1", name: "Buzz Sample 1", likes: 4300, retweets: 980, replies: 210, quotes: 120, impressions: 420000, age_minutes: 180 },
    { id: "test-2", text: `${theme}の失敗例を3つに絞って、今日から避けるポイントを短くまとめた投稿。`, username: "buzz_sample_2", name: "Buzz Sample 2", likes: 1800, retweets: 420, replies: 96, quotes: 60, impressions: 190000, age_minutes: 240 },
    { id: "test-3", text: `${theme}を使う前と後の違いを数字で見せた投稿。意外性のある1行目で反応を取る。`, username: "buzz_sample_3", name: "Buzz Sample 3", likes: 890, retweets: 130, replies: 34, quotes: 20, impressions: 98000, age_minutes: 90 }
  ];
  const posts = rows.map((p) => ({ ...p, buzz_score: Math.round(p.impressions * 0.01 + p.likes * 2 + p.retweets * 6 + p.replies), impressions_is_estimated: false, url: `https://x.com/${p.username}/status/${p.id.replace("test-", "1000")}` })).filter((p) => p.impressions >= 100000).sort((a, b) => b.buzz_score - a.buzz_score);
  const accounts = posts.map((p) => ({ username: p.username, name: p.name, followers: Math.round(p.impressions / 8), post_count: 1, likes: p.likes, retweets: p.retweets, replies: p.replies, buzz_score: p.buzz_score }));
  return e.json({ success: true, test_mode: true, manual: false, source: "test_mode", theme, total_fetched: rows.length, posts, accounts, analysis: "X APIを使わず、固定データで抽出・スコア化・表示を確認しました。" });
});
He.get("/api/admin/buzz-research/search", m, async (e) => {
  const t = e.get("user");
  if (!ge365xIsProUser(t)) return e.json({ success: false, error: "pro_required" }, 403);
  const theme = String(e.req.query("theme") || "").trim();
  const limit = Math.max(10, Math.min(100, Number(e.req.query("limit") || 30)));
  const fetchLimit = 100;
  const extra = String(e.req.query("extra") || "").trim();
  const minImpressions = Math.max(0, Number(e.req.query("min_impressions") || 100000));
  const minLikes = Math.max(0, Number(e.req.query("min_likes") || 0));
  const minRetweets = Math.max(0, Number(e.req.query("min_retweets") || 0));
  const minAgeMinutes = Math.max(0, Number(e.req.query("min_age_minutes") || 0));
  if (!theme) return e.json({ success: false, error: "テーマを入力してください" }, 400);
  try {
    const api = await e.env.DB.prepare("SELECT api_key, api_secret, bearer_token, updated_at FROM x_api_settings WHERE user_id = ? ORDER BY id DESC LIMIT 1").bind(t.id).first();
    const blockRow = await e.env.DB.prepare("SELECT value, updated_at FROM system_settings WHERE key='x_api_spend_cap_blocked_until'").first();
    const blockedUntil = blockRow == null ? void 0 : blockRow.value;
    const apiUpdatedMs = Date.parse((api == null ? void 0 : api.updated_at) || "") || 0;
    const blockUpdatedMs = Date.parse((blockRow == null ? void 0 : blockRow.updated_at) || "") || 0;
    if (blockedUntil && Date.parse(blockedUntil) > Date.now() && apiUpdatedMs <= blockUpdatedMs) return ge365xBuzzSearchFallbackJson(e, theme, `X APIの課金上限に到達しています。${blockedUntil} までX API検索を停止しています。X Developer PortalでBilling / Spend capを上げた場合は、API設定画面でブロック解除を実行してください。`);
    let bearer = "";
    if (api != null && api.bearer_token) {
      try {
        bearer = await lt(api.bearer_token, e.env.ENCRYPTION_KEY);
      } catch {
      }
    }
    const savedBearerRow = await e.env.DB.prepare("SELECT value, updated_at FROM system_settings WHERE key='x_bearer_token'").first();
    if (!bearer && savedBearerRow && (!apiUpdatedMs || (Date.parse(savedBearerRow.updated_at || "") || 0) >= apiUpdatedMs)) {
      try {
        bearer = await lt(savedBearerRow.value, e.env.ENCRYPTION_KEY);
      } catch {
      }
    }
    if (!bearer) {
      const userBearer = await Tt(e, "x_oauth2_user_token");
      if (userBearer) {
        try {
          bearer = await lt(userBearer, e.env.ENCRYPTION_KEY);
        } catch {
        }
      }
    }
    let oauth1SearchCreds = null, bearerErrors = "";
    if (!bearer) {
      if (!(api != null && api.api_key) || !(api != null && api.api_secret)) return ge365xBuzzSearchFallbackJson(e, theme, "X API設定が未設定です");
      const key = await lt(api.api_key, e.env.ENCRYPTION_KEY);
      const secret = await lt(api.api_secret, e.env.ENCRYPTION_KEY);
      const basicVariants = [
        btoa(`${encodeURIComponent(key)}:${encodeURIComponent(secret)}`),
        btoa(`${key}:${secret}`)
      ];
      const tokenUrls = ["https://api.twitter.com/oauth2/token", "https://api.x.com/oauth2/token"];
      let tokenRes = null, tokenJson = null, tokenErrors = [];
      for (const tokenUrl of tokenUrls) {
        for (const basic of basicVariants) {
          tokenRes = await fetch(tokenUrl, {
            method: "POST",
            headers: { authorization: `Basic ${basic}`, "content-type": "application/x-www-form-urlencoded;charset=UTF-8" },
            body: "grant_type=client_credentials",
            signal: AbortSignal.timeout(15000)
          });
          tokenJson = await tokenRes.json().catch(() => ({}));
          if (tokenRes.ok) break;
          tokenErrors.push(`${tokenUrl.replace("https://", "")}:${tokenRes.status}`);
        }
        if (tokenRes && tokenRes.ok) break;
      }
      if (!tokenRes || !tokenRes.ok) {
        bearerErrors = tokenErrors.join(" / ") || "unknown";
        const acct = await e.env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_active=1 ORDER BY is_current DESC, id DESC LIMIT 1").bind(t.id).first();
        if (acct) {
          try {
            oauth1SearchCreds = await Ft(e.env, acct, { apiKey: key, apiSecret: secret });
          } catch {
          }
        }
      } else {
        bearer = tokenJson.access_token || "";
        if (bearer) await e.env.DB.prepare("UPDATE x_api_settings SET bearer_token=?, updated_at=datetime('now','+9 hours') WHERE user_id=?").bind(await _e(bearer, e.env.ENCRYPTION_KEY), t.id).run().catch(() => {
        });
      }
      if (!bearer && !oauth1SearchCreds) return ge365xBuzzSearchFallbackJson(e, theme, `X API Bearer取得失敗 ${bearerErrors || "Bearer tokenを取得できませんでした"}`);
    }
    const extraWords = extra ? extra.split(/\s+|\n+/).filter(Boolean).slice(0, 5).join(" OR ") : "";
    const q = `${theme}${extraWords ? ` (${extraWords})` : ""} -is:retweet lang:ja`;
    const url = new URL("https://api.twitter.com/2/tweets/search/recent");
    url.searchParams.set("query", q);
    url.searchParams.set("max_results", String(fetchLimit));
    url.searchParams.set("tweet.fields", "public_metrics,author_id,created_at");
    url.searchParams.set("expansions", "author_id");
    url.searchParams.set("user.fields", "username,name,public_metrics,verified");
    let sj = {};
    if (bearer) {
      const sr = await fetch(url.toString(), { headers: { authorization: `Bearer ${bearer}` }, signal: AbortSignal.timeout(20000) });
      sj = await sr.json().catch(() => ({}));
      if (!sr.ok) return ge365xBuzzSearchFallbackJson(e, theme, `X検索API ${sr.status}: ${sj.detail || sj.title || sj.error || "検索できませんでした"}`);
    } else if (oauth1SearchCreds) {
      try {
        sj = await $t("GET", `/tweets/search/recent?${url.searchParams.toString()}`, void 0, oauth1SearchCreds);
      } catch (searchErr) {
        return ge365xBuzzSearchFallbackJson(e, theme, `X API検索失敗: ${(searchErr == null ? void 0 : searchErr.message) || String(searchErr)}${bearerErrors ? ` / Bearer取得失敗 ${bearerErrors}` : ""}`);
      }
    }
    const users = {};
    for (const u of (sj.includes && sj.includes.users || [])) users[u.id] = u;
    const nowMs = Date.now();
    const allPosts = (sj.data || []).map((p) => {
      const pm = p.public_metrics || {};
      const u = users[p.author_id] || {};
      const likes = Number(pm.like_count || 0);
      const retweets = Number(pm.retweet_count || 0);
      const replies = Number(pm.reply_count || 0);
      const quotes = Number(pm.quote_count || 0);
      const rawImpressions = Number(pm.impression_count || 0);
      const estimatedImpressions = rawImpressions || Math.round(likes * 120 + retweets * 800 + quotes * 700 + replies * 250 + Number((u.public_metrics || {}).followers_count || 0) * 0.03);
      const impressions = estimatedImpressions;
      const ageMinutes = p.created_at ? Math.max(0, Math.floor((nowMs - Date.parse(p.created_at)) / 6e4)) : 0;
      const score = Math.round(likes * 2 + retweets * 6 + quotes * 5 + replies * 3 + impressions * 0.01 + Math.min(ageMinutes, 1440) * 0.1);
      return { id: p.id, text: p.text || "", author_id: p.author_id, username: u.username || "", name: u.name || "", followers: Number((u.public_metrics || {}).followers_count || 0), likes, retweets, replies, quotes, impressions, raw_impressions: rawImpressions, estimated_impressions: estimatedImpressions, impressions_is_estimated: rawImpressions <= 0, age_minutes: ageMinutes, buzz_score: score, url: u.username ? `https://x.com/${u.username}/status/${p.id}` : `https://x.com/i/web/status/${p.id}` };
    }).sort((a, b) => b.buzz_score - a.buzz_score);
    let relaxed = false;
    let posts = allPosts.filter((p) => (!minLikes || p.likes >= minLikes) && (!minRetweets || p.retweets >= minRetweets) && (!minAgeMinutes || p.age_minutes >= minAgeMinutes) && (!minImpressions || p.impressions >= minImpressions)).slice(0, limit);
    const hasStrictCondition = minImpressions > 0 || minLikes > 0 || minRetweets > 0 || minAgeMinutes > 0;
    if (allPosts.length && posts.length === 0 && !hasStrictCondition) {
      relaxed = true;
      posts = allPosts.slice(0, limit);
    }
    const map = {};
    for (const p of posts) {
      const k = p.author_id || p.username || "unknown";
      if (!map[k]) map[k] = { author_id: p.author_id, username: p.username, name: p.name, followers: p.followers, post_count: 0, likes: 0, retweets: 0, replies: 0, quotes: 0, impressions: 0, buzz_score: 0, top_post_url: p.url, top_post_text: p.text };
      map[k].post_count++;
      map[k].likes += p.likes;
      map[k].retweets += p.retweets;
      map[k].replies += p.replies;
      map[k].quotes += p.quotes;
      map[k].impressions += p.impressions;
      map[k].buzz_score += p.buzz_score;
      if (p.buzz_score > (map[k].top_score || 0)) {
        map[k].top_score = p.buzz_score;
        map[k].top_post_url = p.url;
        map[k].top_post_text = p.text;
      }
    }
    const accounts = Object.values(map).sort((a, b) => b.buzz_score - a.buzz_score).slice(0, 10);
    const analysis = posts.length
      ? `X API実取得: 条件に合うバズ投稿を${posts.length}件取得しました。`
      : `X API接続OK。最低推定閲覧数${minImpressions.toLocaleString()}以上の条件に合う投稿はありません。条件を下げる場合は「条件を指定してバズ投稿を探す」で変更してください。`;
    return e.json({ success: true, source: "x_api", theme, query: q, accounts, posts: posts.slice(0, 20), relaxed, total_fetched: allPosts.length, analysis });
  } catch (err) {
    return ge365xBuzzSearchFallbackJson(e, theme, `X検索失敗: ${(err == null ? void 0 : err.message) || String(err)}`);
  }
});
async function _t(e, t, s, a) {
  await e.env.DB.prepare(`INSERT INTO system_settings (key, value, description, updated_at)
     VALUES (?, ?, ?, datetime('now','+9 hours'))
     ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=datetime('now','+9 hours')`).bind(t, s, a).run();
}
__name(_t, "_t");
async function Tt(e, t) {
  const s = await e.env.DB.prepare("SELECT value FROM system_settings WHERE key = ?").bind(t).first();
  return (s == null ? void 0 : s.value) || null;
}
__name(Tt, "Tt");
async function lt(e, t) {
  try {
    return await At(e, t);
  } catch {
    return "";
  }
}
__name(lt, "lt");
async function ge365xLoadRakutenSettings(e, t, s = false) {
  const u = await Tt(e, `rakuten:${t}:application_url`) || "";
  const a = await Tt(e, `rakuten:${t}:rakuten_app_id`) || "";
  const n = await Tt(e, `rakuten:${t}:application_id`) || "";
  const i = await Tt(e, `rakuten:${t}:affiliate_id`) || "";
  const r = await Tt(e, `rakuten:${t}:access_key`) || "";
  const o = r ? await lt(r, e.env.ENCRYPTION_KEY) : "";
  return s ? { application_url: u, rakuten_app_id: a, application_id: n, access_key: o, affiliate_id: i, has_access_key: !!o } : { application_url: u, rakuten_app_id: a, application_id: n, affiliate_id: i, has_access_key: !!o };
}
__name(ge365xLoadRakutenSettings, "ge365xLoadRakutenSettings");
function ge365xRakutenHeaders(settings) {
  const headers = { accept: "application/json" };
  if (settings.access_key) headers["accessKey"] = settings.access_key;
  if (settings.application_url) {
    headers["Referer"] = settings.application_url;
  }
  return headers;
}
__name(ge365xRakutenHeaders, "ge365xRakutenHeaders");
function ge365xRakutenRefererVariants(settings = {}) {
  const raw = String(settings.application_url || "").trim();
  const base = raw.replace(/\/+$/, "");
  const list = [];
  if (base) {
    list.push(base);
  }
  return [...new Set(list.filter(Boolean))];
}
__name(ge365xRakutenRefererVariants, "ge365xRakutenRefererVariants");
async function ge365xFetchRakuten(url, settings = {}) {
  const variants = ge365xRakutenRefererVariants(settings);
  const attempts = variants.length ? variants : [""];
  let last = { ok: false, status: 0, json: {}, text: "", referer: "", attempts: [] };
  const attemptLogs = [];
  const authModes = ["query", "header", "both", "none"];
  for (const authMode of authModes) for (const referer of attempts) {
    const headers = { accept: "application/json" };
    const reqUrl = new URL(url.toString());
    if (settings.access_key && (authMode === "query" || authMode === "both")) reqUrl.searchParams.set("accessKey", settings.access_key);
    else reqUrl.searchParams.delete("accessKey");
    if (settings.access_key && (authMode === "header" || authMode === "both")) headers["accessKey"] = settings.access_key;
    if (referer) headers["Referer"] = referer;
    const res = await fetch(reqUrl.toString(), { headers });
    const text = await res.text();
    let json = {};
    try {
      json = text ? JSON.parse(text) : {};
    } catch {
      json = { error_description: text };
    }
    attemptLogs.push({ referer: `${referer || "(なし)"}:${authMode}`, status: res.status, error: String(json.error_description || json.error || "").slice(0, 80) });
    last = { ok: res.ok && !json.error && !json.error_description, status: res.status, json, text, referer, attempts: attemptLogs, authMode };
    if (res.status === 429) return last;
    if (last.ok) return last;
  }
  return last;
}
__name(ge365xFetchRakuten, "ge365xFetchRakuten");
function ge365xBuildRakutenUrl(apiType, params, settings) {
  const legacy = !!settings.legacy_api;
  const endpoints = legacy ? {
    ichiba_search: "https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20170706",
    ichiba_ranking: "https://openapi.rakuten.co.jp/ichibaranking/api/IchibaItem/Ranking/20220601",
    books_total: "https://openapi.rakuten.co.jp/services/api/BooksTotal/Search/20170404",
    travel_simple: "https://openapi.rakuten.co.jp/engine/api/Travel/SimpleHotelSearch/20170426"
  } : {
    ichiba_search: "https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401",
    ichiba_ranking: "https://openapi.rakuten.co.jp/ichibaranking/api/IchibaItem/Ranking/20220601",
    books_total: "https://openapi.rakuten.co.jp/services/api/BooksTotal/Search/20170404",
    travel_simple: "https://openapi.rakuten.co.jp/engine/api/Travel/SimpleHotelSearch/20170426"
  };
  const url = new URL(endpoints[apiType] || endpoints.ichiba_search);
  url.searchParams.set("format", "json");
  url.searchParams.set("formatVersion", "2");
  url.searchParams.set("applicationId", settings.application_id);
  if (!legacy && settings.access_key) url.searchParams.set("accessKey", settings.access_key);
  if (params.keyword) url.searchParams.set("keyword", params.keyword);
  const genre = params.genreId || "0";
  if (apiType === "ichiba_search" || apiType === "ichiba_ranking") url.searchParams.set("genreId", genre);
  if (apiType !== "ichiba_ranking") url.searchParams.set("hits", params.hits || "10");
  if (apiType === "ichiba_search" && params.sort) url.searchParams.set("sort", params.sort);
  if (settings.affiliate_id) url.searchParams.set("affiliateId", settings.affiliate_id);
  return url;
}
__name(ge365xBuildRakutenUrl, "ge365xBuildRakutenUrl");
function ge365xRakutenErrorMessage(e, status, settings = {}) {
  const raw = String(e?.error_description || e?.error || e?.message || `Rakuten API ${status}`);
  if (status === 429) return "楽天API側の短時間制限です。GE365Xからは1回だけ送信する方式に修正済みです。5分待ってから楽天検索を1回だけ試してください。";
  const attempts = Array.isArray(settings.attempts) && settings.attempts.length ? ` 試行結果: ${settings.attempts.map((a) => `${a.referer}=>${a.status}${a.error ? `(${a.error})` : ""}`).join(" / ")}` : "";
  const appHint = settings.application_id ? ` 保存中Application ID: ${String(settings.application_id).slice(0, 4)}... / 長さ${String(settings.application_id).length}。` : "";
  if (status === 400) return `Rakuten API 400: ${raw}。${appHint}Access keyを空欄のまま保存すると古いキーが残ります。楽天画面のAccess keyをもう一度貼って保存してください。${attempts}`;
  if (status === 403) return `Rakuten API 403: ${raw}。${appHint}楽天デベロッパーズ画面のApplication IDと先頭4文字が同じか確認してください。楽天画面のIDが ec65... なら、現在保存中のIDとは違います。Access keyも同じアプリのものを保存してください。${attempts}`;
  if (/applicationId/i.test(raw)) return "アプリケーションIDが未入力または不正です。楽天Web ServiceのApplication IDをAPI設定に保存してください。アフィリエイトIDは任意です。";
  if (/accessKey/i.test(raw)) return "アクセスキーが未入力または不正です。楽天Web ServiceのAccess keyをAPI設定に保存してください。";
  if (/affiliateId/i.test(raw)) return "アフィリエイトIDが不正です。空欄でも検索可能です。";
  return raw;
}
__name(ge365xRakutenErrorMessage, "ge365xRakutenErrorMessage");
function ge365xNormalizeRakutenItem(e, apiType = "ichiba_search") {
  const t = e?.Item || e?.item || e?.Hotel?.[0]?.hotelBasicInfo || e?.hotel?.[0]?.hotelBasicInfo || e || {};
  const imgs = [
    ...(Array.isArray(t.mediumImageUrls) ? t.mediumImageUrls.map((x) => x.imageUrl || x) : []),
    ...(Array.isArray(t.smallImageUrls) ? t.smallImageUrls.map((x) => x.imageUrl || x) : []),
    t.largeImageUrl,
    t.mediumImageUrl,
    t.hotelImageUrl
  ].filter(Boolean);
  const s = imgs[0] || "";
  const name = t.itemName || t.title || t.hotelName || "";
  const price = t.itemPrice || t.salesPrice || t.hotelMinCharge || 0;
  const url = t.itemUrl || t.affiliateUrl || t.reviewUrl || t.hotelInformationUrl || t.planListUrl || "";
  return { api_type: apiType, item_code: t.itemCode || t.isbn || t.hotelNo || "", item_name: name, item_price: price, shop_name: t.shopName || t.publisherName || t.hotelSpecial || "", item_url: url, affiliate_url: t.affiliateUrl || url, has_affiliate_url: !!t.affiliateUrl, image_url: s, image_urls: [...new Set(imgs)], review_average: t.reviewAverage || t.reviewAverageValue || "", review_count: t.reviewCount || 0 };
}
__name(ge365xNormalizeRakutenItem, "ge365xNormalizeRakutenItem");
function ge365xRakutenFallbackDraft(e, t, postMode = "body") {
  const s = e.affiliate_url || e.item_url || "";
  if (postMode === "simple") {
    return simpleTwoLineText(`${e.item_name || t || "楽天おすすめ商品"}\n${t || "気になる方は確認"}`);
  }
  return [
    `${t}で気になる商品を見つけました。`,
    "",
    e.item_name || "",
    e.shop_name ? `ショップ: ${e.shop_name}` : "",
    e.item_price ? `価格目安: ${e.item_price}円` : "",
    e.review_average ? `レビュー: ${e.review_average} / ${e.review_count || 0}件` : "",
    "",
    "選ぶ時は、価格だけでなくレビュー数と用途が合っているかを見るのがおすすめです。",
    s ? `詳細はこちら: ${s}` : "",
    "",
    "#PR #楽天アフィリエイト"
  ].filter(Boolean).join("\n");
}
__name(ge365xRakutenFallbackDraft, "ge365xRakutenFallbackDraft");
function ge365xBuzzFallbackDraft(e, t) {
  const s = t[0]?.text || "伸びた投稿の共通点を使う";
  return [
    `${e || "X投稿"}の分析結果です。`,
    "",
    `対象投稿: ${s}`,
    `バズスコア: ${t[0]?.buzz_score || 0}`,
    `反応率: ${t[0]?.engagement_rate || 0}%`,
    "",
    "アクセス数に対して、いいねとシェアがどれだけ発生しているかを重視しています。",
    "シェア数が高い投稿は、読者が他人に見せたい理由が含まれている可能性があります。",
    "次回は、冒頭で悩みを明確にし、数字・具体例・すぐ試せる行動を入れると伸ばしやすくなります。"
  ].join("\n");
}
__name(ge365xBuzzFallbackDraft, "ge365xBuzzFallbackDraft");
function ge365xBuzzAccountFallback(e, t, s) {
  const top = t[0];
  if (!top) return `${e || "テーマ"}でバズっているアカウント候補はまだ取得できませんでした。キーワードを変えるか、時間を置いて再検索してください。`;
  return [
    `${e || "テーマ"}で伸びているアカウント候補です。`,
    "",
    `最優先で見る候補: @${top.username || "-"}`,
    `バズスコア: ${top.buzz_score || 0}`,
    `対象投稿数: ${top.post_count || 0}`,
    `いいね合計: ${top.likes || 0}`,
    `リポスト合計: ${top.retweets || 0}`,
    "",
    "見るべきポイント:",
    "1. 冒頭で何を約束しているか",
    "2. 画像・数字・比較・体験談のどれで反応を取っているか",
    "3. コメントやリポストされる理由があるか",
    "",
    "次の投稿生成では、上位投稿の切り口だけを参考にし、文章はそのままコピーせず自分のテーマに置き換えてください。"
  ].join("\n");
}
__name(ge365xBuzzAccountFallback, "ge365xBuzzAccountFallback");
async function ge365xBuzzSearchFallbackJson(e, theme, reason) {
  const blocked = /spend cap|billing cycle/i.test(String(reason || ""));
  if (blocked) {
    const m = String(reason || "").match(/next cycle begins on\s+([0-9]{4}-[0-9]{2}-[0-9]{2})/i);
    if (m && e && e.env && e.env.DB) await e.env.DB.prepare(`INSERT INTO system_settings (key, value, description, updated_at)
       VALUES ('x_api_spend_cap_blocked_until', ?, 'X API spend cap block cache', datetime('now','+9 hours'))
       ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=datetime('now','+9 hours')`).bind(`${m[1]}T00:00:00Z`).run().catch(() => {});
    return e.json({ success: true, fallback: true, x_api_blocked: true, source: "x_api_blocked", theme, accounts: [], posts: [], analysis: reason });
  }
  const q = encodeURIComponent(`${theme} min_faves:100 -filter:replies`);
  const url = `https://x.com/search?q=${q}&src=typed_query&f=live`;
  const posts = [
    { text: `${theme} のバズ投稿をX検索で確認`, username: "X検索", name: "X Search", likes: 0, retweets: 0, replies: 0, impressions: 0, buzz_score: 0, url }
  ];
  const accounts = [];
  return e.json({ success: true, fallback: true, source: "fallback_link", theme, accounts, posts, analysis: `${reason}\n\nX APIで実データを取得できていません。候補アカウントは表示せず、確認用のX検索リンクだけを表示しています。\nBearer TokenをAPI設定に保存すると、自動でバズアカウント候補を取得できます。` });
}
__name(ge365xBuzzSearchFallbackJson, "ge365xBuzzSearchFallbackJson");
var B = new A();
function rs(e) {
  if (e == null) return "";
  const t = String(e);
  return t.includes(",") || t.includes('"') || t.includes(`
`) || t.includes("\r") ? '"' + t.replace(/"/g, '""') + '"' : t;
}
__name(rs, "rs");
function W(e, t) {
  const a = e.map(rs).join(","), n = t.map((i) => e.map((r) => rs(i[r])).join(","));
  return "\uFEFF" + a + `
` + n.join(`
`);
}
__name(W, "W");
function Y(e, t) {
  return new Response(e, { headers: { "content-type": "text/csv; charset=utf-8", "content-disposition": `attachment; filename="${t}"`, "cache-control": "no-store" } });
}
__name(Y, "Y");
function Vs(e, t) {
  return new Response(JSON.stringify(e, null, 2), { headers: { "content-type": "application/json; charset=utf-8", "content-disposition": `attachment; filename="${t}"`, "cache-control": "no-store" } });
}
__name(Vs, "Vs");
function q() {
  const e = /* @__PURE__ */ new Date(), t = /* @__PURE__ */ __name((s) => String(s).padStart(2, "0"), "t");
  return `${e.getFullYear()}${t(e.getMonth() + 1)}${t(e.getDate())}_${t(e.getHours())}${t(e.getMinutes())}`;
}
__name(q, "q");
B.get("/api/admin/export/posts", m, async (e) => {
  const t = e.get("user"), s = e.req.query("status"), a = e.req.query("month");
  let n = "WHERE pq.platform='x' AND pq.user_id = ?";
  const i = [t.id];
  s && s !== "all" && (n += " AND pq.status = ?", i.push(s)), a && (n += " AND strftime('%Y-%m', COALESCE(pq.posted_at, pq.scheduled_at, pq.created_at)) = ?", i.push(a));
  const { results: r } = await e.env.DB.prepare(`SELECT pq.id, pq.body, pq.link_url, pq.hashtags, pq.post_mode, pq.status,
            pq.generation_type, pq.source_type, pq.pattern_type,
            pq.scheduled_at, pq.effective_scheduled_at, pq.posted_at,
            pq.external_post_id, pq.error_message,
            pq.recurrence_type, pq.recurrence_rule,
            pq.thread_parent_id, pq.thread_order, pq.thread_count,
            pq.media_type, pq.jitter_enabled, pq.jitter_minutes,
            pq.created_at, pq.updated_at,
            xa.account_name, xa.x_username
       FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id = xa.id
       ${n} ORDER BY pq.id DESC LIMIT 10000`).bind(...i).all(), d = W(["id", "body", "link_url", "hashtags", "post_mode", "status", "account_name", "x_username", "generation_type", "source_type", "pattern_type", "scheduled_at", "effective_scheduled_at", "posted_at", "external_post_id", "error_message", "recurrence_type", "recurrence_rule", "thread_parent_id", "thread_order", "thread_count", "media_type", "jitter_enabled", "jitter_minutes", "created_at", "updated_at"], r || []);
  return Y(d, `ge365x_posts_${q()}.csv`);
});
B.get("/api/admin/export/logs", m, async (e) => {
  const t = e.get("user"), { results: s } = await e.env.DB.prepare(`SELECT pl.id, pl.record_id, pl.account_name, pl.platform,
            pl.source_type, pl.generation_type, pl.post_mode,
            pl.content, pl.content_hash, pl.link_url,
            pl.media_type, pl.media_upload_status, pl.media_id,
            pl.thread_parent_id, pl.thread_order, pl.thread_total_count,
            pl.scheduled_at, pl.executed_at, pl.posted_at,
            pl.status, pl.error_message, pl.api_response_summary,
            pl.created_at
       FROM post_logs pl
       WHERE pl.user_id = ?
       ORDER BY pl.id DESC LIMIT 10000`).bind(t.id).all(), n = W(["id", "record_id", "account_name", "platform", "source_type", "generation_type", "post_mode", "content", "content_hash", "link_url", "media_type", "media_upload_status", "media_id", "thread_parent_id", "thread_order", "thread_total_count", "scheduled_at", "executed_at", "posted_at", "status", "error_message", "api_response_summary", "created_at"], s || []);
  return Y(n, `ge365x_post_logs_${q()}.csv`);
});
B.get("/api/admin/export/generations", m, async (e) => {
  const t = e.get("user"), { results: s } = await e.env.DB.prepare(`SELECT gl.id, gl.account_id, xa.account_name, xa.x_username,
            gl.brand_voice_id, gl.target_setting_id,
            gl.post_mode, gl.generation_type, gl.output_text,
            gl.created_at
       FROM generation_logs gl
       LEFT JOIN x_accounts xa ON gl.account_id = xa.id
       WHERE gl.user_id = ?
       ORDER BY gl.id DESC LIMIT 10000`).bind(t.id).all(), n = W(["id", "account_id", "account_name", "x_username", "brand_voice_id", "target_setting_id", "post_mode", "generation_type", "output_text", "created_at"], s || []);
  return Y(n, `ge365x_generation_logs_${q()}.csv`);
});
B.get("/api/admin/export/autopilot", m, async (e) => {
  const t = e.get("user"), { results: s } = await e.env.DB.prepare(`SELECT aj.id, aj.reservation_no, aj.account_id, xa.account_name, xa.x_username,
            aj.channel_type, aj.content_mode, aj.theme, aj.keywords, aj.prompt_text,
            aj.title_memo, aj.link_url,
            aj.generate_at, aj.publish_at, aj.status,
            aj.generated_post_id, aj.external_post_id, aj.error_message,
            aj.created_at, aj.updated_at
       FROM autopilot_jobs aj
       LEFT JOIN x_accounts xa ON aj.account_id = xa.id
       WHERE aj.user_id = ?
       ORDER BY aj.id DESC LIMIT 10000`).bind(t.id).all(), n = W(["id", "reservation_no", "account_id", "account_name", "x_username", "channel_type", "content_mode", "theme", "keywords", "prompt_text", "title_memo", "link_url", "generate_at", "publish_at", "status", "generated_post_id", "external_post_id", "error_message", "created_at", "updated_at"], s || []);
  return Y(n, `ge365x_autopilot_${q()}.csv`);
});
B.get("/api/admin/export/drafts", m, async (e) => {
  const t = e.get("user"), { results: s } = await e.env.DB.prepare(`SELECT id, account_id, title, body, link_url, hashtags, post_mode, created_at, updated_at
       FROM drafts WHERE user_id = ? ORDER BY id DESC LIMIT 5000`).bind(t.id).all(), n = W(["id", "account_id", "title", "body", "link_url", "hashtags", "post_mode", "created_at", "updated_at"], s || []);
  return Y(n, `ge365x_drafts_${q()}.csv`);
});
B.get("/api/admin/export/kpi", m, async (e) => {
  const t = e.get("user"), { results: s } = await e.env.DB.prepare(`SELECT km.id, km.account_id, xa.account_name, xa.x_username,
            km.metric_date, km.posts_sent, km.posts_failed,
            km.impressions, km.engagements, km.followers_gained,
            km.created_at, km.updated_at
       FROM kpi_metrics km
       LEFT JOIN x_accounts xa ON xa.id = km.account_id
       WHERE km.user_id = ?
       ORDER BY km.metric_date DESC, km.account_id ASC LIMIT 10000`).bind(t.id).all(), n = W(["id", "account_id", "account_name", "x_username", "metric_date", "posts_sent", "posts_failed", "impressions", "engagements", "followers_gained", "created_at", "updated_at"], s || []);
  return Y(n, `ge365x_kpi_${q()}.csv`);
});
B.get("/api/admin/export/accounts", m, async (e) => {
  const t = e.get("user"), { results: s } = await e.env.DB.prepare(`SELECT id, account_name, x_user_id, x_username,
            daily_post_count, daily_post_limit, last_posted_at,
            account_health_score, health_status, is_active, is_current,
            last_daily_reset_date, created_at, updated_at
       FROM x_accounts WHERE user_id = ? ORDER BY id DESC`).bind(t.id).all(), n = W(["id", "account_name", "x_user_id", "x_username", "daily_post_count", "daily_post_limit", "last_posted_at", "account_health_score", "health_status", "is_active", "is_current", "last_daily_reset_date", "created_at", "updated_at"], s || []);
  return Y(n, `ge365x_accounts_${q()}.csv`);
});
B.get("/api/admin/export/targets", m, async (e) => {
  const t = e.get("user"), { results: s } = await e.env.DB.prepare(`SELECT id, account_id, template_key, label, age_range, gender, genre, occupation,
            pains, desires, purchase_triggers, problem, goal, knowledge, is_default
       FROM target_templates WHERE user_id = ? ORDER BY id DESC`).bind(t.id).all(), n = W(["id", "account_id", "template_key", "label", "age_range", "gender", "genre", "occupation", "pains", "desires", "purchase_triggers", "problem", "goal", "knowledge", "is_default"], s || []);
  return Y(n, `ge365x_targets_${q()}.csv`);
});
B.get("/api/admin/export/voices", m, async (e) => {
  const t = e.get("user"), { results: s } = await e.env.DB.prepare(`SELECT id, account_id, voice_key, label, tone, worldview, personal_story,
            prohibited_words, sample_posts, is_default
       FROM brand_voice WHERE user_id = ? ORDER BY id DESC`).bind(t.id).all(), n = W(["id", "account_id", "voice_key", "label", "tone", "worldview", "personal_story", "prohibited_words", "sample_posts", "is_default"], s || []);
  return Y(n, `ge365x_voices_${q()}.csv`);
});
B.get("/api/admin/export/all", m, async (e) => {
  const t = e.get("user"), s = t.id, [a, n, i, r, o, d, l, c, p] = await Promise.all([e.env.DB.prepare(`SELECT pq.*, xa.account_name, xa.x_username
         FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id = xa.id
         WHERE pq.user_id = ? ORDER BY pq.id DESC LIMIT 10000`).bind(s).all(), e.env.DB.prepare("SELECT * FROM post_logs WHERE user_id = ? ORDER BY id DESC LIMIT 10000").bind(s).all(), e.env.DB.prepare("SELECT * FROM generation_logs WHERE user_id = ? ORDER BY id DESC LIMIT 10000").bind(s).all(), e.env.DB.prepare("SELECT * FROM autopilot_jobs WHERE user_id = ? ORDER BY id DESC LIMIT 10000").bind(s).all(), e.env.DB.prepare("SELECT * FROM drafts WHERE user_id = ? ORDER BY id DESC LIMIT 5000").bind(s).all(), e.env.DB.prepare("SELECT * FROM kpi_metrics WHERE user_id = ? ORDER BY metric_date DESC LIMIT 10000").bind(s).all(), e.env.DB.prepare(`SELECT id, account_name, x_user_id, x_username,
              daily_post_count, daily_post_limit, last_posted_at,
              account_health_score, health_status, is_active, is_current,
              created_at, updated_at
         FROM x_accounts WHERE user_id = ? ORDER BY id DESC`).bind(s).all(), e.env.DB.prepare("SELECT * FROM target_templates WHERE user_id = ? ORDER BY id DESC").bind(s).all(), e.env.DB.prepare("SELECT * FROM brand_voice WHERE user_id = ? ORDER BY id DESC").bind(s).all()]), _ = { exported_at: (/* @__PURE__ */ new Date()).toISOString(), user: { id: t.id, email: t.email }, posts: a.results || [], post_logs: n.results || [], generation_logs: i.results || [], autopilot_jobs: r.results || [], drafts: o.results || [], kpi_metrics: d.results || [], x_accounts: l.results || [], target_templates: c.results || [], brand_voices: p.results || [] };
  return Vs(_, `ge365x_all_data_${q()}.json`);
});
B.get("/api/admin/export/admin/users", m, R, async (e) => {
  const { results: t } = await e.env.DB.prepare(`SELECT u.id, u.email, u.is_approved, u.is_admin,
            u.trial_start, u.trial_end, u.created_at, u.updated_at,
            s.plan_code, s.status AS sub_status, s.current_period_end
       FROM users u
       LEFT JOIN user_subscriptions s ON s.user_id = u.id
       ORDER BY u.id DESC LIMIT 10000`).all(), a = W(["id", "email", "is_approved", "is_admin", "trial_start", "trial_end", "created_at", "updated_at", "plan_code", "sub_status", "current_period_end"], t || []);
  return Y(a, `ge365x_admin_users_${q()}.csv`);
});
B.get("/api/admin/export/admin/licenses", m, R, async (e) => {
  const { results: t } = await e.env.DB.prepare(`SELECT l.id, l.license_key, l.license_type, l.plan_code,
            l.user_id, u.email AS user_email,
            l.is_active, l.activated_at, l.expires_at,
            l.issued_by, l.note, l.created_at, l.updated_at
       FROM licenses l
       LEFT JOIN users u ON u.id = l.user_id
       ORDER BY l.id DESC LIMIT 10000`).all(), a = W(["id", "license_key", "license_type", "plan_code", "user_id", "user_email", "is_active", "activated_at", "expires_at", "issued_by", "note", "created_at", "updated_at"], t || []);
  return Y(a, `ge365x_admin_licenses_${q()}.csv`);
});
B.get("/api/admin/export/admin/subs", m, R, async (e) => {
  const { results: t } = await e.env.DB.prepare(`SELECT s.id, s.user_id, u.email AS user_email,
            s.plan_code, s.status, s.started_at, s.current_period_end,
            s.cancel_at_period_end, s.created_at, s.updated_at
       FROM user_subscriptions s
       LEFT JOIN users u ON u.id = s.user_id
       ORDER BY s.updated_at DESC LIMIT 10000`).all(), a = W(["id", "user_id", "user_email", "plan_code", "status", "started_at", "current_period_end", "cancel_at_period_end", "created_at", "updated_at"], t || []);
  return Y(a, `ge365x_admin_subs_${q()}.csv`);
});
B.get("/api/admin/export/admin/audit", m, R, async (e) => {
  const { results: t } = await e.env.DB.prepare(`SELECT id, user_id, email, event_type, ip_address, user_agent, metadata, created_at
       FROM auth_logs ORDER BY id DESC LIMIT 10000`).all(), a = W(["id", "user_id", "email", "event_type", "ip_address", "user_agent", "metadata", "created_at"], t || []);
  return Y(a, `ge365x_admin_audit_${q()}.csv`);
});
B.get("/api/admin/export/admin/all", m, R, async (e) => {
  const [t, s, a, n, i, r, o] = await Promise.all([e.env.DB.prepare(`SELECT id, email, is_approved, is_admin, trial_start, trial_end, created_at, updated_at
         FROM users ORDER BY id DESC LIMIT 10000`).all(), e.env.DB.prepare(`SELECT s.*, u.email AS user_email
         FROM user_subscriptions s LEFT JOIN users u ON u.id = s.user_id
         ORDER BY s.id DESC LIMIT 10000`).all(), e.env.DB.prepare(`SELECT l.*, u.email AS user_email
         FROM licenses l LEFT JOIN users u ON u.id = l.user_id
         ORDER BY l.id DESC LIMIT 10000`).all(), e.env.DB.prepare(`SELECT id, user_id, email, event_type, ip_address, metadata, created_at
         FROM auth_logs ORDER BY id DESC LIMIT 10000`).all(), e.env.DB.prepare(`SELECT pq.id, pq.user_id, pq.account_id, pq.body, pq.status, pq.post_mode,
              pq.scheduled_at, pq.posted_at, pq.created_at
         FROM post_queue pq ORDER BY pq.id DESC LIMIT 10000`).all(), e.env.DB.prepare(`SELECT id, record_id, user_id, account_id, account_name,
              content, status, posted_at, error_message, created_at
         FROM post_logs ORDER BY id DESC LIMIT 10000`).all(), e.env.DB.prepare(`SELECT id, user_id, account_name, x_username, account_health_score,
              health_status, is_active, created_at
         FROM x_accounts ORDER BY id DESC LIMIT 10000`).all()]), d = { exported_at: (/* @__PURE__ */ new Date()).toISOString(), users: t.results || [], user_subscriptions: s.results || [], licenses: a.results || [], auth_logs: n.results || [], post_queue: i.results || [], post_logs: r.results || [], x_accounts: o.results || [] };
  return Vs(d, `ge365x_admin_all_${q()}.json`);
});
var S = new A();
S.use("/static/*", Ua({ root: "./", manifest: {} }));
S.get("/healthz", (e) => e.json({ ok: true, service: "ge365x-web", time: (/* @__PURE__ */ new Date()).toISOString() }));
S.route("/", js);
S.route("/", H);
S.route("/", F);
S.route("/", fe);
S.route("/", be);
S.route("/", ge);
S.route("/", U);
S.route("/", zs);
S.route("/", ve);
S.route("/", tt);
S.route("/", st);
S.route("/", at);
S.route("/", Pt);
S.route("/", gt);
S.route("/", vt);
S.route("/", yt);
S.route("/", He);
S.route("/", B);
S.notFound((e) => e.json({ error: "not_found", path: e.req.path }, 404));
S.onError((e, t) => (console.error("[ge365x-web] error:", e), t.json({ error: "internal_error", message: e.message }, 500)));
var Hn = { fetch: S.fetch, async scheduled(e, t, s) {
  const a = e.cron;
  (!a || a === "*/1 * * * *") && s.waitUntil(S.fetch(new Request("https://internal/cron/tick", { method: "POST" }), t, s).catch((n) => console.error("[tick]", n))), a === "*/5 * * * *" && s.waitUntil(S.fetch(new Request("https://internal/cron/autopilot-tick", { method: "POST" }), t, s).catch((n) => console.error("[autopilot-tick]", n)));
} };
var os = new A();
var Un = Object.assign({ "/src/index.tsx": Hn });
var Xs = false;
for (const [, e] of Object.entries(Un)) e && (os.all("*", (t) => {
  let s;
  try {
    s = t.executionCtx;
  } catch {
  }
  return e.fetch(t.req.raw, t.env, s);
}), os.notFound((t) => {
  let s;
  try {
    s = t.executionCtx;
  } catch {
  }
  return e.fetch(t.req.raw, t.env, s);
}), Xs = true);
if (!Xs) throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");
var __wrappedDefault = {
  fetch(req, env2, ctx) {
    return os.fetch(req, env2, ctx);
  },
  scheduled(controller, env2, ctx) {
    return Hn.scheduled(controller, env2, ctx);
  }
};
export {
  __wrappedDefault as default
};
//# sourceMappingURL=_worker.js.map


