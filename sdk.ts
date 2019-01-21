import { IHttp, IHttpRequest, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { IUser } from '@rocket.chat/apps-engine/definition/users';

//export interface IVerification {
//  algo: string;
//}

//export interface IAtenaResponse<T> {
//  result: Array<T>;
//  succcess: boolean;
//}

// errors: Array<any>;
// messages: Array<any>;

class SDK {

  public async getCommand(http: IHttp, read: IRead, sender: IUser, command: string) {
    const server = await read.getEnvironmentReader().getSettings().getValueById('server');
    const url = `${server}${command}`;
    const data = { ...await sender };
    const options: IHttpRequest = {
      data: data,
      headers: {
        "Content-Type": "application/json",
        "origin": "rocket"
      }
    };

    const response = await http.post(url, options);
    return response.data;
  }

  public async getScore(http: IHttp, read: IRead, sender: IUser) {
    const server = await read.getEnvironmentReader().getSettings().getValueById('server');
    const url = `${server}bot/commands/score`;
    const data = { ...await sender };
    const options: IHttpRequest = {
      data: data,
      headers: {
        "Content-Type": "application/json",
        "origin": "rocket"
      }
    };

    const response = await http.post(url, options);
    return response.data;
  }
  public async getRanking(http: IHttp, read: IRead, sender: IUser, month: string) {
    const server = await read.getEnvironmentReader().getSettings().getValueById('server');
    const url = `${server}bot/commands/ranking`;
    const param = (month ? month : "");
    const data = {
      ... await sender,
      month: param
    };
    const options: IHttpRequest = {
      data: data,
      headers: {
        "Content-Type": "application/json",
        "origin": "rocket"
      }
    };
    const response = await http.post(url, options);

    // return response.data as IAtenaResponse<IVerification>;
    return response.data;
  }
}


export const sdk = new SDK();
