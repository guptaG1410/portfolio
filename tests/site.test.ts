import assert from "node:assert/strict";
import { test } from "node:test";
import { aboutStats, achievements, experience, nav, projects, site } from "../lib/site";

test("project links are unpublished until explicitly set", () => {
  for (const project of projects) {
    assert.equal(project.liveUrl, null);
    assert.equal(project.repositoryUrl, null);
  }
});

test("leetcode is configurable and not invented", () => {
  assert.equal(site.leetcodeUrl, process.env.NEXT_PUBLIC_LEETCODE_URL?.trim() ?? "");
});

test("achievement figures keep their project context", () => {
  for (const metric of achievements) {
    assert.match(metric.context, /Charmai Technologies|Misemind Technologies/);
  }
});

test("project-specific about stats name the company", () => {
  const projectStats = aboutStats.filter((stat) => stat.label !== "Years of experience");
  for (const stat of projectStats) {
    assert.match(stat.context, /Charmai Technologies/);
  }
});

test("navigation targets are unique", () => {
  const ids = nav.map((item) => item.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("experience entries keep their companies and dates", () => {
  assert.deepEqual(
    experience.map((role) => role.company),
    ["Charmai Technologies Pvt. Ltd.", "Misemind Technologies Pvt. Ltd.", "TGH Tech"],
  );
  assert.equal(experience[0]?.dates, "March 2025 – Present");
  assert.equal(experience[2]?.location, "Kochi, Kerala · Remote");
});
