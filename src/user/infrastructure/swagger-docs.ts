// Entity

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

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateUserDto:
 *       type: object
 *       description: UserEntity.
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     AddUserDto:
 *       type: object
 *       description: UserEntity.
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         description:
 *           type: string
 */

// ENDPPOINTS

/**
 * @openapi
 * /user/{email}:
 *   get:
 *     tags:
 *     - "user"
 *     summary: User by email.
 *     description: User by email.
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: User Email.
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/MessageResponse'
 */

/**
 * @openapi
 * /user/{email}:
 *   put:
 *     tags:
 *     - "user"
 *     summary: Update User.
 *     description: Update User.
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: User Email.
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/UpdateUserDto'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/ValidationError'
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/MessageResponse'
 */

/**
 * @openapi
 * /user/{email}:
 *   delete:
 *     tags:
 *     - "user"
 *     summary: Delete User by email.
 *     description: Delete User by email.
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: User Email.
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/MessageResponse'
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/MessageResponse'
 */

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

/**
 * @openapi
 * /user:
 *   post:
 *     tags:
 *     - "user"
 *     summary: Create User.
 *     description: Create User.
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/AddUserDto'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/ValidationError'
 *       409:
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/MessageResponse'
 */
