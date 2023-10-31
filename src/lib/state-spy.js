export default function watchState(state, callbackFn) {
    return new Proxy(state, {
        set(obj, prop, value) {
            // apply update
            Reflect.set(obj, prop, value);
            callbackFn();
            return true;
        },
    });
}
