import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import AdminJSSequelize from '@adminjs/sequelize'
import sequelize from '../db.js'

AdminJS.registerAdapter(AdminJSSequelize)

const adminJs = new AdminJS({
    databases: [sequelize],
    rootPath: '/admin',
})

const DEFAULT_ADMIN = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
}

const authenticateAdmin = async (email, password) => {
    // Just a simple env-based check
    return email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password
        ? DEFAULT_ADMIN
        : null;
}

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    adminJs,
    {
        authenticate: authenticateAdmin,
        cookieName: 'adminjs',
        cookiePassword: process.env.SESSION_SECRET,
    },
    null,
    {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: process.env.NODE_ENV === 'production' },
    }
)

export { adminJs, adminRouter }
export default adminRouter
