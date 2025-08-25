import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

const BASE_URL = "http://localhost:3000";

interface MarvelCharacter {
  id: number;
  name: string;
  description?: string;
  thumbnail?: {
    path: string;
    extension: string;
  };
}

interface MarvelComic {
  id: number;
  title: string;
  thumbnail: { path: string; extension: string };
  startYear: number | null;
}

test.describe("API Local - Marvel", () => {
  test("GET /api/marvel returns characters list", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/marvel?limit=5`);
    expect(response.ok()).toBeTruthy();
    const body = (await response.json()) as {
      data: { results: MarvelCharacter[] };
    };
    expect(body.data.results.length).toBeLessThanOrEqual(5);
  });

  test("GET /api/marvel by IDs returns correct characters", async ({
    request,
  }) => {
    const responseAll = await request.get(`${BASE_URL}/api/marvel?limit=2`);
    const allBody = (await responseAll.json()) as {
      data: { results: MarvelCharacter[] };
    };
    const ids = allBody.data.results.map((c) => c.id);
    const response = await request.get(
      `${BASE_URL}/api/marvel?ids=${ids.join(",")}`
    );
    expect(response.ok()).toBeTruthy();
    const body = (await response.json()) as {
      data: { results: MarvelCharacter[] };
    };
    expect(body.data.results.length).toBe(ids.length);
    for (let i = 0; i < ids.length; i++) {
      expect(body.data.results[i].id).toBe(ids[i]);
    }
  });

  test("GET /api/comics returns comics for a character", async ({
    request,
  }) => {
    const responseCharacters = await request.get(
      `${BASE_URL}/api/marvel?limit=1`
    );
    const charactersBody = (await responseCharacters.json()) as {
      data: { results: MarvelCharacter[] };
    };
    const characterId = charactersBody.data.results[0].id;
    const response = await request.get(
      `${BASE_URL}/api/comics?characterId=${characterId}`
    );
    expect(response.ok()).toBeTruthy();
    const body = (await response.json()) as {
      data: { results: MarvelComic[] };
    };
    if (body.data.results.length > 0) {
      const comic = body.data.results[0];
      expect(typeof comic.id).toBe("number");
      expect(typeof comic.title).toBe("string");
      expect(comic.thumbnail).toHaveProperty("path");
      expect(comic.thumbnail).toHaveProperty("extension");
      expect(
        typeof comic.startYear === "number" || comic.startYear === null
      ).toBe(true);
    }
  });
});
