# App to Build

## Core Requirements

- Setup the OpenAI API
- Select a model
- Engineer a prompt
- Use temperature
- Use max_tokens
- Render the completion

## Stretch Goals

- Turn into chat app
- Add functionality:
  - Ability to correct
  - Add AI Generated images
- Handle Errors
- Deploy

## Hints

- You can complete this solo project using the gpt-4 or gpt-3.5-turbo models.
- Use template literals to include the string to be translated and the language to translate into in the prompt.
- The prompt should ask for a translation and specify a language. You could also instruct the model that it is a polyglot/expert translator.
- Experiment with temperature, but lower is probably better for most types of translation.
- Remember to set max_tokens high enough to complete the translation or just leave it at its default setting.