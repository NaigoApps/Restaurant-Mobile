import dispatcher from "../dispatcher/SimpleDispatcher";
import Settings from "../pages/settings/Settings";
import fetch from 'react-native-fetch-polyfill';

class RequestBuilder {

    static BASE_URL = "http://localhost:8080/restaurant/rest/";

    setSettings(settings) {
        RequestBuilder.BASE_URL = "http://" + settings[Settings.KEYS.SERVER_IP] + ":" + settings[Settings.KEYS.SERVER_PORT]
            + "/restaurant/rest/";
    }

    buildParams(params) {
        let url = "?";
        let sep = "";
        Object.keys(params).forEach(function (prop) {
            url += sep + prop + "=" + params[prop];
            sep = "&";
        });
        return url;
    }

    get(action, resource, params) {
        if (params) {
            resource += this.buildParams(params);
        }
        dispatcher.fireStart(action);

        return new Promise((resolve, reject) => {
            fetch(RequestBuilder.BASE_URL + resource, {
                method: "GET",
                mode: 'cors',
                timeout: 5 * 1000
            }).then(response => RequestBuilder.handleFetchResponse(response, action, resolve, reject))
                .catch(error => RequestBuilder.handleFetchError(error, action, reject));
        })
    }

    post(action, resource, target) {
        dispatcher.fireStart(action);

        return new Promise((resolve, reject) => {
            fetch(
                RequestBuilder.BASE_URL + resource,
                {
                    method: "POST",
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: typeof(target) === "string" ? target : JSON.stringify(target)
                }
            ).then(response => RequestBuilder.handleFetchResponse(response, action, resolve, reject, target))
                .catch(error => RequestBuilder.handleFetchError(error, action, reject));
        });
    }

    put(action, resource, target, params) {
        dispatcher.fireStart(action);
        if (params) {
            resource += this.buildParams(params);
        }

        return new Promise((resolve, reject) => {
            fetch(
                RequestBuilder.BASE_URL + resource,
                {
                    method: "PUT",
                    mode: 'cors',
                    headers: {
                        'Content-Type': typeof(target) === "string" ? 'text/plain' : 'application/json'
                    },
                    body: typeof(target) === "string" ? target : JSON.stringify(target)
                }
            ).then(response => RequestBuilder.handleFetchResponse(response, action, resolve, reject))
                .catch(error => RequestBuilder.handleFetchError(error, action, reject));
        })

    }

    remove(action, resource, target) {
        dispatcher.fireStart(action);

        return new Promise((resolve, reject) => {
            fetch(
                RequestBuilder.BASE_URL + resource,
                {
                    method: "DELETE",
                    mode: 'cors',
                    headers: {
                        'Content-Type': typeof(target) === "string" ? 'text/plain' : 'application/json'
                    },
                    body: typeof(target) === "string" ? target : JSON.stringify(target)
                }
            ).then(response => RequestBuilder.handleFetchResponse(response, action, resolve, reject))
                .catch(error => RequestBuilder.handleFetchError(error, action, reject));
        })
    }

    static handleFetchResponse(response, action, resolve, reject, target) {
        if (response.ok) {
            let contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                response.json().then((result) => {
                    dispatcher.fireEnd(action, result, target);
                    resolve(result);
                });
            } else {
                response.text().then((result) => {
                    dispatcher.fireEnd(action, result, target);
                    resolve(result);
                });
            }
        } else {
            response.text().then((message) => {
                dispatcher.fireError(action, message);
                reject();
            });
        }
    }

    static handleFetchError(error, action, reject) {
        dispatcher.fireFailure(action, error);
        reject();
    }
}

const asyncActionBuilder = new RequestBuilder;

export default asyncActionBuilder;