import axios from "axios";

const apiInstance = axios.create({
  baseURL: `http://${process.env.EXPO_PUBLIC_IP_PC}`,
  adapter: "fetch", // using this to enable MSW to catch the request (https://github.com/mswjs/msw/issues/2385#issuecomment-2545419967)
  // if errors calling the API when the app is running arise checking this line may be a good start
});

export default apiInstance;
