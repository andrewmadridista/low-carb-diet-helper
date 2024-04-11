export default async (req, context) => {
    return new Response(
        JSON.stringify({ key: process.env.API_KEY })
    );
  };