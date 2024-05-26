function verifyUserRole(req, res, next) {
    // Assuming req.user is set by verifyJWT middleware and contains the user's role
    const roles = req.roles;
    console.log(roles)
    // Check if the user's role is manager or admin
    if (roles.includes(2022) || roles.includes(3033)) {
      // If the user is a manager or admin, proceed to the next middleware or route handler
      next();
    } else {
      // If the user is not a manager or admin, return a 403 Forbidden response
      res.status(403).json({ message: 'Insufficient role' });
    }
  }

module.exports = verifyUserRole;