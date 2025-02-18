import { http, HttpResponse } from "msw";

export const handlers = [
  http.post(`*/auth/login`, async ({ request }) => {
    const { matricula, senha } = await request.json();
    if (matricula === "123" && senha === "senha123") {
      return HttpResponse.json({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzY2FuYWktYXBpIiwic3ViIjoiMTIzIiwiaWQiOjEsInJvbGUiOiJBRE1JTiJ9._L8_7RQISitEKaTaoXSOc4Ni_IuAF19qmS2jMOunVd0",
      });
    }
    return new HttpResponse("User doesn't exist", { status: 400 });
  }),
];
