import { describe, expect, it } from "vitest";
import {
  formatVerseToContent,
  formatVerseToProperty,
  highlightVerses,
} from "./verses";

const verses = [{ chapter: 1, number: 1, text: "", color: "r" }];

describe("highlightVerses", () => {
  it("should return highlighted verse", () => {
    expect(
      highlightVerses({
        chapter: 1,
        highlighted: "1:1r",
        verses,
      })
    ).toStrictEqual([{ chapter: 1, number: 1, text: "", color: "r" }]);
  });

  it("should return multiple highlighted verses", () => {
    expect(
      highlightVerses({
        chapter: 1,
        highlighted: "1:1r 1:2y",
        verses: [...verses, { chapter: 1, number: 2, text: "" }],
      })
    ).toStrictEqual([
      { chapter: 1, number: 1, text: "", color: "r" },
      { chapter: 1, number: 2, text: "", color: "y" },
    ]);
  });
});

describe("formatVerseToContent", () => {
  it("should return 1:1", () => {
    expect(
      formatVerseToContent({
        chapter: 1,
        verses,
      })
    ).toStrictEqual("1:1");
  });

  it("should return 1:1-2", () => {
    expect(
      formatVerseToContent({
        chapter: 1,
        verses: [...verses, { chapter: 1, number: 2, text: "" }],
      })
    ).toStrictEqual("1:1-2");
  });
  it("should return 1:2,1", () => {
    expect(
      formatVerseToContent({
        chapter: 1,
        verses: [{ chapter: 1, number: 2, text: "" }, ...verses],
      })
    ).toStrictEqual("1:2,1");
  });
});

describe("formatVerseToProperty", () => {
  it("should return 1:1r", () => {
    expect(
      formatVerseToProperty({
        chapter: 1,
        verses,
      })
    ).toStrictEqual("1:1r");
  });
});
