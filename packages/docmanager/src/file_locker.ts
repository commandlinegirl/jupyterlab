import { ServerConnection } from '@jupyterlab/services';
import { URLExt } from '@jupyterlab/coreutils';

/** Send a HTTP request to the backend */
function httpRequest(
  url: string,
  method: string,
  requestBody: Object
): Promise<Response> {
  let fullRequest = {
    method: method,
    body: JSON.stringify(requestBody)
  };

  let setting = ServerConnection.makeSettings();
  let fullUrl = URLExt.join(setting.baseUrl, url);
  return ServerConnection.makeRequest(fullUrl, fullRequest, setting);
}

export class DXFileLocker {
  async unlockFile(path: string): Promise<Response> {
    const requestBody = {
      path: path
    };
    return httpRequest('/dx-unlock-file', 'POST', requestBody);
  }
}
