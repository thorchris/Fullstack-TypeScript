import { Router } from "express"
const router = Router();
import { ApiError } from "../errors/apiError"
import FriendFacade from "../facades/friendFacade"
const debug = require("debug")("friend-routes")

let facade: FriendFacade;

// Initialize facade using the database set on the application object
router.use(async (req, res, next) => {
  if (!facade) {
    const db = req.app.get("db")
    debug("Database used: " + req.app.get("db-type"))
    facade = new FriendFacade(db)
  }
  next()
})

// This does NOT require authentication in order to let new users create themself
router.post('/', async function (req, res, next) {
  try {
    let newFriend = req.body;
    const status = await facade.addFriend(newFriend)
    res.json({ status })
  } catch (err) {
    debug(err)
    if (err instanceof ApiError) {
      next(err)
    } else {
      next(new ApiError(err.message, 400));
    }
  }
})

// ALL ENDPOINTS BELOW REQUIRES AUTHENTICATION

import authMiddleware from "../middleware/basic-auth"
const USE_AUTHENTICATION = !process.env["SKIP_AUTHENTICATION"];

if (USE_AUTHENTICATION) {
  router.use(authMiddleware);
}

router.get("/all", async (req: any, res) => {
  const friends = await facade.getAllFriends();

  const friendsDTO = friends.map(friend => {
    const { firstName, lastName, email } = friend
    return { firstName, lastName, email }
  })
  res.json(friendsDTO);
})

/**
 * authenticated users can edit himself
 */
router.put('/editme', async function (req: any, res, next) {
  try {
    if (!USE_AUTHENTICATION) {
      throw new ApiError("This endpoint requires authentication", 500)
    }
    const email = req.credentials.userName 
    const result = await facade.editFriend(email, req.body);
    res.json(result);
  } catch (err) {
    debug(err)
    if (err instanceof ApiError) {
      return next(err)
    }
    next(new ApiError(err.message, 400));
  }
})

router.get("/me", async (req: any, res, next) => {
  try {
      if (!USE_AUTHENTICATION) {
          throw new ApiError("This endpoint requires authentication", 500)
      }
      const userEmail = req.credentials.userName
      const friend = await facade.getFrind(userEmail);
      if (friend == null) {
          throw new ApiError("user not found", 404);
      }
      const { firstName, lastName, email } = friend;
      const friendDTO = { firstName, lastName, email }
      res.json(friendDTO);

  } catch (err) {
      next(err)
  }
})

//These endpoint requires admin rights

//An admin user can fetch everyone
router.get("/find-user/:email", async (req: any, res, next) => {
  try {
      if (USE_AUTHENTICATION && req.credentials.role !== "admin" || !req.credentials.role) {
          throw new ApiError("Not Authorized", 401)
      }
      const userEmail = req.params.email;
      const friend = await facade.getFrind(userEmail);
      if (friend == null) {
          throw new ApiError("user not found", 404)
      }
      const { firstName, lastName, email, role } = friend;
      const friendDTO = { firstName, lastName, email }
      res.json(friendDTO);
  } catch (err) {
      next(err)
  }
})


//An admin user can edit everyone
router.put('/:email', async function (req: any, res, next) {

  try {
    if (USE_AUTHENTICATION && !req.credentials.role || req.credentials.role !== "admin") {
      throw new ApiError("Not Authorized", 401)
    }
    const userEmail = req.params.email; 
    let newFriend = req.body;
    const result = await facade.editFriend(userEmail, newFriend);
    res.json(result);
  } catch (err) {
    debug(err)
    if (err instanceof ApiError) {
      return next(err)
    }
    next(new ApiError(err.message, 400));
  }
})

router.delete('/delete/:email', async function (req: any, res, next) {

  try {
      if (USE_AUTHENTICATION && req.credentials.role !== "admin" || !req.credentials.role) {
          throw new ApiError("Not Authorized", 401)
      }

      const userEmail = req.params.email;
      const result = await facade.deleteFriend(userEmail);
      res.json(result);
  } catch (err) {
      debug(err)
      if (err instanceof ApiError) {
          return next(err)
      }
      next(new ApiError(err.message, 400));
  }
})


export default router