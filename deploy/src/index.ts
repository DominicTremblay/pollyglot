import OpenAI from 'openai';


const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

interface Env {
	OPENAI_API_KEY: string;
}

interface Message {
	role: string;
	content: string;
}

const MODEL = 'gpt-3.5-turbo-0125';



export default {
	async fetch(request, env, ctx): Promise<Response> {
		
		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders });
		}
		
		const openai = new OpenAI({
			apiKey: env.OPENAI_API_KEY,
			baseURL: `https://gateway.ai.cloudflare.com/v1/3be2381c987ace6d73d0179a6903bde6/pollyglot/openai`
		});
		
		try {
			const messages: Message[] = await request.json();
			const response = await openai.chat.completions.create({
				model: MODEL,
				messages: messages,
			});

			return new Response(JSON.stringify(response.choices[0].message.content), { headers: corsHeaders })
		} catch (err) {
			return new Response(`Error: ${(err as Error).message}`);
		}
	},
} satisfies ExportedHandler<Env>;
