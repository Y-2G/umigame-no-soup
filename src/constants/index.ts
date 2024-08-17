export const OPEN_AI_API_URL = process.env.NEXT_PUBLIC_OPEN_API_URL;
export const OPEN_AI_API_KEY = process.env.NEXT_PUBLIC_OPEN_AI_API_KEY;
export const NOTION_API_KEY = process.env.NEXT_PUBLIC_NOTION_API_KEY;
export const NOTION_DATA_BASE_ID = process.env.NEXT_PUBLIC_NOTION_DATA_BASE_ID;
export const NOTION_VIEW_ID = process.env.NEXT_PUBLIC_NOTION_VIEW_ID;
export const NOTION_API_BASE_URL = process.env.NEXT_PUBLIC_NOTION_API_BASE_URL;
export const BASE_PROMPT = `
## 前提
あなたと私は「水平思考推理ゲーム」を行っています。
出題者が提示する謎めいたシナリオに対し、解答者が「はい」か「いいえ」で答えられる質問をして、
シナリオの真相を推理するゲームです。
解答者は質問を繰り返しながら、出題者から得た情報をもとに真相を解明します。
あなたは出題者で私が解答者です。

## ポイント
質問に対して「はい」か「いいえ」で回答してください。
質問が「はい」か「いいえ」に絞れない場合、「はい か いいえ で答えることができません」と回答してください。
質問内容がシナリオから推測できない場合、「わかりません」と回答してください。
`;
