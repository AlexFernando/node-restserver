


// ======================================
// Puerto
// ======================================
process.env.PORT = process.env.PORT || 3000;


// ======================================
// Entorno
// ======================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ======================================
// Vencimiento del Token
// ======================================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = '48h';

// ======================================
// SEED de autenticacion
// ======================================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo'

// ======================================
// Base de datos
// ======================================

let urlDB;

if( process.env.NODE_ENV === 'dev' ) {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;


// ======================================
// Google Client ID
// ======================================
process.env.CLIENT_ID = process.env.CLIENT_ID || '315296938451-l4rg37d5k8i0hh8qb0v37s9n815206of.apps.googleusercontent.com';

