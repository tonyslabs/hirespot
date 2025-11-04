// Browser shim for @eshaz/web-worker to satisfy imports in decoder workers.
// In browsers, globalThis.Worker is used instead, so this default export
// is never instantiated. It only needs to exist to pass module resolution.
export default class DummyWorker {}

