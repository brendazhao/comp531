////////////////////////////////
// Upload files to Cloudinary //
////////////////////////////////
const multer = require('multer')
const stream = require('stream')
const cloudinary = require('cloudinary')

if (!process.env.CLOUDINARY_URL) {
     process.env.CLOUDINARY_URL="cloudinary://218217726321745:s1UQdHWAXYbIIviMWl6Hz6uAil4@hmqb6pk0o"
}

const doUpload = (publicId, req, res, next) => {

	const uploadStream = cloudinary.uploader.upload_stream(result => {    	
         // capture the url and public_id and add to the request
         req.fileurl = result.url
         req.fileid = result.public_id
         next()
	}, { public_id: req.body[publicId]})

	// multer can save the file locally if we want
	// instead of saving locally, we keep the file in memory
	// multer provides req.file and within that is the byte buffer

	// we create a passthrough stream to pipe the buffer
	// to the uploadStream function for cloudinary.
	const s = new stream.PassThrough()
	s.end(req.file.buffer)
	s.pipe(uploadStream)
	s.on('end', uploadStream.end)
	// and the end of the buffer we tell cloudinary to end the upload.
}

// multer parses multipart form data.  Here we tell
// it to expect a single file upload named 'image'
// Read this function carefully so you understand
// what it is doing!
const parseIt = (publicName) => (req, res, next) => {
	multer().single('text')(req, res, () => {
		if (!req.body.text) {
			req.content = null;
		} else if (!req.body.text[0] || req.body.text[0] == 'undefined') {
     		req.content = 'you can add text here'
     	} else {
     		req.content = req.body.text[0];
     	}
     	  	
    })

	multer().single('image')(req, res, () => {
		if (req.file === undefined) {
			req.file = null;
			next()
		} else {
			doUpload(publicName, req, res, next)
		}
	})
}

///////////////////////////////////////////////////////////////////////////////
// These three functions are examples to validate that uploading works
// You do not want them in your final application
// 
// remove the above three functions and change the last line below to
//     module.exports = uploadImage
// 
// then to use in profile.js do (see comment in getImage about the string 'avatar')
//     const uploadImage = require('./uploadCloudinary')
//     app.put('/avatar', uploadImage('avatar'), uploadAvatar)
//
///////////////////////////////////////////////////////////////////////////////

module.exports = parseIt
