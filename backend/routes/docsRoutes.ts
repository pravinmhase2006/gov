import { Router, Request, Response } from 'express';

const router = Router();

const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'GovtPrep India REST API',
    description: 'Complete API documentation for GovtPrep India portal (Jobs, Exams, Authentication, and Profile).',
    version: '1.0.0',
    contact: {
      name: 'GovtPrep Team',
      email: 'support@govtprep.in',
    },
  },
  servers: [
    {
      url: '/api',
      description: 'Current API Server',
    },
    {
      url: 'https://gov-ly37.onrender.com/api',
      description: 'Production Server (Render)',
    },
    {
      url: 'http://localhost:5000/api',
      description: 'Local Development Server',
    },
  ],
  paths: {
    '/health': {
      get: {
        summary: 'Health Check',
        description: 'Verify if the API server and database connection are active.',
        tags: ['System'],
        responses: {
          200: {
            description: 'Server is running normally',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'OK' },
                    message: { type: 'string', example: 'GovtPrep API Server Running' },
                    timestamp: { type: 'string', format: 'date-time' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/auth/register': {
      post: {
        summary: 'Register New User',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                  name: { type: 'string', example: 'Pravin Mhase' },
                  email: { type: 'string', format: 'email', example: 'user@example.com' },
                  password: { type: 'string', format: 'password', example: 'SecurePassword123' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'User successfully registered',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    token: { type: 'string' },
                    user: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        role: { type: 'string', example: 'USER' },
                      },
                    },
                  },
                },
              },
            },
          },
          400: { description: 'Missing fields or email already registered' },
        },
      },
    },
    '/auth/login': {
      post: {
        summary: 'User Login',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email', example: 'user@example.com' },
                  password: { type: 'string', format: 'password', example: 'SecurePassword123' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Login successful with JWT token',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    token: { type: 'string' },
                    user: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        role: { type: 'string', example: 'USER' },
                      },
                    },
                  },
                },
              },
            },
          },
          401: { description: 'Invalid credentials' },
        },
      },
    },
    '/jobs': {
      get: {
        summary: 'List Published Jobs',
        description: 'Fetch all active government job postings with organization details.',
        tags: ['Jobs'],
        responses: {
          200: {
            description: 'List of jobs',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      title: { type: 'string' },
                      slug: { type: 'string' },
                      postName: { type: 'string' },
                      totalVacancies: { type: 'integer' },
                      qualification: { type: 'string' },
                      startDate: { type: 'string' },
                      lastDate: { type: 'string' },
                      officialNotificationUrl: { type: 'string' },
                      applyOnlineUrl: { type: 'string' },
                      organization: {
                        type: 'object',
                        properties: {
                          name: { type: 'string' },
                          shortName: { type: 'string' },
                          category: { type: 'string' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/jobs/{slug}': {
      get: {
        summary: 'Get Job by Slug',
        tags: ['Jobs'],
        parameters: [
          {
            name: 'slug',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'The unique slug identifier of the job',
          },
        ],
        responses: {
          200: { description: 'Job detail with organization' },
          404: { description: 'Job not found' },
        },
      },
    },
    '/exams': {
      get: {
        summary: 'List All Government Exams',
        tags: ['Exams'],
        responses: {
          200: {
            description: 'List of exams',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      name: { type: 'string' },
                      slug: { type: 'string' },
                      code: { type: 'string' },
                      isPopular: { type: 'boolean' },
                      organization: {
                        type: 'object',
                        properties: {
                          name: { type: 'string' },
                          shortName: { type: 'string' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/exams/{slug}': {
      get: {
        summary: 'Get Exam Details by Slug',
        tags: ['Exams'],
        parameters: [
          {
            name: 'slug',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'The unique slug identifier of the exam',
          },
        ],
        responses: {
          200: { description: 'Exam details' },
          404: { description: 'Exam not found' },
        },
      },
    },
  },
};

// JSON Schema endpoint
router.get('/openapi.json', (req: Request, res: Response) => {
  res.json(openApiSpec);
});

// Swagger UI HTML endpoint
router.get('/', (req: Request, res: Response) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>GovtPrep API Documentation</title>
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.18.2/swagger-ui.css" />
  <link rel="icon" type="image/png" href="https://unpkg.com/swagger-ui-dist@5.18.2/favicon-32x32.png" />
  <style>
    html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }
    *, *:before, *:after { box-sizing: inherit; }
    body { margin:0; background: #0b1120; color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    .topbar { display: none !important; }
    .swagger-ui .info .title { color: #38bdf8 !important; }
    .swagger-ui .info p, .swagger-ui .info li { color: #94a3b8 !important; }
    .swagger-ui { filter: invert(88%) hue-rotate(180deg); }
    .swagger-ui .wrapper { max-width: 1200px; margin: 0 auto; padding: 24px; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.18.2/swagger-ui-bundle.js" charset="UTF-8"></script>
  <script src="https://unpkg.com/swagger-ui-dist@5.18.2/swagger-ui-standalone-preset.js" charset="UTF-8"></script>
  <script>
    window.onload = function() {
      window.ui = SwaggerUIBundle({
        spec: ${JSON.stringify(openApiSpec)},
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "BaseLayout"
      });
    };
  </script>
</body>
</html>`;
  res.send(html);
});

export default router;
