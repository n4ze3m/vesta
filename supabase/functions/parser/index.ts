// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.131.0/http/server.ts"
import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';


const fetchSiteDetails = (document: any, url: string) => {
  const title = document?.title || url
  const metaImage = document.querySelector("meta[property='og:image']")
  const image = metaImage ? metaImage.getAttribute("content") : ""
  const metaDescription = document.querySelector("meta[property='og:description']")
  return {
    title: title,
    image: image,
    target_url: url,
    description: metaDescription ? metaDescription.getAttribute("content") : "",
  }
}

serve(async (req) => {
  const { url } = await req.json()

  if (!url) {
    return new Response(
      JSON.stringify({
        error: 'No URL provided'
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Expose-Headers": "Content-Length, X-JSON",
          "Access-Control-Allow-Headers": "apikey,X-Client-Info, Content-Type, Authorization, Accept, Accept-Language, X-Authorization",
        }
      }
    )
  }

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19582Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19582",
      "Connection": "keep-alive",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
      "Cache-Control": "max-age=0",
      "Upgrade-Insecure-Requests": "1",
    }
  });
  const html = await res.text();
  const document: any = new DOMParser().parseFromString(html, 'text/html');

  const data = fetchSiteDetails(document, url)

  return new Response(
    JSON.stringify(data),
    {
      headers: {
        "Content-Type": "application/json", "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Expose-Headers": "Content-Length, X-JSON",
        "Access-Control-Allow-Headers": "apikey,X-Client-Info, Content-Type, Authorization, Accept, Accept-Language, X-Authorization",
      }
    },
  )
})

// To invoke:
// curl -i --location --request POST 'http://localhost:8000/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
