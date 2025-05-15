// Imports AdminJS and its related packages for setting up the admin interface


import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import AdminJSSequelize from '@adminjs/sequelize'
import sequelize from './db.js'

AdminJS.registerAdapter(AdminJSSequelize)

const adminOptions = {
    databases: [sequelize],
    rootPath: '/admin',
    resources: [
        {
            resource: sequelize.models.Interest,
            options: {
                properties: {
                    id: { isVisible: { list: true, edit: false, filter: true, show: true } },
                    name: { isTitle: true },
                }
            }
        }
    ]
}

const adminJs = new AdminJS(adminOptions)

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    adminJs,
    {
        authenticate: async (email, password) => {
            // simple env-based check
            if (
                email === process.env.ADMIN_EMAIL &&
                password === process.env.ADMIN_PASSWORD
            ) {
                return { email }
            }
            return null
        },
    },
    null,
    {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    }
)

export { adminJs, adminRouter }
