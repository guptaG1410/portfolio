import assert from "node:assert/strict";
import { test } from "node:test";
import { validateContact } from "../lib/contact";

test("accepts a complete message", () => {
  const result = validateContact({
    name: "Ada Lovelace",
    email: "ada@example.com",
    message: "I would like to talk about a backend platform.",
  });
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.data.email, "ada@example.com");
});

test("rejects incomplete fields", () => {
  const result = validateContact({ name: "A", email: "not-an-email", message: "short" });
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.ok(result.errors.name);
    assert.ok(result.errors.email);
    assert.ok(result.errors.message);
  }
});

test("rejects a non-object payload", () => {
  const result = validateContact(null);
  assert.equal(result.ok, false);
});
