import express, { Request, Response } from 'express';
import errorHandler from './shared/infrastructure/handlers/error-handler';
import automationRoutes from './modules/automation/presentation/endpoints/automation-routes';
import automationResultRoutes from './modules/automation/presentation/endpoints/automation-result-routes';
import { injectAutomationModule } from './modules/automation/infrastructure/inject-automation-module';
import { injectAuthModule } from './modules/authentication/infrastructure/inject-auth-module';
import authRoutes from './modules/authentication/presentation/endpoints/auth-routes';

const app = express();
app.use(express.json());

injectAutomationModule();
injectAuthModule();
app.use('/automations', automationRoutes);
app.use('/automation-results', automationResultRoutes);
app.use('/auth', authRoutes)

app.all('*', async (req: Request, res: Response) => {
    res.status(404).json({ errors: [{ message: 'Route not found' }] });
});
  
app.use(errorHandler);

export default app;
