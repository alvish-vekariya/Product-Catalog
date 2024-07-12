import { Request } from 'express';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req: Request, file, cb) {
        cb(null, './public/uploads')
      },
      filename: function (req: Request, file, cb) {
        cb(null, Date.now()+'-'+ file.originalname)
      }
})

export const upload = multer({storage : storage})



const storageProfile = multer.diskStorage({
  destination: function (req: Request, file, cb) {
      cb(null, './public/profiles')
    },
    filename: function (req: Request, file, cb) {
      cb(null, Date.now()+'-'+ file.originalname)
    }
})

export const uploadProfiles = multer({storage : storageProfile});