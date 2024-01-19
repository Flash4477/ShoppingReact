const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const app = express();

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Cloudinary setup (thay thế 'your_cloud_name', 'your_api_key', 'your_api_secret' bằng thông tin đăng nhập của bạn)
cloudinary.config({
    cloud_name: 'df0kl17wd',
    api_key: '515339362473582',
    api_secret: 'O9NtBTBiB5MrQ04gjr3wf4G4ck0'
});

// Existing routes...

// Thêm một route mới để xử lý việc tải ảnh lên và cập nhật hồ sơ người dùng
app.post('/api/v2/user/updateProfile', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file provided' });
        }

        // Đặt tên thư mục bạn muốn lưu trữ ảnh trong đây
        const folderName = 'img_api';

        // Upload file to Cloudinary với tên thư mục
        const result = await cloudinary.uploader.upload(req.file.buffer, {
            resource_type: 'auto',
            folder: folderName,
        });

        const imageUrl = result.secure_url;
        // Bây giờ bạn có thể sử dụng imageUrl để cập nhật hồ sơ người dùng trong cơ sở dữ liệu của bạn
        // Ví dụ: Cập nhật hồ sơ người dùng với imageUrl trong cơ sở dữ liệu của bạn

        res.json({ imageUrl });
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        res.status(500).json({ error: 'Error uploading to Cloudinary' });
    }
});

// Start the server
const port = 8081;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
