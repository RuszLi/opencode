import { describe, expect, test } from "bun:test"
import { sortModelOptions } from "../../../../src/component/dialog-model"

describe("sortModelOptions", () => {
  test("orders opencode models before other providers", () => {
    const sorted = sortModelOptions([
      { providerID: "openai", providerName: "OpenAI", title: "GPT 5" },
      { providerID: "opencode", providerName: "OpenCode", title: "Claude Sonnet 4" },
      { providerID: "anthropic", providerName: "Anthropic", title: "Claude Opus 4" },
    ])

    expect(sorted.map((model) => model.title)).toEqual(["Claude Sonnet 4", "Claude Opus 4", "GPT 5"])
  })

  test("orders provider groups by provider name and models by title", () => {
    const sorted = sortModelOptions([
      { providerID: "google", providerName: "Google", title: "Gemini 2.5 Pro" },
      { providerID: "anthropic", providerName: "Anthropic", title: "Claude Sonnet 4" },
      { providerID: "anthropic", providerName: "Anthropic", title: "Claude Opus 4" },
      { providerID: "openai", providerName: "OpenAI", title: "GPT 5" },
    ])

    expect(sorted.map((model) => model.title)).toEqual(["Claude Opus 4", "Claude Sonnet 4", "Gemini 2.5 Pro", "GPT 5"])
  })
})
