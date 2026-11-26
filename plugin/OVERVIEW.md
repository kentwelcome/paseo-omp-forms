# OMP Forms

Answer Oh My Pi (OMP) single-choice questions in Paseo chat. If the bundled provider shows **Question** without any choices, OMP Forms displays a native question card. Submitting an option returns its value to OMP so the agent can continue. Dismissing it cancels the question without answering.

Start a new chat with **Oh My Pi (Forms)**. The plugin does not replace the bundled provider or change existing chats. It supports one group of radio buttons per question and cancels unsupported forms, including forms with text fields, checkboxes, or multiple groups.

Tested on macOS with Paseo Desktop 0.17.4 and Oh My Pi 19.2.1. Enable plugins on the target Paseo daemon and make sure `omp` is on that host’s `PATH`. Git installation uses Node.js 22.13 or newer and npm on the daemon host to fetch locked dependencies from the npm registry. Install and configure OMP separately with your usual model provider.

The plugin runs as trusted code on the daemon host and launches the local OMP process. It reads the question from OMP and sends the selected answer back to the same process. OMP can send prompts and tool results, including answers, to your configured model provider as part of the conversation. The plugin parses form HTML without executing it.
