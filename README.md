# kakao-consult-bot-v2 (Vercel)

## Endpoint
- POST `/bot`  (or `/api/bot`)
- Use this as the **Start Skill URL** in Kakao OpenBuilder.

## Local test
```bash
npm install
npm run dev
```

## Notes
- This is a serverless function. Do NOT use `app.listen()` for Vercel.
- User state is stored in memory. For real service, replace with Redis/DB.
