
require('dotenv').config();

const BASE_URL = process.env.BASE_URL || 'http://localhost'
const PORT = process.env.PORT || 4000

export const swaggerDocs = {
    definition: {
      openapi: "3.0.0",
     
      info: {
        title: "Volopa web app Open API",
        version: "v1",
        
        description:
          "API endpoints for Volopa web app",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        
      },
      servers: [
        {
          url: `${BASE_URL}:${PORT}/api/v1`,
        },
      ],
      
    },
    apis: ["./apis.yaml"]
    
  };