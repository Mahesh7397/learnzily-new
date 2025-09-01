export const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    status: 'active',
    role: 'Admin',
    joinDate: '2024-01-15',
    lastLogin: '2024-01-20 10:30:00'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    status: 'active',
    role: 'User',
    joinDate: '2024-01-14',
    lastLogin: '2024-01-19 15:45:00'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    status: 'blocked',
    role: 'User',
    joinDate: '2024-01-13',
    lastLogin: '2024-01-18 09:15:00'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    status: 'pending',
    role: 'User',
    joinDate: '2024-01-12',
    lastLogin: '2024-01-17 14:20:00'
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@example.com',
    status: 'active',
    role: 'Moderator',
    joinDate: '2024-01-11',
    lastLogin: '2024-01-16 11:00:00'
  },
  {
    id: 6,
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    status: 'active',
    role: 'User',
    joinDate: '2024-01-10',
    lastLogin: '2024-01-15 16:30:00'
  },
  {
    id: 7,
    name: 'Alex Thompson',
    email: 'alex.thompson@example.com',
    status: 'blocked',
    role: 'User',
    joinDate: '2024-01-09',
    lastLogin: '2024-01-14 08:45:00'
  },
  {
    id: 8,
    name: 'Lisa Anderson',
    email: 'lisa.anderson@example.com',
    status: 'active',
    role: 'User',
    joinDate: '2024-01-08',
    lastLogin: '2024-01-13 12:15:00'
  }
];

export const mockLogs = [
  {
    id: 1,
    level: 'error',
    message: 'Database connection failed',
    source: 'Database Service',
    timestamp: '2024-01-20 10:30:15',
    details: 'Connection timeout after 30 seconds\nHost: db-server-01\nPort: 5432\nDatabase: production'
  },
  {
    id: 2,
    level: 'warning',
    message: 'High memory usage detected',
    source: 'System Monitor',
    timestamp: '2024-01-20 10:25:42',
    details: 'Memory usage: 85%\nThreshold: 80%\nServer: web-server-02'
  },
  {
    id: 3,
    level: 'info',
    message: 'User authentication successful',
    source: 'Auth Service',
    timestamp: '2024-01-20 10:20:33',
    details: 'User ID: 1234\nIP: 192.168.1.100\nUser Agent: Mozilla/5.0...'
  },
  {
    id: 4,
    level: 'error',
    message: 'Failed to upload file to S3',
    source: 'File Service',
    timestamp: '2024-01-20 10:15:28',
    details: 'Access denied\nBucket: production-files\nKey: uploads/file-001.jpg\nUser ID: 5678'
  },
  {
    id: 5,
    level: 'warning',
    message: 'Rate limit exceeded',
    source: 'API Gateway',
    timestamp: '2024-01-20 10:10:19',
    details: 'IP: 203.0.113.45\nEndpoint: /api/v1/users\nRequests: 1000/hour\nLimit: 500/hour'
  },
  {
    id: 6,
    level: 'info',
    message: 'Scheduled backup completed',
    source: 'Backup Service',
    timestamp: '2024-01-20 10:05:12',
    details: 'Database: production\nSize: 2.5GB\nDuration: 45 minutes\nLocation: s3://backups/2024-01-20/'
  },
  {
    id: 7,
    level: 'error',
    message: 'Payment processing failed',
    source: 'Payment Service',
    timestamp: '2024-01-20 10:00:07',
    details: 'Transaction ID: txn_1234567890\nAmount: $99.99\nReason: Insufficient funds\nCard: ****1234'
  },
  {
    id: 8,
    level: 'info',
    message: 'Cache cleared successfully',
    source: 'Cache Service',
    timestamp: '2024-01-20 09:55:03',
    details: 'Cache type: Redis\nKeys cleared: 15,432\nDuration: 2.3 seconds'
  }
];

export const mockResources = [
  {
    id: 1,
    name: 'User Profile Images',
    type: 'image',
    storage: 'S3',
    size: 52428800, // 50MB
    description: 'Collection of user uploaded profile pictures and avatars',
    createdDate: '2024-01-15',
    modifiedDate: '2024-01-20',
    path: 's3://production-bucket/profiles/'
  },
  {
    id: 2,
    name: 'Product Catalog Database',
    type: 'database',
    storage: 'MongoDB',
    size: 1073741824, // 1GB
    description: 'Main product catalog with inventory and pricing information',
    createdDate: '2024-01-10',
    modifiedDate: '2024-01-19',
    path: 'mongodb://cluster.mongodb.net/products'
  },
  {
    id: 3,
    name: 'Marketing Videos',
    type: 'video',
    storage: 'S3',
    size: 2147483648, // 2GB
    description: 'Promotional and educational video content for marketing campaigns',
    createdDate: '2024-01-12',
    modifiedDate: '2024-01-18',
    path: 's3://media-bucket/videos/marketing/'
  },
  {
    id: 4,
    name: 'API Documentation',
    type: 'document',
    storage: 'S3',
    size: 10485760, // 10MB
    description: 'Comprehensive API documentation and integration guides',
    createdDate: '2024-01-08',
    modifiedDate: '2024-01-17',
    path: 's3://docs-bucket/api/'
  },
  {
    id: 5,
    name: 'User Analytics Data',
    type: 'database',
    storage: 'MongoDB',
    size: 536870912, // 512MB
    description: 'User behavior analytics and engagement metrics',
    createdDate: '2024-01-14',
    modifiedDate: '2024-01-20',
    path: 'mongodb://analytics.mongodb.net/user_data'
  },
  {
    id: 6,
    name: 'Product Images',
    type: 'image',
    storage: 'S3',
    size: 104857600, // 100MB
    description: 'High-resolution product photography and thumbnails',
    createdDate: '2024-01-11',
    modifiedDate: '2024-01-16',
    path: 's3://products-bucket/images/'
  },
  {
    id: 7,
    name: 'Training Materials',
    type: 'document',
    storage: 'S3',
    size: 26214400, // 25MB
    description: 'Employee training documents and certification materials',
    createdDate: '2024-01-09',
    modifiedDate: '2024-01-15',
    path: 's3://training-bucket/materials/'
  },
  {
    id: 8,
    name: 'System Logs Archive',
    type: 'database',
    storage: 'MongoDB',
    size: 268435456, // 256MB
    description: 'Historical system logs and audit trails for compliance',
    createdDate: '2024-01-07',
    modifiedDate: '2024-01-20',
    path: 'mongodb://logs.mongodb.net/system_logs'
  }
];

export const enrolledCourses = [
  {
    id: 'physics-1',
    title: 'Physics',
    category: 'Physics',
    description: 'Complete physics course with mechanics, thermodynamics, and electromagnetism.',
    isEnrolled: true,
  },
];