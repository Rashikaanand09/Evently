// const validateEvent = (req, res, next) => {
//     const { name, venue, dateTime, ticketPrice } = req.body;

//     if (!name || !venue || !dateTime || !ticketPrice) {
//         return res.status(400).json({ message: 'All fields are required.' });
//     }

//     next();
// };

// export default validateEvent;