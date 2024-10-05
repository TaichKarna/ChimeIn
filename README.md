# ChimeIn

**ChimeIn** is a real-time messaging application built with **React Native** on the frontend and **Node.js**, **Express**, **PostgreSQL**, and **Prisma** on the backend. The app supports both group and individual messaging, offline message storage, and real-time updates using **Socket.IO**. It also leverages **React Query** to manage server-side data fetching and caching.

![ChimeIn Logo](![image](https://github.com/user-attachments/assets/6ec8076d-85c5-41e4-adc7-3d2197dae2fa))

## Features

- **Real-time Messaging**: Instant message updates using WebSockets.
- **Group and Individual Chats**: Communicate with friends one-on-one or in groups.
- **Offline Support**: Messages can be viewed and sent even when offline, and syncs when the user reconnects.
- **Persistent Message Storage**: Uses PostgreSQL and Prisma for message and user data storage.
- **User Authentication**: Secure login and user management.
- **React Query**: Efficient server-side data fetching and state management.
- **Push Notifications**: (Coming Soon) Receive notifications for new messages and mentions.

## Tech Stack

### Frontend:
- **React Native**: Mobile app development framework.
- **React Query**: For server-side state management and caching.
- **Socket.IO Client**: For real-time messaging.
- **Expo**: For faster mobile app development and testing.

### Backend:
- **Node.js**: Backend server.
- **Express**: Web framework for building the REST API.
- **PostgreSQL**: Relational database for storing user and message data.
- **Prisma**: ORM for managing database schemas and queries.
- **Socket.IO**: For real-time, bi-directional communication between client and server.


