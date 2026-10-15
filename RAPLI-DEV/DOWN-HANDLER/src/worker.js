export default {
   async fetch(request, env) {
      let response = await fetch(request);

      if (response.status >= 500 && response.status <= 599) {
         const maintenanceUrl = new URL('/index.html', request.url);
         const maintenanceResponse = await env.ASSETS.fetch(maintenanceUrl);

         return new Response(maintenanceResponse.body, {
            status: 503,
            headers: {
               'Content-Type': 'text/html',
               'Cache-Control': 'no-cache, no-store, must-revalidate'
            }
         });
      }

      return response;
   }
};