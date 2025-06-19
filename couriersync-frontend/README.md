# README.md

# CourierSync Frontend

CourierSync is a web application designed to optimize logistics processes. This project serves as the frontend for the CourierSync system, providing an interface for administrators, operators, and drivers to manage shipments and track their status.

## Features

- **Administrator Dashboard**: Access to summary information and management features.
- **User Authentication**: Secure login for different user roles.
- **Shipment Management**: Create, edit, and view shipments.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Project Structure

```
couriersync-frontend
├── src
│   ├── pages
│   │   ├── admin
│   │   │   └── summary.tsx
│   ├── services
│   │   └── summary-service.ts
│   ├── components
│   │   ├── templates
│   │   │   └── admin-summary-layout.tsx
│   ├── styles
│   │   └── admin-summary.css
├── .env.local
├── package.json
├── tsconfig.json
└── README.md
```

## Environment Variables

Make sure to set up the following environment variables in your `.env.local` file:

```
NEXT_PUBLIC_API_BASE_URL=https://couriersync-backend-envios.onrender.com
NEXT_PUBLIC_LOGIN_ENDPOINT=/api/auth/login
NEXT_PUBLIC_REFRESH_TOKEN_ENDPOINT=/api/auth/refresh-token
NEXT_PUBLIC_ADMIN_SUMMARY_ENDPOINT=/api/admin/summary
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/couriersync-frontend.git
   ```
2. Navigate to the project directory:
   ```
   cd couriersync-frontend
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Running the Application

To start the development server, run:
```
npm run dev
```
Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.