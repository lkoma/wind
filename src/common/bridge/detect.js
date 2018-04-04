import detector from 'detector';

const hybridIdentify = 'hybrid';
export default function detect(ua = window.navigator.userAgent || '') {
    const container = { type: 'h5' };
    const matches = ua.split(hybridIdentify);
    if (matches[1]) {
        container.type = hybridIdentify;
    }
    return {
        container,
        ...detector,
        isAndroid: /android/i.test(detector.os.name),
        isIos: /ios/i.test(detector.os.name),
        isWeixin: /micromessenger/i.test(detector.browser.name)
    };
}
