import app from "./app";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.DAtABASE_URL)
const PORT=process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});