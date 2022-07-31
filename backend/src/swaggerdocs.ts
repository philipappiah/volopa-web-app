
require('dotenv').config();

const BASE_URL = process.env.BASE_URL || 'http://localhost'
const PORT = process.env.PORT || 4000

export const swaggerDocs = {
    definition: {
      openapi: "3.0.0",
     
      info: {
        title: "Volopa take home challenge Open API",
        version: "v1",
        
        description:
          "API endpoints for Volopa take home challenge Open API",
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