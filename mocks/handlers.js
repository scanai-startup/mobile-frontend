import { http, HttpResponse } from "msw";

export const handlers = [
  http.post(
    `http://${process.env.EXPO_PUBLIC_IP_PC}/auth/login`,
    async ({ request }) => {
      const { matricula, senha } = await request.json();
      if (matricula === "123" && senha === "senha123") {
        HttpResponse.json({
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzY2FuYWktYXBpIiwic3ViIjoiMTIzIiwiaWQiOjIsInJvbGUiOiJBRE1JTiJ9.iU3N8GF9PWk1a5UFuZ2yZ8_X3vKz4X2RgDIQrOgTLpM",
        });
      }
      return new HttpResponse("User doesn't exist", { status: 400 });
    },
  ),
];
