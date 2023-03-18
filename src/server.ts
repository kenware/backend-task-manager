import Logger from './utils/logger';
import app from './core/app';

const port = parseInt(process.env.PORT || '5000', 10);

app.listen(Number(port), () => {
  Logger.info(`App listening on http://localhost:${port}`);
});
