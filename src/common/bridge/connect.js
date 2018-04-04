export default url => {
    if (!url) {
        return null;
    }
    // for WKWebView
    window.webkit.messageHandlers.MagicApp.postMessage({ body: url });
    return null;
};
