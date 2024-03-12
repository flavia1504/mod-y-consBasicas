const {body} = require('express-validator');

module.exports = [
    body('title').notEmpty().withMessage("El campo no puede estar vacío").bail()
    .isLength({min:3,max:50}).withMessage("El valor ingresado debe tener al menos 3 caracteres y máximo 50").bail(),
    
    body('rating').notEmpty().withMessage("El campo no puede estar vacío").bail()
    .isNumeric().withMessage("El valor ingresado debe ser un número").bail(),

    body('awards').notEmpty().withMessage("El campo no puede estar vacío").bail()
    .isInt().withMessage("Debe ingresar números enteros").bail(),

    body('release_date').notEmpty().withMessage("El campo no puede estar vacío").bail()
    .custom(value => {
        return !isNaN(Date.parse(value))
    })
    .withMessage("Debe ingresar una fecha valida").bail(),

    body('length').notEmpty().withMessage("El campo no puede estar vacío").bail()
    .isInt().withMessage("Debe ingresar números enteros").bail(),

];