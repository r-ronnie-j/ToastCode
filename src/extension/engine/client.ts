import axios from "axios";
import fetchCookie from "fetch-cookie";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

const cookieJar = new CookieJar();

const axiosClient = wrapper(
    axios.create({
        jar: cookieJar,
        withCredentials: true,
    })
);

async function getFetchClient() {
    const fetch = import("node-fetch");
    return fetchCookie((await fetch).default, cookieJar);
}

const fetchClient = getFetchClient();

async function getGotClient() {
    let got = (await import("got")).default;
    got.extend({
        cookieJar
    });
    return got;
}

const gotClient = getGotClient();


export { axiosClient, fetchClient, gotClient, cookieJar };
