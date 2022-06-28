import { BASE_URL } from "./constants/env";

export const buildURL = (isWithManyItems = false) => {
    const urlWithParams = new URL(BASE_URL);

    urlWithParams.searchParams.append("id", "{number|1000}");
    urlWithParams.searchParams.append("firstName", "{firstName}");
    urlWithParams.searchParams.append("lastName", "{lastName}");
    urlWithParams.searchParams.append("email", "{email}");
    urlWithParams.searchParams.append("phone", "{phone|(xxx)xxx-xx-xx}");
    urlWithParams.searchParams.append("address", "{addressObject}");

    if(!isWithManyItems) {
      urlWithParams.searchParams.append("rows", "32");
    } else {
      urlWithParams.searchParams.append("rows", "1000");
      urlWithParams.searchParams.append("delay", "3");
    }

    return urlWithParams;
}