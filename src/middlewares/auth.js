const adminAuth = (req, res, next) => {
  console.log("Authorzation for admin checked!");

  const token = "xyz";
  const isAdminAuth = token === "xyz";
  if (!isAdminAuth) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("Authorzation for user checked!");

  const token = "xyz1";
  const isUserAuth = token === "xyz1";
  if (!isUserAuth) {
    res.status(401).send("Unauthorized request to user");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
