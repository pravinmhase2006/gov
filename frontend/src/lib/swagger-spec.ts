export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'GovtPrep & TechPrep India API',
    version: '1.0.0',
    description: 'Comprehensive REST API documentation for GovtPrep & TechPrep India — Indian Government Recruitments, IT Software Careers, Mock Tests, Flashcards, and Candidate Services.',
    contact: {
      name: 'GovtPrep Developer Team',
      email: 'admin@govtprep.in',
      url: 'https://govtprep.in'
    },
    license: {
      name: 'MIT License',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local Development Server'
    },
    {
      url: 'https://govtprep.in',
      description: 'Production Server'
    }
  ],
  tags: [
    { name: 'Authentication', description: 'User login, registration, and session management' },
    { name: 'Mock Tests & CBT', description: 'All-India Mock Test evaluation and score calculation' },
    { name: 'Job Alerts', description: 'WhatsApp, Telegram, and Email recruitment notifications' },
    { name: 'Bookmarks', description: 'Save and manage favorite jobs, exams, and articles' },
    { name: 'Admin', description: 'Administrative operations for jobs and question banks' }
  ],
  paths: {
    '/api/auth/login': {
      post: {
        tags: ['Authentication'],
        summary: 'Candidate & Admin Login',
        description: 'Authenticates a user with email and password, setting a secure HTTP-only JWT session cookie.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email', example: 'aspirant@govtprep.in' },
                  password: { type: 'string', format: 'password', example: 'User@123' }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Authentication successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    user: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: '67c70e28f3a8b40012345678' },
                        name: { type: 'string', example: 'Aspirant Rahul Sharma' },
                        email: { type: 'string', example: 'aspirant@govtprep.in' },
                        role: { type: 'string', example: 'USER' }
                      }
                    }
                  }
                }
              }
            }
          },
          401: { description: 'Invalid email or password' },
          400: { description: 'Missing required credentials' }
        }
      }
    },
    '/api/auth/register': {
      post: {
        tags: ['Authentication'],
        summary: 'Register New Candidate Account',
        description: 'Registers a new student/aspirant profile and initializes a user session.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                  name: { type: 'string', example: 'Pravin Mhase' },
                  email: { type: 'string', format: 'email', example: 'pravin@example.com' },
                  password: { type: 'string', format: 'password', example: 'Pravin@123' },
                  qualification: { type: 'string', example: 'Graduate' },
                  state: { type: 'string', example: 'Maharashtra' }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Registration successful and session cookie set' },
          409: { description: 'An account with this email already exists' }
        }
      }
    },
    '/api/auth/logout': {
      post: {
        tags: ['Authentication'],
        summary: 'Logout Current Session',
        description: 'Clears the JWT auth cookie from candidate browser.',
        responses: {
          200: { description: 'Logged out successfully' }
        }
      }
    },
    '/api/mock-tests/{id}/submit': {
      post: {
        tags: ['Mock Tests & CBT'],
        summary: 'Submit Mock Test & Calculate Instant Score',
        description: 'Evaluates user responses against answer key with negative marking rules and returns a performance report.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Mock Test ID or ObjectId',
            schema: { type: 'string', example: '67c70e28f3a8b40012345679' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  timeTakenSeconds: { type: 'integer', example: 1420 },
                  answers: {
                    type: 'object',
                    example: {
                      '67c70e28f3a8b40012345680': { chosenAnswer: 'B', status: 'ANSWERED' }
                    }
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Test evaluated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    report: {
                      type: 'object',
                      properties: {
                        score: { type: 'number', example: 42.5 },
                        totalMarks: { type: 'number', example: 50.0 },
                        percentage: { type: 'number', example: 85.0 },
                        accuracy: { type: 'number', example: 92.5 },
                        correctCount: { type: 'integer', example: 22 },
                        incorrectCount: { type: 'integer', example: 2 },
                        skippedCount: { type: 'integer', example: 1 }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/job-alerts': {
      post: {
        tags: ['Job Alerts'],
        summary: 'Subscribe to WhatsApp / Telegram / Email Alerts',
        description: 'Enables instant notifications for vacancies, admit card releases, and answer keys.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  channel: { type: 'string', enum: ['whatsapp', 'telegram', 'email'], example: 'whatsapp' },
                  contact: { type: 'string', example: '+91 9876543210' },
                  exams: { 
                    type: 'array', 
                    items: { type: 'string' }, 
                    example: ['SSC & Central Govt', 'Railways & RRB'] 
                  },
                  frequency: { type: 'string', enum: ['instant', 'daily'], example: 'instant' }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Subscription created successfully' }
        }
      }
    },
    '/api/bookmarks': {
      get: {
        tags: ['Bookmarks'],
        summary: 'Get Saved Bookmarks',
        description: 'Returns candidate saved jobs, exams, articles, and mock tests.',
        responses: {
          200: { description: 'List of bookmarks returned' },
          401: { description: 'Unauthorized' }
        }
      },
      post: {
        tags: ['Bookmarks'],
        summary: 'Bookmark an Item',
        description: 'Saves a job notice or study material to candidate account.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['itemType', 'itemId', 'itemTitle', 'itemSlug'],
                properties: {
                  itemType: { type: 'string', enum: ['JOB', 'EXAM', 'ARTICLE', 'STUDY_MATERIAL', 'MOCK_TEST'] },
                  itemId: { type: 'string' },
                  itemTitle: { type: 'string' },
                  itemSlug: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Item bookmarked successfully' }
        }
      },
      delete: {
        tags: ['Bookmarks'],
        summary: 'Remove Bookmark',
        description: 'Removes a saved bookmark from candidate account.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['itemType', 'itemId'],
                properties: {
                  itemType: { type: 'string' },
                  itemId: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Bookmark removed successfully' }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'govtprep_token',
        description: 'JWT session cookie set automatically upon login'
      }
    }
  }
};
