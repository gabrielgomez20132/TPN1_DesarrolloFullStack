import { body } from 'express-validator';

export const validarSuperheroe = [
   body('name.official')
        .isLength({ min: 3, max: 90 })
        .withMessage('El nombre oficial debe tener entre 3 y 90 caracteres'),

    body('capital')
        .isLength({ min: 3, max: 90 })
        .withMessage('La capital debe tener entre 3 y 90 caracteres'),

    body('borders')
        .notEmpty().withMessage('el campo Fronteras es requerido')//que no este vacio el campo
        .custom((value) => {
            // Si las fronteras vienen como una cadena, las convertimos en un arreglo
            if (typeof value === 'string') {
                value = value.split(',').map(b => b.trim().toUpperCase());
            }
            
            // Validamos que las fronteras sean un arreglo y que cada valor tenga 3 letras mayúsculas
            if (Array.isArray(value)) {
                return value.every(b => /^[A-Z]{3}$/.test(b));
            }
            return false;
        })
        .withMessage('Cada frontera debe ser una cadena de 3 letras mayúsculas'),

    body('timezones')
        .notEmpty()  // Verifica que no esté vacío
        .withMessage('El campo zonas horarias es requerido'),
        

    body('area')
        .isFloat({ min: 0.01 })  // Asegura que sea un número flotante positivo
        .withMessage('El área debe ser un número positivo mayor que 0'),

    body('population')
        .isInt({ min: 1 })  // Asegura que sea un número entero positivo (mayor o igual a 1)
        .withMessage('La población debe ser un entero positivo'),
];