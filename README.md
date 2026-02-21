# Wallee: AI Assistant
This project is an AI chat application featuring Wallee; Walle is a fun yet professional AI assistant, powered by Google's Gemini 3 Flash.

## Project Structure
`/frontend: TypeScript + React + TailwindCSS`

`/backend: TypeScript + Bun + Express + Google's Gemini API`

## How It Works
1. The user send a prompt
2. The frontend sends a POST request to the backend
3. The backend process the POST request
4. Wallee then processes the user's prompt and sends a response back to the client
5. Finally, the client is presented the LLM's response

## Safety & Security
- API: The API key is never exposed to the client
- Content Filtering: System-level instructions ensure safe, professional interactions

___
___
___
___


# Frontend (WIP) 
A minimalistic frontend for users to interact with Wallee AI. Built with React, TailwindCSS, and TypeScript.
## Setup
Install
```Bash
bun i
```
Configure .env
```.env
VITE_API_URL=your_url_here
```
## Start server
```Bash
bun run dev
```

## Features
- Real-time Chat: Interactive interface to communicate with Wallee
- Markdown Support: AI responses have code highlighting, tables, etc
- Design: Minimal and clean pastel-yellow themed UI (currently working on layouts for all devices)
- Error Handling: WIP
- API Integration: Connects to the Wallee Backend for security and to prevent client abuse
- Styling: Utilized Tailwind's `@tailwindcss/typography` for the layout

___
___
___
___

# Backend (WIP)
A simple backend that handles client requests for the Wallee AI assistant. Built with TypeScript, Bun, Express, and Google's Gemini API.


## Setup
Install

```Bash
bun i
```
Configure .env
```.env
GEMINI_API_KEY=your_key_here
PORT=0000
```

## Start server
```Bash
bun --w .\src\server.ts
```

## API
Endpoint: ```POST /api/v1/chat```
### Request Schema
```json
{
  "promptContent": "User input"
}
```
### Response Schema
```json
{
  "llmResponse": "AI-generated text output"
}
```

## Details
- Model: `gemini-3-flash-preview`
- Personalization: A balanced, professional, and playful persona named Wallee
- LLM Safety: Enforced `systemInstruction` to prevent engagement with inappropriate content
- Rate Limiting: 5 requests/30 minutes via `express-rate-limit` package
- CORS: To ensure secure cross-origin resource sharing