import { HttpResponse, http } from "msw";

export const handlers = [
  http.get("/api/notion/access-token/", () => {
    return new HttpResponse(null, {
      status: 200,
    });
  }),
];
