import { HttpResponse, http } from "msw";

export const handlers = {
  getAccessTokenSuccess: http.get("/api/notion/access-token/", () => {
    return new HttpResponse(null, {
      status: 200,
    });
  }),
  getAccessTokenError: http.get("/api/notion/access-token/", () => {
    return new HttpResponse(null, {
      status: 500,
    });
  }),
};
