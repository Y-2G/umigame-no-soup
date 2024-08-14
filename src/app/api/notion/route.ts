import { NotionQuestionResponce } from "@/types/question";
import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

// Notion APIのクライアントを作成
export const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_API_KEY,
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // すべてのオリジンからのアクセスを許可
  "Access-Control-Allow-Methods": "GET", // 許可されるHTTPメソッド
  "Access-Control-Allow-Headers": "Content-Type", // 許可されるヘッダー
  "Content-Type": "application/json",
};

export async function GET() {
  try {
    const databaseId =
      process.env.NEXT_PUBLIC_NOTION_DATA_BASE_ID || "DEFAULT_DATABASE_ID";
    const notionResponse = await notion.databases.query({
      database_id: databaseId,
    });

    //実際にフロントに返すデータを決める。
    const Response = await Promise.all(
      notionResponse.results.map(async (result: any) => {
        const id = result.id;
        const title = result.properties.question_title.title[0].plain_text;
        const description =
          result.properties.question_description.rich_text[0].plain_text;
        const answer =
          result.properties.question_answer.rich_text[0].plain_text;

        return { id, title, description, answer };
      })
    );
    return new NextResponse<NotionQuestionResponce>(JSON.stringify(Response), {
      headers: corsHeaders,
      status: 200,
    });
  } catch (error) {
    console.error(error); // エラーをコンソールに出力
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        headers: corsHeaders,
        status: 500,
      }
    );
  }
}
