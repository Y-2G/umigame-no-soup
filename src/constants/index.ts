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
プレイヤーが解答を宣言した場合、その解答を採点してください。
解答が模範回答の80%以上合致していると判断される場合は「正解」、それ以外は「不正解」としてください。
解答が正解だった場合、最後に模範回答を表示してください。
`;
