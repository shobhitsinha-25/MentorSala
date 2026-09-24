import api from "../../../../api/axios";

export type TwilioIceServer = {
  urls: string | string[];
  username?: string;
  credential?: string;
};

export type TwilioIceServersResponse = {
  success: boolean;
  data: {
    iceServers: TwilioIceServer[];
    ttl: number;
  };
};

export const getTwilioIceServers =
  async (): Promise<TwilioIceServersResponse["data"]> => {
    const response =
      await api.get<TwilioIceServersResponse>(
        "/video-call/ice-servers"
      );

    return response.data.data;
  };