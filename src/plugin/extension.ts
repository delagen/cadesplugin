import { BrowserDetector } from "../browser-detector";
import { ICADESPluginAsyncObject } from "../interfaces";
import { loadScript } from "../util";

interface ICadesExtension {
    CreatePluginObject(): Promise<ICADESPluginAsyncObject>;
}

declare const cpcsp_chrome_nmcades: ICadesExtension | undefined;

// http://cryptopro.ru/sites/default/files/products/cades/nmcades_uwp/nmcades_uwp.appx
// http://cryptopro.ru/sites/default/files/products/cades/nmcades_uwp/cryptoprotest.cert
// http://cryptopro.ru/sites/default/files/products/cades/nmcades_uwp/nmcades_uwp.docx

export class CadesExtension {
    async init(): Promise<ICADESPluginAsyncObject> {
        if (typeof cpcsp_chrome_nmcades === "undefined") {
            if (BrowserDetector.isEdge || BrowserDetector.isFirefox) {
                await new Promise<void>((resolve, reject) => {
                    const pluginLoadedHandler: (event: MessageEvent) => Promise<void> = async (event) => {
                        if (typeof (event.data) !== "string" || !event.data.match("cadesplugin_loaded")) {
                            return;
                        }
                        try {
                            await loadScript(event.data.split("url:").slice(1).join(""));

                            setTimeout(() => {
                                window.postMessage("cadesplugin_echo_request", "*");
                            });

                            resolve();
                        } catch (e) {
                            reject(e);
                        }
                        window.removeEventListener("message", pluginLoadedHandler, false);
                    };
                    window.addEventListener("message", pluginLoadedHandler, false);
                    window.postMessage("cadesplugin_echo_request", "*");
                });
            } else {
                const waitInit = new Promise<void>((resolve, reject) => {
                    const pluginLoadedHandler: (event: MessageEvent) => Promise<void> = async (event) => {
                        if (typeof (event.data) !== "string" || !event.data.match("cadesplugin_loaded")) {
                            return;
                        }
                        resolve();
                        window.removeEventListener("message", pluginLoadedHandler, false);
                    };
                    window.addEventListener("message", pluginLoadedHandler, false);
                });

                for (const url of [
                    "chrome-extension://pfhgbfnnjiafkhfdkmpiflachepdcjod/nmcades_plugin_api.js", // 3
                    "chrome-extension://iifchhfnnmpdbibifmljnfjhpififfog/nmcades_plugin_api.js", // 2
                    "chrome-extension://epebfcehmdedogndhlcacafjaacknbcm/nmcades_plugin_api.js", // 1.5
                ]) {
                    try {
                        await loadScript(url);
                        break;
                    } catch {
                    }
                }

                setTimeout(() => {
                    window.postMessage("cadesplugin_echo_request", "*");
                });

                if (typeof cpcsp_chrome_nmcades === "undefined") {
                    throw new Error("Не удалось загрузить API расширения");
                }

                await waitInit;
            }
        }
        if (typeof cpcsp_chrome_nmcades !== "undefined") { //tslint:disable-line no-typeof-undefined
            const pluginObject: ICADESPluginAsyncObject = await cpcsp_chrome_nmcades.CreatePluginObject();
            await pluginObject.CreateObjectAsync("CAdESCOM.About");
            return pluginObject;
        }
        throw new Error("Плагин недоступен");
    }
}
