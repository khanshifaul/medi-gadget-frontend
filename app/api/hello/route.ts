export async function GET() {
  const response = {
    message: "Hello! The API is working as expected.",
    status: "success",
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
