---
title: 'LLM Use Cases for Developers'
slug: 'llm-usecase-for-developers'
description: 'My thoughts, opinions and rules on how LLMs can improve your developer experience'
tags: ['llm', 'ai', 'prompt-engineering', 'guidelines']
publishedAt: '2025-07-10'
---

This document outlines practical use cases for integrating Large Language Models (LLMs) into your software development workflow.

## Recommended Tools

- **Cursor** / **Windsurf** – LLM-powered IDEs
- **GitHub Copilot** – Use with Agentic Mode for extended capabilities
- **Perplexity** – For AI-assisted search and technical research ([perplexity.ai](https://www.perplexity.ai/))
- **ChatGPT** – For general conversational interactions ([chatgpt.com](https://chatgpt.com/))
- **CodeRabbit** - For code reviews ([CodeRabbit](https://www.coderabbit.ai/))

## Best Practices

- **Verify, do not trust**: The LLM output must be verified and not blindly trusted
- **Offer clear context**: Give the LLM context that you feel would be needed to a real person, if you would ask him to do this solution. Otherwise, if the LLM does not have access to that information via other tools (e.g.: is able to search the codebase), he would provide garbage.
- **Plan First**: Ask the LLM first for a plan of any changes he wants to propose, this makes him reason and think about his approach and would give you a more qualitive output.
- **Context Degradation**: As context accumulates, LLM performance typically degrades. Start a new session when output quality drops. Summarize relevant details from prior sessions before continuing.
- **Context Formatting**: Clearly delineate input using appropriate markers (`triple backticks`, XML-style tags, etc.), tailored to the LLM’s parsing preferences.
- **Supply Relevant Context**: If you want to create something specific, give him one or more examples of the desired result.

## LLM Use Cases in Development

### Feature Development

#### Large-Scale Features

Attempting to generate full large-scale features in a single prompt often yields poor results. Instead:

- Decompose features into smaller, modular tasks.
- Treat each task independently, providing focused and relevant context.
- Follow the guidance outlined in **Small-Scale Feature Development**.

From experience, it is often faster and more reliable to implement large features manually unless LLM context is tightly controlled.

#### Small-Scale Features

Effective when the change is **small** and **localized**.
This includes testing something, like a feature or a class.

**Recommendations for context setup:**

- Include architecture rules or project structure documents.
- Provide the LLM IDE with relevant coding standards or linting rules.
- Add any related files (e.g., test files, DTOs, entities, utility functions) to the LLM’s context.

Failing to meet these requirements typically results in low-quality output.

### Exploratory Use Cases

#### Investigative Coding

Use LLMs to create **throwaway prototypes** or **implementation skeletons** when unsure about an approach.
These can help trigger design ideas or architectural direction.
This includes generating new design for frontend application with no UX, so you can be inspired on how you want to present the data to the client.

#### Research Coding

For unknown features or technologies, LLMs can act as a first-pass researcher. Ask for:

- Initial implementation steps
- API usage examples
- Dependency suggestions

**Follow-up considerations:**

- How secure is the solution?
- Is it scalable?
- Is error handling adequate?
- Should the design be more abstract or configurable?
- What alternatives exist, and how do they compare?

Continue the conversation with the LLM for deeper technical insights.
** If the code needed requires documentation that the LLM is not yet trained on, pass a link to the current documentation in the context**

### Debugging Coding

Providing the LLM with sufficient context can yield useful ideas or guidance for resolving an issue.
However, it's essential to manually verify whether the suggested solution actually works.
Most importantly, you must understand the proposed solution—not just apply it blindly.

### Code Review & Improvement

#### Review Assistance

Use LLMs to review pull requests or code snippets. They often catch issues or offer suggestions you might overlook.

#### Code Refinement

LLMs are useful for improving isolated methods or functions. Prompts such as “refactor,” or “optimize,” often yield good results.

## General-Purpose Applications

### Summarization and Rephrasing

LLMs excel at rewriting text. Enhance effectiveness by specifying:

- Tone: e.g., technical, concise, formal
- Format: bullet points, short summary, 600-character limit, etc.

**Example Prompt:**

```text
Rephrase the following message to be concise and technical. Limit to 600 characters:
```

### Content Generation

Use LLMs to generate structured content (e.g., documentation, user stories, emails) from minimal input. Prompt quality and structure heavily impact results.

### Image Generation

Leverage LLMs (with multimodal models or image generation tools) to create:

- Placeholder graphics
- Icons
- Logos
- UI mockups

## Example on how I use it

#### Authentication on WebSockets

I implemented WebSockets in my backend and needed to restrict access to authenticated clients. I provided the LLM with details about my application's architecture, including the frameworks used on both the client and server sides, as well as the specific WebSocket library in use. Based on this context, it generated code snippets, which I adapted to fit my architecture.

Initially, I noticed that unauthenticated connections weren't being rejected during the handshake phase, but only after sending a message over the WebSocket channel. To address this, I used Perplexity to search for a solution and found useful reference links. After reviewing the resources, I decided on a new approach and asked the LLM to help generate a revised implementation. I then adapted the code accordingly and validated it through testing.

#### Evaluating Scalability of the WebSocket Implementation

As I prepared to deploy my WebSocket implementation to production, I wanted to assess whether it would scale effectively. The library I used offered optional extensions for scaling WebSocket connections, but it was unclear whether they were necessary in my setup.

I consulted the LLM, providing details about my cloud architecture. It initially recommended using the extensions. However, I had doubts and initiated a separate query in Perplexity, where I supplied more in-depth context about the infrastructure and message flow. This time, the response indicated the extensions were unnecessary. After reviewing the supporting reference links, I confirmed this assessment and decided not to adopt the proposed extensions.

#### Improvement ideas on code

I implemented a feature, but was unsatisfied with the code quality and felt it could be cleaner and more maintainable. I asked the LLM to suggest improvements. After reviewing the output, I evaluated whether it truly enhanced the original implementation. If it did, I incorporated the changes, adapting them to align with the project's coding standards.

### I need to implement something new

I begin by asking the LLM to explain how a concept works, comparing its explanation with my existing knowledge. Then, I request a basic implementation to study and analyze. I follow up with targeted questions—such as clarifications around specific components, security concerns, or potential optimizations. To broaden my understanding, I use Perplexity to explore how the solution is typically implemented at an enterprise level. Based on this comparative analysis, I make an informed decision on the best approach.

### Code Review

I aim to minimize issues in my code and ensure nothing important has been overlooked. To support this, I ask an LLM to review my pull request—either by providing a .patch diff or using an LLM-integrated IDE like Cursor. I review the suggestions it provides, assess their relevance, and apply any necessary fixes accordingly.
