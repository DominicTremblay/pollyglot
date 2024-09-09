import OpenAI from 'openai'

interface Env {
	OPENAI_API_KEY: string;
}

const MODEL = 'gpt-3.5-turbo-0125'

export default {
	async fetch(request, env, ctx): Promise<Response> {

		const openai = new OpenAI({
			apiKey: env.OPENAI_API_KEY
		})

		try {
			const response = await openai.chat.completions.create({
				model: MODEL,
				messages: [
					{
						role: 'system', content: `You are a polyglot/expert translator. Translate the user input in between triple hash symbols into french. Do not include the hash symbols into the response.`
					},
					{
						role: 'user', content: `### Where can I find the bathroom please? ####`
					}
				]
			})

			return new Response(response.choices[0].message.content || '');

		} catch (err) {
			return new Response(`Error: ${(err as Error).message}`)
		}

		return new Response('Hello World!');
	},
} satisfies ExportedHandler<Env>;
