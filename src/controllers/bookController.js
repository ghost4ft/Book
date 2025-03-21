import cloudinary from '../lib/cloudinary.js'
import Book from '../models/bookModel.js'

const newBook = async (req, res, next) => {
    try {
        const { title, caption, rating, image } = req.body
        if (!title || !caption || !rating || !image)
            return res.status(400).json({ message: 'All fields are required' })

        if (typeof rating !== 'number' || rating < 1 || rating > 5)
            return res.status(400).json({ message: 'Rating must be a number between 1 and 5' })

        if (title.length < 2 || title.length > 50)
            return res.status(400).json({ message: 'Title must be between 2 and 50 characters' })

        const uploadResponse = await cloudinary.uploader.upload(image)
        const imageUrl = uploadResponse.secure_url
        const book = new Book({
            title, caption, rating, image: imageUrl || "",
            user: req.user._id
        })
        await book.save()
        res.status(201).json({ message: 'Book created successfully' })

    } catch (error) {
        next(error)

    }
}
const showBooks = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        const skip = (page - 1) * limit
        const books = await Book.find({}).sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .populate('user', 'username avatar')

        const totalBooks = await Book.countDocuments()
        const totalPages = Math.ceil(totalBooks / limit)
        if (totalBooks === 0)
            return res.status(404).json({ message: 'No books found' })
        if (page > totalPages)
            return res.status(404).json({ message: 'Page not found' })



        res.send({
            books,
            page,
            limit,
            totalPages
        })
    } catch (error) {
        next(error)
    }
}
const deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id)
        if (!book)
            return res.status(404).json({ message: 'Book not found' })
        if (book.user.toString() !== req.user._id.toString())
            return res.status(401).json({ message: 'Unauthorized' })


        if (book.image && book.image.includes('cloudinary')) {
            try {
                const publicId = book.image.split('/').pop().split('.')[0]
                await cloudinary.uploader.destroy(publicId)
            } catch (deleteError) {
                console.log(deleteError)
            }
        }
        await book.deleteOne()
        res.json({ message: 'Book deleted successfully' })

    } catch (error) {
        next(error)

    }
}
const updateBook = async (req, res, next) => {
    try {
        const id = req.params.id

        const book = await Book.findById(id)
        if (book.user.toString() !== req.user._id.toString())
            return res.status(401).json({ message: 'Unauthorized' })

        if (!book)
            return res.status(404).json({ message: 'Book not found' })



        const { title, caption, rating, image } = req.body

        if (!title || !caption || !rating || !image)
            return res.status(400).json({ message: 'All fields are required' })
        if (typeof rating !== 'number' || rating < 1 || rating > 5)
            return res.status(400).json({ message: 'Rating must be a number between 1 and 5' })
        if (title.length < 2 || title.length > 50)
            return res.status(400).json({ message: 'Title must be between 2 and 50 characters' })



        let imageUrl = book.image
        if (image !== book.image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
            if (book.image && book.image.includes('cloudinary')) {
                try {
                    const publicId = book.image.split('/').pop().split('.')[0]
                    await cloudinary.uploader.destroy(publicId)
                } catch (deleteError) {
                    console.log(deleteError)
                }
            }
        }
        book.title = title || book.title
        book.caption = caption || book.caption
        book.rating = rating || book.rating
        book.image = imageUrl || book.image
        await book.save()
        res.json({ message: 'Book updated successfully' })
    } catch (error) {
        next(error)

    }
}
const userBook = async (req, res, next) => {
    try {
        const books = await Book.find({ user: req.user._id }).sort({ createdAt: -1 })
        res.json(books)
    } catch (error) {
        next(error)
    }
}

export default {
    newBook,
    showBooks,
    deleteBook,
    updateBook,
    userBook
}
