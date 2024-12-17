import { AxiosResponse } from 'axios';

interface IAxiosErrorResponse extends AxiosResponse {
  sent: boolean;
  withCredentials: boolean;
}

export default IAxiosErrorResponse;
