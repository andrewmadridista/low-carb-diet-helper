export default async (req, context) => {
    return new Response(
        { key: process.env.API_KEY }
    );
  };