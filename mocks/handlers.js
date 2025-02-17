import { http, HttpResponse } from "msw";

export const handlers = [
  http.post(`http://192.168.1.6:8080/auth/login`, async ({ request }) => {
    const { matricula, senha } = await request.json();
    if (matricula !== "ADMIN" || senha !== "ADMIN") {
      return new HttpResponse("User doesn't exist", { status: 400 });
    }
    return HttpResponse.json({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzY2FuYWktYXBpIiwic3ViIjoiQURNSU4iLCJpZCI6MSwicm9sZSI6IkFETUlOIn0.VPSg8zbNLfTTzlAvfx4fIiBNm-9_adFj8_wVqH3Uvgo",
    });
  }),
];
