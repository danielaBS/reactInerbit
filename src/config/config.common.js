switch (process.env.ENVIROMENT) {
  case "local":
    break;

  case "prod":
    break;

  default:
    break;
}

export const CONFIG = {
  APP_PORT: process.env.PORT,
  API_URL: 'https://ops.enerbit.dev/learning/api/v1',
};
