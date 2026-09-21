---
title: "Change Something"
category: "Project"
difficulty: "beginner"
updatedAt: "2026-09-21"
order: 2
---

# Change Something

Add a page of your own. It'll appear in the sidebar automatically, because the site reads the folder structure directly — there's no index to update and no admin panel to log into.

## How the site works

Two facts explain everything else:

**The file path is the URL.**

```
content/terminal-basics/git-basics.md
                 ↓
/tutorials/terminal-basics/git-basics
```

**Every `.md` file needs a frontmatter block.** That's the YAML at the top, between `---` markers. The site reads it to get the page's title and metadata.

```yaml
---
title: "Git Basics"
category: "Version Control"
difficulty: "beginner"
updatedAt: "2026-09-21"
order: 2
---
```

| Field | Required | What it does |
|---|---|---|
| `title` | yes | shown in the sidebar and as the page heading |
| `category` | yes | the badge at the top of the page |
| `difficulty` | yes | must be `beginner`, `intermediate`, or `advanced` |
| `updatedAt` | yes | the date shown on the page |
| `order` | no | position among its siblings, ascending. Omit to sort alphabetically last |

## Add a page to an existing folder

Open `content/terminal-basics/` and create a new file. Call it `markdown-basics.md` — lowercase, hyphens instead of spaces.

```markdown
---
title: "Markdown Basics"
category: "Terminal"
difficulty: "beginner"
updatedAt: "2026-09-21"
order: 7
---

# Markdown Basics

Markdown is plain text with a few punctuation marks that mean "make this bold"
or "make this a heading". It's what every file in this project is written in.

## Headings

One `#` is a heading. Two is a subheading.
```

Save it and look at the browser. **`Markdown Basics` is now in the sidebar**, under Terminal Basics, in the position `order: 7` puts it.

That's the whole mechanism. No registration, no build step, no configuration file listing pages.

## Add a whole new section

Create a folder, and inside it an `index.md`:

```bash
mkdir content/markdown-basics
```

`content/markdown-basics/index.md`:

```markdown
---
title: "Markdown Basics"
category: "Writing"
difficulty: "beginner"
updatedAt: "2026-09-21"
order: 7
---

# Markdown Basics

Everything you write for this site is markdown. It's plain text with a small
set of conventions, and you can learn all of it in ten minutes.
```

Then add pages alongside it as separate files.

**The folder's position in the sidebar comes from `order` in its `index.md`.** The current sections run 2 through 6, so `order: 7` puts yours last. That's why the field exists — the sidebar sorts by it, not alphabetically.

**`index.md` is special.** It isn't listed as a child of its own folder, because it *is* the folder's page. Readers reach it through the folder's **View** link. Every folder should have one.

## Writing the content

Everything is standard markdown. The things you'll use constantly:

````markdown
# Heading
## Subheading

A paragraph. **Bold**, *italic*, and `inline code`.

- a list item
- another one

1. numbered
2. items

> A blockquote, for calling something out.

[Link text](/tutorials/terminal-basics)
````

Code blocks take a language and get syntax highlighting:

````markdown
```bash
npm run dev
```
````

Use fenced blocks like that for anything a reader might copy. Inline `code` is for short things inside a sentence — command names, filenames, flags.

## Two rules worth following

**One idea per page.** The existing pages are short on purpose. A page that covers three topics is harder to link to and harder to finish.

**Link to related pages.** If your page raises a question another page answers, link it:

```markdown
See [Git Basics](/tutorials/version-control/git-basics) for how commits work.
```

Links are written as full paths starting with `/tutorials/`. That's how every cross-reference in this site works, and it's why the sections read as a sequence rather than a pile of articles.

## Before you move on

Check your page:

- Does it appear in the sidebar?
- Does the title render correctly at the top?
- Do the `category` and `difficulty` badges look right?
- Does the URL match the file path?

If the page doesn't appear at all, `npm run dev` will usually print an error in the terminal — a malformed frontmatter block is the most common cause. See [When It Breaks](/tutorials/first-project/when-it-breaks).

## Next

**[Ship It](/tutorials/first-project/ship-it)** — get your page into the real repository.
