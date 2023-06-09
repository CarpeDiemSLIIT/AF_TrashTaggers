import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000; //eslint-disable-line no-undef
await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
