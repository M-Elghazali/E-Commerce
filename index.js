const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require('express-session');
const crypto = require('crypto');
const ejs = require('ejs');
const nodemailer = require('nodemailer');
const flash = require('connect-flash');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(flash());

// Session setup
const secretKey = crypto.randomBytes(32).toString('hex');
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false
}));

// Set 'view engine' to 'ejs' and specify the views directory
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("assets"));

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "learnp812@gmail.com",
        pass: "arvz eagp tnjm ztbq",
    },
});

// MongoDB connection setup
mongoose.connect('mongodb+srv://wazer4db:7qmiX8ccM2JpthnS@dev.btbaslf.mongodb.net/userData?retryWrites=true&w=majority&appName=Dev', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

// User schema definition
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verificationToken: { type: String }
});

// Generate verification token function
function generateVerificationToken() {
    return crypto.randomBytes(20).toString('hex');
}

// Generate verification email function
function generateVerificationEmail(name, email, verificationToken) {
    const verificationLink = `http://localhost:5000/verify?token=${verificationToken}`;
    const emailBody = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: #fff !important;
                text-decoration: none;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>XPECTED Email Verification</h1>
            </div>
            <p>Hi ${name},</p>
            <p>Thank you for signing up with our platform!</p>
            <p>Please click on the following link to verify your email address:</p>
            <p><a class="button" href="${verificationLink}" target="_blank">Verify Email</a></p>
            <p>This verification process is important to ensure the security of your account.</p>
            <p>Thanks,<br>The Team</p>
        </div>
     <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>
</body>
    </html>
    `;

    return {
        from: '"XPECTED" <your-email-address>',
        to: email,
        subject: 'Verify Your Email Address',
        html: emailBody
    };
}

const User = mongoose.model('User', userSchema);

// Helper function for rendering login/signup
// Helper function for rendering login/signup
function renderPage(req, res, page) {
    const loggedIn = req.session.user ? true : false;
    const user = req.session.user ? req.session.user : null; // Fetch user from session
    const messages = req.flash(); // Retrieve flash messages
    res.render(page, { loggedIn, user, messages }); // Pass loggedIn, user, and messages to the template
}


// Middleware for protecting routes
function protectRoutes(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

// Routes
app.get('/', (req, res) => renderPage(req, res, 'index'));
app.get('/contact', (req, res) => renderPage(req, res, 'contact'));
app.get('/login', (req, res) => renderPage(req, res, 'login'));
app.get('/signup', (req, res) => renderPage(req, res, 'signup'));
app.get('/cart', protectRoutes, (req, res) => renderPage(req, res, 'cart'));
app.get('/checkout', protectRoutes, (req, res) => renderPage(req, res, 'checkout'));
app.get('/order', protectRoutes, (req, res) => renderPage(req, res, 'order'));
app.get('/product', (req, res) => renderPage(req, res, 'product'));
// app.get('/verify', (req, res) => renderPage(req, res, 'verify'));
app.get('/account', protectRoutes, (req, res) => renderPage(req, res, 'account'));
app.get('/activation', (req, res) => renderPage(req, res, 'activation'));
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});


// app.get('*', (req, res) => {
//     res.status(404).send('Page not found');
// });



app.post("/signup", async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        // Check if email or phone already exists in the database
        const existingUser = await User.findOne({ $or: [{ email: email }, { phone: phone }] });

        if (existingUser) {
            return res.status(400).send("Email or phone number already exists");
        }

        const hash = await bcrypt.hash(password, 10);
        const verificationToken = generateVerificationToken();

        const user = new User({
            name,
            email,
            phone,
            password: hash,
            verified: false,
            verificationToken
        });

        await user.save();

        const mailOptions = generateVerificationEmail(name, email, verificationToken);
        await transporter.sendMail(mailOptions);

        res.redirect('/activation');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating account. Please try again.");
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            req.flash('error', 'Invalid email or password');
            return res.redirect('/login');
        }

        if (!user.verified) {
            req.flash('error', 'Please verify your email to login');
            return res.redirect('/login');
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (isPasswordMatch) {
            req.session.user = {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
            };
            return res.redirect('/');
        } else {
            req.flash('error', 'Invalid email or password');
            return res.render('login', { messages: req.flash() }); // Pass messages to the template
        }
    } catch (err) {
        console.error(err);
        req.flash('error', 'Error logging in. Please try again.');
        res.redirect('/login');
    }
});

app.get('/verify', async (req, res) => {
    const token = req.query.token;

    try {
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(404).send('Invalid verification token');
        }

        // Mark the user as verified
        user.verified = true;
        user.verificationToken = undefined; // Clear the verification token
        await user.save();

        // Redirect the user to a relevant page
        res.redirect('/login?message=Your+email+has+been+verified');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error verifying email. Please try again.');
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
