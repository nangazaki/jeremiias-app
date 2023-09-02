import { app } from "./app";

app.listen(process.env.PORT, () =>
  console.log(`Server is running in port - ${process.env.PORT}. 😁`)
);
