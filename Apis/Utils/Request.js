import * as req from "./Http";

export const PostReq = async (path, body) => {
  /**request for post method */
  try {
    const response = await req.http.post(path, body);
    return response;
  } catch (err) {}
};

export const PostReqMultiPart = async (path, body) => {
  /**request for post method */
  try {
    const response = await req.httpMultipart.post(path, body);
    return response;
  } catch (err) {
    return err;
  }
};

export const getReq = async (path) => {
  /**request for get method */
  return await req.http
    .get(path)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
};

export const putReq = async (path, body) => {
  /**request for put method */
  return await req.httpMultipart
    .put(path, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const putRequest = async (path, body) => {
  /**request for put method */
  return await req.http
    .put(path, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const delReq = async (path, body) => {
  /**request for delete method */
  return await req.http
    .delete(path, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log("delete error:", err);
    });
};
