// USER

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       description: UserEntity.
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         description:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date
 *         updatedAt:
 *           type: string
 *           format: date
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     UserArray:
 *       type: array
 *       description: Array with Users.
 *       items:
 *         $ref: '#/components/schemas/User'
 */

// DTO

// ENDPPOINTS

/**
 * @openapi
 * /user:
 *   get:
 *     tags:
 *     - "user"
 *     summary: User list.
 *     description: User list.
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/UserArray'
 */
