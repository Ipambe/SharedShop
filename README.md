# 🛒 SharedShop

**SharedShop** sera una aplicación móvil colaborativa de lista de compras, diseñada especialmente para familias. Permite a múltiples usuarios ver, agregar y marcar productos en tiempo real usando WebSockets.

## 📱 Características principales

- ✨ **Listas de compras colaborativas** en tiempo real.
- 📡 **Sincronización en tiempo real** gracias a WebSockets.
- 🏠 **Grupos familiares** mediante enlaces de invitación únicos.
- 📋 Crear, editar y eliminar ítems de la lista de compras.
- 👥 Múltiples usuarios por lista.
- 📦 Backend robusto con NestJS y Drizzle ORM con SQLite.

## 🚀 Tecnologías utilizadas

### Frontend

- [React Native](https://reactnative.dev) con [Expo](https://expo.dev/)
- [NativeWind](https://www.nativewind.dev/) para estilos con Tailwind CSS
- [Socket.IO Client](https://socket.io/) para sincronización en tiempo real

### Backend

- [NestJS](https://nestjs.com/)
- [Drizzle ORM](https://orm.drizzle.team/) con [SQLite](https://www.sqlite.org/index.html)
- [Socket.IO Server](https://socket.io/) para tiempo real

## 🔗 Funcionalidad destacada

- 🔒 Cada lista tiene un **token de invitación único** que puede ser compartido.
- 📤 Cuando un usuario se une a través del enlace, automáticamente puede ver y modificar la lista.
- 🔄 Cambios en tiempo real mediante WebSocket (agregar, marcar como comprado, eliminar).
