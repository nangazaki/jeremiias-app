import { app } from "./app";
import EnvVars from "./constantes/EnvVars"

app.listen(EnvVars.Port, () =>
  console.log(`Server is running in port - ${EnvVars.Port}. 😁`)
);
