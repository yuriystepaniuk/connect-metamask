import { wait } from "./wait";

export const fetchWithMockedRoutes = (url, options) => {
    if (url.includes('nonce')) {
        return getNonceMock(url,options);
    }

    if (url.includes('sign')) {
        return wait(500);
    }

    return fetch(url, options);
}

const getNonceMock = async (url) => {
    const searchParams  = readQuery(url)
    const walletAddress = searchParams.get("walletAddress")
    await wait(3000);
    return ` ${Date.now()} for ${walletAddress}`;
};

const readQuery = (url) => {
    const queryString = url.split('?')[1];
    if (!queryString) return {}; 
    return new URLSearchParams(queryString);;
  }

  
  