# CeroCinco

## Screenshots

![App Screenshot](<img width="1440" alt="Screenshot 2024-07-13 at 4 19 37" src="https://github.com/user-attachments/assets/c1433742-84cf-4ab9-8317-980cedf7137a">)
![App Screenshot](<img width="1440" alt="Screenshot 2024-07-13 at 4 20 15" src="https://github.com/user-attachments/assets/4ccd2d08-cca5-4e35-95e4-bfffd7174ae1">)



## Guia developer
### Set up del proyecto
1. Descarga el repositorio Github
2. Guarda el archivo .env que el administrador te proporciono end la carpeta backend
3. Crea una nueva carpeta detro de backend/config llamada certs y mete el CA que el administrador te proporciono ejemplo (CeroCinco/backEnd/config/certs/ca-certificado.txt)
4. En una terminal navega a la carpeta backend y escribe el comando npm i
5. En una nueva terminal navega a la carpeta frontend y escribe el comando npm i

### Inicio del proyecto
#### Front-End
1. En una terminal navega hasta la carpeta frontEnd y escribe el comando npm run dev
#### Backend-End
1. En una terminal navega hasta la carpeta backEnd y escribe el comando npx nodemon server.js

#### Cerrando el proyecto
1. En la terminal donde activaste el backend presionar crtl + c
2. En la terminal donde activaste el frontEdn presionar crtl + c

## Guia subir cambios al github
1. IMPORTANTE Si dos personas hacen cambios en el mismo archivo puede ocacionar problemas, avisar en que archivos has trabajado y subir los cambios a github constantemente para evitar ese problema
2. Hacer tus cambios y asegurarte de guardar con crtl + s todos los que hiciste
3. Cerrar el frontend y el backend
4. Navegar hasta la carpeta raiz del proyecto que es la que contiene las carpetas de backend y frontend
5. Escribir los siguites comandos:
6. git pull
7. git add .
8. git commit -m "Comentario sobre los cambios que hiciste"
9. git push
