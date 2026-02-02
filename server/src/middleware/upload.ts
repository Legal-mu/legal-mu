import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { AppError } from './errorHandler';

// Helper to ensure directory exists
const ensureDir = (dir: string) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadDir = path.join(__dirname, '../../uploads');

        switch (file.fieldname) {
            case 'headshot':
                uploadDir = path.join(uploadDir, 'headshots');
                break;
            case 'cv':
                uploadDir = path.join(uploadDir, 'cvs');
                break;
            case 'verification':
                uploadDir = path.join(uploadDir, 'verification');
                break;
            default:
                uploadDir = path.join(uploadDir, 'others');
        }

        ensureDir(uploadDir);
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
});

const fileFilter = (req: any, file: any, cb: any) => {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const allowedDocTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    if (file.fieldname === 'headshot') {
        if (allowedImageTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new AppError('Only JPEG, JPG and PNG images are allowed for headshot', 400), false);
        }
    } else if (file.fieldname === 'cv' || file.fieldname === 'verification') {
        if (allowedImageTypes.includes(file.mimetype) || allowedDocTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new AppError('Only Images and PDF/DOCX are allowed for documents', 400), false);
        }
    } else {
        cb(null, true);
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // Increase to 5MB
    }
});
