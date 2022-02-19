import { endPoint } from "../config";
import { getLocalStorage, updateLocalStorage } from "./localStorage";

interface Config<TBody> {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  url: RequestInfo;
  body?: TBody;
  headers?: HeadersInit;
}

/**
 * @function getCurrentUser
 * @description
 *   Fetch the current User and return a Promise that contains either the User Object or undefined
 * @return {Promise<[Object]>} The User Object | undefined
 * */

class NotFoundError extends Error {
  constructor(message = "Not Found") {
    super();
    this.message = message;
  }
}

class BadRequestError extends Error {
  constructor(message = "Bad Request") {
    super();
    this.message = message;
  }
}

class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super();
    this.message = message;
  }
}

export { BadRequestError, ForbiddenError, NotFoundError };

/**
 * @function fetchWrapper
 * @param {string} arg1 - REST method | url
 * @param {string} [url] - url
 * @param {Object} [body] - body of message
 * @description
 *   Wrapper for the fetch api that provides options defaults and base response code handling.
 * @return {Promise<Object>} A promise containing the deserialized response object.
 * */
export async function fetchWrapper<TData, TBody>({
  method = "GET",
  url,
  body,
  ...additionalOptions
}: Config<TBody>): Promise<TData> {
  const options = {
    ...additionalOptions,
    method: method,
    headers: {
      ...(additionalOptions.headers || {}),
      Accept: "application/json",
      "Content-Type": "application/json",
      token: getLocalStorage()?.jwt || "",
    },
    body: body && JSON.stringify(body), // body can be undefined, that's ok
  };

  const response = await fetch(`${endPoint}/${url}`, options);
  const data = await handleResponse<TData>(response);
  updateLocalStorage(data);
  return data;
}

export async function handleResponse<TData>(
  response: Response
): Promise<TData> {
  if (response.status === 401) {
    const error = new Error("Unauthorized");
    throw error;
  }

  if (response.status < 200 || response.status >= 300) {
    throw new Error(
      `There has been an error. Response status: ${response.status}`
    );
  }

  let res;
  try {
    res = await response.json();

    if (response.status === 400) {
      throw new BadRequestError(res.message);
    }

    if (response.status === 403) {
      throw new ForbiddenError(res.message);
    }

    if (response.status === 404) {
      throw new NotFoundError(res.message);
    }
  } catch (err) {
    // if the status is 204, trying to parse the body will throw an error, so we should catch
    // but do nothing
  }
  return res;
}
