import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import multer = require('multer');

import crypto from 'crypto';
import mime from 'mime';
import { mkdirp } from 'mkdirp';

const config = new ConfigService();
export const diskStorageRegistration = multer.diskStorage({
  destination: function (req, file, cb) {
    const type = 'profile';
    const upload_path = join(config.get('UPLOAD_PATH'), type);

    // ensure  access log directory exists

    try {
      mkdirp(upload_path);
    } catch (e) {
      console.log(e);
      cb(e, upload_path);
    }
  },

  filename: function (req, file, cb) {
    console.log(req);
    const currentTime = new Date();
    const dd = currentTime.getDate();
    const mm = currentTime.getMonth() + 1; // January is 0!
    const yyyy = currentTime.getFullYear();
    let dd2, mm2;

    if (dd < 10) {
      dd2 = '0' + dd;
    } else {
      dd2 = dd.toString();
    }

    if (mm < 10) {
      mm2 = '0' + mm;
    } else {
      mm2 = mm.toString();
    }

    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(
        null,
        +yyyy +
          mm2 +
          dd2 +
          '-' +
          raw.toString('hex') +
          '.' +
          mime.extension(file.mimetype),
      );
    });
  },
});

export const multerOptionsRegistration = {
  storage: diskStorageRegistration,
  limits: { fileSize: 200 * 1024 * 1024 },
};
