# APP-VAC-PNI Wiki

  

## Infraestructura

  

La aplicación **APP-VAC-PNI** está compuesta por los siguientes componentes principales:

  

- **Frontend:** Interfaz web desarrollada en React para la interacción de usuarios y administradores.

- **Backend:** API REST construida con Node.js y Express, encargada de la lógica de negocio y gestión de datos.

- **Base de datos:** Sistema de almacenamiento, generalmente PostgreSQL, para guardar información de usuarios, vacunaciones y reportes.

- **Servicios externos:** Integración con plataformas de mensajería y notificaciones (por ejemplo, correo electrónico, SMS).

  

### Diagrama de arquitectura

  

```mermaid

graph TD

A[Usuario] -->|Web| B[Frontend (React)]

B -->|API| C[Backend (Node.js/Express)]

C --> D[Base de datos (PostgreSQL)]

C --> E[Servicios externos]

```

  

Este diagrama muestra cómo los usuarios interactúan con la aplicación a través del frontend, que se comunica con el backend. El backend gestiona la información en la base de datos y se integra con servicios externos para enviar notificaciones y reportes.

  
  

## Funciones del Frontend

  

El frontend de **APP-VAC-PNI** proporciona las siguientes funcionalidades:

  

- Registro y autenticación de usuarios.

- Visualización de calendario de vacunación.

- Consulta de historial de vacunaciones.

- Solicitud y gestión de citas para vacunación.

- Recepción de notificaciones y recordatorios.

- Panel de administración para gestión de usuarios y reportes.

- Visualización de estadísticas y reportes gráficos.

- Edición de perfil y datos personales.

  

## Funciones del Backend

  

El backend de **APP-VAC-PNI** implementa las siguientes funciones:

  

- Autenticación y autorización de usuarios.

- Gestión de usuarios (alta, baja, modificación).

- Administración de citas y calendario de vacunación.

- Registro y consulta de vacunaciones realizadas.

- Generación y envío de notificaciones (correo, SMS).

- Integración con servicios externos para reportes y estadísticas.

- Validación y procesamiento de datos recibidos del frontend.

- Exposición de API REST para consumo por el frontend.

- Manejo de roles y permisos de acceso.

- Generación de reportes y exportación de datos.

  

## Esquema de Base de Datos

  

El esquema de la base de datos de **APP-VAC-PNI** está diseñado para almacenar y relacionar la información relevante sobre usuarios, vacunaciones, citas y reportes. A continuación se describen las tablas principales:

  

- **Usuarios:** Almacena datos personales y credenciales de acceso.

- `id`: Identificador único.

- `nombre`, `apellido`, `email`, `fecha_nacimiento`, `documento_identidad`, `rol`, etc.

  

- **Vacunaciones:** Registra cada evento de vacunación.

- `id`: Identificador único.

- `usuario_id`: Relación con la tabla de usuarios.

- `vacuna_id`: Relación con la tabla de vacunas.

- `fecha_aplicacion`, `lote`, `centro_salud`, etc.

  

- **Vacunas:** Información sobre las vacunas disponibles.

- `id`: Identificador único.

- `nombre`, `fabricante`, `dosis_requeridas`, `intervalo_dosis`, etc.

  

- **Citas:** Gestiona las solicitudes y programación de citas.

- `id`: Identificador único.

- `usuario_id`: Relación con la tabla de usuarios.

- `fecha_cita`, `estado`, `centro_salud`, etc.

  

- **Notificaciones:** Registro de mensajes enviados a los usuarios.

- `id`: Identificador único.

- `usuario_id`: Relación con la tabla de usuarios.

- `tipo`, `mensaje`, `fecha_envio`, `estado`, etc.

  

- **Reportes:** Almacena información para estadísticas y exportaciones.

- `id`: Identificador único.

- `tipo`, `fecha_generacion`, `datos`, etc.

  

Las relaciones entre tablas permiten consultar el historial de vacunaciones por usuario, gestionar citas y generar reportes personalizados.

  

## Servicios Externos

  

Los servicios externos en **APP-VAC-PNI** son plataformas y herramientas integradas para ampliar las capacidades de la aplicación. Estos servicios permiten enviar notificaciones, gestionar comunicaciones y obtener información adicional. Algunos ejemplos incluyen:

  

- **Correo electrónico:** Utilizado para enviar confirmaciones de citas, recordatorios y reportes a los usuarios.

- **SMS:** Permite el envío de mensajes de texto para notificaciones urgentes o recordatorios de vacunación.

- **Servicios de autenticación:** Integración con proveedores externos para verificación de identidad y acceso seguro.

- **Plataformas de reportes:** Herramientas externas para la generación y exportación de estadísticas y reportes personalizados.

- **APIs gubernamentales o de salud:** Para validar información de vacunación y sincronizar datos oficiales.

  

La integración con estos servicios se realiza a través de APIs y protocolos seguros, garantizando la confidencialidad y disponibilidad de la información.